/* =========================================================
   katanbuild — Cart Drawer
   سلة جانبية للمنتجات + إرسال الطلب إلى localStorage
   ========================================================= */

(function () {
  'use strict';

  const CART_KEY = 'kb-cart';
  const ORDERS_KEY = 'katan_orders';
  const EXCHANGE_KEY = 'katan_exchange_rate';
  const PRICES_KEY = 'katan_prices';

  // ---------- STATE ----------
  let cart = [];

  // ---------- HELPERS ----------
  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch (e) { return []; }
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateBadge();
  }

  function getExchangeRate() {
    return parseInt(localStorage.getItem(EXCHANGE_KEY)) || 13000;
  }

  function getPrices() {
    try { return JSON.parse(localStorage.getItem(PRICES_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function getPriceFor(name) {
    const prices = getPrices();
    return prices[name] || 10;
  }

  function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>'"]/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[c]));
  }

  function formatMoney(amount) {
    return '$' + amount.toFixed(2);
  }

  // ---------- BADGE ----------
  function updateBadge() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    // Badge في الهيدر (إذا وجد)
    const badges = document.querySelectorAll('.kb-cart-badge .count');
    badges.forEach((b) => {
      b.textContent = total;
      b.dataset.count = total;
      b.style.display = total > 0 ? 'flex' : 'none';
    });
    // Badge في زر القائمة (إذا وجد)
    const navBadge = document.querySelector('#kbCartBtn .badge');
    if (navBadge) {
      navBadge.textContent = total;
      navBadge.style.display = total > 0 ? 'inline-flex' : 'none';
    }
  }

  // ---------- ADD ITEM ----------
  function addToCart(name, category, price) {
    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        name: name,
        category: category || '',
        price: price || getPriceFor(name),
        qty: 1
      });
    }
    saveCart();
    showAddToast(name);

    // تأثير على الزر
    const btn = document.querySelector(`[data-cart-add="${name}"]`);
    if (btn) {
      btn.classList.add('added');
      setTimeout(() => btn.classList.remove('added'), 600);
    }
  }

  // ---------- REMOVE ITEM ----------
  function removeFromCart(name) {
    cart = cart.filter((item) => item.name !== name);
    saveCart();
    renderCart();
  }

  // ---------- UPDATE QTY ----------
  function updateQty(name, delta) {
    const item = cart.find((i) => i.name === name);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart();
    renderCart();
  }

  function setQty(name, qty) {
    const item = cart.find((i) => i.name === name);
    if (!item) return;
    item.qty = Math.max(1, parseInt(qty) || 1);
    saveCart();
    renderCart();
  }

  // ---------- TOAST ----------
  function showAddToast(name) {
    document.querySelector('.kb-cart-toast')?.remove();

    const toast = document.createElement('div');
    toast.className = 'kb-cart-toast';
    toast.innerHTML = `
      <div class="icon">✓</div>
      <div class="text">
        <strong>أُضيف إلى الطلبية</strong>
        <small>${escapeHtml(name)}</small>
      </div>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2400);
  }

  // ---------- DRAWER BUILD ----------
  function buildDrawer() {
    const existing = document.getElementById('kbCartDrawer');
    if (existing) return existing;

    const overlay = document.createElement('div');
    overlay.className = 'kb-cart-overlay';
    overlay.id = 'kbCartOverlay';

    const drawer = document.createElement('aside');
    drawer.className = 'kb-cart-drawer';
    drawer.id = 'kbCartDrawer';
    drawer.innerHTML = `
      <div class="kb-cart-header">
        <h2>🛒 طلبية جديدة <span class="count-badge">0</span></h2>
        <button class="kb-cart-close" id="kbCartClose" aria-label="إغلاق">✕</button>
      </div>
      <div class="kb-cart-body" id="kbCartBody"></div>
      <div class="kb-cart-footer" id="kbCartFooter"></div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    // Close handlers
    overlay.addEventListener('click', closeCart);
    drawer.querySelector('#kbCartClose').addEventListener('click', closeCart);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCart();
    });

    return drawer;
  }

  // ---------- RENDER CART ----------
  function renderCart() {
    const body = document.getElementById('kbCartBody');
    const footer = document.getElementById('kbCartFooter');
    const countBadge = document.querySelector('.kb-cart-header .count-badge');

    if (!body || !footer) return;

    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    if (countBadge) countBadge.textContent = total;

    // Body
    if (!cart.length) {
      body.innerHTML = `
        <div class="kb-cart-empty">
          <div class="icon">🛒</div>
          <p>الطلبية فارغة حالياً.<br />أضف منتجات من الموقع لتظهر هنا.</p>
        </div>
      `;
      footer.innerHTML = '';
      return;
    }

    body.innerHTML = cart.map((item) => `
      <div class="kb-cart-item" data-cart-item="${escapeHtml(item.name)}">
        <div class="info">
          ${item.category ? `<div class="category">${escapeHtml(item.category)}</div>` : ''}
          <div class="name">${escapeHtml(item.name)}</div>
          <div class="price">${formatMoney(item.price)} × ${item.qty} = ${formatMoney(item.price * item.qty)}</div>
        </div>
        <div class="kb-qty">
          <button type="button" data-qty-minus="${escapeHtml(item.name)}" aria-label="تقليل">−</button>
          <input type="number" value="${item.qty}" min="1" data-qty-input="${escapeHtml(item.name)}" />
          <button type="button" data-qty-plus="${escapeHtml(item.name)}" aria-label="زيادة">+</button>
        </div>
      </div>
    `).join('');

    // Footer
    const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    const sypTotal = subtotal * getExchangeRate();

    footer.innerHTML = `
      <div class="kb-cart-total">
        <div class="label">الإجمالي التقديري</div>
        <div class="value">
          ${formatMoney(subtotal)}
          <small>≈ ${sypTotal.toFixed(0)} SYP</small>
        </div>
      </div>

      <form class="kb-cart-form" id="kbCartForm">
        <div class="kb-cart-field">
          <label>الاسم <span class="req">*</span></label>
          <input type="text" name="name" required placeholder="محمد أحمد" />
        </div>
        <div class="kb-cart-field">
          <label>رقم الهاتف <span class="req">*</span></label>
          <input type="tel" name="phone" required placeholder="09xxxxxxxx" />
        </div>
        <div class="kb-cart-field">
          <label>العنوان</label>
          <input type="text" name="address" placeholder="دمشق - جرمانا" />
        </div>
        <div class="kb-cart-field">
          <label>الكود الخاص (إذا كنت زبوناً دائماً)</label>
          <input type="text" name="code" placeholder="أدخل الكود" />
        </div>

        <div class="kb-cart-actions">
          <button type="submit" class="kb-btn kb-btn-primary">
            إرسال الطلب ←
          </button>
          <button type="button" class="kb-btn kb-btn-outline" id="kbCartClear">
            تفريغ
          </button>
        </div>

        <div class="kb-cart-status" id="kbCartStatus"></div>
      </form>
    `;

    // Wire events
    body.querySelectorAll('[data-qty-plus]').forEach((btn) => {
      btn.addEventListener('click', () => updateQty(btn.dataset.qtyPlus, 1));
    });
    body.querySelectorAll('[data-qty-minus]').forEach((btn) => {
      btn.addEventListener('click', () => updateQty(btn.dataset.qtyMinus, -1));
    });
    body.querySelectorAll('[data-qty-input]').forEach((input) => {
      input.addEventListener('change', () => setQty(input.dataset.qtyInput, input.value));
    });

    footer.querySelector('#kbCartForm').addEventListener('submit', submitOrder);
    footer.querySelector('#kbCartClear').addEventListener('click', () => {
      if (!confirm('هل تريد تفريغ الطلبية؟')) return;
      cart = [];
      saveCart();
      renderCart();
    });
  }

  // ---------- SUBMIT ORDER ----------
  function submitOrder(e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('kbCartStatus');
    const values = Object.fromEntries(new FormData(form));

    if (!values.name.trim() || !values.phone.trim()) {
      showStatus(status, 'يرجى إدخال الاسم ورقم الهاتف', 'error');
      return;
    }

    if (!cart.length) {
      showStatus(status, 'الطلبية فارغة', 'error');
      return;
    }

    showStatus(status, 'جار الإرسال...', '');

    // بناء الطلب بنفس تنسيق لوحة المحاسبة
    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    const order = {
      id: Date.now(),
      date: new Date().toLocaleString('ar-SY'),
      name: values.name.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      code: values.code.trim(),
      items: cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price
      })),
      total: total,
      source: 'online',      // ← يظهر في "طلبات الإنترنت" في لوحة المحاسبة
      status: 'pending',
      paid: 0,
      location: null,
      ip: null
    };

    // إضافة الموقع الجغرافي إن أمكن
    const finalize = (location, ip) => {
      order.location = location;
      order.ip = ip;

      // حفظ في localStorage (نفس مفتاح لوحة المحاسبة)
      let orders = [];
      try {
        orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      } catch (e) { orders = []; }
      orders.push(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

      // إشعار التبويبات الأخرى
      window.dispatchEvent(new CustomEvent('kb:order:new', { detail: order }));

      // نجاح
      cart = [];
      saveCart();
      showSuccess();
    };

    // محاولة جلب الموقع والـ IP
    Promise.all([
      new Promise((resolve) => {
        if (!navigator.geolocation) return resolve(null);
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => resolve(null),
          { enableHighAccuracy: true, timeout: 5000 }
        );
      }),
      fetch('https://api.ipify.org?format=json')
        .then((r) => r.json())
        .then((d) => d.ip)
        .catch(() => null)
    ]).then(([loc, ip]) => finalize(loc, ip));
  }

  // ---------- SUCCESS SCREEN ----------
  function showSuccess() {
    const body = document.getElementById('kbCartBody');
    const footer = document.getElementById('kbCartFooter');
    const countBadge = document.querySelector('.kb-cart-header .count-badge');
    if (countBadge) countBadge.textContent = '0';

    body.innerHTML = `
      <div class="kb-cart-success">
        <div class="check">✓</div>
        <h3>تم إرسال الطلبية</h3>
        <p>سيتم التواصل معك قريباً عبر الهاتف لتأكيد الطلب.</p>
      </div>
    `;
    footer.innerHTML = `
      <button class="kb-btn kb-btn-primary" id="kbCartDone" style="width:100%;">
        إغلاق
      </button>
    `;
    footer.querySelector('#kbCartDone').addEventListener('click', closeCart);
  }

  function showStatus(el, message, type) {
    el.textContent = message;
    el.className = 'kb-cart-status' + (type ? ' ' + type : '');
    if (type === 'error') {
      setTimeout(() => {
        if (el.textContent === message) {
          el.textContent = '';
          el.className = 'kb-cart-status';
        }
      }, 4000);
    }
  }

  // ---------- OPEN / CLOSE ----------
  function openCart() {
    buildDrawer();
    renderCart();
    document.getElementById('kbCartOverlay').classList.add('open');
    document.getElementById('kbCartDrawer').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    document.getElementById('kbCartOverlay')?.classList.remove('open');
    document.getElementById('kbCartDrawer')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ---------- GLOBAL EVENT DELEGATION ----------
  function initGlobalHandlers() {
    // أزرار الإضافة إلى السلة
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-cart-add]');
      if (addBtn) {
        e.preventDefault();
        const name = addBtn.dataset.cartAdd;
        const category = addBtn.dataset.cartCategory || '';
        const price = parseFloat(addBtn.dataset.cartPrice) || getPriceFor(name);
        addToCart(name, category, price);
      }

      // زر فتح السلة
      const openBtn = e.target.closest('[data-cart-open]');
      if (openBtn) {
        e.preventDefault();
        openCart();
      }
    });
  }

  // ---------- EXPOSE API ----------
  window.KBCart = {
    add: addToCart,
    remove: removeFromCart,
    open: openCart,
    close: closeCart,
    get: () => [...cart],
    count: () => cart.reduce((sum, i) => sum + i.qty, 0),
    clear: () => { cart = []; saveCart(); renderCart(); }
  };

  // ---------- INIT ----------
  function init() {
    cart = loadCart();
    updateBadge();
    initGlobalHandlers();
    buildDrawer();
    renderCart();

    console.log('%c🛒 katanbuild Cart Ready', 'color:#E87722;font-weight:bold;font-size:12px;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // إعادة التحديث عند تغيير اللغة
  document.addEventListener('site:refresh', () => {
    updateBadge();
    renderCart();
  });
})();
