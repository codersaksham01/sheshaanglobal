import fs from "node:fs";
import path from "node:path";
import { PRODUCTS_CATALOG, CATEGORIES } from "../data/products.ts";
import { EXPORT_CORRIDOR_LANES, TRADE_CORRIDOR_REGIONS } from "../data/corridors.ts";
import {
  buildB2BFaqs,
  buildCorporationSchema,
  buildProductSchema,
  buildProductImageObject,
  buildProductBreadcrumbSchema,
  buildProductFaqSchema,
  buildExportClearanceHowToSchema,
  buildRegulatoryAnnouncementSchema,
  buildTradeCorridorSchema,
} from "../data/schemas.ts";

const BASE_URL = "https://www.sheshaanglobal.com";
const LAST_MOD = "2026-10-10";
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

// 0. Generate XML Sitemap Index & Child Sitemaps (including localized hubs, trade-intelligence, /exports lanes, and 784 trade corridors)
const staticPaths = [
  "/",
  "/ar",
  "/fr",
  "/ru",
  "/products",
  "/exports",
  "/trade-intelligence",
  "/about",
  "/quality",
  "/packaging",
  "/logistics",
  "/export-process",
  "/markets",
  "/markets/uae",
  "/markets/middle-east",
  "/markets/africa",
  "/more-info",
  "/company-policies",
  "/contact",
  ...TRADE_CORRIDOR_REGIONS.map((r) => `/export-to/${r.slug}`),
];

const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-static.xml</loc>
    <lastmod>${LAST_MOD}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-categories.xml</loc>
    <lastmod>${LAST_MOD}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-products.xml</loc>
    <lastmod>${LAST_MOD}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-corridors.xml</loc>
    <lastmod>${LAST_MOD}</lastmod>
  </sitemap>
</sitemapindex>
`;

const sitemapStaticXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}${p}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p === "/" ? "1.0" : "0.90"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const sitemapCategoriesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${CATEGORIES.map(
  (c) => `  <url>
    <loc>${BASE_URL}/products/${c.slug}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>`,
).join("\n")}
</urlset>
`;

const sitemapProductsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PRODUCTS_CATALOG.map(
  (p) => `  <url>
    <loc>${BASE_URL}/products/${p.categorySlug}/${p.slug}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>`,
).join("\n")}
</urlset>
`;

const sitemapCorridorsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${EXPORT_CORRIDOR_LANES.map(
  (lane) => `  <url>
    <loc>${BASE_URL}/exports/${lane.slug}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.92</priority>
  </url>`,
).join("\n")}
${PRODUCTS_CATALOG.flatMap((p) =>
  TRADE_CORRIDOR_REGIONS.map(
    (r) => `  <url>
    <loc>${BASE_URL}/products/${p.categorySlug}/${p.slug}/export-to/${r.slug}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>`,
  ),
).join("\n")}
</urlset>
`;

const allUniqueUrls = Array.from(
  new Set([
    ...staticPaths.map((p) => `${BASE_URL}${p}`),
    ...CATEGORIES.map((c) => `${BASE_URL}/products/${c.slug}`),
    ...PRODUCTS_CATALOG.map((p) => `${BASE_URL}/products/${p.categorySlug}/${p.slug}`),
    ...EXPORT_CORRIDOR_LANES.map((lane) => `${BASE_URL}/exports/${lane.slug}`),
    ...PRODUCTS_CATALOG.flatMap((p) =>
      TRADE_CORRIDOR_REGIONS.map(
        (r) => `${BASE_URL}/products/${p.categorySlug}/${p.slug}/export-to/${r.slug}`,
      ),
    ),
  ]),
);

const masterSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUniqueUrls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${loc === `${BASE_URL}/` ? "1.0" : "0.90"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), masterSitemapXml, "utf8");
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-index.xml"), sitemapIndexXml, "utf8");
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-static.xml"), sitemapStaticXml, "utf8");
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-categories.xml"), sitemapCategoriesXml, "utf8");
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-products.xml"), sitemapProductsXml, "utf8");
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-corridors.xml"), sitemapCorridorsXml, "utf8");

let errors = 0;

if (PRODUCTS_CATALOG.length !== 49) {
  console.error(`Expected 49 commodities, found ${PRODUCTS_CATALOG.length}`);
  errors++;
}

// 1. Validate Master Corporation Schema
const corp = buildCorporationSchema();
if (corp["@context"] !== "https://schema.org" || corp["@type"] !== "Corporation") {
  console.error("Invalid Corporation schema root");
  errors++;
}
if (
  corp.founder?.[0]?.name !== "Sana Zeba Bakshi" ||
  corp.employee?.[0]?.name !== "Juned Barade" ||
  corp.employee?.[1]?.name !== "Saksham Singh"
) {
  console.error("Missing executive leadership in Corporation schema");
  errors++;
}
if ((corp.sameAs?.length ?? 0) < 4) {
  console.error("Missing sameAs profiles in Corporation schema");
  errors++;
}

// 2. Validate Product, ImageObject, BreadcrumbList, FAQPage, HowTo, SpecialAnnouncement, and TradeCorridor schemas
for (const product of PRODUCTS_CATALOG) {
  if (
    !product.seoTitle.includes("Exporter in India") ||
    !product.seoTitle.includes("Sheshaan Global")
  ) {
    console.error(`SEO title missing exact-match formula for ${product.slug}: ${product.seoTitle}`);
    errors++;
  }
  if (!product.h1Headline.includes("Exporter in India")) {
    console.error(
      `H1 headline missing exact-match formula for ${product.slug}: ${product.h1Headline}`,
    );
    errors++;
  }
  if (
    !product.metaDescription.includes(product.hsCode) ||
    !product.metaDescription.includes("Nhava Sheva")
  ) {
    console.error(
      `Meta description missing HS code or gateway port for ${product.slug}: ${product.metaDescription}`,
    );
    errors++;
  }

  const prodSchema = buildProductSchema(product);
  const imgObj = buildProductImageObject(product);
  const breadcrumbSchema = buildProductBreadcrumbSchema(product);
  const faqs = buildB2BFaqs(product);
  const faqSchema = buildProductFaqSchema(product, faqs);
  const howToSchema = buildExportClearanceHowToSchema(product);
  const announcementSchema = buildRegulatoryAnnouncementSchema(product);
  const corridorSchema = buildTradeCorridorSchema(product, TRADE_CORRIDOR_REGIONS[0]);

  try {
    JSON.parse(JSON.stringify(prodSchema));
    JSON.parse(JSON.stringify(imgObj));
    JSON.parse(JSON.stringify(breadcrumbSchema));
    JSON.parse(JSON.stringify(faqSchema));
    JSON.parse(JSON.stringify(howToSchema));
    JSON.parse(JSON.stringify(announcementSchema));
    JSON.parse(JSON.stringify(corridorSchema));
  } catch (err) {
    console.error(`JSON serialization failed for ${product.slug}:`, err);
    errors++;
  }

  if (
    prodSchema["@type"] !== "Product" ||
    imgObj["@type"] !== "ImageObject" ||
    !imgObj.contentLocation?.geo?.latitude ||
    howToSchema["@type"] !== "HowTo" ||
    announcementSchema["@type"] !== "SpecialAnnouncement" ||
    corridorSchema["@type"] !== "Service"
  ) {
    console.error(`Invalid advanced schema entity for ${product.slug}`);
    errors++;
  }

  if (faqSchema["@type"] !== "FAQPage" || faqSchema.mainEntity.length !== 3) {
    console.error(`Invalid FAQPage schema for ${product.slug}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`Schema verification failed with ${errors} error(s).`);
  process.exit(1);
}

console.log(
  `Audit & Advanced GEO Verification PASSED: Generated 4 XML Sitemaps (${EXPORT_CORRIDOR_LANES.length} Dedicated /exports Lanes + ${PRODUCTS_CATALOG.length * TRADE_CORRIDOR_REGIONS.length} Trade Corridor URLs + ${PRODUCTS_CATALOG.length} Commodity URLs + 3 Localized Hubs) & Validated Corporation, Product, ImageObject (GeoCoordinates), HowTo (CHA/Shipping Line), SpecialAnnouncement, BreadcrumbList, FAQPage, and TradeCorridor Service schemas.`,
);
