import { useState } from "react";
import {
  Ship,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Anchor,
  Box,
  Truck,
  Activity,
  Navigation,
} from "lucide-react";

interface CorridorData {
  id: string;
  name: string;
  dischargePort: string;
  country: string;
  transitDays: string;
  sailingsPerWeek: string;
  primaryCommodities: string[];
  tempSetpoint: string;
  humidityRH: string;
  ventSetting: string;
  fumigationProtocol: string;
  customsAuthority: string;
  portGateways: string;
}

const CORRIDORS: CorridorData[] = [
  {
    id: "uae",
    name: "JNPT → Jebel Ali (Dubai, UAE)",
    dischargePort: "Jebel Ali Port / DP World",
    country: "United Arab Emirates",
    transitDays: "3.5 Days Express",
    sailingsPerWeek: "3 Direct Express Sailings Weekly",
    primaryCommodities: ["Nashik Red Onions (55-65mm)", "G4 Green Chillies", "1121 Basmati Rice"],
    tempSetpoint: "+2.0°C to +4.0°C (Onions) / +7.0°C to +9.0°C (Chillies)",
    humidityRH: "65% – 70% RH",
    ventSetting: "25 – 30 CBM/hour",
    fumigationProtocol: "Methyl Bromide (MBr) 32g/m³ @ 21°C + Phyto",
    customsAuthority: "Dubai Municipality Food Safety & DP World Port Health",
    portGateways: "Nhava Sheva (JNPT) Berths 1–4 to Jebel Ali Terminal 2",
  },
  {
    id: "saudi",
    name: "JNPT → Dammam & Jeddah (Saudi Arabia)",
    dischargePort: "King Abdulaziz Port (Dammam) / Jeddah Islamic Port",
    country: "Kingdom of Saudi Arabia",
    transitDays: "5 to 7 Days",
    sailingsPerWeek: "2 Direct Sailings Weekly",
    primaryCommodities: ["Indian Basmati Rice (1121/1509)", "Nashik Red Onions", "Whole Spices"],
    tempSetpoint: "+2.0°C to +4.0°C (Perishables) / Ambient Dry (Rice)",
    humidityRH: "65% RH Max",
    ventSetting: "25 CBM/hour",
    fumigationProtocol: "SFDA Compliant Fumigation Certificate & GSO 150-1 Standard",
    customsAuthority: "Saudi Food and Drug Authority (SFDA) & SABER Clearance",
    portGateways: "JNPT / Mundra to Dammam Terminal 1",
  },
  {
    id: "europe",
    name: "JNPT → Felixstowe & Rotterdam (UK & Europe)",
    dischargePort: "Port of Felixstowe (UK) / Port of Rotterdam (Netherlands)",
    country: "United Kingdom & European Union",
    transitDays: "18 to 22 Days",
    sailingsPerWeek: "Weekly Dedicated Line Service",
    primaryCommodities: ["Nashik Garwa Onions", "Pollachi Coconuts", "Sortex Chickpeas"],
    tempSetpoint: "+2.0°C to +3.5°C Controlled Atmosphere",
    humidityRH: "65% RH Precision Controlled",
    ventSetting: "35 CBM/hour",
    fumigationProtocol: "EU 2073/2005 & Regulation (EC) 396/2005 MRL Certified",
    customsAuthority: "DEFRA (UK) & NVWA Food Safety (Netherlands)",
    portGateways: "JNPT Gateway Terminals India (GTI) to Felixstowe/Rotterdam",
  },
  {
    id: "southeast-asia",
    name: "JNPT / Tuticorin → Singapore & Klang (SEA)",
    dischargePort: "Jurong Port (Singapore) / Port Klang (Malaysia)",
    country: "Singapore & Malaysia",
    transitDays: "6 to 8 Days",
    sailingsPerWeek: "2 Fixed-Day Weekly Loops",
    primaryCommodities: ["Nashik Small & Red Onions", "Mature Coconuts", "Guntur Chillies"],
    tempSetpoint: "+2.0°C to +4.0°C (Onions) / +12.0°C (Coconuts)",
    humidityRH: "70% RH",
    ventSetting: "25 CBM/hour",
    fumigationProtocol: "SFA Phytosanitary Import Regulation & MAQIS Cleared",
    customsAuthority: "Singapore Food Agency (SFA) & MAQIS Malaysia",
    portGateways: "JNPT / Tuticorin to Jurong & Westport Klang",
  },
];

const COLD_CHAIN_STEPS = [
  {
    step: "01",
    title: "Origin Harvest & Burlap Curing",
    location: "Nashik / Lasalgaon Farm Belt",
    desc: "Post-harvest solar curing under ventilated burlap shades to crystallize dry outer skins (< 13.5% moisture).",
    icon: Truck,
  },
  {
    step: "02",
    title: "Packhouse Mechanical Grading",
    location: "APEDA Export Packhouse",
    desc: "Calibration by roller sorters into 45-55mm and 55-65mm diameters; elimination of thick neck or un-cured bulbs.",
    icon: Box,
  },
  {
    step: "03",
    title: "Pre-Cooling & Core Temp Stabilization",
    location: "Controlled Atmosphere Cold Store",
    desc: "Forced-air pre-cooling pulls core temperature down to +4°C within 12 hours to stop post-harvest metabolic heat.",
    icon: Thermometer,
  },
  {
    step: "04",
    title: "Stuffing into 40ft High Cube Reefer",
    location: "JNPT / Nhava Sheva CFS",
    desc: "Stuffing 1,160 mesh bags (29.0 MT) with Sensitech continuous temperature/humidity data loggers placed at container door.",
    icon: ShieldCheck,
  },
  {
    step: "05",
    title: "Ocean Transit & Reefer Monitoring",
    location: "Maersk / MSC / Hapag-Lloyd Vessel",
    desc: "Vessel power plugged-in 24/7; uninterrupted cold-chain with live automated PTI (Pre-Trip Inspection) log records.",
    icon: Ship,
  },
  {
    step: "06",
    title: "Port Discharge & Health Authority Clearance",
    location: "Jebel Ali / Dammam / Rotterdam",
    desc: "Direct reefer discharge, container PTI validation, port health inspection, and express customs release to buyer.",
    icon: Anchor,
  },
];

export function ReeferColdChainRadar() {
  const [activeCorridorId, setActiveCorridorId] = useState("uae");

  const currentCorridor = CORRIDORS.find((c) => c.id === activeCorridorId) || CORRIDORS[0];

  return (
    <section className="bg-[#091E16] py-20 text-[#FBFBFA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="border-b border-[#C59B27]/25 pb-8">
          <div className="inline-flex items-center gap-2 rounded border border-[#C59B27]/40 bg-[#05130E] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-[#E4BC4A]">
            <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            Interactive Logistics Visualizer
          </div>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#FBFBFA] sm:text-4xl lg:text-5xl">
            Reefer Cold-Chain &amp; Port Route Radar
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-[#FBFBFA]/75">
            Real-time port-to-port maritime parameters, refrigerated container telemetry, and
            unbroken cold chain protocol from Maharashtra packhouses to destination discharge docks.
          </p>

          {/* Interactive Corridor Toggles */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {CORRIDORS.map((corridor) => (
              <button
                key={corridor.id}
                type="button"
                onClick={() => setActiveCorridorId(corridor.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  activeCorridorId === corridor.id
                    ? "bg-[#C59B27] text-[#091E16] shadow-[0_4px_16px_rgba(197,155,39,0.35)]"
                    : "border border-white/15 bg-white/[0.05] text-[#FBFBFA]/80 hover:bg-white/10 hover:border-[#C59B27]"
                }`}
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>{corridor.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Corridor Telemetry Dashboard */}
        <div className="mt-8 rounded-2xl border border-[#C59B27]/30 bg-[#05130E] p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C59B27]/20 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#C59B27]">
                Selected Trade Lane:
              </span>
              <h3 className="mt-0.5 font-serif text-2xl font-bold text-[#FBFBFA]">
                {currentCorridor.name}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
                Transit: {currentCorridor.transitDays}
              </span>
              <span className="rounded bg-[#C59B27]/20 border border-[#C59B27]/40 px-3 py-1 font-mono text-xs font-bold text-[#E4BC4A]">
                {currentCorridor.sailingsPerWeek}
              </span>
            </div>
          </div>

          {/* Telemetry 4-Column Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="rounded-xl border border-white/10 bg-[#091E16] p-4">
              <div className="flex items-center gap-2 text-[#C59B27] text-[11px] uppercase">
                <Thermometer className="h-4 w-4" />
                Reefer Temperature
              </div>
              <div className="mt-2 text-base font-bold text-[#FBFBFA]">
                {currentCorridor.tempSetpoint}
              </div>
              <div className="mt-1 text-[10px] text-[#FBFBFA]/60">
                Continuous Sensitech Data Logger
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#091E16] p-4">
              <div className="flex items-center gap-2 text-[#C59B27] text-[11px] uppercase">
                <Activity className="h-4 w-4" />
                Humidity &amp; Airflow
              </div>
              <div className="mt-2 text-base font-bold text-[#FBFBFA]">
                {currentCorridor.humidityRH} • {currentCorridor.ventSetting}
              </div>
              <div className="mt-1 text-[10px] text-[#FBFBFA]/60">
                Prevents Bulb Softening &amp; Sprouting
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#091E16] p-4">
              <div className="flex items-center gap-2 text-[#C59B27] text-[11px] uppercase">
                <ShieldCheck className="h-4 w-4" />
                Fumigation Protocol
              </div>
              <div className="mt-2 text-sm font-bold text-[#FBFBFA]">
                {currentCorridor.fumigationProtocol}
              </div>
              <div className="mt-1 text-[10px] text-[#FBFBFA]/60">
                Plant Quarantine Department Of India
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#091E16] p-4">
              <div className="flex items-center gap-2 text-[#C59B27] text-[11px] uppercase">
                <Anchor className="h-4 w-4" />
                Customs Authority
              </div>
              <div className="mt-2 text-sm font-bold text-[#FBFBFA]">
                {currentCorridor.customsAuthority}
              </div>
              <div className="mt-1 text-[10px] text-[#FBFBFA]/60">
                {currentCorridor.dischargePort}
              </div>
            </div>
          </div>
        </div>

        {/* 6-Step Cold-Chain Physical Journey */}
        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between border-b border-[#C59B27]/15 pb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E4BC4A]">
              Physical Cold-Chain Sequence (Packhouse to Discharge Port)
            </span>
            <span className="text-[11px] font-mono text-[#FBFBFA]/60">
              Unbroken Cold Chain Guarantee
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {COLD_CHAIN_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-xl border border-white/10 bg-[#05130E] p-4 transition-all hover:border-[#C59B27]/60"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-[#C59B27]">{step.step}</span>
                    <div className="rounded-full bg-[#C59B27]/15 p-2 text-[#E4BC4A]">
                      <step.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h4 className="mt-3 font-serif text-sm font-bold text-[#FBFBFA] leading-snug">
                    {step.title}
                  </h4>
                  <div className="mt-1 font-mono text-[10px] text-[#C59B27] uppercase">
                    {step.location}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#FBFBFA]/65">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
