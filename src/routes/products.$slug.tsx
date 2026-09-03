import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowLeft, ArrowRight, Download, MessageCircle, Mail, ShieldCheck,
  Package, Sparkles, Award, ChevronRight, FileText, Eye, Loader2,
} from "lucide-react";
import logo from "@/assets/logo.png";
import {
  BLUE, ORANGE, NAVY, PHONE, EMAIL, BROCHURE_URL, MAILTO_URL,
  PRODUCTS, REGIONS, getProductBySlug, buildWhatsAppUrl, faqsForProduct, type Product,
} from "@/lib/site";
import { adminProductToProduct, type AdminState } from "@/lib/admin-content";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    return { product, slug: params.slug };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Sheshaan Global" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    if (!p) return { meta: [{ title: "Product - Sheshaan Global" }, { name: "robots", content: "noindex" }] };
    const SITE_URL = "https://global-roots-express.lovable.app";
    const url = `${SITE_URL}/products/${params.slug}`;
    const previewImage = p.gallery[0] || p.img || "/logo.png";
    const img = previewImage.startsWith("http") ? previewImage : `${SITE_URL}${previewImage}`;
    const title = `${p.name} Exporter from India — Sheshaan Global`;
    const desc = `${p.tagline}. Export-grade ${p.name.toLowerCase()} from India — packing, standards, certifications and direct inquiry. Sheshaan Global ships to 25+ countries.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `${p.name} exporter India, ${p.name} wholesale, ${p.name} supplier, Sheshaan Global, ${p.varieties.join(", ")}` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: img },
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
            image: (p.gallery.length ? p.gallery : [p.img || "/logo.png"]).map((g) => (g.startsWith("http") ? g : `${SITE_URL}${g}`)),
            category: p.name,
            brand: { "@type": "Brand", name: "Sheshaan Global" },
            manufacturer: { "@type": "Organization", name: "Sheshaan Global" },
            offers: {
              "@type": "AggregateOffer",
              availability: "https://schema.org/InStock",
              priceCurrency: "USD",
              seller: { "@type": "Organization", name: "Sheshaan Global" },
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
              { "@type": "ListItem", position: 2, name: "Products", item: SITE_URL + "/#products" },
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
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg" style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}>
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { product: initialProduct, slug } = Route.useLoaderData() as { product?: Product; slug: string };
  const [liveProduct, setLiveProduct] = useState<Product | undefined>(initialProduct);
  const [active, setActive] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);
  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.ok ? res.json() : Promise.reject(new Error("No live content")))
      .then((payload: { content?: AdminState | null }) => {
        const adminProduct = payload.content?.products.find((p) => p.slug === slug && p.status === "Published");
        if (adminProduct) setLiveProduct(adminProductToProduct(adminProduct));
      })
      .catch(() => undefined);
  }, [slug]);
  // Some browsers (notably iOS Safari) never fire load/error on a PDF iframe.
  // Clear the spinner after a short grace period so the dialog is never stuck.
  useEffect(() => {
    if (!previewOpen) return;
    const t = setTimeout(() => setPdfLoading(false), 8000);
    return () => clearTimeout(t);
  }, [previewOpen]);
  if (!liveProduct) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-6 text-center">
        <div>
          <div className="font-display text-4xl font-bold text-slate-900">Product not found</div>
          <p className="mt-3 text-slate-600">The product you're looking for is not published yet.</p>
          <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg" style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}>
            <ArrowLeft className="h-4 w-4" /> Back to products
          </Link>
        </div>
      </div>
    );
  }

  const product = liveProduct;
  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  const waUrl = buildWhatsAppUrl({ category: product.name });
  const brochureUrl = product.brochure ?? BROCHURE_URL;
  const brochureName = product.brochureName ?? `Sheshaan-Global-${product.name.replace(/\s+/g, "-")}.pdf`;


  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Slim header */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Sheshaan Global" className="h-9 w-9 object-contain" />
            <div className="leading-tight">
              <div className="font-display text-base font-bold" style={{ color: BLUE }}>SHESHAAN</div>
              <div className="text-[9px] font-semibold tracking-[0.2em]" style={{ color: ORANGE }}>EXPORTING GOODNESS</div>
            </div>
          </Link>
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-[#0057B8]">← All products</Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#0057B8]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/products" className="hover:text-[#0057B8]">Products</Link>
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
              <img src={product.gallery[active]} alt={product.name} className="aspect-square w-full object-cover" />
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
                  active === i ? "border-[#FF8A00] shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={g} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
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
          <p className="mt-3 text-lg" style={{ color: ORANGE }}>{product.tagline}</p>
          {product.hsCode && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">
              HS Code <span style={{ color: ORANGE }}>{product.hsCode}</span>
            </div>
          )}
          <p className="mt-6 text-slate-600">{product.description}</p>

          {/* Varieties */}
          <div className="mt-8">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Varieties</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.varieties.map((v) => (
                <span key={v} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">{v}</span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/request-quote"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8A00]/40"
              style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}>
              <FileText className="h-4 w-4" aria-hidden /> Request Detailed Quote
            </Link>
            <a href={waUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
              style={{ background: "#25D366" }}>
              <MessageCircle className="h-4 w-4" aria-hidden /> Inquire on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => { setPdfLoading(true); setPreviewOpen(true); }}
              aria-haspopup="dialog"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#0057B8] bg-white px-6 py-3.5 text-sm font-semibold text-[#0057B8] shadow-sm transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0057B8]/30"
            >
              <Eye className="h-4 w-4" aria-hidden /> Preview Brochure
            </button>
            <a href={brochureUrl} download={brochureName}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8A00]/40"
              style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}>
              <Download className="h-4 w-4" aria-hidden /> Download {product.name} Brochure
            </a>
            <a href={MAILTO_URL}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8]">
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
                  Browse the {product.name.toLowerCase()} brochure below or download the PDF to keep a copy.
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
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading brochure preview…
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
              <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${BLUE}15`, color: BLUE }}>
                <Package className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">Packing Options</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {product.packing.map((p) => (
                <li key={p} className="flex items-start gap-3 text-slate-700">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: ORANGE }} />
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
              <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${ORANGE}15`, color: ORANGE }}>
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">Export Standards</h2>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {product.standards.map((s) => (
                <div key={s} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700">
                  <Award className="h-4 w-4 flex-shrink-0" style={{ color: BLUE }} />
                  {s}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-4 text-xs text-white" style={{ background: `linear-gradient(135deg,${NAVY},#062354)` }}>
              Documentation: Phytosanitary, COO, Health Cert, Fumigation, Invoice & Packing List provided per shipment.
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
          <Link to="/products" className="hidden text-sm font-semibold hover:underline sm:block" style={{ color: BLUE }}>
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <Link key={r.slug} to="/products/$slug" params={{ slug: r.slug }}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl">
              <div className="aspect-square overflow-hidden">
                <img src={r.img} alt={r.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <div className="font-display text-sm font-semibold text-slate-900">{r.name}</div>
                <div className="grid h-8 w-8 place-items-center rounded-full transition-colors group-hover:bg-[#0057B8] group-hover:text-white" style={{ background: `${BLUE}12`, color: BLUE }}>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ — with FAQPage JSON-LD in head() */}
      <section className="mx-auto max-w-4xl px-6 pb-4">
        <h2 className="font-display text-3xl font-bold text-slate-900">Frequently asked about {product.name}</h2>
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
        <p className="mt-2 text-sm text-slate-600">Region-specific pages with ports, incoterms and transit times.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {REGIONS.map((r) => (
            <Link key={r.slug} to="/export-to/$region" params={{ region: r.slug }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0057B8] hover:text-[#0057B8]">
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
          <p className="mt-3 text-white/70">Talk to our export team about {product.name} — pricing, packing and shipment terms.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={waUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-lg">
              <MessageCircle className="h-4 w-4" style={{ color: "#25D366" }} /> WhatsApp {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white">
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
        <div className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">{group ?? "Product"}</div>
        <div className="mt-2 font-display text-xl font-bold text-slate-700">{name}</div>
      </div>
    </div>
  );
}
