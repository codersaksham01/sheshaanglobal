import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2 } from "lucide-react";
import { BLUE, ORANGE, NAVY, REGIONS } from "@/lib/site";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "Export Markets - Agricultural Products From India | Sheshaan Global";
const DESC =
  "Explore Sheshaan Global export market information for international buyers in the UAE, Middle East, Africa and other regions.";

export const Route = createFileRoute("/markets")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/markets` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/markets` }],
  }),
  component: MarketsPage,
});

function MarketsPage() {
  return (
    <main className="bg-white">
      <section
        className="px-6 pb-16 pt-28 text-white"
        style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
      >
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/65">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <span>Markets</span>
          </nav>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Export markets for Indian agricultural products
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/78">{DESC}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/markets/uae"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
            >
              UAE
            </Link>
            <Link
              to="/markets/middle-east"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
            >
              Middle East
            </Link>
            <Link
              to="/markets/africa"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
            >
              Africa
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((r) => (
            <Link
              key={r.slug}
              to="/export-to/$region"
              params={{ region: r.slug }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-[#0057B8]"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.flag}</span>
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900">{r.name}</h2>
                  <p className="text-xs text-slate-500">{r.transitDays}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{r.intro}</p>
              <span
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                style={{ color: BLUE }}
              >
                View market page <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
