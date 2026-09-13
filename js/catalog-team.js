(function () {
  'use strict';

  const STORAGE_KEY = 'kb-site-customization';
  const fallback = {
    catalogImages: [
      'https://i.ibb.co/tM8PD5Zw/image.jpg',
      'https://i.ibb.co/k6P984Kj/1.png',
      'https://i.ibb.co/WNkdYrX0/Whats-App-Image-2026-08-02-at-1-22-48-PM-1.jpg',
      'https://i.ibb.co/mC8WrdpT/image.png',
      'https://i.ibb.co/FLLCTb61/Whats-App-Image-2026-08-02-at-1-22-48-PM-2.jpg',
      'https://i.ibb.co/JRW6pYmv/image.png',
      'https://i.ibb.co/zhBVtmSV/image.png',
      'https://i.ibb.co/DH4pxrKk/image.png',
      'https://i.ibb.co/hRf8F8f9/Whats-App-Image-2026-08-02-at-1-22-49-PM.jpg',
      'https://i.ibb.co/9kn63v1c/1786629632716.png'
    ],
    catalog: { eyebrow: 'كتالوج katanbuild', title: 'صور من موقع العمل.', description: 'اكتشف المواد والتفاصيل التي تصنع فرقاً حقيقياً في كل مشروع.', ticker: 'أهلاً بك في كتالوج katanbuild · حلول بناء تُرى وتُلمس · جودة تبدأ من الموقع' },
    team: {
      eyebrow: 'فريق العمل',
      title: 'أشخاص يصنعون الفرق.',
      description: 'فريق يجمع الخبرة الميدانية، التطوير، والتصميم.',
      members: [
        { name: 'محمد الحسين', role: 'المبرمج والمشرف التقني', bio: 'أضف صورة ونبذة من لوحة الإدارة.', image: '', link: '' },
        { name: 'اسم عضو الفريق', role: 'إدارة المشاريع', bio: 'أضف صورة ونبذة من لوحة الإدارة.', image: '', link: '' },
        { name: 'اسم عضو الفريق', role: 'الدعم الفني', bio: 'أضف صورة ونبذة من لوحة الإدارة.', image: '', link: '' }
      ]
    }
  };
  function read() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || {};
      if (!localStorage.getItem('kb-team-images-cleaned-v1') && Array.isArray(saved.team?.members)) {
        saved.team.members = saved.team.members.map((member, index) => index === 0 ? member : { ...member, image: '' });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        localStorage.setItem('kb-team-images-cleaned-v1', '1');
      }
      return saved;
    } catch (error) { return {}; }
  }
  function esc(value) { return String(value || '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
  function render(data) {
    const catalog = { ...fallback.catalog, ...(data.catalog || {}) };
    const team = { ...fallback.team, ...(data.team || {}) };
    document.querySelector('[data-catalog-eyebrow]').textContent = catalog.eyebrow;
    document.querySelector('[data-catalog-title]').textContent = catalog.title;
    document.querySelector('[data-catalog-description]').textContent = catalog.description;
    document.querySelector('[data-catalog-ticker]').textContent = catalog.ticker;
    document.querySelector('[data-team-eyebrow]').textContent = team.eyebrow;
    document.querySelector('[data-team-title]').textContent = team.title;
    document.querySelector('[data-team-description]').textContent = team.description;
    const labels = catalog.imageLabels || [];
    document.querySelector('[data-catalog-gallery]').innerHTML = (data.catalogImages || fallback.catalogImages).slice(0, 10).map((url, i) => `<figure class="catalog-tile"><img src="${esc(url)}" alt="${esc(labels[i] || `صورة من كتالوج katanbuild ${i + 1}`)}" loading="lazy"><figcaption>${esc(labels[i] || 'من كتالوج katanbuild')}</figcaption></figure>`).join('');
    document.querySelector('[data-team-grid]').innerHTML = (team.members || []).map(member => `<article class="team-card"><div class="team-card-image">${member.image ? `<img src="${esc(member.image)}" alt="${esc(member.name)}" loading="lazy">` : '<span class="team-card-placeholder">الصورة متاحة من لوحة الإدارة</span>'}</div><div class="team-card-body"><h3>${esc(member.name)}</h3><div class="role">${esc(member.role)}</div><p>${esc(member.bio)}</p>${member.link ? `<a href="${esc(member.link)}" target="_blank" rel="noopener noreferrer">تواصل معنا ←</a>` : ''}</div></article>`).join('');
  }
  async function load() {
    const local = { ...fallback, ...read() };
    render(local);
    if (!window.KBBackend?.configured) return;
    try {
      const remote = await window.KBBackend.loadCustomization();
      if (remote) { localStorage.setItem(STORAGE_KEY, JSON.stringify(remote)); render({ ...fallback, ...remote }); }
    } catch (error) { console.error('تعذر تحميل محتوى الكتالوج', error); }
  }
  render({ ...fallback, ...read() });
  load();
  window.addEventListener('kb:customization', event => render({ ...fallback, ...(event.detail || {}) }));
}());
