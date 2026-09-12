/* =========================================================
   katanbuild — Admin Panel (Comprehensive)
   5 clicks on logo + password 1992
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

  // ---------- GET / SAVE ----------
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
        { title: "نتائج احترافية", text: "لمسة نهائية نظيفة ومتجانسة تليق بالتسليم النهائي." }
      ]
    };
  }

  function saveCustomization(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('kb:customization', { detail: data }));
  }

  // ---------- NOTICE ----------
  function getNotice() {
    try { return JSON.parse(localStorage.getItem(NOTICE_KEY) || 'null'); }
    catch (e) { return null; }
  }

  function saveNotice(data) {
    localStorage.setItem(NOTICE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('kb:notice', { detail: data }));
  }

  // ---------- TOAST ----------
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

  // ---------- PASSWORD PROMPT ----------
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

  // ---------- ADMIN PANEL ----------
  function openAdminPanel() {
    const existing = document.querySelector('.kb-admin-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'kb-admin-overlay open';
    overlay.innerHTML = `
      <div class="kb-admin-dialog">
        <aside class="kb-admin-sidebar">
          <div class="kb-admin-brand">
            <img src="assets/katanbuild-logo.png" alt="katanbuild" />
            <div>
              <span>katanbuild</span>
              <small>Admin Panel</small>
            </div>
          </div>
          <nav class="kb-admin-nav">
            <button data-panel="content" class="active"><span class="icon">📝</span> المحتوى</button>
            <button data-panel="images"><span class="icon">🖼</span> الصور</button>
            <button data-panel="categories"><span class="icon">📦</span> الأقسام</button>
            <button data-panel="notice"><span class="icon">🔔</span> الإشعار</button>
            <button data-panel="settings"><span class="icon">⚙</span> الإعدادات</button>
          </nav>
          <div class="kb-admin-sidebar-footer">v2.0 · 2026</div>
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

  function renderImagesPanel(body, data) {
    const categoryNames = ['مواد الطينة', 'مواد العزل', 'لواصق السيراميك', 'العزل الحراري'];
    const pdfKeys = ['render', 'waterproofing', 'ceramic', 'thermal'];

    body.innerHTML = `
      <h2>صور الأقسام</h2>
      <p class="hint">غيّر صورة كل قسم وأرفق ملف PDF خاص به</p>
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
      const pdfKey = pdfKeys[i];
      const pdfData = data.pdfs[pdfKey];
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
        <div class="kb-field">
          <label>ملف PDF (اختياري)</label>
          <div class="kb-file-input">
            <span class="icon">📄</span>
            <div class="text">
              <strong>${pdfData ? pdfData.name : 'رفع PDF'}</strong>
              <span>${pdfData ? 'اضغط للاستبدال' : 'PDF · حد أقصى 5MB'}</span>
            </div>
            <input type="file" accept="application/pdf" data-pdf-upload="${pdfKey}" />
          </div>
        </div>
        ${pdfData ? `<button class="kb-btn kb-btn-danger kb-btn-sm" data-pdf-remove="${pdfKey}">حذف PDF</button>` : ''}
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
      showStatus(body.querySelector('#kbImagesStatus'), 'تم حفظ الصور', 'success');
      toast('تم حفظ الصور', 'success');
    });
  }

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

  // =========================================================
  // LOGO CLICK HANDLER — يستهدف #brandTrigger أو .brand في الهيدر فقط
  // =========================================================
  function getBrandElement() {
    // أولوية 1: ID محدد
    const byId = document.getElementById('brandTrigger');
    if (byId) return byId;

    // أولوية 2: .brand داخل .site-header فقط (وليس في الـ Footer)
    const header = document.getElementById('site-header');
    if (header) {
      const inHeader = header.querySelector('.brand');
      if (inHeader) return inHeader;
    }

    // أولوية 3: أول .brand في الصفحة (احتياطي)
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
    }, true); // ← true = capture phase (يمنع propagation من عناصر أخرى)
  }

  function init() {
    initLogoTrigger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-attach when DOM changes
  const observer = new MutationObserver(() => { initLogoTrigger(); });
  observer.observe(document.body, { childList: true, subtree: false });

  window.KBAdmin = {
    open: askPassword,
    getCustomization,
    saveCustomization,
    getNotice,
    saveNotice,
    toast
  };

  console.log('%c🔐 katanbuild Admin', 'color:#E87722;font-weight:bold;font-size:14px;');
  console.log('%cانقر 5 مرات على الشعار + كلمة المرور: 1992', 'color:#8A8A8A;font-size:12px;');
})();
