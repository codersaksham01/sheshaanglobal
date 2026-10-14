import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  FileText,
  Phone,
  ArrowRight,
  ChevronDown,
  Award,
  Microscope,
} from "lucide-react";
import { StatutoryComplianceInspector } from "@/components/StatutoryComplianceInspector";
import {
  BLUE,
  ORANGE,
  NAVY,
  ORGANIZATION_JSONLD,
  buildFaqPageSchema,
  buildWhatsAppUrl,
} from "@/lib/site";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const CANONICAL_URL = `${SITE_URL}/trade-compliance`;
const TITLE = "Agricultural Trade Compliance & Certifications | APEDA & FSSAI — Sheshaan Global";
const DESCRIPTION =
  "Official compliance hub for Indian agricultural exports: APEDA RCMC, DGFT Importer-Exporter Code (IEC), FSSAI Central License, Coconut Development Board (CDB), Phytosanitary, Fumigation & SGS laboratory testing.";

const COMPLIANCE_FAQS = [
  {
    question: "What statutory export licenses does Sheshaan Global hold in India?",
    answer:
      "Sheshaan Global holds active registrations with the Directorate General of Foreign Trade (DGFT Importer-Exporter Code / IEC), Agricultural and Processed Food Products Export Development Authority (APEDA RCMC), Food Safety and Standards Authority of India (FSSAI Central Food Safety License), Coconut Development Board (CDB Exporter Registration), and Goods and Services Tax (GST).",
  },
  {
    question: "How is phytosanitary clearance managed for export consignments?",
    answer:
      "Every container of fresh vegetables, fruits, and grains undergoes inspection by authorized plant protection officers from the Directorate of Plant Protection, Quarantine & Storage (Ministry of Agriculture, Govt. of India). An official Phytosanitary Certificate is issued verifying that the consignment is free from quarantine pests.",
  },
  {
    question: "What pre-shipment laboratory testing is available for overseas buyers?",
    answer:
      "We coordinate independent inspection and testing with world-leading certification bodies (SGS, Bureau Veritas, Geo-Chem, and TUV). Tests cover EU-MRL pesticide residue screening, Aflatoxin B1/total aflatoxin, heavy metals, microbial pathogens (Salmonella, E. coli), moisture content, and DNA purity for Basmati rice.",
  },
  {
    question: "What fumigation standards are followed for shipping containers?",
    answer:
      "Containers are fumigated by government-accredited pest management agencies using Methyl Bromide (MBr) or Aluminium Phosphide (Phosphine) in accordance with the destination country's quarantine guidelines (e.g., AFAS for Australia, ISPM-15 for wooden packaging, standard phytosanitary fumigation for GCC and Europe).",
  },
];

const FAQ_JSONLD = buildFaqPageSchema(COMPLIANCE_FAQS);

export const Route = createFileRoute("/trade-compliance")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "agricultural export trade compliance India, APEDA certificate exporter, DGFT IEC license, FSSAI central food export, phytosanitary certificate India, pre shipment SGS inspection" },
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
            { "@type": "ListItem", position: 2, name: "Trade Compliance", item: CANONICAL_URL },
          ],
        }),
      },
    ],
  }),
  component: TradeCompliancePage,
});

function TradeCompliancePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl({
    category: "Statutory Compliance & Lab Reports",
    message: "Inquiry regarding APEDA certificates, SGS inspection reports, and destination import documentation.",
  });

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Trade Compliance</span>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-[#04152D] via-[#0b2847] to-[#0057B8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            Statutory Transparency &amp; Food Safety Governance
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            Indian Agricultural Trade Compliance: Statutory Certifications, Phytosanitary &amp; Lab Protocols
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl leading-relaxed">
            <strong>Sheshaan Global operates with 100% legal, regulatory, and quality certification</strong>, ensuring that every container dispatched from Nhava Sheva (JNPT) and Mundra complies with destination customs laws and international food safety thresholds.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              Request Compliance Dossier on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Statutory Accreditations Matrix */}
        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Government &amp; Board Certifications
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Our enterprise credentials verified with national authorities and international trade boards.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                authority: "APEDA (Govt. of India)",
                name: "RCMC Export Registration",
                scope: "Fresh Fruits & Vegetables, Basmati Rice, Cereals, Processed Agricultural Foods",
                desc: "Registration-cum-Membership Certificate under the Ministry of Commerce & Industry ensuring adherence to Indian agricultural export quality standards.",
              },
              {
                authority: "DGFT (Ministry of Commerce)",
                name: "Importer-Exporter Code (IEC)",
                scope: "All Commercial Cross-Border Trade & Customs Port Handover",
                desc: "10-digit statutory identity issued by the Directorate General of Foreign Trade required for all ocean and air exports departing Indian ports.",
              },
              {
                authority: "FSSAI (Ministry of Health)",
                name: "Central Food Safety License",
                scope: "Food Safety, Grading, Processing & Export Quality Standards",
                desc: "Highest-tier food safety certification in India confirming sanitation, hygienic storage, and absence of adulteration across all edible produce.",
              },
              {
                authority: "Coconut Development Board",
                name: "CDB Exporter Registration",
                scope: "Mature Brown Husked & Semi-Husked Coconuts, Copra Products",
                desc: "Statutory license required to ship commercial lots of mature coconuts from Tamil Nadu and Kerala to overseas wholesale buyers.",
              },
              {
                authority: "Ministry of Agriculture (NPPO)",
                name: "Phytosanitary Certification",
                scope: "Mandatory for Every Consignment of Fresh Produce and Grains",
                desc: "Official government quarantine certificate guaranteeing that the cargo is inspected and free from injurious plant pests and diseases.",
              },
              {
                authority: "Independent NABL & Global Labs",
                name: "SGS / BV Pre-Shipment Inspection",
                scope: "EU-MRL, Aflatoxin, DNA Basmati Purity, Moisture & Heavy Metals",
                desc: "Independent batch sampling and laboratory analysis reports verifying complete compliance with buyer-specified specifications before dispatch.",
              },
            ].map((c) => (
              <div key={c.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{c.authority}</span>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{c.name}</h3>
                <p className="mt-1 text-xs font-semibold text-slate-500">Scope: {c.scope}</p>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Statutory Compliance & Certificate Inspector */}
        <section>
          <StatutoryComplianceInspector />
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions: Trade Compliance &amp; Testing
          </h2>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {COMPLIANCE_FAQS.map((faq, idx) => (
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
