import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlugOrLegacy } from "../../../data/products";
import {
  EXPORT_CORRIDOR_LANES,
  getExportCorridorLaneBySlug,
  getTradeCorridorBySlug,
  formatDualWeightUnit,
  buildCorridorExecutiveSummary,
} from "../../../data/corridors";
import { buildHreflangAlternates } from "../../../data/i18n";
import {
  buildCorporationSchema,
  buildProductSchema,
  buildProductFaqSchema,
  buildTradeCorridorSchema,
} from "../../../data/schemas";
import { ContainerLoadingCalculator } from "../../../components/ContainerLoadingCalculator";
import { SpecSheetDownloadModal } from "../../../components/SpecSheetDownloadModal";
import { RfqModal } from "../../../components/RfqModal";

const BASE_URL = "https://www.sheshaanglobal.com";
const WHATSAPP_NUMBER = "918149909546";

interface ExportCorridorPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

/**
 * Pre-renders all priority trade corridor landing pages at build time (SSG)
 */
export async function generateStaticParams() {
  return EXPORT_CORRIDOR_LANES.map((lane) => ({
    slug: lane.slug,
  }));
}

export async function generateMetadata({ params }: ExportCorridorPageProps): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const lane = getExportCorridorLaneBySlug(resolved.slug);
  if (!lane) return {};

  const product = getProductBySlugOrLegacy(lane.productSlug);
  const path = `/exports/${lane.slug}`;

  return {
    title: lane.seoTitle,
    description: lane.metaDescription,
    alternates: buildHreflangAlternates(path),
    openGraph: {
      title: lane.seoTitle,
      description: lane.metaDescription,
      url: `${BASE_URL}${path}`,
      siteName: "Sheshaan Global",
      type: "website",
      images: product
        ? [
            {
              url: `${BASE_URL}${product.image}`,
              alt: `${lane.h1Headline} — Sheshaan Global`,
            },
          ]
        : undefined,
    },
  };
}

export default async function ExportCorridorLandingPage({ params }: ExportCorridorPageProps) {
  const resolved = await Promise.resolve(params);
  const lane = getExportCorridorLaneBySlug(resolved.slug);

  if (!lane) {
    notFound();
  }

  const product = getProductBySlugOrLegacy(lane.productSlug);
  const region = getTradeCorridorBySlug(lane.regionSlug);

  if (!product || !region) {
    notFound();
  }

  const dualWeight = formatDualWeightUnit(product.logistics.eligibleQuantityValue);
  const corridorSummary = buildCorridorExecutiveSummary(product, region);

  const corridorFaqs = [
    {
      question: `What is the Minimum Order Quantity (MOQ) and transit time for ${product.name} exports to ${lane.targetPortLabel}?`,
      answer: `Our standard wholesale MOQ is 1 Full Container Load (FCL): ${product.logistics.container40ft} or ${product.logistics.container20ft} (${dualWeight}). Ocean transit from ${product.logistics.gatewayPorts.join(" / ")} to ${lane.targetPortLabel} is ${region.transitTimeFromIndia} via tier-1 third-party container shipping lines.`,
    },
    {
      question: `Which inspection and customs documents are provided for ${region.shortName} import clearance?`,
      answer: `Every consignment undergoes mandatory pre-shipment quality verification via SGS, Geo-Chem, or Bureau Veritas, accompanied by official Govt. of India Phytosanitary Certificate, Fumigation Certificate, Certificate of Origin (COO), Commercial Invoice, Packing List, and ${region.importAuthority} compliance records executed by our licensed Customs House Agent (CHA).`,
    },
    {
      question: `How does Sheshaan Global verify quality before container dispatch to ${region.shortName}?`,
      answer: `Every commercial FCL shipment to ${region.shortName} is backed by live packhouse grading video, NABL/SGS Certificate of Analysis (moisture, residue & purity), and timestamped container sealing photographs shared prior to vessel departure.`,
    },
  ];

  const jsonLdPayload = [
    buildCorporationSchema(),
    buildProductSchema(product),
    buildTradeCorridorSchema(product, region),
    buildProductFaqSchema(product, corridorFaqs),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Export Corridors", item: `${BASE_URL}/exports` },
        {
          "@type": "ListItem",
          position: 3,
          name: lane.seoTitle,
          item: `${BASE_URL}/exports/${lane.slug}`,
        },
      ],
    },
  ];

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Sheshaan Global Export Desk,\nI am requesting a corridor FOB/CIF quotation:\n• Corridor: ${lane.h1Headline}\n• Commodity: ${product.name} (HS Code: ${product.hsCode})\n• Destination Port: ${lane.targetPortLabel}\n• Container Load: ${product.logistics.container40ft}\nPlease share latest pricing and vessel schedule.`,
  )}`;

  const lotInspectionWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Sheshaan Global Export Desk,\nPlease share current harvest lot photos, Lab Certificate of Analysis (COA), and FCL quotation for:\n• Commodity: ${product.name} (HS Code: ${product.hsCode})\n• Grade: ${product.specs.primaryGrade}\n• Destination City/Port: ${lane.targetPortLabel}`,
  )}`;

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPayload) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="hover:text-emerald-700 hover:underline">
              Products
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/products/${product.categorySlug}/${product.slug}`}
              className="hover:text-emerald-700 hover:underline"
            >
              {product.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-slate-900" aria-current="page">
            Export to {region.shortName}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl sm:p-10">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
          <span className="rounded-full bg-emerald-500/20 px-3 py-1">
            {region.flag} Dedicated Trade Corridor • ITC-HS: {product.hsCode}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1">
            Origin: {product.originCluster}
          </span>
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-amber-300">
            Loading: Nhava Sheva (JNPT) / Mundra
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {lane.h1Headline}
        </h1>

        <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-200 sm:text-lg">
          {corridorSummary}
        </p>

        {/* Institutional Wholesale MOQ & Loadability Callout */}
        <div className="mt-6 grid gap-3 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 sm:grid-cols-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              Standard Commercial MOQ
            </div>
            <div className="mt-1 text-sm font-bold text-white">
              1 x FCL ({product.logistics.container40ft})
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              20ft / 40ft Container Stuffing
            </div>
            <div className="mt-1 text-sm font-bold text-white">
              {product.logistics.container20ft} | {dualWeight}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              Port-to-Port Ocean Transit
            </div>
            <div className="mt-1 text-sm font-bold text-emerald-300">
              {region.transitTimeFromIndia}
            </div>
          </div>
        </div>

        {/* Primary CRO Actions */}
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-500"
          >
            WhatsApp Trade Desk (+91 81499 09546)
          </a>
          <SpecSheetDownloadModal
            productName={`${product.name} (${region.shortName} Corridor)`}
            hsCode={product.hsCode}
            buttonLabel="Download Technical Export Spec Sheet (PDF)"
          />
          <RfqModal
            defaultCommodityName={`${product.name} to ${region.shortName}`}
            defaultHsCode={product.hsCode}
            triggerLabel={`Request CIF ${region.shortName} Quote`}
          />
        </div>
      </header>

      {/* Third-Party Quality Inspection Seals & Live Packhouse Video / COA Verification */}
      <section className="mt-10 grid gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/70 p-6 lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            ✓ Live Packhouse Video &amp; COA Verification
          </div>
          <h2 className="mt-3 text-lg font-bold text-slate-900">
            Live Grading Video, Lab COA &amp; Stuffing Proof
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            &ldquo;Every commercial shipment is backed by live packhouse grading video, NABL/SGS
            Certificate of Analysis (moisture, residue &amp; purity), and timestamped container
            sealing photographs.&rdquo;
          </p>
          <a
            href={lotInspectionWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800"
          >
            Request Current Lot Photos &amp; Lab COA →
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Mandatory Pre-Shipment Quality &amp; Quarantine Seals
          </div>
          <h2 className="mt-1 text-lg font-bold text-slate-900">
            Third-Party Laboratory &amp; Government Clearance Assurance
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                badge: "SGS",
                title: "SGS Inspected",
                sub: "Quality, Weight & Stuffing Verification",
              },
              {
                badge: "GEO-CHEM",
                title: "Geo-Chem Labs",
                sub: "MRL Pesticide & Purity Assay",
              },
              {
                badge: "BUREAU VERITAS",
                title: "Bureau Veritas",
                sub: "Pre-Shipment Survey & Seal",
              },
              {
                badge: "GOVT. PHYTO",
                title: "NPPO / APEDA",
                sub: "Phytosanitary & Fumigation Cert",
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

      {/* Corridor Logistics & Port Matrix */}
      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Port &amp; Customs Protocol: India to {region.shortName}
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex flex-col border-b border-slate-100 pb-2.5 sm:flex-row sm:justify-between">
              <dt className="font-semibold text-slate-600">Indian Ports of Loading</dt>
              <dd className="font-bold text-slate-900">
                {product.logistics.gatewayPorts.join(" • ")}
              </dd>
            </div>
            <div className="flex flex-col border-b border-slate-100 pb-2.5 sm:flex-row sm:justify-between">
              <dt className="font-semibold text-slate-600">Target Discharge Ports</dt>
              <dd className="font-bold text-emerald-700">{lane.targetPortLabel}</dd>
            </div>
            <div className="flex flex-col border-b border-slate-100 pb-2.5 sm:flex-row sm:justify-between">
              <dt className="font-semibold text-slate-600">Estimated Ocean Transit</dt>
              <dd className="text-slate-900">{region.transitTimeFromIndia}</dd>
            </div>
            <div className="flex flex-col border-b border-slate-100 pb-2.5 sm:flex-row sm:justify-between">
              <dt className="font-semibold text-slate-600">Import Regulatory Authority</dt>
              <dd className="text-slate-900">{region.importAuthority}</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <dt className="font-semibold text-slate-600">Target Buyer Segment</dt>
              <dd className="text-slate-900">{lane.targetBuyerSegment}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Mandatory Export Documentation Dossier ({region.isoCode})
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
            {region.customsDocuments.map((doc) => (
              <li
                key={doc}
                className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 font-medium"
              >
                <span className="font-bold text-emerald-600">✓</span>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interactive Container Loading Calculator */}
      <section className="mt-10">
        <ContainerLoadingCalculator
          productName={product.name}
          hsCode={product.hsCode}
          container20ftText={product.logistics.container20ft}
          container40ftText={product.logistics.container40ft}
        />
      </section>

      {/* FAQ Section */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently Asked Questions: {product.name} Export to {region.shortName}
        </h2>
        <div className="mt-6 space-y-5">
          {corridorFaqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
              <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Links to All Priority Trade Corridors */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          Explore Other Priority Agricultural Export Corridors
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EXPORT_CORRIDOR_LANES.map((item) => (
            <a
              key={item.slug}
              href={`/exports/${item.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-emerald-500 hover:text-emerald-700"
            >
              <div>{item.seoTitle.split("|")[0].trim()}</div>
              <div className="mt-1 text-xs font-normal text-slate-500">
                {item.targetPortLabel} →
              </div>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
