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
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import {
  ORGANIZATION_JSONLD,
  buildFaqPageSchema,
  buildWhatsAppUrl,
} from "@/lib/site";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const CANONICAL_URL = `${SITE_URL}/products/green-chillies-exporter`;
const TITLE = "Green Chillies Exporter in India | G4 & Teja Cold-Chain Bulk Supplier — Sheshaan Global";
const DESCRIPTION =
  "APEDA-certified Indian green chillies exporter. Sourced from Maharashtra, Gujarat & Andhra Pradesh. G4 & Teja varieties graded 7-11cm. Shipped in 4kg/5kg cartons under +7°C to +10°C cold chain via JNPT & air cargo.";

const PRODUCT_JSONLD = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Indian Fresh Green Chillies (G4 & Teja Varieties)",
  "image": "https://www.sheshaanglobal.com/assets/prod-chillies.jpg",
  "description":
    "Export-grade Indian fresh green chillies (G4, Teja, Guntur Sannam). Machine sorted, pre-cooled, and packed in 4kg/5kg ventilated corrugated cartons. Exported via JNPT reefer container and air cargo to GCC and Europe.",
  "category": "Agricultural Produce > Vegetables > Chillies",
  "brand": {
    "@type": "Brand",
    "name": "Sheshaan Global",
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "price": "Variable as per Mandi Rates",
    "priceValidUntil": "2027-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@id": "https://www.sheshaanglobal.com/#organization",
    },
  },
  "additionalProperty": [
    { "@type": "PropertyValue", name: "HS Code", value: "07096010" },
    { "@type": "PropertyValue", name: "Origin", value: "Maharashtra / Gujarat / Andhra Pradesh, India" },
    { "@type": "PropertyValue", name: "Varieties", value: "G4, Teja, Guntur S4, Kiran" },
    { "@type": "PropertyValue", name: "Standard Packing", value: "4kg, 5kg Corrugated Ventilated Cartons" },
  ],
};

const FAQS = [
  {
    question: "What is the Minimum Order Quantity (MOQ) for green chillies exports?",
    answer:
      "For sea shipments, our MOQ is one 40ft High Cube reefer container holding approximately 12 to 14 Metric Tons in 4kg/5kg cartons. For air freight to Dubai, London, or Singapore, the MOQ is 1,000 kg (1 MT) palletized.",
  },
  {
    question: "What temperature and humidity are maintained during green chilli transit?",
    answer:
      "Consignments are pre-cooled immediately after harvest to remove field heat and shipped at +7°C to +10°C with 85–90% relative humidity and 15–20 CBM/hr ventilation to prevent dehydration and chilling injury.",
  },
  {
    question: "Which quality and pesticide residue tests are performed?",
    answer:
      "Every lot undergoes rigorous pesticide residue screening (EU MRL compliance / APEDA HortiNet certification) conducted by NABL-accredited laboratories, along with Phytosanitary and Certificate of Origin documentation.",
  },
  {
    question: "What are the ocean and air transit times for green chillies?",
    answer:
      "Air shipments from Mumbai (BOM) reach Dubai (DXB) in 3.5 hours and London (LHR) in 9 hours. Sea shipments from JNPT reach Jebel Ali in 3–4 days and Dammam in 5–6 days.",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(FAQS);

export const Route = createFileRoute("/products/green-chillies-exporter")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "green chillies exporter in india, G4 green chilli supplier, teja chillies export, fresh chillies JNPT cold chain, Indian spicy peppers wholesale" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "product" },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://www.sheshaanglobal.com/assets/prod-chillies.jpg" },
    ],
    links: [{ rel: "canonical", href: CANONICAL_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ORGANIZATION_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(PRODUCT_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
            { "@type": "ListItem", position: 3, name: "Green Chillies Exporter", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: GreenChilliesPage,
});

function GreenChilliesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl({
    category: "Fresh Green Chillies (G4 / Teja)",
    message: "Inquiry for Export-Grade Fresh Green Chillies: Please share current FOB/CIF rates, carton packaging details, and available flight/reefer schedules.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-700">Products</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Green Chillies Exporter in India</span>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-[#04152D] via-[#062f1c] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            Cold-Chain Pre-Cooled &amp; APEDA HortiNet Certified
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Indian Green Chillies Exporter: Premium G4 &amp; Teja Varieties with Cold-Chain Integrity
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global is a premier Indian exporter of fresh green chillies</strong>, supplying high-pungency G4, Teja, and Guntur chillies harvested from Maharashtra, Gujarat, and Andhra Pradesh to wholesale food distributors in the Middle East and Europe.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Request Chilli Export Quote on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Commercial Green Chilli Export Specifications
            </h2>
            <p className="mt-3 text-base text-slate-700 leading-relaxed bg-blue-50/80 border-l-4 border-[#0057B8] p-4 rounded-r-lg">
              <strong>Quick Procurement Facts:</strong> Fresh green chillies are packed in 4kg and 5kg ventilated corrugated fiberboard cartons. Sea shipments hold 12–14 MT per 40ft reefer container under +7°C to +10°C, while air cargo shipments depart daily from Mumbai (BOM) with rapid customs clearance.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Technical Data Sheet — HS 07096010
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-bold w-1/3">Parameter</th>
                    <th scope="col" className="px-6 py-3 font-bold">Export Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">HS Code</th>
                    <td className="px-6 py-4 font-mono">07096010 (Fresh Green Chillies)</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Major Varieties</th>
                    <td className="px-6 py-4">G4 (Long Bright Green, Pungent), Teja (Slender, High Capsaicin), Byadgi, Kiran</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Pod Length Calibration</th>
                    <td className="px-6 py-4">7 to 9 cm, 9 to 11 cm, 10 to 12 cm with intact green calyx/stem</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Packaging</th>
                    <td className="px-6 py-4">4kg &amp; 5kg 3-ply/5-ply Ventilated Corrugated Cartons with food-grade paper liners</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Cold Chain Setpoint</th>
                    <td className="px-6 py-4 font-mono text-xs">Temperature: +7°C to +10°C | Relative Humidity: 85–90% RH</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Dispatch Modes</th>
                    <td className="px-6 py-4">40ft Reefer Container (12–14 MT) via JNPT / Mundra | Air Cargo (1–3 MT lots) via BOM/DEL</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Statutory Clearances</th>
                    <td className="px-6 py-4">APEDA HortiNet, Phytosanitary, EU MRL Lab Test, Certificate of Origin</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: Green Chilli Exports
          </h2>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {FAQS.map((faq, idx) => (
              <div key={faq.question} className="p-6">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between text-left font-semibold text-slate-900 focus:outline-none"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform ${openFaq === idx ? "rotate-180 text-blue-600" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </article>
  );
}
