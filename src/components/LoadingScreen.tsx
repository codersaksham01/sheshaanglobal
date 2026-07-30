import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { BLUE, ORANGE, NAVY } from "@/lib/site";

/**
 * Professional launch loading screen.
 * Auto-hides on window load (or after minMs). Respects reduced motion.
 */
export function LoadingScreen({ minMs = 1100 }: { minMs?: number }) {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const start = performance.now();
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      const wait = Math.max(0, minMs - (performance.now() - start));
      hideTimer = setTimeout(() => setVisible(false), wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    // Safety net: a single stalled asset must never trap users on the splash.
    const failsafe = setTimeout(() => setVisible(false), Math.max(minMs, 6000));
    return () => {
      window.removeEventListener("load", finish);
      if (hideTimer) clearTimeout(hideTimer);
      clearTimeout(failsafe);
    };
  }, [minMs]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading Sheshaan Global"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold tracking-tight" style={{ color: "#fff" }}>
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
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/2 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, ${BLUE}, transparent)` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
