import { useState, useMemo } from "react";
import {
  Calculator,
  Ship,
  Box,
  Scale,
  FileCheck2,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Thermometer,
} from "lucide-react";

interface CommodityConfig {
  id: string;
  name: string;
  hsCode: string;
  containerType: "40ft Reefer FCL" | "20ft Dry FCL" | "40ft Dry FCL";
  defaultBagKg: number;
  availableBags: { kg: number; label: string }[];
  maxPayloadMt: number;
  tempRequirement: string;
  defaultOriginPort: string;
}

const COMMODITIES: CommodityConfig[] = [
  {
    id: "onions",
    name: "Fresh Nashik Red Onions (55-65mm)",
    hsCode: "07031010",
    containerType: "40ft Reefer FCL",
    defaultBagKg: 25,
    availableBags: [
      { kg: 25, label: "25kg Red Leno Mesh Bags (Standard Commercial)" },
      { kg: 10, label: "10kg Red Leno Mesh Bags (Supermarket Retail)" },
      { kg: 50, label: "50kg Jute / PP Bags (Wholesale Catering)" },
      { kg: 5, label: "5kg Retail Pack (Consumer Mesh)" },
    ],
    maxPayloadMt: 29.0,
    tempRequirement: "+2.0°C to +4.0°C (RH 65-70%)",
    defaultOriginPort: "Nhava Sheva (JNPT Berths 1–4)",
  },
  {
    id: "chillies",
    name: "G4 & Teja Fresh Green Chillies",
    hsCode: "07096010",
    containerType: "40ft Reefer FCL",
    defaultBagKg: 5,
    availableBags: [
      { kg: 5, label: "5kg CFB Corrugated Export Cartons (Standard)" },
      { kg: 4, label: "4kg CFB Corrugated Cartons (Gulf Specification)" },
      { kg: 10, label: "10kg Ventilated Master Box" },
    ],
    maxPayloadMt: 12.5,
    tempRequirement: "+7.0°C to +9.0°C (RH 90-95%)",
    defaultOriginPort: "Nhava Sheva (JNPT) / Mumbai Air Cargo",
  },
  {
    id: "basmati",
    name: "Indian 1121 Basmati Rice (Steam / Sella)",
    hsCode: "10063020",
    containerType: "20ft Dry FCL",
    defaultBagKg: 25,
    availableBags: [
      { kg: 25, label: "25kg Non-Woven / BOPP Polypropylene Bags" },
      { kg: 50, label: "50kg Multiwall Export Jute / PP Bags" },
      { kg: 10, label: "10kg Premium Zip Pouch Retail Bags" },
      { kg: 5, label: "5kg Consumer Retail Packs (Master Bale of 4)" },
    ],
    maxPayloadMt: 26.0,
    tempRequirement: "Ambient Dry Cargo (Desiccant Kraft Lined)",
    defaultOriginPort: "Mundra Port (Gujarat) / JNPT",
  },
  {
    id: "coconut",
    name: "Pollachi Semi-Husked Mature Coconuts",
    hsCode: "08011200",
    containerType: "40ft Reefer FCL",
    defaultBagKg: 13,
    availableBags: [
      { kg: 13, label: "13kg PP Mesh Bags (Approx. 25 nuts/bag, 550-650g)" },
      { kg: 26, label: "26kg PP Mesh Bags (Approx. 50 nuts/bag)" },
    ],
    maxPayloadMt: 28.0,
    tempRequirement: "+12.0°C to +14.0°C Controlled Atmosphere",
    defaultOriginPort: "Tuticorin (V.O.C Port) / Cochin",
  },
  {
    id: "spices",
    name: "Whole Cumin / Turmeric Fingers (Sortex)",
    hsCode: "09093129",
    containerType: "20ft Dry FCL",
    defaultBagKg: 25,
    availableBags: [
      { kg: 25, label: "25kg Multiwall Kraft Paper Bags with inner PE" },
      { kg: 50, label: "50kg Heavy Polypropylene Bags" },
    ],
    maxPayloadMt: 18.0,
    tempRequirement: "Dry Container with Desiccant Dry Poles",
    defaultOriginPort: "Mundra Port / JNPT",
  },
  {
    id: "pulses",
    name: "Sortex Kabuli Chickpeas (75-80 Count)",
    hsCode: "07132000",
    containerType: "20ft Dry FCL",
    defaultBagKg: 25,
    availableBags: [
      { kg: 25, label: "25kg Heavy Export PP Bags (Standard)" },
      { kg: 50, label: "50kg Jute / PP Bags" },
    ],
    maxPayloadMt: 24.0,
    tempRequirement: "Ambient Dry Container",
    defaultOriginPort: "Nhava Sheva (JNPT)",
  },
];

const DESTINATIONS: { port: string; transit: string; docs: string }[] = [
  {
    port: "Jebel Ali Port (Dubai, UAE)",
    transit: "3.5 to 4 Days (Direct Weekly Express)",
    docs: "COO (Indo-Arab), Phytosanitary, Fumigation (MBr), Commercial Invoice, Packing List, BL",
  },
  {
    port: "Dammam / King Abdulaziz Port (Saudi Arabia)",
    transit: "5 to 7 Days",
    docs: "SFDA Conformity Certificate, Certificate of Origin, Phytosanitary, SABER Registration",
  },
  {
    port: "Jeddah Islamic Port (Saudi Arabia)",
    transit: "7 to 8 Days",
    docs: "SFDA Halal/Origin Compliance, Phyto, Commercial Invoice Legalized",
  },
  {
    port: "Port of Felixstowe / London Gateway (UK)",
    transit: "18 to 22 Days",
    docs: "DEFRA Phytosanitary Certificate, EU-MRL Residue Analysis, COO, Bill of Lading",
  },
  {
    port: "Port of Rotterdam (Netherlands / EU)",
    transit: "20 to 22 Days",
    docs: "TRACES EU Plant Health, Eurofins Aflatoxin Test, Non-Preferential COO",
  },
  {
    port: "Singapore Jurong Port (Singapore)",
    transit: "6 to 8 Days",
    docs: "SFA Phytosanitary Certificate, Fumigation Treatment, Commercial Invoice",
  },
  {
    port: "Port Klang (Malaysia)",
    transit: "6 to 7 Days",
    docs: "MAQIS Import Permit, Phytosanitary Certificate, COO Form AI (ASEAN-India)",
  },
  {
    port: "Hamad Port / Doha (Qatar)",
    transit: "4 to 5 Days",
    docs: "Qatar MOPH Food Safety Clearance, Phytosanitary, COO Legalized",
  },
];

export function InteractiveContainerCalculator() {
  const [selectedCommodityId, setSelectedCommodityId] = useState("onions");
  const [selectedBagKg, setSelectedBagKg] = useState<number>(25);
  const [selectedDestinationPort, setSelectedDestinationPort] = useState(DESTINATIONS[0].port);
  const [selectedIncoterm, setSelectedIncoterm] = useState<"FOB" | "CIF" | "CFR">("CIF");
  const [containerCount, setContainerCount] = useState<number>(1);

  const activeCommodity = useMemo(
    () => COMMODITIES.find((c) => c.id === selectedCommodityId) || COMMODITIES[0],
    [selectedCommodityId],
  );

  const activeDestination = useMemo(
    () => DESTINATIONS.find((d) => d.port === selectedDestinationPort) || DESTINATIONS[0],
    [selectedDestinationPort],
  );

  // Sync default bag weight if commodity changes
  const handleCommodityChange = (newId: string) => {
    setSelectedCommodityId(newId);
    const found = COMMODITIES.find((c) => c.id === newId);
    if (found) setSelectedBagKg(found.defaultBagKg);
  };

  // Calculations
  const totalMetricTons = useMemo(
    () => Number((activeCommodity.maxPayloadMt * containerCount).toFixed(2)),
    [activeCommodity, containerCount],
  );

  const totalBagsCount = useMemo(
    () => Math.round((totalMetricTons * 1000) / selectedBagKg),
    [totalMetricTons, selectedBagKg],
  );

  const buildWhatsAppRfqUrl = () => {
    const lines = [
      "Hello Sheshaan Global Commercial Export Desk,",
      `I have configured a formal procurement inquiry using your B2B Container Load Calculator:`,
      `• Commodity: ${activeCommodity.name} (HS: ${activeCommodity.hsCode})`,
      `• Volume / Equipment: ${containerCount} x ${activeCommodity.containerType}`,
      `• Total Payload: ${totalMetricTons} MT (${totalBagsCount.toLocaleString()} bags of ${selectedBagKg}kg)`,
      `• Packaging: ${activeCommodity.availableBags.find((b) => b.kg === selectedBagKg)?.label || `${selectedBagKg}kg Bags`}`,
      `• Gateway Port: ${activeCommodity.defaultOriginPort} (India)`,
      `• Destination Port: ${selectedDestinationPort}`,
      `• Trade Incoterm: ${selectedIncoterm}`,
      `• Transit Window: ${activeDestination.transit}`,
      `• Reefer Setpoint: ${activeCommodity.tempRequirement}`,
      "",
      "Please provide the current firm CIF/FOB quote, stuffing schedule, and proforma invoice.",
    ];

    return `https://wa.me/918149909546?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <section id="b2b-calculator" className="bg-[#091E16] py-20 text-[#FBFBFA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="border-b border-[#C59B27]/25 pb-8">
          <div className="inline-flex items-center gap-2 rounded border border-[#C59B27]/40 bg-[#05130E] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-[#E4BC4A]">
            <Calculator className="h-3.5 w-3.5 text-[#C59B27]" />
            B2B Commercial Procurement Tool
          </div>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#FBFBFA] sm:text-4xl lg:text-5xl">
            Interactive Container Load &amp; RFQ Calculator
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-[#FBFBFA]/75">
            Calculate exact FCL payload capacities, bag counts, reefer temperature setpoints, and
            ocean transit times. Generate an immediate pre-filled RFQ with one click.
          </p>
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#05130E] p-6 sm:p-7 shadow-xl space-y-5">
            <div className="border-b border-white/10 pb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27]">
              Step 1: Configure Cargo Specifications
            </div>

            {/* Input 1: Commodity Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#FBFBFA]/80">
                1. Select Export Commodity
              </label>
              <select
                value={selectedCommodityId}
                onChange={(e) => handleCommodityChange(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#091E16] px-3.5 py-3 text-sm font-medium text-[#FBFBFA] focus:border-[#C59B27] focus:outline-none"
              >
                {COMMODITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (HS: {c.hsCode})
                  </option>
                ))}
              </select>
            </div>

            {/* Input 2: Packaging Choice */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#FBFBFA]/80">
                2. Export Packaging Choice
              </label>
              <select
                value={selectedBagKg}
                onChange={(e) => setSelectedBagKg(Number(e.target.value))}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#091E16] px-3.5 py-3 text-sm font-medium text-[#FBFBFA] focus:border-[#C59B27] focus:outline-none"
              >
                {activeCommodity.availableBags.map((bag) => (
                  <option key={bag.kg} value={bag.kg}>
                    {bag.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Input 3: Destination Port */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#FBFBFA]/80">
                3. Destination Discharge Port
              </label>
              <select
                value={selectedDestinationPort}
                onChange={(e) => setSelectedDestinationPort(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#091E16] px-3.5 py-3 text-sm font-medium text-[#FBFBFA] focus:border-[#C59B27] focus:outline-none"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.port} value={d.port}>
                    {d.port}
                  </option>
                ))}
              </select>
            </div>

            {/* Input 4: Incoterm & Container Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#FBFBFA]/80">
                  4. Preferred Incoterm
                </label>
                <div className="mt-1.5 grid grid-cols-3 gap-1 rounded-lg border border-white/15 bg-[#091E16] p-1 text-xs font-mono text-center">
                  {(["CIF", "FOB", "CFR"] as const).map((inc) => (
                    <button
                      key={inc}
                      type="button"
                      onClick={() => setSelectedIncoterm(inc)}
                      className={`rounded py-2 font-bold transition-colors ${
                        selectedIncoterm === inc
                          ? "bg-[#C59B27] text-[#091E16]"
                          : "text-[#FBFBFA]/75 hover:bg-white/10"
                      }`}
                    >
                      {inc}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#FBFBFA]/80">
                  Container Volume (FCL)
                </label>
                <div className="mt-1.5 flex items-center rounded-lg border border-white/15 bg-[#091E16] px-3 py-2 text-sm font-mono">
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={containerCount}
                    onChange={(e) => setContainerCount(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-transparent text-[#FBFBFA] focus:outline-none font-bold"
                  />
                  <span className="text-xs text-[#FBFBFA]/60 shrink-0">Containers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Output Display & 1-Click WhatsApp Trigger */}
          <div className="lg:col-span-6 rounded-2xl border border-[#C59B27]/40 bg-[#05130E] p-6 sm:p-7 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#C59B27]/25 pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E4BC4A]">
                Step 2: Instant Technical Procurement Output
              </span>
              <span className="rounded bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                LIVE CALCULATION
              </span>
            </div>

            {/* Big Numbers Matrix */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#C59B27]/20 bg-[#091E16] p-4">
                <div className="text-[10px] font-mono uppercase text-[#FBFBFA]/60">
                  Gross Cargo Weight
                </div>
                <div className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-[#E4BC4A]">
                  {totalMetricTons}{" "}
                  <span className="text-sm font-normal text-[#FBFBFA]/70">Metric Tons</span>
                </div>
                <div className="mt-1 text-[11px] font-mono text-emerald-400">
                  Max Payload Verified
                </div>
              </div>

              <div className="rounded-xl border border-[#C59B27]/20 bg-[#091E16] p-4">
                <div className="text-[10px] font-mono uppercase text-[#FBFBFA]/60">
                  Total Packaging Units
                </div>
                <div className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-[#FBFBFA]">
                  {totalBagsCount.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-[#FBFBFA]/70">Bags / Boxes</span>
                </div>
                <div className="mt-1 text-[11px] font-mono text-[#C59B27]">
                  @{selectedBagKg} kg per unit
                </div>
              </div>
            </div>

            {/* Detailed Parameters List */}
            <div className="space-y-3 font-mono text-xs divide-y divide-white/10">
              <div className="pt-2 flex items-start justify-between">
                <span className="text-[#FBFBFA]/60">Container Equipment:</span>
                <span className="font-bold text-[#FBFBFA] text-right">
                  {containerCount}x {activeCommodity.containerType}
                </span>
              </div>

              <div className="pt-2 flex items-start justify-between">
                <span className="text-[#FBFBFA]/60">Ocean Transit Window:</span>
                <span className="font-bold text-emerald-400 text-right">
                  {activeDestination.transit}
                </span>
              </div>

              <div className="pt-2 flex items-start justify-between">
                <span className="text-[#FBFBFA]/60">Reefer Temp / Environment:</span>
                <span className="font-bold text-[#E4BC4A] text-right">
                  {activeCommodity.tempRequirement}
                </span>
              </div>

              <div className="pt-2 flex items-start justify-between">
                <span className="text-[#FBFBFA]/60">Indian Loading Gateway:</span>
                <span className="font-bold text-[#FBFBFA] text-right">
                  {activeCommodity.defaultOriginPort}
                </span>
              </div>

              <div className="pt-2 space-y-1">
                <span className="text-[#FBFBFA]/60">Required Export Clearance Documents:</span>
                <div className="text-[11px] text-[#FBFBFA]/90 bg-[#091E16] p-2.5 rounded-lg border border-white/10 leading-relaxed">
                  {activeDestination.docs}
                </div>
              </div>
            </div>

            {/* Direct 1-Click WhatsApp RFQ Trigger */}
            <div className="pt-2">
              <a
                href={buildWhatsAppRfqUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#C59B27] via-[#D8AD32] to-[#A67C1E] py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-[#091E16] shadow-[0_6px_22px_rgba(197,155,39,0.4)] transition-all hover:brightness-110 hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" />
                <span>Submit 1-Click WhatsApp RFQ with Pre-Filled Specs</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <p className="mt-2 text-center text-[11px] font-mono text-[#FBFBFA]/50">
                Direct route to Sheshaan Global Commercial Desk (+91 81499 09546) • Quotes generated within 2 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
