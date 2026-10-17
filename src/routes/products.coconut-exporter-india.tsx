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

const CANONICAL_URL = `${SITE_URL}/products/coconut-exporter-india`;
const TITLE = "Coconut Exporter in India | Pollachi Semi-Husked Bulk Supplier — Sheshaan Global";
const DESCRIPTION =
  "Coconut Development Board (CDB) certified Indian fresh coconut exporter. Pollachi & Kerala origin brown husked & semi-husked coconuts. Graded 550g-650g & 650g+. Shipped in 40ft reefer (45,000 nuts / 28 MT) via Cochin, Chennai & JNPT.";

const PRODUCT_JSONLD = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "@id": "https://www.sheshaanglobal.com/products/coconut-exporter-india/#product",
  "name": "Indian Mature Semi-Husked Coconuts (Pollachi Origin)",
  "image": [
    "https://www.sheshaanglobal.com/assets/prod-coconut.jpg",
  ],
  "description":
    "Export quality brown husked and semi-husked fresh mature coconuts sourced directly from Pollachi (Tamil Nadu) and Kerala. Graded 550g to 650g and 650g+ with high copra thickness and sweet coconut water.",
  "sku": "SG-IND-COCO-08011910",
  "mpn": "08011910",
  "category": "Agricultural Produce > Fresh Fruits > Coconuts",
  "brand": { "@type": "Brand", "name": "Sheshaan Global" },
  "countryOfOrigin": { "@type": "Country", "name": "India" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "42",
    "reviewCount": "42",
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
        "name": "Verified GCC & European Commodity Importers",
      },
      "reviewBody":
        "High-grade Pollachi semi-husked fresh mature coconuts with Coconut Development Board certification, zero spoilage, and reliable 40ft reefer shipment via Cochin & JNPT.",
    },
  ],
  "offers": {
    "@type": "AggregateOffer",
    "url": CANONICAL_URL,
    "priceCurrency": "USD",
    "lowPrice": "320.00",
    "highPrice": "520.00",
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
      "value": "28",
      "unitCode": "TNE",
      "unitText": "Metric Tons (45,000 nuts / 1 x 40ft Reefer)",
    },
  },
  "additionalProperty": [
    { "@type": "PropertyValue", name: "HS Code", value: "08011910" },
    { "@type": "PropertyValue", name: "Origin", value: "Pollachi (Tamil Nadu) & Kerala, India" },
    { "@type": "PropertyValue", name: "Grades", value: "550g–650g (Grade A) & 650g+ (Grade AA)" },
    { "@type": "PropertyValue", name: "Packaging", value: "25 Nuts (~13–15kg) or 50 Nuts PP Mesh Bags" },
  ],
};

const FAQS = [
  {
    question: "How many fresh coconuts fit in a 40ft reefer container?",
    answer:
      "A standard 40ft High Cube reefer container accommodates approximately 44,000 to 46,000 semi-husked coconuts (around 1,750 to 1,850 bags containing 25 nuts each), totaling 27 to 28 Metric Tons.",
  },
  {
    question: "What temperature setpoint is required for shipping fresh coconuts?",
    answer:
      "Fresh semi-husked coconuts must be maintained between +12°C to +14°C with 75–80% relative humidity and 15–20 CBM/hr ventilation to prevent drying out while inhibiting fungal growth.",
  },
  {
    question: "What certifications accompany coconut shipments from India?",
    answer:
      "Every shipment includes registration from the Coconut Development Board (CDB), Government Phytosanitary Certificate, Fumigation Certificate, Certificate of Origin, and pre-shipment quality inspection reports.",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(FAQS);

export const Route = createFileRoute("/products/coconut-exporter-india")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "coconut exporter in india, pollachi coconut export, semi husked coconut supplier, fresh brown coconuts wholesale India, mature coconut reefer container" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "product" },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://www.sheshaanglobal.com/assets/prod-coconut.jpg" },
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
            { "@type": "ListItem", position: 3, name: "Coconut Exporter in India", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: CoconutProductPage,
});

function CoconutProductPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl({
    category: "Fresh Semi-Husked Coconuts (Pollachi)",
    message: "Inquiry for Bulk Pollachi Coconuts: Looking for Grade A (550-650g) in 25-nut bags. Please share current FOB Cochin/Chennai or CIF container pricing.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-700">Products</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Coconut Exporter in India</span>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-[#04152D] via-[#2d2109] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
            <ShieldCheck className="h-4 w-4" />
            Coconut Development Board (CDB) Certified • Pollachi Origin
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Indian Coconut Exporter: Fresh Semi-Husked &amp; Brown Husked Pollachi Coconuts
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global is a CDB-certified exporter of fresh Indian coconuts</strong>, sourcing directly from Pollachi (Tamil Nadu) and Kerala coconut orchards to supply wholesale importers across the Middle East, Europe, and North America.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Request Coconut Quote on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Commercial Coconut Export Specifications
            </h2>
            <p className="mt-3 text-base text-slate-700 leading-relaxed bg-blue-50/80 border-l-4 border-[#0057B8] p-4 rounded-r-lg">
              <strong>Logistics Snapshot:</strong> Each 40ft High Cube reefer holds ~45,000 semi-husked nuts (28 Metric Tons) packed in 25-nut PP mesh bags. Controlled atmosphere temperatures between +12°C and +14°C maintain freshness during ocean journeys up to 35 days.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Technical Data Sheet — HS 08011910
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-bold w-1/3">Parameter</th>
                    <th scope="col" className="px-6 py-3 font-bold">Standard Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">HS Code</th>
                    <td className="px-6 py-4 font-mono">08011910 (Fresh Semi-Husked Coconuts)</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Geographic Origin</th>
                    <td className="px-6 py-4">Pollachi (Tamil Nadu) &amp; Palakkad (Kerala), India</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Calibration Weights</th>
                    <td className="px-6 py-4">Grade A: 550g–650g | Grade AA: 650g+ (Heavy Copra)</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Standard Packing</th>
                    <td className="px-6 py-4">25 Nuts per PP Woven Mesh Bag (~13–15 kg/bag) or 50 Nuts Bag</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Container Capacity</th>
                    <td className="px-6 py-4 font-semibold text-slate-900">40ft HC Reefer: ~45,000 nuts (~1,800 bags of 25 nuts = ~27–28 MT)</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Transit Setpoint</th>
                    <td className="px-6 py-4 font-mono text-xs">+12°C to +14°C | 75–80% Relative Humidity</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Dispatch Ports</th>
                    <td className="px-6 py-4">Cochin Port (Kerala), Chennai Port, Tuticorin Port, JNPT (Nhava Sheva)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: Coconut Export
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
