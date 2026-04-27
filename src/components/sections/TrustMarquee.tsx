import { motion } from 'framer-motion';
import { fadeUp } from '@/animations';
import { useInView } from '@/hooks/useInView';

const institutions = [
  { name: 'NIT Kurukshetra', role: 'B.Tech Computer Science · 2009–2013' },
  { name: 'Ameyo', role: 'Software Engineer · Contact Center Platform' },
  { name: 'Ixigo', role: 'Software Engineer · Travel Technology' },
  { name: 'Microsoft', role: 'Software Architect L64 · Azure Sovereign Clouds' },
  { name: 'Disney+ Hotstar', role: 'Software Engineer II · Content Delivery' },
  { name: 'Google', role: 'Staff Software Engineer · Cloud Infrastructure' },
  { name: 'IIT Delhi', role: 'M.Tech Computer Science · 2023–2024' },
  // Duplicated for seamless loop
  { name: 'NIT Kurukshetra', role: 'B.Tech Computer Science · 2009–2013' },
  { name: 'Ameyo', role: 'Software Engineer · Contact Center Platform' },
  { name: 'Ixigo', role: 'Software Engineer · Travel Technology' },
  { name: 'Microsoft', role: 'Software Architect L64 · Azure Sovereign Clouds' },
  { name: 'Disney+ Hotstar', role: 'Software Engineer II · Content Delivery' },
  { name: 'Google', role: 'Staff Software Engineer · Cloud Infrastructure' },
  { name: 'IIT Delhi', role: 'M.Tech Computer Science · 2023–2024' },
];

function MarqueeItem({ name, role }: { name: string; role: string }) {
  return (
    <div
      className="flex items-center gap-4 flex-shrink-0 px-8"
      style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div>
        <p
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 700,
            fontSize: '0.9375rem',
            color: '#E8EAED',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: '0.7rem',
            color: '#8892A4',
            whiteSpace: 'nowrap',
            marginTop: '2px',
          }}
        >
          {role}
        </p>
      </div>
    </div>
  );
}

export default function TrustMarquee() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="section-pad-sm relative overflow-hidden"
      style={{
        background: 'var(--color-ink)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="container mx-auto px-4 mb-8">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="label-text text-center"
        >
          Built for the world's most demanding platforms
        </motion.p>
      </div>

      {/* Marquee track with edge masks */}
      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div className="flex overflow-hidden">
          <div className="marquee-track py-2">
            {institutions.map((item, i) => (
              <MarqueeItem key={i} name={item.name} role={item.role} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
