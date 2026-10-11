import type { ExportCommodity, ProductCategory } from './products.ts';

const BASE_URL = 'https://www.sheshaanglobal.com';

export function buildB2BFaqs(product: ExportCommodity) {
  return [
    {
      question: `What is the Minimum Order Quantity (MOQ) for ${product.name.toLowerCase()} exports from India?`,
      answer: `Sheshaan Global's standard Minimum Order Quantity (MOQ) for ${product.name.toLowerCase()} (HS Code ${product.hsCode}) is one Full Container Load (FCL): either ${product.logistics.container20ft} or ${product.logistics.container40ft}, packed in ${product.logistics.standardPackaging}. Trial air-freight or consolidated LCL lots are supported for select lanes.`,
    },
    {
      question: `Which quality and phytosanitary certificates accompany Sheshaan Global ${product.name.toLowerCase()} consignments?`,
      answer: `Every export shipment of ${product.name.toLowerCase()} includes an official Phytosanitary Certificate issued by the Ministry of Agriculture (Govt. of India), Certificate of Origin (COO), Commercial Invoice, Packing List, Fumigation Certificate, APEDA/FSSAI compliance records, and optional third-party pre-shipment quality inspection by SGS, Bureau Veritas, or Geo-Chem.`,
    },
    {
      question: `What Incoterms and payment terms does Sheshaan Global accept for ${product.name.toLowerCase()}?`,
      answer: `Sheshaan Global operates under FOB (${product.logistics.gatewayPorts.join(', ')}) and CIF/CFR terms to global destination ports across the GCC, Europe, UK, USA, Africa, and Asia. Accepted payment structures include 100% Irrevocable Letter of Credit (L/C at sight), Documents Against Payment (DP/CAD), or Telegraphic Transfer (TT: 30% advance, 70% against scanned Bill of Lading copy).`,
    },
  ];
}

export function buildCorporationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': `${BASE_URL}/#corporation`,
    name: 'Sheshaan Global',
    alternateName: ['Sheshaan Exporting Goodness Worldwide', 'Sheshaan Agro Exports'],
    url: BASE_URL,
    logo: `${BASE_URL}/assets/logo.png`,
    foundingDate: '2022',
    description:
      'Premier agricultural commodity exporter from India supplying fresh produce, basmati rice, spices, grains, pulses, and coconuts with APEDA, FSSAI, and CDB certification.',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-81499-09546',
        contactType: 'sales',
        email: 'info@sheshaanglobal.com',
        areaServed: [
          'AE',
          'SA',
          'KW',
          'QA',
          'OM',
          'BH',
          'SG',
          'MY',
          'VN',
          'FR',
          'NL',
          'DE',
          'GB',
          'US',
          'ZA',
        ],
        availableLanguage: ['English', 'Hindi', 'Marathi', 'Arabic'],
      },
    ],
    founder: [
      {
        '@type': 'Person',
        name: 'Sana Zeba Bakshi',
        jobTitle: 'Chief Executive Officer',
        email: 'sanazeba@sheshaanglobal.com',
      },
    ],
    employee: [
      {
        '@type': 'Person',
        name: 'Juned Barade',
        jobTitle: 'Chief Operating Officer',
        email: 'junedbarade@sheshaanglobal.com',
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'APEDA Export Registration',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'FSSAI Central Food Safety License',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Coconut Development Board Exporter Certificate',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/sheshaan-global/',
      'https://www.instagram.com/sheshaanglobal/',
      'https://freshdi.com/supplier/Sheshaan-Global',
      'https://www.tradekey.com/company/Sheshaan-Global-14840241.html',
    ],
  };
}

import type { TradeCorridorRegion } from './corridors.ts';

export function getOriginGeoCoordinates(originCluster: string) {
  const lower = originCluster.toLowerCase();
  if (lower.includes('nashik') || lower.includes('lasalgaon') || lower.includes('pimpalgaon')) {
    return { name: 'Nashik Agricultural Export Cluster, Maharashtra, India', latitude: '20.0988', longitude: '74.2417' };
  }
  if (lower.includes('unjha') || lower.includes('mehsana')) {
    return { name: 'Unjha APMC Spice Hub, Gujarat, India', latitude: '23.8037', longitude: '72.3921' };
  }
  if (lower.includes('pollachi')) {
    return { name: 'Pollachi Coconut Belt, Tamil Nadu, India', latitude: '10.6589', longitude: '77.0085' };
  }
  if (lower.includes('sangli') || lower.includes('solapur') || lower.includes('kolhapur')) {
    return { name: 'Sangli–Solapur Agri Export Belt, Maharashtra, India', latitude: '16.8524', longitude: '74.5815' };
  }
  if (lower.includes('guntur')) {
    return { name: 'Guntur Chilli & Spice Yard, Andhra Pradesh, India', latitude: '16.3067', longitude: '80.4365' };
  }
  if (lower.includes('karnal') || lower.includes('haryana') || lower.includes('punjab')) {
    return { name: 'Indo-Gangetic Basmati Rice Belt (Karnal/Amritsar), India', latitude: '29.6857', longitude: '76.9905' };
  }
  if (lower.includes('mithila') || lower.includes('darbhanga') || lower.includes('bihar')) {
    return { name: 'GI Mithila Makhana Belt (Darbhanga), Bihar, India', latitude: '26.1542', longitude: '85.8918' };
  }
  if (lower.includes('mahuva') || lower.includes('deesa') || lower.includes('gujarat')) {
    return { name: 'Saurashtra & North Gujarat Agri Cluster, India', latitude: '21.0922', longitude: '71.7705' };
  }
  return { name: 'Maharashtra Agricultural Export Hub, India', latitude: '19.7515', longitude: '75.7139' };
}

export function buildProductImageObject(product: ExportCommodity) {
  const geo = getOriginGeoCoordinates(product.originCluster);
  const imageUrl = `${BASE_URL}${product.image}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${BASE_URL}/products/${product.categorySlug}/${product.slug}/#image`,
    url: imageUrl,
    contentUrl: imageUrl,
    caption: `${product.name} (HS Code ${product.hsCode}) — Bulk Export Grade from ${product.originCluster} by Sheshaan Global`,
    representativeOfPage: true,
    creator: {
      '@id': `${BASE_URL}/#corporation`,
    },
    contentLocation: {
      '@type': 'Place',
      name: geo.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: product.originCluster,
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    },
  };
}

export function buildProductSchema(product: ExportCommodity) {
  const productUrl = `${BASE_URL}/products/${product.categorySlug}/${product.slug}`;
  const imageObj = buildProductImageObject(product);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}/#product`,
    name: `Export Grade ${product.name}`,
    image: [imageObj.url, imageObj],
    description: product.executiveSummary,
    sku: product.sku,
    mpn: product.hsCode,
    brand: {
      '@type': 'Brand',
      name: 'Sheshaan Global',
    },
    countryOfOrigin: {
      '@type': 'Country',
      name: 'India',
    },
    category: `${product.categoryName} > ${product.name}`,
    offers: {
      '@type': 'AggregateOffer',
      url: productUrl,
      priceCurrency: 'USD',
      price: 'Contact for Market Quote',
      priceValidationUntil: '2027-12-31',
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@id': `${BASE_URL}/#corporation`,
      },
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: product.logistics.eligibleQuantityValue,
        unitCode: 'TNE',
        unitText: product.logistics.eligibleQuantityUnitText,
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'HS Code',
        value: product.hsCode,
      },
      {
        '@type': 'PropertyValue',
        name: 'Variety',
        value: product.varieties.join(' / '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Calibrated Size',
        value: product.specs.primaryGrade,
      },
      {
        '@type': 'PropertyValue',
        name: 'Moisture Tolerance',
        value: product.specs.moistureTolerance,
      },
      {
        '@type': 'PropertyValue',
        name: 'Purity / Admixture',
        value: product.specs.purityAdmixture,
      },
      {
        '@type': 'PropertyValue',
        name: 'Packaging',
        value: product.logistics.standardPackaging,
      },
      {
        '@type': 'PropertyValue',
        name: 'Loading Capacity',
        value: product.logistics.container40ft,
      },
      {
        '@type': 'PropertyValue',
        name: 'Port of Loading',
        value: product.logistics.gatewayPorts.join(', '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Customs & Carrier Execution',
        value: 'Licensed Customs House Agent (CHA) Clearance & Third-Party Mainline Shipping Lines',
      },
    ],
  };
}

export function buildExportClearanceHowToSchema(product?: ExportCommodity) {
  const subjectName = product ? `${product.name} (HS ${product.hsCode})` : 'Indian Agricultural Commodities';
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How Sheshaan Global Executes Bulk Export, CHA Customs Clearance & Shipping for ${subjectName}`,
    description:
      'Step-by-step B2B procurement, third-party SGS inspection, licensed Customs House Agent (CHA) clearance, and mainline ocean shipping workflow from India.',
    totalTime: 'P7D',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Proforma Invoice (PI) & Payment Term Confirmation',
        text: 'Buyer confirms commodity grade, packaging format, destination port, and Incoterms (FOB, CFR, or CIF) backed by Irrevocable L/C at Sight, DP/CAD, or 30/70 TT.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Farm-Cluster Sourcing, Sortex Grading & Packhouse Stuffing',
        text: `Raw lots are procured from verified Indian origin clusters, graded to export calibration, and packed in export-worthy bags or cartons (${product ? product.logistics.standardPackaging : '5kg–50kg export packs'}).`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'SGS / Bureau Veritas Pre-Shipment Inspection & Phytosanitary Certification',
        text: 'Independent third-party surveyors verify moisture, purity, weight, and EU-MRL/FDA compliance while the Ministry of Agriculture issues the official Phytosanitary and Fumigation Certificates.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Licensed CHA Customs Clearance & Third-Party Shipping Line Dispatch',
        text: 'Our licensed Customs House Agent (CHA) files the Shipping Bill (LEO) at Nhava Sheva (JNPT) or Mundra and hands over the sealed FCL container to premier third-party global shipping lines with full Bill of Lading and Certificate of Origin dossier.',
      },
    ],
  };
}

export function buildRegulatoryAnnouncementSchema(product?: ExportCommodity) {
  const title = product
    ? `2026 Export Availability & DGFT/APEDA Compliance Status: ${product.name} (HS ${product.hsCode})`
    : '2026 Indian Agricultural Export Policy, Harvest Seasonality & Port Dispatch Advisory';
  const text = product
    ? `${product.name} (ITC-HS Code ${product.hsCode}) from ${product.originCluster} is actively open for 20ft/40ft FCL export bookings via ${product.logistics.gatewayPorts.join(', ')}. ${product.harvestCalendar.priceVolatilityNote} Cleared via licensed CHA and mainline third-party ocean carriers.`
    : 'All 49 Sheshaan Global agricultural export lines are active for FOB, CFR, and CIF international container bookings via Nhava Sheva (JNPT) and Mundra with full APEDA, FSSAI, CDB, and licensed CHA customs clearance.';
  return {
    '@context': 'https://schema.org',
    '@type': 'SpecialAnnouncement',
    name: title,
    text,
    datePosted: '2026-10-10',
    expires: '2027-12-31',
    category: 'https://www.wikidata.org/wiki/Q182885',
    announcementLocation: {
      '@type': 'Country',
      name: 'India',
    },
    provider: {
      '@id': `${BASE_URL}/#corporation`,
    },
  };
}

export function buildTradeCorridorSchema(
  product: ExportCommodity,
  region: TradeCorridorRegion
) {
  const corridorUrl = `${BASE_URL}/products/${product.categorySlug}/${product.slug}/export-to/${region.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${corridorUrl}/#service`,
    name: `${product.name} Exporter from India to ${region.name} (HS Code ${product.hsCode})`,
    serviceType: `Bulk B2B Agricultural Export & CHA Customs Clearance (${product.name})`,
    url: corridorUrl,
    provider: {
      '@id': `${BASE_URL}/#corporation`,
    },
    areaServed: {
      '@type': 'Country',
      name: region.name,
    },
    description: `Bulk export of Indian ${product.name} (HS Code ${product.hsCode}) from ${product.originCluster} to ${region.dischargePorts.join(', ')} (${region.transitTimeFromIndia}) with licensed CHA clearance, third-party mainline shipping, and ${region.importAuthority} compliance.`,
    offers: {
      '@type': 'AggregateOffer',
      url: corridorUrl,
      priceCurrency: region.preferredCurrencies[0] ?? 'USD',
      price: 'Contact for FOB/CIF Port Quotation',
      availability: 'https://schema.org/InStock',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: product.logistics.eligibleQuantityValue,
        unitCode: 'TNE',
        unitText: product.logistics.eligibleQuantityUnitText,
      },
    },
  };
}

export function buildProductBreadcrumbSchema(product: ExportCommodity) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${BASE_URL}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.categoryName,
        item: `${BASE_URL}/products/${product.categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `${BASE_URL}/products/${product.categorySlug}/${product.slug}`,
      },
    ],
  };
}

export function buildProductFaqSchema(
  product: ExportCommodity,
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/products/${product.categorySlug}/${product.slug}/#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildCategoryCollectionSchema(
  category: ProductCategory,
  commodities: ExportCommodity[]
) {
  const categoryUrl = `${BASE_URL}/products/${category.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${categoryUrl}/#collection`,
    name: category.h1Headline,
    description: category.metaDescription,
    url: categoryUrl,
    isPartOf: {
      '@id': `${BASE_URL}/#corporation`,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: commodities.length,
      itemListElement: commodities.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: `${item.name} (HS Code ${item.hsCode})`,
        url: `${BASE_URL}/products/${item.categorySlug}/${item.slug}`,
      })),
    },
  };
}

