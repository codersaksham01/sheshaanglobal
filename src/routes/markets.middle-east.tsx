import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ORANGE, NAVY } from "@/lib/site";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "Middle East Import Buyers - Indian Agricultural Exports | Sheshaan Global";
const DESC =
  "Sourcing guide for Middle East buyers importing Indian onions, green chillies, rice, coconut, spices, pulses and fresh produce.";

export const Route = createFileRoute("/markets/middle-east")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/markets/middle-east` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/markets/middle-east` }],
  }),
  component: MiddleEastPage,
});

function MiddleEastPage() {
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
            <Link to="/markets" className="hover:text-white">
              Markets
            </Link>
            <span className="px-2">/</span>
            <span>Middle East</span>
          </nav>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Indian agricultural exports for Middle East importers
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/78">{DESC}</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-slate-900">Regional sourcing notes</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Middle East importers often need stable supply, Arabic/English label planning, fast
          document turnaround and clarity on Jebel Ali, Jeddah, Dammam, Doha, Kuwait, Sohar and
          Bahrain shipment routes.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/markets/uae"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700"
          >
            UAE page
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
            style={{ background: ORANGE }}
          >
            Request quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
