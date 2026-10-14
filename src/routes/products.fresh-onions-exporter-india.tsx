import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Package,
  Ship,
  Thermometer,
  Calendar,
  CheckCircle2,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  Globe,
  Anchor,
  HelpCircle,
  Clock,
  Layers,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { ContainerLoadingCalculator } from "@/components/ContainerLoadingCalculator";
import { SeasonalCropRadar } from "@/components/SeasonalCropRadar";
import {
  BLUE,
  ORANGE,
  NAVY,
  PHONE,
  PHONE_RAW,
  EMAIL,
  ORGANIZATION_JSONLD,
  FRESH_ONIONS_PRODUCT_JSONLD,
  buildFaqPageSchema,
  buildWhatsAppUrl,
} from "@/lib/site";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const CANONICAL_URL = `${SITE_URL}/products/fresh-onions-exporter-india`;
const TITLE =
  "Fresh Onions Exporter in India | Nashik Red Onions Bulk Supplier — Sheshaan Global";
const DESCRIPTION =
  "APEDA-certified Indian fresh onions exporter. Direct farm sourcing from Nashik, Lasalgaon & Pune. Grades 45-55mm & 55-65mm in mesh bags. FCL reefer shipping via JNPT to UAE, Gulf & Europe.";

const FAQS = [
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
];

const FAQ_JSONLD = buildFaqPageSchema(FAQS);

export const Route = createFileRoute("/products/fresh-onions-exporter-india")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "onions exporter in india, fresh onions exporter in india, nashik red onion exporter, agro product exporter in india, lasalgaon onion mandi bulk supplier, garwa onions export JNPT, indian red onions wholesale",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "product" },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://www.sheshaanglobal.com/assets/products/fresh-onions.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "https://www.sheshaanglobal.com/assets/products/fresh-onions.jpg" },
    ],
    links: [{ rel: "canonical", href: CANONICAL_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(FRESH_ONIONS_PRODUCT_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQ_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Agricultural Products", item: `${SITE_URL}/products` },
            { "@type": "ListItem", position: 3, name: "Fresh Onions Exporter in India", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: FreshOnionsProductPage,
});

function FreshOnionsProductPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [rfqSize, setRfqSize] = useState("45-55 mm");
  const [rfqBags, setRfqBags] = useState("25kg Red Leno Mesh Bags");
  const [rfqPort, setRfqPort] = useState("Jebel Ali (UAE)");
  const [rfqQty, setRfqQty] = useState("29 MT (1x40ft FCL)");
  const [rfqIncoterm, setRfqIncoterm] = useState("CIF");
  const [copiedHs, setCopiedHs] = useState(false);

  const waUrl = buildWhatsAppUrl({
    category: "Fresh Red Onions (Nashik Origin)",
    message: `Inquiry for Fresh Onions Export: Size: ${rfqSize}, Packaging: ${rfqBags}, Quantity: ${rfqQty}, Destination Port: ${rfqPort}, Incoterm: ${rfqIncoterm}. Please share latest FOB/CIF quote and mandi rate sheet.`,
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Breadcrumb Nav */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-700">Products</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Fresh Onions Exporter in India</span>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-[#04152D] via-[#07244C] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
            <ShieldCheck className="h-4 w-4" />
            APEDA RCMC & NPPO Phytosanitary Certified
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            APEDA-Certified Fresh Onion Exporter in India: Premium Nashik Red & Garwa Onions
          </h1>

          {/* GEO Declarative Definition Paragraph */}
          <p className="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global is an APEDA-certified Indian exporter of Nashik red onions</strong>, supplying wholesale importers, supermarket chains, and food processing distributors across the UAE, Saudi Arabia, Europe, the United Kingdom, and Southeast Asia directly from Maharashtra farm clusters.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Request Instant Quote via WhatsApp (+91 81499 09546)
            </a>
            <a
              href="#procurement-specifications"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              View Technical Procurement Data Table
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-white/10 pt-6 text-xs text-slate-300">
            <div>
              <span className="block text-slate-400 uppercase tracking-wider font-semibold">ITC-HS Code</span>
              <strong className="text-white text-sm">07031010 (Fresh Onions)</strong>
            </div>
            <div>
              <span className="block text-slate-400 uppercase tracking-wider font-semibold">Farm Origins</span>
              <strong className="text-white text-sm">Nashik, Lasalgaon, Pune</strong>
            </div>
            <div>
              <span className="block text-slate-400 uppercase tracking-wider font-semibold">FCL Capacity</span>
              <strong className="text-white text-sm">28–29 MT / 40ft Reefer</strong>
            </div>
            <div>
              <span className="block text-slate-400 uppercase tracking-wider font-semibold">Transit Gateway</span>
              <strong className="text-white text-sm">JNPT Nhava Sheva / Mundra</strong>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section: Direct Answer & Technical Specifications Table */}
        <section id="procurement-specifications" className="scroll-mt-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Commercial Export Specifications & Cold-Chain Parameters
            </h2>
            {/* GEO Direct Answer Paragraph */}
            <p className="mt-3 text-base text-slate-700 leading-relaxed bg-blue-50/80 border-l-4 border-[#0057B8] p-4 rounded-r-lg">
              <strong>Direct Procurement Overview:</strong> A standard 40ft High Cube reefer container holds 28 to 29 Metric Tons of fresh onions packed in 25kg red leno mesh bags under an automated temperature setting of +2°C to +4°C, 65–70% relative humidity, and 25–30 CBM/hr continuous fresh air exchange. Shipments depart directly from JNPT (Nhava Sheva) and Mundra Port with rapid 3–4 day transit to Jebel Ali and 21–24 days to Felixstowe/Rotterdam.
            </p>
          </div>

          {/* Semantic HTML Table */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Technical Procurement Matrix — HS 07031010
              </h3>
              <span className="text-xs font-semibold text-slate-500">APMC Lasalgaon Benchmark</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-bold w-1/3">Parameter</th>
                    <th scope="col" className="px-6 py-3 font-bold">Standard Export Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Harmonized Tariff (HS Code)</th>
                    <td className="px-6 py-4 font-mono font-medium text-blue-900">
                      <div className="flex items-center justify-between">
                        <span>07031010 (Fresh Onions)</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText("07031010");
                            setCopiedHs(true);
                            toast.success("Copied HS Code 07031010 to clipboard!");
                            setTimeout(() => setCopiedHs(false), 2000);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-sans text-slate-600 hover:bg-slate-50"
                        >
                          {copiedHs ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedHs ? "Copied" : "Copy HS"}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Geographical Origin</th>
                    <td className="px-6 py-4">Nashik, Lasalgaon, Pimpalgaon, Pune (Maharashtra, India)</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Commercial Varieties</th>
                    <td className="px-6 py-4">Nashik Dark Red Onion, Maharashtra Garwa (Rabi) Onion, White Onion, Small/Sambhar Onion</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Calibration Diameter Sizes</th>
                    <td className="px-6 py-4 font-medium">40–50 mm, 45–55 mm (Medium), 50–60 mm, 55–65 mm (Jumbo), 60 mm+</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Moisture & Quality Indices</th>
                    <td className="px-6 py-4">Dry outer skin moisture &lt; 14%; Total Soluble Solids (TSS) &gt; 12° Brix; &lt; 0.5% soil tolerance; 0% sprouting/neck rot</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Export Packaging Options</th>
                    <td className="px-6 py-4">5kg, 10kg, 18kg, 20kg, 25kg, 50kg Red Leno Ventilated Mesh Bags &amp; Traditional Jute Bags</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Container FCL Capacity</th>
                    <td className="px-6 py-4 font-semibold text-slate-900">40ft High Cube Reefer: 28 to 29 Metric Tons (~1,120–1,160 bags of 25kg) | 20ft Reefer: 14.5 MT</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Reefer Container Setpoint</th>
                    <td className="px-6 py-4 font-mono text-xs">Temperature: +2°C to +4°C | Ventilation: 25–30 CBM/hr | Humidity: 65–70% RH</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Primary Dispatch Ports</th>
                    <td className="px-6 py-4">
                      <a href="https://www.jnport.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-medium">JNPT (Nhava Sheva, Mumbai)</a>, Mundra Port (Gujarat)
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Ocean Transit Times</th>
                    <td className="px-6 py-4">
                      Jebel Ali (UAE): 3–4 days | Dammam (KSA): 5–6 days | Singapore: 7–9 days | Felixstowe / Rotterdam (EU): 21–24 days
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Statutory Certifications</th>
                    <td className="px-6 py-4">
                      <a href="https://apeda.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-medium">APEDA RCMC</a>, DGFT IEC, Phytosanitary Certificate (NPPO), Methyl Bromide Fumigation (MBr), Certificate of Origin (COO)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section: Interactive Container Load & Packing Spec Calculator */}
        <section>
          <ContainerLoadingCalculator
            productName="Fresh Red Onions (Nashik Origin)"
            hsCode="07031010"
            container20ftText="14.5 MT Reefer"
            container40ftText="29 MT Reefer"
            defaultBagKg={25}
          />
        </section>

        {/* Section: Agricultural Context & E-E-A-T Sourcing Cycles */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
              Agronomic Science &amp; Seasonal Quality Control
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Indian Onion Crop Cycles: Pol (Kharif) vs. Garwa (Rabi)
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Sheshaan Global procures directly from audited farm clusters in Lasalgaon and Pimpalgaon — Asia's largest onion trading hub. Understanding Maharashtra's seasonal crop variations is essential for international buyers to plan container procurement, prevent en-route rotting, and negotiate seasonal price cycles.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Garwa Crop */}
            <div className="rounded-2xl border-2 border-emerald-500/20 bg-emerald-50/30 p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Recommended for Long Transit (Europe &amp; Far East)
                </span>
                <span className="text-xs font-bold text-emerald-700">Shelf Life: 5–6 Months</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">Garwa Onion (Rabi Main Crop)</h3>
              <p className="mt-2 text-xs font-semibold text-slate-500">Harvest Window: March to June | Sowing: Oct–Nov</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>High Dry-Matter Content:</strong> TSS exceeds 12° to 14° Brix, ensuring superior cellular density and resistance to pressure bruising.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Multi-Layer Papery Skin:</strong> Cured under natural shade sheds (Kanda Chawl) with 3–4 tight outer tunics, minimizing moisture loss during ocean voyages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Premature Sprouting:</strong> Naturally dormant crop structure allows 21 to 28 day voyage to European destinations without sprouting.</span>
                </li>
              </ul>
            </div>

            {/* Pol Crop */}
            <div className="rounded-2xl border-2 border-amber-500/20 bg-amber-50/30 p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Ideal for Rapid Transit (GCC &amp; Middle East)
                </span>
                <span className="text-xs font-bold text-amber-700">Shelf Life: 30–45 Days</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">Pol Onion (Kharif &amp; Late Kharif Crop)</h3>
              <p className="mt-2 text-xs font-semibold text-slate-500">Harvest Window: October to February | Sowing: Jun–Jul</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Juicy, Vibrant Pungency:</strong> Higher moisture profile with thin skin, highly sought after in Gulf foodservice and wholesale markets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Short-Haul Specialist:</strong> Shipped in 3–4 days via JNPT to Jebel Ali, Sharjah, and Muscat with mandatory pre-cooling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Strict Curing Protocols:</strong> Packhouse forced-air drying removes field dampness prior to container loading to eliminate black mold risk.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Live Harvest & Mandi Seasonal Availability Radar */}
        <section>
          <SeasonalCropRadar />
        </section>

        {/* Section: Packhouse Workflow & Quality Assurance */}
        <section className="space-y-6">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#0057B8]">
              Standard Operating Procedure
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              5-Stage Packhouse Grading, Pre-Cooling &amp; Loading Workflow
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Every export consignment undergoes an institutional packhouse procedure before port handover to ensure zero rejection at destination customs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                step: "01",
                title: "Manual Sorting & Trimming",
                desc: "Roots and tops trimmed to < 2.5cm; thick-necked, double, or sunburned bulbs removed.",
              },
              {
                step: "02",
                title: "Sortex & Mechanical Grading",
                desc: "Diverted through rotary sizing drums calibrated to 45–55mm, 50–60mm, and 55–65mm diameter bands.",
              },
              {
                step: "03",
                title: "Fungal Screening & Curing",
                desc: "Inspection under UV-illumination for Aspergillus niger (black mold) and neck rot; forced-air ambient drying.",
              },
              {
                step: "04",
                title: "Leno Mesh Bagging",
                desc: "Weighed on digital certified scales into 25kg red leno bags with barcode traceability tags.",
              },
              {
                step: "05",
                title: "Reefer Palletization & Sealing",
                desc: "Stowed in pre-tripped 40ft High Cube reefers at +2°C to +4°C with dual temperature data loggers and customs seals.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="font-mono text-2xl font-extrabold text-[#0057B8]">{s.step}</span>
                <h4 className="mt-2 text-sm font-bold text-slate-900">{s.title}</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Trade Corridors Matrix */}
        <section className="rounded-3xl bg-[#04152D] text-white p-8 sm:p-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
              Global Destination Corridors
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Fresh Onion Shipping Lanes from JNPT Nhava Sheva
            </h2>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              We manage weekly scheduled carrier sailings with Maersk, MSC, CMA CGM, and Hapag-Lloyd to ensure uninterrupted supply lines.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                lane: "India → UAE (Jebel Ali)",
                transit: "3–4 Days",
                freq: "Daily Sailings",
                specs: "45–55mm & 55mm+ in 25kg Leno Bags. Dubai Municipality compliant.",
                link: "/markets/export-to-uae",
              },
              {
                lane: "India → Saudi Arabia (Dammam)",
                transit: "5–6 Days",
                freq: "Bi-Weekly Sailings",
                specs: "SFDA registered. SABER portal compliance with COO & Phytosanitary.",
                link: "/markets/export-to-saudi-arabia",
              },
              {
                lane: "India → UK & Europe (Felixstowe / RTM)",
                transit: "21–24 Days",
                freq: "Weekly Reefer Service",
                specs: "Garwa onions exclusively. EU MRL tested and Aflatoxin certified.",
                link: "/markets/export-to-uk-europe",
              },
              {
                lane: "India → SE Asia (Singapore / Klang)",
                transit: "7–9 Days",
                freq: "Weekly Direct Service",
                specs: "Small/Medium 40–50mm & 45–55mm for wet markets and institutional caterers.",
                link: "/markets/export-to-southeast-asia",
              },
            ].map((c) => (
              <div key={c.lane} className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#FF8A00] font-bold">
                    <span>{c.transit}</span>
                    <span>{c.freq}</span>
                  </div>
                  <h4 className="mt-2 text-base font-bold text-white">{c.lane}</h4>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">{c.specs}</p>
                </div>
                <Link
                  to={c.link}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-300 hover:text-white"
                >
                  View Corridor Protocol →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Interactive RFQ Builder */}
        <section className="rounded-3xl border-2 border-[#0057B8]/20 bg-gradient-to-br from-white to-blue-50/50 p-8 sm:p-10 shadow-md">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0057B8]">
              Commercial Trade Desk
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Request Real-Time Mandi FOB / CIF Onion Quotation
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Configure your consignment parameters to generate an instant RFQ directly formatted for our export operations desk.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Calibration Size</label>
              <select
                value={rfqSize}
                onChange={(e) => setRfqSize(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm focus:border-blue-600 focus:outline-none"
              >
                <option value="40-50 mm">40–50 mm (Small / Gulf Standard)</option>
                <option value="45-55 mm">45–55 mm (Medium / Most Popular)</option>
                <option value="50-60 mm">50–60 mm (Large)</option>
                <option value="55-65 mm">55–65 mm (Jumbo / Supermarket Grade)</option>
                <option value="60 mm+">60 mm+ (Giant Extra Jumbo)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Packaging Type</label>
              <select
                value={rfqBags}
                onChange={(e) => setRfqBags(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm focus:border-blue-600 focus:outline-none"
              >
                <option value="25kg Red Leno Mesh Bags">25kg Red Leno Mesh Bags (Standard)</option>
                <option value="20kg Red Leno Mesh Bags">20kg Red Leno Mesh Bags</option>
                <option value="18kg Red Leno Mesh Bags">18kg Red Leno Mesh Bags</option>
                <option value="10kg Red Leno Mesh Bags">10kg Red Leno Mesh Bags</option>
                <option value="5kg Retail Mesh Bags">5kg Retail Consumer Packs</option>
                <option value="50kg Jute Bags">50kg Traditional Jute Bags</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Order Quantity</label>
              <select
                value={rfqQty}
                onChange={(e) => setRfqQty(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm focus:border-blue-600 focus:outline-none"
              >
                <option value="29 MT (1x40ft FCL)">29 MT (1x40ft Reefer FCL)</option>
                <option value="58 MT (2x40ft FCL)">58 MT (2x40ft Reefer FCL)</option>
                <option value="116 MT (4x40ft FCL)">116 MT (4x40ft Reefer FCL)</option>
                <option value="Monthly Contract (10+ Containers)">Monthly Recurring Program (10+ Containers)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Destination Port</label>
              <select
                value={rfqPort}
                onChange={(e) => setRfqPort(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm focus:border-blue-600 focus:outline-none"
              >
                <option value="Jebel Ali (Dubai, UAE)">Jebel Ali (Dubai, UAE)</option>
                <option value="King Abdulaziz Port (Dammam, KSA)">Dammam (Saudi Arabia)</option>
                <option value="Jeddah Islamic Port (KSA)">Jeddah (Saudi Arabia)</option>
                <option value="Shuwaikh (Kuwait)">Shuwaikh (Kuwait)</option>
                <option value="Hamad Port (Qatar)">Hamad Port (Qatar)</option>
                <option value="Sohar / Muscat (Oman)">Sohar / Muscat (Oman)</option>
                <option value="Singapore (Jurong)">Singapore (Jurong)</option>
                <option value="Port Klang (Malaysia)">Port Klang (Malaysia)</option>
                <option value="Felixstowe (UK)">Felixstowe (United Kingdom)</option>
                <option value="Rotterdam (Netherlands)">Rotterdam (Netherlands)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Incoterm</label>
              <select
                value={rfqIncoterm}
                onChange={(e) => setRfqIncoterm(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm focus:border-blue-600 focus:outline-none"
              >
                <option value="CIF">CIF (Cost, Insurance &amp; Freight)</option>
                <option value="CFR">CFR (Cost &amp; Freight)</option>
                <option value="FOB Nhava Sheva (JNPT)">FOB Nhava Sheva (JNPT Mumbai)</option>
                <option value="FOB Mundra">FOB Mundra Port (Gujarat)</option>
              </select>
            </div>

            <div className="flex items-end">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1fae53]"
              >
                <Phone className="h-4 w-4" />
                Dispatch RFQ via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Section: Frequently Asked Questions (FAQ) */}
        <section className="space-y-6">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
              Institutional FAQ
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Frequently Asked Questions: Indian Onion Export Procedures
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear answers regarding Minimum Order Quantity, Payment terms, Port transit, and Government certifications.
            </p>
          </div>

          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.question} className="p-6">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between text-left font-semibold text-slate-900 focus:outline-none"
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-500 transition-transform ${isOpen ? "rotate-180 text-blue-600" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Structured Entity Anchor Links (GEO) */}
        <footer className="rounded-2xl border border-slate-200 bg-slate-100 p-6 text-xs text-slate-600">
          <div className="font-bold uppercase tracking-wider text-slate-800">
            Authoritative Trade Standards &amp; Verification Resources:
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-blue-700">
            <a href="https://apeda.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">
              APEDA (Govt. of India) Onion Standards
            </a>
            <span>•</span>
            <a href="https://www.jnport.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">
              JNPT Nhava Sheva Cold Chain Terminal
            </a>
            <span>•</span>
            <a href="https://agmarknet.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">
              AGMARKNET Lasalgaon Mandi Daily Rates
            </a>
            <span>•</span>
            <Link to="/trade-compliance" className="hover:underline font-semibold text-slate-900">
              Sheshaan Global Trade Compliance Dossier
            </Link>
          </div>
        </footer>
      </main>
    </article>
  );
}
