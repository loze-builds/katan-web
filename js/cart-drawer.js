/* =========================================================
   katanbuild — Cart Drawer (FIXED)
   ========================================================= */

(function () {
  'use strict';

  const CART_KEY = 'kb-cart';
  const ORDERS_KEY = 'katan_orders';
  const EXCHANGE_KEY = 'katan_exchange_rate';
  const PRICES_KEY = 'katan_prices';

  let cart = [];
  let drawerBuilt = false;

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

  function updateBadge() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.kb-cart-badge .count').forEach((b) => {
      b.textContent = total;
      b.dataset.count = total;
      b.style.display = total > 0 ? 'flex' : 'none';
    });
  }

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

    const btn = document.querySelector(`[data-cart-add="${name}"]`);
    if (btn) {
      btn.classList.add('added');
      setTimeout(() => btn.classList.remove('added'), 600);
    }
  }

  function removeFromCart(name) {
    cart = cart.filter((item) => item.name !== name);
    saveCart();
    renderCart();
  }

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

  function buildDrawer() {
    if (drawerBuilt) return;
    if (document.getElementById('kbCartDrawer')) {
      drawerBuilt = true;
      return;
    }

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
    drawerBuilt = true;

    overlay.addEventListener('click', closeCart);
    drawer.querySelector('#kbCartClose').addEventListener('click', closeCart);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCart();
    });
  }

  function renderCart() {
    const body = document.getElementById('kbCartBody');
    const footer = document.getElementById('kbCartFooter');
    const countBadge = document.querySelector('.kb-cart-header .count-badge');

    if (!body || !footer) return;

    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    if (countBadge) countBadge.textContent = total;

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
        <label class="kb-cart-location-consent">
          <input type="checkbox" name="locationConsent" required />
          أوافق على مشاركة موقعي المباشر مع فريق التوصيل لمعالجة الطلب
        </label>
        <div class="kb-cart-location-status" id="kbCartLocationStatus">سيطلب المتصفح تحديد موقعك عند الإرسال.</div>

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

    if (!values.locationConsent) {
      showStatus(status, 'يجب الموافقة على مشاركة الموقع لإرسال الطلب.', 'error');
      return;
    }

    showStatus(status, 'جار تحديد الموقع وإرسال الطلب...', '');

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
      source: 'online',
      status: 'pending',
      paid: 0,
      location: null,
      ip: null
    };

    const finalize = (location, ip) => {
      order.location = location;
      order.ip = ip;

      const persist = window.KBBackend?.insertOrder
        ? window.KBBackend.insertOrder(order)
        : Promise.resolve({ persisted: false });
      persist.then((result) => {
        let orders = [];
        try { orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }
        catch (error) { console.error('تعذر قراءة الطلبات المحلية', error); }
        if (!result.persisted) {
          orders.push(order);
          localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
        }
        window.dispatchEvent(new CustomEvent('kb:order:new', { detail: result.order || order }));
        if (result.persisted && result.order?.id && navigator.geolocation && window.KBBackend?.recordCustomerLocation) {
          let lastSent = 0;
          const trackingId = navigator.geolocation.watchPosition((position) => {
            if (Date.now() - lastSent < 30000) return;
            lastSent = Date.now();
            window.KBBackend.recordCustomerLocation(result.order.id, position.coords.latitude, position.coords.longitude, position.coords.accuracy)
              .catch((error) => console.error('تعذر تحديث موقع الطلب', error));
          }, (error) => console.warn('توقف تتبع موقع الطلب', error), { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 });
          setTimeout(() => navigator.geolocation.clearWatch(trackingId), 30 * 60 * 1000);
        }
        cart = [];
        saveCart();
        showSuccess(result.persisted);
      }).catch((error) => {
        console.error('تعذر حفظ الطلب في قاعدة البيانات', error);
        showStatus(status, 'تعذر حفظ الطلب. حاول مرة أخرى.', 'error');
      });
    };

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

  function showSuccess(persisted) {
    const body = document.getElementById('kbCartBody');
    const footer = document.getElementById('kbCartFooter');
    const countBadge = document.querySelector('.kb-cart-header .count-badge');
    if (countBadge) countBadge.textContent = '0';

    body.innerHTML = `
      <div class="kb-cart-success">
        <div class="check">✓</div>
        <h3>تم إرسال الطلبية</h3>
        <p>سيتم التواصل معك قريباً عبر الهاتف لتأكيد الطلب.</p>
        ${persisted ? '' : '<small>تعذر الاتصال بقاعدة البيانات، فتم حفظ نسخة على هذا الجهاز مؤقتاً.</small>'}
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

  function openCart() {
    buildDrawer();
    const overlay = document.getElementById('kbCartOverlay');
    const drawer = document.getElementById('kbCartDrawer');
    if (!overlay || !drawer) return;

    renderCart();
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    const overlay = document.getElementById('kbCartOverlay');
    const drawer = document.getElementById('kbCartDrawer');
    if (!overlay || !drawer) return;

    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  function initGlobalHandlers() {
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-cart-add]');
      if (addBtn) {
        e.preventDefault();
        e.stopPropagation();
        const name = addBtn.dataset.cartAdd;
        const category = addBtn.dataset.cartCategory || '';
        const price = parseFloat(addBtn.dataset.cartPrice) || getPriceFor(name);
        addToCart(name, category, price);
        return;
      }

      const openBtn = e.target.closest('[data-cart-open]');
      if (openBtn) {
        e.preventDefault();
        e.stopPropagation();
        openCart();
      }
    });
  }

  window.KBCart = {
    add: addToCart,
    remove: removeFromCart,
    open: openCart,
    close: closeCart,
    get: () => [...cart],
    count: () => cart.reduce((sum, i) => sum + i.qty, 0),
    clear: () => { cart = []; saveCart(); renderCart(); }
  };

  function init() {
    cart = loadCart();
    updateBadge();
    initGlobalHandlers();
    if (window.KBBackend?.loadExchangeRate) {
      window.KBBackend.loadExchangeRate().then((rate) => {
        if (rate) localStorage.setItem(EXCHANGE_KEY, String(rate));
      }).catch((error) => console.error('تعذر تحميل سعر الصرف', error));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('site:refresh', () => {
    updateBadge();
  });

  console.log('%c🛒 katanbuild Cart Ready', 'color:#E87722;font-weight:bold;font-size:12px;');
})();
