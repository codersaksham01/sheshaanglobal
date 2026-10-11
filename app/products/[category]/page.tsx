import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug, getProductsByCategory } from "../../../data/products";
import { RfqModal } from "../../../components/RfqModal";
import { buildCorporationSchema, buildCategoryCollectionSchema } from "../../../components/JsonLd";

const BASE_URL = "https://www.sheshaanglobal.com";

interface CategoryPageProps {
  params: Promise<{ category: string }> | { category: string };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const category = getCategoryBySlug(resolvedParams.category);
  if (!category) return {};

  const canonicalUrl = `${BASE_URL}/products/${category.slug}`;

  return {
    title: category.seoTitle,
    description: category.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: category.seoTitle,
      description: category.metaDescription,
      url: canonicalUrl,
      siteName: "Sheshaan Global",
      type: "website",
    },
  };
}

export default async function CategoryHubPage({ params }: CategoryPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const category = getCategoryBySlug(resolvedParams.category);
  if (!category) notFound();

  const commodities = getProductsByCategory(category.slug);
  const corporationSchema = buildCorporationSchema();
  const collectionSchema = buildCategoryCollectionSchema(category, commodities);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(corporationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {/* Above-the-Fold Category Hero */}
      <section className="bg-[#04152D] py-14 text-white border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              <li className="text-[#FF8A00] font-semibold">{category.name}</li>
            </ol>
          </nav>

          <span className="inline-block rounded-full bg-[#FF8A00]/15 border border-[#FF8A00]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
            {category.primaryHsChapter} • {commodities.length} Export Lines
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {category.h1Headline}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300 leading-relaxed">
            {category.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <RfqModal
              defaultCommodityName={commodities[0]?.name}
              defaultHsCode={commodities[0]?.hsCode}
              triggerLabel={`Request ${category.name} Export Quote`}
            />
            <a
              href={`https://wa.me/918149909546?text=${encodeURIComponent(
                `Hello Sheshaan Global Export Desk, I am inquiring about bulk ${category.name} export shipments from India. Please share FOB/CIF rates.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1da851]"
            >
              Direct WhatsApp RFQ (+91 81499 09546)
            </a>
          </div>
        </div>
      </section>

      {/* Empirical Comparison Matrix for Category */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">
          {category.name} Empirical Export Specification Matrix
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Compare Harmonized System (HS) codes, Indian geographic origin hubs, primary calibration
          standards, and Full Container Load (FCL) capacities across all {commodities.length} export
          lines.
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-white">
              <tr>
                <th className="px-4 py-3.5">Commodity</th>
                <th className="px-4 py-3.5">HS Code</th>
                <th className="px-4 py-3.5">Origin Cluster</th>
                <th className="px-4 py-3.5">Grade / Calibration</th>
                <th className="px-4 py-3.5">Moisture Limit</th>
                <th className="px-4 py-3.5">Standard Packaging</th>
                <th className="px-4 py-3.5">40ft FCL Loadability</th>
                <th className="px-4 py-3.5">Technical Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {commodities.map((item) => (
                <tr key={item.sku} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-bold text-slate-900">
                    <a
                      href={`/products/${item.categorySlug}/${item.slug}`}
                      className="text-[#0057B8] hover:underline"
                    >
                      {item.name}
                    </a>
                  </td>
                  <td className="px-4 py-4 font-mono text-xs font-semibold text-slate-700">
                    {item.hsCode}
                  </td>
                  <td className="px-4 py-4 text-slate-600">{item.originCluster}</td>
                  <td className="px-4 py-4 text-slate-700">{item.specs.primaryGrade}</td>
                  <td className="px-4 py-4 text-slate-700">{item.specs.moistureTolerance}</td>
                  <td className="px-4 py-4 text-slate-600">{item.logistics.standardPackaging}</td>
                  <td className="px-4 py-4 font-semibold text-slate-800">
                    {item.logistics.container40ft}
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={`/products/${item.categorySlug}/${item.slug}`}
                      className="inline-flex items-center rounded-full bg-[#0057B8] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#003c85]"
                    >
                      View Specifications →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dedicated Commodity Cards */}
        <h2 className="mt-14 text-2xl font-bold text-slate-900">
          Dedicated {category.name} Export Landing Pages
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {commodities.map((item) => (
            <article
              key={item.sku}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#0057B8] hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="rounded-full bg-[#FF8A00]/15 px-3 py-1 text-[#FF8A00]">
                    HS Code: {item.hsCode}
                  </span>
                  <span className="text-slate-500">SKU: {item.sku}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  <a
                    href={`/products/${item.categorySlug}/${item.slug}`}
                    className="hover:text-[#0057B8]"
                  >
                    {item.h1Headline}
                  </a>
                </h3>
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  Origin: {item.originCluster}
                </p>
                <p className="mt-3 text-sm text-slate-600 line-clamp-3">{item.executiveSummary}</p>
                <ul className="mt-4 space-y-1 text-xs text-slate-700">
                  <li>
                    <strong>Calibration:</strong> {item.specs.primaryGrade}
                  </li>
                  <li>
                    <strong>Moisture:</strong> {item.specs.moistureTolerance}
                  </li>
                  <li>
                    <strong>40ft FCL:</strong> {item.logistics.container40ft}
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`/products/${item.categorySlug}/${item.slug}`}
                  className="text-xs font-bold uppercase tracking-wider text-[#0057B8] hover:underline"
                >
                  View Specifications →
                </a>
                <span className="text-[11px] text-slate-400">{item.logistics.gatewayPorts[0]}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
