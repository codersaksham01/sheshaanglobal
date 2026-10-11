import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, PRODUCTS_CATALOG, getProductsByCategory } from "../../data/products";
import { RfqModal } from "../../components/RfqModal";

const BASE_URL = "https://www.sheshaanglobal.com";

export const metadata: Metadata = {
  title: "Agricultural Export Catalog & HS Codes | Sheshaan Global",
  description:
    "Explore 49 APEDA & FSSAI certified Indian agricultural export commodities with 8-digit HS codes, moisture specs & 20ft/40ft FCL container loadability.",
  alternates: {
    canonical: `${BASE_URL}/products`,
  },
  openGraph: {
    title: "Agricultural Export Catalog & HS Codes | Sheshaan Global",
    description:
      "49 export-grade Indian commodities: Fresh Vegetables, Fruits, Spices, Basmati Rice, Pulses & Dry Fruits with empirical B2B technical specifications.",
    url: `${BASE_URL}/products`,
    siteName: "Sheshaan Global",
    type: "website",
  },
};

export default function ProductsCatalogHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb & Hero Section */}
      <section className="bg-[#04152D] py-16 text-white border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-medium text-slate-400">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#FF8A00] font-semibold">Export Product Catalog (49 Lines)</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-[#FF8A00]/15 border border-[#FF8A00]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
              APEDA • FSSAI • CDB • DGFT IEC Certified Exporter
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Indian Agricultural Export Catalog &amp; Empirical HS Code Directory
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Sheshaan Global supplies 49 export-calibrated agricultural commodities sourced
              directly from verified Indian origin clusters—including Nashik red onions, Sangli
              turmeric, Unjha cumin, Pollachi coconuts, Karnal 1121 Basmati rice, and Mithila Phool
              Makhana. Select any commodity below to inspect full physical/chemical tolerances,
              20ft/40ft reefer stuffing capacities, and 12-month harvest calendars.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <RfqModal triggerLabel="Request Master FOB / CIF Price List" />
              <a
                href="https://wa.me/918149909546?text=Hello%20Sheshaan%20Global%20Export%20Desk%2C%20please%20share%20your%20latest%20FOB%2FCIF%20export%20catalog%20and%20container%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1da851]"
              >
                WhatsApp Trade Desk (+91 81499 09546)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Primary Export Category Hubs */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Browse by Export Commodity Vertical (5 Divisions)
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const count = getProductsByCategory(category.slug).length;
            return (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#0057B8] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0057B8]">
                      {category.primaryHsChapter}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {count} Export Lines
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-[#0057B8]">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="mt-5 text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
                  Explore {category.name} Hub →
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Complete 49-Commodity Crawlability & Technical Index Table */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {CATEGORIES.map((category) => {
          const items = getProductsByCategory(category.slug);
          return (
            <div key={category.slug} className="mt-12">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    <Link href={`/products/${category.slug}`} className="hover:text-[#0057B8]">
                      {category.name} ({items.length} Commodities)
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{category.primaryHsChapter}</p>
                </div>
                <Link
                  href={`/products/${category.slug}`}
                  className="text-sm font-bold text-[#0057B8] hover:underline"
                >
                  View {category.name} Hub →
                </Link>
              </div>

              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-white">
                    <tr>
                      <th className="px-4 py-3.5">Commodity Name</th>
                      <th className="px-4 py-3.5">HS Code</th>
                      <th className="px-4 py-3.5">Origin Cluster</th>
                      <th className="px-4 py-3.5">Primary Export Grade</th>
                      <th className="px-4 py-3.5">Moisture Limit</th>
                      <th className="px-4 py-3.5">40ft FCL Stuffing</th>
                      <th className="px-4 py-3.5">Spec Sheet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {items.map((product) => (
                      <tr key={product.sku} className="hover:bg-slate-50">
                        <td className="px-4 py-3.5 font-bold text-slate-900">
                          <a
                            href={`/products/${product.categorySlug}/${product.slug}`}
                            className="text-[#0057B8] hover:underline"
                          >
                            {product.name}
                          </a>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-xs font-semibold text-slate-700">
                          {product.hsCode}
                        </td>
                        <td className="px-4 py-3.5 text-slate-600">{product.originCluster}</td>
                        <td className="px-4 py-3.5 text-slate-700">{product.specs.primaryGrade}</td>
                        <td className="px-4 py-3.5 text-slate-700">
                          {product.specs.moistureTolerance}
                        </td>
                        <td className="px-4 py-3.5 text-slate-700">
                          {product.logistics.container40ft}
                        </td>
                        <td className="px-4 py-3.5">
                          <a
                            href={`/products/${product.categorySlug}/${product.slug}`}
                            className="inline-flex items-center rounded-full bg-[#0057B8]/10 px-3 py-1 text-xs font-bold text-[#0057B8] hover:bg-[#0057B8] hover:text-white"
                          >
                            View Specifications →
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
