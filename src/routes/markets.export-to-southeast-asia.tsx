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

const CANONICAL_URL = `${SITE_URL}/markets/export-to-southeast-asia`;
const TITLE = "Export to Southeast Asia (Singapore & Malaysia) | Indian Agricultural Exporter — Sheshaan Global";
const DESCRIPTION =
  "Dedicated shipping corridor from India (JNPT & Chennai) to Southeast Asia: Port of Singapore (Jurong), Port Klang (Malaysia) & Chittagong. 7-9 days sea transit for fresh red onions, chillies, rice & spices. SFA & MAQIS compliant.";

const SEA_FAQS = [
  {
    question: "What are the ocean transit times from India to Singapore and Malaysia?",
    answer:
      "Transit from JNPT (Nhava Sheva) and Chennai Port to the Port of Singapore (Jurong) is approximately 7 to 9 days. Transit to Port Klang (Malaysia) is approximately 7 to 8 days.",
  },
  {
    question: "Which onion sizes are preferred by Southeast Asian buyers?",
    answer:
      "Wholesale wet markets and institutional caterers in Singapore, Malaysia, and Bangladesh favor small-to-medium calibrated sizes: 40–50mm and 45–55mm Nashik red onions packed in 10kg and 25kg red leno mesh bags.",
  },
  {
    question: "What certifications are required for import clearance in Singapore and Malaysia?",
    answer:
      "Consignments require a standard Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin (Form AIFTA for duty concessions), Phytosanitary Certificate (NPPO India), and compliance with Singapore Food Agency (SFA) or Malaysian Quarantine and Inspection Services (MAQIS) standards.",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(SEA_FAQS);

export const Route = createFileRoute("/markets/export-to-southeast-asia")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "export to southeast asia agriculture, indian onions to Singapore Jurong, Port Klang onion imports, SFA food clearance India, MAQIS agricultural quarantine Malaysia" },
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
            { "@type": "ListItem", position: 3, name: "Export to Southeast Asia", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: ExportToSeaPage,
});

function ExportToSeaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl({
    category: "Southeast Asia Export Corridor",
    country: "Singapore / Malaysia",
    message: "Inquiry for container shipments to Singapore (Jurong) / Malaysia (Port Klang): Looking for Fresh Onions / Chillies / Rice CIF quotes.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link to="/global-export-markets" className="hover:text-blue-700">Markets</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Export to Southeast Asia</span>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-[#04152D] via-[#0d2a45] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300">
            <ShieldCheck className="h-4 w-4" />
            SFA &amp; MAQIS Standards • AIFTA Form AI • 7–9 Days Sea Transit
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Indian Agricultural Export Corridor: India → Southeast Asia (Singapore, Malaysia &amp; Bangladesh)
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global services high-frequency supply chains across Southeast Asia</strong>, delivering fresh Nashik red onions, G4 chillies, Basmati &amp; non-basmati rice, and spices to wet market wholesalers, supermarket retailers, and institutional buyers in Singapore, Malaysia, and neighbouring territories.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Discuss SE Asia Shipments on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Corridor Specifications: India to Southeast Asia Matrix
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
                  <td className="px-6 py-4">Nhava Sheva (JNPT Mumbai), Chennai Port, Kolkata Port</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Discharge Ports</th>
                  <td className="px-6 py-4 font-medium">Port of Singapore (Jurong), Port Klang (Malaysia), Chittagong (Bangladesh)</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Sea Transit Time</th>
                  <td className="px-6 py-4 font-bold text-blue-900">7 to 9 Days Direct Vessel Service</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Lead Commodities</th>
                  <td className="px-6 py-4">Fresh Red Onions (40-50mm &amp; 45-55mm), G4 Chillies, Non-Basmati &amp; Basmati Rice, Spices</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Regulatory Clearances</th>
                  <td className="px-6 py-4">SFA Singapore, MAQIS Malaysia, Form AI (AIFTA Preferential Tariff), Phytosanitary Certificate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: Southeast Asia Export Trade
          </h2>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {SEA_FAQS.map((faq, idx) => (
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
