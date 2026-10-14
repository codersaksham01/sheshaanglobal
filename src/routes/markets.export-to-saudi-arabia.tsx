import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Ship,
  Phone,
  ArrowRight,
  ChevronDown,
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

const CANONICAL_URL = `${SITE_URL}/markets/export-to-saudi-arabia`;
const TITLE = "Export to Saudi Arabia (Dammam & Jeddah) | Indian Agricultural Exporter — Sheshaan Global";
const DESCRIPTION =
  "Dedicated shipping lane from India (JNPT & Mundra) to Kingdom of Saudi Arabia: King Abdulaziz Port Dammam & Jeddah Islamic Port. 5-6 days transit for 1121 Basmati rice, fresh onions & spices. SFDA & SABER compliant.";

const KSA_FAQS = [
  {
    question: "What are the sea transit times from Indian ports to Saudi Arabia?",
    answer:
      "Transit from JNPT or Mundra to King Abdulaziz Port (Dammam) is approximately 5 to 6 days. Shipments to Jeddah Islamic Port on the Red Sea take approximately 7 to 9 days.",
  },
  {
    question: "What regulatory compliance is required by the Saudi Food and Drug Authority (SFDA)?",
    answer:
      "All consignments must be registered via the SABER electronic system with an approved Conformity Assessment Body. Documents include an original Commercial Invoice, Packing List, Bill of Lading, Halal Certificate (where applicable), Phytosanitary Certificate, and Certificate of Origin.",
  },
  {
    question: "Which Indian agricultural products lead export volume to Saudi Arabia?",
    answer:
      "Our largest export volumes to Saudi Arabia include 1121 and 1509 Aged Basmati Rice (Steam and Golden Sella), fresh Nashik red onions, whole Unjha cumin seeds, turmeric fingers, and sortex-cleaned chickpeas.",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(KSA_FAQS);

export const Route = createFileRoute("/markets/export-to-saudi-arabia")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "export to saudi arabia agriculture, basmati rice export to dammam, indian onions jeddah port, SFDA food export compliance, SABER registration Indian exporters" },
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
            { "@type": "ListItem", position: 3, name: "Export to Saudi Arabia", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: ExportToKsaPage,
});

function ExportToKsaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl({
    category: "Saudi Arabia Export Corridor",
    country: "Saudi Arabia",
    message: "Inquiry for container shipments to Dammam / Jeddah: Looking for Basmati Rice / Onions / Spices pricing and SFDA clearance documentation.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link to="/global-export-markets" className="hover:text-blue-700">Markets</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Export to Saudi Arabia</span>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-[#04152D] via-[#123824] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            SFDA Registered • SABER Compliant • 5–6 Days Sea Transit
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Indian Agricultural Export Corridor: India → Kingdom of Saudi Arabia (Dammam &amp; Jeddah)
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global coordinates bulk FCL agricultural shipments to the Kingdom of Saudi Arabia</strong>, servicing major food importers, catering firms, and rice distributors through Dammam and Jeddah with complete SFDA documentation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Book KSA Container Lot on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Corridor Specifications: India to Saudi Arabia Matrix
            </h2>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-3 font-bold w-1/3">Parameter</th>
                  <th scope="col" className="px-6 py-3 font-bold">Standard Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Origin Ports</th>
                  <td className="px-6 py-4">Nhava Sheva (JNPT Mumbai) &amp; Mundra Port (Gujarat)</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Discharge Ports</th>
                  <td className="px-6 py-4 font-medium">King Abdulaziz Port (Dammam) &amp; Jeddah Islamic Port</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Sea Transit Time</th>
                  <td className="px-6 py-4 font-bold text-blue-900">Dammam: 5–6 Days | Jeddah: 7–9 Days</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Lead Commodities</th>
                  <td className="px-6 py-4">1121 &amp; 1509 Aged Basmati Rice, Fresh Red Onions, Cumin &amp; Turmeric Spices, Chickpeas</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Regulatory Protocol</th>
                  <td className="px-6 py-4">SFDA clearance, SABER e-platform conformity, Phytosanitary Certificate, Certificate of Origin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: Saudi Arabia Export Trade
          </h2>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {KSA_FAQS.map((faq, idx) => (
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
