import type { ExportCommodity } from "./products.ts";

export interface TradeCorridorRegion {
  slug: string;
  name: string;
  shortName: string;
  isoCode: string;
  flag: string;
  dischargePorts: string[];
  transitTimeFromIndia: string;
  importAuthority: string;
  preferredCurrencies: string[];
  unitSystemNote: string;
  chaAndCarrierProtocol: string;
  customsDocuments: string[];
}

export const TRADE_CORRIDOR_REGIONS: TradeCorridorRegion[] = [
  {
    slug: "uae",
    name: "United Arab Emirates (Dubai & Abu Dhabi)",
    shortName: "UAE / Dubai",
    isoCode: "AE",
    flag: "🇦🇪",
    dischargePorts: [
      "Jebel Ali Port (Dubai)",
      "Khalifa Port (Abu Dhabi)",
      "Sharjah Port (Khorfakkan)",
      "Dubai Airport (DXB Air Cargo)",
    ],
    transitTimeFromIndia: "3–5 Days Ocean Transit from Nhava Sheva (JNPT) / Mundra",
    importAuthority:
      "UAE MOCCAE & Dubai Municipality Food Import Re-Export System (FIRS / Montaji)",
    preferredCurrencies: ["USD", "AED"],
    unitSystemNote: "Metric Tons (MT) & 5kg–50kg GCC Standard Wholesale Packs",
    chaAndCarrierProtocol:
      "Cleared at Nhava Sheva (JNPT) and Mundra by our licensed Customs House Agent (CHA) with direct fast-track vessel bookings on third-party mainline carriers (Maersk, MSC, CMA CGM, Hapag-Lloyd) to Jebel Ali.",
    customsDocuments: [
      "UAE Embassy / Chamber Attested Certificate of Origin (COO)",
      "Ministry of Agriculture Phytosanitary Certificate",
      "Fumigation & Health Certificate for Dubai Municipality FIRS",
      "Commercial Invoice, Packing List & Original/Telex Bill of Lading",
      "SGS / Geo-Chem Pre-Shipment Inspection Report",
    ],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia (Dammam, Jeddah & Riyadh)",
    shortName: "Saudi Arabia",
    isoCode: "SA",
    flag: "🇸🇦",
    dischargePorts: ["King Abdulaziz Port (Dammam)", "Jeddah Islamic Port", "Riyadh Dry Port"],
    transitTimeFromIndia: "6–10 Days Ocean Transit from Nhava Sheva / Mundra",
    importAuthority: "Saudi Food & Drug Authority (SFDA) & FASAH Customs Clearance Platform",
    preferredCurrencies: ["USD", "SAR"],
    unitSystemNote: "Metric Tons (MT) with Arabic/English bilingual labeling support",
    chaAndCarrierProtocol:
      "Executed through licensed Indian CHA customs brokerage with direct Red Sea (Jeddah) and Arabian Gulf (Dammam) sailings via leading third-party container shipping lines.",
    customsDocuments: [
      "SFDA Compliant Certificate of Analysis & Pesticide Residue Report",
      "Phytosanitary Certificate (Govt. of India)",
      "Chamber of Commerce Attested Certificate of Origin",
      "Fumigation Certificate & Non-GMO Declaration",
      "FASAH-Ready Commercial Invoice, Packing List & Bill of Lading",
    ],
  },
  {
    slug: "qatar",
    name: "Qatar (Hamad Port & Doha)",
    shortName: "Qatar",
    isoCode: "QA",
    flag: "🇶🇦",
    dischargePorts: ["Hamad Port (Mesaieed)", "Doha Port", "Hamad International Air Cargo (DOH)"],
    transitTimeFromIndia: "5–8 Days Ocean Transit from Nhava Sheva / Mundra",
    importAuthority: "Qatar Ministry of Public Health (MOPH — Watheq Food Safety System)",
    preferredCurrencies: ["USD", "QAR"],
    unitSystemNote: "Metric Tons (MT) & Al-abbra / Central Market Wholesale Packs",
    chaAndCarrierProtocol:
      "Full CHA customs filing at Indian gateway ports paired with weekly direct and transshipment reefer/dry slots on premier third-party shipping lines into Hamad Port.",
    customsDocuments: [
      "Qatar MOPH Watheq Health & Phytosanitary Documentation",
      "Certificate of Origin (COO)",
      "Fumigation Certificate & SGS Quality Report",
      "Commercial Invoice, Packing List & Ocean Bill of Lading",
    ],
  },
  {
    slug: "kuwait",
    name: "Kuwait (Shuwaikh & Shuaiba)",
    shortName: "Kuwait",
    isoCode: "KW",
    flag: "🇰🇼",
    dischargePorts: ["Shuwaikh Port", "Shuaiba Port"],
    transitTimeFromIndia: "6–10 Days Ocean Transit from Nhava Sheva / Mundra",
    importAuthority: "Public Authority for Food and Nutrition (PAFN), State of Kuwait",
    preferredCurrencies: ["USD", "KWD"],
    unitSystemNote: "Metric Tons (MT) & Al-Furdah Wholesale Market Standard Bags",
    chaAndCarrierProtocol:
      "Coordinated via licensed CHA export clearance in India and third-party ocean carriers providing dedicated reefer plug-in priority to Shuwaikh Port.",
    customsDocuments: [
      "Kuwait PAFN Compliant Health & Phytosanitary Certificates",
      "Attested Certificate of Origin (COO)",
      "Fumigation Certificate & Third-Party Lab Report",
      "Commercial Invoice, Packing List & Bill of Lading",
    ],
  },
  {
    slug: "oman",
    name: "Oman (Sohar, Salalah & Muscat)",
    shortName: "Oman",
    isoCode: "OM",
    flag: "🇴🇲",
    dischargePorts: ["Sohar Port", "Port of Salalah", "Muscat (MCT Air Cargo)"],
    transitTimeFromIndia: "4–7 Days Ocean Transit from Nhava Sheva / Mundra",
    importAuthority: "Oman Ministry of Agriculture, Fisheries and Water Resources & Bayan Customs",
    preferredCurrencies: ["USD", "OMR"],
    unitSystemNote: "Metric Tons (MT) & Mawaleh Central Market Wholesale Specifications",
    chaAndCarrierProtocol:
      "Short-sea transit managed through our appointed CHA at Nhava Sheva/Mundra and direct third-party liner vessels calling Sohar and Salalah.",
    customsDocuments: [
      "Oman Bayan System Phytosanitary & Agricultural Import Clearance Docs",
      "Certificate of Origin (COO) & Fumigation Certificate",
      "Commercial Invoice, Packing List & Bill of Lading",
    ],
  },
  {
    slug: "bahrain",
    name: "Bahrain (Khalifa Bin Salman Port)",
    shortName: "Bahrain",
    isoCode: "BH",
    flag: "🇧🇭",
    dischargePorts: ["Khalifa Bin Salman Port (KBSP)", "Bahrain International Air Cargo"],
    transitTimeFromIndia: "6–9 Days Ocean Transit from Nhava Sheva / Mundra",
    importAuthority:
      "Bahrain Ministry of Municipalities & Agriculture and Public Health Directorate",
    preferredCurrencies: ["USD", "BHD"],
    unitSystemNote: "Metric Tons (MT) & Retail/Wholesale Pack Calibrations",
    chaAndCarrierProtocol:
      "Seamless Indian port customs clearance via licensed CHA and reliable third-party container line bookings into Khalifa Bin Salman Port.",
    customsDocuments: [
      "Phytosanitary Certificate & Health Certificate",
      "Certificate of Origin (COO) & Fumigation Certificate",
      "Commercial Invoice, Packing List & Bill of Lading",
    ],
  },
  {
    slug: "eu",
    name: "European Union (Rotterdam, Hamburg & Antwerp)",
    shortName: "European Union",
    isoCode: "EU",
    flag: "🇪🇺",
    dischargePorts: [
      "Port of Rotterdam (NL)",
      "Port of Hamburg (DE)",
      "Port of Antwerp-Bruges (BE)",
      "Le Havre (FR)",
      "Valencia (ES)",
    ],
    transitTimeFromIndia: "20–26 Days Ocean Transit from Nhava Sheva / Mundra",
    importAuthority: "European Food Safety Authority (EFSA) & EU TRACES NT (CHED-PP / CHED-D)",
    preferredCurrencies: ["USD", "EUR"],
    unitSystemNote: "Metric Tons (MT) & Euro-Palletized ISPM-15 Configurations",
    chaAndCarrierProtocol:
      "Handled by APEDA-experienced CHA teams in India alongside top-tier third-party European liner services (Maersk, MSC, Hapag-Lloyd, CMA CGM) into Rotterdam, Hamburg, and Antwerp.",
    customsDocuments: [
      "EU TRACES NT Pre-Notification & Phytosanitary Certificate",
      "EU-MRL Pesticide Residue & EC 1881/2006 Mycotoxin/Aflatoxin NABL Lab Report",
      "ETO-Free Steam Sterilization Certificate (for Spices & Herbs)",
      "REX / Certificate of Origin, Fumigation & ISPM-15 Pallet Certificate",
    ],
  },
  {
    slug: "netherlands",
    name: "Netherlands (Port of Rotterdam & Amsterdam)",
    shortName: "Netherlands",
    isoCode: "NL",
    flag: "🇳🇱",
    dischargePorts: [
      "Port of Rotterdam (Maasvlakte)",
      "Amsterdam Port",
      "Schiphol Air Cargo (AMS)",
    ],
    transitTimeFromIndia: "21–26 Days Ocean Transit from Nhava Sheva / Mundra",
    importAuthority: "Netherlands Food and Consumer Product Safety Authority (NVWA)",
    preferredCurrencies: ["USD", "EUR"],
    unitSystemNote: "Metric Tons (MT) — 800x1200mm Euro-Palletized FCL",
    chaAndCarrierProtocol:
      "Cleared at Indian origin ports by our dedicated CHA and shipped via mainline third-party ocean carriers directly into Rotterdam (Europe’s primary agri-commodity hub).",
    customsDocuments: [
      "NVWA & EU TRACES NT CHED-PP Phytosanitary Dossier",
      "Eurofins / SGS EU-MRL & Aflatoxin Compliance Certificate",
      "Certificate of Origin, Commercial Invoice, Packing List & Bill of Lading",
    ],
  },
  {
    slug: "uk",
    name: "United Kingdom (Felixstowe, Southampton & London Gateway)",
    shortName: "United Kingdom",
    isoCode: "GB",
    flag: "🇬🇧",
    dischargePorts: [
      "Port of Felixstowe",
      "London Gateway",
      "Port of Southampton",
      "Liverpool Port",
      "London Heathrow (LHR Air Cargo)",
    ],
    transitTimeFromIndia: "22–28 Days Ocean Transit from Nhava Sheva / Mundra",
    importAuthority: "UK Border Target Operating Model (BTOM — IPAFFS CHED-PP) & UK FSA",
    preferredCurrencies: ["USD", "GBP"],
    unitSystemNote: "Metric Tons (MT) & UK Wholesale / Cash-and-Carry Retail Packs",
    chaAndCarrierProtocol:
      "Export customs and APEDA phyto clearance managed by our licensed CHA in India, paired with direct UK port calls on third-party container shipping lines.",
    customsDocuments: [
      "UK BTOM IPAFFS CHED-PP Pre-Notification & Defra Phytosanitary Certificate",
      "UK MRL Residue & Aflatoxin Analytical Lab Certificate",
      "Certificate of Origin (DCTS / Chamber Attested)",
      "Commercial Invoice, Packing List & Ocean Bill of Lading",
    ],
  },
  {
    slug: "usa",
    name: "United States (New York, Los Angeles & Houston)",
    shortName: "USA",
    isoCode: "US",
    flag: "🇺🇸",
    dischargePorts: [
      "Port of New York & New Jersey (Newark)",
      "Port of Los Angeles / Long Beach",
      "Port of Houston",
      "Savannah Port",
    ],
    transitTimeFromIndia: "24–32 Days (US East Coast) / 30–38 Days (US West Coast)",
    importAuthority:
      "US FDA (FSMA FSVP & Prior Notice) & USDA APHIS Plant Protection and Quarantine",
    preferredCurrencies: ["USD"],
    unitSystemNote:
      "Metric Tons (MT) with US Pounds (Lbs) & Hundredweight (CWT) dual-unit labeling",
    chaAndCarrierProtocol:
      "Full Indian CHA export customs clearance, US ISF (10+2) data transmission, and third-party mainline vessel bookings to US East, Gulf, and West Coast ports.",
    customsDocuments: [
      "US FDA Prior Notice Confirmation & FSVP Supplier Verification File",
      "USDA APHIS Phytosanitary & Fumigation Certificates",
      "ASTA Cleanliness & Microbiological / Salmonella-Free Lab Report",
      "Importer Security Filing (ISF 10+2), COO, Invoice, Packing List & B/L",
    ],
  },
  {
    slug: "canada",
    name: "Canada (Vancouver, Montreal & Toronto)",
    shortName: "Canada",
    isoCode: "CA",
    flag: "🇨🇦",
    dischargePorts: ["Port of Vancouver", "Port of Montreal", "Halifax Port", "Toronto Inland ICD"],
    transitTimeFromIndia: "26–36 Days Ocean Transit from Nhava Sheva / Mundra",
    importAuthority: "Canadian Food Inspection Agency (CFIA — Safe Food for Canadians Regulations)",
    preferredCurrencies: ["USD", "CAD"],
    unitSystemNote: "Metric Tons (MT) & Bilingual English/French Packaging Support",
    chaAndCarrierProtocol:
      "Origin customs clearance executed by our licensed CHA in India with third-party ocean carrier routing to Montreal and Vancouver.",
    customsDocuments: [
      "CFIA Compliant Phytosanitary Certificate & SFCR Traceability Record",
      "Bilingual Labeling / Bulk Specification Sheet & Lab CoA",
      "Certificate of Origin, Fumigation Certificate, Invoice & B/L",
    ],
  },
  {
    slug: "singapore",
    name: "Singapore (PSA Singapore & Pasir Panjang)",
    shortName: "Singapore",
    isoCode: "SG",
    flag: "🇸🇬",
    dischargePorts: [
      "Port of Singapore (PSA Tuas / Pasir Panjang)",
      "Changi Airfreight Centre (SIN)",
    ],
    transitTimeFromIndia: "7–11 Days Ocean Transit from Chennai / Nhava Sheva / Mundra",
    importAuthority: "Singapore Food Agency (SFA — TradeNet Import Permit)",
    preferredCurrencies: ["USD", "SGD"],
    unitSystemNote: "Metric Tons (MT) & Pasir Panjang Wholesale Centre Calibrations",
    chaAndCarrierProtocol:
      "Rapid East and West Coast Indian CHA clearance connected to high-frequency third-party feeder and mainline vessels into PSA Singapore.",
    customsDocuments: [
      "SFA TradeNet Compliant Phytosanitary & Health Certificate",
      "AIFTA Preferential Certificate of Origin (Form AI)",
      "Fumigation Certificate, Commercial Invoice, Packing List & B/L",
    ],
  },
  {
    slug: "malaysia",
    name: "Malaysia (Port Klang, Penang & Tanjung Pelepas)",
    shortName: "Malaysia",
    isoCode: "MY",
    flag: "🇲🇾",
    dischargePorts: [
      "Port Klang (Northport / Westports)",
      "Penang Port",
      "Port of Tanjung Pelepas",
    ],
    transitTimeFromIndia: "8–12 Days Ocean Transit from Chennai / Nhava Sheva / Mundra",
    importAuthority: "Malaysian Quarantine and Inspection Services (MAQIS) & DOA Malaysia",
    preferredCurrencies: ["USD", "MYR"],
    unitSystemNote: "Metric Tons (MT) & Rose/Red Onion / Spice Bag Calibrations",
    chaAndCarrierProtocol:
      "Handled via licensed CHA teams at Chennai, Nhava Sheva, and Mundra with direct third-party container shipping lines calling Port Klang and Penang.",
    customsDocuments: [
      "MAQIS Import Permit Matching Phytosanitary Certificate",
      "ASEAN-India FTA Certificate of Origin (Form AI)",
      "Fumigation Certificate, Commercial Invoice, Packing List & B/L",
    ],
  },
  {
    slug: "bangladesh",
    name: "Bangladesh (Chittagong & Mongla Port)",
    shortName: "Bangladesh",
    isoCode: "BD",
    flag: "🇧🇩",
    dischargePorts: [
      "Chittagong Port (Chattogram)",
      "Mongla Port",
      "Benapole / Petrapole Land Customs",
    ],
    transitTimeFromIndia: "5–8 Days Ocean / Coastal Transit",
    importAuthority:
      "Plant Quarantine Wing (Department of Agricultural Extension, Bangladesh) & BSTI",
    preferredCurrencies: ["USD"],
    unitSystemNote: "Metric Tons (MT) — 100% L/C at Sight Supported",
    chaAndCarrierProtocol:
      "Coordinated by experienced CHA customs agents in India with coastal feeder vessels and third-party container lines serving Chittagong and Mongla.",
    customsDocuments: [
      "SAFTA Certificate of Origin & Phytosanitary Certificate",
      "SGS / Bureau Veritas Pre-Shipment Quantity & Quality Certificate",
      "L/C Compliant Commercial Invoice, Packing List, Fumigation & B/L",
    ],
  },
  {
    slug: "south-africa",
    name: "South Africa (Durban, Cape Town & Coega)",
    shortName: "South Africa",
    isoCode: "ZA",
    flag: "🇿🇦",
    dischargePorts: ["Port of Durban", "Port of Cape Town", "Port Elizabeth / Ngqura"],
    transitTimeFromIndia: "16–24 Days Ocean Transit from Nhava Sheva / Mundra",
    importAuthority: "DALRRD Plant Health & South African Revenue Service (SARS)",
    preferredCurrencies: ["USD", "ZAR"],
    unitSystemNote: "Metric Tons (MT) — 20ft Heavy FCL Rice, Spices & Pulses",
    chaAndCarrierProtocol:
      "Indian export customs cleared by our licensed CHA and shipped via third-party Indian Ocean liner services directly into Durban and Cape Town.",
    customsDocuments: [
      "DALRRD Import Permit Aligned Phytosanitary Certificate",
      "Non-GMO & Fumigation Certificate (Methyl Bromide / Phosphine)",
      "Certificate of Origin, Commercial Invoice, Packing List & B/L",
    ],
  },
  {
    slug: "australia",
    name: "Australia (Melbourne, Sydney, Brisbane & Fremantle)",
    shortName: "Australia",
    isoCode: "AU",
    flag: "🇦🇺",
    dischargePorts: [
      "Port of Melbourne",
      "Port of Sydney (Port Botany)",
      "Port of Brisbane",
      "Fremantle Port",
    ],
    transitTimeFromIndia: "20–28 Days Ocean Transit from Nhava Sheva / Mundra / Chennai",
    importAuthority:
      "Australian Department of Agriculture, Fisheries and Forestry (DAFF — BICON Biosecurity)",
    preferredCurrencies: ["USD", "AUD"],
    unitSystemNote: "Metric Tons (MT) — Strict Biosecurity & AFAS Fumigation Compliance",
    chaAndCarrierProtocol:
      "Executed by AFAS-experienced CHA customs brokers in India alongside third-party container carriers servicing Sydney, Melbourne, and Brisbane.",
    customsDocuments: [
      "DAFF BICON Compliant Phytosanitary Certificate & Manufacturer Declaration",
      "AFAS Approved Methyl Bromide Fumigation & FCL Packing Declaration (ISPM-15)",
      "ECTA Preferential Certificate of Origin (India-Australia ECTA)",
      "Commercial Invoice, Packing List & Bill of Lading",
    ],
  },
];

const CORRIDOR_REGION_ALIASES: Record<string, string> = {
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

export function getTradeCorridorBySlug(slug: string): TradeCorridorRegion | undefined {
  const mapped = CORRIDOR_REGION_ALIASES[slug] ?? slug;
  return TRADE_CORRIDOR_REGIONS.find((region) => region.slug === slug || region.slug === mapped);
}

export function formatDualWeightUnit(eligibleMtString: string): string {
  const numericMt = parseFloat(eligibleMtString);
  if (Number.isNaN(numericMt)) return `${eligibleMtString} MT`;
  const lbs = Math.round(numericMt * 2204.62).toLocaleString("en-US");
  const cwt = Math.round(numericMt * 22.0462).toLocaleString("en-US");
  return `${numericMt} MT (~${lbs} lbs / ${cwt} US CWT)`;
}

export function buildCorridorExecutiveSummary(
  product: ExportCommodity,
  region: TradeCorridorRegion,
): string {
  return `Sheshaan Global is an APEDA, FSSAI, and CDB certified ${product.name.toLowerCase()} exporter from India to ${region.name}, supplying wholesale importers with ${product.specs.primaryGrade} (ITC-HS Code ${product.hsCode}) sourced directly from ${product.originCluster}. Every consignment is cleared at ${product.logistics.gatewayPorts[0]} by our licensed Customs House Agent (CHA) and shipped via premier third-party international shipping lines to ${region.dischargePorts.join(", ")} (${region.transitTimeFromIndia}). Shipments are packed in ${product.logistics.standardPackaging}, loading ${product.logistics.container40ft} (${formatDualWeightUnit(product.logistics.eligibleQuantityValue)}) under ${product.logistics.transitClimateControl}, and include full ${region.importAuthority} compliance documentation under FOB, CFR, and CIF Incoterms (${region.preferredCurrencies.join("/")} settlement via L/C at sight, DP/CAD, or 30/70 TT).`;
}

export interface DedicatedExportLane {
  slug: string;
  productSlug: string;
  regionSlug: string;
  targetPortLabel: string;
  targetBuyerSegment: string;
  seoTitle: string;
  h1Headline: string;
  metaDescription: string;
}

export const EXPORT_CORRIDOR_LANES: DedicatedExportLane[] = [
  {
    slug: "fresh-onion-exporter-india-to-dubai-uae",
    productSlug: "fresh-onion-exporter-india",
    regionSlug: "uae",
    targetPortLabel: "Jebel Ali Port, Dubai & Khalifa Port, UAE",
    targetBuyerSegment: "Al Aweer Central Fruit & Vegetable Market Wholesalers & GCC Hypermarkets",
    seoTitle: "Fresh Onion Exporter India to Dubai UAE | Jebel Ali | Sheshaan Global",
    h1Headline:
      "Fresh Red Onion Exporter from India to Dubai (Jebel Ali), UAE | Nashik 55mm+ Bulk Reefer Supply",
    metaDescription:
      "APEDA-certified Fresh Red Onion Exporter from India to Dubai, UAE (HS 07031010). Nashik 45mm–55mm+ onions, 29 MT/40ft reefer via Nhava Sheva JNPT / Mundra to Jebel Ali in 3–5 days.",
  },
  {
    slug: "1121-basmati-rice-exporter-to-saudi-arabia-dammam",
    productSlug: "basmati-rice-exporter-india",
    regionSlug: "saudi-arabia",
    targetPortLabel: "King Abdulaziz Port (Dammam) & Jeddah Islamic Port, Saudi Arabia",
    targetBuyerSegment: "GCC Rice Importers, Private-Label Distributors & HORECA Catering Chains",
    seoTitle: "1121 Basmati Rice Exporter to Saudi Arabia Dammam | Sheshaan Global",
    h1Headline:
      "1121 Basmati Rice Exporter from India to Saudi Arabia (Dammam & Jeddah) | 8.35mm+ Steam & Golden Sella",
    metaDescription:
      "SFDA-compliant 1121 Basmati Rice Exporter from India to Dammam & Jeddah, Saudi Arabia (HS 10063020). Karnal 8.35mm+ aged rice, 25 MT/20ft FCL via Mundra / Nhava Sheva JNPT.",
  },
  {
    slug: "spices-exporter-to-usa-new-york",
    productSlug: "cumin-seeds-jeera-exporter-india",
    regionSlug: "usa",
    targetPortLabel: "Port of New York & New Jersey (Newark), Houston & Los Angeles, USA",
    targetBuyerSegment: "US Food Processing Houses, ASTA Spice Millers & Wholesale Importers",
    seoTitle: "Spices Exporter from India to USA New York | ASTA Clean | Sheshaan Global",
    h1Headline:
      "Indian Spices & Cumin Seeds Exporter to USA (New York / Newark) | ASTA Clean & Steam-Sterilized",
    metaDescription:
      "US FDA & ASTA-compliant Indian Spices Exporter to New York, USA (HS 09093129 / 091030). Unjha 99.5% sortex cumin, turmeric & chilli via Mundra / Nhava Sheva JNPT.",
  },
  {
    slug: "cumin-seeds-exporter-to-usa-new-york",
    productSlug: "cumin-seeds-jeera-exporter-india",
    regionSlug: "usa",
    targetPortLabel: "Port of New York & New Jersey (Newark), USA",
    targetBuyerSegment: "US Food Processing Houses, Seasoning Manufacturers & Bulk Spice Importers",
    seoTitle: "Cumin Seeds Exporter to USA New York | Unjha 99% | Sheshaan Global",
    h1Headline:
      "Cumin Seeds (Jeera) Exporter from India to USA (New York) | Unjha 99.5% Sortex ASTA Grade",
    metaDescription:
      "Bulk Unjha Cumin Seeds Exporter from India to New York, USA (HS 09093129). ASTA cleanliness, ETO-free steam sterilized, 27 MT/40ft FCL via Mundra / Nhava Sheva JNPT.",
  },
  {
    slug: "mature-coconut-exporter-to-uk-rotterdam",
    productSlug: "mature-coconut-exporter-india",
    regionSlug: "uk",
    targetPortLabel: "Port of Felixstowe (UK) & Port of Rotterdam (Netherlands / EU)",
    targetBuyerSegment:
      "UK & European Retail Supermarkets, Ethnic Cash-and-Carry & Produce Distributors",
    seoTitle: "Mature Coconut Exporter to UK & Rotterdam | Pollachi CDB | Sheshaan Global",
    h1Headline:
      "Mature Semi-Husked Coconut Exporter from India to UK (Felixstowe) & Rotterdam | Pollachi CDB Certified",
    metaDescription:
      "CDB-registered Pollachi Mature Semi-Husked Coconut Exporter from India to UK & Rotterdam (HS 08011910). 550g–650g export grade, 27 MT/40ft HC via Nhava Sheva JNPT / Tuticorin.",
  },
  {
    slug: "green-chilli-exporter-india-to-doha-qatar",
    productSlug: "green-chilli-exporter-india",
    regionSlug: "qatar",
    targetPortLabel: "Hamad Port & Doha International Air Cargo (DOH), Qatar",
    targetBuyerSegment: "Qatar Central Market Wholesalers & Supermarket Chains",
    seoTitle: "Green Chilli Exporter India to Doha Qatar | G4 Bulk | Sheshaan Global",
    h1Headline:
      "Fresh G4 Green Chilli Exporter from India to Doha, Qatar | Pre-Cooled Reefer & Air Cargo Supply",
    metaDescription:
      "APEDA-registered G4 Green Chilli Exporter from India to Doha, Qatar (HS 07096010). Sourced from Nashik & Vapi, 3.8kg/4kg cartons via Nhava Sheva JNPT & Mumbai Air Cargo.",
  },
  {
    slug: "turmeric-finger-exporter-india-to-europe-rotterdam",
    productSlug: "turmeric-finger-powder-exporter-india",
    regionSlug: "netherlands",
    targetPortLabel: "Port of Rotterdam (Netherlands) & Hamburg (Germany)",
    targetBuyerSegment: "European Spice Extractors, Curcumin Processors & Bulk Ingredient Traders",
    seoTitle: "Turmeric Finger Exporter India to Rotterdam EU | 5% Curcumin | Sheshaan Global",
    h1Headline:
      "Turmeric Finger Exporter from India to Rotterdam & Europe | Salem & Sangli Double-Polished Bulk FCL",
    metaDescription:
      "EU-MRL compliant Turmeric Finger Exporter from India to Rotterdam, Netherlands (HS 09103020). Sangli & Salem 3.5%–5.5% curcumin, 27 MT/40ft FCL via Nhava Sheva JNPT / Mundra.",
  },
  {
    slug: "g9-banana-exporter-india-to-oman-sohar",
    productSlug: "cavendish-banana-exporter-india",
    regionSlug: "oman",
    targetPortLabel: "Sohar Port & Port of Salalah, Sultanate of Oman",
    targetBuyerSegment: "Mawaleh Central Fruit Market Importers & Ripening Chambers",
    seoTitle: "G9 Cavendish Banana Exporter India to Oman Sohar | Sheshaan Global",
    h1Headline:
      "G9 Cavendish Banana Exporter from India to Sohar & Muscat, Oman | 13.5kg Vacuum-Packed Reefer FCL",
    metaDescription:
      "APEDA-certified G9 Cavendish Banana Exporter from India to Sohar, Oman (HS 08039010). Solapur & Jalgaon Class-I hands, 20.8 MT (1,540 boxes) per 40ft HC Reefer via Nhava Sheva JNPT.",
  },
  {
    slug: "pomegranate-exporter-india-to-dubai-uae",
    productSlug: "fresh-pomegranate-exporter-india",
    regionSlug: "uae",
    targetPortLabel: "Jebel Ali Port (Dubai) & Dubai Air Cargo, UAE",
    targetBuyerSegment: "GCC Fresh Fruit Distributors & Retail Supermarket Chains",
    seoTitle: "Bhagwa Pomegranate Exporter India to Dubai UAE | Sheshaan Global",
    h1Headline:
      "Fresh Bhagwa Pomegranate Exporter from India to Dubai, UAE | Solapur & Nashik Super-Bhagwa Grade",
    metaDescription:
      "GlobalGAP & APEDA certified Bhagwa Pomegranate Exporter from India to Dubai, UAE (HS 08109010). 250g–350g+ ruby fruits in 3.5kg cartons via Nhava Sheva JNPT to Jebel Ali.",
  },
  {
    slug: "cashew-kernels-exporter-india-to-usa-new-york",
    productSlug: "raw-cashew-nuts-exporter-india",
    regionSlug: "usa",
    targetPortLabel: "Port of New York / Newark & Los Angeles, USA",
    targetBuyerSegment: "US Nut Roasters, Snack Brands & Confectionery Manufacturers",
    seoTitle: "Cashew Kernels W240 W320 Exporter India to USA | Sheshaan Global",
    h1Headline:
      "Whole White Cashew Kernels (W180/W240/W320) Exporter from India to USA | AFI Grade Vacuum Packs",
    metaDescription:
      "AFI-grade Indian Cashew Kernels Exporter to USA (HS 08013220). W180, W240 & W320 whole white kernels from Kollam & Mangalore, 16 MT/20ft FCL via Nhava Sheva JNPT / Cochin.",
  },
  {
    slug: "makhana-exporter-india-to-uk-felixstowe",
    productSlug: "fox-nuts-makhana-exporter-india",
    regionSlug: "uk",
    targetPortLabel: "Port of Felixstowe & London Gateway, United Kingdom",
    targetBuyerSegment: "UK Healthy Snack Brands, Superfood Importers & Private-Label Retailers",
    seoTitle: "Phool Makhana Fox Nuts Exporter India to UK | 5+ Suta | Sheshaan Global",
    h1Headline:
      "Mithila Phool Makhana (Fox Nuts) Exporter from India to UK | 5+ & 6+ Suta Handpicked Superfood Grade",
    metaDescription:
      "FSSAI & APEDA certified Phool Makhana (Fox Nuts) Exporter from Bihar, India to UK (HS 08109090). 16mm–22mm+ handpicked lava makhana shipped via Nhava Sheva JNPT.",
  },
  {
    slug: "refined-sugar-exporter-india-to-africa-durban",
    productSlug: "icumsa-refined-sugar-exporter-india",
    regionSlug: "south-africa",
    targetPortLabel: "Port of Durban & Cape Town (South Africa) / Mombasa (East Africa)",
    targetBuyerSegment: "African Commodity Trading Houses, Beverage Bottlers & Food Distributors",
    seoTitle: "ICUMSA 45 S30 Sugar Exporter India to Africa | 27 MT FCL | Sheshaan Global",
    h1Headline:
      "Indian ICUMSA 45 & S30 White Crystal Sugar Exporter to Africa | Maharashtra Mill-Direct 50kg PP Bags",
    metaDescription:
      "Bulk Indian Sugar Exporter to Africa (HS 17019990). ICUMSA 45, S30 & M30 white crystal sugar from Maharashtra mills, 27 MT/20ft heavy FCL via Nhava Sheva JNPT / Mundra.",
  },
];

export function getExportCorridorLaneBySlug(slug: string): DedicatedExportLane | undefined {
  return EXPORT_CORRIDOR_LANES.find((lane) => lane.slug === slug);
}
