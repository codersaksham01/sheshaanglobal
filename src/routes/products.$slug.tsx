import { createFileRoute, Link, Outlet, notFound, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  MessageCircle,
  Mail,
  ShieldCheck,
  Package,
  Sparkles,
  Award,
  ChevronRight,
  FileText,
  Eye,
  Loader2,
  Anchor,
  ClipboardCheck,
  Factory,
  Globe2,
  Layers3,
  Timer,
  Truck,
  Warehouse,
} from "lucide-react";
import logo from "@/assets/logo.png";
import {
  BLUE,
  ORANGE,
  NAVY,
  PHONE,
  EMAIL,
  BROCHURE_URL,
  MAILTO_URL,
  PRODUCTS,
  REGIONS,
  getProductBySlug,
  buildWhatsAppUrl,
  faqsForProduct,
  type Product,
} from "@/lib/site";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found — Sheshaan Global" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.product;
    const url = `${SITE_URL}/products/${params.slug}`;
    const previewImage = p.gallery[0] || p.img || "/logo.png";
    const img = absoluteUrl(previewImage);
    const title = `${p.name} Exporter from India - ${SITE_NAME}`;
    const desc = `${p.tagline}. Export-grade ${p.name.toLowerCase()} from India with packing options, standards, certifications and direct inquiry. Sheshaan Global ships to 25+ countries.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content: `${p.name} exporter India, ${p.name} wholesale, ${p.name} supplier, Sheshaan Global, ${p.varieties.join(", ")}`,
        },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: img },
        {
          property: "og:image:alt",
          content: `${p.name} export product supplied by Sheshaan Global`,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            ...(p.hsCode ? { sku: `HS-${p.hsCode}` } : {}),
            image: (p.gallery.length ? p.gallery : [p.img || "/logo.png"]).map((g) =>
              absoluteUrl(g),
            ),
            category: p.name,
            brand: { "@type": "Brand", name: SITE_NAME },
            manufacturer: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
            audience: {
              "@type": "BusinessAudience",
              audienceType: "Importers, wholesalers, distributors and retail buyers",
            },
            potentialAction: {
              "@type": "QuoteAction",
              target: absoluteUrl(`/contact?product=${encodeURIComponent(p.name)}`),
              name: `Request ${p.name} export quotation`,
            },
            additionalProperty: [
              { "@type": "PropertyValue", name: "Varieties", value: p.varieties.join(", ") },
              { "@type": "PropertyValue", name: "Packing", value: p.packing.join(", ") },
              { "@type": "PropertyValue", name: "Standards", value: p.standards.join(", ") },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
              { "@type": "ListItem", position: 2, name: "Products", item: SITE_URL + "/products" },
              { "@type": "ListItem", position: 3, name: p.name, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqsForProduct(p.name, p.varieties).map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: ProductPage,

  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-6 text-center">
      <div>
        <div className="font-display text-4xl font-bold text-slate-900">Product not found</div>
        <p className="mt-3 text-slate-600">The product you're looking for isn't listed.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
          style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [active, setActive] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "packing" | "documents" | "markets">(
    "overview",
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);
  // Some browsers (notably iOS Safari) never fire load/error on a PDF iframe.
  // Clear the spinner after a short grace period so the dialog is never stuck.
  useEffect(() => {
    if (!previewOpen) return;
    const t = setTimeout(() => setPdfLoading(false), 8000);
    return () => clearTimeout(t);
  }, [previewOpen]);
  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  const waUrl = buildWhatsAppUrl({ category: product.name });
  const brochureUrl = product.brochure ?? BROCHURE_URL;
  const brochureName =
    product.brochureName ?? `Sheshaan-Global-${product.name.replace(/\s+/g, "-")}.pdf`;
  const specs = getProductSpecs(product);
  const documents = [
    "Commercial Invoice",
    "Packing List",
    "Certificate of Origin",
    "Phytosanitary Certificate",
    "Fumigation Certificate",
    "Bill of Lading",
    "Health Certificate if required",
  ];
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "packing", label: "Packing" },
    { id: "documents", label: "Documents" },
    { id: "markets", label: "Markets" },
  ] as const;
  if (pathname.includes("/export-to/")) return <Outlet />;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Slim header */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Sheshaan Global" className="h-9 w-9 object-contain" />
            <div className="leading-tight">
              <div className="font-display text-base font-bold" style={{ color: BLUE }}>
                SHESHAAN
              </div>
              <div className="text-[9px] font-semibold tracking-[0.2em]" style={{ color: ORANGE }}>
                EXPORTING GOODNESS
              </div>
            </div>
          </Link>
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-[#0057B8]">
            ← All products
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#0057B8]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/products" className="hover:text-[#0057B8]">
            Products
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-800">{product.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-8 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-xl"
          >
            {product.gallery[active] ? (
              <img
                src={product.gallery[active]}
                alt={`${product.name} export product from India`}
                width={900}
                height={900}
                loading={active === 0 ? "eager" : "lazy"}
                fetchPriority={active === 0 ? "high" : "auto"}
                decoding="async"
                className="aspect-square w-full object-cover"
              />
            ) : (
              <ProductGraphic name={product.name} group={product.group} />
            )}
          </motion.div>
          {product.gallery.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                    active === i
                      ? "border-[#FF8A00] shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={g}
                    alt={`${product.name} gallery ${i + 1}`}
                    width={180}
                    height={180}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-slate-600">
            <Sparkles className="h-3.5 w-3.5" style={{ color: ORANGE }} /> Export Grade
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg" style={{ color: ORANGE }}>
            {product.tagline}
          </p>
          {product.hsCode && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-700">
              HS Code <span style={{ color: ORANGE }}>{product.hsCode}</span>
            </div>
          )}
          <p className="mt-6 text-slate-600">{product.description}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              { icon: ClipboardCheck, label: "Inspection", value: specs.inspection },
              { icon: Timer, label: "Lead time", value: specs.leadTime },
              { icon: Truck, label: "Mode", value: specs.mode },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <s.icon className="h-5 w-5" style={{ color: BLUE }} />
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {s.label}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Varieties */}
          <div className="mt-8">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Varieties
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.varieties.map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
              style={{ background: "#25D366" }}
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Inquire on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                setPdfLoading(true);
                setPreviewOpen(true);
              }}
              aria-haspopup="dialog"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#0057B8] bg-white px-6 py-3.5 text-sm font-semibold text-[#0057B8] shadow-sm transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0057B8]/30"
            >
              <Eye className="h-4 w-4" aria-hidden /> Preview Brochure
            </button>
            <a
              href={brochureUrl}
              download={brochureName}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8A00]/40"
              style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}
            >
              <Download className="h-4 w-4" aria-hidden /> Download {product.name} Brochure
            </a>
            <a
              href={MAILTO_URL}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8]"
            >
              <Mail className="h-4 w-4" aria-hidden /> Email Us
            </a>
          </div>

          {/* Brochure preview dialog */}
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogContent className="max-h-[92vh] max-w-4xl overflow-hidden p-0 sm:rounded-2xl">
              <DialogHeader className="border-b border-slate-100 px-5 py-4 text-left">
                <DialogTitle className="flex items-center gap-2 font-display text-lg font-bold text-slate-900">
                  <FileText className="h-5 w-5" style={{ color: ORANGE }} aria-hidden />
                  {product.name} — Product Brochure Preview
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Browse the {product.name.toLowerCase()} brochure below or download the PDF to keep
                  a copy.
                </DialogDescription>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={brochureUrl}
                    download={brochureName}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-white shadow"
                    style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}
                  >
                    <Download className="h-4 w-4" aria-hidden /> Download PDF
                  </a>
                  <a
                    href={brochureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-[#0057B8] hover:text-[#0057B8]"
                  >
                    <Eye className="h-4 w-4" aria-hidden /> Open in new tab
                  </a>
                </div>
              </DialogHeader>
              <div className="relative h-[70vh] bg-slate-100">
                {pdfLoading && (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-slate-100/90">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading brochure
                      preview…
                    </div>
                  </div>
                )}
                <iframe
                  title={`${product.name} Brochure`}
                  src={`${brochureUrl}#view=FitH`}
                  onLoad={() => setPdfLoading(false)}
                  onError={() => setPdfLoading(false)}
                  className="h-full w-full border-0"
                />
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </section>

      {/* Premium product intelligence */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  activeTab === t.id
                    ? "border-transparent text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-[#0057B8]"
                }`}
                style={
                  activeTab === t.id
                    ? { background: `linear-gradient(135deg,${BLUE},#003c85)` }
                    : undefined
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <div
                className="text-xs font-bold uppercase tracking-[0.24em]"
                style={{ color: ORANGE }}
              >
                Buyer Specification Sheet
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold text-slate-900">
                {product.name} export readiness
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Use this quick specification view to shortlist products before requesting FOB, CFR
                or CIF pricing.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Factory, k: "Origin", v: specs.origin },
                  { icon: ClipboardCheck, k: "Inspection", v: specs.inspection },
                  { icon: Warehouse, k: "Shelf life", v: specs.shelfLife },
                  { icon: Anchor, k: "Loading ports", v: "JNPT, Mundra, Chennai" },
                ].map((item) => (
                  <div key={item.k} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <item.icon className="h-5 w-5" style={{ color: BLUE }} />
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.k}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">{item.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              {activeTab === "overview" && (
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    Commercial overview
                  </h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <InfoList title="Primary varieties" items={product.varieties} />
                    <InfoList title="Export standards" items={product.standards} />
                  </div>
                </div>
              )}
              {activeTab === "packing" && (
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    Packing and container planning
                  </h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <InfoList title="Packing options" items={product.packing} />
                    <InfoList
                      title="Shipment capability"
                      items={[
                        specs.mode,
                        specs.container,
                        "Private label on request",
                        "Pre-shipment photos shared",
                      ]}
                    />
                  </div>
                </div>
              )}
              {activeTab === "documents" && (
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    Documents per shipment
                  </h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {documents.map((d) => (
                      <div
                        key={d}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                      >
                        <FileText className="h-4 w-4" style={{ color: ORANGE }} />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "markets" && (
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    Priority export markets
                  </h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {REGIONS.slice(0, 8).map((r) => (
                      <Link
                        key={r.slug}
                        to="/products/$slug/export-to/$region"
                        params={{ slug: product.slug, region: r.slug }}
                        className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-[#0057B8] hover:bg-white"
                      >
                        <span>
                          <span className="mr-2">{r.flag}</span>
                          {product.name} to {r.short}
                        </span>
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          style={{ color: BLUE }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Packing + Standards */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className="grid h-11 w-11 place-items-center rounded-xl"
                style={{ background: `${BLUE}15`, color: BLUE }}
              >
                <Package className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">Packing Options</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {product.packing.map((p) => (
                <li key={p} className="flex items-start gap-3 text-slate-700">
                  <div
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: ORANGE }}
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600">
              Custom packaging & private label supported for bulk buyers.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className="grid h-11 w-11 place-items-center rounded-xl"
                style={{ background: `${ORANGE}15`, color: ORANGE }}
              >
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">Export Standards</h2>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {product.standards.map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700"
                >
                  <Award className="h-4 w-4 flex-shrink-0" style={{ color: BLUE }} />
                  {s}
                </div>
              ))}
            </div>
            <div
              className="mt-6 rounded-2xl p-4 text-xs text-white"
              style={{ background: `linear-gradient(135deg,${NAVY},#062354)` }}
            >
              Documentation: Phytosanitary, COO, Health Cert, Fumigation, Invoice & Packing List
              provided per shipment.
            </div>
            <Link
              to="/"
              search={{ cat: product.name }}
              hash="certs"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0057B8] hover:text-[#0057B8]"
            >
              <ShieldCheck className="h-4 w-4" style={{ color: ORANGE }} />
              View {product.name} Certifications
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold text-slate-900">Related Products</h2>
          <Link
            to="/products"
            className="hidden text-sm font-semibold hover:underline sm:block"
            style={{ color: BLUE }}
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <Link
              key={r.slug}
              to="/products/$slug"
              params={{ slug: r.slug }}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={r.img}
                  alt={`${r.name} export product`}
                  width={360}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <div className="font-display text-sm font-semibold text-slate-900">{r.name}</div>
                <div
                  className="grid h-8 w-8 place-items-center rounded-full transition-colors group-hover:bg-[#0057B8] group-hover:text-white"
                  style={{ background: `${BLUE}12`, color: BLUE }}
                >
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ — with FAQPage JSON-LD in head() */}
      <section className="mx-auto max-w-4xl px-6 pb-4">
        <h2 className="font-display text-3xl font-bold text-slate-900">
          Frequently asked about {product.name}
        </h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white shadow-sm">
          {faqsForProduct(product.name, product.varieties).map((f) => (
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

      {/* Export markets — internal linking */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">Export {product.name} to</h2>
        <p className="mt-2 text-sm text-slate-600">
          Region-specific pages with ports, incoterms and transit times.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {REGIONS.map((r) => (
            <Link
              key={r.slug}
              to="/export-to/$region"
              params={{ region: r.slug }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0057B8] hover:text-[#0057B8]"
            >
              <span className="text-base leading-none">{r.flag}</span> {product.name} to {r.short}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* Footer band */}
      <section className="py-14 text-white" style={{ background: NAVY }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to place an order?</h2>
          <p className="mt-3 text-white/70">
            Talk to our export team about {product.name} — pricing, packing and shipment terms.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-lg"
            >
              <MessageCircle className="h-4 w-4" style={{ color: "#25D366" }} /> WhatsApp {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white"
            >
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductGraphic({ name, group }: { name: string; group?: string }) {
  return (
    <div className="grid aspect-square w-full place-items-center bg-[radial-gradient(circle_at_28%_18%,rgba(255,138,0,0.16),transparent_32%),linear-gradient(135deg,#f8fafc,#e2e8f0)] p-8 text-center">
      <div>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white text-[#0057B8] shadow-sm">
          <Package className="h-10 w-10" />
        </div>
        <div className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">
          {group ?? "Product"}
        </div>
        <div className="mt-2 font-display text-xl font-bold text-slate-700">{name}</div>
      </div>
    </div>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{title}</div>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: ORANGE }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function getProductSpecs(product: Product) {
  const name = product.name.toLowerCase();
  const isFresh =
    /fresh|onion|chill|vegetable|fruit|banana|grape|mango|lemon|orange|tomato|okra|coconut/.test(
      name,
    );
  const isSpice =
    /spice|masala|cumin|turmeric|chilli|pepper|cardamom|fenugreek|ginger|garlic|curry/.test(name);
  const isGrain = /rice|wheat|maize|pulse|lentil|dal|chickpea|soyabean/.test(name);
  return {
    leadTime: isFresh ? "3-7 days after PI" : "7-14 days after PI",
    mode: isFresh ? "Reefer / ambient sea, air" : "Ambient sea and air",
    container: isFresh ? "20' / 40' reefer or ventilated container" : "20' / 40' dry container",
    origin: isSpice
      ? "Origin belts across Gujarat, Rajasthan, Kerala and Maharashtra"
      : isGrain
        ? "Verified mills and processors across India"
        : "Mapped farms and approved packhouses across India",
    inspection: isSpice
      ? "Sortex, moisture and residue checks"
      : isFresh
        ? "Size, colour, damage and shelf-life checks"
        : "Purity, moisture and foreign-matter checks",
    shelfLife: isFresh
      ? "Product dependent, handled for export transit"
      : "6-12 months when stored correctly",
  };
}
