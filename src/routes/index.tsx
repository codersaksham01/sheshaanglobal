import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Globe2, Package, ShieldCheck, Ship, ArrowRight, MapPin, Phone, Mail,
  MessageCircle, Award, Sprout, Truck, DollarSign, Clock, HeartHandshake,
  FileCheck2, Box, ChevronLeft, ChevronRight, X, Menu, Download, Eye, FileText,
  Loader2, Search, Filter, BadgePercent, Linkedin,
} from "lucide-react";
import logo from "@/assets/logo.png";
import heroGlobe from "@/assets/hero-globe.jpg";
import farmExport from "@/assets/farm-export.jpg";
import worldMap from "@/assets/world-map.jpg";
import {
  BLUE, ORANGE, NAVY, PHONE, PHONE_RAW, EMAIL, BROCHURE_URL,
  WHATSAPP_URL, MAILTO_URL, LINKEDIN_SAKSHAM, LINKEDIN_SANA, buildWhatsAppUrl, PRODUCTS, COUNTRIES,
  CERTIFICATES, CERT_TYPES, FAQS, REGIONS, BLOG_POSTS, SEO_LANDING_PAGES, ORGANIZATION_JSONLD, type Certificate,
} from "@/lib/site";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { LoadingScreen } from "@/components/LoadingScreen";

const SITE_URL = "https://global-roots-express.lovable.app";
const HOME_OG_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/151163a4-b0a4-4618-870c-3036bf272bc4/id-preview-9f783eb1--1c1a3479-b063-4556-a6ca-26b03b90f481.lovable.app-1784225780475.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sheshaan Global — Premium Agricultural Exports From India to 25+ Countries" },
      { name: "description", content: "IEC & APEDA certified Indian exporter of onions, green chillies, rice, coconut, spices and pulses to 25+ countries. Get catalogue & pricing." },
      { name: "keywords", content: "Indian agricultural exporter, onion exporter India, green chillies exporter, basmati rice exporter, coconut exporter, spices exporter, pulses exporter, APEDA, IEC certified, Sheshaan Global" },
      { property: "og:title", content: "Sheshaan Global — Premium Agricultural Exports From India to 25+ Countries" },
      { property: "og:description", content: "IEC & APEDA certified Indian exporter of onions, green chillies, rice, coconut, spices and pulses to 25+ countries. Get catalogue & pricing." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/" },
      { property: "og:image", content: HOME_OG_IMAGE },
      { name: "twitter:title", content: "Sheshaan Global — Premium Agricultural Exports From India to 25+ Countries" },
      { name: "twitter:description", content: "IEC & APEDA certified Indian exporter of onions, green chillies, rice, coconut, spices and pulses to 25+ countries." },
      { name: "twitter:image", content: HOME_OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: SITE_URL + "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Sheshaan Global",
          url: SITE_URL + "/",
        }),
      },
    ],
  }),
  component: Home,
});


/* ---------- Motion helpers ---------- */
const EASE = [0.22, 1, 0.36, 1] as const;

function useMotionSafe() {
  const reduced = useReducedMotion();
  return {
    reduced: !!reduced,
    fadeUp: reduced
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 } }
      : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE } },
  };
}

/* ---------- Counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? to : 0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (reduced) { setN(to); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min((t - start) / 1400, 1);
          setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, reduced]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ---------- Nav ---------- */
const NAV_LINKS = [

  { label: "Home", href: "#home" },
  { label: "Products", href: "/products" },
  { label: "Markets", href: "#markets" },
  { label: "Quote", href: "/request-quote" },
  { label: "Blog", href: "/blog" },
  { label: "Certifications", href: "#certs" },
  { label: "Contact Us", href: "/contact" },
];


function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 20);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-white/90 backdrop-blur-lg shadow-[0_2px_20px_rgba(0,0,0,0.06)]" : "bg-white"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="Sheshaan Global" className="h-12 w-12 object-contain sg-float drop-shadow-[0_4px_10px_rgba(0,87,184,0.25)]" />
          <div className="leading-tight">
            <div className="font-display text-xl font-bold tracking-tight" style={{ color: BLUE }}>SHESHAAN</div>
            <div className="text-[9px] font-semibold tracking-[0.22em]" style={{ color: ORANGE }}>EXPORTING GOODNESS WORLDWIDE</div>
          </div>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-700 transition-colors hover:text-[#0057B8]">{l.label}</a>
          ))}
        </nav>
        <a href="/request-quote" className="hidden items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 lg:inline-flex" style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}>
          Request Quote <ArrowRight className="h-4 w-4" />
        </a>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-white lg:hidden">
          <div className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">{l.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const reduced = useReducedMotion();
  const stats = [
    { icon: Globe2, n: "25+", l: "Export Markets" },
    { icon: Box, n: "Farm Fresh", l: "Sourced Direct" },
    { icon: ShieldCheck, n: "100%", l: "Quality Focus" },
    { icon: Ship, n: "Global", l: "Logistics Network" },
  ];
  return (
    <section id="home" className="relative overflow-hidden pt-20" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, #072b5a 100%)` }}>
      <motion.img
        src={heroGlobe}
        alt="Global export network"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        width={1600}
        height={1000}
        loading="eager"
        decoding="async"
        initial={reduced ? undefined : { scale: 1.1 }}
        animate={reduced ? undefined : { scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${NAVY}ee 0%, ${NAVY}88 55%, transparent 100%)` }} />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-14 lg:pt-24">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-2xl text-white"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORANGE }} />
            Trusted Global Exporter
          </div>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            CONNECTING INDIA'S<br />
            AGRICULTURAL EXCELLENCE<br />
            TO <span style={{ color: ORANGE }}>GLOBAL MARKETS</span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-white/80 sm:text-lg">
            Premium sourcing, production, processing and export solutions delivering quality agricultural products worldwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#products" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg,${BLUE},#0070e0)` }}>
              Explore Products <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/request-quote" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}>
              Request Quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, ease: EASE }}
                className="rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-4 backdrop-blur-md"
              >
                <s.icon className="mb-2 h-5 w-5" style={{ color: ORANGE }} />
                <div className="font-display text-2xl font-bold text-white">{s.n}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/70">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  const { fadeUp } = useMotionSafe();
  const badges = [
    { t: "Quality Assurance", i: ShieldCheck },
    { t: "Global Standards", i: Globe2 },
    { t: "Competitive Prices", i: BadgePercent },
    { t: "Timely Delivery", i: Clock },
    { t: "Customer Satisfaction", i: HeartHandshake },
  ];
  return (
    <section id="about" className="bg-slate-50 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div {...fadeUp} viewport={{ once: true, margin: "-80px" }}>
          <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>About Sheshaan Global</div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Delivering Value From<br />Our Farms to <span style={{ color: ORANGE }}>The World</span>
          </h2>
          <p className="mt-6 max-w-lg text-slate-600">
            Founded in 2022, Sheshaan Global is committed to providing the finest agricultural products from India to international markets with trust, transparency, and unmatched quality.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["IEC Certified", "GST Registered", "APEDA Certified", "FSSAI Certified"].map((c) => (
              <div key={c} className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
                <div className="font-display text-sm font-bold" style={{ color: BLUE }}>{c.split(" ")[0]}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">{c.split(" ").slice(1).join(" ")}</div>
              </div>
            ))}
          </div>
          <a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}>
            Know More About Us <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="overflow-hidden rounded-3xl shadow-2xl"
          >
            <img src={farmExport} alt="Farm to export" width={1024} height={1024} loading="lazy" className="h-[440px] w-full object-cover" />
          </motion.div>
          <div className="absolute -right-4 top-6 flex flex-col gap-3">
            {badges.map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: EASE }}
                className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl"
              >
                <div className="grid h-9 w-9 place-items-center rounded-full" style={{ background: `${BLUE}15`, color: BLUE }}>
                  <b.i className="h-5 w-5" />
                </div>
                <div className="text-xs font-semibold leading-tight text-slate-800">{b.t}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Products ---------- */
function Products() {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  return (
    <section id="products" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center sm:text-left mx-auto sm:mx-0"
          >
            <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>Our Products</div>
            <h2 className="mt-3 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
              Premium Quality <span style={{ color: ORANGE }}>Agricultural Products</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full sm:mx-0" style={{ background: ORANGE }} />
          </motion.div>
          <div className="hidden items-center gap-2 sm:flex">
            <a href="/products" className="mr-2 inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-semibold transition hover:border-[#0057B8]" style={{ color: BLUE }}>
              All products & HS codes
            </a>
            <a href="/request-quote" className="mr-2 inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold text-white shadow-sm" style={{ background: ORANGE }}>
              Get price quote
            </a>
            <button onClick={() => scroll(-1)} aria-label="Scroll left" className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#0057B8] hover:text-[#0057B8]"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => scroll(1)} aria-label="Scroll right" className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#0057B8] hover:text-[#0057B8]"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>

        <div ref={scroller} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
              className="w-[220px] flex-shrink-0 snap-start sm:w-[240px]"
            >
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={p.img} alt={p.name} width={480} height={480} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex items-center justify-between px-4 py-4">
                  <div>
                    <div className="font-display text-sm font-semibold text-slate-900">{p.name}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-500">View details</div>
                  </div>
                  <div className="grid h-8 w-8 place-items-center rounded-full transition-colors group-hover:bg-[#0057B8] group-hover:text-white" style={{ background: `${BLUE}12`, color: BLUE }}>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Global Markets with animated map pins ---------- */
function Markets() {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Highlight the country row nearest the viewport center as the user scrolls.
  // Perf: the measuring pass is rAF-throttled and only runs while the list is
  // actually on screen, so scrolling the rest of the page costs nothing.
  useEffect(() => {
    if (reduced) return;
    const container = listRef.current;
    if (!container) return;
    const rows = Array.from(container.querySelectorAll<HTMLElement>("[data-country]"));
    if (!rows.length) return;

    let raf = 0;
    let onScreen = true;

    const measure = () => {
      raf = 0;
      const vh = window.innerHeight;
      const viewportCenter = vh / 2;
      let best: { name: string; dist: number } | null = null;
      for (const r of rows) {
        const rect = r.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) continue;
        const dist = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        const name = r.dataset.country;
        if (!name) continue;
        if (!best || dist < best.dist) best = { name, dist };
      }
      if (best) setActive((prev) => (prev === best!.name ? prev : best!.name));
    };

    const onScroll = () => {
      if (!onScreen || raf) return;
      raf = requestAnimationFrame(measure);
    };

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) onScroll();
      });
      observer.observe(container);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);


  return (
    <section id="markets" className="relative overflow-hidden py-24" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #062354 100%)` }}>
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[1fr,1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-white lg:sticky lg:top-28"
        >
          <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>Global Reach</div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Exporting to<br /><span style={{ color: ORANGE }}>
              <Counter to={25} suffix="+" /> Countries
            </span><br />Worldwide
          </h2>
          <p className="mt-6 max-w-md text-white/75">
            We are proud to export our premium quality products to a wide range of countries across the globe. Hover a country to spot it on the map.
          </p>
          <a href="/request-quote" className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg,${BLUE},#0070e0)` }}>
            Start Export Inquiry <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div>
          {/* Map */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img src={worldMap} alt="Export destinations map" width={1400} height={900} loading="lazy" className="w-full" />
            <div className="absolute inset-0">
              {COUNTRIES.map((c) => {
                const isActive = active === c.n;
                return (
                  <div
                    key={c.n}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${c.x}%`, top: `${c.y}%` }}
                    onMouseEnter={() => setActive(c.n)}
                  >
                    {isActive && !reduced && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0.7 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 m-auto h-3 w-3 rounded-full"
                        style={{ background: ORANGE }}
                      />
                    )}
                    <motion.button
                      aria-label={c.n}
                      animate={{ scale: isActive ? 1.6 : 1 }}
                      transition={{ type: "spring", damping: 14, stiffness: 260 }}
                      className="relative block h-3 w-3 rounded-full ring-2 ring-white/80 shadow-lg"
                      style={{ background: isActive ? ORANGE : BLUE }}
                    />
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: -10 }}
                        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow-xl"
                      >
                        {c.f} {c.n}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Country list */}
          <div ref={listRef} className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1 rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md sm:grid-cols-2">
            {COUNTRIES.map((c) => {
              const isActive = active === c.n;
              return (
                <button
                  key={c.n}
                  data-country={c.n}
                  onMouseEnter={() => setActive(c.n)}
                  onFocus={() => setActive(c.n)}
                  className={`group flex items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition-all ${
                    isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
                  }`}
                >
                  <span className={`inline-block h-1.5 w-1.5 rounded-full transition-all ${isActive ? "scale-150" : ""}`} style={{ background: isActive ? ORANGE : "rgba(255,255,255,0.35)" }} />
                  <span className="text-lg">{c.f}</span>
                  <span className={isActive ? "font-semibold" : ""}>{c.n}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Region landing entry points (internal linking + SEO) ---------- */
function RegionsStrip() {
  return (
    <section id="regions" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>Dedicated Export Markets</div>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Region-specific export pages</h2>
            <p className="mt-2 max-w-2xl text-slate-600">Ports, incoterms, transit windows and localised documentation for each of our key markets.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((r, i) => (
            <motion.div
              key={r.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/export-to/$region"
                params={{ region: r.slug }}
                className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0057B8] hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl leading-none">{r.flag}</span>
                  <div>
                    <div className="font-display text-lg font-bold text-slate-900">Export to {r.short}</div>
                    <div className="text-xs text-slate-500">{r.name}</div>
                  </div>
                </div>
                <p className="mt-4 line-clamp-3 text-sm text-slate-600">{r.intro}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: BLUE }}>
                  Explore {r.short} exports <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Certifications with loading state ---------- */
function Certifications() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  // Filters
  const [q, setQ] = useState("");
  const [fType, setFType] = useState<string>("All");
  const [fCategory, setFCategory] = useState<string>("All");
  const [fCountry, setFCountry] = useState<string>("All");

  // Pre-select category from URL (?cat=...) — e.g. from a product page CTA.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (!cat) return;
    const match = PRODUCTS.find((p) => p.name.toLowerCase() === cat.toLowerCase());
    if (match) {
      setFCategory(match.name);
      // Smooth-scroll to the certifications section once state is applied.
      requestAnimationFrame(() => {
        document.getElementById("certs")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  // Bug fix: a stray "All (products)" pseudo-option matched no certificate and
  // produced an always-empty result list. Only real product names are offered.
  const allCategories = useMemo(
    () => ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.name)))],
    [],
  );

  const allCountries = useMemo(() => {
    const set = new Set<string>();
    CERTIFICATES.forEach((c) => c.countries.forEach((x) => set.add(x)));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const qs = q.trim().toLowerCase();
    return CERTIFICATES.filter((c) => {
      if (fType !== "All" && c.type !== fType) return false;
      if (fCategory !== "All" && !c.categories.includes("All") && !c.categories.includes(fCategory)) return false;
      if (fCountry !== "All" && !c.countries.includes(fCountry)) return false;
      if (!qs) return true;
      return (
        c.name.toLowerCase().includes(qs) ||
        c.fullName.toLowerCase().includes(qs) ||
        c.issuer.toLowerCase().includes(qs) ||
        c.type.toLowerCase().includes(qs)
      );
    });
  }, [q, fType, fCategory, fCountry]);

  const active = openId ? CERTIFICATES.find((c) => c.id === openId) ?? null : null;
  const activeFileIsPdf = active?.file.split("?")[0].toLowerCase().endsWith(".pdf") ?? false;

  useEffect(() => {
    if (openId) setImgLoading(true);
  }, [openId, activeFileIsPdf]);

  const handleDownload = async (cert: Certificate) => {
    setDownloading(cert.id);
    // Abort a stalled request instead of leaving the button spinning forever.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(cert.file, { signal: controller.signal });
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const ext = (cert.file.split("?")[0].split(".").pop() || "png").toLowerCase();
      a.download = `Sheshaan-${cert.name}-Certificate.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Revoking synchronously can cancel the download in Safari/Firefox.
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch {
      window.open(cert.file, "_blank", "noopener,noreferrer");
    } finally {
      clearTimeout(timer);
      setDownloading(null);
    }
  };


  const resetFilters = () => { setQ(""); setFType("All"); setFCategory("All"); setFCountry("All"); };
  const isFiltered = q || fType !== "All" || fCategory !== "All" || fCountry !== "All";

  return (
    <section id="certs" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center"
        >
          <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>Our Certifications</div>
          <h2 className="mt-3 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
            Certified. Compliant. <span style={{ color: ORANGE }}>Globally Trusted.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600">
            Search or filter by type, product category or country to find the compliance document you need.
          </p>
        </motion.div>

        {/* Filter panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          role="search"
          aria-label="Filter certificates"
          className="mx-auto mt-10 flex max-w-5xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center"
        >
          <label className="relative flex-1">
            <span className="sr-only">Search certificates</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, issuer or type…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#0057B8]"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="hidden h-4 w-4 text-slate-500 md:block" aria-hidden />
            <select aria-label="Filter by type" value={fType} onChange={(e) => setFType(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#0057B8]">
              <option value="All">All types</option>
              {CERT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select aria-label="Filter by product category" value={fCategory} onChange={(e) => setFCategory(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#0057B8]">
              <option value="All">All categories</option>
              {allCategories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select aria-label="Filter by country" value={fCountry} onChange={(e) => setFCountry(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#0057B8]">
              {allCountries.map((c) => <option key={c} value={c}>{c === "All" ? "All countries" : c}</option>)}
            </select>
            {isFiltered && (
              <button onClick={resetFilters} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:border-[#0057B8] hover:text-[#0057B8]">
                Reset
              </button>
            )}
          </div>
        </motion.div>

        <div aria-live="polite" className="mt-4 text-center text-xs text-slate-500">
          {filtered.length} of {CERTIFICATES.length} certificates
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full">
                  <button
                    onClick={() => setOpenId(c.id)}
                    aria-label={`View ${c.name} — ${c.fullName}`}
                    className="mx-auto block w-[70%] overflow-hidden rounded-lg border-4 border-slate-100 bg-white shadow-xl transition-transform hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8]"
                  >
                    <img src={c.img} alt={`${c.name} certificate preview`} loading="lazy" className="h-48 w-full object-cover" />
                  </button>
                  <div className="mx-auto mt-2 h-3 w-[80%] rounded-b-full bg-gradient-to-b from-slate-200 to-transparent" />
                  <div className="mx-auto -mt-1 h-5 w-[85%] rounded-full bg-white shadow-md" />
                </div>
                <div className="mt-4 font-display text-xl font-bold text-slate-900">{c.name}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">{c.label}</div>
                <div className="mt-1 text-[10px] font-medium text-slate-400">{c.type}</div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setOpenId(c.id)}
                    aria-label={`View ${c.name} certificate`}
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8]"
                    style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
                  >
                    <Eye className="h-3.5 w-3.5" aria-hidden /> View
                  </button>
                  <button
                    onClick={() => handleDownload(c)}
                    disabled={downloading === c.id}
                    aria-label={`Download ${c.name} certificate`}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white shadow disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
                  >
                    {downloading === c.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <Download className="h-3.5 w-3.5" aria-hidden />}
                    {downloading === c.id ? "Saving…" : "Download"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <div className="font-display text-lg font-semibold text-slate-800">No certificates match</div>
            <p className="mt-2 text-sm text-slate-500">Try clearing filters or searching a different keyword.</p>
            <button onClick={resetFilters} className="mt-4 rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white">Reset filters</button>
          </div>
        )}
      </div>

      {/* Accessible certificate modal (Radix Dialog — focus trap, ESC, aria-modal, focus return) */}
      <Dialog open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-hidden p-0 sm:rounded-2xl">
          {active && (
            <>
              <DialogHeader className="border-b border-slate-100 px-5 py-4 text-left">
                <DialogTitle className="font-display text-lg font-bold text-slate-900">
                  {active.name} — {active.fullName}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  {active.type} · Issued by {active.issuer}
                  {active.issuedOn && ` · ${new Date(active.issuedOn).toLocaleDateString()}`}
                </DialogDescription>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={active.file}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-[#0057B8] hover:text-[#0057B8]"
                  >
                    <Eye className="h-4 w-4" aria-hidden /> Open in new tab
                  </a>
                  <button
                    onClick={() => handleDownload(active)}
                    disabled={downloading === active.id}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-white shadow disabled:opacity-70"
                    style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
                  >
                    {downloading === active.id ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Download className="h-4 w-4" aria-hidden />}
                    {downloading === active.id ? "Preparing…" : "Download"}
                  </button>
                </div>
              </DialogHeader>
              <div className={`relative bg-slate-50 ${activeFileIsPdf ? "h-[70vh] p-3" : "max-h-[70vh] overflow-auto p-4"}`}>
                {imgLoading && (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-slate-50/80 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading certificate…
                    </div>
                  </div>
                )}
                {activeFileIsPdf ? (
                  <iframe
                    src={active.file}
                    title={`${active.name} certificate PDF`}
                    onLoad={() => setImgLoading(false)}
                    className="h-full w-full rounded-lg border border-slate-200 bg-white shadow-lg"
                  />
                ) : (
                <img
                  src={active.img}
                  alt={`${active.name} certificate — full view`}
                  onLoad={() => setImgLoading(false)}
                  onError={() => setImgLoading(false)}
                  className="mx-auto max-h-[65vh] w-auto rounded-lg shadow-lg"
                />
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ---------- SEO landing page hub ---------- */
function SeoHub() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>Popular Searches</div>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">High-demand export pages</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">Focused pages built for buyers searching specific products and export markets.</p>
          </div>
          <a href="/request-quote" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-lg" style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}>
            Request Quote <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEO_LANDING_PAGES.map((page) => (
            <Link key={page.slug} to="/seo/$slug" params={{ slug: page.slug }} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0057B8] hover:shadow-xl">
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: BLUE }}>{page.keyword}</div>
              <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{page.title.replace(" | Sheshaan Global", "")}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{page.description}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: ORANGE }}>
                Open page <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Blog preview ---------- */
function BlogPreview() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>Knowledge Hub</div>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Importer guides that build trust</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">Helpful articles bring search traffic and answer buyer questions before they inquire.</p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm hover:border-[#0057B8] hover:text-[#0057B8]">
            View Blog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="group flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:border-[#0057B8] hover:bg-white hover:shadow-xl">
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>{post.category}</div>
              <h3 className="mt-3 font-display text-xl font-bold leading-snug text-slate-900">{post.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{post.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: BLUE }}>
                Read guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Strong final CTA ---------- */
function QuoteCta() {
  return (
    <section className="px-5 py-14 sm:px-6" style={{ background: `linear-gradient(135deg,${NAVY},#062354)` }}>
      <div className="mx-auto grid max-w-7xl gap-6 rounded-2xl border border-white/10 bg-white/10 p-6 text-white shadow-2xl backdrop-blur sm:p-8 lg:grid-cols-[1fr,auto] lg:items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>Ready To Buy</div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Get a clear export quote with product, packing and port details.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">The quote form prepares a clean WhatsApp or email message, helping our team reply faster with availability and FOB/CIF pricing.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="/request-quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-lg">
            Request Quote <ArrowRight className="h-4 w-4" />
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg" style={{ background: "#25D366" }}>
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}



/* ---------- Why Us Strip ---------- */
function WhyUs() {
  const items = [
    { i: Sprout, t: "Direct Farm Sourcing" },
    { i: Globe2, t: "Global Export Expertise" },
    { i: ShieldCheck, t: "Quality Assurance" },
    { i: DollarSign, t: "Competitive Pricing" },
    { i: Clock, t: "Timely Deliveries" },
    { i: Truck, t: "Worldwide Logistics Support" },
    { i: FileCheck2, t: "Regulatory Compliance" },
    { i: Package, t: "Customized Packaging Solutions" },
  ];
  return (
    <section id="why" className="py-4" style={{ background: `linear-gradient(90deg, ${BLUE}, #003c85)` }}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-8 text-white sm:grid-cols-4 lg:grid-cols-8">
        {items.map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, ease: EASE }}
            className="flex flex-col items-center gap-2 px-2 text-center"
          >
            <div className="grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
              <it.i className="h-5 w-5" style={{ color: ORANGE }} />
            </div>
            <div className="text-[11px] font-semibold leading-tight">{it.t}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="py-14 text-white" style={{ background: NAVY }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Sheshaan Global" className="h-12 w-12 object-contain sg-float drop-shadow-[0_4px_10px_rgba(0,87,184,0.25)]" />
            <div>
              <div className="font-display text-lg font-bold" style={{ color: "#fff" }}>SHESHAAN</div>
              <div className="text-[9px] font-semibold tracking-[0.2em]" style={{ color: ORANGE }}>EXPORTING GOODNESS WORLDWIDE</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/60">Premium agricultural exports from India to the world.</p>
        </div>
        <div>
          <div className="font-display text-sm font-semibold uppercase tracking-widest" style={{ color: ORANGE }}>Explore</div>
          <div className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => <a key={l.href} href={l.href} className="block text-sm text-white/70 hover:text-white">{l.label}</a>)}
          </div>
        </div>
        <div>
          <div className="font-display text-sm font-semibold uppercase tracking-widest" style={{ color: ORANGE }}>Products</div>
          <div className="mt-4 space-y-2">
            {PRODUCTS.map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="block text-sm text-white/70 hover:text-white">{p.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <div className="font-display text-sm font-semibold uppercase tracking-widest" style={{ color: ORANGE }}>Contact</div>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" style={{ color: ORANGE }} /> Maharashtra, India</div>
            <a href={`tel:${PHONE_RAW}`} className="flex items-start gap-2 hover:text-white"><Phone className="mt-0.5 h-4 w-4" style={{ color: ORANGE }} /> {PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="flex items-start gap-2 hover:text-white"><Mail className="mt-0.5 h-4 w-4" style={{ color: ORANGE }} /> {EMAIL}</a>
            <a href={LINKEDIN_SAKSHAM} target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-white"><Linkedin className="mt-0.5 h-4 w-4" style={{ color: ORANGE }} /> Saksham Singh</a>
            <a href={LINKEDIN_SANA} target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-white"><Linkedin className="mt-0.5 h-4 w-4" style={{ color: ORANGE }} /> Sana Zeba Bakshi</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Sheshaan Global. All rights reserved.
      </div>
    </footer>
  );
}

/* ---------- Floating Message Menu ---------- */
function MessageFab() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const actions = [
    { label: "Request Quote", sub: "Structured inquiry", icon: FileText, href: "/request-quote", bg: ORANGE },
    { label: "WhatsApp", sub: "Chat instantly", icon: MessageCircle, href: WHATSAPP_URL, bg: "#25D366", external: true },
    { label: "Email Us", sub: EMAIL, icon: Mail, href: MAILTO_URL, bg: BLUE },
    { label: "Saksham LinkedIn", sub: "Business development", icon: Linkedin, href: LINKEDIN_SAKSHAM, bg: "#0A66C2", external: true },
    { label: "Sana LinkedIn", sub: "Chief Executive Officer", icon: Linkedin, href: LINKEDIN_SANA, bg: NAVY, external: true },
    { label: "Download Brochure", sub: "PDF catalogue", icon: FileText, href: BROCHURE_URL, bg: ORANGE, download: "Sheshaan-Global-Catalogue.pdf" },
  ] as const;

  // Close on ESC, click-outside, and manage focus.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); return; }
      if (e.key === "Tab") {
        // Simple focus trap between menu items + trigger
        const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
        if (!items || items.length === 0) return;
        const first = items[0]; const last = items[items.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
        items[next]?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    // Move focus into menu
    requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            role="menu"
            aria-label="Contact channels"
            id="message-fab-menu"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", damping: 22 }}
            className="flex w-[calc(100vw-2rem)] max-w-72 flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl sm:w-64"
          >
            <div className="px-3 py-2">
              <div className="font-display text-sm font-bold text-slate-900">How can we help?</div>
              <div className="text-[11px] text-slate-500">Pick your preferred channel</div>
            </div>
            {actions.map((a, i) => {
              const isDownload = "download" in a && a.download;
              return (
                <motion.a
                  key={a.label}
                  role="menuitem"
                  tabIndex={-1}
                  aria-label={`${a.label} — ${a.sub}`}
                  href={a.href}
                  {...(("external" in a && a.external) ? { target: "_blank", rel: "noreferrer" } : {})}
                  {...(isDownload ? { download: a.download } : {})}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8]"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl text-white shadow" style={{ background: a.bg }}>
                    <a.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">{a.label}</div>
                    <div className="truncate text-[11px] text-slate-500">{a.sub}</div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="message-fab-menu"
        className="relative grid h-16 w-16 place-items-center rounded-full text-white shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8A00]/40"
        style={{ background: `linear-gradient(135deg,${BLUE},${ORANGE})` }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X className="h-6 w-6" aria-hidden /></motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle className="h-6 w-6" aria-hidden /></motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span aria-hidden className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: ORANGE }} />
            <span className="relative inline-flex h-3 w-3 rounded-full" style={{ background: ORANGE }} />
          </span>
        )}
      </motion.button>
    </div>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center"
        >
          <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>FAQ</div>
          <h2 className="mt-3 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
            Frequently Asked <span style={{ color: ORANGE }}>Questions</span>
          </h2>
        </motion.div>
        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-semibold text-slate-900 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8]"
                >
                  <span>{f.q}</span>
                  <ChevronRight className={`h-5 w-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} style={{ color: ORANGE }} aria-hidden />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-sm text-slate-600">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ---------- Page ---------- */
function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">

      <LoadingScreen />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Products />
        <Markets />
        <RegionsStrip />
        <SeoHub />
        <Certifications />
        <WhyUs />
        <BlogPreview />
        <FAQ />
        <QuoteCta />
      </main>
      <Footer />
      <MessageFab />
    </div>
  );
}
