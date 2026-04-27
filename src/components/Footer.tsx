import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/animations';
import { useInView } from '@/hooks/useInView';

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/ajay109458',
    icon: GitHubIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ajay-km-yadav/',
    icon: LinkedInIcon,
  },
  {
    label: 'Email',
    href: 'mailto:ajay.yadav109458@gmail.com',
    icon: Mail,
  },
];

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/projects' },
  { label: 'Story', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <footer
      ref={ref}
      style={{
        background: 'var(--color-ink)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={fadeUp} className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold"
                style={{
                  background: 'linear-gradient(135deg, #0078D4, #00B4D8)',
                  color: 'white',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                A
              </div>
              <span
                className="font-bold text-lg"
                style={{ color: '#E8EAED', fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.02em' }}
              >
                Ajay Kumar Yadav
              </span>
            </div>
            <p style={{ color: '#8892A4', fontSize: '0.875rem', lineHeight: '1.6', maxWidth: '240px' }}>
              Staff Software Engineer at Google. Building scalable cloud infrastructure at civilizational scale.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                  style={{ color: '#8892A4', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#00B4D8';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,180,216,0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,180,216,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#8892A4';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeUp}>
            <p
              className="mb-5"
              style={{ color: '#8892A4', fontSize: '0.75rem', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#8892A4' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#E8EAED'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#8892A4'; }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <p
              className="mb-5"
              style={{ color: '#8892A4', fontSize: '0.75rem', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Get in Touch
            </p>
            <a
              href="mailto:ajay.yadav109458@gmail.com"
              className="text-sm transition-colors duration-200 block mb-3"
              style={{ color: '#E8EAED' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#00B4D8'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#E8EAED'; }}
            >
              ajay.yadav109458@gmail.com
            </a>
            <p style={{ color: '#8892A4', fontSize: '0.8125rem', lineHeight: 1.6 }}>
              Research collaboration and technical consulting welcome.
            </p>
            <a
              href="https://www.linkedin.com/in/ajay-km-yadav/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium transition-colors duration-200"
              style={{ color: '#00B4D8' }}
            >
              Connect on LinkedIn <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="divider mb-8" />

        {/* Bottom row */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p style={{ color: '#8892A4', fontSize: '0.8125rem', fontFamily: 'Geist Mono, monospace' }}>
            © {currentYear} Ajay Kumar Yadav. Built with precision.
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#22c55e' }}
            />
            <span style={{ color: '#8892A4', fontSize: '0.8125rem', fontFamily: 'Geist Mono, monospace' }}>
              Google · Microsoft · UT Austin
            </span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
