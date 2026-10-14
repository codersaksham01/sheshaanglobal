import { useState } from "react";
import {
  Ship,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  Thermometer,
  Anchor,
  FileCheck,
} from "lucide-react";
import farmExport from "@/assets/farm-export.jpg";
import heroCargo from "@/assets/hero-cargo.jpg";
import { RfqModal } from "@/components/RfqModal";

const COMMODITIES = [
  { name: "Nashik Garwa Red Onions (55-65mm)", hs: "07031010", port: "JNPT" },
  { name: "G4 & Teja Fresh Green Chillies", hs: "07096010", port: "JNPT / Air Cargo" },
  { name: "1121 Basmati Rice (Aged Parboiled)", hs: "10063020", port: "Mundra / JNPT" },
  { name: "Pollachi Semi-Husked Coconuts", hs: "08011200", port: "Tuticorin / Cochin" },
  { name: "Unjha Cumin Seeds (Machine Clean 99%)", hs: "09093129", port: "Mundra" },
  { name: "Sortex Kabuli Chickpeas (75-80 count)", hs: "07132000", port: "JNPT" },
];

const PORTS = [
  "Jebel Ali Port, Dubai (UAE) — 3.5 Days",
  "Dammam Port / King Abdulaziz (Saudi Arabia) — 6 Days",
  "Jeddah Islamic Port (Saudi Arabia) — 8 Days",
  "Port of Felixstowe / London Gateway (UK) — 20 Days",
  "Port of Rotterdam (Netherlands / EU) — 22 Days",
  "Singapore Jurong Port (Singapore) — 7 Days",
  "Port Klang (Malaysia) — 6 Days",
  "Hamad Port (Qatar) — 4 Days",
  "Shuwaikh Port (Kuwait) — 5 Days",
  "Sohar Port / Muscat (Oman) — 3 Days",
];

export function HeroSection() {
  const [selectedCommodity, setSelectedCommodity] = useState(COMMODITIES[0].name);
  const [selectedPort, setSelectedPort] = useState(PORTS[0]);
  const [selectedIncoterm, setSelectedIncoterm] = useState<"FOB" | "CIF" | "CFR">("CIF");

  const activeCommodityObj = COMMODITIES.find((c) => c.name === selectedCommodity) || COMMODITIES[0];

  const handleQuickQuote = () => {
    const text = [
      "Hello Sheshaan Global Commercial Desk,",
      `I am requesting an Instant Indicative Freight & FOB/CIF Quote via your portal:`,
      `• Commodity: ${selectedCommodity} (HS Code: ${activeCommodityObj.hs})`,
      `• Destination Port: ${selectedPort}`,
      `• Incoterm: ${selectedIncoterm}`,
      `• Loading Port: ${activeCommodityObj.port} (India)`,
      "",
      "Please provide current spot rate, container stuffing schedule, and phytosanitary protocol.",
    ].join("\n");

    window.open(`https://wa.me/918149909546?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="relative overflow-hidden bg-[#05130E] text-[#FBFBFA]">
      {/* Background scrim & tactile origin photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCargo}
          alt="Authentic Nashik onion sorting lines and reefer container vessel loading"
          className="h-full w-full object-cover object-center opacity-25"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05130E] via-[#05130E]/95 to-[#091E16]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,155,39,0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:pt-16 lg:pb-24">
        {/* Top Institutional Badge */}
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-md border border-[#C59B27]/30 bg-[#091E16]/80 px-3.5 py-1.5 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-[#C59B27]" />
          <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#E4BC4A]">
            Govt of India Accredited Export Enterprise • APEDA &amp; IEC Verified
          </span>
        </div>

        {/* Split-Screen Architectural Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Authoritative Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#FBFBFA] sm:text-5xl lg:text-6xl leading-[1.12]">
              Direct-from-Origin <br />
              <span className="bg-gradient-to-r from-[#E4BC4A] via-[#C59B27] to-[#A67C1E] bg-clip-text text-transparent">
                Agricultural Commodities
              </span>{" "}
              <br />
              Shipped to 25+ Global Ports.
            </h1>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#FBFBFA]/85">
              Operating directly from Maharashtra&apos;s agricultural heartland, Sheshaan Global provides
              institutional procurement directors and international commodity importers with verified
              bulk FCL shipments of <strong>Nashik Red Onions (HS 07031010)</strong>,{" "}
              <strong>1121 Basmati Rice</strong>, <strong>G4 Green Chillies</strong>, and whole spices.
              Precision cold-chain management from farm gates to Nhava Sheva (JNPT) and Mundra.
            </p>

            {/* Micro Trust Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="rounded-lg border border-[#C59B27]/20 bg-[#091E16]/60 p-3">
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#E4BC4A]">3.5 Days</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#FBFBFA]/65">
                  JNPT to Jebel Ali Express
                </div>
              </div>
              <div className="rounded-lg border border-[#C59B27]/20 bg-[#091E16]/60 p-3">
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#E4BC4A]">29.0 MT</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#FBFBFA]/65">
                  Payload / 40ft Reefer FCL
                </div>
              </div>
              <div className="rounded-lg border border-[#C59B27]/20 bg-[#091E16]/60 p-3">
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#E4BC4A]">100%</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#FBFBFA]/65">
                  Phytosanitary Protocol
                </div>
              </div>
              <div className="rounded-lg border border-[#C59B27]/20 bg-[#091E16]/60 p-3">
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#E4BC4A]">49 Lines</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#FBFBFA]/65">
                  Active HS Code Directory
                </div>
              </div>
            </div>

            {/* Direct Action Triggers */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <RfqModal
                defaultCommodityName="Fresh Red Onion (Nashik)"
                defaultHsCode="07031010"
                triggerLabel="Initiate Formal Trade RFQ"
                triggerClassName="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#C59B27] via-[#D8AD32] to-[#A67C1E] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#091E16] shadow-[0_6px_24px_rgba(197,155,39,0.35)] transition-all hover:brightness-110 hover:-translate-y-0.5"
              />

              <a
                href="#spec-dossiers"
                className="inline-flex items-center gap-2 rounded-lg border border-[#C59B27]/40 bg-white/[0.05] px-5 py-3.5 text-xs font-mono font-medium text-[#FBFBFA] transition hover:bg-[#C59B27]/15 hover:border-[#C59B27]"
              >
                <span>Inspect Technical Dossiers</span>
                <ArrowRight className="h-4 w-4 text-[#C59B27]" />
              </a>

              <a
                href="#b2b-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E4BC4A] underline underline-offset-4 hover:text-white transition-colors"
              >
                <span>Container Stuffing Calculator ↓</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Live Export Terminal Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#C59B27]/35 bg-[#091E16]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-[#C59B27]/20 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E4BC4A]">
                    Live Export Terminal Card
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#FBFBFA]/60">
                  SYSTEM TIME: 2026-10-14
                </span>
              </div>

              {/* Technical Metrics List */}
              <div className="mt-5 space-y-3.5 font-mono text-xs">
                {/* Metric 1 */}
                <div className="rounded-lg border border-white/[0.08] bg-[#05130E] p-3">
                  <div className="flex items-center justify-between text-[#FBFBFA]/60 text-[10px] uppercase">
                    <span className="flex items-center gap-1.5">
                      <Ship className="h-3.5 w-3.5 text-[#C59B27]" />
                      Weekly FCL Sailings
                    </span>
                    <span className="text-emerald-400 font-bold">ACTIVE</span>
                  </div>
                  <div className="mt-1 text-sm font-bold text-[#FBFBFA]">
                    Nhava Sheva (JNPT) → Jebel Ali Port (Dubai)
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#C59B27]">
                    Transit: 3.5 Days Direct Express Sailing
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="rounded-lg border border-white/[0.08] bg-[#05130E] p-3">
                  <div className="flex items-center justify-between text-[#FBFBFA]/60 text-[10px] uppercase">
                    <span className="flex items-center gap-1.5">
                      <Thermometer className="h-3.5 w-3.5 text-[#C59B27]" />
                      Reefer Container Cold Chain
                    </span>
                    <span className="text-[#E4BC4A] font-bold">DAIKIN / SENSITECH</span>
                  </div>
                  <div className="mt-1 text-sm font-bold text-[#FBFBFA]">
                    Set Point: +2.0°C to +4.0°C (RH 85-90%)
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#FBFBFA]/75">
                    Continuous In-Transit Digital Temperature &amp; Humidity Logging
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="rounded-lg border border-white/[0.08] bg-[#05130E] p-3">
                  <div className="flex items-center justify-between text-[#FBFBFA]/60 text-[10px] uppercase">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#C59B27]" />
                      Statutory Clearance
                    </span>
                    <span className="text-emerald-400 font-bold">100% VERIFIED</span>
                  </div>
                  <div className="mt-1 text-sm font-bold text-[#FBFBFA]">
                    APEDA Verified • IEC Active • FSSAI License
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#FBFBFA]/75">
                    Phytosanitary Certificate + Methyl Bromide Fumigation
                  </div>
                </div>

                {/* Active Commodity Focus */}
                <div className="rounded-lg border border-[#C59B27]/30 bg-[#C59B27]/10 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#E4BC4A] font-bold">
                    Current Origin Dispatch Focus
                  </div>
                  <div className="mt-1 font-serif text-sm font-bold text-[#FBFBFA]">
                    Nashik Garwa Red Onions (55-65mm) &amp; 1121 Basmati
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#FBFBFA]/75">
                    Lasalgaon &amp; Pimpalgaon Mandi direct procurement
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3.2 Quick-Action RFQ Bar */}
        <div className="mt-12 rounded-2xl border border-[#C59B27]/30 bg-[#091E16] p-4 sm:p-5 shadow-2xl">
          <div className="mb-3 flex items-center justify-between border-b border-[#C59B27]/15 pb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E4BC4A]">
              Quick-Action Freight &amp; Procurement Selector
            </span>
            <span className="text-[11px] font-mono text-[#FBFBFA]/60">
              Immediate FOB / CIF Indicative Quotation
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-center">
            {/* Commodity select */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#C59B27]">
                1. Select Commodity
              </label>
              <select
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-[#05130E] px-3 py-2.5 text-xs font-medium text-[#FBFBFA] focus:border-[#C59B27] focus:outline-none"
              >
                {COMMODITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.hs})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Port select */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#C59B27]">
                2. Destination Discharge Port
              </label>
              <select
                value={selectedPort}
                onChange={(e) => setSelectedPort(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-[#05130E] px-3 py-2.5 text-xs font-medium text-[#FBFBFA] focus:border-[#C59B27] focus:outline-none"
              >
                {PORTS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Incoterm select */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#C59B27]">
                3. Preferred Incoterm
              </label>
              <div className="mt-1 grid grid-cols-3 gap-1 rounded-lg border border-white/15 bg-[#05130E] p-1 text-xs font-mono text-center">
                {(["CIF", "FOB", "CFR"] as const).map((inc) => (
                  <button
                    key={inc}
                    type="button"
                    onClick={() => setSelectedIncoterm(inc)}
                    className={`rounded py-1.5 font-bold transition-colors ${
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

            {/* CTA button */}
            <div className="pt-3 sm:pt-4">
              <button
                type="button"
                onClick={handleQuickQuote}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#C59B27] to-[#A67C1E] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#091E16] shadow-lg transition-transform hover:scale-[1.02] active:scale-100"
              >
                <span>Get Instant Freight &amp; FOB Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
