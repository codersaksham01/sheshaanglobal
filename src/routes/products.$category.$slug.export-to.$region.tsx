import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FileText, Mail, MessageCircle, Package, Ship, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  BLUE,
  BROCHURE_URL,
  EMAIL,
  MAILTO_URL,
  NAVY,
  ORANGE,
  ORGANIZATION_JSONLD,
  buildWhatsAppUrl,
  getProductBySlug,
  getRegionBySlug,
  type Product,
  type Region,
} from "@/lib/site";
import { getProductBySlugOrLegacy } from "@/lib/empirical-products";
import {
  getTradeCorridorBySlug,
  formatDualWeightUnit,
  TRADE_CORRIDOR_REGIONS,
} from "../../data/corridors";
import {
  buildExportClearanceHowToSchema,
  buildProductSchema,
  buildTradeCorridorSchema,
} from "../../data/schemas";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/products/$category/$slug/export-to/$region")({
  loader: ({ params }) => {
    const empirical = getProductBySlugOrLegacy(params.slug);
    const legacyProduct =
      getProductBySlug(params.slug) ??
      (empirical ? getProductBySlug(empirical.legacySlug ?? "") : undefined);
    const region = getRegionBySlug(params.region);
    const corridor = getTradeCorridorBySlug(params.region);

    if ((!legacyProduct && !empirical) || (!region && !corridor)) {
      throw notFound();
    }

    const product: Product = legacyProduct ?? {
      slug: empirical!.slug,
      name: empirical!.name,
      hsCode: empirical!.hsCode,
      tagline: empirical!.h1Headline,
      img: empirical!.image,
      gallery: [empirical!.image],
      description: empirical!.executiveSummary,
      varieties: empirical!.varieties,
      packing: [empirical!.logistics.standardPackaging],
      standards: empirical!.certifications,
      group: empirical!.categoryName,
    };

    const resolvedRegion: Region = region ?? {
      slug: corridor!.slug,
      name: corridor!.name,
      short: corridor!.shortName,
      flag: corridor!.flag,
      ports: corridor!.dischargePorts,
      topProducts: [],
      incoterms: [
        "FOB Nhava Sheva",
        `CIF ${corridor!.dischargePorts[0]}`,
        `CFR ${corridor!.dischargePorts[0]}`,
      ],
      transitDays: corridor!.transitTimeFromIndia,
      keywords: [],
      intro: corridor!.chaAndCarrierProtocol,
      hero: corridor!.chaAndCarrierProtocol,
      advantages: [],
      faqs: [],
    };

    return {
      category: params.category,
      product,
      region: resolvedRegion,
      empirical,
      corridor,
    };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return { meta: [{ title: "Export page not found" }, { name: "robots", content: "noindex" }] };
    const { product, region, empirical, corridor } = loaderData;
    const url = `${SITE_URL}/products/${params.category}/${params.slug}/export-to/${params.region}`;
    const hsCode = empirical?.hsCode ?? product.hsCode ?? "Available";
    const title = `${product.name} Exporter from India to ${region.short} (HS ${hsCode}) | ${SITE_NAME}`;
    const desc = `Bulk ${product.name.toLowerCase()} (HS Code ${hsCode}) exporter from India to ${region.ports[0] ?? region.name}. ${empirical ? empirical.logistics.container40ft : "20ft/40ft FCL"}, licensed CHA customs clearance & third-party shipping lines.`;
    const img = absoluteUrl(product.img || product.gallery[0] || "/logo.png");

    const scripts: Array<{ type: string; children: string }> = [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_JSONLD),
      },
    ];

    if (empirical && corridor) {
      scripts.push(
        {
          type: "application/ld+json",
          children: JSON.stringify(buildTradeCorridorSchema(empirical, corridor)),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(buildProductSchema(empirical)),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(buildExportClearanceHowToSchema(empirical)),
        },
      );
    }

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  component: CategoryProductRegionExportPage,
});

function CategoryProductRegionExportPage() {
  const { category, product, region, empirical, corridor } = Route.useLoaderData();
  const waUrl = buildWhatsAppUrl({
    category: `${product.name} to ${region.name}`,
    message: `Please share a bulk FOB/CIF quotation for ${product.name} (HS Code ${empirical?.hsCode ?? product.hsCode ?? "N/A"}) from India to ${region.ports[0] ?? region.name}, ${region.name}.`,
  });
  const dualWeight = empirical
    ? formatDualWeightUnit(empirical.logistics.eligibleQuantityValue)
    : "24 MT (52,910 lbs)";

  return (
    <main className="bg-white text-slate-900">
      <section
        className="relative overflow-hidden py-24 text-white"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #072b5a 65%, ${BLUE} 100%)` }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-white/70">
              <Link to="/" className="hover:text-white">
                Home
              </Link>{" "}
              /{" "}
              <Link to="/products" className="hover:text-white">
                Products
              </Link>{" "}
              /{" "}
              <Link
                to="/products/$category/$slug"
                params={{ category, slug: empirical?.slug ?? product.slug }}
                className="hover:text-white"
              >
                {product.name}
              </Link>{" "}
              / <span className="text-white">Export to {region.short}</span>
            </nav>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
              <span>{region.flag}</span> India → {region.short} Trade Corridor • HS{" "}
              {empirical?.hsCode ?? product.hsCode}
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              {product.name} Exporter from India to {region.name}{" "}
              <span style={{ color: ORANGE }}>({region.ports[0]?.split(" (")[0]})</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Sheshaan Global exports {product.name.toLowerCase()} (ITC-HS{" "}
              {empirical?.hsCode ?? product.hsCode}) from{" "}
              {empirical?.originCluster ?? "verified Indian farm clusters"} directly to{" "}
              {region.ports.join(", ")}. Customs clearance is executed by our licensed Customs House
              Agent (CHA) and containers are booked on tier-1 third-party ocean shipping lines under
              FOB, CFR, and CIF Incoterms.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
                style={{ background: "#25D366" }}
              >
                <MessageCircle className="h-4 w-4" /> Request CIF {region.ports[0]?.split(" (")[0]}{" "}
                Quote
              </a>
              <a
                href={BROCHURE_URL}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <FileText className="h-4 w-4" /> Download Catalogue
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
              alt={`${product.name} export from India to ${region.name}`}
              width={720}
              height={540}
              loading="eager"
              fetchPriority="high"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Fact
            icon={Package}
            label="ITC-HS Code & Net FCL Load"
            value={`HS ${empirical?.hsCode ?? product.hsCode ?? "Certified"} • ${dualWeight}`}
          />
          <Fact
            icon={Ship}
            label={`Discharge Ports (${region.short})`}
            value={`${region.ports.slice(0, 2).join(", ")} (${region.transitDays})`}
          />
          <Fact
            icon={ShieldCheck}
            label="CHA & Import Governance"
            value={corridor?.importAuthority ?? region.incoterms.slice(0, 3).join(", ")}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Panel title={`Technical Specifications & CHA Dispatch for ${product.name}`}>
            <p>{empirical?.geoExtractBlock ?? product.description}</p>
            {corridor && (
              <p className="mt-4 font-medium text-slate-800">
                <strong>Customs &amp; Shipping Line Protocol:</strong>{" "}
                {corridor.chaAndCarrierProtocol}
              </p>
            )}
            <ul className="mt-5 space-y-2">
              {product.standards.map((s) => (
                <li key={s}>✓ {s}</li>
              ))}
            </ul>
          </Panel>
          <Panel title={`Mandatory Clearance Dossier for ${region.short} Importers`}>
            <ul className="space-y-2.5">
              {(
                corridor?.customsDocuments ?? [
                  "Commercial Invoice & Packing List",
                  "Certificate of Origin (Chamber Attested)",
                  "Phytosanitary Certificate (Ministry of Agriculture, Govt. of India)",
                  "Fumigation Certificate (Methyl Bromide / Phosphine)",
                  "Ocean Bill of Lading (Issued by Third-Party Shipping Line)",
                  "SGS / Geo-Chem / Bureau Veritas Pre-Shipment Inspection Certificate",
                ]
              ).map((d) => (
                <li key={d}>✓ {d}</li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="border-t border-slate-200 pt-10">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Explore Other Export Destinations for {product.name}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {TRADE_CORRIDOR_REGIONS.filter((r) => r.slug !== region.slug).map((other) => (
              <Link
                key={other.slug}
                to="/products/$category/$slug/export-to/$region"
                params={{
                  category,
                  slug: empirical?.slug ?? product.slug,
                  region: other.slug,
                }}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 hover:border-[#0057B8] hover:text-[#0057B8]"
              >
                {other.flag} Export to {other.shortName}
              </Link>
            ))}
          </div>
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
      <div className="mt-1 font-display text-base font-bold text-slate-900">{value}</div>
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
