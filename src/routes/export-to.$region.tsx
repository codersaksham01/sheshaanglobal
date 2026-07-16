import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, MessageCircle, Mail, Ship, Package, ShieldCheck,
  Clock, MapPin, Download, ChevronRight, Award,
} from "lucide-react";
import logo from "@/assets/logo.png";
import {
  BLUE, ORANGE, NAVY, PHONE, EMAIL, BROCHURE_URL, MAILTO_URL,
  PRODUCTS, REGIONS, getRegionBySlug, buildWhatsAppUrl, type Region,
} from "@/lib/site";

const SITE_URL = "https://global-roots-express.lovable.app";

export const Route = createFileRoute("/export-to/$region")({
  loader: ({ params }) => {
    const region = getRegionBySlug(params.region);
    if (!region) throw notFound();
    return { region };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Region not found — Sheshaan Global" }, { name: "robots", content: "noindex" }] };
    }
    const r = loaderData.region;
    const url = `${SITE_URL}/export-to/${params.region}`;
    const title = `Indian Exporter to ${r.name} — Onions, Rice, Spices & More | Sheshaan Global`;
    const desc = r.intro;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: r.keywords.join(", ") },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: r.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
              { "@type": "ListItem", position: 2, name: "Export Markets", item: SITE_URL + "/#countries" },
              { "@type": "ListItem", position: 3, name: r.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: RegionPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-6 text-center">
      <div>
        <div className="font-display text-4xl font-bold text-slate-900">Region not found</div>
        <p className="mt-3 text-slate-600">This export market isn't listed yet.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg" style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}>
          Back to home
        </Link>
      </div>
    </div>
  ),
});

function RegionPage() {
  const { region } = Route.useLoaderData() as { region: Region };
  const topProducts = region.topProducts
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const otherRegions = REGIONS.filter((r) => r.slug !== region.slug);
  const waUrl = buildWhatsAppUrl({
    category: `Exports to ${region.name}`,
    message: `Please share pricing and shipping details for ${region.name}.`,
  });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Sheshaan Global" className="h-9 w-9 object-contain" width={36} height={36} />
            <div className="leading-tight">
              <div className="font-display text-base font-bold" style={{ color: BLUE }}>SHESHAAN</div>
              <div className="text-[9px] font-semibold tracking-[0.2em]" style={{ color: ORANGE }}>EXPORTING GOODNESS</div>
            </div>
          </Link>
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-[#0057B8]">← Home</Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#0057B8]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Export Markets</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-800">{region.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-slate-600">
            <span className="text-base leading-none">{region.flag}</span> Export Market
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Indian Exporter to <span style={{ color: BLUE }}>{region.name}</span>
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-600">{region.hero}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105" style={{ background: "#25D366" }}>
              <MessageCircle className="h-4 w-4" /> Inquire on WhatsApp
            </a>
            <a href={BROCHURE_URL} download="Sheshaan-Global-Catalogue.pdf" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}>
              <Download className="h-4 w-4" /> Download Catalogue
            </a>
            <a href={MAILTO_URL} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm">
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
          </div>

          {/* Stats strip */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <StatCard icon={<Ship className="h-5 w-5" />} label="Serviced ports" value={String(region.ports.length)} sub={region.ports.slice(0, 2).join(" • ")} />
            <StatCard icon={<Clock className="h-5 w-5" />} label="Transit time" value={region.transitDays} sub="From Nhava Sheva (JNPT)" />
            <StatCard icon={<Package className="h-5 w-5" />} label="Incoterms supported" value={String(region.incoterms.length)} sub={region.incoterms.slice(0, 2).join(" • ")} />
          </div>
        </motion.div>
      </section>

      {/* Advantages */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">Why buyers in {region.short} choose Sheshaan Global</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {region.advantages.map((a, i) => (
              <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: `${BLUE}15`, color: BLUE }}>
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{a.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{a.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top products for this region — internal links */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">Top products exported to {region.short}</h2>
            <p className="mt-2 max-w-2xl text-slate-600">Priority items shipped to {region.name} — click any product for varieties, packing, standards and a downloadable brochure.</p>
          </div>
          <Link to="/" hash="products" className="text-sm font-semibold hover:underline" style={{ color: BLUE }}>View all products →</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topProducts.map((p) => (
            <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={`${p.name} exporter to ${region.name}`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <div className="font-display text-lg font-bold text-slate-900">{p.name}</div>
                <div className="mt-1 text-xs text-slate-500">{p.tagline}</div>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: ORANGE }}>
                  View {p.name} for {region.short} <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ports + Incoterms */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${BLUE}15`, color: BLUE }}>
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">Ports we ship into</h2>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {region.ports.map((p) => (
                <li key={p} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700">
                  <Ship className="h-4 w-4" style={{ color: BLUE }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${ORANGE}15`, color: ORANGE }}>
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">Incoterms & documentation</h2>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {region.incoterms.map((i) => (
                <span key={i} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">{i}</span>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-4 text-xs text-white" style={{ background: `linear-gradient(135deg,${NAVY},#062354)` }}>
              Docs per shipment: Commercial Invoice • Packing List • Certificate of Origin • Phytosanitary Certificate • Fumigation Certificate • Bill of Lading • Health Certificate (where applicable).
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">FAQs — Exports to {region.name}</h2>
        <div className="mt-8 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white shadow-sm">
          {region.faqs.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900">
                {f.q}
                <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Other regions internal linking */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-slate-900">Other export markets</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {otherRegions.map((r) => (
              <Link key={r.slug} to="/export-to/$region" params={{ region: r.slug }} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0057B8] hover:text-[#0057B8]">
                <span className="text-base leading-none">{r.flag}</span> Export to {r.short}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 text-white" style={{ background: `linear-gradient(135deg,${NAVY},#062354)` }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to import from India to {region.short}?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">Get a same-day FOB / CIF quote for your target port. Our export desk speaks English, Hindi and Arabic.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg" style={{ background: "#25D366" }}>
              <MessageCircle className="h-4 w-4" /> WhatsApp {PHONE}
            </a>
            <a href={MAILTO_URL} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur">
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
        <span style={{ color: BLUE }}>{icon}</span> {label}
      </div>
      <div className="mt-2 font-display text-xl font-bold text-slate-900">{value}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}
