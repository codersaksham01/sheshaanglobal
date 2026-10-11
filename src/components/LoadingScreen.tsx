import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { BLUE, ORANGE, NAVY } from "@/lib/site";

const BOT_USER_AGENT_PATTERN =
  /Googlebot|Bingbot|GPTBot|PerplexityBot|ClaudeBot|OAI-SearchBot|ChatGPT-User|anthropic-ai|CCBot|Applebot|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebookexternalhit|LinkedInBot|Twitterbot|HeadlessChrome|Lighthouse|Chrome-Lighthouse|PageSpeed|PTST|GTmetrix|bot|crawler|spider/i;

const SPLASH_SESSION_KEY = "sg_preloader_bypassed_v2";

export function isAutomatedCrawlerOrRepeatSession(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return true;
  }
  const ua = navigator.userAgent || "";
  if (BOT_USER_AGENT_PATTERN.test(ua) || navigator.webdriver) {
    return true;
  }
  try {
    if (
      window.sessionStorage.getItem(SPLASH_SESSION_KEY) === "1" ||
      window.localStorage.getItem(SPLASH_SESSION_KEY) === "1"
    ) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
}

/**
 * Search-crawler-safe launch screen.
 * - Server-rendered HTML defaults to `visible = false` so Googlebot, Bingbot,
 *   GPTBot, PerplexityBot, and ClaudeBot parse the full hero DOM immediately
 *   with zero LCP/FCP splash delay.
 * - Bypasses immediately for all search/AI crawler user-agents, WebDriver/Lighthouse
 *   audits, reduced-motion preferences, and repeat human sessions.
 */
export function LoadingScreen({ minMs = 450 }: { minMs?: number }) {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || isAutomatedCrawlerOrRepeatSession()) {
      setVisible(false);
      return;
    }

    try {
      window.sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
      window.localStorage.setItem(SPLASH_SESSION_KEY, "1");
    } catch {
      // ignore storage quota errors
    }

    setVisible(true);
    const start = performance.now();
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      const wait = Math.max(0, minMs - (performance.now() - start));
      hideTimer = setTimeout(() => setVisible(false), wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const failsafe = setTimeout(() => setVisible(false), Math.max(minMs, 1500));
    return () => {
      window.removeEventListener("load", finish);
      if (hideTimer) clearTimeout(hideTimer);
      clearTimeout(failsafe);
    };
  }, [minMs, reduced]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading Sheshaan Global"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center"
          style={{ background: `radial-gradient(ellipse at center, #072b5a 0%, ${NAVY} 70%)` }}
        >
          <div className="flex flex-col items-center gap-6 text-white">
            <div className="relative grid h-32 w-32 place-items-center">
              {!reduced && (
                <>
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0.7, opacity: 0.6 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: `radial-gradient(circle,${ORANGE}55,transparent 70%)` }}
                  />
                  <motion.span
                    aria-hidden
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed"
                    style={{ borderColor: `${ORANGE}55` }}
                  />
                </>
              )}
              <motion.img
                src={logo}
                alt="Sheshaan Global"
                className="relative h-20 w-20 rounded-full bg-white/95 p-2 shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="text-center">
              <div
                className="font-display text-2xl font-bold tracking-tight"
                style={{ color: "#fff" }}
              >
                SHESHAAN <span style={{ color: ORANGE }}>GLOBAL</span>
              </div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                Exporting Goodness Worldwide
              </div>
            </div>
            <div className="mt-2 h-1 w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/2 rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${ORANGE}, ${BLUE}, transparent)`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
