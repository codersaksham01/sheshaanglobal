import { useEffect, useState } from "react";

const POPUP_DISMISSED_KEY = "sheshaan-anuga-popup-dismissed";

function isPageRefresh() {
  const navigationEntry = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming;

  return navigationEntry?.type === "reload";
}

export function VisitPopup() {
  // Automatic on-load interstitial disabled to comply with Google Page Experience & Core Web Vitals
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const closePopup = () => {
    sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-5"
      role="dialog"
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-white/20">
        <button
          aria-label="Close popup"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-2xl font-semibold leading-none text-slate-900 shadow-lg ring-1 ring-slate-200 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          onClick={closePopup}
          type="button"
        >
          X
        </button>
        <img
          alt="Sheshaan Global at Anuga Select India 2026 Mumbai"
          className="block max-h-[88vh] w-full object-contain"
          src="/anuga-2026-popup.png"
        />
      </div>
    </div>
  );
}
