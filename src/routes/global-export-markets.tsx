import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Globe2,
  Ship,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  ChevronDown,
  Anchor,
  Clock,
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

const CANONICAL_URL = `${SITE_URL}/global-export-markets`;
const TITLE = "Global Export Markets | Indian Agricultural Shipping Lanes — Sheshaan Global";
const DESCRIPTION =
  "Overview of Sheshaan Global's 25+ international destination markets across GCC, Europe, UK, Southeast Asia & Africa. Sea transit times, port clearance protocols, reefer temperature setpoints & documentation workflows.";

const MARKET_FAQS = [
  {
    question: "Which global ports does Sheshaan Global ship to regularly?",
    answer:
      "We operate weekly container services to Jebel Ali Port (UAE), King Abdulaziz Port Dammam & Jeddah Islamic Port (Saudi Arabia), Shuwaikh (Kuwait), Hamad Port (Qatar), Sohar (Oman), Port of Singapore (Jurong), Port Klang (Malaysia), Port of Felixstowe (UK), Port of Rotterdam (Netherlands), and Port of Antwerp (Belgium).",
  },
  {
    question: "What are the ocean transit times from JNPT and Mundra ports?",
    answer:
      "Direct transit times are: UAE (Jebel Ali): 3–4 days; Saudi Arabia (Dammam): 5–6 days; Southeast Asia (Singapore / Malaysia): 7–9 days; Europe & UK (Rotterdam / Felixstowe): 21–24 days; US East Coast (New York): 24–28 days.",
  },
  {
    question: "How are perishables protected during ocean transit?",
    answer:
      "All perishable vegetables and fruits are shipped in Carrier/Daikin 40ft High Cube reefer containers with automated micro-climate controls (+2°C to +4°C for onions, +7°C to +10°C for chillies, +12°C to +14°C for coconuts) and continuous dual-probe temperature data loggers.",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(MARKET_FAQS);

export const Route = createFileRoute("/global-export-markets")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "global export markets India, agricultural export shipping lanes, export produce to UAE, export rice to Saudi Arabia, JNPT container shipping lanes, refrigerated produce sea freight" },
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
            { "@type": "ListItem", position: 2, name: "Global Export Markets", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: GlobalExportMarketsPage,
});

function GlobalExportMarketsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl({
    category: "Global Export Corridor Inquiries",
    message: "Inquiry regarding ocean freight schedules and port clearance protocols to our destination market.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Global Export Markets</span>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-[#04152D] via-[#092954] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
            <Globe2 className="h-4 w-4" />
            25+ Destination Countries • Tier-1 Mainline Ocean Carriers
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Global Export Markets: International Agricultural Shipping Lanes &amp; Gateway Ports
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global operates streamlined trade corridors from India's west and east coast ports</strong>, delivering agricultural produce under strict cold-chain management across the Middle East, Europe, United Kingdom, Southeast Asia, and Africa.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Discuss Shipping Schedules on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Regions Grid */}
        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Major Trade Lanes &amp; Destination Ports
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Review ocean transit days, handling protocols, and lead commodities for key destination regions.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {[
              {
                region: "United Arab Emirates & GCC",
                ports: "Jebel Ali Port (Dubai), Sharjah Port Khalid, Khalifa Port (Abu Dhabi), Hamad Port (Qatar), Shuwaikh (Kuwait)",
                transit: "3 to 5 Days Direct Sea Transit",
                commodities: "Fresh Nashik Red Onions, G4 Green Chillies, 1121 Basmati Rice, Mature Coconuts, Fresh Bananas",
                compliance: "Dubai Municipality Food Safety Department, MOIAT, Gulf Standards (GSO), Halal Certification",
                link: "/markets/export-to-uae",
              },
              {
                region: "Kingdom of Saudi Arabia",
                ports: "King Abdulaziz Port (Dammam), Jeddah Islamic Port",
                transit: "5 to 8 Days Sea Transit",
                commodities: "1121 & 1509 Aged Basmati Rice, Fresh Onions, Whole Cumin & Turmeric Spices, Chickpeas",
                compliance: "SFDA (Saudi Food & Drug Authority) Registration, SABER Portal Certification, COO & Phytosanitary",
                link: "/markets/export-to-saudi-arabia",
              },
              {
                region: "United Kingdom & European Union",
                ports: "Port of Felixstowe, London Gateway, Port of Rotterdam, Port of Antwerp, Hamburg",
                transit: "21 to 24 Days Direct Reefer Service",
                commodities: "Garwa Rabi Onions (long shelf-life), Semi-Husked Coconuts, Aged Basmati Rice, ASTA-grade Spices",
                compliance: "EU Regulation 2073/2005 food safety, EU-MRL pesticide thresholds, TRACES NT phytosanitary clearance",
                link: "/markets/export-to-uk-europe",
              },
              {
                region: "Southeast Asia & Far East",
                ports: "Port of Singapore (Jurong), Port Klang (Malaysia), Haiphong (Vietnam), Chittagong (Bangladesh)",
                transit: "7 to 9 Days Sea Transit",
                commodities: "Small & Medium Red Onions (40-50mm & 45-55mm), G4 Chillies, Non-Basmati & Basmati Rice, Spices",
                compliance: "SFA (Singapore Food Agency), MAQIS (Malaysian Quarantine), Certificate of Origin Form AI (ASEAN-India)",
                link: "/markets/export-to-southeast-asia",
              },
            ].map((m) => (
              <div key={m.region} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-700">{m.transit}</div>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">{m.region}</h3>
                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    <p><strong>Primary Ports:</strong> {m.ports}</p>
                    <p><strong>Lead Commodities:</strong> {m.commodities}</p>
                    <p><strong>Statutory Compliance:</strong> {m.compliance}</p>
                  </div>
                </div>
                <Link
                  to={m.link}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#0057B8] hover:text-[#FF8A00]"
                >
                  Explore Dedicated Corridor Page →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: Global Export Logistics
          </h2>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {MARKET_FAQS.map((faq, idx) => (
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
