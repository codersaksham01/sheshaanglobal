import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { ALL_PRODUCTS, BLOG_POSTS, REGIONS, SEO_LANDING_PAGES } from "@/lib/site";

const BASE_URL = "https://global-roots-express.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/contact", changefreq: "yearly", priority: "0.7" },
          { path: "/request-quote", changefreq: "weekly", priority: "0.95" },
          { path: "/blog", changefreq: "weekly", priority: "0.75" },
          { path: "/products", changefreq: "weekly", priority: "0.9" },
          { path: "/more-info", changefreq: "yearly", priority: "0.6" },
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
          ...SEO_LANDING_PAGES.map((p) => ({
            path: `/seo/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.85",
          })),
          ...BLOG_POSTS.map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
