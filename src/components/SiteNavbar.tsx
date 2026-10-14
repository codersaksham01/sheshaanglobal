import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  Ship,
  Globe2,
  ShieldCheck,
  FileText,
  BadgeCheck,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { SpecSheetDownloadModal } from "@/components/SpecSheetDownloadModal";
import { RfqModal } from "@/components/RfqModal";

interface NavGroup {
  label: string;
  href: string;
  columns?: {
    heading: string;
    items: {
      label: string;
      sub?: string;
      href: string;
      hsCode?: string;
      badge?: string;
    }[];
  }[];
}

export const INSTITUTIONAL_NAV_MENU: NavGroup[] = [
  {
    label: "Commodity Directory",
    href: "/products",
    columns: [
      {
        heading: "Fresh Produce & Perishables",
        items: [
          {
            label: "Fresh Nashik Red Onions",
            sub: "APEDA Certified 45–55mm & 55–65mm FCL Reefer",
            href: "/products/fresh-onions-exporter-india",
            hsCode: "HS 07031010",
            badge: "Primary Crop",
          },
          {
            label: "G4 & Teja Green Chillies",
            sub: "Pre-Cooled Cold Chain 4kg/5kg Cartons",
            href: "/products/green-chillies-exporter",
            hsCode: "HS 07096010",
          },
          {
            label: "Pollachi Mature Coconuts",
            sub: "Semi-Husked Brown Coconuts (CDB Verified)",
            href: "/products/coconut-exporter-india",
            hsCode: "HS 08011200",
          },
        ],
      },
      {
        heading: "Grains & Whole Spices",
        items: [
          {
            label: "Indian Basmati Rice (1121 & 1509)",
            sub: "Aged Steam & Parboiled Sella 8.35mm+",
            href: "/products/indian-basmati-rice",
            hsCode: "HS 10063020",
          },
          {
            label: "Export Whole & Ground Spices",
            sub: "Unjha Cumin, Sangli Turmeric, Guntur Chilli",
            href: "/products/spices-masalas-exporter",
            hsCode: "HS 0904/0909",
          },
          {
            label: "Sortex Pulses & Chickpeas",
            sub: "Kabuli Chickpeas (75-80 count), Toor Dal",
            href: "/products/pulses-lentils-exporter",
            hsCode: "HS 07132000",
          },
        ],
      },
      {
        heading: "Master Catalog & Directory",
        items: [
          {
            label: "All 49 Export Commodities & HS Codes",
            sub: "Complete B2B agricultural export matrix with loading metrics",
            href: "/products",
            badge: "49 HS Codes",
          },
          {
            label: "Agricultural Exports India (Pillar Hub)",
            sub: "Institutional farm-gate sourcing & packhouse compliance",
            href: "/agricultural-exports-india",
          },
        ],
      },
    ],
  },
  {
    label: "Global Trade Corridors",
    href: "/global-export-markets",
    columns: [
      {
        heading: "Middle East & GCC Corridors",
        items: [
          {
            label: "Export to UAE (Dubai / Jebel Ali)",
            sub: "3.5 Days Express Transit from JNPT / Nhava Sheva",
            href: "/markets/export-to-uae",
            badge: "3.5 Days Fast Lane",
          },
          {
            label: "Export to Saudi Arabia (Jeddah / Dammam)",
            sub: "SFDA & SABER Compliant Basmati & Produce",
            href: "/markets/export-to-saudi-arabia",
          },
        ],
      },
      {
        heading: "Europe & Southeast Asia",
        items: [
          {
            label: "Export to UK & Europe (Felixstowe / Rotterdam)",
            sub: "EU-MRL & Aflatoxin Certified Cold-Chain Reefers",
            href: "/markets/export-to-uk-europe",
          },
          {
            label: "Export to Southeast Asia (Singapore / Port Klang)",
            sub: "SFA & MAQIS Cleared Onions & Agro Produce",
            href: "/markets/export-to-southeast-asia",
          },
        ],
      },
      {
        heading: "Port Logistics Matrix",
        items: [
          {
            label: "Global Export Markets (25+ Countries)",
            sub: "Ocean freight schedules, transit windows, and discharge ports",
            href: "/global-export-markets",
          },
          {
            label: "Port Handover & CHA Protocols",
            sub: "Nhava Sheva (JNPT) & Mundra port customs clearing workflows",
            href: "/export-process",
          },
        ],
      },
    ],
  },
  {
    label: "Statutory & Governance",
    href: "/trade-compliance",
    columns: [
      {
        heading: "Statutory Registrations",
        items: [
          {
            label: "Trade Compliance Hub",
            sub: "APEDA, IEC, FSSAI, CDB & Spices Board credentials",
            href: "/trade-compliance",
            badge: "Govt Verified",
          },
          {
            label: "Quality & Phytosanitary Laboratory",
            sub: "SGS / Eurofins MRL testing & Fumigation (MBr) protocols",
            href: "/quality",
          },
        ],
      },
      {
        heading: "Company Leadership & Events",
        items: [
          {
            label: "Executive Leadership & Board",
            sub: "Sana Zeba Bakshi (CEO), Juned Barade, Saksham Singh",
            href: "/about",
          },
          {
            label: "SIAL & Anuga Select India 2026",
            sub: "Official trade delegation at Bombay Exhibition Centre & Jio World",
            href: "/more-info",
            badge: "Exhibitor 2026",
          },
        ],
      },
      {
        heading: "Commercial Procurement",
        items: [
          {
            label: "2026 Indian Crop Seasonality Calendar",
            sub: "Kharif, Late Kharif & Rabi harvest cycles and price trends",
            href: "/trade-intelligence",
          },
          {
            label: "Packaging & Private Label Specifications",
            sub: "Leno mesh bags, jute bags, vacuum packaging & corrugated cartons",
            href: "/packaging",
          },
        ],
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact Desk", href: "/contact" },
];

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeCurrency, setActiveCurrency] = useState("USD ($)");
  const currencies = ["USD ($)", "EUR (€)", "AED (د.إ)", "SAR (﷼)", "GBP (£)"];

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 20);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 3.1 TOP MICRO-BAR: Dark Obsidian with Live Trade Signals */}
      <div className="bg-[#05130E] border-b border-[#C59B27]/20 text-[#FBFBFA] text-xs">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Live Port Signals */}
          <div className="flex items-center gap-4 overflow-x-auto py-1 text-[11px] font-mono no-scrollbar">
            <div className="inline-flex items-center gap-1.5 whitespace-nowrap text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>JNPT (Nhava Sheva): Normal Operations</span>
            </div>

            <span className="text-[#C59B27]/40">|</span>

            <div className="inline-flex items-center gap-1.5 whitespace-nowrap text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Mundra: Active Dispatch</span>
            </div>

            <span className="text-[#C59B27]/40 hidden lg:inline">|</span>

            <div className="hidden lg:inline-flex items-center gap-1.5 whitespace-nowrap text-[#FBFBFA]/75">
              <Ship className="h-3.5 w-3.5 text-[#C59B27]" />
              <span>Cold Chain Temp: +2.0°C to +4.0°C Sensitech Monitored</span>
            </div>
          </div>

          {/* Direct Trade Desk & Currency Switcher */}
          <div className="hidden md:flex items-center gap-5 text-[11px] font-medium text-[#FBFBFA]/85">
            <a
              href="https://wa.me/918149909546"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#C59B27] transition-colors"
            >
              <Phone className="h-3 w-3 text-emerald-400" />
              <span>Direct Trade Desk: +91 81499 09546</span>
            </a>

            <a
              href="mailto:info@sheshaanglobal.com"
              className="inline-flex items-center gap-1.5 hover:text-[#C59B27] transition-colors"
            >
              <Mail className="h-3 w-3 text-[#C59B27]" />
              <span>info@sheshaanglobal.com</span>
            </a>

            <div className="flex items-center gap-1.5 pl-2 border-l border-[#C59B27]/25">
              <span className="text-[#C59B27] text-[10px] uppercase font-mono">Currency:</span>
              <select
                value={activeCurrency}
                onChange={(e) => setActiveCurrency(e.target.value)}
                className="bg-[#091E16] text-[#FBFBFA] border border-[#C59B27]/30 rounded px-1.5 py-0.5 text-[10px] font-mono focus:outline-none focus:border-[#C59B27]"
                aria-label="Select Trade Quote Currency"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN INSTITUTIONAL NAVIGATION BAR: Obsidian Emerald (#091E16) */}
      <div
        className={`bg-[#091E16] border-b border-[#C59B27]/25 text-[#FBFBFA] transition-all duration-300 ${
          scrolled ? "shadow-[0_12px_40px_rgba(5,19,14,0.65)] py-2" : "py-3"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Institutional Wordmark & Gold Crest Logo */}
          <a
            href="/"
            aria-label="Sheshaan Global - Agricultural Export House Home"
            className="group flex shrink-0 items-center gap-3.5"
          >
            <div className="relative">
              <img
                src={logo}
                alt="Sheshaan Global Emblem"
                width={48}
                height={48}
                className="h-11 w-11 object-contain drop-shadow-[0_2px_8px_rgba(197,155,39,0.35)] transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#C59B27] text-[8px] font-bold text-[#091E16]">
                ★
              </span>
            </div>
            <div className="leading-tight">
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#FBFBFA] group-hover:text-[#E4BC4A] transition-colors">
                SHESHAAN <span className="text-[#C59B27]">GLOBAL</span>
              </div>
              <div className="text-[9px] font-mono font-semibold tracking-[0.24em] text-[#C59B27]/90 uppercase">
                GOVT ACCREDITED APEDA &amp; IEC EXPORT HOUSE
              </div>
            </div>
          </a>

          {/* Desktop Mega Navigation */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            {INSTITUTIONAL_NAV_MENU.map((item) =>
              item.columns ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FBFBFA]/90 transition-colors hover:bg-white/[0.08] hover:text-[#E4BC4A]"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-[#C59B27] transition-transform duration-200" />
                  </a>

                  {/* High-Density Mega Dropdown */}
                  {activeDropdown === item.label && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 z-50 w-[780px]">
                      <div className="overflow-hidden rounded-2xl border border-[#C59B27]/30 bg-[#091E16] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                        <div className="grid grid-cols-3 gap-6">
                          {item.columns.map((col, idx) => (
                            <div key={idx} className="space-y-3">
                              <div className="border-b border-[#C59B27]/25 pb-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#C59B27]">
                                {col.heading}
                              </div>
                              <div className="space-y-2">
                                {col.items.map((subItem) => (
                                  <a
                                    key={subItem.href}
                                    href={subItem.href}
                                    className="group/sub block rounded-lg p-2 transition-colors hover:bg-white/[0.06]"
                                  >
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-xs font-semibold text-[#FBFBFA] group-hover/sub:text-[#E4BC4A] transition-colors">
                                        {subItem.label}
                                      </span>
                                      {subItem.badge && (
                                        <span className="rounded bg-[#C59B27]/20 px-1.5 py-0.5 text-[9px] font-mono text-[#E4BC4A]">
                                          {subItem.badge}
                                        </span>
                                      )}
                                    </div>
                                    {subItem.sub && (
                                      <p className="mt-0.5 text-[11px] leading-relaxed text-[#FBFBFA]/60 line-clamp-2">
                                        {subItem.sub}
                                      </p>
                                    )}
                                    {subItem.hsCode && (
                                      <span className="mt-1 inline-block text-[10px] font-mono text-[#C59B27]">
                                        {subItem.hsCode}
                                      </span>
                                    )}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FBFBFA]/90 transition-colors hover:bg-white/[0.08] hover:text-[#E4BC4A]"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          {/* Action CTAs: Bespoke Brass Button with Micro-Hover Sheen */}
          <div className="hidden sm:flex shrink-0 items-center gap-3">
            <SpecSheetDownloadModal
              buttonLabel="2026 Catalog"
              variant="header"
            />

            <RfqModal
              defaultCommodityName="Fresh Red Onion (Nashik)"
              defaultHsCode="07031010"
              triggerLabel="Initiate Trade RFQ / CIF Quotation"
              triggerClassName="inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-lg bg-gradient-to-r from-[#C59B27] via-[#D8AD32] to-[#A67C1E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#091E16] shadow-[0_4px_16px_rgba(197,155,39,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_6px_22px_rgba(197,155,39,0.5)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C59B27]"
            />
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="xl:hidden rounded-lg p-2 text-[#FBFBFA] hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="h-6 w-6 text-[#C59B27]" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="max-h-[85vh] overflow-y-auto bg-[#091E16] border-b border-[#C59B27]/30 text-[#FBFBFA] xl:hidden">
          <div className="flex flex-col gap-2 p-5">
            {INSTITUTIONAL_NAV_MENU.map((group) => (
              <div key={group.label} className="border-b border-white/10 pb-3">
                <a
                  href={group.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-bold uppercase tracking-wider text-[#C59B27]"
                >
                  {group.label}
                </a>
                {group.columns && (
                  <div className="mt-2 space-y-2 pl-3">
                    {group.columns.flatMap((c) => c.items).map((it) => (
                      <a
                        key={it.href}
                        href={it.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md p-1.5 text-xs text-[#FBFBFA]/80 hover:bg-white/10 hover:text-[#E4BC4A]"
                      >
                        <div className="font-semibold">{it.label}</div>
                        {it.sub && <div className="text-[10px] text-white/50">{it.sub}</div>}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-4 flex flex-col gap-3">
              <SpecSheetDownloadModal
                buttonLabel="Download 2026 Master Catalog (PDF)"
                variant="outline"
              />
              <RfqModal
                triggerLabel="Initiate Trade RFQ / CIF Quotation"
                triggerClassName="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#C59B27] to-[#A67C1E] py-3 text-xs font-bold uppercase tracking-wider text-[#091E16] shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
