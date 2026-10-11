import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CorporationJsonLd } from '../components/JsonLd';
import { RfqModal } from '../components/RfqModal';
import { SpecSheetDownloadModal } from '../components/SpecSheetDownloadModal';
import { CATEGORIES } from '../data/products';

const BASE_URL = 'https://www.sheshaanglobal.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Sheshaan Global | Agricultural Commodity Exporter in India (APEDA, FSSAI & CDB Certified)',
    template: '%s',
  },
  description:
    'APEDA, FSSAI, and Coconut Development Board (CDB) certified agricultural commodity exporter in Maharashtra, India. Bulk 20ft/40ft FCL supplier of 49 export lines: Nashik red onions, 1121 Basmati rice, Unjha spices, Pollachi coconuts, pulses & dry fruits.',
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Sheshaan Global | Agricultural Commodity Exporter in India',
    description:
      'Direct farm-cluster & packhouse exporter of 49 Indian agricultural commodities (Fresh Vegetables, Fruits, Spices, Basmati Rice, Pulses & Dry Fruits) with SGS pre-shipment inspection.',
    url: BASE_URL,
    siteName: 'Sheshaan Global',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Site-Wide Master Corporate Organization Schema (Corporation JSON-LD) */}
        <CorporationJsonLd />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased flex flex-col">
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#04152D] text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-xl font-extrabold tracking-tight text-white">
                SHESHAAN <span className="text-[#FF8A00]">GLOBAL</span>
              </span>
              <span className="hidden rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 sm:inline-block">
                APEDA • FSSAI • CDB Certified
              </span>
            </Link>

            <nav aria-label="Primary Navigation" className="hidden items-center gap-5 text-sm font-medium text-slate-200 lg:flex">
              <Link href="/products" className="hover:text-[#FF8A00]">
                49-Commodity Catalog
              </Link>
              <Link href="/exports" className="hover:text-[#FF8A00]">
                Export Corridors
              </Link>
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="hover:text-[#FF8A00]"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <SpecSheetDownloadModal
                commodityName="2026 Master Agricultural Export Catalog (49 Commodities)"
                hsCode="0703-1211"
                originCluster="Nashik, Unjha, Sangli, Pollachi, Karnal & Mithila, India"
                primaryGrade="APEDA, FSSAI & CDB Export Calibrated"
                moistureTolerance="Commodity-Specific SGS Tolerances"
                packaging="5kg to 50kg Export Mesh, Jute, PP & Vacuum Packs"
                container20ft="12 MT - 25 MT per 20ft FCL"
                container40ft="24 MT - 29 MT per 40ft High-Cube / Reefer FCL"
                gatewayPorts={['Nhava Sheva (JNPT)', 'Mundra Port', 'Chennai / Cochin']}
                variant="header"
                triggerLabel="2026 Product Catalog"
              />
              <a
                href="https://wa.me/918149909546"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1da851] sm:inline-flex"
              >
                WhatsApp (+91 81499 09546)
              </a>
              {/* Strictly user-initiated RFQ modal — zero automatic popups on load */}
              <RfqModal triggerLabel="Request Export Price List" />
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-800 bg-[#04152D] text-slate-300">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <div className="text-lg font-extrabold text-white">
                  SHESHAAN <span className="text-[#FF8A00]">GLOBAL</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Premier agricultural commodity exporter headquartered in Maharashtra, India (Founded 2022). Registered with APEDA, FSSAI, DGFT (IEC), and the Coconut Development Board (CDB).
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <a
                    href="https://www.linkedin.com/company/sheshaan-global/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 font-semibold text-slate-200 hover:border-[#FF8A00] hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/sheshaanglobal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 font-semibold text-slate-200 hover:border-[#FF8A00] hover:text-white"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://freshdi.com/supplier/Sheshaan-Global"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 font-semibold text-slate-200 hover:border-[#FF8A00] hover:text-white"
                  >
                    Freshdi
                  </a>
                  <a
                    href="https://www.tradekey.com/company/Sheshaan-Global-14840241.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 font-semibold text-slate-200 hover:border-[#FF8A00] hover:text-white"
                  >
                    TradeKey
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
                  Export Verticals
                </h3>
                <ul className="mt-3 space-y-2 text-xs">
                  {CATEGORIES.map((category) => (
                    <li key={category.slug}>
                      <Link href={`/products/${category.slug}`} className="hover:text-white">
                        {category.name} ({category.primaryHsChapter})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
                  Gateway Ports &amp; Compliance
                </h3>
                <ul className="mt-3 space-y-2 text-xs text-slate-400">
                  <li>• Nhava Sheva (JNPT), Mumbai</li>
                  <li>• Mundra &amp; Kandla Ports, Gujarat</li>
                  <li>• Chennai, Cochin &amp; Tuticorin Ports</li>
                  <li>• SGS, Bureau Veritas &amp; Geo-Chem Inspection</li>
                  <li>
                    <Link href="/exports" className="text-[#FF8A00] hover:underline">
                      → Explore Global Trade Corridors
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
                  B2B Export Trade Desk
                </h3>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li>CEO: Sana Zeba Bakshi</li>
                  <li>COO: Juned Barade</li>
                  <li>Business Development: Saksham Singh</li>
                  <li>
                    Phone / WhatsApp:{' '}
                    <a href="https://wa.me/918149909546" className="text-[#FF8A00] hover:underline">
                      +91 81499 09546
                    </a>
                  </li>
                  <li>
                    Email:{' '}
                    <a href="mailto:info@sheshaanglobal.com" className="text-[#FF8A00] hover:underline">
                      info@sheshaanglobal.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-500 flex flex-wrap justify-between gap-4">
              <span>© {new Date().getFullYear()} Sheshaan Global (Maharashtra, India). All rights reserved.</span>
              <span>FOB • CFR • CIF | L/C at Sight • DP/CAD • TT</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
