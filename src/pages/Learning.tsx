
import { motion } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import Footer from '../components/Footer';
import LearningShelf from '@/components/sections/LearningShelf';
import { pageVariants } from '@/animations';

const Learning = () => (
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
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'var(--color-ink)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,120,212,0.1) 0%, transparent 60%)' }} />
        <div className="container mx-auto px-4 text-center relative">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="label-text mb-4"
          >
            Continuous Learning
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#E8EAED',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
            }}
          >
            Books & <span className="text-gradient-azure">Courses</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ color: '#8892A4', fontSize: '1.0625rem', maxWidth: '480px', margin: '0 auto' }}
          >
            The resources that shaped how I think about systems, reliability, and engineering at scale.
          </motion.p>
        </div>
      </section>
      <LearningShelf />
    </main>
    <Footer />
  </motion.div>
);

export default Learning;
