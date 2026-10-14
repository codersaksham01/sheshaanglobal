import React, { useState } from "react";
import {
  Calendar,
  Sprout,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingUp,
  Info,
  ArrowRight,
} from "lucide-react";

export interface CropSeason {
  id: string;
  name: string;
  variety: string;
  category: string;
  hsCode: string;
  growingBelts: string;
  months: {
    month: string;
    status: "peak" | "moderate" | "off";
    label: string;
  }[];
  peakWindow: string;
  moistureContent: string;
  storageLife: string;
  characteristics: string;
  bestDestinationLanes: string;
}

export const CROP_SEASONS: CropSeason[] = [
  {
    id: "nashik-garwa-onion",
    name: "Nashik Garwa Onion (Rabi Crop)",
    variety: "Garwa / N-53 Late Basalt Dark Red",
    category: "Fresh Vegetables",
    hsCode: "07031010",
    growingBelts: "Lasalgaon, Pimpalgaon, Yeola, Sinnar, Kalwan (Nashik District, Maharashtra)",
    peakWindow: "March to June (New Harvest) • July to October (Temperature-regulated Stored Stocks)",
    moistureContent: "Low Moisture (12.0% – 14.5% Total Soluble Solids Brix)",
    storageLife: "5 to 6 Months Natural Storage Life with 3–4 papery dry outer protective layers",
    characteristics: "High pyruvic acid pungency (10–14 µmol/g), firm globose shape, unmatched durability during extended sea voyages.",
    bestDestinationLanes: "Europe (Rotterdam, UK), Far East (Singapore, Malaysia), Middle East (GCC ports)",
    months: [
      { month: "Jan", status: "off", label: "Late stocks" },
      { month: "Feb", status: "moderate", label: "Early harvest" },
      { month: "Mar", status: "peak", label: "Peak Rabi harvest" },
      { month: "Apr", status: "peak", label: "Peak Rabi harvest" },
      { month: "May", status: "peak", label: "Peak arrivals" },
      { month: "Jun", status: "peak", label: "Storage loading" },
      { month: "Jul", status: "moderate", label: "Cured storage stock" },
      { month: "Aug", status: "moderate", label: "Cured storage stock" },
      { month: "Sep", status: "moderate", label: "Cured storage stock" },
      { month: "Oct", status: "moderate", label: "Cured storage stock" },
      { month: "Nov", status: "off", label: "Transit to Kharif" },
      { month: "Dec", status: "off", label: "Off-season" },
    ],
  },
  {
    id: "nashik-pol-onion",
    name: "Nashik Pol / Kharif Red Onion",
    variety: "Pol / Agrifound Dark Red",
    category: "Fresh Vegetables",
    hsCode: "07031010",
    growingBelts: "Lasalgaon, Dindori, Malegaon, Ahmednagar belts",
    peakWindow: "October to December (Monsoon Harvest)",
    moistureContent: "High Natural Moisture (84% – 86% water content), bright ruby sheen",
    storageLife: "15 to 25 Days Active Life • Immediate Export Required in Reefer Containers",
    characteristics: "Brilliant purplish-red color, crisp juicy rings, sweet-pungent aroma. Preferred for rapid table consumption.",
    bestDestinationLanes: "Short-sea GCC corridors: UAE (Jebel Ali 3 days), Oman (3 days), Qatar (4 days)",
    months: [
      { month: "Jan", status: "off", label: "Season concludes" },
      { month: "Feb", status: "off", label: "Off-season" },
      { month: "Mar", status: "off", label: "Off-season" },
      { month: "Apr", status: "off", label: "Off-season" },
      { month: "May", status: "off", label: "Off-season" },
      { month: "Jun", status: "off", label: "Nursery sowing" },
      { month: "Jul", status: "off", label: "Transplanting" },
      { month: "Aug", status: "off", label: "Vegetative stage" },
      { month: "Sep", status: "moderate", label: "Early arrivals" },
      { month: "Oct", status: "peak", label: "Peak Kharif harvest" },
      { month: "Nov", status: "peak", label: "Peak mandi volumes" },
      { month: "Dec", status: "peak", label: "Active export window" },
    ],
  },
  {
    id: "nashik-rangda-onion",
    name: "Nashik Rangda (Late Kharif) Onion",
    variety: "Rangda / Baswant-780",
    category: "Fresh Vegetables",
    hsCode: "07031010",
    growingBelts: "Nashik, Dhule, Jalgaon agricultural belts",
    peakWindow: "January to February",
    moistureContent: "Moderate Moisture (11% – 12.5% TSS Brix)",
    storageLife: "30 to 45 Days Storage Capability",
    characteristics: "Bridge crop connecting Kharif and Rabi cycles. Deep burgundy hue, intermediate firmness.",
    bestDestinationLanes: "Middle East (Saudi Arabia, UAE, Kuwait), Southeast Asia (Malaysia, Sri Lanka)",
    months: [
      { month: "Jan", status: "peak", label: "Peak harvest" },
      { month: "Feb", status: "peak", label: "Peak harvest" },
      { month: "Mar", status: "moderate", label: "Transit to Rabi" },
      { month: "Apr", status: "off", label: "Off-season" },
      { month: "May", status: "off", label: "Off-season" },
      { month: "Jun", status: "off", label: "Off-season" },
      { month: "Jul", status: "off", label: "Off-season" },
      { month: "Aug", status: "off", label: "Nursery phase" },
      { month: "Sep", status: "off", label: "Field growth" },
      { month: "Oct", status: "off", label: "Bulb development" },
      { month: "Nov", status: "off", label: "Maturity" },
      { month: "Dec", status: "moderate", label: "Early harvest" },
    ],
  },
  {
    id: "green-chillies",
    name: "Fresh Green Chillies (G4 & Teja)",
    variety: "G-4, Teja-4, Wonder Hot, Bullet Chillies",
    category: "Fresh Vegetables",
    hsCode: "07096010",
    growingBelts: "Guntur (Andhra Pradesh), Nashik (Maharashtra), Anand (Gujarat)",
    peakWindow: "August to March (Continuous Flushes)",
    moistureContent: "Fresh turgid pods (80% moisture), crisp calyx/stem",
    storageLife: "18 to 21 Days under +8°C to +10°C cold chain reefer transit",
    characteristics: "Length 7cm to 12cm, uniform bright emerald color, 50,000 to 75,000 SHU Scoville heat rating.",
    bestDestinationLanes: "UAE, Saudi Arabia, Qatar, Kuwait, Oman, UK air/sea",
    months: [
      { month: "Jan", status: "peak", label: "High winter harvest" },
      { month: "Feb", status: "peak", label: "High volume" },
      { month: "Mar", status: "peak", label: "High volume" },
      { month: "Apr", status: "moderate", label: "Summer crop" },
      { month: "May", status: "moderate", label: "Summer crop" },
      { month: "Jun", status: "off", label: "Monsoon plantation" },
      { month: "Jul", status: "moderate", label: "First flushes" },
      { month: "Aug", status: "peak", label: "Peak harvest" },
      { month: "Sep", status: "peak", label: "Peak harvest" },
      { month: "Oct", status: "peak", label: "Peak harvest" },
      { month: "Nov", status: "peak", label: "Peak export window" },
      { month: "Dec", status: "peak", label: "Peak export window" },
    ],
  },
  {
    id: "basmati-rice",
    name: "Indian Basmati Rice (1121 & 1509 XXL)",
    variety: "1121 Extra Long Grain, 1509 Golden Sella, Pusa Steam",
    category: "Grains & Cereals",
    hsCode: "10063020",
    growingBelts: "Taraori, Karnal (Haryana), Amritsar (Punjab), Western Uttar Pradesh",
    peakWindow: "October to January (Paddy Harvest) • Year-round Aged Rice Milling",
    moistureContent: "Max 12.0% Moisture (Safe Long-term Silo Storage)",
    storageLife: "24 to 36 Months naturally aged in controlled silos",
    characteristics: "Raw grain length 8.35mm–8.40mm, elongates up to 22mm upon cooking with 2-AP aroma signature.",
    bestDestinationLanes: "Global: Saudi Arabia (ZATCA), UAE, Iraq, Iran, UK, USA, EU TRACES",
    months: [
      { month: "Jan", status: "peak", label: "New crop milling" },
      { month: "Feb", status: "moderate", label: "Aged stock milling" },
      { month: "Mar", status: "moderate", label: "Year-round supply" },
      { month: "Apr", status: "moderate", label: "Year-round supply" },
      { month: "May", status: "moderate", label: "Year-round supply" },
      { month: "Jun", status: "moderate", label: "Paddy sowing" },
      { month: "Jul", status: "moderate", label: "Transplanting" },
      { month: "Aug", status: "moderate", label: "Tillering stage" },
      { month: "Sep", status: "moderate", label: "Grain maturity" },
      { month: "Oct", status: "peak", label: "New crop arrivals" },
      { month: "Nov", status: "peak", label: "Peak mandi arrivals" },
      { month: "Dec", status: "peak", label: "Peak processing" },
    ],
  },
  {
    id: "husked-coconut",
    name: "Semi-Husked Brown Coconuts",
    variety: "Pollachi Tall, West Coast Tall",
    category: "Fresh Produce",
    hsCode: "08011910",
    growingBelts: "Pollachi, Coimbatore (Tamil Nadu), Kozhikode (Kerala), Tumkur (Karnataka)",
    peakWindow: "Year-Round Supply (Peak Yield: March to July)",
    moistureContent: "High Water Content (minimum 150ml to 250ml sweet coconut water per nut)",
    storageLife: "45 to 60 Days under ventilated reefer transit (+10°C to +12°C)",
    characteristics: "Weight 550g to 700g per nut, thick brown fibrous shell, crack-free, fresh white endosperm meat.",
    bestDestinationLanes: "Middle East (UAE, Saudi, Oman), Singapore, Malaysia, UK",
    months: [
      { month: "Jan", status: "moderate", label: "Steady supply" },
      { month: "Feb", status: "moderate", label: "Steady supply" },
      { month: "Mar", status: "peak", label: "High yield" },
      { month: "Apr", status: "peak", label: "High yield" },
      { month: "May", status: "peak", label: "High yield" },
      { month: "Jun", status: "peak", label: "Peak season" },
      { month: "Jul", status: "peak", label: "Peak season" },
      { month: "Aug", status: "moderate", label: "Steady supply" },
      { month: "Sep", status: "moderate", label: "Steady supply" },
      { month: "Oct", status: "moderate", label: "Steady supply" },
      { month: "Nov", status: "moderate", label: "Steady supply" },
      { month: "Dec", status: "moderate", label: "Steady supply" },
    ],
  },
  {
    id: "whole-spices",
    name: "Whole Spices (Cumin & Coriander)",
    variety: "Cumin Seeds (Gujarat Machine Cleaned), Coriander Eagle/Scooter",
    category: "Spices & Condiments",
    hsCode: "09093129",
    growingBelts: "Unjha, Rajkot (Gujarat), Kota, Ramganj Mandi (Rajasthan)",
    peakWindow: "February to April (New Crop Arrivals)",
    moistureContent: "Max 8.0% – 9.0% Moisture (Dry Storage)",
    storageLife: "18 to 24 Months in hermetically sealed multi-wall bags",
    characteristics: "Purity 99.0% to 99.5%, high volatile essential oil content (2.8% to 3.5%), intense aromatic bouquet.",
    bestDestinationLanes: "USA, UK, Europe, UAE, Egypt, Vietnam, China",
    months: [
      { month: "Jan", status: "moderate", label: "Crop maturing" },
      { month: "Feb", status: "peak", label: "Early arrivals" },
      { month: "Mar", status: "peak", label: "Peak Unjha arrivals" },
      { month: "Apr", status: "peak", label: "Peak processing" },
      { month: "May", status: "moderate", label: "Warehouse stock" },
      { month: "Jun", status: "moderate", label: "Warehouse stock" },
      { month: "Jul", status: "moderate", label: "Warehouse stock" },
      { month: "Aug", status: "moderate", label: "Warehouse stock" },
      { month: "Sep", status: "moderate", label: "Warehouse stock" },
      { month: "Oct", status: "moderate", label: "Warehouse stock" },
      { month: "Nov", status: "moderate", label: "Warehouse stock" },
      { month: "Dec", status: "moderate", label: "Warehouse stock" },
    ],
  },
];

export function SeasonalCropRadar() {
  const [selectedCropId, setSelectedCropId] = useState<string>("nashik-garwa-onion");
  const activeCrop = CROP_SEASONS.find((c) => c.id === selectedCropId) ?? CROP_SEASONS[0];

  const getWhatsAppCropUrl = (crop: CropSeason) => {
    const text = `Hello Sheshaan Global Mandi Procurement Desk,\n\nI am inquiring about live arrivals and procurement pricing for:\n• Crop: ${crop.name} (HS ${crop.hsCode})\n• Growing Belts: ${crop.growingBelts.split(",")[0]}\n• Target Sourcing Window: Current Month\n\nPlease share current farm-gate / mandi procurement rates and container stuffing availability.`;
    return `https://wa.me/918149909546?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="inline-block rounded-full bg-[#0057B8]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0057B8]">
            Farm-to-Port Supply Intelligence
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Harvest &amp; Mandi Seasonal Availability Radar
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Real-time multi-crop harvest calendars, mandi arrival peaks, and storage durability matrices across
            Nashik, Punjab, Gujarat, and South Indian agricultural belts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Peak Harvest
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Stored / Moderate
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" /> Off-Season
          </div>
        </div>
      </div>

      {/* Commodity Selector Pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {CROP_SEASONS.map((crop) => (
          <button
            key={crop.id}
            onClick={() => setSelectedCropId(crop.id)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              selectedCropId === crop.id
                ? "bg-[#0057B8] text-white shadow-sm"
                : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {crop.name.split("(")[0].trim()}
          </button>
        ))}
      </div>

      {/* 12-Month Calendar Bar Grid */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-base font-bold text-slate-900">
            12-Month Supply Availability Spectrum: {activeCrop.name}
          </h4>
          <span className="rounded-full bg-slate-200 px-3 py-1 text-[11px] font-bold text-slate-700">
            HS Code: {activeCrop.hsCode}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-6 gap-2 sm:grid-cols-12">
          {activeCrop.months.map((m) => {
            const isPeak = m.status === "peak";
            const isMod = m.status === "moderate";
            return (
              <div
                key={m.month}
                className={`flex flex-col items-center justify-between rounded-xl border p-2.5 text-center transition ${
                  isPeak
                    ? "border-emerald-300 bg-emerald-50 text-emerald-950 shadow-xs"
                    : isMod
                    ? "border-amber-200 bg-amber-50 text-amber-950"
                    : "border-slate-200 bg-white text-slate-400"
                }`}
              >
                <span className="font-display text-xs font-extrabold uppercase">{m.month}</span>
                <div className="my-2">
                  <span
                    className={`inline-block h-3 w-3 rounded-full ${
                      isPeak ? "bg-emerald-500 shadow-xs" : isMod ? "bg-amber-500" : "bg-slate-300"
                    }`}
                  />
                </div>
                <span className="text-[10px] font-medium leading-tight line-clamp-2">
                  {isPeak ? "Peak" : isMod ? "Moderate" : "Off-Crop"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Detailed Breakdown Card */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Calendar className="h-3.5 w-3.5 text-[#0057B8]" /> Optimal Procurement Window
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-900 leading-relaxed">
              {activeCrop.peakWindow}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-[#FF8A00]" /> Primary Growing &amp; Mandi Belts
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-900 leading-relaxed">
              {activeCrop.growingBelts}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Clock className="h-3.5 w-3.5 text-emerald-600" /> Moisture &amp; Shelf Life
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-900 leading-relaxed">
              {activeCrop.moistureContent} • {activeCrop.storageLife}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <TrendingUp className="h-3.5 w-3.5 text-indigo-600" /> Export Corridors
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-900 leading-relaxed">
              {activeCrop.bestDestinationLanes}
            </p>
          </div>
        </div>

        {/* Sensory & Quality Characteristics */}
        <div className="mt-4 flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <Info className="h-4 w-4 text-[#0057B8] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900">Crop Characteristic Note:</span>{" "}
              {activeCrop.characteristics}
            </p>
          </div>

          <a
            href={getWhatsAppCropUrl(activeCrop)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-500"
          >
            Check Mandi Rate on WhatsApp <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
