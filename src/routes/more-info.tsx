import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  ArrowRight,
  Anchor,
  Plane,
  Wallet,
  PackageCheck,
  FileText,
  Tag,
  MessageCircle,
  Mail,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Phone,
  MapPin,
  Ship,
  Search,
  Users,
  Briefcase,
  Scale,
  Lock,
  Info,
  Calendar,
  Layers,
  FileCheck,
  Check,
  Copy,
  ExternalLink,
  UserCheck,
  Coins,
  BadgeAlert,
  Sparkles,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import logo from "@/assets/logo.png";
import {
  BLUE,
  ORANGE,
  NAVY,
  EMAIL,
  PHONE,
  PHONE_RAW,
  buildWhatsAppUrl,
  WHATSAPP_URL,
} from "@/lib/site";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE =
  "Terms & Conditions | Buyer Trade Policy | Official Communication Policy | Sheshaan Global";
const DESC =
  "Official Terms & Conditions, Buyer Trade Policy, and Communication Protocols for Sheshaan Global, Nagpur, India. Standard payment terms (50% advance + 50% at loading), quotation validity (2 calendar days), logistics coordination, and executive contacts.";

export const Route = createFileRoute("/more-info")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/more-info` },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/more-info` }],
  }),
  component: MoreInfoPage,
});

const ease = [0.16, 1, 0.3, 1] as const;

/* Executive contacts constants */
const SAKSHAM_NAME = "Mr. Saksham Singh";
const SAKSHAM_TITLE = "Business Executive & Business Execution / Partnership Programme";
const SAKSHAM_EMAIL = "sakshamsingh@sheshaanglobal.com";
const SAKSHAM_PHONE = "+91 89628 90425";
const SAKSHAM_PHONE_RAW = "918962890425";

const JUNED_NAME = "Mr. Juned Barade";
const JUNED_TITLE = "Chief Operating Officer (COO)";
const JUNED_EMAIL = "junedbarade@sheshaanglobal.com";

const SANA_NAME = "Mrs. Sana Zeba Bakshi";
const SANA_TITLE = "CEO & Founder — Sheshaan Global";
const SANA_EMAIL = "sanazeba@sheshaanglobal.com";

const OFFICE_ADDRESS =
  "Plot No. 1459, Opp. M.A.K. Azad Urdu School, Aasinagar, Nagpur – 440017, Maharashtra, India.";

/* Quick highlights for the top summary */
const TRADE_HIGHLIGHTS = [
  {
    Icon: Wallet,
    title: "Payment Structure",
    highlight: "50% Advance + 50% at Loading",
    lines: [
      "Initial & trial orders: 50% advance + 50% at loading.",
      "Balance against shipping bill / shipping docs if mutually agreed.",
      "Strict No-LC policy for initial or trial shipments.",
    ],
  },
  {
    Icon: Clock,
    title: "Quotation Turnaround",
    highlight: "Up to 2–5 Working Days",
    lines: [
      "Standard inquiries: prepared within 2 working days.",
      "Multi-product / complex specs: up to 5 working days.",
      "Quotation validity: 2 calendar days from issue.",
    ],
  },
  {
    Icon: Anchor,
    title: "Loading Ports & Routes",
    highlight: "JNPT, Mundra, Tuticorin",
    lines: [
      "Nhava Sheva Port (JNPT), Maharashtra",
      "Mundra Port, Gujarat & Tuticorin Port, Tamil Nadu",
      "Air cargo dispatch from all major international Indian airports.",
    ],
  },
  {
    Icon: FileText,
    title: "Accepted Incoterms",
    highlight: "FOB, CIF, CFR & More",
    lines: [
      "Primary: FOB, CIF, C&F (CFR)",
      "Optional upon agreement: EXW, FCA, DDP",
      "Tailored logistics coordination with designated CHA.",
    ],
  },
  {
    Icon: Tag,
    title: "Private Label & Packaging",
    highlight: "Custom Branding Available",
    lines: [
      "Private-label packaging for retail chains and distributors.",
      "Mesh bags, corrugated cartons, jute, and vacuum packs.",
      "Buyer artwork and multi-lingual labelling support.",
    ],
  },
  {
    Icon: ShieldCheck,
    title: "Governance & Transparency",
    highlight: "Official Channels Only",
    lines: [
      "Fraud prevention: verified company domain & bank instructions only.",
      "Container stuffing photos & seal numbers shared before release.",
      "Direct escalation to Founder & executive desk.",
    ],
  },
];

/* Category definitions for filtering the 28 sections */
type PolicyCategory =
  | "All"
  | "Scope & Business"
  | "Payment & Pricing"
  | "Inquiries & Quotations"
  | "Logistics & Orders"
  | "Governance & Trust"
  | "Contacts & Office";

interface PolicySection {
  num: number;
  id: string;
  title: string;
  category: PolicyCategory;
  badge?: string;
  summary: string;
  render: () => React.JSX.Element;
}

function MoreInfoPage() {
  const [selectedCategory, setSelectedCategory] = useState<PolicyCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const sections: PolicySection[] = useMemo(
    () => [
      {
        num: 1,
        id: "about-sheshaan-global",
        title: "About Sheshaan Global",
        category: "Scope & Business",
        badge: "Company Overview",
        summary:
          "India-based agricultural exporter committed to transparent sourcing and reliable international trade.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Sheshaan Global is an India-based exporter and supplier of agricultural commodities,
              committed to providing reliable sourcing, competitive pricing, transparent
              communication, and professional international trade services.
            </p>
            <p>
              We believe that successful long-term business relationships are built on transparency,
              trust, punctuality, clear communication, and mutual respect. Accordingly, all buyers
              are requested to carefully review the following Terms & Conditions before initiating
              or confirming any order.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> India-based Exporter
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Direct Farm Sourcing
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Mutual Respect & Trust
              </span>
            </div>
          </div>
        ),
      },
      {
        num: 2,
        id: "scope-of-business",
        title: "Scope of Business",
        category: "Scope & Business",
        badge: "Trade Scope",
        summary: "Strictly agricultural commodities and related agri-products tailored to buyer requirements.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Sheshaan Global strictly deals in <strong>agricultural commodities</strong> and
              related agri-products.
            </p>
            <p>
              Our supply, sourcing, quotation, documentation, logistics coordination, and export
              services are provided according to the specific requirements of each buyer and the
              availability and prevailing market conditions at the time of inquiry.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
              <strong className="text-slate-800">Primary Product Categories:</strong> Fresh Onions,
              Fresh Green Chillies, Premium Basmati & Non-Basmati Rice, Brown Husked Coconuts,
              Spices & Masalas, Pulses, Grains, and Fresh Fruits/Vegetables.
            </div>
          </div>
        ),
      },
      {
        num: 3,
        id: "payment-terms",
        title: "Payment Terms",
        category: "Payment & Pricing",
        badge: "Commercial Policy",
        summary:
          "50% Advance + 50% at Loading for initial orders. Strict No-LC policy for trial orders.",
        render: () => (
          <div className="space-y-5 text-sm leading-relaxed text-slate-600">
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <h4 className="font-semibold text-blue-900">
                3.1 Standard Payment Terms for Initial / Trial Orders
              </h4>
              <p className="mt-1 text-slate-700">
                For initial orders and trial shipments, our standard payment terms are:
              </p>
              <div className="mt-2.5 inline-block rounded-lg bg-blue-600 px-3.5 py-1.5 font-display text-sm font-bold text-white shadow-sm">
                50% Advance Payment + 50% at the Time of Loading
              </div>
              <p className="mt-2.5 text-xs text-slate-600">
                Depending on the buyer and mutually agreed commercial arrangement, the balance
                payment may, in certain cases, be settled against the shipping bill or agreed
                shipping documentation.
              </p>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                <div>
                  <h4 className="font-semibold text-rose-900">3.2 Letter of Credit (LC) Policy</h4>
                  <p className="mt-1 text-slate-700">
                    Sheshaan Global <strong>does not accept Letter of Credit (LC)</strong> payment
                    terms for initial or trial orders. Buyers requesting LC terms should understand
                    that such terms are not part of our standard initial-order policy.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
              <h4 className="font-semibold text-emerald-900">3.3 Long-Term Buyers</h4>
              <p className="mt-1 text-slate-700">
                After successful completion of initial transactions and establishment of a reliable
                business relationship, Sheshaan Global may discuss more flexible payment
                arrangements and commercial terms, subject to mutual agreement, transaction history,
                order volume, risk assessment, and management approval.
              </p>
              <p className="mt-2 text-xs font-medium text-emerald-800">
                * Any revised payment arrangement must be confirmed in writing by Sheshaan Global
                before it becomes applicable.
              </p>
            </div>
          </div>
        ),
      },
      {
        num: 4,
        id: "inquiry-and-quotation-policy",
        title: "Inquiry & Quotation Policy",
        category: "Inquiries & Quotations",
        badge: "RFQ Guidelines",
        summary:
          "Complete specifications needed for fast pricing. Standard turnaround up to 2–5 working days.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              We request all buyers to provide complete and accurate requirements when submitting an
              inquiry. For the fastest and most accurate quotation, buyers should provide:
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                "Product name and specifications",
                "Required quantity / MOQ",
                "Destination port",
                "Preferred packaging",
                "Required quality or grade",
                "Payment terms",
                "Required certifications, if applicable",
                "Target shipment timeline",
                "Any specific documentation requirements",
              ].map((item, idx) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700"
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: ORANGE }}
                  >
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="font-semibold text-slate-900">4.1 Time Required for Quotation</h4>
              <p className="mt-1">
                Upon receiving an inquiry, buyers are requested to allow Sheshaan Global sufficient
                time to evaluate the requirement, verify availability, review market conditions,
                assess logistics, and prepare the most competitive possible quotation.
              </p>
              <ul className="mt-2.5 space-y-1.5 text-xs">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  <span>
                    <strong>Standard quotation preparation time:</strong> up to 2 working days.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  <span>
                    <strong>Complex or multi-product inquiries:</strong> up to 5 working days for
                    inquiries involving multiple commodities, special packaging, testing, or
                    custom documentation.
                  </span>
                </li>
              </ul>
              <p className="mt-2 text-xs italic text-slate-500">
                We prioritize providing an accurate and commercially viable quotation rather than
                rushing to provide an unverified price.
              </p>
            </div>
          </div>
        ),
      },
      {
        num: 5,
        id: "quotation-validity",
        title: "Quotation Validity",
        category: "Payment & Pricing",
        badge: "2 Calendar Days",
        summary:
          "Quotations valid strictly for 2 calendar days from issue due to commodity market fluctuations.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Standard Validity Window
                </span>
                <p className="mt-0.5 text-base font-bold text-slate-900">
                  2 Calendar Days from the Date of Issue
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Unless otherwise specifically stated in writing by Sheshaan Global.
                </p>
              </div>
            </div>
            <p>
              Agricultural commodity prices, availability, freight, exchange rates, logistics
              costs, and market conditions may change rapidly. Accordingly, after the quotation
              validity period expires, the quoted price may be revised without prior notice.
            </p>
            <p className="text-xs font-medium text-slate-700">
              Buyers are therefore encouraged to confirm orders within the validity period if they
              wish to secure the quoted commercial terms.
            </p>
          </div>
        ),
      },
      {
        num: 6,
        id: "pricing-and-market-conditions",
        title: "Pricing & Market Conditions",
        category: "Payment & Pricing",
        badge: "Market Dynamic",
        summary:
          "Quotations are based on prevailing market factors at the time and do not represent permanent commitments.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              All quotations are prepared based on the prevailing market conditions, product
              availability, sourcing costs, logistics, freight, packaging, quality specifications,
              and other applicable commercial factors at the time of quotation.
            </p>
            <p>
              A quotation does not constitute a permanent price commitment beyond its stated
              validity period. The final price may vary where there is a material change in:
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                "Commodity market prices",
                "Product availability",
                "Freight or shipping costs",
                "Packaging requirements",
                "Order quantity",
                "Quality specifications",
                "Destination port / route",
                "Government regulations or applicable charges",
                "Currency exchange rates",
                "Other relevant commercial conditions",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 text-xs text-slate-700"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        num: 7,
        id: "official-communication-channels",
        title: "Official Communication Channels",
        category: "Contacts & Office",
        badge: "Fraud Prevention",
        summary:
          "Buyers must communicate solely through verified official domain channels and authorized emails.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              For security, transparency, and fraud prevention, buyers are strongly advised to
              communicate only through Sheshaan Global's official communication channels.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Official Website
                </span>
                <a
                  href="http://www.sheshaanglobal.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 flex items-center gap-1.5 font-display text-sm font-bold text-blue-600 hover:underline"
                >
                  www.sheshaanglobal.com <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <p className="mt-1 text-xs text-slate-500">
                  Primary corporate online domain and product portal.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  General Inquiries Email
                </span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-1 flex items-center gap-1.5 font-display text-sm font-bold text-blue-600 hover:underline"
                >
                  {EMAIL} <Mail className="h-3.5 w-3.5" />
                </a>
                <p className="mt-1 text-xs text-slate-500">
                  Designated central business inquiry inbox.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              All general business inquiries received through our official website and official
              general email are handled through our designated business channels.
            </p>
          </div>
        ),
      },
      {
        num: 8,
        id: "department-and-management-contacts",
        title: "Department & Management Contacts",
        category: "Contacts & Office",
        badge: "Executive Directory",
        summary:
          "Official contacts for General inquiries, Supply & Business Execution, Trade Fairs, and Management.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Please direct your communications to the relevant department contact to ensure the
              fastest response:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {/* General Inquiries */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  General Inquiries
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  Central Communication Desk
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-xs font-medium text-blue-600 hover:underline"
                  >
                    {EMAIL}
                  </a>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  For general product inquiries, initial business inquiries, and general
                  communication.
                </p>
              </div>

              {/* Saksham Singh */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
                    Supply, Business Execution & Partnerships
                  </div>
                  <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800">
                    Operations Lead
                  </span>
                </div>
                <div className="mt-2 text-sm font-bold text-slate-900">{SAKSHAM_NAME}</div>
                <div className="text-xs text-slate-600">{SAKSHAM_TITLE}</div>
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-blue-600" />
                    <a
                      href={`mailto:${SAKSHAM_EMAIL}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {SAKSHAM_EMAIL}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-emerald-600" />
                    <a
                      href={`tel:${SAKSHAM_PHONE_RAW}`}
                      className="font-medium text-slate-700 hover:text-slate-900"
                    >
                      {SAKSHAM_PHONE}
                    </a>
                    <a
                      href={`https://wa.me/${SAKSHAM_PHONE_RAW}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto inline-flex items-center gap-1 rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white"
                    >
                      <MessageCircle className="h-3 w-3" /> WhatsApp
                    </a>
                  </div>
                </div>
                <div className="mt-3 border-t border-blue-100 pt-2 text-[11px] text-slate-500">
                  <strong>Handles:</strong> Supply queries, order execution, CHA coordination,
                  business execution, partnerships, buyer follow-ups & web administration.
                </div>
              </div>

              {/* Juned Barade */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Trade Fairs & Visits
                </div>
                <div className="mt-2 text-sm font-bold text-slate-900">{JUNED_NAME}</div>
                <div className="text-xs text-slate-600">{JUNED_TITLE}</div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <Mail className="h-3.5 w-3.5 text-blue-600" />
                  <a
                    href={`mailto:${JUNED_EMAIL}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {JUNED_EMAIL}
                  </a>
                </div>
                <div className="mt-3 border-t border-slate-200 pt-2 text-[11px] text-slate-500">
                  <strong>Handles:</strong> Trade fair coordination, business visits, in-person
                  meetings, and operational event planning.
                </div>
              </div>

              {/* Sana Zeba Bakshi */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Executive Management
                  </div>
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">
                    Founder
                  </span>
                </div>
                <div className="mt-2 text-sm font-bold text-slate-900">{SANA_NAME}</div>
                <div className="text-xs text-slate-600">{SANA_TITLE}</div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <Mail className="h-3.5 w-3.5 text-blue-600" />
                  <a
                    href={`mailto:${SANA_EMAIL}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {SANA_EMAIL}
                  </a>
                </div>
                <div className="mt-3 border-t border-amber-200 pt-2 text-[11px] text-slate-500">
                  <strong>Handles:</strong> Strategic governance, partnership agreements,
                  long-term buyer contracts & executive approvals.
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        num: 9,
        id: "supply-related-queries",
        title: "Supply-Related Queries",
        category: "Logistics & Orders",
        badge: "Operational Routing",
        summary:
          "Route all supply, execution, and CHA queries directly to sakshamsingh@sheshaanglobal.com.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              For supply-related, order-execution, CHA, shipment coordination, or business execution
              matters, buyers are requested to contact:
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3.5 py-2 text-sm font-semibold text-blue-700">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${SAKSHAM_EMAIL}`} className="hover:underline">
                {SAKSHAM_EMAIL}
              </a>
            </div>
            <p>
              Please avoid sending supply-related operational requests to the general inquiry email
              unless specifically instructed to do so. This helps us route your request to the
              appropriate team and provide a faster response.
            </p>
          </div>
        ),
      },
      {
        num: 10,
        id: "cha-and-logistics-coordination",
        title: "CHA & Logistics Coordination",
        category: "Logistics & Orders",
        badge: "Customs & Port",
        summary:
          "Designated Customs House Agent (CHA) workflows coordinated via sakshamsingh@sheshaanglobal.com.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Sheshaan Global works with a designated <strong>Customs House Agent (CHA)</strong> for
              customs and export-related processes.
            </p>
            <p>
              For CHA-related inquiries, documentation coordination, and related operational
              matters, buyers may contact:{" "}
              <a
                href={`mailto:${SAKSHAM_EMAIL}`}
                className="font-semibold text-blue-600 hover:underline"
              >
                {SAKSHAM_EMAIL}
              </a>
            </p>
            <p className="text-xs text-slate-500">
              All logistics and CHA arrangements will be coordinated according to the agreed
              commercial terms, shipment requirements, and applicable regulations.
            </p>
          </div>
        ),
      },
      {
        num: 11,
        id: "shipment-and-vessel-transparency",
        title: "Shipment & Vessel Transparency",
        category: "Logistics & Orders",
        badge: "Vessel Planning",
        summary:
          "Complete visibility from order confirmation to vessel nomination, stuffing photos, and seal numbers.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Sheshaan Global believes in maintaining complete transparency throughout the shipment
              process.
            </p>
            <p>
              Once an order is confirmed and the required commercial conditions are fulfilled, we
              proceed with shipment planning and coordinate the latest suitable vessel / sailing
              option according to the buyer's requirements and availability.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Shared Shipment Information
              </h4>
              <ul className="mt-2 grid gap-1.5 text-xs text-slate-600 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Available vessel &
                  voyage details
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Container stuffing
                  photographs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Container & seal
                  numbers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Verified draft shipping
                  documents
                </li>
              </ul>
            </div>
            <p className="text-xs text-slate-500">
              We aim to maintain clear communication throughout the process, from order confirmation
              to loading and shipment documentation.
            </p>
          </div>
        ),
      },
      {
        num: 12,
        id: "buyer-information-and-inquiry-requirements",
        title: "Buyer Information & Inquiry Requirements",
        category: "Inquiries & Quotations",
        badge: "Inquiry Checklist",
        summary:
          "Required data formula for instant RFQ evaluation: Product + Quantity + Port + Quality + Pack + Terms + Docs.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              To ensure an accurate quotation and efficient communication process, buyers are
              requested to provide complete information in their initial inquiry. Incomplete
              inquiries may require additional clarification and can consequently increase the time
              required to prepare a quotation.
            </p>
            <div
              className="rounded-xl p-4 text-white shadow-sm"
              style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Formula for Fastest Response:
              </div>
              <div className="mt-2 font-display text-xs font-medium leading-relaxed text-amber-300 md:text-sm">
                Product + Quantity/MOQ + Destination Port + Quality/Grade + Packaging + Payment Terms
                + Required Certifications + Shipment Requirement
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Providing these details together allows our team to evaluate the complete requirement
              and prepare a more accurate commercial proposal without back-and-forth delays.
            </p>
          </div>
        ),
      },
      {
        num: 13,
        id: "product-certifications-and-documentation",
        title: "Product Certifications & Documentation",
        category: "Inquiries & Quotations",
        badge: "Compliance",
        summary:
          "Specify all certifications and inspection certificates at inquiry stage; complex docs require up to 5 days.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Where a buyer requires product certifications, inspection documents, laboratory
              reports, origin documents, or other specific export documentation, the requirement
              should be clearly communicated at the inquiry stage.
            </p>
            <p>
              If the buyer requests product certification, quotation, special documentation,
              quality specifications, and other requirements simultaneously, additional time may be
              required.
            </p>
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-xs text-slate-700">
              <strong>Timeline Notice:</strong> In such cases, buyers are requested to allow up to{" "}
              <strong>5 working days</strong> for our team to verify, coordinate, and finalize the
              required information before issuing the complete quotation.
            </div>
          </div>
        ),
      },
      {
        num: 14,
        id: "samples-policy",
        title: "Samples",
        category: "Logistics & Orders",
        badge: "Sample Policy",
        summary:
          "250g–1kg samples offered subject to verification meeting; courier by buyer; terms agreed before dispatch.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Sample availability and sample arrangements may vary depending on: product, buyer
              requirements, quantity, destination, quality specifications, commercial terms, and
              shipping feasibility.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Key Sample Guidelines
              </h4>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>Samples are not automatically dispatched upon every inquiry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>
                    Before arranging samples, Sheshaan Global may require an online meeting with the
                    buyer to understand the requirement, verify the business inquiry, discuss
                    specifications, and establish the applicable commercial terms.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>
                    For initial orders, sample arrangements will generally be discussed after the
                    buyer confirms acceptance of our applicable payment and commercial terms.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        num: 15,
        id: "order-confirmation",
        title: "Order Confirmation",
        category: "Logistics & Orders",
        badge: "Commercial PO",
        summary:
          "Strict criteria for formal confirmation; verbal talks do not constitute a confirmed purchase order.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>An order shall be considered commercially confirmed only after:</p>
            <ol className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-700">
              {[
                "Product specifications have been mutually agreed;",
                "Quantity and destination have been confirmed;",
                "Price has been accepted within the quotation validity period;",
                "Payment terms have been mutually accepted;",
                "Required documentation and commercial conditions have been clarified; and",
                "The required advance payment or other agreed confirmation requirements have been fulfilled.",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: BLUE }}
                  >
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="rounded-lg border border-rose-100 bg-rose-50/60 p-3 text-xs text-rose-800">
              <strong>Notice:</strong> Verbal discussions or preliminary inquiries do not
              constitute a confirmed purchase order unless formally acknowledged in writing by
              Sheshaan Global.
            </div>
          </div>
        ),
      },
      {
        num: 16,
        id: "lead-follow-up-and-inquiry-closure",
        title: "Lead Follow-Up & Inquiry Closure",
        category: "Inquiries & Quotations",
        badge: "7-Day Rule",
        summary:
          "Inquiries without response for 7 consecutive days are closed; reopened subject to updated market pricing.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              We value every genuine business inquiry and make reasonable efforts to follow up with
              prospective buyers.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-slate-600" />
                <div>
                  <strong>7-Day Inactivity Closure:</strong> If no confirmation, response, or
                  meaningful communication is received from the buyer for{" "}
                  <strong>7 consecutive days</strong> after a quotation has been issued, Sheshaan
                  Global may consider the inquiry closed for commercial follow-up purposes.
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              A previously closed inquiry may be reopened upon receiving a new confirmation or
              updated requirement, subject to prevailing market prices and availability.
            </p>
          </div>
        ),
      },
      {
        num: 17,
        id: "daily-market-pricing",
        title: "Daily Market Pricing",
        category: "Payment & Pricing",
        badge: "Price Updates",
        summary:
          "Frequent mandi/market price updates via official WhatsApp group; subject to formal confirmation.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Agricultural commodity prices can change frequently based on crop arrival, weather,
              domestic mandi conditions, and international demand.
            </p>
            <p>
              Buyers who require the latest available pricing and market updates are encouraged to
              join our official Sheshaan Global WhatsApp communication group, where applicable, for
              regular business and pricing updates.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
              <div className="text-xs text-emerald-900">
                Join our official WhatsApp group for daily FOB & CIF price movements.
              </div>
              <a
                href={`https://wa.me/${SAKSHAM_PHONE_RAW}?text=${encodeURIComponent(
                  "Hello Sheshaan Global, I would like to join your official commodity updates group.",
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105"
              >
                <MessageCircle className="h-3.5 w-3.5" /> Request Group Access
              </a>
            </div>
            <p className="text-xs italic text-slate-500">
              Prices communicated in such updates remain subject to the applicable quotation
              validity and final commercial confirmation.
            </p>
          </div>
        ),
      },
      {
        num: 18,
        id: "long-term-business-relationships",
        title: "Long-Term Business Relationships",
        category: "Governance & Trust",
        badge: "Partnership Programme",
        summary:
          "Structured growth pathways for repeat buyers: volume scaling, flexible payments, and strategic supply.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Sheshaan Global is open to establishing long-term business relationships with genuine
              importers, distributors, wholesalers, agents, and commercial partners.
            </p>
            <p>
              After successful completion of initial transactions and establishment of mutual trust,
              we are open to discussing:
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                "Larger order volumes & dedicated packhouse allocation",
                "Recurring / programmed monthly shipments",
                "More flexible payment structures",
                "Long-term seasonal supply arrangements",
                "Strategic market partnerships",
                "Customized commercial & packaging terms",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              Any such arrangement will be subject to mutual agreement and written confirmation.
            </p>
          </div>
        ),
      },
      {
        num: 19,
        id: "business-ethics-and-professional-conduct",
        title: "Business Ethics & Professional Conduct",
        category: "Governance & Trust",
        badge: "Ethics Code",
        summary:
          "Commitment to mutual professionalism, honest commercial information, punctuality, and fair dealing.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>Sheshaan Global believes that professionalism must be mutual.</p>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Our Non-Negotiable Commitments:
              </span>
              <ul className="mt-2.5 grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Transparent
                  communication
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Honest commercial
                  information
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Timely coordination &
                  loading
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Proper export
                  documentation
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Professional ethical
                  conduct
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Respect for commercial
                  commitments
                </li>
              </ul>
            </div>
            <p className="text-xs text-slate-500">
              We expect the same level of professionalism, punctuality, transparency, and
              good-faith communication from our buyers and business partners.
            </p>
          </div>
        ),
      },
      {
        num: 20,
        id: "fraud-prevention-and-official-domain-policy",
        title: "Fraud Prevention & Official Domain Policy",
        category: "Governance & Trust",
        badge: "Critical Alert",
        summary:
          "Vigilance against impersonators. Verify bank details and unauthorized communication prior to payments.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
                <div>
                  <h4 className="font-semibold text-rose-900">
                    Important Fraud Prevention Advisory
                  </h4>
                  <p className="mt-1 text-xs text-slate-700">
                    Buyers are strongly advised to remain vigilant against individuals or
                    organizations impersonating Sheshaan Global or using unauthorized communication
                    channels.
                  </p>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                <span>
                  Sheshaan Global's official website is:{" "}
                  <a
                    href="http://www.sheshaanglobal.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    www.sheshaanglobal.com
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                <span>
                  Official company communications should be verified through our authorized email
                  domains (<strong>@sheshaanglobal.com</strong>) and designated contact channels.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                <span>
                  If you receive any suspicious communication, payment request, quotation, invoice,
                  bank-detail change, or other document that appears inconsistent with our
                  established communication, please verify it directly with Sheshaan Global before
                  taking any action.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                <span>
                  <strong>Do not make payments to any third party</strong> or unauthorized account
                  without independently verifying the instructions with our authorized management
                  team.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                <span>
                  All official company documents are issued under the Sheshaan name and should be
                  verified if their authenticity is in doubt.
                </span>
              </li>
            </ul>
          </div>
        ),
      },
      {
        num: 21,
        id: "website-privacy-and-technical-information",
        title: "Website Privacy & Technical Information",
        category: "Governance & Trust",
        badge: "Privacy First",
        summary:
          "Privacy-focused infrastructure, minimal data retention, and no third-party advertising profiling.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              The Sheshaan Global website is designed with a focus on privacy and minimal data
              collection.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs space-y-2 text-slate-700">
              <p>
                • The website does not intentionally use advertising cookies or third-party tracking
                mechanisms for visitor profiling.
              </p>
              <p>
                • The website does not provide public-facing inquiry forms intended to capture buyer
                information directly into an open administrative database.
              </p>
              <p>
                • Any business communication or inquiry should therefore be made through the
                official communication channels specified in this document.
              </p>
            </div>
          </div>
        ),
      },
      {
        num: 22,
        id: "office-address",
        title: "Office Address",
        category: "Contacts & Office",
        badge: "Nagpur, India",
        summary:
          "Registered / Business office located in Nagpur, Maharashtra, India. Visits arranged by prior notice.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
                >
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Registered / Business Office
                  </span>
                  <div className="mt-1 font-display text-base font-bold text-slate-900">
                    Sheshaan Global
                  </div>
                  <p className="mt-1 text-sm text-slate-700">{OFFICE_ADDRESS}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCopy(OFFICE_ADDRESS, "address")}
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      {copiedKey === "address" ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy Address
                        </>
                      )}
                    </button>
                    <a
                      href="https://maps.google.com/?q=Sheshaan+Global+Nagpur"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-slate-100"
                    >
                      <MapPin className="h-3.5 w-3.5" /> View on Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Buyers and business partners may contact us regarding an office visit through our
              official communication channels.
            </p>
          </div>
        ),
      },
      {
        num: 23,
        id: "office-availability",
        title: "Office Availability",
        category: "Contacts & Office",
        badge: "Business Hours",
        summary:
          "Active operations throughout the week; response times accommodate active port loadings and sourcing.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Sheshaan Global maintains active business operations throughout the week. However,
              response times may vary depending on:
            </p>
            <div className="grid gap-2 sm:grid-cols-2 text-xs text-slate-700">
              {[
                "Active shipment operations at ports",
                "Market sourcing at farm level",
                "Buyer commercial negotiations",
                "Export documentation drafting",
                "Technical & packhouse coordination",
                "Logistics & container stuffed inspections",
                "Executive meetings & conferences",
                "Other ongoing business activities",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              If an immediate response is not received, buyers are requested to allow reasonable
              time for our team to respond. We may be working on your quotation, documentation,
              shipment coordination, or an active port dispatch.
            </p>
          </div>
        ),
      },
      {
        num: 24,
        id: "website-and-administration",
        title: "Website & Administration",
        category: "Contacts & Office",
        badge: "Digital Operations",
        summary:
          "Website and digital systems administered by Saksham Singh and the Crixy team.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              The Sheshaan Global website and its digital administration are managed by:
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800">
              <strong className="text-sm">Saksham Singh and the Crixy team.</strong>
              <p className="mt-1 text-slate-600">
                Website-related technical matters and administrative coordination may therefore be
                routed through the designated business execution contact where appropriate.
              </p>
            </div>
          </div>
        ),
      },
      {
        num: 25,
        id: "accuracy-of-commercial-information",
        title: "Accuracy of Commercial Information",
        category: "Governance & Trust",
        badge: "Legal Notice",
        summary:
          "All prices and specs are subject to final confirmation; only formally issued quotations are binding.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              All product specifications, prices, availability, shipment schedules, certifications,
              and other commercial information are subject to verification and final confirmation.
            </p>
            <p>
              Sheshaan Global reserves the right to correct typographical, technical, pricing,
              availability, or documentation errors where identified.
            </p>
            <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-3 text-xs text-blue-900">
              <strong>Official Commitment Policy:</strong> Only a quotation or commercial
              confirmation formally issued by an authorized representative of Sheshaan Global shall
              be considered an official commercial commitment.
            </div>
          </div>
        ),
      },
      {
        num: 26,
        id: "buyer-responsibility",
        title: "Buyer Responsibility",
        category: "Governance & Trust",
        badge: "Import Compliance",
        summary:
          "Buyer independently ensures compliance with destination port import laws, licenses, and standards.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>The buyer is responsible for providing accurate information regarding:</p>
            <ul className="grid gap-1.5 text-xs text-slate-700 sm:grid-cols-2">
              {[
                "Import requirements & tariffs",
                "Destination country & port",
                "Product specifications",
                "Required quantity & delivery schedule",
                "Specific packaging & labelling",
                "Required certifications (Phyto, Halal, etc.)",
                "Import licenses (where applicable)",
                "Payment compliance & bank routing",
                "Customs clearance procedures",
                "Destination-country regulatory mandates",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 rounded bg-slate-50 p-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500">
              The buyer should independently ensure that the proposed product and documentation meet
              the applicable import requirements of the destination country.
            </p>
          </div>
        ),
      },
      {
        num: 27,
        id: "acceptance-of-terms",
        title: "Acceptance of Terms",
        category: "Governance & Trust",
        badge: "Binding Agreement",
        summary:
          "Inquiring or placing an order constitutes full review and acceptance of these Terms & Conditions.",
        render: () => (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              By submitting an inquiry, requesting a quotation, proceeding with an order, or
              entering into a commercial transaction with Sheshaan Global, the buyer acknowledges
              that they have reviewed and understood the applicable Terms & Conditions and agrees to
              conduct the transaction in accordance with the mutually confirmed commercial terms.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
              <strong>Deviations:</strong> Any specific commercial arrangement that differs from
              these standard Terms & Conditions must be expressly agreed upon and confirmed in
              writing by an authorized representative of Sheshaan Global.
            </div>
          </div>
        ),
      },
      {
        num: 28,
        id: "contact-us",
        title: "Contact Us & Formal Commitment",
        category: "Contacts & Office",
        badge: "Official Contacts",
        summary:
          "Official contact directory and company commitment signed by Sana Zeba Bakshi, CEO & Founder.",
        render: () => (
          <div className="space-y-6 text-sm leading-relaxed text-slate-600">
            {/* Master Contact Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div
                className="px-5 py-3.5 text-white"
                style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
              >
                <div className="font-display text-sm font-bold">SHESHAAN GLOBAL</div>
                <div className="text-xs text-amber-300">Agricultural Commodity Exporter</div>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="flex flex-col gap-1 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-semibold text-slate-500">Website</span>
                  <a
                    href="http://www.sheshaanglobal.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    www.sheshaanglobal.com
                  </a>
                </div>
                <div className="flex flex-col gap-1 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-semibold text-slate-500">General Inquiries</span>
                  <a href={`mailto:${EMAIL}`} className="font-medium text-blue-600 hover:underline">
                    {EMAIL}
                  </a>
                </div>
                <div className="flex flex-col gap-1 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="font-semibold text-slate-500">
                      Business Execution / Supply / Partnerships
                    </span>
                    <div className="text-slate-800">{SAKSHAM_NAME}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${SAKSHAM_EMAIL}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {SAKSHAM_EMAIL}
                    </a>
                    <span className="text-slate-300">|</span>
                    <a
                      href={`tel:${SAKSHAM_PHONE_RAW}`}
                      className="font-medium text-slate-800 hover:underline"
                    >
                      {SAKSHAM_PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-1 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="font-semibold text-slate-500">COO — Trade Fairs & Visits</span>
                    <div className="text-slate-800">{JUNED_NAME}</div>
                  </div>
                  <a
                    href={`mailto:${JUNED_EMAIL}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {JUNED_EMAIL}
                  </a>
                </div>
                <div className="flex flex-col gap-1 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="font-semibold text-slate-500">CEO & Founder</span>
                    <div className="text-slate-800">{SANA_NAME}</div>
                  </div>
                  <a
                    href={`mailto:${SANA_EMAIL}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {SANA_EMAIL}
                  </a>
                </div>
                <div className="flex flex-col gap-1 p-3.5 sm:flex-row sm:items-start sm:justify-between">
                  <span className="font-semibold text-slate-500">Office</span>
                  <span className="max-w-md text-right text-slate-800">{OFFICE_ADDRESS}</span>
                </div>
              </div>
            </div>

            {/* Founder Commitment Box */}
            <div
              className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
              style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-20 blur-2xl"
                style={{ background: ORANGE }}
              />
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                <Sparkles className="h-4 w-4" /> Our Commitment
              </div>
              <div className="mt-2 font-display text-lg font-bold text-white md:text-xl">
                Transparency. Trust. Professionalism. Punctuality.
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/80 md:text-sm">
                We believe that international trade is not simply about completing a transaction —
                it is about building a reliable and long-term business relationship. We welcome
                genuine buyers and partners who share the same commitment to transparent,
                professional, and ethical business.
              </p>
              <div className="mt-5 border-t border-white/15 pt-4">
                <p className="text-xs text-white/70">Thank you for your interest in Sheshaan Global.</p>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="font-display text-sm font-bold text-white">{SANA_NAME}</div>
                    <div className="text-xs text-amber-300">CEO & Founder, Sheshaan Global</div>
                  </div>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white shadow-md"
                    style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}
                  >
                    SG
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [],
  );

  /* Filter sections by search and category */
  const filteredSections = useMemo(() => {
    return sections.filter((s) => {
      const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        String(s.num).includes(q)
      );
    });
  }, [sections, selectedCategory, searchQuery]);

  const categories: PolicyCategory[] = [
    "All",
    "Scope & Business",
    "Payment & Pricing",
    "Inquiries & Quotations",
    "Logistics & Orders",
    "Governance & Trust",
    "Contacts & Office",
  ];

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden pb-16 pt-28"
        style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
          style={{ background: ORANGE }}
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{ background: BLUE }}
        />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/60">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-white/90">More Info</span>
            <span className="px-2">/</span>
            <span className="text-amber-300">Terms & Trade Policy</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Sheshaan Global logo"
                className="h-14 w-14 object-contain sg-float drop-shadow-md"
              />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5" /> Official Policy Document • Nagpur, India
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Terms & Conditions <span style={{ color: ORANGE }}>|</span> Buyer Trade Policy{" "}
              <span style={{ color: ORANGE }}>|</span> Official Communication Policy
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base">
              Sheshaan Global is an India-based exporter and supplier of agricultural commodities
              located in Nagpur, Maharashtra. All buyers are requested to carefully review our
              official commercial terms, payment conditions, quotation process, and communication
              policies before placing or confirming an order.
            </p>

            {/* Quick jump anchor links */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              <a
                href="#payment-terms"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <Wallet className="h-3.5 w-3.5 text-amber-300" /> Payment Terms (50-50)
              </a>
              <a
                href="#quotation-validity"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <Clock className="h-3.5 w-3.5 text-amber-300" /> Quotation Validity (2 Days)
              </a>
              <a
                href="#department-and-management-contacts"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <Users className="h-3.5 w-3.5 text-amber-300" /> Executive Contacts
              </a>
              <a
                href="#fraud-prevention-and-official-domain-policy"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <AlertTriangle className="h-3.5 w-3.5 text-amber-300" /> Fraud Prevention
              </a>
              <a
                href="#contact-us"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                <Phone className="h-3.5 w-3.5" /> Contact Directory
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trade Highlights At A Glance */}
      <section className="mx-auto max-w-7xl px-6 -mt-8 relative z-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRADE_HIGHLIGHTS.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease }}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(4,21,45,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(4,21,45,0.1)]"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm"
                  style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
                >
                  <t.Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                  {t.highlight}
                </span>
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-slate-900">{t.title}</h2>
              <ul className="mt-2.5 space-y-1.5">
                {t.lines.map((l) => (
                  <li
                    key={l}
                    className="flex items-start gap-2 text-xs leading-relaxed text-slate-600"
                  >
                    <span
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: ORANGE }}
                    />
                    {l}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Main Content Area: 28 Sections */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        {/* Search & Filter Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold" style={{ color: NAVY }}>
                Complete Policy Index & Clauses (28 Sections)
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Browse through all 28 official terms, or search by keyword (e.g., "LC", "payment",
                "validity", "samples", "CHA").
              </p>
            </div>
            {/* Search Input */}
            <div className="relative min-w-[260px] max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search policy sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category filter pills */}
          <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? sections.length
                  : sections.filter((s) => s.category === cat).length;
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      active ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count Notification if filtering */}
        {(searchQuery || selectedCategory !== "All") && (
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong>{filteredSections.length}</strong> of {sections.length} clauses
              {selectedCategory !== "All" && ` in "${selectedCategory}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="font-medium text-blue-600 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Policy Sections Grid / List */}
        <div className="mt-6 space-y-6">
          {filteredSections.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <HelpCircle className="mx-auto h-10 w-10 text-slate-300" />
              <h3 className="mt-3 text-sm font-bold text-slate-700">No matching sections found</h3>
              <p className="mt-1 text-xs text-slate-500">
                Try searching for different keywords or clear the category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-4 py-2 text-xs font-semibold text-white"
              >
                View all 28 sections
              </button>
            </div>
          ) : (
            filteredSections.map((sec) => (
              <motion.article
                key={sec.id}
                id={sec.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, ease }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md md:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm"
                      style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
                    >
                      {sec.num < 10 ? `0${sec.num}` : sec.num}
                    </span>
                    <h3 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
                      {sec.num}. {sec.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {sec.category}
                    </span>
                    {sec.badge && (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                        {sec.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5">{sec.render()}</div>
              </motion.article>
            ))
          )}
        </div>

        {/* Company & Quality Policies Link Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mt-14 overflow-hidden rounded-2xl border border-transparent p-8 text-white shadow-[0_16px_44px_rgba(4,21,45,0.22)]"
          style={{ background: `linear-gradient(135deg,${NAVY},#062a55)` }}
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl shadow-md"
                style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}
              >
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold">
                Looking for Quality Control & Sourcing Details?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Explore our full Company Profile, incoming farm inspection stages, laboratory
                testing protocols, sample dispatch guidelines, and formal privacy policy.
              </p>
            </div>
            <Link
              to="/company-policies"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
              style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}
            >
              Open Company & Policies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
          >
            <MessageCircle className="h-4 w-4" /> Discuss terms on WhatsApp
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Mail className="h-4 w-4" /> Email: {EMAIL}
          </a>
          <a
            href={`mailto:${SAKSHAM_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/60 px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
          >
            <Mail className="h-4 w-4" /> Supply Desk: {SAKSHAM_EMAIL}
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
            style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
          >
            Send an RFQ inquiry <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
