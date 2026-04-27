import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, ExternalLink } from 'lucide-react';
import { useScrollY } from '@/hooks/useScrollProgress';
import { navVariants, mobileMenuVariants } from '@/animations';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/projects' },
  { label: 'Story', to: '/about' },
  { label: 'Learning', to: '/learning' },
  { label: 'Contact', to: '/contact' },
];


// ─── Nav Link ──────────────────────────────────────────────
function NavLink({ to, label, active, onClick }: {
  to: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative px-1 py-0.5 text-sm font-medium transition-colors duration-200 animated-underline"
      style={{ color: active ? '#E8EAED' : '#8892A4' }}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-active-dot"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: '#00B4D8' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  );
}

// ─── FloatingNav ───────────────────────────────────────────
export default function FloatingNav() {
  const scrollY = useScrollY();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollY > 40;

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Desktop Floating Pill ── */}
      <motion.header
        variants={navVariants}
        animate={isScrolled ? 'scrolled' : 'top'}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #0078D4, #00B4D8)',
                color: 'white',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              A
            </div>
            <span
              className="hidden sm:block text-sm font-semibold transition-colors duration-200"
              style={{
                color: '#E8EAED',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              Ajay Kumar Yadav
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                label={link.label}
                active={
                  link.to === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.to)
                }
              />
            ))}
          </nav>

          {/* Right side: Resume */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: 'rgba(0,120,212,0.12)',
                color: '#00B4D8',
                border: '1px solid rgba(0,120,212,0.25)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,120,212,0.2)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,180,216,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,120,212,0.12)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,120,212,0.25)';
              }}
            >
              Resume
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200"
            style={{ color: '#E8EAED', background: menuOpen ? 'rgba(255,255,255,0.08)' : 'transparent' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 md:hidden flex flex-col pt-[var(--nav-height)]"
            style={{
              background: 'rgba(6,10,18,0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-2 pb-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="block text-4xl font-bold py-3 text-center transition-colors duration-200"
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      letterSpacing: '-0.03em',
                      color: location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))
                        ? '#E8EAED'
                        : '#4B5563',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

            </nav>

            {/* Mobile footer line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pb-8 text-center"
              style={{ color: '#8892A4', fontSize: '0.8125rem', fontFamily: 'Geist Mono, monospace' }}
            >
              ajay.yadav109458@gmail.com
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to push page content below fixed nav */}
      <div style={{ height: 'var(--nav-height)' }} />
    </>
  );
}
