import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Package,
  MessageCircle,
  Mail,
  Download,
  Copy,
  Check,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Layers,
  BookOpen,
  Info,
  Scale,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import {
  BLUE,
  ORANGE,
  NAVY,
  EMAIL,
  PHONE,
  BROCHURE_URL,
  PRODUCTS,
  CATALOG,
  ALL_PRODUCTS,
  buildWhatsAppUrl,
} from "@/lib/site";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";
import {
  MASTER_COMMODITIES,
  WHEAT_QUALITY_MATRIX,
  GRADE_TERMINOLOGY,
  EXPORT_CHECKLIST,
  OFFICIAL_SOURCES,
  TRADE_GUIDELINES,
  COMMODITY_CATEGORIES,
  type MasterCommoditySpec,
} from "@/lib/master-catalog-data";
import { SpecSheetDownloadModal } from "@/components/SpecSheetDownloadModal";

const TITLE = `Indian Agri Export Catalogue & HS Codes (${MASTER_COMMODITIES.length} SKUs) | Sheshaan Global`;
const DESC =
  `Official technical export catalogue of ${MASTER_COMMODITIES.length} Indian agricultural commodities with HS codes, commercial grades, contract specs, and APEDA compliance: Milling Wheat, Basmati & Non-Basmati Rice, Pulses, Spices, Oilseeds, Fresh Produce, and Processed Commodities.`;

const ease = [0.16, 1, 0.3, 1] as const;

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "Indian agri exporter product list, HS code list export India, onion HS 0703, durum wheat HS 1001, rice HS 1006, coconut HS 0801, spices exporter India, APEDA agricultural export catalogue",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/products` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { property: "og:image:alt", content: `Sheshaan Global ${MASTER_COMMODITIES.length} SKU master export catalogue` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/products` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESC,
          url: `${SITE_URL}/products`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: MASTER_COMMODITIES.length,
            itemListElement: MASTER_COMMODITIES.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${p.name} (HS ${p.hsCode})`,
              url: `${SITE_URL}/products/${p.slug}`,
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
          ],
        }),
      },
    ],
  }),
  component: ProductsIndex,
});

type TabType = "directory" | "specs-table" | "wheat-matrix" | "grade-terms" | "checklist" | "apeda-sources";

function ProductsIndex() {
  const [activeTab, setActiveTab] = useState<TabType>("directory");
  const [q, setQ] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [checkedAuditItems, setCheckedAuditItems] = useState<Record<number, boolean>>({});
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Reset pagination when search query or category filter changes
  useEffect(() => {
    setVisibleCount(24);
  }, [q, selectedCat]);

  // Filtered master commodities for the Directory & Table
  const filteredCommodities = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return MASTER_COMMODITIES.filter((c) => {
      if (selectedCat !== "All" && c.category !== selectedCat) return false;
      if (!needle) return true;
      return (
        c.name.toLowerCase().includes(needle) ||
        c.hsCode.toLowerCase().includes(needle) ||
        c.sku.toLowerCase().includes(needle) ||
        c.category.toLowerCase().includes(needle) ||
        c.varieties.toLowerCase().includes(needle) ||
        c.exportGrades.toLowerCase().includes(needle) ||
        c.exportRegions.toLowerCase().includes(needle)
      );
    });
  }, [q, selectedCat]);

  // Slice displayed items for instant DOM render performance when displaying all
  const displayedCommodities = useMemo(() => {
    if (q.trim()) return filteredCommodities;
    return filteredCommodities.slice(0, visibleCount);
  }, [filteredCommodities, visibleCount, q]);

  const copySpecToClipboard = (item: MasterCommoditySpec) => {
    const text = [
      `SHESHAAN GLOBAL — EXPORT SPECIFICATION SHEET`,
      `Commodity: ${item.name} (SKU: ${item.sku})`,
      `HS Code: ${item.hsCode} | Category: ${item.category}`,
      `Product Form: ${item.productForm}`,
      `Common Export Grades: ${item.exportGrades}`,
      `Verified Varieties: ${item.varieties}`,
      `Core Specifications to Agree: ${item.coreSpecs}`,
      `Illustrative Contract Targets: ${item.contractTargets}`,
      `Target Export Regions: ${item.exportRegions}`,
      `Regulatory & Compliance Notes: ${item.complianceNotes}`,
      `Inquiries: export@sheshaanglobal.com | +91 81499 09546`,
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    toast.success(`Copied specifications for ${item.name}`, {
      description: "Ready to paste into purchase contracts, RFQs, or commercial emails.",
    });
    setTimeout(() => setCopiedId(null), 3000);
  };

  const toggleChecklist = (id: number) => {
    setCheckedAuditItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main className="bg-white">
      {/* Hero */}
      <section
        className="relative overflow-hidden pb-14 pt-28"
        style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
          style={{ background: ORANGE }}
        />
        <div className="mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/60">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-white/90">Products</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <img
              src={logo}
              alt="Sheshaan Global logo"
              className="h-14 w-14 object-contain sg-float"
            />
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>{MASTER_COMMODITIES.length} Master Export Commodities • 8 Sourcing Categories</span>
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Export Product Catalogue <span style={{ color: ORANGE }}>with HS Codes</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              Comprehensive technical catalogue covering {MASTER_COMMODITIES.length} export lines across Cereals &amp; Grains,
              Milled Products, Pulses, Spices, Oilseeds, Fresh Produce, and Processed Commodities.
              Each SKU features verified commercial grades, lab testing parameters, contract targets,
              and APEDA/DGFT trade compliance.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Export Commodities", val: `${MASTER_COMMODITIES.length} SKUs` },
                { label: "Core Categories", val: "8 Sectors" },
                { label: "Lab Verification", val: "100% Pre-Shipment" },
                { label: "Compliance Scope", val: "APEDA & AGMARK" },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/15 bg-white/5 p-3.5 backdrop-blur-sm"
                >
                  <div className="text-[11px] font-medium text-white/70">{m.label}</div>
                  <div className="mt-1 font-display text-lg font-bold text-white">{m.val}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl({
                  category: "Master Export Catalogue Inquiry",
                  message:
                    `Hello Sheshaan Global, I am requesting the latest export price list and technical specifications for your ${MASTER_COMMODITIES.length} agricultural commodities.`,
                })}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
              >
                <MessageCircle className="h-4 w-4" /> Request Price List on WhatsApp
              </a>
              <SpecSheetDownloadModal
                productName={`Sheshaan Global Master Export Catalogue (${MASTER_COMMODITIES.length} SKUs)`}
                hsCode="Chapters 07, 08, 09, 10, 11, 12, 17, 20"
                triggerLabel="Download Master Spec Sheet"
                variant="outline"
              />
              <a
                href={`mailto:${EMAIL}?subject=RFQ%20-%20Agricultural%20Commodities%20Export`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Mail className="h-4 w-4" /> {EMAIL}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Priority Export Lines (6 flagship categories) */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              High-Frequency Freight Corridors
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold" style={{ color: NAVY }}>
              Priority Export Lines
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Continuous weekly sailings from JNPT Nhava Sheva &amp; Mundra for fresh Nashik onions,
              G4 chillies, premium Basmati rice, mature coconuts, and cold-chain produce.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl({
              category: "Priority Export Program",
              message: "I would like to book container allocation for your priority export lines.",
            })}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:underline"
            style={{ color: BLUE }}
          >
            Book Priority Loading Allocation →
          </a>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.slice(0, 6).map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.06, ease }}
            >
              <a
                href={`/products/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_30px_rgba(4,21,45,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(4,21,45,0.14)]"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.name} Exporter in India — Bulk Supply`}
                    width={480}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {p.hsCode && (
                    <span
                      className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold text-white shadow"
                      style={{ background: ORANGE }}
                    >
                      HS {p.hsCode}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold" style={{ color: NAVY }}>
                    {p.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2">{p.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.varieties.slice(0, 3).map((v) => (
                      <span
                        key={v}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: BLUE }}
                    >
                      View Specifications{" "}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600">
                      In Stock / Weekly Sailings
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Master B2B Specification Hub & Tabs */}
      <section className="border-t border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0057B8]">
                <Scale className="h-3.5 w-3.5" /> Institutional Trade Architecture
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold" style={{ color: NAVY }}>
                Master Commodity Catalogue &amp; Specifications
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-600">
                Explore the complete technical database of all {MASTER_COMMODITIES.length} export products, wheat milling
                standards, trade terminology, pre-shipment audit checklists, and official APEDA regulatory portals.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <SpecSheetDownloadModal
                productName={`Complete ${MASTER_COMMODITIES.length}-SKU Agricultural Export Master Specification`}
                hsCode="Chapters 07 to 20"
                triggerLabel="Export Spec Sheet (PDF)"
                variant="primary"
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
            {[
              { id: "directory", label: "Commodity Directory (Grid)", icon: Package, count: `${MASTER_COMMODITIES.length} SKUs` },
              { id: "specs-table", label: "Master Specifications Table", icon: FileText, count: "Full Data" },
              { id: "wheat-matrix", label: "Wheat Quality Matrix", icon: Layers, count: "6 Classes" },
              { id: "grade-terms", label: "Grade Terminology", icon: BookOpen, count: "10 Standards" },
              { id: "checklist", label: "Pre-Shipment Checklist", icon: CheckCircle2, count: "12 Points" },
              { id: "apeda-sources", label: "APEDA Official Portals", icon: ExternalLink, count: "7 Links" },
            ].map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as TabType)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-amber-400" : "text-slate-500"}`} />
                  <span>{t.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Category Filter Controls (Shown on Directory & Table tabs) */}
          {(activeTab === "directory" || activeTab === "specs-table") && (
            <div className="mt-7 flex flex-col gap-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <label className="relative block w-full lg:max-w-md">
                  <span className="sr-only">Search commodities, grades, or HS codes</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search e.g. Durum wheat, 1001, ASTA chilli, or 99.95%..."
                    className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[#0057B8]"
                  />
                  {q && (
                    <button
                      onClick={() => setQ("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </label>
                <div className="text-xs text-slate-500">
                  Showing <strong className="text-slate-900">{displayedCommodities.length}</strong> of{" "}
                  <strong>{filteredCommodities.length}</strong> commodities (Catalogue: {MASTER_COMMODITIES.length} SKUs)
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5">
                {COMMODITY_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCat(cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      selectedCat === cat
                        ? "text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                    }`}
                    style={
                      selectedCat === cat
                        ? { background: `linear-gradient(135deg,${BLUE},#003c85)` }
                        : undefined
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 1: PRODUCT DIRECTORY (GRID) */}
          {activeTab === "directory" && (
            <div className="mt-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedCommodities.map((item) => {
                  const catalogMatch = ALL_PRODUCTS.find((p) => p.slug === item.slug);
                  const img = catalogMatch?.img;
                  const waUrl = buildWhatsAppUrl({
                    category: `${item.name} (HS ${item.hsCode})`,
                    message: `Hello Sheshaan Global, I am requesting quotation and technical specs for ${item.name} (HS Code: ${item.hsCode}).`,
                  });

                  return (
                    <div
                      key={item.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#0057B8]/40 hover:shadow-[0_14px_36px_rgba(4,21,45,0.08)]"
                    >
                      <div>
                        {/* Header Image or Graphic */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          {img ? (
                            <img
                              src={img}
                              alt={`${item.name} Exporter India`}
                              width={400}
                              height={250}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_28%_18%,rgba(0,87,184,0.08),transparent_32%),linear-gradient(135deg,#f8fafc,#e2e8f0)] p-4 text-center">
                              <div>
                                <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-white text-[#0057B8] shadow-sm">
                                  <Package className="h-5 w-5" />
                                </div>
                                <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                  {item.category}
                                </div>
                              </div>
                            </div>
                          )}
                          <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide text-slate-800 shadow-sm">
                            HS {item.hsCode}
                          </span>
                          <span className="absolute right-2.5 top-2.5 rounded-full bg-slate-900/80 px-2 py-0.5 text-[9px] font-bold text-amber-300 backdrop-blur-sm">
                            {item.sku}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                            {item.category}
                          </div>
                          <h3
                            className="mt-1 font-display text-base font-bold leading-snug"
                            style={{ color: NAVY }}
                          >
                            {item.name}
                          </h3>
                          <p className="mt-1.5 text-xs text-slate-600 line-clamp-2">
                            {item.productForm}
                          </p>

                          <div className="mt-3 rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-600">
                            <div className="font-semibold text-slate-800">Export Varieties:</div>
                            <div className="mt-0.5 line-clamp-1">{item.varieties}</div>
                            <div className="mt-1.5 font-semibold text-slate-800">Commercial Calibre:</div>
                            <div className="mt-0.5 line-clamp-1">{item.exportGrades}</div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="border-t border-slate-100 p-3 pt-2">
                        <div className="flex items-center gap-2">
                          <Link
                            to="/products/$slug"
                            params={{ slug: item.slug }}
                            className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-800 hover:border-[#0057B8] hover:text-[#0057B8]"
                          >
                            Full Specs <ArrowRight className="h-3 w-3" />
                          </Link>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
                            title="Request quotation on WhatsApp"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                          </a>
                          <button
                            onClick={() => copySpecToClipboard(item)}
                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                            title="Copy technical specifications"
                          >
                            {copiedId === item.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5 text-slate-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {displayedCommodities.length < filteredCommodities.length && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 24)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 hover:border-[#0057B8]"
                  >
                    Load Next 24 Commodities ({filteredCommodities.length - displayedCommodities.length} remaining)
                  </button>
                  <button
                    onClick={() => setVisibleCount(filteredCommodities.length)}
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:opacity-90"
                    style={{ background: BLUE }}
                  >
                    Show All {filteredCommodities.length} Commodities
                  </button>
                </div>
              )}

              {filteredCommodities.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                  <Package className="mx-auto h-8 w-8 text-slate-400" />
                  <div className="mt-3 font-display text-lg font-bold text-slate-800">
                    No commodities match “{q}”
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Try another search term or reset your category filter.
                  </p>
                  <button
                    onClick={() => {
                      setQ("");
                      setSelectedCat("All");
                    }}
                    className="mt-4 rounded-full px-4 py-2 text-xs font-bold text-white"
                    style={{ background: BLUE }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MASTER TECHNICAL SPECIFICATIONS TABLE */}
          {activeTab === "specs-table" && (
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0057B8]" />
                  <div>
                    <strong className="text-slate-900">Commercial Standard Disclaimer:</strong> Numeric
                    parameters below are illustrative contract guidelines based on APEDA, AGMARK, and
                    established Indian export trade practices. Exact tolerances, test methods, and MRL
                    thresholds are confirmed per contract via accredited lab COA (NABL / SGS / Geo-Chem).
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-100 font-semibold text-slate-700">
                    <tr>
                      <th className="px-4 py-3.5">Commodity &amp; SKU</th>
                      <th className="px-3 py-3.5">Category &amp; HS</th>
                      <th className="px-4 py-3.5">Product Form</th>
                      <th className="px-4 py-3.5">Export Grades &amp; Varieties</th>
                      <th className="px-4 py-3.5">Core Specifications to Agree</th>
                      <th className="px-4 py-3.5">Contract Targets (Illustrative)</th>
                      <th className="px-4 py-3.5">Indicative Markets</th>
                      <th className="px-4 py-3.5">Compliance &amp; Policy</th>
                      <th className="px-3 py-3.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {filteredCommodities.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3.5 align-top font-medium text-slate-900">
                          <Link
                            to="/products/$slug"
                            params={{ slug: item.slug }}
                            className="font-bold text-slate-900 hover:text-[#0057B8]"
                          >
                            {item.name}
                          </Link>
                          <div className="mt-0.5 text-[10px] text-slate-500 font-mono">
                            {item.sku}
                          </div>
                        </td>
                        <td className="px-3 py-3.5 align-top whitespace-nowrap">
                          <span className="inline-block rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#0057B8]">
                            HS {item.hsCode}
                          </span>
                          <div className="mt-1 text-[10px] text-slate-500">{item.category}</div>
                        </td>
                        <td className="px-4 py-3.5 align-top max-w-[180px]">
                          {item.productForm}
                        </td>
                        <td className="px-4 py-3.5 align-top max-w-[200px]">
                          <div className="font-semibold text-slate-800">{item.exportGrades}</div>
                          <div className="mt-1 text-[11px] text-slate-500">Var: {item.varieties}</div>
                        </td>
                        <td className="px-4 py-3.5 align-top max-w-[220px]">
                          {item.coreSpecs}
                        </td>
                        <td className="px-4 py-3.5 align-top max-w-[220px]">
                          <span className="font-medium text-slate-800">{item.contractTargets}</span>
                        </td>
                        <td className="px-4 py-3.5 align-top max-w-[160px] text-[11px]">
                          {item.exportRegions}
                        </td>
                        <td className="px-4 py-3.5 align-top max-w-[200px] text-[11px] text-amber-800">
                          {item.complianceNotes}
                        </td>
                        <td className="px-3 py-3.5 align-top whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => copySpecToClipboard(item)}
                              className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-100"
                              title="Copy full spec text"
                            >
                              {copiedId === item.id ? (
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                            <a
                              href={buildWhatsAppUrl({
                                category: `${item.name} (HS ${item.hsCode})`,
                                message: `Inquiring for bulk export order: ${item.name} (HS ${item.hsCode}). Targets: ${item.contractTargets}.`,
                              })}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg bg-emerald-600 p-1.5 text-white hover:bg-emerald-700"
                              title="Inquire via WhatsApp"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: WHEAT QUALITY MATRIX */}
          {activeTab === "wheat-matrix" && (
            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-xs text-amber-900">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-amber-700" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-amber-950">
                      Indian Wheat Quality &amp; DGFT Export Policy Governance
                    </h3>
                    <p className="mt-1 leading-relaxed">
                      Commercial wheat contracts must specify the exact botanical species (Triticum aestivum vs. Triticum durum),
                      certified test laboratory methods (ICC / ISO / BIS), protein testing basis (12% vs. 14% moisture basis),
                      and current DGFT export policy notifications. Never treat domestic APMC mandi grade shorthand as a universal
                      international grain standard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-100 font-semibold text-slate-700">
                    <tr>
                      <th className="px-4 py-3.5">Wheat Class</th>
                      <th className="px-4 py-3.5">Commercial Grade / Type</th>
                      <th className="px-4 py-3.5">Intended Industrial Use</th>
                      <th className="px-4 py-3.5">Specifications to Test</th>
                      <th className="px-4 py-3.5">Illustrative Target / Standard</th>
                      <th className="px-4 py-3.5">Potential Market Scope</th>
                      <th className="px-4 py-3.5">Cautionary Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {WHEAT_QUALITY_MATRIX.map((w) => (
                      <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3.5 align-top font-bold text-slate-900">
                          {w.wheatClass}
                        </td>
                        <td className="px-4 py-3.5 align-top font-medium text-slate-800">
                          {w.gradeType}
                        </td>
                        <td className="px-4 py-3.5 align-top text-slate-600">
                          {w.intendedUse}
                        </td>
                        <td className="px-4 py-3.5 align-top max-w-[220px]">
                          {w.testSpecs}
                        </td>
                        <td className="px-4 py-3.5 align-top max-w-[200px] font-semibold text-slate-800">
                          {w.standardTarget}
                        </td>
                        <td className="px-4 py-3.5 align-top max-w-[160px] text-slate-600">
                          {w.marketScope}
                        </td>
                        <td className="px-4 py-3.5 align-top max-w-[220px] text-amber-800">
                          {w.caution}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <div>
                  <h4 className="font-display text-sm font-bold text-slate-900">
                    Need a custom wheat milling specification?
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Our quality team provides pre-shipment grain sizing, wet gluten, falling number, and hectolitre test assays.
                  </p>
                </div>
                <a
                  href={buildWhatsAppUrl({
                    category: "Wheat Milling Specs Inquiry",
                    message: "Requesting technical consultation and COA for Indian milling / durum wheat contracts.",
                  })}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow"
                  style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
                >
                  Consult Wheat Specialist on WhatsApp →
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: GRADE TERMINOLOGY & STANDARDS */}
          {activeTab === "grade-terms" && (
            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600">
                <h3 className="font-display text-sm font-bold text-slate-900">
                  Global Trade Terminology &amp; Specifying Best Practices
                </h3>
                <p className="mt-1 leading-relaxed">
                  Misunderstandings in international commodity contracts arise when informal trade shorthand is used
                  instead of standardized, verifiable parameters. The glossary below outlines how to write airtight
                  purchase specifications for key Indian export commodities.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {GRADE_TERMINOLOGY.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#0057B8]/40 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-extrabold text-[#0057B8]">
                          {item.term}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {item.products}
                        </span>
                      </div>
                      <div className="mt-3 font-display text-sm font-bold text-slate-900">
                        {item.meaning}
                      </div>
                      <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                        <div className="font-semibold text-slate-900">How to Specify in Contract:</div>
                        <div className="mt-1 text-slate-600">{item.howToSpecify}</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-700 font-semibold">✓ Verified Trade Protocol</span>
                      <a
                        href={buildWhatsAppUrl({
                          category: `Specification Query: ${item.term}`,
                          message: `Hi, I would like to clarify contract specifications for ${item.term} (${item.products}).`,
                        })}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-[#0057B8] hover:underline"
                      >
                        Ask Export Desk →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRE-SHIPMENT AUDIT CHECKLIST */}
          {activeTab === "checklist" && (
            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-xs text-emerald-950">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-emerald-950">
                      12-Point Institutional Pre-Shipment Verification Protocol
                    </h3>
                    <p className="mt-1 leading-relaxed">
                      Every commercial export consignment processed through Sheshaan Global undergoes this 12-point
                      verification protocol prior to container stuffing and issuance of the bill of lading. Buyers can
                      use this interactive checklist to confirm their specific contractual requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {EXPORT_CHECKLIST.map((chk) => {
                  const isChecked = checkedAuditItems[chk.id] ?? false;
                  return (
                    <div
                      key={chk.id}
                      onClick={() => toggleChecklist(chk.id)}
                      className={`cursor-pointer rounded-2xl border p-4.5 transition-all ${
                        isChecked
                          ? "border-emerald-500 bg-emerald-50/40 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs font-bold transition-colors ${
                            isChecked
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-slate-300 bg-white text-transparent"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-sm font-bold text-slate-900">
                              {chk.area}
                            </span>
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500">
                              Point #{chk.id}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                            {chk.confirmationPoint}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <div className="text-xs text-slate-500">
                  Checked <strong>{Object.values(checkedAuditItems).filter(Boolean).length}</strong> of{" "}
                  <strong>{EXPORT_CHECKLIST.length}</strong> pre-shipment checkpoints
                </div>
                <div className="mt-3 flex justify-center gap-3">
                  <a
                    href={buildWhatsAppUrl({
                      category: "Pre-Shipment Audit Inquiry",
                      message: "I am reviewing your 12-point pre-shipment export checklist for an upcoming purchase order.",
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                  >
                    Confirm Order Audit via WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: OFFICIAL APEDA & REGULATORY PORTALS */}
          {activeTab === "apeda-sources" && (
            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600">
                <h3 className="font-display text-sm font-bold text-slate-900">
                  Official Statutory &amp; Regulatory Verification Links
                </h3>
                <p className="mt-1 leading-relaxed">
                  For cross-border due diligence, import tariff verification, and real-time phytosanitary advisories,
                  buyers and customs clearing agents can reference these official Government of India resources:
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {OFFICIAL_SOURCES.map((src) => (
                  <div
                    key={src.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#0057B8]/40 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-bold text-slate-900">
                          {src.source}
                        </span>
                        <ExternalLink className="h-4 w-4 text-slate-400" />
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {src.whyConsult}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0057B8] hover:underline"
                      >
                        Visit Official Portal <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trade Guidelines */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h4 className="font-display text-base font-bold text-slate-900">
                  Commercial Sourcing &amp; Compliance Notes
                </h4>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {TRADE_GUIDELINES.map((g) => (
                    <div key={g.id} className="rounded-xl bg-slate-50 p-4 text-xs">
                      <div className="font-bold text-slate-900">{g.topic}</div>
                      <div className="mt-1.5 text-slate-600 leading-relaxed">{g.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
