import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ElementType, type ReactNode } from "react";
import {
  ArrowDownToLine, ArrowLeft, BarChart3, BookOpen, CheckCircle2, FileBadge2,
  FileSearch, Globe2, LayoutDashboard, Link2, Lock, LogOut, Mail, MessageCircle,
  Package, Pencil, Plus, Save, Search, Settings, ShieldCheck, Trash2, Upload,
} from "lucide-react";
import logo from "@/assets/logo.png";
import {
  BLUE, EMAIL, NAVY, ORANGE, REGIONS, buildWhatsAppUrl,
} from "@/lib/site";
import { defaultAdminState, type AdminBlog, type AdminCertificate, type AdminInquiry, type AdminProduct, type AdminSeo, type AdminState } from "@/lib/admin-content";

type Tab = "dashboard" | "products" | "blogs" | "seo" | "certificates" | "inquiries" | "settings";

const STORAGE_KEY = "sheshaan-admin-portal-v1";
const PIN_KEY = "sheshaan-admin-passcode";

const tabs: { id: Tab; label: string; icon: ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "blogs", label: "Blogs", icon: BookOpen },
  { id: "seo", label: "SEO Pages", icon: FileSearch },
  { id: "certificates", label: "Certificates", icon: FileBadge2 },
  { id: "inquiries", label: "Inquiries", icon: Mail },
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

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AdminState;
        setState(parsed);
        setSelectedProduct(parsed.products[0] ?? defaultAdminState.products[0]);
        setSelectedBlog(parsed.blogs[0] ?? defaultAdminState.blogs[0]);
        setSelectedSeo(parsed.seoPages[0] ?? defaultAdminState.seoPages[0]);
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
      .then((res) => res.ok ? res.json() : Promise.reject(new Error("Live content unavailable")))
      .then((payload: { content?: AdminState | null }) => {
        if (!payload.content) {
          setLiveStatus("Using starter content. Save once to publish live data.");
          return;
        }
        setState(payload.content);
        setSelectedProduct(payload.content.products[0] ?? defaultAdminState.products[0]);
        setSelectedBlog(payload.content.blogs[0] ?? defaultAdminState.blogs[0]);
        setSelectedSeo(payload.content.seoPages[0] ?? defaultAdminState.seoPages[0]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.content));
        setLiveStatus("Live content loaded.");
      })
      .catch(() => setLiveStatus("Live store not connected yet. Local backup is still available."));
  }, []);

  const metrics = useMemo(() => [
    { label: "Products", value: state.products.length, change: "Manage HS codes, packing and status", icon: Package },
    { label: "Blog Posts", value: state.blogs.length, change: "Guides that bring search traffic", icon: BookOpen },
    { label: "SEO Pages", value: state.seoPages.length, change: "High-intent landing pages", icon: FileSearch },
    { label: "Open Inquiries", value: state.inquiries.filter((i) => i.status !== "Closed").length, change: "Leads needing follow-up", icon: MessageCircle },
  ], [state]);

  const saveState = async (next = state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setLiveStatus("Publishing changes...");
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-admin-passcode": pin,
        },
        body: JSON.stringify(next),
      });
      if (!response.ok) throw new Error(await response.text());
      setSaved(true);
      setLiveStatus("Published live.");
      window.setTimeout(() => setSaved(false), 1600);
    } catch {
      setLiveStatus("Could not publish live. Check Cloudflare KV and admin passcode.");
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
    const parsed = JSON.parse(await file.text()) as AdminState;
    setState(parsed);
    setSelectedProduct(parsed.products[0] ?? defaultAdminState.products[0]);
    setSelectedBlog(parsed.blogs[0] ?? defaultAdminState.blogs[0]);
    setSelectedSeo(parsed.seoPages[0] ?? defaultAdminState.seoPages[0]);
    saveState(parsed);
  };

  if (!unlocked) {
    return (
      <main className="grid min-h-screen place-items-center bg-[linear-gradient(135deg,#04152d,#06356d)] px-5 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur">
          <img src={logo} alt="Sheshaan Global" className="h-16 w-16 object-contain" />
          <h1 className="mt-5 font-display text-3xl font-bold">Admin Portal</h1>
          <p className="mt-2 text-sm leading-7 text-white/70">Manage products, blogs, SEO pages, certificates, inquiries and website settings.</p>
          <label className="mt-6 block text-sm font-semibold">
            Access passcode
            <input value={pin} onChange={(e) => setPin(e.target.value)} type="password" placeholder="Enter passcode" className="mt-2 w-full rounded-xl border border-white/20 bg-white/95 px-4 py-3 text-slate-900 outline-none focus:ring-4 focus:ring-white/20" />
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
          <p className="mt-4 text-xs text-white/50">Use the passcode from your Cloudflare environment variable to publish live changes.</p>
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
            <div className="font-display text-lg font-bold" style={{ color: BLUE }}>SHESHAAN</div>
            <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ORANGE }}>Admin Control</div>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          {tabs.map((item) => <NavButton key={item.id} item={item} active={tab === item.id} onClick={() => setTab(item.id)} />)}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 p-4">
          <Link to="/" className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <ArrowLeft className="h-4 w-4" /> View Website
          </Link>
        </div>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex min-h-20 flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Sheshaan Global</div>
              <h1 className="font-display text-2xl font-bold text-slate-950">Website Management Portal</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search content" className="w-52 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#0057B8]" />
              </label>
              <button onClick={() => saveState()} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow" style={{ background: BLUE }}>
                <Save className="h-4 w-4" /> {saved ? "Saved" : "Save"}
              </button>
              <button onClick={exportJson} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700">
                <ArrowDownToLine className="h-4 w-4" /> Export
              </button>
              <button onClick={() => { localStorage.removeItem(PIN_KEY); setUnlocked(false); }} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600" aria-label="Logout">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 text-xs font-semibold text-slate-500">{liveStatus}</div>
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-slate-100 bg-white px-5 py-3 lg:hidden">
            {tabs.map((item) => <NavButton key={item.id} item={item} active={tab === item.id} onClick={() => setTab(item.id)} compact />)}
          </div>
        </header>

        <div className="p-5 lg:p-8">
          {tab === "dashboard" && <Dashboard metrics={metrics} state={state} setTab={setTab} />}
          {tab === "products" && (
            <ProductsManager
              query={query}
              products={state.products}
              selected={selectedProduct}
              onSelect={setSelectedProduct}
              onAdd={() => {
                const item: AdminProduct = { id: crypto.randomUUID(), name: "New Product", slug: "new-product", hsCode: "", group: "Fresh Produce", status: "Draft", image: "", description: "", packing: "", standards: "" };
                const next = { ...state, products: [item, ...state.products] };
                setState(next); setSelectedProduct(item); saveState(next);
              }}
              onDelete={(id) => {
                const next = { ...state, products: state.products.filter((p) => p.id !== id) };
                setState(next); setSelectedProduct(next.products[0] ?? defaultAdminState.products[0]); saveState(next);
              }}
              onChange={(item) => {
                const next = { ...state, products: state.products.map((p) => p.id === item.id ? item : p) };
                setState(next); setSelectedProduct(item);
              }}
            />
          )}
          {tab === "blogs" && <BlogsManager query={query} state={state} setState={setState} selected={selectedBlog} setSelected={setSelectedBlog} saveState={saveState} />}
          {tab === "seo" && <SeoManager query={query} state={state} setState={setState} selected={selectedSeo} setSelected={setSelectedSeo} saveState={saveState} />}
          {tab === "certificates" && <CertificatesManager state={state} setState={setState} saveState={saveState} />}
          {tab === "inquiries" && <InquiriesManager state={state} setState={setState} saveState={saveState} />}
          {tab === "settings" && <SettingsManager state={state} setState={setState} saveState={saveState} importJson={importJson} />}
        </div>
      </section>
    </main>
  );
}

function NavButton({ item, active, onClick, compact = false }: { item: { id: Tab; label: string; icon: ElementType }; active: boolean; onClick: () => void; compact?: boolean }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${compact ? "shrink-0" : "w-full"} ${active ? "text-white shadow" : "text-slate-600 hover:bg-slate-50"}`} style={active ? { background: `linear-gradient(135deg,${BLUE},#003c85)` } : undefined}>
      <item.icon className="h-4 w-4" /> {item.label}
    </button>
  );
}

function Dashboard({ metrics, state, setTab }: { metrics: { label: string; value: number; change: string; icon: ElementType }[]; state: AdminState; setTab: (tab: Tab) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-500">{m.label}</div>
              <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: `${BLUE}12`, color: BLUE }}><m.icon className="h-5 w-5" /></div>
            </div>
            <div className="mt-4 font-display text-3xl font-bold text-slate-950">{m.value}</div>
            <div className="mt-1 text-xs text-slate-500">{m.change}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Panel title="Priority Actions" icon={BarChart3}>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Add product", "Publish a new export line", "products"],
              ["Write blog", "Capture importer searches", "blogs"],
              ["Create SEO page", "Target a buyer keyword", "seo"],
              ["Review inquiries", "Follow up active leads", "inquiries"],
            ].map(([title, desc, target]) => (
              <button key={title} onClick={() => setTab(target as Tab)} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left hover:border-[#0057B8] hover:bg-white">
                <div className="font-semibold text-slate-900">{title}</div>
                <div className="mt-1 text-xs text-slate-500">{desc}</div>
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="Publishing Health" icon={ShieldCheck}>
          <div className="space-y-3">
            {["Analytics tag configured", "Sitemap includes public content", "Quote CTA live", "Certificates available"].map((x) => (
              <div key={x} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
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

function ProductsManager(props: {
  query: string; products: AdminProduct[]; selected: AdminProduct; onSelect: (p: AdminProduct) => void;
  onChange: (p: AdminProduct) => void; onAdd: () => void; onDelete: (id: string) => void;
}) {
  const products = props.products.filter((p) => `${p.name} ${p.slug} ${p.hsCode}`.toLowerCase().includes(props.query.toLowerCase()));
  return (
    <EditorLayout
      title="Products"
      icon={Package}
      action={<button onClick={props.onAdd} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white" style={{ background: ORANGE }}><Plus className="h-4 w-4" /> Add Product</button>}
      list={products.map((p) => <ListItem key={p.id} active={p.id === props.selected.id} title={p.name} meta={`HS ${p.hsCode || "-"} - ${p.status}`} onClick={() => props.onSelect(p)} />)}
    >
      <ProductEditor item={props.selected} onChange={props.onChange} onDelete={() => props.onDelete(props.selected.id)} />
    </EditorLayout>
  );
}

function ProductEditor({ item, onChange, onDelete }: { item: AdminProduct; onChange: (p: AdminProduct) => void; onDelete: () => void }) {
  const update = (key: keyof AdminProduct, value: string) => onChange({ ...item, [key]: value });
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr,320px]">
      <Panel title="Product Details" icon={Pencil}>
        <FormGrid>
          <Input label="Title" value={item.name} onChange={(v) => update("name", v)} />
          <Input label="Slug" value={item.slug} onChange={(v) => update("slug", v)} />
          <Input label="HS Code" value={item.hsCode} onChange={(v) => update("hsCode", v)} />
          <Input label="Category" value={item.group} onChange={(v) => update("group", v)} />
          <Select label="Status" value={item.status} onChange={(v) => update("status", v)} options={["Published", "Draft"]} />
          <Input label="Image URL / path" value={item.image} onChange={(v) => update("image", v)} />
          <Textarea label="Description" value={item.description} onChange={(v) => update("description", v)} wide />
          <Textarea label="Packing Options" value={item.packing} onChange={(v) => update("packing", v)} wide />
          <Textarea label="Standards" value={item.standards} onChange={(v) => update("standards", v)} wide />
        </FormGrid>
      </Panel>
      <PreviewCard title={item.name} status={item.status} image={item.image} cta="Preview product" onDelete={onDelete} />
    </div>
  );
}

function BlogsManager({ query, state, setState, selected, setSelected, saveState }: { query: string; state: AdminState; setState: (s: AdminState) => void; selected: AdminBlog; setSelected: (b: AdminBlog) => void; saveState: (s?: AdminState) => void | Promise<void> }) {
  const items = state.blogs.filter((b) => `${b.title} ${b.category}`.toLowerCase().includes(query.toLowerCase()));
  const change = (blog: AdminBlog) => { const next = { ...state, blogs: state.blogs.map((b) => b.id === blog.id ? blog : b) }; setState(next); setSelected(blog); };
  return (
    <EditorLayout
      title="Blogs"
      icon={BookOpen}
      action={<button onClick={() => { const item: AdminBlog = { id: crypto.randomUUID(), title: "New Blog Post", slug: "new-blog-post", category: "Export Guide", status: "Draft", description: "", body: "" }; const next = { ...state, blogs: [item, ...state.blogs] }; setState(next); setSelected(item); saveState(next); }} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white" style={{ background: ORANGE }}><Plus className="h-4 w-4" /> Add Blog</button>}
      list={items.map((b) => <ListItem key={b.id} active={b.id === selected.id} title={b.title} meta={`${b.category} - ${b.status}`} onClick={() => setSelected(b)} />)}
    >
      <Panel title="Blog Editor" icon={Pencil}>
        <FormGrid>
          <Input label="Title" value={selected.title} onChange={(v) => change({ ...selected, title: v })} />
          <Input label="Slug" value={selected.slug} onChange={(v) => change({ ...selected, slug: v })} />
          <Input label="Category" value={selected.category} onChange={(v) => change({ ...selected, category: v })} />
          <Select label="Status" value={selected.status} onChange={(v) => change({ ...selected, status: v as AdminBlog["status"] })} options={["Published", "Draft"]} />
          <Textarea label="Meta Description" value={selected.description} onChange={(v) => change({ ...selected, description: v })} wide />
          <Textarea label="Article Body" value={selected.body} onChange={(v) => change({ ...selected, body: v })} wide tall />
        </FormGrid>
      </Panel>
    </EditorLayout>
  );
}

function SeoManager({ query, state, setState, selected, setSelected, saveState }: { query: string; state: AdminState; setState: (s: AdminState) => void; selected: AdminSeo; setSelected: (b: AdminSeo) => void; saveState: (s?: AdminState) => void | Promise<void> }) {
  const items = state.seoPages.filter((b) => `${b.title} ${b.keyword}`.toLowerCase().includes(query.toLowerCase()));
  const change = (page: AdminSeo) => { const next = { ...state, seoPages: state.seoPages.map((b) => b.id === page.id ? page : b) }; setState(next); setSelected(page); };
  return (
    <EditorLayout
      title="SEO Landing Pages"
      icon={FileSearch}
      action={<button onClick={() => { const item: AdminSeo = { id: crypto.randomUUID(), title: "New Landing Page", slug: "new-landing-page", keyword: "target keyword", status: "Draft", description: "" }; const next = { ...state, seoPages: [item, ...state.seoPages] }; setState(next); setSelected(item); saveState(next); }} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white" style={{ background: ORANGE }}><Plus className="h-4 w-4" /> Add SEO Page</button>}
      list={items.map((b) => <ListItem key={b.id} active={b.id === selected.id} title={b.keyword} meta={`${b.slug} - ${b.status}`} onClick={() => setSelected(b)} />)}
    >
      <Panel title="SEO Page Editor" icon={FileSearch}>
        <FormGrid>
          <Input label="Page Title" value={selected.title} onChange={(v) => change({ ...selected, title: v })} />
          <Input label="Slug" value={selected.slug} onChange={(v) => change({ ...selected, slug: v })} />
          <Input label="Target Keyword" value={selected.keyword} onChange={(v) => change({ ...selected, keyword: v })} />
          <Select label="Status" value={selected.status} onChange={(v) => change({ ...selected, status: v as AdminSeo["status"] })} options={["Published", "Draft"]} />
          <Textarea label="Meta Description" value={selected.description} onChange={(v) => change({ ...selected, description: v })} wide />
        </FormGrid>
      </Panel>
    </EditorLayout>
  );
}

function CertificatesManager({ state, setState, saveState }: { state: AdminState; setState: (s: AdminState) => void; saveState: (s?: AdminState) => void | Promise<void> }) {
  const update = (id: string, key: keyof AdminCertificate, value: string) => {
    const next = { ...state, certificates: state.certificates.map((c) => c.id === id ? { ...c, [key]: value } : c) };
    setState(next);
  };
  return (
    <Panel title="Certificates" icon={FileBadge2} action={<button onClick={() => { const item: AdminCertificate = { id: crypto.randomUUID(), name: "New Certificate", type: "Quality", issuer: "", file: "", status: "Draft" }; const next = { ...state, certificates: [item, ...state.certificates] }; setState(next); saveState(next); }} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white" style={{ background: ORANGE }}><Plus className="h-4 w-4" /> Add Certificate</button>}>
      <div className="grid gap-4">
        {state.certificates.map((c) => (
          <div key={c.id} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr,1fr,1fr,auto]">
            <input value={c.name} onChange={(e) => update(c.id, "name", e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
            <input value={c.issuer} onChange={(e) => update(c.id, "issuer", e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
            <input value={c.file} onChange={(e) => update(c.id, "file", e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
            <select value={c.status} onChange={(e) => update(c.id, "status", e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"><option>Published</option><option>Draft</option></select>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function InquiriesManager({ state, setState, saveState }: { state: AdminState; setState: (s: AdminState) => void; saveState: (s?: AdminState) => void | Promise<void> }) {
  const update = (id: string, status: AdminInquiry["status"]) => {
    const next = { ...state, inquiries: state.inquiries.map((i) => i.id === id ? { ...i, status } : i) };
    setState(next); saveState(next);
  };
  return (
    <Panel title="Inquiry Pipeline" icon={MessageCircle}>
      <InquiryTable inquiries={state.inquiries} onStatus={update} />
    </Panel>
  );
}

function SettingsManager({ state, setState, saveState, importJson }: { state: AdminState; setState: (s: AdminState) => void; saveState: (s?: AdminState) => void | Promise<void>; importJson: (file: File) => void }) {
  const update = (key: keyof AdminState["settings"], value: string) => setState({ ...state, settings: { ...state.settings, [key]: value } });
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr,360px]">
      <Panel title="Site Settings" icon={Settings}>
        <FormGrid>
          <Input label="Phone" value={state.settings.phone} onChange={(v) => update("phone", v)} />
          <Input label="Email" value={state.settings.email} onChange={(v) => update("email", v)} />
          <Input label="Google Analytics ID" value={state.settings.analyticsId} onChange={(v) => update("analyticsId", v)} />
          <Input label="Search Console Code" value={state.settings.searchConsole} onChange={(v) => update("searchConsole", v)} />
          <Textarea label="Homepage Notice" value={state.settings.homepageNotice} onChange={(v) => update("homepageNotice", v)} wide />
        </FormGrid>
        <button onClick={() => saveState()} className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white" style={{ background: BLUE }}><Save className="h-4 w-4" /> Save Settings</button>
      </Panel>
      <Panel title="Import / Export" icon={Upload}>
        <p className="text-sm leading-7 text-slate-600">Use JSON export as a clean handoff file for updating website source content or migrating to a real backend database later.</p>
        <label className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm font-bold text-slate-600 hover:border-[#0057B8]">
          <Upload className="h-5 w-5" /> Import JSON
          <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
        </label>
      </Panel>
    </div>
  );
}

function InquiryTable({ inquiries, compact = false, onStatus }: { inquiries: AdminInquiry[]; compact?: boolean; onStatus?: (id: string, status: AdminInquiry["status"]) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="text-xs uppercase tracking-widest text-slate-500">
          <tr><th className="py-3">Lead</th><th>Product</th><th>Destination</th><th>Quantity</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {inquiries.slice(0, compact ? 5 : undefined).map((i) => (
            <tr key={i.id}>
              <td className="py-4"><div className="font-semibold text-slate-900">{i.buyer}</div><div className="text-xs text-slate-500">{i.company}</div></td>
              <td>{i.product}</td><td>{i.destination}</td><td>{i.quantity}</td>
              <td><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{i.status}</span></td>
              <td>{onStatus ? <select value={i.status} onChange={(e) => onStatus(i.id, e.target.value as AdminInquiry["status"])} className="rounded-lg border border-slate-200 px-2 py-1 text-xs"><option>New</option><option>Quoted</option><option>Follow-up</option><option>Closed</option></select> : <a href={buildWhatsAppUrl({ category: i.product, company: i.company, country: i.destination })} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: BLUE }}><Link2 className="h-3 w-3" /> Reply</a>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EditorLayout({ title, icon: Icon, action, list, children }: { title: string; icon: ElementType; action?: ReactNode; list: ReactNode[]; children: ReactNode }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
      <Panel title={title} icon={Icon} action={action}>
        <div className="max-h-[68vh] space-y-2 overflow-auto pr-1">{list}</div>
      </Panel>
      {children}
    </div>
  );
}

function Panel({ title, icon: Icon, action, children }: { title: string; icon: ElementType; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: `${BLUE}12`, color: BLUE }}><Icon className="h-5 w-5" /></div>
          <h2 className="font-display text-lg font-bold text-slate-950">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function ListItem({ title, meta, active, onClick }: { title: string; meta: string; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`w-full rounded-xl border p-3 text-left transition ${active ? "border-[#0057B8] bg-blue-50" : "border-slate-200 bg-slate-50 hover:bg-white"}`}><div className="font-semibold text-slate-900">{title}</div><div className="mt-1 text-xs text-slate-500">{meta}</div></button>;
}

function FormGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <label className="block text-sm font-semibold text-slate-700"><span className="mb-1.5 block">{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#0057B8]" /></label>;
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return <label className="block text-sm font-semibold text-slate-700"><span className="mb-1.5 block">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#0057B8]">{options.map((o) => <option key={o}>{o}</option>)}</select></label>;
}

function Textarea({ label, value, onChange, wide = false, tall = false }: { label: string; value: string; onChange: (v: string) => void; wide?: boolean; tall?: boolean }) {
  return <label className={`block text-sm font-semibold text-slate-700 ${wide ? "md:col-span-2" : ""}`}><span className="mb-1.5 block">{label}</span><textarea value={value} onChange={(e) => onChange(e.target.value)} className={`w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#0057B8] ${tall ? "min-h-72" : "min-h-28"}`} /></label>;
}

function PreviewCard({ title, status, image, cta, onDelete }: { title: string; status: string; image: string; cta: string; onDelete: () => void }) {
  return (
    <Panel title="Live Preview" icon={Globe2} action={<button onClick={onDelete} className="grid h-10 w-10 place-items-center rounded-xl border border-red-100 bg-red-50 text-red-600" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>}>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        {image ? <img src={image} alt={title} className="aspect-[4/3] w-full object-cover" /> : <div className="grid aspect-[4/3] place-items-center text-slate-400"><Package className="h-14 w-14" /></div>}
        <div className="p-5">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">{status}</span>
          <h3 className="mt-4 font-display text-2xl font-bold text-slate-950">{title}</h3>
          <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white" style={{ background: `linear-gradient(135deg,${BLUE},#003c85)` }}>{cta}</button>
        </div>
      </div>
    </Panel>
  );
}
