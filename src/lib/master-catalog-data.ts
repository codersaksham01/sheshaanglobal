/**
 * MASTER COMMODITY & EXPORT SPECIFICATION CATALOGUE
 * Source: Official Trade Master Specification Dataset (APEDA, DGFT, AGMARK & Commercial Reference)
 * Sourced & Maintained for Sheshaan Global Institutional Export Operations
 */

export interface MasterCommoditySpec {
  id: number;
  sku: string;
  name: string;
  slug: string;
  category: string;
  hsCode: string;
  group: "grain" | "pulse" | "spice" | "vegetable" | "fruit" | "nut" | "other";
  productForm: string;
  exportGrades: string;
  varieties: string;
  coreSpecs: string;
  contractTargets: string;
  exportRegions: string;
  complianceNotes: string;
}

export interface WheatQualityItem {
  id: number;
  wheatClass: string;
  gradeType: string;
  intendedUse: string;
  testSpecs: string;
  standardTarget: string;
  marketScope: string;
  caution: string;
}

export interface GradeTerminologyItem {
  id: number;
  term: string;
  meaning: string;
  products: string;
  howToSpecify: string;
}

export interface ExportChecklistItem {
  id: number;
  area: string;
  confirmationPoint: string;
}

export interface OfficialSourceItem {
  id: number;
  source: string;
  url: string;
  whyConsult: string;
}

export interface TradeGuidelineItem {
  id: number;
  topic: string;
  note: string;
}

export const MASTER_COMMODITIES: MasterCommoditySpec[] = [
  {
    "id": 1,
    "sku": "SG-EXP-001",
    "name": "Wheat – milling / bread-making",
    "slug": "wheat",
    "category": "Cereals & Grains",
    "hsCode": "1001",
    "group": "grain",
    "productForm": "Common wheat; cleaned; food-grade",
    "exportGrades": "High-protein milling; standard milling; FAQ/merchantable quality (buyer-defined)",
    "varieties": "Lokwan; Sharbati (premium domestic trade name); HD-2967/DBW lines only when varietal identity is verified",
    "coreSpecs": "Moisture; protein; test weight/hectolitre weight; foreign matter; damaged/shrivelled grains; infestation; falling number/gluten where specified; pesticide residues; mycotoxins where relevant",
    "contractTargets": "Protein often contractually set around 11.5–13.5% for bread-making; moisture commonly max 12–13.5%; set exact limits with buyer and test method",
    "exportRegions": "Africa; Middle East; South Asia when policy and import conditions permit",
    "complianceNotes": "Export policy changes frequently; check current DGFT policy before any offer. Do not promise export availability based on domestic mandi stock."
  },
  {
    "id": 2,
    "sku": "SG-EXP-002",
    "name": "Durum wheat",
    "slug": "durum-wheat",
    "category": "Cereals & Grains",
    "hsCode": "1001",
    "group": "grain",
    "productForm": "Hard amber durum wheat for semolina/pasta",
    "exportGrades": "Food-grade durum; high vitreousness; milling grade",
    "varieties": "Durum varieties/lines such as HI-8498, HI-8759 or other verified varieties; availability depends on crop and supplier",
    "coreSpecs": "Protein; vitreous kernels; moisture; test weight; foreign matter; damaged kernels; black-point; falling number; pesticide residues",
    "contractTargets": "Protein, vitreousness and semolina yield are buyer-specific; require lab certificate and sample approval",
    "exportRegions": "Mediterranean, North Africa and other durum-importing markets where Indian origin is accepted",
    "complianceNotes": "Do not label common bread wheat as durum. Confirm species, variety and destination acceptance."
  },
  {
    "id": 3,
    "sku": "SG-EXP-003",
    "name": "Maize / corn",
    "slug": "maize-corn",
    "category": "Cereals & Grains",
    "hsCode": "1005",
    "group": "grain",
    "productForm": "Yellow maize for feed/industrial use; food-grade maize; seed maize is a separate regulated product",
    "exportGrades": "Yellow feed grade; food grade; flint corn; popcorn; broken/industrial grade only if permitted",
    "varieties": "Yellow maize; white maize; flint; popcorn (distinct product types)",
    "coreSpecs": "Moisture; foreign matter; broken kernels; damaged/discoloured grains; aflatoxin; fumonisin where requested; GMO status if applicable; test weight",
    "contractTargets": "Moisture commonly contracted around max 13–14%; mycotoxin limits are destination-specific",
    "exportRegions": "South Asia, Middle East, Southeast Asia and Africa, subject to economics and policy",
    "complianceNotes": "Confirm end use and import requirements; seed maize has separate certification rules."
  },
  {
    "id": 4,
    "sku": "SG-EXP-004",
    "name": "Basmati rice",
    "slug": "premium-rice",
    "category": "Cereals & Grains",
    "hsCode": "1006",
    "group": "grain",
    "productForm": "Aromatic long-grain rice; raw, steam, sella/parboiled; milled or brown",
    "exportGrades": "1121 Steam; 1121 Sella; 1121 Golden Sella; Traditional Basmati; Pusa Basmati; buyer-specific broken percentages",
    "varieties": "1121; 1509; 1718; 1401; Pusa Basmati 1; Traditional Basmati (only eligible notified varieties may be sold as Basmati)",
    "coreSpecs": "Average grain length; length/breadth ratio; broken; moisture; damaged/discoloured; chalky grains; foreign matter; aroma; pesticide residues; aging; cooked elongation",
    "contractTargets": "Commercial examples vary by SKU: moisture often max 12–13%; broken typically 1–5% for premium grades; agree exact spec and variety",
    "exportRegions": "Saudi Arabia, Iran, Iraq, UAE, Yemen, USA and other markets",
    "complianceNotes": "Basmati eligibility, contract registration and destination-specific procedures must be checked with APEDA/DGFT. Never mislabel non-eligible varieties."
  },
  {
    "id": 5,
    "sku": "SG-EXP-005",
    "name": "Non-Basmati rice",
    "slug": "non-basmati-rice",
    "category": "Cereals & Grains",
    "hsCode": "1006",
    "group": "grain",
    "productForm": "Milled white rice, parboiled/sella, raw, brown or broken rice",
    "exportGrades": "5% broken; 10% broken; 25% broken; 100% broken; parboiled; raw white; brown rice",
    "varieties": "IR64; PR11/PR14; Swarna; Sona Masoori; Ponni; long-grain and medium-grain types (confirm variety and origin)",
    "coreSpecs": "Broken percentage; moisture; chalky/damaged grains; foreign matter; milling degree; grain length; yellow grains; infestation; pesticide residues; microbiology if required",
    "contractTargets": "Moisture often max 13–14%; broken percentage and grain dimensions must be specified by contract",
    "exportRegions": "West Africa, Middle East, South Asia and other destinations depending on variety and current policy",
    "complianceNotes": "Rice export policy, RCAC/contract registration, phytosanitary and destination requirements can change. Verify before quoting."
  },
  {
    "id": 6,
    "sku": "SG-EXP-006",
    "name": "Millets",
    "slug": "millets",
    "category": "Cereals & Grains",
    "hsCode": "1008",
    "group": "grain",
    "productForm": "Whole grains; cleaned; food-grade; flour as separate product",
    "exportGrades": "Food-grade; organic only with valid certification; cleaned/sorted",
    "varieties": "Pearl millet/bajra; finger millet/ragi; sorghum/jowar; foxtail millet; little millet; kodo millet; barnyard millet",
    "coreSpecs": "Moisture; foreign matter; grain size; damaged grains; infestation; pesticide residues; microbiology; organic traceability if claimed",
    "contractTargets": "Set grain-specific moisture and purity limits with buyer; no single universal export grade",
    "exportRegions": "North America, Europe, Middle East and Asia; buyer and product dependent",
    "complianceNotes": "Clarify species, intended use, packaging and whether whole grain or flour."
  },
  {
    "id": 7,
    "sku": "SG-EXP-007",
    "name": "Sorghum / jowar",
    "slug": "sorghum-jowar",
    "category": "Cereals & Grains",
    "hsCode": "1007",
    "group": "grain",
    "productForm": "Food-grade or feed-grade whole grain",
    "exportGrades": "White food-grade; red/other colour types; feed grade",
    "varieties": "White jowar; red jowar; other locally available types",
    "coreSpecs": "Moisture; foreign matter; tannin/colour where relevant; damaged grains; infestation; residues",
    "contractTargets": "Buyer-specific moisture, purity and tannin requirements",
    "exportRegions": "Middle East, Africa and specialist food/feed markets",
    "complianceNotes": "Do not interchange food and feed specifications."
  },
  {
    "id": 8,
    "sku": "SG-EXP-008",
    "name": "Wheat flour / atta / maida / semolina",
    "slug": "wheat-flour-atta-maida",
    "category": "Milled Products",
    "hsCode": "1101",
    "group": "grain",
    "productForm": "Milled product, packed or bulk",
    "exportGrades": "Maida/refined wheat flour; atta/whole-wheat flour; sooji/rava/semolina; durum semolina",
    "varieties": "Product-specific extraction rate and granulation",
    "coreSpecs": "Moisture; ash; protein; gluten; granulation; colour; microbiology; infestation; fortification/labelling requirements",
    "contractTargets": "Set by product and destination regulation; define mesh/granulation and shelf life",
    "exportRegions": "USA, UAE, UK, Canada, Australia and other markets",
    "complianceNotes": "Food labelling, fortification rules, allergens and shelf-life documentation may apply."
  },
  {
    "id": 9,
    "sku": "SG-EXP-009",
    "name": "Kabuli chickpeas",
    "slug": "chickpeas",
    "category": "Pulses & Lentils",
    "hsCode": "0713",
    "group": "pulse",
    "productForm": "Whole chickpeas; cleaned/sorted",
    "exportGrades": "Large calibre; medium calibre; small calibre; machine-cleaned/Sortex",
    "varieties": "Kabuli types commonly traded by count/size; exact variety must be confirmed",
    "coreSpecs": "Count per 100 g or mm calibre; moisture; foreign matter; broken; damaged/discoloured; infestation; residues",
    "contractTargets": "Size/count ranges are buyer-defined; moisture commonly max 12–14% depending contract",
    "exportRegions": "Middle East, Mediterranean, North Africa and South Asia",
    "complianceNotes": "Quote size/count and crop year, not just 'premium'."
  },
  {
    "id": 10,
    "sku": "SG-EXP-010",
    "name": "Desi chickpeas / chana",
    "slug": "desi-chana",
    "category": "Pulses & Lentils",
    "hsCode": "0713",
    "group": "pulse",
    "productForm": "Whole desi gram; split chana dal is a separate SKU",
    "exportGrades": "Bold; medium; small; milling grade; dal grade",
    "varieties": "Desi chana; Annagiri and regional market varieties (verify actual lot)",
    "coreSpecs": "Moisture; size; foreign matter; broken; damaged; infestation; colour; residues",
    "contractTargets": "Set limits by whole grain vs dal and destination",
    "exportRegions": "South Asia, Middle East and other pulse markets",
    "complianceNotes": "Do not mix whole chana specifications with split dal."
  },
  {
    "id": 11,
    "sku": "SG-EXP-011",
    "name": "Green peas / yellow peas",
    "slug": "peas-green-yellow",
    "category": "Pulses & Lentils",
    "hsCode": "0713",
    "group": "pulse",
    "productForm": "Dried whole peas; split peas as separate product",
    "exportGrades": "Food grade; milling grade; split grade",
    "varieties": "Green peas; yellow peas",
    "coreSpecs": "Moisture; foreign matter; size; broken; colour; infestation; residues",
    "contractTargets": "Buyer-specific; moisture and broken percentages should be stated",
    "exportRegions": "South Asia, Middle East, Africa and other pulse-importing markets",
    "complianceNotes": "Confirm botanical type and import tariff classification."
  },
  {
    "id": 12,
    "sku": "SG-EXP-012",
    "name": "Kidney beans / rajma",
    "slug": "kidney-beans-rajma",
    "category": "Pulses & Lentils",
    "hsCode": "0713",
    "group": "pulse",
    "productForm": "Dried whole beans",
    "exportGrades": "Light-speckled; dark red; red kidney; white kidney/cannellini-type only when identity is confirmed",
    "varieties": "Jammu/Rajma types; red kidney bean; white kidney bean",
    "coreSpecs": "Moisture; size; colour; foreign matter; broken; insect damage; cooking quality if requested; residues",
    "contractTargets": "Set size, colour tolerance and moisture by buyer",
    "exportRegions": "Middle East, Europe, North America and Asia depending variety",
    "complianceNotes": "Variety and origin strongly affect price and buyer acceptance."
  },
  {
    "id": 13,
    "sku": "SG-EXP-013",
    "name": "Lobia / cowpea",
    "slug": "lobia-cowpea",
    "category": "Pulses & Lentils",
    "hsCode": "0713",
    "group": "pulse",
    "productForm": "Whole dried cowpeas",
    "exportGrades": "White with black eye; red/brown cowpea; other regional types",
    "varieties": "Black-eyed pea / cowpea types",
    "coreSpecs": "Moisture; size; colour; foreign matter; broken; infestation; residues",
    "contractTargets": "Buyer-defined size and colour; specify whole or processed",
    "exportRegions": "Africa, Middle East and Asia",
    "complianceNotes": "Use exact botanical name and local import classification."
  },
  {
    "id": 14,
    "sku": "SG-EXP-014",
    "name": "Turmeric",
    "slug": "turmeric",
    "category": "Spices",
    "hsCode": "0910",
    "group": "spice",
    "productForm": "Dried fingers/bulbs; polished/unpolished; powder as separate product",
    "exportGrades": "Finger grades; polished; unpolished; powder; curcumin-specific lots",
    "varieties": "Salem; Erode; Nizamabad and other regional types; Alleppey-type high-curcumin lots where verified",
    "coreSpecs": "Curcumin %; moisture; lead/chromate adulteration checks; foreign matter; mould; pesticide residues; microbiology; colour",
    "contractTargets": "Curcumin target and moisture are contract-specific; request accredited lab results",
    "exportRegions": "Middle East, Bangladesh, USA, Europe and Southeast Asia",
    "complianceNotes": "Destination residue limits and adulterant controls are critical."
  },
  {
    "id": 15,
    "sku": "SG-EXP-015",
    "name": "Chilli / red chilli",
    "slug": "dried-red-chillies",
    "category": "Spices",
    "hsCode": "0904",
    "group": "spice",
    "productForm": "Whole dried red chillies; stemless; crushed/powder separate",
    "exportGrades": "With-stem; stemless; low-heat/high-colour; powder",
    "varieties": "Teja/S17; Byadgi; Guntur types; Kashmiri-type colour lots (variety/origin must be confirmed)",
    "coreSpecs": "ASTA colour; pungency/SHU; moisture; aflatoxin; pesticide residues; Sudan dyes; foreign matter; microbiology",
    "contractTargets": "Colour and pungency are buyer-defined; moisture often contracted at max 10–12%",
    "exportRegions": "Southeast Asia, Middle East, Europe and North America",
    "complianceNotes": "Residues, prohibited dyes and aflatoxin may trigger rejection; test before shipment."
  },
  {
    "id": 16,
    "sku": "SG-EXP-016",
    "name": "Coriander seeds",
    "slug": "coriander",
    "category": "Spices",
    "hsCode": "0909",
    "group": "spice",
    "productForm": "Whole dried coriander; split/crushed/powder as separate SKU",
    "exportGrades": "Eagle; Scooter; Badami; machine-cleaned/Sortex; export-cleaned",
    "varieties": "Eagle, Badami, Scooter are common trade descriptions; verify actual physical parameters",
    "coreSpecs": "Purity; moisture; volatile oil if required; foreign matter; insect damage; pesticide residues; microbiology",
    "contractTargets": "Purity and moisture should be numeric in contract; buyer may request volatile oil content",
    "exportRegions": "UAE/GCC, Europe, North Africa and Southeast Asia",
    "complianceNotes": "Trade names vary by supplier; attach sample and COA."
  },
  {
    "id": 17,
    "sku": "SG-EXP-017",
    "name": "Fennel seeds",
    "slug": "fennel-seeds",
    "category": "Spices",
    "hsCode": "0909",
    "group": "spice",
    "productForm": "Whole dried fennel",
    "exportGrades": "Green; bold; machine-cleaned; export-cleaned",
    "varieties": "Green fennel; bold fennel; regional types",
    "coreSpecs": "Colour; aroma; moisture; foreign matter; volatile oil; pesticide residues; microbiology",
    "contractTargets": "Buyer-specific; define colour, purity and moisture",
    "exportRegions": "Middle East, Europe and Asia",
    "complianceNotes": "Confirm food-safety and residue requirements."
  },
  {
    "id": 18,
    "sku": "SG-EXP-018",
    "name": "Fenugreek seeds",
    "slug": "fenugreek",
    "category": "Spices",
    "hsCode": "0910",
    "group": "spice",
    "productForm": "Whole dried methi seeds; powder separate",
    "exportGrades": "Machine-cleaned; bold; FAQ/export-cleaned",
    "varieties": "Fenugreek/methi; regional grades",
    "coreSpecs": "Moisture; purity; foreign matter; colour; insect damage; pesticide residues; microbiology",
    "contractTargets": "Buyer-specific purity and moisture limits",
    "exportRegions": "Middle East, Europe and Asia",
    "complianceNotes": "Check destination rules for spice imports."
  },
  {
    "id": 19,
    "sku": "SG-EXP-019",
    "name": "Black pepper",
    "slug": "black-pepper",
    "category": "Spices",
    "hsCode": "0904",
    "group": "spice",
    "productForm": "Whole dried peppercorns",
    "exportGrades": "FAQ; MG1; TGEB or other trade grades where used by supplier; garbled/ungarbled",
    "varieties": "Malabar/other Indian origins; grade terminology must be supplier-confirmed",
    "coreSpecs": "Bulk density; moisture; light berries; pinheads; foreign matter; piperine/volatile oil if requested; Salmonella; residues",
    "contractTargets": "Moisture often max 12–13%; density/defect limits depend on grade",
    "exportRegions": "Europe, USA, Middle East and Asia",
    "complianceNotes": "Use the buyer's named standard; do not assume all grade labels mean the same thing."
  },
  {
    "id": 20,
    "sku": "SG-EXP-020",
    "name": "Cardamom",
    "slug": "cardamom",
    "category": "Spices",
    "hsCode": "0908",
    "group": "spice",
    "productForm": "Whole green cardamom pods",
    "exportGrades": "8 mm+, 7–8 mm, 6–7 mm; bold/extra bold",
    "varieties": "Small green cardamom; size grades by mm",
    "coreSpecs": "Pod size; colour; moisture; splits; empty pods; mould; residues; microbiology",
    "contractTargets": "Size and moisture set by buyer; maintain colour and aroma",
    "exportRegions": "Middle East, Europe and Asia",
    "complianceNotes": "Grade by sieve size and condition, not vague 'super quality'."
  },
  {
    "id": 21,
    "sku": "SG-EXP-021",
    "name": "Dry ginger",
    "slug": "ginger",
    "category": "Spices",
    "hsCode": "0910",
    "group": "spice",
    "productForm": "Dried whole ginger / splits; powder separate",
    "exportGrades": "Bleached/unbleached; scraped/un-scraped; whole/split",
    "varieties": "Cochin/Calicut trade types where verified",
    "coreSpecs": "Moisture; volatile oil; fibre; ash; foreign matter; mould; pesticide residues; microbiology",
    "contractTargets": "Buyer-specific moisture and volatile-oil levels",
    "exportRegions": "Middle East, Europe and North America",
    "complianceNotes": "Clarify processing treatment and any sulphite/residue declarations."
  },
  {
    "id": 22,
    "sku": "SG-EXP-022",
    "name": "Castor seed",
    "slug": "castor-seed",
    "category": "Oilseeds",
    "hsCode": "1207",
    "group": "other",
    "productForm": "Industrial oilseed for crushing",
    "exportGrades": "FAQ/industrial grade; export-cleaned",
    "varieties": "Regional lots; varietal identity only if verified",
    "coreSpecs": "Moisture; oil content; foreign matter; damaged seeds; acid value of extracted oil if required",
    "contractTargets": "Industrial buyer-specific parameters",
    "exportRegions": "Industrial markets including East Asia and Europe, subject to trade requirements",
    "complianceNotes": "Not a food-grade product unless specifically processed and certified for a lawful use."
  },
  {
    "id": 23,
    "sku": "SG-EXP-023",
    "name": "Linseed / flaxseed",
    "slug": "flaxseed-linseed",
    "category": "Oilseeds",
    "hsCode": "1204",
    "group": "other",
    "productForm": "Food-grade or industrial seed",
    "exportGrades": "Brown flaxseed; golden flaxseed; food-grade cleaned",
    "varieties": "Brown; golden",
    "coreSpecs": "Moisture; purity; oil content; foreign matter; rancidity; residues; microbiology; pesticide residues",
    "contractTargets": "Food-grade specs differ from industrial seed; specify end use",
    "exportRegions": "Europe, North America, Middle East and Asia",
    "complianceNotes": "Food claims and omega-3 claims need evidence; check destination rules."
  },
  {
    "id": 24,
    "sku": "SG-EXP-024",
    "name": "Sunflower seed",
    "slug": "sunflower-seed",
    "category": "Oilseeds",
    "hsCode": "1206",
    "group": "other",
    "productForm": "Food-grade kernels or oilseed for crushing",
    "exportGrades": "Confectionery kernel; oil-crushing grade; hulled kernels",
    "varieties": "Striped confectionery; black oilseed types",
    "coreSpecs": "Moisture; size; oil content; foreign matter; damaged kernels; aflatoxin/residues if relevant",
    "contractTargets": "Buyer-specific size and oil parameters",
    "exportRegions": "Middle East, Europe and Asia depending product and price",
    "complianceNotes": "Distinguish edible kernels from crushing-grade seed."
  },
  {
    "id": 25,
    "sku": "SG-EXP-025",
    "name": "Safflower seed",
    "slug": "safflower-seed",
    "category": "Oilseeds",
    "hsCode": "1207",
    "group": "other",
    "productForm": "Oilseed for crushing; food use only where suitable",
    "exportGrades": "Oilseed grade; cleaned grade",
    "varieties": "Regional types; confirm variety",
    "coreSpecs": "Moisture; oil content; foreign matter; damaged seeds; residues",
    "contractTargets": "Buyer-specific",
    "exportRegions": "Niche industrial and food markets",
    "complianceNotes": "Confirm buyer use and applicable import classification."
  },
  {
    "id": 26,
    "sku": "SG-EXP-026",
    "name": "Mustard / rapeseed",
    "slug": "mustard",
    "category": "Oilseeds",
    "hsCode": "1207",
    "group": "other",
    "productForm": "Whole seed for crushing or condiment use",
    "exportGrades": "Food/condiment grade; crushing grade; cleaned/export grade",
    "varieties": "Rai; Raido; black/brown/yellow mustard types as applicable",
    "coreSpecs": "Moisture; oil content; foreign matter; admixture; seed type; residues; erucic acid profile where relevant",
    "contractTargets": "Set by seed species and end use",
    "exportRegions": "Asia, Middle East and industrial markets where accepted",
    "complianceNotes": "Do not merge regional terms without confirming species and intended use."
  },
  {
    "id": 27,
    "sku": "SG-EXP-027",
    "name": "Copra",
    "slug": "copra",
    "category": "Oilseeds",
    "hsCode": "1203",
    "group": "other",
    "productForm": "Dried coconut kernel for oil extraction",
    "exportGrades": "FAQ; milling grade; edible grade only if suitable",
    "varieties": "Milling copra; edible copra",
    "coreSpecs": "Moisture; oil content; mould; free fatty acids; foreign matter; aflatoxin where applicable",
    "contractTargets": "Moisture and FFA must be contracted",
    "exportRegions": "South Asia, Southeast Asia and oil-processing markets",
    "complianceNotes": "Check food safety and intended end use."
  },
  {
    "id": 28,
    "sku": "SG-EXP-028",
    "name": "Niger seed",
    "slug": "niger-seed",
    "category": "Oilseeds",
    "hsCode": "1207",
    "group": "other",
    "productForm": "Oilseed; bird-feed grade where specified",
    "exportGrades": "Cleaned oilseed; bird-feed grade",
    "varieties": "Niger seed / ramtil",
    "coreSpecs": "Purity; moisture; foreign matter; oil content if requested; residues",
    "contractTargets": "Buyer-specific",
    "exportRegions": "Specialty markets, bird feed and oil-processing markets",
    "complianceNotes": "Clearly state intended use and contaminants limits."
  },
  {
    "id": 29,
    "sku": "SG-EXP-029",
    "name": "Groundnut / peanut kernels",
    "slug": "peanuts",
    "category": "Oilseeds",
    "hsCode": "1202",
    "group": "nut",
    "productForm": "Raw kernels, in-shell, blanched or processed; each is a separate SKU",
    "exportGrades": "Java; Bold; 40/50, 50/60, 60/70 counts per ounce; splits; blanched; in-shell",
    "varieties": "Groundnut market types may include Java, Bold and Spanish-type; Minaxi/Girnar/G20/market numbers are local trade descriptors and need mapping",
    "coreSpecs": "Kernel count; moisture; foreign matter; damaged/discoloured; aflatoxin; pesticide residues; Salmonella; rancidity; crop year",
    "contractTargets": "Moisture often max 7–9% for kernels depending contract; aflatoxin limits are destination-specific",
    "exportRegions": "Southeast Asia, Middle East, Europe and other peanut markets",
    "complianceNotes": "Aflatoxin and microbiological testing are essential; APEDA has specific export procedures."
  },
  {
    "id": 30,
    "sku": "SG-EXP-030",
    "name": "Sesame seed",
    "slug": "sesame-seed",
    "category": "Oilseeds",
    "hsCode": "1207",
    "group": "other",
    "productForm": "Natural white, black or mixed sesame; hulled/unhulled",
    "exportGrades": "99.95%; 99.uj? (avoid undefined labels); 99.90%; 99.5%; 98% purity; hulled; roasted only if processed",
    "varieties": "White sesame; black sesame; brown sesame; hulled sesame",
    "coreSpecs": "Purity; moisture; foreign matter; oil content if requested; Salmonella; pesticide residues; colour; crop year",
    "contractTargets": "Purity figures must be based on agreed method; microbiological requirements destination-specific",
    "exportRegions": "Middle East, Europe, Japan, South Korea and other Asian markets",
    "complianceNotes": "Use accurate purity labels and accredited test reports; do not promise zero Salmonella without evidence."
  },
  {
    "id": 31,
    "sku": "SG-EXP-031",
    "name": "Soybean",
    "slug": "soyabean",
    "category": "Oilseeds",
    "hsCode": "1201",
    "group": "grain",
    "productForm": "Food-grade, feed-grade or crushing-grade beans",
    "exportGrades": "Non-GMO only when verified; food grade; crushing grade",
    "varieties": "Yellow soybean; other colours/types; variety only when traceable",
    "coreSpecs": "Moisture; protein; oil; foreign matter; damaged/split beans; GMO status; pesticide residues; crop year",
    "contractTargets": "Protein/oil and moisture targets vary by use and contract",
    "exportRegions": "Asia and industrial markets subject to trade policy and GMO rules",
    "complianceNotes": "Verify GMO claims and current export policy."
  },
  {
    "id": 32,
    "sku": "SG-EXP-032",
    "name": "Dehydrated onion",
    "slug": "dehydrated-onion-garlic",
    "category": "Processed Agricultural Products",
    "hsCode": "0712",
    "group": "vegetable",
    "productForm": "Flakes, kibbled, minced, granules, powder",
    "exportGrades": "White/onion flakes; toasted only if specified; different mesh sizes",
    "varieties": "Flakes; kibbled; minced; granules; powder",
    "coreSpecs": "Moisture; colour; pungency; mesh size; microbiology; sulphur dioxide if used; pesticide residues; foreign matter",
    "contractTargets": "Moisture and microbiological limits contract-specific",
    "exportRegions": "USA, Europe, Middle East and Asia",
    "complianceNotes": "Declare processing aids/additives and validate shelf life."
  },
  {
    "id": 33,
    "sku": "SG-EXP-033",
    "name": "Dehydrated garlic",
    "slug": "dehydrated-garlic",
    "category": "Processed Agricultural Products",
    "hsCode": "0712",
    "group": "vegetable",
    "productForm": "Flakes, granules, powder",
    "exportGrades": "Different mesh sizes; toasted or untreated as specified",
    "varieties": "Flakes; granules; powder",
    "coreSpecs": "Moisture; colour; pungency; microbiology; sulphur dioxide if used; residues",
    "contractTargets": "Buyer-specific",
    "exportRegions": "USA, Europe, Middle East and Asia",
    "complianceNotes": "Confirm additive declarations and microbiological specifications."
  },
  {
    "id": 34,
    "sku": "SG-EXP-034",
    "name": "Mango pulp / puree",
    "slug": "mango-pulp-puree",
    "category": "Processed Agricultural Products",
    "hsCode": "2007",
    "group": "fruit",
    "productForm": "Aseptic or frozen pulp",
    "exportGrades": "Alphonso; Totapuri; Kesar pulp",
    "varieties": "Variety and °Brix specified by SKU",
    "coreSpecs": "Brix; acidity; colour; flavour; pulp content; microbiology; pesticide residues; packaging integrity",
    "contractTargets": "°Brix and acidity depend on variety and product",
    "exportRegions": "Middle East, North America, Europe and Asia",
    "complianceNotes": "Processed-food registration, labelling and destination rules apply."
  },
  {
    "id": 35,
    "sku": "SG-EXP-035",
    "name": "Cashew kernels",
    "slug": "cashew",
    "category": "Processed Agricultural Products",
    "hsCode": "0801",
    "group": "nut",
    "productForm": "Edible cashew kernels",
    "exportGrades": "W180; W210; W240; W320; W450; splits; pieces; scorched grades where permitted",
    "varieties": "White wholes; scorched wholes; splits; butts; pieces",
    "coreSpecs": "Count per pound; moisture; defects; colour; foreign matter; infestation; microbiology; aflatoxin where applicable",
    "contractTargets": "W grades are count-based commercial grades; confirm standard and defect tolerances",
    "exportRegions": "USA, UAE, Europe, China and other markets",
    "complianceNotes": "Use recognised kernel grading and food-safety documentation."
  },
  {
    "id": 36,
    "sku": "SG-EXP-036",
    "name": "Indian sugar",
    "slug": "sugar",
    "category": "Processed Agricultural Products",
    "hsCode": "1701",
    "group": "other",
    "productForm": "Raw or refined sugar; product type and policy dependent",
    "exportGrades": "ICUMSA 45 refined; plantation white; raw sugar; crystal size as contracted",
    "varieties": "Refined white; plantation white; raw",
    "coreSpecs": "ICUMSA colour; polarization; moisture; ash; reducing sugars; grain size; microbiology where relevant",
    "contractTargets": "ICUMSA and polarization targets must be specified by contract",
    "exportRegions": "Asia, Africa and Middle East depending market access",
    "complianceNotes": "Check current export quotas/restrictions and product-specific policy."
  },
  {
    "id": 37,
    "sku": "SG-EXP-037",
    "name": "Onion",
    "slug": "fresh-onions",
    "category": "Fresh Produce",
    "hsCode": "0703",
    "group": "vegetable",
    "productForm": "Fresh whole bulbs; ventilated export packing",
    "exportGrades": "Red onion; white onion; medium/large size grades; export grade",
    "varieties": "Nashik red/onion types and other varieties subject to origin and season",
    "coreSpecs": "Bulb diameter; maturity; neck dryness; firmness; sprouting; rot; damage; pesticide residues; phytosanitary requirements",
    "contractTargets": "Size, defects and residue limits destination-specific",
    "exportRegions": "Bangladesh, Gulf, Southeast Asia and other markets depending policy",
    "complianceNotes": "Onion export policy/minimum export price or restrictions can change; verify current DGFT notices."
  },
  {
    "id": 38,
    "sku": "SG-EXP-038",
    "name": "Fresh green chilli",
    "slug": "green-chillies",
    "category": "Fresh Produce",
    "hsCode": "0709",
    "group": "vegetable",
    "productForm": "Fresh green chilli, chilled export packing",
    "exportGrades": "Size/colour/heat grade; export-cleaned; residue-compliant",
    "varieties": "G4 and other commercial types only when verified",
    "coreSpecs": "Pesticide residue panel; size; colour; damage; decay; maturity; microbiology where required; cold chain",
    "contractTargets": "Destination-specific MRLs and appearance specifications",
    "exportRegions": "Gulf, UK/EU and other markets where residue and phytosanitary rules are met",
    "complianceNotes": "APEDA destination-specific pesticide monitoring procedures may apply."
  },
  {
    "id": 39,
    "sku": "SG-EXP-039",
    "name": "Garlic",
    "slug": "garlic",
    "category": "Fresh Produce",
    "hsCode": "0703",
    "group": "vegetable",
    "productForm": "Fresh bulbs or peeled cloves",
    "exportGrades": "Bold/medium; size-calibrated; white/purple types",
    "varieties": "Regional varieties; define size and skin colour",
    "coreSpecs": "Bulb diameter; cloves per bulb; moisture/curing; sprouting; mould; damage; residues; phytosanitary compliance",
    "contractTargets": "Size and defect tolerances by buyer",
    "exportRegions": "Gulf, Southeast Asia and other markets",
    "complianceNotes": "Specify cured fresh garlic versus dehydrated garlic."
  },
  {
    "id": 40,
    "sku": "SG-EXP-040",
    "name": "Potato",
    "slug": "potatoes",
    "category": "Fresh Produce",
    "hsCode": "0701",
    "group": "vegetable",
    "productForm": "Fresh table, processing or seed potato",
    "exportGrades": "Table grade; processing grade; seed potato (separate certification)",
    "varieties": "Processing/table varieties such as Kufri types; exact variety verified",
    "coreSpecs": "Size; dry matter; reducing sugars for processing; greening; sprouting; bruising; defects; residues; phytosanitary requirements",
    "contractTargets": "Processing specs vary by chip/fry use; seed potatoes require separate standards",
    "exportRegions": "South Asia, Gulf and selected markets depending season and policy",
    "complianceNotes": "Do not treat seed potatoes as standard table potatoes."
  },
  {
    "id": 41,
    "sku": "SG-EXP-041",
    "name": "Mango",
    "slug": "mango",
    "category": "Fresh Produce",
    "hsCode": "0804",
    "group": "fruit",
    "productForm": "Fresh mangoes; air/sea shipment",
    "exportGrades": "Export size grades; hot-water-treated or other approved treatment where required",
    "varieties": "Alphonso; Kesar; Banganapalli; Totapuri; Dasheri; Langra (season/origin dependent)",
    "coreSpecs": "Size/weight; maturity; colour; residue limits; pest-free condition; treatment; packhouse and traceability requirements",
    "contractTargets": "Destination-specific size, treatment and residue standards",
    "exportRegions": "Gulf, UK/EU, North America and Asia depending protocol",
    "complianceNotes": "Approved treatment, packhouse, traceability and market-specific protocols may be mandatory."
  },
  {
    "id": 42,
    "sku": "SG-EXP-042",
    "name": "Grapes",
    "slug": "grapes",
    "category": "Fresh Produce",
    "hsCode": "0806",
    "group": "fruit",
    "productForm": "Fresh table grapes",
    "exportGrades": "Berry size; bunch weight; colour; seedless/seeded; export grade",
    "varieties": "Thompson Seedless and other verified varieties",
    "coreSpecs": "Brix; berry size; bunch condition; decay; pesticide residues; cold chain; packhouse/traceability",
    "contractTargets": "Destination-specific MRLs, size and quality limits",
    "exportRegions": "Europe, UK, Middle East and other markets",
    "complianceNotes": "EU-bound grapes require compliance with current APEDA monitoring/procedure."
  },
  {
    "id": 43,
    "sku": "SG-EXP-043",
    "name": "Pomegranate",
    "slug": "pomegranate",
    "category": "Fresh Produce",
    "hsCode": "0810",
    "group": "fruit",
    "productForm": "Fresh whole fruit",
    "exportGrades": "Size/weight grades; export grade; aril colour/type",
    "varieties": "Bhagwa and other verified varieties",
    "coreSpecs": "Fruit size; colour; rind defects; cracking; decay; residues; phytosanitary and traceability",
    "contractTargets": "Buyer-specific size and defect tolerances",
    "exportRegions": "Middle East, Europe and Asia",
    "complianceNotes": "Destination treatment and residue protocols must be checked."
  },
  {
    "id": 44,
    "sku": "SG-EXP-044",
    "name": "Banana",
    "slug": "g9-banana",
    "category": "Fresh Produce",
    "hsCode": "0803",
    "group": "fruit",
    "productForm": "Fresh green banana; controlled-ripening supply chain",
    "exportGrades": "Size/length/hand-count grades; export grade",
    "varieties": "Grand Naine and other verified commercial varieties",
    "coreSpecs": "Finger length/girth; maturity; defects; latex stains; residues; phytosanitary; temperature control",
    "contractTargets": "Buyer-specific sizing and maturity standards",
    "exportRegions": "Middle East, Europe and Asia",
    "complianceNotes": "Cold chain and ripening requirements are important."
  },
  {
    "id": 45,
    "sku": "SG-EXP-045",
    "name": "Okra / bhindi",
    "slug": "okra-drumsticks",
    "category": "Fresh Produce",
    "hsCode": "0709",
    "group": "vegetable",
    "productForm": "Fresh green pods",
    "exportGrades": "Tender export grade; size-calibrated",
    "varieties": "Regional varieties; specify pod length and colour",
    "coreSpecs": "Pesticide residues; pod length; tenderness; colour; damage; decay; phytosanitary requirements",
    "contractTargets": "Destination MRL and size limits",
    "exportRegions": "Gulf, UK/EU and other markets where compliant",
    "complianceNotes": "Destination-specific residue testing may be required."
  },
  {
    "id": 46,
    "sku": "SG-EXP-046",
    "name": "Drumstick / moringa pods",
    "slug": "drumstick-moringa",
    "category": "Fresh Produce",
    "hsCode": "0709",
    "group": "vegetable",
    "productForm": "Fresh pods",
    "exportGrades": "Length/diameter grades; tender export grade",
    "varieties": "Moringa oleifera varieties",
    "coreSpecs": "Length; tenderness; fibre; damage; residues; phytosanitary compliance",
    "contractTargets": "Buyer-defined",
    "exportRegions": "Gulf, UK/EU and other markets where compliant",
    "complianceNotes": "Check current APEDA destination-specific residue testing requirements."
  },
  {
    "id": 47,
    "sku": "SG-EXP-047",
    "name": "Guar gum",
    "slug": "guar-gum",
    "category": "Other Agricultural Products",
    "hsCode": "1301",
    "group": "other",
    "productForm": "Food/industrial grade powder",
    "exportGrades": "Food grade; industrial grade; viscosity grades",
    "varieties": "Different viscosity and mesh grades",
    "coreSpecs": "Viscosity; mesh size; moisture; ash; protein; microbiology; heavy metals; additives",
    "contractTargets": "Viscosity (cP) and mesh must be stated by grade",
    "exportRegions": "USA, Europe, China, Middle East and industrial markets",
    "complianceNotes": "Food-grade and industrial grades have different requirements."
  },
  {
    "id": 48,
    "sku": "SG-EXP-048",
    "name": "Isabgol / psyllium husk",
    "slug": "psyllium-husk-isabgol",
    "category": "Other Agricultural Products",
    "hsCode": "1211",
    "group": "other",
    "productForm": "Whole seed, husk, powder",
    "exportGrades": "Husk 95/98/99%; seed; powder; mesh grades",
    "varieties": "Psyllium husk and seed",
    "coreSpecs": "Purity; swelling index; moisture; ash; foreign matter; microbiology; pesticide residues; heavy metals",
    "contractTargets": "Purity and swelling index are contract-specific",
    "exportRegions": "USA, Europe, Middle East and Asia",
    "complianceNotes": "Health/functional claims and food-supplement regulations vary by destination."
  },
  {
    "id": 49,
    "sku": "SG-EXP-049",
    "name": "Organic agricultural commodities",
    "slug": "organic-agri-commodities",
    "category": "Other Agricultural Products",
    "hsCode": "07-12",
    "group": "other",
    "productForm": "Certified organic versions of eligible products",
    "exportGrades": "Organic; conventional must be separate and traceable",
    "varieties": "Commodity-specific; no variety implied by organic status",
    "coreSpecs": "Valid certification; traceability; segregation; residue testing; transaction certificates where required",
    "contractTargets": "Certification scheme must be accepted in destination market",
    "exportRegions": "Europe, USA, Middle East and other markets",
    "complianceNotes": "Never label a product organic without valid certification and chain-of-custody evidence."
  },
  {
    "id": 50,
    "sku": "SG-EXP-050",
    "name": "Cloves (Laung)",
    "slug": "cloves",
    "category": "Spices & Condiments",
    "hsCode": "0907",
    "group": "spice",
    "productForm": "Whole dried flower buds with intact heads; clove powder",
    "exportGrades": "Handpicked Bold; FAQ Grade; Madagascar/Zanzibar standard",
    "varieties": "South Indian / Kerala origin; handpicked whole cloves",
    "coreSpecs": "Moisture (max 12%); volatile oil content (min 15-18%); headless cloves limit; foreign matter (max 0.5%); ETO-free",
    "contractTargets": "Min 17% essential oil; moisture max 11%; headless cloves max 2%",
    "exportRegions": "Middle East, Europe, USA, Southeast Asia",
    "complianceNotes": "Steam sterilized, pesticide residue compliant with EU MRL standards."
  },
  {
    "id": 51,
    "sku": "SG-EXP-051",
    "name": "Cinnamon (Dalchini)",
    "slug": "cinnamon",
    "category": "Spices & Condiments",
    "hsCode": "0906",
    "group": "spice",
    "productForm": "Dried inner bark rolls / quills; cut sticks; cinnamon powder",
    "exportGrades": "Cassia Quills 8cm-10cm; Ceylon Alba / C5 Special; Split",
    "varieties": "Cinnamomum verum (Ceylon type); Cassia aromatic quills",
    "coreSpecs": "Moisture (max 12%); volatile oil (min 1.0-2.5%); coumarin levels; ash content; microbial limits",
    "contractTargets": "Volatile oil min 1.5%; moisture max 12%; coumarin verified for EU food use",
    "exportRegions": "Middle East, Europe, UK, North America",
    "complianceNotes": "Coumarin content verified by GC-MS for European market compliance."
  },
  {
    "id": 52,
    "sku": "SG-EXP-052",
    "name": "Star Anise (Chakra Phool)",
    "slug": "star-anise",
    "category": "Spices & Condiments",
    "hsCode": "0909",
    "group": "spice",
    "productForm": "Whole dried 8-arm star-shaped carpels with single seed",
    "exportGrades": "Whole 8-Arm Bold (min 85% unbroken); FAQ Broken; Powder",
    "varieties": "Illicium verum true star anise; Northeast Indian cultivation",
    "coreSpecs": "Moisture (max 10%); essential oil (min 8%); anethole content; unbroken star percentage",
    "contractTargets": "Min 85% whole stars, diameter >2.5 cm, moisture max 9.5%",
    "exportRegions": "Southeast Asia, GCC, European Union, USA",
    "complianceNotes": "100% verified Illicium verum (non-toxic true star anise)."
  },
  {
    "id": 53,
    "sku": "SG-EXP-053",
    "name": "Ajwain / Carom Seeds",
    "slug": "ajwain",
    "category": "Spices & Condiments",
    "hsCode": "0910",
    "group": "spice",
    "productForm": "Machine-cleaned whole oval seeds; sortex clean",
    "exportGrades": "Machine Cleaned 99%; Sortex Cleaned 99.5%; Super Green",
    "varieties": "Gujarat & Rajasthan origin; Desi Ajwain",
    "coreSpecs": "Purity (99.0% - 99.5%); moisture (max 10%); volatile thymol oil (min 2.5-4%); foreign matter",
    "contractTargets": "Purity 99.5% sortex clean, thymol content min 3.0%",
    "exportRegions": "Middle East, UK, USA, Canada, Africa",
    "complianceNotes": "ASTA cleanliness specifications; free from live or dead weevils."
  },
  {
    "id": 54,
    "sku": "SG-EXP-054",
    "name": "Pumpkin Seeds (Pepitas)",
    "slug": "pumpkin-seeds",
    "category": "Oilseeds & Nuts",
    "hsCode": "1209",
    "group": "nut",
    "productForm": "Hulled dark green kernels; raw or roasted",
    "exportGrades": "Grade AAA Pepitas; Shine Skin; GWS (Grow Without Skin)",
    "varieties": "Cucurbita pepo hull-less varieties; food-grade pepitas",
    "coreSpecs": "Purity (min 99.9%); moisture (max 7.5%); broken kernels (<3%); aflatoxin B1+B2+G1+G2 (<4 ppb); microbiological limits",
    "contractTargets": "Purity 99.95%, moisture max 7.0%, aflatoxin negative",
    "exportRegions": "Europe, USA, Middle East, Japan, Australia",
    "complianceNotes": "Vacuum-packed with nitrogen flushing to prevent lipid oxidation."
  },
  {
    "id": 55,
    "sku": "SG-EXP-055",
    "name": "Horse Gram (Kulthi Dal)",
    "slug": "horse-gram",
    "category": "Pulses & Beans",
    "hsCode": "0713",
    "group": "pulse",
    "productForm": "Whole flattened brown/reddish-brown seeds",
    "exportGrades": "Export Machine Cleaned 99%; Sortex Cleaned 99.5%",
    "varieties": "Macrotyloma uniflorum; South & Central Indian varieties",
    "coreSpecs": "Purity (min 99%); moisture (max 11%); foreign seeds; weevilled grains (max 0.5%); protein content (>22%)",
    "contractTargets": "Moisture max 10.5%, sortex purity 99.5%, zero live infestation",
    "exportRegions": "Middle East, Southeast Asia, UK, Indian diaspora markets",
    "complianceNotes": "Phytosanitary certificate with transit fumigation confirmation."
  },
  {
    "id": 56,
    "sku": "SG-EXP-056",
    "name": "Green Moong Beans (Whole & Split)",
    "slug": "green-moong-beans",
    "category": "Pulses & Beans",
    "hsCode": "0713",
    "group": "pulse",
    "productForm": "Whole shiny green seeds; split washed dal; split unwashed dal",
    "exportGrades": "Machine Cleaned 99%; Sortex Cleaned 99.5%; Polished/Unpolished",
    "varieties": "Shiny Green Moong; Bold Moong; Organic Vigna radiata",
    "coreSpecs": "Purity (min 99.5%); moisture (max 11%); damaged/discoloured grains (<1.5%); weevilled (<0.5%)",
    "contractTargets": "Sortex 99.5% purity, moisture max 10.5%, uniform size calibration",
    "exportRegions": "Middle East, Southeast Asia, European Union, USA",
    "complianceNotes": "Non-GMO verified, pesticide residue compliant with Codex standard."
  },
  {
    "id": 57,
    "sku": "SG-EXP-057",
    "name": "Black Gram / Urad (Whole & Split)",
    "slug": "black-urad-beans",
    "category": "Pulses & Beans",
    "hsCode": "0713",
    "group": "pulse",
    "productForm": "Whole cylindrical black seeds; split dal with skin; gota (dehusked whole)",
    "exportGrades": "FAQ; Special Quality; Sortex Cleaned 99.5%",
    "varieties": "Vigna mungo; Bold Black Urad; T9 varieties",
    "coreSpecs": "Purity (min 99.5%); moisture (max 12%); foreign matter (<0.5%); damaged grains (<2%)",
    "contractTargets": "Moisture max 11%, sortex clean 99.5%, zero uric acid contamination",
    "exportRegions": "GCC, Sri Lanka, Southeast Asia, UK, North America",
    "complianceNotes": "Tested for heavy metals, fumigated under NSPM-12 guidelines."
  }
];

export const WHEAT_QUALITY_MATRIX: WheatQualityItem[] = [
  {
    "id": 1,
    "wheatClass": "Common wheat",
    "gradeType": "High-protein bread-making",
    "intendedUse": "Food milling",
    "testSpecs": "Protein; moisture; test weight; falling number; gluten; foreign matter; damaged kernels; residues",
    "standardTarget": "Often target 12–13.5% protein; moisture max 12–13.5% as agreed",
    "marketScope": "Africa/Middle East/South Asia subject to policy",
    "caution": "Contract target examples only; confirm lab method and current export legality."
  },
  {
    "id": 2,
    "wheatClass": "Common wheat",
    "gradeType": "Standard milling wheat",
    "intendedUse": "Flour/chapati use",
    "testSpecs": "Protein; moisture; test weight; foreign matter; damaged grains; infestation; falling number where requested",
    "standardTarget": "Often target 10.5–12% protein; moisture max 12–13.5% as agreed",
    "marketScope": "Buyer-specific",
    "caution": "Do not rely on grade name alone; use a signed specification."
  },
  {
    "id": 3,
    "wheatClass": "Common wheat",
    "gradeType": "Lokwan",
    "intendedUse": "Domestic commercial variety/type; milling use",
    "testSpecs": "Variety identity; protein; moisture; test weight; foreign matter; damaged/shrivelled kernels",
    "standardTarget": "No universal export spec; set exact limits with buyer",
    "marketScope": "Buyer-specific",
    "caution": "Varietal name alone does not establish export quality."
  },
  {
    "id": 4,
    "wheatClass": "Common wheat",
    "gradeType": "Sharbati",
    "intendedUse": "Premium domestic trade name; food use",
    "testSpecs": "Identity/origin; grain size; colour; protein; moisture; foreign matter; damaged kernels",
    "standardTarget": "No universal export spec; premium claims need sample acceptance",
    "marketScope": "Buyer-specific",
    "caution": "Avoid implying Sharbati is a formal international grade."
  },
  {
    "id": 5,
    "wheatClass": "Durum wheat",
    "gradeType": "Semolina/pasta grade",
    "intendedUse": "Durum milling",
    "testSpecs": "Protein; vitreousness; moisture; test weight; black-point; foreign matter; falling number",
    "standardTarget": "Buyer sets protein and vitreousness thresholds",
    "marketScope": "Mediterranean/North Africa where accepted",
    "caution": "Must be Triticum durum; common wheat is not interchangeable."
  },
  {
    "id": 6,
    "wheatClass": "Wheat",
    "gradeType": "Seed wheat",
    "intendedUse": "Planting seed (regulated separately)",
    "testSpecs": "Varietal purity; germination; physical purity; moisture; seed health; certification; phytosanitary requirements",
    "standardTarget": "As required by seed certification and destination rules",
    "marketScope": "Only approved markets",
    "caution": "Not the same as food-grade wheat; check seed export restrictions and permits."
  }
];

export const GRADE_TERMINOLOGY: GradeTerminologyItem[] = [
  {
    "id": 1,
    "term": "5% / 10% / 25% broken rice",
    "meaning": "Maximum or contractually allowed broken-kernel share",
    "products": "Milled rice",
    "howToSpecify": "State test method, tolerance and whether broken percentage is by weight."
  },
  {
    "id": 2,
    "term": "1121 / 1509 / 1718 / 1401",
    "meaning": "Basmati variety/trade identity labels",
    "products": "Basmati rice",
    "howToSpecify": "Confirm eligible notified variety, grain dimensions and documentation; do not use labels generically."
  },
  {
    "id": 3,
    "term": "W180 / W240 / W320 / W450",
    "meaning": "Cashew whole-kernel count grades per pound (commercial grading)",
    "products": "Cashew kernels",
    "howToSpecify": "Confirm applicable grading standard and tolerances."
  },
  {
    "id": 4,
    "term": "40/50, 50/60, 60/70",
    "meaning": "Groundnut kernel count grades, commonly kernels per ounce in export trade",
    "products": "Groundnut kernels",
    "howToSpecify": "Confirm whether count is per ounce and buyer's sizing protocol."
  },
  {
    "id": 5,
    "term": "99.1 / 98.2 / 99.5% purity",
    "meaning": "Purity claims / supplier shorthand",
    "products": "Sesame and other seeds",
    "howToSpecify": "Define calculation method, foreign matter/admixture limits and inspection procedure."
  },
  {
    "id": 6,
    "term": "Eagle / Scooter / Badami",
    "meaning": "Trade names used for coriander seed quality/market types",
    "products": "Coriander",
    "howToSpecify": "Not a globally harmonised standard; use numeric specification and approved sample."
  },
  {
    "id": 7,
    "term": "Saru / Kirana / Europe / Super / Best",
    "meaning": "Local or trader-defined quality labels",
    "products": "Multiple commodities",
    "howToSpecify": "Do not assume uniform meaning between suppliers, yards or destinations."
  },
  {
    "id": 8,
    "term": "FAQ",
    "meaning": "Fair Average Quality / market shorthand in some commodities",
    "products": "Multiple commodities",
    "howToSpecify": "Exact standards depend on commodity, contract and importing market."
  },
  {
    "id": 9,
    "term": "G4 / Teja / Byadgi / S17",
    "meaning": "Commercial type or variety labels used for chilli",
    "products": "Chilli",
    "howToSpecify": "Confirm actual variety, colour, pungency, residues and origin."
  },
  {
    "id": 10,
    "term": "Organic / Non-GMO",
    "meaning": "Certification or verified product attribute, not simply a visual grade",
    "products": "Multiple commodities",
    "howToSpecify": "Require valid certificates and traceability; do not make unsupported claims."
  }
];

export const EXPORT_CHECKLIST: ExportChecklistItem[] = [
  {
    "id": 1,
    "area": "Identity",
    "confirmationPoint": "Commodity name; botanical name where useful; variety; origin/state; crop year; whole vs split/processed form."
  },
  {
    "id": 2,
    "area": "Physical quality",
    "confirmationPoint": "Moisture; purity; foreign matter; size/count; broken/damaged/discoloured share; infestation; odour; appearance."
  },
  {
    "id": 3,
    "area": "Food safety",
    "confirmationPoint": "Pesticide residues/MRLs; mycotoxins/aflatoxin where relevant; Salmonella/microbiology; heavy metals/adulterants where relevant."
  },
  {
    "id": 4,
    "area": "Processing",
    "confirmationPoint": "Raw/steam/sella; hulled/unhulled; polished/unpolished; mesh size; treatment; additives; processing aids."
  },
  {
    "id": 5,
    "area": "Packaging",
    "confirmationPoint": "Bag type/material; net weight; liner; palletisation; labelling language; lot/batch code; shelf life."
  },
  {
    "id": 6,
    "area": "Inspection",
    "confirmationPoint": "Sampling plan; inspection company; lab accreditation; test method; certificate of analysis; pre-shipment inspection responsibility."
  },
  {
    "id": 7,
    "area": "Commercial",
    "confirmationPoint": "Quantity and tolerance; Incoterm (FOB/CFR/CIF etc.); named port; shipment window; payment terms; claims procedure."
  },
  {
    "id": 8,
    "area": "Documentation",
    "confirmationPoint": "Commercial invoice; packing list; certificate of origin; phytosanitary certificate if applicable; fumigation/treatment certificate if required; health/quality certificates as applicable."
  },
  {
    "id": 9,
    "area": "Market access",
    "confirmationPoint": "Current DGFT export policy; HS code; destination import permits; tariff; pesticide MRLs; labelling; registration/RCAC for rice where applicable."
  },
  {
    "id": 10,
    "area": "Fresh produce",
    "confirmationPoint": "Approved packhouse/treatment where required; maturity/size; residue testing; cold chain; traceability; destination protocol."
  },
  {
    "id": 11,
    "area": "Groundnut",
    "confirmationPoint": "Aflatoxin and microbiological testing; kernel count; moisture; damaged kernels; destination-specific safety limits."
  },
  {
    "id": 12,
    "area": "Wheat",
    "confirmationPoint": "Protein; moisture; test weight; foreign matter; damaged/shrivelled grains; falling number/gluten if required; confirm current export policy."
  }
];

export const OFFICIAL_SOURCES: OfficialSourceItem[] = [
  {
    "id": 1,
    "source": "APEDA – Cereals",
    "url": "https://apeda.gov.in/Cereals",
    "whyConsult": "Official overview of Indian cereal export categories, destinations and wheat/rice resources."
  },
  {
    "id": 2,
    "source": "APEDA – Basmati Rice",
    "url": "https://apeda.gov.in/BasmatiRice",
    "whyConsult": "Official basmati profile, eligible region context and export performance."
  },
  {
    "id": 3,
    "source": "APEDA – Requirements for Export of Rice",
    "url": "https://apeda.gov.in/Requirement_Export_Rice",
    "whyConsult": "Rice export documentation and destination-specific conditions; verify current notices before shipment."
  },
  {
    "id": 4,
    "source": "APEDA – Exporter Procedures",
    "url": "https://apeda.gov.in/exporter-procedures",
    "whyConsult": "Current export procedure resources, including groundnut and destination-specific compliance notices."
  },
  {
    "id": 5,
    "source": "APEDA Agri Exchange – Product/HS search",
    "url": "https://agriexchange.apeda.gov.in/IndiaExport/Home/SearchFilters",
    "whyConsult": "Commodity and HS classification reference; verify final HS code with customs broker/official tariff."
  },
  {
    "id": 6,
    "source": "APEDA – Milled Products",
    "url": "https://apeda.gov.in/MilledProducts",
    "whyConsult": "Indian flour and other milled product export categories and indicative destinations."
  },
  {
    "id": 7,
    "source": "APEDA – Export Summary",
    "url": "https://agriexchange.apeda.gov.in/India/ExportSummery/Index",
    "whyConsult": "Export category and destination data; figures change by fiscal year."
  }
];

export const TRADE_GUIDELINES: TradeGuidelineItem[] = [
  {
    "id": 1,
    "topic": "Workbook scope",
    "note": "Expanded export-oriented catalogue of major Indian agricultural commodities beyond the original APMC list, including grains, rice, pulses, spices, oilseeds, processed products, fresh produce and other agricultural products."
  },
  {
    "id": 2,
    "topic": "Specifications",
    "note": "Any numeric target shown is illustrative commercial guidance, not a universal legal standard. Final values must be agreed in the purchase/sales contract and verified by a competent lab."
  },
  {
    "id": 3,
    "topic": "Varieties and grades",
    "note": "Variety availability varies by crop year, state and supplier. Verify lot identity, eligibility, and whether the label is a formal standard, variety name or local trade shorthand."
  },
  {
    "id": 4,
    "topic": "Export destinations",
    "note": "Regions are indicative market scopes, not confirmation of current buyer demand or legal market access. Verify latest trade policy and importing-country rules."
  },
  {
    "id": 5,
    "topic": "Wheat and rice",
    "note": "Wheat export policy and rice export procedures can change. Check current DGFT notifications and APEDA requirements before issuing an offer."
  },
  {
    "id": 6,
    "topic": "HS codes",
    "note": "HS codes are intentionally not hard-coded across all SKUs because classification depends on exact processing, use and product form. Verify with customs broker and official tariff."
  },
  {
    "id": 7,
    "topic": "Source use",
    "note": "Official APEDA links are provided for follow-up. This workbook is a working commercial catalogue, not a substitute for regulatory advice or a destination-specific technical specification."
  }
];

export const COMMODITY_CATEGORIES = [
  "All",
  "Cereals & Grains",
  "Milled Products",
  "Pulses & Lentils",
  "Spices",
  "Oilseeds",
  "Processed Agricultural Products",
  "Fresh Produce",
  "Other Agricultural Products",
] as const;

export function getMasterCommodityBySlug(slug: string): MasterCommoditySpec | undefined {
  const normalized = slug.toLowerCase().trim();
  return MASTER_COMMODITIES.find(
    (c) => c.slug === normalized || c.slug.includes(normalized) || normalized.includes(c.slug)
  );
}
