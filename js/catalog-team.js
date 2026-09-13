(function () {
  'use strict';

  const STORAGE_KEY = 'kb-site-customization';
  const fallback = {
    catalogImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=85',
      'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=1200&q=85',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=85',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85'
    ],
    catalog: { eyebrow: 'كتالوج katanbuild', title: 'صور من موقع العمل.', description: 'اكتشف المواد والتفاصيل التي تصنع فرقاً حقيقياً في كل مشروع.', ticker: 'أهلاً بك في كتالوج katanbuild · حلول بناء تُرى وتُلمس · جودة تبدأ من الموقع' },
    team: {
      eyebrow: 'فريق العمل',
      title: 'أشخاص يصنعون الفرق.',
      description: 'فريق يجمع الخبرة الميدانية، التطوير، والتصميم.',
      members: [
        { name: 'اسم المبرمج', role: 'المبرمج والمشرف التقني', bio: 'أكتب هنا نبذة قصيرة عن المبرمج ودوره في تطوير المنصة.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=85', link: '' },
        { name: 'اسم عضو الفريق', role: 'إدارة المشاريع', bio: 'نبذة تعريفية مختصرة عن عضو الفريق ومسؤولياته.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=85', link: '' },
        { name: 'اسم عضو الفريق', role: 'الدعم الفني', bio: 'نبذة تعريفية مختصرة عن عضو الفريق ومسؤولياته.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85', link: '' }
      ]
    }
  };
  function read() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || {}; } catch (error) { return {}; } }
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
    document.querySelector('[data-team-grid]').innerHTML = (team.members || []).map(member => `<article class="team-card"><div class="team-card-image"><img src="${esc(member.image)}" alt="${esc(member.name)}" loading="lazy"></div><div class="team-card-body"><h3>${esc(member.name)}</h3><div class="role">${esc(member.role)}</div><p>${esc(member.bio)}</p>${member.link ? `<a href="${esc(member.link)}" target="_blank" rel="noopener noreferrer">تواصل معنا ←</a>` : ''}</div></article>`).join('');
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
