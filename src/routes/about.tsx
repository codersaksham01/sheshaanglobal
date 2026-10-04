import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, FileCheck2, Globe2, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";
import { BLUE, ORANGE, NAVY, EMAIL } from "@/lib/site";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

const TITLE = "About Sheshaan Global - Indian Agricultural Export Partner";
const DESC =
  "Learn about Sheshaan Global, an India-based agricultural commodity export partner for importers, distributors and bulk food buyers.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/about` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const pillars = [
    {
      Icon: Building2,
      title: "India-based sourcing desk",
      body: "Sheshaan Global works from Maharashtra, India, coordinating agricultural product sourcing, packing and export documentation for international buyers.",
    },
    {
      Icon: ShieldCheck,
      title: "Quality-led supply",
      body: "Lots are checked for buyer-agreed quality parameters before packing. Product-specific certificates are shared where applicable and available.",
    },
    {
      Icon: FileCheck2,
      title: "Export documentation",
      body: "The export desk supports commercial invoice, packing list, certificate of origin, phytosanitary, fumigation and Bill of Lading workflows.",
    },
    {
      Icon: Globe2,
      title: "B2B buyer focus",
      body: "The site and inquiry process are built for importers, wholesalers, distributors, retail packers and food commodity buyers.",
    },
  ];

  return (
    <main className="bg-white">
      <section
        className="relative overflow-hidden px-6 pb-16 pt-28 text-white"
        style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
      >
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/65">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <span>About</span>
          </nav>
          <img src={logo} alt="Sheshaan Global logo" className="h-14 w-14 object-contain" />
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl">
            India-based agricultural export partner for serious B2B buyers
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/78">
            Sheshaan Global helps importers source Indian agricultural commodities with clear
            communication, practical packing guidance and shipment documentation support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
            >
              View products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ background: ORANGE }}
            >
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-white"
                style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
              >
                <p.Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-lg font-bold text-slate-900">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-7">
          <h2 className="font-display text-2xl font-bold" style={{ color: NAVY }}>
            A note on business information
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            This website avoids unsupported claims. Certifications, registrations and product
            details should be updated only when the company can provide current proof. For direct
            verification or trade references, contact {EMAIL}.
          </p>
        </div>
      </section>
    </main>
  );
}
