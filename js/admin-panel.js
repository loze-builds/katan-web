/* =========================================================
   katanbuild — Admin Panel (Comprehensive)
   Methods to open: 5 clicks on logo | Ctrl+Shift+K | URL ?admin=1
   Password: 1992
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

  function getCustomization() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved && typeof saved === 'object') return saved;
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
      pdfs: { render: null, waterproofing: null, ceramic: null, thermal: null },
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
        { title: "نتائج احترافية", text: "لسمة نهائية نظيفة ومتجانسة تليق بالتسليم النهائي." }
      ]
    };
  }

  function saveCustomization(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('kb:customization', { detail: data }));
  }

  function getNotice() {
    try { return JSON.parse(localStorage.getItem(NOTICE_KEY) || 'null'); }
    catch (e) { return null; }
  }

  function saveNotice(data) {
    localStorage.setItem(NOTICE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('kb:notice', { detail: data }));
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

  // =========================================================
  // PASSWORD PROMPT — Simple & Robust
  // =========================================================
  function askPassword() {
    // احذف أي نافذة قديمة
    document.querySelector('.kb-password-prompt')?.remove();

    const prompt = document.createElement('div');
    prompt.className = 'kb-password-prompt';
    prompt.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      font-family: 'Cairo', sans-serif;
      direction: rtl;
    `;

    prompt.innerHTML = `
      <div style="
        width: min(420px, 100%);
        padding: 40px 32px;
        background: #161616;
        border: 1px solid #262626;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.9);
      ">
        <h2 style="color:#F5F5F5;font-size:1.5rem;margin:0 0 12px;font-weight:900;">لوحة التحكم</h2>
        <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 24px;font-weight:600;">أدخل كلمة المرور للوصول</p>
        <input
          type="password"
          id="kbPassInput"
          inputmode="numeric"
          maxlength="4"
          autocomplete="off"
          placeholder="••••"
          style="
            width:100%;
            padding:18px;
            border:1px solid #262626;
            border-radius:8px;
            background:#0E0E0E;
            color:#F5F5F5;
            font-size:1.75rem;
            text-align:center;
            letter-spacing:0.5em;
            font-family:'JetBrains Mono',monospace;
            outline:none;
            box-sizing:border-box;
          "
        />
        <div id="kbPassError" style="color:#EF4444;font-size:0.85rem;min-height:20px;margin:12px 0;font-weight:700;"></div>
        <div style="display:flex;gap:8px;">
          <button id="kbPassCancel" style="
            flex:1;
            padding:14px;
            border-radius:6px;
            border:1px solid #262626;
            background:transparent;
            color:#F5F5F5;
            font-family:inherit;
            font-size:0.95rem;
            font-weight:700;
            cursor:pointer;
          ">إلغاء</button>
          <button id="kbPassConfirm" style="
            flex:1;
            padding:14px;
            border-radius:6px;
            border:1px solid #E87722;
            background:#E87722;
            color:#FFF;
            font-family:inherit;
            font-size:0.95rem;
            font-weight:800;
            cursor:pointer;
          ">دخول</button>
        </div>
      </div>
    `;
    document.body.appendChild(prompt);

    const input = prompt.querySelector('#kbPassInput');
    const error = prompt.querySelector('#kbPassError');
    const confirm = prompt.querySelector('#kbPassConfirm');
    const cancel = prompt.querySelector('#kbPassCancel');

    setTimeout(() => input.focus(), 100);

    function tryLogin() {
      const val = input.value.trim();
      if (val === PASSWORD) {
        prompt.remove();
        openAdminPanel();
      } else {
        error.textContent = '❌ كلمة المرور غير صحيحة';
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

  // =========================================================
  // ADMIN PANEL — with inline fallback styles
  // =========================================================
  function openAdminPanel() {
    document.querySelector('.kb-admin-overlay')?.remove();

    const overlay = document.createElement('div');
    overlay.className = 'kb-admin-overlay open';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 2147483646;
      background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: 'Cairo', sans-serif;
      direction: rtl;
    `;

    overlay.innerHTML = `
      <div style="
        width: min(1200px, 100%);
        height: min(800px, 90vh);
        background: #161616;
        border: 1px solid #262626;
        border-radius: 12px;
        display: grid;
        grid-template-columns: 240px 1fr;
        overflow: hidden;
        box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.7);
      ">
        <aside style="
          background: #1E1E1E;
          border-left: 1px solid #262626;
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        ">
          <div style="padding: 0 24px 24px; border-bottom: 1px solid #262626; margin-bottom: 16px; display: flex; align-items: center; gap: 10px;">
            <img src="assets/katanbuild-logo.png" alt="katanbuild" style="height:32px;width:auto;" onerror="this.style.display='none'" />
            <div>
              <div style="font-weight:900;font-size:0.95rem;color:#F5F5F5;">katanbuild</div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#E87722;letter-spacing:0.15em;text-transform:uppercase;margin-top:2px;">Admin Panel</div>
            </div>
          </div>
          <nav style="display:flex;flex-direction:column;gap:2px;padding:0 12px;">
            <button data-panel="content" class="kb-admin-nav-btn" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:6px;border:none;background:#E87722;color:white;font-family:inherit;font-size:0.9rem;font-weight:700;text-align:right;cursor:pointer;"><span>📝</span> المحتوى</button>
            <button data-panel="images" class="kb-admin-nav-btn" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:6px;border:none;background:transparent;color:#8A8A8A;font-family:inherit;font-size:0.9rem;font-weight:700;text-align:right;cursor:pointer;"><span>🖼</span> الصور</button>
            <button data-panel="categories" class="kb-admin-nav-btn" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:6px;border:none;background:transparent;color:#8A8A8A;font-family:inherit;font-size:0.9rem;font-weight:700;text-align:right;cursor:pointer;"><span>📦</span> الأقسام</button>
            <button data-panel="notice" class="kb-admin-nav-btn" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:6px;border:none;background:transparent;color:#8A8A8A;font-family:inherit;font-size:0.9rem;font-weight:700;text-align:right;cursor:pointer;"><span>🔔</span> الإشعار</button>
            <button data-panel="settings" class="kb-admin-nav-btn" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:6px;border:none;background:transparent;color:#8A8A8A;font-family:inherit;font-size:0.9rem;font-weight:700;text-align:right;cursor:pointer;"><span>⚙</span> الإعدادات</button>
          </nav>
        </aside>
        <main style="display:flex;flex-direction:column;overflow:hidden;background:#0E0E0E;">
          <header style="padding:24px 32px;border-bottom:1px solid #262626;display:flex;align-items:center;justify-content:space-between;gap:16px;">
            <div>
              <h1 id="kbPanelTitle" style="font-size:1.5rem;font-weight:900;color:#F5F5F5;margin:0;">المحتوى</h1>
              <p id="kbPanelSubtitle" style="font-size:0.85rem;color:#8A8A8A;margin:4px 0 0;font-weight:600;">عدّل النصوص والمسميات</p>
            </div>
            <button id="kbAdminClose" style="width:40px;height:40px;border-radius:6px;border:1px solid #262626;background:transparent;color:#F5F5F5;font-size:1.25rem;cursor:pointer;">✕</button>
          </header>
          <div id="kbAdminBody" style="flex:1;overflow-y:auto;padding:32px;color:#F5F5F5;font-family:'Cairo',sans-serif;"></div>
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
        overlay.querySelectorAll('[data-panel]').forEach((b) => {
          b.style.background = 'transparent';
          b.style.color = '#8A8A8A';
        });
        btn.style.background = '#E87722';
        btn.style.color = 'white';
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
      categories: ['الأقسام', 'أضف، عدّل، أو احذف الأقسام'],
      notice: ['الإشعار', 'إرسال إشعار 24 ساعة للموقع'],
      settings: ['الإعدادات', 'نسخ احتياطي وإعادة الضبط']
    };

    title.textContent = panelTitles[currentPanel][0];
    subtitle.textContent = panelTitles[currentPanel][1];

    if (currentPanel === 'content') renderContentPanel(body, data);
    else if (currentPanel === 'images') renderImagesPanel(body, data);
    else if (currentPanel === 'categories') renderCategoriesPanel(body, data);
    else if (currentPanel === 'notice') renderNoticePanel(body, data);
    else if (currentPanel === 'settings') renderSettingsPanel(body, data);
  }

  const inputStyle = 'width:100%;padding:12px 14px;border:1px solid #262626;border-radius:6px;background:#0E0E0E;color:#F5F5F5;font-family:inherit;font-size:0.95rem;outline:none;box-sizing:border-box;font-weight:600;';
  const labelStyle = 'display:block;font-size:0.8rem;font-weight:700;color:#8A8A8A;letter-spacing:0.03em;text-transform:uppercase;font-family:"JetBrains Mono",monospace;margin-bottom:8px;';
  const fieldStyle = 'display:flex;flex-direction:column;margin-bottom:20px;';
  const cardStyle = 'padding:24px;border:1px solid #262626;border-radius:8px;background:#1E1E1E;margin-bottom:16px;';
  const primaryBtnStyle = 'padding:12px 22px;border-radius:6px;border:1px solid #E87722;background:#E87722;color:white;font-family:inherit;font-size:0.9rem;font-weight:800;cursor:pointer;';
  const outlineBtnStyle = 'padding:12px 22px;border-radius:6px;border:1px solid #262626;background:transparent;color:#F5F5F5;font-family:inherit;font-size:0.9rem;font-weight:700;cursor:pointer;';
  const dangerBtnStyle = 'padding:12px 22px;border-radius:6px;border:1px solid #EF4444;background:transparent;color:#EF4444;font-family:inherit;font-size:0.9rem;font-weight:700;cursor:pointer;';

  function renderContentPanel(body, data) {
    body.innerHTML = `
      <h2 style="font-size:1.25rem;color:#F5F5F5;margin:0 0 8px;font-weight:900;">نصوص Hero</h2>
      <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 24px;font-weight:600;">تعديل العنوان والوصف في الصفحة الرئيسية</p>
      <div style="${fieldStyle}">
        <label style="${labelStyle}">عنوان Hero</label>
        <input type="text" id="kbHeroTitle" value="${escapeHtml(data.hero.title)}" style="${inputStyle}" />
      </div>
      <div style="${fieldStyle}">
        <label style="${labelStyle}">وصف Hero</label>
        <textarea id="kbHeroSubtitle" style="${inputStyle}min-height:80px;resize:vertical;">${escapeHtml(data.hero.subtitle)}</textarea>
      </div>
      <h2 style="font-size:1.25rem;color:#F5F5F5;margin:40px 0 8px;font-weight:900;">بطاقات "لماذا نحن"</h2>
      <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 24px;font-weight:600;">تعديل البطاقات الأربع في الصفحة الرئيسية</p>
      <div id="kbWhyUsList"></div>
      <div style="margin-top:32px;display:flex;gap:12px;">
        <button id="kbSaveContent" style="${primaryBtnStyle}">حفظ التغييرات</button>
      </div>
      <div id="kbContentStatus" style="min-height:20px;margin-top:16px;color:#22C55E;font-weight:700;font-size:0.9rem;"></div>
    `;

    const list = body.querySelector('#kbWhyUsList');
    data.whyUs.forEach((card, i) => {
      const div = document.createElement('div');
      div.style.cssText = cardStyle;
      div.innerHTML = `
        <h3 style="font-size:1rem;color:#F5F5F5;margin:0 0 16px;font-weight:800;">بطاقة ${i + 1}</h3>
        <div style="${fieldStyle}">
          <label style="${labelStyle}">العنوان</label>
          <input type="text" data-why-title="${i}" value="${escapeHtml(card.title)}" style="${inputStyle}" />
        </div>
        <div style="${fieldStyle}margin-bottom:0;">
          <label style="${labelStyle}">النص</label>
          <textarea data-why-text="${i}" style="${inputStyle}min-height:60px;resize:vertical;">${escapeHtml(card.text)}</textarea>
        </div>
      `;
      list.appendChild(div);
    });

    body.querySelector('#kbSaveContent').addEventListener('click', () => {
      const newData = getCustomization();
      newData.hero.title = body.querySelector('#kbHeroTitle').value;
      newData.hero.subtitle = body.querySelector('#kbHeroSubtitle').value;
      newData.whyUs = Array.from(body.querySelectorAll('[data-why-title]')).map((input, i) => ({
        title: input.value,
        text: body.querySelector(`[data-why-text="${i}"]`).value
      }));
      saveCustomization(newData);
      body.querySelector('#kbContentStatus').textContent = '✅ تم حفظ المحتوى بنجاح';
      toast('تم حفظ المحتوى', 'success');
    });
  }

  function renderImagesPanel(body, data) {
    const categoryNames = ['مواد الطينة', 'مواد العزل', 'لواصق السيراميك', 'العزل الحراري'];
    const pdfKeys = ['render', 'waterproofing', 'ceramic', 'thermal'];

    body.innerHTML = `
      <h2 style="font-size:1.25rem;color:#F5F5F5;margin:0 0 8px;font-weight:900;">صور الأقسام</h2>
      <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 24px;font-weight:600;">غيّر صورة كل قسم وأرفق ملف PDF</p>
      <div id="kbImageList"></div>
      <h2 style="font-size:1.25rem;color:#F5F5F5;margin:40px 0 8px;font-weight:900;">صور Hero</h2>
      <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 24px;font-weight:600;">الصور الثلاث المتغيرة</p>
      <div id="kbHeroList"></div>
      <div style="margin-top:32px;display:flex;gap:12px;">
        <button id="kbSaveImages" style="${primaryBtnStyle}">حفظ التغييرات</button>
      </div>
      <div id="kbImagesStatus" style="min-height:20px;margin-top:16px;color:#22C55E;font-weight:700;font-size:0.9rem;"></div>
    `;

    const list = body.querySelector('#kbImageList');
    categoryNames.forEach((name, i) => {
      const pdfKey = pdfKeys[i];
      const pdfData = data.pdfs[pdfKey];
      const div = document.createElement('div');
      div.style.cssText = cardStyle;
      div.innerHTML = `
        <h3 style="font-size:1rem;color:#F5F5F5;margin:0 0 16px;font-weight:800;">${name}</h3>
        <div style="width:100%;aspect-ratio:16/10;background-image:url('${data.productImages[i]}');background-size:cover;background-position:center;border-radius:8px;border:1px solid #262626;margin-bottom:16px;"></div>
        <div style="${fieldStyle}">
          <label style="${labelStyle}">رابط الصورة</label>
          <input type="text" data-img-index="${i}" value="${escapeHtml(data.productImages[i])}" style="${inputStyle}" />
        </div>
        <div style="${fieldStyle}">
          <label style="${labelStyle}">أو ارفع صورة</label>
          <input type="file" accept="image/*" data-img-upload="${i}" style="${inputStyle}padding:10px;cursor:pointer;" />
        </div>
        <div style="${fieldStyle}">
          <label style="${labelStyle}">ملف PDF (اختياري)</label>
          <input type="file" accept="application/pdf" data-pdf-upload="${pdfKey}" style="${inputStyle}padding:10px;cursor:pointer;" />
          ${pdfData ? `<div style="margin-top:8px;color:#22C55E;font-size:0.85rem;font-weight:700;">✓ ${escapeHtml(pdfData.name)}</div><button data-pdf-remove="${pdfKey}" style="${dangerBtnStyle}margin-top:8px;font-size:0.8rem;padding:8px 14px;">حذف PDF</button>` : ''}
        </div>
      `;
      list.appendChild(div);
    });

    const heroList = body.querySelector('#kbHeroList');
    data.heroImages.forEach((url, i) => {
      const div = document.createElement('div');
      div.style.cssText = cardStyle;
      div.innerHTML = `
        <h3 style="font-size:1rem;color:#F5F5F5;margin:0 0 16px;font-weight:800;">شريحة ${i + 1}</h3>
        <div style="width:100%;aspect-ratio:16/10;background-image:url('${url}');background-size:cover;background-position:center;border-radius:8px;border:1px solid #262626;margin-bottom:16px;"></div>
        <div style="${fieldStyle}margin-bottom:0;">
          <label style="${labelStyle}">رابط الصورة</label>
          <input type="text" data-hero-img="${i}" value="${escapeHtml(url)}" style="${inputStyle}" />
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
          if (textInput) textInput.value = reader.result;
          const preview = input.closest('div[style*="border-radius:8px"]');
          if (preview) preview.style.backgroundImage = `url('${reader.result}')`;
          toast('تم رفع الصورة', 'success');
        });
        reader.readAsDataURL(file);
      });
    });

    body.querySelectorAll('[data-pdf-upload]').forEach((input) => {
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { toast('حجم PDF يجب ألا يتجاوز 5MB', 'error'); return; }
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const newData = getCustomization();
          newData.pdfs[input.dataset.pdfUpload] = { name: file.name, data: reader.result, size: file.size };
          saveCustomization(newData);
          toast('تم رفع PDF', 'success');
          renderPanel(body.closest('.kb-admin-overlay'));
        });
        reader.readAsDataURL(file);
      });
    });

    body.querySelectorAll('[data-pdf-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const newData = getCustomization();
        newData.pdfs[btn.dataset.pdfRemove] = null;
        saveCustomization(newData);
        toast('تم حذف PDF', 'success');
        renderPanel(body.closest('.kb-admin-overlay'));
      });
    });

    body.querySelector('#kbSaveImages').addEventListener('click', () => {
      const newData = getCustomization();
      newData.productImages = Array.from(body.querySelectorAll('[data-img-index]')).map((input) => input.value);
      newData.heroImages = Array.from(body.querySelectorAll('[data-hero-img]')).map((input) => input.value);
      saveCustomization(newData);
      body.querySelector('#kbImagesStatus').textContent = '✅ تم حفظ الصور';
      toast('تم حفظ الصور', 'success');
    });
  }

  function renderCategoriesPanel(body, data) {
    body.innerHTML = `
      <h2 style="font-size:1.25rem;color:#F5F5F5;margin:0 0 8px;font-weight:900;">الأقسام (${data.categories.length})</h2>
      <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 24px;font-weight:600;">أضف قسم جديد، أو عدّل الموجود، أو احذف</p>
      <div id="kbCategoriesList"></div>
      <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap;">
        <button id="kbAddCategory" style="${primaryBtnStyle}">+ إضافة قسم جديد</button>
        <button id="kbSaveCategories" style="${outlineBtnStyle}">حفظ التعديلات</button>
      </div>
      <div id="kbCategoriesStatus" style="min-height:20px;margin-top:16px;color:#22C55E;font-weight:700;font-size:0.9rem;"></div>
    `;

    const list = body.querySelector('#kbCategoriesList');
    data.categories.forEach((cat, i) => {
      const div = document.createElement('div');
      div.style.cssText = cardStyle;
      div.dataset.categoryIndex = i;
      div.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:16px;">
          <h3 style="font-size:1rem;color:#F5F5F5;margin:0;font-weight:800;">القسم ${i + 1}</h3>
          <button data-remove-cat="${i}" style="${dangerBtnStyle}font-size:0.8rem;padding:8px 14px;">حذف</button>
        </div>
        <div style="${fieldStyle}">
          <label style="${labelStyle}">Slug</label>
          <input type="text" data-cat-slug="${i}" value="${escapeHtml(cat.slug)}" style="${inputStyle}" />
        </div>
        <div style="${fieldStyle}">
          <label style="${labelStyle}">اسم القسم</label>
          <input type="text" data-cat-category="${i}" value="${escapeHtml(cat.category)}" style="${inputStyle}" />
        </div>
        <div style="${fieldStyle}">
          <label style="${labelStyle}">العنوان</label>
          <input type="text" data-cat-title="${i}" value="${escapeHtml(cat.title)}" style="${inputStyle}" />
        </div>
        <div style="${fieldStyle}margin-bottom:0;">
          <label style="${labelStyle}">وصف قصير</label>
          <textarea data-cat-short="${i}" style="${inputStyle}min-height:60px;resize:vertical;">${escapeHtml(cat.short)}</textarea>
        </div>
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
      body.querySelector('#kbCategoriesStatus').textContent = '✅ تم حفظ الأقسام';
      toast('تم حفظ الأقسام', 'success');
    });
  }

  function renderNoticePanel(body, data) {
    const notice = getNotice() || { active: false, message: 'الموقع في وضع تجريبي، يرجى تأكيد الدفع خلال 24 ساعة.', expires: null };

    body.innerHTML = `
      <h2 style="font-size:1.25rem;color:#F5F5F5;margin:0 0 8px;font-weight:900;">إشعار الموقع</h2>
      <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 24px;font-weight:600;">أرسل إشعاراً لجميع الزوار يطالبهم بالدفع خلال 24 ساعة</p>
      <div style="${cardStyle}">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:16px;">
          <h3 style="font-size:1rem;color:#F5F5F5;margin:0;font-weight:800;">حالة الإشعار</h3>
          <span style="color:${notice.active ? '#22C55E' : '#8A8A8A'};font-size:0.85rem;font-weight:700;">
            ${notice.active ? '● نشط' : '○ متوقف'}
          </span>
        </div>
        <div style="${fieldStyle}">
          <label style="${labelStyle}">نص الإشعار</label>
          <textarea id="kbNoticeMsg" style="${inputStyle}min-height:80px;resize:vertical;">${escapeHtml(notice.message)}</textarea>
        </div>
        <div style="${fieldStyle}">
          <label style="${labelStyle}">مدة الإشعار (بالساعات)</label>
          <input type="number" id="kbNoticeHours" min="1" max="72" value="24" style="${inputStyle}" />
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button id="kbActivateNotice" style="${primaryBtnStyle}">🔔 إرسال الإشعار</button>
          <button id="kbDeactivateNotice" style="${outlineBtnStyle}">⏹ إيقاف الإشعار</button>
        </div>
      </div>
      <div style="${cardStyle}border-color:#EF4444;">
        <h3 style="font-size:1rem;color:#EF4444;margin:0 0 12px;font-weight:800;">وضع الحجب الكامل</h3>
        <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 16px;font-weight:600;">عند تفعيله، لن يستطيع الزوار رؤية الموقع حتى يتم الدفع.</p>
        <button id="kbActivateGate" style="${dangerBtnStyle}">🚫 تفعيل حجب الموقع</button>
      </div>
      <div id="kbNoticeStatus" style="min-height:20px;margin-top:16px;color:#22C55E;font-weight:700;font-size:0.9rem;"></div>
    `;

    body.querySelector('#kbActivateNotice').addEventListener('click', () => {
      const message = body.querySelector('#kbNoticeMsg').value;
      const hours = Number(body.querySelector('#kbNoticeHours').value) || 24;
      const expires = new Date(Date.now() + hours * 3600 * 1000).toISOString();
      saveNotice({ active: true, message, expires, gate: false });
      toast('تم تفعيل الإشعار', 'success');
      body.querySelector('#kbNoticeStatus').textContent = '✅ تم إرسال الإشعار لجميع الزوار';
    });

    body.querySelector('#kbDeactivateNotice').addEventListener('click', () => {
      saveNotice({ active: false, message: '', expires: null, gate: false });
      toast('تم إيقاف الإشعار', 'success');
      body.querySelector('#kbNoticeStatus').textContent = '⏹ تم إيقاف الإشعار';
    });

    body.querySelector('#kbActivateGate').addEventListener('click', () => {
      if (!confirm('تحذير: سيتم حجب الموقع بالكامل عن جميع الزوار حتى يتم الدفع. متابعة؟')) return;
      const message = body.querySelector('#kbNoticeMsg').value || 'الموقع محجوب حتى يتم تأكيد الدفع.';
      saveNotice({ active: true, message, expires: null, gate: true });
      toast('تم تفعيل الحجب الكامل', 'success');
      body.querySelector('#kbNoticeStatus').textContent = '🚫 الموقع محجوب الآن';
    });
  }

  function renderSettingsPanel(body, data) {
    body.innerHTML = `
      <h2 style="font-size:1.25rem;color:#F5F5F5;margin:0 0 8px;font-weight:900;">النسخ الاحتياطي</h2>
      <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 24px;font-weight:600;">صدّر كل إعدادات الموقع كملف JSON، أو استوردها</p>
      <div style="${cardStyle}">
        <h3 style="font-size:1rem;color:#F5F5F5;margin:0 0 12px;font-weight:800;">تصدير الإعدادات</h3>
        <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 16px;font-weight:600;">احفظ ملف JSON يحتوي على كل تعديلاتك.</p>
        <button id="kbExport" style="${primaryBtnStyle}">📥 تصدير JSON</button>
      </div>
      <div style="${cardStyle}">
        <h3 style="font-size:1rem;color:#F5F5F5;margin:0 0 12px;font-weight:800;">استيراد الإعدادات</h3>
        <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 16px;font-weight:600;">استورد ملف JSON لإعادة كل الإعدادات.</p>
        <input type="file" accept="application/json" id="kbImport" style="${inputStyle}padding:10px;cursor:pointer;" />
      </div>
      <div style="${cardStyle}border-color:#EF4444;">
        <h3 style="font-size:1rem;color:#EF4444;margin:0 0 12px;font-weight:800;">منطقة الخطر</h3>
        <p style="color:#8A8A8A;font-size:0.9rem;margin:0 0 16px;font-weight:600;">إعادة تعيين كل الإعدادات للحالة الافتراضية.</p>
        <button id="kbReset" style="${dangerBtnStyle}">🗑 إعادة تعيين كل شيء</button>
      </div>
      <div id="kbSettingsStatus" style="min-height:20px;margin-top:16px;color:#22C55E;font-weight:700;font-size:0.9rem;"></div>
    `;

    body.querySelector('#kbExport').addEventListener('click', () => {
      const all = { customization: getCustomization(), notice: getNotice(), exportedAt: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `katanbuild-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast('تم تصدير الملف', 'success');
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
      body.querySelector('#kbSettingsStatus').textContent = '✅ تمت إعادة التعيين';
      setTimeout(() => location.reload(), 1500);
    });
  }

  function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>'"]/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[c]));
  }

  // =========================================================
  // MULTIPLE WAYS TO OPEN ADMIN PANEL
  // =========================================================

  // 1) 5 clicks on logo
  function getBrandElement() {
    return document.getElementById('brandTrigger')
      || document.querySelector('#site-header .brand')
      || document.querySelector('.brand');
  }

  function initLogoTrigger() {
    const brand = getBrandElement();
    if (!brand) {
      setTimeout(initLogoTrigger, 500);
      return;
    }
    if (brand.dataset.adminReady) return;
    brand.dataset.adminReady = 'true';

    console.log('✅ brand trigger wired:', brand);

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

      clickTimer = setTimeout(() => { clickCount = 0; }, CLICK_TIMEOUT);
    }, true);
  }

  // 2) Keyboard shortcut: Ctrl+Shift+K
  function initKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'K' || e.key === 'k')) {
        e.preventDefault();
        askPassword();
      }
    });
  }

  // 3) URL parameter: ?admin=1
  function initURLTrigger() {
    const params = new URLSearchParams(location.search);
    if (params.get('admin') === '1') {
      setTimeout(askPassword, 500);
    }
  }

  function init() {
    initLogoTrigger();
    initKeyboardShortcut();
    initURLTrigger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  const observer = new MutationObserver(() => { initLogoTrigger(); });
  observer.observe(document.body, { childList: true, subtree: false });

  window.KBAdmin = { open: askPassword, getCustomization, saveCustomization, getNotice, saveNotice, toast };

  console.log('%c🔐 katanbuild Admin', 'color:#E87722;font-weight:bold;font-size:14px;');
  console.log('%c3 طرق للفتح: ① انقر 5 مرات على الشعار ② اضغط Ctrl+Shift+K ③ افتح ?admin=1', 'color:#8A8A8A;font-size:12px;');
})();
