import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://www.sheshaanglobal.com";
const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const OUTPUT_PUBLIC_DIR = path.resolve(process.cwd(), ".output/public");

// Find built CSS asset if available
let cssAssetPath = "/styles.css";
try {
  const assetsDir = path.join(OUTPUT_PUBLIC_DIR, "assets");
  if (fs.existsSync(assetsDir)) {
    const cssFiles = fs.readdirSync(assetsDir).filter((f) => f.endsWith(".css") && f.startsWith("styles-"));
    if (cssFiles.length > 0) {
      cssAssetPath = `/assets/${cssFiles[0]}`;
    }
  }
} catch (e) {
  // fallback
}

// Phase 4.1 Corporation Schema
const CORPORATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Corporation",
      "@id": "https://www.sheshaanglobal.com/#organization",
      "name": "Sheshaan Global",
      "legalName": "Sheshaan Global",
      "url": "https://www.sheshaanglobal.com/",
      "logo": "https://www.sheshaanglobal.com/assets/logo.png",
      "description":
        "APEDA and IEC certified Indian agricultural export enterprise supplying fresh produce, Nashik red onions, Basmati rice, spices, pulses, and agro commodities to 25+ countries worldwide.",
      "foundingDate": "2022",
      "founder": {
        "@type": "Person",
        "name": "Sana Zeba Bakshi",
        "jobTitle": "Chief Executive Officer & Founder",
      },
      "employee": [
        {
          "@type": "Person",
          "name": "Juned Barade",
          "jobTitle": "Chief Operating Officer — Trade Exhibitions & Logistics",
        },
        {
          "@type": "Person",
          "name": "Saksham Singh",
          "jobTitle": "Managing Director — Business Development & Sourcing",
        },
      ],
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN",
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-8149909546",
        "contactType": "sales",
        "email": "info@sheshaanglobal.com",
        "availableLanguage": ["English", "Hindi", "Arabic"],
      },
      "knowsAbout": [
        "Agricultural Exports from India",
        "Fresh Onion Exporting (HS 07031010)",
        "APEDA Quality Certification",
        "Reefer Container Cold Chain Logistics",
        "FOB and CIF Incoterms Coordination",
      ],
      "sameAs": [
        "https://www.linkedin.com/company/sheshaan-global/",
        "https://www.instagram.com/sheshaanglobal/",
        "https://www.facebook.com/sheshaanglobal",
        "https://x.com/sheshaanglobal",
        "https://www.youtube.com/@sheshaanglobal",
        "https://freshdi.com/supplier/Sheshaan-Global",
        "https://www.tradekey.com/company/Sheshaan-Global-14840241.html",
      ],
    },
  ],
};

// Phase 4.2 Fresh Onions Product Schema
const FRESH_ONIONS_PRODUCT_SCHEMA = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "@id": "https://www.sheshaanglobal.com/products/fresh-onions-exporter-india/#product",
  "name": "Indian Fresh Red Onions (Nashik Origin)",
  "image": [
    "https://www.sheshaanglobal.com/assets/products/fresh-onions.jpg",
    "https://www.sheshaanglobal.com/assets/prod-onions.jpg",
  ],
  "description":
    "Bulk export quality fresh Nashik red onions. Graded 45mm to 65mm in 25kg red mesh bags. Shipped in 40ft reefer containers under cold-chain management from JNPT port to international destinations.",
  "sku": "SG-IND-ONION-07031010",
  "mpn": "07031010",
  "category": "Agricultural Produce > Vegetables > Onions",
  "brand": {
    "@type": "Brand",
    "name": "Sheshaan Global",
  },
  "countryOfOrigin": {
    "@type": "Country",
    "name": "India",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "48",
    "reviewCount": "48",
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
      },
      "author": {
        "@type": "Organization",
        "name": "Verified International Food Importers",
      },
      "reviewBody":
        "Consistent export-grade fresh Nashik red onions (HS Code 07031010) with APEDA phytosanitary clearance, cold-chain reefer compliance (+2°C to +4°C), and timely FCL dispatch from JNPT Nhava Sheva.",
    },
  ],
  "offers": {
    "@type": "AggregateOffer",
    "url": "https://www.sheshaanglobal.com/products/fresh-onions-exporter-india",
    "priceCurrency": "USD",
    "lowPrice": "280.00",
    "highPrice": "480.00",
    "offerCount": 4,
    "priceValidUntil": "2027-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "@id": "https://www.sheshaanglobal.com/#organization",
      "name": "Sheshaan Global",
    },
    "eligibleQuantity": {
      "@type": "QuantitativeValue",
      "value": "29",
      "unitCode": "TNE",
      "unitText": "Metric Tons (1 x 40ft High Cube Reefer Container)",
    },
  },
  "additionalProperty": [
    { "@type": "PropertyValue", name: "HS Code", value: "07031010" },
    { "@type": "PropertyValue", name: "Origin", value: "Nashik / Maharashtra, India" },
    { "@type": "PropertyValue", name: "Calibration Sizes", value: "45-55 mm, 55-65 mm, 60 mm+" },
    { "@type": "PropertyValue", name: "Standard Packing", value: "5kg, 10kg, 20kg, 25kg Leno Mesh Bags" },
  ],
};

function buildFaqPageSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function htmlLayout({ title, description, canonicalUrl, keywords, schemas = [], contentHtml, breadcrumbs = [] }) {
  const allSchemas = [CORPORATION_SCHEMA, ...schemas];
  if (breadcrumbs.length > 0) {
    allSchemas.push(buildBreadcrumbSchema(breadcrumbs));
  }

  const schemaScripts = allSchemas
    .map((s) => `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="keywords" content="${keywords || ""}" />
  <meta name="author" content="Sheshaan Global" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta name="msvalidate.01" content="220260664B862A3A28DB3917C5DCE05C" />
  <meta property="og:site_name" content="Sheshaan Global" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://www.sheshaanglobal.com/assets/logo.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="https://www.sheshaanglobal.com/assets/logo.png" />
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" />
  <link rel="stylesheet" href="${cssAssetPath}" />
${schemaScripts}
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen flex flex-col justify-between">
  <!-- Static Semantic Header -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
      <a href="/" class="flex items-center gap-3">
        <img src="/logo.png" alt="Sheshaan Global Logo" class="h-10 w-auto" width="160" height="40" />
      </a>
      <nav aria-label="Main Navigation" class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
        <a href="/" class="hover:text-blue-700 transition">Home</a>
        <a href="/products" class="hover:text-blue-700 transition">Products</a>
        <a href="/agricultural-exports-india" class="hover:text-blue-700 transition">Agri Exports India</a>
        <a href="/global-export-markets" class="hover:text-blue-700 transition">Global Markets</a>
        <a href="/trade-compliance" class="hover:text-blue-700 transition">Trade Compliance</a>
        <a href="/about" class="hover:text-blue-700 transition">About</a>
        <a href="/contact" class="hover:text-blue-700 transition">Contact</a>
      </nav>
      <div class="flex items-center gap-3">
        <a href="https://wa.me/918149909546" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#1fae53] transition">
          WhatsApp Desk
        </a>
      </div>
    </div>
  </header>

  <!-- Main Content Body -->
  <main id="main-content" class="flex-grow">
    ${contentHtml}
  </main>

  <!-- Static Semantic Footer -->
  <footer class="bg-[#04152D] text-white border-t border-slate-800 pt-16 pb-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h4 class="text-lg font-bold text-white">Sheshaan Global</h4>
        <p class="mt-3 text-xs text-slate-300 leading-relaxed">
          APEDA, DGFT IEC, and FSSAI certified Indian agricultural commodity export enterprise. Supplying fresh Nashik onions, Basmati rice, green chillies, coconuts, pulses, and whole spices worldwide.
        </p>
        <p class="mt-4 text-xs font-semibold text-amber-400">
          ISO 22000 • HACCP • GlobalGAP Compliant Sourcing
        </p>
      </div>
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-amber-400">Core Product Landing Pages</h4>
        <ul class="mt-3 space-y-2 text-xs text-slate-300">
          <li><a href="/products/fresh-onions-exporter-india" class="hover:text-white transition">Fresh Nashik Red Onions (HS 07031010)</a></li>
          <li><a href="/products/green-chillies-exporter" class="hover:text-white transition">G4 &amp; Teja Green Chillies (HS 07096010)</a></li>
          <li><a href="/products/indian-basmati-rice" class="hover:text-white transition">1121 &amp; 1509 Basmati Rice (HS 10063020)</a></li>
          <li><a href="/products/coconut-exporter-india" class="hover:text-white transition">Pollachi Semi-Husked Coconuts (HS 08011910)</a></li>
          <li><a href="/products/spices-masalas-exporter" class="hover:text-white transition">Whole &amp; Ground Spices (Cumin &amp; Turmeric)</a></li>
          <li><a href="/products/pulses-lentils-exporter" class="hover:text-white transition">Sortex Pulses &amp; Kabuli Chickpeas</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-amber-400">Dedicated Trade Corridors</h4>
        <ul class="mt-3 space-y-2 text-xs text-slate-300">
          <li><a href="/markets/export-to-uae" class="hover:text-white transition">India → UAE (Jebel Ali / Dubai)</a></li>
          <li><a href="/markets/export-to-saudi-arabia" class="hover:text-white transition">India → Saudi Arabia (Dammam / Jeddah)</a></li>
          <li><a href="/markets/export-to-uk-europe" class="hover:text-white transition">India → UK &amp; Europe (Felixstowe / RTM)</a></li>
          <li><a href="/markets/export-to-southeast-asia" class="hover:text-white transition">India → Southeast Asia (Singapore / Klang)</a></li>
          <li><a href="/agricultural-exports-india" class="hover:text-white transition">Agricultural Exports India Pillar</a></li>
          <li><a href="/trade-compliance" class="hover:text-white transition">Trade Compliance &amp; Certifications</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-amber-400">Export Trade Desk</h4>
        <address class="not-italic mt-3 space-y-2 text-xs text-slate-300">
          <p><strong>Head Office:</strong> Pune / Nashik, Maharashtra, India</p>
          <p><strong>Direct Line / WhatsApp:</strong> <a href="tel:+918149909546" class="hover:text-white">+91 81499 09546</a></p>
          <p><strong>Official Email:</strong> <a href="mailto:info@sheshaanglobal.com" class="hover:text-white">info@sheshaanglobal.com</a></p>
          <p><strong>Loading Ports:</strong> JNPT Nhava Sheva (Mumbai), Mundra Port (Gujarat)</p>
        </address>
      </div>
    </div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row justify-between gap-4">
      <p>&copy; 2026 Sheshaan Global. All rights reserved. IEC &amp; APEDA Registered Indian Exporter.</p>
      <div class="flex gap-4">
        <a href="/company-policies" class="hover:text-white transition">Company Policies</a>
        <a href="/trade-compliance" class="hover:text-white transition">Certifications</a>
        <a href="/sitemap.xml" class="hover:text-white transition">XML Sitemap</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

// Generate Static Pages Definition
const PAGES = [
  // =========================================================================
  // TARGET PAGE: Fresh Onions Exporter in India
  // =========================================================================
  {
    path: "products/fresh-onions-exporter-india",
    title: "Fresh Onions Exporter in India | Nashik Red Onions Bulk Supplier — Sheshaan Global",
    description:
      "APEDA-certified Indian fresh onions exporter. Direct farm sourcing from Nashik, Lasalgaon & Pune. Grades 45-55mm & 55-65mm in mesh bags. FCL reefer shipping via JNPT to UAE, Gulf & Europe.",
    canonicalUrl: `${BASE_URL}/products/fresh-onions-exporter-india`,
    keywords:
      "onions exporter in india, fresh onions exporter in india, nashik red onion exporter, agro product exporter in india, lasalgaon onion mandi bulk supplier, garwa onions export JNPT, indian red onions wholesale",
    schemas: [
      FRESH_ONIONS_PRODUCT_SCHEMA,
      buildFaqPageSchema([
        {
          question: "What is the Minimum Order Quantity (MOQ) for fresh onion exports from India?",
          answer:
            "Our standard Minimum Order Quantity (MOQ) is one 40ft High Cube reefer container (1x40ft FCL), which accommodates approximately 28 to 29 Metric Tons (1,120 to 1,160 bags of 25kg each). Trial consignments or combined vegetable shipments may be coordinated upon consultation with our trade desk.",
        },
        {
          question: "How many tons of onions fit in a 40ft reefer container?",
          answer:
            "A standard 40ft High Cube reefer container holds 28 to 29 Metric Tons of fresh onions packed in 25kg mesh bags under a temperature setting of +2°C to +4°C, 65–70% relative humidity, and 25–30 CBM/hr continuous fresh air exchange.",
        },
        {
          question: "What Incoterms and payment terms does Sheshaan Global accept?",
          answer:
            "We operate primarily on FOB (JNPT Nhava Sheva or Mundra Port), CFR, and CIF destination port terms. Commercial payment structures include 100% Irrevocable Letter of Credit (L/C at sight) or Telegraphic Transfer (TT: 30% advance deposit with the 70% balance payable against scanned original Bill of Lading and shipping documents).",
        },
        {
          question: "What are the ocean transit times from JNPT to international destination ports?",
          answer:
            "Average ocean transit times from JNPT (Nhava Sheva, Mumbai) are: Jebel Ali (Dubai, UAE): 3–4 days; King Abdulaziz Port Dammam (Saudi Arabia): 5–6 days; Jeddah Islamic Port: 7–9 days; Port of Singapore (Jurong): 7–9 days; Port Klang (Malaysia): 7–8 days; Port of Felixstowe / Rotterdam (UK & Europe): 21–24 days.",
        },
        {
          question: "Which quality and statutory export certificates accompany onion consignments?",
          answer:
            "Every export shipment includes an official Phytosanitary Certificate issued by the Ministry of Agriculture (NPPO India), Certificate of Origin (COO), Commercial Invoice, Packing List, Methyl Bromide (MBr) Fumigation Certificate, APEDA RCMC registration compliance, and optional pre-shipment quality inspection reports from SGS, Bureau Veritas, or Geo-Chem.",
        },
        {
          question: "What is the difference between Pol (Kharif) and Garwa (Rabi) onions?",
          answer:
            "Pol (Kharif) onions are harvested between October and December with higher moisture content (suitable for short sea voyages like GCC). Garwa (Rabi) onions, harvested between March and June in Nashik, possess dense skin layers, high dry-matter content (>12° Brix), and a natural storage life of 5–6 months, making them the premier choice for long-transit sea freight to Europe and Southeast Asia.",
        },
      ]),
    ],
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Agricultural Products", url: `${BASE_URL}/products` },
      { name: "Fresh Onions Exporter in India", url: `${BASE_URL}/products/fresh-onions-exporter-india` },
    ],
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#07244C] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <div class="inline-block rounded-full bg-amber-500/20 border border-amber-400/30 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
            APEDA RCMC &amp; NPPO Phytosanitary Certified
          </div>
          <h1 class="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            APEDA-Certified Fresh Onion Exporter in India: Premium Nashik Red &amp; Garwa Onions
          </h1>
          <p class="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global is an APEDA-certified Indian exporter of Nashik red onions</strong>, supplying wholesale importers across the UAE, Saudi Arabia, Europe, and Southeast Asia.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <a href="https://wa.me/918149909546?text=Inquiry%20for%20Fresh%20Nashik%20Red%20Onions" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#1fae53] transition">
              Dispatch RFQ via WhatsApp (+91 81499 09546)
            </a>
            <a href="#procurement-matrix" class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition">
              View Technical Procurement Table ↓
            </a>
          </div>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <!-- Direct Answer & Technical Procurement Matrix -->
        <section id="procurement-matrix" class="scroll-mt-8">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Commercial Export Specifications &amp; Cold-Chain Parameters
          </h2>
          <p class="mt-3 text-base text-slate-700 leading-relaxed bg-blue-50 border-l-4 border-[#0057B8] p-4 rounded-r-lg">
            <strong>How many tons of onions fit in a 40ft reefer container?</strong> A standard 40ft High Cube reefer container holds 28 to 29 Metric Tons of fresh onions packed in 25kg mesh bags under a temperature setting of +2°C to +4°C, 65–70% relative humidity, and 25–30 CBM/hr continuous fresh air exchange. Shipments depart directly from JNPT (Nhava Sheva) and Mundra Port with rapid 3–4 day transit to Jebel Ali and 21–24 days to Felixstowe/Rotterdam.
          </p>

          <div class="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="bg-slate-100 px-6 py-4 border-b border-slate-200">
              <h3 class="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Technical Procurement Matrix — HS 07031010 (Fresh Onions)
              </h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm text-slate-700">
                <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <tr>
                    <th scope="col" class="px-6 py-3 font-bold w-1/3">Parameter</th>
                    <th scope="col" class="px-6 py-3 font-bold">Standard Export Specification</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr>
                    <th scope="row" class="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">HS Code</th>
                    <td class="px-6 py-4 font-mono font-medium text-blue-900">07031010 (Fresh Onions)</td>
                  </tr>
                  <tr>
                    <th scope="row" class="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Origin</th>
                    <td class="px-6 py-4">Nashik, Lasalgaon, Pune (Maharashtra, India)</td>
                  </tr>
                  <tr>
                    <th scope="row" class="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Varieties</th>
                    <td class="px-6 py-4">Nashik Red Onion, Maharashtra Garwa Onion, White Onion, Small/Sambhar Onion</td>
                  </tr>
                  <tr>
                    <th scope="row" class="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Calibration Sizes</th>
                    <td class="px-6 py-4 font-medium">40-50 mm, 45-55 mm, 50-60 mm, 55-65 mm, 60 mm+</td>
                  </tr>
                  <tr>
                    <th scope="row" class="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Moisture &amp; Quality</th>
                    <td class="px-6 py-4">Dry skin moisture &lt; 14%, Total soluble solids (TSS) &gt; 12° Brix</td>
                  </tr>
                  <tr>
                    <th scope="row" class="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Packaging</th>
                    <td class="px-6 py-4">5kg, 10kg, 18kg, 20kg, 25kg, 50kg Red Leno Mesh Bags &amp; Jute Bags</td>
                  </tr>
                  <tr>
                    <th scope="row" class="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Container Capacity</th>
                    <td class="px-6 py-4 font-semibold text-slate-900">40ft High Cube Reefer Container: 28 to 29 MT (~1,120–1,160 bags of 25kg)</td>
                  </tr>
                  <tr>
                    <th scope="row" class="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Reefer Setpoint</th>
                    <td class="px-6 py-4 font-mono text-xs">Temperature +2°C to +4°C; Ventilation 25–30 CBM/hr; Humidity 65–70%</td>
                  </tr>
                  <tr>
                    <th scope="row" class="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Dispatch Ports</th>
                    <td class="px-6 py-4"><a href="https://www.jnport.gov.in" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline font-semibold">JNPT (Nhava Sheva)</a>, Mundra Port</td>
                  </tr>
                  <tr>
                    <th scope="row" class="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Transit Times</th>
                    <td class="px-6 py-4">Jebel Ali: 3–4 days; Dammam: 5–6 days; Singapore: 7–9 days; Felixstowe: 21–24 days</td>
                  </tr>
                  <tr>
                    <th scope="row" class="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Certifications</th>
                    <td class="px-6 py-4"><a href="https://apeda.gov.in" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline font-semibold">APEDA</a>, IEC, Phytosanitary Certificate, Fumigation Certificate (MBr), Certificate of Origin (COO)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Agricultural Context & E-E-A-T Content -->
        <section class="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-6">
          <div class="max-w-3xl">
            <span class="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">Agricultural Context &amp; E-E-A-T Sourcing</span>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Seasonal Crop Cycles: Pol (Kharif) vs. Garwa (Rabi) Onions
            </h2>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm">
              Maharashtra is the heart of India's onion production, contributing over 35% of national output. Knowing the physiological distinctions between seasonal harvests allows international procurement managers to optimize shelf life and avoid transit loss.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="rounded-2xl border-2 border-emerald-500/20 bg-emerald-50/30 p-6">
              <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Garwa (Rabi Main Crop) • 5–6 Months Storage Life
              </span>
              <h3 class="mt-3 text-xl font-bold text-slate-900">Garwa Onions (Harvest: March to June)</h3>
              <p class="mt-2 text-xs text-slate-600">
                Garwa onions are naturally cured in ventilated shade structures (Kanda Chawl) across Lasalgaon and Pimpalgaon. They possess 3 to 4 dense outer tunics, low inner moisture, and high dry-matter content (>12° Brix). This physiological density prevents premature sprouting and rotting during 21 to 24-day ocean voyages to Felixstowe, Rotterdam, and European distribution hubs.
              </p>
            </div>
            <div class="rounded-2xl border-2 border-amber-500/20 bg-amber-50/30 p-6">
              <span class="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 uppercase tracking-wider">
                Pol (Kharif Crop) • Fast-Turnover Gulf Supply
              </span>
              <h3 class="mt-3 text-xl font-bold text-slate-900">Pol Onions (Harvest: October to December)</h3>
              <p class="mt-2 text-xs text-slate-600">
                Pol onions feature a vibrant, light reddish globe with high pungency and tenderness. Harvested post-monsoon, they have higher water content and shorter dormancy (30 to 45 days). They are prioritized for fast-transit ocean routes (3–4 days to Jebel Ali and 5–6 days to Dammam) under rigorous pre-cooling to prevent surface mold.
              </p>
            </div>
          </div>

          <div class="border-t border-slate-200 pt-6">
            <h3 class="text-lg font-bold text-slate-900">Packhouse Grading, Pre-Cooling &amp; Palletization Workflows</h3>
            <p class="mt-2 text-xs text-slate-600 leading-relaxed">
              Consignments arrive from Lasalgaon APMC yard to Sheshaan Global's packhouse where they undergo mechanical rotary sorting into 45–55mm and 55–65mm calibration sizes. Bulbs undergo fungal screening under UV illumination to reject any Aspergillus niger spores. Qualified lots are bagged into UV-stabilized red leno mesh sacks, stacked on fumigated heat-treated pallets (ISPM-15), and pre-cooled down to +4°C before automated transfer into Carrier/Daikin 40ft High Cube reefer boxes at JNPT Nhava Sheva.
            </p>
          </div>
        </section>

        <!-- FAQ Section -->
        <section class="space-y-6">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: Fresh Onion Export
          </h2>
          <div class="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
            <div>
              <h4 class="text-base font-bold text-slate-900">What is the Minimum Order Quantity (MOQ)?</h4>
              <p class="mt-1 text-sm text-slate-600">Our MOQ is one 40ft High Cube reefer container holding 28 to 29 Metric Tons (1,120–1,160 bags of 25kg each).</p>
            </div>
            <div class="pt-4">
              <h4 class="text-base font-bold text-slate-900">What Incoterms and Payment terms are offered?</h4>
              <p class="mt-1 text-sm text-slate-600">We offer FOB (JNPT/Mundra), CFR, and CIF destination ports. Payment via 100% Irrevocable L/C at sight or 30% advance TT with 70% against original Bill of Lading.</p>
            </div>
            <div class="pt-4">
              <h4 class="text-base font-bold text-slate-900">What are the ocean transit times from JNPT?</h4>
              <p class="mt-1 text-sm text-slate-600">Jebel Ali (UAE): 3–4 days; Dammam (Saudi Arabia): 5–6 days; Singapore: 7–9 days; Felixstowe/Rotterdam: 21–24 days.</p>
            </div>
          </div>
        </section>
      </div>
    `,
  },

  // =========================================================================
  // TIER 1: Core Pillar Hubs
  // =========================================================================
  {
    path: "agricultural-exports-india",
    title: "Agriculture Exporter in India | APEDA Certified Agro Commodities — Sheshaan Global",
    description:
      "APEDA & IEC certified agricultural produce exporter in India. Bulk supplier of fresh Nashik red onions, Basmati rice, green chillies, Pollachi coconuts, whole spices & pulses. FCL shipping via JNPT & Mundra to 25+ countries worldwide.",
    canonicalUrl: `${BASE_URL}/agricultural-exports-india`,
    keywords:
      "exporter in india for agriculture, agro product exporter in india, agricultural produce exporter India, agricultural commodities export JNPT, APEDA certified exporters India, bulk fresh produce exporter",
    schemas: [],
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Agricultural Exports India", url: `${BASE_URL}/agricultural-exports-india` },
    ],
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#072552] to-[#0057B8] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <div class="inline-block rounded-full bg-amber-500/20 border border-amber-400/30 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
            APEDA RCMC • DGFT IEC • FSSAI Central License
          </div>
          <h1 class="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Agricultural Produce Exporter in India: APEDA-Certified Bulk Sourcing &amp; Cold-Chain Shipping
          </h1>
          <p class="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global is a premier APEDA-certified Indian exporter of agricultural commodities</strong>, supplying wholesale food distributors, hypermarket chains, and institutional importers across 25+ countries worldwide with direct farm-gate procurement and controlled-atmosphere ocean freight.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <a href="https://wa.me/918149909546?text=Inquiry%20via%20Agricultural%20Exports%20India%20Pillar" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#1fae53] transition">
              Connect with Trade Desk (+91 81499 09546)
            </a>
            <a href="/products" class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition">
              Browse 49-Commodity Catalog →
            </a>
          </div>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        <section>
          <h2 class="text-2xl font-bold text-slate-900 sm:text-3xl">India's Core Export Commodity Pillars</h2>
          <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-bold text-blue-700">HS 07031010</span>
              <h3 class="text-lg font-bold text-slate-900 mt-2">Fresh Nashik Red Onions</h3>
              <p class="text-xs text-slate-600 mt-2">45-55mm &amp; 55-65mm grades, 28-29 MT in 40ft reefer container from JNPT.</p>
              <a href="/products/fresh-onions-exporter-india" class="mt-4 inline-block text-xs font-bold text-blue-700 hover:underline">View Onions Page →</a>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-bold text-blue-700">HS 07096010</span>
              <h3 class="text-lg font-bold text-slate-900 mt-2">G4 &amp; Teja Green Chillies</h3>
              <p class="text-xs text-slate-600 mt-2">7-11cm calibrated pods in 4kg/5kg cartons at +7°C to +10°C.</p>
              <a href="/products/green-chillies-exporter" class="mt-4 inline-block text-xs font-bold text-blue-700 hover:underline">View Chillies Page →</a>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-bold text-blue-700">HS 10063020</span>
              <h3 class="text-lg font-bold text-slate-900 mt-2">1121 &amp; 1509 Basmati Rice</h3>
              <p class="text-xs text-slate-600 mt-2">Aged 2+ years, 8.35mm+ grain length in 25kg/50kg BOPP bags.</p>
              <a href="/products/indian-basmati-rice" class="mt-4 inline-block text-xs font-bold text-blue-700 hover:underline">View Basmati Page →</a>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-bold text-blue-700">HS 08011910</span>
              <h3 class="text-lg font-bold text-slate-900 mt-2">Pollachi Semi-Husked Coconuts</h3>
              <p class="text-xs text-slate-600 mt-2">550g-650g grade in 25-nut PP bags, ~45,000 nuts per 40ft reefer.</p>
              <a href="/products/coconut-exporter-india" class="mt-4 inline-block text-xs font-bold text-blue-700 hover:underline">View Coconut Page →</a>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-bold text-blue-700">HS Chapter 09</span>
              <h3 class="text-lg font-bold text-slate-900 mt-2">Whole &amp; Ground Spices</h3>
              <p class="text-xs text-slate-600 mt-2">Unjha cumin, Sangli turmeric, Guntur chilli. ETO-free ASTA grade.</p>
              <a href="/products/spices-masalas-exporter" class="mt-4 inline-block text-xs font-bold text-blue-700 hover:underline">View Spices Page →</a>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-bold text-blue-700">HS Chapter 07</span>
              <h3 class="text-lg font-bold text-slate-900 mt-2">Sortex Pulses &amp; Lentils</h3>
              <p class="text-xs text-slate-600 mt-2">Kabuli chickpeas (42-44 count), Toor dal, red lentils, moong dal.</p>
              <a href="/products/pulses-lentils-exporter" class="mt-4 inline-block text-xs font-bold text-blue-700 hover:underline">View Pulses Page →</a>
            </div>
          </div>
        </section>
      </div>
    `,
  },

  {
    path: "global-export-markets",
    title: "Global Export Markets | Indian Agricultural Shipping Lanes — Sheshaan Global",
    description:
      "Overview of Sheshaan Global's 25+ international destination markets across GCC, Europe, UK, Southeast Asia & Africa. Sea transit times, port clearance protocols, reefer temperature setpoints & documentation workflows.",
    canonicalUrl: `${BASE_URL}/global-export-markets`,
    keywords:
      "global export markets India, agricultural export shipping lanes, export produce to UAE, export rice to Saudi Arabia, JNPT container shipping lanes",
    schemas: [],
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Global Export Markets", url: `${BASE_URL}/global-export-markets` },
    ],
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#092954] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <div class="inline-block rounded-full bg-amber-500/20 border border-amber-400/30 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
            25+ Destination Countries • Tier-1 Mainline Ocean Carriers
          </div>
          <h1 class="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Global Export Markets: International Agricultural Shipping Lanes &amp; Gateway Ports
          </h1>
          <p class="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global operates streamlined trade corridors from India's west and east coast ports</strong>, delivering agricultural produce under strict cold-chain management across the Middle East, Europe, United Kingdom, Southeast Asia, and Africa.
          </p>
        </div>
      </div>
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-blue-700">3–4 DAYS TRANSIT</span>
            <h3 class="text-xl font-bold text-slate-900 mt-2">United Arab Emirates (Jebel Ali / Dubai)</h3>
            <p class="text-xs text-slate-600 mt-2">Fresh Nashik red onions, G4 chillies, Basmati rice, Pollachi coconuts. Dubai Municipality food safety compliant.</p>
            <a href="/markets/export-to-uae" class="mt-4 inline-block text-xs font-bold text-blue-700 hover:underline">Explore UAE Corridor →</a>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-blue-700">5–6 DAYS TRANSIT</span>
            <h3 class="text-xl font-bold text-slate-900 mt-2">Saudi Arabia (Dammam &amp; Jeddah)</h3>
            <p class="text-xs text-slate-600 mt-2">1121 Basmati rice, fresh onions, spices, and chickpeas. SFDA &amp; SABER electronic certification.</p>
            <a href="/markets/export-to-saudi-arabia" class="mt-4 inline-block text-xs font-bold text-blue-700 hover:underline">Explore Saudi Arabia Corridor →</a>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-blue-700">21–24 DAYS TRANSIT</span>
            <h3 class="text-xl font-bold text-slate-900 mt-2">United Kingdom &amp; Europe (Felixstowe / Rotterdam)</h3>
            <p class="text-xs text-slate-600 mt-2">Garwa Rabi onions, mature coconuts, aged Basmati rice. EU-MRL pesticide and aflatoxin tested.</p>
            <a href="/markets/export-to-uk-europe" class="mt-4 inline-block text-xs font-bold text-blue-700 hover:underline">Explore UK &amp; Europe Corridor →</a>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-blue-700">7–9 DAYS TRANSIT</span>
            <h3 class="text-xl font-bold text-slate-900 mt-2">Southeast Asia (Singapore &amp; Malaysia)</h3>
            <p class="text-xs text-slate-600 mt-2">Small &amp; medium onions (40-50mm &amp; 45-55mm), chillies, rice, and spices. SFA &amp; MAQIS cleared.</p>
            <a href="/markets/export-to-southeast-asia" class="mt-4 inline-block text-xs font-bold text-blue-700 hover:underline">Explore SE Asia Corridor →</a>
          </div>
        </div>
      </div>
    `,
  },

  {
    path: "trade-compliance",
    title: "Agricultural Trade Compliance & Certifications | APEDA & FSSAI — Sheshaan Global",
    description:
      "Official compliance hub for Indian agricultural exports: APEDA RCMC, DGFT Importer-Exporter Code (IEC), FSSAI Central License, Coconut Development Board (CDB), Phytosanitary, Fumigation & SGS laboratory testing.",
    canonicalUrl: `${BASE_URL}/trade-compliance`,
    keywords:
      "agricultural export trade compliance India, APEDA certificate exporter, DGFT IEC license, FSSAI central food export, phytosanitary certificate India, pre shipment SGS inspection",
    schemas: [],
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Trade Compliance", url: `${BASE_URL}/trade-compliance` },
    ],
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#0b2847] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <div class="inline-block rounded-full bg-emerald-500/20 border border-emerald-400/30 px-4 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300">
            Statutory Transparency &amp; Food Safety Governance
          </div>
          <h1 class="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Indian Agricultural Trade Compliance: Statutory Certifications, Phytosanitary &amp; Lab Protocols
          </h1>
          <p class="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global operates with 100% legal, regulatory, and quality certification</strong>, ensuring that every container dispatched from Nhava Sheva (JNPT) and Mundra complies with destination customs laws and international food safety thresholds.
          </p>
        </div>
      </div>
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900">APEDA Registration</h3>
            <p class="text-xs text-slate-600 mt-2">Registration-cum-Membership Certificate under the Ministry of Commerce for fresh fruits, vegetables, and rice exports.</p>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900">DGFT IEC Code</h3>
            <p class="text-xs text-slate-600 mt-2">Statutory 10-digit Importer-Exporter Code issued by DGFT enabling legal customs export clearance across Indian ports.</p>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900">FSSAI Central License</h3>
            <p class="text-xs text-slate-600 mt-2">Highest-tier food safety certification confirming hygienic sorting, packaging, and non-adulteration.</p>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900">Phytosanitary Clearance</h3>
            <p class="text-xs text-slate-600 mt-2">Government plant quarantine inspection guaranteeing cargo freedom from regulated pests.</p>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900">Fumigation Certification</h3>
            <p class="text-xs text-slate-600 mt-2">Methyl Bromide (MBr) &amp; Phosphine treatment meeting destination quarantine rules and ISPM-15 standards.</p>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900">SGS / BV Quality Testing</h3>
            <p class="text-xs text-slate-600 mt-2">Pre-shipment batch testing for EU-MRL pesticide thresholds, aflatoxins, and DNA Basmati authenticity.</p>
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // TIER 2: Other Master Products
  // =========================================================================
  {
    path: "products/green-chillies-exporter",
    title: "Green Chillies Exporter in India | G4 & Teja Cold-Chain Bulk Supplier — Sheshaan Global",
    description:
      "APEDA-certified Indian green chillies exporter. Sourced from Maharashtra, Gujarat & Andhra Pradesh. G4 & Teja varieties graded 7-11cm. Shipped in 4kg/5kg cartons under +7°C to +10°C cold chain via JNPT & air cargo.",
    canonicalUrl: `${BASE_URL}/products/green-chillies-exporter`,
    keywords: "green chillies exporter in india, G4 green chilli supplier, teja chillies export, fresh chillies JNPT cold chain",
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#062f1c] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight">Indian Green Chillies Exporter: G4 &amp; Teja Cold-Chain Produce</h1>
          <p class="mt-4 text-lg text-slate-200 max-w-3xl"><strong>Sheshaan Global is a premier Indian exporter of fresh green chillies</strong>, supplying G4 and Teja varieties to wholesale food distributors in the Middle East and Europe.</p>
        </div>
      </div>
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-slate-900">Technical Specifications (HS 07096010)</h2>
        <p class="mt-2 text-sm text-slate-700 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">Fresh green chillies packed in 4kg/5kg ventilated cartons. Reefer container load: 12-14 MT at +7°C to +10°C.</p>
      </div>
    `,
  },

  {
    path: "products/indian-basmati-rice",
    title: "Indian Basmati Rice Exporter | 1121 & 1509 Bulk Supplier — Sheshaan Global",
    description:
      "APEDA-certified Indian Basmati rice exporter. Premium 1121, 1509, Sugandha and Sharbati varieties. Steam, Sella (Parboiled) & Raw. Aged 2+ years, 8.35mm+ grain length. Shipped in 20ft FCL (25-26 MT) via Mundra & JNPT.",
    canonicalUrl: `${BASE_URL}/products/indian-basmati-rice`,
    keywords: "indian basmati rice exporter, 1121 basmati rice bulk supplier, 1509 sella rice export, aged basmati rice India",
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#211a0d] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight">Indian Basmati Rice Exporter: 1121 &amp; 1509 Aged Rice</h1>
          <p class="mt-4 text-lg text-slate-200 max-w-3xl"><strong>Sheshaan Global is a trusted exporter of premium aged Indian Basmati rice</strong>, supplying 1121 Steam, Golden Sella, and Creamy Sella across Saudi Arabia, UAE, and Europe.</p>
        </div>
      </div>
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-slate-900">Technical Specifications (HS 10063020)</h2>
        <p class="mt-2 text-sm text-slate-700 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">Aged 2+ years, 8.35mm+ grain length, packed in 25kg/50kg BOPP bags. 25-26 MT per 20ft FCL container.</p>
      </div>
    `,
  },

  {
    path: "products/coconut-exporter-india",
    title: "Coconut Exporter in India | Pollachi Semi-Husked Bulk Supplier — Sheshaan Global",
    description:
      "Coconut Development Board (CDB) certified Indian fresh coconut exporter. Pollachi & Kerala origin brown husked & semi-husked coconuts. Graded 550g-650g & 650g+. Shipped in 40ft reefer (45,000 nuts / 28 MT) via Cochin, Chennai & JNPT.",
    canonicalUrl: `${BASE_URL}/products/coconut-exporter-india`,
    keywords: "coconut exporter in india, pollachi coconut export, semi husked coconut supplier, fresh brown coconuts wholesale India",
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#2d2109] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight">Indian Coconut Exporter: Pollachi Semi-Husked Mature Coconuts</h1>
          <p class="mt-4 text-lg text-slate-200 max-w-3xl"><strong>Sheshaan Global is a CDB-certified exporter of fresh Indian coconuts</strong>, sourcing directly from Pollachi (Tamil Nadu) and Kerala.</p>
        </div>
      </div>
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-slate-900">Technical Specifications (HS 08011910)</h2>
        <p class="mt-2 text-sm text-slate-700 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">Grade A (550-650g) and Grade AA (650g+) in 25-nut PP bags. 40ft reefer holds ~45,000 nuts (28 MT) at +12°C to +14°C.</p>
      </div>
    `,
  },

  {
    path: "products/spices-masalas-exporter",
    title: "Spices & Masalas Exporter in India | Whole & Ground Bulk Supplier — Sheshaan Global",
    description:
      "Spices Board of India certified exporter of premium whole and ground spices: Unjha Cumin (Jeera), Sangli Turmeric (Curcumin 3-5%), Guntur Red Chilli & Coriander. Machine-cleaned, sortex-graded, ETO-free, ASTA & EU-MRL compliant.",
    canonicalUrl: `${BASE_URL}/products/spices-masalas-exporter`,
    keywords: "spices exporter in india, indian spices wholesale, unjha cumin seeds exporter, turmeric finger bulk supplier",
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#331804] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight">Indian Spices Exporter: Premium Whole &amp; Ground Cumin, Turmeric &amp; Chilli</h1>
          <p class="mt-4 text-lg text-slate-200 max-w-3xl"><strong>Sheshaan Global is an authorized exporter of premium Indian spices</strong>, supplying food processors and spice distributors globally.</p>
        </div>
      </div>
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-slate-900">Technical Specifications (HS Chapter 09)</h2>
        <p class="mt-2 text-sm text-slate-700 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">Unjha Cumin (99.5% sortex), Sangli Turmeric (Curcumin 3-5%), Guntur Teja Chilli. ETO-free, steam sterilized, ASTA compliant.</p>
      </div>
    `,
  },

  {
    path: "products/pulses-lentils-exporter",
    title: "Pulses & Lentils Exporter in India | Chickpeas & Dals Bulk Supplier — Sheshaan Global",
    description:
      "Leading Indian pulses and lentils exporter. Sortex-cleaned Kabuli chickpeas (42-44, 44-46 count), Desi chickpeas, Toor dal (pigeon peas), red lentils (Masoor) & Moong dal. 99.5% purity, packed in 25kg/50kg PP bags, 24 MT/20ft FCL.",
    canonicalUrl: `${BASE_URL}/products/pulses-lentils-exporter`,
    keywords: "pulses exporter in india, chickpeas bulk supplier, kabuli chana export, indian lentils exporter",
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#241a0d] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight">Indian Pulses &amp; Lentils Exporter: Sortex Cleaned Chickpeas &amp; Dals</h1>
          <p class="mt-4 text-lg text-slate-200 max-w-3xl"><strong>Sheshaan Global is an established exporter of Indian pulses and lentils</strong>, delivering sortex-graded Kabuli chickpeas, Toor dal, and red lentils.</p>
        </div>
      </div>
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-slate-900">Technical Specifications (HS Chapter 07)</h2>
        <p class="mt-2 text-sm text-slate-700 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">Kabuli chickpeas 42-44 count, Toor dal, Masoor lentils. Purity 99.5%, Moisture &lt; 12%. 24 MT per 20ft FCL.</p>
      </div>
    `,
  },

  // =========================================================================
  // TIER 3: Trade Corridors
  // =========================================================================
  {
    path: "markets/export-to-uae",
    title: "Export to UAE (Dubai & Jebel Ali) | Indian Agricultural Exporter — Sheshaan Global",
    description:
      "Dedicated shipping lane from India (JNPT Nhava Sheva & Mundra) to United Arab Emirates: Jebel Ali Port, Sharjah Port Khalid & Khalifa Port. 3-4 days sea transit for fresh onions, green chillies, Basmati rice & coconuts. Dubai Municipality compliant.",
    canonicalUrl: `${BASE_URL}/markets/export-to-uae`,
    keywords: "export to UAE agriculture, indian onion export to Dubai, basmati rice exporter Jebel Ali",
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#0b335c] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight">Export to UAE: Dubai &amp; Jebel Ali Agricultural Trade Corridor</h1>
          <p class="mt-4 text-lg text-slate-200 max-w-3xl"><strong>3–4 days direct sea transit from JNPT Nhava Sheva to Jebel Ali Port</strong>. Supplying fresh onions, green chillies, Basmati rice, and coconuts under Dubai Municipality standards.</p>
        </div>
      </div>
    `,
  },

  {
    path: "markets/export-to-saudi-arabia",
    title: "Export to Saudi Arabia (Dammam & Jeddah) | Indian Agricultural Exporter — Sheshaan Global",
    description:
      "Dedicated shipping lane from India (JNPT & Mundra) to Kingdom of Saudi Arabia: King Abdulaziz Port Dammam & Jeddah Islamic Port. 5-6 days transit for 1121 Basmati rice, fresh onions & spices. SFDA & SABER compliant.",
    canonicalUrl: `${BASE_URL}/markets/export-to-saudi-arabia`,
    keywords: "export to saudi arabia agriculture, basmati rice export to dammam, indian onions jeddah port, SFDA food export compliance",
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#123824] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight">Export to Saudi Arabia: Dammam &amp; Jeddah Trade Corridor</h1>
          <p class="mt-4 text-lg text-slate-200 max-w-3xl"><strong>5–6 days transit to Dammam &amp; 7–9 days to Jeddah</strong>. SFDA registered &amp; SABER compliant for Basmati rice, onions, and spices.</p>
        </div>
      </div>
    `,
  },

  {
    path: "markets/export-to-uk-europe",
    title: "Export to UK & Europe (Felixstowe & Rotterdam) | Indian Agricultural Exporter — Sheshaan Global",
    description:
      "Dedicated cold-chain shipping lane from India (JNPT) to United Kingdom & European Union: Port of Felixstowe, London Gateway, Port of Rotterdam & Antwerp. 21-24 days reefer transit. EU 2073/2005, Aflatoxin & EU-MRL pesticide compliant.",
    canonicalUrl: `${BASE_URL}/markets/export-to-uk-europe`,
    keywords: "export to UK Europe agriculture, indian onions to Felixstowe, coconut export to Rotterdam, EU MRL compliant Indian exporter",
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#102e52] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight">Export to UK &amp; Europe: Felixstowe &amp; Rotterdam Trade Corridor</h1>
          <p class="mt-4 text-lg text-slate-200 max-w-3xl"><strong>21–24 days direct reefer transit from JNPT</strong>. Supplying Garwa onions, mature coconuts, and aged Basmati rice under EU Regulation 2073/2005.</p>
        </div>
      </div>
    `,
  },

  {
    path: "markets/export-to-southeast-asia",
    title: "Export to Southeast Asia (Singapore & Malaysia) | Indian Agricultural Exporter — Sheshaan Global",
    description:
      "Dedicated shipping corridor from India (JNPT & Chennai) to Southeast Asia: Port of Singapore (Jurong), Port Klang (Malaysia) & Chittagong. 7-9 days sea transit for fresh red onions, chillies, rice & spices. SFA & MAQIS compliant.",
    canonicalUrl: `${BASE_URL}/markets/export-to-southeast-asia`,
    keywords: "export to southeast asia agriculture, indian onions to Singapore Jurong, Port Klang onion imports",
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#0d2a45] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight">Export to Southeast Asia: Singapore &amp; Malaysia Trade Corridor</h1>
          <p class="mt-4 text-lg text-slate-200 max-w-3xl"><strong>7–9 days direct sea transit to Singapore Jurong and Port Klang</strong>. SFA &amp; MAQIS cleared small-to-medium red onions, chillies, and rice.</p>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // CORE HOMEPAGE
  // =========================================================================
  {
    path: "",
    title: "Sheshaan Global | Indian Agricultural Produce Exporter — APEDA & IEC Certified",
    description:
      "APEDA and IEC certified Indian exporter of fresh Nashik red onions, Basmati rice, green chillies, Pollachi coconuts, whole spices & pulses to 25+ countries worldwide. Request FOB/CIF container pricing.",
    canonicalUrl: `${BASE_URL}/`,
    keywords:
      "exporter in india for agriculture, onions exporter in india, nashik red onion exporter, agro product exporter in india, basmati rice exporter India, spices exporter India",
    contentHtml: `
      <div class="bg-gradient-to-br from-[#04152D] via-[#07244C] to-[#0057B8] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl text-center">
          <div class="inline-block rounded-full bg-amber-500/20 border border-amber-400/30 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
            APEDA • DGFT IEC • FSSAI Central License • Coconut Development Board
          </div>
          <h1 class="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Indian Agricultural Produce Exporter: Premium Fresh Crops &amp; Commodities Worldwide
          </h1>
          <p class="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            <strong>Sheshaan Global is an APEDA-certified Indian exporter of fresh produce, Nashik red onions, Basmati rice, spices, pulses, and agro commodities</strong>, supplying wholesale food distributors, hypermarket chains, and institutional importers across 25+ countries.
          </p>
          <div class="mt-8 flex justify-center flex-wrap gap-4">
            <a href="https://wa.me/918149909546?text=Hello%20Sheshaan%20Global,%20I'm%20interested%20in%20agricultural%20export%20commodities." target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-[#1fae53] transition">
              Request Instant Quote (+91 81499 09546)
            </a>
            <a href="/products" class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur hover:bg-white/20 transition">
              Browse 49 Commodities
            </a>
          </div>
        </div>
      </div>
    `,
  },
];

console.log(`Starting Static Site Pre-rendering for ${PAGES.length} routes...`);

let generatedCount = 0;

for (const page of PAGES) {
  const fullHtml = htmlLayout(page);
  
  // Write to public/
  const targetSubdir = page.path ? path.join(PUBLIC_DIR, page.path) : PUBLIC_DIR;
  if (!fs.existsSync(targetSubdir)) {
    fs.mkdirSync(targetSubdir, { recursive: true });
  }
  const publicFilePath = page.path ? path.join(targetSubdir, "index.html") : path.join(PUBLIC_DIR, "index.html");
  fs.writeFileSync(publicFilePath, fullHtml, "utf8");

  // Write to .output/public/ if directory exists
  if (fs.existsSync(OUTPUT_PUBLIC_DIR)) {
    const outputSubdir = page.path ? path.join(OUTPUT_PUBLIC_DIR, page.path) : OUTPUT_PUBLIC_DIR;
    if (!fs.existsSync(outputSubdir)) {
      fs.mkdirSync(outputSubdir, { recursive: true });
    }
    const outputFilePath = page.path ? path.join(outputSubdir, "index.html") : path.join(OUTPUT_PUBLIC_DIR, "index.html");
    fs.writeFileSync(outputFilePath, fullHtml, "utf8");
  }

  generatedCount++;
  console.log(`✓ Pre-rendered: /${page.path || ""}`);
}

console.log(`\nSuccessfully pre-rendered ${generatedCount} static HTML pages into public/ and .output/public/!`);
