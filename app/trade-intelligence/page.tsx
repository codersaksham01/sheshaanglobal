import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS_CATALOG, CATEGORIES } from "../../data/products";
import { TRADE_CORRIDOR_REGIONS, formatDualWeightUnit } from "../../data/corridors";
import { buildHreflangAlternates } from "../../data/i18n";
import {
  JsonLd,
  buildCorporationSchema,
  buildExportClearanceHowToSchema,
  buildRegulatoryAnnouncementSchema,
} from "../../components/JsonLd";
import { RfqModal } from "../../components/RfqModal";

export const metadata: Metadata = {
  title: "Indian Agri Export Intelligence, Crop Calendar & CHA Compliance",
  description:
    "Live 2026 Indian agricultural harvest calendar, APEDA/FSSAI/DGFT export compliance checklist, licensed CHA customs clearance, and third-party shipping line protocols.",
  alternates: buildHreflangAlternates("/trade-intelligence"),
};

export default function TradeIntelligenceHubPage() {
  return (
    <article className="min-h-screen bg-white text-slate-900">
      <JsonLd
        data={[
          buildCorporationSchema(),
          buildExportClearanceHowToSchema(),
          buildRegulatoryAnnouncementSchema(),
        ]}
      />

      <header className="bg-[#04152D] text-white border-b border-slate-800 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="rounded-full bg-[#FF8A00] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
            2026 Indian Agribusiness &amp; Customs Advisory Hub
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            Indian Agricultural Export Intelligence: Harvest Seasonality, DGFT Compliance &amp;
            Licensed CHA Execution
          </h1>
          <p className="mt-5 max-w-4xl text-base text-slate-300 leading-relaxed">
            A real-time procurement reference engineered for international food importers,
            supermarket supply managers, and commodity brokers. Review live crop windows across all
            49 Indian export lines, statutory APEDA/FSSAI/CDB documentation checklists, and our
            licensed Customs House Agent (CHA) + third-party shipping line dispatch governance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RfqModal triggerLabel="Request Official FOB / CIF Price List" />
            <a
              href="https://wa.me/918149909546"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg"
            >
              WhatsApp Trade Desk (+91 81499 09546)
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* 1. Licensed CHA & Third-Party Shipping Line Execution */}
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0057B8]">
            Port &amp; Maritime Governance
          </span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            4-Stage Export Clearance via Licensed CHA &amp; Mainline Ocean Carriers
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sheshaan Global partners with licensed Customs House Agents (CHA) at Nhava Sheva (JNPT),
            Mundra, and Chennai ports alongside tier-1 third-party container shipping lines (Maersk,
            MSC, CMA CGM, Hapag-Lloyd, ONE) to guarantee zero-delay port clearance:
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-bold text-[#FF8A00]">STAGE 01</div>
              <h3 className="mt-1 font-bold text-slate-900">Farm &amp; Packhouse Grading</h3>
              <p className="mt-2 text-xs text-slate-600">
                Direct farm-cluster procurement in Maharashtra, Gujarat, Punjab, and Tamil Nadu with
                Sortex/size calibration.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-bold text-[#FF8A00]">STAGE 02</div>
              <h3 className="mt-1 font-bold text-slate-900">SGS Lab &amp; Phyto Clearance</h3>
              <p className="mt-2 text-xs text-slate-600">
                Third-party SGS/Bureau Veritas inspection for moisture, EU-MRL residue, and Ministry
                of Agriculture Phytosanitary certification.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-bold text-[#FF8A00]">STAGE 03</div>
              <h3 className="mt-1 font-bold text-slate-900">Licensed CHA Customs Filing</h3>
              <p className="mt-2 text-xs text-slate-600">
                ICEGATE Shipping Bill filing, Let Export Order (LEO) customs clearance, and
                container sealing by our licensed CHA.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-bold text-[#FF8A00]">STAGE 04</div>
              <h3 className="mt-1 font-bold text-slate-900">Mainline Vessel Dispatch</h3>
              <p className="mt-2 text-xs text-slate-600">
                Direct vessel loading on third-party shipping lines with original/telex Bill of
                Lading and Chamber-attested COO.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Master 49-Commodity Seasonality & Loadability Matrix */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Master 49-Commodity Harvest Seasonality &amp; Container Loadability Matrix
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-xs font-bold uppercase text-white">
                <tr>
                  <th className="px-4 py-3">HS Code</th>
                  <th className="px-4 py-3">Commodity</th>
                  <th className="px-4 py-3">Origin Cluster</th>
                  <th className="px-4 py-3">Peak Export Window</th>
                  <th className="px-4 py-3">Net Load (MT / Lbs / CWT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {PRODUCTS_CATALOG.map((product) => (
                  <tr key={product.sku} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-bold text-[#0057B8]">
                      {product.hsCode}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      <Link
                        href={`/products/${product.categorySlug}/${product.slug}`}
                        className="hover:text-[#0057B8] hover:underline"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{product.originCluster}</td>
                    <td className="px-4 py-3 text-emerald-700 font-semibold">
                      {product.harvestCalendar.peakExportMonths.join(", ")}
                    </td>
                    <td className="px-4 py-3 text-slate-800">
                      {formatDualWeightUnit(product.logistics.eligibleQuantityValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Destination Country Import Compliance Matrix */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Destination Country Customs &amp; Phytosanitary Authorities (16 Trade Lanes)
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRADE_CORRIDOR_REGIONS.map((region) => (
              <div
                key={region.slug}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-sm font-bold text-slate-900">
                  {region.flag} {region.shortName}
                </div>
                <div className="mt-1 text-xs font-semibold text-[#0057B8]">
                  {region.dischargePorts[0]}
                </div>
                <p className="mt-2 text-xs text-slate-600">{region.importAuthority}</p>
                <div className="mt-3 text-[11px] font-medium text-emerald-700">
                  {region.transitTimeFromIndia}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
