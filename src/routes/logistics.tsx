import { createFileRoute, Link } from "@tanstack/react-router";
import { Anchor, ArrowRight, FileText, Plane, Ship } from "lucide-react";
import { BLUE, ORANGE, NAVY } from "@/lib/site";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "Export Logistics - Ports, Freight and Documents | Sheshaan Global";
const DESC =
  "Sheshaan Global logistics information for agricultural exports from India: loading ports, ocean/air freight planning, Incoterms and shipment documents.";

export const Route = createFileRoute("/logistics")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/logistics` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/logistics` }],
  }),
  component: LogisticsPage,
});

function LogisticsPage() {
  const items = [
    {
      Icon: Anchor,
      title: "Loading ports",
      body: "Quotations may use Indian loading ports such as Nhava Sheva, Mundra, Chennai or other practical ports based on product and route.",
    },
    {
      Icon: Ship,
      title: "Ocean freight",
      body: "FCL and LCL options are reviewed against volume, packaging, lead time and destination port requirements.",
    },
    {
      Icon: Plane,
      title: "Air freight",
      body: "Air freight can be considered for samples, urgent shipments and selected perishable products where commercially practical.",
    },
    {
      Icon: FileText,
      title: "Documents",
      body: "Shipment documents are coordinated according to buyer, customs broker and destination requirements.",
    },
  ];
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
            <span>Logistics</span>
          </nav>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Export logistics planning for international buyers
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/78">{DESC}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-white"
                style={{ background: BLUE }}
              >
                <item.Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-lg font-bold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
        <Link
          to="/contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ background: ORANGE }}
        >
          Request freight basis <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
