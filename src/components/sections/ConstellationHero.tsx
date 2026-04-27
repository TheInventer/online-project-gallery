
import { lazy, Suspense, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import type { NodeScreenPos } from './WebGLHero';

// Lazy-load the Three.js scene so it code-splits into its own chunk
const WebGLHero = lazy(() => import('./WebGLHero'));

// ─── HTML label overlay ───────────────────────────────────
function NodeLabels({ positions }: { positions: NodeScreenPos[] }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {positions.map(({ x, y, alpha, label }) => (
        <div
          key={label}
          style={{
            position: 'absolute',
            left: 0, top: 0,
            transform: `translate(${x + 10}px, ${y - 7}px)`,
            opacity: alpha,
            fontFamily: 'Geist Mono, monospace',
            fontSize: '10px',
            color: '#8892A4',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            transition: 'opacity 0.3s',
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

// ─── Animated Name ────────────────────────────────────────
function AnimatedName() {
  const words = ['Ajay', 'Kumar', 'Yadav'];
  return (
    <h1
      className="flex flex-wrap gap-x-4 justify-center md:justify-start"
      style={{
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: 'clamp(2.75rem, 6.5vw, 5.75rem)',
        fontWeight: 800,
        letterSpacing: '-0.035em',
        lineHeight: 1.05,
        color: '#E8EAED',
      }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + wi * 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

// ─── Canvas fallback (shown while WebGL loads) ───────────
function CanvasFallback() {
  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 60% 40%, rgba(0,120,212,0.08) 0%, transparent 65%)',
      }}
    />
  );
}

// ─── ConstellationHero ────────────────────────────────────
export default function ConstellationHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<NodeScreenPos[]>([]);

  // Stable callback so WebGLHero doesn't remount on each render
  const handleNodePositions = useCallback((pos: NodeScreenPos[]) => {
    setNodePositions(pos);
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--color-void)',
      }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Ambient color glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 65% 35%, rgba(0,120,212,0.09) 0%, transparent 55%)',
        }}
      />

      {/* Three.js WebGL scene */}
      <Suspense fallback={<CanvasFallback />}>
        <WebGLHero containerRef={containerRef} onNodePositions={handleNodePositions} />
      </Suspense>

      {/* HTML node labels overlaid on canvas */}
      <NodeLabels positions={nodePositions} />

      {/* Foreground content */}
      <div
        className="container mx-auto px-4 relative"
        style={{ zIndex: 10, paddingTop: '6rem', paddingBottom: '6rem' }}
      >
        <div style={{ maxWidth: '640px' }}>
          {/* Mono label */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="label-text"
            style={{ marginBottom: '1.5rem' }}
          >
            Staff Software Engineer · Google · Ex-Microsoft · Ex-Disney+ Hotstar
          </motion.p>

          {/* Name — staggered word reveal */}
          <AnimatedName />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: '#8892A4',
              fontSize: 'clamp(1rem, 2vw, 1.175rem)',
              lineHeight: 1.68,
              maxWidth: '520px',
              marginTop: '1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            Building scalable cloud solutions at Google — and the engineer
            who built sovereign clouds for nations, 5,000+ Kubernetes clusters,
            and platforms powering hundreds of millions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
          >
            <MagneticButton as="a" href="/projects" variant="primary">
              See My Work <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
            >
              Resume <Download size={15} />
            </MagneticButton>
          </motion.div>

          {/* Credential chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2.5rem' }}
          >
            {['Google', 'Microsoft', 'Disney+ Hotstar', 'UT Austin', 'IIT Delhi (Dropped Out)', 'NIT Kurukshetra'].map((c) => (
              <span
                key={c}
                style={{
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#8892A4',
                  fontFamily: 'Geist Mono, monospace',
                }}
              >
                {c}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          zIndex: 10,
        }}
      >
        <span style={{ color: '#8892A4', fontSize: '0.65rem', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 38, background: 'linear-gradient(to bottom, rgba(0,180,216,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
