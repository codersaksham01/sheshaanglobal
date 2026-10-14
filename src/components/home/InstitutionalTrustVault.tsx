import { useState } from "react";
import {
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  QrCode,
  Eye,
  Award,
  ExternalLink,
  X,
  FileText,
  BadgeCheck,
} from "lucide-react";
import certIec from "@/assets/cert-iec.png";
import certGst from "@/assets/cert-gst.png";
import certCoconut from "@/assets/cert-coconut.jpg";

interface StatutoryRecord {
  id: string;
  name: string;
  code: string;
  authority: string;
  issuingMinistry: string;
  verificationStatus: string;
  details: string;
  image?: string;
}

const STATUTORY_RECORDS: StatutoryRecord[] = [
  {
    id: "apeda",
    name: "APEDA Registration",
    code: "RCMC / APEDA GOVT ACCREDITED",
    authority: "Agricultural & Processed Food Products Export Development Authority",
    issuingMinistry: "Ministry of Commerce & Industry, Govt of India",
    verificationStatus: "Active & In Good Standing",
    details:
      "Statutory registration for bulk commercial exports of fresh Nashik onions, green chillies, basmati rice, and processed agro products.",
  },
  {
    id: "iec",
    name: "Importer-Exporter Code (IEC)",
    code: "DGFT LICENSED EXPORT ENTERPRISE",
    authority: "Directorate General of Foreign Trade (DGFT)",
    issuingMinistry: "Ministry of Commerce & Industry, Govt of India",
    verificationStatus: "Active DGFT Verification",
    details:
      "Statutory federal export license authorizing customs container clearance across all Indian seaports (JNPT, Mundra, Tuticorin) and air cargo terminals.",
    image: certIec,
  },
  {
    id: "fssai",
    name: "FSSAI Central Food Safety License",
    code: "CENTRAL FSSAI FBO LICENSE",
    authority: "Food Safety and Standards Authority of India",
    issuingMinistry: "Ministry of Health & Family Welfare, Govt of India",
    verificationStatus: "Central Level Accreditation",
    details:
      "Food hygiene, processing packhouse standards, and food safety management compliance for human consumption agro-commodities.",
  },
  {
    id: "cdb",
    name: "Coconut Development Board (CDB)",
    code: "CDB REGISTERED EXPORTER",
    authority: "Coconut Development Board of India",
    issuingMinistry: "Ministry of Agriculture & Farmers Welfare, Govt of India",
    verificationStatus: "Govt Certified Exporter",
    details:
      "Official exporter registration for bulk shipments of Pollachi mature semi-husked brown coconuts, copra, and coconut derivatives.",
    image: certCoconut,
  },
  {
    id: "spices-board",
    name: "Spices Board India Registration",
    code: "SPICES BOARD ACCREDITED",
    authority: "Spices Board of India (Cochin)",
    issuingMinistry: "Ministry of Commerce & Industry, Govt of India",
    verificationStatus: "Registered Spice Exporter",
    details:
      "Export certification covering whole and ground spices including Unjha cumin, Sangli turmeric, Guntur red chillies, and coriander.",
  },
  {
    id: "gst",
    name: "Goods & Services Tax (GSTIN)",
    code: "MAHARASHTRA STATE REGISTERED",
    authority: "Department of Revenue, Ministry of Finance",
    issuingMinistry: "Government of India",
    verificationStatus: "Verified Tax Entity",
    details:
      "Official commercial entity incorporation with banking KYC and automated LUT (Letter of Undertaking) for duty-free export shipments.",
    image: certGst,
  },
];

interface AuditDoc {
  id: string;
  title: string;
  authority: string;
  sampleSummary: string;
  parametersTested: string[];
}

const AUDIT_DOCUMENTS: AuditDoc[] = [
  {
    id: "phyto",
    title: "Phytosanitary Certificate (Plant Health)",
    authority: "Directorate of Plant Protection, Quarantine & Storage (Govt of India)",
    sampleSummary:
      "Official certificate certifying that the consignment has been thoroughly inspected according to appropriate procedures and considered to be free from quarantine pests.",
    parametersTested: [
      "Freedom from Ditylenchus dipsaci (stem nematode)",
      "Zero live insect infestation at loading",
      "Methyl Bromide (MBr) Fumigation dosage verified (32g/m³ @ 21°C)",
      "Inspected at JNPT / Mumbai port gateway prior to container sealing",
    ],
  },
  {
    id: "coo",
    title: "Certificate of Origin (COO)",
    authority: "Indo-Arab Chamber of Commerce & DGFT Authorized Agency",
    sampleSummary:
      "Legal document establishing Indian farm origin, enabling importing buyers to claim preferential customs tariff rates in destination countries.",
    parametersTested: [
      "Origin confirmation: Republic of India",
      "HS Code verification & gross/net container weights",
      "Consignee and ocean vessel voyage reference",
      "Official seal and embassy legalization support",
    ],
  },
  {
    id: "lab",
    title: "Eurofins / SGS Laboratory Residue Certificate",
    authority: "ISO/IEC 17025 Accredited Analytical Testing Laboratory",
    sampleSummary:
      "Independent third-party laboratory analysis report confirming maximum residue limits (MRLs), heavy metals, and microbiological safety.",
    parametersTested: [
      "Multi-Pesticide Residue Screen (< 0.01 mg/kg or EU MRL compliant)",
      "Aflatoxin B1, B2, G1, G2 (< 4.0 ppb EU strict standards)",
      "Heavy metals (Lead, Cadmium, Arsenic, Mercury within Codex limits)",
      "Salmonella & E. coli zero detection in 25g sample",
    ],
  },
];

export function InstitutionalTrustVault() {
  const [activeModalDoc, setActiveModalDoc] = useState<AuditDoc | null>(null);

  return (
    <section id="trust-vault" className="bg-[#F5F3EF] py-20 text-[#111816]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[#091E16]/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded border border-[#C59B27]/40 bg-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-[#A67C1E]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#091E16]" />
              Institutional Trust &amp; Statutory Vault
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#091E16] sm:text-4xl lg:text-5xl">
              Verified Regulatory Accreditations
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-[#3D4843]">
              Every export shipment from Sheshaan Global is backed by statutory central registrations,
              phytosanitary plant quarantine inspection, and third-party laboratory analysis.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/trade-compliance"
              className="inline-flex items-center gap-2 rounded-lg bg-[#091E16] px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#E4BC4A] shadow transition hover:bg-[#05130E]"
            >
              <span>Explore Trade Compliance Hub</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Statutory Badges Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATUTORY_RECORDS.map((record) => (
            <div
              key={record.id}
              className="flex flex-col justify-between rounded-xl border border-[#091E16]/10 bg-white p-6 shadow-sm transition-all hover:border-[#C59B27] hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-[#091E16]/08 pb-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#091E16]">
                      {record.name}
                    </h3>
                    <div className="mt-0.5 font-mono text-[10px] font-bold text-[#A67C1E] uppercase">
                      {record.code}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-700">
                    <BadgeCheck className="h-3 w-3 text-emerald-600" />
                    VERIFIED
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#3D4843]/70">
                      Accrediting Authority:
                    </span>
                    <div className="font-semibold text-[#091E16]">{record.authority}</div>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#3D4843]/70">
                      Supervising Ministry:
                    </span>
                    <div className="text-[#3D4843]">{record.issuingMinistry}</div>
                  </div>
                  <p className="pt-1 text-xs leading-relaxed text-[#3D4843]">{record.details}</p>
                </div>
              </div>

              <div className="mt-5 border-t border-[#091E16]/08 pt-3 flex items-center justify-between font-mono text-[11px]">
                <span className="text-emerald-700 font-bold">{record.verificationStatus}</span>
                <span className="text-[#A67C1E] font-bold">INSPECTION READY</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sample Audit Document Inspector */}
        <div className="mt-12 rounded-2xl border border-[#C59B27]/30 bg-[#091E16] p-6 text-[#FBFBFA] shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C59B27]/20 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#C59B27]">
                International Procurement Audit Preview
              </span>
              <h3 className="mt-0.5 font-serif text-xl font-bold text-[#FBFBFA]">
                Inspect Standard Trade &amp; Phytosanitary Dossier Documents
              </h3>
            </div>
            <p className="text-xs font-mono text-[#FBFBFA]/60 max-w-md">
              Overseas supermarket buyers, commodity tenders, and customs authorities can review
              our standard laboratory residue screening and quarantine protocols.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {AUDIT_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#05130E] p-5"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#C59B27] font-mono text-xs uppercase">
                    <FileText className="h-4 w-4" />
                    Official Dossier Document
                  </div>
                  <h4 className="mt-2 font-serif text-base font-bold text-[#FBFBFA]">
                    {doc.title}
                  </h4>
                  <div className="mt-1 font-mono text-[10px] text-[#FBFBFA]/60">
                    {doc.authority}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[#FBFBFA]/75">
                    {doc.sampleSummary}
                  </p>

                  <div className="mt-3 space-y-1.5 font-mono text-[11px] text-[#E4BC4A]">
                    {doc.parametersTested.slice(0, 2).map((p, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[#FBFBFA]/80">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveModalDoc(doc)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-mono font-semibold text-[#FBFBFA] transition hover:bg-[#C59B27] hover:text-[#091E16]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View Inspection Parameters</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Document Inspection Modal */}
      {activeModalDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setActiveModalDoc(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-[#C59B27]/40 bg-[#091E16] p-6 text-[#FBFBFA] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalDoc(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-[#FBFBFA]/60 hover:bg-white/10 hover:text-white"
              aria-label="Close document inspector"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="font-mono text-xs uppercase tracking-wider text-[#C59B27]">
              Sample Audit Parameters
            </div>
            <h3 className="mt-1 font-serif text-2xl font-bold text-[#FBFBFA]">
              {activeModalDoc.title}
            </h3>
            <div className="mt-1 font-mono text-xs text-[#FBFBFA]/60">
              Issuing Agency: {activeModalDoc.authority}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[#FBFBFA]/80">
              {activeModalDoc.sampleSummary}
            </p>

            <div className="mt-5 rounded-xl border border-white/10 bg-[#05130E] p-4">
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#E4BC4A]">
                Verified Regulatory Compliance Checks:
              </div>
              <ul className="mt-3 space-y-2 font-mono text-xs text-[#FBFBFA]/90">
                {activeModalDoc.parametersTested.map((param, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{param}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href="https://wa.me/918149909546?text=Hello%20Sheshaan%20Global,%20please%20share%20sample%20export%20dossier%20documents%20and%20compliance%20certificates."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#C59B27] to-[#A67C1E] py-2.5 text-xs font-bold uppercase tracking-wider text-[#091E16] shadow hover:brightness-110"
              >
                Request Sample Lab &amp; Phyto PDF via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
