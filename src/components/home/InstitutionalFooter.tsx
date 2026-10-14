import logo from "@/assets/logo.png";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Ship,
  FileCheck,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { SpecSheetDownloadModal } from "@/components/SpecSheetDownloadModal";

export function InstitutionalFooter() {
  return (
    <footer className="bg-[#05130E] border-t border-[#C59B27]/25 text-[#FBFBFA]">
      {/* Top Banner: Immediate Trade Desk Contact */}
      <div className="border-b border-white/10 bg-[#091E16] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:flex-row">
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E4BC4A]">
              Direct 24/7 Commercial Procurement Desk
            </div>
            <h3 className="mt-1 font-serif text-2xl font-bold text-[#FBFBFA]">
              Ready to Initiate a Bulk FCL Commodity Order?
            </h3>
            <p className="mt-1 text-xs text-[#FBFBFA]/70">
              Immediate FOB Nhava Sheva / CIF destination quotes backed by verified phytosanitary protocols.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/918149909546"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg transition hover:bg-[#1fae53]"
            >
              <Phone className="h-4 w-4" />
              <span>WhatsApp Trade Desk: +91 81499 09546</span>
            </a>

            <a
              href="mailto:info@sheshaanglobal.com"
              className="inline-flex items-center gap-2 rounded-lg border border-[#C59B27]/40 bg-white/05 px-5 py-3 text-xs font-mono font-medium text-[#FBFBFA] transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4 text-[#C59B27]" />
              <span>info@sheshaanglobal.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Directory */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Col 1: Corporate Profile & Statutory Accreditations */}
        <div className="space-y-4 lg:col-span-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Sheshaan Global"
              width={48}
              height={48}
              className="h-12 w-12 object-contain drop-shadow-[0_2px_8px_rgba(197,155,39,0.35)]"
            />
            <div>
              <div className="font-serif text-xl font-bold tracking-wider text-[#FBFBFA]">
                SHESHAAN <span className="text-[#C59B27]">GLOBAL</span>
              </div>
              <div className="text-[9px] font-mono font-semibold tracking-widest text-[#C59B27] uppercase">
                EXPORTING GOODNESS WORLDWIDE
              </div>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-[#FBFBFA]/75 max-w-sm">
            Government of India accredited export enterprise supplying fresh Nashik red onions, G4 green
            chillies, aged basmati rice, coconuts, spices, and pulses to 25+ countries worldwide.
          </p>

          <div className="space-y-1.5 font-mono text-[11px] text-[#FBFBFA]/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C59B27]" />
              <span>APEDA Govt Accredited Exporter</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C59B27]" />
              <span>IEC Verified (DGFT, Ministry of Commerce)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C59B27]" />
              <span>FSSAI Central Food Safety License</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C59B27]" />
              <span>CDB (Coconut Development Board) Registered</span>
            </div>
          </div>
        </div>

        {/* Col 2: Core Commodities */}
        <div className="mt-8 space-y-3 lg:col-span-3 lg:mt-0">
          <div className="border-b border-[#C59B27]/25 pb-2 font-mono text-xs font-bold uppercase tracking-wider text-[#E4BC4A]">
            Core Export Commodities
          </div>
          <ul className="space-y-2 text-xs font-medium text-[#FBFBFA]/80">
            <li>
              <a
                href="/products/fresh-onions-exporter-india"
                className="hover:text-[#E4BC4A] transition-colors flex items-center justify-between"
              >
                <span>Nashik Red Onions (55-65mm)</span>
                <span className="font-mono text-[10px] text-[#C59B27]">HS 07031010</span>
              </a>
            </li>
            <li>
              <a
                href="/products/green-chillies-exporter"
                className="hover:text-[#E4BC4A] transition-colors flex items-center justify-between"
              >
                <span>G4 &amp; Teja Green Chillies</span>
                <span className="font-mono text-[10px] text-[#C59B27]">HS 07096010</span>
              </a>
            </li>
            <li>
              <a
                href="/products/indian-basmati-rice"
                className="hover:text-[#E4BC4A] transition-colors flex items-center justify-between"
              >
                <span>Indian Basmati Rice (1121 &amp; 1509)</span>
                <span className="font-mono text-[10px] text-[#C59B27]">HS 10063020</span>
              </a>
            </li>
            <li>
              <a
                href="/products/coconut-exporter-india"
                className="hover:text-[#E4BC4A] transition-colors flex items-center justify-between"
              >
                <span>Pollachi Semi-Husked Coconuts</span>
                <span className="font-mono text-[10px] text-[#C59B27]">HS 08011200</span>
              </a>
            </li>
            <li>
              <a
                href="/products/spices-masalas-exporter"
                className="hover:text-[#E4BC4A] transition-colors flex items-center justify-between"
              >
                <span>Whole &amp; Ground Spices</span>
                <span className="font-mono text-[10px] text-[#C59B27]">HS 0904/0909</span>
              </a>
            </li>
            <li>
              <a
                href="/products/pulses-lentils-exporter"
                className="hover:text-[#E4BC4A] transition-colors flex items-center justify-between"
              >
                <span>Sortex Pulses &amp; Chickpeas</span>
                <span className="font-mono text-[10px] text-[#C59B27]">HS 07132000</span>
              </a>
            </li>
            <li className="pt-2 border-t border-white/10">
              <a
                href="/products"
                className="text-[#E4BC4A] hover:underline font-mono text-[11px] font-bold"
              >
                Browse All 49 HS Code Commodities →
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Trade Corridors & Port Logistics */}
        <div className="mt-8 space-y-3 lg:col-span-3 lg:mt-0">
          <div className="border-b border-[#C59B27]/25 pb-2 font-mono text-xs font-bold uppercase tracking-wider text-[#E4BC4A]">
            Trade Corridors &amp; Ports
          </div>
          <ul className="space-y-2 text-xs font-medium text-[#FBFBFA]/80">
            <li>
              <a href="/markets/export-to-uae" className="hover:text-[#E4BC4A] transition-colors">
                Export to UAE (Dubai / Jebel Ali — 3.5 Days)
              </a>
            </li>
            <li>
              <a
                href="/markets/export-to-saudi-arabia"
                className="hover:text-[#E4BC4A] transition-colors"
              >
                Export to Saudi Arabia (Dammam &amp; Jeddah)
              </a>
            </li>
            <li>
              <a
                href="/markets/export-to-uk-europe"
                className="hover:text-[#E4BC4A] transition-colors"
              >
                Export to UK &amp; Europe (Felixstowe / Rotterdam)
              </a>
            </li>
            <li>
              <a
                href="/markets/export-to-southeast-asia"
                className="hover:text-[#E4BC4A] transition-colors"
              >
                Export to Southeast Asia (Singapore / Klang)
              </a>
            </li>
            <li>
              <a
                href="/global-export-markets"
                className="hover:text-[#E4BC4A] transition-colors"
              >
                Global Export Markets (25+ Countries)
              </a>
            </li>
            <li>
              <a href="/export-process" className="hover:text-[#E4BC4A] transition-colors">
                Nhava Sheva (JNPT) CHA Protocols
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Statutory Hub & Downloads */}
        <div className="mt-8 space-y-3 lg:col-span-2 lg:mt-0">
          <div className="border-b border-[#C59B27]/25 pb-2 font-mono text-xs font-bold uppercase tracking-wider text-[#E4BC4A]">
            Governance
          </div>
          <ul className="space-y-2 text-xs font-medium text-[#FBFBFA]/80">
            <li>
              <a href="/trade-compliance" className="hover:text-[#E4BC4A] transition-colors">
                Trade Compliance Hub
              </a>
            </li>
            <li>
              <a href="/quality" className="hover:text-[#E4BC4A] transition-colors">
                Quality &amp; Lab Testing
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#E4BC4A] transition-colors">
                About Sheshaan Global
              </a>
            </li>
            <li>
              <a href="/trade-intelligence" className="hover:text-[#E4BC4A] transition-colors">
                2026 Crop Calendar
              </a>
            </li>
            <li>
              <a href="/packaging" className="hover:text-[#E4BC4A] transition-colors">
                Packaging Standards
              </a>
            </li>
            <li>
              <a href="/more-info" className="hover:text-[#E4BC4A] transition-colors">
                Company Policies
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#E4BC4A] transition-colors">
                Contact Desk
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Stripe */}
      <div className="border-t border-white/10 bg-[#05130E] py-6 text-[11px] font-mono text-[#FBFBFA]/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row">
          <div>
            © {new Date().getFullYear()} Sheshaan Global. All Rights Reserved. APEDA &amp; IEC Accredited Export Enterprise.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="/trade-compliance" className="hover:text-[#E4BC4A]">
              Statutory Disclosures
            </a>
            <span>•</span>
            <a href="/more-info" className="hover:text-[#E4BC4A]">
              Incoterms 2020 Compliance
            </a>
            <span>•</span>
            <a href="/contact" className="hover:text-[#E4BC4A]">
              Trade Desk Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
