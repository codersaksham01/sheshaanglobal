import React, { useState } from "react";
import {
  Calendar,
  Clock,
  UserCheck,
  Building2,
  MapPin,
  CheckCircle2,
  Video,
  Phone,
  Send,
  Download,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export interface MeetingMode {
  id: string;
  name: string;
  badge: string;
  description: string;
  locationDetails: string;
  icon: typeof Building2;
}

export const MEETING_MODES: MeetingMode[] = [
  {
    id: "mumbai-office",
    name: "In-Person: Mumbai Export Office",
    badge: "Headquarters",
    description: "Meet our directors at our corporate trade office in Mumbai.",
    locationDetails: "Sheshaan Global Corporate Office, Mumbai, Maharashtra, India",
    icon: Building2,
  },
  {
    id: "nashik-packhouse",
    name: "In-Person: Nashik Packhouse & Mandi",
    badge: "Origin Facility",
    description: "Live packhouse inspection, cold store audit & APMC mandi walkthrough.",
    locationDetails: "Sheshaan Global Export Packhouse, Lasalgaon / Pimpalgaon Belt, Nashik, Maharashtra",
    icon: MapPin,
  },
  {
    id: "virtual-video",
    name: "Virtual: Video Conference",
    badge: "Google Meet / Zoom",
    description: "High-level sourcing strategy, live container camera feeds & documentation review.",
    locationDetails: "Google Meet / Zoom Video Bridge (Link dispatched upon confirmation)",
    icon: Video,
  },
  {
    id: "phone-consult",
    name: "Direct Call: Phone / WhatsApp",
    badge: "Voice Call",
    description: "Quick 20-minute discussion on current mandi pricing and vessel space availability.",
    locationDetails: "Direct Trade Line (+91 81499 09546)",
    icon: Phone,
  },
];

export const DELEGATION_EXECUTIVES = [
  {
    id: "sana-zeba",
    name: "Sana Zeba Bakshi",
    title: "Chief Executive Officer & Founder",
    focus: "Strategic Long-Term Supply Contracts, Sovereign Procurement & Corporate Partnerships",
  },
  {
    id: "juned-barade",
    name: "Juned Barade",
    title: "Chief Operating Officer — Trade & Logistics",
    focus: "Container Staging, Port Terminal Handling & Cold Chain Reefer Operations",
  },
  {
    id: "saksham-singh",
    name: "Saksham Singh",
    title: "Managing Director — Business Development & Sourcing",
    focus: "Mandi Farm-Gate Procurement, Commodity Pricing & Commercial Incoterms",
  },
  {
    id: "any-director",
    name: "Any Available Senior Director",
    title: "Executive Senior Trade Delegation",
    focus: "General Sourcing & Product Samples Walkthrough",
  },
];

const TIME_SLOTS = [
  "10:00 AM – 10:45 AM IST",
  "11:30 AM – 12:15 PM IST",
  "02:00 PM – 02:45 PM IST",
  "03:30 PM – 04:15 PM IST",
  "05:00 PM – 05:45 PM IST",
];

const COMMODITY_OPTIONS = [
  "Fresh Nashik Red Onions (Garwa / Kharif)",
  "Fresh Green Chillies (G4 & Teja)",
  "Indian Basmati Rice (1121 & 1509 XXL)",
  "Semi-Husked Brown Coconuts",
  "Whole Spices & Turmeric Finger",
  "Pulses & Lentils (Chickpeas, Toor Dal)",
];

export function TradeDelegationScheduler() {
  const [selectedModeId, setSelectedModeId] = useState<string>("mumbai-office");
  const [selectedExecutiveId, setSelectedExecutiveId] = useState<string>("sana-zeba");
  const [meetingDate, setMeetingDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2); // Default 2 days in future
    return d.toISOString().split("T")[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[1]);

  // Buyer Form Inputs
  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerCompany, setBuyerCompany] = useState<string>("");
  const [buyerEmail, setBuyerEmail] = useState<string>("");
  const [buyerPhone, setBuyerPhone] = useState<string>("");
  const [destinationMarket, setDestinationMarket] = useState<string>("");
  const [selectedCommodities, setSelectedCommodities] = useState<string[]>([COMMODITY_OPTIONS[0]]);
  const [notes, setNotes] = useState<string>("");

  const activeMode =
    MEETING_MODES.find((m) => m.id === selectedModeId) ?? MEETING_MODES[0];
  const activeExec =
    DELEGATION_EXECUTIVES.find((e) => e.id === selectedExecutiveId) ?? DELEGATION_EXECUTIVES[0];

  const toggleCommodity = (comm: string) => {
    setSelectedCommodities((prev) =>
      prev.includes(comm) ? prev.filter((c) => c !== comm) : [...prev, comm],
    );
  };

  const generateIcsFile = () => {
    if (!buyerName.trim() || !buyerCompany.trim()) {
      toast.error("Please enter your Name and Company Name to generate the calendar invite.");
      return;
    }

    const cleanDate = meetingDate.replace(/-/g, "");
    // Extract start hour from slot
    const hourMatch = selectedSlot.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let startHour = 10;
    let startMinute = 0;
    if (hourMatch) {
      startHour = parseInt(hourMatch[1], 10);
      startMinute = parseInt(hourMatch[2], 10);
      if (hourMatch[3].toUpperCase() === "PM" && startHour !== 12) {
        startHour += 12;
      } else if (hourMatch[3].toUpperCase() === "AM" && startHour === 12) {
        startHour = 0;
      }
    }
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const dtStart = `${cleanDate}T${pad(startHour)}${pad(startMinute)}00Z`;
    const dtEnd = `${cleanDate}T${pad(startHour + 1)}${pad(startMinute)}00Z`;

    const title = `Sheshaan Global Buyer Meeting: ${buyerCompany} & ${activeExec.name}`;
    const description = `B2B Agricultural Export Sourcing Meeting\\nMeeting Mode: ${activeMode.name}\\nLocation/Access: ${activeMode.locationDetails}\\nHost: ${activeExec.name} (${activeExec.title})\\nBuyer Representative: ${buyerName} (${buyerCompany})\\nTarget Market: ${destinationMarket || "International"}\\nCommodities: ${selectedCommodities.join(", ")}\\nAgenda: ${notes || "Bulk agricultural commodity export & container allocation"}`;

    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sheshaan Global//Buyer Meeting Scheduler//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@sheshaanglobal.com`,
      `DTSTAMP:${cleanDate}T100000Z`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${activeMode.locationDetails}`,
      "STATUS:CONFIRMED",
      "ORGANIZER;CN=Sheshaan Global Trade Desk:mailto:info@sheshaanglobal.com",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsLines], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Sheshaan-Global-Meeting-${cleanDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Calendar invite (.ics) downloaded!");
  };

  const handleWhatsAppBooking = () => {
    if (!buyerName.trim() || !buyerCompany.trim()) {
      toast.error("Please enter your Name and Company Name to confirm the meeting.");
      return;
    }

    const lines = [
      "Hello Sheshaan Global Management,",
      "",
      "I would like to schedule a formal Buyer Meeting with your trade team:",
      `• Meeting Mode: ${activeMode.name}`,
      `• Preferred Host: ${activeExec.name} (${activeExec.title})`,
      `• Preferred Date: ${meetingDate}`,
      `• Preferred Time: ${selectedSlot}`,
      `• Buyer Representative: ${buyerName.trim()}`,
      `• Company / Organization: ${buyerCompany.trim()}`,
      buyerEmail.trim() ? `• Business Email: ${buyerEmail.trim()}` : "",
      buyerPhone.trim() ? `• Phone/WhatsApp: ${buyerPhone.trim()}` : "",
      destinationMarket.trim() ? `• Target Market / Port: ${destinationMarket.trim()}` : "",
      `• Commodities of Interest: ${selectedCommodities.join(", ") || "Fresh Onions & Agro Produce"}`,
      notes.trim() ? `• Sourcing Requirements: ${notes.trim()}` : "",
      "",
      "Please confirm the meeting slot and provide meeting coordinates.",
    ].filter(Boolean);

    const url = `https://wa.me/918149909546?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
    toast.success("Meeting details forwarded to WhatsApp (+91 81499 09546)!");
  };

  const handleEmailBooking = () => {
    const subject = `Buyer Meeting Request: ${buyerCompany || "Procurement Delegation"} — Sheshaan Global`;
    const body = [
      "Hello Sheshaan Global Export Desk,",
      "",
      "We would like to request a formal buyer meeting with your leadership team:",
      `• Meeting Mode: ${activeMode.name}`,
      `• Location / Access: ${activeMode.locationDetails}`,
      `• Executive Host: ${activeExec.name} (${activeExec.title})`,
      `• Requested Date: ${meetingDate}`,
      `• Time Slot: ${selectedSlot}`,
      `• Representative: ${buyerName || "Procurement Director"}`,
      `• Company: ${buyerCompany || "To be confirmed"}`,
      `• Contact Phone: ${buyerPhone || "Available on request"}`,
      `• Target Destination Port: ${destinationMarket || "International Gateway"}`,
      `• Sourcing Products: ${selectedCommodities.join(", ")}`,
      `• Additional Requirements: ${notes || "Container allocation and commercial quote discussion"}`,
      "",
      "Thank you.",
    ].join("\n");

    window.location.href = `mailto:info@sheshaanglobal.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div
      id="buyer-meetings"
      className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="inline-block rounded-full bg-[#0057B8]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0057B8]">
            Direct Procurement Consultation
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Schedule a Buyer Meeting with Our Directors
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Book an in-person session at our Mumbai office / Nashik packhouse or an executive video conference
            with Sheshaan Global founders to discuss long-term export supply contracts.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-900">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Executive Leadership Direct Access</span>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        {/* Left Column: Meeting Mode & Host Selection */}
        <div className="space-y-6 lg:col-span-5">
          {/* Step 1: Meeting Mode */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Select Meeting Format &amp; Location
            </label>
            <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {MEETING_MODES.map((mode) => {
                const isSelected = selectedModeId === mode.id;
                const IconComponent = mode.icon;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setSelectedModeId(mode.id)}
                    className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition ${
                      isSelected
                        ? "border-[#0057B8] bg-[#0057B8]/5 ring-2 ring-[#0057B8]/20 shadow-xs"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <div
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white shadow-xs ${
                        isSelected ? "bg-[#0057B8]" : "bg-slate-700"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900">{mode.name}</span>
                        <span className="rounded-md bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 shrink-0">
                          {mode.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500 leading-snug">
                        {mode.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Executive Host */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              2. Select Executive Host
            </label>
            <div className="mt-2.5 space-y-2">
              {DELEGATION_EXECUTIVES.map((exec) => {
                const isSelected = selectedExecutiveId === exec.id;
                return (
                  <button
                    key={exec.id}
                    type="button"
                    onClick={() => setSelectedExecutiveId(exec.id)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      isSelected
                        ? "border-[#0057B8] bg-white shadow-xs ring-1 ring-[#0057B8]/20"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{exec.name}</span>
                      <span className="text-[10px] font-semibold text-[#0057B8]">{exec.title}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500 line-clamp-1">{exec.focus}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Mode Summary */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-950">
            <div className="font-bold uppercase tracking-wider text-[#0057B8] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Meeting Location / Access Note:
            </div>
            <p className="mt-1 font-medium text-slate-700 leading-relaxed">
              {activeMode.locationDetails}
            </p>
          </div>
        </div>

        {/* Right Column: Schedule Details & Buyer Information Form */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:col-span-7 shadow-xs">
          <div className="space-y-5">
            {/* Date & Time Slot Row */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Choose Preferred Date &amp; Time Window
              </label>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500">Meeting Date:</span>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-[#0057B8] focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500">Time Slot (IST / GMT+5:30):</span>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-[#0057B8] focus:outline-none"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Buyer Contact Form */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                4. Buyer Organization Details
              </label>
              <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-900 focus:border-[#0057B8] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Company / Supermarket Chain *"
                    value={buyerCompany}
                    onChange={(e) => setBuyerCompany(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-900 focus:border-[#0057B8] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Official Business Email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-900 focus:border-[#0057B8] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp (+Country Code)"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-900 focus:border-[#0057B8] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Target Import Country & Discharge Port (e.g. UAE - Jebel Ali, Saudi - Dammam, UK)"
                    value={destinationMarket}
                    onChange={(e) => setDestinationMarket(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-900 focus:border-[#0057B8] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Commodities of Interest */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                5. Commodities to Discuss
              </label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {COMMODITY_OPTIONS.map((comm) => {
                  const isChecked = selectedCommodities.includes(comm);
                  return (
                    <button
                      key={comm}
                      type="button"
                      onClick={() => toggleCommodity(comm)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                        isChecked
                          ? "bg-[#FF8A00] text-slate-950 font-bold shadow-xs"
                          : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {comm}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Agenda / Volume */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                6. Meeting Agenda &amp; Volume Target (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Sourcing 4x40ft FCL monthly of Nashik Red Onions 45-55mm, custom retail private label packaging, target CIF Jebel Ali quotation."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 focus:border-[#0057B8] focus:outline-none"
              />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col gap-2.5 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-500"
            >
              <Send className="h-4 w-4" /> Schedule Meeting via WhatsApp (+91 81499 09546)
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={generateIcsFile}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-100"
              >
                <Download className="h-3.5 w-3.5 text-[#0057B8]" /> Add to Calendar (.ics)
              </button>

              <button
                type="button"
                onClick={handleEmailBooking}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-100"
              >
                <Mail className="h-3.5 w-3.5 text-slate-500" /> Submit via Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
