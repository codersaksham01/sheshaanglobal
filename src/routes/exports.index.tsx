import { createFileRoute } from "@tanstack/react-router";
import { EXPORT_CORRIDOR_LANES } from "../../data/corridors";
import { buildCorporationSchema } from "../../data/schemas";
import { DEFAULT_OG_IMAGE, SITE_URL } from "../lib/seo";

const TITLE = "Global Agricultural Export Corridors from India | Sheshaan Global";
const DESC =
  "Direct agricultural commodity export corridors from Nhava Sheva (JNPT) & Mundra, India to Dubai (Jebel Ali), Saudi Arabia (Dammam), USA (New York), UK & Rotterdam.";

export const Route = createFileRoute("/exports/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/exports` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/exports` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildCorporationSchema()),
      },
    ],
  }),
  component: ExportsHubRoutePage,
});

function ExportsHubRoutePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 font-sans text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="rounded-3xl bg-slate-900 p-8 text-white sm:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Port-to-Port Wholesale Trade Lanes • Nhava Sheva (JNPT) &amp; Mundra
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Dedicated Agricultural Export Corridors from India
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-200">
            Explore destination-specific commodity specifications, container stuffing capacities,
            import quarantine documentation, and ocean transit schedules for global wholesale
            buyers.
          </p>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXPORT_CORRIDOR_LANES.map((lane) => (
            <a
              key={lane.slug}
              href={`/exports/${lane.slug}`}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-500 hover:shadow-md"
            >
              <div>
                <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                  {lane.targetPortLabel}
                </span>
                <h2 className="mt-3 text-lg font-bold text-slate-900">
                  {lane.seoTitle.split("|")[0].trim()}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {lane.metaDescription}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-bold text-emerald-700">
                View Corridor Specifications →
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
