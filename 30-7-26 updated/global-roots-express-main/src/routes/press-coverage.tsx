import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Newspaper } from "lucide-react";
import { PRESS_RELEASE_URLS } from "../../data/press-releases";
import { SITE_URL } from "@/lib/seo";

const ARTICLE_TITLE =
  "Sheshaan Global: Connecting India's Agricultural Strength with Global Markets";

function publicationName(url: string) {
  return new URL(url).hostname
    .replace(/^www\./, "")
    .replace(/\.(co\.in|com|in)$/, "")
    .split(/[-.]/)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}

export const Route = createFileRoute("/press-coverage")({
  head: () => ({
    meta: [
      { title: "Press Coverage | Sheshaan Global" },
      {
        name: "description",
        content:
          "Browse published coverage of Sheshaan Global's agricultural commodity sourcing, export process, quality controls and global market operations.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: "Press Coverage | Sheshaan Global" },
      {
        property: "og:description",
        content: "Published coverage of Sheshaan Global's agricultural export operations.",
      },
      { property: "og:url", content: `${SITE_URL}/press-coverage` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/press-coverage` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Sheshaan Global Press Coverage",
          url: `${SITE_URL}/press-coverage`,
          description: "Published press coverage of Sheshaan Global.",
        }),
      },
    ],
  }),
  component: PressCoveragePage,
});

function PressCoveragePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-[#04152D] via-[#072b5a] to-[#0057B8] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
            <Newspaper className="h-4 w-4 text-brand-orange" /> Media &amp; News
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Press Coverage
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
            Read published coverage of Sheshaan Global and our work connecting India&apos;s
            agricultural sourcing regions with international B2B buyers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">
            {PRESS_RELEASE_URLS.length} published releases
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">{ARTICLE_TITLE}</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">
            The coverage discusses our sourcing approach, export coordination, quality processes and
            agricultural commodity supply for global markets.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRESS_RELEASE_URLS.map((url, index) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-lg"
              >
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-brand-orange">
                    Release {index + 1}
                  </span>
                  <span className="mt-1.5 block text-sm font-bold text-slate-900 group-hover:text-brand-blue">
                    {publicationName(url)}
                  </span>
                </span>
                <ExternalLink className="h-5 w-5 shrink-0 text-brand-blue" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
