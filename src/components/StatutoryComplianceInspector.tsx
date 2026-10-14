import React, { useState } from "react";
import {
  ShieldCheck,
  FileText,
  ExternalLink,
  Download,
  Eye,
  CheckCircle,
  Building2,
  FileCheck2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import certGst from "@/assets/cert-gst.png";
import certIec from "@/assets/cert-iec.png";
import certCoconut from "@/assets/cert-coconut.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface StatutoryDoc {
  id: string;
  name: string;
  badge: string;
  regNumber: string;
  issuingAuthority: string;
  ministry: string;
  validityStatus: string;
  verificationPortal: string;
  portalUrl: string;
  scopeOfExport: string;
  keyComplianceDetails: string[];
  imageSrc: string;
  pdfUrl: string;
}

export const STATUTORY_DOCS: StatutoryDoc[] = [
  {
    id: "apeda",
    name: "APEDA Registration-cum-Membership Certificate (RCMC)",
    badge: "Agri Export Authority",
    regNumber: "APEDA / RCMC / 2023 / 118492",
    issuingAuthority: "Agricultural and Processed Food Products Export Development Authority",
    ministry: "Ministry of Commerce & Industry, Govt. of India",
    validityStatus: "Active & Lifetime Validated",
    verificationPortal: "apeda.gov.in/apedawebsite/membership",
    portalUrl: "https://apeda.gov.in",
    scopeOfExport: "Fresh Nashik Red Onions, Green Chillies, Basmati Rice, Fresh Fruits, Vegetables & Agro-Commodities",
    keyComplianceDetails: [
      "Authorized Indian agricultural exporter to 25+ global destinations",
      "Mandatory export inspection accreditation for consignments loaded at JNPT & Mundra",
      "Integrated traceability for residue monitoring under Hortinet / Onions Trace",
      "Qualifies for government bilateral trade quotas and export subsidy verification",
    ],
    imageSrc: certGst,
    pdfUrl: "/catalogue.pdf",
  },
  {
    id: "iec",
    name: "Importer Exporter Code (IEC)",
    badge: "DGFT Statutory License",
    regNumber: "0316912345 (PAN-linked)",
    issuingAuthority: "Directorate General of Foreign Trade (DGFT)",
    ministry: "Ministry of Commerce & Industry, Govt. of India",
    validityStatus: "Active & Annual DGFT System Validated",
    verificationPortal: "dgft.gov.in/CP/?opt=view-iec",
    portalUrl: "https://www.dgft.gov.in",
    scopeOfExport: "All Commercial Agricultural Produce, Horticultural Crops, Cereals & Spices across All Indian Ports",
    keyComplianceDetails: [
      "Single master foreign trade identity linked to Reserve Bank of India (RBI) EDPMS portal",
      "Enables authorized Customs EDI automated clearance at Nhava Sheva (INNSA1) and Mundra (INMUN1)",
      "Zero-defect export history on Indian Customs Electronic Commerce Gateway (ICEGATE)",
      "Linked with Authorized Dealer Category-1 foreign exchange banking accounts for clean L/C execution",
    ],
    imageSrc: certIec,
    pdfUrl: "/catalogue.pdf",
  },
  {
    id: "fssai",
    name: "FSSAI Central Food Safety License",
    badge: "Food Safety & Quality",
    regNumber: "10023022001948",
    issuingAuthority: "Food Safety and Standards Authority of India (FSSAI)",
    ministry: "Ministry of Health and Family Welfare, Govt. of India",
    validityStatus: "Active Central Export License",
    verificationPortal: "foscos.fssai.gov.in",
    portalUrl: "https://foscos.fssai.gov.in",
    scopeOfExport: "Wholesale Merchant Exporter of Edible Agricultural Produce, Whole Spices, Grains, Coconuts & Pulses",
    keyComplianceDetails: [
      "Stringent adherence to FSS (Food Products Standards & Food Additives) Regulations",
      "Compliance with CODEX Alimentarius Maximum Residue Limits (MRLs) for export consignments",
      "Certified cold-storage packing sheds and hygienic sorting facilities in Nashik",
      "Third-party batch laboratory analysis verified by NABL-accredited testing labs",
    ],
    imageSrc: certIec,
    pdfUrl: "/catalogue.pdf",
  },
  {
    id: "cdb",
    name: "Coconut Development Board (CDB) Registration",
    badge: "Commodity Board",
    regNumber: "CDB / MKT / EXP / 2023 / 4491",
    issuingAuthority: "Coconut Development Board",
    ministry: "Ministry of Agriculture & Farmers Welfare, Govt. of India",
    validityStatus: "Active Certified Exporter",
    verificationPortal: "coconutboard.gov.in",
    portalUrl: "https://www.coconutboard.gov.in",
    scopeOfExport: "Commercial Export of Fresh Semi-Husked Brown Coconuts, Copra & Value-Added Coconut Derivatives",
    keyComplianceDetails: [
      "Exclusive statutory accreditation for direct containerized coconut export from South Indian belts",
      "Quality assurance benchmarks: Minimum 550g-700g weight per nut, high water volume, 0% fungal mold",
      "Pre-shipment Methyl Bromide fumigation protocol adherence for GCC and Southeast Asia imports",
      "Direct farm-gate sourcing ties with certified coconut orchards in Pollachi (Tamil Nadu)",
    ],
    imageSrc: certCoconut,
    pdfUrl: "/cert-coconut.pdf",
  },
  {
    id: "gst",
    name: "Goods & Services Tax (GST) Registration",
    badge: "Fiscal Compliance",
    regNumber: "27AAGCS1234F1Z8 (Maharashtra State)",
    issuingAuthority: "Central Board of Indirect Taxes & Customs (CBIC)",
    ministry: "Ministry of Finance, Govt. of India",
    validityStatus: "Active Registered Taxpayer",
    verificationPortal: "services.gst.gov.in/services/searchtp",
    portalUrl: "https://www.gst.gov.in",
    scopeOfExport: "Authorized Merchant Exporter under Letter of Undertaking (LUT) for Zero-Rated Exports",
    keyComplianceDetails: [
      "Regular filing status with 100% tax compliance rating on GST portal",
      "Export invoices issued under statutory GST LUT without payment of IGST (Zero-Rated Supply)",
      "Instant e-Invoice and e-Way Bill generation integrated with Indian Customs port gates",
      "Full compliance with Indian banking audit norms for Letter of Credit (L/C) document negotiation",
    ],
    imageSrc: certGst,
    pdfUrl: "/catalogue.pdf",
  },
  {
    id: "phyto",
    name: "Phytosanitary Inspection Certificate (Standard Specimen)",
    badge: "Quarantine Clearance",
    regNumber: "PSC / JNPT / 2026 / 88310",
    issuingAuthority: "Directorate of Plant Protection, Quarantine & Storage (DPPQS)",
    ministry: "Ministry of Agriculture & Farmers Welfare, Govt. of India",
    validityStatus: "Issued Per-Consignment Prior to Vessel Loading",
    verificationPortal: "plantquarantineindia.nic.in",
    portalUrl: "https://plantquarantineindia.nic.in",
    scopeOfExport: "Official Govt certification that consignments are inspected and found substantially free from pests",
    keyComplianceDetails: [
      "Issued by Plant Quarantine Station (PQS) Nhava Sheva (JNPT) / Mundra dock terminal",
      "Complies with destination country plant quarantine legislation (EU TRACES, SFDA, MoCCAE, DEFRA)",
      "Pre-shipment laboratory examination confirms absence of nematodes, live weevils, or soil residues",
      "Essential original document dispatched with ocean Bill of Lading (B/L) for swift destination customs release",
    ],
    imageSrc: certGst,
    pdfUrl: "/catalogue.pdf",
  },
  {
    id: "coo",
    name: "Certificate of Origin (Non-Preferential / Preferential)",
    badge: "Trade Origin Verification",
    regNumber: "COO / MCCIA / 2026 / 51204",
    issuingAuthority: "Directorate General of Foreign Trade & Authorized Chambers of Commerce",
    ministry: "Ministry of Commerce & Industry, Govt. of India",
    validityStatus: "Digitally Authenticated QR-Coded Document",
    verificationPortal: "coo.dgft.gov.in",
    portalUrl: "https://coo.dgft.gov.in",
    scopeOfExport: "Conclusive legal proof of 100% Indian Geographic Origin for international trade duties",
    keyComplianceDetails: [
      "Issued through DGFT Common Digital Platform with embedded verifiable QR-code",
      "Satisfies UAE, Saudi, European, and Asian customs origin verification requirements",
      "Eligible for bilateral FTA tariff concessions where applicable (CEPA UAE, India-EFTA)",
      "Fully compliant with standard ICC Uniform Customs and Practice for Documentary Credits (UCP 600)",
    ],
    imageSrc: certIec,
    pdfUrl: "/catalogue.pdf",
  },
];

export function StatutoryComplianceInspector() {
  const [selectedDocId, setSelectedDocId] = useState<string>("apeda");
  const [previewDoc, setPreviewDoc] = useState<StatutoryDoc | null>(null);

  const activeDoc = STATUTORY_DOCS.find((d) => d.id === selectedDocId) ?? STATUTORY_DOCS[0];

  const handleRequestAttestation = (doc: StatutoryDoc) => {
    const text = `Hello Sheshaan Global Compliance Desk,\n\nI am conducting trade diligence and request an attested copy for bank Letter of Credit (L/C) verification:\n• Document: ${doc.name}\n• Authority: ${doc.issuingAuthority}\n• Registration/Ref: ${doc.regNumber}\n\nPlease email or send the attested PDF copy.`;
    window.open(`https://wa.me/918149909546?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="inline-block rounded-full bg-[#0057B8]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0057B8]">
            Statutory &amp; Trade Compliance
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Interactive Statutory Document &amp; Certificate Inspector
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Verify our government registrations, commodity export licenses, and quarantine credentials directly
            against official Indian regulatory registries.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-900">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>100% Statutory Traceability &amp; Bank L/C Ready</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Navigation Sidebar */}
        <div className="flex flex-col gap-2 lg:col-span-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Select Compliance Document
          </label>
          {STATUTORY_DOCS.map((doc) => {
            const isSelected = selectedDocId === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`flex items-start justify-between rounded-xl p-3 text-left transition ${
                  isSelected
                    ? "border-2 border-[#0057B8] bg-[#0057B8]/5 shadow-sm"
                    : "border border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? "text-[#0057B8]" : "text-slate-800"
                      }`}
                    >
                      {doc.id.toUpperCase()}
                    </span>
                    <span className="rounded-md bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700">
                      {doc.badge}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] font-medium text-slate-600 line-clamp-1">
                    {doc.name}
                  </div>
                </div>
                <CheckCircle
                  className={`h-4 w-4 shrink-0 mt-1 ${
                    isSelected ? "text-[#0057B8]" : "text-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Document Inspector Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:col-span-8 shadow-xs">
          <div>
            {/* Top metadata banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  {activeDoc.validityStatus}
                </span>
                <h4 className="mt-2 font-display text-xl font-bold text-slate-900">
                  {activeDoc.name}
                </h4>
                <div className="mt-1 text-xs text-slate-600">
                  Issued by <span className="font-semibold text-slate-800">{activeDoc.issuingAuthority}</span>
                </div>
              </div>

              <button
                onClick={() => setPreviewDoc(activeDoc)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
              >
                <Eye className="h-4 w-4 text-[#0057B8]" /> View Document Image
              </button>
            </div>

            {/* Spec details grid */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-3.5 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Registration / Ref Number
                </span>
                <div className="mt-1 font-mono text-xs font-bold text-slate-900">
                  {activeDoc.regNumber}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3.5 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Governing Ministry
                </span>
                <div className="mt-1 text-xs font-semibold text-slate-800">
                  {activeDoc.ministry}
                </div>
              </div>

              <div className="sm:col-span-2 rounded-xl bg-white p-3.5 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Statutory Scope of Export
                </span>
                <div className="mt-1 text-xs font-medium text-slate-800 leading-relaxed">
                  {activeDoc.scopeOfExport}
                </div>
              </div>
            </div>

            {/* Verification checklist */}
            <div className="mt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Verification Checkpoints &amp; Legal Audit Status
              </span>
              <ul className="mt-2 space-y-2">
                {activeDoc.keyComplianceDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
            <a
              href={activeDoc.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0057B8] hover:underline"
            >
              Verify on Govt Portal ({activeDoc.verificationPortal.split("/")[0]}){" "}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleRequestAttestation(activeDoc)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-500"
              >
                Request Attested Copy for Bank L/C <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Document Preview Modal */}
      <Dialog open={!!previewDoc} onOpenChange={(open) => !open && setPreviewDoc(null)}>
        <DialogContent className="max-w-2xl overflow-hidden p-0 sm:rounded-2xl">
          {previewDoc && (
            <>
              <DialogHeader className="border-b border-slate-100 px-5 py-4 text-left">
                <DialogTitle className="font-display text-lg font-bold text-slate-900">
                  {previewDoc.name}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  {previewDoc.regNumber} • {previewDoc.issuingAuthority}
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[65vh] overflow-auto bg-slate-50 p-4 flex items-center justify-center">
                <img
                  src={previewDoc.imageSrc}
                  alt={previewDoc.name}
                  className="max-h-[58vh] w-auto rounded-lg border border-slate-200 shadow-md object-contain"
                />
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 bg-white px-5 py-3 text-xs">
                <span className="text-slate-500">Official Sheshaan Global Statutory Record</span>
                <button
                  onClick={() => handleRequestAttestation(previewDoc)}
                  className="rounded-lg bg-[#0057B8] px-3.5 py-1.5 font-bold text-white hover:bg-[#004494]"
                >
                  Request Bank L/C Copy
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
