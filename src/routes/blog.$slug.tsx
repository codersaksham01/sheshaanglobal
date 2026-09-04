import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, FileImage, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  BLUE,
  BLOG_POSTS,
  NAVY,
  ORANGE,
  SITE_URL,
  buildWhatsAppUrl,
  getBlogPost,
  getProductBySlug,
  type BlogPost,
} from "@/lib/site";
import { adminBlogToBlogPost, normalizeAdminState, type AdminState } from "@/lib/admin-content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    return { post, slug: params.slug };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Blog not found - Sheshaan Global" },
          { name: "robots", content: "noindex" },
        ],
      };
    const post = loaderData.post;
    if (!post)
      return {
        meta: [{ title: "Blog - Sheshaan Global" }, { name: "robots", content: "noindex" }],
      };
    const url = `${SITE_URL}/blog/${params.slug}`;
    return {
      meta: [
        { title: `${post.title} | Sheshaan Global` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(post.image ? [{ property: "og:image", content: post.image }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Organization", name: "Sheshaan Global" },
            publisher: {
              "@type": "Organization",
              name: "Sheshaan Global",
              logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
            },
            mainEntityOfPage: url,
            ...(post.image ? { image: [post.image] } : {}),
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post: initialPost, slug } = Route.useLoaderData() as { post?: BlogPost; slug: string };
  const [livePost, setLivePost] = useState<BlogPost | undefined>(initialPost);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("No live content"))))
      .then((payload: { content?: Partial<AdminState> | null }) => {
        const adminPost = payload.content
          ? normalizeAdminState(payload.content).blogs.find(
              (p) => p.slug === slug && p.status === "Published",
            )
          : undefined;
        if (adminPost) setLivePost(adminBlogToBlogPost(adminPost));
      })
      .catch(() => undefined);
  }, [slug]);

  if (!livePost) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-6 text-center">
        <div>
          <div className="font-display text-4xl font-bold text-slate-900">Blog not found</div>
          <p className="mt-3 text-slate-600">This blog post is not published yet.</p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
            style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const post = livePost;
  const product = post.productSlug ? getProductBySlug(post.productSlug) : undefined;
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Sheshaan Global"
              className="h-10 w-10 object-contain"
              width={40}
              height={40}
            />
            <div className="leading-tight">
              <div className="font-display text-base font-bold" style={{ color: BLUE }}>
                SHESHAAN
              </div>
              <div className="text-[9px] font-semibold tracking-[0.18em]" style={{ color: ORANGE }}>
                EXPORTING GOODNESS
              </div>
            </div>
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0057B8]"
          >
            <ArrowLeft className="h-4 w-4" /> Blog
          </Link>
        </div>
      </header>

      <article>
        <section
          className="py-14 text-white sm:py-20"
          style={{ background: `linear-gradient(135deg,${NAVY},#06356d)` }}
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-white/70">
              <span className="rounded-full px-3 py-1 text-white" style={{ background: ORANGE }}>
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> {new Date(post.date).toLocaleDateString()}
              </span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="mt-5 font-display text-4xl font-black leading-tight sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-base leading-8 text-white/75">{post.description}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1fr,320px]">
          <div className="max-w-3xl">
            <figure className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  className="max-h-[420px] w-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="grid aspect-[16/9] place-items-center text-slate-300">
                  <FileImage className="h-14 w-14" />
                </div>
              )}
            </figure>
            {post.body.map((para, i) => (
              <p key={i} className="mb-6 text-base leading-8 text-slate-700">
                {para}
              </p>
            ))}
            <div
              className="mt-10 rounded-2xl p-6 text-white"
              style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
            >
              <h2 className="font-display text-2xl font-bold">
                Need pricing for this requirement?
              </h2>
              <p className="mt-2 text-sm leading-7 text-white/80">
                Share product, quantity, destination and packing. Our export team will respond with
                availability and next steps.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/request-quote"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900"
                >
                  Request Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={buildWhatsAppUrl({ category: post.title })}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white"
                  style={{ background: "#25D366" }}
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            {product && (
              <Link
                to="/products/$slug"
                params={{ slug: product.slug }}
                className="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="aspect-[4/3] w-full object-cover"
                  width={360}
                  height={270}
                />
                <div className="p-5">
                  <div
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: ORANGE }}
                  >
                    Related Product
                  </div>
                  <div className="mt-2 font-display text-lg font-bold text-slate-900">
                    {product.name}
                  </div>
                </div>
              </Link>
            )}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="font-display text-lg font-bold text-slate-900">More guides</div>
              <div className="mt-4 space-y-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="block rounded-xl bg-white p-4 text-sm font-semibold text-slate-700 hover:text-[#0057B8]"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </article>
    </main>
  );
}
