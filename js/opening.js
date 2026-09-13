(function () {
  'use strict';
  const STORAGE_KEY = 'kb-site-customization';
  const defaults = {
    enabled: true,
    duration: 4000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85',
    kicker: 'katanbuild presents',
    title: 'كيمياء البناء تصنع الفرق.',
    subtitle: 'مواد تبني نتائج تدوم.'
  };
  function read() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return { ...defaults, ...(data?.opening || {}) };
    } catch (error) { return defaults; }
  }
  function esc(value) { return String(value || '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
  function finish(screen) {
    screen.classList.add('is-done');
    window.setTimeout(() => screen.remove(), 700);
  }
  function show(config) {
    if (!config.enabled || sessionStorage.getItem('kb-opening-seen') === '1') return;
    showScreen(config);
  }
  function showScreen(config) {
    const screen = document.createElement('div');
    screen.className = 'kb-opening';
    screen.setAttribute('role', 'dialog');
    screen.setAttribute('aria-label', 'مقدمة katanbuild');
    screen.innerHTML = `<div class="kb-opening-bg"></div><div class="kb-opening-content"><img class="kb-opening-logo" src="assets/katanbuild-logo-dark.png" alt="katanbuild"><div class="kb-opening-kicker">${esc(config.kicker)}</div><h1 class="kb-opening-title">${esc(config.title)}</h1><div class="kb-opening-line"></div><p class="kb-opening-subtitle">${esc(config.subtitle)}</p></div><button class="kb-opening-skip" type="button">تخطي المقدمة</button>`;
    screen.querySelector('.kb-opening-bg').style.setProperty('--kb-opening-image', `url("${config.image}")`);
    document.body.prepend(screen);
    screen.querySelector('.kb-opening-skip').addEventListener('click', () => { sessionStorage.setItem('kb-opening-seen', '1'); finish(screen); });
    window.setTimeout(() => { sessionStorage.setItem('kb-opening-seen', '1'); finish(screen); }, Math.max(1500, Number(config.duration) || 4000));
  }
  function boot() {
    const config = read();
    if (!config.enabled || sessionStorage.getItem('kb-opening-seen') === '1') return;
    show(config);
    if (window.KBBackend?.configured) {
      window.KBBackend.loadCustomization().then(remote => {
        if (remote?.opening) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
        }
        window.KBOpeningPreview = function (config) {
          const existing = document.querySelector('.kb-opening');
          if (existing) existing.remove();
          showScreen({ ...defaults, ...config, enabled: true });
        };
      }).catch(error => console.error('تعذر تحميل إعدادات الافتتاحية', error));
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}());
