import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { staggerContainer, counterVariant, fadeUp } from '@/animations';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const stats: Stat[] = [
  {
    value: 5000,
    suffix: '+',
    label: 'K8s Clusters',
    sublabel: 'Orchestrated via Cosmic at Microsoft',
  },
  {
    value: 3,
    suffix: '',
    label: "Nations' Clouds",
    sublabel: 'Azure Sovereign Infrastructure built',
  },
  {
    value: 900,
    suffix: 'B+',
    label: 'DNS Queries/day',
    sublabel: 'Azure DNS across 3 sovereign clouds',
  },
  {
    value: 12,
    suffix: '+',
    label: 'Years Engineering',
    sublabel: 'Google, Microsoft, Disney+, UT Austin',
  },
  {
    value: 7,
    suffix: '+',
    label: 'Industry Awards',
    sublabel: 'Microsoft & Disney+ recognition',
  },
];

// ─── Animated Counter ───────────────────────────────────────
function AnimatedCounter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      setDisplay(parseFloat((eased * value).toFixed(value < 10 ? 1 : 0)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, value]);

  const formatted = value >= 1000
    ? display.toLocaleString('en-US', { maximumFractionDigits: 0 })
    : display.toString();

  return (
    <span className="mono-stat" style={{ fontVariantNumeric: 'tabular-nums' }}>
      {formatted}{suffix}
    </span>
  );
}

// ─── QuantifiedImpact ───────────────────────────────────────
export default function QuantifiedImpact() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--color-void)' }}
    >
      {/* Top divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,180,216,0.3))' }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16 md:mb-20"
        >
          <motion.p variants={fadeUp} className="label-text mb-4">
            Scale of Impact
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#E8EAED',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            I build infrastructure at{' '}
            <span className="text-gradient-azure">civilizational scale</span>
          </motion.h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-5 gap-px"
          style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={counterVariant}
              className="relative group p-6 md:p-8 flex flex-col gap-2 transition-colors duration-300"
              style={{
                background: 'var(--color-ink)',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,120,212,0.08) 0%, transparent 70%)' }}
              />

              {/* Number */}
              <div
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: '#E8EAED',
                  lineHeight: 1,
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} active={inView} />
              </div>

              {/* Label */}
              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: '#E8EAED',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </p>

              {/* Sublabel */}
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#8892A4',
                  lineHeight: 1.4,
                  fontFamily: 'Geist Mono, monospace',
                }}
              >
                {stat.sublabel}
              </p>

              {/* Top accent line — visible on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.5), transparent)' }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
