import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/** Thin brand-coloured reading-progress bar pinned under the sticky header. */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-[#0057B8] via-[#2a86ff] to-[#FF8A00]"
    />
  );
}
