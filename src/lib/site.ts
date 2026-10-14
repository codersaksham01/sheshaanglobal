import prodFruits from "@/assets/prod-fruits.jpg";
import prodVeg from "@/assets/prod-vegetables.jpg";
import prodFreshOnions from "@/assets/prod-fresh-onions.jpg";
import prodRice from "@/assets/prod-rice.jpg";
import prodPulses from "@/assets/prod-pulses.jpg";
import prodSpices from "@/assets/prod-spices.jpg";
import prodDryfruits from "@/assets/prod-dryfruits.jpg";
import prodCoconut from "@/assets/prod-coconut.jpg";
import prodChillies from "@/assets/prod-chillies.jpg";
import prodTurmericDetail from "@/assets/prod-turmeric-detail.jpg";
import prodSugarDetail from "@/assets/prod-sugar-detail.jpg";
import prodMakhanaDetail from "@/assets/prod-makhana-detail.jpg";
import prodMakhanaAltDetail from "@/assets/prod-makhana-alt-detail.jpg";
import prodPomegranateDetail from "@/assets/prod-pomegranate-detail.jpg";
import prodCuminDetail from "@/assets/prod-cumin-detail.jpg";
import prodCashewDetail from "@/assets/prod-cashew-detail.jpg";
import prodTamarindDetail from "@/assets/prod-tamarind-detail.jpg";
import prodPotatoesDetail from "@/assets/prod-potatoes-detail.jpg";
import prodOkraDetail from "@/assets/prod-okra-detail.jpg";
import prodDehydratedOnionDetail from "@/assets/prod-dehydrated-onion-detail.jpg";
import prodGrapesDetail from "@/assets/prod-grapes-detail.jpg";
import prodDrumsticksDetail from "@/assets/prod-drumsticks-detail.jpg";
import prodDehydratedGarlicDetail from "@/assets/prod-dehydrated-garlic-detail.jpg";
import prodBananaDetail from "@/assets/prod-banana-detail.jpg";
import prodTomatoesDetail from "@/assets/prod-tomatoes-detail.jpg";
import prodSoyabeanDetail from "@/assets/prod-soyabean-detail.jpg";
import prodMustardDetail from "@/assets/prod-mustard-detail.jpg";
import prodWheatDetail from "@/assets/prod-wheat-detail.jpg";
import prodDriedRedChilliesDetail from "@/assets/prod-dried-red-chillies-detail.jpg";
import prodGreenPeppercornDetail from "@/assets/prod-green-peppercorn-detail.jpg";
import prodChickpeasDetail from "@/assets/prod-chickpeas-detail.jpg";
import prodMangoDetail from "@/assets/prod-mango-detail.jpg";
import prodDalDetail from "@/assets/prod-dal-detail.jpg";
import prodOrangesDetail from "@/assets/prod-oranges-detail.jpg";
import prodLemonDetail from "@/assets/prod-lemon-detail.jpg";
import prodFenugreekDetail from "@/assets/prod-fenugreek-detail.jpg";
import prodClusterBeansDetail from "@/assets/prod-cluster-beans-detail.jpg";
import prodGarlicDetail from "@/assets/prod-garlic-detail.jpg";
import prodCurryLeavesDetail from "@/assets/prod-curry-leaves-detail.jpg";
import prodCowDungDetail from "@/assets/prod-cow-dung-detail.jpg";
import prodGingerDetail from "@/assets/prod-ginger-detail.jpg";
import prodBlackPepperDetail from "@/assets/prod-black-pepper-detail.jpg";
import prodKabuliChickpeas from "@/assets/prod-kabuli-chickpeas.jpg";
import prodCloves from "@/assets/prod-cloves.jpg";
import prodCinnamon from "@/assets/prod-cinnamon.jpg";
import prodFenugreekSeeds from "@/assets/prod-fenugreek-seeds.jpg";
import prodFennelSeeds from "@/assets/prod-fennel-seeds.jpg";
import prodFlaxseedLinseed from "@/assets/prod-flaxseed-linseed.jpg";
import prodCorianderSeeds from "@/assets/prod-coriander-seeds.jpg";
import prodMustardSeeds from "@/assets/prod-mustard-seeds.jpg";
import prodCardamomPods from "@/assets/prod-cardamom-pods.jpg";
import prodRajmaDark from "@/assets/prod-rajma-dark.jpg";
import prodRajmaChitra from "@/assets/prod-rajma-chitra.jpg";
import prodBlackBeansUrad from "@/assets/prod-black-beans-urad.jpg";
import prodWheatGrain from "@/assets/prod-wheat-grain.jpg";
import prodMaizeCorn from "@/assets/prod-maize-corn.jpg";
import prodGreenMoong from "@/assets/prod-green-moong.jpg";
import prodPumpkinSeeds from "@/assets/prod-pumpkin-seeds.jpg";
import prodPeanutsRaw from "@/assets/prod-peanuts-raw.jpg";
import prodHorseGram from "@/assets/prod-horse-gram.jpg";
import prodDesiChana from "@/assets/prod-desi-chana.jpg";
import prodLobiaCowpea from "@/assets/prod-lobia-cowpea.jpg";
import prodYellowPeas from "@/assets/prod-yellow-peas.jpg";
import prodGreenPeas from "@/assets/prod-green-peas.jpg";
import prodBlackPeppercorn from "@/assets/prod-black-peppercorn.jpg";
import prodStarAnise from "@/assets/prod-star-anise.jpg";
import prodMoringaTree from "@/assets/prod-moringa-tree.jpg";
import prodMoringaPowder from "@/assets/prod-moringa-powder.jpg";
import prodSesameWhite from "@/assets/prod-sesame-white.jpg";
import prodAjwain from "@/assets/prod-ajwain.jpg";
import prodSesameBlack from "@/assets/prod-sesame-black.jpg";
import prodGreenPeppercornWhole from "@/assets/prod-green-peppercorn-whole.jpg";
import prodSorghumJowar from "@/assets/prod-sorghum-jowar.jpg";
import prodMilletBajra from "@/assets/prod-millet-bajra.jpg";
import prodMilletRagi from "@/assets/prod-millet-ragi.jpg";
import prodSoybeansYellow from "@/assets/prod-soybeans-yellow.jpg";


export const BLUE = "#0057B8";
export const ORANGE = "#FF8A00";
export const NAVY = "#04152D";

export const PHONE = "+91 81499 09546";
export const PHONE_RAW = "918149909546";
export const EMAIL = "info@sheshaanglobal.com";
export const BROCHURE_URL = "/catalogue.pdf";

export function buildWhatsAppUrl(opts?: {
  category?: string;
  name?: string;
  company?: string;
  country?: string;
  message?: string;
}) {
  const lines: string[] = ["Hello Sheshaan Global,"];
  if (opts?.category) lines.push(`I'm interested in *${opts.category}*.`);
  else lines.push("I'm interested in your agricultural export products.");
  if (opts?.message?.trim()) lines.push("", opts.message.trim());
  const meta: string[] = [];
  if (opts?.name) meta.push(`Name: ${opts.name}`);
  if (opts?.company) meta.push(`Company: ${opts.company}`);
  if (opts?.country) meta.push(`Country: ${opts.country}`);
  if (meta.length) lines.push("", ...meta);
  lines.push("", "Please share the latest catalogue and pricing.");
  return `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export const WHATSAPP_URL = buildWhatsAppUrl();
export const MAILTO_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Export Inquiry — Sheshaan Global",
)}`;

import certGst from "@/assets/cert-gst.png";
import certIec from "@/assets/cert-iec.png";
import certCoconut from "@/assets/cert-coconut.jpg";

export type CertType = "Government" | "Trade" | "Food Safety" | "Quality";
export type Certificate = {
  id: string;
  name: string;
  fullName: string;
  label: string;
  type: CertType;
  issuer: string;
  issuedOn?: string;
  categories: string[]; // product categories it applies to ("All" allowed)
  countries: string[]; // country/region coverage ("Global" allowed)
  img: string;
  file: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    id: "gst",
    name: "GST",
    fullName: "Goods & Services Tax Registration",
    label: "Registered",
    type: "Government",
    issuer: "Govt. of India",
    issuedOn: "2023-04-13",
    categories: ["All"],
    countries: ["India"],
    img: certGst,
    file: certGst,
  },
  {
    id: "iec",
    name: "IEC",
    fullName: "Importer-Exporter Code",
    label: "Certified",
    type: "Trade",
    issuer: "DGFT, Ministry of Commerce",
    categories: ["All"],
    countries: ["Global"],
    img: certIec,
    file: certIec,
  },
  {
    id: "cdb",
    name: "CDB",
    fullName: "Coconut Development Board Registration",
    label: "Registered",
    type: "Trade",
    issuer: "Coconut Development Board, Govt. of India",
    categories: ["Coconut (Brown Husked)"],
    countries: ["Global"],
    img: certCoconut,
    file: "/cert-coconut.pdf",
  },
  {
    id: "apeda",
    name: "APEDA",
    fullName: "Agricultural & Processed Food Products Export Development Authority",
    label: "Certified",
    type: "Trade",
    issuer: "APEDA, Govt. of India",
    categories: [
      "Fresh Onions",
      "Green Chillies",
      "Premium Rice",
      "Coconut (Brown Husked)",
      "Fresh Fruits",
      "Fresh Vegetables",
    ],
    countries: ["Global"],
    img: certGst,
    file: certGst,
  },
  {
    id: "fssai",
    name: "FSSAI",
    fullName: "Food Safety and Standards Authority of India",
    label: "Certified",
    type: "Food Safety",
    issuer: "FSSAI, Govt. of India",
    categories: ["All"],
    countries: ["India", "Global"],
    img: certIec,
    file: certIec,
  },
];

export const CERT_TYPES: CertType[] = ["Government", "Trade", "Food Safety", "Quality"];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Which countries does Sheshaan Global export to?",
    a: "We export to 25+ countries across the Middle East, Europe, Asia-Pacific, Africa and the Americas — including UAE, Saudi Arabia, UK, USA, Singapore, Malaysia, Bangladesh, South Africa and Australia.",
  },
  {
    q: "What certifications do you hold?",
    a: "We are GST registered, IEC certified (DGFT), APEDA registered and FSSAI compliant. Product-specific documentation (Phytosanitary, COO, Health Certificate, Fumigation) is provided per shipment.",
  },
  {
    q: "How do I get the right quote for my shipment?",
    a: "Share your product, destination port, packing preference and target timeline on WhatsApp. Our team will recommend the most practical freight route and send a tailored export quote.",
  },
  {
    q: "Can you handle private-label and custom packaging?",
    a: "Yes. We support private-label branding, custom retail packs, and buyer-specified pack sizes across most product categories.",
  },
  {
    q: "How do I request a catalogue or price list?",
    a: "Download the brochure directly from any product page, or send us an inquiry via WhatsApp or email — we'll respond with the latest catalogue, packing options and FOB pricing within one business day.",
  },
];

export const ORGANIZATION_JSONLD = {
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

export const FRESH_ONIONS_PRODUCT_JSONLD = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Indian Fresh Red Onions (Nashik Origin)",
  "image": "https://www.sheshaanglobal.com/assets/products/fresh-onions.jpg",
  "description":
    "Bulk export quality fresh Nashik red onions. Graded 45mm to 65mm in 25kg red mesh bags. Shipped in 40ft reefer containers under cold-chain management from JNPT port to international destinations.",
  "category": "Agricultural Produce > Vegetables > Onions",
  "brand": {
    "@type": "Brand",
    "name": "Sheshaan Global",
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "price": "Variable as per APMC Mandi Rates",
    "priceValidUntil": "2027-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@id": "https://www.sheshaanglobal.com/#organization",
    },
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "HS Code",
      "value": "07031010",
    },
    {
      "@type": "PropertyValue",
      "name": "Origin",
      "value": "Nashik / Maharashtra, India",
    },
    {
      "@type": "PropertyValue",
      "name": "Calibration Sizes",
      "value": "45-55 mm, 55-65 mm, 60 mm+",
    },
    {
      "@type": "PropertyValue",
      "name": "Standard Packing",
      "value": "5kg, 10kg, 20kg, 25kg Leno Mesh Bags",
    },
  ],
};

export function buildFaqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };
}

export const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.sheshaanglobal.com/#localbusiness",
  name: "Sheshaan Global",
  legalName: "Sheshaan Global",
  description:
    "Leading Indian agricultural exporter supplying fresh produce, basmati and non-basmati rice, spices, coconuts, pulses and agro commodities worldwide with APEDA, IEC, FSSAI certifications.",
  url: "https://www.sheshaanglobal.com",
  logo: "https://www.sheshaanglobal.com/logo.png",
  image: "https://www.sheshaanglobal.com/logo.png",
  telephone: "+91 81499 09546",
  email: "info@sheshaanglobal.com",
  priceRange: "$$$",
  currenciesAccepted: "USD, EUR, AED, INR",
  paymentAccepted: "Letter of Credit (LC), T/T (Telegraphic Transfer)",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Agricultural Export Trade Desk, Pune",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.5204,
    longitude: 73.8567,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "Malaysia" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "South Africa" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/sheshaan-global/",
    "https://www.instagram.com/sheshaanglobal/",
    "https://www.facebook.com/sheshaanglobal",
    "https://x.com/sheshaanglobal",
    "https://www.youtube.com/@sheshaanglobal",
    "https://freshdi.com/supplier/Sheshaan-Global",
    "https://www.tradekey.com/company/Sheshaan-Global-14840241.html",
  ],
};

export const SOCIAL_AND_TRADE_PROFILES = [
  {
    name: "LinkedIn",
    label: "Sheshaan Global on LinkedIn",
    url: "https://www.linkedin.com/company/sheshaan-global/",
  },
  {
    name: "Instagram",
    label: "@sheshaanglobal on Instagram",
    url: "https://www.instagram.com/sheshaanglobal/",
  },
  {
    name: "Facebook",
    label: "Sheshaan Global on Facebook",
    url: "https://www.facebook.com/sheshaanglobal",
  },
  {
    name: "X (Twitter)",
    label: "@sheshaanglobal on X",
    url: "https://x.com/sheshaanglobal",
  },
  {
    name: "YouTube",
    label: "Sheshaan Global on YouTube",
    url: "https://www.youtube.com/@sheshaanglobal",
  },
  {
    name: "Freshdi",
    label: "Verified Supplier on Freshdi",
    url: "https://freshdi.com/supplier/Sheshaan-Global",
  },
  {
    name: "TradeKey",
    label: "Verified Exporter on TradeKey",
    url: "https://www.tradekey.com/company/Sheshaan-Global-14840241.html",
  },
] as const;

export type Product = {
  slug: string;
  name: string;
  hsCode?: string;
  tagline: string;
  img: string;
  gallery: string[];
  description: string;
  varieties: string[];
  packing: string[];
  standards: string[];
  brochure?: string;
  brochureName?: string;
  group?: string;
};

const B = "/brochures";

export const PRODUCTS: Product[] = [
  {
    slug: "fresh-onions",
    hsCode: "0703",
    name: "Fresh Onions",
    tagline: "Export-grade red, pink & white onions",
    img: prodFreshOnions,
    gallery: [prodFreshOnions, prodVeg, prodFruits],
    description:
      "Our flagship export — premium Indian onions sourced directly from Nashik, Maharashtra. Uniformly graded, well-cured and packed for long transit, meeting the size, color and pungency standards of Middle East, South-East Asia and European buyers.",
    varieties: ["Red Onion (Nashik)", "Pink Onion", "White Onion", "Rose Onion", "Bangalore Rose"],
    packing: [
      "Mesh bags 5 / 10 / 25 / 50 kg",
      "Jute bags",
      "Ventilated cartons",
      "Loose in 20' / 40' container",
    ],
    standards: [
      "APEDA Certified",
      "FSSAI Compliant",
      "Phytosanitary Certified",
      "Fumigation Certified",
    ],
    brochure: `${B}/sheshaan-fresh-produce-coconuts.pdf`,
    brochureName: "Sheshaan-Global-Fresh-Onions.pdf",
  },
  {
    slug: "green-chillies",
    hsCode: "0709",
    name: "Green Chillies",
    tagline: "Vibrant, high-pungency Indian chillies",
    img: prodChillies,
    gallery: [prodChillies, prodVeg, prodSpices],
    description:
      "One of our primary export lines — fresh green chillies with high capsaicin content, hand-sorted for length and color uniformity, pre-cooled and packed for long transit to Gulf, UK and South-East Asian markets.",
    varieties: ["G4", "Byadgi", "Guntur Sannam", "Teja"],
    packing: ["Corrugated cartons 5–10 kg", "Ventilated crates", "Reefer container 40'"],
    standards: ["APEDA Certified", "FSSAI Compliant", "Residue-tested", "Phytosanitary Certified"],
    brochure: `${B}/sheshaan-green-chillies.pdf`,
    brochureName: "Sheshaan-Global-Green-Chillies.pdf",
  },
  {
    slug: "premium-rice",
    hsCode: "1006",
    name: "Premium Rice",
    tagline: "Long-grain aromatic Basmati & Non-Basmati",
    img: prodRice,
    gallery: [prodRice, prodPulses, prodSpices],
    description:
      "Aged Basmati rice with characteristic aroma and elongation, plus a full non-basmati range. Milled, sortex-cleaned and moisture-controlled for consistent kitchen performance.",
    varieties: ["1121 Basmati", "1509 Basmati", "Pusa Basmati", "Sona Masoori", "IR64 Parboiled"],
    packing: [
      "Non-woven 5 / 10 / 25 kg bags",
      "PP woven 25 / 50 kg",
      "Jute bags",
      "Vacuum 1 kg retail packs",
    ],
    standards: ["APEDA Certified", "FSSAI Compliant", "ISO 22000", "Non-GMO"],
    brochure: `${B}/sheshaan-basmati-non-basmati-rice.pdf`,
    brochureName: "Sheshaan-Global-Basmati-Non-Basmati-Rice.pdf",
  },
  {
    slug: "coconut-brown-husked",
    hsCode: "0801",
    name: "Coconut (Brown Husked)",
    tagline: "Mature brown husked coconuts — CDB registered",
    img: prodCoconut,
    gallery: [prodCoconut, prodVeg, prodRice],
    description:
      "Mature semi-husked and fully brown husked coconuts sourced from coastal Karnataka, Tamil Nadu and Kerala. Registered with the Coconut Development Board (CDB), Govt. of India. Selected for high copra content, uniform size and long shelf-life.",
    varieties: ["Brown Husked (Semi)", "Brown Husked (Fully)", "Matured Coconut", "Copra Grade"],
    packing: [
      "Loose in 20' / 40' container",
      "Mesh bags 25 / 50 kg",
      "PP bags",
      "Bulk containerised",
    ],
    standards: ["CDB Registered", "APEDA Certified", "FSSAI Compliant", "Phytosanitary Certified"],
    brochure: `${B}/sheshaan-fresh-produce-coconuts.pdf`,
    brochureName: "Sheshaan-Global-Coconut.pdf",
  },
  {
    slug: "fresh-vegetables",
    hsCode: "0709",
    name: "Fresh Vegetables",
    tagline: "Farm-fresh produce, cold-chain shipped",
    img: prodVeg,
    gallery: [prodVeg, prodChillies, prodFruits],
    description:
      "Consistent supply of fresh Indian vegetables sourced directly from contract farms. Pre-cooled, graded and packed for international retail and HORECA channels.",
    varieties: ["Potatoes", "Okra", "Ginger", "Drumsticks", "Garlic", "Tomato"],
    packing: ["Mesh bags 5 / 10 / 25 kg", "Corrugated cartons", "Jute bags", "Retail-ready bags"],
    standards: ["APEDA Certified", "FSSAI Compliant", "Residue-tested", "Phytosanitary Certified"],
    brochure: `${B}/sheshaan-fresh-produce-coconuts.pdf`,
    brochureName: "Sheshaan-Global-Fresh-Vegetables.pdf",
  },
  {
    slug: "fresh-fruits",
    hsCode: "0804",
    name: "Fresh Fruits",
    tagline: "Sun-ripened, hand-picked, export-graded",
    img: prodFruits,
    gallery: [prodFruits, prodVeg, prodCoconut],
    description:
      "Premium seasonal Indian fruits — mangoes, pomegranates, bananas, grapes and more — hand-selected at peak ripeness, pre-cooled and shipped under controlled cold-chain to preserve flavor and shelf-life.",
    varieties: [
      "Alphonso Mango",
      "Kesar Mango",
      "Pomegranate",
      "Banana (Cavendish)",
      "Grapes (Thompson)",
    ],
    packing: [
      "Corrugated 3–5 kg cartons",
      "Ventilated plastic crates",
      "Reefer container 40' HC",
      "Private-label options",
    ],
    standards: ["APEDA Certified", "FSSAI Compliant", "GlobalG.A.P.", "Phytosanitary Certified"],
    brochure: `${B}/sheshaan-fresh-fruits.pdf`,
    brochureName: "Sheshaan-Global-Fresh-Fruits.pdf",
  },
  {
    slug: "spices-masalas",
    hsCode: "0910",
    name: "Spices & Masalas",
    tagline: "Whole & ground — steam-sterilized",
    img: prodSpices,
    gallery: [
      prodSpices,
      prodCardamomPods,
      prodBlackPeppercorn,
      prodCloves,
      prodCinnamon,
      prodStarAnise,
      prodCorianderSeeds,
      prodTurmericDetail,
    ],
    description:
      "Authentic Indian spices sourced from origin regions — Kerala, Rajasthan, Karnataka — cleaned, steam-sterilized and packed to lock in oil content and color.",
    varieties: [
      "Turmeric",
      "Cumin",
      "Coriander",
      "Cardamom",
      "Black Pepper",
      "Custom Masala Blends",
    ],
    packing: [
      "Food-grade PP bags 25 kg",
      "Retail pouches 100 g – 1 kg",
      "Bulk drums",
      "Aluminum-foil sachets",
    ],
    standards: ["Steam Sterilized", "FSSAI Compliant", "ASTA Standards", "ISO 22000"],
    brochure: `${B}/sheshaan-spices.pdf`,
    brochureName: "Sheshaan-Global-Spices-Masalas.pdf",
  },
  {
    slug: "pulses-lentils",
    hsCode: "0713",
    name: "Pulses & Lentils",
    tagline: "Protein-rich, machine-cleaned & sorted",
    img: prodPulses,
    gallery: [
      prodPulses,
      prodKabuliChickpeas,
      prodDesiChana,
      prodRajmaDark,
      prodGreenMoong,
      prodYellowPeas,
      prodLobiaCowpea,
      prodDalDetail,
    ],
    description:
      "Full range of Indian pulses — whole, split and polished — cleaned to export purity levels and packed to preserve color and moisture.",
    varieties: ["Toor Dal", "Chana Dal", "Moong Dal", "Urad Dal", "Masoor Dal", "Kabuli Chana"],
    packing: [
      "PP bags 25 / 50 kg",
      "Retail 500 g / 1 kg pouches",
      "Bulk container",
      "Private label",
    ],
    standards: ["FSSAI Compliant", "Sortex Cleaned 99.95%", "ISO 22000", "Non-GMO"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
    brochureName: "Sheshaan-Global-Pulses-Cereals-Seeds.pdf",
  },
  {
    slug: "dry-fruits-nuts",
    hsCode: "0801",
    name: "Dry Fruits & Nuts",
    tagline: "Premium grade, moisture-controlled",
    img: prodDryfruits,
    gallery: [prodDryfruits, prodCoconut, prodRice],
    description:
      "Cashews, raisins, dates, almonds and pistachios — grade-sorted and vacuum or nitrogen-flushed to preserve freshness and prevent rancidity.",
    varieties: ["Cashew W240 / W320", "Raisins Green / Golden", "Almonds", "Pistachios", "Dates"],
    packing: [
      "Vacuum pouches 250 g – 1 kg",
      "Tins 5 / 10 kg",
      "Cartons 12.5 kg",
      "Retail gift packs",
    ],
    standards: ["FSSAI Compliant", "ISO 22000", "HACCP", "AFI Grades"],
    brochure: `${B}/sheshaan-dry-fruits-nuts.pdf`,
    brochureName: "Sheshaan-Global-Dry-Fruits-Nuts.pdf",
  },
];

/* ---------- Full HS-code export catalogue ---------- */

type CatalogGroup = "vegetable" | "fruit" | "spice" | "grain" | "pulse" | "nut" | "other";

const GROUP_IMG: Record<CatalogGroup, string> = {
  vegetable: prodVeg,
  fruit: prodFruits,
  spice: prodSpices,
  grain: prodRice,
  pulse: prodPulses,
  nut: prodDryfruits,
  other: prodCoconut,
};

const GROUP_GALLERY: Record<CatalogGroup, string[]> = {
  vegetable: [prodVeg, prodChillies, prodFruits],
  fruit: [prodFruits, prodVeg, prodCoconut],
  spice: [prodSpices, prodChillies, prodPulses],
  grain: [prodRice, prodPulses, prodSpices],
  pulse: [prodPulses, prodRice, prodSpices],
  nut: [prodDryfruits, prodCoconut, prodRice],
  other: [prodCoconut, prodRice, prodSpices],
};

const GROUP_PACKING: Record<CatalogGroup, string[]> = {
  vegetable: [
    "Mesh bags 5 / 10 / 25 kg",
    "Ventilated corrugated cartons",
    "Plastic crates",
    "Reefer 20' / 40' container",
  ],
  fruit: [
    "Corrugated 3–5 kg cartons",
    "Ventilated plastic crates",
    "Reefer 40' HC container",
    "Private-label retail packs",
  ],
  spice: [
    "Food-grade PP bags 25 / 50 kg",
    "Retail pouches 100 g – 1 kg",
    "Bulk drums",
    "Aluminium-foil sachets",
  ],
  grain: [
    "PP woven bags 25 / 50 kg",
    "Non-woven 5 / 10 kg bags",
    "Jute bags",
    "Bulk containerised",
  ],
  pulse: ["PP bags 25 / 50 kg", "Retail 500 g / 1 kg pouches", "Bulk container", "Private label"],
  nut: [
    "Vacuum pouches 250 g – 1 kg",
    "Tins 5 / 10 kg",
    "Cartons 10 / 12.5 kg",
    "Retail gift packs",
  ],
  other: [
    "PP / HDPE bags 25 / 50 kg",
    "Cartons as per buyer spec",
    "Bulk containerised",
    "Private-label packs",
  ],
};

const GROUP_STANDARDS: Record<CatalogGroup, string[]> = {
  vegetable: ["APEDA Certified", "FSSAI Compliant", "Residue-tested", "Phytosanitary Certified"],
  fruit: ["APEDA Certified", "FSSAI Compliant", "GlobalG.A.P. sourcing", "Phytosanitary Certified"],
  spice: ["Steam Sterilized", "FSSAI Compliant", "ASTA Standards", "ISO 22000"],
  grain: ["APEDA Certified", "FSSAI Compliant", "Sortex Cleaned", "Non-GMO"],
  pulse: ["FSSAI Compliant", "Sortex Cleaned 99.95%", "ISO 22000", "Non-GMO"],
  nut: ["FSSAI Compliant", "ISO 22000", "HACCP", "Grade Sorted"],
  other: [
    "FSSAI Compliant",
    "Export Documentation Support",
    "Certificate of Origin",
    "Quality Inspected",
  ],
};

const GROUP_LABEL: Record<CatalogGroup, string> = {
  vegetable: "Fresh Vegetables",
  fruit: "Fresh Fruits",
  spice: "Spices & Herbs",
  grain: "Grains & Cereals",
  pulse: "Pulses & Lentils",
  nut: "Nuts & Dry Fruits",
  other: "Agri Commodities",
};

type CatalogSeed = {
  slug: string;
  name: string;
  hs: string;
  g: CatalogGroup;
  tagline: string;
  varieties: string[];
  brochure?: string;
  img?: string;
  gallery?: string[];
};

const CATALOG_IMAGE_OVERRIDES: Record<string, { img: string; gallery?: string[] }> = {
  cumin: { img: prodCuminDetail, gallery: [prodCuminDetail, prodSpices] },
  turmeric: {
    img: prodTurmericDetail,
    gallery: [prodTurmericDetail, prodSpices, prodDriedRedChilliesDetail],
  },
  "dried-red-chillies": {
    img: prodDriedRedChilliesDetail,
    gallery: [prodDriedRedChilliesDetail, prodChillies],
  },
  sugar: { img: prodSugarDetail },
  tamarind: { img: prodTamarindDetail },
  "makhana-raw": {
    img: prodMakhanaDetail,
    gallery: [prodMakhanaDetail, prodMakhanaAltDetail, prodDryfruits],
  },
  "makhana-processed": {
    img: prodMakhanaAltDetail,
    gallery: [prodMakhanaAltDetail, prodMakhanaDetail, prodDryfruits],
  },
  "dal-split-pulses": {
    img: prodDalDetail,
    gallery: [prodDalDetail, prodGreenMoong, prodBlackBeansUrad, prodPulses],
  },
  cashew: { img: prodCashewDetail },
  pomegranate: { img: prodPomegranateDetail },
  "dehydrated-onion-garlic": {
    img: prodDehydratedOnionDetail,
    gallery: [prodDehydratedOnionDetail, prodDehydratedGarlicDetail, prodGarlicDetail],
  },
  potatoes: { img: prodPotatoesDetail },
  "okra-drumsticks": {
    img: prodOkraDetail,
    gallery: [prodOkraDetail, prodMoringaTree, prodDrumsticksDetail, prodVeg],
  },
  "g9-banana": { img: prodBananaDetail },
  grapes: { img: prodGrapesDetail },
  tomatoes: { img: prodTomatoesDetail },
  mango: { img: prodMangoDetail },
  soyabean: {
    img: prodSoybeansYellow,
    gallery: [prodSoybeansYellow, prodSoyabeanDetail, prodRice],
  },
  lemon: { img: prodLemonDetail },
  oranges: { img: prodOrangesDetail },
  chickpeas: {
    img: prodKabuliChickpeas,
    gallery: [prodKabuliChickpeas, prodChickpeasDetail, prodPulses],
  },
  mustard: {
    img: prodMustardSeeds,
    gallery: [prodMustardSeeds, prodMustardDetail, prodSpices],
  },
  wheat: {
    img: prodWheatGrain,
    gallery: [prodWheatGrain, prodWheatDetail, prodRice],
  },
  "durum-wheat": {
    img: prodWheatGrain,
    gallery: [prodWheatGrain, prodWheatDetail],
  },
  "wheat-flour-atta-maida": {
    img: prodWheatGrain,
    gallery: [prodWheatGrain, prodWheatDetail],
  },
  fenugreek: {
    img: prodFenugreekSeeds,
    gallery: [prodFenugreekSeeds, prodFenugreekDetail, prodSpices],
  },
  "cluster-beans": { img: prodClusterBeansDetail },
  ginger: { img: prodGingerDetail },
  garlic: { img: prodGarlicDetail },
  "black-pepper": {
    img: prodBlackPeppercorn,
    gallery: [prodBlackPeppercorn, prodBlackPepperDetail, prodSpices],
  },
  "green-peppercorn": {
    img: prodGreenPeppercornWhole,
    gallery: [prodGreenPeppercornWhole, prodGreenPeppercornDetail, prodBlackPeppercorn, prodSpices],
  },
  "curry-leaves": { img: prodCurryLeavesDetail },
  "cow-dung": { img: prodCowDungDetail },
  peanuts: {
    img: prodPeanutsRaw,
    gallery: [prodPeanutsRaw, prodDryfruits],
  },
  cardamom: {
    img: prodCardamomPods,
    gallery: [prodCardamomPods, prodSpices],
  },
  coriander: {
    img: prodCorianderSeeds,
    gallery: [prodCorianderSeeds, prodSpices],
  },
  "maize-corn": {
    img: prodMaizeCorn,
    gallery: [prodMaizeCorn, prodRice],
  },
  millets: {
    img: prodMilletBajra,
    gallery: [prodMilletBajra, prodMilletRagi, prodRice],
  },
  "sorghum-jowar": {
    img: prodSorghumJowar,
    gallery: [prodSorghumJowar, prodRice],
  },
  "desi-chana": {
    img: prodDesiChana,
    gallery: [prodDesiChana, prodKabuliChickpeas, prodPulses],
  },
  "peas-green-yellow": {
    img: prodYellowPeas,
    gallery: [prodYellowPeas, prodGreenPeas, prodPulses],
  },
  "kidney-beans-rajma": {
    img: prodRajmaDark,
    gallery: [prodRajmaDark, prodRajmaChitra, prodPulses],
  },
  "lobia-cowpea": {
    img: prodLobiaCowpea,
    gallery: [prodLobiaCowpea, prodPulses],
  },
  "fennel-seeds": {
    img: prodFennelSeeds,
    gallery: [prodFennelSeeds, prodSpices],
  },
  "flaxseed-linseed": {
    img: prodFlaxseedLinseed,
    gallery: [prodFlaxseedLinseed, prodPumpkinSeeds],
  },
  "sesame-seed": {
    img: prodSesameWhite,
    gallery: [prodSesameWhite, prodSesameBlack, prodFlaxseedLinseed],
  },
  "drumstick-moringa": {
    img: prodMoringaTree,
    gallery: [prodMoringaTree, prodMoringaPowder, prodDrumsticksDetail],
  },
  cloves: {
    img: prodCloves,
    gallery: [prodCloves, prodSpices],
  },
  cinnamon: {
    img: prodCinnamon,
    gallery: [prodCinnamon, prodSpices],
  },
  "star-anise": {
    img: prodStarAnise,
    gallery: [prodStarAnise, prodSpices],
  },
  ajwain: {
    img: prodAjwain,
    gallery: [prodAjwain, prodSpices],
  },
  "pumpkin-seeds": {
    img: prodPumpkinSeeds,
    gallery: [prodPumpkinSeeds, prodFlaxseedLinseed],
  },
  "horse-gram": {
    img: prodHorseGram,
    gallery: [prodHorseGram, prodPulses],
  },
  "green-moong-beans": {
    img: prodGreenMoong,
    gallery: [prodGreenMoong, prodPulses],
  },
  "black-urad-beans": {
    img: prodBlackBeansUrad,
    gallery: [prodBlackBeansUrad, prodPulses],
  },
};

const CATALOG_SEEDS: CatalogSeed[] = [
  {
    slug: "cumin",
    name: "Cumin (Jeera)",
    hs: "0909",
    g: "spice",
    tagline: "Machine-cleaned Gujarat & Rajasthan cumin",
    varieties: ["Europe Quality 99%", "Singapore Quality 99%", "Sortex Clean", "Cumin Powder"],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "turmeric",
    name: "Turmeric",
    hs: "0910",
    g: "spice",
    tagline: "High-curcumin fingers, bulbs & powder",
    varieties: ["Salem Finger", "Nizamabad Bulb", "Erode Finger", "Turmeric Powder"],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "dried-red-chillies",
    name: "Dried Red Chillies",
    hs: "0904",
    g: "spice",
    tagline: "Stemless & with-stem, high colour value",
    varieties: ["Teja S17", "Byadgi", "Guntur Sannam 334", "Wrinkle 273"],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "tea",
    name: "Tea",
    hs: "0902",
    g: "other",
    tagline: "Assam, Nilgiri & Darjeeling origins",
    varieties: ["Assam CTC", "Nilgiri Orthodox", "Darjeeling", "Green Tea"],
  },
  {
    slug: "sugar",
    name: "Sugar",
    hs: "1701",
    g: "other",
    tagline: "ICUMSA-graded Indian refined sugar",
    varieties: ["ICUMSA 45", "ICUMSA 100", "ICUMSA 150", "Raw Sugar"],
  },
  {
    slug: "coffee",
    name: "Coffee",
    hs: "0901",
    g: "other",
    tagline: "Arabica & Robusta green beans",
    varieties: [
      "Arabica Plantation A",
      "Robusta Cherry AA",
      "Robusta Parchment",
      "Monsooned Malabar",
    ],
  },
  {
    slug: "tamarind",
    name: "Tamarind",
    hs: "0810",
    g: "fruit",
    tagline: "Seedless & with-seed, deep-toned pulp",
    varieties: ["Seedless Tamarind", "With Seed", "Tamarind Paste", "Tamarind Block"],
  },
  {
    slug: "peanuts",
    name: "Peanuts (Groundnut)",
    hs: "1202",
    g: "nut",
    tagline: "Bold & Java kernels, aflatoxin-tested",
    varieties: ["Bold 40/50", "Java 45/55", "TJ Peanuts", "Blanched Kernels"],
  },
  {
    slug: "makhana-raw",
    name: "Makhana (Raw Fox Nuts)",
    hs: "08109090",
    g: "nut",
    tagline: "Bihar-origin popped fox nuts, size graded",
    varieties: ["4 Suta", "5 Suta", "6 Suta", "Handpicked Premium"],
  },
  {
    slug: "makhana-processed",
    name: "Makhana (Processed & Flavoured)",
    hs: "20081990",
    g: "nut",
    tagline: "Roasted, seasoned & retail-ready fox nuts",
    varieties: ["Roasted Salted", "Peri Peri", "Cheese", "Himalayan Salt"],
  },
  {
    slug: "dal-split-pulses",
    name: "Dal (Split Pulses)",
    hs: "0713",
    g: "pulse",
    tagline: "Mill-fresh split & polished dals",
    varieties: ["Toor Dal", "Chana Dal", "Moong Dal", "Urad Dal", "Masoor Dal"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "cashew",
    name: "Cashew Kernels",
    hs: "0801",
    g: "nut",
    tagline: "Whole white kernels, grade sorted",
    varieties: ["W180", "W240", "W320", "SW / Pieces"],
    brochure: `${B}/sheshaan-dry-fruits-nuts.pdf`,
  },
  {
    slug: "pomegranate",
    name: "Pomegranate",
    hs: "08109010",
    g: "fruit",
    tagline: "Bhagwa arils with deep ruby colour",
    varieties: ["Bhagwa", "Ganesh", "Ruby", "Arakta"],
    brochure: `${B}/sheshaan-fresh-fruits.pdf`,
  },
  {
    slug: "dehydrated-onion-garlic",
    name: "Dehydrated Onion & Garlic",
    hs: "0712",
    g: "vegetable",
    tagline: "Kibbled, minced, granules & powder",
    varieties: ["White Onion Kibbled", "Onion Powder", "Garlic Granules", "Garlic Powder"],
  },
  {
    slug: "potatoes",
    name: "Potatoes",
    hs: "0701",
    g: "vegetable",
    tagline: "Table & processing grade potatoes",
    varieties: ["Jyoti", "Kufri Pukhraj", "Chipsona", "Table Grade 50–100 g"],
  },
  {
    slug: "okra-drumsticks",
    name: "Okra & Drumsticks",
    hs: "0709",
    g: "vegetable",
    tagline: "Tender pods, pre-cooled for air & sea",
    varieties: ["Okra (Lady Finger)", "Drumstick (Moringa Pod)", "Baby Okra", "PKM-1 Drumstick"],
  },
  {
    slug: "g9-banana",
    name: "G9 Banana (Cavendish)",
    hs: "0803",
    g: "fruit",
    tagline: "Export-grade Grand Naine bananas",
    varieties: ["G9 Cavendish", "Grand Naine", "Class I 13–14 kg", "Green Mature"],
    brochure: `${B}/sheshaan-fresh-fruits.pdf`,
  },
  {
    slug: "grapes",
    name: "Grapes",
    hs: "0806",
    g: "fruit",
    tagline: "Nashik table grapes, cold-chain shipped",
    varieties: ["Thompson Seedless", "Sonaka", "Flame Seedless", "Black Jumbo"],
    brochure: `${B}/sheshaan-fresh-fruits.pdf`,
  },
  {
    slug: "tomatoes",
    name: "Tomatoes",
    hs: "0702",
    g: "vegetable",
    tagline: "Firm, uniform, long-shelf-life tomatoes",
    varieties: ["Hybrid Round", "Roma / Plum", "Cherry Tomato", "Semi-ripe Export Grade"],
  },
  {
    slug: "mango",
    name: "Mango",
    hs: "0804",
    g: "fruit",
    tagline: "Alphonso, Kesar & Banganapalli",
    varieties: ["Alphonso", "Kesar", "Banganapalli", "Totapuri"],
    brochure: `${B}/sheshaan-fresh-fruits.pdf`,
  },
  {
    slug: "other-vegetables",
    name: "Other Fresh Vegetables",
    hs: "0709",
    g: "vegetable",
    tagline: "Mixed vegetable programmes on request",
    varieties: ["Green Peas", "Brinjal", "Bitter Gourd", "Bottle Gourd", "Capsicum"],
  },
  {
    slug: "coriander",
    name: "Coriander (Dhania)",
    hs: "0909",
    g: "spice",
    tagline: "Eagle & Scooter seeds, bright green",
    varieties: ["Eagle Quality", "Scooter Quality", "Split Coriander", "Coriander Powder"],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "soyabean",
    name: "Soyabean",
    hs: "12019000",
    g: "grain",
    tagline: "Non-GMO soyabean seeds & meal",
    varieties: ["Non-GMO Yellow", "Food Grade", "Crushing Grade", "Soyabean Meal"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "lemon",
    name: "Lemon",
    hs: "0805",
    g: "fruit",
    tagline: "High-juice Indian lemons & limes",
    varieties: ["Kagzi Lime", "Seedless Lime", "Eureka Lemon", "Baramasi"],
  },
  {
    slug: "oranges",
    name: "Oranges",
    hs: "0805",
    g: "fruit",
    tagline: "Nagpur & Kinnow citrus",
    varieties: ["Nagpur Mandarin", "Kinnow", "Malta", "Sweet Lime (Mosambi)"],
  },
  {
    slug: "chickpeas",
    name: "Chickpeas",
    hs: "0713",
    g: "pulse",
    tagline: "Kabuli & desi chana, size graded",
    varieties: ["Kabuli 42/44", "Kabuli 58/60", "Desi Chana", "Chana Dal"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "mustard",
    name: "Mustard (Seed & Meal)",
    hs: "2306",
    g: "other",
    tagline: "Oil-rich seed and de-oiled cake",
    varieties: ["Black Mustard Seed", "Yellow Mustard Seed", "Rapeseed Meal", "De-oiled Cake"],
  },
  {
    slug: "wheat",
    name: "Wheat",
    hs: "1001",
    g: "grain",
    tagline: "Milling-grade Indian wheat",
    varieties: ["Sharbati", "Lokwan", "Durum", "Milling Grade"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "fenugreek",
    name: "Fenugreek (Methi)",
    hs: "0910",
    g: "spice",
    tagline: "Bold, bright seeds & kasuri methi",
    varieties: ["Fenugreek Seed", "Kasuri Methi", "Fenugreek Powder", "Sortex Clean"],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "guar-gum",
    name: "Guar Gum",
    hs: "1301",
    g: "other",
    tagline: "Food & industrial grade guar gum powder",
    varieties: ["Food Grade 200 Mesh", "Industrial Grade", "Guar Splits", "Guar Korma"],
  },
  {
    slug: "cluster-beans",
    name: "Cluster Beans (Guar)",
    hs: "0708",
    g: "vegetable",
    tagline: "Tender fresh guar pods",
    varieties: ["Pusa Naubahar", "Fresh Tender Pods", "Class I", "Bulk Grade"],
  },
  {
    slug: "cardamom",
    name: "Cardamom",
    hs: "0908",
    g: "spice",
    tagline: "Bold green cardamom from Idukki",
    varieties: ["8 mm Bold", "7 mm", "6.5 mm", "Extra Bold"],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "maize-corn",
    name: "Maize (Corn)",
    hs: "1005",
    g: "grain",
    tagline: "Feed & food grade yellow maize",
    varieties: ["Yellow Maize Feed Grade", "Food Grade", "White Maize", "Non-GMO"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "ginger",
    name: "Ginger",
    hs: "0910",
    g: "spice",
    tagline: "Fresh & dried ginger, high oleoresin",
    varieties: ["Fresh Ginger", "Dried Ginger (Sonth)", "Ginger Powder", "Organic Ginger"],
  },
  {
    slug: "garlic",
    name: "Garlic",
    hs: "0703",
    g: "vegetable",
    tagline: "White & pink garlic, tight-skinned bulbs",
    varieties: ["White Garlic 40–50 mm", "Pink Garlic", "Peeled Cloves", "Ooty Garlic"],
  },
  {
    slug: "black-pepper",
    name: "Black Pepper",
    hs: "0904",
    g: "spice",
    tagline: "Malabar garbled, 550–600 g/l",
    varieties: [
      "Malabar Garbled 550 g/l",
      "MG1 600 g/l",
      "Tellicherry Extra Bold",
      "Pepper Powder",
    ],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "green-peppercorn",
    name: "Green Peppercorn",
    hs: "0904",
    g: "spice",
    tagline: "Fresh green pepper clusters from Indian plantations",
    varieties: [
      "Fresh Green Peppercorn",
      "Brined Peppercorn",
      "Dehydrated Green Pepper",
      "Whole Clusters",
    ],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "curry-leaves",
    name: "Curry Leaves",
    hs: "0910",
    g: "spice",
    tagline: "Fresh & dehydrated aromatic leaves",
    varieties: [
      "Fresh Curry Leaves",
      "Dehydrated Leaves",
      "Curry Leaf Powder",
      "Air-freight Grade",
    ],
  },
  {
    slug: "jaggery",
    name: "Jaggery",
    hs: "1701",
    g: "other",
    tagline: "Chemical-free blocks, cubes & powder",
    varieties: ["Jaggery Blocks", "Jaggery Cubes", "Jaggery Powder", "Organic Jaggery"],
  },
  {
    slug: "cow-dung",
    name: "Cow Dung (Organic Manure)",
    hs: "3101",
    g: "other",
    tagline: "Sun-dried cakes & organic manure",
    varieties: ["Dried Cow Dung Cakes", "Powdered Manure", "Vermicompost Blend", "Bulk Bags"],
  },
  {
    slug: "durum-wheat",
    name: "Durum Wheat",
    hs: "1001",
    g: "grain",
    tagline: "Hard amber durum wheat for semolina & pasta",
    varieties: ["HI-8498", "HI-8759", "Durum Semolina Grade", "High Vitreousness"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "non-basmati-rice",
    name: "Non-Basmati Rice",
    hs: "1006",
    g: "grain",
    tagline: "IR64, PR11, Swarna & Sona Masoori",
    varieties: ["IR64 Parboiled 5%", "PR11/PR14 Raw", "Swarna 5% Broken", "Sona Masoori", "100% Broken"],
    brochure: `${B}/sheshaan-basmati-non-basmati-rice.pdf`,
  },
  {
    slug: "millets",
    name: "Millets (Bajra, Ragi & Foxtail)",
    hs: "1008",
    g: "grain",
    tagline: "Nutrient-dense ancient grains, sortex cleaned",
    varieties: ["Pearl Millet (Bajra)", "Finger Millet (Ragi)", "Foxtail Millet", "Kodo Millet", "Barnyard Millet"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "sorghum-jowar",
    name: "Sorghum (Jowar)",
    hs: "1007",
    g: "grain",
    tagline: "White food-grade & feed-grade sorghum",
    varieties: ["White Jowar Food Grade", "Red Jowar", "Feed Grade", "Maldandi Jowar"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "wheat-flour-atta-maida",
    name: "Wheat Flour (Atta, Maida & Semolina)",
    hs: "1101",
    g: "grain",
    tagline: "Chakki fresh atta, refined maida & sooji/rava",
    varieties: ["Chakki Fresh Atta", "Refined Maida", "Sooji / Rava", "Durum Semolina"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "desi-chana",
    name: "Desi Chickpeas (Bengal Gram)",
    hs: "0713",
    g: "pulse",
    tagline: "Bold, medium & milling grade brown chickpeas",
    varieties: ["Desi Chana Bold", "Annagiri Type", "Milling Grade Chana", "Split Chana"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "peas-green-yellow",
    name: "Dried Peas (Green & Yellow)",
    hs: "0713",
    g: "pulse",
    tagline: "Cleaned & sorted whole dried green & yellow peas",
    varieties: ["Green Dried Peas", "Yellow Dried Peas", "Split Green Peas", "Milling Grade"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "kidney-beans-rajma",
    name: "Kidney Beans (Rajma)",
    hs: "0713",
    g: "pulse",
    tagline: "Light-speckled, dark red & Jammu rajma",
    varieties: ["Light Speckled Kidney Beans", "Dark Red Kidney Beans", "Jammu Red Rajma", "Chitra Rajma"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "lobia-cowpea",
    name: "Lobia (Cowpea / Black-Eyed Peas)",
    hs: "0713",
    g: "pulse",
    tagline: "Export-cleaned white black-eyed peas & red cowpeas",
    varieties: ["White Black-Eyed Pea", "Red Cowpea", "Brown Cowpea", "Sortex Cleaned"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "fennel-seeds",
    name: "Fennel Seeds (Saunf)",
    hs: "0909",
    g: "spice",
    tagline: "Aromatic green & bold machine-cleaned fennel",
    varieties: ["Green Fennel Europe Quality", "Bold Fennel Seeds", "Sortex Cleaned 99%", "Fennel Powder"],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "castor-seed",
    name: "Castor Seed",
    hs: "1207",
    g: "other",
    tagline: "Industrial crushing grade castor seed with high oil yield",
    varieties: ["FAQ Grade", "Export-Cleaned", "High Oil Yield", "Industrial Crushing Grade"],
  },
  {
    slug: "flaxseed-linseed",
    name: "Flaxseed (Linseed)",
    hs: "1204",
    g: "other",
    tagline: "Brown & golden omega-3 rich flaxseeds",
    varieties: ["Brown Flaxseed 99.5%", "Golden Flaxseed", "Food Grade Cleaned", "Oil Crushing Grade"],
  },
  {
    slug: "sunflower-seed",
    name: "Sunflower Seed",
    hs: "1206",
    g: "other",
    tagline: "Confectionery striped & black oil-crushing seeds",
    varieties: ["Striped Confectionery Kernel", "Black Oilseed", "Bakery Grade Hulled", "Crushing Grade"],
  },
  {
    slug: "safflower-seed",
    name: "Safflower Seed (Kardi)",
    hs: "1207",
    g: "other",
    tagline: "High-linoleic cleaned oilseeds for crushing",
    varieties: ["Cleaned Oilseed Grade", "FAQ Grade", "Crushing Grade", "Bird-Feed Grade"],
  },
  {
    slug: "copra",
    name: "Copra (Dried Coconut)",
    hs: "1203",
    g: "other",
    tagline: "Milling & edible sun-dried coconut cups",
    varieties: ["Milling Copra", "Edible Copra Cups", "FAQ Grade", "Oil Extraction Grade"],
  },
  {
    slug: "niger-seed",
    name: "Niger Seed (Ramtil)",
    hs: "1207",
    g: "other",
    tagline: "Sortex-cleaned oilseeds for oil extraction & bird feed",
    varieties: ["Machine Cleaned 99%", "Bird Feed Grade", "Crushing Grade", "Sortex Quality"],
  },
  {
    slug: "sesame-seed",
    name: "Sesame Seeds (Til)",
    hs: "1207",
    g: "other",
    tagline: "Natural white 99.95%, hulled & black sesame",
    varieties: ["Natural White 99.95%", "Auto Hulled 99.99%", "Black Sesame Seeds", "Brown Sesame"],
  },
  {
    slug: "dehydrated-garlic",
    name: "Dehydrated Garlic",
    hs: "0712",
    g: "vegetable",
    tagline: "Granules, minced, flakes & fine powder",
    varieties: ["Garlic Flakes / Cloves", "Garlic Granules (40–80 Mesh)", "Garlic Minced", "Garlic Powder (100 Mesh)"],
  },
  {
    slug: "mango-pulp-puree",
    name: "Mango Pulp & Puree",
    hs: "2007",
    g: "fruit",
    tagline: "Aseptic & canned Alphonso, Kesar & Totapuri puree",
    varieties: ["Alphonso Mango Pulp (Min 16° Brix)", "Totapuri Mango Puree (Min 14° Brix)", "Kesar Mango Pulp", "Frozen Mango Puree"],
    brochure: `${B}/sheshaan-fresh-fruits.pdf`,
  },
  {
    slug: "drumstick-moringa",
    name: "Moringa Pods & Drumsticks",
    hs: "0709",
    g: "vegetable",
    tagline: "Tender PKM-1 fresh drumstick pods",
    varieties: ["PKM-1 Fresh Pods", "Tender Green Moringa", "Class I Calibrated", "Air-Freight Packed"],
  },
  {
    slug: "psyllium-husk-isabgol",
    name: "Psyllium Husk (Isabgol)",
    hs: "1211",
    g: "other",
    tagline: "95%, 98% & 99% purity pharmaceutical & food grade husk",
    varieties: ["Psyllium Husk 99% Purity", "Psyllium Husk 98%", "Psyllium Husk 95%", "Psyllium Seed & Powder"],
  },
  {
    slug: "organic-agri-commodities",
    name: "Certified Organic Commodities",
    hs: "07-12",
    g: "other",
    tagline: "NPOP & USDA-NOP certified organic spices, grains & pulses",
    varieties: ["Organic Turmeric", "Organic Basmati Rice", "Organic Cumin", "Organic Pulses & Seeds"],
  },
  {
    slug: "cloves",
    name: "Cloves (Laung)",
    hs: "0907",
    g: "spice",
    tagline: "Handpicked aromatic whole cloves with heads",
    varieties: ["Handpicked Bold", "FAQ Grade", "Zanzibar / Madagascar Standard", "Clove Powder"],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "cinnamon",
    name: "Cinnamon (Dalchini)",
    hs: "0906",
    g: "spice",
    tagline: "Fragrant Ceylon & Cassia whole sticks and rolls",
    varieties: ["Cassia Quills 8cm-10cm", "Ceylon Alba / C5 Special", "Split Cinnamon", "Cinnamon Powder"],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "star-anise",
    name: "Star Anise (Chakra Phool)",
    hs: "0909",
    g: "spice",
    tagline: "Whole unbroken 8-arm star anise pods with high aroma",
    varieties: ["Whole Star Anise 8-Arm", "Autumn Star Anise", "Spring Star Anise", "Star Anise Powder"],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "ajwain",
    name: "Ajwain (Carom Seeds)",
    hs: "0910",
    g: "spice",
    tagline: "Bold sortex-cleaned carom seeds with high thymol content",
    varieties: ["Machine Cleaned 99%", "Sortex Cleaned 99.5%", "Green Ajwain", "Ajwain Powder"],
    brochure: `${B}/sheshaan-spices.pdf`,
  },
  {
    slug: "pumpkin-seeds",
    name: "Pumpkin Seeds (Pepitas)",
    hs: "1209",
    g: "other",
    tagline: "Grade AAA hulled green pumpkin seeds & pepitas",
    varieties: ["Grade AAA Hulled Pepitas", "Shine Skin Pumpkin Seeds", "GWS (Grow Without Skin)", "Roasted Pumpkin Seeds"],
  },
  {
    slug: "horse-gram",
    name: "Horse Gram (Kulthi Dal)",
    hs: "0713",
    g: "pulse",
    tagline: "High-protein brown kulthi dal & micro-pulses",
    varieties: ["Whole Horse Gram", "Split Kulthi", "Sortex Cleaned 99%", "Export Machine Cleaned"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "green-moong-beans",
    name: "Green Moong Beans (Whole & Split)",
    hs: "0713",
    g: "pulse",
    tagline: "Whole polished green moong & yellow split dal",
    varieties: ["Moong Whole Shiny", "Moong Dal Washed", "Moong Split Chilka", "Organic Green Moong"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
  {
    slug: "black-urad-beans",
    name: "Black Gram / Urad (Whole & Split)",
    hs: "0713",
    g: "pulse",
    tagline: "Whole black urad & de-husked split dal",
    varieties: ["Whole Black Urad", "Urad Dal Split", "Urad Gota White", "Sortex Cleaned"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
  },
];

export const CATALOG: Product[] = CATALOG_SEEDS.map((c) => {
  const override = CATALOG_IMAGE_OVERRIDES[c.slug];
  const img = c.img ?? override?.img ?? "";
  const gallery = c.gallery ?? override?.gallery ?? (img ? [img] : []);

  return {
    slug: c.slug,
    name: c.name,
    hsCode: c.hs,
    tagline: c.tagline,
    img,
    gallery,
    description: `Export-grade ${c.name.toLowerCase()} (HS Code ${c.hs}) supplied by Sheshaan Global from India. Sourced from established growing belts, graded and quality-checked before dispatch, with complete export documentation and buyer-specified packing for shipments to 25+ countries across the Middle East, Europe, UK, USA and Asia.`,
    varieties: c.varieties,
    packing: GROUP_PACKING[c.g],
    standards: GROUP_STANDARDS[c.g],
    brochure: c.brochure ?? BROCHURE_URL,
    brochureName: `Sheshaan-Global-${c.name.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "")}.pdf`,
    group: GROUP_LABEL[c.g],
  };
});

/** Flagship categories first, then the full HS-code catalogue. */
export const ALL_PRODUCTS: Product[] = [...PRODUCTS, ...CATALOG];

import { getProductBySlugOrLegacy } from "@/lib/empirical-products";

const SITE_SLUG_ALIASES: Record<string, string> = {
  spices: "spices-masalas",
  "grains-pulses": "pulses-lentils",
  "dry-fruits": "dry-fruits-nuts",
  "basmati-rice": "premium-rice",
  "1121-basmati-rice": "premium-rice",
  "1121-basmati-rice-exporter-india": "premium-rice",
  "basmati-rice-exporter-india": "premium-rice",
  "fresh-onion-exporter-india": "fresh-onions",
  onions: "fresh-onions",
  "green-chilli-exporter-india": "green-chillies",
  "mature-coconut": "coconut-brown-husked",
  "mature-coconut-exporter-india": "coconut-brown-husked",
  "semi-husked-coconut-exporter-india": "coconut-brown-husked",
  "cumin-seeds": "cumin",
  "cumin-seeds-exporter-india": "cumin",
  "cumin-seeds-jeera-exporter-india": "cumin",
  "durum-wheat": "durum-wheat",
  "non-basmati-rice": "non-basmati-rice",
  "millets": "millets",
  "sorghum-jowar": "sorghum-jowar",
  "wheat-flour-atta-maida": "wheat-flour-atta-maida",
  "wheat-flour": "wheat-flour-atta-maida",
  "atta": "wheat-flour-atta-maida",
  "maida": "wheat-flour-atta-maida",
  "semolina": "wheat-flour-atta-maida",
  "desi-chana": "desi-chana",
  "chana": "desi-chana",
  "peas-green-yellow": "peas-green-yellow",
  "green-peas": "peas-green-yellow",
  "yellow-peas": "peas-green-yellow",
  "kidney-beans-rajma": "kidney-beans-rajma",
  "rajma": "kidney-beans-rajma",
  "lobia-cowpea": "lobia-cowpea",
  "cowpea": "lobia-cowpea",
  "lobia": "lobia-cowpea",
  "fennel-seeds": "fennel-seeds",
  "fennel": "fennel-seeds",
  "saunf": "fennel-seeds",
  "castor-seed": "castor-seed",
  "castor": "castor-seed",
  "flaxseed-linseed": "flaxseed-linseed",
  "flaxseed": "flaxseed-linseed",
  "linseed": "flaxseed-linseed",
  "sunflower-seed": "sunflower-seed",
  "sunflower": "sunflower-seed",
  "safflower-seed": "safflower-seed",
  "safflower": "safflower-seed",
  "copra": "copra",
  "dried-coconut": "copra",
  "niger-seed": "niger-seed",
  "niger": "niger-seed",
  "ramtil": "niger-seed",
  "sesame-seed": "sesame-seed",
  "sesame": "sesame-seed",
  "til": "sesame-seed",
  "dehydrated-garlic": "dehydrated-garlic",
  "mango-pulp-puree": "mango-pulp-puree",
  "mango-pulp": "mango-pulp-puree",
  "mango-puree": "mango-pulp-puree",
  "drumstick-moringa": "drumstick-moringa",
  "moringa": "drumstick-moringa",
  "psyllium-husk-isabgol": "psyllium-husk-isabgol",
  "psyllium-husk": "psyllium-husk-isabgol",
  "isabgol": "psyllium-husk-isabgol",
  "organic-agri-commodities": "organic-agri-commodities",
  "organic": "organic-agri-commodities",
  cloves: "cloves",
  laung: "cloves",
  cinnamon: "cinnamon",
  dalchini: "cinnamon",
  "star-anise": "star-anise",
  "chakra-phool": "star-anise",
  ajwain: "ajwain",
  "carom-seeds": "ajwain",
  "pumpkin-seeds": "pumpkin-seeds",
  pepitas: "pumpkin-seeds",
  "horse-gram": "horse-gram",
  kulthi: "horse-gram",
  "green-moong-beans": "green-moong-beans",
  "green-moong": "green-moong-beans",
  "moong-beans": "green-moong-beans",
  moong: "green-moong-beans",
  "black-urad-beans": "black-urad-beans",
  "black-urad": "black-urad-beans",
  "black-beans": "black-urad-beans",
  urad: "black-urad-beans",
};

export function getProductBySlug(slug: string): Product | undefined {
  const mapped = SITE_SLUG_ALIASES[slug] ?? slug;
  const direct = ALL_PRODUCTS.find((p) => p.slug === slug || p.slug === mapped);
  if (direct) return direct;

  const empirical = getProductBySlugOrLegacy(slug);
  if (!empirical) return undefined;

  const byLegacy = empirical.legacySlug
    ? ALL_PRODUCTS.find((p) => p.slug === empirical.legacySlug)
    : undefined;
  if (byLegacy) return byLegacy;

  return {
    slug: empirical.slug,
    name: empirical.name,
    hsCode: empirical.hsCode,
    tagline: empirical.h1Headline,
    img: empirical.image,
    gallery: [empirical.image],
    description: empirical.executiveSummary,
    varieties: empirical.varieties,
    packing: [empirical.logistics.standardPackaging],
    standards: empirical.certifications,
    brochure: BROCHURE_URL,
    brochureName: `Sheshaan-Global-${empirical.slug}.pdf`,
    group: empirical.categoryName,
  };
}

/** Countries with map coordinates (0-100% of world map image). */
export type Country = { n: string; f: string; x: number; y: number };
export const COUNTRIES: Country[] = [
  { n: "UAE", f: "🇦🇪", x: 61, y: 46 },
  { n: "Bangladesh", f: "🇧🇩", x: 72, y: 44 },
  { n: "Kuwait", f: "🇰🇼", x: 59, y: 43 },
  { n: "China", f: "🇨🇳", x: 78, y: 38 },
  { n: "Qatar", f: "🇶🇦", x: 60, y: 45 },
  { n: "United Kingdom", f: "🇬🇧", x: 47, y: 28 },
  { n: "Saudi Arabia", f: "🇸🇦", x: 58, y: 46 },
  { n: "United States", f: "🇺🇸", x: 20, y: 38 },
  { n: "Singapore", f: "🇸🇬", x: 77, y: 58 },
  { n: "South Africa", f: "🇿🇦", x: 54, y: 74 },
  { n: "Malaysia", f: "🇲🇾", x: 77, y: 56 },
  { n: "Netherlands", f: "🇳🇱", x: 49, y: 30 },
  { n: "Ghana", f: "🇬🇭", x: 48, y: 55 },
  { n: "Canada", f: "🇨🇦", x: 22, y: 25 },
  { n: "Australia", f: "🇦🇺", x: 84, y: 70 },
  { n: "Oman", f: "🇴🇲", x: 62, y: 48 },
  { n: "Bahrain", f: "🇧🇭", x: 60, y: 44 },
  { n: "Sri Lanka", f: "🇱🇰", x: 70, y: 55 },
  { n: "Vietnam", f: "🇻🇳", x: 78, y: 50 },
  { n: "Indonesia", f: "🇮🇩", x: 80, y: 62 },
  { n: "Germany", f: "🇩🇪", x: 51, y: 30 },
  { n: "France", f: "🇫🇷", x: 49, y: 32 },
  { n: "Kenya", f: "🇰🇪", x: 58, y: 60 },
  { n: "Nigeria", f: "🇳🇬", x: 50, y: 55 },
  { n: "Russia", f: "🇷🇺", x: 65, y: 25 },
  { n: "Japan", f: "🇯🇵", x: 84, y: 38 },
];

// ============================================================
// Region landing pages — SEO-focused unique content per market
// ============================================================
export type Region = {
  slug: string;
  name: string; // "United Arab Emirates"
  short: string; // "UAE"
  flag: string;
  ports: string[];
  topProducts: string[]; // Product slugs prioritised for this region
  incoterms: string[];
  transitDays: string;
  keywords: string[];
  intro: string;
  hero: string; // Hero paragraph
  advantages: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const REGIONS: Region[] = [
  {
    slug: "uae",
    name: "United Arab Emirates",
    short: "UAE",
    flag: "🇦🇪",
    ports: ["Jebel Ali (Dubai)", "Khalifa Port (Abu Dhabi)", "Port Rashid", "Sharjah"],
    topProducts: [
      "fresh-onions",
      "green-chillies",
      "premium-rice",
      "coconut-brown-husked",
      "fresh-vegetables",
      "fresh-fruits",
    ],
    incoterms: ["FOB Nhava Sheva", "CIF Jebel Ali", "CFR Khalifa Port", "DDP Dubai"],
    transitDays: "5–8 days from Nhava Sheva",
    keywords: [
      "onion exporter to UAE",
      "green chillies supplier Dubai",
      "basmati rice exporter UAE",
      "Indian coconut supplier UAE",
      "APEDA exporter Dubai",
    ],
    intro:
      "Trusted Indian exporter to the UAE — fresh onions, green chillies, premium rice and coconut delivered to Jebel Ali, Khalifa Port and Sharjah with weekly consolidated & FCL sailings.",
    hero: "The UAE is one of our largest export markets. Sheshaan Global ships weekly FCL and LCL consignments of Nashik red onions, G4 green chillies, 1121 Basmati rice and CDB-registered brown husked coconut to Dubai, Abu Dhabi and Sharjah — with full APEDA, FSSAI, Phytosanitary and Fumigation documentation issued for every shipment.",
    advantages: [
      {
        title: "Weekly Jebel Ali sailings",
        body: "Consolidated LCL every week and dedicated FCL twin-40' pairs — 5–8 day transit from Nhava Sheva.",
      },
      {
        title: "Halal-compliant supply chain",
        body: "Product handling, packaging and storage aligned with UAE MOCCAE and ESMA import requirements.",
      },
      {
        title: "Cold-chain to Gulf",
        body: "Reefer container 2–4°C for green chillies, fruits and vegetables; ambient for onions and coconut.",
      },
      {
        title: "Arabic-labelled retail",
        body: "Private-label onions, rice and spices with Arabic + English packaging for hypermarket chains.",
      },
    ],
    faqs: [
      {
        q: "Do you ship onions from India to Dubai every week?",
        a: "Yes — we operate weekly Nashik red onion sailings to Jebel Ali via Nhava Sheva. Typical transit is 5–8 days. Both FCL and LCL are supported.",
      },
      {
        q: "Which port is best for green chillies to the UAE?",
        a: "Jebel Ali is the fastest and most cost-efficient for reefer green chillies. Khalifa Port and Sharjah are also serviced for Abu Dhabi and Northern Emirates buyers.",
      },
      {
        q: "What documents do you provide for UAE customs clearance?",
        a: "Commercial Invoice, Packing List, Certificate of Origin (Chamber attested), Phytosanitary Certificate, Fumigation Certificate, Bill of Lading and Health Certificate as applicable.",
      },
    ],
  },
  {
    slug: "eu",
    name: "European Union",
    short: "EU",
    flag: "🇪🇺",
    ports: ["Rotterdam (NL)", "Hamburg (DE)", "Antwerp (BE)", "Le Havre (FR)", "Valencia (ES)"],
    topProducts: [
      "premium-rice",
      "spices-masalas",
      "dry-fruits-nuts",
      "pulses-lentils",
      "fresh-fruits",
      "green-chillies",
    ],
    incoterms: ["FOB Nhava Sheva", "CIF Rotterdam", "CIF Hamburg", "DAP EU Warehouse"],
    transitDays: "22–28 days to North Europe",
    keywords: [
      "Indian rice exporter EU",
      "spices supplier Netherlands",
      "APEDA exporter Germany",
      "pulses exporter Europe",
      "cashew supplier EU",
    ],
    intro:
      "APEDA-certified Indian exporter to the European Union — steam-sterilized spices, sortex-cleaned pulses, Basmati rice and cashews meeting EU 2073/2005 and ESA quality standards.",
    hero: "Sheshaan Global exports to European buyers across Germany, Netherlands, France, Belgium and Spain with documentation aligned to EU regulations — pesticide residue reports (EU MRL), aflatoxin limits (EC 1881/2006), and steam-sterilization certificates for spices. Serving importers, distributors and private-label retail chains.",
    advantages: [
      {
        title: "EU-MRL compliant residue reports",
        body: "Every consignment ships with lab reports aligned to EU pesticide residue limits and aflatoxin thresholds.",
      },
      {
        title: "Steam-sterilized spices",
        body: "Turmeric, cumin, coriander and blends steam-sterilized (no ETO) — meeting ESA and BfR guidelines.",
      },
      {
        title: "Traceability & farm records",
        body: "Lot-level traceability from farm gate to shipping bill for retailer audits and reorder consistency.",
      },
      {
        title: "Sustainable packaging",
        body: "FSC-certified cartons, recyclable PP and jute packaging on request for EU Green Deal alignment.",
      },
    ],
    faqs: [
      {
        q: "Are your spices ETO-free and EU-MRL compliant?",
        a: "Yes. All spices exported to the EU are steam-sterilized (no ethylene oxide) and residue-tested against current EU MRLs. Certificates are issued per shipment.",
      },
      {
        q: "Which EU ports do you regularly ship to?",
        a: "We regularly ship to Rotterdam, Hamburg, Antwerp, Le Havre and Valencia — typical transit is 22–28 days to North European ports.",
      },
      {
        q: "Can you support private-label for European retail chains?",
        a: "Yes. We offer private-label rice, spices and pulses with EU-compliant multilingual packaging, nutrition panels and barcoding.",
      },
    ],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    short: "UK",
    flag: "🇬🇧",
    ports: ["Felixstowe", "Southampton", "London Gateway", "Liverpool"],
    topProducts: [
      "premium-rice",
      "spices-masalas",
      "green-chillies",
      "pulses-lentils",
      "dry-fruits-nuts",
      "fresh-vegetables",
    ],
    incoterms: ["FOB Nhava Sheva", "CIF Felixstowe", "CIF Southampton", "DDP UK"],
    transitDays: "24–30 days to UK ports",
    keywords: [
      "basmati rice exporter UK",
      "Indian spices supplier UK",
      "green chillies exporter London",
      "APEDA exporter UK",
      "pulses supplier Britain",
    ],
    intro:
      "Direct-from-India exporter to the United Kingdom — 1121 Basmati rice, steam-sterilized spices, fresh green chillies and pulses shipped to Felixstowe, Southampton and London Gateway.",
    hero: "The UK is a strategic market for our Basmati rice, Indian spices and fresh green chillies. Sheshaan Global supplies UK wholesalers, cash-and-carry chains and ethnic supermarkets with documentation compliant with UK Border Target Operating Model (BTOM), FSA and PHA import requirements.",
    advantages: [
      {
        title: "BTOM-ready documentation",
        body: "CHED-PP pre-notifications, phytosanitary certificates and lab reports aligned with UK Border Target Operating Model.",
      },
      {
        title: "Aged 1121 Basmati",
        body: "12–24 month aged 1121 Basmati with characteristic aroma and 8.4mm+ elongation — the UK ethnic-retail benchmark.",
      },
      {
        title: "Reefer to Felixstowe",
        body: "Weekly reefer capacity to Felixstowe and Southampton for green chillies, fruits and fresh vegetables.",
      },
      {
        title: "Retail-ready private label",
        body: "GBP-priced, English-labelled retail packs with UK importer address printing on request.",
      },
    ],
    faqs: [
      {
        q: "Do you comply with the UK Border Target Operating Model (BTOM)?",
        a: "Yes. We issue CHED-PP pre-notifications, phytosanitary certificates and any additional lab reports required under BTOM Category 1/2/3 for plant products.",
      },
      {
        q: "Which UK ports do you ship to?",
        a: "Primarily Felixstowe, Southampton, London Gateway and Liverpool. Typical transit from Nhava Sheva is 24–30 days.",
      },
      {
        q: "Do you supply private-label Basmati rice for UK supermarkets?",
        a: "Yes. We supply 1kg / 5kg / 10kg / 20kg private-label Basmati packs with UK-compliant labelling, allergen and nutrition information.",
      },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    short: "USA",
    flag: "🇺🇸",
    ports: ["New York (JFK)", "Newark", "Los Angeles", "Long Beach", "Houston"],
    topProducts: [
      "premium-rice",
      "spices-masalas",
      "dry-fruits-nuts",
      "pulses-lentils",
      "fresh-fruits",
      "green-chillies",
    ],
    incoterms: ["FOB Nhava Sheva", "CIF New York", "CIF Los Angeles", "DDP USA"],
    transitDays: "24–35 days East Coast, 30–40 days West Coast",
    keywords: [
      "Indian rice exporter USA",
      "spices exporter to America",
      "APEDA supplier USA",
      "cashew exporter America",
      "Indian food exporter USA",
    ],
    intro:
      "FDA-aware Indian exporter to the United States — Basmati rice, spices, pulses and premium cashews shipped to New York, LA and Houston with FSSC / HACCP-compliant handling.",
    hero: "Sheshaan Global exports to US importers and distributors serving South-Asian retail, HORECA and mainstream health-food channels. We ship to East and West Coast ports with FSVP-ready supplier documentation, FDA prior-notice filings and lot-level traceability.",
    advantages: [
      {
        title: "FSVP-ready supplier file",
        body: "Complete Foreign Supplier Verification Program documentation — food-safety plans, HACCP, hazard analysis and lab reports.",
      },
      {
        title: "FDA Prior Notice filing",
        body: "We file Prior Notice for every shipment and coordinate with your US customs broker for smooth clearance.",
      },
      {
        title: "Coast-to-coast reach",
        body: "East Coast (NY/NJ, Houston) and West Coast (LA/Long Beach) sailings — 24–40 day transit windows.",
      },
      {
        title: "Premium cashew grades",
        body: "W180 / W240 / W320 cashews, vacuum-flushed, meeting AFI grade specifications for US buyers.",
      },
    ],
    faqs: [
      {
        q: "Are you FSVP compliant for exports to the USA?",
        a: "Yes. We maintain FSVP-ready supplier records — HACCP, food safety plans, hazard analysis and third-party lab reports — that US importers need under FDA rules.",
      },
      {
        q: "Do you file FDA Prior Notice for US shipments?",
        a: "Yes. Prior Notice is filed for every consignment and shared with your customs broker along with the Bill of Lading and Commercial Invoice.",
      },
      {
        q: "Which US ports do you ship to most often?",
        a: "New York/Newark and Houston on the East Coast; Los Angeles and Long Beach on the West Coast. Transit is 24–35 days East and 30–40 days West from Nhava Sheva.",
      },
    ],
  },
  ...[
    [
      "saudi-arabia",
      "Saudi Arabia",
      "Saudi Arabia",
      "🇸🇦",
      ["Jeddah Islamic Port", "Dammam King Abdulaziz Port", "Riyadh Dry Port"],
      "7–12 days to Jeddah",
      [
        "fresh-onions",
        "premium-rice",
        "green-chillies",
        "spices-masalas",
        "fresh-fruits",
        "coconut-brown-husked",
      ],
    ],
    [
      "qatar",
      "Qatar",
      "Qatar",
      "🇶🇦",
      ["Hamad Port", "Doha Port"],
      "6–10 days to Hamad Port",
      [
        "fresh-onions",
        "green-chillies",
        "premium-rice",
        "fresh-vegetables",
        "spices-masalas",
        "fresh-fruits",
      ],
    ],
    [
      "kuwait",
      "Kuwait",
      "Kuwait",
      "🇰🇼",
      ["Shuwaikh Port", "Shuaiba Port"],
      "7–11 days to Kuwait",
      [
        "fresh-onions",
        "premium-rice",
        "green-chillies",
        "spices-masalas",
        "pulses-lentils",
        "fresh-fruits",
      ],
    ],
    [
      "oman",
      "Oman",
      "Oman",
      "🇴🇲",
      ["Sohar Port", "Salalah Port", "Muscat"],
      "5–9 days to Sohar",
      [
        "fresh-onions",
        "coconut-brown-husked",
        "green-chillies",
        "premium-rice",
        "fresh-vegetables",
        "spices-masalas",
      ],
    ],
    [
      "bahrain",
      "Bahrain",
      "Bahrain",
      "🇧🇭",
      ["Khalifa Bin Salman Port", "Mina Salman"],
      "7–10 days to Bahrain",
      [
        "fresh-onions",
        "green-chillies",
        "premium-rice",
        "spices-masalas",
        "fresh-fruits",
        "fresh-vegetables",
      ],
    ],
    [
      "singapore",
      "Singapore",
      "Singapore",
      "🇸🇬",
      ["Port of Singapore", "Pasir Panjang Terminal"],
      "8–12 days to Singapore",
      [
        "premium-rice",
        "spices-masalas",
        "pulses-lentils",
        "dry-fruits-nuts",
        "fresh-fruits",
        "green-chillies",
      ],
    ],
    [
      "malaysia",
      "Malaysia",
      "Malaysia",
      "🇲🇾",
      ["Port Klang", "Penang Port", "Tanjung Pelepas"],
      "9–14 days to Port Klang",
      [
        "fresh-onions",
        "premium-rice",
        "spices-masalas",
        "pulses-lentils",
        "fresh-fruits",
        "dry-fruits-nuts",
      ],
    ],
    [
      "bangladesh",
      "Bangladesh",
      "Bangladesh",
      "🇧🇩",
      ["Chittagong Port", "Mongla Port"],
      "5–9 days to Chittagong",
      ["fresh-onions", "premium-rice", "wheat", "spices-masalas", "pulses-lentils", "ginger"],
    ],
    [
      "south-africa",
      "South Africa",
      "South Africa",
      "🇿🇦",
      ["Durban", "Cape Town", "Port Elizabeth"],
      "18–25 days to Durban",
      [
        "premium-rice",
        "spices-masalas",
        "pulses-lentils",
        "dry-fruits-nuts",
        "fresh-fruits",
        "fresh-onions",
      ],
    ],
    [
      "australia",
      "Australia",
      "Australia",
      "🇦🇺",
      ["Melbourne", "Sydney", "Brisbane", "Fremantle"],
      "22–32 days to Australia",
      [
        "premium-rice",
        "spices-masalas",
        "dry-fruits-nuts",
        "pulses-lentils",
        "mango",
        "fresh-fruits",
      ],
    ],
    [
      "canada",
      "Canada",
      "Canada",
      "🇨🇦",
      ["Vancouver", "Toronto", "Montreal"],
      "28–40 days to Canada",
      ["premium-rice", "spices-masalas", "pulses-lentils", "dry-fruits-nuts", "cashew", "turmeric"],
    ],
    [
      "netherlands",
      "Netherlands",
      "Netherlands",
      "🇳🇱",
      ["Rotterdam", "Amsterdam"],
      "22–28 days to Rotterdam",
      [
        "premium-rice",
        "spices-masalas",
        "pulses-lentils",
        "dry-fruits-nuts",
        "green-chillies",
        "fresh-fruits",
      ],
    ],
  ].map(([slug, name, short, flag, ports, transitDays, topProducts]) => ({
    slug: slug as string,
    name: name as string,
    short: short as string,
    flag: flag as string,
    ports: ports as string[],
    topProducts: topProducts as string[],
    incoterms: [
      `FOB Nhava Sheva`,
      `CIF ${Array.isArray(ports) ? ports[0] : name}`,
      `CFR ${Array.isArray(ports) ? ports[0] : name}`,
    ],
    transitDays: transitDays as string,
    keywords: [
      `Indian exporter to ${name}`,
      `agricultural products exporter ${name}`,
      `Indian spices supplier ${name}`,
      `rice exporter to ${name}`,
      `onion exporter to ${name}`,
    ],
    intro: `Indian agricultural exporter to ${name} supplying rice, spices, fresh produce, pulses and agri commodities with export documentation and buyer-specified packing.`,
    hero: `Sheshaan Global supports importers in ${name} with export-grade Indian agricultural products, coordinated packing, FOB/CIF/CFR shipment options and shipment documents such as Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary Certificate and Bill of Lading.`,
    advantages: [
      {
        title: "Buyer-specific packing",
        body: "Bulk, retail-ready and private-label options can be aligned to importer and distributor requirements.",
      },
      {
        title: "Export documentation support",
        body: "Commercial, origin, phytosanitary, fumigation and health documents are coordinated per shipment.",
      },
      {
        title: "Product range depth",
        body: "Rice, onions, spices, pulses, fresh produce and dry fruits can be sourced under one export desk.",
      },
      {
        title: "Quotation clarity",
        body: "FOB, CIF and CFR quotations can include packing, loading port, lead time and document scope.",
      },
    ],
    faqs: [
      {
        q: `Do you export agricultural products from India to ${name}?`,
        a: `Yes. Sheshaan Global supplies Indian agricultural products to ${name} with FOB, CIF and CFR shipment coordination.`,
      },
      {
        q: `Which products can you ship to ${name}?`,
        a: `Priority products include ${(topProducts as string[]).slice(0, 4).join(", ")} and other catalogue items based on buyer demand.`,
      },
      {
        q: `Which documents are provided for ${name} shipments?`,
        a: "Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary Certificate, Fumigation Certificate and Bill of Lading are supported; additional documents are arranged where applicable.",
      },
    ],
  })),
];

const REGION_SLUG_ALIASES: Record<string, string> = {
  "uae-dubai": "uae",
  "middle-east": "uae",
  "united-kingdom": "uk",
  "european-union": "eu",
  europe: "eu",
  "russia-cis": "eu",
  russia: "eu",
  africa: "south-africa",
  "southeast-asia": "singapore",
  vietnam: "singapore",
  iraq: "uae",
};

export function getRegionBySlug(slug: string) {
  const mapped = REGION_SLUG_ALIASES[slug] ?? slug;
  return REGIONS.find((r) => r.slug === slug || r.slug === mapped);
}

// Generic product-level FAQs (falls back per-product on the product page)
export function faqsForProduct(
  name: string,
  varieties: string[],
  countries = "25+ countries",
): { q: string; a: string }[] {
  return [
    {
      q: `Where does Sheshaan Global export ${name} from?`,
      a: `Our ${name.toLowerCase()} is sourced from origin regions across India, graded, packed and shipped from Nhava Sheva (JNPT) and Mundra ports to ${countries} worldwide.`,
    },
    {
      q: `How do I plan a ${name} shipment?`,
      a: `Share your destination port, packing preference and target timeline for ${name.toLowerCase()}. Our team will suggest the most practical route and prepare a tailored FOB or CIF quote.`,
    },
    {
      q: `Which varieties of ${name} do you supply?`,
      a: `We supply ${varieties.slice(0, 4).join(", ")}${varieties.length > 4 ? " and more" : ""} — buyer-specific varieties can be sourced against confirmed orders.`,
    },
    {
      q: `What certifications and documents come with each ${name} shipment?`,
      a: `Every ${name.toLowerCase()} consignment ships with Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary Certificate, Fumigation Certificate and Bill of Lading. APEDA, FSSAI and product-specific certifications are on file.`,
    },
    {
      q: `How do I request pricing for ${name}?`,
      a: `Send us a WhatsApp message or email with your target destination port, quantity and packing preference — we respond with an FOB / CIF quotation within one business day.`,
    },
  ];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  productSlug?: string;
  image?: string;
  imageAlt?: string;
  body: string[];
}

export interface SeoLandingPage {
  slug: string;
  title: string;
  keyword: string;
  description: string;
  hero: string;
  productSlug?: string;
  regionSlug?: string;
  points: string[];
  faqs: { q: string; a: string }[];
}

export const BLOG_POSTS: BlogPost[] = [];
export const SEO_LANDING_PAGES: SeoLandingPage[] = [];
