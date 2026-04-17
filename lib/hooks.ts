'use client';

import { useCallback, useEffect, useState } from 'react';

/** Fires once when element enters viewport (≥15% visible). Returns [ref, isVisible]. */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useCallback((el: T | null) => setNode(el), []);

  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node]);

  return [ref, visible] as const;
}

/**
 * Returns a 0..1 progress value as the section scrolls through the viewport.
 * Returns [ref, progress].
 */
export function useParallax<T extends HTMLElement = HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);
  const [p, setP] = useState(0);
  const ref = useCallback((el: T | null) => setNode(el), []);

  useEffect(() => {
    if (!node) return;
    let raf = 0;
    const update = () => {
      const r = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = 1 - (r.top + r.height) / (vh + r.height);
      setP(Math.max(0, Math.min(1, prog)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [node]);

  return [ref, p] as const;
}
