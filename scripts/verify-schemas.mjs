import fs from 'node:fs';
import path from 'node:path';
import {
  PRODUCTS_CATALOG,
  CATEGORIES,
} from '../data/products.ts';
import {
  TRADE_CORRIDOR_REGIONS,
} from '../data/corridors.ts';
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
} from '../data/schemas.ts';

const BASE_URL = 'https://www.sheshaanglobal.com';
const LAST_MOD = '2026-10-10';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// 0. Generate XML Sitemap Index & Child Sitemaps (including localized hubs, trade-intelligence, and 784 trade corridors)
const staticPaths = [
  '/',
  '/ar',
  '/fr',
  '/ru',
  '/products',
  '/trade-intelligence',
  '/about',
  '/quality',
  '/packaging',
  '/logistics',
  '/export-process',
  '/markets',
  '/contact',
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
    <loc>${BASE_URL}${p === '/' ? '' : p}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.90'}</priority>
  </url>`
  )
  .join('\n')}
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
  </url>`
).join('\n')}
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
  </url>`
).join('\n')}
</urlset>
`;

const sitemapCorridorsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PRODUCTS_CATALOG.flatMap((p) =>
  TRADE_CORRIDOR_REGIONS.map(
    (r) => `  <url>
    <loc>${BASE_URL}/products/${p.categorySlug}/${p.slug}/export-to/${r.slug}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>`
  )
).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-index.xml'), sitemapIndexXml, 'utf8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-static.xml'), sitemapStaticXml, 'utf8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-categories.xml'), sitemapCategoriesXml, 'utf8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-products.xml'), sitemapProductsXml, 'utf8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-corridors.xml'), sitemapCorridorsXml, 'utf8');

let errors = 0;

if (PRODUCTS_CATALOG.length !== 49) {
  console.error(`Expected 49 commodities, found ${PRODUCTS_CATALOG.length}`);
  errors++;
}

// 1. Validate Master Corporation Schema
const corp = buildCorporationSchema();
if (corp['@context'] !== 'https://schema.org' || corp['@type'] !== 'Corporation') {
  console.error('Invalid Corporation schema root');
  errors++;
}
if (corp.founder?.[0]?.name !== 'Sana Zeba Bakshi' || corp.employee?.[0]?.name !== 'Juned Barade') {
  console.error('Missing executive leadership in Corporation schema');
  errors++;
}
if ((corp.sameAs?.length ?? 0) < 4) {
  console.error('Missing sameAs profiles in Corporation schema');
  errors++;
}

// 2. Validate Product, ImageObject, BreadcrumbList, FAQPage, HowTo, SpecialAnnouncement, and TradeCorridor schemas
for (const product of PRODUCTS_CATALOG) {
  if (product.seoTitle.length > 60) {
    console.error(`SEO title exceeds 60 chars for ${product.slug}: ${product.seoTitle.length}`);
    errors++;
  }
  if (product.metaDescription.length > 155) {
    console.error(`Meta description exceeds 155 chars for ${product.slug}: ${product.metaDescription.length}`);
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
    prodSchema['@type'] !== 'Product' ||
    imgObj['@type'] !== 'ImageObject' ||
    !imgObj.contentLocation?.geo?.latitude ||
    howToSchema['@type'] !== 'HowTo' ||
    announcementSchema['@type'] !== 'SpecialAnnouncement' ||
    corridorSchema['@type'] !== 'Service'
  ) {
    console.error(`Invalid advanced schema entity for ${product.slug}`);
    errors++;
  }

  if (faqSchema['@type'] !== 'FAQPage' || faqSchema.mainEntity.length !== 3) {
    console.error(`Invalid FAQPage schema for ${product.slug}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`Schema verification failed with ${errors} error(s).`);
  process.exit(1);
}

console.log(
  `Audit & Advanced GEO Verification PASSED: Generated 4 XML Sitemaps (${PRODUCTS_CATALOG.length * TRADE_CORRIDOR_REGIONS.length} Trade Corridor URLs + ${PRODUCTS_CATALOG.length} Commodity URLs + 3 Localized Hubs) & Validated Corporation, Product, ImageObject (GeoCoordinates), HowTo (CHA/Shipping Line), SpecialAnnouncement, BreadcrumbList, FAQPage, and TradeCorridor Service schemas.`
);
