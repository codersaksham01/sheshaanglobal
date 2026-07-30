import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, FlaskConical, Lock, PackageSearch } from "lucide-react";
import logo from "@/assets/logo.png";
import { BLUE, ORANGE, NAVY, EMAIL, PHONE } from "@/lib/site";

const SITE_URL = "https://global-roots-express.lovable.app";
const TITLE = "About, Quality Control, Sample & Privacy Policy | Sheshaan Global";
const DESC =
  "Detailed company profile, quality control process, sample policy and privacy policy of Sheshaan Global, an Indian agricultural exporter shipping to 25+ countries.";

export const Route = createFileRoute("/company-policies")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/company-policies` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/company-policies` }],
  }),
  component: CompanyPoliciesPage,
});

const ease = [0.16, 1, 0.3, 1] as const;

const SECTIONS = [
  {
    id: "about-us",
    Icon: Building2,
    title: "About Us",
    body: [
      "Sheshaan Global is an India-based agricultural export house supplying fresh produce, grains, pulses, spices and coconut products to buyers across the Middle East, Europe, the United Kingdom, the United States and Asia.",
      "Our current focus categories are onions and fresh green chillies, followed by basmati and non-basmati rice and coconut products. Alongside these, we handle a wide catalogue of more than 40 commodities with verified HS codes.",
      "We are a GST-registered exporter holding an Importer-Exporter Code (IEC), with APEDA and Coconut Development Board registrations, and we support Spices Board compliant documentation.",
      "We work directly with farmer networks and vetted packhouses in Maharashtra, Gujarat and Tamil Nadu, which lets us keep pricing competitive while retaining control over grading, packing and dispatch timelines.",
    ],
  },
  {
    id: "quality-control",
    Icon: FlaskConical,
    title: "Quality Control Process",
    list: [
      "Sourcing audit — produce is procured only from mapped farms and approved packhouses with traceable lot records.",
      "Incoming inspection — every lot is checked for size, colour, moisture, foreign matter and damage before it is accepted.",
      "Grading & sorting — manual and mechanical grading to the buyer's agreed specification (e.g. 55–65 mm onions).",
      "Laboratory testing — pesticide residue, moisture and microbiological testing through accredited third-party labs where required by the destination market.",
      "Packing verification — packing material, net weight and labelling are verified against the proforma invoice and buyer artwork.",
      "Pre-shipment inspection — container stuffing photographs, temperature/ventilation settings and seal numbers are shared with the buyer.",
      "Documentation check — phytosanitary certificate, Certificate of Origin, fumigation certificate and Bill of Lading are cross-verified before release.",
    ],
  },
  {
    id: "sample-policy",
    Icon: PackageSearch,
    title: "Sample Policy",
    body: [
      "Samples are available to serious buyers for most commodities in our catalogue. Sample sizes are typically 250 g to 1 kg depending on the product and destination regulations.",
      "Sample material is offered free of cost; courier and air freight charges are borne by the buyer and can be billed to the buyer's courier account.",
      "Perishable items such as fresh onions, green chillies, bananas and grapes may be represented by photographs, videos and inspection reports instead of physical samples where quarantine rules restrict small consignments.",
      "Sample dispatch normally happens within 3–5 working days of confirmation. Sample courier costs are adjustable against the first commercial order.",
      "For private label enquiries, mock-up packaging can be shared digitally before physical samples are produced.",
    ],
  },
  {
    id: "privacy-policy",
    Icon: Lock,
    title: "Privacy Policy",
    body: [
      "We collect only the information you voluntarily provide through our inquiry form, email or WhatsApp — typically your name, company, country, email address, phone number and requirement details.",
      "This information is used solely to respond to your inquiry, prepare quotations, arrange samples and manage shipments. We do not sell, rent or trade your data.",
      "Inquiry submissions made through the website form are processed by our form delivery provider and forwarded to our official email addresses. Analytics and translation services used on this site may set cookies in your browser.",
      "Data is retained only as long as necessary for our commercial relationship and for statutory export record-keeping obligations under Indian law.",
      `You may request access to, correction of, or deletion of your personal data at any time by writing to ${EMAIL}. We respond to such requests within a reasonable period.`,
      "By using this website or contacting us, you consent to this policy. Any updates will be published on this page.",
    ],
  },
];

function CompanyPoliciesPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden pb-14 pt-28" style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: ORANGE }} />
        <div className="mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="px-2">/</span>
            <Link to="/more-info" className="hover:text-white">More Info</Link>
            <span className="px-2">/</span>
            <span className="text-white/90">Company & Policies</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <img src={logo} alt="Sheshaan Global logo" className="h-16 w-16 object-contain sg-float" />
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Company, Quality & <span style={{ color: ORANGE }}>Policies</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              About Sheshaan Global, our quality control process, sample policy and privacy policy.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white/85 transition-colors hover:bg-white/10">
                  {s.title}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-12">
          {SECTIONS.map((s, i) => (
            <motion.article
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: Math.min(i, 3) * 0.05, ease }}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_6px_30px_rgba(4,21,45,0.06)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}>
                <s.Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold" style={{ color: NAVY }}>{s.title}</h2>
              {s.body && (
                <div className="mt-4 space-y-3">
                  {s.body.map((p) => (
                    <p key={p} className="text-sm leading-relaxed text-slate-600">{p}</p>
                  ))}
                </div>
              )}
              {s.list && (
                <ol className="mt-4 space-y-3">
                  {s.list.map((l, n) => (
                    <li key={l} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: ORANGE }}>{n + 1}</span>
                      {l}
                    </li>
                  ))}
                </ol>
              )}
            </motion.article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-7">
          <h2 className="font-display text-lg font-bold" style={{ color: NAVY }}>Questions about these policies?</h2>
          <p className="mt-2 text-sm text-slate-600">Write to {EMAIL} or call {PHONE} (Mon–Sat, 9:30 AM – 7:00 PM IST).</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/more-info" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
              <ArrowLeft className="h-4 w-4" /> Back to More Info
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}>
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
