import { createFileRoute, Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { ArrowRight, ClipboardCheck, FileText, PackageCheck, Ship, Wallet } from "lucide-react";
import { BLUE, ORANGE, NAVY } from "@/lib/site";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "Export Process - How Sheshaan Global Handles B2B Shipments";
const DESC =
  "Understand the Sheshaan Global export process from buyer inquiry and quotation to packing, documentation, dispatch and shipment follow-up.";

export const Route = createFileRoute("/export-process")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/export-process` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/export-process` }],
  }),
  component: ExportProcessPage,
});

function ExportProcessPage() {
  const steps = [
    {
      Icon: ClipboardCheck,
      title: "Requirement review",
      body: "Share product, quantity, destination port, packing and target timeline so the export desk can confirm feasibility.",
    },
    {
      Icon: Wallet,
      title: "Quotation",
      body: "Receive FOB, CFR or CIF pricing based on product grade, packing, loading port, documentation scope and freight assumptions.",
    },
    {
      Icon: PackageCheck,
      title: "Sourcing and packing",
      body: "Approved lots are inspected, graded and packed according to buyer-agreed requirements before dispatch.",
    },
    {
      Icon: FileText,
      title: "Documents",
      body: "Commercial and shipment documents are prepared, including invoice, packing list, origin, phytosanitary and Bill of Lading where applicable.",
    },
    {
      Icon: Ship,
      title: "Shipment follow-up",
      body: "Container movement and document updates are shared so buyers can plan clearance at destination.",
    },
  ];
  return (
    <InfoPage
      title="Export process for agricultural commodity buyers"
      desc={DESC}
      steps={steps}
      cta="Send your requirement"
    />
  );
}

function InfoPage({
  title,
  desc,
  steps,
  cta,
}: {
  title: string;
  desc: string;
  steps: { Icon: ComponentType<{ className?: string }>; title: string; body: string }[];
  cta: string;
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
            <span>Export Process</span>
          </nav>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/78">{desc}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <article
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: ORANGE }}>
                Step {i + 1}
              </div>
              <div
                className="mt-3 grid h-11 w-11 place-items-center rounded-xl text-white"
                style={{ background: BLUE }}
              >
                <s.Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-lg font-bold text-slate-900">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </article>
          ))}
        </div>
        <Link
          to="/contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
