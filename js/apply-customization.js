/* =========================================================
   katanbuild — Apply Customization (v3 FIXED)
   يطبّق تعديلات لوحة التحكم على الصفحة فوراً
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

  // ---------- HERO IMAGES ----------
  function applyHeroImages(data) {
    if (!data.heroImages) return;
    const slides = $$('.hero-slide');
    slides.forEach((slide, i) => {
      if (data.heroImages[i]) {
        slide.style.backgroundImage = `url('${data.heroImages[i]}')`;
      }
    });
    // تحديث الـ background في الـ CSS var
    if (data.heroImages[0]) {
      document.documentElement.style.setProperty('--hero-image', `url('${data.heroImages[0]}')`);
    }
  }

  // ---------- HERO TEXT ----------
  function applyHeroText(data) {
    if (!data.hero) return;
    const heroH1 = $('.hero-content h1');
    if (heroH1 && data.hero.title) {
      const titleParts = (data.hero.title || '').split(/\s+/);
      if (titleParts.length > 2) {
        const last = titleParts.pop();
        const first = titleParts.join(' ');
        heroH1.innerHTML = `${first}<br /><span class="accent">${last}</span>`;
      } else {
        heroH1.textContent = data.hero.title;
      }
    }
    const heroLede = $('.hero-content .lede');
    if (heroLede && data.hero.subtitle) heroLede.textContent = data.hero.subtitle;
  }

  // ---------- CATEGORIES ----------
  function applyCategories(data) {
    if (!data.categories || !data.categories.length) return;
    const grid = $('#categories .product-grid') || $('.product-grid');
    if (!grid) return;
    const cards = $$('.product-card', grid);
    if (!cards.length) return;

    cards.forEach((card, i) => {
      const cat = data.categories[i];
      if (!cat) return;

      // الصورة المصغرة
      const thumb = $('.thumb', card);
      if (thumb && data.productImages && data.productImages[i]) {
        thumb.style.backgroundImage = `url('${data.productImages[i]}')`;
      }

      // العنوان
      const h3 = $('h3', card);
      if (h3 && cat.title) h3.textContent = cat.title;

      // الفئة
      const badge = $('.cat', card);
      if (badge && cat.category) badge.textContent = cat.category;

      // الوصف
      const p = $('p', card);
      if (p && cat.short) p.textContent = cat.short;

      // الرابط
      const link = card.querySelector('a');
      if (link && cat.slug) link.href = `product.html?slug=${cat.slug}`;
      if (cat.slug) card.setAttribute('data-slug', cat.slug);
    });
  }

  // ---------- WHY US ----------
  function applyWhyUs(data) {
    if (!data.whyUs) return;
    const cells = $$('.grid-4 .grid-cell');
    if (cells.length !== 4) return;
    cells.forEach((cell, i) => {
      const card = data.whyUs[i];
      if (!card) return;
      const h3 = $('h3', cell);
      const p = $('p', cell);
      if (h3 && card.title) h3.textContent = card.title;
      if (p && card.text) p.textContent = card.text;
    });
  }

  // ---------- PRODUCT PAGE ----------
  function applyProductPage(data) {
    if (!location.pathname.endsWith('product.html')) return;
    if (!window.SITE || !window.SITE.products) return;

    // استخدم البيانات من window.SITE كأساس
    // ثم طبّق أي تعديلات من لوحة التحكم
    const grid = $('.section-products .product-grid');
    if (!grid) return;

    const cards = $$('.product-card', grid);
    cards.forEach((card, i) => {
      // الصورة المصغرة - بناءً على imageIndex
      const thumb = $('.thumb', card);
      if (thumb && data.productImages) {
        const imageIndex = i % data.productImages.length;
        thumb.style.backgroundImage = `url('${data.productImages[imageIndex]}')`;
      }
    });
  }

  // ---------- APPLY ALL ----------
  function applyAll() {
    const data = getCustomization();
    if (!data) return;

    applyHeroImages(data);
    applyHeroText(data);
    applyCategories(data);
    applyWhyUs(data);
    applyProductPage(data);

    console.log('%c✓ katanbuild: تم تطبيق التعديلات', 'color:#22C55E;font-size:11px;');
  }

  // ---------- INIT ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAll);
  } else {
    applyAll();
  }

  // استمع لتحديثات اللوحة (نفس الصفحة)
  window.addEventListener('kb:customization', () => {
    console.log('🎨 kb:customization event received');
    applyAll();
  });

  // استمع لتحديثات التبويبات الأخرى
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      console.log('🎨 storage event received');
      applyAll();
    }
  });

  // إعادة تطبيق بعد تحميل محتوى ديناميكي (مثل product.html)
  document.addEventListener('site:refresh', applyAll);

  window.KBApply = { applyAll };

  console.log('%c🎨 katanbuild: Customization Ready', 'color:#E87722;font-size:11px;');
})();
