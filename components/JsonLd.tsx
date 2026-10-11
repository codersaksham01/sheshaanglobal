import React from 'react';
import type { ExportCommodity } from '../data/products';
import {
  buildCorporationSchema,
  buildProductSchema,
  buildProductBreadcrumbSchema,
  buildProductFaqSchema,
  buildCategoryCollectionSchema,
  buildExportClearanceHowToSchema,
  buildRegulatoryAnnouncementSchema,
  buildTradeCorridorSchema,
  buildProductImageObject,
} from '../data/schemas';

export {
  buildCorporationSchema,
  buildProductSchema,
  buildProductBreadcrumbSchema,
  buildProductFaqSchema,
  buildCategoryCollectionSchema,
  buildExportClearanceHowToSchema,
  buildRegulatoryAnnouncementSchema,
  buildTradeCorridorSchema,
  buildProductImageObject,
};

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

interface ProductJsonLdProps {
  product: ExportCommodity;
  faqs: { question: string; answer: string }[];
}

export function ProductJsonLd({ product, faqs }: ProductJsonLdProps) {
  return (
    <JsonLd
      data={[
        buildCorporationSchema(),
        buildProductSchema(product),
        buildProductBreadcrumbSchema(product),
        buildProductFaqSchema(product, faqs),
        buildExportClearanceHowToSchema(product),
        buildRegulatoryAnnouncementSchema(product),
      ]}
    />
  );
}

export function CorporationJsonLd() {
  return <JsonLd data={buildCorporationSchema()} />;
}
