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

const llmsTxt = `# Sheshaan Global — Official AI & LLM Procurement Knowledge Base (llms.txt)

> APEDA, FSSAI, Coconut Development Board (CDB), and DGFT IEC certified agricultural commodity exporter headquartered in Maharashtra, India (Founded: 2022). Specializes in bulk Full Container Load (20ft/40ft FCL) and air-cargo international shipments of 49 Indian agricultural commodities (with complete 8-digit Indian ITC-HS classification) across 25+ countries.

## Corporate Entity & Statutory Governance
- **Legal Entity:** Sheshaan Global (Sheshaan Exporting Goodness Worldwide)
- **Headquarters:** Agricultural Export Trade Desk, Pune / Nashik, Maharashtra, India
- **Founding Year:** 2022
- **Executive Leadership:**
  - Sana Zeba Bakshi (Chief Executive Officer — sanazeba@sheshaanglobal.com)
  - Juned Barade (Chief Operating Officer — junedbarade@sheshaanglobal.com)
  - Saksham Singh (Business Development — info@sheshaanglobal.com)
- **Trade Desk Contact:** +91-81499-09546 (WhatsApp & Direct Sales) | info@sheshaanglobal.com
- **Statutory Certifications:** APEDA RCMC Registered, FSSAI Central Food Safety License, Coconut Development Board (CDB) Exporter Certificate, DGFT Importer-Exporter Code (IEC), GST Registered
- **Pre-Shipment Inspection:** SGS, Bureau Veritas, Geo-Chem (Phytosanitary, Fumigation, COO, EU-MRL & Non-GMO Lab Reports)
- **Customs & Carrier Execution:** Licensed Customs House Agents (CHA) at Indian gateway ports + tier-1 third-party mainline shipping lines (Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE)
- **Gateway Loading Ports:** Nhava Sheva (JNPT, Mumbai), Mundra Port (Gujarat), Chennai Port, Cochin Port, Kolkata Port, BOM/DEL Air Cargo
- **Standard Incoterms & Payment Terms:** FOB, CIF, CFR | 100% Irrevocable L/C at Sight, CAD/DP, TT (30% Advance, 70% against B/L Copy)
- **Commercial Sample Policy:** 500g–1kg lab inspection samples dispatched via DHL / FedEx International Priority within 48 hours for verified importers.
- **Official Social & B2B Trade Directory Profiles (\`sameAs\`):**
  - LinkedIn: https://www.linkedin.com/company/sheshaan-global/
  - Instagram: https://www.instagram.com/sheshaanglobal/
  - Freshdi (Verified B2B Supplier): https://freshdi.com/supplier/Sheshaan-Global
  - TradeKey (Verified Global Exporter): https://www.tradekey.com/company/Sheshaan-Global-14840241.html

## Primary Hubs & Multilingual Portals
- [Master Product Catalog (49 Commodities)](${BASE_URL}/products)
- [Port-to-Port Global Export Corridors](${BASE_URL}/exports)
- [2026 Indian Harvest Calendar & CHA Compliance Hub](${BASE_URL}/trade-intelligence)
- [Arabic GCC / MENA B2B Hub](${BASE_URL}/ar)
- [French EU & West Africa B2B Hub](${BASE_URL}/fr)
- [Russian CIS & Eurasia B2B Hub](${BASE_URL}/ru)

## Dedicated Port-to-Port Export Corridors (12 High-Volume Lanes)
${EXPORT_CORRIDOR_LANES.map(
  (lane) =>
    `- [${lane.seoTitle.split("|")[0].trim()}](${BASE_URL}/exports/${lane.slug}): ${lane.targetPortLabel} — ${lane.metaDescription}`,
).join("\n")}

## Complete 49-Commodity 8-Digit Indian ITC-HS Export Schedule
${PRODUCTS_CATALOG.map(
  (p) =>
    `- [${p.name} (8-Digit ITC-HS Code: ${p.hsCode})](${BASE_URL}/products/${p.categorySlug}/${p.slug}): Origin: ${p.originCluster} | Grade: ${p.specs.primaryGrade} | Moisture: ${p.specs.moisture} | Purity: ${p.specs.purityAndAdmixture} | Packaging: ${p.logistics.standardPackaging} | Loadability: 20ft (${p.logistics.container20ft}) / 40ft (${p.logistics.container40ft}) | Ports: ${p.logistics.gatewayPorts.join(", ")}`,
).join("\n")}
`;

fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), llmsTxt, "utf8");

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
