import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ElementType,
  type ReactNode,
} from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  BarChart3,
  BookOpen,
  CheckCircle2,
  FileBadge2,
  FileImage,
  FileSearch,
  Globe2,
  Home,
  LayoutDashboard,
  Linkedin,
  Link2,
  Lock,
  LogOut,
  Mail,
  Megaphone,
  MessageCircle,
  Package,
  Pencil,
  Plus,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { BLUE, ORANGE, buildWhatsAppUrl } from "@/lib/site";
import {
  defaultAdminState,
  normalizeAdminState,
  type AdminBlog,
  type AdminCertificate,
  type AdminCountryPage,
  type AdminInquiry,
  type AdminMedia,
  type AdminProduct,
  type AdminSeo,
  type AdminState,
  type AdminTeamMember,
  type AdminTestimonial,
  type PublishStatus,
} from "@/lib/admin-content";

type Tab =
  | "dashboard"
  | "homepage"
  | "products"
  | "blogs"
  | "search-pages"
  | "countries"
  | "media"
  | "certificates"
  | "inquiries"
  | "testimonials"
  | "team"
  | "settings";

type SaveState = (next?: AdminState) => Promise<void>;

const STORAGE_KEY = "sheshaan-admin-portal-v1";
const PIN_KEY = "sheshaan-admin-passcode";
const statusOptions: PublishStatus[] = ["Published", "Draft"];
const inquiryStatuses: AdminInquiry["status"][] = [
  "New",
  "Contacted",
  "Quoted",
  "Follow-up",
  "Won",
  "Lost",
  "Closed",
];

const tabs: { id: Tab; label: string; icon: ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "homepage", label: "Homepage", icon: Home },
  { id: "products", label: "Products", icon: Package },
  { id: "blogs", label: "Blogs", icon: BookOpen },
  { id: "search-pages", label: "Search Pages", icon: FileSearch },
  { id: "countries", label: "Countries", icon: Globe2 },
  { id: "media", label: "Media Library", icon: FileImage },
  { id: "certificates", label: "Certificates", icon: FileBadge2 },
  { id: "inquiries", label: "Inquiries", icon: Mail },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "team", label: "Team", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal | Sheshaan Global" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPortal,
});

function AdminPortal() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [query, setQuery] = useState("");
  const [state, setState] = useState<AdminState>(defaultAdminState);
  const [selectedProduct, setSelectedProduct] = useState(defaultAdminState.products[0]);
  const [selectedBlog, setSelectedBlog] = useState(defaultAdminState.blogs[0]);
  const [selectedSeo, setSelectedSeo] = useState(defaultAdminState.seoPages[0]);
  const [saved, setSaved] = useState(false);
  const [liveStatus, setLiveStatus] = useState("Loading live content...");

  const applyContent = (content: Partial<AdminState>) => {
    const next = normalizeAdminState(content);
    setState(next);
    setSelectedProduct(next.products[0] ?? defaultAdminState.products[0]);
    setSelectedBlog(next.blogs[0] ?? defaultAdminState.blogs[0]);
    setSelectedSeo(next.seoPages[0] ?? defaultAdminState.seoPages[0]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  };

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        applyContent(JSON.parse(raw) as Partial<AdminState>);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    const savedPin = localStorage.getItem(PIN_KEY);
    if (savedPin) {
      setPin(savedPin);
      setUnlocked(true);
    }

    fetch("/api/admin/content")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Live content unavailable"))))
      .then((payload: { content?: Partial<AdminState> | null }) => {
        if (!payload.content) {
          setLiveStatus("Using starter content. Save once to publish live data.");
          return;
        }
        applyContent(payload.content);
        setLiveStatus("Live content loaded.");
      })
      .catch(() => setLiveStatus("Live store not connected yet. Local backup is available."));
  }, []);

  const metrics = useMemo(() => {
    const openLeads = state.inquiries.filter(
      (i) => !["Won", "Lost", "Closed"].includes(i.status),
    ).length;
    const publishedCount = state.products.filter((p) => p.status === "Published").length;
    return [
      {
        label: "Products",
        value: state.products.length,
        change: `${publishedCount} published export items`,
        icon: Package,
      },
      {
        label: "Content Pages",
        value: state.blogs.length + state.seoPages.length + state.countryPages.length,
        change: "Blogs, buyer pages and country pages",
        icon: FileSearch,
      },
      {
        label: "Open Leads",
        value: openLeads,
        change: "Inquiries waiting for follow-up",
        icon: MessageCircle,
      },
      {
        label: "Media Files",
        value: state.media.length,
        change: "Images, PDFs and reusable assets",
        icon: FileImage,
      },
    ];
  }, [state]);

  const saveState: SaveState = async (next = state) => {
    const clean = normalizeAdminState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    setState(clean);
    setLiveStatus("Publishing changes...");
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-admin-passcode": pin,
        },
        body: JSON.stringify(clean),
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `Publish failed with status ${response.status}`);
      }
      setSaved(true);
      setLiveStatus("Published live.");
      window.setTimeout(() => setSaved(false), 1600);
    } catch (error) {
      setLiveStatus(
        error instanceof Error
          ? `Could not publish live: ${error.message}`
          : "Could not publish live.",
      );
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sheshaan-admin-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    const parsed = normalizeAdminState(JSON.parse(await file.text()) as Partial<AdminState>);
    setSelectedProduct(parsed.products[0] ?? defaultAdminState.products[0]);
    setSelectedBlog(parsed.blogs[0] ?? defaultAdminState.blogs[0]);
    setSelectedSeo(parsed.seoPages[0] ?? defaultAdminState.seoPages[0]);
    await saveState(parsed);
  };

  if (!unlocked) {
    return (
      <main className="grid min-h-screen place-items-center bg-[linear-gradient(135deg,#04152d,#06356d)] px-5 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur">
          <img src={logo} alt="Sheshaan Global" className="h-16 w-16 object-contain" />
          <h1 className="mt-5 font-display text-3xl font-bold">Admin Portal</h1>
          <p className="mt-2 text-sm leading-7 text-white/70">
            Manage products, homepage content, blogs, country pages, buyer leads, media,
            certificates and website settings.
          </p>
          <label className="mt-6 block text-sm font-semibold">
            Access passcode
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              type="password"
              placeholder="Enter passcode"
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/95 px-4 py-3 text-slate-900 outline-none focus:ring-4 focus:ring-white/20"
            />
          </label>
          <button
            onClick={() => {
              if (pin.trim()) {
                localStorage.setItem(PIN_KEY, pin.trim());
                setUnlocked(true);
              }
            }}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg"
            style={{ background: `linear-gradient(135deg,${ORANGE},#ff6a00)` }}
          >
            <Lock className="h-4 w-4" /> Enter Dashboard
          </button>
          <p className="mt-4 text-xs text-white/50">
            Use the same passcode you added in Cloudflare to publish live changes.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <img src={logo} alt="Sheshaan Global" className="h-11 w-11 object-contain" />
          <div>
            <div className="font-display text-lg font-bold" style={{ color: BLUE }}>
              SHESHAAN
            </div>
            <div
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: ORANGE }}
            >
              Admin Control
            </div>
          </div>
        </div>
        <nav className="max-h-[calc(100vh-150px)] space-y-1 overflow-auto p-4">
          {tabs.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={tab === item.id}
              onClick={() => setTab(item.id)}
            />
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 bg-white p-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" /> View Website
          </Link>
        </div>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex min-h-20 flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between lg:px-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Sheshaan Global
              </div>
              <h1 className="font-display text-2xl font-bold text-slate-950">
                Website Management Portal
              </h1>
              <div className="mt-2 text-xs font-semibold text-slate-500">{liveStatus}</div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search content"
                  className="w-52 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#0057B8]"
                />
              </label>
              <button
                onClick={() => saveState()}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow"
                style={{ background: BLUE }}
              >
                <Save className="h-4 w-4" /> {saved ? "Saved" : "Save Live"}
              </button>
              <button
                onClick={exportJson}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700"
              >
                <ArrowDownToLine className="h-4 w-4" /> Export
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem(PIN_KEY);
                  setUnlocked(false);
                }}
                className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-slate-100 bg-white px-5 py-3 lg:hidden">
            {tabs.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                active={tab === item.id}
                onClick={() => setTab(item.id)}
                compact
              />
            ))}
          </div>
        </header>

        <div className="p-5 lg:p-8">
          {tab === "dashboard" && <Dashboard metrics={metrics} state={state} setTab={setTab} />}
          {tab === "homepage" && (
            <HomepageManager state={state} setState={setState} saveState={saveState} />
          )}
          {tab === "products" && (
            <ProductsManager
              query={query}
              products={state.products}
              selected={selectedProduct}
              onSelect={setSelectedProduct}
              onAdd={() => {
                const item: AdminProduct = {
                  id: crypto.randomUUID(),
                  name: "New Product",
                  slug: "new-product",
                  hsCode: "",
                  group: "Fresh Produce",
                  status: "Draft",
                  image: "",
                  description: "",
                  packing: "",
                  standards: "",
                };
                const next = { ...state, products: [item, ...state.products] };
                setState(next);
                setSelectedProduct(item);
                void saveState(next);
              }}
              onDelete={(id) => {
                const next = { ...state, products: state.products.filter((p) => p.id !== id) };
                setState(next);
                setSelectedProduct(next.products[0] ?? defaultAdminState.products[0]);
                void saveState(next);
              }}
              onChange={(item) => {
                const next = {
                  ...state,
                  products: state.products.map((p) => (p.id === item.id ? item : p)),
                };
                setState(next);
                setSelectedProduct(item);
              }}
            />
          )}
          {tab === "blogs" && (
            <BlogsManager
              query={query}
              state={state}
              setState={setState}
              selected={selectedBlog}
              setSelected={setSelectedBlog}
              saveState={saveState}
            />
          )}
          {tab === "search-pages" && (
            <SeoManager
              query={query}
              state={state}
              setState={setState}
              selected={selectedSeo}
              setSelected={setSelectedSeo}
              saveState={saveState}
            />
          )}
          {tab === "countries" && (
            <CountriesManager
              query={query}
              state={state}
              setState={setState}
              saveState={saveState}
            />
          )}
          {tab === "media" && (
            <MediaManager query={query} state={state} setState={setState} saveState={saveState} />
          )}
          {tab === "certificates" && (
            <CertificatesManager state={state} setState={setState} saveState={saveState} />
          )}
          {tab === "inquiries" && (
            <InquiriesManager state={state} setState={setState} saveState={saveState} />
          )}
          {tab === "testimonials" && (
            <TestimonialsManager state={state} setState={setState} saveState={saveState} />
          )}
          {tab === "team" && (
            <TeamManager state={state} setState={setState} saveState={saveState} />
          )}
          {tab === "settings" && (
            <SettingsManager
              state={state}
              setState={setState}
              saveState={saveState}
              importJson={importJson}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function NavButton({
  item,
  active,
  onClick,
  compact = false,
}: {
  item: { id: Tab; label: string; icon: ElementType };
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${compact ? "shrink-0" : "w-full"} ${active ? "text-white shadow" : "text-slate-600 hover:bg-slate-50"}`}
      style={active ? { background: `linear-gradient(135deg,${BLUE},#003c85)` } : undefined}
    >
      <item.icon className="h-4 w-4" /> {item.label}
    </button>
  );
}

function Dashboard({
  metrics,
  state,
  setTab,
}: {
  metrics: { label: string; value: number; change: string; icon: ElementType }[];
  state: AdminState;
  setTab: (tab: Tab) => void;
}) {
  const quickActions: { title: string; desc: string; target: Tab; icon: ElementType }[] = [
    { title: "Add product", desc: "Publish a new export line", target: "products", icon: Package },
    { title: "Write blog", desc: "Capture importer searches", target: "blogs", icon: BookOpen },
    {
      title: "Create country page",
      desc: "Target a buyer market",
      target: "countries",
      icon: Globe2,
    },
    {
      title: "Review inquiries",
      desc: "Move leads forward",
      target: "inquiries",
      icon: MessageCircle,
    },
  ];
  const wonLeads = state.inquiries.filter((i) => i.status === "Won").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-500">{m.label}</div>
              <div
                className="grid h-10 w-10 place-items-center rounded-xl"
                style={{ background: `${BLUE}12`, color: BLUE }}
              >
                <m.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 font-display text-3xl font-bold text-slate-950">{m.value}</div>
            <div className="mt-1 text-xs text-slate-500">{m.change}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Panel title="Priority Actions" icon={BarChart3}>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={() => setTab(action.target)}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left hover:border-[#0057B8] hover:bg-white"
              >
                <action.icon className="h-5 w-5" style={{ color: ORANGE }} />
                <div className="mt-3 font-semibold text-slate-900">{action.title}</div>
                <div className="mt-1 text-xs text-slate-500">{action.desc}</div>
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="Publishing Health" icon={ShieldCheck}>
          <div className="space-y-3">
            {[
              `${state.homepage.primaryCta} CTA configured`,
              `${state.certificates.filter((c) => c.status === "Published").length} certificates visible`,
              `${state.countryPages.filter((c) => c.status === "Published").length} country pages active`,
              `${wonLeads} won leads tracked`,
            ].map((x) => (
              <div
                key={x}
                className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700"
              >
                <CheckCircle2 className="h-4 w-4" style={{ color: ORANGE }} /> {x}
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel title="Recent Inquiries" icon={MessageCircle}>
        <InquiryTable inquiries={state.inquiries} compact />
      </Panel>
    </div>
  );
}

function HomepageManager({ state, setState, saveState }: ManagerProps) {
  const update = (key: keyof AdminState["homepage"], value: string) =>
    setState({ ...state, homepage: { ...state.homepage, [key]: value } });
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr,360px]">
      <Panel title="Homepage Control" icon={Home}>
        <FormGrid>
          <Input
            label="Hero Title"
            value={state.homepage.heroTitle}
            onChange={(v) => update("heroTitle", v)}
          />
          <Input
            label="Primary Button"
            value={state.homepage.primaryCta}
            onChange={(v) => update("primaryCta", v)}
          />
          <Input
            label="Secondary Button"
            value={state.homepage.secondaryCta}
            onChange={(v) => update("secondaryCta", v)}
          />
          <Input
            label="Featured Products"
            value={state.homepage.featuredProducts}
            onChange={(v) => update("featuredProducts", v)}
          />
          <Textarea
            label="Hero Subtitle"
            value={state.homepage.heroSubtitle}
            onChange={(v) => update("heroSubtitle", v)}
            wide
          />
          <Textarea
            label="Announcement Bar"
            value={state.homepage.announcement}
            onChange={(v) => update("announcement", v)}
            wide
          />
        </FormGrid>
        <PrimarySave onClick={() => saveState()} />
      </Panel>
      <Panel title="Homepage Preview" icon={Megaphone}>
        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
          <div className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>
            {state.homepage.announcement}
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold">{state.homepage.heroTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-white/70">{state.homepage.heroSubtitle}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-lg px-3 py-2 text-white" style={{ background: BLUE }}>
              {state.homepage.primaryCta}
            </span>
            <span className="rounded-lg border border-white/20 px-3 py-2">
              {state.homepage.secondaryCta}
            </span>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function ProductsManager(props: {
  query: string;
  products: AdminProduct[];
  selected: AdminProduct;
  onSelect: (p: AdminProduct) => void;
  onChange: (p: AdminProduct) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}) {
  const products = props.products.filter((p) =>
    matchesQuery(props.query, p.name, p.slug, p.hsCode, p.group),
  );
  return (
    <EditorLayout
      title="Products"
      icon={Package}
      action={<AddButton label="Add Product" onClick={props.onAdd} />}
      list={products.map((p) => (
        <ListItem
          key={p.id}
          active={p.id === props.selected.id}
          title={p.name}
          meta={`HS ${p.hsCode || "-"} - ${p.status}`}
          onClick={() => props.onSelect(p)}
        />
      ))}
    >
      <ProductEditor
        item={props.selected}
        onChange={props.onChange}
        onDelete={() => props.onDelete(props.selected.id)}
      />
    </EditorLayout>
  );
}

function ProductEditor({
  item,
  onChange,
  onDelete,
}: {
  item: AdminProduct;
  onChange: (p: AdminProduct) => void;
  onDelete: () => void;
}) {
  const update = (key: keyof AdminProduct, value: string) => onChange({ ...item, [key]: value });
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr,320px]">
      <Panel title="Product Details" icon={Pencil}>
        <FormGrid>
          <Input label="Title" value={item.name} onChange={(v) => update("name", v)} />
          <Input label="Slug" value={item.slug} onChange={(v) => update("slug", v)} />
          <Input label="HS Code" value={item.hsCode} onChange={(v) => update("hsCode", v)} />
          <Input label="Category" value={item.group} onChange={(v) => update("group", v)} />
          <Select
            label="Status"
            value={item.status}
            onChange={(v) => update("status", v)}
            options={statusOptions}
          />
          <Input label="Image URL / path" value={item.image} onChange={(v) => update("image", v)} />
          <Textarea
            label="Description"
            value={item.description}
            onChange={(v) => update("description", v)}
            wide
          />
          <Textarea
            label="Packing Options"
            value={item.packing}
            onChange={(v) => update("packing", v)}
            wide
          />
          <Textarea
            label="Standards"
            value={item.standards}
            onChange={(v) => update("standards", v)}
            wide
          />
        </FormGrid>
      </Panel>
      <PreviewCard
        title={item.name}
        status={item.status}
        image={item.image}
        cta="Preview product"
        onDelete={onDelete}
      />
    </div>
  );
}

function BlogsManager({
  query,
  state,
  setState,
  selected,
  setSelected,
  saveState,
}: {
  query: string;
  state: AdminState;
  setState: (s: AdminState) => void;
  selected: AdminBlog;
  setSelected: (b: AdminBlog) => void;
  saveState: SaveState;
}) {
  const items = state.blogs.filter((b) => matchesQuery(query, b.title, b.category, b.slug));
  const change = (blog: AdminBlog) => {
    const next = { ...state, blogs: state.blogs.map((b) => (b.id === blog.id ? blog : b)) };
    setState(next);
    setSelected(blog);
  };
  return (
    <EditorLayout
      title="Blogs"
      icon={BookOpen}
      action={
        <AddButton
          label="Add Blog"
          onClick={() => {
            const item: AdminBlog = {
              id: crypto.randomUUID(),
              title: "New Blog Post",
              slug: "new-blog-post",
              category: "Export Guide",
              status: "Draft",
              image: "",
              imageAlt: "New Blog Post",
              description: "",
              body: "",
            };
            const next = { ...state, blogs: [item, ...state.blogs] };
            setState(next);
            setSelected(item);
            void saveState(next);
          }}
        />
      }
      list={items.map((b) => (
        <ListItem
          key={b.id}
          active={b.id === selected.id}
          title={b.title}
          meta={`${b.category} - ${b.status}`}
          onClick={() => setSelected(b)}
        />
      ))}
    >
      <div className="grid gap-5 xl:grid-cols-[1fr,320px]">
        <Panel title="Blog Editor" icon={Pencil}>
          <FormGrid>
            <Input
              label="Title"
              value={selected.title}
              onChange={(v) => change({ ...selected, title: v })}
            />
            <Input
              label="Slug"
              value={selected.slug}
              onChange={(v) => change({ ...selected, slug: v })}
            />
            <Input
              label="Category"
              value={selected.category}
              onChange={(v) => change({ ...selected, category: v })}
            />
            <Select
              label="Status"
              value={selected.status}
              onChange={(v) => change({ ...selected, status: v as PublishStatus })}
              options={statusOptions}
            />
            <Input
              label="Featured Image URL / path"
              value={selected.image}
              onChange={(v) => change({ ...selected, image: v })}
            />
            <Input
              label="Image Alt Text"
              value={selected.imageAlt}
              onChange={(v) => change({ ...selected, imageAlt: v })}
            />
            <div className="md:col-span-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-800">Upload Featured Image</div>
                  <div className="mt-1 text-xs leading-5 text-slate-500">
                    JPG, PNG or WebP. Large photos are resized for a clean medium blog frame.
                  </div>
                </div>
                <ImageUploadButton
                  onUpload={(image) =>
                    change({
                      ...selected,
                      image,
                      imageAlt: selected.imageAlt || selected.title,
                    })
                  }
                />
              </div>
            </div>
            <Textarea
              label="Meta Description"
              value={selected.description}
              onChange={(v) => change({ ...selected, description: v })}
              wide
            />
            <Textarea
              label="Article Body"
              value={selected.body}
              onChange={(v) => change({ ...selected, body: v })}
              wide
              tall
            />
          </FormGrid>
          <PrimarySave onClick={() => saveState()} />
        </Panel>
        <Panel title="Photo Preview" icon={FileImage}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {selected.image ? (
              <img
                src={selected.image}
                alt={selected.imageAlt || selected.title}
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div className="grid aspect-[16/10] place-items-center text-slate-400">
                <FileImage className="h-12 w-12" />
              </div>
            )}
            <div className="p-5">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                {selected.status}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold leading-snug text-slate-950">
                {selected.title}
              </h3>
            </div>
          </div>
        </Panel>
      </div>
    </EditorLayout>
  );
}

function SeoManager({
  query,
  state,
  setState,
  selected,
  setSelected,
  saveState,
}: {
  query: string;
  state: AdminState;
  setState: (s: AdminState) => void;
  selected: AdminSeo;
  setSelected: (b: AdminSeo) => void;
  saveState: SaveState;
}) {
  const items = state.seoPages.filter((b) => matchesQuery(query, b.title, b.keyword, b.slug));
  const change = (page: AdminSeo) => {
    const next = { ...state, seoPages: state.seoPages.map((b) => (b.id === page.id ? page : b)) };
    setState(next);
    setSelected(page);
  };
  return (
    <EditorLayout
      title="Search Landing Pages"
      icon={FileSearch}
      action={
        <AddButton
          label="Add Page"
          onClick={() => {
            const item: AdminSeo = {
              id: crypto.randomUUID(),
              title: "New Landing Page",
              slug: "new-landing-page",
              keyword: "target keyword",
              status: "Draft",
              description: "",
            };
            const next = { ...state, seoPages: [item, ...state.seoPages] };
            setState(next);
            setSelected(item);
            void saveState(next);
          }}
        />
      }
      list={items.map((b) => (
        <ListItem
          key={b.id}
          active={b.id === selected.id}
          title={b.keyword}
          meta={`${b.slug} - ${b.status}`}
          onClick={() => setSelected(b)}
        />
      ))}
    >
      <Panel title="Search Page Editor" icon={FileSearch}>
        <FormGrid>
          <Input
            label="Page Title"
            value={selected.title}
            onChange={(v) => change({ ...selected, title: v })}
          />
          <Input
            label="Slug"
            value={selected.slug}
            onChange={(v) => change({ ...selected, slug: v })}
          />
          <Input
            label="Target Keyword"
            value={selected.keyword}
            onChange={(v) => change({ ...selected, keyword: v })}
          />
          <Select
            label="Status"
            value={selected.status}
            onChange={(v) => change({ ...selected, status: v as PublishStatus })}
            options={statusOptions}
          />
          <Textarea
            label="Meta Description"
            value={selected.description}
            onChange={(v) => change({ ...selected, description: v })}
            wide
          />
        </FormGrid>
        <PrimarySave onClick={() => saveState()} />
      </Panel>
    </EditorLayout>
  );
}

function CountriesManager({ query, state, setState, saveState }: QueryManagerProps) {
  const update = (id: string, key: keyof AdminCountryPage, value: string) =>
    setState({
      ...state,
      countryPages: state.countryPages.map((page) =>
        page.id === id ? { ...page, [key]: value } : page,
      ),
    });
  const items = state.countryPages.filter((page) =>
    matchesQuery(query, page.country, page.slug, page.port, page.topProducts),
  );
  return (
    <Panel
      title="Country Export Pages"
      icon={Globe2}
      action={
        <AddButton
          label="Add Country"
          onClick={() => {
            const item: AdminCountryPage = {
              id: crypto.randomUUID(),
              country: "New Country",
              slug: "new-country",
              port: "",
              topProducts: "",
              status: "Draft",
              description: "",
            };
            const next = { ...state, countryPages: [item, ...state.countryPages] };
            setState(next);
            void saveState(next);
          }}
        />
      }
    >
      <EditableRows
        rows={items}
        render={(page) => (
          <div
            key={page.id}
            className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 xl:grid-cols-[1fr,0.8fr,1fr,0.8fr,auto]"
          >
            <Input
              value={page.country}
              onChange={(v) => update(page.id, "country", v)}
              label="Country"
              compact
            />
            <Input
              value={page.slug}
              onChange={(v) => update(page.id, "slug", v)}
              label="Slug"
              compact
            />
            <Input
              value={page.topProducts}
              onChange={(v) => update(page.id, "topProducts", v)}
              label="Top Products"
              compact
            />
            <Select
              value={page.status}
              onChange={(v) => update(page.id, "status", v as PublishStatus)}
              label="Status"
              options={statusOptions}
              compact
            />
            <DeleteButton
              onClick={() => {
                const next = {
                  ...state,
                  countryPages: state.countryPages.filter((x) => x.id !== page.id),
                };
                setState(next);
                void saveState(next);
              }}
            />
            <Input
              value={page.port}
              onChange={(v) => update(page.id, "port", v)}
              label="Main Port"
              compact
            />
            <Textarea
              value={page.description}
              onChange={(v) => update(page.id, "description", v)}
              label="Description"
              wide
            />
          </div>
        )}
      />
      <PrimarySave onClick={() => saveState()} />
    </Panel>
  );
}

function MediaManager({ query, state, setState, saveState }: QueryManagerProps) {
  const update = (id: string, key: keyof AdminMedia, value: string) =>
    setState({
      ...state,
      media: state.media.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    });
  const items = state.media.filter((item) =>
    matchesQuery(query, item.title, item.url, item.category, item.type),
  );
  return (
    <Panel
      title="Media Library"
      icon={FileImage}
      action={
        <AddButton
          label="Add Media"
          onClick={() => {
            const item: AdminMedia = {
              id: crypto.randomUUID(),
              title: "New Media",
              type: "Image",
              url: "",
              alt: "",
              category: "Product",
            };
            const next = { ...state, media: [item, ...state.media] };
            setState(next);
            void saveState(next);
          }}
        />
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 sm:grid-cols-[120px,1fr]">
              {item.type === "Image" && item.url ? (
                <img
                  src={item.url}
                  alt={item.alt || item.title}
                  className="aspect-square w-full rounded-xl object-cover"
                />
              ) : (
                <div className="grid aspect-square place-items-center rounded-xl bg-white text-slate-400">
                  <FileImage className="h-10 w-10" />
                </div>
              )}
              <div className="grid gap-3">
                <Input
                  value={item.title}
                  onChange={(v) => update(item.id, "title", v)}
                  label="Title"
                  compact
                />
                <Input
                  value={item.url}
                  onChange={(v) => update(item.id, "url", v)}
                  label="URL / path"
                  compact
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Select
                value={item.type}
                onChange={(v) => update(item.id, "type", v as AdminMedia["type"])}
                label="Type"
                options={["Image", "PDF", "Video", "Other"]}
                compact
              />
              <Input
                value={item.category}
                onChange={(v) => update(item.id, "category", v)}
                label="Category"
                compact
              />
              <Input
                value={item.alt}
                onChange={(v) => update(item.id, "alt", v)}
                label="Alt Text"
                compact
              />
            </div>
            <div className="mt-3 flex justify-between">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold"
                  style={{ color: BLUE }}
                >
                  <Link2 className="h-3 w-3" /> View
                </a>
              ) : (
                <span />
              )}
              <DeleteButton
                onClick={() => {
                  const next = { ...state, media: state.media.filter((x) => x.id !== item.id) };
                  setState(next);
                  void saveState(next);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <PrimarySave onClick={() => saveState()} />
    </Panel>
  );
}

function CertificatesManager({ state, setState, saveState }: ManagerProps) {
  const update = (id: string, key: keyof AdminCertificate, value: string) =>
    setState({
      ...state,
      certificates: state.certificates.map((c) => (c.id === id ? { ...c, [key]: value } : c)),
    });
  return (
    <Panel
      title="Certificates"
      icon={FileBadge2}
      action={
        <AddButton
          label="Add Certificate"
          onClick={() => {
            const item: AdminCertificate = {
              id: crypto.randomUUID(),
              name: "New Certificate",
              type: "Quality",
              issuer: "",
              file: "",
              status: "Draft",
            };
            const next = { ...state, certificates: [item, ...state.certificates] };
            setState(next);
            void saveState(next);
          }}
        />
      }
    >
      <EditableRows
        rows={state.certificates}
        render={(c) => (
          <div
            key={c.id}
            className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-[1fr,0.8fr,1fr,1fr,auto]"
          >
            <Input value={c.name} onChange={(v) => update(c.id, "name", v)} label="Name" compact />
            <Input value={c.type} onChange={(v) => update(c.id, "type", v)} label="Type" compact />
            <Input
              value={c.issuer}
              onChange={(v) => update(c.id, "issuer", v)}
              label="Issuer"
              compact
            />
            <Input value={c.file} onChange={(v) => update(c.id, "file", v)} label="File" compact />
            <Select
              value={c.status}
              onChange={(v) => update(c.id, "status", v as PublishStatus)}
              label="Status"
              options={statusOptions}
              compact
            />
            <div className="flex items-end gap-2">
              {c.file ? (
                <a
                  href={c.file}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-white px-3 py-2 text-xs font-bold"
                  style={{ color: BLUE }}
                >
                  View
                </a>
              ) : null}
              <DeleteButton
                onClick={() => {
                  const next = {
                    ...state,
                    certificates: state.certificates.filter((x) => x.id !== c.id),
                  };
                  setState(next);
                  void saveState(next);
                }}
              />
            </div>
          </div>
        )}
      />
      <PrimarySave onClick={() => saveState()} />
    </Panel>
  );
}

function InquiriesManager({ state, setState, saveState }: ManagerProps) {
  const update = (id: string, key: keyof AdminInquiry, value: string) =>
    setState({
      ...state,
      inquiries: state.inquiries.map((i) => (i.id === id ? { ...i, [key]: value } : i)),
    });
  const addInquiry = () => {
    const item: AdminInquiry = {
      id: `INQ-${Date.now().toString().slice(-5)}`,
      buyer: "New Buyer",
      company: "",
      product: "",
      destination: "",
      quantity: "",
      channel: "Admin",
      value: "",
      notes: "",
      nextAction: "",
      status: "New",
    };
    const next = { ...state, inquiries: [item, ...state.inquiries] };
    setState(next);
    void saveState(next);
  };
  return (
    <Panel
      title="Inquiry Pipeline"
      icon={MessageCircle}
      action={<AddButton label="Add Lead" onClick={addInquiry} />}
    >
      <div className="mb-5 grid gap-3 md:grid-cols-4">
        {inquiryStatuses.slice(0, 6).map((status) => (
          <div key={status} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {status}
            </div>
            <div className="mt-1 font-display text-2xl font-bold">
              {state.inquiries.filter((i) => i.status === status).length}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {state.inquiries.map((i) => (
          <div
            key={i.id}
            className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 xl:grid-cols-4"
          >
            <Input
              label="Buyer"
              value={i.buyer}
              onChange={(v) => update(i.id, "buyer", v)}
              compact
            />
            <Input
              label="Company"
              value={i.company}
              onChange={(v) => update(i.id, "company", v)}
              compact
            />
            <Input
              label="Product"
              value={i.product}
              onChange={(v) => update(i.id, "product", v)}
              compact
            />
            <Input
              label="Destination"
              value={i.destination}
              onChange={(v) => update(i.id, "destination", v)}
              compact
            />
            <Input
              label="Quantity"
              value={i.quantity}
              onChange={(v) => update(i.id, "quantity", v)}
              compact
            />
            <Input
              label="Channel"
              value={i.channel}
              onChange={(v) => update(i.id, "channel", v)}
              compact
            />
            <Input
              label="Deal Value"
              value={i.value ?? ""}
              onChange={(v) => update(i.id, "value", v)}
              compact
            />
            <Select
              label="Status"
              value={i.status}
              onChange={(v) => update(i.id, "status", v as AdminInquiry["status"])}
              options={inquiryStatuses}
              compact
            />
            <Textarea
              label="Notes"
              value={i.notes ?? ""}
              onChange={(v) => update(i.id, "notes", v)}
              wide
            />
            <Input
              label="Next Action"
              value={i.nextAction ?? ""}
              onChange={(v) => update(i.id, "nextAction", v)}
              compact
            />
            <div className="flex items-end gap-2">
              <a
                href={buildWhatsAppUrl({
                  category: i.product,
                  company: i.company,
                  country: i.destination,
                })}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-white px-3 py-2 text-xs font-bold"
                style={{ color: BLUE }}
              >
                Reply
              </a>
              <DeleteButton
                onClick={() => {
                  const next = {
                    ...state,
                    inquiries: state.inquiries.filter((x) => x.id !== i.id),
                  };
                  setState(next);
                  void saveState(next);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <PrimarySave onClick={() => saveState()} />
    </Panel>
  );
}

function TestimonialsManager({ state, setState, saveState }: ManagerProps) {
  const update = (id: string, key: keyof AdminTestimonial, value: string) =>
    setState({
      ...state,
      testimonials: state.testimonials.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    });
  return (
    <Panel
      title="Testimonials"
      icon={Star}
      action={
        <AddButton
          label="Add Review"
          onClick={() => {
            const item: AdminTestimonial = {
              id: crypto.randomUUID(),
              name: "Buyer Name",
              company: "",
              country: "",
              quote: "",
              status: "Draft",
            };
            const next = { ...state, testimonials: [item, ...state.testimonials] };
            setState(next);
            void saveState(next);
          }}
        />
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {state.testimonials.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Name"
                value={item.name}
                onChange={(v) => update(item.id, "name", v)}
                compact
              />
              <Input
                label="Company"
                value={item.company}
                onChange={(v) => update(item.id, "company", v)}
                compact
              />
              <Input
                label="Country"
                value={item.country}
                onChange={(v) => update(item.id, "country", v)}
                compact
              />
              <Select
                label="Status"
                value={item.status}
                onChange={(v) => update(item.id, "status", v as PublishStatus)}
                options={statusOptions}
                compact
              />
              <Textarea
                label="Review"
                value={item.quote}
                onChange={(v) => update(item.id, "quote", v)}
                wide
              />
            </div>
            <div className="mt-3 text-right">
              <DeleteButton
                onClick={() => {
                  const next = {
                    ...state,
                    testimonials: state.testimonials.filter((x) => x.id !== item.id),
                  };
                  setState(next);
                  void saveState(next);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <PrimarySave onClick={() => saveState()} />
    </Panel>
  );
}

function TeamManager({ state, setState, saveState }: ManagerProps) {
  const update = (id: string, key: keyof AdminTeamMember, value: string) =>
    setState({
      ...state,
      team: state.team.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    });
  return (
    <Panel
      title="Team & Social Links"
      icon={Users}
      action={
        <AddButton
          label="Add Member"
          onClick={() => {
            const item: AdminTeamMember = {
              id: crypto.randomUUID(),
              name: "Team Member",
              role: "",
              linkedin: "",
              email: state.settings.email,
              phone: state.settings.phone,
              image: "",
              status: "Draft",
            };
            const next = { ...state, team: [item, ...state.team] };
            setState(next);
            void saveState(next);
          }}
        />
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {state.team.map((member) => (
          <div key={member.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Name"
                value={member.name}
                onChange={(v) => update(member.id, "name", v)}
                compact
              />
              <Input
                label="Role"
                value={member.role}
                onChange={(v) => update(member.id, "role", v)}
                compact
              />
              <Input
                label="Email"
                value={member.email}
                onChange={(v) => update(member.id, "email", v)}
                compact
              />
              <Input
                label="Phone"
                value={member.phone}
                onChange={(v) => update(member.id, "phone", v)}
                compact
              />
              <Input
                label="LinkedIn"
                value={member.linkedin}
                onChange={(v) => update(member.id, "linkedin", v)}
                compact
              />
              <Input
                label="Photo URL / path"
                value={member.image ?? ""}
                onChange={(v) => update(member.id, "image", v)}
                compact
              />
              <Select
                label="Status"
                value={member.status}
                onChange={(v) => update(member.id, "status", v as PublishStatus)}
                options={statusOptions}
                compact
              />
            </div>
            <div className="mt-3 flex justify-between">
              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold"
                  style={{ color: BLUE }}
                >
                  <Linkedin className="h-3 w-3" /> View LinkedIn
                </a>
              ) : (
                <span />
              )}
              <DeleteButton
                onClick={() => {
                  const next = { ...state, team: state.team.filter((x) => x.id !== member.id) };
                  setState(next);
                  void saveState(next);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <PrimarySave onClick={() => saveState()} />
    </Panel>
  );
}

function SettingsManager({
  state,
  setState,
  saveState,
  importJson,
}: ManagerProps & { importJson: (file: File) => void }) {
  const updateSettings = (key: keyof AdminState["settings"], value: string) =>
    setState({ ...state, settings: { ...state.settings, [key]: value } });
  const updateQuote = (key: keyof AdminState["quoteSettings"], value: string) =>
    setState({ ...state, quoteSettings: { ...state.quoteSettings, [key]: value } });
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr,360px]">
      <div className="space-y-6">
        <Panel title="Site Settings" icon={Settings}>
          <FormGrid>
            <Input
              label="Phone"
              value={state.settings.phone}
              onChange={(v) => updateSettings("phone", v)}
            />
            <Input
              label="Email"
              value={state.settings.email}
              onChange={(v) => updateSettings("email", v)}
            />
            <Input
              label="Google Analytics ID"
              value={state.settings.analyticsId}
              onChange={(v) => updateSettings("analyticsId", v)}
            />
            <Input
              label="Search Console Code"
              value={state.settings.searchConsole}
              onChange={(v) => updateSettings("searchConsole", v)}
            />
            <Textarea
              label="Homepage Notice"
              value={state.settings.homepageNotice}
              onChange={(v) => updateSettings("homepageNotice", v)}
              wide
            />
          </FormGrid>
          <PrimarySave onClick={() => saveState()} />
        </Panel>
        <Panel title="Quote System" icon={MessageCircle}>
          <FormGrid>
            <Input
              label="Email Subject"
              value={state.quoteSettings.emailSubject}
              onChange={(v) => updateQuote("emailSubject", v)}
            />
            <Input
              label="Required Fields"
              value={state.quoteSettings.requiredFields}
              onChange={(v) => updateQuote("requiredFields", v)}
            />
            <Textarea
              label="WhatsApp Template"
              value={state.quoteSettings.whatsappTemplate}
              onChange={(v) => updateQuote("whatsappTemplate", v)}
              wide
            />
            <Textarea
              label="Auto Reply Message"
              value={state.quoteSettings.autoReply}
              onChange={(v) => updateQuote("autoReply", v)}
              wide
            />
          </FormGrid>
          <PrimarySave onClick={() => saveState()} />
        </Panel>
      </div>
      <Panel title="Import / Export" icon={Upload}>
        <p className="text-sm leading-7 text-slate-600">
          Keep a content backup before making large updates. Importing a file will publish that
          content after passcode approval.
        </p>
        <label className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm font-bold text-slate-600 hover:border-[#0057B8]">
          <Upload className="h-5 w-5" /> Import JSON
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && void importJson(e.target.files[0])}
          />
        </label>
        <button
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            window.location.reload();
          }}
          className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700"
        >
          Reload Starter Content
        </button>
      </Panel>
    </div>
  );
}

function InquiryTable({
  inquiries,
  compact = false,
}: {
  inquiries: AdminInquiry[];
  compact?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="text-xs uppercase tracking-widest text-slate-500">
          <tr>
            <th className="py-3">Lead</th>
            <th>Product</th>
            <th>Destination</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {inquiries.slice(0, compact ? 5 : undefined).map((i) => (
            <tr key={i.id}>
              <td className="py-4">
                <div className="font-semibold text-slate-900">{i.buyer}</div>
                <div className="text-xs text-slate-500">{i.company}</div>
              </td>
              <td>{i.product}</td>
              <td>{i.destination}</td>
              <td>{i.quantity}</td>
              <td>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  {i.status}
                </span>
              </td>
              <td>
                <a
                  href={buildWhatsAppUrl({
                    category: i.product,
                    company: i.company,
                    country: i.destination,
                  })}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold"
                  style={{ color: BLUE }}
                >
                  <Link2 className="h-3 w-3" /> Reply
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type ManagerProps = {
  state: AdminState;
  setState: (s: AdminState) => void;
  saveState: SaveState;
};

type QueryManagerProps = ManagerProps & { query: string };

function EditorLayout({
  title,
  icon: Icon,
  action,
  list,
  children,
}: {
  title: string;
  icon: ElementType;
  action?: ReactNode;
  list: ReactNode[];
  children: ReactNode;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
      <Panel title={title} icon={Icon} action={action}>
        <div className="max-h-[68vh] space-y-2 overflow-auto pr-1">
          {list.length ? list : <EmptyState text="No matching content found." />}
        </div>
      </Panel>
      {children}
    </div>
  );
}

function Panel({
  title,
  icon: Icon,
  action,
  children,
}: {
  title: string;
  icon: ElementType;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-xl"
            style={{ background: `${BLUE}12`, color: BLUE }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="font-display text-lg font-bold text-slate-950">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function EditableRows<T>({ rows, render }: { rows: T[]; render: (row: T) => ReactNode }) {
  return (
    <div className="grid gap-4">
      {rows.length ? rows.map(render) : <EmptyState text="Nothing to show yet." />}
    </div>
  );
}

function ListItem({
  title,
  meta,
  active,
  onClick,
}: {
  title: string;
  meta: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border p-3 text-left transition ${active ? "border-[#0057B8] bg-blue-50" : "border-slate-200 bg-slate-50 hover:bg-white"}`}
    >
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-xs text-slate-500">{meta}</div>
    </button>
  );
}

function FormGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Input({
  label,
  value,
  onChange,
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  compact?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      <span className="mb-1.5 block">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-[#0057B8] ${compact ? "py-2" : "py-2.5"}`}
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  compact?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      <span className="mb-1.5 block">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-[#0057B8] ${compact ? "py-2" : "py-2.5"}`}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  wide = false,
  tall = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  wide?: boolean;
  tall?: boolean;
}) {
  return (
    <label
      className={`block text-sm font-semibold text-slate-700 ${wide ? "md:col-span-2 xl:col-span-4" : ""}`}
    >
      <span className="mb-1.5 block">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#0057B8] ${tall ? "min-h-72" : "min-h-28"}`}
      />
    </label>
  );
}

function ImageUploadButton({ onUpload }: { onUpload: (image: string) => void }) {
  const [busy, setBusy] = useState(false);

  const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Please choose an image file.");
      return;
    }

    setBusy(true);
    try {
      onUpload(await resizeImageFile(file));
    } catch {
      window.alert("Could not upload this image. Please try another JPG, PNG or WebP file.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <label className="relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5">
      <span
        className="absolute inset-0 -z-10"
        style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
      />
      <Upload className="h-4 w-4" />
      {busy ? "Preparing..." : "Upload Image"}
      <input type="file" accept="image/*" className="sr-only" onChange={onFile} disabled={busy} />
    </label>
  );
}

function resizeImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not load image"));
      img.onload = () => {
        const maxWidth = 1200;
        const scale = Math.min(1, maxWidth / img.width);
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not prepare image"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function PreviewCard({
  title,
  status,
  image,
  cta,
  onDelete,
}: {
  title: string;
  status: string;
  image: string;
  cta: string;
  onDelete: () => void;
}) {
  return (
    <Panel title="Live Preview" icon={Globe2} action={<DeleteButton onClick={onDelete} />}>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        {image ? (
          <img src={image} alt={title} className="aspect-[4/3] w-full object-cover" />
        ) : (
          <div className="grid aspect-[4/3] place-items-center text-slate-400">
            <Package className="h-14 w-14" />
          </div>
        )}
        <div className="p-5">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
            {status}
          </span>
          <h3 className="mt-4 font-display text-2xl font-bold text-slate-950">{title}</h3>
          <button
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white"
            style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}
          >
            {cta}
          </button>
        </div>
      </div>
    </Panel>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white"
      style={{ background: ORANGE }}
    >
      <Plus className="h-4 w-4" /> {label}
    </button>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-grid h-10 w-10 place-items-center rounded-xl border border-red-100 bg-red-50 text-red-600"
      aria-label="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

function PrimarySave({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
      style={{ background: BLUE }}
    >
      <Save className="h-4 w-4" /> Save Live
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm font-semibold text-slate-500">
      {text}
    </div>
  );
}

function matchesQuery(query: string, ...values: string[]) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return values.join(" ").toLowerCase().includes(needle);
}
