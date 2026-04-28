
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import Footer from '../components/Footer';
import { projectsData, personalProjectsData } from '../data/projects';
import { useInView } from '@/hooks/useInView';
import { pageVariants } from '@/animations';
import { ArrowUpRight, Filter } from 'lucide-react';

// ─── Orbital Project Card ─────────────────────────────────
function OrbitalProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="group block relative rounded-2xl overflow-hidden"
        style={{
          background: 'var(--color-ink)',
          border: '1px solid rgba(255,255,255,0.06)',
          transition: 'border-color 0.35s, box-shadow 0.35s, transform 0.35s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,180,216,0.3)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 20px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,180,216,0.1)';
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-5px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.06)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: '200px' }}>
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,20,33,1) 0%, rgba(13,20,33,0.4) 60%, transparent 100%)' }} />

          {/* Top badge */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span
              className="px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{ background: 'rgba(0,120,212,0.75)', backdropFilter: 'blur(8px)', color: '#E8EAED', fontFamily: 'Geist Mono, monospace' }}
            >
              {project.tags[0]}
            </span>
          </div>

          {/* Arrow icon — appears on hover */}
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            style={{ background: 'rgba(0,180,216,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,180,216,0.3)' }}
          >
            <ArrowUpRight size={14} style={{ color: '#00B4D8' }} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#E8EAED',
              letterSpacing: '-0.01em',
              lineHeight: 1.35,
              marginBottom: '8px',
            }}
            className="line-clamp-2"
          >
            {project.title}
          </h3>
          <p
            className="text-sm line-clamp-2 mb-4"
            style={{ color: '#8892A4', lineHeight: 1.6 }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#8892A4',
                  fontFamily: 'Geist Mono, monospace',
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span
                className="px-2.5 py-1 rounded-lg text-xs"
                style={{ color: '#8892A4', fontFamily: 'Geist Mono, monospace' }}
              >
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Case study link */}
          <div
            className="flex items-center gap-1.5 mt-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0"
            style={{ color: '#00B4D8' }}
          >
            View case study <ArrowUpRight size={12} />
          </div>
        </div>

        {/* Holographic shimmer overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(0,180,216,0.03) 45%, rgba(0,120,212,0.06) 50%, rgba(124,58,237,0.03) 55%, transparent 60%)',
          }}
        />
      </Link>
    </motion.div>
  );
}

// ─── Personal Project Card ────────────────────────────────
function PersonalProjectCard({ project, index }: { project: typeof personalProjectsData[0]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="group relative rounded-2xl overflow-hidden"
        style={{
          background: 'var(--color-ink)',
          border: '1px solid rgba(245,166,35,0.15)',
          transition: 'border-color 0.35s, box-shadow 0.35s, transform 0.35s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,166,35,0.4)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,166,35,0.1)';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,166,35,0.15)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        }}
      >
        <div className="relative overflow-hidden" style={{ height: '200px' }}>
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,20,33,1) 0%, rgba(13,20,33,0.4) 60%, transparent 100%)' }} />
          <div className="absolute top-3 left-3">
            <span
              className="px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{ background: 'rgba(245,166,35,0.75)', backdropFilter: 'blur(8px)', color: '#0D1421', fontFamily: 'Geist Mono, monospace', fontWeight: 700 }}
            >
              Personal
            </span>
          </div>
          {project.projectUrl && project.projectUrl !== '/' && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
              style={{ background: 'rgba(245,166,35,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(245,166,35,0.3)' }}
            >
              <ArrowUpRight size={14} style={{ color: '#F5A623' }} />
            </a>
          )}
        </div>

        <div className="p-5">
          <h3
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#E8EAED', letterSpacing: '-0.01em', lineHeight: 1.35, marginBottom: '8px' }}
            className="line-clamp-1"
          >
            {project.title.split(' — ')[0]}
          </h3>
          <p className="text-sm line-clamp-2 mb-4" style={{ color: '#8892A4', lineHeight: 1.6 }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs"
                style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.15)', color: '#8892A4', fontFamily: 'Geist Mono, monospace' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(245,166,35,0.1)',
              border: '1px solid rgba(245,166,35,0.3)',
              color: '#F5A623',
              fontFamily: 'Geist Mono, monospace',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(245,166,35,0.2)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(245,166,35,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(245,166,35,0.1)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(245,166,35,0.3)';
            }}
          >
            {project.projectUrl.replace('https://', '')} <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(245,166,35,0.03) 50%, transparent 60%)' }}
        />
      </div>
    </motion.div>
  );
}

// ─── Projects Page ────────────────────────────────────────
const Projects = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [bannerRef, bannerInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [personalRef, personalInView] = useInView<HTMLElement>({ threshold: 0.1 });

  const allTags = Array.from(new Set(projectsData.flatMap((p) => p.tags))).sort();
  const filteredProjects = selectedTag
    ? projectsData.filter((p) => p.tags.includes(selectedTag))
    : projectsData;

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
        {/* Hero banner */}
        <section
          ref={bannerRef}
          className="relative py-20 overflow-hidden"
          style={{ background: 'var(--color-ink)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,120,212,0.1) 0%, transparent 60%)' }} />
          <div className="container mx-auto px-4 text-center relative">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={bannerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label-text mb-4">
              Selected Work
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={bannerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#E8EAED', lineHeight: 1.1, marginBottom: '1.25rem' }}
            >
              Projects & <span className="text-gradient-azure">Case Studies</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={bannerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ color: '#8892A4', fontSize: '1.0625rem', maxWidth: '480px', margin: '0 auto' }}
            >
              From national infrastructure to developer tools — each project represents a unique engineering challenge solved at scale.
            </motion.p>
          </div>
        </section>

        {/* Projects section */}
        <section className="section-pad">
          <div className="container mx-auto px-4">
            {/* Filter bar */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Filter size={14} style={{ color: '#8892A4' }} />
                <span style={{ color: '#8892A4', fontSize: '0.8125rem', fontFamily: 'Geist Mono, monospace' }}>
                  Filter by technology or organization
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    background: selectedTag === null ? '#0078D4' : 'rgba(255,255,255,0.04)',
                    color: selectedTag === null ? '#fff' : '#8892A4',
                    border: selectedTag === null ? '1px solid #0078D4' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  All ({projectsData.length})
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                    style={{
                      background: selectedTag === tag ? 'rgba(0,120,212,0.15)' : 'rgba(255,255,255,0.04)',
                      color: selectedTag === tag ? '#00B4D8' : '#8892A4',
                      border: selectedTag === tag ? '1px solid rgba(0,180,216,0.35)' : '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'Geist Mono, monospace',
                      fontSize: '0.75rem',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <p style={{ color: '#8892A4', fontSize: '0.875rem', marginBottom: '2rem', fontFamily: 'Geist Mono, monospace' }}>
              Showing {filteredProjects.length} of {projectsData.length} projects
              {selectedTag && <> · filtered by <span style={{ color: '#00B4D8' }}>{selectedTag}</span></>}
            </p>

            {/* Grid */}
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                <motion.div
                  key={selectedTag ?? 'all'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {filteredProjects.map((project, i) => (
                    <OrbitalProjectCard key={project.id} project={project} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-24"
                >
                  <p style={{ color: '#8892A4', fontSize: '1.0625rem', marginBottom: '1rem' }}>
                    No projects match that filter.
                  </p>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: '#00B4D8' }}
                  >
                    Clear filter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Personal / Vibe-coded Projects */}
        <section
          ref={personalRef}
          className="section-pad"
          style={{ background: 'var(--color-ink)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={personalInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-bold"
                  style={{ background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.3)', color: '#F5A623', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.06em', textTransform: 'uppercase' }}
                >
                  Personal
                </span>
              </div>
              <h2
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#E8EAED', lineHeight: 1.15, marginBottom: '0.75rem' }}
              >
                Side projects & <span style={{ color: '#F5A623' }}>vibe-coded</span> experiments
              </h2>
              <p style={{ color: '#8892A4', fontSize: '1rem', maxWidth: '480px' }}>
                Built for fun, curiosity, or just because — outside of work and university.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {personalProjectsData.map((project, i) => (
                <PersonalProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Projects;
