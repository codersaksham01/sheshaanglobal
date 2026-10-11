"use client";

import React, { useState } from "react";
import { PRODUCTS_CATALOG } from "../data/products";

const WHATSAPP_NUMBER = "918149909546";
const SALES_EMAIL = "info@sheshaanglobal.com";

interface RfqModalProps {
  defaultCommodityName?: string;
  defaultHsCode?: string;
  triggerLabel?: string;
  triggerClassName?: string;
}

export function RfqModal({
  defaultCommodityName = "Fresh Red Onion",
  defaultHsCode = "07031010",
  triggerLabel = "Request Instant B2B Export Quote",
  triggerClassName = "inline-flex items-center justify-center rounded-full bg-[#FF8A00] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#e07900] focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:ring-offset-2",
}: RfqModalProps) {
  // Strictly false on initial render — NEVER opens automatically on page load or timer
  const [isOpen, setIsOpen] = useState(false);
  const [commodity, setCommodity] = useState(defaultCommodityName);
  const [destinationPort, setDestinationPort] = useState("");
  const [incoterm, setIncoterm] = useState<"FOB" | "CIF" | "CFR">("CIF");
  const [containerQuantity, setContainerQuantity] = useState("1 x 40ft High Cube FCL");
  const [buyerCompany, setBuyerCompany] = useState("");

  const selectedProduct = PRODUCTS_CATALOG.find((p) => p.name === commodity);
  const hsCode = selectedProduct?.hsCode ?? defaultHsCode;

  const buildWhatsAppRfqHref = () => {
    const lines = [
      "Hello Sheshaan Global Export Desk,",
      `I would like to request a B2B Export Quotation:`,
      `• Commodity: ${commodity} (HS Code: ${hsCode})`,
      `• Volume / MOQ: ${containerQuantity}`,
      `• Incoterms: ${incoterm}`,
      `• Destination Port / Country: ${destinationPort || "To be confirmed"}`,
      buyerCompany ? `• Importing Company: ${buyerCompany}` : "",
      "",
      "Please share current FOB/CIF pricing, packing specs, and shipment lead time.",
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={triggerClassName}>
        {triggerLabel}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="rfq-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200">
            <div className="bg-[#04152D] px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
                  APEDA &amp; FSSAI Verified Export Desk
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close RFQ Modal"
                  className="rounded-full p-1.5 text-white/75 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <h2 id="rfq-modal-title" className="mt-2 text-xl font-bold">
                Request Official FOB / CIF Export Quotation
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Direct response from our Maharashtra trade desk (+91 81499 09546) within 4 business
                hours.
              </p>
            </div>

            <div className="space-y-4 p-6 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Select Export Commodity (49 Lines)
                </label>
                <select
                  value={commodity}
                  onChange={(e) => setCommodity(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#0057B8] focus:outline-none"
                >
                  {PRODUCTS_CATALOG.map((item) => (
                    <option key={item.sku} value={item.name}>
                      {item.name} (HS {item.hsCode})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Container Load / MOQ
                  </label>
                  <select
                    value={containerQuantity}
                    onChange={(e) => setContainerQuantity(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#0057B8] focus:outline-none"
                  >
                    <option value="1 x 20ft FCL">1 x 20ft FCL</option>
                    <option value="1 x 40ft High Cube FCL">1 x 40ft High Cube FCL</option>
                    <option value="2–5 Containers Monthly">2–5 Containers Monthly</option>
                    <option value="Air Freight Trial Lot (1–5 MT)">
                      Air Freight Trial Lot (1–5 MT)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Preferred Incoterms
                  </label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value as "FOB" | "CIF" | "CFR")}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#0057B8] focus:outline-none"
                  >
                    <option value="CIF">CIF (Destination Port)</option>
                    <option value="FOB">FOB (Nhava Sheva / Mundra)</option>
                    <option value="CFR">CFR (Cost &amp; Freight)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Destination Port &amp; Country
                  </label>
                  <input
                    type="text"
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    placeholder="e.g., Jebel Ali (UAE) / Rotterdam"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#0057B8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Company / Importer Name
                  </label>
                  <input
                    type="text"
                    value={buyerCompany}
                    onChange={(e) => setBuyerCompany(e.target.value)}
                    placeholder="Your Organization"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#0057B8] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={buildWhatsAppRfqHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#1da851]"
                >
                  Send RFQ via WhatsApp (+91 81499 09546)
                </a>
                <a
                  href={`mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
                    `B2B Export RFQ: ${commodity} (HS ${hsCode})`,
                  )}`}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Email Trade Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
