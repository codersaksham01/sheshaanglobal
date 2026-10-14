import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Ship,
  Phone,
  ArrowRight,
  ChevronDown,
  Clock,
  Anchor,
  CheckCircle2,
} from "lucide-react";
import {
  BLUE,
  ORANGE,
  NAVY,
  ORGANIZATION_JSONLD,
  buildFaqPageSchema,
  buildWhatsAppUrl,
} from "@/lib/site";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const CANONICAL_URL = `${SITE_URL}/markets/export-to-uae`;
const TITLE = "Export to UAE (Dubai & Jebel Ali) | Indian Agricultural Exporter — Sheshaan Global";
const DESCRIPTION =
  "Dedicated shipping lane from India (JNPT Nhava Sheva & Mundra) to United Arab Emirates: Jebel Ali Port, Sharjah Port Khalid & Khalifa Port. 3-4 days sea transit for fresh onions, green chillies, Basmati rice & coconuts. Dubai Municipality compliant.";

const UAE_FAQS = [
  {
    question: "What is the ocean transit time from JNPT to Jebel Ali Port (Dubai)?",
    answer:
      "Direct container vessels operated by Maersk, MSC, and CMA CGM achieve transit in 3 to 4 days from JNPT (Nhava Sheva, Mumbai) and Mundra Port directly to Jebel Ali Port in Dubai.",
  },
  {
    question: "Which Indian agricultural commodities are in highest demand in the UAE?",
    answer:
      "Our highest volume shipments to Dubai, Sharjah, and Abu Dhabi are fresh Nashik red onions (45–55mm & 55mm+ in 25kg red mesh bags), G4 green chillies in 4kg cartons, 1121 and 1509 aged Basmati rice, and mature semi-husked Pollachi coconuts.",
  },
  {
    question: "What import documentation is required by Dubai Municipality?",
    answer:
      "Consignments require an original Bill of Lading, Commercial Invoice, Packing List, Certificate of Origin (COO), and official Phytosanitary Certificate issued by the Ministry of Agriculture (Govt. of India), adhering to GSO standards.",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(UAE_FAQS);

export const Route = createFileRoute("/markets/export-to-uae")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "export to UAE agriculture, indian onion export to Dubai, basmati rice exporter Jebel Ali, fresh produce JNPT to UAE, dubai municipality food import standards" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://www.sheshaanglobal.com/assets/logo.png" },
    ],
    links: [{ rel: "canonical", href: CANONICAL_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ORGANIZATION_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Global Markets", item: `${SITE_URL}/global-export-markets` },
            { "@type": "ListItem", position: 3, name: "Export to UAE", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: ExportToUaePage,
});

function ExportToUaePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl({
    category: "UAE Export Corridor (Jebel Ali)",
    country: "United Arab Emirates",
    message: "Inquiry for container shipments to Jebel Ali / Dubai: Looking for Fresh Onions / Chillies / Rice pricing and departure schedules.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link to="/global-export-markets" className="hover:text-blue-700">Markets</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Export to UAE</span>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-[#04152D] via-[#0b335c] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
            <Ship className="h-4 w-4" />
            Direct 3–4 Days Sea Transit • Daily / Bi-Weekly Ocean Sailings
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Indian Agricultural Export Corridor: India → United Arab Emirates (Dubai &amp; Jebel Ali)
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global operates regular commercial container services from JNPT (Nhava Sheva) and Mundra to the UAE</strong>, supplying fresh Nashik red onions, G4 green chillies, Basmati rice, and mature coconuts to Dubai's Al Aweer Central Fruit &amp; Vegetable Market, major supermarket distributors, and food processing facilities.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Book UAE Container Lot on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Corridor Specifications: India to UAE Shipping Matrix
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Standard operating metrics for containerized sea shipments arriving at UAE gateway ports.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-3 font-bold w-1/3">Parameter</th>
                  <th scope="col" className="px-6 py-3 font-bold">Corridor Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Origin Loading Ports</th>
                  <td className="px-6 py-4">Nhava Sheva (JNPT, Mumbai) &amp; Mundra Port (Gujarat)</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Destination Discharge Ports</th>
                  <td className="px-6 py-4 font-medium">Jebel Ali Port (Dubai), Sharjah Port Khalid, Khalifa Port (Abu Dhabi)</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Ocean Transit Duration</th>
                  <td className="px-6 py-4 font-bold text-blue-900">3 to 4 Days Direct Port-to-Port</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Lead Export Commodities</th>
                  <td className="px-6 py-4">Fresh Nashik Red Onions (29 MT reefer), G4 Green Chillies, 1121 Basmati Rice, Coconuts</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Municipal Standards</th>
                  <td className="px-6 py-4">Dubai Municipality Food Safety Department, MOIAT, GSO Standards</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: UAE Agricultural Shipments
          </h2>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {UAE_FAQS.map((faq, idx) => (
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
