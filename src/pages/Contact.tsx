
import { motion } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import Footer from '../components/Footer';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { staggerContainer, fadeUp, fadeLeft, pageVariants } from '@/animations';

// ─── Floating Label Input ─────────────────────────────────
function FloatingInput({
  id, name, label, type = 'text', value, onChange, required, multiline,
}: {
  id: string; name: string; label: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean; multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const active = focused || filled;

  const sharedStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--color-surface)',
    border: `1px solid ${focused ? 'rgba(0,180,216,0.5)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '12px',
    padding: '20px 16px 8px',
    color: '#E8EAED',
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused ? '0 0 0 3px rgba(0,180,216,0.08)' : 'none',
    resize: 'none',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        style={{
          position: 'absolute',
          left: '16px',
          top: active ? '8px' : '14px',
          fontSize: active ? '0.7rem' : '0.9375rem',
          color: active ? (focused ? '#00B4D8' : '#8892A4') : '#8892A4',
          fontWeight: active ? 500 : 400,
          letterSpacing: active ? '0.05em' : '0',
          textTransform: active ? 'uppercase' : 'none',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 1,
          fontFamily: active ? 'Geist Mono, monospace' : 'Inter, sans-serif',
        }}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id} name={name} required={required} value={value}
          onChange={onChange} rows={5}
          style={sharedStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          id={id} name={name} type={type} required={required} value={value}
          onChange={onChange}
          style={sharedStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

// ─── Contact Method Card ──────────────────────────────────
function ContactCard({
  icon: Icon, label, value, href, accent,
}: {
  icon: React.ElementType; label: string; value: string; href?: string; accent: string;
}) {
  const [ref] = useInView<HTMLDivElement>({ threshold: 0.2 });

  const inner = (
    <div
      ref={ref}
      className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 cursor-pointer"
      style={{
        background: 'var(--color-ink)',
        border: `1px solid rgba(255,255,255,0.06)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
      >
        <Icon size={18} style={{ color: accent }} />
      </div>
      <div className="min-w-0">
        <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.7rem', color: '#8892A4', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>
          {label}
        </p>
        <p
          className="truncate font-medium transition-colors duration-200"
          style={{ color: '#E8EAED', fontSize: '0.9375rem' }}
        >
          {value}
        </p>
      </div>
      {href && (
        <ArrowUpRight
          size={16}
          className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: accent }}
        />
      )}
    </div>
  );

  return href ? <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">{inner}</a> : inner;
}

// ─── Contact Page ─────────────────────────────────────────
const Contact = () => {
  const [headerRef, headerInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [formRef, formInView] = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-void)' }}
    >
      <FloatingNav />
      <main className="flex-grow">

        {/* ── Hero ── */}
        <section
          ref={headerRef}
          className="relative py-24 overflow-hidden"
          style={{ background: 'var(--color-ink)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,120,212,0.12) 0%, transparent 65%)' }}
          />
          {/* Dot grid */}
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

          <div className="container mx-auto px-4 text-center relative">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="label-text mb-5"
            >
              Say Hello
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: '#E8EAED',
                lineHeight: 1.05,
                marginBottom: '1.5rem',
              }}
            >
              Let's build something<br />
              <span className="text-gradient-azure">remarkable</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ color: '#8892A4', fontSize: '1.0625rem', maxWidth: '520px', margin: '0 auto 2rem' }}
            >
              Research collaboration, technical consulting, and interesting problems.
              Based in India — working globally.
            </motion.p>

          </div>
        </section>

        {/* ── Content ── */}
        <section ref={formRef} className="section-pad" style={{ background: 'var(--color-void)' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-lg">

              {/* ── Contact info ── */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={formInView ? 'visible' : 'hidden'}
                className="space-y-5"
              >
                <motion.div variants={fadeLeft}>
                  <p className="label-text mb-3">Direct Channels</p>
                  <p style={{ color: '#8892A4', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    Prefer to reach out directly? Use any of these channels.
                    I typically respond within 24 hours.
                  </p>
                </motion.div>

                <motion.div variants={fadeLeft}>
                  <ContactCard
                    icon={Mail}
                    label="Email"
                    value="ajay.yadav109458@gmail.com"
                    href="mailto:ajay.yadav109458@gmail.com"
                    accent="#00B4D8"
                  />
                </motion.div>

                <motion.div variants={fadeLeft}>
                  <ContactCard
                    icon={LinkedInIcon}
                    label="LinkedIn"
                    value="ajay-km-yadav"
                    href="https://www.linkedin.com/in/ajay-km-yadav/"
                    accent="#0A66C2"
                  />
                </motion.div>

                <motion.div variants={fadeLeft}>
                  <ContactCard
                    icon={GitHubIcon}
                    label="GitHub"
                    value="ajay109458"
                    href="https://github.com/ajay109458"
                    accent="#E8EAED"
                  />
                </motion.div>

                <motion.div variants={fadeLeft}>
                  <ContactCard
                    icon={MapPin}
                    label="Location"
                    value="Rewari, Haryana · Working globally"
                    accent="#F5A623"
                  />
                </motion.div>

                {/* Availability breakdown */}
                <motion.div
                  variants={fadeLeft}
                  className="rounded-2xl p-5 mt-2"
                  style={{ background: 'var(--color-ink)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="label-text mb-4">Open For</p>
                  {[
                    { label: 'Senior Technical Roles', active: true },
                    { label: 'Research Collaboration', active: true },
                    { label: 'Technical Consulting', active: true },
                    { label: 'Mentorship', active: true },
                    { label: 'Speaking / Panels', active: false },
                  ].map(({ label, active }) => (
                    <div key={label} className="flex items-center gap-3 py-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: active ? '#22c55e' : '#4B5563' }}
                      />
                      <span style={{ color: active ? '#E8EAED' : '#4B5563', fontSize: '0.875rem' }}>{label}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

// ─── Inline brand icons ───────────────────────────────────
function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default Contact;
