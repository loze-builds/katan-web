/* katanbuild — content & translation data */
window.SITE = {
  brand: "katanbuild",
  logo: "assets/katanbuild-logo.png",
  media: {
    heroSlides: [
      { image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80" },
      { image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80" },
      { image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80" }
    ],
    background: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
    productImages: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80",
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
    ],
    projectImages: [
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
    ]
  },
  site: {
    phone: "+963952725590",
    email: "info@katanbuild.example",
    address: { ar: "دمشق، سوريا", en: "Damascus, Syria" }
  },
  products: [
    {
      slug: "render-plaster-materials",
      category: { ar: "مواد الطينة", en: "Render Materials" },
      title: { ar: "طينة الديكور", en: "Render & Plaster" },
      short: {
        ar: "قسم مخصص لخلطات الطينة الجاهزة ومواد التسوية التي تمنح الجدران سطحاً قوياً ومتجانساً قبل التشطيب النهائي.",
        en: "Ready-mix render, plaster and leveling materials that create strong, uniform surfaces before final finishing."
      },
      details: {
        ar: "تضم هذه المجموعة مواد طينة إسمنتية وبوليمرية مناسبة للأعمال الداخلية والخارجية، وتساعد على تحسين الالتصاق وتقليل التشققات وتسريع تنفيذ أعمال الإكساء وفق معايير تطبيق واضحة.",
        en: "This section includes cementitious and polymer-modified render materials for interior and exterior applications, improving adhesion, reducing cracking, and supporting faster finishing work."
      },
      specs: [
        { ar: "الاستخدام", en: "Use", val: { ar: "داخلي وخارجي", en: "Interior & exterior" } },
        { ar: "زمن الشغل", en: "Working time", val: { ar: "٦٠ – ٩٠ دقيقة", en: "60–90 minutes" } },
        { ar: "سماكة الطبقة", en: "Layer thickness", val: { ar: "٥ – ٢٠ ملم", en: "5–20 mm" } },
        { ar: "التغليف", en: "Packaging", val: { ar: "أكياس ٢٥ كغ", en: "25 kg bags" } }
      ],
      items: [
        "طينة إسمنتية داخلية",
        "طينة خارجية مقاومة للعوامل",
        "مادة تسوية الجدران",
        "طينة ديكورية ناعمة"
      ].map((name, index) => ({
        slug: `render-${index + 1}`,
        title: { ar: name, en: `Render material ${index + 1}` },
        imageIndex: 0
      }))
    },
    {
      slug: "waterproofing-materials",
      category: { ar: "مواد العزل", en: "Waterproofing" },
      title: { ar: "مواد العزل", en: "Waterproofing" },
      short: {
        ar: "قسم يضم مواد عزل عالية الأداء لحماية الأسطح والمناطق الرطبة والعناصر الإنشائية من تسرب المياه والرطوبة.",
        en: "High-performance waterproofing materials that protect roofs, wet areas, and structural elements."
      },
      details: {
        ar: "تشمل هذه المجموعة طلاءات عزل مرنة ومواد معالجة للأسطح المعرضة للماء، وتُستخدم في الأسطح والحمامات والمطابخ والخزانات والأقبية.",
        en: "This section includes flexible waterproofing coatings and surface treatment materials for water-exposed areas."
      },
      specs: [
        { ar: "الاستخدام", en: "Use", val: { ar: "أسطح، حمامات، خزانات", en: "Roofs, wet areas, tanks" } },
        { ar: "المرونة", en: "Flexibility", val: { ar: "مرن حتى تشقق ٢ ملم", en: "Bridges cracks up to 2 mm" } },
        { ar: "عدد الطبقات", en: "Coats", val: { ar: "طبقتان متقاطعتان", en: "Two cross-coats" } },
        { ar: "التغليف", en: "Packaging", val: { ar: "دلاء ١٨ / ٥ كغ", en: "18 / 5 kg pails" } }
      ],
      items: [
        "عزل أسطح مرن",
        "عزل حمامات ومطابخ",
        "عزل خزانات المياه",
        "معالجة الرطوبة والشقوق"
      ].map((name, index) => ({
        slug: `waterproofing-${index + 1}`,
        title: { ar: name, en: `Waterproofing material ${index + 1}` },
        imageIndex: 1
      }))
    },
    {
      slug: "ceramic-adhesive-grout",
      category: { ar: "لواصق السيراميك", en: "Tile & Ceramic" },
      title: { ar: "لاصق وروبة السيراميك", en: "Ceramic Adhesive & Grout" },
      short: {
        ar: "قسم خاص بمواد لصق السيراميك وروبة الفواصل المناسبة لأعمال الإكساء الداخلية والخارجية.",
        en: "Ceramic adhesives and grouts designed for interior and exterior tiling works."
      },
      details: {
        ar: "يشمل هذا القسم منتجات تساعد على تثبيت البلاط والسيراميك بقوة وتعبئة الفواصل بشكل متجانس.",
        en: "This section includes products that support strong tile bonding and clean joint filling."
      },
      specs: [
        { ar: "الاستخدام", en: "Use", val: { ar: "بلاط، سيراميك، حجر", en: "Tile, ceramic, stone" } },
        { ar: "زمن الفتح", en: "Open time", val: { ar: "٢٠ – ٣٠ دقيقة", en: "20–30 minutes" } },
        { ar: "قوة الالتصاق", en: "Bond strength", val: { ar: "≥ ١ نيوتن/ملم²", en: "≥ 1 N/mm²" } },
        { ar: "التغليف", en: "Packaging", val: { ar: "أكياس ٢٥ كغ", en: "25 kg bags" } }
      ],
      items: [
        "لاصق إسمنتي C1",
        "لاصق إسمنتي C1T",
        "لاصق إسمنتي C1TE",
        "لاصق محسن C2",
        "لاصق محسن C2T",
        "لاصق محسن C2TE",
        "لاصق مرن C2TES1",
        "لاصق فائق المرونة C2TES2",
        "روبة مطاطية",
        "روبة إسمنتية مع السيليكون",
        "برايمر تجهيز الأسطح"
      ].map((name, index) => ({
        slug: `ceramic-${index + 1}`,
        title: { ar: name, en: `Ceramic system ${index + 1}` },
        imageIndex: 2
      }))
    },
    {
      slug: "thermal-insulation-materials",
      category: { ar: "العزل الحراري", en: "Thermal Insulation" },
      title: { ar: "مواد العزل الحراري", en: "Thermal Insulation" },
      short: {
        ar: "قسم مواد العزل الحراري لواجهات المباني، لتقليل انتقال الحرارة وتحسين كفاءة الطاقة.",
        en: "Thermal insulation materials for building facades, reducing heat transfer and improving energy efficiency."
      },
      details: {
        ar: "تشمل هذه المجموعة أنظمة عزل حراري للواجهات مع طبقات تسوية وتسليح.",
        en: "This section includes facade thermal-insulation systems with leveling and reinforcement layers."
      },
      specs: [
        { ar: "الاستخدام", en: "Use", val: { ar: "واجهات خارجية", en: "External facades" } },
        { ar: "سماكة اللوح", en: "Panel thickness", val: { ar: "٤ – ١٠ سم", en: "4–10 cm" } },
        { ar: "التوصيل الحراري", en: "Thermal conductivity", val: { ar: "≤ ٠.٠٤ واط/م.كلفن", en: "≤ 0.04 W/m·K" } },
        { ar: "التغليف", en: "Packaging", val: { ar: "ألواح / أكياس تسوية", en: "Panels / leveling bags" } }
      ],
      items: [
        "ألواح عزل حراري للواجهات",
        "لاصق ألواح العزل",
        "شبك تسليح الواجهات",
        "طبقة تسوية حرارية"
      ].map((name, index) => ({
        slug: `thermal-${index + 1}`,
        title: { ar: name, en: `Thermal insulation material ${index + 1}` },
        imageIndex: 3
      }))
    }
  ],
  productTools: {
    coverage: 4,
    packageLabel: { ar: "كيس / عبوة", en: "bag / package" }
  },
  projects: [
    {
      slug: "waterproofing-workshops",
      title: { ar: "ورشات عزل", en: "Waterproofing Workshops" },
      desc: {
        ar: "ورشات ميدانية مخصصة لتطبيق مواد العزل على الأسطح والمناطق الرطبة.",
        en: "On-site workshops focused on applying waterproofing materials."
      },
      features: {
        ar: ["عزل أسطح سكنية وتجارية", "معالجة مناطق الحمامات والمطابخ", "عزل خزانات المياه"],
        en: ["Residential & commercial roof waterproofing", "Bathroom & kitchen wet-area treatment", "Water tank waterproofing"]
      }
    },
    {
      slug: "facade-renovation",
      title: { ar: "تحديث واجهات", en: "Facade Renovation" },
      desc: {
        ar: "أعمال تجديد وتحديث واجهات المباني باستخدام مواد طينة وتشطيب من katanbuild.",
        en: "Building facade renovation and refresh work using katanbuild materials."
      },
      features: {
        ar: ["تجديد واجهات مباني سكنية", "معالجة تشققات وتسويات سابقة", "تشطيبات نهائية بلمسات متعددة"],
        en: ["Residential building facade refresh", "Repairing old cracks and leveling", "Multi-texture final finishes"]
      }
    },
    {
      slug: "ceramic-adhesive-workshops",
      title: { ar: "ورشات لاصق سيراميك", en: "Ceramic Adhesive Workshops" },
      desc: {
        ar: "ورشات تركيب بلاط وسيراميك باستخدام أنظمة اللصق والروبة الخاصة بـ katanbuild.",
        en: "Tile and ceramic installation workshops using katanbuild systems."
      },
      features: {
        ar: ["تركيب أرضيات وجدران سيراميك", "أعمال حجر وبلاط خارجي", "تعبئة فواصل ومعالجة نهائية"],
        en: ["Floor & wall ceramic installation", "External stone & tile work", "Joint filling and final treatment"]
      }
    },
    {
      slug: "thermal-insulation-workshops",
      title: { ar: "ورشات عزل حراري", en: "Thermal Insulation Workshops" },
      desc: {
        ar: "ورشات تنفيذ أنظمة العزل الحراري للواجهات لتحسين كفاءة الطاقة في المباني.",
        en: "Execution workshops for facade thermal-insulation systems."
      },
      features: {
        ar: ["تركيب ألواح عزل حراري", "طبقات تسليح وتسوية للواجهة", "تشطيب نهائي جاهز للطلاء"],
        en: ["Thermal panel installation", "Facade reinforcement & leveling layers", "Paint-ready final finish"]
      }
    }
  ],
  milestones: [
    { year: "2012", key: "2012" },
    { year: "2016", key: "2016" },
    { year: "2021", key: "2021" },
    { year: "2026", key: "2026" }
  ]
};
