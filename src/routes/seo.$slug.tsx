import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, MessageCircle, Package, Ship } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  BLUE, NAVY, ORANGE, SITE_URL, buildWhatsAppUrl, getProductBySlug,
  getRegionBySlug, getSeoLandingPage, type SeoLandingPage,
} from "@/lib/site";

export const Route = createFileRoute("/seo/$slug")({
  loader: ({ params }) => {
    const page = getSeoLandingPage(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Page not found - Sheshaan Global" }, { name: "robots", content: "noindex" }] };
    const page = loaderData.page;
    const url = `${SITE_URL}/seo/${params.slug}`;
    return {
      meta: [
        { title: page.title },
        { name: "description", content: page.description },
        { name: "keywords", content: `${page.keyword}, Sheshaan Global, Indian exporter, FOB quote, CIF quote` },
        { property: "og:title", content: page.title },
        { property: "og:description", content: page.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: SeoLanding,
});

function SeoLanding() {
  const { page } = Route.useLoaderData() as { page: SeoLandingPage };
  const product = page.productSlug ? getProductBySlug(page.productSlug) : undefined;
  const region = page.regionSlug ? getRegionBySlug(page.regionSlug) : undefined;
  const waUrl = buildWhatsAppUrl({
    category: page.keyword,
    country: region?.name,
    message: `Please share pricing and availability for ${page.keyword}.`,
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Sheshaan Global" className="h-10 w-10 object-contain" width={40} height={40} />
            <div className="leading-tight">
              <div className="font-display text-base font-bold" style={{ color: BLUE }}>SHESHAAN</div>
              <div className="text-[9px] font-semibold tracking-[0.18em]" style={{ color: ORANGE }}>EXPORTING GOODNESS</div>
            </div>
          </Link>
          <Link to="/request-quote" className="rounded-full px-4 py-2 text-xs font-bold text-white" style={{ background: BLUE }}>
            Request Quote
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden py-14 sm:py-20" style={{ background: `linear-gradient(135deg,${NAVY},#06356d)` }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1fr,0.85fr] lg:items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest">
              <Ship className="h-4 w-4" style={{ color: ORANGE }} /> Export Supply Page
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              {page.keyword}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">{page.hero}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg" style={{ background: "#25D366" }}>
                <MessageCircle className="h-4 w-4" /> Get Latest Price
              </a>
              <Link to="/request-quote" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg" style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}>
                <FileText className="h-4 w-4" /> Request Full Quote
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur lg:mx-0 lg:justify-self-end">
            {product?.img ? (
              <img src={product.img} alt={page.keyword} className="aspect-[5/3] w-full rounded-xl object-cover" width={560} height={336} />
            ) : (
              <div className="grid aspect-[5/3] place-items-center rounded-xl bg-white/10 text-white">
                <Package className="h-16 w-16" />
              </div>
            )}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(region ? [`Ship to ${region.short}`, region.transitDays] : ["FOB / CIF quotes", "Global shipping"]).map((x) => (
                <div key={x} className="rounded-xl bg-white p-4 text-sm font-bold text-slate-800">{x}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr,1.2fr]">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900">Why buyers choose Sheshaan Global</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{page.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {page.points.map((point) => (
              <div key={point} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <CheckCircle2 className="h-5 w-5" style={{ color: ORANGE }} />
                <div className="mt-3 text-sm font-semibold text-slate-800">{point}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-slate-900">Buyer Questions</h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {page.faqs.map((faq) => (
              <details key={faq.q} className="group p-5">
                <summary className="cursor-pointer list-none font-semibold text-slate-900">{faq.q}</summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 text-white" style={{ background: NAVY }}>
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold">Ready to discuss this requirement?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75">Send your product, quantity, destination and packing requirement. We will prepare the right export quote.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/request-quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-900">
              Request Quote <ArrowRight className="h-4 w-4" />
            </Link>
            {product && (
              <Link to="/products/$slug" params={{ slug: product.slug }} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white">
                View Product <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
