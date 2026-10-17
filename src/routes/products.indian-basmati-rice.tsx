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
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { ContainerLoadingCalculator } from "@/components/ContainerLoadingCalculator";
import {
  ORGANIZATION_JSONLD,
  buildFaqPageSchema,
  buildWhatsAppUrl,
} from "@/lib/site";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const CANONICAL_URL = `${SITE_URL}/products/indian-basmati-rice`;
const TITLE = "Indian Basmati Rice Exporter | 1121 & 1509 Bulk Supplier — Sheshaan Global";
const DESCRIPTION =
  "APEDA-certified Indian Basmati rice exporter. Premium 1121, 1509, Sugandha and Sharbati varieties. Steam, Sella (Parboiled) & Raw. Aged 2+ years, 8.35mm+ grain length. Shipped in 20ft FCL (25-26 MT) via Mundra & JNPT.";

const PRODUCT_JSONLD = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "@id": "https://www.sheshaanglobal.com/products/indian-basmati-rice/#product",
  "name": "Indian Aged Basmati Rice (1121 & 1509 Varieties)",
  "image": [
    "https://www.sheshaanglobal.com/assets/prod-rice.jpg",
  ],
  "description":
    "Sortex-cleaned 100% pure aged Indian Basmati rice. Extra-long grain (8.35mm+), aromatic, 2+ years aged. Packed in 5kg, 10kg, 20kg, 25kg, and 50kg BOPP / non-woven bags. Shipped globally in 20ft FCL containers.",
  "sku": "SG-IND-RICE-10063020",
  "mpn": "10063020",
  "category": "Agricultural Produce > Grains > Basmati Rice",
  "brand": { "@type": "Brand", "name": "Sheshaan Global" },
  "countryOfOrigin": { "@type": "Country", "name": "India" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "54",
    "reviewCount": "54",
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
        "name": "Verified Global Grain Distributors",
      },
      "reviewBody":
        "Extra-long 1121 Steam and Golden Sella Basmati rice with exceptional elongation, authentic aroma, Sortex cleaning, and fumigated 20ft FCL delivery via Mundra Port.",
    },
  ],
  "offers": {
    "@type": "AggregateOffer",
    "url": CANONICAL_URL,
    "priceCurrency": "USD",
    "lowPrice": "880.00",
    "highPrice": "1420.00",
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
      "value": "25",
      "unitCode": "TNE",
      "unitText": "Metric Tons (1 x 20ft Heavy FCL)",
    },
  },
  "additionalProperty": [
    { "@type": "PropertyValue", name: "HS Code", value: "10063020" },
    { "@type": "PropertyValue", name: "Origin", value: "Haryana / Punjab / Uttar Pradesh, India" },
    { "@type": "PropertyValue", name: "Varieties", value: "1121 Basmati, 1509 Basmati, Sugandha, Pusa, Traditional" },
    { "@type": "PropertyValue", name: "Grain Length", value: "8.35 mm to 8.45 mm Average" },
    { "@type": "PropertyValue", name: "Processing", value: "Steam, Creamy Sella, Golden Sella, Raw" },
  ],
};

const FAQS = [
  {
    question: "What is the Minimum Order Quantity (MOQ) for Basmati rice export?",
    answer:
      "Our MOQ is one 20ft container (1x20ft FCL), carrying 25 to 26 Metric Tons. We also accommodate private-label retail packaging assortments in 40ft containers.",
  },
  {
    question: "What is the difference between Steam, Creamy Sella, and Golden Sella Basmati?",
    answer:
      "Steam Basmati preserves traditional aromatic sweetness with bright white pearls. Sella (Parboiled) undergoes hydrothermal steaming before milling, locking in micronutrients, preventing grain breakage during cooking, and extending shelf stability for Middle Eastern caterers.",
  },
  {
    question: "Do you offer private-label buyer branding on rice packaging?",
    answer:
      "Yes. We support custom cylindrical gravure printing on BOPP laminated bags, non-woven fabric bags, and premium jute bags in 1kg, 5kg, 10kg, 20kg, 25kg, and 50kg sizes with complete buyer brand artwork.",
  },
  {
    question: "Which pre-shipment inspections are conducted on rice consignments?",
    answer:
      "Every consignment is tested for DNA purity (minimum 95% Basmati authenticity), moisture (&lt; 12.5%), aflatoxin, pesticide residue (EU-MRL standards), and SGS weight/quality verification.",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(FAQS);

export const Route = createFileRoute("/products/indian-basmati-rice")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "indian basmati rice exporter, 1121 basmati rice bulk supplier, 1509 sella rice export, aged basmati rice India, non basmati rice exporter Mundra" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "product" },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://www.sheshaanglobal.com/assets/prod-rice.jpg" },
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
            { "@type": "ListItem", position: 3, name: "Indian Basmati Rice", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: BasmatiRicePage,
});

function BasmatiRicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedHs, setCopiedHs] = useState(false);
  const waUrl = buildWhatsAppUrl({
    category: "Indian Basmati Rice (1121 & 1509)",
    message: "Inquiry for Bulk Indian Basmati Rice Export: Looking for 1121/1509 Steam/Sella rice. Please share current FOB Mundra / CIF quotes and packaging options.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-700">Products</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Indian Basmati Rice</span>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-[#04152D] via-[#211a0d] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
            <ShieldCheck className="h-4 w-4" />
            Aged 2+ Years • 8.35mm+ Average Grain Length • DNA Tested
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Indian Basmati Rice Exporter: 1121, 1509, Sugandha &amp; Parboiled Sella
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global is a trusted Indian exporter of premium aged Basmati rice</strong>, supplying 1121 Steam, Golden Sella, Creamy Sella, and 1509 varieties to wholesale food importers across Saudi Arabia, UAE, Iraq, UK, and North America.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Request Rice Quotation on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Commercial Basmati Rice Export Parameters
            </h2>
            <p className="mt-3 text-base text-slate-700 leading-relaxed bg-blue-50/80 border-l-4 border-[#0057B8] p-4 rounded-r-lg">
              <strong>Export Logistics Summary:</strong> Basmati rice is loaded into 20ft dry containers carrying 25 to 26 Metric Tons in 25kg or 50kg BOPP bags, dispatched through Mundra Port and JNPT Nhava Sheva with comprehensive SGS pre-shipment quality and weight inspection.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Technical Data Sheet — HS 10063020
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
                    <td className="px-6 py-4 font-mono font-medium text-blue-900">
                      <div className="flex items-center justify-between">
                        <span>10063020 (Basmati Rice, Semi-milled or wholly milled)</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText("10063020");
                            setCopiedHs(true);
                            toast.success("Copied HS Code 10063020 to clipboard!");
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
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Varieties Offered</th>
                    <td className="px-6 py-4">1121 Basmati (Steam / Sella), 1509 Basmati, Sugandha, Pusa, Traditional Aged</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Average Grain Length (AGL)</th>
                    <td className="px-6 py-4 font-medium">8.35 mm to 8.40 mm before cooking; elongates to 18.0 mm – 24.0 mm cooked</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Elongation Ratio</th>
                    <td className="px-6 py-4 font-semibold text-emerald-800">2.2x to 2.5x Length Expansion Upon Cooking</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Sortex Optical Purity</th>
                    <td className="px-6 py-4 font-semibold text-slate-900">95.0% Minimum Guaranteed Purity (Double Sortexed)</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Moisture Content</th>
                    <td className="px-6 py-4">&lt; 12.0% Maximum (Hermetically Silo Cured)</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Broken Percentage</th>
                    <td className="px-6 py-4">&lt; 1.0% Maximum (Steam &amp; Sella) | &lt; 2.0% Maximum (Raw)</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Damaged / Discolored Grains</th>
                    <td className="px-6 py-4">&lt; 0.5% Maximum | Paddy Grains: Nil</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Natural Aroma Compound</th>
                    <td className="px-6 py-4">High 2-Acetyl-1-pyrroline (2-AP) natural fragrance profile</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Maturation &amp; Aging</th>
                    <td className="px-6 py-4">12 to 24 Months naturally aged in temperature-controlled warehouses</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Packaging</th>
                    <td className="px-6 py-4">5kg, 10kg, 20kg, 25kg, 50kg Non-Woven PP, BOPP Laminated, or Jute Bags</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Container Load</th>
                    <td className="px-6 py-4 font-semibold text-slate-900">25 to 26 Metric Tons per 20ft Dry Box Container (Heavy Payload)</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Dispatch Ports</th>
                    <td className="px-6 py-4">Mundra Port (Gujarat), JNPT (Nhava Sheva, Mumbai)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section: Interactive Container Load & Packing Spec Calculator */}
        <section>
          <ContainerLoadingCalculator
            productName="Indian Basmati Rice (1121 & 1509)"
            hsCode="10063020"
            container20ftText="26 MT Dry FCL"
            container40ftText="28 MT Dry FCL"
            defaultBagKg={25}
          />
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: Basmati Rice Export
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
