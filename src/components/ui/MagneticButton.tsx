import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  as?: 'button' | 'a';
  magnetStrength?: number; // 0–1, default 0.4
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export default function MagneticButton({
  children,
  className = '',
  style,
  onClick,
  href,
  target,
  rel,
  as: Tag = 'button',
  magnetStrength = 0.4,
  disabled = false,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    x.set(distX * magnetStrength);
    y.set(distY * magnetStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const baseStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #0078D4, #00B4D8)',
      color: '#ffffff',
      border: 'none',
      boxShadow: hovered
        ? '0 0 32px rgba(0,180,216,0.5), 0 8px 24px rgba(0,0,0,0.3)'
        : '0 0 0px rgba(0,180,216,0)',
    },
    secondary: {
      background: 'transparent',
      color: '#E8EAED',
      border: '1px solid rgba(255,255,255,0.12)',
      boxShadow: hovered ? '0 0 0 1px rgba(0,180,216,0.4)' : 'none',
    },
    ghost: {
      background: 'transparent',
      color: '#00B4D8',
      border: '1px solid rgba(0,180,216,0.25)',
      boxShadow: hovered ? '0 0 20px rgba(0,180,216,0.15)' : 'none',
    },
  };

  const sharedStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 28px',
    borderRadius: '9999px',
    fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
    fontSize: '0.9375rem',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s',
    userSelect: 'none',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...baseStyles[variant],
    ...style,
  };

  const motionProps = {
    ref,
    style: { x, y, ...sharedStyle },
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: handleMouseLeave,
    whileTap: disabled ? {} : { scale: 0.96 },
    transition: { type: 'spring', stiffness: 300, damping: 25 },
    className,
  };

  if (Tag === 'a' || href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </motion.button>
  );
}
