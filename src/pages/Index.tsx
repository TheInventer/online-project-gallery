
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '../components/Footer';
import ConstellationHero from '@/components/sections/ConstellationHero';
import QuantifiedImpact from '@/components/sections/QuantifiedImpact';
import TrustMarquee from '@/components/sections/TrustMarquee';
import { projectsData } from '../data/projects';
import { useInView } from '@/hooks/useInView';
import { staggerContainer, fadeUp, scaleIn } from '@/animations';
import MagneticButton from '@/components/ui/MagneticButton';
import { pageVariants } from '@/animations';

// ─── Tech DNA Bar ─────────────────────────────────────────
const techGroups = [
  { label: 'Languages', color: '#0078D4', items: ['Go', 'Java', 'C#', 'TypeScript', 'C', 'Python'] },
  { label: 'Cloud / Infra', color: '#00B4D8', items: ['Google Cloud', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'SDN', 'DNS'] },
  { label: 'Data', color: '#7C3AED', items: ['CosmosDB', 'Redis', 'MongoDB', 'Kafka', 'Elasticsearch'] },
  { label: 'Tools', color: '#F5A623', items: ['GitHub Actions', 'Grafana', 'Azure Pipelines', 'Firebase', 'Unity'] },
];

function TechDNA() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--color-void)' }}
    >
      <div className="container mx-auto px-4 mb-10">
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="label-text mb-3">
          Technical Toolkit
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="section-heading"
          style={{ maxWidth: 480 }}
        >
          The DNA of a systems architect
        </motion.h2>
      </div>

      <div className="space-y-5 overflow-x-auto pb-4">
        {techGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ delay: gi * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="container mx-auto px-4"
          >
            <div className="flex items-center gap-4">
              <span
                className="flex-shrink-0 text-xs font-medium w-24 text-right"
                style={{ color: group.color, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.04em' }}
              >
                {group.label}
              </span>
              <div className="flex gap-2 flex-wrap">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-default"
                    style={{
                      background: `${group.color}12`,
                      border: `1px solid ${group.color}30`,
                      color: '#E8EAED',
                      fontFamily: 'Geist Mono, monospace',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.background = `${group.color}25`;
                      (e.currentTarget as HTMLSpanElement).style.borderColor = `${group.color}60`;
                      (e.currentTarget as HTMLSpanElement).style.color = group.color;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.background = `${group.color}12`;
                      (e.currentTarget as HTMLSpanElement).style.borderColor = `${group.color}30`;
                      (e.currentTarget as HTMLSpanElement).style.color = '#E8EAED';
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Featured Projects ────────────────────────────────────
function FeaturedWork() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });
  const featured = projectsData.slice(0, 3);

  return (
    <section
      ref={ref}
      className="section-pad relative"
      style={{ background: 'var(--color-ink)' }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <motion.p variants={fadeUp} className="label-text mb-3">Selected Work</motion.p>
            <motion.h2 variants={fadeUp} className="section-heading" style={{ marginBottom: 0 }}>
              Flagship projects
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: '#00B4D8' }}
            >
              View all work <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {featured.map((project) => (
            <motion.div
              key={project.id}
              variants={scaleIn}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,180,216,0.25)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 48px rgba(0,0,0,0.5)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '180px' }}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(6,10,18,0.8) 0%, transparent 50%)' }}
                />
                {/* Company badge */}
                <span
                  className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium"
                  style={{
                    background: 'rgba(0,120,212,0.7)',
                    backdropFilter: 'blur(8px)',
                    color: '#E8EAED',
                    fontFamily: 'Geist Mono, monospace',
                  }}
                >
                  {project.tags[0]}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="font-bold mb-2 line-clamp-2"
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '1rem',
                    color: '#E8EAED',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.35,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm line-clamp-2 mb-4"
                  style={{ color: '#8892A4', lineHeight: 1.55 }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="pill text-xs">{tag}</span>
                  ))}
                </div>

                {/* Link row */}
                <Link
                  to={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: '#00B4D8' }}
                >
                  View case study <ArrowUpRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Learning Teaser ──────────────────────────────────────
const learningSummary = [
  { label: '110+', sub: 'Books', color: '#00B4D8' },
  { label: '18',   sub: 'Courses', color: '#7C3AED' },
  { label: '17',   sub: 'Categories', color: '#F5A623' },
];

const sampleTopics = ['System Design', 'AI / ML', 'DNS', 'Leadership', 'Architecture', 'Networking', 'DevOps'];

function LearningTeaser() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="section-pad relative"
      style={{ background: 'var(--color-ink)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <motion.p variants={fadeUp} className="label-text mb-3">Continuous Learning</motion.p>
            <motion.h2 variants={fadeUp} className="section-heading" style={{ marginBottom: 0 }}>
              Books & courses that <span className="text-gradient-azure">shaped my thinking</span>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              to="/learning"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: '#00B4D8' }}
            >
              View full reading list <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex gap-8 mb-8"
        >
          {learningSummary.map(({ label, sub, color }) => (
            <motion.div key={sub} variants={fadeUp}>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '2rem', color, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {label}
              </p>
              <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: '#8892A4', marginTop: '4px' }}>{sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Topic chips */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {sampleTopics.map((topic) => (
            <span
              key={topic}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#8892A4',
                fontFamily: 'Geist Mono, monospace',
              }}
            >
              {topic}
            </span>
          ))}
          <Link
            to="/learning"
            className="px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1 transition-all duration-200"
            style={{
              background: 'rgba(0,180,216,0.08)',
              border: '1px solid rgba(0,180,216,0.25)',
              color: '#00B4D8',
              fontFamily: 'Geist Mono, monospace',
            }}
          >
            + more <ArrowRight size={11} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact CTA ──────────────────────────────────────────
function ContactCTA() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--color-void)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(0,120,212,0.1) 0%, transparent 65%)',
        }}
      />
      <div className="divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 text-center relative">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="label-text mb-6"
        >
          Let's Collaborate
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#E8EAED',
            maxWidth: '700px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.1,
          }}
        >
          Let's build something that{' '}
          <span className="text-gradient-azure">matters</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
          style={{ color: '#8892A4', fontSize: '1.0625rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}
        >
          Research collaboration, technical consulting, and interesting engineering problems welcome.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <MagneticButton as="a" href="/contact" variant="primary" magnetStrength={0.3}>
            Start a Conversation <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton as="a" href="https://www.linkedin.com/in/ajay-km-yadav/" target="_blank" rel="noopener noreferrer" variant="ghost" magnetStrength={0.3}>
            Connect on LinkedIn <ArrowUpRight size={15} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Index Page ───────────────────────────────────────────
const Index = () => {
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
        <ConstellationHero />
        <QuantifiedImpact />
        <TrustMarquee />
        <FeaturedWork />
        <TechDNA />
        <LearningTeaser />
        <ContactCTA />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
