import prodFruits from "@/assets/prod-fruits.jpg";
import prodVeg from "@/assets/prod-vegetables.jpg";
import prodFreshOnionsDetail from "@/assets/prod-fresh-onions-detail.jpg";
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

export const BLUE = "#0057B8";
export const ORANGE = "#FF8A00";
export const NAVY = "#04152D";
export const SITE_URL = "https://global-roots-express.lovable.app";

export const PHONE = "+91 81499 09546";
export const PHONE_RAW = "918149909546";
export const EMAIL = "info@sheshaanglobal.com";
export const BROCHURE_URL = "/catalogue.pdf";
export const LINKEDIN_SAKSHAM = "https://www.linkedin.com/in/saksham-singh-ba591638a/";
export const LINKEDIN_SANA = "https://www.linkedin.com/in/sana-zeba-bakshi/";

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
import certCompliance from "@/assets/cert-compliance.svg";

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
  {
    id: "iso-22000",
    name: "ISO 22000",
    fullName: "Food Safety Management System Certification",
    label: "Certified",
    type: "Food Safety",
    issuer: "Certification Body",
    categories: ["All"],
    countries: ["Global"],
    img: certCompliance,
    file: "/certificates/iso-22000-sheshaan.pdf",
  },
  {
    id: "haccp",
    name: "HACCP",
    fullName: "Hazard Analysis and Critical Control Points Certification",
    label: "Certified",
    type: "Food Safety",
    issuer: "Certification Body",
    categories: ["All"],
    countries: ["Global"],
    img: certCompliance,
    file: "/certificates/haccp-sheshaan.pdf",
  },
  {
    id: "non-gmo",
    name: "Non-GMO",
    fullName: "Non-GMO Product Certification",
    label: "Certified",
    type: "Quality",
    issuer: "Certification Body",
    categories: ["Premium Rice", "Pulses", "Cereals & Seeds"],
    countries: ["Global"],
    img: certCompliance,
    file: "/certificates/non-gmo-sheshaan.pdf",
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
    a: "We are GST registered, IEC certified (DGFT), APEDA registered, FSSAI compliant, ISO 22000 certified, HACCP certified and Non-GMO certified. Product-specific documentation (Phytosanitary, COO, Health Certificate, Fumigation) is provided per shipment.",
  },
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "MOQ varies by product and packaging. Most containerised orders start at one 20' FCL. Retail-packed items support smaller LCL trials. Share your requirement on WhatsApp for a tailored quote.",
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
  "@type": "Organization",
  name: "Sheshaan Global",
  legalName: "Sheshaan Global",
  url: "/",
  logo: "/logo.png",
  description:
    "IEC-certified Indian exporter of fresh onions, green chillies, premium rice, coconut and agricultural commodities to 25+ countries worldwide.",
  foundingDate: "2022",
  founder: { "@type": "Person", name: "Sana Zeba Siraj Bakshi" },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${PHONE_RAW}`,
    email: EMAIL,
    contactType: "sales",
    areaServed: "Worldwide",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [],
};

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
    img: prodFreshOnionsDetail,
    gallery: [prodFreshOnionsDetail, prodVeg, prodChillies],
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
    gallery: [prodSpices, prodChillies, prodPulses],
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
    gallery: [prodPulses, prodRice, prodSpices],
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
  cumin: { img: prodCuminDetail },
  turmeric: {
    img: prodTurmericDetail,
    gallery: [prodTurmericDetail, prodSpices, prodDriedRedChilliesDetail],
  },
  "dried-red-chillies": { img: prodDriedRedChilliesDetail },
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
  "dal-split-pulses": { img: prodDalDetail },
  cashew: { img: prodCashewDetail },
  pomegranate: { img: prodPomegranateDetail },
  "dehydrated-onion-garlic": {
    img: prodDehydratedOnionDetail,
    gallery: [prodDehydratedOnionDetail, prodDehydratedGarlicDetail, prodGarlicDetail],
  },
  potatoes: { img: prodPotatoesDetail },
  "okra-drumsticks": {
    img: prodOkraDetail,
    gallery: [prodOkraDetail, prodDrumsticksDetail, prodVeg],
  },
  "g9-banana": { img: prodBananaDetail },
  grapes: { img: prodGrapesDetail },
  tomatoes: { img: prodTomatoesDetail },
  mango: { img: prodMangoDetail },
  soyabean: { img: prodSoyabeanDetail },
  lemon: { img: prodLemonDetail },
  oranges: { img: prodOrangesDetail },
  chickpeas: { img: prodChickpeasDetail },
  mustard: { img: prodMustardDetail },
  wheat: { img: prodWheatDetail },
  fenugreek: { img: prodFenugreekDetail },
  "cluster-beans": { img: prodClusterBeansDetail },
  ginger: { img: prodGingerDetail },
  garlic: { img: prodGarlicDetail },
  "black-pepper": { img: prodBlackPepperDetail },
  "green-peppercorn": {
    img: prodGreenPeppercornDetail,
    gallery: [prodGreenPeppercornDetail, prodBlackPepperDetail, prodSpices],
  },
  "curry-leaves": { img: prodCurryLeavesDetail },
  "cow-dung": { img: prodCowDungDetail },
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

export function getProductBySlug(slug: string) {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
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
];

export function getRegionBySlug(slug: string) {
  return REGIONS.find((r) => r.slug === slug);
}

export type SeoLandingPage = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  productSlug?: string;
  regionSlug?: string;
  hero: string;
  points: string[];
  faqs: { q: string; a: string }[];
};

export const SEO_LANDING_PAGES: SeoLandingPage[] = [
  {
    slug: "fresh-onion-exporter-india",
    title: "Fresh Onion Exporter from India | Sheshaan Global",
    description:
      "Source export-grade Nashik red onions from India with mesh bag packing, phytosanitary documentation and FOB/CIF quote support.",
    keyword: "fresh onion exporter from India",
    productSlug: "fresh-onions",
    hero: "Sheshaan Global supplies export-grade Indian onions sourced from Nashik and nearby growing belts, cured for transit and packed for wholesale importers, distributors and retail buyers.",
    points: [
      "Red, pink and white onion programs",
      "5 kg, 10 kg, 25 kg and 50 kg mesh bag packing",
      "FOB Nhava Sheva and CIF destination quotes",
      "Phytosanitary, fumigation, COO and APEDA documentation",
    ],
    faqs: [
      {
        q: "Can I get a same-day onion export quote?",
        a: "Yes. Share quantity, destination port and packing preference through the quote form or WhatsApp for a fast FOB or CIF estimate.",
      },
      {
        q: "Which onion sizes can you supply?",
        a: "Common export sizes include 35 mm+, 45 mm+, 55 mm+ and buyer-specific grading depending on season and destination market.",
      },
    ],
  },
  {
    slug: "green-chilli-exporter-india",
    title: "Green Chilli Exporter from India | G4, Teja, Byadgi",
    description:
      "Export fresh Indian green chillies by air or reefer sea shipment with residue-tested lots and buyer-specific packing.",
    keyword: "green chilli exporter from India",
    productSlug: "green-chillies",
    hero: "We supply vibrant, high-pungency Indian green chillies for Gulf, UK and Asian buyers with pre-cooling, sorting and documentation support.",
    points: [
      "G4, Teja, Byadgi and Guntur varieties",
      "Air cargo and reefer sea options",
      "Residue-tested lots on request",
      "Carton and ventilated crate packing",
    ],
    faqs: [
      {
        q: "Do you export green chillies by air?",
        a: "Yes. Urgent or high-value green chilli orders can move by air cargo with destination-specific documentation.",
      },
      {
        q: "Can you provide residue reports?",
        a: "Yes. Residue and quality reports can be arranged for buyers who need market-specific compliance checks.",
      },
    ],
  },
  {
    slug: "basmati-rice-exporter-india",
    title: "Basmati Rice Exporter from India | 1121, 1509, Pusa",
    description:
      "Buy aged Basmati and non-Basmati rice from India with private label packing, APEDA documentation and container shipment support.",
    keyword: "basmati rice exporter from India",
    productSlug: "premium-rice",
    hero: "Sheshaan Global exports aged Basmati and non-Basmati rice for distributors, ethnic retailers, HORECA suppliers and private-label brands.",
    points: [
      "1121, 1509, Pusa and Sona Masoori options",
      "5 kg, 10 kg, 25 kg and 50 kg bags",
      "Private-label bag printing support",
      "Sortex-cleaned, moisture-controlled lots",
    ],
    faqs: [
      {
        q: "Do you support private-label rice packing?",
        a: "Yes. Buyer branding, bag design and market-specific label requirements can be supported for bulk orders.",
      },
      {
        q: "What is the MOQ for rice export?",
        a: "Most rice orders start with one 20 foot container, with trial options depending on packing and destination.",
      },
    ],
  },
  {
    slug: "indian-spices-exporter",
    title: "Indian Spices Exporter | Turmeric, Cumin, Chillies, Pepper",
    description:
      "Source whole and ground Indian spices with steam sterilization, ISO 22000, HACCP and export documentation support.",
    keyword: "Indian spices exporter",
    productSlug: "spices-masalas",
    hero: "We export origin-sourced Indian spices for bulk importers, spice blenders, food processors and private-label retail brands.",
    points: [
      "Turmeric, cumin, coriander, chillies and black pepper",
      "Whole, ground and custom blend options",
      "Steam sterilization support",
      "ISO 22000 and HACCP backed compliance",
    ],
    faqs: [
      {
        q: "Can you supply steam-sterilized spices?",
        a: "Yes. Steam sterilization can be arranged for markets that require strict microbiological standards.",
      },
      {
        q: "Do you offer retail pouches?",
        a: "Yes. We support bulk bags, retail pouches and private-label spice programs.",
      },
    ],
  },
  {
    slug: "onion-exporter-to-uae",
    title: "Onion Exporter to UAE | India to Jebel Ali",
    description:
      "Export Indian onions to UAE with weekly Nhava Sheva to Jebel Ali shipping, mesh bag packing and full customs documents.",
    keyword: "onion exporter to UAE",
    productSlug: "fresh-onions",
    regionSlug: "uae",
    hero: "For UAE importers, Sheshaan Global provides regular onion export programs from India to Jebel Ali, Abu Dhabi and Sharjah.",
    points: [
      "Weekly shipping windows to Jebel Ali",
      "Nashik red onion sourcing",
      "CIF UAE and FOB India pricing",
      "COO, phytosanitary, fumigation and invoice support",
    ],
    faqs: [
      {
        q: "How fast is India to UAE onion shipment?",
        a: "Typical sea transit from Nhava Sheva to Jebel Ali is about 5 to 8 days, depending on vessel schedule.",
      },
      {
        q: "Can you quote CIF Jebel Ali?",
        a: "Yes. Share quantity and packing preference and we can prepare a CIF Jebel Ali quote.",
      },
    ],
  },
  {
    slug: "indian-agri-exporter-to-gulf",
    title: "Indian Agri Exporter to Gulf Countries | UAE, Saudi, Qatar, Oman",
    description:
      "Export onions, chillies, rice, spices and coconuts from India to Gulf markets with FOB/CIF quotation support.",
    keyword: "Indian agri exporter to Gulf",
    regionSlug: "uae",
    hero: "Sheshaan Global supports Gulf importers with reliable Indian agricultural products, fast documentation and flexible packing programs.",
    points: [
      "UAE, Saudi Arabia, Qatar, Oman, Kuwait and Bahrain supply focus",
      "Fresh produce, grains, pulses, spices and coconuts",
      "English and Arabic label support",
      "WhatsApp-first quote handling",
    ],
    faqs: [
      {
        q: "Which Gulf countries do you serve?",
        a: "We support UAE, Saudi Arabia, Qatar, Oman, Kuwait and Bahrain with FOB and CIF export options.",
      },
      {
        q: "Can I request mixed product containers?",
        a: "Yes. Mixed container planning can be discussed based on product compatibility and destination rules.",
      },
    ],
  },
];

export function getSeoLandingPage(slug: string) {
  return SEO_LANDING_PAGES.find((p) => p.slug === slug);
}

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  productSlug?: string;
  image?: string;
  imageAlt?: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-import-onions-from-india",
    title: "How to Import Onions from India",
    description:
      "A practical guide for buyers comparing onion grades, packing, documents and shipping terms from Indian exporters.",
    date: "2026-09-03",
    category: "Fresh Produce",
    readTime: "5 min read",
    productSlug: "fresh-onions",
    body: [
      "Start with the destination market and required onion size. UAE and Gulf buyers often request Nashik red onions in 45 mm+ and 55 mm+ grades, while retail programs may need tighter sorting and branded packing.",
      "Confirm packing before pricing. Mesh bags of 5 kg, 10 kg, 25 kg and 50 kg are common, but the right option depends on your buyer channel, shelf-life target and handling method.",
      "Ask for the documentation set before shipment: commercial invoice, packing list, certificate of origin, phytosanitary certificate, fumigation certificate and bill of lading.",
      "For faster pricing, send quantity, destination port, preferred bag size and target shipment week. This helps the exporter quote FOB or CIF without delay.",
    ],
  },
  {
    slug: "export-documents-required-for-agri-imports",
    title: "Documents Required for Agricultural Imports from India",
    description:
      "The core export documents importers should request for onions, rice, spices, pulses, fruits and vegetables.",
    date: "2026-09-03",
    category: "Documentation",
    readTime: "4 min read",
    body: [
      "Agricultural shipments usually need a commercial invoice, packing list, bill of lading, certificate of origin and product-specific certificates.",
      "Fresh produce commonly requires a phytosanitary certificate and fumigation certificate. Food products may also need health certificates, lab reports or residue reports depending on destination rules.",
      "Buyers should confirm destination requirements with their customs broker before booking the shipment. This avoids clearance delays and document corrections later.",
      "Sheshaan Global keeps certification support ready for APEDA, FSSAI, ISO 22000, HACCP and Non-GMO backed shipments where applicable.",
    ],
  },
  {
    slug: "fob-vs-cif-export-pricing",
    title: "FOB vs CIF Pricing: What Importers Should Know",
    description:
      "A simple explanation of FOB and CIF terms for importers buying agricultural products from India.",
    date: "2026-09-03",
    category: "Trade Basics",
    readTime: "4 min read",
    body: [
      "FOB means the exporter quotes product cost up to loading on the vessel at the Indian port. The buyer usually handles ocean freight, insurance and destination clearance.",
      "CIF includes cost, insurance and freight up to the destination port. It is easier for new buyers because the exporter arranges more of the shipment journey.",
      "Neither term normally includes destination customs duty, inland transport or local handling unless clearly agreed in writing.",
      "When requesting a quote, mention whether you need FOB Nhava Sheva, FOB Mundra or CIF to your destination port.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
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
      q: `What is the minimum order quantity (MOQ) for ${name}?`,
      a: `MOQ for ${name.toLowerCase()} typically starts at one 20' FCL (approx. 20 metric tonnes). Smaller LCL trial orders can be arranged for new buyers on request.`,
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
