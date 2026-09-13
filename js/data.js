/* katanbuild — content & translation data */
const productItem = (name, image, slugPrefix) => ({
  slug: `${slugPrefix || 'material'}-${name.replace(/\s+/g, '-').replace(/[^\u0600-\u06ff\w-]/g, '')}`,
  title: { ar: name, en: name },
  image
});

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
      "https://i.ibb.co/k6P984Kj/1.png",
      "https://i.ibb.co/mC8WrdpT/image.png",
      "https://i.ibb.co/WNkdYrX0/Whats-App-Image-2026-08-02-at-1-22-48-PM-1.jpg",
      "https://i.ibb.co/tM8PD5Zw/image.jpg",
      "https://i.ibb.co/zhBVtmSV/image.png",
      "https://i.ibb.co/DH4pxrKk/image.png",
      "https://i.ibb.co/q3Dj4LT7/Whats-App-Image-2026-08-02-at-1-22-51-PM.jpg",
      "https://i.ibb.co/ynhz7BSN/Whats-App-Image-2026-08-02-at-1-22-45-PM-1.jpg-3.jpg",
      "https://i.ibb.co/hRf8F8f9/Whats-App-Image-2026-08-02-at-1-22-49-PM.jpg",
      "https://i.ibb.co/MkXSdL7n/Whats-App-Image-2026-08-02-at-1-22-52-PM-3.jpg",
      "https://i.ibb.co/FLLCTb61/Whats-App-Image-2026-08-02-at-1-22-48-PM-2.jpg",
      "https://i.ibb.co/JRW6pYmv/image.png"
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
      category: { ar: "لاصق ديكور", en: "Decorative Adhesives" },
      title: { ar: "لاصق ديكور", en: "Decorative Adhesives" },
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
        productItem("سيتي فيكس", "https://i.ibb.co/WNkdYrX0/Whats-App-Image-2026-08-02-at-1-22-48-PM-1.jpg", "decor"),
        productItem("كارو فيكس", "https://i.ibb.co/k6P984Kj/1.png", "decor"),
        productItem("كلايتور", "https://i.ibb.co/zhBVtmSV/image.png", "decor"),
        productItem("لازورد", "https://i.ibb.co/DH4pxrKk/image.png", "decor")
      ]
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
        productItem("الترا بوند عازل حجر شفاف", "https://i.ibb.co/tpW85TQ7/image.png", "insulation"),
        productItem("الترا بوند عازل بلاستيكي", "https://i.ibb.co/xw3DqkY/image.png", "insulation"),
        productItem("عازل مزكين", "https://i.ibb.co/ycNqfQQF/image.png", "insulation")
      ]
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
        productItem("سيتي فيكس", "https://i.ibb.co/WNkdYrX0/Whats-App-Image-2026-08-02-at-1-22-48-PM-1.jpg", "ceramic"),
        productItem("كرافت", "https://i.ibb.co/q3Dj4LT7/Whats-App-Image-2026-08-02-at-1-22-51-PM-3.jpg", "ceramic"),
        productItem("ليث فيكس", "https://i.ibb.co/ynhz7BSN/Whats-App-Image-2026-08-02-at-1-22-45-PM-1.jpg", "ceramic"),
        productItem("برايمير", "https://i.ibb.co/hRf8F8f9/Whats-App-Image-2026-08-02-at-1-22-49-PM.jpg", "ceramic"),
        productItem("موزيك", "https://i.ibb.co/MkXSdL7n/Whats-App-Image-2026-08-02-at-1-22-52-PM-3.jpg", "ceramic"),
        productItem("بروسيل الأخضر", "https://i.ibb.co/4wXPg9R5/Whats-App-Image-2026-08-02-at-1-22-49-PM-6.jpg", "ceramic"),
        productItem("الترا غريب", "https://i.ibb.co/FLLCTb61/Whats-App-Image-2026-08-02-at-1-22-48-PM-2.jpg", "ceramic"),
        productItem("الترا بوند الأخضر", "https://i.ibb.co/JRW6pYmv/image.png", "ceramic"),
        productItem("توب فيكس لاصق سيراميك", "https://i.ibb.co/27ft38r6/Whats-App-Image-2026-08-02-at-1-22-50-PM-2.jpg", "ceramic"),
        productItem("الشربجي لاصق سيراميك", "https://i.ibb.co/ccy8XFXy/shurbaji.png", "ceramic"),
        productItem("روكي فيكس لاصق سيراميك", "https://i.ibb.co/CsbDvRsb/rocky.png", "ceramic"),
        productItem("الرائد لاصق سيراميك", "https://i.ibb.co/BVXVzBmZ/raed.png", "ceramic"),
        productItem("الرائد ذهبي لاصق سيراميك", "https://i.ibb.co/Cs08vYMV/raed-o.png", "ceramic"),
        productItem("سولد فيكس روبة وطينة", "https://i.ibb.co/sv947RvN/sulid-mix.png", "ceramic"),
        productItem("سولد طينة", "https://i.ibb.co/G4X1YytM/Paper-Bag-Mockup-Solid.png", "ceramic"),
        productItem("أر بي", "https://i.ibb.co/DPCK57x1/r2b.png", "ceramic"),
        productItem("القدس", "https://i.ibb.co/GQTn6NG1/qods.png", "ceramic"),
        productItem("اونيرلو", "https://i.ibb.co/21g55pWv/onerlo.png", "ceramic"),
        productItem("كويك فيكس لاصق سيراميك", "https://i.ibb.co/DDFN8TJF/image.png", "ceramic"),
        productItem("الأقرع فيكس", "https://i.ibb.co/HDYtzRm5/image.png", "ceramic"),
        productItem("الأقرع فيكس الأصفر", "https://i.ibb.co/Z6kqm8wt/image.png", "ceramic"),
        productItem("الأقرع فيكس الأخضر", "https://i.ibb.co/d4YVhwZh/image.png", "ceramic")
      ]
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
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
      }))
    },
    {
      slug: "exterior-adhesives",
      category: { ar: "لواصق خارجية", en: "Exterior Adhesives" },
      title: { ar: "لاصق خارجي", en: "Exterior Adhesives" },
      short: { ar: "لواصق ومواد تشطيب مخصصة للواجهات والأعمال الخارجية.", en: "Adhesives and finishing materials for facades and exterior works." },
      details: { ar: "منتجات مناسبة للواجهات والأعمال المعرضة للعوامل الجوية.", en: "Products suitable for facades and weather-exposed applications." },
      specs: [],
      items: [
        productItem("فلاكسو", "", "exterior"),
        productItem("سينا فيكس", "https://i.ibb.co/vCcfQsPK/cera.jpg", "exterior"),
        productItem("مانستر فيكس", "https://i.ibb.co/BmrZjjM/fixo100.jpg", "exterior"),
        productItem("نجار", "https://i.ibb.co/4r8nz5J/njarnew.jpg", "exterior"),
        productItem("الترا بوند الأحمر", "https://i.ibb.co/wNxgkS1g/image.jpg", "exterior"),
        productItem("مارفيل", "https://i.ibb.co/YGXw03L/Whats-App-Image-2026-08-02-at-1-22-52-PM-6.jpg", "exterior"),
        productItem("الترا بوند الذهبي", "https://i.ibb.co/39HgRdhD/image.jpg", "exterior"),
        productItem("الترا بوند البرتقالي", "https://i.ibb.co/XrZFKs5W/image.jpg", "exterior"),
        productItem("الباسل", "https://i.ibb.co/ym6VHp8x/njar.jpg", "exterior"),
        productItem("الماسات فيكس", "https://i.ibb.co/HTk1jsNx/download.jpg", "exterior"),
        productItem("أوني سبام", "https://i.ibb.co/Q3DBpnNX/span.png", "exterior"),
        productItem("كلوبال فيكس", "https://i.ibb.co/Rkd2Mpkj/global.png", "exterior"),
        productItem("فور ريفر فيكس", "https://i.ibb.co/1GZK0JGn/forever.png", "exterior"),
        productItem("إيفريست", "https://i.ibb.co/GfkgJs03/everest.png", "exterior"),
        productItem("أكوا بلس فيكس", "https://i.ibb.co/VcgQvT9k/aqua.png", "exterior"),
        productItem("ألترا إكسترا", "https://i.ibb.co/DHdDTwtX/image.png", "exterior"),
        productItem("عباس", "https://i.ibb.co/YBYF5nfm/image.png", "exterior")
      ]
    },
    {
      slug: "pool-adhesives",
      category: { ar: "لاصق مسابح", en: "Pool Adhesives" },
      title: { ar: "لاصق مسابح", en: "Pool Adhesives" },
      short: { ar: "مواد لصق وعزل مخصصة للمسابح والمناطق المائية.", en: "Adhesive and waterproofing materials for pools and wet areas." },
      details: { ar: "أنظمة مناسبة لتثبيت ومعالجة أسطح المسابح.", en: "Systems for bonding and treating pool surfaces." },
      specs: [],
      items: [
        productItem("آن الأزرق", "https://i.ibb.co/mC8WrdpT/image.png", "pool"),
        productItem("أوني فيكس", "https://i.ibb.co/HDYRR5vj/image.png", "pool"),
        productItem("بروسيل الأزرق", "https://i.ibb.co/Ps6Djk1G/image.png", "pool"),
        productItem("عباس", "https://i.ibb.co/YBYF5nfm/image.png", "pool"),
        productItem("الترا بوند الأزرق", "https://i.ibb.co/fY6H9yrb/Whats-App-Image-2026-08-11-at-12-21-52-PM.jpg", "pool"),
        productItem("الترا إكسترا", "https://i.ibb.co/sp1Rh8sM/image.png", "pool"),
        productItem("أكوا فيكس", "https://i.ibb.co/GQvsVR32/image.png", "pool"),
        productItem("الباسل", "https://i.ibb.co/93zmNBKD/image.png", "pool"),
        productItem("بروسيل الأحمر", "https://i.ibb.co/hJDtVZWQ/mockup.png", "pool")
      ]
    },
    {
      slug: "paints-and-colors",
      category: { ar: "الأصبغة والألوان", en: "Paints & Colors" },
      title: { ar: "الأصبغة والألوان", en: "Paints & Colors" },
      short: { ar: "ألوان وأصبغة التشطيبات النهائية للمشاريع.", en: "Colors and pigments for final project finishes." },
      details: { ar: "قسم مخصص للأصبغة والألوان، ويمكن تحديث المواد من لوحة الإدارة.", en: "A dedicated section for pigments and colors, editable from the admin panel." },
      specs: [],
      items: [
        productItem("الأصبغة والألوان", "https://i.ibb.co/Xfk7vCX7/image.jpg", "paint")
      ]
    },
    {
      slug: "stamped-concrete",
      category: { ar: "الباطون المطبع", en: "Stamped Concrete" },
      title: { ar: "الباطون المطبع", en: "Stamped Concrete" },
      short: { ar: "حلول تشطيب للباطون المطبع والأرضيات الخارجية.", en: "Finishing solutions for stamped concrete and exterior floors." },
      details: { ar: "مواد تشطيب تمنح الأسطح مظهراً متجانساً ومقاومة مناسبة للاستخدام الخارجي.", en: "Finishing materials for consistent, durable exterior surfaces." },
      specs: [],
      items: [
        productItem("الباطون المطبع", "https://i.ibb.co/gZKm6B7S/image.jpg", "stamped")
      ]
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
