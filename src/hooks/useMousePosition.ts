import { useState, useEffect, useCallback, RefObject } from 'react';

interface Position {
  x: number;
  y: number;
}

// Global mouse position (window-level)
export function useMousePosition(): Position {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const update = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  return position;
}

// Mouse position relative to a specific element
export function useRelativeMousePosition(ref: RefObject<HTMLElement>): Position {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const update = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', update as EventListener);
    return () => el.removeEventListener('mousemove', update as EventListener);
  }, [ref, update]);

  return position;
}

// Normalized mouse position (-1 to 1) relative to element center
export function useNormalizedMousePosition(ref: RefObject<HTMLElement>): Position {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    el.addEventListener('mousemove', update);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', update);
      el.removeEventListener('mouseleave', reset);
    };
  }, [ref]);

  return position;
}
