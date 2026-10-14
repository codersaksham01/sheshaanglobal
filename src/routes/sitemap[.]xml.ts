import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { ALL_PRODUCTS, REGIONS } from "@/lib/site";
import { CATEGORIES, PRODUCTS_CATALOG } from "@/lib/empirical-products";
import { EXPORT_CORRIDOR_LANES } from "../../data/corridors";
import { absoluteUrl, SITE_UPDATED, SITE_URL } from "@/lib/seo";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  image?: string;
  imageTitle?: string;
}

function buildSitemapXml(): string {
  const rawEntries: SitemapEntry[] = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/ar", changefreq: "weekly", priority: "0.95" },
    { path: "/fr", changefreq: "weekly", priority: "0.95" },
    { path: "/ru", changefreq: "weekly", priority: "0.95" },
    { path: "/exports", changefreq: "weekly", priority: "0.95" },
    { path: "/agricultural-exports-india", changefreq: "weekly", priority: "0.9" },
    { path: "/global-export-markets", changefreq: "weekly", priority: "0.9" },
    { path: "/trade-compliance", changefreq: "weekly", priority: "0.9" },
    { path: "/products/fresh-onions-exporter-india", changefreq: "weekly", priority: "0.9" },
    { path: "/products/green-chillies-exporter", changefreq: "weekly", priority: "0.9" },
    { path: "/products/indian-basmati-rice", changefreq: "weekly", priority: "0.9" },
    { path: "/products/coconut-exporter-india", changefreq: "weekly", priority: "0.9" },
    { path: "/products/spices-masalas-exporter", changefreq: "weekly", priority: "0.9" },
    { path: "/products/pulses-lentils-exporter", changefreq: "weekly", priority: "0.9" },
    { path: "/markets/export-to-uae", changefreq: "weekly", priority: "0.9" },
    { path: "/markets/export-to-saudi-arabia", changefreq: "weekly", priority: "0.9" },
    { path: "/markets/export-to-uk-europe", changefreq: "weekly", priority: "0.9" },
    { path: "/markets/export-to-southeast-asia", changefreq: "weekly", priority: "0.9" },
    { path: "/trade-intelligence", changefreq: "weekly", priority: "0.9" },
    { path: "/about", changefreq: "monthly", priority: "0.7" },
    { path: "/contact", changefreq: "yearly", priority: "0.7" },
    { path: "/products", changefreq: "weekly", priority: "0.95" },
    { path: "/more-info", changefreq: "yearly", priority: "0.6" },
    { path: "/company-policies", changefreq: "yearly", priority: "0.5" },
    { path: "/export-process", changefreq: "monthly", priority: "0.75" },
    { path: "/quality", changefreq: "monthly", priority: "0.7" },
    { path: "/packaging", changefreq: "monthly", priority: "0.7" },
    { path: "/logistics", changefreq: "monthly", priority: "0.7" },
    { path: "/markets", changefreq: "monthly", priority: "0.75" },
    { path: "/markets/africa", changefreq: "monthly", priority: "0.65" },
    { path: "/markets/uae", changefreq: "monthly", priority: "0.7" },
    { path: "/markets/middle-east", changefreq: "monthly", priority: "0.7" },
    ...EXPORT_CORRIDOR_LANES.map((lane) => ({
      path: `/exports/${lane.slug}`,
      changefreq: "weekly" as const,
      priority: "0.92",
    })),
    ...CATEGORIES.map((c) => ({
      path: `/products/${c.slug}`,
      changefreq: "weekly" as const,
      priority: "0.9",
    })),
    ...PRODUCTS_CATALOG.map((p) => ({
      path: `/products/${p.categorySlug}/${p.slug}`,
      changefreq: "weekly" as const,
      priority: "0.9",
      image: p.image,
      imageTitle: `${p.name} Exporter in India (HS Code ${p.hsCode})`,
    })),
    ...PRODUCTS_CATALOG.flatMap((p) =>
      REGIONS.map((r) => ({
        path: `/products/${p.categorySlug}/${p.slug}/export-to/${r.slug}`,
        changefreq: "monthly" as const,
        priority: "0.8",
        image: p.image,
        imageTitle: `${p.name} Exporter from India to ${r.name} (HS ${p.hsCode})`,
      })),
    ),
    ...REGIONS.map((r) => ({
      path: `/export-to/${r.slug}`,
      changefreq: "monthly" as const,
      priority: "0.9",
    })),
    ...ALL_PRODUCTS.map((p) => ({
      path: `/products/${p.slug}`,
      changefreq: "monthly" as const,
      priority: "0.8",
    })),
  ];

  const seenPaths = new Set<string>();
  const entries = rawEntries.filter((entry) => {
    if (seenPaths.has(entry.path)) return false;
    seenPaths.add(entry.path);
    return true;
  });

  const urls = entries.map((e) => {
    const validImage =
      e.image && (e.image.startsWith("/assets/products/") || e.image.startsWith("https://"))
        ? absoluteUrl(e.image)
        : null;
    return [
      `  <url>`,
      `    <loc>${SITE_URL}${e.path}</loc>`,
      `    <lastmod>${SITE_UPDATED}</lastmod>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      validImage
        ? [
            `    <image:image>`,
            `      <image:loc>${validImage}</image:loc>`,
            `      <image:title>${escapeXml(e.imageTitle ?? "Sheshaan Global export product")}</image:title>`,
            `    </image:image>`,
          ].join("\n")
        : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

const SITEMAP_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=86400",
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = buildSitemapXml();
        return new Response(xml, { headers: SITEMAP_HEADERS });
      },
      HEAD: async () => {
        return new Response(null, { status: 200, headers: SITEMAP_HEADERS });
      },
    },
  },
});

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
