import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SpecSheetDownloadModalProps {
  productName?: string;
  commodityName?: string;
  hsCode?: string;
  originCluster?: string;
  primaryGrade?: string;
  moistureTolerance?: string;
  packaging?: string;
  container20ft?: string;
  container40ft?: string;
  gatewayPorts?: string[];
  pdfUrl?: string;
  buttonLabel?: string;
  triggerLabel?: string;
  variant?: "primary" | "header" | "outline";
}

const WHATSAPP_DESK = "918149909546";

export function SpecSheetDownloadModal({
  productName: rawProductName,
  commodityName,
  hsCode = "All 49 HS Lines",
  pdfUrl = "/catalogue.pdf",
  buttonLabel: rawButtonLabel,
  triggerLabel,
  variant = "primary",
}: SpecSheetDownloadModalProps) {
  const productName = rawProductName ?? commodityName ?? "2026 Master Agricultural Export Catalog";
  const buttonLabel =
    rawButtonLabel ?? triggerLabel ?? "Download Technical Export Spec Sheet (PDF)";
  const [isOpen, setIsOpen] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerWhatsApp, setBuyerWhatsApp] = useState("");
  const [executiveContact, setExecutiveContact] = useState<"Saksham Singh" | "Sana Zeba Bakshi">(
    "Saksham Singh",
  );

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
      ? "inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-lg border border-[#C59B27]/40 bg-white/[0.05] px-3.5 py-2 text-xs font-mono font-medium text-[#E4BC4A] transition hover:bg-[#C59B27]/15 hover:border-[#C59B27]"
      : variant === "outline"
        ? "inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-lg border border-[#C59B27] bg-[#091E16] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#E4BC4A] transition hover:bg-[#C59B27]/10"
        : "inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#C59B27] to-[#A67C1E] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#091E16] shadow-lg transition hover:brightness-110";

  const modalContent =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="spec-sheet-modal-title"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative my-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#C59B27]/30 bg-[#091E16] p-6 text-[#FBFBFA] shadow-2xl sm:p-7"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-[#FBFBFA]/60 hover:bg-white/10 hover:text-[#FBFBFA]"
                aria-label="Close specification download modal"
              >
                ✕
              </button>

              <div className="inline-flex items-center gap-2 rounded-md bg-[#C59B27]/20 border border-[#C59B27]/40 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#E4BC4A]">
                Technical Export Specification • HS {hsCode}
              </div>
              <h3
                id="spec-sheet-modal-title"
                className="mt-3 font-serif text-xl font-bold text-[#FBFBFA]"
              >
                Download {productName} Dossier (PDF)
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#FBFBFA]/70">
                Direct export specification sheet including size grading, reefer temperature setpoints,
                shelf life, and container stuffing calculations.
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
                    className="mt-1.5 w-full rounded-lg border border-[#C59B27]/30 bg-[#05130E] px-3.5 py-2.5 text-sm text-[#FBFBFA] focus:border-[#C59B27] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="spec-lead-wa"
                    className="block text-xs font-mono uppercase tracking-wider text-[#C59B27]"
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
                    className="mt-1.5 w-full rounded-lg border border-[#C59B27]/30 bg-[#05130E] px-3.5 py-2.5 text-sm text-[#FBFBFA] focus:border-[#C59B27] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="spec-lead-exec"
                    className="block text-xs font-mono uppercase tracking-wider text-[#C59B27]"
                  >
                    Direct Trade Desk Officer
                  </label>
                  <select
                    id="spec-lead-exec"
                    value={executiveContact}
                    onChange={(e) =>
                      setExecutiveContact(e.target.value as "Saksham Singh" | "Sana Zeba Bakshi")
                    }
                    className="mt-1.5 w-full rounded-lg border border-[#C59B27]/30 bg-[#05130E] px-3.5 py-2.5 text-sm text-[#FBFBFA] focus:border-[#C59B27] focus:outline-none"
                  >
                    <option value="Saksham Singh">
                      Saksham Singh (Managing Director — Business Development)
                    </option>
                    <option value="Sana Zeba Bakshi">
                      Sana Zeba Bakshi (Chief Executive Officer &amp; Founder)
                    </option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-[#C59B27] to-[#A67C1E] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#091E16] shadow-lg transition hover:brightness-110"
                  >
                    Download Dossier &amp; Connect to Trade Desk
                  </button>
                  <div className="mt-2.5 text-center">
                    <a
                      href={pdfUrl}
                      download
                      onClick={() => setIsOpen(false)}
                      className="text-[11px] font-mono text-[#FBFBFA]/50 underline hover:text-[#C59B27]"
                    >
                      Or download PDF file directly
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )
      : null;

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
      {modalContent}
    </>
  );
}
