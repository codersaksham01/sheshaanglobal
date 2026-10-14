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

const CANONICAL_URL = `${SITE_URL}/products/spices-masalas-exporter`;
const TITLE = "Spices & Masalas Exporter in India | Whole & Ground Bulk Supplier — Sheshaan Global";
const DESCRIPTION =
  "Spices Board of India certified exporter of premium whole and ground spices: Unjha Cumin (Jeera), Sangli Turmeric (Curcumin 3-5%), Guntur Red Chilli & Coriander. Machine-cleaned, sortex-graded, ETO-free, ASTA & EU-MRL compliant.";

const PRODUCT_JSONLD = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Indian Whole & Ground Spices (Turmeric, Cumin, Red Chilli, Coriander)",
  "image": "https://www.sheshaanglobal.com/assets/prod-spices.jpg",
  "description":
    "Export quality Indian spices sourced directly from Unjha, Sangli, Guntur, and Idukki. Machine cleaned, sortex graded, ETO-free whole spices and micro-pulverized spice powders packed in vacuum-sealed bags and multi-ply paper sacks.",
  "category": "Agricultural Produce > Spices & Herbs",
  "brand": { "@type": "Brand", name: "Sheshaan Global" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "price": "Variable as per NCDEX & Mandi Spot Rates",
    "priceValidUntil": "2027-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": { "@id": "https://www.sheshaanglobal.com/#organization" },
  },
  "additionalProperty": [
    { "@type": "PropertyValue", name: "HS Codes", value: "090931 (Cumin), 091030 (Turmeric), 090421 (Chilli), 090921 (Coriander)" },
    { "@type": "PropertyValue", name: "Quality Standards", value: "Machine Cleaned (99%), Sortex Cleaned (99.5%), ETO-Free / Steam Sterilized" },
    { "@type": "PropertyValue", name: "Packaging", value: "25kg / 50kg Multi-Wall Paper Sacks, Jute Bags, 1kg-5kg Vacuum Pouches" },
  ],
};

const FAQS = [
  {
    question: "What spice varieties and purities do you supply?",
    answer:
      "We supply Unjha Cumin seeds (Machine Cleaned 99% & Sortex 99.5%), Sangli/Salem Turmeric fingers and powder (Curcumin 3% to 5%), Guntur S4/Teja whole dried red chillies, and Eagle-quality Coriander seeds.",
  },
  {
    question: "Are your spices compliant with European (EU-MRL) and US FDA regulations?",
    answer:
      "Yes. Our spices are steam-sterilized (ETO-free) and tested at NABL-accredited labs for pesticide Maximum Residue Limits (MRL), Aflatoxin, Ochratoxin, and Salmonella, fully complying with EU Regulation 396/2005 and US FDA Food Safety Modernization Act standards.",
  },
  {
    question: "What is the Minimum Order Quantity (MOQ) for spices?",
    answer:
      "Our standard MOQ is one 20ft container (1x20ft FCL), carrying 14 to 18 MT of whole seeds or 18 to 22 MT of ground spice powders. Consolidated mixed containers (LCL/multi-commodity FCL) are available upon request.",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(FAQS);

export const Route = createFileRoute("/products/spices-masalas-exporter")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "spices exporter in india, indian spices wholesale, unjha cumin seeds exporter, turmeric finger bulk supplier, guntur red chilli export, spices board certified" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "product" },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://www.sheshaanglobal.com/assets/prod-spices.jpg" },
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
            { "@type": "ListItem", position: 3, name: "Spices & Masalas Exporter", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: SpicesProductPage,
});

function SpicesProductPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl({
    category: "Whole & Ground Indian Spices",
    message: "Inquiry for Bulk Spices Export: Interested in Cumin / Turmeric / Red Chilli / Coriander lots. Please share COA specifications and FOB Mundra / JNPT rates.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-700">Products</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Spices &amp; Masalas Exporter</span>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-[#04152D] via-[#331804] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
            <ShieldCheck className="h-4 w-4" />
            Spices Board of India Registered • ASTA &amp; EU-MRL Compliant
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Indian Spices Exporter: Premium Whole &amp; Ground Cumin, Turmeric, Chilli &amp; Coriander
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global is an authorized exporter of premium Indian spices</strong>, supplying food manufacturers, packaging brands, and wholesale spice merchants across the GCC, Europe, the USA, and Asia.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Request Spices Price List on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Commercial Spices Export Portfolio
            </h2>
            <p className="mt-3 text-base text-slate-700 leading-relaxed bg-blue-50/80 border-l-4 border-[#0057B8] p-4 rounded-r-lg">
              <strong>Quality Guarantee:</strong> All spice consignments are machine cleaned or sortex graded to 99.5% purity with steam sterilization options, packed in nitrogen-flushed or moisture-barrier sacks to maintain volatile oil content during transit.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Technical Data Sheet — Key Spices
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-bold w-1/4">Commodity</th>
                    <th scope="col" className="px-6 py-3 font-bold">HS Code</th>
                    <th scope="col" className="px-6 py-3 font-bold">Origin &amp; Grades</th>
                    <th scope="col" className="px-6 py-3 font-bold">Standard Packaging</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Cumin Seeds (Jeera)</th>
                    <td className="px-6 py-4 font-mono text-xs">09093129</td>
                    <td className="px-6 py-4">Unjha (Gujarat) • Machine Cleaned 99%, Sortex 99.5%</td>
                    <td className="px-6 py-4">25kg / 50kg PP &amp; Paper Bags</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Turmeric Fingers &amp; Powder</th>
                    <td className="px-6 py-4 font-mono text-xs">09103020 / 09103030</td>
                    <td className="px-6 py-4">Sangli &amp; Salem • Curcumin 3.0% to 5.0%+</td>
                    <td className="px-6 py-4">25kg Jute Bags / Craft Paper Sacks</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Dry Red Chilli</th>
                    <td className="px-6 py-4 font-mono text-xs">09042110</td>
                    <td className="px-6 py-4">Guntur (Andhra Pradesh) • S4 Sananam, Teja, Byadgi</td>
                    <td className="px-6 py-4">10kg / 25kg Jute Bags with stem/stemless</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Coriander Seeds (Dhania)</th>
                    <td className="px-6 py-4 font-mono text-xs">09092110</td>
                    <td className="px-6 py-4">Ramganj Mandi (Rajasthan) • Eagle, Scooter, Badami</td>
                    <td className="px-6 py-4">25kg PP / Multi-wall Paper Bags</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: Spices Export
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
