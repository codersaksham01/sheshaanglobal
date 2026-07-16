import { useEffect, useState, useCallback } from "react";
import { Globe, X, Check } from "lucide-react";

export type Lang = {
  code: string;
  name: string;
  native: string;
  flag: string;
};

export const LANGUAGES: Lang[] = [
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦" },
  { code: "zh-CN", name: "Chinese", native: "中文", flag: "🇨🇳" },
  { code: "nl", name: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "id", name: "Indonesian", native: "Bahasa", flag: "🇮🇩" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
];

const STORAGE_KEY = "sg_lang_v1";
const SEEN_KEY = "sg_lang_seen_v1";
const LANG_CODES = LANGUAGES.map((l) => l.code).join(",");

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate?: { TranslateElement: new (opts: object, id: string) => void } };
  }
}

function setGoogTransCookie(code: string) {
  if (typeof document === "undefined") return;
  const value = `/en/${code}`;
  const host = window.location.hostname;
  const rootDomain = host.split(".").slice(-2).join(".");
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${host}`;
  if (rootDomain !== host) {
    document.cookie = `googtrans=${value};path=/;domain=.${rootDomain}`;
  }
}

function clearGoogTransCookie() {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const rootDomain = host.split(".").slice(-2).join(".");
  const expire = "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie = `googtrans=${expire}`;
  document.cookie = `googtrans=${expire}; domain=${host}`;
  document.cookie = `googtrans=${expire}; domain=.${rootDomain}`;
}

function injectGoogleTranslate() {
  if (typeof window === "undefined") return;
  if (document.getElementById("google-translate-script")) return;

  window.googleTranslateElementInit = function () {
    if (window.google?.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANG_CODES,
          autoDisplay: false,
        },
        "google_translate_element",
      );
    }
  };
  const s = document.createElement("script");
  s.id = "google-translate-script";
  s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [current, setCurrent] = useState<string>("en");
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    injectGoogleTranslate();

    const stored = localStorage.getItem(STORAGE_KEY);
    const seen = localStorage.getItem(SEEN_KEY);
    if (stored) setCurrent(stored);

    // Apply stored language on load (in case cookie was cleared)
    if (stored && stored !== "en") {
      const cookieHas = document.cookie.includes(`googtrans=/en/${stored}`);
      if (!cookieHas) {
        setGoogTransCookie(stored);
      }
    }

    if (!seen) {
      const t = setTimeout(() => {
        setFirstTime(true);
        setOpen(true);
      }, 900);
      return () => clearTimeout(t);
    }
  }, []);

  // Compact mode after user scrolls — shrinks to icon-only to avoid content overlap
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setCompact(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pick = useCallback((code: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
      localStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setCurrent(code);
    setOpen(false);
    setFirstTime(false);
    if (code === "en") {
      clearGoogTransCookie();
    } else {
      setGoogTransCookie(code);
    }
    setTimeout(() => window.location.reload(), 100);
  }, []);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setOpen(false);
    setFirstTime(false);
  }, []);

  const activeLang = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0];

  return (
    <>
      {/* Hidden Google Translate mount point */}
      <div id="google_translate_element" style={{ position: "absolute", left: "-9999px", top: 0 }} aria-hidden="true" />
      <style>{`
        .goog-te-banner-frame, .skiptranslate { display: none !important; }
        body { top: 0 !important; }
        #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
        .goog-text-highlight { background: transparent !important; box-shadow: none !important; }
      `}</style>

      {/*
        Floating language pill.
        - Sits at bottom-right, ABOVE the MessageFab (which uses bottom-6 z-50).
        - Uses safe-area-inset for iOS notch / home indicator.
        - Shrinks to icon-only after scroll to avoid overlapping content on small screens.
        - z-[55] keeps it under the modal (z-[100]) but visible above the FAB stack.
      */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Change language — current: ${activeLang.name}`}
        title={`Language: ${activeLang.name}`}
        className={`notranslate fixed z-[55] inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 font-semibold text-slate-700 shadow-lg backdrop-blur transition-all hover:border-[#0057B8] hover:text-[#0057B8] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0057B8]/30 ${
          compact ? "h-10 w-10 justify-center p-0" : "px-3 py-2 text-xs"
        }`}
        style={{
          right: "max(1rem, env(safe-area-inset-right))",
          bottom: `calc(max(1.25rem, env(safe-area-inset-bottom)) + 4.5rem)`,
        }}
        translate="no"
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden />
        {!compact && (
          <>
            <span className="text-base leading-none">{activeLang.flag}</span>
            <span className="hidden sm:inline">{activeLang.native}</span>
          </>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lang-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm notranslate"
          translate="no"
          onClick={dismiss}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative px-6 pt-6 pb-4" style={{ background: "linear-gradient(135deg,#0057B8,#003c85)" }}>
              <div className="flex items-center gap-3 text-white">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h2 id="lang-modal-title" className="font-bold text-lg leading-tight">
                    {firstTime ? "Welcome to Sheshaan Global" : "Choose your language"}
                  </h2>
                  <p className="text-xs text-white/85">
                    {firstTime
                      ? "Select your language — we'll remember it for next time."
                      : "Your choice is saved on this device."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {LANGUAGES.map((l) => {
                  const active = l.code === current;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => pick(l.code)}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all ${
                        active
                          ? "border-[#0057B8] bg-[#0057B8]/5"
                          : "border-slate-200 bg-white hover:border-[#0057B8]/40 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-2xl leading-none">{l.flag}</span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-slate-900">{l.native}</span>
                        <span className="block text-[11px] text-slate-500">{l.name}</span>
                      </span>
                      {active && <Check className="h-4 w-4 text-[#0057B8]" />}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 px-1 text-[10px] leading-relaxed text-slate-400">
                Translations are provided by Google Translate for convenience. For contractual matters the English original prevails.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
