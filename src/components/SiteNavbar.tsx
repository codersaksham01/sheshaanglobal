import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { SpecSheetDownloadModal } from "@/components/SpecSheetDownloadModal";
import { BLUE, ORANGE } from "@/lib/site";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; sub?: string; href: string }[];
}

export const SITE_NAV_MENU: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "All 49 Export Commodities & HS Codes",
        sub: "Complete B2B Export Directory",
        href: "/products",
      },
      {
        label: "Fresh Vegetables",
        sub: "Nashik Red Onions, Green Chillies & Garlic",
        href: "/products/fresh-vegetables/fresh-onion-exporter-india",
      },
      {
        label: "Rice, Grains & Pulses",
        sub: "1121 Basmati, Non-Basmati & Chickpeas",
        href: "/products/grains-pulses/basmati-rice-exporter-india",
      },
      {
        label: "Whole & Ground Spices",
        sub: "Unjha Cumin, Sangli Turmeric & Cardamom",
        href: "/products/spices/cumin-seeds-exporter-india",
      },
      {
        label: "Fresh Fruits & Coconuts",
        sub: "Pollachi Coconuts, Pomegranates & Mangoes",
        href: "/products/fresh-fruits/mature-coconut-exporter-india",
      },
      {
        label: "Dry Fruits & Makhana",
        sub: "Cashews, Raisins & Mithila Fox Nuts",
        href: "/products/dry-fruits/fox-nuts-makhana-exporter-india",
      },
    ],
  },
  {
    label: "Global Trade",
    href: "/exports",
    children: [
      {
        label: "Port-to-Port Export Corridors",
        sub: "Dedicated Shipping Lanes from JNPT & Mundra",
        href: "/exports",
      },
      {
        label: "Global Export Markets",
        sub: "25+ Countries Across GCC, EU, US & Asia",
        href: "/markets",
      },
      {
        label: "India → Dubai / UAE (Jebel Ali)",
        sub: "3–5 Days Reefer & Dry Transit",
        href: "/exports/fresh-onion-exporter-india-to-dubai-uae",
      },
      {
        label: "India → Saudi Arabia (Dammam)",
        sub: "SFDA Cleared 1121 Basmati & Spices",
        href: "/exports/1121-basmati-rice-exporter-to-saudi-arabia-dammam",
      },
      {
        label: "India → USA (New York / NJ)",
        sub: "FDA Prior Notice & ASTA Spices",
        href: "/exports/spices-exporter-to-usa-new-york",
      },
      {
        label: "India → UK & Rotterdam (EU)",
        sub: "EFSA Compliant Coconuts & Produce",
        href: "/exports/mature-coconut-exporter-to-uk-rotterdam",
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      {
        label: "About Sheshaan Global",
        sub: "India-Based Agricultural Export Partner",
        href: "/about",
      },
      {
        label: "Certifications & Quality Assurance",
        sub: "APEDA, FSSAI, CDB, IEC & SGS Inspection",
        href: "/quality",
      },
      {
        label: "Export Process & Logistics",
        sub: "Farm Sourcing to Port Handover",
        href: "/export-process",
      },
      {
        label: "Packaging & Private Label",
        sub: "Export Mesh, Jute, PP & Retail Packs",
        href: "/packaging",
      },
      {
        label: "2026 Crop Calendar & Trade Intel",
        sub: "Seasonality & CHA Customs Protocols",
        href: "/trade-intelligence",
      },
      {
        label: "Company Profile & Policies",
        sub: "Leadership, Banking & Compliance Dossier",
        href: "/more-info",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 20);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 border-b border-slate-200/70 transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
        <a href="/" className="flex shrink-0 items-center gap-3">
          <img
            src={logo}
            alt="Sheshaan Global"
            className="h-12 w-12 object-contain sg-float drop-shadow-[0_4px_10px_rgba(0,87,184,0.25)]"
          />
          <div className="leading-tight">
            <div className="font-display text-xl font-bold tracking-tight" style={{ color: BLUE }}>
              SHESHAAN
            </div>
            <div className="text-[9px] font-semibold tracking-[0.22em]" style={{ color: ORANGE }}>
              EXPORTING GOODNESS WORLDWIDE
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
          {SITE_NAV_MENU.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <a
                  href={item.href}
                  className="inline-flex whitespace-nowrap items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#0057B8]"
                >
                  <span>{item.label}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[#0057B8]" />
                </a>

                {/* Hover / Focus Dropdown Panel */}
                <div className="invisible absolute left-0 top-full z-50 w-80 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 translate-y-1">
                  <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2 shadow-[0_20px_50px_rgba(4,21,45,0.16)] ring-1 ring-black/5">
                    {item.children.map((subItem) => (
                      <a
                        key={subItem.href}
                        href={subItem.href}
                        className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-slate-50"
                      >
                        <div className="text-xs font-bold text-slate-900 hover:text-[#0057B8]">
                          {subItem.label}
                        </div>
                        {subItem.sub && (
                          <div className="mt-0.5 text-[11px] text-slate-500">{subItem.sub}</div>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#0057B8]"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          <SpecSheetDownloadModal buttonLabel="2026 Catalog" variant="header" />
          <a
            href="/contact"
            className="inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
          >
            Get In Touch <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[82vh] overflow-y-auto border-t bg-white lg:hidden">
          <div className="flex flex-col gap-1 p-4">
            {SITE_NAV_MENU.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-slate-100 pb-1 last:border-none">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold text-slate-800 hover:bg-slate-100"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileExpanded === item.label ? "rotate-180 text-[#0057B8]" : "text-slate-400"
                      }`}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="mb-2 ml-4 flex flex-col gap-1 border-l-2 border-slate-200 pl-3">
                      {item.children.map((subItem) => (
                        <a
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0057B8]"
                        >
                          <div className="font-bold text-slate-800">{subItem.label}</div>
                          {subItem.sub && (
                            <div className="text-[11px] text-slate-500">{subItem.sub}</div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                >
                  {item.label}
                </a>
              ),
            )}
            <div className="mt-3 flex flex-col gap-2 px-2 pt-2">
              <SpecSheetDownloadModal buttonLabel="Download 2026 Catalog (PDF)" variant="header" />
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-md"
                style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
              >
                Get In Touch <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
