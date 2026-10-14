import React, { useMemo, useState } from "react";
import {
  ThermometerSnowflake,
  Wind,
  Droplets,
  Boxes,
  Check,
  Copy,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

export interface CommodityOption {
  id: string;
  name: string;
  hsCode: string;
  defaultBagKg: number;
  isReefer: boolean;
  tempRange: string;
  ventilation: string;
  humidity: string;
  notes: string;
  default20Mt: number;
  default40Mt: number;
}

export const COMMODITY_CATALOG: CommodityOption[] = [
  {
    id: "onions",
    name: "Fresh Red Onions (Nashik Origin)",
    hsCode: "07031010",
    defaultBagKg: 25,
    isReefer: true,
    tempRange: "+2°C to +4°C",
    ventilation: "25 CBM/hr",
    humidity: "65% – 70% RH",
    notes: "Requires continuous dehumidified airflow to prevent root shoot germination and fungal skin spoilage.",
    default20Mt: 14,
    default40Mt: 29,
  },
  {
    id: "chillies",
    name: "Fresh Green Chillies (G4 / Teja)",
    hsCode: "07096010",
    defaultBagKg: 5,
    isReefer: true,
    tempRange: "+8°C to +10°C",
    ventilation: "15 CBM/hr",
    humidity: "85% – 90% RH",
    notes: "Requires pre-cooled cold chain with corrugated CFB ventilated cartons to maintain stem greenness.",
    default20Mt: 8,
    default40Mt: 14,
  },
  {
    id: "basmati",
    name: "Indian Basmati Rice (1121 / 1509 XXL)",
    hsCode: "10063020",
    defaultBagKg: 25,
    isReefer: false,
    tempRange: "Ambient Dry Storage",
    ventilation: "Closed (Dry FCL)",
    humidity: "< 60% Ambient RH",
    notes: "Dry container lined with heavy kraft paper and 4x calcium chloride container desiccants.",
    default20Mt: 26,
    default40Mt: 28,
  },
  {
    id: "coconuts",
    name: "Semi-Husked Brown Coconuts",
    hsCode: "08011910",
    defaultBagKg: 13,
    isReefer: true,
    tempRange: "+10°C to +12°C",
    ventilation: "20 CBM/hr",
    humidity: "70% – 75% RH",
    notes: "Packed in 25-nut PP mesh bags (~13-14 kg/bag). Fumigated with Aluminium Phosphide prior to sea transit.",
    default20Mt: 12,
    default40Mt: 26.5,
  },
  {
    id: "spices",
    name: "Whole Spices (Cumin, Turmeric, Coriander)",
    hsCode: "09093129",
    defaultBagKg: 25,
    isReefer: false,
    tempRange: "Ambient Dry Storage",
    ventilation: "Closed (Moisture Controlled)",
    humidity: "< 55% Ambient RH",
    notes: "Multi-wall paper bags or PP bags with inner poly liners. Mandatory Phytosanitary and Fumigation docs.",
    default20Mt: 20,
    default40Mt: 26,
  },
  {
    id: "pulses",
    name: "Pulses & Lentils (Chickpeas, Toor Dal)",
    hsCode: "07132000",
    defaultBagKg: 50,
    isReefer: false,
    tempRange: "Ambient Dry Storage",
    ventilation: "Closed (Dry FCL)",
    humidity: "< 65% Ambient RH",
    notes: "High bulk density commodity. Loaded up to maximum permissible container gross payload limits.",
    default20Mt: 25,
    default40Mt: 27,
  },
];

const BAG_WEIGHT_OPTIONS = [
  { value: 5, label: "5 kg Mesh Bag / Retail Carton" },
  { value: 10, label: "10 kg Export Carton / Mesh Bag" },
  { value: 18, label: "18 kg Export Carton (Middle East Std)" },
  { value: 20, label: "20 kg PP Woven / Leno Bag" },
  { value: 25, label: "25 kg Commercial Export Bag (Global Std)" },
  { value: 50, label: "50 kg Bulk Wholesale Bag (PP / Jute)" },
];

const CONTAINER_TYPE_OPTIONS = [
  {
    id: "40ft-reefer",
    label: "40ft High Cube Reefer FCL (+1°C to +13°C Controlled)",
    shortLabel: "40ft HC Reefer FCL",
    isReefer: true,
  },
  {
    id: "20ft-dry",
    label: "20ft Standard Dry Container FCL (Heavy Payload)",
    shortLabel: "20ft Dry FCL",
    isReefer: false,
  },
  {
    id: "40ft-dry",
    label: "40ft High Cube Dry Container FCL (67.7 CBM)",
    shortLabel: "40ft HC Dry FCL",
    isReefer: false,
  },
] as const;

const STUFFING_STYLES = [
  {
    id: "loose",
    name: "Loose Stuffing (Floor Stuffed)",
    desc: "Maximizes net container volume. Up to 100% capacity utilized.",
    payloadFactor: 1.0,
  },
  {
    id: "palletized",
    name: "Palletized (20 Euro/ISO Pallets)",
    desc: "20 Heat-Treated (ISPM-15) wooden pallets. Faster forklift dock handling.",
    payloadFactor: 0.88, // Pallet tare & volume reduction ~12%
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
  selectableCommodity = false,
}: {
  productName?: string;
  hsCode?: string;
  container20ftText?: string;
  container40ftText?: string;
  defaultBagKg?: number;
  selectableCommodity?: boolean;
}) {
  const [selectedCommodityId, setSelectedCommodityId] = useState<string>("onions");
  const activeCommodity = useMemo(() => {
    return COMMODITY_CATALOG.find((c) => c.id === selectedCommodityId) ?? COMMODITY_CATALOG[0];
  }, [selectedCommodityId]);

  const activeName = selectableCommodity
    ? activeCommodity.name
    : productName || "Fresh Red Onions (Nashik Origin)";

  const activeHsCode = selectableCommodity
    ? activeCommodity.hsCode
    : hsCode || "07031010";

  const isFreshReefer = useMemo(() => {
    if (selectableCommodity) return activeCommodity.isReefer;
    return /reefer|onion|chilli|banana|grape|mango|pomegranate|lemon|orange|vegetable|fruit|tomato|potato|okra|garlic|ginger/i.test(
      `${activeName} ${container40ftText ?? ""}`,
    );
  }, [selectableCommodity, activeCommodity, activeName, container40ftText]);

  const base20Mt = useMemo(() => {
    if (selectableCommodity) return activeCommodity.default20Mt;
    return parseDefaultMt(container20ftText, isFreshReefer ? 14 : 24);
  }, [selectableCommodity, activeCommodity, container20ftText, isFreshReefer]);

  const base40Mt = useMemo(() => {
    if (selectableCommodity) return activeCommodity.default40Mt;
    return parseDefaultMt(container40ftText, isFreshReefer ? 29 : 28);
  }, [selectableCommodity, activeCommodity, container40ftText, isFreshReefer]);

  const [containerType, setContainerType] = useState<string>(
    isFreshReefer ? "40ft-reefer" : "20ft-dry",
  );
  const [stuffingStyle, setStuffingStyle] = useState<"loose" | "palletized">("loose");
  const [bagWeightKg, setBagWeightKg] = useState<number>(
    selectableCommodity ? activeCommodity.defaultBagKg : defaultBagKg,
  );
  const [fclCount, setFclCount] = useState<number>(1);
  const [incoterm, setIncoterm] = useState<string>(INCOTERM_OPTIONS[0]);
  const [destinationPort, setDestinationPort] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Update bag weight default when commodity changes
  const handleCommodityChange = (cid: string) => {
    setSelectedCommodityId(cid);
    const found = COMMODITY_CATALOG.find((c) => c.id === cid);
    if (found) {
      setBagWeightKg(found.defaultBagKg);
      if (found.isReefer) {
        setContainerType("40ft-reefer");
      } else {
        setContainerType("20ft-dry");
      }
    }
  };

  const mtPerContainer = useMemo(() => {
    const factor = stuffingStyle === "palletized" ? 0.88 : 1.0;
    if (containerType === "20ft-dry") return Number((base20Mt * factor).toFixed(2));
    if (containerType === "40ft-reefer") return Number((base40Mt * factor).toFixed(2));
    return Number((Math.max(base40Mt, base20Mt) * factor).toFixed(2));
  }, [containerType, base20Mt, base40Mt, stuffingStyle]);

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

  // Telemetry computation
  const telemetry = useMemo(() => {
    const isReeferSelected = containerType === "40ft-reefer";
    if (selectableCommodity) {
      if (!isReeferSelected) {
        return {
          temp: "Ambient Dry (Standard Non-Reefer)",
          vent: "Closed / Non-ventilated",
          humidity: "< 60% Ambient RH",
          notes: "Dry container stuffed with kraft lining and desiccants to maintain dry moisture barrier.",
        };
      }
      return {
        temp: activeCommodity.tempRange,
        vent: activeCommodity.ventilation,
        humidity: activeCommodity.humidity,
        notes: activeCommodity.notes,
      };
    }

    if (isFreshReefer && isReeferSelected) {
      if (/chilli/i.test(activeName)) {
        return {
          temp: "+8°C to +10°C (Pre-cooled)",
          vent: "15 CBM/hr",
          humidity: "85% – 90% RH",
          notes: "High humidity required to preserve green pedicel turgidity and avoid dehydration.",
        };
      }
      return {
        temp: "+2°C to +4°C (Continuous Reefer)",
        vent: "25 CBM/hr (Continuous Flow)",
        humidity: "65% – 70% RH (Dehumidified)",
        notes: "Air circulation floor vents must remain unobstructed to prevent condensation and black mold.",
      };
    }

    return {
      temp: "Ambient Sea Freight",
      vent: "Standard Dry Seals",
      humidity: "< 60% RH Dry Standard",
      notes: "Cargo safeguarded against ocean container condensation with high-grade silica poles.",
    };
  }, [selectableCommodity, activeCommodity, isFreshReefer, containerType, activeName]);

  const whatsappRfqUrl = useMemo(() => {
    const lines = [
      "Hello Sheshaan Global Export Desk,",
      `I computed container loading specs on your portal and request an official proforma quote:`,
      `• Commodity: ${activeName} (HS Code: ${activeHsCode})`,
      `• Equipment: ${fclCount} x ${selectedContainerLabel} (${totalMetricTons} MT Total)`,
      `• Stuffing Style: ${stuffingStyle === "palletized" ? "Palletized (20 Euro/ISO Pallets)" : "Loose Floor Stuffed (Max Volume)"}`,
      `• Packaging Spec: ${bagWeightKg} kg units (~${totalBags.toLocaleString("en-US")} total bags/cartons)`,
      `• Reefer / Cargo Setting: Temp: ${telemetry.temp} | Vent: ${telemetry.vent} | RH: ${telemetry.humidity}`,
      `• Incoterm: ${incoterm}`,
      destinationPort.trim()
        ? `• Discharge Port: ${destinationPort.trim()}`
        : "• Discharge Port: Please advise route & freight rate",
      "",
      "Please provide FOB Nhava Sheva / CIF pricing and container vessel schedule.",
    ];
    return `https://wa.me/918149909546?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [
    activeName,
    activeHsCode,
    fclCount,
    selectedContainerLabel,
    totalMetricTons,
    stuffingStyle,
    bagWeightKg,
    totalBags,
    telemetry,
    incoterm,
    destinationPort,
  ]);

  const emailRfqUrl = useMemo(() => {
    const subject = `Container Stuffing RFQ: ${activeName} (HS ${activeHsCode}) — ${totalMetricTons} MT (${fclCount} FCL)`;
    const body = [
      "Hello Sheshaan Global Export Desk,",
      "",
      "Please provide an official commercial proforma quotation for the following container specification:",
      `• Commodity: ${activeName}`,
      `• HS Code: ${activeHsCode}`,
      `• Equipment Configuration: ${fclCount} x ${selectedContainerLabel}`,
      `• Stuffing Method: ${stuffingStyle === "palletized" ? "Palletized (20 Euro Pallets with stretch-wrap)" : "Loose Floor Stuffing"}`,
      `• Net Payload Volume: ${totalMetricTons} Metric Tons (${totalLbs} lbs)`,
      `• Packaging Unit: ${bagWeightKg} kg bags/cartons (${totalBags.toLocaleString("en-US")} total units)`,
      `• Cold Chain / Reefer Settings: ${telemetry.temp} | Airflow: ${telemetry.vent} | RH: ${telemetry.humidity}`,
      `• Commercial Incoterms: ${incoterm}`,
      `• Destination Port: ${destinationPort.trim() || "To be advised"}`,
      "",
      "Thank you.",
    ].join("\n");
    return `mailto:info@sheshaanglobal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [
    activeName,
    activeHsCode,
    totalMetricTons,
    fclCount,
    selectedContainerLabel,
    stuffingStyle,
    totalLbs,
    bagWeightKg,
    totalBags,
    telemetry,
    incoterm,
    destinationPort,
  ]);

  const copySpecsToClipboard = () => {
    const text = `Sheshaan Global FCL Load Spec: ${activeName} (HS ${activeHsCode}) | ${fclCount}x ${selectedContainerLabel} | Total: ${totalMetricTons} MT (${totalBags.toLocaleString()} bags @ ${bagWeightKg}kg) | Stuffing: ${stuffingStyle} | Temp: ${telemetry.temp} | Vent: ${telemetry.vent} | RH: ${telemetry.humidity}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Container specifications copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <span className="inline-block rounded-full bg-[#0057B8]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0057B8]">
            Interactive B2B Procurement Utility
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
            Container Loading &amp; Packing Spec Calculator
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Calculate accurate net metric tons (MT), total bag/carton counts, pallet stuffing configs,
            and cold-chain reefer telemetry settings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-900">
            HS Code: <span className="font-mono font-bold">{activeHsCode}</span> • CHA &amp; APEDA Verified
          </div>
          <button
            onClick={copySpecsToClipboard}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
            title="Copy specifications to clipboard"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-500" />}
            <span>{copied ? "Copied" : "Copy Specs"}</span>
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {selectableCommodity && (
            <div className="sm:col-span-2">
              <label
                htmlFor="calc-commodity-select"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                1. Select Agricultural Commodity
              </label>
              <select
                id="calc-commodity-select"
                value={selectedCommodityId}
                onChange={(e) => handleCommodityChange(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 focus:border-[#0057B8] focus:outline-none"
              >
                {COMMODITY_CATALOG.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — HS {c.hsCode}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="sm:col-span-2">
            <label
              htmlFor="calc-container-type"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              {selectableCommodity ? "2." : "1."} Select Container Equipment Type
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

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              {selectableCommodity ? "3." : "2."} Stuffing Configuration
            </label>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              {STUFFING_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setStuffingStyle(style.id)}
                  className={`flex flex-col rounded-xl border p-3 text-left transition ${
                    stuffingStyle === style.id
                      ? "border-[#0057B8] bg-[#0057B8]/5 ring-2 ring-[#0057B8]/20"
                      : "border-slate-300 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Boxes className={`h-4 w-4 ${stuffingStyle === style.id ? "text-[#0057B8]" : "text-slate-400"}`} />
                    <span className="text-xs font-bold text-slate-900">{style.name}</span>
                  </div>
                  <span className="mt-1 text-[11px] text-slate-500 leading-snug">{style.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="calc-bag-weight"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              {selectableCommodity ? "4." : "3."} Packaging Unit Weight
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
              {selectableCommodity ? "5." : "4."} Number of Containers (FCL)
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
              {selectableCommodity ? "6." : "5."} Commercial Incoterm
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
              {selectableCommodity ? "7." : "6."} Destination Port (Optional)
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

        {/* Output Panel */}
        <div className="flex flex-col justify-between rounded-2xl bg-[#04152D] p-6 text-white lg:col-span-5 shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
                Computed Stuffing Output
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                {stuffingStyle === "palletized" ? "20 Pallets" : "Floor Loose"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-sm">
                <div className="text-[11px] uppercase tracking-wider text-slate-300">
                  Net Metric Tons
                </div>
                <div className="mt-1 text-2xl font-extrabold text-white">{totalMetricTons} MT</div>
                <div className="mt-0.5 text-[11px] text-slate-300">~{totalLbs} lbs payload</div>
              </div>
              <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-sm">
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

            {/* Reefer / Cargo Telemetry Settings Box */}
            <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-300">
                <ThermometerSnowflake className="h-3.5 w-3.5" /> Recommended Cold Chain Telemetry
              </div>
              <div className="mt-2.5 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-black/30 p-2">
                  <div className="text-[10px] text-slate-400">Setpoint Temp</div>
                  <div className="mt-0.5 font-bold text-white text-[11px]">{telemetry.temp}</div>
                </div>
                <div className="rounded-lg bg-black/30 p-2">
                  <div className="text-[10px] text-slate-400">Airflow / Vent</div>
                  <div className="mt-0.5 font-bold text-white text-[11px]">{telemetry.vent}</div>
                </div>
                <div className="rounded-lg bg-black/30 p-2">
                  <div className="text-[10px] text-slate-400">Target RH</div>
                  <div className="mt-0.5 font-bold text-white text-[11px]">{telemetry.humidity}</div>
                </div>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-300">
                {telemetry.notes}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>VGM certified at JNPT / Mundra via authorized CHA &amp; carrier lines.</span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href={whatsappRfqUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-emerald-500"
            >
              Export Calculation to WhatsApp RFQ (+91 81499 09546)
            </a>
            <a
              href={emailRfqUrl}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-white/20"
            >
              Request Commercial Proforma via Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
