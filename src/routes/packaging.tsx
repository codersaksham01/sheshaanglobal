import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Package, Tags, Warehouse } from "lucide-react";
import { BLUE, ORANGE, NAVY } from "@/lib/site";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "Export Packaging Options - Bulk and Private Label | Sheshaan Global";
const DESC =
  "Packaging options for Sheshaan Global export buyers: PP bags, mesh bags, jute bags, cartons, bulk packing and private-label coordination.";

export const Route = createFileRoute("/packaging")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/packaging` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/packaging` }],
  }),
  component: PackagingPage,
});

function PackagingPage() {
  const options = [
    {
      Icon: Package,
      title: "Bulk bags",
      body: "PP woven, HDPE, jute or mesh bags can be planned based on product type and destination requirements.",
    },
    {
      Icon: Boxes,
      title: "Cartons and crates",
      body: "Fresh produce can be packed in ventilated cartons or crates where shelf-life and handling require airflow.",
    },
    {
      Icon: Tags,
      title: "Private label",
      body: "Buyer artwork and retail pack requirements can be reviewed before production and commercial dispatch.",
    },
    {
      Icon: Warehouse,
      title: "Container planning",
      body: "Packing decisions should align with FCL/LCL, reefer, dry container or air freight requirements.",
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
            <span>Packaging</span>
          </nav>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Export packaging for bulk agricultural shipments
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/78">{DESC}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {options.map((o) => (
            <article
              key={o.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-white"
                style={{ background: BLUE }}
              >
                <o.Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-lg font-bold text-slate-900">{o.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{o.body}</p>
            </article>
          ))}
        </div>
        <Link
          to="/contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ background: ORANGE }}
        >
          Discuss packing <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
