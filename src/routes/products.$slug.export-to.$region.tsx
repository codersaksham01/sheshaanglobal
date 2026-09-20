import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  FileText,
  Mail,
  MessageCircle,
  Package,
  Ship,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  BLUE,
  BROCHURE_URL,
  EMAIL,
  MAILTO_URL,
  NAVY,
  ORANGE,
  buildWhatsAppUrl,
  getProductBySlug,
  getRegionBySlug,
  type Product,
  type Region,
} from "@/lib/site";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/products/$slug/export-to/$region")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    const region = getRegionBySlug(params.region);
    if (!product || !region) throw notFound();
    return { product, region };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return { meta: [{ title: "Export page not found" }, { name: "robots", content: "noindex" }] };
    const { product, region } = loaderData;
    const url = `${SITE_URL}/products/${params.slug}/export-to/${params.region}`;
    const title = `${product.name} Exporter to ${region.name} - ${SITE_NAME}`;
    const desc = `Import ${product.name.toLowerCase()} from India to ${region.name}. HS code ${product.hsCode ?? "available on request"}, packing, documents, ports, Incoterms and quotation support from Sheshaan Global.`;
    const img = absoluteUrl(product.img || product.gallery[0] || "/logo.png");
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content: `${product.name} exporter to ${region.name}, ${product.name} supplier ${region.short}, Indian ${product.name} export, HS ${product.hsCode ?? ""}`,
        },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: img },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${product.name} export from India to ${region.name}`,
            provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
            areaServed: { "@type": "Country", name: region.name },
            serviceType: "Agricultural product export supply",
            description: desc,
            url,
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${product.name} export offer`,
              itemListElement: product.packing.map((packing) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: product.name,
                  sku: product.hsCode ? `HS-${product.hsCode}` : undefined,
                },
                description: packing,
              })),
            },
          }),
        },
      ],
    };
  },
  component: ProductRegionPage,
});

function ProductRegionPage() {
  const { product, region } = Route.useLoaderData() as { product: Product; region: Region };
  const waUrl = buildWhatsAppUrl({
    category: `${product.name} to ${region.name}`,
    message: `Please share FOB/CIF pricing for ${product.name} to ${region.ports[0] ?? region.name}.`,
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section
        className="relative overflow-hidden px-6 py-20 text-white"
        style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <nav className="text-xs text-white/60">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <span className="px-2">/</span>
              <Link
                to="/products/$slug"
                params={{ slug: product.slug }}
                className="hover:text-white"
              >
                {product.name}
              </Link>
              <span className="px-2">/</span>
              <span>{region.short}</span>
            </nav>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
              <span>{region.flag}</span> Product + market export page
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl">
              {product.name} exporter from India to{" "}
              <span style={{ color: ORANGE }}>{region.name}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-white/75">
              Sheshaan Global supplies export-grade {product.name.toLowerCase()} to {region.short}{" "}
              buyers with packing, documents, Incoterms and port coordination handled by our export
              desk.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
                style={{ background: "#25D366" }}
              >
                <MessageCircle className="h-4 w-4" /> Request CIF quote
              </a>
              <a
                href={BROCHURE_URL}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <FileText className="h-4 w-4" /> Download catalogue
              </a>
              <a
                href={MAILTO_URL}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Mail className="h-4 w-4" /> {EMAIL}
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-3 shadow-2xl">
            <img
              src={product.img || product.gallery[0]}
              alt={`${product.name} export to ${region.name}`}
              width={720}
              height={540}
              loading="eager"
              fetchPriority="high"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Fact icon={Package} label="HS Code" value={product.hsCode ?? "On request"} />
          <Fact icon={Ship} label="Key Ports" value={region.ports.slice(0, 2).join(", ")} />
          <Fact
            icon={ShieldCheck}
            label="Incoterms"
            value={region.incoterms.slice(0, 3).join(", ")}
          />
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Panel title={`Why import ${product.name} from India`}>
            <p>{product.description}</p>
            <ul className="mt-5 space-y-2">
              {product.standards.map((s) => (
                <li key={s}>- {s}</li>
              ))}
            </ul>
          </Panel>
          <Panel title={`Documents for ${region.short} buyers`}>
            <ul className="space-y-2">
              {[
                "Commercial Invoice",
                "Packing List",
                "Certificate of Origin",
                "Phytosanitary Certificate",
                "Fumigation Certificate",
                "Bill of Lading",
                "Health Certificate where applicable",
              ].map((d) => (
                <li key={d}>- {d}</li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>
    </main>
  );
}

function Fact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <Icon className="h-6 w-6" style={{ color: BLUE }} />
      <div className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-400">{label}</div>
      <div className="mt-1 font-display text-lg font-bold text-slate-900">{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-sm leading-relaxed text-slate-600">
      <h2 className="font-display text-2xl font-bold text-slate-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
