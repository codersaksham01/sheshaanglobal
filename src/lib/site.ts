import prodFruits from "@/assets/prod-fruits.jpg";
import prodVeg from "@/assets/prod-vegetables.jpg";
import prodRice from "@/assets/prod-rice.jpg";
import prodPulses from "@/assets/prod-pulses.jpg";
import prodSpices from "@/assets/prod-spices.jpg";
import prodDryfruits from "@/assets/prod-dryfruits.jpg";
import prodCoconut from "@/assets/prod-coconut.jpg";
import prodChillies from "@/assets/prod-chillies.jpg";

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
    categories: ["Fresh Onions", "Green Chillies", "Premium Rice", "Coconut (Brown Husked)", "Fresh Fruits", "Fresh Vegetables"],
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
  tagline: string;
  img: string;
  gallery: string[];
  description: string;
  varieties: string[];
  packing: string[];
  standards: string[];
  brochure?: string;
  brochureName?: string;
};

const B = "/brochures";

export const PRODUCTS: Product[] = [
  {
    slug: "fresh-onions",
    name: "Fresh Onions",
    tagline: "Export-grade red, pink & white onions",
    img: prodVeg,
    gallery: [prodVeg, prodChillies, prodFruits],
    description:
      "Our flagship export — premium Indian onions sourced directly from Nashik, Maharashtra. Uniformly graded, well-cured and packed for long transit, meeting the size, color and pungency standards of Middle East, South-East Asia and European buyers.",
    varieties: ["Red Onion (Nashik)", "Pink Onion", "White Onion", "Rose Onion", "Bangalore Rose"],
    packing: ["Mesh bags 5 / 10 / 25 / 50 kg", "Jute bags", "Ventilated cartons", "Loose in 20' / 40' container"],
    standards: ["APEDA Certified", "FSSAI Compliant", "Phytosanitary Certified", "Fumigation Certified"],
    brochure: `${B}/sheshaan-fresh-produce-coconuts.pdf`,
    brochureName: "Sheshaan-Global-Fresh-Onions.pdf",
  },
  {
    slug: "green-chillies",
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
    name: "Premium Rice",
    tagline: "Long-grain aromatic Basmati & Non-Basmati",
    img: prodRice,
    gallery: [prodRice, prodPulses, prodSpices],
    description:
      "Aged Basmati rice with characteristic aroma and elongation, plus a full non-basmati range. Milled, sortex-cleaned and moisture-controlled for consistent kitchen performance.",
    varieties: ["1121 Basmati", "1509 Basmati", "Pusa Basmati", "Sona Masoori", "IR64 Parboiled"],
    packing: ["Non-woven 5 / 10 / 25 kg bags", "PP woven 25 / 50 kg", "Jute bags", "Vacuum 1 kg retail packs"],
    standards: ["APEDA Certified", "FSSAI Compliant", "ISO 22000", "Non-GMO"],
    brochure: `${B}/sheshaan-basmati-non-basmati-rice.pdf`,
    brochureName: "Sheshaan-Global-Basmati-Non-Basmati-Rice.pdf",
  },
  {
    slug: "coconut-brown-husked",
    name: "Coconut (Brown Husked)",
    tagline: "Mature brown husked coconuts — CDB registered",
    img: prodCoconut,
    gallery: [prodCoconut, prodVeg, prodRice],
    description:
      "Mature semi-husked and fully brown husked coconuts sourced from coastal Karnataka, Tamil Nadu and Kerala. Registered with the Coconut Development Board (CDB), Govt. of India. Selected for high copra content, uniform size and long shelf-life.",
    varieties: ["Brown Husked (Semi)", "Brown Husked (Fully)", "Matured Coconut", "Copra Grade"],
    packing: ["Loose in 20' / 40' container", "Mesh bags 25 / 50 kg", "PP bags", "Bulk containerised"],
    standards: ["CDB Registered", "APEDA Certified", "FSSAI Compliant", "Phytosanitary Certified"],
    brochure: `${B}/sheshaan-fresh-produce-coconuts.pdf`,
    brochureName: "Sheshaan-Global-Coconut.pdf",
  },
  {
    slug: "fresh-vegetables",
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
    name: "Fresh Fruits",
    tagline: "Sun-ripened, hand-picked, export-graded",
    img: prodFruits,
    gallery: [prodFruits, prodVeg, prodCoconut],
    description:
      "Premium seasonal Indian fruits — mangoes, pomegranates, bananas, grapes and more — hand-selected at peak ripeness, pre-cooled and shipped under controlled cold-chain to preserve flavor and shelf-life.",
    varieties: ["Alphonso Mango", "Kesar Mango", "Pomegranate", "Banana (Cavendish)", "Grapes (Thompson)"],
    packing: ["Corrugated 3–5 kg cartons", "Ventilated plastic crates", "Reefer container 40' HC", "Private-label options"],
    standards: ["APEDA Certified", "FSSAI Compliant", "GlobalG.A.P.", "Phytosanitary Certified"],
    brochure: `${B}/sheshaan-fresh-fruits.pdf`,
    brochureName: "Sheshaan-Global-Fresh-Fruits.pdf",
  },
  {
    slug: "spices-masalas",
    name: "Spices & Masalas",
    tagline: "Whole & ground — steam-sterilized",
    img: prodSpices,
    gallery: [prodSpices, prodChillies, prodPulses],
    description:
      "Authentic Indian spices sourced from origin regions — Kerala, Rajasthan, Karnataka — cleaned, steam-sterilized and packed to lock in oil content and color.",
    varieties: ["Turmeric", "Cumin", "Coriander", "Cardamom", "Black Pepper", "Custom Masala Blends"],
    packing: ["Food-grade PP bags 25 kg", "Retail pouches 100 g – 1 kg", "Bulk drums", "Aluminum-foil sachets"],
    standards: ["Steam Sterilized", "FSSAI Compliant", "ASTA Standards", "ISO 22000"],
    brochure: `${B}/sheshaan-spices.pdf`,
    brochureName: "Sheshaan-Global-Spices-Masalas.pdf",
  },
  {
    slug: "pulses-lentils",
    name: "Pulses & Lentils",
    tagline: "Protein-rich, machine-cleaned & sorted",
    img: prodPulses,
    gallery: [prodPulses, prodRice, prodSpices],
    description:
      "Full range of Indian pulses — whole, split and polished — cleaned to export purity levels and packed to preserve color and moisture.",
    varieties: ["Toor Dal", "Chana Dal", "Moong Dal", "Urad Dal", "Masoor Dal", "Kabuli Chana"],
    packing: ["PP bags 25 / 50 kg", "Retail 500 g / 1 kg pouches", "Bulk container", "Private label"],
    standards: ["FSSAI Compliant", "Sortex Cleaned 99.95%", "ISO 22000", "Non-GMO"],
    brochure: `${B}/sheshaan-pulses-cereals-seeds.pdf`,
    brochureName: "Sheshaan-Global-Pulses-Cereals-Seeds.pdf",
  },
  {
    slug: "dry-fruits-nuts",
    name: "Dry Fruits & Nuts",
    tagline: "Premium grade, moisture-controlled",
    img: prodDryfruits,
    gallery: [prodDryfruits, prodCoconut, prodRice],
    description:
      "Cashews, raisins, dates, almonds and pistachios — grade-sorted and vacuum or nitrogen-flushed to preserve freshness and prevent rancidity.",
    varieties: ["Cashew W240 / W320", "Raisins Green / Golden", "Almonds", "Pistachios", "Dates"],
    packing: ["Vacuum pouches 250 g – 1 kg", "Tins 5 / 10 kg", "Cartons 12.5 kg", "Retail gift packs"],
    standards: ["FSSAI Compliant", "ISO 22000", "HACCP", "AFI Grades"],
    brochure: `${B}/sheshaan-dry-fruits-nuts.pdf`,
    brochureName: "Sheshaan-Global-Dry-Fruits-Nuts.pdf",
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Countries with map coordinates (0-100% of world map image). */
export type Country = { n: string; f: string; x: number; y: number };
export const COUNTRIES: Country[] = [
  { n: "UAE",            f: "🇦🇪", x: 61, y: 46 },
  { n: "Bangladesh",     f: "🇧🇩", x: 72, y: 44 },
  { n: "Kuwait",         f: "🇰🇼", x: 59, y: 43 },
  { n: "China",          f: "🇨🇳", x: 78, y: 38 },
  { n: "Qatar",          f: "🇶🇦", x: 60, y: 45 },
  { n: "United Kingdom", f: "🇬🇧", x: 47, y: 28 },
  { n: "Saudi Arabia",   f: "🇸🇦", x: 58, y: 46 },
  { n: "United States",  f: "🇺🇸", x: 20, y: 38 },
  { n: "Singapore",      f: "🇸🇬", x: 77, y: 58 },
  { n: "South Africa",   f: "🇿🇦", x: 54, y: 74 },
  { n: "Malaysia",       f: "🇲🇾", x: 77, y: 56 },
  { n: "Netherlands",    f: "🇳🇱", x: 49, y: 30 },
  { n: "Ghana",          f: "🇬🇭", x: 48, y: 55 },
  { n: "Canada",         f: "🇨🇦", x: 22, y: 25 },
  { n: "Australia",      f: "🇦🇺", x: 84, y: 70 },
  { n: "Oman",           f: "🇴🇲", x: 62, y: 48 },
  { n: "Bahrain",        f: "🇧🇭", x: 60, y: 44 },
  { n: "Sri Lanka",      f: "🇱🇰", x: 70, y: 55 },
  { n: "Vietnam",        f: "🇻🇳", x: 78, y: 50 },
  { n: "Indonesia",      f: "🇮🇩", x: 80, y: 62 },
  { n: "Germany",        f: "🇩🇪", x: 51, y: 30 },
  { n: "France",         f: "🇫🇷", x: 49, y: 32 },
  { n: "Kenya",          f: "🇰🇪", x: 58, y: 60 },
  { n: "Nigeria",        f: "🇳🇬", x: 50, y: 55 },
  { n: "Russia",         f: "🇷🇺", x: 65, y: 25 },
  { n: "Japan",          f: "🇯🇵", x: 84, y: 38 },
];

// ============================================================
// Region landing pages — SEO-focused unique content per market
// ============================================================
export type Region = {
  slug: string;
  name: string;              // "United Arab Emirates"
  short: string;             // "UAE"
  flag: string;
  ports: string[];
  topProducts: string[];     // Product slugs prioritised for this region
  incoterms: string[];
  transitDays: string;
  keywords: string[];
  intro: string;
  hero: string;              // Hero paragraph
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
    topProducts: ["fresh-onions", "green-chillies", "premium-rice", "coconut-brown-husked", "fresh-vegetables", "fresh-fruits"],
    incoterms: ["FOB Nhava Sheva", "CIF Jebel Ali", "CFR Khalifa Port", "DDP Dubai"],
    transitDays: "5–8 days from Nhava Sheva",
    keywords: ["onion exporter to UAE", "green chillies supplier Dubai", "basmati rice exporter UAE", "Indian coconut supplier UAE", "APEDA exporter Dubai"],
    intro: "Trusted Indian exporter to the UAE — fresh onions, green chillies, premium rice and coconut delivered to Jebel Ali, Khalifa Port and Sharjah with weekly consolidated & FCL sailings.",
    hero: "The UAE is one of our largest export markets. Sheshaan Global ships weekly FCL and LCL consignments of Nashik red onions, G4 green chillies, 1121 Basmati rice and CDB-registered brown husked coconut to Dubai, Abu Dhabi and Sharjah — with full APEDA, FSSAI, Phytosanitary and Fumigation documentation issued for every shipment.",
    advantages: [
      { title: "Weekly Jebel Ali sailings", body: "Consolidated LCL every week and dedicated FCL twin-40' pairs — 5–8 day transit from Nhava Sheva." },
      { title: "Halal-compliant supply chain", body: "Product handling, packaging and storage aligned with UAE MOCCAE and ESMA import requirements." },
      { title: "Cold-chain to Gulf", body: "Reefer container 2–4°C for green chillies, fruits and vegetables; ambient for onions and coconut." },
      { title: "Arabic-labelled retail", body: "Private-label onions, rice and spices with Arabic + English packaging for hypermarket chains." },
    ],
    faqs: [
      { q: "Do you ship onions from India to Dubai every week?", a: "Yes — we operate weekly Nashik red onion sailings to Jebel Ali via Nhava Sheva. Typical transit is 5–8 days. Both FCL and LCL are supported." },
      { q: "Which port is best for green chillies to the UAE?", a: "Jebel Ali is the fastest and most cost-efficient for reefer green chillies. Khalifa Port and Sharjah are also serviced for Abu Dhabi and Northern Emirates buyers." },
      { q: "What documents do you provide for UAE customs clearance?", a: "Commercial Invoice, Packing List, Certificate of Origin (Chamber attested), Phytosanitary Certificate, Fumigation Certificate, Bill of Lading and Health Certificate as applicable." },
    ],
  },
  {
    slug: "eu",
    name: "European Union",
    short: "EU",
    flag: "🇪🇺",
    ports: ["Rotterdam (NL)", "Hamburg (DE)", "Antwerp (BE)", "Le Havre (FR)", "Valencia (ES)"],
    topProducts: ["premium-rice", "spices-masalas", "dry-fruits-nuts", "pulses-lentils", "fresh-fruits", "green-chillies"],
    incoterms: ["FOB Nhava Sheva", "CIF Rotterdam", "CIF Hamburg", "DAP EU Warehouse"],
    transitDays: "22–28 days to North Europe",
    keywords: ["Indian rice exporter EU", "spices supplier Netherlands", "APEDA exporter Germany", "pulses exporter Europe", "cashew supplier EU"],
    intro: "APEDA-certified Indian exporter to the European Union — steam-sterilized spices, sortex-cleaned pulses, Basmati rice and cashews meeting EU 2073/2005 and ESA quality standards.",
    hero: "Sheshaan Global exports to European buyers across Germany, Netherlands, France, Belgium and Spain with documentation aligned to EU regulations — pesticide residue reports (EU MRL), aflatoxin limits (EC 1881/2006), and steam-sterilization certificates for spices. Serving importers, distributors and private-label retail chains.",
    advantages: [
      { title: "EU-MRL compliant residue reports", body: "Every consignment ships with lab reports aligned to EU pesticide residue limits and aflatoxin thresholds." },
      { title: "Steam-sterilized spices", body: "Turmeric, cumin, coriander and blends steam-sterilized (no ETO) — meeting ESA and BfR guidelines." },
      { title: "Traceability & farm records", body: "Lot-level traceability from farm gate to shipping bill for retailer audits and reorder consistency." },
      { title: "Sustainable packaging", body: "FSC-certified cartons, recyclable PP and jute packaging on request for EU Green Deal alignment." },
    ],
    faqs: [
      { q: "Are your spices ETO-free and EU-MRL compliant?", a: "Yes. All spices exported to the EU are steam-sterilized (no ethylene oxide) and residue-tested against current EU MRLs. Certificates are issued per shipment." },
      { q: "Which EU ports do you regularly ship to?", a: "We regularly ship to Rotterdam, Hamburg, Antwerp, Le Havre and Valencia — typical transit is 22–28 days to North European ports." },
      { q: "Can you support private-label for European retail chains?", a: "Yes. We offer private-label rice, spices and pulses with EU-compliant multilingual packaging, nutrition panels and barcoding." },
    ],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    short: "UK",
    flag: "🇬🇧",
    ports: ["Felixstowe", "Southampton", "London Gateway", "Liverpool"],
    topProducts: ["premium-rice", "spices-masalas", "green-chillies", "pulses-lentils", "dry-fruits-nuts", "fresh-vegetables"],
    incoterms: ["FOB Nhava Sheva", "CIF Felixstowe", "CIF Southampton", "DDP UK"],
    transitDays: "24–30 days to UK ports",
    keywords: ["basmati rice exporter UK", "Indian spices supplier UK", "green chillies exporter London", "APEDA exporter UK", "pulses supplier Britain"],
    intro: "Direct-from-India exporter to the United Kingdom — 1121 Basmati rice, steam-sterilized spices, fresh green chillies and pulses shipped to Felixstowe, Southampton and London Gateway.",
    hero: "The UK is a strategic market for our Basmati rice, Indian spices and fresh green chillies. Sheshaan Global supplies UK wholesalers, cash-and-carry chains and ethnic supermarkets with documentation compliant with UK Border Target Operating Model (BTOM), FSA and PHA import requirements.",
    advantages: [
      { title: "BTOM-ready documentation", body: "CHED-PP pre-notifications, phytosanitary certificates and lab reports aligned with UK Border Target Operating Model." },
      { title: "Aged 1121 Basmati", body: "12–24 month aged 1121 Basmati with characteristic aroma and 8.4mm+ elongation — the UK ethnic-retail benchmark." },
      { title: "Reefer to Felixstowe", body: "Weekly reefer capacity to Felixstowe and Southampton for green chillies, fruits and fresh vegetables." },
      { title: "Retail-ready private label", body: "GBP-priced, English-labelled retail packs with UK importer address printing on request." },
    ],
    faqs: [
      { q: "Do you comply with the UK Border Target Operating Model (BTOM)?", a: "Yes. We issue CHED-PP pre-notifications, phytosanitary certificates and any additional lab reports required under BTOM Category 1/2/3 for plant products." },
      { q: "Which UK ports do you ship to?", a: "Primarily Felixstowe, Southampton, London Gateway and Liverpool. Typical transit from Nhava Sheva is 24–30 days." },
      { q: "Do you supply private-label Basmati rice for UK supermarkets?", a: "Yes. We supply 1kg / 5kg / 10kg / 20kg private-label Basmati packs with UK-compliant labelling, allergen and nutrition information." },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    short: "USA",
    flag: "🇺🇸",
    ports: ["New York (JFK)", "Newark", "Los Angeles", "Long Beach", "Houston"],
    topProducts: ["premium-rice", "spices-masalas", "dry-fruits-nuts", "pulses-lentils", "fresh-fruits", "green-chillies"],
    incoterms: ["FOB Nhava Sheva", "CIF New York", "CIF Los Angeles", "DDP USA"],
    transitDays: "24–35 days East Coast, 30–40 days West Coast",
    keywords: ["Indian rice exporter USA", "spices exporter to America", "APEDA supplier USA", "cashew exporter America", "Indian food exporter USA"],
    intro: "FDA-aware Indian exporter to the United States — Basmati rice, spices, pulses and premium cashews shipped to New York, LA and Houston with FSSC / HACCP-compliant handling.",
    hero: "Sheshaan Global exports to US importers and distributors serving South-Asian retail, HORECA and mainstream health-food channels. We ship to East and West Coast ports with FSVP-ready supplier documentation, FDA prior-notice filings and lot-level traceability.",
    advantages: [
      { title: "FSVP-ready supplier file", body: "Complete Foreign Supplier Verification Program documentation — food-safety plans, HACCP, hazard analysis and lab reports." },
      { title: "FDA Prior Notice filing", body: "We file Prior Notice for every shipment and coordinate with your US customs broker for smooth clearance." },
      { title: "Coast-to-coast reach", body: "East Coast (NY/NJ, Houston) and West Coast (LA/Long Beach) sailings — 24–40 day transit windows." },
      { title: "Premium cashew grades", body: "W180 / W240 / W320 cashews, vacuum-flushed, meeting AFI grade specifications for US buyers." },
    ],
    faqs: [
      { q: "Are you FSVP compliant for exports to the USA?", a: "Yes. We maintain FSVP-ready supplier records — HACCP, food safety plans, hazard analysis and third-party lab reports — that US importers need under FDA rules." },
      { q: "Do you file FDA Prior Notice for US shipments?", a: "Yes. Prior Notice is filed for every consignment and shared with your customs broker along with the Bill of Lading and Commercial Invoice." },
      { q: "Which US ports do you ship to most often?", a: "New York/Newark and Houston on the East Coast; Los Angeles and Long Beach on the West Coast. Transit is 24–35 days East and 30–40 days West from Nhava Sheva." },
    ],
  },
];

export function getRegionBySlug(slug: string) {
  return REGIONS.find((r) => r.slug === slug);
}

// Generic product-level FAQs (falls back per-product on the product page)
export function faqsForProduct(name: string, varieties: string[], countries = "25+ countries"): { q: string; a: string }[] {
  return [
    { q: `Where does Sheshaan Global export ${name} from?`, a: `Our ${name.toLowerCase()} is sourced from origin regions across India, graded, packed and shipped from Nhava Sheva (JNPT) and Mundra ports to ${countries} worldwide.` },
    { q: `What is the minimum order quantity (MOQ) for ${name}?`, a: `MOQ for ${name.toLowerCase()} typically starts at one 20' FCL (approx. 20 metric tonnes). Smaller LCL trial orders can be arranged for new buyers on request.` },
    { q: `Which varieties of ${name} do you supply?`, a: `We supply ${varieties.slice(0, 4).join(", ")}${varieties.length > 4 ? " and more" : ""} — buyer-specific varieties can be sourced against confirmed orders.` },
    { q: `What certifications and documents come with each ${name} shipment?`, a: `Every ${name.toLowerCase()} consignment ships with Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary Certificate, Fumigation Certificate and Bill of Lading. APEDA, FSSAI and product-specific certifications are on file.` },
    { q: `How do I request pricing for ${name}?`, a: `Send us a WhatsApp message or email with your target destination port, quantity and packing preference — we respond with an FOB / CIF quotation within one business day.` },
  ];
}
