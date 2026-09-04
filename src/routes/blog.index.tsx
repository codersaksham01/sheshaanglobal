import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, FileImage, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { BLOG_POSTS, BLUE, NAVY, ORANGE, SITE_URL, buildWhatsAppUrl } from "@/lib/site";
import { normalizeAdminState, publishedBlogs, type AdminState } from "@/lib/admin-content";

const TITLE = "Export Knowledge Blog | Sheshaan Global";
const DESC =
  "Guides for importers buying agricultural products from India, including onion imports, export documents, FOB/CIF pricing and product sourcing.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "import from India blog, agricultural export guide, onion import guide, export documents India, FOB CIF pricing",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [posts, setPosts] = useState(BLOG_POSTS);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("No live content"))))
      .then((payload: { content?: Partial<AdminState> | null }) => {
        if (payload.content) setPosts(publishedBlogs(normalizeAdminState(payload.content)));
      })
      .catch(() => undefined);
  }, []);

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
            to="/request-quote"
            className="rounded-full px-4 py-2 text-xs font-bold text-white"
            style={{ background: BLUE }}
          >
            Request Quote
          </Link>
        </div>
      </header>

      <section
        className="py-14 text-white sm:py-20"
        style={{ background: `linear-gradient(135deg,${NAVY},#06356d)` }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>
            Knowledge Hub
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight sm:text-6xl">
            Practical guides for importers buying from India.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">{DESC}</p>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg"
            style={{ background: "#25D366" }}
          >
            <MessageCircle className="h-4 w-4" /> Ask Export Team
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group flex min-h-72 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#0057B8] hover:shadow-xl"
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="grid aspect-[16/10] place-items-center bg-slate-50 text-slate-300">
                  <FileImage className="h-12 w-12" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CalendarDays className="h-4 w-4" style={{ color: ORANGE }} />
                  {new Date(post.date).toLocaleDateString()} - {post.readTime}
                </div>
                <div
                  className="mt-4 text-xs font-bold uppercase tracking-widest"
                  style={{ color: BLUE }}
                >
                  {post.category}
                </div>
                <h2 className="mt-3 font-display text-xl font-bold leading-snug text-slate-900">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{post.description}</p>
                <span
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold"
                  style={{ color: ORANGE }}
                >
                  Read guide{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
