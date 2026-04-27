// Deep Infrastructure — Design System Tokens
// Single source of truth for all design decisions.

export const colors = {
  void: '#060A12',
  ink: '#0D1421',
  surface: '#111827',
  azure: '#0078D4',
  electric: '#00B4D8',
  platinum: '#E8EAED',
  silver: '#8892A4',
  gold: '#F5A623',
  border: {
    subtle: 'rgba(255,255,255,0.06)',
    glow: 'rgba(0,180,216,0.25)',
    gold: 'rgba(245,166,35,0.25)',
  },
  glow: {
    azure: 'rgba(0,120,212,0.3)',
    electric: 'rgba(0,180,216,0.3)',
    gold: 'rgba(245,166,35,0.3)',
  },
} as const;

export const gradients = {
  azure: 'linear-gradient(135deg, #0078D4 0%, #00B4D8 50%, #7C3AED 100%)',
  gold: 'linear-gradient(135deg, #F5A623, #FBBF24)',
  ambient: 'radial-gradient(ellipse at top, rgba(0,120,212,0.12) 0%, transparent 70%)',
  void: 'radial-gradient(ellipse at center, #0D1421 0%, #060A12 100%)',
  card: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
} as const;

export const typography = {
  fontFamily: {
    display: '"Plus Jakarta Sans", "Inter", sans-serif',
    body: '"Inter", "Plus Jakarta Sans", sans-serif',
    mono: '"Geist Mono", "ui-monospace", monospace',
  },
  fontSize: {
    hero: 'clamp(3rem, 8vw, 7rem)',
    display: 'clamp(2rem, 5vw, 4rem)',
    title: 'clamp(1.5rem, 3vw, 2.25rem)',
    lead: 'clamp(1rem, 2vw, 1.25rem)',
    body: '1rem',
    small: '0.875rem',
    xs: '0.75rem',
    mono: '0.8125rem',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  letterSpacing: {
    display: '-0.03em',
    heading: '-0.02em',
    body: '0',
    label: '0.08em',
  },
} as const;

export const spacing = {
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '2rem',     // 32px
  lg: '4rem',     // 64px
  xl: '8rem',     // 128px
  '2xl': '16rem', // 256px
} as const;

export const motion = {
  easing: {
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.2, 1)',
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  duration: {
    instant: 100,
    fast: 150,
    base: 300,
    slow: 500,
    cinematic: 900,
  },
  // Framer Motion easing arrays [x1, y1, x2, y2]
  framer: {
    spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    smooth: [0.16, 1, 0.3, 1] as [number, number, number, number],
    sharp: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },
} as const;

export const shadows = {
  card: '0 4px 24px rgba(0,0,0,0.4)',
  cardHover: '0 16px 48px rgba(0,0,0,0.6)',
  glowAzure: '0 0 24px rgba(0,120,212,0.3)',
  glowElectric: '0 0 24px rgba(0,180,216,0.3)',
  glowGold: '0 0 24px rgba(245,166,35,0.3)',
  navFloat: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
} as const;

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

// Convenience re-export
const tokens = { colors, gradients, typography, spacing, motion, shadows, radii };
export default tokens;
