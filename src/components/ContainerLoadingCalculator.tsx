import React, { useMemo, useState } from "react";

const BAG_WEIGHT_OPTIONS = [
  { value: 5, label: "5 kg Mesh Bag / Retail Carton" },
  { value: 10, label: "10 kg Export Carton / Mesh Bag" },
  { value: 20, label: "20 kg PP Woven / Leno Bag" },
  { value: 25, label: "25 kg Commercial Export Bag (Standard)" },
  { value: 50, label: "50 kg Bulk Wholesale Bag (PP / Jute)" },
];

const CONTAINER_TYPE_OPTIONS = [
  {
    id: "40ft-reefer",
    label: "40ft High Cube Reefer FCL (+1°C to +13°C Controlled)",
    shortLabel: "40ft HC Reefer FCL",
  },
  {
    id: "20ft-dry",
    label: "20ft Standard Dry Container FCL (Heavy Payload)",
    shortLabel: "20ft Dry FCL",
  },
  {
    id: "40ft-dry",
    label: "40ft High Cube Dry Container FCL (67.7 CBM)",
    shortLabel: "40ft HC Dry FCL",
  },
] as const;

const INCOTERM_OPTIONS = [
  "FOB Nhava Sheva (JNPT) / Mundra",
  "CIF Destination Port (Cost, Insurance & Freight)",
  "CFR Destination Port (Cost & Freight)",
];

function parseDefaultMt(rawText: string | undefined, fallback: number): number {
  if (!rawText) return fallback;
  const matches = rawText.match(/(\d+(?:\.\d+)?)/g);
  if (!matches || matches.length === 0) return fallback;
  const nums = matches.map(Number).filter((n) => n >= 3 && n <= 32);
  if (nums.length === 0) return fallback;
  return nums[nums.length - 1];
}

export function ContainerLoadingCalculator({
  productName,
  hsCode,
  container20ftText,
  container40ftText,
  defaultBagKg = 25,
}: {
  productName: string;
  hsCode: string;
  container20ftText?: string;
  container40ftText?: string;
  defaultBagKg?: number;
}) {
  const base20Mt = useMemo(() => parseDefaultMt(container20ftText, 24), [container20ftText]);
  const base40Mt = useMemo(() => parseDefaultMt(container40ftText, 29), [container40ftText]);
  const isFreshReefer = useMemo(
    () =>
      /reefer|onion|chilli|banana|grape|mango|pomegranate|lemon|orange|vegetable|fruit|tomato|potato|okra|garlic|ginger/i.test(
        `${productName} ${container40ftText ?? ""}`,
      ),
    [productName, container40ftText],
  );

  const [containerType, setContainerType] = useState<string>(
    isFreshReefer ? "40ft-reefer" : "20ft-dry",
  );
  const [bagWeightKg, setBagWeightKg] = useState<number>(defaultBagKg);
  const [fclCount, setFclCount] = useState<number>(1);
  const [incoterm, setIncoterm] = useState<string>(INCOTERM_OPTIONS[0]);
  const [destinationPort, setDestinationPort] = useState<string>("");

  const mtPerContainer = useMemo(() => {
    if (containerType === "20ft-dry") return base20Mt;
    if (containerType === "40ft-reefer") return base40Mt;
    return Math.max(base40Mt, base20Mt);
  }, [containerType, base20Mt, base40Mt]);

  const totalMetricTons = useMemo(
    () => Number((mtPerContainer * fclCount).toFixed(2)),
    [mtPerContainer, fclCount],
  );

  const totalBags = useMemo(
    () => Math.round((totalMetricTons * 1000) / bagWeightKg),
    [totalMetricTons, bagWeightKg],
  );

  const totalLbs = useMemo(
    () => Math.round(totalMetricTons * 2204.62).toLocaleString("en-US"),
    [totalMetricTons],
  );

  const selectedContainerLabel =
    CONTAINER_TYPE_OPTIONS.find((c) => c.id === containerType)?.shortLabel ?? "40ft FCL";

  const whatsappRfqUrl = useMemo(() => {
    const lines = [
      "Hello Sheshaan Global Export Desk,",
      `I used your Container Loading Calculator and would like an official quotation:`,
      `• Commodity: ${productName} (HS Code: ${hsCode})`,
      `• Container Load: ${fclCount} x ${selectedContainerLabel} (${totalMetricTons} MT Total)`,
      `• Packaging: ${bagWeightKg} kg Bags/Cartons (${totalBags.toLocaleString("en-US")} units)`,
      `• Preferred Incoterm: ${incoterm}`,
      destinationPort.trim()
        ? `• Destination Port: ${destinationPort.trim()}`
        : "• Destination Port: Please advise transit & freight",
      "",
      "Please share current FOB/CIF pricing and technical export specification sheet.",
    ];
    return `https://wa.me/918149909546?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [
    productName,
    hsCode,
    fclCount,
    selectedContainerLabel,
    totalMetricTons,
    bagWeightKg,
    totalBags,
    incoterm,
    destinationPort,
  ]);

  const emailRfqUrl = useMemo(() => {
    const subject = `Calculated FCL Export RFQ: ${productName} (HS ${hsCode}) — ${totalMetricTons} MT`;
    const body = [
      "Hello Sheshaan Global Export Desk,",
      "",
      "Please provide an official commercial proforma quotation for the following container configuration:",
      `• Commodity: ${productName} (HS Code: ${hsCode})`,
      `• Container Configuration: ${fclCount} x ${selectedContainerLabel}`,
      `• Net Payload Volume: ${totalMetricTons} Metric Tons (${totalLbs} lbs)`,
      `• Packaging Specification: ${bagWeightKg} kg units (${totalBags.toLocaleString("en-US")} total bags/cartons)`,
      `• Incoterms: ${incoterm}`,
      `• Destination Port: ${destinationPort.trim() || "To be confirmed"}`,
      "",
      "Thank you.",
    ].join("\n");
    return `mailto:info@sheshaanglobal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [
    productName,
    hsCode,
    fclCount,
    selectedContainerLabel,
    totalMetricTons,
    totalLbs,
    bagWeightKg,
    totalBags,
    incoterm,
    destinationPort,
  ]);

  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <span className="inline-block rounded-full bg-[#0057B8]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0057B8]">
            Interactive B2B Procurement Utility
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
            Interactive Container Loading &amp; Bag Count Calculator — {productName}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Select your preferred bag/carton weight and container type to compute net Metric Tons
            (MT), total bag counts, and pre-populate your RFQ.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-900">
          HS Code: <span className="font-mono font-bold">{hsCode}</span> • CHA &amp; Carrier
          Verified
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <div className="sm:col-span-2">
            <label
              htmlFor="calc-container-type"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              1. Select Container Equipment Type
            </label>
            <select
              id="calc-container-type"
              value={containerType}
              onChange={(e) => setContainerType(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 focus:border-[#0057B8] focus:outline-none"
            >
              {CONTAINER_TYPE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="calc-bag-weight"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              2. Packaging Unit Weight
            </label>
            <select
              id="calc-bag-weight"
              value={bagWeightKg}
              onChange={(e) => setBagWeightKg(Number(e.target.value))}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 focus:border-[#0057B8] focus:outline-none"
            >
              {BAG_WEIGHT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="calc-fcl-count"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              3. Number of Containers (FCL)
            </label>
            <select
              id="calc-fcl-count"
              value={fclCount}
              onChange={(e) => setFclCount(Number(e.target.value))}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 focus:border-[#0057B8] focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 10, 20].map((n) => (
                <option key={n} value={n}>
                  {n} x {selectedContainerLabel} ({(n * mtPerContainer).toFixed(1)} MT)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="calc-incoterm"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              4. Commercial Incoterm
            </label>
            <select
              id="calc-incoterm"
              value={incoterm}
              onChange={(e) => setIncoterm(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 focus:border-[#0057B8] focus:outline-none"
            >
              {INCOTERM_OPTIONS.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="calc-dest-port"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              5. Destination Port (Optional)
            </label>
            <input
              id="calc-dest-port"
              type="text"
              value={destinationPort}
              onChange={(e) => setDestinationPort(e.target.value)}
              placeholder="e.g., Jebel Ali, Dammam, Rotterdam"
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#0057B8] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl bg-slate-900 p-6 text-white lg:col-span-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Computed Container Stuffing Output
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 p-3.5">
                <div className="text-[11px] uppercase tracking-wider text-slate-300">
                  Net Metric Tons
                </div>
                <div className="mt-1 text-2xl font-extrabold text-white">{totalMetricTons} MT</div>
                <div className="mt-0.5 text-[11px] text-slate-300">~{totalLbs} lbs</div>
              </div>
              <div className="rounded-xl bg-white/10 p-3.5">
                <div className="text-[11px] uppercase tracking-wider text-slate-300">
                  Total Bag / Box Count
                </div>
                <div className="mt-1 text-2xl font-extrabold text-emerald-400">
                  {totalBags.toLocaleString("en-US")}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-300">
                  Units @ {bagWeightKg} kg net
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              Stuffing &amp; VGM dock weight certified at Nhava Sheva (JNPT) / Mundra via licensed
              Customs House Agent (CHA) and tier-1 shipping lines (Maersk, MSC, CMA CGM,
              Hapag-Lloyd).
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href={whatsappRfqUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-emerald-500"
            >
              Send Calculated Load to WhatsApp (+91 81499 09546)
            </a>
            <a
              href={emailRfqUrl}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-white/20"
            >
              Request Official Proforma Quote via Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
