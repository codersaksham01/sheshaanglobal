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

const CANONICAL_URL = `${SITE_URL}/products/pulses-lentils-exporter`;
const TITLE = "Pulses & Lentils Exporter in India | Chickpeas & Dals Bulk Supplier — Sheshaan Global";
const DESCRIPTION =
  "Leading Indian pulses and lentils exporter. Sortex-cleaned Kabuli chickpeas (42-44, 44-46 count), Desi chickpeas, Toor dal (pigeon peas), red lentils (Masoor) & Moong dal. 99.5% purity, packed in 25kg/50kg PP bags, 24 MT/20ft FCL.";

const PRODUCT_JSONLD = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Indian Export Grade Pulses & Lentils (Chickpeas, Toor Dal, Lentils)",
  "image": "https://www.sheshaanglobal.com/assets/prod-pulses.jpg",
  "description":
    "Sortex-cleaned Indian pulses, Kabuli chickpeas, split pigeon peas, red lentils, and yellow peas. Graded for international food processors, distributors, and canning industries.",
  "category": "Agricultural Produce > Grains & Pulses",
  "brand": { "@type": "Brand", name: "Sheshaan Global" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "price": "Variable as per Mandi Commodity Spot Rates",
    "priceValidUntil": "2027-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": { "@id": "https://www.sheshaanglobal.com/#organization" },
  },
  "additionalProperty": [
    { "@type": "PropertyValue", name: "HS Codes", value: "071320 (Chickpeas), 071360 (Pigeon Peas), 071340 (Lentils)" },
    { "@type": "PropertyValue", name: "Purity & Quality", value: "Sortex Cleaned 99.5% Purity, Moisture < 12%" },
    { "@type": "PropertyValue", name: "Packaging", value: "25kg / 50kg PP Woven Bags & Jute Bags" },
    { "@type": "PropertyValue", name: "Container Load", value: "24 MT per 20ft FCL" },
  ],
};

const FAQS = [
  {
    question: "What grades and calibrations of chickpeas do you export?",
    answer:
      "We supply machine-cleaned and Sortex-graded Indian Kabuli chickpeas in 42–44 count (11–12mm jumbo), 44–46 count, and 58–60 count, as well as Brown Desi chickpeas (Chana) with 99.5% purity.",
  },
  {
    question: "What is the Minimum Order Quantity (MOQ) for pulses?",
    answer:
      "Our MOQ is one 20ft container (1x20ft FCL), carrying approximately 24 Metric Tons in 25kg or 50kg bags. Multi-pulse consolidated containers are available.",
  },
  {
    question: "Which quality and fumigation certifications are provided?",
    answer:
      "Every shipment is accompanied by a Government Phytosanitary Certificate, Phosphine/Methyl Bromide Fumigation Certificate, Certificate of Origin, and third-party inspection (SGS/Bureau Veritas) confirming moisture and purity.",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(FAQS);

export const Route = createFileRoute("/products/pulses-lentils-exporter")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "pulses exporter in india, chickpeas bulk supplier, kabuli chana export, indian lentils exporter, toor dal wholesale India, pulses board certified" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "product" },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://www.sheshaanglobal.com/assets/prod-pulses.jpg" },
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
            { "@type": "ListItem", position: 3, name: "Pulses & Lentils Exporter", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: PulsesProductPage,
});

function PulsesProductPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl({
    category: "Indian Pulses, Chickpeas & Lentils",
    message: "Inquiry for Bulk Pulses Export: Looking for Kabuli Chickpeas / Toor Dal / Lentils. Please share current FOB/CIF container rates and available count grades.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-700">Products</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Pulses &amp; Lentils Exporter in India</span>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-[#04152D] via-[#241a0d] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
            <ShieldCheck className="h-4 w-4" />
            Sortex Cleaned 99.5% Purity • Moisture &lt; 12%
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Indian Pulses &amp; Lentils Exporter: Sortex Cleaned Chickpeas, Dals &amp; Pigeon Peas
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global is an established exporter of Indian pulses and lentils</strong>, delivering machine-cleaned and sortex-graded Kabuli chickpeas, Toor dal, red lentils, and moong beans to wholesale buyers across the GCC, Africa, and Asia.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Request Pulses Price List on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Commercial Pulses Export Specifications
            </h2>
            <p className="mt-3 text-base text-slate-700 leading-relaxed bg-blue-50/80 border-l-4 border-[#0057B8] p-4 rounded-r-lg">
              <strong>Quick Container Metrics:</strong> Export pulses are loaded in 20ft dry containers carrying 24 Metric Tons in 25kg or 50kg PP bags. Pre-shipment fumigation and SGS inspection certify purity, moisture, and absence of weevil damage.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Technical Data Sheet — Key Pulses
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-bold w-1/4">Commodity</th>
                    <th scope="col" className="px-6 py-3 font-bold">HS Code</th>
                    <th scope="col" className="px-6 py-3 font-bold">Calibration &amp; Grades</th>
                    <th scope="col" className="px-6 py-3 font-bold">Container Load</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Kabuli Chickpeas (Garbanzo)</th>
                    <td className="px-6 py-4 font-mono text-xs">07132000</td>
                    <td className="px-6 py-4">42–44 count (11–12mm), 44–46 count, 58–60 count</td>
                    <td className="px-6 py-4 font-semibold">24 MT per 20ft FCL</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Toor Dal (Split Pigeon Peas)</th>
                    <td className="px-6 py-4 font-mono text-xs">07136000</td>
                    <td className="px-6 py-4">Oily / Non-Oily Sortex Cleaned (Fat &lt; 1.5%)</td>
                    <td className="px-6 py-4 font-semibold">24 MT per 20ft FCL</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Red Lentils (Masoor Dal)</th>
                    <td className="px-6 py-4 font-mono text-xs">07134000</td>
                    <td className="px-6 py-4">Football &amp; Split Polished Grade (Purity 99.5%)</td>
                    <td className="px-6 py-4 font-semibold">24 MT per 20ft FCL</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Moong Beans (Green Gram)</th>
                    <td className="px-6 py-4 font-mono text-xs">07133100</td>
                    <td className="px-6 py-4">Whole Green &amp; Yellow Split (Sortex Cleaned)</td>
                    <td className="px-6 py-4 font-semibold">24 MT per 20ft FCL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: Pulses &amp; Lentils
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
