import type { Variants } from 'framer-motion'

/** Standard viewport config for scroll-triggered reveals (fires once). */
export const revealViewport = { once: true, amount: 0.2 } as const

/** Fade + rise. The workhorse entrance animation. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }),
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

/** Parent variant that staggers direct children using `fadeUp`. */
export const staggerParent: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
}
