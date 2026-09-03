import {
  ALL_PRODUCTS, BLOG_POSTS, CERTIFICATES, EMAIL, PHONE, SEO_LANDING_PAGES,
  type BlogPost, type Product, type SeoLandingPage,
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
  status: "New" | "Quoted" | "Follow-up" | "Closed";
};

export type AdminState = {
  products: AdminProduct[];
  blogs: AdminBlog[];
  seoPages: AdminSeo[];
  certificates: AdminCertificate[];
  inquiries: AdminInquiry[];
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
    { id: "INQ-1042", buyer: "Ahmed Trading", company: "Dubai Wholesale LLC", product: "Fresh Onions", destination: "UAE", quantity: "1 x 40' FCL", channel: "WhatsApp", status: "New" },
    { id: "INQ-1041", buyer: "Priya Foods", company: "Retail Foods UK", product: "Premium Rice", destination: "UK", quantity: "24 MT", channel: "Email", status: "Quoted" },
    { id: "INQ-1040", buyer: "Global Spice Co.", company: "Importer", product: "Turmeric", destination: "EU", quantity: "10 MT", channel: "Form", status: "Follow-up" },
  ],
  settings: {
    phone: PHONE,
    email: EMAIL,
    analyticsId: "G-HNHHQGFH13",
    searchConsole: "",
    homepageNotice: "Same-day FOB / CIF quotes available for verified importers.",
  },
};

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
    body: blog.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
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
      { q: `Can I request pricing for ${page.keyword}?`, a: "Yes. Share quantity, destination port and packing requirement to receive the latest quote." },
      { q: "Do you support export documents?", a: "Yes. Product-specific export documentation can be arranged according to buyer and destination requirements." },
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
