
import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

// Only renders on non-touch devices
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Ring lags behind — spring config creates natural drag
  const ringX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    // Skip on touch-first devices
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.matches('a, button, [role="button"], input, textarea, label, [data-cursor="pointer"]')
        || el.closest('a, button, [role="button"], [data-cursor="pointer"]')
      ) {
        setHovering(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const el = e.relatedTarget as HTMLElement | null;
      if (!el?.closest('a, button, [role="button"]')) {
        setHovering(false);
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onDocLeave = () => setVisible(false);
    const onDocEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onDocLeave);
    document.addEventListener('mouseenter', onDocEnter);

    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onDocLeave);
      document.removeEventListener('mouseenter', onDocEnter);
      document.documentElement.style.cursor = '';
    };
  }, [rawX, rawY, visible]);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  const ringSize = clicking ? 28 : hovering ? 44 : 36;
  const ringOpacity = visible ? 1 : 0;
  const dotOpacity = visible ? 1 : 0;

  return (
    <>
      {/* Outer ring — spring-lagged */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          position: 'fixed',
          top: 0, left: 0,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderRadius: '50%',
          border: hovering
            ? '1.5px solid rgba(0,180,216,0.8)'
            : '1.5px solid rgba(232,234,237,0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: ringOpacity,
          backdropFilter: hovering ? 'blur(0px)' : 'none',
          mixBlendMode: 'normal',
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, border-color 0.2s ease, opacity 0.15s ease',
          boxShadow: hovering ? '0 0 12px rgba(0,180,216,0.25)' : 'none',
        }}
      />

      {/* Inner dot — tracks cursor exactly */}
      <motion.div
        style={{
          x: rawX,
          y: rawY,
          position: 'fixed',
          top: 0, left: 0,
          width: clicking ? 3 : 5,
          height: clicking ? 3 : 5,
          marginLeft: clicking ? -1.5 : -2.5,
          marginTop: clicking ? -1.5 : -2.5,
          borderRadius: '50%',
          background: hovering ? '#00B4D8' : '#E8EAED',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: dotOpacity,
          transition: 'width 0.15s ease, height 0.15s ease, background 0.2s ease, opacity 0.15s ease',
        }}
      />
    </>
  );
}
