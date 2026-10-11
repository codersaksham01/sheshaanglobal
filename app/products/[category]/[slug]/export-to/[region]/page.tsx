import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PRODUCTS_CATALOG,
  getProductByCategoryAndSlug,
} from '../../../../../../data/products';
import {
  TRADE_CORRIDOR_REGIONS,
  getTradeCorridorBySlug,
  buildCorridorExecutiveSummary,
  formatDualWeightUnit,
} from '../../../../../../data/corridors';
import { buildHreflangAlternates } from '../../../../../../data/i18n';
import {
  JsonLd,
  buildCorporationSchema,
  buildProductSchema,
  buildTradeCorridorSchema,
  buildExportClearanceHowToSchema,
} from '../../../../../../components/JsonLd';
import { RfqModal } from '../../../../../../components/RfqModal';

const BASE_URL = 'https://www.sheshaanglobal.com';
const WHATSAPP_NUMBER = '918149909546';

interface CorridorPageProps {
  params:
    | Promise<{ category: string; slug: string; region: string }>
    | { category: string; slug: string; region: string };
}

/**
 * Statically pre-renders all 49 commodities × 16 destination regions = 784 B2B Trade Corridor URLs
 */
export async function generateStaticParams() {
  return PRODUCTS_CATALOG.flatMap((product) =>
    TRADE_CORRIDOR_REGIONS.map((region) => ({
      category: product.categorySlug,
      slug: product.slug,
      region: region.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: CorridorPageProps): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const product = getProductByCategoryAndSlug(resolved.category, resolved.slug);
  const region = getTradeCorridorBySlug(resolved.region);
  if (!product || !region) return {};

  const path = `/products/${product.categorySlug}/${product.slug}/export-to/${region.slug}`;
  const rawTitle = `${product.name} Exporter to ${region.shortName} | HS ${product.hsCode}`;
  const title = rawTitle.length <= 60 ? rawTitle : `${product.name} Exporter to ${region.shortName}`.slice(0, 60);
  const rawDesc = `Bulk ${product.name} (HS ${product.hsCode}) exporter from India to ${region.dischargePorts[0]}. ${product.logistics.container40ft}, CHA customs & SGS certified.`;
  const description = rawDesc.length <= 155 ? rawDesc : `${rawDesc.slice(0, 152)}...`;

  return {
    title,
    description,
    alternates: buildHreflangAlternates(path),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      siteName: 'Sheshaan Global',
      type: 'website',
    },
  };
}

export default async function CommodityTradeCorridorPage({
  params,
}: CorridorPageProps) {
  const resolved = await Promise.resolve(params);
  const product = getProductByCategoryAndSlug(resolved.category, resolved.slug);
  const region = getTradeCorridorBySlug(resolved.region);

  if (!product || !region) {
    notFound();
  }

  const corridorSummary = buildCorridorExecutiveSummary(product, region);
  const dualWeight = formatDualWeightUnit(product.logistics.eligibleQuantityValue);

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Sheshaan Global Export Desk,\nI am requesting a FOB/CIF quotation for:\n• Trade Corridor: India to ${region.name} (${region.dischargePorts[0]})\n• Commodity: ${product.name} (HS Code: ${product.hsCode})\n• Grade: ${product.specs.primaryGrade}\n• Container Load: ${product.logistics.container40ft}\nPlease share current pricing and vessel transit schedule.`
  )}`;

  const directEmailQuoteUrl = `mailto:info@sheshaanglobal.com?subject=${encodeURIComponent(
    `B2B Export Quote: ${product.name} (HS ${product.hsCode}) to ${region.shortName}`
  )}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products` },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.categoryName,
        item: `${BASE_URL}/products/${product.categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `${BASE_URL}/products/${product.categorySlug}/${product.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: `Export to ${region.shortName}`,
        item: `${BASE_URL}/products/${product.categorySlug}/${product.slug}/export-to/${region.slug}`,
      },
    ],
  };

  return (
    <article className="min-h-screen bg-white text-slate-900">
      <JsonLd
        data={[
          buildCorporationSchema(),
          buildProductSchema(product),
          buildTradeCorridorSchema(product, region),
          buildExportClearanceHowToSchema(product),
          breadcrumbSchema,
        ]}
      />

      <header className="bg-[#04152D] text-white border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
              <li>
                <Link
                  href={`/products/${product.categorySlug}/${product.slug}`}
                  className="hover:text-white"
                >
                  {product.name}
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#FF8A00] font-semibold">Export to {region.shortName}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-[#FF8A00] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {region.flag} India → {region.shortName} Trade Corridor
            </span>
            <span className="rounded-full border border-slate-600 bg-slate-800/80 px-3.5 py-1 text-xs font-semibold text-slate-200">
              ITC-HS Code: {product.hsCode}
            </span>
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              Currencies: {region.preferredCurrencies.join(' / ')} • Units: {dualWeight}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            {product.name} Exporter from India to {region.name}: Bulk FCL Supplier
          </h1>

          <p className="mt-5 max-w-4xl text-base text-slate-300 leading-relaxed">
            {corridorSummary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <RfqModal
              defaultCommodityName={`${product.name} (Export to ${region.shortName})`}
              defaultHsCode={product.hsCode}
              triggerLabel={`Request CIF ${region.dischargePorts[0].split(' (')[0]} Quote`}
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
              className="inline-flex items-center justify-center rounded-full border border-slate-500 bg-slate-800/80 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white"
            >
              Email Quote (info@sheshaanglobal.com)
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-14">
        {/* Maritime Port-to-Port & CHA Logistics Matrix */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0057B8]">
              Indian Origin &amp; Gateway Ports
            </h2>
            <p className="mt-2 text-lg font-bold text-slate-900">{product.originCluster}</p>
            <p className="mt-2 text-sm text-slate-600">
              Loaded at <strong>{product.logistics.gatewayPorts.join(' / ')}</strong> with licensed CHA (Customs House Agent) Let Export Order (LEO) clearance.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
              Destination Discharge Ports ({region.shortName})
            </h2>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {region.dischargePorts.join(' • ')}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              <strong>Transit Time:</strong> {region.transitTimeFromIndia} via third-party mainline ocean carriers.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Import Authority &amp; Unit Equivalence
            </h2>
            <p className="mt-2 text-base font-bold text-slate-900">{region.importAuthority}</p>
            <p className="mt-2 text-sm text-slate-600">
              <strong>FCL Net Load:</strong> {dualWeight} ({product.logistics.container40ft}).
            </p>
          </div>
        </section>

        {/* CHA & Third-Party Shipping Line Execution Protocol */}
        <section className="rounded-3xl bg-[#04152D] p-8 text-white">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
            Licensed CHA &amp; Mainline Carrier Execution
          </span>
          <h2 className="mt-2 text-2xl font-bold">
            Customs Brokerage, Third-Party Shipping Lines &amp; {region.shortName} Import Dossier
          </h2>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {region.chaAndCarrierProtocol}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {region.customsDocuments.map((doc) => (
              <div
                key={doc}
                className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-200"
              >
                ✓ {doc}
              </div>
            ))}
          </div>
        </section>

        {/* Other Destination Corridors for this Commodity */}
        <section className="border-t border-slate-200 pt-10">
          <h2 className="text-xl font-bold text-slate-900">
            Other Global Trade Corridors for {product.name} (HS {product.hsCode})
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {TRADE_CORRIDOR_REGIONS.filter((r) => r.slug !== region.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/products/${product.categorySlug}/${product.slug}/export-to/${other.slug}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 hover:border-[#0057B8] hover:text-[#0057B8]"
              >
                {other.flag} Export to {other.shortName} ({other.dischargePorts[0].split(' (')[0]})
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
