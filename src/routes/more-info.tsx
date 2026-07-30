import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Anchor, Plane, Wallet, PackageCheck, FileText,
  Tag, MessageCircle, Mail, ShieldCheck,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { BLUE, ORANGE, NAVY, EMAIL, buildWhatsAppUrl } from "@/lib/site";

const SITE_URL = "https://global-roots-express.lovable.app";
const TITLE = "Export Terms & Trade Info — Payment, Incoterms, Ports | Sheshaan Global";
const DESC =
  "Sheshaan Global export terms: 50–70% advance payment with balance against Bill of Lading, FOB/CIF/CFR/EXW/FCA/DDP Incoterms, shipping from Nhava Sheva, Mundra and Tuticorin, plus private label options.";

export const Route = createFileRoute("/more-info")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/more-info` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/more-info` }],
  }),
  component: MoreInfoPage,
});

const ease = [0.16, 1, 0.3, 1] as const;

const TERMS = [
  {
    Icon: Wallet,
    title: "Payment Terms",
    lines: [
      "50% to 70% advance payment on order confirmation.",
      "Balance payable against Bill of Lading (shipping documents).",
      "Terms are negotiable for repeat buyers and long-term contracts.",
    ],
  },
  {
    Icon: PackageCheck,
    title: "Minimum Order Quantity",
    lines: [
      "MOQ depends on the freight forwarding method chosen for the shipment.",
      "By air freight we can supply from as little as 1 ton.",
      "Ocean shipment is recommended for full-container (FCL) volumes.",
    ],
  },
  {
    Icon: Anchor,
    title: "Export Ports",
    lines: [
      "Nhava Sheva Port (JNPT), Maharashtra",
      "Mundra Port, Gujarat",
      "Tuticorin Port, Tamil Nadu",
      "Air freight available from all over India.",
    ],
  },
  {
    Icon: FileText,
    title: "Accepted Incoterms",
    lines: ["FOB", "CIF", "C&F (CFR)", "EXW", "FCA", "DDP"],
  },
  {
    Icon: Tag,
    title: "Private Label",
    lines: [
      "Private label and white-label packing available.",
      "Custom branding on mesh bags, cartons, jute and retail packs.",
      "Artwork support and buyer-specific labelling for retail chains.",
    ],
  },
  {
    Icon: Plane,
    title: "Logistics & Documentation",
    lines: [
      "Phytosanitary certificate, Certificate of Origin and fumigation support.",
      "Container stuffing photos and pre-shipment inspection reports shared.",
      "Shipment tracking updates until arrival at the discharge port.",
    ],
  },
];

function MoreInfoPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden pb-16 pt-28" style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: ORANGE }} />
        <div className="mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="px-2">/</span>
            <span className="text-white/90">More Info</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <img src={logo} alt="Sheshaan Global logo" className="h-16 w-16 object-contain sg-float" />
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Trade Terms & <span style={{ color: ORANGE }}>Export Information</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              Everything a buyer needs before placing the first order — payment structure, minimum order quantity, loading ports,
              accepted Incoterms and private label options.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TERMS.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease }}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_6px_30px_rgba(4,21,45,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(4,21,45,0.12)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}>
                <t.Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-xl font-bold" style={{ color: NAVY }}>{t.title}</h2>
              <ul className="mt-3 space-y-2">
                {t.lines.map((l) => (
                  <li key={l} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ORANGE }} />
                    {l}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Hidden page entry point */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mt-12 overflow-hidden rounded-2xl border border-transparent p-8 text-white shadow-[0_16px_44px_rgba(4,21,45,0.22)]"
          style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold">Company, Quality & Policies</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Read about our company, the quality control process behind every consignment, our sample policy
                and our privacy policy.
              </p>
            </div>
            <Link
              to="/company-policies"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
              style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}
            >
              Open full details <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
            <MessageCircle className="h-4 w-4" /> Discuss terms on WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
            <Mail className="h-4 w-4" /> {EMAIL}
          </a>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}>
            Send an inquiry <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
