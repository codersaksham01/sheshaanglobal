import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PRODUCTS_CATALOG,
  getProductByCategoryAndSlug,
  getProductsByCategory,
  ExportCommodity,
} from "../../../../data/products";
import { TRADE_CORRIDOR_REGIONS, formatDualWeightUnit } from "../../../../data/corridors";
import { buildHreflangAlternates } from "../../../../data/i18n";
import { RfqModal } from "../../../../components/RfqModal";
import { ProductJsonLd } from "../../../../components/JsonLd";
import { ContainerLoadingCalculator } from "../../../../components/ContainerLoadingCalculator";
import { SpecSheetDownloadModal } from "../../../../components/SpecSheetDownloadModal";

const BASE_URL = "https://www.sheshaanglobal.com";
const WHATSAPP_NUMBER = "918149909546";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface ProductLandingPageProps {
  params: Promise<{ category: string; slug: string }> | { category: string; slug: string };
}

/**
 * Pre-renders all 49 dedicated B2B commodity URLs at build time (SSG)
 */
export async function generateStaticParams() {
  return PRODUCTS_CATALOG.map((product) => ({
    category: product.categorySlug,
    slug: product.slug,
  }));
}

/**
 * Generates high-intent B2B commercial title, meta description with HS codes, origin regions,
 * and ports of loading (Nhava Sheva JNPT / Mundra), canonical tag, hreflang alternates, and OpenGraph metadata.
 */
export async function generateMetadata({ params }: ProductLandingPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const product = getProductByCategoryAndSlug(resolvedParams.category, resolvedParams.slug);
  if (!product) return {};

  const path = `/products/${product.categorySlug}/${product.slug}`;
  const canonicalUrl = `${BASE_URL}${path}`;

  return {
    title: product.seoTitle,
    description: product.metaDescription,
    alternates: buildHreflangAlternates(path),
    openGraph: {
      title: product.seoTitle,
      description: product.metaDescription,
      url: canonicalUrl,
      siteName: "Sheshaan Global",
      type: "website",
      images: [
        {
          url: `${BASE_URL}${product.image}`,
          alt: `${product.name} Exporter in India — Sheshaan Global`,
        },
      ],
    },
  };
}

export function buildB2BFaqs(product: ExportCommodity) {
  return [
    {
      question: `What is the Minimum Order Quantity (MOQ) for ${product.name.toLowerCase()} exports from India?`,
      answer: `Sheshaan Global's standard Minimum Order Quantity (MOQ) for ${product.name.toLowerCase()} (HS Code ${product.hsCode}) is one Full Container Load (FCL): either ${product.logistics.container20ft} or ${product.logistics.container40ft}, packed in ${product.logistics.standardPackaging}. Trial air-freight or consolidated LCL lots are supported for select lanes.`,
    },
    {
      question: `Which quality and phytosanitary certificates accompany Sheshaan Global ${product.name.toLowerCase()} consignments?`,
      answer: `Every export shipment of ${product.name.toLowerCase()} includes an official Phytosanitary Certificate issued by the Ministry of Agriculture (Govt. of India), Certificate of Origin (COO), Commercial Invoice, Packing List, Fumigation Certificate, APEDA/FSSAI compliance records, and optional third-party pre-shipment quality inspection by SGS, Bureau Veritas, or Geo-Chem.`,
    },
    {
      question: `What Incoterms and payment terms does Sheshaan Global accept for ${product.name.toLowerCase()}?`,
      answer: `Sheshaan Global operates under FOB (${product.logistics.gatewayPorts.join(", ")}) and CIF/CFR terms to global destination ports across the GCC, Europe, UK, USA, Africa, and Asia. Accepted payment structures include 100% Irrevocable Letter of Credit (L/C at sight), Documents Against Payment (DP/CAD), or Telegraphic Transfer (TT: 30% advance, 70% against scanned Bill of Lading copy).`,
    },
  ];
}

export default async function CommodityB2BLandingPage({ params }: ProductLandingPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const product = getProductByCategoryAndSlug(resolvedParams.category, resolvedParams.slug);

  if (!product) {
    notFound();
  }

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
      {/* Phase 3: Inject Corporation, Product & AggregateOffer, BreadcrumbList, and FAQPage JSON-LD Schemas */}
      <ProductJsonLd product={product} faqs={faqs} />

      {/* 1. ABOVE-THE-FOLD PRODUCT HERO SECTION */}
      <header className="bg-[#04152D] text-white border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* 3. Breadcrumb Navigation Bar */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-medium text-slate-400">
            <ol className="flex flex-wrap items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`/products/${product.categorySlug}`} className="hover:text-white">
                  {product.categoryName}
                </Link>
              </li>
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

              {/* 2. Semantic H1 Heading Explicitly Containing "[Product Name] Exporter in India | [Variety/Region] | Sheshaan Global" */}
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
                {product.h1Headline}
              </h1>

              {/* 4. Executive Procurement Summary (120–150 words) */}
              <p className="mt-5 text-base text-slate-300 leading-relaxed">
                {product.executiveSummary}
              </p>

              {/* Institutional Wholesale MOQ & Loadability Callout */}
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

              {/* 5. Prominent CRO CTAs: PDF Spec Sheet Download + RFQ Modal + Direct WhatsApp Trade Desk + Email */}
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

            {/* Quick Procurement Snapshot Card */}
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
                  <div className="pt-3 flex justify-between gap-4">
                    <dt className="text-slate-400">Inspection</dt>
                    <dd className="text-right font-semibold text-white">
                      SGS / Bureau Veritas / Geo-Chem
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* B2B CRO TRUST BLOCK: 48-HOUR SAMPLE DISPATCH BADGE & THIRD-PARTY INSPECTION SEALS */}
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

        {/* INTERACTIVE CONTAINER LOADING CALCULATOR */}
        <section aria-label="Interactive Container Loading Calculator">
          <ContainerLoadingCalculator
            productName={product.name}
            hsCode={product.hsCode}
            container20ftText={product.logistics.container20ft}
            container40ftText={product.logistics.container40ft}
          />
        </section>
        {/* PROTOCOL 3: HIGH INFORMATION-GAIN TEXT BLOCK FOR AI ANSWER ENGINES (GEO) */}
        <section
          aria-labelledby="geo-summary-heading"
          className="rounded-2xl border-l-4 border-[#0057B8] bg-slate-50 p-6 sm:p-8 shadow-sm"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0057B8]">
              Verified Export Trade Dossier • APEDA &amp; FSSAI Registered
            </span>
            <span className="text-xs font-mono text-slate-500">
              Entity ID: {product.sku} | HS {product.hsCode}
            </span>
          </div>
          <h2 id="geo-summary-heading" className="mt-2 text-xl font-bold text-slate-900">
            Executive Export Summary: {product.name} ({product.originCluster})
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
            {product.geoExtractBlock}
          </p>
        </section>

        {/* 6–8. EMPIRICAL TECHNICAL SPECIFICATION DATA SHEET (HTML TABLE) */}
        <section aria-labelledby="technical-specs-heading">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
              Laboratory &amp; Physical Calibration Parameters
            </span>
            <h2 id="technical-specs-heading" className="mt-1 text-2xl font-bold text-slate-900">
              Empirical Technical Specification Data Sheet — {product.name}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Verifiable physical, chemical, and microbiological procurement parameters guaranteed
              per export lot.
            </p>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-white">
                <tr>
                  <th className="px-6 py-4 w-1/3">Technical Parameter</th>
                  <th className="px-6 py-4">Export Specification Benchmark ({product.name})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Commodity Name &amp; Commercial Varieties
                  </th>
                  <td className="px-6 py-4 text-slate-700">
                    <strong>{product.name}</strong> — {product.varieties.join(" • ")}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Harmonized System (HS) Code
                  </th>
                  <td className="px-6 py-4 font-mono font-bold text-[#0057B8]">
                    {product.hsCode} (ITC-HS India Export Schedule)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Geographic Origin Cluster
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.originCluster}, India</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Primary Grade / Size Calibration
                  </th>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {product.specs.primaryGrade}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Moisture Content Tolerance (%)
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.specs.moistureTolerance}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Purity / Foreign Matter / Admixture (%)
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.specs.purityAdmixture}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Broken / Defect / Split Tolerance (%)
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.specs.brokenOrDefectLimit}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Color, Organoleptic &amp; Physical Appearance
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.specs.colorAppearance}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Crop Year
                  </th>
                  <td className="px-6 py-4 text-slate-700">{product.specs.cropYear}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <th className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/60">
                    Microbiological, Aflatoxin &amp; Residue Limits
                  </th>
                  <td className="px-6 py-4 text-slate-700">
                    {product.specs.microbiologicalLimits}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 9–12. PACKAGING, PALLETIZATION & CONTAINER LOADABILITY MATRIX */}
        <section aria-labelledby="container-matrix-heading">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0057B8]">
              Ocean &amp; Cold-Chain Freight Engineering
            </span>
            <h2 id="container-matrix-heading" className="mt-1 text-2xl font-bold text-slate-900">
              Packaging, Palletization &amp; Container Loadability Matrix
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0057B8]">
                Standard Export Packaging
              </div>
              <p className="mt-2 text-base font-bold text-slate-900">
                {product.logistics.standardPackaging}
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Available in unbranded neutral bags or buyer-specified private-label artwork.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0057B8]">
                20ft FCL Stuffing Capacity
              </div>
              <p className="mt-2 text-base font-bold text-slate-900">
                {product.logistics.container20ft}
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Floor-loaded or ISPM-15 heat-treated Euro/Standard palletized configuration.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
                40ft High Cube (HC) Capacity
              </div>
              <p className="mt-2 text-base font-bold text-slate-900">
                {product.logistics.container40ft}
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Optimized gross/net weight distribution for long-haul maritime corridors.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Transit Climate &amp; Reefer Settings
              </div>
              <p className="mt-2 text-base font-bold text-slate-900">
                {product.logistics.transitClimateControl}
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Continuous data-logger temperature &amp; humidity monitoring from packhouse to port.
              </p>
            </div>
          </div>
        </section>

        {/* 13–16. QUALITY ASSURANCE, LAB TESTING & PHYTOSANITARY GOVERNANCE */}
        <section
          aria-labelledby="qa-governance-heading"
          className="rounded-3xl bg-[#04152D] p-8 text-white sm:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
                Statutory Export Compliance
              </span>
              <h2 id="qa-governance-heading" className="mt-2 text-2xl font-bold">
                Quality Assurance, Lab Testing &amp; Phytosanitary Governance
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Every consignment of {product.name} undergoes multi-stage pre-shipment verification
                to satisfy GCC Municipality, EU EFSA, UK BTOM, and US FDA import protocols.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF8A00]">
                1. Statutory Registrations &amp; Lab Testing
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-200">
                {product.certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{cert}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Pre-Shipment Inspection: SGS, Geo-Chem, or Bureau Veritas</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF8A00]">
                2. Mandatory Export Document Dossier
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-200">
                <li>• Phytosanitary Certificate (Ministry of Agriculture, Govt. of India)</li>
                <li>• Certificate of Origin (COO — Chamber of Commerce Attested)</li>
                <li>• Fumigation Certificate (Methyl Bromide / Aluminum Phosphide)</li>
                <li>• Commercial Invoice, Packing List &amp; Ocean Bill of Lading (B/L)</li>
                <li>• NABL Lab Analysis &amp; Non-GMO / Health Certificate</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 17–19. HARVEST SEASONALITY, CROP AVAILABILITY & PRICE HEDGING CALENDAR */}
        <section aria-labelledby="harvest-calendar-heading">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
              Crop Year &amp; Procurement Timing
            </span>
            <h2 id="harvest-calendar-heading" className="mt-1 text-2xl font-bold text-slate-900">
              12-Month Harvest Seasonality &amp; Price Hedging Calendar — {product.name}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Sowing Window: <strong>{product.harvestCalendar.sowingWindow}</strong> | Harvest
              Window: <strong>{product.harvestCalendar.harvestWindow}</strong>
            </p>
          </div>

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
                    {isPeak ? "Peak Export" : isLean ? "Lean / Cold Store" : "Available"}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <strong>Procurement &amp; Price Hedging Advisory:</strong>{" "}
            {product.harvestCalendar.priceVolatilityNote}
          </div>
        </section>

        {/* 20–23. INCOTERMS, PAYMENT TERMS & EXPORT LOGISTICS */}
        <section aria-labelledby="logistics-incoterms-heading">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0057B8]">
              Commercial Trade Terms
            </span>
            <h2 id="logistics-incoterms-heading" className="mt-1 text-2xl font-bold text-slate-900">
              Incoterms, Gateway Ports &amp; B2B Payment Structures
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">Accepted Incoterms (2020)</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {product.logistics.incoterms.map((term) => (
                  <li key={term}>• {term}</li>
                ))}
                <li>• Custom DDP / DAP terms available for GCC &amp; European warehouses</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">Indian Gateway Loading Ports</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {product.logistics.gatewayPorts.map((port) => (
                  <li key={port}>• {port}</li>
                ))}
                <li>
                  • Direct weekly vessel sailings to Jebel Ali, Dammam, Rotterdam, Felixstowe &amp;
                  Port Klang
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">
                B2B Payment, Currencies &amp; CHA Dispatch
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• 100% Irrevocable Letter of Credit (L/C at Sight) or 30/70 TT &amp; DP/CAD</li>
                <li>
                  • Multi-Currency Quotations: <strong>USD, EUR, GBP, AED, SAR</strong> (
                  {formatDualWeightUnit(product.logistics.eligibleQuantityValue)})
                </li>
                <li>
                  • Cleared by our <strong>Licensed Customs House Agent (CHA)</strong> &amp; shipped
                  via premier <strong>third-party global shipping lines</strong>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* GLOBAL EXPORT CORRIDORS & DESTINATION PORTS (16 COUNTRIES) */}
        <section aria-labelledby="global-corridors-heading">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0057B8]">
              Country &amp; Port-Specific B2B Trade Lanes
            </span>
            <h2 id="global-corridors-heading" className="mt-1 text-2xl font-bold text-slate-900">
              {product.name} Exporter from India to Global Destination Ports
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Select your target import country and discharge port for corridor-specific transit
              times, customs documentation, and licensed CHA + third-party shipping line execution:
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {TRADE_CORRIDOR_REGIONS.map((region) => (
              <Link
                key={region.slug}
                href={`/products/${product.categorySlug}/${product.slug}/export-to/${region.slug}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#0057B8] hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>
                    {region.flag} {region.shortName}
                  </span>
                  <span className="text-[#0057B8]">→</span>
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-700">
                  {product.name} to {region.shortName}
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Port: {region.dischargePorts[0].split(" (")[0]}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 24–25. FREQUENTLY ASKED QUESTIONS FOR TRADE PROCUREMENT OFFICERS */}
        <section aria-labelledby="b2b-faq-heading">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
              Trade Procurement Intelligence
            </span>
            <h2 id="b2b-faq-heading" className="mt-1 text-2xl font-bold text-slate-900">
              Frequently Asked Questions — {product.name} Export from India
            </h2>
          </div>

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

        {/* RELATED CATEGORY COMMODITIES (INTERNAL LINKING GRAPH) */}
        <section
          aria-labelledby="related-commodities-heading"
          className="border-t border-slate-200 pt-12"
        >
          <div className="flex items-center justify-between">
            <h2 id="related-commodities-heading" className="text-2xl font-bold text-slate-900">
              Other Export Lines in {product.categoryName}
            </h2>
            <Link
              href={`/products/${product.categorySlug}`}
              className="text-sm font-bold text-[#0057B8] hover:underline"
            >
              View All {product.categoryName} →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sisterProducts.slice(0, 8).map((related) => (
              <Link
                key={related.sku}
                href={`/products/${related.categorySlug}/${related.slug}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#0057B8] hover:bg-white hover:shadow-sm"
              >
                <div className="text-xs font-mono font-bold text-[#FF8A00]">
                  HS {related.hsCode}
                </div>
                <div className="mt-1 font-bold text-slate-900">{related.name}</div>
                <div className="mt-1 text-xs text-slate-500">{related.originCluster}</div>
                <div className="mt-3 text-xs font-bold text-[#0057B8]">View Spec Sheet →</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
