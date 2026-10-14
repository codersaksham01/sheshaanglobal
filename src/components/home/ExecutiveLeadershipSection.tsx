import { useState } from "react";
import {
  Users,
  Award,
  Calendar,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Phone,
  Mail,
  Linkedin,
} from "lucide-react";
import sanaImg from "@/assets/team-sana-zeba-bakshi.jpg";
import junedImg from "@/assets/team-juned-barade.jpg";
import sakshamImg from "@/assets/team-saksham-singh.jpg";

interface Leader {
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  specialization: string[];
  contactEmail: string;
  linkedIn?: string;
}

const EXECUTIVES: Leader[] = [
  {
    name: "Sana Zeba Bakshi",
    role: "Chief Executive Officer & Founder",
    department: "Executive Board & Agricultural Sourcing",
    image: sanaImg,
    bio: "Founded Sheshaan Global to establish a direct, transparent supply corridor connecting Maharashtra's farming communities to global supermarket and wholesale commodity buyers. Leads statutory governance, APEDA accreditation, and direct farmer-gate aggregation.",
    specialization: [
      "Farm-Gate Sourcing Networks (Nashik, Lasalgaon & Pune)",
      "APEDA & FSSAI Statutory Compliance Architecture",
      "Agricultural Commodity Aggregation & Farmer Fair-Pricing",
    ],
    contactEmail: "sana@sheshaanglobal.com",
    linkedIn: "https://www.linkedin.com/company/sheshaan-global/",
  },
  {
    name: "Juned Barade",
    role: "Chief Operating Officer — Trade Exhibitions",
    department: "Port Logistics & International Delegations",
    image: junedImg,
    bio: "Directs end-to-end multimodal logistics from packhouse forced-air pre-cooling to JNPT (Nhava Sheva) and Mundra port container stowage. Heads Sheshaan Global's official delegations at international food exhibitions across Mumbai, Dubai, and Europe.",
    specialization: [
      "Reefer Cold-Chain Integrity (+2°C to +4°C Protocols)",
      "JNPT & Mundra Port Customs Handover Coordination",
      "Trade Delegation Lead (Anuga Select India & SIAL India)",
    ],
    contactEmail: "juned@sheshaanglobal.com",
    linkedIn: "https://www.linkedin.com/company/sheshaan-global/",
  },
  {
    name: "Saksham Singh",
    role: "Managing Director — Business Development",
    department: "Global Procurement & Commercial Contracts",
    image: sakshamImg,
    bio: "Orchestrates commercial relations with government food security boards, supermarket chains, and private commodity importers across the GCC, United Kingdom, and Southeast Asia. Oversees CIF/FOB pricing, contract execution, and speed-to-lead quotation desks.",
    specialization: [
      "GCC & European B2B Commodity Contract Execution",
      "Indicative Freight & CIF Spot Pricing Modeling",
      "Private-Label Packaging & Retail Specification Design",
    ],
    contactEmail: "saksham@sheshaanglobal.com",
    linkedIn: "https://www.linkedin.com/company/sheshaan-global/",
  },
];

const EXHIBITIONS = [
  {
    title: "Anuga Select India 2026",
    role: "Official Exporter Delegation & Commodity Showcase",
    venue: "Bombay Exhibition Centre (NESCO), Goregaon, Mumbai, India",
    focus: "Fresh Nashik Red Onions, G4 Green Chillies & Cold-Chain Perishables",
    badge: "Confirmed Trade Delegation",
    desc: "Meeting international food buyers, retail supermarket procurement teams, and Gulf food importers for 2026–2027 annual supply contracts.",
  },
  {
    title: "SIAL India 2026",
    role: "International Food Innovation Exhibition",
    venue: "Jio World Convention Centre, Bandra Kurla Complex (BKC), Mumbai",
    focus: "Aged 1121 Basmati Rice, Whole Spices, and Sortex Cleaned Pulses",
    badge: "Official Trade Delegation",
    desc: "Showcasing Indian agricultural excellence, private-label packaging options, and institutional export compliance to global retail delegations.",
  },
];

export function ExecutiveLeadershipSection() {
  const [meetingBuyerName, setMeetingBuyerName] = useState("");
  const [meetingCompany, setMeetingCompany] = useState("");
  const [meetingExhibition, setMeetingExhibition] = useState(EXHIBITIONS[0].title);

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      "Hello Sheshaan Global Executive Desk,",
      `I would like to pre-schedule a 1-on-1 Buyer Meeting at your 2026 Mumbai Exhibition Delegation:`,
      `• Buyer Name: ${meetingBuyerName.trim()}`,
      `• Company / Organization: ${meetingCompany.trim()}`,
      `• Target Exhibition: ${meetingExhibition}`,
      "",
      "Please confirm the meeting slot and send the delegation booth location details.",
    ].join("\n");

    window.open(`https://wa.me/918149909546?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="leadership" className="bg-[#FBFBFA] py-20 text-[#111816]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="border-b border-[#091E16]/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded border border-[#C59B27]/40 bg-[#F5F3EF] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-[#A67C1E]">
            <Users className="h-3.5 w-3.5 text-[#091E16]" />
            E-E-A-T • Executive Governance &amp; Origin Accountability
          </div>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#091E16] sm:text-4xl lg:text-5xl">
            Executive Leadership &amp; Trade Delegation
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-[#3D4843]">
            Behind Sheshaan Global&apos;s institutional cold chain is an executive team with deep roots
            in Maharashtra&apos;s agricultural mandis and proven execution across international maritime ports.
          </p>
        </div>

        {/* Executive Profiles 3-Card Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXECUTIVES.map((exec) => (
            <div
              key={exec.name}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#091E16]/10 bg-white shadow-sm transition-all hover:border-[#C59B27] hover:shadow-md"
            >
              <div>
                {/* Executive Headshot with Natural Lighting */}
                <div className="relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden bg-slate-100">
                  <img
                    src={exec.image}
                    alt={`${exec.name} - ${exec.role} at Sheshaan Global`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-[#091E16]/90 px-2 py-1 font-mono text-[9px] font-bold text-[#E4BC4A] backdrop-blur-sm">
                    {exec.department}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-[#091E16]">{exec.name}</h3>
                  <div className="mt-1 font-mono text-xs font-bold text-[#A67C1E]">
                    {exec.role}
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-[#3D4843]">{exec.bio}</p>

                  <div className="mt-5 space-y-2 border-t border-[#091E16]/08 pt-4">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#091E16]">
                      Core Areas of Execution:
                    </div>
                    {exec.specialization.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 font-mono text-xs text-[#3D4843]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Contact Bar */}
              <div className="border-t border-[#091E16]/08 bg-[#F5F3EF] px-6 py-3 flex items-center justify-between text-xs font-mono">
                <a
                  href={`mailto:${exec.contactEmail}`}
                  className="inline-flex items-center gap-1.5 text-[#091E16] hover:text-[#A67C1E] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[#A67C1E]" />
                  <span>{exec.contactEmail}</span>
                </a>
                {exec.linkedIn && (
                  <a
                    href={exec.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#091E16] hover:text-[#0057B8] transition-colors"
                    aria-label={`${exec.name} LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trade Delegation: Anuga Select & SIAL India 2026 */}
        <div className="mt-16 rounded-2xl border border-[#C59B27]/40 bg-[#091E16] p-7 text-[#FBFBFA] shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C59B27]/25 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded bg-[#C59B27]/20 border border-[#C59B27]/40 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#E4BC4A]">
                Official 2026 Trade Fair Delegations
              </div>
              <h3 className="mt-2 font-serif text-2xl font-bold text-[#FBFBFA]">
                Meet Sheshaan Global at Anuga Select India &amp; SIAL India 2026
              </h3>
            </div>
            <span className="font-mono text-xs text-[#E4BC4A]">
              BOMBAY EXHIBITION CENTRE &amp; JIO WORLD CENTRE, MUMBAI
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Exhibition Details */}
            <div className="lg:col-span-7 space-y-6">
              {EXHIBITIONS.map((fair) => (
                <div
                  key={fair.title}
                  className="rounded-xl border border-white/10 bg-[#05130E] p-5 font-mono text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg font-bold text-[#FBFBFA]">{fair.title}</span>
                    <span className="rounded bg-[#C59B27] px-2 py-0.5 text-[10px] font-bold text-[#091E16]">
                      {fair.badge}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-[#E4BC4A] font-bold">{fair.role}</div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#FBFBFA]/70">
                    <MapPin className="h-3.5 w-3.5 text-[#C59B27] shrink-0" />
                    <span>{fair.venue}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-[#FBFBFA]/60">Focus: {fair.focus}</div>
                  <p className="mt-2 text-xs leading-relaxed text-[#FBFBFA]/75">{fair.desc}</p>
                </div>
              ))}
            </div>

            {/* Right Column: Pre-Schedule Buyer Meeting Form */}
            <div className="lg:col-span-5 rounded-xl border border-[#C59B27]/30 bg-[#05130E] p-6">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#E4BC4A]">
                Pre-Schedule Buyer Meeting (Mumbai)
              </div>
              <p className="mt-1 text-xs text-[#FBFBFA]/70">
                Book a dedicated 30-minute commercial slot with our executive directors during the exhibition.
              </p>

              <form onSubmit={handleScheduleMeeting} className="mt-4 space-y-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#C59B27]">
                    Buyer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={meetingBuyerName}
                    onChange={(e) => setMeetingBuyerName(e.target.value)}
                    placeholder="e.g., Tariq Al-Hashimi"
                    className="mt-1 w-full rounded-lg border border-white/15 bg-[#091E16] px-3 py-2 text-xs text-[#FBFBFA] focus:border-[#C59B27] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#C59B27]">
                    Company &amp; Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={meetingCompany}
                    onChange={(e) => setMeetingCompany(e.target.value)}
                    placeholder="e.g., Gulf Fresh Trading LLC (Dubai, UAE)"
                    className="mt-1 w-full rounded-lg border border-white/15 bg-[#091E16] px-3 py-2 text-xs text-[#FBFBFA] focus:border-[#C59B27] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#C59B27]">
                    Select Trade Exhibition
                  </label>
                  <select
                    value={meetingExhibition}
                    onChange={(e) => setMeetingExhibition(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/15 bg-[#091E16] px-3 py-2 text-xs text-[#FBFBFA] focus:border-[#C59B27] focus:outline-none"
                  >
                    {EXHIBITIONS.map((ex) => (
                      <option key={ex.title} value={ex.title}>
                        {ex.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#C59B27] to-[#A67C1E] py-3 text-xs font-bold uppercase tracking-wider text-[#091E16] shadow-lg transition hover:brightness-110"
                  >
                    <span>Confirm Meeting with Executive Team</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
