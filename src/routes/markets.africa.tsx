import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ORANGE, NAVY } from "@/lib/site";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "Africa Import Buyers - Indian Agricultural Exports | Sheshaan Global";
const DESC =
  "Useful sourcing information for African import buyers evaluating Indian rice, pulses, spices, onions, dry fruits and food commodities.";

export const Route = createFileRoute("/markets/africa")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/markets/africa` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/markets/africa` }],
  }),
  component: AfricaPage,
});

function AfricaPage() {
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
            <span>Africa</span>
          </nav>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Indian agricultural commodity supply for African buyers
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/78">{DESC}</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-slate-900">Buyer information</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          African buyers often compare product grade, bag size, fumigation, certificate of origin,
          payment terms and container planning. Share your discharge port and monthly requirement so
          quotations can be prepared on a realistic freight basis.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ background: ORANGE }}
        >
          Request Africa quotation <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
