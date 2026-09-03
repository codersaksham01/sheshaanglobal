import {
  ALL_PRODUCTS,
  BLOG_POSTS,
  CERTIFICATES,
  EMAIL,
  PHONE,
  SEO_LANDING_PAGES,
  type BlogPost,
  type Product,
  type SeoLandingPage,
} from "@/lib/site";

export type PublishStatus = "Published" | "Draft";

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  hsCode: string;
  group: string;
  status: PublishStatus;
  image: string;
  description: string;
  packing: string;
  standards: string;
};

export type AdminBlog = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: PublishStatus;
  description: string;
  body: string;
};

export type AdminSeo = {
  id: string;
  title: string;
  slug: string;
  keyword: string;
  status: PublishStatus;
  description: string;
};

export type AdminCertificate = {
  id: string;
  name: string;
  type: string;
  issuer: string;
  file: string;
  status: PublishStatus;
};

export type AdminInquiry = {
  id: string;
  buyer: string;
  company: string;
  product: string;
  destination: string;
  quantity: string;
  channel: string;
  email?: string;
  phone?: string;
  value?: string;
  notes?: string;
  nextAction?: string;
  status: "New" | "Contacted" | "Quoted" | "Follow-up" | "Won" | "Lost" | "Closed";
};

export type AdminMedia = {
  id: string;
  title: string;
  type: "Image" | "PDF" | "Video" | "Other";
  url: string;
  alt: string;
  category: string;
};

export type AdminCountryPage = {
  id: string;
  country: string;
  slug: string;
  port: string;
  topProducts: string;
  status: PublishStatus;
  description: string;
};

export type AdminTestimonial = {
  id: string;
  name: string;
  company: string;
  country: string;
  quote: string;
  status: PublishStatus;
};

export type AdminTeamMember = {
  id: string;
  name: string;
  role: string;
  linkedin: string;
  email: string;
  phone: string;
  status: PublishStatus;
};

export type AdminState = {
  products: AdminProduct[];
  blogs: AdminBlog[];
  seoPages: AdminSeo[];
  certificates: AdminCertificate[];
  inquiries: AdminInquiry[];
  media: AdminMedia[];
  countryPages: AdminCountryPage[];
  testimonials: AdminTestimonial[];
  team: AdminTeamMember[];
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    primaryCta: string;
    secondaryCta: string;
    featuredProducts: string;
    announcement: string;
  };
  quoteSettings: {
    whatsappTemplate: string;
    emailSubject: string;
    autoReply: string;
    requiredFields: string;
  };
  settings: {
    phone: string;
    email: string;
    analyticsId: string;
    searchConsole: string;
    homepageNotice: string;
  };
};

export const defaultAdminState: AdminState = {
  products: ALL_PRODUCTS.slice(0, 18).map((p) => ({
    id: p.slug,
    name: p.name,
    slug: p.slug,
    hsCode: p.hsCode ?? "",
    group: p.group ?? "Flagship",
    status: "Published",
    image: p.img,
    description: p.description,
    packing: p.packing.join(", "),
    standards: p.standards.join(", "),
  })),
  blogs: BLOG_POSTS.map((p) => ({
    id: p.slug,
    title: p.title,
    slug: p.slug,
    category: p.category,
    status: "Published",
    description: p.description,
    body: p.body.join("\n\n"),
  })),
  seoPages: SEO_LANDING_PAGES.map((p) => ({
    id: p.slug,
    title: p.title,
    slug: p.slug,
    keyword: p.keyword,
    status: "Published",
    description: p.description,
  })),
  certificates: CERTIFICATES.map((c) => ({
    id: c.id,
    name: c.name,
    type: c.type,
    issuer: c.issuer,
    file: c.file,
    status: "Published",
  })),
  inquiries: [
    {
      id: "INQ-1042",
      buyer: "Ahmed Trading",
      company: "Dubai Wholesale LLC",
      product: "Fresh Onions",
      destination: "UAE",
      quantity: "1 x 40' FCL",
      channel: "WhatsApp",
      value: "High",
      notes: "Needs CIF Jebel Ali quote.",
      nextAction: "Send onion price sheet",
      status: "New",
    },
    {
      id: "INQ-1041",
      buyer: "Priya Foods",
      company: "Retail Foods UK",
      product: "Premium Rice",
      destination: "UK",
      quantity: "24 MT",
      channel: "Email",
      value: "Medium",
      notes: "Asked for private-label bags.",
      nextAction: "Follow up with bag artwork",
      status: "Quoted",
    },
    {
      id: "INQ-1040",
      buyer: "Global Spice Co.",
      company: "Importer",
      product: "Turmeric",
      destination: "EU",
      quantity: "10 MT",
      channel: "Form",
      value: "Medium",
      notes: "Needs HACCP and ISO files.",
      nextAction: "Share certificates",
      status: "Follow-up",
    },
  ],
  media: [
    {
      id: "media-logo",
      title: "Sheshaan Logo",
      type: "Image",
      url: "/logo.png",
      alt: "Sheshaan Global logo",
      category: "Brand",
    },
    {
      id: "media-catalogue",
      title: "Company Catalogue",
      type: "PDF",
      url: "/catalogue.pdf",
      alt: "Sheshaan Global catalogue",
      category: "Brochure",
    },
    {
      id: "media-haccp",
      title: "HACCP Certificate",
      type: "PDF",
      url: "/certificates/haccp-sheshaan.pdf",
      alt: "HACCP certificate",
      category: "Certificate",
    },
  ],
  countryPages: [
    {
      id: "country-uae",
      country: "United Arab Emirates",
      slug: "uae",
      port: "Jebel Ali",
      topProducts: "Fresh Onions, Green Chillies, Rice, Spices",
      status: "Published",
      description:
        "Exporter from India to UAE with FOB and CIF quote support for wholesale importers.",
    },
    {
      id: "country-uk",
      country: "United Kingdom",
      slug: "uk",
      port: "Felixstowe",
      topProducts: "Basmati Rice, Spices, Green Chillies, Pulses",
      status: "Published",
      description:
        "Indian agricultural products shipped to UK importers with documentation support.",
    },
    {
      id: "country-usa",
      country: "United States",
      slug: "usa",
      port: "New York / Los Angeles",
      topProducts: "Rice, Spices, Pulses, Dry Fruits",
      status: "Draft",
      description: "Export-ready Indian food and agri products for US importers and distributors.",
    },
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Procurement Head",
      company: "Gulf Wholesale Buyer",
      country: "UAE",
      quote:
        "Responsive quotation support and clear export documentation made the buying process easier.",
      status: "Draft",
    },
  ],
  team: [
    {
      id: "saksham-singh",
      name: "Saksham Singh",
      role: "Business Development",
      linkedin: "https://www.linkedin.com/in/saksham-singh-ba591638a/",
      email: EMAIL,
      phone: PHONE,
      status: "Published",
    },
    {
      id: "sana-zeba-bakshi",
      name: "Sana Zeba Bakshi",
      role: "Founder",
      linkedin: "https://www.linkedin.com/in/sana-zeba-bakshi/",
      email: EMAIL,
      phone: PHONE,
      status: "Published",
    },
  ],
  homepage: {
    heroTitle: "Indian Agricultural Exports for Global Buyers",
    heroSubtitle:
      "Fresh produce, rice, spices, pulses, dry fruits and certified export documentation from Sheshaan Global.",
    primaryCta: "Request Quote",
    secondaryCta: "View Products",
    featuredProducts: "Fresh Onions, Green Chillies, Premium Rice, Spices & Masalas",
    announcement: "Same-day FOB / CIF quotes available for verified importers.",
  },
  quoteSettings: {
    whatsappTemplate:
      "Hello Sheshaan Global, I want a quote for {{product}} to {{country}}. Quantity: {{quantity}}.",
    emailSubject: "Export Inquiry - Sheshaan Global",
    autoReply:
      "Thank you for your inquiry. Our export team will review your requirement and respond with pricing and documentation details.",
    requiredFields: "Name, Company, Product, Quantity, Destination Country, WhatsApp Number",
  },
  settings: {
    phone: PHONE,
    email: EMAIL,
    analyticsId: "G-HNHHQGFH13",
    searchConsole: "",
    homepageNotice: "Same-day FOB / CIF quotes available for verified importers.",
  },
};

export function normalizeAdminState(value: Partial<AdminState> | null | undefined): AdminState {
  const source = value ?? {};
  return {
    ...defaultAdminState,
    ...source,
    products: Array.isArray(source.products) ? source.products : defaultAdminState.products,
    blogs: Array.isArray(source.blogs) ? source.blogs : defaultAdminState.blogs,
    seoPages: Array.isArray(source.seoPages) ? source.seoPages : defaultAdminState.seoPages,
    certificates: Array.isArray(source.certificates)
      ? source.certificates
      : defaultAdminState.certificates,
    inquiries: Array.isArray(source.inquiries) ? source.inquiries : defaultAdminState.inquiries,
    media: Array.isArray(source.media) ? source.media : defaultAdminState.media,
    countryPages: Array.isArray(source.countryPages)
      ? source.countryPages
      : defaultAdminState.countryPages,
    testimonials: Array.isArray(source.testimonials)
      ? source.testimonials
      : defaultAdminState.testimonials,
    team: Array.isArray(source.team) ? source.team : defaultAdminState.team,
    homepage: { ...defaultAdminState.homepage, ...source.homepage },
    quoteSettings: { ...defaultAdminState.quoteSettings, ...source.quoteSettings },
    settings: { ...defaultAdminState.settings, ...source.settings },
  };
}

export function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function adminProductToProduct(product: AdminProduct): Product {
  const fallback = ALL_PRODUCTS.find((p) => p.slug === product.slug || p.name === product.name);
  const img = product.image.trim() || fallback?.img || "";
  return {
    slug: product.slug,
    name: product.name,
    hsCode: product.hsCode || undefined,
    tagline: fallback?.tagline ?? `${product.group || "Export"} supply from India`,
    img,
    gallery: img ? [img] : [],
    description: product.description,
    varieties: fallback?.varieties ?? [product.name],
    packing: splitList(product.packing),
    standards: splitList(product.standards),
    brochure: fallback?.brochure,
    brochureName: fallback?.brochureName,
    group: product.group,
  };
}

export function adminBlogToBlogPost(blog: AdminBlog): BlogPost {
  const fallback = BLOG_POSTS.find((p) => p.slug === blog.slug);
  return {
    slug: blog.slug,
    title: blog.title,
    description: blog.description,
    date: fallback?.date ?? new Date().toISOString().slice(0, 10),
    readTime: fallback?.readTime ?? "4 min read",
    category: blog.category,
    productSlug: fallback?.productSlug,
    body: blog.body
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean),
  };
}

export function adminSeoToSeoLandingPage(page: AdminSeo): SeoLandingPage {
  const fallback = SEO_LANDING_PAGES.find((p) => p.slug === page.slug);
  return {
    slug: page.slug,
    title: page.title,
    keyword: page.keyword,
    description: page.description,
    hero: fallback?.hero ?? page.description,
    productSlug: fallback?.productSlug,
    regionSlug: fallback?.regionSlug,
    points: fallback?.points ?? [
      "Direct sourcing from Indian suppliers",
      "Export documentation support",
      "FOB and CIF quote options",
      "Buyer-focused packing and dispatch planning",
    ],
    faqs: fallback?.faqs ?? [
      {
        q: `Can I request pricing for ${page.keyword}?`,
        a: "Yes. Share quantity, destination port and packing requirement to receive the latest quote.",
      },
      {
        q: "Do you support export documents?",
        a: "Yes. Product-specific export documentation can be arranged according to buyer and destination requirements.",
      },
    ],
  };
}

export function publishedProducts(state: AdminState) {
  return state.products.filter((p) => p.status === "Published").map(adminProductToProduct);
}

export function publishedBlogs(state: AdminState) {
  return state.blogs.filter((p) => p.status === "Published").map(adminBlogToBlogPost);
}

export function publishedSeoPages(state: AdminState) {
  return state.seoPages.filter((p) => p.status === "Published").map(adminSeoToSeoLandingPage);
}
