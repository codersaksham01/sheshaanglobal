import { MetadataRoute } from "next";
import { CATEGORIES, PRODUCTS_CATALOG } from "../data/products";
import { EXPORT_CORRIDOR_LANES, TRADE_CORRIDOR_REGIONS } from "../data/corridors";
import { buildHreflangAlternates } from "../data/i18n";

const BASE_URL = "https://www.sheshaanglobal.com";
const LAST_MODIFIED = new Date("2026-10-10T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: buildHreflangAlternates("/"),
    },
    {
      url: `${BASE_URL}/ar`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/fr`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/ru`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/exports`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/trade-intelligence`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quality`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packaging`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/logistics`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/export-process`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/markets`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${BASE_URL}/products/${category.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS_CATALOG.map((product) => ({
    url: `${BASE_URL}/products/${product.categorySlug}/${product.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const dedicatedExportLaneRoutes: MetadataRoute.Sitemap = EXPORT_CORRIDOR_LANES.map((lane) => ({
    url: `${BASE_URL}/exports/${lane.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.92,
  }));

  const corridorRoutes: MetadataRoute.Sitemap = PRODUCTS_CATALOG.flatMap((product) =>
    TRADE_CORRIDOR_REGIONS.map((region) => ({
      url: `${BASE_URL}/products/${product.categorySlug}/${product.slug}/export-to/${region.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  );

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...dedicatedExportLaneRoutes,
    ...corridorRoutes,
  ];
}
