/* =========================================================
   katanbuild — Site Access Notice (24h)
   ========================================================= */

(function () {
  'use strict';

  const NOTICE_KEY = 'kb-site-notice';
  const HIDE_KEY = 'kb-notice-hidden';

  function getNotice() {
    try { return JSON.parse(localStorage.getItem(NOTICE_KEY) || 'null'); }
    catch (e) { return null; }
  }

  function formatCountdown(seconds) {
    if (seconds <= 0) return '00:00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function removeExisting() {
    document.getElementById('kbSiteNotice')?.remove();
    document.getElementById('kbSiteGate')?.remove();
    document.body.style.overflow = '';
  }

  function showBanner(notice) {
    if (sessionStorage.getItem(HIDE_KEY) === '1') return;
    const banner = document.createElement('div');
    banner.id = 'kbSiteNotice';
    banner.className = 'kb-site-notice';
    const expiresAt = notice.expires ? new Date(notice.expires).getTime() : null;
    banner.innerHTML = `
      <span id="kbNoticeText">${escapeHtml(notice.message)}</span>
      ${expiresAt ? `<span class="countdown" id="kbNoticeCountdown" style="font-family:monospace;font-weight:700;"></span>` : ''}
      <a href="payment.html">معلومات الدفع ←</a>
      <button class="close" id="kbNoticeClose" aria-label="إغلاق">✕</button>
    `;
    document.body.prepend(banner);
    if (expiresAt) {
      const countdownEl = banner.querySelector('#kbNoticeCountdown');
      let timer;
      const tick = () => {
        const left = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
        countdownEl.textContent = left > 0 ? `(${formatCountdown(left)})` : '';
        if (left <= 0) {
          clearInterval(timer);
          const fresh = getNotice();
          if (fresh && fresh.active) showGate(fresh);
        }
      };
      tick();
      timer = setInterval(tick, 1000);
    }
    banner.querySelector('#kbNoticeClose').addEventListener('click', () => {
      banner.remove();
      sessionStorage.setItem(HIDE_KEY, '1');
    });
  }

  function showGate(notice) {
    removeExisting();
    document.body.style.overflow = 'hidden';
    const gate = document.createElement('div');
    gate.id = 'kbSiteGate';
    gate.className = 'kb-site-gate';
    gate.innerHTML = `
      <div class="kb-site-gate-dialog">
        <div class="eyebrow">katanbuild</div>
        <h1>الموقع في وضع التجربة</h1>
        <p>${escapeHtml(notice.message)}</p>
        <p class="countdown" id="kbGateCountdown"></p>
        <a href="payment.html" class="kb-btn kb-btn-primary" style="margin-top:24px;text-decoration:none;display:inline-flex;">
          معلومات الدفع وإرفاق الإيصال ←
        </a>
      </div>
    `;
    document.body.appendChild(gate);
    if (notice.expires) {
      const expiresAt = new Date(notice.expires).getTime();
      const countdownEl = gate.querySelector('#kbGateCountdown');
      let timer;
      const tick = () => {
        const left = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
        if (left > 0) countdownEl.textContent = `ينتهي العرض التجريبي خلال ${formatCountdown(left)}`;
        else { countdownEl.textContent = 'انتهت مدة التجربة. يرجى إتمام الدفع.'; clearInterval(timer); }
      };
      tick();
      timer = setInterval(tick, 1000);
    } else {
      gate.querySelector('#kbGateCountdown').textContent = 'الموقع محجوب حتى تأكيد الدفع.';
    }
  }

  function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>'"]/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[c]));
  }

  function load() {
    const path = location.pathname;
    if (path.endsWith('payment.html') || path.endsWith('payment-control.html')) return;
    const notice = getNotice();
    if (!notice || !notice.active) { removeExisting(); return; }
    if (notice.gate) { showGate(notice); return; }
    if (notice.expires && new Date(notice.expires) <= new Date()) { showGate(notice); return; }
    showBanner(notice);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load);
  else load();

  window.addEventListener('kb:notice', load);
  window.addEventListener('storage', (e) => { if (e.key === NOTICE_KEY) load(); });

  window.KBNotice = { load, getNotice, clear: () => { localStorage.removeItem(NOTICE_KEY); removeExisting(); } };
})();
