import React from "react";
import Link from "next/link";
import { CATEGORIES, PRODUCTS_CATALOG, getProductsByCategory } from "../data/products";
import { RfqModal } from "../components/RfqModal";

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900">
      {/* Above-the-Fold Hero */}
      <section className="bg-[#04152D] text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full bg-[#FF8A00] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
              APEDA • FSSAI • CDB • IEC Certified Exporter (Maharashtra, India)
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
              Agricultural Commodity Exporter in India: 49 Bulk Export Lines
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
              Sheshaan Global is an APEDA, FSSAI, and Coconut Development Board (CDB) registered
              Indian agricultural exporter headquartered in Maharashtra. We supply 20ft dry and 40ft
              High Cube reefer Full Container Loads (FCL) of Nashik Red Onions, 1121 Steam Basmati
              Rice, Unjha Cumin, Sangli Turmeric, Pollachi Mature Coconuts, Pulses, and Mithila
              Makhana via Nhava Sheva (JNPT) and Mundra Port to 25+ global import corridors.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <RfqModal triggerLabel="Request Instant B2B Export Quote" />
              <a
                href="https://wa.me/918149909546?text=Hello%20Sheshaan%20Global%20Export%20Desk%2C%20I%20would%20like%20to%20request%20an%20FOB%2FCIF%20price%20list."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1da851]"
              >
                WhatsApp Trade Desk (+91 81499 09546)
              </a>
              <a
                href="mailto:info@sheshaanglobal.com?subject=B2B%20Export%20Inquiry%20-%20Sheshaan%20Global"
                className="inline-flex items-center justify-center rounded-full border border-slate-500 bg-slate-800/80 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white"
              >
                Email Quote (info@sheshaanglobal.com)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Programmatic 5-Category & 49-Commodity Directory */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0057B8]">
              Complete ITC-HS Export Architecture
            </span>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              Explore All {PRODUCTS_CATALOG.length} Export Commodities Across 5 Verticals
            </h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-[#0057B8] hover:underline">
            View Master 49-Commodity Specification Table →
          </Link>
        </div>

        {CATEGORIES.map((category) => {
          const items = getProductsByCategory(category.slug);
          return (
            <div key={category.slug} className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    <Link href={`/products/${category.slug}`} className="hover:text-[#0057B8]">
                      {category.h1Headline}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{category.description}</p>
                </div>
                <Link
                  href={`/products/${category.slug}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-800 hover:border-[#0057B8] hover:text-[#0057B8]"
                >
                  Open {category.name} Hub ({items.length} Lines) →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((product) => (
                  <Link
                    key={product.sku}
                    href={`/products/${product.categorySlug}/${product.slug}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#0057B8] hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#FF8A00]">
                        HS {product.hsCode}
                      </span>
                      <span className="text-slate-500">{product.sku}</span>
                    </div>
                    <h4 className="mt-2 font-bold text-slate-900">{product.name}</h4>
                    <p className="mt-1 text-xs text-slate-600">Origin: {product.originCluster}</p>
                    <p className="mt-2 text-xs font-semibold text-slate-800">
                      Grade: {product.specs.primaryGrade}
                    </p>
                    <p className="mt-1 text-xs text-emerald-700 font-medium">
                      Load: {product.logistics.container40ft}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
