import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  getProductByCategoryAndSlug,
  getProductsByCategory,
} from "@/lib/empirical-products";
import {
  buildB2BFaqs,
  buildCorporationSchema,
  buildProductBreadcrumbSchema,
  buildProductFaqSchema,
  buildProductSchema,
} from "../../data/schemas";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { RfqModal } from "../../components/RfqModal";
import { ContainerLoadingCalculator } from "@/components/ContainerLoadingCalculator";
import { SpecSheetDownloadModal } from "@/components/SpecSheetDownloadModal";

const WHATSAPP_NUMBER = "918149909546";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const Route = createFileRoute("/products/$category/$slug")({
  loader: ({ params }) => {
    const product = getProductByCategoryAndSlug(params.category, params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found — Sheshaan Global" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const url = `${SITE_URL}/products/${product.categorySlug}/${product.slug}`;
    const img = absoluteUrl(product.image || "/logo.png");
    const faqs = buildB2BFaqs(product);

    return {
      meta: [
        { title: product.seoTitle },
        { name: "description", content: product.metaDescription },
        {
          name: "keywords",
          content: `${product.primaryKeyword}, ${product.name} exporter in India, HS Code ${product.hsCode}, ${product.varieties.join(", ")}, Sheshaan Global`,
        },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { property: "og:title", content: product.seoTitle },
        { property: "og:description", content: product.metaDescription },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: img },
        {
          property: "og:image:alt",
          content: `${product.name} Exporter in India — Sheshaan Global`,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: product.seoTitle },
        { name: "twitter:description", content: product.metaDescription },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(buildCorporationSchema()),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(buildProductSchema(product)),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(buildProductBreadcrumbSchema(product)),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(buildProductFaqSchema(product, faqs)),
        },
      ],
    };
  },
  component: CommodityCategorySlugPage,
});

function CommodityCategorySlugPage() {
  const { product } = Route.useLoaderData();
  const sisterProducts = getProductsByCategory(product.categorySlug).filter(
    (p) => p.slug !== product.slug,
  );
  const faqs = buildB2BFaqs(product);

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Sheshaan Global Export Desk,\nI am requesting an official FOB/CIF quotation for:\n• Commodity: ${product.name} (HS Code: ${product.hsCode})\n• Grade: ${product.specs.primaryGrade}\n• Loadability: ${product.logistics.container40ft}\nPlease share current pricing and shipment lead time.`,
  )}`;

  const sampleDispatchWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Sheshaan Global Sample Desk,\nWe are a verified importer requesting a 48-hour DHL/FedEx commercial sample (500g–1kg) for:\n• Commodity: ${product.name} (HS Code: ${product.hsCode})\n• Grade: ${product.specs.primaryGrade}`,
  )}`;

  const directEmailQuoteUrl = `mailto:info@sheshaanglobal.com?subject=${encodeURIComponent(
    `B2B Export RFQ: ${product.name} (HS Code ${product.hsCode})`,
  )}&body=${encodeURIComponent(
    `Hello Sheshaan Global Export Desk,\n\nWe would like to request an official FOB/CIF export quotation for:\n• Commodity: ${product.name} (HS Code: ${product.hsCode})\n• Preferred Grade/Calibration: ${product.specs.primaryGrade}\n• Container Loadability: ${product.logistics.container40ft}\n• Destination Port & Country:\n• Target Quantity (FCL):\n\nThank you.`,
  )}`;

  return (
    <article className="min-h-screen bg-white text-slate-900">
      <header className="bg-[#04152D] text-white border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-medium text-slate-400">
            <ol className="flex flex-wrap items-center space-x-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-300">{product.categoryName}</li>
              <li>/</li>
              <li className="text-[#FF8A00] font-semibold">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-[#FF8A00] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  HS Code: {product.hsCode}
                </span>
                <span className="rounded-full border border-slate-600 bg-slate-800/80 px-3.5 py-1 text-xs font-semibold text-slate-200">
                  SKU: {product.sku}
                </span>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
                  Origin: {product.originCluster}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
                {product.h1Headline}
              </h1>

              <p className="mt-5 text-base text-slate-300 leading-relaxed">
                {product.executiveSummary}
              </p>

              <div className="mt-6 grid gap-3 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 sm:grid-cols-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Wholesale Commercial MOQ
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">
                    1 x FCL ({product.logistics.container40ft})
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    20ft / 40ft Stuffing Load
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">
                    {product.logistics.container20ft} | {product.logistics.container40ft}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Gateway Loading Ports
                  </div>
                  <div className="mt-1 text-sm font-bold text-emerald-300">
                    Nhava Sheva (JNPT) / Mundra
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <SpecSheetDownloadModal
                  productName={product.name}
                  hsCode={product.hsCode}
                  buttonLabel="Download Technical Export Spec Sheet (PDF)"
                />
                <RfqModal
                  defaultCommodityName={product.name}
                  defaultHsCode={product.hsCode}
                  triggerLabel="Request Instant B2B Export Quote"
                />
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1da851]"
                >
                  WhatsApp Trade Desk (+91 81499 09546)
                </a>
                <a
                  href={directEmailQuoteUrl}
                  className="inline-flex items-center justify-center rounded-full border border-slate-500 bg-slate-800/80 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:border-white hover:bg-slate-700"
                >
                  Email Quote (info@sheshaanglobal.com)
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-slate-700 bg-slate-900/90 p-6 shadow-2xl">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
                  FCL Procurement Snapshot
                </h2>
                <dl className="mt-4 space-y-3 text-sm divide-y divide-slate-800">
                  <div className="pt-2 flex justify-between gap-4">
                    <dt className="text-slate-400">HS Classification</dt>
                    <dd className="font-mono font-bold text-white">{product.hsCode}</dd>
                  </div>
                  <div className="pt-3 flex justify-between gap-4">
                    <dt className="text-slate-400">Primary Calibration</dt>
                    <dd className="text-right font-semibold text-white">
                      {product.specs.primaryGrade}
                    </dd>
                  </div>
                  <div className="pt-3 flex justify-between gap-4">
                    <dt className="text-slate-400">Moisture Limit</dt>
                    <dd className="text-right font-semibold text-emerald-400">
                      {product.specs.moistureTolerance}
                    </dd>
                  </div>
                  <div className="pt-3 flex justify-between gap-4">
                    <dt className="text-slate-400">40ft FCL Stuffing</dt>
                    <dd className="text-right font-semibold text-white">
                      {product.logistics.container40ft}
                    </dd>
                  </div>
                  <div className="pt-3 flex justify-between gap-4">
                    <dt className="text-slate-400">Port of Loading</dt>
                    <dd className="text-right font-semibold text-white">
                      {product.logistics.gatewayPorts[0]}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <section className="grid gap-6 lg:grid-cols-12">
          <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/70 p-6 lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              ✓ 48-Hour Sample Dispatch Policy
            </div>
            <h2 className="mt-3 text-lg font-bold text-slate-900">
              DHL / FedEx International Priority Sample Lots
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              &ldquo;Commercial 500g–1kg lab inspection samples dispatched via DHL / FedEx
              International Priority within 48 business hours for verified importers.&rdquo;
            </p>
            <a
              href={sampleDispatchWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800"
            >
              Request 500g–1kg DHL/FedEx Sample Lot →
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Third-Party Quality Inspection &amp; Quarantine Seals
            </div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              Mandatory Pre-Shipment Verification &amp; Phytosanitary Clearance
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  badge: "SGS",
                  title: "SGS Inspected",
                  sub: "Pre-Shipment Weight & Grade Audit",
                },
                {
                  badge: "GEO-CHEM",
                  title: "Geo-Chem Labs",
                  sub: "Pesticide MRL & Purity Assay",
                },
                {
                  badge: "BUREAU VERITAS",
                  title: "Bureau Veritas",
                  sub: "Container Stuffing & Seal Survey",
                },
                {
                  badge: "GOVT. PHYTO",
                  title: "NPPO / APEDA",
                  sub: "Official Phytosanitary & Fumigation",
                },
              ].map((seal) => (
                <div
                  key={seal.badge}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center"
                >
                  <div className="inline-block rounded-md bg-slate-900 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-amber-400">
                    {seal.badge}
                  </div>
                  <div className="mt-2 text-xs font-bold text-slate-900">{seal.title}</div>
                  <div className="mt-0.5 text-[11px] leading-snug text-slate-600">{seal.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContainerLoadingCalculator
          productName={product.name}
          hsCode={product.hsCode}
          container20ftText={product.logistics.container20ft}
          container40ftText={product.logistics.container40ft}
        />
        <section className="rounded-2xl border-l-4 border-[#0057B8] bg-slate-50 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0057B8]">
              Verified Export Trade Dossier • APEDA &amp; FSSAI Registered
            </span>
            <span className="text-xs font-mono text-slate-500">
              Entity ID: {product.sku} | HS {product.hsCode}
            </span>
          </div>
          <h2 className="mt-2 text-xl font-bold text-slate-900">
            Executive Export Summary: {product.name} ({product.originCluster})
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
            {product.geoExtractBlock}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Empirical Technical Specification Data Sheet — {product.name}
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-white">
                <tr>
                  <th className="px-6 py-4 w-1/3">Technical Parameter</th>
                  <th className="px-6 py-4">Export Specification Benchmark ({product.name})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Commodity Name &amp; Varieties
                  </th>
                  <td className="px-6 py-4 text-slate-700">
                    <strong>{product.name}</strong> — {product.varieties.join(" • ")}
                  </td>
                </tr>
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Harmonized System (HS) Code
                  </th>
                  <td className="px-6 py-4 font-mono font-bold text-[#0057B8]">
                    {product.hsCode}
                  </td>
                </tr>
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Geographic Origin Cluster
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.originCluster}, India</td>
                </tr>
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Primary Grade / Calibration
                  </th>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {product.specs.primaryGrade}
                  </td>
                </tr>
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Moisture Content Tolerance (%)
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.specs.moistureTolerance}</td>
                </tr>
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Purity / Admixture (%)
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.specs.purityAdmixture}</td>
                </tr>
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Broken / Defect Tolerance (%)
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.specs.brokenOrDefectLimit}</td>
                </tr>
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Color &amp; Physical Appearance
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.specs.colorAppearance}</td>
                </tr>
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Crop Year
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.specs.cropYear}</td>
                </tr>
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Microbiological &amp; Residue Limits
                  </th>
                  <td className="px-6 py-4 text-slate-700">
                    {product.specs.microbiologicalLimits}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Packaging, Palletization &amp; Container Loadability Matrix
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0057B8]">
                Standard Packaging
              </div>
              <p className="mt-2 text-base font-bold text-slate-900">
                {product.logistics.standardPackaging}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0057B8]">
                20ft FCL Stuffing
              </div>
              <p className="mt-2 text-base font-bold text-slate-900">
                {product.logistics.container20ft}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
                40ft High Cube Capacity
              </div>
              <p className="mt-2 text-base font-bold text-slate-900">
                {product.logistics.container40ft}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Transit Climate Control
              </div>
              <p className="mt-2 text-base font-bold text-slate-900">
                {product.logistics.transitClimateControl}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            12-Month Harvest Seasonality &amp; Price Hedging Calendar
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Sowing Window: <strong>{product.harvestCalendar.sowingWindow}</strong> | Harvest Window:{" "}
            <strong>{product.harvestCalendar.harvestWindow}</strong>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
            {MONTHS.map((month) => {
              const isPeak = product.harvestCalendar.peakExportMonths.includes(month);
              const isLean = product.harvestCalendar.leanMonths.includes(month);
              return (
                <div
                  key={month}
                  className={`rounded-xl border p-3 text-center ${
                    isPeak
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isLean
                        ? "border-amber-300 bg-amber-50 text-amber-900"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold uppercase">{month}</div>
                  <div className="mt-1.5 text-[11px] font-semibold">
                    {isPeak ? "Peak Export" : isLean ? "Lean / Store" : "Available"}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions — {product.name} Export from India
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 pt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Other Export Lines in {product.categoryName}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sisterProducts.slice(0, 8).map((related) => (
              <Link
                key={related.sku}
                to="/products/$category/$slug"
                params={{ category: related.categorySlug, slug: related.slug }}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#0057B8] hover:bg-white hover:shadow-sm"
              >
                <div className="text-xs font-mono font-bold text-[#FF8A00]">
                  HS {related.hsCode}
                </div>
                <div className="mt-1 font-bold text-slate-900">{related.name}</div>
                <div className="mt-1 text-xs text-slate-500">{related.originCluster}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
