/* =========================================================
   katanbuild — Apply Customization
   ========================================================= */

(function () {
  'use strict';

  const STORAGE_KEY = 'kb-site-customization';

  function getCustomization() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved && typeof saved === 'object') return saved;
    } catch (e) { }
    return null;
  }

  function $(sel, ctx = document) { return ctx.querySelector(sel); }
  function $$(sel, ctx = document) { return Array.from(ctx.querySelectorAll(sel)); }

  function applyHeroImages(data) {
    const slides = $$('.hero-slide');
    if (!slides.length || !data.heroImages) return;
    slides.forEach((slide, i) => {
      if (data.heroImages[i]) slide.style.backgroundImage = `url('${data.heroImages[i]}')`;
    });
  }

  function applyHeroText(data) {
    const heroH1 = $('.hero-content h1');
    if (heroH1 && data.hero) {
      const titleParts = (data.hero.title || '').split(/\s+/);
      if (titleParts.length > 2) {
        const last = titleParts.pop();
        const first = titleParts.join(' ');
        heroH1.innerHTML = `${first}<br /><span class="accent">${last}</span>`;
      } else {
        heroH1.textContent = data.hero.title || '';
      }
    }
    const heroLede = $('.hero-content .lede');
    if (heroLede && data.hero && data.hero.subtitle) heroLede.textContent = data.hero.subtitle;
  }

  function applyCategories(data) {
    if (!data.categories || !data.categories.length) return;
    const grids = $$('.product-grid');
    grids.forEach((grid) => {
      const cards = $$('.product-card', grid);
      if (!cards.length) return;
      const isHomeCategories = grid.closest('#categories') || cards.length === 4;
      const isProductsPage = location.pathname.endsWith('products.html');
      if (isHomeCategories || isProductsPage) {
        cards.forEach((card, i) => {
          const cat = data.categories[i];
          if (!cat) return;
          const h3 = $('h3', card);
          if (h3 && cat.title) h3.textContent = cat.title;
          const badge = $('.cat', card);
          if (badge && cat.category) badge.textContent = cat.category;
          const p = $('p', card);
          if (p && cat.short) p.textContent = cat.short;
          if (cat.slug && card.querySelector('a')) card.querySelector('a').href = `product.html?slug=${cat.slug}`;
          const thumb = $('.thumb', card);
          if (thumb && data.productImages && data.productImages[i]) thumb.style.backgroundImage = `url('${data.productImages[i]}')`;
        });
      }
    });
  }

  function applyWhyUs(data) {
    if (!data.whyUs) return;
    const cells = $$('.grid-4 .grid-cell');
    if (!cells.length) return;
    if (cells.length === 4) {
      cells.forEach((cell, i) => {
        const card = data.whyUs[i];
        if (!card) return;
        const h3 = $('h3', cell);
        const p = $('p', cell);
        if (h3 && card.title) h3.textContent = card.title;
        if (p && card.text) p.textContent = card.text;
      });
    }
  }

  function applyAll() {
    const data = getCustomization();
    if (!data) return;
    applyHeroImages(data);
    applyHeroText(data);
    applyCategories(data);
    applyWhyUs(data);
  }

  async function loadRemote() {
    if (!window.KBBackend?.configured) return;
    try {
      const data = await window.KBBackend.loadCustomization();
      if (!data) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      applyAll();
    } catch (error) {
      console.error('تعذر تحميل إعدادات الموقع', error);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyAll);
  else applyAll();
  loadRemote();

  window.addEventListener('kb:customization', applyAll);
  window.addEventListener('storage', (e) => { if (e.key === STORAGE_KEY) applyAll(); });

  window.KBApply = { applyAll };
})();
