/* =========================================================
   katanbuild — Collapsible Navigation
   تحويل القائمة الأفقية إلى منسدلة عند النزول + زر يدوي
   ========================================================= */

(function () {
  'use strict';

  const STORAGE_KEY = 'kb-nav-collapsed';
  const SCROLL_THRESHOLD = 150;
  const MOBILE_BREAKPOINT = 920;

  let manualOverride = null;
  let isCollapsed = false;

  function getHeader() {
    return document.getElementById('site-header');
  }

  function getToggleBtn() {
    return document.getElementById('navToggleBtn');
  }

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function setCollapsed(collapsed) {
    const header = getHeader();
    if (!header) return;

    isCollapsed = collapsed;
    header.classList.toggle('nav-collapsed', collapsed);

    if (!collapsed) {
      header.classList.remove('nav-open');
    }

    const btn = getToggleBtn();
    if (btn) {
      btn.title = collapsed ? 'توسيع القائمة' : 'تصغير القائمة';
    }
  }

  function updateFromScroll() {
    if (isMobile()) {
      setCollapsed(false);
      return;
    }

    const scrollY = window.scrollY;

    if (manualOverride === false) {
      setCollapsed(false);
      return;
    }

    if (manualOverride === true) {
      setCollapsed(true);
      return;
    }

    if (scrollY > SCROLL_THRESHOLD) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }

  function handleToggleClick() {
    const header = getHeader();
    if (!header) return;

    if (isCollapsed) {
      const isOpen = header.classList.contains('nav-open');
      if (isOpen) {
        header.classList.remove('nav-open');
      } else {
        header.classList.add('nav-open');
      }
    } else {
      manualOverride = true;
      localStorage.setItem(STORAGE_KEY, 'true');
      setCollapsed(true);
      requestAnimationFrame(() => header.classList.add('nav-open'));
    }
  }

  function handleOutsideClick(e) {
    const header = getHeader();
    if (!header) return;
    if (!header.classList.contains('nav-open')) return;

    const nav = header.querySelector('.main-nav');
    const btn = getToggleBtn();
    if (nav && !nav.contains(e.target) && btn && !btn.contains(e.target)) {
      header.classList.remove('nav-open');
    }
  }

  function handleEsc(e) {
    if (e.key === 'Escape') {
      const header = getHeader();
      if (header) header.classList.remove('nav-open');
    }
  }

  function handleLinkClick(e) {
    if (e.target.closest('.main-nav a')) {
      const header = getHeader();
      if (header) header.classList.remove('nav-open');
    }
  }

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') manualOverride = true;
    else if (saved === 'false') manualOverride = false;
    else manualOverride = null;

    const btn = getToggleBtn();
    if (btn) btn.addEventListener('click', handleToggleClick);

    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll);
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);
    document.addEventListener('click', handleLinkClick);

    updateFromScroll();

    console.log('%c📐 katanbuild Nav Toggle Ready', 'color:#E87722;font-weight:bold;font-size:12px;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('site:refresh', updateFromScroll);
})();
