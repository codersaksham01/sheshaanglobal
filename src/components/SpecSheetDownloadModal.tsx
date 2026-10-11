import React, { useState } from "react";

interface SpecSheetDownloadModalProps {
  productName?: string;
  hsCode?: string;
  pdfUrl?: string;
  buttonLabel?: string;
  variant?: "primary" | "header" | "outline";
}

const WHATSAPP_DESK = "918149909546";

export function SpecSheetDownloadModal({
  productName = "2026 Master Agricultural Export Catalog",
  hsCode = "All 49 HS Lines",
  pdfUrl = "/catalogue.pdf",
  buttonLabel = "Download Technical Export Spec Sheet (PDF)",
  variant = "primary",
}: SpecSheetDownloadModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerWhatsApp, setBuyerWhatsApp] = useState("");
  const [executiveContact, setExecutiveContact] = useState<"Saksham Singh" | "Sana Zeba Bakshi">(
    "Saksham Singh",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const anchor = document.createElement("a");
    anchor.href = pdfUrl;
    anchor.download = `Sheshaan-Global-${productName.replace(/[^A-Za-z0-9]+/g, "-")}-Spec-Sheet.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    const msg = [
      "Hello Sheshaan Global 24/7 Export Desk,",
      `I just downloaded the Technical Export Spec Sheet (PDF) for *${productName}* (HS Code: ${hsCode}).`,
      "",
      `• Buyer Name: ${buyerName.trim()}`,
      `• Buyer WhatsApp: ${buyerWhatsApp.trim()}`,
      `• Requested Trade Desk Contact: ${executiveContact}`,
      "",
      "Please share the latest FOB/CIF container pricing and schedule a procurement call.",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_DESK}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setIsOpen(false);
  };

  const buttonClasses =
    variant === "header"
      ? "inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-800 transition hover:bg-amber-500 hover:text-slate-950"
      : variant === "outline"
        ? "inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-full border-2 border-[#0057B8] bg-white px-6 py-3.5 text-sm font-semibold text-[#0057B8] shadow-sm transition hover:bg-slate-50"
        : "inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-full bg-[#FF8A00] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={buttonClasses}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span>📄 {buttonLabel}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="spec-sheet-modal-title"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl sm:p-7">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close specification download modal"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-900">
              Instant PDF Spec Sheet + 24/7 Speed-to-Lead
            </div>
            <h3
              id="spec-sheet-modal-title"
              className="mt-3 font-display text-xl font-bold text-slate-900"
            >
              Download {productName} Specification Sheet (PDF)
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
              Enter your name and WhatsApp number to immediately download the technical PDF data
              sheet (HS {hsCode}) and receive live FOB/CIF container pricing on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="spec-lead-name"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  1. Your Full Name &amp; Company *
                </label>
                <input
                  id="spec-lead-name"
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g., Ahmed Al-Mansoor — Al Maya Trading LLC"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#0057B8] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="spec-lead-wa"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  2. WhatsApp Number (with Country Code) *
                </label>
                <input
                  id="spec-lead-wa"
                  type="tel"
                  required
                  value={buyerWhatsApp}
                  onChange={(e) => setBuyerWhatsApp(e.target.value)}
                  placeholder="e.g., +971 50 123 4567"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#0057B8] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="spec-lead-exec"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Direct Call / Quote Coordinator (Optional)
                </label>
                <select
                  id="spec-lead-exec"
                  value={executiveContact}
                  onChange={(e) =>
                    setExecutiveContact(e.target.value as "Saksham Singh" | "Sana Zeba Bakshi")
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#0057B8] focus:outline-none"
                >
                  <option value="Saksham Singh">
                    Saksham Singh (Business Development &amp; Export Desk)
                  </option>
                  <option value="Sana Zeba Bakshi">
                    Sana Zeba Bakshi (Chief Executive Officer)
                  </option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-500"
                >
                  Download PDF Spec Sheet &amp; Send to WhatsApp
                </button>
                <div className="mt-2.5 text-center">
                  <a
                    href={pdfUrl}
                    download
                    onClick={() => setIsOpen(false)}
                    className="text-[11px] font-semibold text-slate-500 underline hover:text-slate-800"
                  >
                    Or download PDF directly without WhatsApp auto-responder
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
