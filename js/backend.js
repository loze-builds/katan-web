(function () {
  'use strict';

  const config = window.KB_SUPABASE_CONFIG || {};
  const loaded = config.url && config.anonKey;
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
    const client = await getClient();
    if (!client) return { persisted: false, order };
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
  }

  async function loadCustomization() {
    const client = await getClient();
    if (!client) return null;
    const { data, error } = await client.from('site_settings').select('value').eq('key', 'customization').maybeSingle();
    if (error) throw error;
    return data?.value || null;
  }

  async function saveCustomization(value) {
    const client = await getClient();
    if (!client) return false;
    const { error } = await client.from('site_settings').upsert({ key: 'customization', value, updated_at: new Date().toISOString() });
    if (error) throw error;
    return true;
  }

  async function saveNotice(value) {
    const client = await getClient();
    if (!client) return false;
    const { error } = await client.from('site_settings').upsert({ key: 'notice', value, updated_at: new Date().toISOString() });
    if (error) throw error;
    return true;
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
    configured: loaded,
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
