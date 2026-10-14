import { useState } from "react";
import {
  FileText,
  Ship,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  Scale,
  Clock,
  ArrowRight,
  Maximize2,
  ExternalLink,
} from "lucide-react";
import onionsImg from "@/assets/prod-fresh-onions-detail.jpg";
import chilliesImg from "@/assets/prod-chillies.jpg";
import riceImg from "@/assets/prod-rice.jpg";
import coconutImg from "@/assets/prod-coconut.jpg";
import spicesImg from "@/assets/prod-spices.jpg";
import pulsesImg from "@/assets/prod-pulses.jpg";
import { SpecSheetDownloadModal } from "@/components/SpecSheetDownloadModal";
import { RfqModal } from "@/components/RfqModal";

interface CommodityDossier {
  id: string;
  name: string;
  scientificName: string;
  hsCode: string;
  origin: string;
  image: string;
  slug: string;
  primaryGrade: string;
  calibrations: string;
  moisture: string;
  tssBrix: string;
  shelfLife: string;
  packagingOptions: string[];
  containerStuffing: string;
  reeferTemp: string;
  nearestPort: string;
  transitToDubai: string;
  complianceBadges: string[];
}

const MASTER_DOSSIERS: CommodityDossier[] = [
  {
    id: "fresh-onions",
    name: "Fresh Nashik Red Onions (Garwa / Phursungi)",
    scientificName: "Allium cepa",
    hsCode: "07031010",
    origin: "Nashik, Lasalgaon, Kalwan, Pune (Maharashtra)",
    image: onionsImg,
    slug: "fresh-onions-exporter-india",
    primaryGrade: "Export Grade-A Globe Shape, Deep Pink-Red Skin",
    calibrations: "45–55mm (Medium) & 55–65mm (Super Large) calibrated by mechanical roller",
    moisture: "Skin cured < 13.5% dry skin ratio",
    tssBrix: "11.5° – 13.0° Brix (High pungency & natural pyruvic acid)",
    shelfLife: "Up to 60–75 days in refrigerated cold chain (+2°C to +4°C)",
    packagingOptions: ["25kg Red Leno Mesh Bags", "10kg Export Bags", "50kg Jute Bags"],
    containerStuffing: "29.00 MT (1,160 bags of 25kg) in 1x40ft High Cube Reefer",
    reeferTemp: "+2.0°C to +4.0°C (Ventilation: 25-30 CBM/hr, RH 65-70%)",
    nearestPort: "Jawaharlal Nehru Port (JNPT / Nhava Sheva) — 180 km from Nashik",
    transitToDubai: "3.5 Days direct express ocean sailing to Jebel Ali",
    complianceBadges: ["APEDA Certified", "Phytosanitary Inspected", "MRL < EU Limits"],
  },
  {
    id: "green-chillies",
    name: "Fresh G4 & Teja Green Chillies",
    scientificName: "Capsicum annuum",
    hsCode: "07096010",
    origin: "Guntur (Andhra Pradesh) & Kolhapur / Junnar (Maharashtra)",
    image: chilliesImg,
    slug: "green-chillies-exporter",
    primaryGrade: "Export G4 Cleaned, Green Calyx Intact, 8–12 cm Length",
    calibrations: "Length: 70–120 mm | Diameter: 8–12 mm | Straight Pods",
    moisture: "Fresh Farm Plucked (Pre-cooled to 8°C within 4 hours)",
    tssBrix: "Pungency: 40,000 – 65,000 SHU (Scoville Heat Units)",
    shelfLife: "21–28 days at controlled temperature (+7°C to +9°C)",
    packagingOptions: ["4kg / 5kg CFB Corrugated Cartons with Ventilation Holes"],
    containerStuffing: "12.50 MT (2,500 cartons of 5kg) in 1x40ft Reefer FCL or Air Cargo",
    reeferTemp: "+7.0°C to +9.0°C (RH 90-95% to preserve stem firmness)",
    nearestPort: "Nhava Sheva (JNPT) / Mumbai Air Cargo (BOM)",
    transitToDubai: "3.5 Days sea freight / 4 Hours direct air cargo",
    complianceBadges: ["APEDA Packhouse Pre-Cooled", "Pesticide Residue Free"],
  },
  {
    id: "basmati-rice",
    name: "Indian 1121 & 1509 Basmati Rice (Steam & Sella)",
    scientificName: "Oryza sativa",
    hsCode: "10063020",
    origin: "Taraori, Karnal (Haryana) & Amritsar (Punjab)",
    image: riceImg,
    slug: "indian-basmati-rice",
    primaryGrade: "1121 Extra Long Grain (Average Raw Grain Length: 8.35–8.40mm)",
    calibrations: "Elongation Ratio: 2.2x (Cooked length exceeds 19mm+)",
    moisture: "Strictly ≤ 12.5% max with aged starch crystallization",
    tssBrix: "100% Sortex Cleaned, Purity: 95% Pure Basmati",
    shelfLife: "24 Months in dry sealed conditions",
    packagingOptions: ["5kg, 10kg, 20kg, 25kg Non-Woven / BOPP / PP Bags"],
    containerStuffing: "26.00 MT (1,040 bags of 25kg) in 1x20ft Standard Dry Container",
    reeferTemp: "Dry Cargo Ambient (Moisture-barrier liner kraft paper lined)",
    nearestPort: "Mundra Port (Gujarat) & Nhava Sheva (JNPT)",
    transitToDubai: "3–4 Days sea transit to Jebel Ali / Dammam",
    complianceBadges: ["FSSAI Central License", "AGMARK Certified", "SFDA Registered"],
  },
  {
    id: "coconut",
    name: "Pollachi Semi-Husked Mature Brown Coconuts",
    scientificName: "Cocos nucifera",
    hsCode: "08011200",
    origin: "Pollachi, Coimbatore (Tamil Nadu) & Palakkad (Kerala)",
    image: coconutImg,
    slug: "coconut-exporter-india",
    primaryGrade: "Semi-Husked Grade-A Mature Nut with Water Content > 150ml",
    calibrations: "Weight: 550g to 650g per nut | Circumference: 12–14 inches",
    moisture: "Outer fibre dried, inner endosperm thickness: 12–15mm",
    tssBrix: "Sweet clear coconut water, zero fungal residue at soft eye",
    shelfLife: "Up to 60 days in ventilated dry / refrigerated ocean transit",
    packagingOptions: ["13kg PP Mesh Bags (approx. 25 nuts/bag) or 50-nut bulk bags"],
    containerStuffing: "28.00 MT (approx. 45,000 to 48,000 nuts) in 1x40ft HC Container",
    reeferTemp: "+12.0°C to +14.0°C or Dry Ventilated FCL",
    nearestPort: "Tuticorin (V.O. Chidambaranar) & Cochin Port",
    transitToDubai: "6–7 Days direct ocean freight",
    complianceBadges: ["CDB (Coconut Development Board)", "Phytosanitary Certificate"],
  },
  {
    id: "spices",
    name: "Export Grade Whole & Ground Indian Spices",
    scientificName: "Curcuma longa / Cuminum cyminum",
    hsCode: "09042110 / 09093129",
    origin: "Unjha (Cumin), Sangli & Nizamabad (Turmeric), Guntur (Chilli)",
    image: spicesImg,
    slug: "spices-masalas-exporter",
    primaryGrade: "Machine Clean Sortex 99% Pure, Finger & Seed Grade",
    calibrations: "Turmeric Curcumin: 3.0% to 5.5% | Cumin Volatile Oil: > 2.5%",
    moisture: "Moisture < 9.0% with Ethylene Oxide (ETO) or Steam Sterilized",
    tssBrix: "Aflatoxin B1+B2+G1+G2 < 10 ppb (Fully EU & FDA Compliant)",
    shelfLife: "24 Months sealed storage",
    packagingOptions: ["25kg / 50kg Multiwall Paper Bags or Polypropylene Bags"],
    containerStuffing: "18.00 MT (Cumin) / 22.00 MT (Turmeric) per 20ft Dry FCL",
    reeferTemp: "Dry Container with desiccant dry poles (Zero condensation)",
    nearestPort: "Mundra Port / JNPT Port",
    transitToDubai: "3–4 Days ocean freight to Gulf / 20 Days to UK",
    complianceBadges: ["Spices Board India Reg.", "SGS Heavy Metal Tested", "Eurofins MRL Cleared"],
  },
  {
    id: "pulses",
    name: "Sortex Cleaned Pulses, Chickpeas & Pigeon Peas",
    scientificName: "Cicer arietinum / Cajanus cajan",
    hsCode: "07132000",
    origin: "Indore (Madhya Pradesh) & Latur / Akola (Maharashtra)",
    image: pulsesImg,
    slug: "pulses-lentils-exporter",
    primaryGrade: "Kabuli Chickpeas (Dollar Grade, 75-80 & 42-44 count per ounce)",
    calibrations: "Size: 7mm, 8mm, 9mm calibrated round seeds",
    moisture: "Moisture ≤ 10.0% max | Foreign matter ≤ 0.2%",
    tssBrix: "100% Sortex Color Sorted, Zero weevil damage, zero split grain",
    shelfLife: "24 Months sealed storage",
    packagingOptions: ["25kg & 50kg Heavy PP Bags with inner liner"],
    containerStuffing: "24.00 MT in 1x20ft Standard Dry Container FCL",
    reeferTemp: "Dry ambient container with kraft paper lining",
    nearestPort: "Nhava Sheva (JNPT) / Mundra",
    transitToDubai: "3.5 Days ocean transit",
    complianceBadges: ["APEDA Export Cleared", "FSSAI Grade-A", "Certificate of Origin"],
  },
];

export function CommodityDossiers() {
  const [activeTab, setActiveTab] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Master Commodities" },
    { id: "perishable", label: "Fresh Reefer Perishables" },
    { id: "grains-spices", label: "Dry Grains & Spices" },
  ];

  const filteredDossiers = MASTER_DOSSIERS.filter((d) => {
    if (activeTab === "perishable") {
      return d.id === "fresh-onions" || d.id === "green-chillies" || d.id === "coconut";
    }
    if (activeTab === "grains-spices") {
      return d.id === "basmati-rice" || d.id === "spices" || d.id === "pulses";
    }
    return true;
  });

  return (
    <section id="spec-dossiers" className="bg-[#FBFBFA] py-20 text-[#111816]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[#091E16]/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded border border-[#C59B27]/40 bg-[#F5F3EF] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-[#A67C1E]">
              Commercial Trade Ledger • 6 Master Export Lines
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#091E16] sm:text-4xl lg:text-5xl">
              Commodity Specification Dossiers
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-[#3D4843]">
              Tactile, institutional technical matrices detailing origin belts, calibration dimensions,
              moisture tolerances, container stuffing, and Reefer cold-chain specifications.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? "bg-[#091E16] text-[#E4BC4A] shadow-md"
                    : "border border-[#091E16]/15 bg-white text-[#3D4843] hover:border-[#C59B27]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Master Trade Ledger Rows */}
        <div className="mt-10 space-y-8">
          {filteredDossiers.map((dossier, idx) => (
            <div
              key={dossier.id}
              className="overflow-hidden rounded-2xl border border-[#091E16]/10 bg-white shadow-[0_4px_20px_rgba(9,30,22,0.04)] transition-all duration-300 hover:border-[#C59B27]/60 hover:shadow-[0_12px_36px_rgba(9,30,22,0.08)]"
            >
              {/* Top Ledger Header Stripe */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#091E16]/08 bg-[#F5F3EF] px-6 py-3 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#8C2D19]">ROW 0{idx + 1}</span>
                  <span className="text-[#091E16]/30">|</span>
                  <span className="rounded bg-[#091E16] px-2 py-0.5 text-[11px] font-bold text-[#E4BC4A]">
                    HS CODE: {dossier.hsCode}
                  </span>
                  <span className="text-[#091E16]/30 hidden sm:inline">|</span>
                  <span className="text-[#3D4843] hidden sm:inline italic">
                    {dossier.scientificName}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {dossier.complianceBadges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1 rounded bg-[#091E16]/06 px-2 py-0.5 text-[10px] font-bold text-[#091E16]"
                    >
                      <CheckCircle2 className="h-3 w-3 text-[#A67C1E]" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3-Column Architecture: Left (Photo) | Center (Specs) | Right (Logistics & Action) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-7">
                {/* Column 1: Authentic Origin Photography & Calibration Visual */}
                <div className="lg:col-span-3 space-y-3">
                  <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl border border-[#091E16]/10 bg-slate-100">
                    <img
                      src={dossier.image}
                      alt={`${dossier.name} export quality bulk supplier from India`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 rounded bg-[#091E16]/90 px-2 py-1 font-mono text-[9px] font-bold text-[#E4BC4A] backdrop-blur-sm">
                      VERIFIED LOT PHOTO
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#091E16]/08 bg-[#FBFBFA] p-2.5 font-mono text-[11px]">
                    <div className="text-[10px] uppercase text-[#3D4843]/70">Primary Origin</div>
                    <div className="font-bold text-[#091E16]">{dossier.origin}</div>
                  </div>
                </div>

                {/* Column 2: Detailed Technical Specification Matrix */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#091E16]">
                      {dossier.name}
                    </h3>
                    <p className="mt-1 text-xs font-mono text-[#A67C1E]">{dossier.primaryGrade}</p>
                  </div>

                  {/* Specification Table */}
                  <div className="overflow-hidden rounded-lg border border-[#091E16]/10 bg-[#FBFBFA]">
                    <table className="w-full text-left text-xs">
                      <tbody className="divide-y divide-[#091E16]/08">
                        <tr>
                          <td className="w-1/3 bg-[#F5F3EF] px-3 py-2 font-mono text-[11px] font-semibold text-[#3D4843]">
                            Size Calibration
                          </td>
                          <td className="px-3 py-2 font-medium text-[#111816]">
                            {dossier.calibrations}
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-[#F5F3EF] px-3 py-2 font-mono text-[11px] font-semibold text-[#3D4843]">
                            Moisture Content
                          </td>
                          <td className="px-3 py-2 font-medium text-[#111816]">{dossier.moisture}</td>
                        </tr>
                        <tr>
                          <td className="bg-[#F5F3EF] px-3 py-2 font-mono text-[11px] font-semibold text-[#3D4843]">
                            Brix / Pungency
                          </td>
                          <td className="px-3 py-2 font-medium text-[#111816]">
                            {dossier.tssBrix}
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-[#F5F3EF] px-3 py-2 font-mono text-[11px] font-semibold text-[#3D4843]">
                            Export Packaging
                          </td>
                          <td className="px-3 py-2 font-medium text-[#111816]">
                            {dossier.packagingOptions.join(" • ")}
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-[#F5F3EF] px-3 py-2 font-mono text-[11px] font-semibold text-[#3D4843]">
                            Commercial Life
                          </td>
                          <td className="px-3 py-2 font-medium text-[#111816]">
                            {dossier.shelfLife}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Column 3: Logistics Data & Procurement Action */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-4 rounded-xl border border-[#091E16]/10 bg-[#F5F3EF] p-5">
                  <div className="space-y-3">
                    <div className="border-b border-[#091E16]/10 pb-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#091E16]">
                      Real-Time Port &amp; Cold-Chain Logistics
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex items-start gap-2">
                        <Scale className="mt-0.5 h-3.5 w-3.5 text-[#A67C1E] shrink-0" />
                        <div>
                          <span className="text-[#3D4843]">Container Stuffing: </span>
                          <span className="font-bold text-[#091E16]">
                            {dossier.containerStuffing}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Thermometer className="mt-0.5 h-3.5 w-3.5 text-[#8C2D19] shrink-0" />
                        <div>
                          <span className="text-[#3D4843]">Reefer Temperature: </span>
                          <span className="font-bold text-[#8C2D19]">{dossier.reeferTemp}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Ship className="mt-0.5 h-3.5 w-3.5 text-[#091E16] shrink-0" />
                        <div>
                          <span className="text-[#3D4843]">Loading Gateway: </span>
                          <span className="font-bold text-[#091E16]">{dossier.nearestPort}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Clock className="mt-0.5 h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <div>
                          <span className="text-[#3D4843]">Express Transit: </span>
                          <span className="font-bold text-emerald-700">
                            {dossier.transitToDubai}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-3">
                    <RfqModal
                      defaultCommodityName={dossier.name}
                      defaultHsCode={dossier.hsCode}
                      triggerLabel={`Initiate RFQ for ${dossier.name.split(" ")[0]} FCL`}
                      triggerClassName="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#091E16] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#E4BC4A] shadow-md transition hover:bg-[#05130E] hover:text-white"
                    />

                    <div className="flex items-center gap-2">
                      <SpecSheetDownloadModal
                        productName={dossier.name}
                        hsCode={dossier.hsCode}
                        buttonLabel="Spec Sheet (PDF)"
                        variant="header"
                      />

                      <a
                        href={`/products/${dossier.slug}`}
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#091E16]/20 bg-white px-3 py-2 text-xs font-mono font-semibold text-[#091E16] transition hover:bg-[#091E16] hover:text-[#E4BC4A]"
                      >
                        <span>Full Dossier</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
