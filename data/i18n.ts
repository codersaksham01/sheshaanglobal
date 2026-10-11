export type SupportedLocaleCode = 'en' | 'ar' | 'fr' | 'ru';

export interface LocaleConfig {
  code: SupportedLocaleCode;
  hreflang: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  targetRegions: string;
  currencyNote: string;
  unitSystemNote: string;
  seoTitle: string;
  metaDescription: string;
  h1Headline: string;
  heroSummary: string;
  chaLogisticsStatement: string;
  ctaPrimary: string;
  ctaWhatsApp: string;
  ctaEmail: string;
  catalogHeading: string;
}

const BASE_URL = 'https://www.sheshaanglobal.com';

export const LOCALE_CONFIGS: Record<SupportedLocaleCode, LocaleConfig> = {
  en: {
    code: 'en',
    hreflang: 'en',
    name: 'English (Global)',
    nativeName: 'English',
    dir: 'ltr',
    targetRegions: 'Global (USA, UK, EU, GCC, APAC & Africa)',
    currencyNote: 'USD / EUR / GBP / AED (FOB, CFR & CIF Quotations)',
    unitSystemNote: 'Metric Tons (MT) with US Pounds (Lbs) & CWT equivalence',
    seoTitle: 'Sheshaan Global | Agricultural Exporter in India (49 Lines)',
    metaDescription:
      'APEDA, FSSAI & CDB certified agricultural exporter in Maharashtra, India. Bulk FCL supplier of Nashik onions, 1121 Basmati rice, Unjha spices & coconuts.',
    h1Headline: 'Agricultural Commodity Exporter in India: 49 Verified Bulk Lines',
    heroSummary:
      'Sheshaan Global is an APEDA, FSSAI, and Coconut Development Board (CDB) certified agricultural exporter headquartered in Maharashtra, India. We supply 20ft and 40ft High Cube reefer/dry containers across 49 commodities via licensed CHA customs clearance and premier third-party global shipping lines.',
    chaLogisticsStatement:
      'All export consignments are cleared through our licensed Customs House Agent (CHA) at Nhava Sheva (JNPT), Mundra, and Chennai ports and booked on leading third-party ocean shipping lines (Maersk, MSC, CMA CGM, Hapag-Lloyd) with SGS/Bureau Veritas pre-shipment inspection.',
    ctaPrimary: 'Request Instant B2B Export Quote',
    ctaWhatsApp: 'WhatsApp Trade Desk (+91 81499 09546)',
    ctaEmail: 'Email Quote (info@sheshaanglobal.com)',
    catalogHeading: 'Explore All 49 Indian Export Commodities (HS Code Indexed)',
  },
  ar: {
    code: 'ar',
    hreflang: 'ar',
    name: 'Arabic (GCC & MENA)',
    nativeName: 'العربية',
    dir: 'rtl',
    targetRegions: 'الإمارات (جبل علي)، السعودية (الدمام وجدة)، قطر، الكويت، عُمان، البحرين ومصر',
    currencyNote: 'الدولار الأمريكي (USD) / الدرهم الإماراتي (AED) / الريال السعودي (SAR)',
    unitSystemNote: 'طن متري (MT) — حاويات مبردة وجافة 20 قدم و40 قدم (FCL)',
    seoTitle: 'شيشان جلوبال | مصدر المنتجات الزراعية والتوابل من الهند',
    metaDescription:
      'شركة شيشان جلوبال المعتمدة من APEDA وFSSAI لتصدير البصل الهندي، أرز بسمتي 1121، التوابل، جوز الهند والفواكه الطازجة إلى جبل علي والدمام ودول الخليج.',
    h1Headline: 'المصدر المعتمد للمنتجات الزراعية والأرز البسمتي والتوابل من الهند إلى الخليج',
    heroSummary:
      'شيشان جلوبال (Sheshaan Global) هي شركة تصدير زراعي معتمدة من هيئة APEDA وFSSAI ومجلس تنمية جوز الهند (CDB) ومقرها في ماهاراشترا، الهند. نقوم بتوريد 49 منتجاً زراعياً بالجملة (البصل الأحمر ناشيك، أرز بسمتي 1121، الكمون، الكركم، الفلفل الأخضر، وجوز الهند) في حاويات 20 و40 قدماً.',
    chaLogisticsStatement:
      'تتم جميع إجراءات التخليص الجمركي عبر وكيل جمركي مرخص (CHA) في ميناء نهافا شيفا (JNPT) وميناء موندرا مع الشحن عبر خطوط الملاحة العالمية المعتمدة إلى ميناء جبل علي، الدمام، جدة، حمد، والشويخ مع شهادات الصحة النباتية وفحص SGS.',
    ctaPrimary: 'اطلب عرض أسعار التصدير (FOB / CIF)',
    ctaWhatsApp: 'مكتب التجارة عبر واتساب (+91 81499 09546)',
    ctaEmail: 'مراسلة البريد الإلكتروني (info@sheshaanglobal.com)',
    catalogHeading: 'دليل المنتجات الزراعية الهندية للتصدير (49 منتجاً مع رمز النظام المنسق HS Code)',
  },
  fr: {
    code: 'fr',
    hreflang: 'fr',
    name: 'French (Europe & Francophone Africa)',
    nativeName: 'Français',
    dir: 'ltr',
    targetRegions: 'France, Belgique, Suisse, Sénégal (Dakar), Côte d’Ivoire (Abidjan), Bénin & Maroc',
    currencyNote: 'EUR (€) / USD ($) — Incoterms FOB, CFR & CIF',
    unitSystemNote: 'Tonnes Métriques (MT) — Conteneurs complets 20 pieds et 40 pieds HC (FCL)',
    seoTitle: 'Sheshaan Global | Exportateur Agricole Certifié en Inde (APEDA)',
    metaDescription:
      'Exportateur indien certifié APEDA et FSSAI : oignons rouges de Nashik, riz Basmati 1121 et non-basmati, épices d’Unjha, légumes secs et noix de cajou en gros.',
    h1Headline: 'Exportateur de Produits Agricoles, Riz et Épices d’Inde : 49 Lignes en Gros',
    heroSummary:
      'Sheshaan Global est un exportateur agricole indien certifié APEDA, FSSAI et CDB basé au Maharashtra, Inde. Nous fournissons 49 produits agricoles en conteneurs complets (FCL 20ft/40ft) vers l’Europe (Le Havre, Anvers, Rotterdam) et l’Afrique de l’Ouest (Dakar, Abidjan, Cotonou).',
    chaLogisticsStatement:
      'Le dédouanement à l’exportation est assuré par notre transitaire agréé en douane (CHA) aux ports de Nhava Sheva (JNPT) et Mundra, en partenariat avec les principales compagnies maritimes internationales et inspection SGS/Bureau Veritas avant expédition.',
    ctaPrimary: 'Demander une Cotation B2B (FOB / CIF)',
    ctaWhatsApp: 'Bureau Export WhatsApp (+91 81499 09546)',
    ctaEmail: 'Devis par Email (info@sheshaanglobal.com)',
    catalogHeading: 'Catalogue des 49 Produits Agricoles d’Exportation (Codes SH / HS)',
  },
  ru: {
    code: 'ru',
    hreflang: 'ru',
    name: 'Russian (CIS & Eastern Europe)',
    nativeName: 'Русский',
    dir: 'ltr',
    targetRegions: 'СНГ, Россия, Казахстан, Узбекистан и Восточная Европа',
    currencyNote: 'USD ($) / EUR (€) — Условия поставки FOB, CFR и CIF',
    unitSystemNote: 'Метрические тонны (МТ) — 20-футовые и 40-футовые рефконтейнеры и сухие контейнеры',
    seoTitle: 'Sheshaan Global | Экспортер сельхозпродукции и специй из Индии',
    metaDescription:
      'Сертифицированный APEDA и FSSAI индийский экспортер: красный лук Наशिक, рис Басмати 1121, специи Унджа, виноград, гранаты, арахис и кешью оптом (FCL).',
    h1Headline: 'Оптовый экспортер сельхозпродукции, риса Басмати и специй из Индии (49 позиций)',
    heroSummary:
      'Sheshaan Global — сертифицированный APEDA, FSSAI и CDB экспортер сельскохозяйственных товаров со штаб-квартирой в штате Махараштра, Индия. Мы поставляем 49 видов продукции (свежий и сушеный лук, рис Басмати, специи, столовый виноград, гранаты, нут и арахис) контейнерными партиями FCL.',
    chaLogisticsStatement:
      'Таможенное оформление в портах Нава-Шева (JNPT) и Мундра осуществляется нашим лицензированным таможенным брокером (CHA) с отгрузкой через ведущие международные морские линии и предотгрузочной инспекцией SGS.',
    ctaPrimary: 'Запросить оптовый прайс-лист (FOB / CIF)',
    ctaWhatsApp: 'Отдел экспорта WhatsApp (+91 81499 09546)',
    ctaEmail: 'Запрос на Email (info@sheshaanglobal.com)',
    catalogHeading: 'Каталог из 49 экспортных товаров Индии (с кодами ТН ВЭД / HS Code)',
  },
};

export function buildHreflangAlternates(path = '') {
  const normalizedPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  return {
    canonical: `${BASE_URL}${normalizedPath}`,
    languages: {
      en: `${BASE_URL}${normalizedPath}`,
      'en-AE': `${BASE_URL}${normalizedPath}`,
      'en-GB': `${BASE_URL}${normalizedPath}`,
      'en-US': `${BASE_URL}${normalizedPath}`,
      ar: `${BASE_URL}/ar`,
      'ar-AE': `${BASE_URL}/ar`,
      'ar-SA': `${BASE_URL}/ar`,
      fr: `${BASE_URL}/fr`,
      ru: `${BASE_URL}/ru`,
      'x-default': `${BASE_URL}${normalizedPath}`,
    },
  };
}
