(function () {
  'use strict';

  const config = window.KB_SUPABASE_CONFIG || {};
  const sheets = window.KB_GOOGLE_SHEETS_CONFIG || {};
  // Keep the storefront usable without a remote database. Orders and settings
  // are handled by the existing localStorage adapters when remote mode is off.
  const remoteEnabled = false;
  const loaded = remoteEnabled && config.url && config.anonKey;
  let clientPromise;

  function getClient() {
    if (!loaded) return Promise.resolve(null);
    if (clientPromise) return clientPromise;
    clientPromise = new Promise((resolve, reject) => {
      if (window.supabase) return resolve(window.supabase.createClient(config.url, config.anonKey));
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = () => resolve(window.supabase.createClient(config.url, config.anonKey));
      script.onerror = () => reject(new Error('تعذر تحميل مكتبة Supabase'));
      document.head.appendChild(script);
    });
    return clientPromise;
  }

  async function insertOrder(order) {
    if (sheets.endpoint) {
      try {
        const response = await fetch(sheets.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'createOrder', token: sheets.token || '', order })
        });
        if (!response.ok) throw new Error(`Google Sheets API returned ${response.status}`);
        const result = await response.json();
        if (!result.ok) throw new Error(result.error || 'تعذر حفظ الطلب في Google Sheets');
        return { persisted: true, order: result.order || order };
      } catch (error) {
        console.error('تعذر حفظ الطلب في Google Sheets؛ سيتم حفظ نسخة محلية', error);
        return { persisted: false, order, error };
      }
    }
    const client = await getClient();
    if (!client) return { persisted: false, order };
    try {
      const { data, error } = await client.rpc('submit_online_order', {
        p_customer_name: order.name,
        p_phone: order.phone,
        p_address: order.address || null,
        p_customer_code: order.code || null,
        p_items: order.items,
        p_location: order.location || null,
        p_ip: order.ip || null
      });
      if (error) throw error;
      return { persisted: true, order: data };
    } catch (error) {
      console.error('تعذر حفظ الطلب في Supabase؛ سيتم حفظ نسخة محلية', error);
      return { persisted: false, order, error };
    }
  }

  async function loadCustomization() {
    if (sheets.endpoint) {
      const response = await fetch(`${sheets.endpoint}?action=getSetting&key=customization&token=${encodeURIComponent(sheets.token || '')}`);
      if (!response.ok) throw new Error(`Google Sheets API returned ${response.status}`);
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || 'تعذر تحميل إعدادات الموقع');
      return result.value || null;
    }
    const client = await getClient();
    if (!client) return null;
    const { data, error } = await client.from('site_settings').select('value').eq('key', 'customization').maybeSingle();
    if (error) throw error;
    return data?.value || null;
  }

  async function saveCustomization(value) {
    if (sheets.endpoint) {
      const prepared = await uploadDataImages(value);
      await saveSheetSetting('customization', prepared);
      return true;
    }
    const client = await getClient();
    if (!client) return false;
    const { error } = await client.from('site_settings').upsert({ key: 'customization', value, updated_at: new Date().toISOString() });
    if (error) throw error;
    return true;
  }

  async function saveNotice(value) {
    if (sheets.endpoint) {
      await saveSheetSetting('notice', value);
      return true;
    }
    const client = await getClient();
    if (!client) return false;
    const { error } = await client.from('site_settings').upsert({ key: 'notice', value, updated_at: new Date().toISOString() });
    if (error) throw error;
    return true;
  }

  async function postSheets(payload) {
    const response = await fetch(sheets.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...payload, token: sheets.token || '' })
    });
    if (!response.ok) throw new Error(`Google Sheets API returned ${response.status}`);
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || 'تعذر حفظ إعدادات الموقع');
    return result;
  }

  async function saveSheetSetting(key, value) {
    return postSheets({ action: 'saveSettings', key, value });
  }

  async function uploadDataImage(dataUrl) {
    const result = await postSheets({
      action: 'uploadImage',
      data: dataUrl,
      name: `katanbuild-${Date.now()}.jpg`
    });
    return result.image;
  }

  async function uploadDataImages(value) {
    if (typeof value === 'string') {
      return value.startsWith('data:image/') ? uploadDataImage(value) : value;
    }
    if (Array.isArray(value)) return Promise.all(value.map(uploadDataImages));
    if (!value || typeof value !== 'object') return value;
    const entries = await Promise.all(Object.entries(value).map(async ([key, item]) => [key, await uploadDataImages(item)]));
    return Object.fromEntries(entries);
  }

  async function loadExchangeRate() {
    const client = await getClient();
    if (!client) return null;
    const { data, error } = await client.from('site_settings').select('value').eq('key', 'exchange_rate').maybeSingle();
    if (error) throw error;
    return Number(data?.value?.usd_to_syp || 0) || null;
  }

  async function subscribeToChanges(callback) {
    const client = await getClient();
    if (!client) return () => {};
    const channel = client.channel('katanbuild-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, callback)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, callback)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory' }, callback)
      .subscribe();
    return () => client.removeChannel(channel);
  }

  async function exportBackup(password) {
    const client = await getClient();
    if (!client) throw new Error('قاعدة البيانات غير مهيأة');
    const { data, error } = await client.rpc('export_accounting_backup', { p_password: password });
    if (error) throw error;
    return data;
  }

  async function loadAccountingSnapshot(password) {
    if (sheets.endpoint) {
      const response = await fetch(`${sheets.endpoint}?action=snapshot&token=${encodeURIComponent(sheets.token || '')}`);
      if (!response.ok) throw new Error(`Google Sheets API returned ${response.status}`);
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || 'تعذر تحميل بيانات المحاسبة');
      return result.snapshot;
    }
    const client = await getClient();
    if (!client) return null;
    const { data, error } = await client.rpc('get_accounting_snapshot', { p_password: password });
    if (error) throw error;
    return data;
  }

  async function issueInvoice(password, orderId) {
    const client = await getClient();
    if (!client) return null;
    const { data, error } = await client.rpc('issue_invoice', { p_password: password, p_order_id: orderId });
    if (error) throw error;
    return data;
  }

  async function liveSnapshot(password) {
    const client = await getClient();
    if (!client) return null;
    const { data, error } = await client.rpc('get_live_accounting_snapshot', { p_password: password });
    if (error) throw error;
    return data;
  }

  async function setExchangeRate(password, rate) {
    const client = await getClient();
    if (!client) return null;
    const { data, error } = await client.rpc('set_exchange_rate', { p_password: password, p_rate: rate });
    if (error) throw error;
    return data;
  }

  async function recordPayment(password, invoiceId, amount, currency, exchangeRate, notes) {
    const client = await getClient();
    if (!client) return null;
    const { data, error } = await client.rpc('record_invoice_payment', {
      p_password: password, p_invoice_id: invoiceId, p_amount: amount,
      p_currency: currency, p_exchange_rate: exchangeRate, p_notes: notes || null
    });
    if (error) throw error;
    return data;
  }

  async function recordCustomerLocation(orderId, latitude, longitude, accuracy) {
    const client = await getClient();
    if (!client) return null;
    const { data, error } = await client.rpc('record_customer_location', {
      p_order_id: orderId, p_latitude: latitude, p_longitude: longitude, p_accuracy: accuracy || null
    });
    if (error) throw error;
    return data;
  }

  async function upsertPresence(password, sessionId, label) {
    const client = await getClient();
    if (!client) return null;
    const { error } = await client.rpc('upsert_accounting_presence', { p_password: password, p_session_id: sessionId, p_label: label });
    if (error) throw error;
    return true;
  }

  window.KBBackend = {
    configured: loaded || Boolean(sheets.endpoint),
    getClient,
    insertOrder,
    loadCustomization,
    saveCustomization,
    saveNotice,
    loadExchangeRate,
    subscribeToChanges,
    exportBackup,
    loadAccountingSnapshot,
    issueInvoice,
    liveSnapshot,
    setExchangeRate,
    recordPayment,
    recordCustomerLocation,
    upsertPresence
  };
})();
