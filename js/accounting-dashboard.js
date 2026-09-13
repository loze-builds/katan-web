(function () {
  'use strict';

  const ROOT = document.getElementById('accountingRoot');
  const PASSWORD = '1990';
  const ORDERS_KEY = 'katan_orders';
  const PRICES_KEY = 'katan_prices';
  const STOCK_KEY = 'katan_inventory';
  const MOVES_KEY = 'katan_stock_moves';
  const INVOICES_KEY = 'katan_invoices';
  const state = { tab: 'overview' };
  let unsubscribe = null;
  let liveData = { payments: [], locations: [], presence: [], exchange_rate: { usd_to_syp: 13000 } };
  let accountingMap;
  const presenceSession = crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}`;

  function read(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value ?? fallback;
    } catch (error) {
      console.error(`تعذر قراءة ${key}`, error);
      return fallback;
    }
  }
  function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function esc(value) { return String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
  function money(value) { return `${Number(value || 0).toFixed(2)} $`; }
  function orders() { return read(ORDERS_KEY, []); }
  function prices() { return read(PRICES_KEY, {}); }
  function inventory() { return read(STOCK_KEY, {}); }
  function exchangeRate() { return Number(liveData.exchange_rate?.usd_to_syp || localStorage.getItem('katan_exchange_rate') || 13000); }
  function invoiceFor(order) { return read(INVOICES_KEY, []).find(item => item.orderId === order.id); }

  function renderLogin() {
    ROOT.innerHTML = `<div class="accounting-login"><div class="accounting-card">
      <div class="accounting-brand"><img src="assets/katanbuild-logo-dark.png" alt="katanbuild"><strong>لوحة المحاسبة</strong></div>
      <p class="accounting-muted">هذه الصفحة مخصصة للمحاسب فقط. لا تشارك الرابط أو كلمة المرور.</p>
      <form id="accountingLogin"><label class="accounting-field">كلمة المرور<input id="accountingPassword" type="password" inputmode="numeric" autocomplete="current-password" required></label><div id="accountingError" class="accounting-error"></div><button class="accounting-button primary" type="submit">دخول آمن</button></form>
    </div></div>`;
    ROOT.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      if (ROOT.querySelector('#accountingPassword').value !== PASSWORD) {
        ROOT.querySelector('#accountingError').textContent = 'كلمة المرور غير صحيحة';
        return;
      }
      sessionStorage.setItem('kb-accountant-auth', '1');
      renderApp();
    });
  }

  function renderApp() {
    const nav = [['overview', 'نظرة عامة'], ['orders', 'الطلبات والفواتير'], ['customers', 'تتبع العميل'], ['inventory', 'المخزون'], ['prices', 'أسعار المواد'], ['moves', 'صادر ووارد'], ['settings', 'الإعدادات']];
    ROOT.innerHTML = `<div class="container accounting-shell">
      <aside class="accounting-sidebar"><div class="accounting-brand"><img src="assets/katanbuild-logo-dark.png" alt="katanbuild"><strong>المحاسبة</strong></div>
        <nav class="accounting-nav">${nav.map(([id, label]) => `<button class="${state.tab === id ? 'active' : ''}" data-tab="${id}">${label}</button>`).join('')}</nav>
        <button class="accounting-button" id="accountingLogout" style="width:100%;margin-top:18px">تسجيل الخروج</button>
      </aside>
      <section class="accounting-main"><div class="accounting-topbar"><div><h1>${nav.find(item => item[0] === state.tab)[1]}</h1><p class="accounting-muted">تحديث مباشر من الطلبات المسجلة على هذا المتصفح</p></div><div><button class="accounting-button" id="themeAccounting">تبديل المظهر</button> <button class="accounting-button" onclick="window.print()">طباعة</button></div></div><div id="accountingContent"></div></section>
    </div>`;
    ROOT.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => { state.tab = button.dataset.tab; renderApp(); }));
    ROOT.querySelector('#accountingLogout').addEventListener('click', () => { sessionStorage.removeItem('kb-accountant-auth'); renderLogin(); });
    ROOT.querySelector('#themeAccounting').addEventListener('click', () => {
      const html = document.documentElement;
      html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('kb-theme', html.dataset.theme);
    });
    ({ overview: renderOverview, orders: renderOrders, customers: renderCustomers, inventory: renderInventory, prices: renderPrices, moves: renderMoves, settings: renderSettings })[state.tab]();
    hydrateFromDatabase();
    if (window.KBBackend?.upsertPresence) {
      window.KBBackend.upsertPresence(PASSWORD, presenceSession, 'محاسب').catch(error => console.error('تعذر تحديث حضور المحاسب', error));
    }
  }

  async function hydrateFromDatabase() {
    if (!window.KBBackend?.configured) return;
    try {
      const snapshot = await window.KBBackend.loadAccountingSnapshot(PASSWORD);
      if (!snapshot) return;
      if (Array.isArray(snapshot.orders)) {
        write(ORDERS_KEY, snapshot.orders.map(order => ({
          ...order,
          id: order.id,
          name: order.customer_name,
          date: order.created_at,
          paid: order.paid || 0
        })));
      }
      if (Array.isArray(snapshot.products)) {
        const remotePrices = {};
        snapshot.products.forEach(product => { remotePrices[product.name] = Number(product.price || 0); });
        write(PRICES_KEY, remotePrices);
      }
      if (Array.isArray(snapshot.inventory)) {
        const stock = {};
        snapshot.inventory.forEach(item => { stock[item.product_name || item.product_id] = Number(item.quantity || 0); });
        write(STOCK_KEY, stock);
      }
      liveData = await window.KBBackend.liveSnapshot(PASSWORD) || liveData;
      localStorage.setItem('katan_exchange_rate', String(exchangeRate()));
      renderAppFromDatabaseOnce();
      if (!unsubscribe && window.KBBackend.subscribeToChanges) {
        unsubscribe = await window.KBBackend.subscribeToChanges(() => {
          showLiveAlert('تم تحديث لوحة المحاسبة لحظياً');
          hydrated = false;
          hydrateFromDatabase();
        });
      }
    } catch (error) {
      console.error('تعذر مزامنة لوحة المحاسبة', error);
    }
  }

  let hydrated = false;
  function renderAppFromDatabaseOnce() {
    if (hydrated) return;
    hydrated = true;
    renderApp();
  }

  function renderOverview() {
    const list = orders();
    const pending = list.filter(order => order.status === 'pending').length;
    const revenue = list.reduce((sum, order) => sum + Number(order.total || 0), 0);
    const stock = Object.values(inventory()).reduce((sum, value) => sum + Number(value || 0), 0);
    ROOT.querySelector('#accountingContent').innerHTML = `<div class="accounting-grid">
      <div class="accounting-card accounting-stat"><span>إجمالي الطلبات</span><strong>${list.length}</strong></div>
      <div class="accounting-card accounting-stat"><span>طلبات قيد المعالجة</span><strong>${pending}</strong></div>
      <div class="accounting-card accounting-stat"><span>قيمة الطلبات</span><strong>${money(revenue)}<small>≈ ${(revenue * exchangeRate()).toLocaleString('ar-SY')} ل.س</small></strong></div>
      <div class="accounting-card accounting-stat"><span>الوحدات في المخزن</span><strong>${stock}</strong></div>
    </div><div class="accounting-card"><h2>آخر الطلبات الواردة من المتجر</h2><p class="accounting-muted">سعر الصرف الحالي: 1$ = ${exchangeRate().toLocaleString('ar-SY')} ل.س</p>${orderTable(list.slice(-8).reverse())}</div>`;
    bindInvoiceButtons();
  }

  function orderTable(list) {
    if (!list.length) return '<p class="accounting-muted">لا توجد طلبات حتى الآن.</p>';
    return `<div class="accounting-table-wrap"><table class="accounting-table"><thead><tr><th>العميل</th><th>التاريخ</th><th>المواد</th><th>الإجمالي</th><th>الحالة</th><th>إجراء</th></tr></thead><tbody>${list.map(order => `<tr><td>${esc(order.name)}<br><small>${esc(order.phone)}</small></td><td>${esc(order.date)}</td><td>${(order.items || []).map(item => `${esc(item.name)} × ${item.qty}`).join('<br>')}</td><td>${money(order.total)}<br><small>≈ ${(Number(order.total || 0) * exchangeRate()).toLocaleString('ar-SY')} ل.س</small></td><td><span class="accounting-badge">${esc(order.status || 'pending')}</span></td><td><button class="accounting-button primary" data-invoice="${esc(order.id)}">فاتورة</button><button class="accounting-button" data-payment="${esc(order.id)}">دفعة</button></td></tr>`).join('')}</tbody></table></div>`;
  }

  function renderOrders() {
    const list = orders().slice().reverse();
    ROOT.querySelector('#accountingContent').innerHTML = `<div class="accounting-card"><h2>الفواتير والطلبات</h2><div class="accounting-form"><label class="accounting-field">بحث بالاسم أو الهاتف<input id="invoiceSearch" placeholder="ابحث"></label><label class="accounting-field">الحالة<select id="invoiceStatus"><option value="">كل الفواتير</option><option value="issued">غير مكتملة</option><option value="paid">مدفوعة</option><option value="prepaid">مدفوعة مسبقاً</option></select></label><label class="accounting-field">التاريخ<input id="invoiceDate" type="date"></label></div><div id="invoiceResults" style="margin-top:18px">${invoiceGroups(list)}</div></div>`;
    bindInvoiceButtons();
    const filter = () => {
      const query = ROOT.querySelector('#invoiceSearch').value.trim().toLowerCase();
      const status = ROOT.querySelector('#invoiceStatus').value;
      const date = ROOT.querySelector('#invoiceDate').value;
      const filtered = list.filter(order => (!query || `${order.name} ${order.phone}`.toLowerCase().includes(query)) && (!date || String(order.date).startsWith(date)) && (!status || (status === 'paid' ? Number(order.paid) >= Number(order.total) : status === 'prepaid' ? Number(order.paid) > 0 && Number(order.paid) < Number(order.total) : status === 'issued' ? Number(order.paid) < Number(order.total) : true)));
      ROOT.querySelector('#invoiceResults').innerHTML = invoiceGroups(filtered);
      bindInvoiceButtons();
    };
    ['invoiceSearch', 'invoiceStatus', 'invoiceDate'].forEach(id => ROOT.querySelector('#' + id).addEventListener('input', filter));
  }

  function invoiceGroups(list) {
    const groups = {};
    list.forEach(order => {
      const day = String(order.date || '').slice(0, 10) || 'غير محدد';
      groups[day] ||= [];
      groups[day].push(order);
    });
    return Object.entries(groups).map(([day, items]) => `<section style="margin-bottom:20px"><h3 style="font-size:1rem;margin-bottom:8px">فواتير يوم ${esc(day)}</h3>${orderTable(items)}</section>`).join('') || '<p class="accounting-muted">لا توجد فواتير مطابقة.</p>';
  }

  function renderCustomers() {
    const grouped = {};
    orders().forEach(order => {
      const key = order.phone || order.name;
      grouped[key] ||= { name: order.name, phone: order.phone, total: 0, paid: 0, orders: 0, last: order.date };
      grouped[key].total += Number(order.total || 0);
      grouped[key].paid += Number(order.paid || 0);
      grouped[key].orders += 1;
    });
    const customers = Object.values(grouped);
    ROOT.querySelector('#accountingContent').innerHTML = `<div class="accounting-card"><h2>تتبع العميل والديون</h2><p class="accounting-muted">ابحث باسم العميل أو رقم الهاتف. يتم احتساب الرصيد المتبقي بالدولار مع المقابل بالليرة السورية.</p><div class="accounting-form"><label class="accounting-field">بحث<input id="customerSearch" placeholder="اسم العميل"></label></div><div class="accounting-table-wrap" style="margin-top:18px"><table class="accounting-table"><thead><tr><th>العميل</th><th>الطلبات</th><th>الإجمالي</th><th>المدفوع</th><th>المتبقي</th><th>آخر تعامل</th></tr></thead><tbody id="customerRows">${customerRows(customers)}</tbody></table></div></div><div class="accounting-card"><h2>الخريطة المباشرة</h2><p class="accounting-muted">الأحمر موقع العميل المصرّح به، والأزرق موقع المحاسب الحالي. التتبع المستمر يتطلب إبقاء صفحة الطلب مفتوحة وموافقة العميل.</p><div id="accountingMap" class="accounting-map"></div><div id="routeResult" class="accounting-muted" style="margin-top:10px"></div></div>`;
    ROOT.querySelector('#customerSearch').addEventListener('input', event => {
      const query = event.target.value.toLowerCase();
      ROOT.querySelector('#customerRows').innerHTML = customerRows(customers.filter(customer => `${customer.name} ${customer.phone}`.toLowerCase().includes(query)));
    });
    renderTrackingMap();
  }

  function renderTrackingMap() {
    if (!window.L) return;
    if (accountingMap) accountingMap.remove();
    accountingMap = L.map('accountingMap').setView([33.5138, 36.2765], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(accountingMap);
    const points = (liveData.locations || []).slice(0, 50);
    points.forEach(point => {
      const marker = L.marker([point.latitude, point.longitude], { icon: L.divIcon({ className: 'kb-live-marker', html: '<span style="display:block;width:18px;height:18px;border-radius:50%;background:#ef4444;border:3px solid #fff;box-shadow:0 0 0 8px rgba(239,68,68,.25),0 0 0 16px rgba(239,68,68,.1);"></span>', iconSize: [18, 18] }) }).addTo(accountingMap);
      marker.bindPopup(`موقع الطلب: ${esc(point.order_id)}<br><button data-route-lat="${point.latitude}" data-route-lng="${point.longitude}" class="accounting-button primary" style="margin-top:8px">احسب المسافة والطرق</button>`);
    });
    navigator.geolocation?.getCurrentPosition(position => {
      const here = [position.coords.latitude, position.coords.longitude];
      L.marker(here, { icon: L.divIcon({ className: 'kb-company-marker', html: '<span style="display:block;width:16px;height:16px;border-radius:50%;background:#2563eb;border:3px solid #fff;"></span>', iconSize: [16, 16] }) }).addTo(accountingMap).bindPopup('موقع المحاسب الحالي');
      if (points[0]) drawRoute(here, [points[0].latitude, points[0].longitude]);
    });
    ROOT.querySelector('#accountingMap').addEventListener('click', event => {
      const button = event.target.closest('[data-route-lat]');
      if (!button) return;
      navigator.geolocation?.getCurrentPosition(position => drawRoute([position.coords.latitude, position.coords.longitude], [Number(button.dataset.routeLat), Number(button.dataset.routeLng)]));
    });
  }

  async function drawRoute(from, to) {
    try {
      const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=false`);
      const data = await response.json();
      const route = data.routes?.[0];
      if (route) ROOT.querySelector('#routeResult').textContent = `المسافة: ${(route.distance / 1000).toFixed(1)} كم — الزمن التقريبي: ${Math.round(route.duration / 60)} دقيقة`;
    } catch (error) {
      console.error('تعذر حساب المسار', error);
      ROOT.querySelector('#routeResult').textContent = 'تعذر حساب الطريق حالياً.';
    }
  }

  function customerRows(customers) {
    return customers.map(customer => `<tr><td>${esc(customer.name)}<br><small>${esc(customer.phone)}</small></td><td>${customer.orders}</td><td>${money(customer.total)}</td><td>${money(customer.paid)}<br><small>${(customer.paid * exchangeRate()).toLocaleString('ar-SY')} ل.س</small></td><td><strong>${money(customer.total - customer.paid)}</strong><br><small>${((customer.total - customer.paid) * exchangeRate()).toLocaleString('ar-SY')} ل.س</small></td><td>${esc(customer.last)}</td></tr>`).join('') || '<tr><td colspan="6">لا توجد نتائج.</td></tr>';
  }

  function renderSettings() {
    ROOT.querySelector('#accountingContent').innerHTML = `<div class="accounting-card"><h2>إعدادات المحاسبة</h2><form class="accounting-form" id="rateForm"><label class="accounting-field">سعر الدولار بالليرة السورية<input name="rate" type="number" min="1" step="0.01" value="${exchangeRate()}" required></label><button class="accounting-button primary" type="submit">حفظ سعر الصرف</button></form><p class="accounting-muted" style="margin-top:14px">كل فاتورة بالدولار تعرض المقابل التقريبي بالليرة حسب هذا السعر.</p></div><div class="accounting-card"><h2>الحضور المباشر</h2><div>${(liveData.presence || []).map(item => `<p>${esc(item.label)} — ${esc(item.last_seen_at)}</p>`).join('') || 'لا توجد جلسات نشطة'}</div></div>`;
    ROOT.querySelector('#rateForm').addEventListener('submit', async event => {
      event.preventDefault();
      const rate = Number(new FormData(event.target).get('rate'));
      try {
        if (window.KBBackend?.configured) await window.KBBackend.setExchangeRate(PASSWORD, rate);
        localStorage.setItem('katan_exchange_rate', String(rate));
        liveData.exchange_rate = { usd_to_syp: rate };
        renderApp();
      } catch (error) { console.error(error); alert('تعذر حفظ سعر الصرف'); }
    });
  }

  function showLiveAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'accounting-alert';
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3500);
  }

  function bindInvoiceButtons() {
    ROOT.querySelectorAll('[data-invoice]').forEach(button => button.addEventListener('click', () => createInvoice(button.dataset.invoice)));
    ROOT.querySelectorAll('[data-payment]').forEach(button => button.addEventListener('click', () => collectPayment(button.dataset.payment)));
  }

  async function collectPayment(orderId) {
    const order = orders().find(item => String(item.id) === String(orderId));
    if (!order || !window.KBBackend?.configured) return alert('يجب إصدار الفاتورة أولاً.');
    const amount = Number(prompt('أدخل قيمة الدفعة بالدولار:'));
    if (!amount || amount <= 0) return;
    try {
      const invoice = await window.KBBackend.issueInvoice(PASSWORD, orderId);
      await window.KBBackend.recordPayment(PASSWORD, invoice.id, amount, 'USD', exchangeRate(), 'دفعة من لوحة المحاسبة');
      showLiveAlert('تم تسجيل الدفعة وتحديث رصيد العميل');
      hydrateFromDatabase();
    } catch (error) {
      console.error('تعذر تسجيل الدفعة', error);
      alert('تعذر تسجيل الدفعة');
    }
  }

  function createInvoice(orderId) {
    const order = orders().find(item => item.id === orderId);
    if (!order) return;
    if (window.KBBackend?.configured) {
      window.KBBackend.issueInvoice(PASSWORD, orderId).then(invoice => {
        if (invoice) alert(`تم إصدار الفاتورة ${invoice.invoice_number}`);
        renderOrders();
      }).catch(error => {
        console.error('تعذر إصدار الفاتورة', error);
        alert('تعذر إصدار الفاتورة من قاعدة البيانات');
      });
      return;
    }
    const invoices = read(INVOICES_KEY, []);
    let invoice = invoices.find(item => item.orderId === orderId);
    if (!invoice) {
      invoice = { id: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(4, '0')}`, orderId, date: new Date().toLocaleString('ar-SY'), status: 'issued' };
      invoices.push(invoice);
      write(INVOICES_KEY, invoices);
    }
    alert(`تم إصدار الفاتورة ${invoice.id} للطلب ${order.name}`);
    renderOrders();
  }

  function renderPrices() {
    const priceMap = prices();
    const names = [...new Set(orders().flatMap(order => order.items.map(item => item.name)))];
    ROOT.querySelector('#accountingContent').innerHTML = `<div class="accounting-card"><h2>أسعار المواد</h2><form class="accounting-form" id="priceForm"><label class="accounting-field">المادة<select name="name" required>${names.map(name => `<option value="${esc(name)}">${esc(name)}</option>`).join('')}</select></label><label class="accounting-field">السعر بالدولار<input name="price" type="number" min="0" step="0.01" required></label><button class="accounting-button primary" type="submit">حفظ السعر</button></form><div class="accounting-table-wrap" style="margin-top:18px"><table class="accounting-table"><thead><tr><th>المادة</th><th>السعر الحالي</th></tr></thead><tbody>${names.map(name => `<tr><td>${esc(name)}</td><td>${money(priceMap[name] || 0)}</td></tr>`).join('')}</tbody></table></div></div>`;
    const form = ROOT.querySelector('#priceForm');
    form.addEventListener('submit', event => { event.preventDefault(); const values = Object.fromEntries(new FormData(form)); priceMap[values.name] = Number(values.price); write(PRICES_KEY, priceMap); renderPrices(); });
  }

  function renderInventory() {
    const stock = inventory();
    const names = [...new Set(orders().flatMap(order => order.items.map(item => item.name)))];
    ROOT.querySelector('#accountingContent').innerHTML = `<div class="accounting-card"><h2>مخزون المستودع</h2><form class="accounting-form" id="stockForm"><label class="accounting-field">المادة<select name="name">${names.map(name => `<option value="${esc(name)}">${esc(name)}</option>`).join('')}</select></label><label class="accounting-field">الرصيد<input name="quantity" type="number" min="0" required></label><button class="accounting-button primary" type="submit">تحديث الرصيد</button></form><div class="accounting-table-wrap" style="margin-top:18px"><table class="accounting-table"><thead><tr><th>المادة</th><th>الرصيد</th><th>الحالة</th></tr></thead><tbody>${names.map(name => `<tr><td>${esc(name)}</td><td>${Number(stock[name] || 0)}</td><td>${Number(stock[name] || 0) < 5 ? '<span class="accounting-badge">منخفض</span>' : '<span class="accounting-badge">متاح</span>'}</td></tr>`).join('')}</tbody></table></div></div>`;
    ROOT.querySelector('#stockForm').addEventListener('submit', event => { event.preventDefault(); const values = Object.fromEntries(new FormData(event.target)); stock[values.name] = Number(values.quantity); write(STOCK_KEY, stock); renderInventory(); });
  }

  function renderMoves() {
    const moves = read(MOVES_KEY, []);
    ROOT.querySelector('#accountingContent').innerHTML = `<div class="accounting-card"><h2>حركات الصادر والوارد</h2><form class="accounting-form" id="moveForm"><label class="accounting-field">المادة<input name="name" required></label><label class="accounting-field">النوع<select name="type"><option value="incoming">وارد</option><option value="outgoing">صادر</option></select></label><label class="accounting-field">الكمية<input name="quantity" type="number" min="1" required></label><button class="accounting-button primary" type="submit">تسجيل الحركة</button></form><div class="accounting-table-wrap" style="margin-top:18px"><table class="accounting-table"><thead><tr><th>التاريخ</th><th>المادة</th><th>النوع</th><th>الكمية</th></tr></thead><tbody>${moves.slice().reverse().map(move => `<tr><td>${esc(move.date)}</td><td>${esc(move.name)}</td><td>${move.type === 'incoming' ? 'وارد' : 'صادر'}</td><td>${move.quantity}</td></tr>`).join('')}</tbody></table></div></div>`;
    ROOT.querySelector('#moveForm').addEventListener('submit', event => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(event.target));
      const item = { name: values.name.trim(), type: values.type, quantity: Number(values.quantity), date: new Date().toLocaleString('ar-SY') };
      if (!item.name || item.quantity < 1) return;
      moves.push(item); write(MOVES_KEY, moves);
      const stock = inventory(); stock[item.name] = Math.max(0, Number(stock[item.name] || 0) + (item.type === 'incoming' ? item.quantity : -item.quantity)); write(STOCK_KEY, stock);
      renderMoves();
    });
  }

  const savedTheme = localStorage.getItem('kb-theme');
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  setInterval(() => {
    if (sessionStorage.getItem('kb-accountant-auth') === '1' && window.KBBackend?.upsertPresence) {
      window.KBBackend.upsertPresence(PASSWORD, presenceSession, 'محاسب').catch(error => console.error('تعذر تحديث حضور المحاسب', error));
    }
  }, 30000);
  if (sessionStorage.getItem('kb-accountant-auth') === '1') renderApp(); else renderLogin();
})();
