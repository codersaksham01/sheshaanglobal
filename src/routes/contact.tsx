import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Mail, Phone, MessageCircle, MapPin, Send,
  Briefcase, Globe2, Crown, CheckCircle2, Loader2,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { BLUE, ORANGE, NAVY, PHONE, PHONE_RAW, EMAIL, PRODUCTS, buildWhatsAppUrl } from "@/lib/site";

const SITE_URL = "https://global-roots-express.lovable.app";
const FORMSPREE = "https://formspree.io/f/xpqvnnav";

const TEAM = [
  {
    name: "General & Trade Inquiries",
    role: "First point of contact",
    email: EMAIL,
    phone: PHONE,
    blurb: "Quotations, product catalogues, samples, export documentation and shipment tracking. Fastest route for a new RFQ.",
    Icon: Send,
    featured: true,
  },
  {
    name: "Sana Zeba Bakshi",
    role: "Chief Executive Officer",
    email: "sanazeba@sheshaanglobal.com",
    blurb: "Strategic alliances, distributor agreements, large-volume annual contracts and corporate matters.",
    Icon: Crown,
  },
  {
    name: "Juned Barade",
    role: "Chief Operating Officer — Trade Exhibitions",
    email: "junedbarade@sheshaanglobal.com",
    blurb: "Operations, logistics and quality control. Represents Sheshaan Global at international trade fairs and expos.",
    Icon: Globe2,
  },
  {
    name: "Saksham Singh",
    role: "Business Development",
    email: "sakshamsingh@sheshaanglobal.com",
    blurb: "New buyer partnerships, product sourcing, indicative pricing and sample dispatch requests.",
    Icon: Briefcase,
  },
];

const COMPANY_FACTS = [
  { k: "Legal entity", v: "Sheshaan Global — Proprietor: Sana Zeba Siraj Bakshi" },
  { k: "Base of operations", v: "Maharashtra, India" },
  { k: "Loading ports", v: "JNPT (Nhava Sheva), Mundra, Chennai" },
  { k: "Markets served", v: "25+ countries — Middle East, Europe, UK, USA, Asia" },
  { k: "Business hours", v: "Mon – Sat, 9:30 AM – 7:00 PM IST (GMT+5:30)" },
  { k: "Response time", v: "Within 1 business day for all trade inquiries" },
];

const CREDENTIALS = [
  "GST registered exporter",
  "IEC (Importer-Exporter Code) holder",
  "APEDA registered",
  "Coconut Development Board registered",
  "Spices Board compliant documentation",
  "Phytosanitary & Certificate of Origin support",
];


const TITLE = "Contact Sheshaan Global — Export Sales, Trade Exhibitions & Leadership";
const DESC =
  "Get in touch with Sheshaan Global. Reach business development, trade exhibition and leadership contacts directly, or send an export inquiry for onions, green chillies, rice, coconut and spices.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: TITLE,
          url: `${SITE_URL}/contact`,
          mainEntity: {
            "@type": "Organization",
            name: "Sheshaan Global",
            url: SITE_URL,
            email: EMAIL,
            telephone: `+${PHONE_RAW}`,
            contactPoint: TEAM.map((t) => ({
              "@type": "ContactPoint",
              contactType: t.role,
              name: t.name,
              email: t.email,
              ...(t.phone ? { telephone: `+${PHONE_RAW}` } : {}),
              availableLanguage: ["English", "Hindi"],
            })),

          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

const ease = [0.16, 1, 0.3, 1] as const;

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [category, setCategory] = useState(PRODUCTS[0]?.name ?? "");
  const [form, setForm] = useState({ name: "", email: "", company: "", country: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Capture the form node before awaiting — React pools the event and
    // `e.currentTarget` is null by the time the request resolves.
    const formEl = e.currentTarget;
    const payload = new FormData(formEl);
    setStatus("sending");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus("sent");
      setForm({ name: "", email: "", company: "", country: "", message: "" });
      formEl.reset();
    } catch (err) {
      console.error("Contact form submission failed", err);
      setStatus("error");
    } finally {
      clearTimeout(timer);
    }
  }

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28" style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: ORANGE }} />
        <div className="mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="px-2">/</span>
            <span className="text-white/90">Contact</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <img src={logo} alt="Sheshaan Global logo" className="h-16 w-16 object-contain sg-float" />
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Let's Build Your <span style={{ color: ORANGE }}>Export Partnership</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              Speak directly with the right person at Sheshaan Global — business development, trade exhibitions or leadership.
              We reply to every serious inquiry within one business day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                <Mail className="h-4 w-4" /> {EMAIL}
              </a>
              <a href={`tel:+${PHONE_RAW}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team contacts */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-display text-3xl font-bold" style={{ color: NAVY }}>Who To Contact</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Direct lines to the people who handle your requirement.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((t, i) => (
            <motion.article
              key={t.email}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className={`group rounded-2xl border p-7 transition-all hover:-translate-y-1 ${
                t.featured
                  ? "border-transparent text-white shadow-[0_16px_44px_rgba(4,21,45,0.22)] md:col-span-2 lg:col-span-1"
                  : "border-slate-200 bg-white shadow-[0_6px_30px_rgba(4,21,45,0.06)] hover:shadow-[0_16px_44px_rgba(4,21,45,0.12)]"
              }`}
              style={t.featured ? { background: `linear-gradient(135deg,${NAVY},#062a55)` } : undefined}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                style={{ background: t.featured ? `linear-gradient(135deg,${ORANGE},#ff6a00)` : `linear-gradient(135deg,${BLUE},#003c85)` }}
              >
                <t.Icon className="h-5 w-5" />
              </div>
              <h3 className={`mt-5 font-display text-xl font-bold ${t.featured ? "text-white" : ""}`} style={t.featured ? undefined : { color: NAVY }}>{t.name}</h3>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: ORANGE }}>{t.role}</div>
              <p className={`mt-3 text-sm leading-relaxed ${t.featured ? "text-white/75" : "text-slate-600"}`}>{t.blurb}</p>
              <a
                href={`mailto:${t.email}`}
                className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${t.featured ? "text-white hover:text-[#FF8A00]" : ""}`}
                style={t.featured ? undefined : { color: BLUE }}
              >
                <Mail className="h-4 w-4" /> {t.email}
              </a>
              {t.phone && (
                <a href={`tel:+${PHONE_RAW}`} className="mt-2 flex items-center gap-2 text-sm font-semibold text-white hover:text-[#FF8A00]">
                  <Phone className="h-4 w-4" /> {t.phone}
                </a>
              )}
            </motion.article>
          ))}
        </div>

        {/* Company information */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
            <h3 className="font-display text-lg font-bold" style={{ color: NAVY }}>Company Information</h3>
            <dl className="mt-5 divide-y divide-slate-200">
              {COMPANY_FACTS.map((f) => (
                <div key={f.k} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                  <dt className="w-52 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500">{f.k}</dt>
                  <dd className="text-sm text-slate-700">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_6px_30px_rgba(4,21,45,0.06)]">
              <h3 className="font-display text-lg font-bold" style={{ color: NAVY }}>Compliance & Registrations</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {CREDENTIALS.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ORANGE }} /> {c}
                  </li>
                ))}
              </ul>
              <Link to="/" hash="certs" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: BLUE }}>
                View all certificates <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <h3 className="font-display text-lg font-bold" style={{ color: NAVY }}>Export Operations</h3>
              <p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ORANGE }} />
                India — shipping to 25+ countries across the Middle East, Europe, UK, USA and Asia. FOB, CFR and CIF terms available.
              </p>
              <Link to="/" hash="products" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: BLUE }}>
                Browse our products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* What to include */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_6px_30px_rgba(4,21,45,0.06)]">
          <h3 className="font-display text-lg font-bold" style={{ color: NAVY }}>What To Include In Your Inquiry</h3>
          <p className="mt-2 text-sm text-slate-600">Sharing these details up front lets us send an accurate quotation in the first reply.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Product & grade", d: "e.g. Nashik red onion, 55–65 mm" },
              { t: "Quantity & frequency", d: "Per shipment and monthly volume" },
              { t: "Destination", d: "Discharge port and Incoterm" },
              { t: "Packing", d: "Mesh bags, cartons, jute or private label" },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-bold" style={{ color: NAVY }}>{x.t}</div>
                <div className="mt-1 text-xs leading-relaxed text-slate-600">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Form */}
      <section className="border-t bg-slate-50 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold" style={{ color: NAVY }}>Send Us An Inquiry</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Share your requirement, target market and volume. Our team will respond with pricing, packing options and export documentation details.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {["Response within 1 business day", "Samples available on request", "Full export documentation support"].map((s) => (
                <li key={s} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" style={{ color: ORANGE }} /> {s}</li>
              ))}
            </ul>
          </div>

          <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_8px_36px_rgba(4,21,45,0.07)]">
            <input type="hidden" name="_subject" value="New export inquiry — Sheshaan Global website" />
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" value={form.name} onChange={set("name")} required />
              <Field label="Email" name="email" type="email" value={form.email} onChange={set("email")} required />
              <Field label="Company" name="company" value={form.company} onChange={set("company")} />
              <Field label="Country" name="country" value={form.country} onChange={set("country")} />
            </div>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-slate-600" htmlFor="category">Product interest</label>
            <select
              id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#0057B8]"
            >
              {PRODUCTS.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
              <option value="Other / Multiple">Other / Multiple</option>
            </select>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-slate-600" htmlFor="message">Message</label>
            <textarea
              id="message" name="message" rows={4} required maxLength={1500} value={form.message} onChange={set("message")}
              placeholder="Quantity, packing, destination port, timeline…"
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0057B8]"
            />

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit" disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-60"
                style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
              >
                {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Send Inquiry</>}
              </button>
              <a
                href={buildWhatsAppUrl({ category, ...form })}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                <MessageCircle className="h-4 w-4" /> Send on WhatsApp
              </a>
            </div>

            <div aria-live="polite" className="mt-4 text-sm">
              {status === "sent" && <p className="font-medium text-emerald-600">Thank you — your inquiry has been sent. We'll be in touch shortly.</p>}
              {status === "error" && <p className="font-medium text-red-600">Something went wrong. Please email {EMAIL} or use WhatsApp.</p>}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field(props: {
  label: string; name: string; type?: string; value: string; required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { label, name, type = "text", value, required, onChange } = props;
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wider text-slate-600">{label}</label>
      <input
        id={name} name={name} type={type} value={value} onChange={onChange} required={required} maxLength={120}
        className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0057B8]"
      />
    </div>
  );
}
