import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Ship } from "lucide-react";
import { BLUE, ORANGE, NAVY } from "@/lib/site";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "UAE Import Buyers - Indian Agricultural Exports | Sheshaan Global";
const DESC =
  "Market guide for UAE buyers sourcing Indian onions, rice, coconut, spices, pulses and fresh produce from Sheshaan Global.";

export const Route = createFileRoute("/markets/uae")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/markets/uae` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/markets/uae` }],
  }),
  component: UaePage,
});

function UaePage() {
  return (
    <MarketPage
      title="Indian agricultural exports for UAE buyers"
      desc={DESC}
      products={[
        "Fresh onions",
        "Green chillies",
        "Basmati and non-basmati rice",
        "Semi-husked coconut",
        "Pulses and spices",
      ]}
      ports={["Jebel Ali", "Khalifa Port", "Sharjah"]}
      region="uae"
    />
  );
}

function MarketPage({
  title,
  desc,
  products,
  ports,
  region,
}: {
  title: string;
  desc: string;
  products: string[];
  ports: string[];
  region: string;
}) {
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
            <span>{region.toUpperCase()}</span>
          </nav>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/78">{desc}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 p-7">
          <Ship className="h-7 w-7" style={{ color: BLUE }} />
          <h2 className="mt-4 font-display text-2xl font-bold text-slate-900">Relevant products</h2>
          <ul className="mt-4 grid gap-2">
            {products.map((p) => (
              <li key={p} className="text-sm text-slate-600">
                {p}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 p-7">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Common destination ports
          </h2>
          <ul className="mt-4 grid gap-2">
            {ports.map((p) => (
              <li key={p} className="text-sm text-slate-600">
                {p}
              </li>
            ))}
          </ul>
          <Link
            to="/export-to/$region"
            params={{ region }}
            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
            style={{ background: ORANGE }}
          >
            Open detailed market route <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </section>
    </main>
  );
}
