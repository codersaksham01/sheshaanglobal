import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Globe2,
  Package,
  ShieldCheck,
  Ship,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Award,
  Sprout,
  Truck,
  DollarSign,
  Clock,
  HeartHandshake,
  FileCheck2,
  Box,
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Eye,
  FileText,
  Loader2,
  Search,
  Filter,
  BadgePercent,
  ClipboardCheck,
  Warehouse,
  Anchor,
  Plane,
  Factory,
  BarChart3,
  Layers3,
} from "lucide-react";
import logo from "@/assets/logo.png";
import heroGlobe from "@/assets/hero-globe.jpg";
import farmExport from "@/assets/global-farm-to-market-partnership.png";
import worldMap from "@/assets/world-map.jpg";
import {
  BLUE,
  ORANGE,
  NAVY,
  PHONE,
  PHONE_RAW,
  EMAIL,
  BROCHURE_URL,
  WHATSAPP_URL,
  MAILTO_URL,
  buildWhatsAppUrl,
  PRODUCTS,
  COUNTRIES,
  CERTIFICATES,
  CERT_TYPES,
  FAQS,
  REGIONS,
  ORGANIZATION_JSONLD,
  LOCAL_BUSINESS_JSONLD,
  SOCIAL_AND_TRADE_PROFILES,
  type Certificate,
} from "@/lib/site";
import { absoluteUrl, DEFAULT_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LoadingScreen } from "@/components/LoadingScreen";

const HOME_OG_IMAGE = "https://www.sheshaanglobal.com/logo.png";

const HOME_PAGE_TITLE = "Indian Agricultural Exporter | Fresh Onions, Rice & Spices — Sheshaan Global";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_PAGE_TITLE },
      {
        name: "description",
        content:
          "APEDA & IEC certified Indian agricultural exporter supplying Nashik red onions, Basmati rice, green chillies, spices, coconuts and pulses to 25+ countries worldwide via JNPT and Mundra.",
      },
      { name: "keywords", content: DEFAULT_KEYWORDS },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      {
        property: "og:title",
        content: HOME_PAGE_TITLE,
      },
      {
        property: "og:description",
        content:
          "APEDA & IEC certified Indian agricultural exporter supplying Nashik red onions, Basmati rice, green chillies, spices, coconuts and pulses to 25+ countries worldwide via JNPT and Mundra.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/" },
      { property: "og:image", content: HOME_OG_IMAGE },
      { property: "og:image:alt", content: `${SITE_NAME} agricultural export company` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: HOME_PAGE_TITLE,
      },
      {
        name: "twitter:description",
        content:
          "APEDA & IEC certified Indian agricultural exporter supplying Nashik red onions, Basmati rice, green chillies, spices, coconuts and pulses to 25+ countries worldwide.",
      },
      { name: "twitter:image", content: HOME_OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: SITE_URL + "/" },
      { rel: "preload", as: "image", href: heroGlobe },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCAL_BUSINESS_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          name: HOME_PAGE_TITLE,
          description:
            "IEC and APEDA certified Indian exporter of onions, green chillies, rice, coconut, spices and pulses to 25+ countries.",
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["#hero-title", "#hero-description", "#about-summary"],
          },
        }),
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
          name: SITE_NAME,
          url: SITE_URL + "/",
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/products?search={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Sheshaan Global agricultural export products",
          itemListElement: PRODUCTS.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.name,
            url: absoluteUrl(`/products/${p.slug}`),
          })),
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
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE },
        },
  };
}

/* ---------- Counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const reduced = useReducedMotion();
  // Initialize with target value (`to`) so SSR / pre-rendered static HTML serves '25+' to search bots
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (reduced) {
      setN(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setN(0);
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
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ---------- Nav Links (Footer) ---------- */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products Catalog (49 Commodities)", href: "/products" },
  { label: "Dedicated Port Corridors", href: "/exports" },
  { label: "Global Export Markets", href: "/global-export-markets" },
  { label: "Trade Compliance Hub", href: "/trade-compliance" },
  { label: "Quality & Certifications", href: "/quality" },
  { label: "Contact Trade Desk", href: "/contact" },
];

/* ---------- Hero ---------- */
function Hero() {
  const reduced = useReducedMotion();
  const stats = [
    { icon: Globe2, n: "25+", l: "Export Markets" },
    { icon: Package, n: "103", l: "HS Code Lines" },
    { icon: ShieldCheck, n: "5", l: "Compliance Layers" },
    { icon: Ship, n: "FCL/LCL", l: "Ocean Freight" },
  ];
  const tradeCards = [
    { label: "Quality Gate", value: "Lot-wise inspection", icon: ClipboardCheck },
    { label: "Documents", value: "COO, phyto, fumigation", icon: FileCheck2 },
    { label: "Dispatch Mode", value: "Sea, air and reefer", icon: Plane },
  ];
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#04152D] to-[#072b5a]"
    >
      <motion.img
        src={heroGlobe}
        alt="Sheshaan Global - Indian Agricultural Exporter Connecting India to Global Markets"
        className="absolute inset-0 h-full w-full object-cover opacity-65"
        width={1600}
        height={1000}
        fetchPriority="high"
        decoding="async"
        initial={reduced ? undefined : { scale: 1.1 }}
        animate={reduced ? undefined : { scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#04152Df4] via-[#04152Dc5] to-[#04152D44]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(4,21,45,0.35))]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 pb-20 pt-12 sm:pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pt-24">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-2xl text-white"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
            APEDA & IEC Accredited Trade House
          </div>
          <h1
            id="hero-title"
            className="font-display text-[1.85rem] font-extrabold leading-[1.08] tracking-tight break-words sm:text-5xl lg:text-6xl"
          >
            <span className="block text-xl font-bold uppercase tracking-wider text-amber-400 sm:text-2xl lg:text-3xl mb-3">
              Indian Agricultural Exporter{" "}
            </span>
            CONNECTING INDIA&apos;S
            <br />
            AGRICULTURAL EXCELLENCE
            <br />
            TO <span className="text-brand-orange">GLOBAL MARKETS</span>
          </h1>
          <p
            id="hero-description"
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Sheshaan Global is an APEDA, IEC, CDB and FSSAI certified Indian agricultural exporter
            supplying fresh produce, premium basmati rice, spices, pulses and agro commodities to
            25+ countries worldwide with disciplined farm sourcing, phytosanitary inspection, and
            scheduled ocean freight coordination.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
            <a
              href="#products"
              aria-label="Explore Agricultural Export Products and HS Codes"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-[#0070e0] px-6 sm:px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105"
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/contact"
              aria-label="Submit an Indian Agricultural Export Inquiry"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-[#ff6a00] px-6 sm:px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105"
            >
              Export Inquiry <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, ease: EASE }}
                className="rounded-2xl border border-white/15 bg-white/[0.07] px-3.5 sm:px-4 py-3.5 sm:py-4 backdrop-blur-md"
              >
                <s.icon className="mb-2 h-5 w-5 text-brand-orange" />
                <div className="font-display text-2xl font-bold text-white">{s.n}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/70">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="relative hidden lg:block"
        >
          <div className="rounded-3xl border border-white/15 bg-white/[0.08] p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                  Live Export Desk
                </div>
                <div className="mt-1 font-display text-2xl font-bold">India to World</div>
              </div>
              <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                Active lanes
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              <img
                src={worldMap}
                alt="Indian agricultural export shipping lanes to Middle East, Europe, and Asia"
                width={600}
                height={300}
                loading="lazy"
                className="h-56 w-full object-cover opacity-80"
              />
            </div>

            <div className="mt-5 grid gap-3">
              {tradeCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.12, ease: EASE }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] p-3"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-orange/20 text-brand-orange">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                      {card.label}
                    </div>
                    <div className="truncate text-sm font-semibold text-white">{card.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
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
          <div className="text-xs font-bold uppercase tracking-[0.28em] text-brand-orange">
            About Sheshaan Global
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Delivering Value From
            <br />
            Our Farms to <span className="text-brand-orange">The World</span>
          </h2>
          <div
            id="about-summary"
            className="mt-6 space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base"
          >
            <p>
              Founded in 2022 and operating from Maharashtra, India,{" "}
              <strong>Sheshaan Global</strong> is an accredited{" "}
              <strong>Indian agricultural exporter</strong> providing institutional B2B buyers with
              premium farm produce, basmati and non-basmati rice, spices, pulses, and oilseeds
              across 25+ countries worldwide.
            </p>
            <p>
              By bridging regional Indian harvesting belts—including Nashik (onions), Guntur
              (chillies), Pollachi (coconuts), and Punjab (basmati)—directly to international trade
              corridors, we guarantee competitive FOB and CIF terms, authenticated phytosanitary
              inspection, and reliable cold chain management through JNPT and Mundra ports.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {["IEC Certified", "GST Registered", "APEDA Certified", "FSSAI Certified", "CDB Registered"].map((c) => (
              <div
                key={c}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm"
              >
                <div className="font-display text-sm font-bold text-brand-blue">
                  {c.split(" ")[0]}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">
                  {c.split(" ").slice(1).join(" ")}
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/about"
            aria-label="Learn more about Sheshaan Global agricultural export operations"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-[#003c85] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            Learn About Our Export Operations <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="overflow-hidden rounded-3xl shadow-2xl"
          >
            <img
              src={farmExport}
              alt="Direct Indian farm sourcing and quality inspection for agricultural exports"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-[440px] w-full object-cover"
            />
          </motion.div>
          <div className="mt-4 flex flex-col gap-2.5 sm:grid sm:grid-cols-2 lg:absolute lg:-right-4 lg:top-6 lg:mt-0 lg:flex lg:flex-col lg:gap-3">
            {badges.map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: EASE }}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-md lg:shadow-xl"
              >
                <div
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                  style={{ background: `${BLUE}15`, color: BLUE }}
                >
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
  const scroll = (dir: number) =>
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  return (
    <section id="products" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center sm:text-left mx-auto sm:mx-0"
          >
            <div
              className="text-xs font-bold uppercase tracking-[0.28em]"
              style={{ color: ORANGE }}
            >
              Our Products
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-5xl">
              Premium Quality <span style={{ color: ORANGE }}>Agricultural Products</span>
            </h2>
            <div
              className="mx-auto mt-3 h-1 w-24 rounded-full sm:mx-0"
              style={{ background: ORANGE }}
            />
          </motion.div>
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              to="/products"
              className="mr-2 inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-semibold transition hover:border-[#0057B8]"
              style={{ color: BLUE }}
            >
              All products & HS codes
            </Link>
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#0057B8] hover:text-[#0057B8]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#0057B8] hover:text-[#0057B8]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden"
        >
          {PRODUCTS.map((p, i) => {
            const specSummary =
              p.slug === "fresh-onions"
                ? "HS 07031010 • 45–65mm • 25kg Mesh"
                : p.slug === "green-chillies"
                  ? "HS 07096010 • G4/Teja 7–11cm • Cartons"
                  : p.slug === "premium-rice"
                    ? "HS 10063020 • 1121 Sella 8.35mm+ • BOPP"
                    : p.slug === "coconut-brown-husked"
                      ? "HS 08011910 • 550g–650g+ • CDB Certified"
                      : p.slug === "fresh-vegetables"
                        ? "HS 07099990 • Cold-Chain Graded • Cartons"
                        : p.slug === "fresh-fruits"
                          ? "HS 08045020 • Pre-Cooled Lots • 40ft Reefer"
                          : p.slug === "spices-masalas"
                            ? "HS 09103030 • Steam-Sterilized ASTA • Bags"
                            : p.slug === "pulses-lentils"
                              ? "HS 07132000 • Sortex 99.5% Chickpeas/Dals"
                              : "HS 08013210 • W240/W320 Vacuum Flushed";
            const shortName = p.name.replace(/\(.*\)/, "").trim();

            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
                className="w-[230px] flex-shrink-0 snap-start sm:w-[250px]"
              >
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={p.img}
                      alt={`${p.name} Exporter in India — Bulk Supply`}
                      width={480}
                      height={480}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="px-4 py-3.5">
                    <div className="font-display text-sm font-semibold text-slate-900">
                      {p.name}
                    </div>
                    <p className="mt-1 text-[11px] font-medium text-slate-500 line-clamp-1">
                      {specSummary}
                    </p>
                    <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-100">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-blue group-hover:text-brand-orange transition-colors">
                        View {shortName} Specs
                      </span>
                      <div
                        className="grid h-6 w-6 place-items-center rounded-full transition-colors group-hover:bg-[#0057B8] group-hover:text-white"
                        style={{ background: `${BLUE}12`, color: BLUE }}
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold shadow-sm transition hover:border-[#0057B8]"
            style={{ color: BLUE }}
          >
            All 103 products & HS codes <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust dashboard ---------- */
function TrustDashboard() {
  const proof = [
    {
      icon: Globe2,
      value: "25+",
      label: "active export markets",
      detail: "Middle East, Europe, UK, USA, Asia and Africa",
    },
    {
      icon: Package,
      value: "103+",
      label: "catalogue lines",
      detail: "Fresh produce, spices, rice, pulses, nuts and commodities",
    },
    {
      icon: ShieldCheck,
      value: "IEC/APEDA",
      label: "trade compliance",
      detail: "GST, IEC, APEDA, FSSAI and product-specific documentation",
    },
    {
      icon: Ship,
      value: "FCL/LCL",
      label: "shipment support",
      detail: "FOB, CIF, CFR and DDP coordination across key lanes",
    },
  ];
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div
                className="text-xs font-bold uppercase tracking-[0.28em]"
                style={{ color: ORANGE }}
              >
                Trust Dashboard
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                Export readiness buyers can verify
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Clear registrations, category depth, shipment planning and documentation support
                make the buying process easier from the first RFQ.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {proof.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, ease: EASE }}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <p.icon className="h-5 w-5" style={{ color: BLUE }} />
                  <div className="mt-3 font-display text-2xl font-bold text-slate-900">
                    {p.value}
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: ORANGE }}
                  >
                    {p.label}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{p.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Export operations ---------- */
function TradeJourney() {
  const steps = [
    {
      icon: Sprout,
      title: "Origin Sourcing",
      body: "Direct farm and processor network across key Indian growing belts.",
    },
    {
      icon: Factory,
      title: "Processing",
      body: "Cleaning, grading, sortex, pre-cooling or steam sterilization as required.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Control",
      body: "Moisture, size, residue and packaging checks before dispatch.",
    },
    {
      icon: FileCheck2,
      title: "Documentation",
      body: "Invoice, packing list, COO, phytosanitary and fumigation support.",
    },
    {
      icon: Warehouse,
      title: "Packing",
      body: "Bulk, retail-ready and private-label packs with buyer specifications.",
    },
    {
      icon: Anchor,
      title: "Freight Handover",
      body: "FOB, CIF, CFR and DDP coordination across sea, air and reefer lanes.",
    },
  ];
  const proof = [
    {
      icon: BarChart3,
      label: "Quotation clarity",
      text: "FOB/CIF pricing with packing, lead time and route visibility.",
    },
    {
      icon: Layers3,
      label: "Category depth",
      text: "Fresh produce, rice, pulses, spices, dry fruits and commodities.",
    },
    {
      icon: HeartHandshake,
      label: "Buyer support",
      text: "Responsive coordination for trials, repeat orders and private-label needs.",
    },
  ];

  return (
    <section
      id="process"
      className="relative overflow-hidden border-y border-slate-200 bg-slate-50 py-24 text-slate-900"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-3xl"
        >
          <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>
            Export Operating System
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            A disciplined shipment flow from inquiry to port handover
          </h2>
          <p className="mt-4 text-slate-600">
            International buyers need more than product photos. They need a supplier that
            understands compliance, packing, documents and logistics from the first quotation.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: EASE }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0057B8]/35 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div
                  className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg,${BLUE},${ORANGE})` }}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {proof.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 + i * 0.08, ease: EASE }}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <item.icon className="mt-1 h-5 w-5 shrink-0 text-brand-orange" />
              <div>
                <div className="font-display text-sm font-bold text-slate-900">{item.label}</div>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Comprehensive Agricultural Export Commodity Directory ---------- */
function AgriCommodityDirectory() {
  const categories = [
    {
      title: "Fresh Onions & Vegetables Exporter",
      hs: "HS 0703 / 0709 / 0701",
      origins: "Nashik, Pune, Sangli (Maharashtra)",
      description:
        "As an experienced Indian agricultural exporter, Sheshaan Global supplies export-grade Nashik Red Onions (sizes 45mm+, 50mm+, 55mm+ in red mesh bags), Fresh G4 and Teja Green Chillies (pre-cooled, air & sea freight), Cavendish Bananas, and seasonal Indian vegetables compliant with GCC and EU maximum residue limits (MRL).",
      highlights: [
        "Controlled Reefer +0.5°C to +4°C",
        "Sortex Graded",
        "APEDA Packhouse Inspected",
      ],
      link: "/products/fresh-onions",
      linkText: "Explore Indian Onion Export Specifications →",
    },
    {
      title: "Indian Basmati & Non-Basmati Rice",
      hs: "HS 1006.30",
      origins: "Haryana, Punjab, Telangana, Chhattisgarh",
      description:
        "Direct mill supply of Authentic 1121 Sella Basmati Rice, 1509 Golden Sella, Traditional Basmati, and bulk Non-Basmati varieties including IR64 Parboiled, Sona Masoori, PR11, and Swarna. Custom packing in 5kg, 10kg, 20kg, 25kg, and 50kg BOPP, PP, and non-woven master bags for private labels.",
      highlights: ["Average Grain Length up to 8.4mm", "Moisture < 12.5%", "Silky Sortex Cleaned"],
      link: "/products/rice",
      linkText: "Explore Indian Rice Export Varieties & Packing →",
    },
    {
      title: "Pure Indian Spices & Salem Turmeric",
      hs: "HS 0904 / 0909 / 0910",
      origins: "Salem (Tamil Nadu), Guntur (Andhra), Unjha (Gujarat)",
      description:
        "High-curcumin Salem Turmeric fingers and powder (curcumin 3.5%–5%), machine-cleaned Cumin seeds (Singapore 99% / 99.5% purity), Stemless Guntur Dried Red Chillies (heat value 25,000–45,000 SHU), Malabar Black Pepper (GL 500–550 g/l), and Coriander seeds packed for international spice grinders.",
      highlights: ["Purity 99.5%+", "Steam Sterilized", "Aflatoxin & Pesticide Tested"],
      link: "/products/spices",
      linkText: "Explore Indian Spices & Turmeric Export Data →",
    },
    {
      title: "Pollachi Brown Coconuts & Agro Commodities",
      hs: "HS 0801.19 / 0801.32",
      origins: "Pollachi (Tamil Nadu), Mysore (Karnataka)",
      description:
        "Direct plantation sourcing of mature semi-husked Brown Coconuts (550g–650g / 650g+ in 25-nut PP bags), Desiccated Coconut Powder, Makhana (Fox Nuts), and export agro products. Supported by CDB registration and containerized sea freight across the Middle East and Europe.",
      highlights: ["CDB Certified", "Transit Shelf Life 45+ Days", "20FT / 40FT FCL Shipping"],
      link: "/products/coconut-exporter-india",
      linkText: "Explore Coconut & Commodity Export Guidelines →",
    },
    {
      title: "Sortex Pulses, Chickpeas & Dry Fruits",
      hs: "HS 0713 / 0801.32 / 0806",
      origins: "Madhya Pradesh, Maharashtra, Gujarat, Rajasthan",
      description:
        "Sortex-cleaned Kabuli Chickpeas (42–44, 44–46 count / 9mm–12mm), Desi Chickpeas, Toor Dal (split pigeon peas), Red Lentils (Masoor), and export-grade cashew kernels (W240/W320) & raisins. Rigorous 99.5% purity grading, moisture controlled (<12%), packed in 25kg/50kg PP bags and vacuum pouches for global canning and distribution.",
      highlights: [
        "Sortex Cleaned 99.5% Purity",
        "Moisture Controlled <12%",
        "20ft FCL (24 MT Heavy)",
      ],
      link: "/products/pulses-lentils-exporter",
      linkText: "Explore Pulses, Chickpeas & Cashew Export Specs →",
    },
  ];

  const tradePorts = [
    {
      port: "Nhava Sheva (JNPT) - INNSA",
      lane: "Primary gateway for West & South India produce",
      details:
        "Direct weekly vessel services to Jebel Ali (3–4 days), Dammam (5–6 days), Jeddah (7–9 days), and Rotterdam (18–22 days).",
    },
    {
      port: "Mundra Port - INMUN",
      lane: "Strategic gateway for North & Western agro belts",
      details:
        "High-capacity reefer plug points and rapid customs clearance for rice, cumin, pulses, and onion shipments to worldwide ports.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.28em] text-brand-orange">
            Comprehensive Export Capabilities
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Indian Agricultural Exporter Commodities & Port Logistics
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Sheshaan Global operates dedicated agricultural procurement desks across key Indian
            harvest belts. Every container is processed through standardized quality gates,
            temperature-mapped cold logistics, and compliant export documentation for institutional
            buyers worldwide.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {categories.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h3 className="font-display text-lg font-bold text-slate-900">{c.title}</h3>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">
                  {c.hs}
                </span>
              </div>
              <div className="mt-3 text-xs font-semibold text-brand-orange">
                Origin Belts: {c.origins}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  to={c.link}
                  aria-label={c.linkText}
                  className="text-xs font-bold text-brand-blue hover:text-brand-orange transition-colors"
                >
                  {c.linkText}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-brand-navy p-8 text-white">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">
                Ocean Freight & Port Operations
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold">
                Jawaharlal Nehru Port (JNPT) & Mundra Port Loading
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Consignments are loaded at JNPT (Nhava Sheva, INNSA) and Mundra (INMUN) ports on
                scheduled weekly sailings. Perishables travel in advanced Micro-Micro reefer
                containers maintaining continuous temperature and humidity logs, ensuring optimal
                farm freshness upon arrival at Jebel Ali, Dammam, Rotterdam, or Port Klang.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/export-process"
                  aria-label="View complete 6-stage Indian agricultural export process"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  View 6-Stage Export Process →
                </Link>
                <Link
                  to="/contact"
                  aria-label="Request FOB or CIF shipping rates from JNPT and Mundra"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-orange/90 transition-colors"
                >
                  Request FOB / CIF Freight Quote →
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-1">
              {tradePorts.map((item) => (
                <div
                  key={item.port}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <h4 className="text-sm font-bold text-amber-300">{item.port}</h4>
                  <div className="mt-1 text-xs font-semibold text-white/90">{item.lane}</div>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
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
    <section
      id="markets"
      className="relative overflow-hidden py-24"
      style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #062354 100%)` }}
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[1fr,1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-white lg:sticky lg:top-28"
        >
          <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>
            Global Reach
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Exporting to
            <br />
            <span style={{ color: ORANGE }}>
              <Counter to={25} suffix="+" /> Countries
            </span>
            <br />
            Worldwide
          </h2>
          <p className="mt-6 max-w-md text-white/75">
            We are proud to export our premium quality products to a wide range of countries across
            the globe. Hover a country to spot it on the map.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            style={{ background: `linear-gradient(135deg,${BLUE},#0070e0)` }}
          >
            Start Export Inquiry <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div>
          {/* Map */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img
              src={worldMap}
              alt="Export destinations map"
              width={1400}
              height={900}
              loading="lazy"
              className="w-full"
            />
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
          <div
            ref={listRef}
            className="mt-6 grid grid-cols-1 gap-x-6 gap-y-1 rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:p-6 backdrop-blur-md sm:grid-cols-2"
          >
            {COUNTRIES.map((c) => {
              const isActive = active === c.n;
              const regionMatch = REGIONS.find(
                (r) =>
                  r.name.toLowerCase() === c.n.toLowerCase() ||
                  (c.n === "United Kingdom" && r.slug === "uk") ||
                  (c.n === "United States" && r.slug === "usa"),
              );
              const targetHref = regionMatch
                ? (regionMatch.slug === "uae"
                    ? "/markets/export-to-uae"
                    : regionMatch.slug === "saudi-arabia"
                      ? "/markets/export-to-saudi-arabia"
                      : regionMatch.slug === "uk" || regionMatch.slug === "eu"
                        ? "/markets/export-to-uk-europe"
                        : regionMatch.slug === "singapore" || regionMatch.slug === "malaysia"
                          ? "/markets/export-to-southeast-asia"
                          : `/export-to/${regionMatch.slug}`)
                : "#regions";

              return (
                <a
                  key={c.n}
                  href={targetHref}
                  data-country={c.n}
                  onMouseEnter={() => setActive(c.n)}
                  onFocus={() => setActive(c.n)}
                  className={`group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition-all ${
                    isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full transition-all ${isActive ? "scale-150" : ""}`}
                      style={{ background: isActive ? ORANGE : "rgba(255,255,255,0.35)" }}
                    />
                    <span className="text-lg">{c.f}</span>
                    <span className={isActive ? "font-semibold" : ""}>{c.n}</span>
                  </div>
                  {regionMatch && (
                    <span className="text-[10px] uppercase font-semibold text-white/40 group-hover:text-brand-orange transition-colors">
                      Market Guide →
                    </span>
                  )}
                </a>
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
            <div
              className="text-xs font-bold uppercase tracking-[0.28em]"
              style={{ color: ORANGE }}
            >
              Dedicated Export Markets
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Region-specific export pages
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Ports, incoterms, transit windows and localised documentation for each of our key
              markets.
            </p>
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
                    <div className="font-display text-lg font-bold text-slate-900">
                      Export to {r.short}
                    </div>
                    <div className="text-xs text-slate-500">{r.name}</div>
                  </div>
                </div>
                <p className="mt-4 line-clamp-3 text-sm text-slate-600">{r.intro}</p>
                <div
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: BLUE }}
                >
                  Explore {r.short} exports{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
      if (fCategory !== "All" && !c.categories.includes("All") && !c.categories.includes(fCategory))
        return false;
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

  const active = openId ? (CERTIFICATES.find((c) => c.id === openId) ?? null) : null;

  useEffect(() => {
    if (openId) setImgLoading(true);
  }, [openId]);

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

  const resetFilters = () => {
    setQ("");
    setFType("All");
    setFCategory("All");
    setFCountry("All");
  };
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
          <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>
            Our Certifications
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
            Certified. Compliant. <span style={{ color: ORANGE }}>Globally Trusted.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600">
            Search or filter by type, product category or country to find the compliance document
            you need.
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
            <select
              aria-label="Filter by type"
              value={fType}
              onChange={(e) => setFType(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#0057B8]"
            >
              <option value="All">All types</option>
              {CERT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              aria-label="Filter by product category"
              value={fCategory}
              onChange={(e) => setFCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#0057B8]"
            >
              <option value="All">All categories</option>
              {allCategories
                .filter((c) => c !== "All")
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
            <select
              aria-label="Filter by country"
              value={fCountry}
              onChange={(e) => setFCountry(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#0057B8]"
            >
              {allCountries.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All countries" : c}
                </option>
              ))}
            </select>
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:border-[#0057B8] hover:text-[#0057B8]"
              >
                Reset
              </button>
            )}
          </div>
        </motion.div>

        <div aria-live="polite" className="mt-4 text-center text-xs text-slate-500">
          {filtered.length} of {CERTIFICATES.length} certificates
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
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
                    <img
                      src={c.img}
                      alt={`${c.name} certificate preview`}
                      loading="lazy"
                      className="h-48 w-full object-cover"
                    />
                  </button>
                  <div className="mx-auto mt-2 h-3 w-[80%] rounded-b-full bg-gradient-to-b from-slate-200 to-transparent" />
                  <div className="mx-auto -mt-1 h-5 w-[85%] rounded-full bg-white shadow-md" />
                </div>
                <div className="mt-4 font-display text-xl font-bold text-slate-900">{c.name}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">{c.label}</div>
                <div className="mt-1 text-[10px] font-semibold text-brand-blue">{c.type}</div>
                <p className="mt-2 text-center text-xs text-slate-600 line-clamp-2 px-3">
                  {c.fullName} • Issued by {c.issuer}.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setOpenId(c.id)}
                    aria-label={`View ${c.name} certificate`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 hover:border-[#0057B8] hover:text-[#0057B8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8]"
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
                    {downloading === c.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                    ) : (
                      <Download className="h-3.5 w-3.5" aria-hidden />
                    )}
                    {downloading === c.id ? "Saving…" : "Download"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <div className="font-display text-lg font-semibold text-slate-800">
              No certificates match
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Try clearing filters or searching a different keyword.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white"
            >
              Reset filters
            </button>
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
                    {downloading === active.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : (
                      <Download className="h-4 w-4" aria-hidden />
                    )}
                    {downloading === active.id ? "Preparing…" : "Download"}
                  </button>
                </div>
              </DialogHeader>
              <div className="relative max-h-[70vh] overflow-auto bg-slate-50 p-4">
                {imgLoading && (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-slate-50/80 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading certificate…
                    </div>
                  </div>
                )}
                <img
                  src={active.img}
                  alt={`${active.name} certificate — full view`}
                  onLoad={() => setImgLoading(false)}
                  onError={() => setImgLoading(false)}
                  className="mx-auto max-h-[65vh] w-auto rounded-lg shadow-lg"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
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
    <section
      id="why"
      className="py-4"
      style={{ background: `linear-gradient(90deg, ${BLUE}, #003c85)` }}
    >
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

function BuyerProof() {
  const segments = [
    "Importers",
    "Wholesalers",
    "Retail Chains",
    "HORECA",
    "Spice Distributors",
    "Fresh Produce Traders",
  ];
  const notes = [
    {
      title: "Fast first response",
      body: "RFQs are routed to WhatsApp or email with product, quantity and destination context.",
    },
    {
      title: "Commercial clarity",
      body: "Quotes can include packing, Incoterm, loading port, documents and expected lead time.",
    },
    {
      title: "Repeat-order friendly",
      body: "Product pages expose consistent varieties, standards and market links for easy reordering.",
    },
  ];
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.28em] text-brand-orange">
              Buyer Confidence
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Built for serious import buyers
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Sheshaan Global partners directly with international institutional buyers, wholesale
              importers, supermarket distributors, and food processing companies across the GCC,
              Europe, Southeast Asia, and Africa.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {segments.map((s) => (
                <div
                  key={s}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center text-sm font-bold text-slate-700 shadow-sm"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {notes.map((n, i) => (
              <motion.div
                key={n.title}
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: EASE }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl text-white"
                    style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
                  >
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900">{n.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{n.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadCapturePopup() {
  // Automatic timer disabled to prevent intrusive interstitial penalty; opened only via user action
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(PRODUCTS[0]?.name ?? "Fresh Onions");
  const [country, setCountry] = useState("");
  const close = () => {
    localStorage.setItem("sg_lead_popup_closed_v1", "1");
    setOpen(false);
  };
  useEffect(() => {
    const handleOpenRfq = () => setOpen(true);
    window.addEventListener("sheshaan:open-rfq", handleOpenRfq);
    return () => window.removeEventListener("sheshaan:open-rfq", handleOpenRfq);
  }, []);
  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  if (!open || typeof document === "undefined") return null;
  const href = buildWhatsAppUrl({
    category: product,
    country,
    message: "Please share the latest export price list and packing options.",
  });
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={close}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
      >
        <div
          className="relative p-6 text-white"
          style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
        >
          <button
            onClick={close}
            aria-label="Close quote popup"
            className="absolute right-4 top-4 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: ORANGE }}>
            Price List Request
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold">Get the latest export quote</h2>
          <p className="mt-2 text-sm text-white/70">
            Tell us the product and destination. We will prepare product, packing and pricing
            details.
          </p>
        </div>
        <div className="p-6">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Product
          </label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0057B8]"
          >
            {PRODUCTS.map((p) => (
              <option key={p.slug}>{p.name}</option>
            ))}
          </select>
          <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Destination country
          </label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. UAE, Saudi Arabia, UK"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0057B8]"
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ background: "#25D366" }}
            >
              <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
            </a>
            <button
              onClick={close}
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
            >
              Not now
            </button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 shadow-[0_-10px_30px_rgba(4,21,45,0.12)] backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Sheshaan Global on WhatsApp"
          className="inline-flex items-center justify-center gap-1 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white shadow-sm"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <Link
          to="/contact"
          aria-label="Request an Indian agricultural export quote"
          className="inline-flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-brand-blue to-[#003c85] px-3 py-2 text-xs font-bold text-white shadow-sm"
        >
          <Mail className="h-4 w-4" /> Request Quote
        </Link>
        <a
          href={BROCHURE_URL}
          download
          aria-label="Download Sheshaan Global agricultural export catalogue PDF"
          className="inline-flex items-center justify-center gap-1 rounded-full border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          <Download className="h-4 w-4" /> Catalogue
        </a>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="pt-14 pb-24 md:pb-14 text-white bg-brand-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Sheshaan Global - Exporting Goodness Worldwide Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain sg-float drop-shadow-[0_4px_10px_rgba(0,87,184,0.25)]"
            />
            <div>
              <div className="font-display text-lg font-bold text-white">SHESHAAN</div>
              <div className="text-[9px] font-semibold tracking-[0.2em] text-brand-orange">
                EXPORTING GOODNESS WORLDWIDE
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Leading Indian agricultural exporter supplying farm produce, basmati rice, spices,
            coconuts and agro commodities to 25+ countries worldwide.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {SOCIAL_AND_TRADE_PROFILES.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.label}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-semibold text-white/85 transition hover:border-brand-orange hover:text-white"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="font-display text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Explore
          </div>
          <div className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                aria-label={`Navigate to ${l.label}`}
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="font-display text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Agricultural Products
          </div>
          <div className="mt-4 space-y-2">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                aria-label={`${p.name} Indian export specifications`}
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="font-display text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Head Office & Trade Desk
          </div>
          <address className="not-italic mt-4 space-y-3 text-sm text-white/70">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              <span>
                <strong className="block font-semibold text-white">Sheshaan Global</strong>
                Agricultural Export Trade Desk, Camp,
                <br />
                Pune, Maharashtra 411001, India
              </span>
            </div>
            <a
              href={`tel:${PHONE_RAW}`}
              aria-label={`Call Sheshaan Global at ${PHONE}`}
              className="flex items-start gap-2 hover:text-white transition-colors"
            >
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              <span>{PHONE}</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email Sheshaan Global Trade Desk"
              className="flex items-start gap-2 hover:text-white transition-colors"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              <span className="select-all">info&#64;sheshaanglobal&#46;com</span>
            </a>
          </address>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <div>
          © {new Date().getFullYear()} Sheshaan Global. IEC & APEDA Certified Indian Exporter. All
          rights reserved.
        </div>
        <div className="flex gap-4">
          <Link to="/company-policies" className="hover:text-white transition-colors">
            Company Policies & Terms
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Export Inquiry Desk
          </Link>
        </div>
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
    {
      label: "WhatsApp",
      sub: "Chat instantly",
      icon: MessageCircle,
      href: WHATSAPP_URL,
      bg: "#25D366",
      external: true,
    },
    { label: "Email Us", sub: EMAIL, icon: Mail, href: MAILTO_URL, bg: BLUE },
    {
      label: "Download Brochure",
      sub: "PDF catalogue",
      icon: FileText,
      href: BROCHURE_URL,
      bg: ORANGE,
      download: "Sheshaan-Global-Catalogue.pdf",
    },
  ] as const;

  // Close on ESC, click-outside, and manage focus.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
        return;
      }
      if (e.key === "Tab") {
        // Simple focus trap between menu items + trigger
        const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
        if (!items || items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = Array.from(
          menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
        );
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next =
          e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
        items[next]?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) {
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
    <div className="fixed bottom-20 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 md:bottom-6">
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
            className="flex w-64 max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl"
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
                  {...("external" in a && a.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  {...(isDownload ? { download: a.download } : {})}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8]"
                >
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl text-white shadow"
                    style={{ background: a.bg }}
                  >
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
        className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8A00]/40 sm:h-16 sm:w-16"
        style={{ background: `linear-gradient(135deg,${BLUE},${ORANGE})` }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="m"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-6 w-6" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span aria-hidden className="absolute -top-1 -right-1 flex h-3 w-3">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: ORANGE }}
            />
            <span
              className="relative inline-flex h-3 w-3 rounded-full"
              style={{ background: ORANGE }}
            />
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
          <div className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: ORANGE }}>
            FAQ
          </div>
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
                  <ChevronRight
                    className={`h-5 w-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-90 text-brand-orange" : "text-slate-400"}`}
                    aria-hidden
                  />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{f.a}</div>
                </div>
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
      <main id="main">
        <Hero />
        <About />
        <TrustDashboard />
        <Products />
        <TradeJourney />
        <AgriCommodityDirectory />
        <Markets />
        <RegionsStrip />
        <Certifications />
        <WhyUs />
        <BuyerProof />
        <FAQ />
      </main>
      <Footer />
      <MessageFab />
      <LeadCapturePopup />
      <MobileStickyCTA />
    </div>
  );
}
