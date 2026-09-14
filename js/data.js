/* katanbuild â€” content & translation data */
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
      "assets/products/k6P984Kj_1.png",
      "assets/products/mC8WrdpT_image.png",
      "assets/products/WNkdYrX0_Whats-App-Image-2026-08-02-at-1-22-48-PM-1.jpg",
      "assets/products/tM8PD5Zw_image.jpg",
      "assets/products/zhBVtmSV_image.png",
      "assets/products/DH4pxrKk_image.png",
      "assets/products/q3Dj4LT7_Whats-App-Image-2026-08-02-at-1-22-51-PM.jpg",
      "assets/products/ynhz7BSN_Whats-App-Image-2026-08-02-at-1-22-45-PM-1.jpg-3.jpg",
      "assets/products/hRf8F8f9_Whats-App-Image-2026-08-02-at-1-22-49-PM.jpg",
      "assets/products/MkXSdL7n_Whats-App-Image-2026-08-02-at-1-22-52-PM-3.jpg",
      "assets/products/FLLCTb61_Whats-App-Image-2026-08-02-at-1-22-48-PM-2.jpg",
      "assets/products/JRW6pYmv_image.png"
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
    address: { ar: "ط¯ظ…ط´ظ‚طŒ ط³ظˆط±ظٹط§", en: "Damascus, Syria" }
  },
  products: [
    {
      slug: "render-plaster-materials",
      category: { ar: "ظ„ط§طµظ‚ ط¯ظٹظƒظˆط±", en: "Decorative Adhesives" },
      title: { ar: "ظ„ط§طµظ‚ ط¯ظٹظƒظˆط±", en: "Decorative Adhesives" },
      short: {
        ar: "ظ‚ط³ظ… ظ…ط®طµطµ ظ„ط®ظ„ط·ط§طھ ط§ظ„ط·ظٹظ†ط© ط§ظ„ط¬ط§ظ‡ط²ط© ظˆظ…ظˆط§ط¯ ط§ظ„طھط³ظˆظٹط© ط§ظ„طھظٹ طھظ…ظ†ط­ ط§ظ„ط¬ط¯ط±ط§ظ† ط³ط·ط­ط§ظ‹ ظ‚ظˆظٹط§ظ‹ ظˆظ…طھط¬ط§ظ†ط³ط§ظ‹ ظ‚ط¨ظ„ ط§ظ„طھط´ط·ظٹط¨ ط§ظ„ظ†ظ‡ط§ط¦ظٹ.",
        en: "Ready-mix render, plaster and leveling materials that create strong, uniform surfaces before final finishing."
      },
      details: {
        ar: "طھط¶ظ… ظ‡ط°ظ‡ ط§ظ„ظ…ط¬ظ…ظˆط¹ط© ظ…ظˆط§ط¯ ط·ظٹظ†ط© ط¥ط³ظ…ظ†طھظٹط© ظˆط¨ظˆظ„ظٹظ…ط±ظٹط© ظ…ظ†ط§ط³ط¨ط© ظ„ظ„ط£ط¹ظ…ط§ظ„ ط§ظ„ط¯ط§ط®ظ„ظٹط© ظˆط§ظ„ط®ط§ط±ط¬ظٹط©طŒ ظˆطھط³ط§ط¹ط¯ ط¹ظ„ظ‰ طھط­ط³ظٹظ† ط§ظ„ط§ظ„طھطµط§ظ‚ ظˆطھظ‚ظ„ظٹظ„ ط§ظ„طھط´ظ‚ظ‚ط§طھ ظˆطھط³ط±ظٹط¹ طھظ†ظپظٹط° ط£ط¹ظ…ط§ظ„ ط§ظ„ط¥ظƒط³ط§ط، ظˆظپظ‚ ظ…ط¹ط§ظٹظٹط± طھط·ط¨ظٹظ‚ ظˆط§ط¶ط­ط©.",
        en: "This section includes cementitious and polymer-modified render materials for interior and exterior applications, improving adhesion, reducing cracking, and supporting faster finishing work."
      },
      specs: [
        { ar: "ط§ظ„ط§ط³طھط®ط¯ط§ظ…", en: "Use", val: { ar: "ط¯ط§ط®ظ„ظٹ ظˆط®ط§ط±ط¬ظٹ", en: "Interior & exterior" } },
        { ar: "ط²ظ…ظ† ط§ظ„ط´ط؛ظ„", en: "Working time", val: { ar: "ظ¦ظ  â€“ ظ©ظ  ط¯ظ‚ظٹظ‚ط©", en: "60â€“90 minutes" } },
        { ar: "ط³ظ…ط§ظƒط© ط§ظ„ط·ط¨ظ‚ط©", en: "Layer thickness", val: { ar: "ظ¥ â€“ ظ¢ظ  ظ…ظ„ظ…", en: "5â€“20 mm" } },
        { ar: "ط§ظ„طھط؛ظ„ظٹظپ", en: "Packaging", val: { ar: "ط£ظƒظٹط§ط³ ظ¢ظ¥ ظƒط؛", en: "25 kg bags" } }
      ],
      items: [
        productItem("ط³ظٹطھظٹ ظپظٹظƒط³", "assets/products/WNkdYrX0_Whats-App-Image-2026-08-02-at-1-22-48-PM-1.jpg", "decor"),
        productItem("ظƒط§ط±ظˆ ظپظٹظƒط³", "assets/products/k6P984Kj_1.png", "decor"),
        productItem("ظƒظ„ط§ظٹطھظˆط±", "assets/products/zhBVtmSV_image.png", "decor"),
        productItem("ظ„ط§ط²ظˆط±ط¯", "assets/products/DH4pxrKk_image.png", "decor")
      ]
    },
    {
      slug: "waterproofing-materials",
      category: { ar: "ظ…ظˆط§ط¯ ط§ظ„ط¹ط²ظ„", en: "Waterproofing" },
      title: { ar: "ظ…ظˆط§ط¯ ط§ظ„ط¹ط²ظ„", en: "Waterproofing" },
      short: {
        ar: "ظ‚ط³ظ… ظٹط¶ظ… ظ…ظˆط§ط¯ ط¹ط²ظ„ ط¹ط§ظ„ظٹط© ط§ظ„ط£ط¯ط§ط، ظ„ط­ظ…ط§ظٹط© ط§ظ„ط£ط³ط·ط­ ظˆط§ظ„ظ…ظ†ط§ط·ظ‚ ط§ظ„ط±ط·ط¨ط© ظˆط§ظ„ط¹ظ†ط§طµط± ط§ظ„ط¥ظ†ط´ط§ط¦ظٹط© ظ…ظ† طھط³ط±ط¨ ط§ظ„ظ…ظٹط§ظ‡ ظˆط§ظ„ط±ط·ظˆط¨ط©.",
        en: "High-performance waterproofing materials that protect roofs, wet areas, and structural elements."
      },
      details: {
        ar: "طھط´ظ…ظ„ ظ‡ط°ظ‡ ط§ظ„ظ…ط¬ظ…ظˆط¹ط© ط·ظ„ط§ط،ط§طھ ط¹ط²ظ„ ظ…ط±ظ†ط© ظˆظ…ظˆط§ط¯ ظ…ط¹ط§ظ„ط¬ط© ظ„ظ„ط£ط³ط·ط­ ط§ظ„ظ…ط¹ط±ط¶ط© ظ„ظ„ظ…ط§ط،طŒ ظˆطھظڈط³طھط®ط¯ظ… ظپظٹ ط§ظ„ط£ط³ط·ط­ ظˆط§ظ„ط­ظ…ط§ظ…ط§طھ ظˆط§ظ„ظ…ط·ط§ط¨ط® ظˆط§ظ„ط®ط²ط§ظ†ط§طھ ظˆط§ظ„ط£ظ‚ط¨ظٹط©.",
        en: "This section includes flexible waterproofing coatings and surface treatment materials for water-exposed areas."
      },
      specs: [
        { ar: "ط§ظ„ط§ط³طھط®ط¯ط§ظ…", en: "Use", val: { ar: "ط£ط³ط·ط­طŒ ط­ظ…ط§ظ…ط§طھطŒ ط®ط²ط§ظ†ط§طھ", en: "Roofs, wet areas, tanks" } },
        { ar: "ط§ظ„ظ…ط±ظˆظ†ط©", en: "Flexibility", val: { ar: "ظ…ط±ظ† ط­طھظ‰ طھط´ظ‚ظ‚ ظ¢ ظ…ظ„ظ…", en: "Bridges cracks up to 2 mm" } },
        { ar: "ط¹ط¯ط¯ ط§ظ„ط·ط¨ظ‚ط§طھ", en: "Coats", val: { ar: "ط·ط¨ظ‚طھط§ظ† ظ…طھظ‚ط§ط·ط¹طھط§ظ†", en: "Two cross-coats" } },
        { ar: "ط§ظ„طھط؛ظ„ظٹظپ", en: "Packaging", val: { ar: "ط¯ظ„ط§ط، ظ،ظ¨ / ظ¥ ظƒط؛", en: "18 / 5 kg pails" } }
      ],
      items: [
        productItem("ط§ظ„طھط±ط§ ط¨ظˆظ†ط¯ ط¹ط§ط²ظ„ ط­ط¬ط± ط´ظپط§ظپ", "assets/products/tpW85TQ7_image.png", "insulation"),
        productItem("ط§ظ„طھط±ط§ ط¨ظˆظ†ط¯ ط¹ط§ط²ظ„ ط¨ظ„ط§ط³طھظٹظƒظٹ", "assets/products/xw3DqkY_image.png", "insulation"),
        productItem("ط¹ط§ط²ظ„ ظ…ط²ظƒظٹظ†", "assets/products/ycNqfQQF_image.png", "insulation")
      ]
    },
    {
      slug: "ceramic-adhesive-grout",
      category: { ar: "ظ„ظˆط§طµظ‚ ط§ظ„ط³ظٹط±ط§ظ…ظٹظƒ", en: "Tile & Ceramic" },
      title: { ar: "ظ„ط§طµظ‚ ظˆط±ظˆط¨ط© ط§ظ„ط³ظٹط±ط§ظ…ظٹظƒ", en: "Ceramic Adhesive & Grout" },
      short: {
        ar: "ظ‚ط³ظ… ط®ط§طµ ط¨ظ…ظˆط§ط¯ ظ„طµظ‚ ط§ظ„ط³ظٹط±ط§ظ…ظٹظƒ ظˆط±ظˆط¨ط© ط§ظ„ظپظˆط§طµظ„ ط§ظ„ظ…ظ†ط§ط³ط¨ط© ظ„ط£ط¹ظ…ط§ظ„ ط§ظ„ط¥ظƒط³ط§ط، ط§ظ„ط¯ط§ط®ظ„ظٹط© ظˆط§ظ„ط®ط§ط±ط¬ظٹط©.",
        en: "Ceramic adhesives and grouts designed for interior and exterior tiling works."
      },
      details: {
        ar: "ظٹط´ظ…ظ„ ظ‡ط°ط§ ط§ظ„ظ‚ط³ظ… ظ…ظ†طھط¬ط§طھ طھط³ط§ط¹ط¯ ط¹ظ„ظ‰ طھط«ط¨ظٹطھ ط§ظ„ط¨ظ„ط§ط· ظˆط§ظ„ط³ظٹط±ط§ظ…ظٹظƒ ط¨ظ‚ظˆط© ظˆطھط¹ط¨ط¦ط© ط§ظ„ظپظˆط§طµظ„ ط¨ط´ظƒظ„ ظ…طھط¬ط§ظ†ط³.",
        en: "This section includes products that support strong tile bonding and clean joint filling."
      },
      specs: [
        { ar: "ط§ظ„ط§ط³طھط®ط¯ط§ظ…", en: "Use", val: { ar: "ط¨ظ„ط§ط·طŒ ط³ظٹط±ط§ظ…ظٹظƒطŒ ط­ط¬ط±", en: "Tile, ceramic, stone" } },
        { ar: "ط²ظ…ظ† ط§ظ„ظپطھط­", en: "Open time", val: { ar: "ظ¢ظ  â€“ ظ£ظ  ط¯ظ‚ظٹظ‚ط©", en: "20â€“30 minutes" } },
        { ar: "ظ‚ظˆط© ط§ظ„ط§ظ„طھطµط§ظ‚", en: "Bond strength", val: { ar: "â‰¥ ظ، ظ†ظٹظˆطھظ†/ظ…ظ„ظ…آ²", en: "â‰¥ 1 N/mmآ²" } },
        { ar: "ط§ظ„طھط؛ظ„ظٹظپ", en: "Packaging", val: { ar: "ط£ظƒظٹط§ط³ ظ¢ظ¥ ظƒط؛", en: "25 kg bags" } }
      ],
      items: [
        productItem("ط³ظٹطھظٹ ظپظٹظƒط³", "assets/products/WNkdYrX0_Whats-App-Image-2026-08-02-at-1-22-48-PM-1.jpg", "ceramic"),
        productItem("ظƒط±ط§ظپطھ", "assets/products/q3Dj4LT7_Whats-App-Image-2026-08-02-at-1-22-51-PM-3.jpg", "ceramic"),
        productItem("ظ„ظٹط« ظپظٹظƒط³", "assets/products/ynhz7BSN_Whats-App-Image-2026-08-02-at-1-22-45-PM-1.jpg", "ceramic"),
        productItem("ط¨ط±ط§ظٹظ…ظٹط±", "assets/products/hRf8F8f9_Whats-App-Image-2026-08-02-at-1-22-49-PM.jpg", "ceramic"),
        productItem("ظ…ظˆط²ظٹظƒ", "assets/products/MkXSdL7n_Whats-App-Image-2026-08-02-at-1-22-52-PM-3.jpg", "ceramic"),
        productItem("ط¨ط±ظˆط³ظٹظ„ ط§ظ„ط£ط®ط¶ط±", "assets/products/4wXPg9R5_Whats-App-Image-2026-08-02-at-1-22-49-PM-6.jpg", "ceramic"),
        productItem("ط§ظ„طھط±ط§ ط؛ط±ظٹط¨", "assets/products/FLLCTb61_Whats-App-Image-2026-08-02-at-1-22-48-PM-2.jpg", "ceramic"),
        productItem("ط§ظ„طھط±ط§ ط¨ظˆظ†ط¯ ط§ظ„ط£ط®ط¶ط±", "assets/products/JRW6pYmv_image.png", "ceramic"),
        productItem("طھظˆط¨ ظپظٹظƒط³ ظ„ط§طµظ‚ ط³ظٹط±ط§ظ…ظٹظƒ", "assets/products/27ft38r6_Whats-App-Image-2026-08-02-at-1-22-50-PM-2.jpg", "ceramic"),
        productItem("ط§ظ„ط´ط±ط¨ط¬ظٹ ظ„ط§طµظ‚ ط³ظٹط±ط§ظ…ظٹظƒ", "assets/products/FLLCTb61_Whats-App-Image-2026-08-02-at-1-22-48-PM-2.jpg", "ceramic"),
        productItem("ط±ظˆظƒظٹ ظپظٹظƒط³ ظ„ط§طµظ‚ ط³ظٹط±ط§ظ…ظٹظƒ", "assets/products/CsbDvRsb_rocky.png", "ceramic"),
        productItem("ط§ظ„ط±ط§ط¦ط¯ ظ„ط§طµظ‚ ط³ظٹط±ط§ظ…ظٹظƒ", "assets/products/BVXVzBmZ_raed.png", "ceramic"),
        productItem("ط§ظ„ط±ط§ط¦ط¯ ط°ظ‡ط¨ظٹ ظ„ط§طµظ‚ ط³ظٹط±ط§ظ…ظٹظƒ", "assets/products/Cs08vYMV_raed-o.png", "ceramic"),
        productItem("ط³ظˆظ„ط¯ ظپظٹظƒط³ ط±ظˆط¨ط© ظˆط·ظٹظ†ط©", "assets/products/sv947RvN_sulid-mix.png", "ceramic"),
        productItem("ط³ظˆظ„ط¯ ط·ظٹظ†ط©", "assets/products/G4X1YytM_Paper-Bag-Mockup-Solid.png", "ceramic"),
        productItem("ط£ط± ط¨ظٹ", "assets/products/FLLCTb61_Whats-App-Image-2026-08-02-at-1-22-48-PM-2.jpg", "ceramic"),
        productItem("ط§ظ„ظ‚ط¯ط³", "assets/products/GQTn6NG1_qods.png", "ceramic"),
        productItem("ط§ظˆظ†ظٹط±ظ„ظˆ", "assets/products/21g55pWv_onerlo.png", "ceramic"),
        productItem("ظƒظˆظٹظƒ ظپظٹظƒط³ ظ„ط§طµظ‚ ط³ظٹط±ط§ظ…ظٹظƒ", "assets/products/DDFN8TJF_image.png", "ceramic"),
        productItem("ط§ظ„ط£ظ‚ط±ط¹ ظپظٹظƒط³", "assets/products/HDYtzRm5_image.png", "ceramic"),
        productItem("ط§ظ„ط£ظ‚ط±ط¹ ظپظٹظƒط³ ط§ظ„ط£طµظپط±", "assets/products/Z6kqm8wt_image.png", "ceramic"),
        productItem("ط§ظ„ط£ظ‚ط±ط¹ ظپظٹظƒط³ ط§ظ„ط£ط®ط¶ط±", "assets/products/d4YVhwZh_image.png", "ceramic")
      ]
    },
    {
      slug: "thermal-insulation-materials",
      category: { ar: "ط§ظ„ط¹ط²ظ„ ط§ظ„ط­ط±ط§ط±ظٹ", en: "Thermal Insulation" },
      title: { ar: "ظ…ظˆط§ط¯ ط§ظ„ط¹ط²ظ„ ط§ظ„ط­ط±ط§ط±ظٹ", en: "Thermal Insulation" },
      short: {
        ar: "ظ‚ط³ظ… ظ…ظˆط§ط¯ ط§ظ„ط¹ط²ظ„ ط§ظ„ط­ط±ط§ط±ظٹ ظ„ظˆط§ط¬ظ‡ط§طھ ط§ظ„ظ…ط¨ط§ظ†ظٹطŒ ظ„طھظ‚ظ„ظٹظ„ ط§ظ†طھظ‚ط§ظ„ ط§ظ„ط­ط±ط§ط±ط© ظˆطھط­ط³ظٹظ† ظƒظپط§ط،ط© ط§ظ„ط·ط§ظ‚ط©.",
        en: "Thermal insulation materials for building facades, reducing heat transfer and improving energy efficiency."
      },
      details: {
        ar: "طھط´ظ…ظ„ ظ‡ط°ظ‡ ط§ظ„ظ…ط¬ظ…ظˆط¹ط© ط£ظ†ط¸ظ…ط© ط¹ط²ظ„ ط­ط±ط§ط±ظٹ ظ„ظ„ظˆط§ط¬ظ‡ط§طھ ظ…ط¹ ط·ط¨ظ‚ط§طھ طھط³ظˆظٹط© ظˆطھط³ظ„ظٹط­.",
        en: "This section includes facade thermal-insulation systems with leveling and reinforcement layers."
      },
      specs: [
        { ar: "ط§ظ„ط§ط³طھط®ط¯ط§ظ…", en: "Use", val: { ar: "ظˆط§ط¬ظ‡ط§طھ ط®ط§ط±ط¬ظٹط©", en: "External facades" } },
        { ar: "ط³ظ…ط§ظƒط© ط§ظ„ظ„ظˆط­", en: "Panel thickness", val: { ar: "ظ¤ â€“ ظ،ظ  ط³ظ…", en: "4â€“10 cm" } },
        { ar: "ط§ظ„طھظˆطµظٹظ„ ط§ظ„ط­ط±ط§ط±ظٹ", en: "Thermal conductivity", val: { ar: "â‰¤ ظ .ظ ظ¤ ظˆط§ط·/ظ….ظƒظ„ظپظ†", en: "â‰¤ 0.04 W/mآ·K" } },
        { ar: "ط§ظ„طھط؛ظ„ظٹظپ", en: "Packaging", val: { ar: "ط£ظ„ظˆط§ط­ / ط£ظƒظٹط§ط³ طھط³ظˆظٹط©", en: "Panels / leveling bags" } }
      ],
      items: [
        "ط£ظ„ظˆط§ط­ ط¹ط²ظ„ ط­ط±ط§ط±ظٹ ظ„ظ„ظˆط§ط¬ظ‡ط§طھ",
        "ظ„ط§طµظ‚ ط£ظ„ظˆط§ط­ ط§ظ„ط¹ط²ظ„",
        "ط´ط¨ظƒ طھط³ظ„ظٹط­ ط§ظ„ظˆط§ط¬ظ‡ط§طھ",
        "ط·ط¨ظ‚ط© طھط³ظˆظٹط© ط­ط±ط§ط±ظٹط©"
      ].map((name, index) => ({
        slug: `thermal-${index + 1}`,
        title: { ar: name, en: `Thermal insulation material ${index + 1}` },
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
      }))
    },
    {
      slug: "exterior-adhesives",
      category: { ar: "ظ„ظˆط§طµظ‚ ط®ط§ط±ط¬ظٹط©", en: "Exterior Adhesives" },
      title: { ar: "ظ„ط§طµظ‚ ط®ط§ط±ط¬ظٹ", en: "Exterior Adhesives" },
      short: { ar: "ظ„ظˆط§طµظ‚ ظˆظ…ظˆط§ط¯ طھط´ط·ظٹط¨ ظ…ط®طµطµط© ظ„ظ„ظˆط§ط¬ظ‡ط§طھ ظˆط§ظ„ط£ط¹ظ…ط§ظ„ ط§ظ„ط®ط§ط±ط¬ظٹط©.", en: "Adhesives and finishing materials for facades and exterior works." },
      details: { ar: "ظ…ظ†طھط¬ط§طھ ظ…ظ†ط§ط³ط¨ط© ظ„ظ„ظˆط§ط¬ظ‡ط§طھ ظˆط§ظ„ط£ط¹ظ…ط§ظ„ ط§ظ„ظ…ط¹ط±ط¶ط© ظ„ظ„ط¹ظˆط§ظ…ظ„ ط§ظ„ط¬ظˆظٹط©.", en: "Products suitable for facades and weather-exposed applications." },
      specs: [],
      items: [
        productItem("ظپظ„ط§ظƒط³ظˆ", "", "exterior"),
        productItem("ط³ظٹظ†ط§ ظپظٹظƒط³", "assets/products/vCcfQsPK_cera.jpg", "exterior"),
        productItem("ظ…ط§ظ†ط³طھط± ظپظٹظƒط³", "assets/products/BmrZjjM_fixo100.jpg", "exterior"),
        productItem("ظ†ط¬ط§ط±", "assets/products/4r8nz5J_njarnew.jpg", "exterior"),
        productItem("ط§ظ„طھط±ط§ ط¨ظˆظ†ط¯ ط§ظ„ط£ط­ظ…ط±", "assets/products/wNxgkS1g_image.jpg", "exterior"),
        productItem("ظ…ط§ط±ظپظٹظ„", "assets/products/YGXw03L_Whats-App-Image-2026-08-02-at-1-22-52-PM-6.jpg", "exterior"),
        productItem("ط§ظ„طھط±ط§ ط¨ظˆظ†ط¯ ط§ظ„ط°ظ‡ط¨ظٹ", "assets/products/39HgRdhD_image.jpg", "exterior"),
        productItem("ط§ظ„طھط±ط§ ط¨ظˆظ†ط¯ ط§ظ„ط¨ط±طھظ‚ط§ظ„ظٹ", "assets/products/XrZFKs5W_image.jpg", "exterior"),
        productItem("ط§ظ„ط¨ط§ط³ظ„", "assets/products/ym6VHp8x_njar.jpg", "exterior"),
        productItem("ط§ظ„ظ…ط§ط³ط§طھ ظپظٹظƒط³", "assets/products/HTk1jsNx_download.jpg", "exterior"),
        productItem("ط£ظˆظ†ظٹ ط³ط¨ط§ظ…", "assets/products/Q3DBpnNX_span.png", "exterior"),
        productItem("ظƒظ„ظˆط¨ط§ظ„ ظپظٹظƒط³", "assets/products/Rkd2Mpkj_global.png", "exterior"),
        productItem("ظپظˆط± ط±ظٹظپط± ظپظٹظƒط³", "assets/products/1GZK0JGn_forever.png", "exterior"),
        productItem("ط¥ظٹظپط±ظٹط³طھ", "assets/products/GfkgJs03_everest.png", "exterior"),
        productItem("ط£ظƒظˆط§ ط¨ظ„ط³ ظپظٹظƒط³", "assets/products/VcgQvT9k_aqua.png", "exterior"),
        productItem("ط£ظ„طھط±ط§ ط¥ظƒط³طھط±ط§", "assets/products/DHdDTwtX_image.png", "exterior"),
        productItem("ط¹ط¨ط§ط³", "assets/products/YBYF5nfm_image.png", "exterior")
      ]
    },
    {
      slug: "pool-adhesives",
      category: { ar: "ظ„ط§طµظ‚ ظ…ط³ط§ط¨ط­", en: "Pool Adhesives" },
      title: { ar: "ظ„ط§طµظ‚ ظ…ط³ط§ط¨ط­", en: "Pool Adhesives" },
      short: { ar: "ظ…ظˆط§ط¯ ظ„طµظ‚ ظˆط¹ط²ظ„ ظ…ط®طµطµط© ظ„ظ„ظ…ط³ط§ط¨ط­ ظˆط§ظ„ظ…ظ†ط§ط·ظ‚ ط§ظ„ظ…ط§ط¦ظٹط©.", en: "Adhesive and waterproofing materials for pools and wet areas." },
      details: { ar: "ط£ظ†ط¸ظ…ط© ظ…ظ†ط§ط³ط¨ط© ظ„طھط«ط¨ظٹطھ ظˆظ…ط¹ط§ظ„ط¬ط© ط£ط³ط·ط­ ط§ظ„ظ…ط³ط§ط¨ط­.", en: "Systems for bonding and treating pool surfaces." },
      specs: [],
      items: [
        productItem("ط¢ظ† ط§ظ„ط£ط²ط±ظ‚", "assets/products/mC8WrdpT_image.png", "pool"),
        productItem("ط£ظˆظ†ظٹ ظپظٹظƒط³", "assets/products/HDYRR5vj_image.png", "pool"),
        productItem("ط¨ط±ظˆط³ظٹظ„ ط§ظ„ط£ط²ط±ظ‚", "assets/products/Ps6Djk1G_image.png", "pool"),
        productItem("ط¹ط¨ط§ط³", "assets/products/YBYF5nfm_image.png", "pool"),
        productItem("ط§ظ„طھط±ط§ ط¨ظˆظ†ط¯ ط§ظ„ط£ط²ط±ظ‚", "assets/products/fY6H9yrb_Whats-App-Image-2026-08-11-at-12-21-52-PM.jpg", "pool"),
        productItem("ط§ظ„طھط±ط§ ط¥ظƒط³طھط±ط§", "assets/products/sp1Rh8sM_image.png", "pool"),
        productItem("ط£ظƒظˆط§ ظپظٹظƒط³", "assets/products/GQvsVR32_image.png", "pool"),
        productItem("ط§ظ„ط¨ط§ط³ظ„", "assets/products/93zmNBKD_image.png", "pool"),
        productItem("ط¨ط±ظˆط³ظٹظ„ ط§ظ„ط£ط­ظ…ط±", "assets/products/hJDtVZWQ_mockup.png", "pool")
      ]
    },
    {
      slug: "paints-and-colors",
      category: { ar: "ط§ظ„ط£طµط¨ط؛ط© ظˆط§ظ„ط£ظ„ظˆط§ظ†", en: "Paints & Colors" },
      title: { ar: "ط§ظ„ط£طµط¨ط؛ط© ظˆط§ظ„ط£ظ„ظˆط§ظ†", en: "Paints & Colors" },
      short: { ar: "ط£ظ„ظˆط§ظ† ظˆط£طµط¨ط؛ط© ط§ظ„طھط´ط·ظٹط¨ط§طھ ط§ظ„ظ†ظ‡ط§ط¦ظٹط© ظ„ظ„ظ…ط´ط§ط±ظٹط¹.", en: "Colors and pigments for final project finishes." },
      details: { ar: "ظ‚ط³ظ… ظ…ط®طµطµ ظ„ظ„ط£طµط¨ط؛ط© ظˆط§ظ„ط£ظ„ظˆط§ظ†طŒ ظˆظٹظ…ظƒظ† طھط­ط¯ظٹط« ط§ظ„ظ…ظˆط§ط¯ ظ…ظ† ظ„ظˆط­ط© ط§ظ„ط¥ط¯ط§ط±ط©.", en: "A dedicated section for pigments and colors, editable from the admin panel." },
      specs: [],
      items: [
        productItem("ط§ظ„ط£طµط¨ط؛ط© ظˆط§ظ„ط£ظ„ظˆط§ظ†", "assets/products/Xfk7vCX7_image.jpg", "paint")
      ]
    },
    {
      slug: "stamped-concrete",
      category: { ar: "ط§ظ„ط¨ط§ط·ظˆظ† ط§ظ„ظ…ط·ط¨ط¹", en: "Stamped Concrete" },
      title: { ar: "ط§ظ„ط¨ط§ط·ظˆظ† ط§ظ„ظ…ط·ط¨ط¹", en: "Stamped Concrete" },
      short: { ar: "ط­ظ„ظˆظ„ طھط´ط·ظٹط¨ ظ„ظ„ط¨ط§ط·ظˆظ† ط§ظ„ظ…ط·ط¨ط¹ ظˆط§ظ„ط£ط±ط¶ظٹط§طھ ط§ظ„ط®ط§ط±ط¬ظٹط©.", en: "Finishing solutions for stamped concrete and exterior floors." },
      details: { ar: "ظ…ظˆط§ط¯ طھط´ط·ظٹط¨ طھظ…ظ†ط­ ط§ظ„ط£ط³ط·ط­ ظ…ط¸ظ‡ط±ط§ظ‹ ظ…طھط¬ط§ظ†ط³ط§ظ‹ ظˆظ…ظ‚ط§ظˆظ…ط© ظ…ظ†ط§ط³ط¨ط© ظ„ظ„ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط®ط§ط±ط¬ظٹ.", en: "Finishing materials for consistent, durable exterior surfaces." },
      specs: [],
      items: [
        productItem("ط§ظ„ط¨ط§ط·ظˆظ† ط§ظ„ظ…ط·ط¨ط¹", "assets/products/gZKm6B7S_image.jpg", "stamped")
      ]
    }
  ],
  productTools: {
    coverage: 4,
    packageLabel: { ar: "ظƒظٹط³ / ط¹ط¨ظˆط©", en: "bag / package" }
  },
  projects: [
    {
      slug: "waterproofing-workshops",
      title: { ar: "ظˆط±ط´ط§طھ ط¹ط²ظ„", en: "Waterproofing Workshops" },
      desc: {
        ar: "ظˆط±ط´ط§طھ ظ…ظٹط¯ط§ظ†ظٹط© ظ…ط®طµطµط© ظ„طھط·ط¨ظٹظ‚ ظ…ظˆط§ط¯ ط§ظ„ط¹ط²ظ„ ط¹ظ„ظ‰ ط§ظ„ط£ط³ط·ط­ ظˆط§ظ„ظ…ظ†ط§ط·ظ‚ ط§ظ„ط±ط·ط¨ط©.",
        en: "On-site workshops focused on applying waterproofing materials."
      },
      features: {
        ar: ["ط¹ط²ظ„ ط£ط³ط·ط­ ط³ظƒظ†ظٹط© ظˆطھط¬ط§ط±ظٹط©", "ظ…ط¹ط§ظ„ط¬ط© ظ…ظ†ط§ط·ظ‚ ط§ظ„ط­ظ…ط§ظ…ط§طھ ظˆط§ظ„ظ…ط·ط§ط¨ط®", "ط¹ط²ظ„ ط®ط²ط§ظ†ط§طھ ط§ظ„ظ…ظٹط§ظ‡"],
        en: ["Residential & commercial roof waterproofing", "Bathroom & kitchen wet-area treatment", "Water tank waterproofing"]
      }
    },
    {
      slug: "facade-renovation",
      title: { ar: "طھط­ط¯ظٹط« ظˆط§ط¬ظ‡ط§طھ", en: "Facade Renovation" },
      desc: {
        ar: "ط£ط¹ظ…ط§ظ„ طھط¬ط¯ظٹط¯ ظˆطھط­ط¯ظٹط« ظˆط§ط¬ظ‡ط§طھ ط§ظ„ظ…ط¨ط§ظ†ظٹ ط¨ط§ط³طھط®ط¯ط§ظ… ظ…ظˆط§ط¯ ط·ظٹظ†ط© ظˆطھط´ط·ظٹط¨ ظ…ظ† katanbuild.",
        en: "Building facade renovation and refresh work using katanbuild materials."
      },
      features: {
        ar: ["طھط¬ط¯ظٹط¯ ظˆط§ط¬ظ‡ط§طھ ظ…ط¨ط§ظ†ظٹ ط³ظƒظ†ظٹط©", "ظ…ط¹ط§ظ„ط¬ط© طھط´ظ‚ظ‚ط§طھ ظˆطھط³ظˆظٹط§طھ ط³ط§ط¨ظ‚ط©", "طھط´ط·ظٹط¨ط§طھ ظ†ظ‡ط§ط¦ظٹط© ط¨ظ„ظ…ط³ط§طھ ظ…طھط¹ط¯ط¯ط©"],
        en: ["Residential building facade refresh", "Repairing old cracks and leveling", "Multi-texture final finishes"]
      }
    },
    {
      slug: "ceramic-adhesive-workshops",
      title: { ar: "ظˆط±ط´ط§طھ ظ„ط§طµظ‚ ط³ظٹط±ط§ظ…ظٹظƒ", en: "Ceramic Adhesive Workshops" },
      desc: {
        ar: "ظˆط±ط´ط§طھ طھط±ظƒظٹط¨ ط¨ظ„ط§ط· ظˆط³ظٹط±ط§ظ…ظٹظƒ ط¨ط§ط³طھط®ط¯ط§ظ… ط£ظ†ط¸ظ…ط© ط§ظ„ظ„طµظ‚ ظˆط§ظ„ط±ظˆط¨ط© ط§ظ„ط®ط§طµط© ط¨ظ€ katanbuild.",
        en: "Tile and ceramic installation workshops using katanbuild systems."
      },
      features: {
        ar: ["طھط±ظƒظٹط¨ ط£ط±ط¶ظٹط§طھ ظˆط¬ط¯ط±ط§ظ† ط³ظٹط±ط§ظ…ظٹظƒ", "ط£ط¹ظ…ط§ظ„ ط­ط¬ط± ظˆط¨ظ„ط§ط· ط®ط§ط±ط¬ظٹ", "طھط¹ط¨ط¦ط© ظپظˆط§طµظ„ ظˆظ…ط¹ط§ظ„ط¬ط© ظ†ظ‡ط§ط¦ظٹط©"],
        en: ["Floor & wall ceramic installation", "External stone & tile work", "Joint filling and final treatment"]
      }
    },
    {
      slug: "thermal-insulation-workshops",
      title: { ar: "ظˆط±ط´ط§طھ ط¹ط²ظ„ ط­ط±ط§ط±ظٹ", en: "Thermal Insulation Workshops" },
      desc: {
        ar: "ظˆط±ط´ط§طھ طھظ†ظپظٹط° ط£ظ†ط¸ظ…ط© ط§ظ„ط¹ط²ظ„ ط§ظ„ط­ط±ط§ط±ظٹ ظ„ظ„ظˆط§ط¬ظ‡ط§طھ ظ„طھط­ط³ظٹظ† ظƒظپط§ط،ط© ط§ظ„ط·ط§ظ‚ط© ظپظٹ ط§ظ„ظ…ط¨ط§ظ†ظٹ.",
        en: "Execution workshops for facade thermal-insulation systems."
      },
      features: {
        ar: ["طھط±ظƒظٹط¨ ط£ظ„ظˆط§ط­ ط¹ط²ظ„ ط­ط±ط§ط±ظٹ", "ط·ط¨ظ‚ط§طھ طھط³ظ„ظٹط­ ظˆطھط³ظˆظٹط© ظ„ظ„ظˆط§ط¬ظ‡ط©", "طھط´ط·ظٹط¨ ظ†ظ‡ط§ط¦ظٹ ط¬ط§ظ‡ط² ظ„ظ„ط·ظ„ط§ط،"],
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


