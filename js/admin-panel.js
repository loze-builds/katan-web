/* =========================================================
   katanbuild — Admin Panel (Comprehensive v3)
   Tabs: Content, Images, Categories, Catalogues, Notice, Settings
   ========================================================= */

(function () {
  'use strict';

  const PASSWORD = '1992';
  const STORAGE_KEY = 'kb-site-customization';
  const NOTICE_KEY = 'kb-site-notice';
  const CLICKS_NEEDED = 5;
  const CLICK_TIMEOUT = 1500;

  let clickCount = 0;
  let clickTimer = null;
  let currentPanel = 'content';

  function defaultProducts() {
    return (window.SITE?.products || []).map((product) => ({
      slug: product.slug,
      title: product.title?.ar || product.slug,
      items: (product.items || []).map((item) => ({
        name: item.title?.ar || '',
        image: item.image || ''
      }))
    }));
  }

  function getCustomization() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved && typeof saved === 'object') {
        saved.catalogImages = saved.catalogImages || [
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85",
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85",
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=85",
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=85",
          "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=1200&q=85",
          "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=85",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85"
        ];
        saved.catalog = saved.catalog || {
          eyebrow: 'كتالوج katanbuild',
          title: 'صور من موقع العمل.',
          description: 'اكتشف المواد والتفاصيل التي تصنع فرقاً حقيقياً في كل مشروع.',
          ticker: 'أهلاً بك في كتالوج katanbuild · حلول بناء تُرى وتُلمس · جودة تبدأ من الموقع'
        };
        saved.products = saved.products || defaultProducts();
        saved.team = saved.team || { eyebrow: 'فريق العمل', title: 'أشخاص يصنعون الفرق.', description: 'فريق يجمع الخبرة الميدانية، التطوير، والتصميم.', members: [] };
        saved.opening = saved.opening || {
          enabled: true,
          duration: 8000,
          image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85',
          kicker: 'katanbuild presents',
          title: 'كيمياء البناء تصنع الفرق.',
          subtitle: 'مواد تبني نتائج تدوم.'
        };
        return saved;
      }
    } catch (e) { }
    return {
      productImages: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80",
        "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
      ],
      heroImages: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80"
      ],
      hero: {
        title: "كيمياء البناء تصنع الفرق.",
        subtitle: "حلول طينة وعزل ولواصق سيراميك مصممة للموقع، من الأساس حتى التشطيب النهائي."
      },
      categories: [
        { slug: "render-plaster-materials", title: "طينة الديكور", category: "مواد الطينة", short: "قسم مخصص لخلطات الطينة الجاهزة ومواد التسوية." },
        { slug: "waterproofing-materials", title: "مواد العزل", category: "مواد العزل", short: "قسم يضم مواد عزل عالية الأداء." },
        { slug: "ceramic-adhesive-grout", title: "لاصق وروبة السيراميك", category: "لواصق السيراميك", short: "قسم خاص بمواد لصق السيراميك وروبة الفواصل." },
        { slug: "thermal-insulation-materials", title: "مواد العزل الحراري", category: "العزل الحراري", short: "قسم مواد العزل الحراري لواجهات المباني." }
      ],
      whyUs: [
        { title: "متانة عالية", text: "تركيبات مصممة لتتحمل الحمل والاستخدام اليومي دون تدهور مبكر." },
        { title: "مقاومة الطقس", text: "أداء مستقر تحت الحرارة والرطوبة وتقلبات الفصول المحلية." },
        { title: "سهولة التطبيق", text: "قوام متجانس يسهّل العمل ويقلل الهدر في الورشة." },
        { title: "نتائج احترافية", text: "لمسة نهائية نظيفة ومتجانسة تليق بالتسليم النهائي." }
      ],
      catalogues: [
        { id: 'cat-1', name: 'cove .pdf', url: 'assets/files/cove.pdf', type: 'pdf' },
        { id: 'cat-2', name: 'بروشور قطان', url: 'assets/files/brochure-qattan.pdf', type: 'pdf' }
      ],
      catalogImages: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85",
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=85",
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=85",
        "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=1200&q=85",
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=85",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85"
      ],
      catalog: {
        eyebrow: "كتالوج katanbuild",
        title: "صور من موقع العمل.",
        description: "اكتشف المواد والتفاصيل التي تصنع فرقاً حقيقياً في كل مشروع، من الخلطة الأولى حتى التسليم.",
        ticker: "أهلاً بك في كتالوج katanbuild · حلول بناء تُرى وتُلمس · جودة تبدأ من الموقع",
        imageLabels: ["حلول الموقع", "تفاصيل التنفيذ", "مواد العزل", "الخلطات الجاهزة", "مشاريعنا", "لمسة نهائية"]
      },
      team: {
        eyebrow: "فريق العمل",
        title: "أشخاص يصنعون الفرق.",
        description: "فريق يجمع الخبرة الميدانية، التطوير، والتصميم ليبقى كل مشروع على المسار الصحيح.",
        members: [
          { name: "محمد الحسين", role: "المبرمج والمشرف التقني", bio: "أضف صورة ونبذة من لوحة الإدارة.", image: "", link: "" },
          { name: "اسم عضو الفريق", role: "إدارة المشاريع", bio: "أضف صورة ونبذة من لوحة الإدارة.", image: "", link: "" },
          { name: "اسم عضو الفريق", role: "الدعم الفني", bio: "أضف صورة ونبذة من لوحة الإدارة.", image: "", link: "" }
        ]
      },
      opening: {
        enabled: true,
        duration: 4000,
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85",
        kicker: "katanbuild presents",
        title: "كيمياء البناء تصنع الفرق.",
        subtitle: "مواد تبني نتائج تدوم."
      },
      products: defaultProducts()
    };
  }

  async function saveCustomization(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('kb:customization', { detail: data }));
    if (window.KBBackend?.configured) {
      try {
        await window.KBBackend.saveCustomization(data);
      } catch (error) {
        console.error('تعذر حفظ إعدادات الموقع في قاعدة البيانات', error);
        toast('تم الحفظ محلياً، لكن تعذر مزامنة قاعدة البيانات', 'error');
        throw error;
      }
    }
    return true;
  }

  function getNotice() {
    try { return JSON.parse(localStorage.getItem(NOTICE_KEY) || 'null'); }
    catch (e) { return null; }
  }

  async function saveNotice(data) {
    localStorage.setItem(NOTICE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('kb:notice', { detail: data }));
    if (window.KBBackend?.configured) {
      try {
        await window.KBBackend.saveNotice(data);
      } catch (error) {
        console.error('تعذر حفظ الإشعار في قاعدة البيانات', error);
        toast('تم حفظ الإشعار محلياً، لكن تعذر مزامنته', 'error');
        throw error;
      }
    }
    return true;
  }

  function toast(message, type = 'info') {
    const existing = document.querySelector('.kb-toast');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = `kb-toast ${type}`;
    el.textContent = message;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 400);
    }, 3000);
  }

  function askPassword() {
    const prompt = document.createElement('div');
    prompt.className = 'kb-password-prompt';
    prompt.innerHTML = `
      <div class="kb-password-dialog">
        <h2>لوحة التحكم</h2>
        <p>أدخل كلمة المرور للوصول</p>
        <input type="password" id="kbPassInput" inputmode="numeric" maxlength="4" autocomplete="off" />
        <div class="error" id="kbPassError"></div>
        <div class="actions">
          <button class="kb-btn kb-btn-outline" id="kbPassCancel">إلغاء</button>
          <button class="kb-btn kb-btn-primary" id="kbPassConfirm">دخول</button>
        </div>
      </div>
    `;
    document.body.appendChild(prompt);

    const input = prompt.querySelector('#kbPassInput');
    const error = prompt.querySelector('#kbPassError');
    const confirm = prompt.querySelector('#kbPassConfirm');
    const cancel = prompt.querySelector('#kbPassCancel');

    input.focus();

    function tryLogin() {
      if (input.value === PASSWORD) {
        prompt.remove();
        openAdminPanel();
      } else {
        error.textContent = 'كلمة المرور غير صحيحة';
        input.value = '';
        input.focus();
      }
    }

    confirm.addEventListener('click', tryLogin);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') tryLogin();
      if (e.key === 'Escape') prompt.remove();
    });
    cancel.addEventListener('click', () => prompt.remove());
    prompt.addEventListener('click', (e) => { if (e.target === prompt) prompt.remove(); });
  }

  function openAdminPanel() {
    const existing = document.querySelector('.kb-admin-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'kb-admin-overlay open';
    overlay.innerHTML = `
      <div class="kb-admin-dialog">
        <aside class="kb-admin-sidebar">
          <div class="kb-admin-brand">
            <img src="assets/katanbuild-logo-dark.png" alt="katanbuild" onerror="this.src='assets/katanbuild-logo.png'" />
            <div>
              <span>katanbuild</span>
              <small>Admin Panel v3</small>
            </div>
          </div>
          <nav class="kb-admin-nav">
            <button data-panel="content" class="active"><span class="icon">📝</span> المحتوى</button>
            <button data-panel="images"><span class="icon">🖼</span> الصور</button>
            <button data-panel="products"><span class="icon">🧱</span> مواد المنتجات</button>
            <button data-panel="categories"><span class="icon">📦</span> الأقسام</button>
            <button data-panel="catalogues"><span class="icon">📚</span> الكتالوجات</button>
            <button data-panel="catalogTeam"><span class="icon">🧑‍💻</span> الكتالوج والفريق</button>
            <button data-panel="opening"><span class="icon">🎬</span> شاشة الافتتاح</button>
            <button data-panel="notice"><span class="icon">🔔</span> الإشعار</button>
            <button data-panel="settings"><span class="icon">⚙</span> الإعدادات</button>
          </nav>
          <div class="kb-admin-sidebar-footer">v3.0 · 2026</div>
        </aside>
        <main class="kb-admin-main">
          <header class="kb-admin-header">
            <div>
              <h1 id="kbPanelTitle">المحتوى</h1>
              <p id="kbPanelSubtitle">عدّل النصوص والمسميات</p>
            </div>
            <button class="kb-admin-close" id="kbAdminClose" aria-label="إغلاق">✕</button>
          </header>
          <div class="kb-admin-body" id="kbAdminBody"></div>
        </main>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('#kbAdminClose').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape' && overlay.parentNode) {
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
      }
    });

    overlay.querySelectorAll('[data-panel]').forEach((btn) => {
      btn.addEventListener('click', () => {
        overlay.querySelectorAll('[data-panel]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentPanel = btn.dataset.panel;
        renderPanel(overlay);
      });
    });

    renderPanel(overlay);
  }

  function renderPanel(overlay) {
    const title = overlay.querySelector('#kbPanelTitle');
    const subtitle = overlay.querySelector('#kbPanelSubtitle');
    const body = overlay.querySelector('#kbAdminBody');
    const data = getCustomization();

    const panelTitles = {
      content: ['المحتوى', 'عدّل النصوص والمسميات'],
      images: ['الصور', 'غيّر صور الأقسام و Hero'],
      products: ['مواد المنتجات', 'عدّل أسماء وصور المواد الفردية'],
      categories: ['الأقسام', 'أضف، عدّل، أو احذف الأقسام'],
      catalogues: ['الكتالوجات', 'أضف ملفات PDF وباركود'],
      catalogTeam: ['الكتالوج والفريق', 'عدّل الصور ومعلومات فريق العمل'],
      opening: ['شاشة الافتتاح', 'تحكم بالمقدمة السينمائية قبل الموقع'],
      notice: ['الإشعار', 'إرسال إشعار 24 ساعة للموقع'],
      settings: ['الإعدادات', 'نسخ احتياطي وإعادة الضبط']
    };

    title.textContent = panelTitles[currentPanel][0];
    subtitle.textContent = panelTitles[currentPanel][1];

    if (currentPanel === 'content') renderContentPanel(body, data);
    else if (currentPanel === 'images') renderImagesPanel(body, data);
    else if (currentPanel === 'products') renderProductsPanel(body, data);
    else if (currentPanel === 'categories') renderCategoriesPanel(body, data);
    else if (currentPanel === 'catalogues') renderCataloguesPanel(body, data);
    else if (currentPanel === 'catalogTeam') renderCatalogTeamPanel(body, data);
    else if (currentPanel === 'opening') renderOpeningPanel(body, data);
    else if (currentPanel === 'notice') renderNoticePanel(body, data);
    else if (currentPanel === 'settings') renderSettingsPanel(body, data);
  }

  /* ============ CONTENT ============ */
  function renderContentPanel(body, data) {
    body.innerHTML = `
      <h2>نصوص Hero</h2>
      <p class="hint">تعديل العنوان والوصف في الصفحة الرئيسية</p>
      <div class="kb-field">
        <label>عنوان Hero</label>
        <input type="text" id="kbHeroTitle" value="${escapeHtml(data.hero.title)}" />
      </div>
      <div class="kb-field">
        <label>وصف Hero</label>
        <textarea id="kbHeroSubtitle">${escapeHtml(data.hero.subtitle)}</textarea>
      </div>
      <h2 style="margin-top:40px;">بطاقات "لماذا نحن"</h2>
      <p class="hint">تعديل البطاقات الأربع في الصفحة الرئيسية</p>
      <div id="kbWhyUsList"></div>
      <div style="margin-top:32px; display:flex; gap:12px;">
        <button class="kb-btn kb-btn-primary" id="kbSaveContent">حفظ التغييرات</button>
      </div>
      <div class="kb-status" id="kbContentStatus"></div>
    `;

    const list = body.querySelector('#kbWhyUsList');
    data.whyUs.forEach((card, i) => {
      const div = document.createElement('div');
      div.className = 'kb-card';
      div.innerHTML = `
        <div class="kb-card-header"><h3>بطاقة ${i + 1}</h3></div>
        <div class="kb-field">
          <label>العنوان</label>
          <input type="text" data-why-title="${i}" value="${escapeHtml(card.title)}" />
        </div>
        <div class="kb-field">
          <label>النص</label>
          <textarea data-why-text="${i}">${escapeHtml(card.text)}</textarea>
        </div>
      `;
      list.appendChild(div);
    });

    body.querySelector('#kbSaveContent').addEventListener('click', () => {
      const newData = getCustomization();
      newData.hero.title = body.querySelector('#kbHeroTitle').value;
      newData.hero.subtitle = body.querySelector('#kbHeroSubtitle').value;
      newData.whyUs = Array.from(body.querySelectorAll('.kb-card')).map((card, i) => ({
        title: card.querySelector(`[data-why-title="${i}"]`).value,
        text: card.querySelector(`[data-why-text="${i}"]`).value
      }));
      saveCustomization(newData);
      showStatus(body.querySelector('#kbContentStatus'), 'تم حفظ المحتوى بنجاح', 'success');
      toast('تم حفظ المحتوى', 'success');
    });
  }

  /* ============ IMAGES ============ */
  function renderImagesPanel(body, data) {
    const categoryNames = ['مواد الطينة', 'مواد العزل', 'لواصق السيراميك', 'العزل الحراري'];

    body.innerHTML = `
      <h2>صور الأقسام</h2>
      <p class="hint">غيّر صورة كل قسم</p>
      <div id="kbImageList"></div>
      <h2 style="margin-top:40px;">صور Hero</h2>
      <p class="hint">الصور الثلاث المتغيرة في الأعلى</p>
      <div id="kbHeroList"></div>
      <div style="margin-top:32px; display:flex; gap:12px;">
        <button class="kb-btn kb-btn-primary" id="kbSaveImages">حفظ التغييرات</button>
      </div>
      <div class="kb-status" id="kbImagesStatus"></div>
    `;

    const list = body.querySelector('#kbImageList');
    categoryNames.forEach((name, i) => {
      const div = document.createElement('div');
      div.className = 'kb-card';
      div.innerHTML = `
        <div class="kb-card-header"><h3>${name}</h3></div>
        <div class="kb-image-preview" style="background-image:url('${data.productImages[i]}')"></div>
        <div class="kb-field">
          <label>رابط الصورة</label>
          <input type="text" data-img-index="${i}" value="${escapeHtml(data.productImages[i])}" />
        </div>
        <div class="kb-field">
          <label>أو ارفع صورة من جهازك</label>
          <div class="kb-file-input">
            <span class="icon">📷</span>
            <div class="text"><strong>رفع صورة</strong><span>PNG, JPG · حد أقصى 2MB</span></div>
            <input type="file" accept="image/*" data-img-upload="${i}" />
          </div>
        </div>
      `;
      list.appendChild(div);
    });

    const heroList = body.querySelector('#kbHeroList');
    data.heroImages.forEach((url, i) => {
      const div = document.createElement('div');
      div.className = 'kb-card';
      div.innerHTML = `
        <div class="kb-card-header"><h3>شريحة ${i + 1}</h3></div>
        <div class="kb-image-preview" style="background-image:url('${url}')"></div>
        <div class="kb-field">
          <label>رابط الصورة</label>
          <input type="text" data-hero-img="${i}" value="${escapeHtml(url)}" />
        </div>
      `;
      heroList.appendChild(div);
    });

    body.querySelectorAll('[data-img-upload]').forEach((input) => {
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { toast('حجم الصورة يجب ألا يتجاوز 2MB', 'error'); return; }
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const index = input.dataset.imgUpload;
          const textInput = body.querySelector(`[data-img-index="${index}"]`);
          textInput.value = reader.result;
          const preview = input.closest('.kb-card').querySelector('.kb-image-preview');
          preview.style.backgroundImage = `url('${reader.result}')`;
          toast('تم رفع الصورة', 'success');
        });
        reader.readAsDataURL(file);
      });
    });

    body.querySelector('#kbSaveImages').addEventListener('click', () => {
      const newData = getCustomization();
      newData.productImages = Array.from(body.querySelectorAll('[data-img-index]')).map((input) => input.value);
      newData.heroImages = Array.from(body.querySelectorAll('[data-hero-img]')).map((input) => input.value);
      saveCustomization(newData);
      showStatus(body.querySelector('#kbImagesStatus'), 'تم حفظ الصور', 'success');
      toast('تم حفظ الصور', 'success');
    });
  }

  /* ============ PRODUCTS ============ */
  function renderProductsPanel(body, data) {
    const products = data.products || defaultProducts();
    body.innerHTML = `
      <h2>مواد المنتجات</h2>
      <p class="hint">غيّر اسم أو صورة أي مادة. ستظهر التعديلات لجميع الزوار بعد الحفظ.</p>
      <div id="kbProductsList"></div>
      <div style="margin-top:32px;display:flex;gap:12px;">
        <button class="kb-btn kb-btn-primary" id="kbSaveProducts">حفظ مواد المنتجات</button>
      </div>
      <div class="kb-status" id="kbProductsStatus"></div>
    `;

    const list = body.querySelector('#kbProductsList');
    products.forEach((product) => {
      const card = document.createElement('div');
      card.className = 'kb-card';
      card.innerHTML = `
        <div class="kb-card-header"><h3>${escapeHtml(product.title)}</h3></div>
        <div class="kb-field">
          <label>اسم القسم</label>
          <input type="text" data-product-title="${escapeHtml(product.slug)}" value="${escapeHtml(product.title)}" />
        </div>
        <div data-product-items="${escapeHtml(product.slug)}"></div>
      `;
      const items = card.querySelector(`[data-product-items="${CSS.escape(product.slug)}"]`);
      (product.items || []).forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'kb-card';
        row.innerHTML = `
          <div class="kb-card-header"><h4>مادة ${index + 1}</h4></div>
          <div class="kb-field">
            <label>اسم المادة</label>
            <input type="text" data-product-name="${escapeHtml(product.slug)}-${index}" value="${escapeHtml(item.name)}" />
          </div>
          <div class="kb-field">
            <label>رابط صورة المادة</label>
            <input type="text" data-product-image="${escapeHtml(product.slug)}-${index}" value="${escapeHtml(item.image)}" />
          </div>
          <div class="kb-field">
            <label>أو ارفع صورة من جهازك</label>
            <input type="file" accept="image/*" data-product-upload="${escapeHtml(product.slug)}-${index}" />
          </div>
        `;
        items.appendChild(row);
      });
      list.appendChild(card);
    });

    body.querySelectorAll('[data-product-upload]').forEach((input) => {
      input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
          toast('حجم الصورة يجب ألا يتجاوز 2MB', 'error');
          return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const target = body.querySelector(`[data-product-image="${input.dataset.productUpload}"]`);
          if (target) target.value = reader.result;
          toast('تم رفع صورة المادة', 'success');
        });
        reader.readAsDataURL(file);
      });
    });

    body.querySelector('#kbSaveProducts').addEventListener('click', async () => {
      const newData = getCustomization();
      newData.products = products.map((product) => ({
        slug: product.slug,
        title: body.querySelector(`[data-product-title="${CSS.escape(product.slug)}"]`).value,
        items: (product.items || []).map((item, index) => ({
          name: body.querySelector(`[data-product-name="${CSS.escape(`${product.slug}-${index}`)}"]`).value,
          image: body.querySelector(`[data-product-image="${CSS.escape(`${product.slug}-${index}`)}"]`).value
        }))
      }));
      try {
        await saveCustomization(newData);
        showStatus(body.querySelector('#kbProductsStatus'), 'تم حفظ مواد المنتجات ومزامنتها', 'success');
        toast('تم حفظ مواد المنتجات', 'success');
      } catch (error) {
        showStatus(body.querySelector('#kbProductsStatus'), 'تعذر مزامنة المواد مع Google Sheets', 'error');
      }
    });
  }

  /* ============ CATALOG + TEAM ============ */
  function renderCatalogTeamPanel(body, data) {
    const catalog = data.catalog || {};
    const team = data.team || { members: [] };
    const images = data.catalogImages || [];
    body.innerHTML = `
      <h2>الكتالوج المرئي</h2>
      <p class="hint">يمكنك وضع رابط مباشر للصورة أو رفعها من جهازك. الحد الأقصى 10 صور.</p>
      <div class="kb-field"><label>العنوان التعريفي</label><input id="kbCatalogEyebrow" value="${escapeHtml(catalog.eyebrow || '')}"></div>
      <div class="kb-field"><label>العنوان الرئيسي</label><input id="kbCatalogTitle" value="${escapeHtml(catalog.title || '')}"></div>
      <div class="kb-field"><label>الوصف</label><textarea id="kbCatalogDescription">${escapeHtml(catalog.description || '')}</textarea></div>
      <div class="kb-field"><label>الشريط الترحيبي</label><input id="kbCatalogTicker" value="${escapeHtml(catalog.ticker || '')}"></div>
      <div id="kbCatalogImageList"></div>
      <h2 style="margin-top:40px;">معلومات فريق العمل</h2>
      <p class="hint">خصص معلومات المبرمج وأعضاء الفريق والصور والروابط.</p>
      <div id="kbTeamList"></div>
      <button class="kb-btn kb-btn-outline" id="kbAddTeam">+ إضافة عضو</button>
      <div style="margin-top:24px;"><button class="kb-btn kb-btn-primary" id="kbSaveCatalogTeam">حفظ الكتالوج والفريق</button></div>
      <div class="kb-status" id="kbCatalogTeamStatus"></div>
    `;
    const imageList = body.querySelector('#kbCatalogImageList');
    for (let i = 0; i < 10; i++) {
      const card = document.createElement('div');
      card.className = 'kb-card';
      card.innerHTML = `<div class="kb-card-header"><h3>صورة ${i + 1}</h3></div>
        <div class="kb-image-preview" style="background-image:url('${escapeHtml(images[i] || '')}')"></div>
        <div class="kb-field"><label>رابط مباشر للصورة</label><input data-catalog-image="${i}" value="${escapeHtml(images[i] || '')}" placeholder="https://example.com/image.jpg"></div>
        <div class="kb-file-input"><span class="icon">📷</span><div class="text"><strong>رفع صورة</strong><span>JPG, PNG · حد أقصى 2MB</span></div><input type="file" accept="image/*" data-catalog-upload="${i}"></div>`;
      imageList.appendChild(card);
    }
    body.querySelectorAll('[data-catalog-upload]').forEach(input => input.addEventListener('change', event => {
      const file = event.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) { toast('حجم الصورة يجب ألا يتجاوز 2MB', 'error'); return; }
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const index = input.dataset.catalogUpload;
        body.querySelector(`[data-catalog-image="${index}"]`).value = reader.result;
        input.closest('.kb-card').querySelector('.kb-image-preview').style.backgroundImage = `url('${reader.result}')`;
      });
      reader.readAsDataURL(file);
    }));
    const teamList = body.querySelector('#kbTeamList');
    const renderMembers = () => {
      teamList.innerHTML = '';
      (team.members || []).forEach((member, i) => {
        const card = document.createElement('div');
        card.className = 'kb-card';
        card.dataset.teamIndex = i;
        card.innerHTML = `<div class="kb-card-header"><h3>عضو ${i + 1}</h3><button class="kb-btn kb-btn-danger kb-btn-sm" data-remove-team="${i}">حذف</button></div>
          <div class="kb-field"><label>الاسم</label><input data-team-name="${i}" value="${escapeHtml(member.name || '')}"></div>
          <div class="kb-field"><label>المسمى والدور</label><input data-team-role="${i}" value="${escapeHtml(member.role || '')}"></div>
          <div class="kb-field"><label>النبذة</label><textarea data-team-bio="${i}">${escapeHtml(member.bio || '')}</textarea></div>
          <div class="kb-field"><label>رابط الصورة</label><input data-team-image="${i}" value="${escapeHtml(member.image || '')}"></div>
          <div class="kb-field"><label>رابط التواصل الاختياري</label><input data-team-link="${i}" value="${escapeHtml(member.link || '')}"></div>`;
        teamList.appendChild(card);
      });
      teamList.querySelectorAll('[data-remove-team]').forEach(button => button.addEventListener('click', () => {
        team.members.splice(Number(button.dataset.removeTeam), 1);
        renderMembers();
      }));
    };
    renderMembers();
    body.querySelector('#kbAddTeam').addEventListener('click', () => {
      team.members.push({ name: 'عضو جديد', role: 'الدور', bio: '', image: '', link: '' });
      renderMembers();
    });
    body.querySelector('#kbSaveCatalogTeam').addEventListener('click', () => {
      const newData = getCustomization();
      newData.catalog = {
        eyebrow: body.querySelector('#kbCatalogEyebrow').value,
        title: body.querySelector('#kbCatalogTitle').value,
        description: body.querySelector('#kbCatalogDescription').value,
        ticker: body.querySelector('#kbCatalogTicker').value,
        imageLabels: catalog.imageLabels || []
      };
      newData.catalogImages = Array.from(body.querySelectorAll('[data-catalog-image]')).map(input => input.value.trim()).filter(Boolean);
      newData.team = { ...team, members: Array.from(body.querySelectorAll('[data-team-name]')).map((input, i) => {
        const card = input.closest('[data-team-index]');
        return {
          name: input.value,
          role: card.querySelector(`[data-team-role="${i}"]`).value,
          bio: card.querySelector(`[data-team-bio="${i}"]`).value,
          image: card.querySelector(`[data-team-image="${i}"]`).value,
          link: card.querySelector(`[data-team-link="${i}"]`).value
        };
      }) };
      saveCustomization(newData);
      showStatus(body.querySelector('#kbCatalogTeamStatus'), 'تم حفظ الكتالوج وفريق العمل', 'success');
      toast('تم حفظ الكتالوج والفريق', 'success');
    });
  }

  function renderOpeningPanel(body, data) {
    const opening = data.opening || {};
    body.innerHTML = `
      <h2>شاشة الافتتاح السينمائية</h2>
      <p class="hint">تظهر مرة واحدة لكل جلسة لمدة 4 ثوانٍ افتراضياً، ويمكن للزائر تخطيها.</p>
      <label class="kb-check"><input type="checkbox" id="kbOpeningEnabled" ${opening.enabled !== false ? 'checked' : ''}> تشغيل شاشة الافتتاح</label>
      <div class="kb-field"><label>المدة بالميلي ثانية</label><input type="number" min="1500" max="15000" step="500" id="kbOpeningDuration" value="${Number(opening.duration || 4000)}"></div>
      <div class="kb-field"><label>رابط صورة الخلفية</label><input type="url" id="kbOpeningImage" value="${escapeHtml(opening.image || '')}" placeholder="https://example.com/hero.jpg"></div>
      <div class="kb-field"><label>السطر العلوي</label><input type="text" id="kbOpeningKicker" value="${escapeHtml(opening.kicker || '')}"></div>
      <div class="kb-field"><label>العنوان الكبير</label><input type="text" id="kbOpeningTitle" value="${escapeHtml(opening.title || '')}"></div>
      <div class="kb-field"><label>السطر التعريفي</label><input type="text" id="kbOpeningSubtitle" value="${escapeHtml(opening.subtitle || '')}"></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;"><button class="kb-btn kb-btn-primary" id="kbSaveOpening">حفظ الافتتاحية</button><button class="kb-btn kb-btn-outline" id="kbPreviewOpening">معاينة</button></div>
      <div class="kb-status" id="kbOpeningStatus"></div>
    `;
    const readForm = () => ({
      enabled: body.querySelector('#kbOpeningEnabled').checked,
      duration: Math.min(15000, Math.max(1500, Number(body.querySelector('#kbOpeningDuration').value) || 4000)),
      image: body.querySelector('#kbOpeningImage').value.trim(),
      kicker: body.querySelector('#kbOpeningKicker').value.trim(),
      title: body.querySelector('#kbOpeningTitle').value.trim(),
      subtitle: body.querySelector('#kbOpeningSubtitle').value.trim()
    });
    body.querySelector('#kbSaveOpening').addEventListener('click', () => {
      const newData = getCustomization();
      newData.opening = readForm();
      saveCustomization(newData);
      showStatus(body.querySelector('#kbOpeningStatus'), 'تم حفظ إعدادات شاشة الافتتاح', 'success');
      toast('تم حفظ الافتتاحية', 'success');
    });
    body.querySelector('#kbPreviewOpening').addEventListener('click', () => {
      const preview = readForm();
      preview.duration = 4000;
      window.KBOpeningPreview?.(preview);
    });
  }

  /* ============ CATEGORIES ============ */
  function renderCategoriesPanel(body, data) {
    body.innerHTML = `
      <h2>الأقسام (${data.categories.length})</h2>
      <p class="hint">أضف قسم جديد، أو عدّل الموجود، أو احذف</p>
      <div id="kbCategoriesList"></div>
      <div style="margin-top:24px; display:flex; gap:12px;">
        <button class="kb-btn kb-btn-primary" id="kbAddCategory">+ إضافة قسم جديد</button>
        <button class="kb-btn kb-btn-outline" id="kbSaveCategories">حفظ التعديلات</button>
      </div>
      <div class="kb-status" id="kbCategoriesStatus"></div>
    `;

    const list = body.querySelector('#kbCategoriesList');
    data.categories.forEach((cat, i) => {
      const div = document.createElement('div');
      div.className = 'kb-card';
      div.dataset.categoryIndex = i;
      div.innerHTML = `
        <div class="kb-card-header">
          <h3>القسم ${i + 1}</h3>
          <div class="actions">
            <button class="kb-btn kb-btn-danger kb-btn-sm" data-remove-cat="${i}">حذف</button>
          </div>
        </div>
        <div class="kb-field"><label>Slug</label><input type="text" data-cat-slug="${i}" value="${escapeHtml(cat.slug)}" /></div>
        <div class="kb-field"><label>اسم القسم</label><input type="text" data-cat-category="${i}" value="${escapeHtml(cat.category)}" /></div>
        <div class="kb-field"><label>العنوان</label><input type="text" data-cat-title="${i}" value="${escapeHtml(cat.title)}" /></div>
        <div class="kb-field"><label>وصف قصير</label><textarea data-cat-short="${i}">${escapeHtml(cat.short)}</textarea></div>
      `;
      list.appendChild(div);
    });

    body.querySelector('#kbAddCategory').addEventListener('click', () => {
      const newData = getCustomization();
      newData.categories.push({
        slug: `new-category-${Date.now()}`,
        title: 'قسم جديد',
        category: 'قسم جديد',
        short: 'وصف القسم الجديد'
      });
      saveCustomization(newData);
      toast('تمت إضافة قسم', 'success');
      renderPanel(body.closest('.kb-admin-overlay'));
    });

    body.querySelectorAll('[data-remove-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!confirm('هل أنت متأكد من حذف هذا القسم؟')) return;
        const newData = getCustomization();
        newData.categories.splice(Number(btn.dataset.removeCat), 1);
        saveCustomization(newData);
        toast('تم حذف القسم', 'success');
        renderPanel(body.closest('.kb-admin-overlay'));
      });
    });

    body.querySelector('#kbSaveCategories').addEventListener('click', () => {
      const newData = getCustomization();
      newData.categories = Array.from(body.querySelectorAll('[data-category-index]')).map((card, i) => ({
        slug: card.querySelector(`[data-cat-slug="${i}"]`).value,
        category: card.querySelector(`[data-cat-category="${i}"]`).value,
        title: card.querySelector(`[data-cat-title="${i}"]`).value,
        short: card.querySelector(`[data-cat-short="${i}"]`).value
      }));
      saveCustomization(newData);
      showStatus(body.querySelector('#kbCategoriesStatus'), 'تم حفظ الأقسام', 'success');
      toast('تم حفظ الأقسام', 'success');
    });
  }

  /* ============ CATALOGUES (NEW) ============ */
  function renderCataloguesPanel(body, data) {
    const catalogues = data.catalogues || [];

    body.innerHTML = `
      <h2>الكتالوجات والملفات (${catalogues.length})</h2>
      <p class="hint">أضف ملفات PDF، وسيُولَّد باركود لكل ملف تلقائياً</p>

      <div class="kb-card" style="border-color:var(--accent);">
        <div class="kb-card-header"><h3>➕ إضافة كتالوج جديد</h3></div>
        <div class="kb-field">
          <label>اسم الكتالوج</label>
          <input type="text" id="kbNewCatName" placeholder="مثال: كتالوج المنتجات 2026" />
        </div>
        <div class="kb-field">
          <label>الرابط المباشر (URL)</label>
          <input type="text" id="kbNewCatUrl" placeholder="https://example.com/file.pdf أو assets/files/file.pdf" />
        </div>
        <div class="kb-field">
          <label>أو ارفع ملف PDF من جهازك</label>
          <div class="kb-file-input">
            <span class="icon">📄</span>
            <div class="text">
              <strong>رفع PDF</strong>
              <span>PDF · حد أقصى 5MB</span>
            </div>
            <input type="file" accept="application/pdf" id="kbNewCatFile" />
          </div>
        </div>
        <button class="kb-btn kb-btn-primary" id="kbAddCatalogue" style="margin-top:8px;">إضافة الكتالوج</button>
      </div>

      <h2 style="margin-top:40px;">الكتالوجات الحالية</h2>
      <div id="kbCataloguesList"></div>

      <div class="kb-status" id="kbCataloguesStatus"></div>
    `;

    const list = body.querySelector('#kbCataloguesList');
    if (!catalogues.length) {
      list.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">لا توجد كتالوجات بعد.</p>';
    } else {
      catalogues.forEach((cat, i) => {
        const div = document.createElement('div');
        div.className = 'kb-card';
        div.dataset.catalogueIndex = i;
        div.innerHTML = `
          <div class="kb-card-header">
            <h3>${escapeHtml(cat.name)}</h3>
            <div class="actions">
              <button class="kb-btn kb-btn-danger kb-btn-sm" data-remove-cat-item="${i}">حذف</button>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 200px;gap:20px;align-items:start;">
            <div>
              <div class="kb-field">
                <label>اسم الكتالوج</label>
                <input type="text" data-cat-name="${i}" value="${escapeHtml(cat.name)}" />
              </div>
              <div class="kb-field">
                <label>الرابط المباشر</label>
                <input type="text" data-cat-url="${i}" value="${cat.url && cat.url.startsWith('data:') ? '(ملف مرفوع)' : escapeHtml(cat.url)}" ${cat.url && cat.url.startsWith('data:') ? 'readonly' : ''} />
              </div>
              <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
                <a href="${escapeHtml(cat.url)}" target="_blank" rel="noopener noreferrer" class="kb-btn kb-btn-outline kb-btn-sm" download>فتح الملف</a>
              </div>
            </div>
            <div style="text-align:center;">
              <div id="qr-${i}" style="display:inline-block;padding:10px;background:#fff;border-radius:8px;"></div>
              <p style="font-size:0.75rem;color:var(--text-muted);margin-top:8px;font-family:monospace;">باركود الملف</p>
            </div>
          </div>
        `;
        list.appendChild(div);
      });
    }

    body.querySelector('#kbAddCatalogue').addEventListener('click', () => {
      const nameInput = body.querySelector('#kbNewCatName');
      const urlInput = body.querySelector('#kbNewCatUrl');
      const fileInput = body.querySelector('#kbNewCatFile');

      const name = nameInput.value.trim();
      const url = urlInput.value.trim();
      const file = fileInput.files[0];

      if (!name) { toast('أدخل اسم الكتالوج', 'error'); return; }

      const newData = getCustomization();
      newData.catalogues = newData.catalogues || [];

      const newCat = {
        id: 'cat-' + Date.now(),
        name: name,
        url: '',
        type: 'pdf'
      };

      if (file) {
        if (file.size > 5 * 1024 * 1024) { toast('حجم الملف يجب ألا يتجاوز 5MB', 'error'); return; }
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          newCat.url = reader.result;
          newData.catalogues.push(newCat);
          saveCustomization(newData);
          toast('تمت إضافة الكتالوج', 'success');
          renderPanel(body.closest('.kb-admin-overlay'));
        });
        reader.readAsDataURL(file);
      } else if (url) {
        newCat.url = url;
        newData.catalogues.push(newCat);
        saveCustomization(newData);
        toast('تمت إضافة الكتالوج', 'success');
        renderPanel(body.closest('.kb-admin-overlay'));
      } else {
        toast('ضع رابطاً أو ارفع ملفاً', 'error');
      }
    });

    body.querySelectorAll('[data-remove-cat-item]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!confirm('حذف هذا الكتالوج؟')) return;
        const newData = getCustomization();
        newData.catalogues.splice(Number(btn.dataset.removeCatItem), 1);
        saveCustomization(newData);
        toast('تم حذف الكتالوج', 'success');
        renderPanel(body.closest('.kb-admin-overlay'));
      });
    });

    body.querySelectorAll('[data-cat-name]').forEach((input) => {
      input.addEventListener('change', () => {
        const newData = getCustomization();
        newData.catalogues[Number(input.dataset.catName)].name = input.value;
        saveCustomization(newData);
        toast('تم حفظ الاسم', 'success');
      });
    });

    body.querySelectorAll('[data-cat-url]').forEach((input) => {
      if (input.readOnly) return;
      input.addEventListener('change', () => {
        const newData = getCustomization();
        newData.catalogues[Number(input.dataset.catUrl)].url = input.value;
        saveCustomization(newData);
        toast('تم حفظ الرابط', 'success');
      });
    });

    setTimeout(() => {
      if (typeof QRCode === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';
        script.onload = () => generateAllQRs(catalogues, body);
        document.head.appendChild(script);
      } else {
        generateAllQRs(catalogues, body);
      }
    }, 100);
  }

  function generateAllQRs(catalogues, body) {
    const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
    catalogues.forEach((cat, i) => {
      const el = body.querySelector(`#qr-${i}`);
      if (!el) return;
      el.innerHTML = '';
      let qrUrl = cat.url;
      if (qrUrl && !qrUrl.startsWith('data:') && !qrUrl.startsWith('http')) {
        qrUrl = baseUrl + qrUrl;
      }
      if (qrUrl && qrUrl.startsWith('data:')) {
        el.innerHTML = '<div style="font-size:0.7rem;color:#999;padding:20px;text-align:center;">الملف مرفوع<br>لا يمكن توليد باركود<br>استخدم رابطاً مباشراً</div>';
        return;
      }
      try {
        new QRCode(el, {
          text: qrUrl || 'https://example.com',
          width: 180,
          height: 180,
          colorDark: "#0E0E0E",
          colorLight: "#FFFFFF",
          correctLevel: QRCode.CorrectLevel.M
        });
      } catch (e) {
        console.error('QR error:', e);
      }
    });
  }

  /* ============ NOTICE ============ */
  function renderNoticePanel(body, data) {
    const notice = getNotice() || { active: false, message: 'الموقع في وضع تجريبي، يرجى تأكيد الدفع خلال 24 ساعة.', expires: null };

    body.innerHTML = `
      <h2>إشعار الموقع</h2>
      <p class="hint">أرسل إشعاراً لجميع الزوار يطالبهم بالدفع خلال 24 ساعة</p>
      <div class="kb-card">
        <div class="kb-card-header">
          <h3>حالة الإشعار</h3>
          <span class="mono" style="color:${notice.active ? '#22C55E' : '#8A8A8A'};font-size:.85rem;">
            ${notice.active ? '● نشط' : '○ متوقف'}
          </span>
        </div>
        <div class="kb-field">
          <label>نص الإشعار</label>
          <textarea id="kbNoticeMsg">${escapeHtml(notice.message)}</textarea>
        </div>
        <div class="kb-field">
          <label>مدة الإشعار (بالساعات)</label>
          <input type="number" id="kbNoticeHours" min="1" max="72" value="24" />
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:16px;">
          <button class="kb-btn kb-btn-primary" id="kbActivateNotice">🔔 إرسال الإشعار</button>
          <button class="kb-btn kb-btn-outline" id="kbDeactivateNotice">⏹ إيقاف الإشعار</button>
        </div>
      </div>
      <div class="kb-card">
        <div class="kb-card-header"><h3>وضع الحجب الكامل</h3></div>
        <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:16px;">
          عند تفعيله، لن يستطيع الزوار رؤية الموقع حتى يتم الدفع.
        </p>
        <button class="kb-btn kb-btn-danger" id="kbActivateGate">🚫 تفعيل حجب الموقع</button>
      </div>
      <div class="kb-status" id="kbNoticeStatus"></div>
    `;

    body.querySelector('#kbActivateNotice').addEventListener('click', () => {
      const message = body.querySelector('#kbNoticeMsg').value;
      const hours = Number(body.querySelector('#kbNoticeHours').value) || 24;
      const expires = new Date(Date.now() + hours * 3600 * 1000).toISOString();
      saveNotice({ active: true, message, expires, gate: false });
      toast('تم تفعيل الإشعار', 'success');
      showStatus(body.querySelector('#kbNoticeStatus'), 'تم إرسال الإشعار لجميع الزوار', 'success');
    });

    body.querySelector('#kbDeactivateNotice').addEventListener('click', () => {
      saveNotice({ active: false, message: '', expires: null, gate: false });
      toast('تم إيقاف الإشعار', 'success');
      showStatus(body.querySelector('#kbNoticeStatus'), 'تم إيقاف الإشعار', 'info');
    });

    body.querySelector('#kbActivateGate').addEventListener('click', () => {
      if (!confirm('تحذير: سيتم حجب الموقع بالكامل عن جميع الزوار حتى يتم الدفع. متابعة؟')) return;
      const message = body.querySelector('#kbNoticeMsg').value || 'الموقع محجوب حتى يتم تأكيد الدفع.';
      saveNotice({ active: true, message, expires: null, gate: true });
      toast('تم تفعيل الحجب الكامل', 'success');
      showStatus(body.querySelector('#kbNoticeStatus'), 'الموقع محجوب الآن', 'error');
    });
  }

  /* ============ SETTINGS ============ */
  function renderSettingsPanel(body, data) {
    body.innerHTML = `
      <h2>النسخ الاحتياطي</h2>
      <p class="hint">صدّر كل إعدادات الموقع كملف JSON، أو استوردها على جهاز آخر</p>
      <div class="kb-card">
        <div class="kb-card-header"><h3>تصدير الإعدادات</h3></div>
        <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:16px;">احفظ ملف JSON يحتوي على كل تعديلاتك.</p>
        <button class="kb-btn kb-btn-primary" id="kbExport">📥 تصدير JSON</button>
      </div>
      <div class="kb-card">
        <div class="kb-card-header"><h3>استيراد الإعدادات</h3></div>
        <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:16px;">استورد ملف JSON لإعادة كل الإعدادات.</p>
        <div class="kb-file-input">
          <span class="icon">📤</span>
          <div class="text"><strong>اختر ملف JSON</strong><span>سيتم استبدال الإعدادات الحالية</span></div>
          <input type="file" accept="application/json" id="kbImport" />
        </div>
      </div>
      <div class="kb-card" style="border-color:#EF4444;">
        <div class="kb-card-header"><h3 style="color:#EF4444;">منطقة الخطر</h3></div>
        <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:16px;">إعادة تعيين كل الإعدادات للحالة الافتراضية.</p>
        <button class="kb-btn kb-btn-danger" id="kbReset">🗑 إعادة تعيين كل شيء</button>
      </div>
      <div class="kb-status" id="kbSettingsStatus"></div>
    `;

    body.querySelector('#kbExport').addEventListener('click', async () => {
      try {
        const accounting = window.KBBackend?.configured
          ? await window.KBBackend.exportBackup('1992')
          : {};
        const all = {
          ...accounting,
          customization: getCustomization(),
          notice: getNotice(),
          exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `katanbuild-backup-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast('تم تصدير النسخة الاحتياطية', 'success');
      } catch (error) {
        console.error('تعذر تصدير النسخة الاحتياطية', error);
        toast('تعذر تصدير النسخة الاحتياطية من قاعدة البيانات', 'error');
      }
    });

    body.querySelector('#kbImport').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        try {
          const parsed = JSON.parse(reader.result);
          if (parsed.customization) saveCustomization(parsed.customization);
          if (parsed.notice) saveNotice(parsed.notice);
          toast('تم استيراد الإعدادات', 'success');
          renderPanel(body.closest('.kb-admin-overlay'));
        } catch (err) {
          toast('ملف JSON غير صالح', 'error');
        }
      });
      reader.readAsText(file);
    });

    body.querySelector('#kbReset').addEventListener('click', () => {
      if (!confirm('تحذير: سيتم حذف كل التعديلات. متابعة؟')) return;
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(NOTICE_KEY);
      toast('تمت إعادة التعيين', 'success');
      showStatus(body.querySelector('#kbSettingsStatus'), 'تمت إعادة التعيين للحالة الافتراضية', 'success');
      setTimeout(() => location.reload(), 1500);
    });
  }

  function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>'"]/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[c]));
  }

  function showStatus(el, message, type = 'info') {
    el.textContent = message;
    el.className = `kb-status ${type}`;
    setTimeout(() => {
      if (el.textContent === message) {
        el.textContent = '';
        el.className = 'kb-status';
      }
    }, 4000);
  }

  function getBrandElement() {
    const byId = document.getElementById('brandTrigger');
    if (byId) return byId;
    const header = document.getElementById('site-header');
    if (header) {
      const inHeader = header.querySelector('.brand');
      if (inHeader) return inHeader;
    }
    return document.querySelector('.brand');
  }

  function initLogoTrigger() {
    const brand = getBrandElement();
    if (!brand) {
      setTimeout(initLogoTrigger, 500);
      return;
    }
    if (brand.dataset.adminReady) return;
    brand.dataset.adminReady = 'true';

    brand.addEventListener('click', (e) => {
      clickCount++;
      clearTimeout(clickTimer);

      if (clickCount >= CLICKS_NEEDED) {
        e.preventDefault();
        e.stopPropagation();
        clickCount = 0;
        askPassword();
        return;
      }

      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, CLICK_TIMEOUT);
    }, true);
  }

  function init() { initLogoTrigger(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  const observer = new MutationObserver(() => { initLogoTrigger(); });
  observer.observe(document.body, { childList: true, subtree: false });

  window.KBAdmin = { open: askPassword, getCustomization, saveCustomization, getNotice, saveNotice, toast };

  console.log('%c🔐 katanbuild Admin v3', 'color:#E87722;font-weight:bold;font-size:14px;');
  console.log('%cانقر 5 مرات على الشعار + كلمة المرور: 1992', 'color:#8A8A8A;font-size:12px;');
})();
