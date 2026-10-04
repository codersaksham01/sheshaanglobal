import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardCheck, FileCheck2, PackageCheck, ShieldCheck } from "lucide-react";
import { BLUE, ORANGE, NAVY } from "@/lib/site";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "Quality Approach - Agricultural Export Checks | Sheshaan Global";
const DESC =
  "How Sheshaan Global approaches agricultural export quality: sourcing checks, grading, packing verification, documentation and buyer-specific inspection needs.";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/quality` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/quality` }],
  }),
  component: QualityPage,
});

function QualityPage() {
  const checks = [
    {
      Icon: ClipboardCheck,
      title: "Product checks",
      body: "Lots are reviewed for visible quality, grading, moisture or freshness indicators based on product category and buyer requirement.",
    },
    {
      Icon: PackageCheck,
      title: "Packing verification",
      body: "Net weight, bag/carton type, labelling and buyer artwork are checked before dispatch where custom packing is requested.",
    },
    {
      Icon: FileCheck2,
      title: "Document alignment",
      body: "Shipment paperwork is matched to the agreed product, quantity, port, Incoterm and buyer/importer details.",
    },
    {
      Icon: ShieldCheck,
      title: "Third-party testing",
      body: "Lab tests, inspection reports or certificates can be coordinated when required by the buyer or destination market.",
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
            <span>Quality</span>
          </nav>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Quality approach for export-grade agricultural products
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/78">{DESC}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {checks.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-white"
                style={{ background: BLUE }}
              >
                <c.Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-lg font-bold text-slate-900">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-7">
          <h2 className="font-display text-2xl font-bold" style={{ color: NAVY }}>
            Buyer responsibility
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Share destination regulations, grade expectations and inspection requirements before
            quotation. This helps align pricing and avoids surprises during clearance.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
            style={{ background: ORANGE }}
          >
            Request specifications <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
