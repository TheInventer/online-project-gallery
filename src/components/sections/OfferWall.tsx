
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { staggerContainer, fadeUp, scaleIn } from '@/animations';
import { CheckCircle2 } from 'lucide-react';

interface OfferCompany {
  name: string;
  role: string;
  year: string;
  color: string;
  initials: string;
  joined?: boolean;
}

// Update this list with actual companies that extended offers
const offers: OfferCompany[] = [
  { name: 'Google', role: 'Staff Software Engineer', year: '2025', color: '#4285F4', initials: 'G', joined: true },
  { name: 'Microsoft', role: 'Software Engineer II', year: '2016', color: '#0078D4', initials: 'MS', joined: true },
  { name: 'Microsoft', role: 'Senior SWE → Architect L64', year: '2021', color: '#0078D4', initials: 'MS', joined: true },
  { name: 'Disney+ Hotstar', role: 'Software Engineer II', year: '2020', color: '#113CCF', initials: 'D+', joined: true },
  { name: 'Ixigo', role: 'Senior Software Engineer', year: '2015', color: '#FF6B35', initials: 'IX', joined: true },
  { name: 'Ameyo', role: 'Software Developer', year: '2013', color: '#E91E8C', initials: 'AM', joined: true },
  { name: 'Amazon', role: 'Software Development Engineer', year: '2021', color: '#FF9900', initials: 'A' },
  { name: 'Meta', role: 'Software Engineer E5', year: '2023', color: '#0866FF', initials: 'M' },
  { name: 'Uber', role: 'Staff Engineer', year: '2024', color: '#1D1D1D', initials: 'Ub' },
  { name: 'LinkedIn', role: 'Senior SWE', year: '2021', color: '#0A66C2', initials: 'in' },
];

// ─── Company Logo Mark ─────────────────────────────────────
function LogoMark({ company }: { company: OfferCompany }) {
  return (
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm flex-shrink-0"
      style={{
        background: `${company.color}18`,
        border: `1.5px solid ${company.color}35`,
        color: company.color,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        letterSpacing: '-0.02em',
      }}
    >
      {company.initials}
    </div>
  );
}

// ─── Offer Card ───────────────────────────────────────────
function OfferCard({ company }: { company: OfferCompany }) {
  return (
    <motion.div
      variants={scaleIn}
      className="relative group rounded-2xl p-5 transition-all duration-300"
      style={{
        background: 'var(--color-ink)',
        border: `1px solid ${company.joined ? `${company.color}20` : 'rgba(255,255,255,0.06)'}`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${company.color}50`;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px ${company.color}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = company.joined ? `${company.color}20` : 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${company.color}60, transparent)` }}
      />

      {/* Joined badge */}
      {company.joined && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.2)',
          }}
        >
          <CheckCircle2 size={10} style={{ color: '#22c55e' }} />
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.6rem', color: '#22c55e', letterSpacing: '0.05em' }}>
            JOINED
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <LogoMark company={company} />
        <div>
          <p
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#E8EAED',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}
          >
            {company.name}
          </p>
          <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: '#8892A4', marginTop: '2px' }}>
            Offer · {company.year}
          </p>
        </div>
      </div>

      <p
        style={{
          fontFamily: 'Geist Mono, monospace',
          fontSize: '0.75rem',
          color: company.color,
          lineHeight: 1.45,
        }}
      >
        {company.role}
      </p>
    </motion.div>
  );
}

// ─── OfferWall ────────────────────────────────────────────
export default function OfferWall() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });
  const joined = offers.filter((o) => o.joined);
  const others = offers.filter((o) => !o.joined);

  return (
    <section
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--color-ink)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,120,212,0.07) 0%, transparent 60%)' }}
      />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <motion.p variants={fadeUp} className="label-text mb-3">Industry Recognition</motion.p>
          <motion.h2 variants={fadeUp} className="section-heading" style={{ marginBottom: '0.75rem' }}>
            Companies that <span className="text-gradient-azure">extended offers</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{ color: '#8892A4', fontSize: '1rem', maxWidth: '520px', lineHeight: 1.65 }}
          >
            A career defined by choosing growth over comfort — from each company, an offer accepted or a chapter that shaped the next move.
          </motion.p>
        </motion.div>

        {/* Joined row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-10"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs uppercase tracking-widest"
            style={{ color: '#8892A4', fontFamily: 'Geist Mono, monospace' }}
          >
            Accepted & Joined
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {joined.map((company, i) => (
              <OfferCard key={`${company.name}-${i}`} company={company} />
            ))}
          </div>
        </motion.div>

        {/* Offers received but not joined */}
        {others.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-xs uppercase tracking-widest"
              style={{ color: '#8892A4', fontFamily: 'Geist Mono, monospace' }}
            >
              Offers Received
            </motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {others.map((company, i) => (
                <OfferCard key={`${company.name}-other-${i}`} company={company} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
