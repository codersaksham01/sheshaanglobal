import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS_CATALOG } from "@/lib/empirical-products";
import { TRADE_CORRIDOR_REGIONS, formatDualWeightUnit } from "../../data/corridors";
import {
  buildCorporationSchema,
  buildExportClearanceHowToSchema,
  buildRegulatoryAnnouncementSchema,
} from "../../data/schemas";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/trade-intelligence")({
  head: () => {
    const url = `${SITE_URL}/trade-intelligence`;
    const title = "Indian Agri Export Intelligence, Crop Calendar & CHA Compliance | Sheshaan Global";
    const desc =
      "Live 2026 Indian agricultural harvest calendar, APEDA/FSSAI/DGFT export compliance checklist, licensed CHA customs clearance, and third-party shipping line protocols.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(buildCorporationSchema()),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(buildExportClearanceHowToSchema()),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(buildRegulatoryAnnouncementSchema()),
        },
      ],
    };
  },
  component: TradeIntelligenceRouteComponent,
});

function TradeIntelligenceRouteComponent() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="bg-[#04152D] text-white border-b border-slate-800 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="rounded-full bg-[#FF8A00] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
            2026 Indian Agribusiness &amp; Customs Advisory Hub
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            Indian Agricultural Export Intelligence: Harvest Seasonality, DGFT Compliance &amp; Licensed CHA Execution
          </h1>
          <p className="mt-5 max-w-4xl text-base text-slate-300 leading-relaxed">
            A procurement intelligence hub for international food importers and wholesale buyers. Review peak harvest windows across all 49 Indian export commodities, statutory APEDA/FSSAI/CDB documentation checklists, and our licensed Customs House Agent (CHA) + third-party shipping line execution protocol.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            4-Stage Export Clearance via Licensed CHA &amp; Mainline Ocean Carriers
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sheshaan Global executes all customs clearance through licensed Customs House Agents (CHA) at Nhava Sheva (JNPT), Mundra, and Chennai ports and ships via tier-1 third-party container shipping lines (Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE).
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-bold text-[#FF8A00]">STAGE 01</div>
              <h3 className="mt-1 font-bold text-slate-900">Farm &amp; Packhouse Grading</h3>
              <p className="mt-2 text-xs text-slate-600">
                Direct farm-cluster procurement in Maharashtra, Gujarat, Punjab, and Tamil Nadu with Sortex/size calibration.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-bold text-[#FF8A00]">STAGE 02</div>
              <h3 className="mt-1 font-bold text-slate-900">SGS Lab &amp; Phyto Clearance</h3>
              <p className="mt-2 text-xs text-slate-600">
                Third-party SGS/Bureau Veritas inspection for moisture, EU-MRL residue, and Ministry of Agriculture Phytosanitary certification.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-bold text-[#FF8A00]">STAGE 03</div>
              <h3 className="mt-1 font-bold text-slate-900">Licensed CHA Customs Filing</h3>
              <p className="mt-2 text-xs text-slate-600">
                ICEGATE Shipping Bill filing, Let Export Order (LEO) customs clearance, and container sealing by our licensed CHA.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-bold text-[#FF8A00]">STAGE 04</div>
              <h3 className="mt-1 font-bold text-slate-900">Mainline Vessel Dispatch</h3>
              <p className="mt-2 text-xs text-slate-600">
                Direct vessel loading on third-party shipping lines with original/telex Bill of Lading and Chamber-attested COO.
              </p>
            </div>
          </div>
        </section>

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
                        to="/products/$category/$slug"
                        params={{ category: product.categorySlug, slug: product.slug }}
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

        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Destination Country Customs &amp; Phytosanitary Authorities (16 Trade Lanes)
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRADE_CORRIDOR_REGIONS.map((region) => (
              <Link
                key={region.slug}
                to="/export-to/$region"
                params={{ region: region.slug }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-[#0057B8] hover:bg-white"
              >
                <div className="text-sm font-bold text-slate-900">
                  {region.flag} {region.shortName}
                </div>
                <div className="mt-1 text-xs font-semibold text-[#0057B8]">
                  {region.dischargePorts[0]}
                </div>
                <p className="mt-2 text-xs text-slate-600">{region.importAuthority}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
