import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Package,
  Ship,
  Globe2,
  CheckCircle2,
  FileText,
  Phone,
  ArrowRight,
  ChevronDown,
  Layers,
  Award,
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

const CANONICAL_URL = `${SITE_URL}/agricultural-exports-india`;
const TITLE = "Agriculture Exporter in India | APEDA Certified Agro Commodities — Sheshaan Global";
const DESCRIPTION =
  "APEDA & IEC certified agricultural produce exporter in India. Bulk supplier of fresh Nashik red onions, Basmati rice, green chillies, Pollachi coconuts, whole spices & pulses. FCL shipping via JNPT & Mundra to 25+ countries worldwide.";

const PILLAR_FAQS = [
  {
    question: "What makes Sheshaan Global a leading agricultural exporter in India?",
    answer:
      "Sheshaan Global is an APEDA, FSSAI, and Coconut Development Board (CDB) certified export enterprise based in Maharashtra, India. We manage direct farm-cluster sourcing in Nashik, Gujarat, Punjab, and Tamil Nadu, operating institutional packhouses, pre-cooling cold chains, and FCL reefer shipping directly through JNPT Nhava Sheva and Mundra ports to 25+ countries.",
  },
  {
    question: "Which agricultural commodities does Sheshaan Global export?",
    answer:
      "Our core portfolio spans fresh vegetables (Nashik red onions, G4 green chillies, garlic, potatoes), premium grains (1121 and 1509 aged Basmati rice), fresh fruits (Pollachi semi-husked coconuts, pomegranates, bananas), whole and ground spices (Unjha cumin, Sangli turmeric, Guntur chillies), and sortex-cleaned pulses (Kabuli chickpeas, lentils, dals).",
  },
  {
    question: "What are the standard Incoterms and payment terms?",
    answer:
      "We operate under FOB (JNPT / Mundra / Cochin / Chennai), CFR, and CIF destination port Incoterms. Standard payment options include 100% Irrevocable Letter of Credit (L/C at sight) or 30% advance TT with the remaining 70% against original Bill of Lading and inspection documents.",
  },
  {
    question: "How do you ensure food safety and international pesticide compliance?",
    answer:
      "Every export consignment is verified against international standards including EU-MRL (Regulation 396/2005), US FDA FSMA, and GCC SFDA requirements. We supply government Phytosanitary Certificates, Methyl Bromide/Phosphine fumigation certificates, and independent third-party laboratory reports from SGS, Bureau Veritas, or Geo-Chem.",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(PILLAR_FAQS);

export const Route = createFileRoute("/agricultural-exports-india")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "exporter in india for agriculture, agro product exporter in india, agricultural produce exporter India, agricultural commodities export JNPT, APEDA certified exporters India, bulk fresh produce exporter",
      },
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
            { "@type": "ListItem", position: 2, name: "Agricultural Exports India", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: AgriculturalExportsIndiaPage,
});

function AgriculturalExportsIndiaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl({
    category: "Indian Agricultural Commodities",
    message: "Inquiry via Agricultural Exports India Pillar: Please share your 2026 Export Product Dossier, pricing sheet, and loading schedules.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Agricultural Exports India</span>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-gradient-to-br from-[#04152D] via-[#072552] to-[#0057B8] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
            <ShieldCheck className="h-4 w-4" />
            National APEDA • DGFT IEC • FSSAI Central License
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Agricultural Produce Exporter in India: APEDA-Certified Bulk Sourcing &amp; Cold-Chain Shipping
          </h1>

          {/* GEO Declarative Definition */}
          <p className="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global is a premier APEDA-certified Indian exporter of agricultural commodities</strong>, supplying wholesale food distributors, hypermarket chains, and institutional importers across 25+ countries worldwide with direct farm-gate procurement and controlled-atmosphere ocean freight.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Connect with Trade Desk (+91 81499 09546)
            </a>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore 49-Commodity Directory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-white/10 pt-6 text-xs text-slate-300">
            <div>
              <span className="block text-slate-400 uppercase tracking-wider font-semibold">Destination Markets</span>
              <strong className="text-white text-base">25+ Countries</strong>
            </div>
            <div>
              <span className="block text-slate-400 uppercase tracking-wider font-semibold">Annual Container FCL</span>
              <strong className="text-white text-base">500+ Containers</strong>
            </div>
            <div>
              <span className="block text-slate-400 uppercase tracking-wider font-semibold">Primary Gateway Ports</span>
              <strong className="text-white text-base">JNPT &amp; Mundra</strong>
            </div>
            <div>
              <span className="block text-slate-400 uppercase tracking-wider font-semibold">Quality Inspection</span>
              <strong className="text-white text-base">SGS &amp; Bureau Veritas</strong>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        
        {/* Core Agricultural Categories Hub */}
        <section>
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#0057B8]">Core Product Pillars</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              India's Premier Export Commodities
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Explore dedicated technical specifications, packing options, calibration tables, and cold-chain parameters for each commodity category.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Fresh Nashik Red Onions",
                hs: "HS 07031010",
                desc: "Direct farm sourcing from Lasalgaon & Nashik. Grades 45-55mm & 55-65mm in 25kg mesh bags. 28-29 MT / 40ft reefer container.",
                link: "/products/fresh-onions-exporter-india",
                badge: "Flagship Category",
              },
              {
                title: "G4 & Teja Green Chillies",
                hs: "HS 07096010",
                desc: "Pre-cooled fresh chillies graded 7-11cm. Shipped in 4kg/5kg cartons at +7°C to +10°C via JNPT and Mumbai air cargo.",
                link: "/products/green-chillies-exporter",
                badge: "Cold-Chain Produce",
              },
              {
                title: "1121 & 1509 Basmati Rice",
                hs: "HS 10063020",
                desc: "Sortex cleaned aged Indian Basmati rice. Extra long grain (8.35mm+), steam and creamy/golden sella in 25kg/50kg BOPP bags.",
                link: "/products/indian-basmati-rice",
                badge: "Grain Specialist",
              },
              {
                title: "Pollachi Mature Coconuts",
                hs: "HS 08011910",
                desc: "Semi-husked brown coconuts from Pollachi and Kerala. Graded 550g-650g in 25-nut PP mesh bags. ~45,000 nuts per 40ft reefer.",
                link: "/products/coconut-exporter-india",
                badge: "CDB Certified",
              },
              {
                title: "Whole & Ground Spices",
                hs: "HS Chapter 09",
                desc: "Unjha Cumin (Jeera), Sangli Turmeric (Curcumin 3-5%), Guntur Red Chilli & Coriander. Machine cleaned and ETO-free ASTA grade.",
                link: "/products/spices-masalas-exporter",
                badge: "Spices Board",
              },
              {
                title: "Sortex Pulses & Lentils",
                hs: "HS Chapter 07",
                desc: "Kabuli chickpeas (42-44, 44-46 count), Toor dal (pigeon peas), red lentils (Masoor), and moong beans with 99.5% purity.",
                link: "/products/pulses-lentils-exporter",
                badge: "Pulses Directory",
              },
            ].map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-blue-500 transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-blue-700">
                    <span>{p.hs}</span>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-800">{p.badge}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
                <Link
                  to={p.link}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#0057B8] hover:text-[#FF8A00]"
                >
                  View Procurement Specifications →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Global Trade Corridors Silo */}
        <section className="rounded-3xl bg-[#04152D] text-white p-8 sm:p-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">High-Intent Trade Corridors</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Scheduled Gateway Sea Freight &amp; Customs Lanes
            </h2>
            <p className="mt-2 text-slate-300 text-sm">
              Weekly container sailings from JNPT (Nhava Sheva) and Mundra to key destination hubs.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Export to UAE (Dubai / Jebel Ali)", time: "3–4 Days", link: "/markets/export-to-uae" },
              { name: "Export to Saudi Arabia (Dammam / Jeddah)", time: "5–6 Days", link: "/markets/export-to-saudi-arabia" },
              { name: "Export to UK & Europe (Felixstowe / RTM)", time: "21–24 Days", link: "/markets/export-to-uk-europe" },
              { name: "Export to Southeast Asia (Singapore / Klang)", time: "7–9 Days", link: "/markets/export-to-southeast-asia" },
            ].map((c) => (
              <Link
                key={c.name}
                to={c.link}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
              >
                <span className="text-xs font-bold text-[#FF8A00]">{c.time} Transit</span>
                <h4 className="mt-2 text-sm font-bold text-white">{c.name}</h4>
                <span className="mt-4 inline-block text-xs text-blue-300">View Corridor Requirements →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Pillar FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: Indian Agricultural Exports
          </h2>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {PILLAR_FAQS.map((faq, idx) => (
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
