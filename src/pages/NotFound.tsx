
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import FloatingNav from "@/components/FloatingNav";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-void)' }}>
      <FloatingNav />

      <main
        className="flex-grow flex items-center justify-center relative overflow-hidden"
        style={{ minHeight: 'calc(100vh - var(--nav-height))' }}
      >
        {/* Ambient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(0,120,212,0.07) 0%, transparent 65%)' }}
        />
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

        {/* Glowing 404 background number */}
        <div
          className="absolute select-none pointer-events-none"
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 'clamp(16rem, 40vw, 30rem)',
            fontWeight: 900,
            letterSpacing: '-0.06em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,120,212,0.08)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          404
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Animated label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="label-text mb-6"
          >
            404 · Page not found
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#E8EAED',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
            }}
          >
            Node not found<br />
            <span
              style={{
                fontFamily: 'Geist Mono, monospace',
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                fontWeight: 400,
                letterSpacing: '0',
                background: 'linear-gradient(135deg, #0078D4, #00B4D8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {location.pathname}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ color: '#8892A4', fontSize: '1.0625rem', maxWidth: '400px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}
          >
            This cluster doesn't exist. It may have been decommissioned, moved, or never provisioned.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <MagneticButton as="a" href="/" variant="primary" magnetStrength={0.3}>
              <ArrowLeft size={16} /> Back to Home
            </MagneticButton>
            <MagneticButton as="a" href="/projects" variant="ghost" magnetStrength={0.3}>
              View Work
            </MagneticButton>
          </motion.div>

          {/* Mono error code */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontFamily: 'Geist Mono, monospace',
              fontSize: '0.75rem',
              color: '#4B5563',
              marginTop: '3rem',
              letterSpacing: '0.04em',
            }}
          >
            ERR_ROUTE_NOT_FOUND · HTTP 404 · {new Date().toISOString().split('T')[0]}
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
