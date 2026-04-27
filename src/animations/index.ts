import { Variants, Transition } from 'framer-motion';

// ─── Shared Transitions ─────────────────────────────────────
export const transitions = {
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } satisfies Transition,

  springGentle: {
    type: 'spring',
    stiffness: 120,
    damping: 20,
  } satisfies Transition,

  smooth: {
    type: 'tween',
    ease: [0.16, 1, 0.3, 1],
    duration: 0.6,
  } satisfies Transition,

  smoothFast: {
    type: 'tween',
    ease: [0.16, 1, 0.3, 1],
    duration: 0.3,
  } satisfies Transition,

  cinematic: {
    type: 'tween',
    ease: [0.16, 1, 0.3, 1],
    duration: 0.9,
  } satisfies Transition,
};

// ─── Page-Level Variants ────────────────────────────────────
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ...transitions.smooth, staggerChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

// ─── Reveal Variants (scroll-triggered) ─────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
};

// ─── Stagger Container ──────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// ─── Character-by-Character Text ────────────────────────────
export const charContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

export const charVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
    },
  },
};

// ─── Nav Variants ───────────────────────────────────────────
export const navVariants: Variants = {
  top: {
    backgroundColor: 'rgba(6,10,18,0)',
    backdropFilter: 'blur(0px)',
    boxShadow: 'none',
    y: 0,
  },
  scrolled: {
    backgroundColor: 'rgba(13,20,33,0.85)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
    y: 0,
  },
};

// ─── Card Hover ─────────────────────────────────────────────
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: transitions.spring,
  },
};

// ─── Mobile Menu ────────────────────────────────────────────
export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    y: 20,
    pointerEvents: 'none' as const,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    opacity: 1,
    y: 0,
    pointerEvents: 'auto' as const,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Status Pulse ───────────────────────────────────────────
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.8, 1.8],
    opacity: [0.8, 0, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
};

// ─── Slide-up for stats/counters ────────────────────────────
export const counterVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...transitions.smooth,
      delay: i * 0.12,
    },
  }),
};
