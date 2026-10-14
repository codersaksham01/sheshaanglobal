import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  UserCheck,
  Building,
  MapPin,
  CheckCircle2,
  Calendar,
  Send,
  Download,
  Users,
} from "lucide-react";
import { toast } from "sonner";

export interface ExhibitionInfo {
  id: string;
  name: string;
  venue: string;
  city: string;
  dates: string;
  datesFormatted: string;
  startDate: string;
  endDate: string;
  booth: string;
  description: string;
}

export const UPCOMING_EXHIBITIONS: ExhibitionInfo[] = [
  {
    id: "anuga-india",
    name: "Anuga Select India 2026",
    venue: "Bombay Exhibition Centre (NESCO), Goregaon East",
    city: "Mumbai, India",
    dates: "August 20 – 22, 2026",
    datesFormatted: "2026-08-20",
    startDate: "20260820T100000Z",
    endDate: "20260822T180000Z",
    booth: "Hall 4 • Sheshaan Global Pavilion Booth #E-42",
    description: "India's premier international trade fair for food & beverage and global agricultural export supply chains.",
  },
  {
    id: "sial-india",
    name: "SIAL India 2026",
    venue: "Jio World Convention Centre, Bandra Kurla Complex (BKC)",
    city: "Mumbai, India",
    dates: "December 03 – 05, 2026",
    datesFormatted: "2026-12-03",
    startDate: "20261203T100000Z",
    endDate: "20261205T180000Z",
    booth: "Pavilion 2 • Sheshaan Global Booth #B-18",
    description: "The global food innovation network bringing together institutional supermarket buyers, importers, and distributors.",
  },
  {
    id: "gulfood-dubai",
    name: "Gulfood Dubai 2027",
    venue: "Dubai World Trade Centre (DWTC)",
    city: "Dubai, United Arab Emirates",
    dates: "February 15 – 19, 2027",
    datesFormatted: "2027-02-15",
    startDate: "20270215T100000Z",
    endDate: "20270219T180000Z",
    booth: "Sheikh Saeed Hall • India Agricultural Pavilion",
    description: "The world's largest annual food and agri-commodity sourcing event across Middle East and African markets.",
  },
];

export const DELEGATION_EXECUTIVES = [
  {
    name: "Sana Zeba Bakshi",
    title: "Chief Executive Officer & Founder",
    focus: "Strategic Long-Term Supply Contracts, Sovereign Procurement & Brand Partnerships",
  },
  {
    name: "Juned Barade",
    title: "Chief Operating Officer — Trade Exhibitions & Logistics",
    focus: "Container Staging, Port Terminal Handling & Cold Chain Reefer Operations",
  },
  {
    name: "Saksham Singh",
    title: "Managing Director — Business Development & Sourcing",
    focus: "Mandi Farm-Gate Procurement, Commodity Pricing & Commercial Incoterms",
  },
  {
    name: "Any Available Executive",
    title: "Executive Senior Trade Delegation",
    focus: "General Sourcing & Product Samples Walkthrough",
  },
];

const TIME_SLOTS = [
  "10:30 AM – 11:15 AM",
  "11:30 AM – 12:15 PM",
  "02:00 PM – 02:45 PM",
  "03:30 PM – 04:15 PM",
  "04:45 PM – 05:30 PM",
];

const COMMODITY_INTERESTS = [
  "Fresh Nashik Red Onions (Garwa / Kharif)",
  "G4 & Teja Green Chillies",
  "1121 & 1509 Basmati Rice",
  "Semi-Husked Brown Coconuts",
  "Whole Spices & Turmeric Finger",
  "Pulses & Lentils",
];

export function TradeDelegationScheduler() {
  const [selectedExhibitionId, setSelectedExhibitionId] = useState<string>("anuga-india");
  const [selectedExecutive, setSelectedExecutive] = useState<string>(DELEGATION_EXECUTIVES[0].name);
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[0]);
  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerCompany, setBuyerCompany] = useState<string>("");
  const [buyerCountry, setBuyerCountry] = useState<string>("");
  const [selectedCommodities, setSelectedCommodities] = useState<string[]>([COMMODITY_INTERESTS[0]]);

  const activeExhibition =
    UPCOMING_EXHIBITIONS.find((e) => e.id === selectedExhibitionId) ?? UPCOMING_EXHIBITIONS[0];

  const toggleCommodity = (comm: string) => {
    setSelectedCommodities((prev) =>
      prev.includes(comm) ? prev.filter((c) => c !== comm) : [...prev, comm],
    );
  };

  const generateIcsFile = () => {
    const title = `Sheshaan Global Trade Meeting @ ${activeExhibition.name}`;
    const description = `B2B Agricultural Export Procurement Meeting with ${selectedExecutive} (${activeExhibition.name}). Venue: ${activeExhibition.venue}, ${activeExhibition.city}. Booth: ${activeExhibition.booth}. Sourcing Interests: ${selectedCommodities.join(", ")}.`;
    const location = `${activeExhibition.venue}, ${activeExhibition.city}`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sheshaan Global//Trade Meeting Scheduler//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@sheshaanglobal.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART:${activeExhibition.startDate}`,
      `DTEND:${activeExhibition.endDate}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "STATUS:CONFIRMED",
      "ORGANIZER;CN=Sheshaan Global Export Desk:mailto:info@sheshaanglobal.com",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Sheshaan-Global-${activeExhibition.id}-Meeting.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Calendar invite (.ics) downloaded!");
  };

  const handleWhatsAppBooking = () => {
    const lines = [
      `Hello Sheshaan Global Trade Delegation,`,
      `I would like to confirm a face-to-face buyer meeting at ${activeExhibition.name}:`,
      `• Event: ${activeExhibition.name} (${activeExhibition.dates})`,
      `• Location: ${activeExhibition.venue}, ${activeExhibition.city}`,
      `• Meeting With: ${selectedExecutive}`,
      `• Preferred Time Slot: ${selectedSlot}`,
      `• Representative Name: ${buyerName.trim() || "Procurement Director"}`,
      `• Organization: ${buyerCompany.trim() || "To be advised"}`,
      `• Destination Market: ${buyerCountry.trim() || "International"}`,
      `• Commodities of Interest: ${selectedCommodities.join(", ") || "General Agricultural Produce"}`,
      ``,
      `Please confirm the meeting slot and provide booth entry coordinates.`,
    ];
    const url = `https://wa.me/918149909546?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
  };

  return (
    <div id="trade-delegation" className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="inline-block rounded-full bg-[#0057B8]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0057B8]">
            Global Trade Events &amp; Buyer Delegation
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Trade Exhibition Delegation &amp; Buyer Meeting Scheduler
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Book private procurement consultations with Sheshaan Global founders and logistics directors at
            major international food and agricultural trade exhibitions.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-semibold text-[#0057B8]">
          <Users className="h-4 w-4" />
          <span>Executive Leadership Presence</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Step 1: Select Exhibition */}
        <div className="space-y-4 lg:col-span-6">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            1. Select Trade Exhibition &amp; Venue
          </label>
          <div className="space-y-2.5">
            {UPCOMING_EXHIBITIONS.map((ex) => {
              const isSelected = selectedExhibitionId === ex.id;
              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExhibitionId(ex.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    isSelected
                      ? "border-[#0057B8] bg-[#0057B8]/5 ring-2 ring-[#0057B8]/20"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-display text-sm font-bold text-slate-900">{ex.name}</span>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                        <MapPin className="h-3.5 w-3.5 text-[#0057B8] shrink-0" />
                        <span>{ex.venue}, {ex.city}</span>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800 shrink-0">
                      {ex.dates}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-medium text-slate-500">
                    {ex.booth}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Executive Selector */}
          <div className="pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              2. Select Delegation Leader
            </label>
            <div className="mt-2 space-y-2">
              {DELEGATION_EXECUTIVES.map((exec) => (
                <button
                  key={exec.name}
                  onClick={() => setSelectedExecutive(exec.name)}
                  className={`w-full rounded-xl border p-3 text-left transition ${
                    selectedExecutive === exec.name
                      ? "border-[#0057B8] bg-white shadow-xs"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{exec.name}</span>
                    <span className="text-[10px] font-semibold text-[#0057B8]">{exec.title}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">{exec.focus}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Time Slot & Buyer Form */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:col-span-6 shadow-xs">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              3. Preferred Meeting Time Slot
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                    selectedSlot === slot
                      ? "bg-[#0057B8] text-white shadow-sm"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            {/* Buyer Details Form */}
            <div className="mt-5 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                4. Buyer Organization Details
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name / Title"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#0057B8] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Company / Supermarket Chain"
                  value={buyerCompany}
                  onChange={(e) => setBuyerCompany(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#0057B8] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Destination Country (e.g. UAE, UK, Saudi)"
                  value={buyerCountry}
                  onChange={(e) => setBuyerCountry(e.target.value)}
                  className="sm:col-span-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#0057B8] focus:outline-none"
                />
              </div>
            </div>

            {/* Sourcing Interests */}
            <div className="mt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                5. Select Commodities to Review
              </label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {COMMODITY_INTERESTS.map((comm) => {
                  const isChecked = selectedCommodities.includes(comm);
                  return (
                    <button
                      key={comm}
                      onClick={() => toggleCommodity(comm)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                        isChecked
                          ? "bg-[#FF8A00] text-slate-950 shadow-xs font-bold"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {comm}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-2.5 border-t border-slate-200 pt-4">
            <button
              onClick={handleWhatsAppBooking}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-emerald-500"
            >
              <Send className="h-4 w-4" /> Confirm Meeting via WhatsApp (+91 81499 09546)
            </button>

            <button
              onClick={generateIcsFile}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-100"
            >
              <Download className="h-3.5 w-3.5 text-[#0057B8]" /> Add to Outlook / Google Calendar (.ics)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
