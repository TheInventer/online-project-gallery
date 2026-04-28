
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import Footer from '../components/Footer';
import { useInView } from '@/hooks/useInView';
import { staggerContainer, fadeUp, fadeLeft, scaleIn, pageVariants } from '@/animations';
import MagneticButton from '@/components/ui/MagneticButton';
import CareerTopologyMap from '@/components/sections/CareerTopologyMap';
import LearningShelf from '@/components/sections/LearningShelf';
import OfferWall from '@/components/sections/OfferWall';
import { Download, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Career chapters (latest first) ──────────────────────
const chapters = [
  {
    period: 'Dec 2025 – Present',
    title: 'Staff Software Engineer',
    org: 'Google',
    accent: '#34A853',
    description:
      'Building scalable cloud infrastructure at Google. Joined as Staff Software Engineer, bringing 12+ years of distributed systems and large-scale infrastructure expertise across Microsoft, Disney+ Hotstar, Ixigo, and Ameyo.',
    tags: ['Cloud Infrastructure', 'Distributed Systems', 'Scalability', 'Google Cloud'],
  },
  {
    period: '2024 – Present',
    title: 'M.S., Computer Science',
    org: 'University of Texas, Austin',
    accent: '#7C3AED',
    description:
      "Pursuing a Master's alongside full-time engineering at Google. Focused on Machine Learning, AI, Virtualization, and Cloud Computing. Chose UT Austin over IIT Delhi — growth mindset means always picking the better opportunity.",
    tags: ['Machine Learning', 'AI', 'Virtualization', 'Cloud Computing'],
  },
  {
    period: 'Jul 2023 – Jan 2024',
    title: 'M.Tech, Computer Science (Dropped Out)',
    org: 'IIT Delhi',
    accent: '#F5A623',
    description:
      'Enrolled in the M.Tech program at IIT Delhi while working full-time at Microsoft. Dropped out mid-program to pursue a stronger academic opportunity at the University of Texas, Austin — a deliberate choice to not settle.',
    tags: ['IIT Delhi', 'M.Tech', 'Computer Science'],
  },
  {
    period: 'Aug 2021 – Nov 2025',
    title: 'Senior Software Engineer → Software Architect (L64)',
    org: 'Microsoft IDC, Noida',
    accent: '#0078D4',
    description:
      'Built Azure Sovereign Clouds for France, Germany, and Singapore — national-scale infrastructure from scratch, including thousands of servers, full networking, and 20+ DNS services handling 900B+ queries/day. Led Cosmic: containerized cloud platform managing 5,000+ Kubernetes clusters × 500 nodes. Promoted to Software Architect (L64) in January 2024.',
    tags: ['Azure Sovereign', 'Kubernetes', 'Cosmic', 'DNS', 'Golang', 'National Infrastructure'],
  },
  {
    period: 'Mar 2020 – Aug 2021',
    title: 'Software Engineer II – Content Delivery',
    org: 'Disney+ Hotstar',
    accent: '#00B4D8',
    description:
      "Built core content delivery infrastructure for Disney+ Hotstar and led the platform launch across Singapore, Indonesia, and Malaysia. Received the \"Building India's Biggest OTT\" award for contributions during the high-scale streaming launch.",
    tags: ['Content Delivery', 'Video Streaming', 'CDN', 'Singapore', 'Indonesia', 'Malaysia'],
  },
  {
    period: 'Jan 2016 – Mar 2020',
    title: 'Software Engineer II',
    org: 'Microsoft',
    accent: '#0078D4',
    description:
      'Core contributor to Azure DevOps, GitHub Actions, and Azure Pipelines — developer productivity infrastructure used by millions of engineers worldwide every day. First exposure to operating systems at truly global scale.',
    tags: ['Azure DevOps', 'GitHub Actions', 'Azure Pipelines', 'Developer Productivity'],
  },
  {
    period: 'Oct 2015 – Jan 2016',
    title: 'Senior Software Engineer',
    org: 'Ixigo',
    accent: '#FF6B35',
    description:
      "Worked on Ixigo's travel technology platform as a Senior Software Engineer. Contributed to search infrastructure and backend services that power India's one of the largest travel booking platforms.",
    tags: ['Travel Technology', 'Search Infrastructure', 'Java', 'Backend Systems'],
  },
  {
    period: 'Jun 2013 – Oct 2015',
    title: 'Software Developer',
    org: 'Ameyo',
    accent: '#E91E8C',
    description:
      'Started career at Ameyo, a leading contact center software platform. Built and maintained core communication platform features, gaining deep experience in enterprise software development and real-time systems.',
    tags: ['Contact Center', 'Enterprise Software', 'Real-time Systems', 'Java'],
  },
  {
    period: '2009 – 2013',
    title: 'B.Tech, Computer Science',
    org: 'NIT Kurukshetra',
    accent: '#F5A623',
    description:
      'Graduated with distinction. Built the foundations in algorithm design, data structures, systems programming, and software engineering. Implemented an FTP server in C and a full compiler in Java — early proof that building from scratch is the best way to truly understand a system.',
    tags: ['Algorithms', 'Data Structures', 'Systems Programming', 'C', 'Java'],
  },
];

// ─── Awards ──────────────────────────────────────────────
const awards = [
  { title: 'Above and Beyond Award – Azure Networking', org: 'Microsoft', date: 'Sept 2024', color: '#F5A623' },
  { title: 'Technical Excellence Award – Azure Networking', org: 'Microsoft', date: 'Jan 2024', color: '#F5A623' },
  { title: 'Promoted to Software Architect (L64)', org: 'Microsoft', date: 'Jan 2024', color: '#0078D4' },
  { title: 'Hackathon CVP Award', org: 'Microsoft', date: 'Sept 2022', color: '#00B4D8' },
  { title: 'Growth Mindset Award', org: 'Microsoft', date: 'Dec 2022', color: '#7C3AED' },
  { title: "Building India's Biggest OTT – Contributor Award", org: 'Disney+ Hotstar', date: 'May 2020', color: '#00B4D8' },
];

// ─── Chapter Card ─────────────────────────────────────────
function ChapterCard({ chapter }: { chapter: typeof chapters[0] }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10 pb-12 group"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 -translate-x-1/2 z-10">
        <div
          className="w-3 h-3 rounded-full border-2 transition-all duration-300 group-hover:scale-150"
          style={{
            background: chapter.accent,
            borderColor: 'var(--color-void)',
            boxShadow: `0 0 12px ${chapter.accent}60`,
          }}
        />
      </div>

      <p
        className="mb-2"
        style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: chapter.accent, letterSpacing: '0.06em' }}
      >
        {chapter.period}
      </p>

      <div
        className="rounded-2xl p-6 transition-all duration-300"
        style={{ background: 'var(--color-ink)', border: '1px solid rgba(255,255,255,0.06)' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${chapter.accent}35`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.3)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: '#E8EAED', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: '3px' }}>
          {chapter.title}
        </h3>
        <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.8125rem', color: chapter.accent, marginBottom: '0.75rem' }}>
          {chapter.org}
        </p>
        <p style={{ color: '#8892A4', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '1rem' }}>
          {chapter.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {chapter.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{ background: `${chapter.accent}10`, border: `1px solid ${chapter.accent}25`, color: '#E8EAED', fontFamily: 'Geist Mono, monospace' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── AchievementConstellation ─────────────────────────────
function AchievementConstellation() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="section-pad relative" style={{ background: 'var(--color-ink)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container mx-auto px-4">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-12">
          <motion.p variants={fadeUp} className="label-text mb-3">Recognition</motion.p>
          <motion.h2 variants={fadeUp} className="section-heading">
            Recognized for excellence, <span className="text-gradient-gold">not just output</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {awards.map((award, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-300 cursor-default"
              style={{ background: 'var(--color-surface)', border: `1px solid ${award.color}20` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${award.color}50`;
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${award.color}20`;
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${award.color}60, transparent)` }} />
              <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{ background: award.color, filter: 'blur(24px)', transform: 'translate(30%, 30%)' }} />

              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: `${award.color}15`, border: `1px solid ${award.color}25` }}>
                <span style={{ color: award.color, fontSize: '1rem' }}>★</span>
              </div>

              <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '0.9375rem', color: '#E8EAED', letterSpacing: '-0.01em', lineHeight: 1.35, marginBottom: '8px' }}>
                {award.title}
              </h4>

              <div className="flex items-center justify-between">
                <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: award.color }}>{award.org}</span>
                <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: '#8892A4' }}>{award.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Profile Sidebar ──────────────────────────────────────
function ProfileSidebar() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <motion.div ref={ref} variants={fadeLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="sticky top-24">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-2xl overflow-hidden" style={{ border: '2px solid rgba(0,180,216,0.3)', boxShadow: '0 0 32px rgba(0,120,212,0.2)' }}>
          <img src="../Ajayyadav.jpg" alt="Ajay Kumar Yadav" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ background: '#22c55e', borderColor: 'var(--color-void)' }}>
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      </div>

      <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '1.375rem', color: '#E8EAED', letterSpacing: '-0.02em', marginBottom: '4px' }}>
        Ajay Kumar Yadav
      </h2>
      <p style={{ color: '#00B4D8', fontSize: '0.875rem', fontFamily: 'Geist Mono, monospace', marginBottom: '1.5rem' }}>
        Staff Software Engineer · Google
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {['Distributed Systems', 'Cloud Architecture', 'AI / ML', 'Kubernetes', 'Golang', 'Azure'].map((skill) => (
          <span key={skill} className="px-3 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8892A4', fontFamily: 'Geist Mono, monospace' }}>
            {skill}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <MagneticButton as="a" href="/resume.pdf" target="_blank" rel="noopener noreferrer" variant="primary" magnetStrength={0.2}>
          <Download size={15} /> Download Resume
        </MagneticButton>
        <MagneticButton as="a" href="https://www.linkedin.com/in/ajay-km-yadav/" target="_blank" rel="noopener noreferrer" variant="ghost" magnetStrength={0.2}>
          LinkedIn <ArrowUpRight size={14} />
        </MagneticButton>
      </div>
    </motion.div>
  );
}

// ─── About Page ───────────────────────────────────────────
const About = () => {
  const [timelineRef, timelineInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const timelineLineRef = useRef<HTMLDivElement>(null);

  // Scrub the vertical timeline line as you scroll through the section
  useEffect(() => {
    const el = timelineLineRef.current;
    if (!el) return;
    gsap.set(el, { scaleY: 0, transformOrigin: 'top center' });
    const anim = gsap.to(el, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 30%',
        scrub: 1.2,
      },
    });
    return () => { anim.scrollTrigger?.kill(); };
  }, []);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen flex flex-col" style={{ background: 'var(--color-void)' }}>
      <FloatingNav />
      <main className="flex-grow">
        {/* Hero banner */}
        <section className="relative py-20 overflow-hidden" style={{ background: 'var(--color-ink)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,120,212,0.1) 0%, transparent 60%)' }} />
          <div className="container mx-auto px-4 text-center relative">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="label-text mb-4">
              The Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#E8EAED', lineHeight: 1.1, marginBottom: '1.25rem' }}
            >
              A decade of building<br /><span className="text-gradient-azure">at scale</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: '#8892A4', fontSize: '1.0625rem', maxWidth: '520px', margin: '0 auto' }}
            >
              Building Google Cloud Infrastructure —
              a story of distributed systems, scale, and perpetual growth.
            </motion.p>
          </div>
        </section>

        {/* Main content */}
        <section className="section-pad" style={{ background: 'var(--color-void)' }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <ProfileSidebar />
              </div>

              {/* Timeline */}
              <div className="lg:col-span-3">
                <section ref={timelineRef} className="relative">
                  <motion.div variants={staggerContainer} initial="hidden" animate={timelineInView ? 'visible' : 'hidden'} className="mb-10">
                    <motion.p variants={fadeUp} className="label-text mb-3">Career Chapters</motion.p>
                    <motion.h2 variants={fadeUp} className="section-heading">The story so far</motion.h2>
                  </motion.div>

                  <div className="relative">
                    <div ref={timelineLineRef} className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,120,212,0.3) 10%, rgba(0,120,212,0.3) 90%, transparent)' }} />
                    {chapters.map((chapter, i) => (
                      <ChapterCard key={i} chapter={chapter} />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        <AchievementConstellation />
        <OfferWall />
        <CareerTopologyMap />
        <LearningShelf />
      </main>
      <Footer />
    </motion.div>
  );
};

export default About;
