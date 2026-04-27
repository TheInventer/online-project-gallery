import { useState, useEffect, RefObject } from 'react';

// Page-level scroll progress (0–1)
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
}

// Scroll progress within a specific element (0–1)
export function useElementScrollProgress(ref: RefObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height + viewportHeight;
      const visible = viewportHeight - rect.top;
      setProgress(Math.max(0, Math.min(1, visible / total)));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [ref]);

  return progress;
}

// Y scroll offset
export function useScrollY(): number {
  const [y, setY] = useState(0);

  useEffect(() => {
    const update = () => setY(window.scrollY);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return y;
}
