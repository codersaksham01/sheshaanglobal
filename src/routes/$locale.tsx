import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LOCALE_CONFIGS, type SupportedLocaleCode } from "../../data/i18n";
import { CATEGORIES, PRODUCTS_CATALOG } from "@/lib/empirical-products";
import { TRADE_CORRIDOR_REGIONS, formatDualWeightUnit } from "../../data/corridors";
import { buildCorporationSchema } from "../../data/schemas";
import { SITE_URL } from "@/lib/seo";
import { RfqModal } from "../../components/RfqModal";

const VALID_LOCALES = new Set(["ar", "fr", "ru"]);

export const Route = createFileRoute("/$locale")({
  loader: ({ params }) => {
    if (!VALID_LOCALES.has(params.locale)) throw notFound();
    const config = LOCALE_CONFIGS[params.locale as SupportedLocaleCode];
    if (!config) throw notFound();
    return { config };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Page not found — Sheshaan Global" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { config } = loaderData;
    const url = `${SITE_URL}/${config.code}`;
    return {
      meta: [
        { title: config.seoTitle },
        { name: "description", content: config.metaDescription },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { property: "og:title", content: config.seoTitle },
        { property: "og:description", content: config.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/` },
        { rel: "alternate", hrefLang: "ar", href: `${SITE_URL}/ar` },
        { rel: "alternate", hrefLang: "fr", href: `${SITE_URL}/fr` },
        { rel: "alternate", hrefLang: "ru", href: `${SITE_URL}/ru` },
        { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(buildCorporationSchema()),
        },
      ],
    };
  },
  component: LocalizedRoutePage,
});

function LocalizedRoutePage() {
  const { config } = Route.useLoaderData();

  return (
    <article dir={config.dir} lang={config.code} className="min-h-screen bg-white text-slate-900">
      <header className="bg-[#04152D] text-white border-b border-slate-800 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="rounded-full bg-[#FF8A00] px-3.5 py-1 font-bold text-white">
              {config.nativeName} • {config.name}
            </span>
            <span className="rounded-full border border-slate-600 bg-slate-800/80 px-3.5 py-1 font-semibold text-slate-200">
              {config.currencyNote}
            </span>
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 font-semibold text-emerald-300">
              {config.unitSystemNote}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            {config.h1Headline}
          </h1>

          <p className="mt-5 max-w-4xl text-base sm:text-lg text-slate-300 leading-relaxed">
            {config.heroSummary}
          </p>

          <div className="mt-4 max-w-4xl rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-300">
            {config.chaLogisticsStatement}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <RfqModal triggerLabel={config.ctaPrimary} />
            <a
              href="https://wa.me/918149909546"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1da851]"
            >
              {config.ctaWhatsApp}
            </a>
            <a
              href="mailto:info@sheshaanglobal.com"
              className="inline-flex items-center justify-center rounded-full border border-slate-500 bg-slate-800/80 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white"
            >
              {config.ctaEmail}
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-14">
        <section>
          <h2 className="text-2xl font-bold text-slate-900">{config.catalogHeading}</h2>
          <p className="mt-1 text-sm text-slate-600">
            Target Corridors: <strong>{config.targetRegions}</strong>
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-900 text-xs font-bold uppercase text-white">
                <tr>
                  <th className="px-4 py-3 text-start">HS Code</th>
                  <th className="px-4 py-3 text-start">Commodity / Export Line</th>
                  <th className="px-4 py-3 text-start">Origin (India)</th>
                  <th className="px-4 py-3 text-start">Grade &amp; Calibration</th>
                  <th className="px-4 py-3 text-start">40ft FCL Load (MT / Lbs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {PRODUCTS_CATALOG.map((product) => (
                  <tr key={product.sku} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-bold text-[#0057B8]">
                      {product.hsCode}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      <Link
                        to="/products/$category/$slug"
                        params={{ category: product.categorySlug, slug: product.slug }}
                        className="hover:text-[#0057B8] hover:underline"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{product.originCluster}</td>
                    <td className="px-4 py-3 text-slate-700">{product.specs.primaryGrade}</td>
                    <td className="px-4 py-3 text-emerald-700 font-semibold">
                      {formatDualWeightUnit(product.logistics.eligibleQuantityValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              to="/products"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-[#0057B8] hover:bg-white"
            >
              <div className="text-xs font-bold text-[#FF8A00]">{category.primaryHsChapter}</div>
              <div className="mt-1 font-bold text-slate-900">{category.name}</div>
            </Link>
          ))}
        </section>

        <section className="border-t border-slate-200 pt-8">
          <div className="flex flex-wrap gap-2">
            {TRADE_CORRIDOR_REGIONS.map((region) => (
              <Link
                key={region.slug}
                to="/export-to/$region"
                params={{ region: region.slug }}
                className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#0057B8]"
              >
                {region.flag} {region.shortName}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
