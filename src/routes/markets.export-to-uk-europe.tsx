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

const CANONICAL_URL = `${SITE_URL}/markets/export-to-uk-europe`;
const TITLE = "Export to UK & Europe (Felixstowe & Rotterdam) | Indian Agricultural Exporter — Sheshaan Global";
const DESCRIPTION =
  "Dedicated cold-chain shipping lane from India (JNPT) to United Kingdom & European Union: Port of Felixstowe, London Gateway, Port of Rotterdam & Antwerp. 21-24 days reefer transit. EU 2073/2005, Aflatoxin & EU-MRL pesticide compliant.";

const EU_FAQS = [
  {
    question: "What is the ocean transit time from JNPT to UK and European gateway ports?",
    answer:
      "Direct container services to the Port of Felixstowe and London Gateway take approximately 21 to 24 days. Transit to the Port of Rotterdam (Netherlands) and Port of Antwerp (Belgium) takes approximately 22 to 25 days.",
  },
  {
    question: "How does Sheshaan Global meet European Union (EU) MRL and food safety standards?",
    answer:
      "We adhere strictly to Regulation (EC) No 396/2005 on pesticide maximum residue limits, Commission Regulation (EC) No 2073/2005 on microbiological criteria (absence of Salmonella), and aflatoxin thresholds. All consignments are pre-screened at NABL/EU-approved laboratories before customs export clearance.",
  },
  {
    question: "Which Indian produce items perform best on the UK/EU corridor?",
    answer:
      "Garwa Rabi Onions (possessing 5–6 months natural storage life that easily withstands 21+ days ocean transit), semi-husked fresh Pollachi coconuts, premium aged Basmati rice, and ETO-free steam-sterilized whole spices.",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(EU_FAQS);

export const Route = createFileRoute("/markets/export-to-uk-europe")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "export to UK Europe agriculture, indian onions to Felixstowe, coconut export to Rotterdam, EU MRL compliant Indian exporter, aflatoxin tested spices Europe" },
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
            { "@type": "ListItem", position: 3, name: "Export to UK & Europe", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: ExportToEuPage,
});

function ExportToEuPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl({
    category: "UK & Europe Export Corridor",
    country: "United Kingdom & Europe",
    message: "Inquiry for container shipments to Felixstowe / Rotterdam: Looking for Garwa Onions / Coconuts / Basmati Rice pricing and EU-MRL COA details.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link to="/global-export-markets" className="hover:text-blue-700">Markets</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Export to UK &amp; Europe</span>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-[#04152D] via-[#102e52] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300">
            <ShieldCheck className="h-4 w-4" />
            EU Regulation 2073/2005 • TRACES NT Clearance • 21–24 Days Reefer
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Indian Agricultural Export Corridor: India → United Kingdom &amp; Europe (Felixstowe &amp; Rotterdam)
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global coordinates compliant FCL shipments to Britain and continental Europe</strong>, delivering high-stability Garwa onions, mature coconuts, Basmati rice, and spices under rigorous Aflatoxin and pesticide residue governance.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Discuss UK/EU Shipments on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Corridor Specifications: India to UK &amp; Europe Matrix
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
                  <td className="px-6 py-4">Nhava Sheva (JNPT, Mumbai) &amp; Cochin Port (Kerala)</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Discharge Ports</th>
                  <td className="px-6 py-4 font-medium">Port of Felixstowe, London Gateway, Port of Rotterdam, Port of Antwerp</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Ocean Transit</th>
                  <td className="px-6 py-4 font-bold text-blue-900">21 to 24 Days Direct Reefer Service</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Lead Commodities</th>
                  <td className="px-6 py-4">Garwa Rabi Onions (TSS &gt; 12° Brix), Semi-Husked Coconuts, Aged Basmati Rice, ETO-Free Spices</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">Regulatory Protocol</th>
                  <td className="px-6 py-4">TRACES NT clearance, EU-MRL test reports, Phytosanitary Certificate, REX Certificate of Origin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: UK &amp; Europe Export Trade
          </h2>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {EU_FAQS.map((faq, idx) => (
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
