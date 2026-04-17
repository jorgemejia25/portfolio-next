'use client';

import { useEffect, useRef } from 'react';

/** Keeps the ring readable on both light and dark page regions (replaces unreliable mix-blend). */
const CURSOR_HALO =
  '0 0 0 1px rgba(255, 255, 255, 0.85), 0 0 0 3px rgba(0, 0, 0, 0.38)';

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  // Track hover state without triggering re-renders
  const hoverRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    let curX = window.innerWidth / 2;
    let curY = window.innerHeight / 2;
    let dirty = false;

    const move = (e: MouseEvent) => {
      curX = e.clientX;
      curY = e.clientY;
      dirty = true;

      const target = e.target as Element;
      const isHover = !!target.closest('[data-cursor="hover"]');
      if (isHover !== hoverRef.current) {
        hoverRef.current = isHover;
        applyHoverStyle(isHover);
      }
    };

    const applyHoverStyle = (hover: boolean) => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      if (hover) {
        ring.style.width = '56px';
        ring.style.height = '56px';
        ring.style.background = 'transparent';
        ring.style.border = '1px solid var(--neon)';
        ring.style.boxShadow = CURSOR_HALO;
        dot.style.opacity = '1';
      } else {
        ring.style.width = '8px';
        ring.style.height = '8px';
        ring.style.background = 'var(--fg)';
        ring.style.border = 'none';
        ring.style.boxShadow = CURSOR_HALO;
        dot.style.opacity = '0';
      }
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!dirty) return;
      dirty = false;
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring) return;
      const t = `translate3d(calc(${curX}px - 50%), calc(${curY}px - 50%), 0)`;
      ring.style.transform = t;
      if (dot) dot.style.transform = t;
    };

    window.addEventListener('mousemove', move, { passive: true });
    applyHoverStyle(false);
    dirty = true;
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="jm-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          pointerEvents: 'none',
          zIndex: 9999,
          transition:
            'width .3s cubic-bezier(.2,.7,.2,1), height .3s cubic-bezier(.2,.7,.2,1), background .3s, border .3s, box-shadow .3s',
          background: 'var(--fg)',
          boxShadow: CURSOR_HALO,
          borderRadius: '50%',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        className="jm-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          pointerEvents: 'none',
          zIndex: 10000,
          background: 'var(--neon)',
          borderRadius: '50%',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.35)',
          opacity: 0,
          transition: 'opacity .2s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
