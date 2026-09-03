import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Mail, MessageCircle, Package, Send, Ship } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  ALL_PRODUCTS, BLUE, EMAIL, NAVY, ORANGE, PHONE, REGIONS, SITE_URL,
  buildWhatsAppUrl,
} from "@/lib/site";

const TITLE = "Request Export Quote | Sheshaan Global";
const DESC = "Request a fast FOB or CIF export quote for onions, green chillies, rice, spices, pulses, fruits and vegetables from India.";

export const Route = createFileRoute("/request-quote")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "request export quote India, agricultural product quote, FOB quote India, CIF quote, Sheshaan Global inquiry" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/request-quote` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/request-quote` }],
  }),
  component: RequestQuote,
});

function RequestQuote() {
  const [form, setForm] = useState({
    product: "Fresh Onions",
    quantity: "",
    country: "",
    port: "",
    packing: "",
    incoterm: "CIF",
    name: "",
    company: "",
    phone: "",
    message: "",
  });

  const products = useMemo(() => ALL_PRODUCTS.slice(0, 48), []);
  const countries = useMemo(() => REGIONS.map((r) => r.short), []);

  const detailMessage = [
    `Product: ${form.product}`,
    form.quantity && `Quantity: ${form.quantity}`,
    form.country && `Destination country/region: ${form.country}`,
    form.port && `Destination port: ${form.port}`,
    form.packing && `Packing required: ${form.packing}`,
    `Preferred pricing: ${form.incoterm}`,
    form.name && `Buyer name: ${form.name}`,
    form.company && `Company: ${form.company}`,
    form.phone && `Contact number: ${form.phone}`,
    form.message && `Notes: ${form.message}`,
  ].filter(Boolean).join("\n");

  const waUrl = buildWhatsAppUrl({
    category: form.product,
    name: form.name,
    company: form.company,
    country: form.country,
    message: `Please share an export quote.\n\n${detailMessage}`,
  });
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`Quote request - ${form.product}`)}&body=${encodeURIComponent(`Hello Sheshaan Global,\n\nPlease share an export quote.\n\n${detailMessage}`)}`;

  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Sheshaan Global" className="h-10 w-10 object-contain" width={40} height={40} />
            <div className="leading-tight">
              <div className="font-display text-base font-bold" style={{ color: BLUE }}>SHESHAAN</div>
              <div className="text-[9px] font-semibold tracking-[0.18em]" style={{ color: ORANGE }}>EXPORTING GOODNESS</div>
            </div>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0057B8]">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden py-12 sm:py-16" style={{ background: `linear-gradient(135deg,${NAVY},#06356d)` }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 text-white sm:px-6 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest">
              <Ship className="h-4 w-4" style={{ color: ORANGE }} /> Fast Export Quote
            </div>
            <h1 className="mt-5 font-display text-4xl font-black leading-tight sm:text-5xl">
              Request FOB / CIF pricing for your next shipment.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Send product, quantity, destination and packing details in one message. Our team can respond with availability, packing options and latest export pricing.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Product clarity", "Faster pricing", "Cleaner follow-up"].map((item) => (
                <div key={item} className="rounded-xl border border-white/15 bg-white/10 p-4 text-sm font-semibold backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <form className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Product">
                <select value={form.product} onChange={(e) => update("product", e.target.value)} className="input">
                  {products.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
                </select>
              </Field>
              <Field label="Quantity">
                <input value={form.quantity} onChange={(e) => update("quantity", e.target.value)} placeholder="Example: 1 x 40' FCL" className="input" />
              </Field>
              <Field label="Destination">
                <input value={form.country} onChange={(e) => update("country", e.target.value)} list="regions" placeholder="UAE, Saudi, UK..." className="input" />
                <datalist id="regions">{countries.map((c) => <option key={c} value={c} />)}</datalist>
              </Field>
              <Field label="Destination port">
                <input value={form.port} onChange={(e) => update("port", e.target.value)} placeholder="Jebel Ali, Felixstowe..." className="input" />
              </Field>
              <Field label="Packing">
                <input value={form.packing} onChange={(e) => update("packing", e.target.value)} placeholder="25 kg mesh bags, cartons..." className="input" />
              </Field>
              <Field label="Price basis">
                <select value={form.incoterm} onChange={(e) => update("incoterm", e.target.value)} className="input">
                  <option>CIF</option>
                  <option>FOB</option>
                  <option>CFR</option>
                  <option>DAP</option>
                </select>
              </Field>
              <Field label="Your name">
                <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Buyer name" className="input" />
              </Field>
              <Field label="Company">
                <input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company name" className="input" />
              </Field>
              <Field label="Contact number">
                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+ country code" className="input" />
              </Field>
              <Field label="Message">
                <textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any target price, grade, shipment date..." className="input min-h-24 resize-y sm:col-span-2" />
              </Field>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-lg" style={{ background: "#25D366" }}>
                <MessageCircle className="h-4 w-4" /> Send on WhatsApp
              </a>
              <a href={mailto} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-lg" style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}>
                <Send className="h-4 w-4" /> Send by Email
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Package className="h-4 w-4" style={{ color: ORANGE }} /> For urgent pricing, WhatsApp usually gets the fastest response: {PHONE}
            </div>
          </form>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          padding: 0.75rem 0.9rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: ${BLUE};
          background: #fff;
          box-shadow: 0 0 0 3px rgba(0, 87, 184, 0.12);
        }
      `}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      <span className="mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
