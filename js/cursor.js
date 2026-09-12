/* =========================================================
   katanbuild — Custom Cursor (KERN Style)
   ========================================================= */

(function () {
  'use strict';

  // تجاهل على الأجهزة اللمسية
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return;
  }

  // تجاهل إذا كان مفعّلاً
  if (document.querySelector('.kb-cursor')) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let dotX = mouseX;
  let dotY = mouseY;
  let rafId = null;

  function init() {
    // 1) أنشئ العناصر
    const cursor = document.createElement('div');
    cursor.className = 'kb-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);

    const dot = document.createElement('div');
    dot.className = 'kb-cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    // 2) فعّل إخفاء المؤشر العادي — الآن فقط!
    document.body.classList.add('kb-cursor-ready');

    // 3) تتبع الماوس
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
      dot.style.opacity = '1';
    }, { passive: true });

    // 4) حلقة الرسوم
    function animate() {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
    }
    animate();

    // 5) Hover على عناصر تفاعلية
    const hoverSelector = 'a, button, [data-cart-add], [data-cart-open], .product-card, .nav-link, .icon-btn, .kb-add-btn, .grid-cell, .project-card, .btn';

    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (target.closest(hoverSelector)) {
        cursor.classList.add('hover');
      }
      if (target.matches('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="password"], textarea')) {
        cursor.classList.add('text');
        cursor.classList.remove('hover');
      }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
      const target = e.target;
      if (target.closest(hoverSelector)) {
        cursor.classList.remove('hover');
      }
      if (target.matches('input, textarea')) {
        cursor.classList.remove('text');
      }
    }, { passive: true });

    // 6) الضغط
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));

    // 7) إخفاء عند مغادرة النافذة
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      dot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      dot.style.opacity = '1';
    });

    // 8) على اللمس — أخفِ
    window.addEventListener('touchstart', () => {
      document.body.classList.remove('kb-cursor-ready');
      cursor.style.display = 'none';
      dot.style.display = 'none';
      if (rafId) cancelAnimationFrame(rafId);
    }, { passive: true, once: true });

    console.log('%c🎯 katanbuild Cursor Ready', 'color:#E87722;font-weight:bold;font-size:12px;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
