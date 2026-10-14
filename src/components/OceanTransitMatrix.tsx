import React, { useState, useMemo } from "react";
import {
  Ship,
  Clock,
  Anchor,
  ShieldAlert,
  ArrowRight,
  Search,
  Check,
  Copy,
  Calendar,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

export interface TradeRoute {
  id: string;
  region: "Middle East / GCC" | "Southeast Asia" | "Europe & UK";
  dischargePort: string;
  country: string;
  originPorts: string[];
  transitDays: string;
  sailingFrequency: string;
  carriers: string[];
  fumigationProtocol: string;
  customsWindow: string;
  primaryCargo: string;
}

export const TRADE_ROUTES: TradeRoute[] = [
  {
    id: "uae-jebel-ali",
    region: "Middle East / GCC",
    dischargePort: "Jebel Ali Port (AEJEA)",
    country: "United Arab Emirates",
    originPorts: ["JNPT / Nhava Sheva", "Mundra Port"],
    transitDays: "3 – 4 Days (Direct)",
    sailingFrequency: "Daily / 6 Sailings per Week",
    carriers: ["Maersk", "MSC", "CMA CGM", "Hapag-Lloyd"],
    fumigationProtocol: "Phytosanitary mandatory; MBr fumigation optional based on cargo",
    customsWindow: "24 Hours Priority Green Channel",
    primaryCargo: "Fresh Nashik Onions, Green Chillies, Basmati Rice, Coconuts",
  },
  {
    id: "uae-sharjah",
    region: "Middle East / GCC",
    dischargePort: "Port Khalid / Hamriyah (AESHJ)",
    country: "United Arab Emirates",
    originPorts: ["JNPT / Nhava Sheva", "Mundra Port"],
    transitDays: "4 Days (Direct)",
    sailingFrequency: "3 Sailings per Week",
    carriers: ["MSC", "Feeder Lines", "Unifeeder"],
    fumigationProtocol: "Standard Phyto & Health Inspection Certificate",
    customsWindow: "24 – 36 Hours",
    primaryCargo: "Fresh Produce, Onions, Spices & Dry Groceries",
  },
  {
    id: "uae-abu-dhabi",
    region: "Middle East / GCC",
    dischargePort: "Khalifa Port (AEKHL)",
    country: "United Arab Emirates",
    originPorts: ["JNPT / Nhava Sheva", "Mundra Port"],
    transitDays: "4 Days (Direct)",
    sailingFrequency: "4 Sailings per Week",
    carriers: ["CMA CGM", "MSC", "Maersk"],
    fumigationProtocol: "MoCCAE UAE Phytosanitary Compliant",
    customsWindow: "24 Hours Clearance",
    primaryCargo: "Reefer Fruits & Vegetables, Rice, Pulses",
  },
  {
    id: "saudi-dammam",
    region: "Middle East / GCC",
    dischargePort: "King Abdulaziz Port Dammam (SADMM)",
    country: "Saudi Arabia (Eastern Province)",
    originPorts: ["JNPT / Nhava Sheva", "Mundra Port"],
    transitDays: "5 – 6 Days (Direct)",
    sailingFrequency: "4 Sailings per Week",
    carriers: ["Maersk", "Hapag-Lloyd", "MSC"],
    fumigationProtocol: "SFDA Compliant, Methyl Bromide (MBr) / Al. Phosphide",
    customsWindow: "48 Hours FASAH / ZATCA Pre-clearance",
    primaryCargo: "Nashik Red Onions, 1121 Sella Rice, Spices, Dry Groceries",
  },
  {
    id: "saudi-jeddah",
    region: "Middle East / GCC",
    dischargePort: "Jeddah Islamic Port (SAJED)",
    country: "Saudi Arabia (Western Province)",
    originPorts: ["JNPT / Nhava Sheva", "Mundra Port"],
    transitDays: "7 – 8 Days (Direct Red Sea)",
    sailingFrequency: "3 Sailings per Week",
    carriers: ["MSC", "Maersk", "CMA CGM"],
    fumigationProtocol: "SFDA Halal & Phytosanitary Standard Inspection",
    customsWindow: "48 – 72 Hours ZATCA Clearance",
    primaryCargo: "Long Grain Basmati, Red Onions, Garlic, Pulses",
  },
  {
    id: "qatar-hamad",
    region: "Middle East / GCC",
    dischargePort: "Hamad Port Umm Al Houl (QAHMD)",
    country: "Qatar",
    originPorts: ["JNPT / Nhava Sheva", "Mundra Port"],
    transitDays: "4 – 5 Days (Direct)",
    sailingFrequency: "3 Sailings per Week",
    carriers: ["Milaha", "Maersk", "MSC"],
    fumigationProtocol: "MOPH Qatar Food Safety Verified & Phyto",
    customsWindow: "24 – 48 Hours Al Nadeeb System",
    primaryCargo: "Fresh Vegetables, Onions, Basmati Rice, Coconuts",
  },
  {
    id: "kuwait-shuwaikh",
    region: "Middle East / GCC",
    dischargePort: "Shuwaikh / Shuaiba Port (KWSWK)",
    country: "Kuwait",
    originPorts: ["JNPT / Nhava Sheva", "Mundra Port"],
    transitDays: "5 – 6 Days (Direct)",
    sailingFrequency: "3 Sailings per Week",
    carriers: ["Hapag-Lloyd", "MSC", "Maersk"],
    fumigationProtocol: "PAAF Kuwait Phytosanitary & COO Attested",
    customsWindow: "36 – 48 Hours",
    primaryCargo: "Nashik Onions, G4 Chillies, Basmati Rice",
  },
  {
    id: "oman-sohar",
    region: "Middle East / GCC",
    dischargePort: "Sohar Port & Freezone (OMSOH)",
    country: "Oman",
    originPorts: ["JNPT / Nhava Sheva", "Mundra Port"],
    transitDays: "3 – 4 Days (Direct)",
    sailingFrequency: "4 Sailings per Week",
    carriers: ["Oman Fast", "MSC", "Maersk"],
    fumigationProtocol: "MAFWR Oman Phytosanitary Certificate",
    customsWindow: "24 Hours Bayan Customs",
    primaryCargo: "Fresh Vegetables, Onions, Spices, Grains",
  },
  {
    id: "bahrain-kbs",
    region: "Middle East / GCC",
    dischargePort: "Khalifa Bin Salman Port (BHKBS)",
    country: "Bahrain",
    originPorts: ["JNPT / Nhava Sheva", "Mundra Port"],
    transitDays: "5 Days (Direct)",
    sailingFrequency: "3 Sailings per Week",
    carriers: ["APM Terminals", "Maersk", "MSC"],
    fumigationProtocol: "National Food Safety Regulatory Compliance",
    customsWindow: "24 – 36 Hours",
    primaryCargo: "Onions, Chillies, Rice, Whole Spices",
  },
  {
    id: "singapore-jurong",
    region: "Southeast Asia",
    dischargePort: "Singapore Port PSA / Jurong (SGSIN)",
    country: "Singapore",
    originPorts: ["Chennai Port", "JNPT / Nhava Sheva", "Kolkata"],
    transitDays: "7 – 9 Days (Direct)",
    sailingFrequency: "6 Sailings per Week (High Density)",
    carriers: ["ONE", "Maersk", "Evergreen", "OOCL"],
    fumigationProtocol: "Singapore Food Agency (SFA) Import Protocols",
    customsWindow: "12 – 24 Hours TradeNet Rapid Clear",
    primaryCargo: "Fresh Coconuts, Red Onions, G4 Chillies, Basmati Rice",
  },
  {
    id: "malaysia-klang",
    region: "Southeast Asia",
    dischargePort: "Port Klang Westports / Northport (MYPKG)",
    country: "Malaysia",
    originPorts: ["Chennai Port", "JNPT / Nhava Sheva"],
    transitDays: "8 – 10 Days (Direct)",
    sailingFrequency: "5 Sailings per Week",
    carriers: ["Maersk", "CMA CGM", "ONE"],
    fumigationProtocol: "MAQIS (Malaysian Quarantine & Inspection) Compliant",
    customsWindow: "24 – 48 Hours",
    primaryCargo: "Nashik Small/Medium Onions, Husked Coconuts, Pulses",
  },
  {
    id: "bangladesh-chittagong",
    region: "Southeast Asia",
    dischargePort: "Chittagong Port (BDCGP)",
    country: "Bangladesh",
    originPorts: ["Chennai Port", "Kolkata Port", "JNPT"],
    transitDays: "4 – 5 Days (East Coast) / 7 Days (West Coast)",
    sailingFrequency: "4 Sailings per Week",
    carriers: ["Feeder Lines", "MSC", "Maersk"],
    fumigationProtocol: "Department of Agricultural Extension Phyto",
    customsWindow: "48 – 72 Hours NBR Clearance",
    primaryCargo: "Fresh Red Onions, Rice, Spices, Pulses",
  },
  {
    id: "uk-felixstowe",
    region: "Europe & UK",
    dischargePort: "Port of Felixstowe / London Gateway (GBFXT)",
    country: "United Kingdom",
    originPorts: ["JNPT / Nhava Sheva", "Mundra Port"],
    transitDays: "21 – 24 Days (Via Suez / Cape of Good Hope)",
    sailingFrequency: "2 Sailings per Week (Direct Feeder / Mother)",
    carriers: ["MSC", "Maersk", "CMA CGM"],
    fumigationProtocol: "DEFRA UK Plant Health Import Declaration & Phyto",
    customsWindow: "48 Hours CHIEF / CDS Customs Entry",
    primaryCargo: "Garwa Rabi Onions (5-month shelf life), 1121 Basmati Rice",
  },
  {
    id: "europe-rotterdam",
    region: "Europe & UK",
    dischargePort: "Port of Rotterdam / Antwerp (NLRTM / BEANR)",
    country: "Netherlands & Belgium (EU Gateway)",
    originPorts: ["JNPT / Nhava Sheva", "Mundra Port"],
    transitDays: "22 – 25 Days",
    sailingFrequency: "3 Sailings per Week",
    carriers: ["CMA CGM", "MSC", "Hapag-Lloyd"],
    fumigationProtocol: "EU TRACES NT Phytosanitary Certificate, MRL tested",
    customsWindow: "24 – 48 Hours Portbase Pre-Arrival Entry",
    primaryCargo: "Nashik Rabi Onions, Basmati Rice, Cumin, Turmeric",
  },
];

const REGION_TABS = ["All Regions", "Middle East / GCC", "Southeast Asia", "Europe & UK"] as const;

export function OceanTransitMatrix() {
  const [activeRegion, setActiveRegion] = useState<string>("All Regions");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [originFilter, setOriginFilter] = useState<string>("All Origins");

  const filteredRoutes = useMemo(() => {
    return TRADE_ROUTES.filter((r) => {
      const matchRegion = activeRegion === "All Regions" || r.region === activeRegion;
      const matchOrigin =
        originFilter === "All Origins" ||
        r.originPorts.some((p) => p.toLowerCase().includes(originFilter.toLowerCase()));
      const matchSearch =
        r.dischargePort.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.carriers.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        r.primaryCargo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchOrigin && matchSearch;
    });
  }, [activeRegion, originFilter, searchQuery]);

  const handleCopyLane = (route: TradeRoute) => {
    const text = `Sheshaan Global Sea Freight Lane: ${route.dischargePort} (${route.country}) | Origin: ${route.originPorts.join(", ")} | Transit: ${route.transitDays} | Frequency: ${route.sailingFrequency} | Carriers: ${route.carriers.join(", ")} | Fumigation: ${route.fumigationProtocol}`;
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${route.country} shipping lane to clipboard!`);
  };

  const getWhatsAppRouteUrl = (route: TradeRoute) => {
    const text = `Hello Sheshaan Global Export Team,\n\nI am inquiring about freight schedules & pricing for:\n• Corridor: India to ${route.dischargePort} (${route.country})\n• Origin Port: ${route.originPorts[0]}\n• Target Commodity: ${route.primaryCargo.split(",")[0]}\n• Vessel Transit: ${route.transitDays}\n\nPlease share current ocean freight rates and next sailing booking windows.`;
    return `https://wa.me/918149909546?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="inline-block rounded-full bg-[#0057B8]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0057B8]">
            Ocean Freight &amp; Port Logistics
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Port-to-Port Ocean Transit &amp; Route Matrix
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Real-world sailing times, weekly vessel frequencies, carrier allocations, and statutory fumigation
            protocols from India's premier container ports.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700">
          <Anchor className="h-4 w-4 text-[#0057B8]" />
          <span>JNPT (Nhava Sheva) • Mundra • Chennai Gateways</span>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Region tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1">
          {REGION_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveRegion(tab)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                activeRegion === tab
                  ? "bg-[#0057B8] text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Origin Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search port, country or cargo..."
              className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-[#0057B8] focus:bg-white focus:outline-none"
            />
          </div>

          <select
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-[#0057B8] focus:bg-white focus:outline-none"
          >
            <option value="All Origins">All Loading Ports</option>
            <option value="JNPT">JNPT / Nhava Sheva</option>
            <option value="Mundra">Mundra Port</option>
            <option value="Chennai">Chennai Port</option>
          </select>
        </div>
      </div>

      {/* Corridor Cards Grid */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filteredRoutes.map((route) => (
          <div
            key={route.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-[#0057B8]/40 hover:bg-white hover:shadow-md"
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="rounded-md bg-slate-200/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                    {route.region}
                  </span>
                  <h4 className="mt-1.5 font-display text-base font-bold text-slate-900 group-hover:text-[#0057B8] transition">
                    {route.dischargePort}
                  </h4>
                  <div className="text-xs font-semibold text-slate-500">{route.country}</div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-800 shadow-xs">
                    <Clock className="h-3 w-3" />
                    {route.transitDays}
                  </span>
                  <span className="mt-1 text-[10px] text-slate-500">{route.sailingFrequency}</span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mt-4 space-y-2 border-t border-slate-200/80 pt-3 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Origin Gateway:</span>
                  <span className="font-semibold text-slate-800">{route.originPorts.join(" / ")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tier-1 Shipping Lines:</span>
                  <span className="font-medium text-slate-800">{route.carriers.join(", ")}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 shrink-0">Fumigation / Phyto:</span>
                  <span className="text-right text-[11px] font-medium text-amber-800">
                    {route.fumigationProtocol}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Customs Clearance:</span>
                  <span className="font-semibold text-emerald-700">{route.customsWindow}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 shrink-0">Primary Commodities:</span>
                  <span className="text-right text-[11px] font-medium text-slate-700">
                    {route.primaryCargo}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-200/80 pt-3">
              <button
                onClick={() => handleCopyLane(route)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 transition hover:text-[#0057B8]"
              >
                <Copy className="h-3 w-3" /> Copy Lane Details
              </button>

              <a
                href={getWhatsAppRouteUrl(route)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-xl bg-[#0057B8] px-3.5 py-1.5 text-xs font-bold text-white shadow transition hover:bg-[#004494]"
              >
                Inquire Freight <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <p className="text-sm font-semibold text-slate-600">No export lanes matched your query.</p>
          <button
            onClick={() => {
              setActiveRegion("All Regions");
              setOriginFilter("All Origins");
              setSearchQuery("");
            }}
            className="mt-3 rounded-xl bg-[#0057B8] px-4 py-2 text-xs font-bold text-white"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
