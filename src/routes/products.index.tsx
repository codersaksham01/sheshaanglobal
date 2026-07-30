import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Search, Package, MessageCircle, Mail, Download } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  BLUE, ORANGE, NAVY, EMAIL, BROCHURE_URL, PRODUCTS, CATALOG, ALL_PRODUCTS,
  buildWhatsAppUrl,
} from "@/lib/site";

const SITE_URL = "https://global-roots-express.lovable.app";
const TITLE = "Products & HS Codes — Indian Agri Export Catalogue | Sheshaan Global";
const DESC =
  "Complete Sheshaan Global export catalogue with HS codes — onions (0703), rice (1006), coconut (0801), green chillies (0709), spices, pulses, fruits, vegetables, nuts and agri commodities shipped to 25+ countries.";

const ease = [0.16, 1, 0.3, 1] as const;

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "Indian agri exporter product list, HS code list export India, onion HS 0703, rice HS 1006, coconut HS 0801, spices exporter India" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/products` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
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
            numberOfItems: ALL_PRODUCTS.length,
            itemListElement: ALL_PRODUCTS.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.hsCode ? `${p.name} (HS ${p.hsCode})` : p.name,
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

function ProductsIndex() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("All");

  const groups = useMemo(
    () => ["All", ...Array.from(new Set(CATALOG.map((c) => c.group ?? "Other")))],
    [],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return CATALOG.filter((c) => {
      if (group !== "All" && (c.group ?? "Other") !== group) return false;
      if (!needle) return true;
      return (
        c.name.toLowerCase().includes(needle) ||
        (c.hsCode ?? "").includes(needle) ||
        c.varieties.join(" ").toLowerCase().includes(needle)
      );
    });
  }, [q, group]);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-28" style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: ORANGE }} />
        <div className="mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="px-2">/</span>
            <span className="text-white/90">Products</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <img src={logo} alt="Sheshaan Global logo" className="h-14 w-14 object-contain sg-float" />
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Export Product Catalogue <span style={{ color: ORANGE }}>with HS Codes</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              {ALL_PRODUCTS.length} export lines across fresh produce, spices, grains, pulses, nuts and agri commodities —
              each with its own detail page covering varieties, packing, standards and inquiry options.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                <MessageCircle className="h-4 w-4" /> Request Price List
              </a>
              <a href={BROCHURE_URL} download className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                <Download className="h-4 w-4" /> Master Catalogue
              </a>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                <Mail className="h-4 w-4" /> {EMAIL}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flagship categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-display text-3xl font-bold" style={{ color: NAVY }}>Priority Export Lines</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Our core categories — onions and green chillies lead our current export programme.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.06, ease }}
            >
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_30px_rgba(4,21,45,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(4,21,45,0.14)]"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={p.img} alt={`${p.name} export from India`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {p.hsCode && (
                    <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold text-white" style={{ background: ORANGE }}>
                      HS {p.hsCode}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold" style={{ color: NAVY }}>{p.name}</h3>
                  <p className="mt-1 text-xs text-slate-600">{p.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: BLUE }}>
                    View details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full catalogue */}
      <section className="border-t bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold" style={{ color: NAVY }}>Full Catalogue & HS Codes</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Search by product name or HS code. Click any item for its dedicated page.</p>

          <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full lg:max-w-sm">
              <span className="sr-only">Search products or HS codes</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search e.g. turmeric or 0910"
                className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[#0057B8]"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <button
                  key={g}
                  onClick={() => setGroup(g)}
                  aria-pressed={group === g}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    group === g ? "border-transparent text-white" : "border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                  style={group === g ? { background: `linear-gradient(135deg,${BLUE},#003c85)` } : undefined}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-[#0057B8]/40 hover:shadow-[0_14px_36px_rgba(4,21,45,0.1)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {p.img ? (
                    <img
                      src={p.img}
                      alt={`${p.name} export product`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <ProductGraphic name={p.name} group={p.group} />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold tracking-wide text-slate-700 shadow-sm">
                    HS {p.hsCode}
                  </span>
                </div>
                <div className="flex flex-col p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}>
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold leading-snug" style={{ color: NAVY }}>{p.name}</h3>
                      <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider" style={{ color: ORANGE }}>{p.group}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">{p.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: BLUE }}>
                    Open product page <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center text-sm text-slate-500">
              No product matches “{q}”. Try another name or HS code, or <Link to="/contact" className="font-semibold" style={{ color: BLUE }}>contact our team</Link>.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

function ProductGraphic({ name, group }: { name: string; group?: string }) {
  return (
    <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_28%_18%,rgba(255,138,0,0.16),transparent_32%),linear-gradient(135deg,#f8fafc,#e2e8f0)] p-6 text-center">
      <div>
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#0057B8] shadow-sm">
          <Package className="h-7 w-7" />
        </div>
        <div className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-500">{group ?? "Product"}</div>
        <div className="mt-1 font-display text-sm font-bold text-slate-700">{name}</div>
      </div>
    </div>
  );
}
