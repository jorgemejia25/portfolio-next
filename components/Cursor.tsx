'use client';

import { useEffect, useRef } from 'react';

/** Keeps the ring readable on both light and dark page regions (replaces unreliable mix-blend). */
const CURSOR_HALO =
  '0 0 0 1px rgba(255, 255, 255, 0.85), 0 0 0 3px rgba(0, 0, 0, 0.38)';

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const downRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let dotX = targetX;
    let dotY = targetY;
    let visible = false;

    const applyStateStyle = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;
      const hover = hoverRef.current;
      const down = downRef.current;

      if (hover) {
        ring.style.width = down ? '46px' : '56px';
        ring.style.height = down ? '46px' : '56px';
        ring.style.background = down ? 'color-mix(in srgb, var(--neon) 16%, transparent)' : 'transparent';
        ring.style.border = '1px solid var(--neon)';
        ring.style.boxShadow = CURSOR_HALO;
        dot.style.opacity = '1';
      } else {
        ring.style.width = down ? '6px' : '8px';
        ring.style.height = down ? '6px' : '8px';
        ring.style.background = 'var(--fg)';
        ring.style.border = 'none';
        ring.style.boxShadow = CURSOR_HALO;
        dot.style.opacity = down ? '0.5' : '0';
      }
    };

    const setVisible = (next: boolean) => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;
      visible = next;
      ring.style.opacity = next ? '1' : '0';
      if (!next) dot.style.opacity = '0';
    };

    const move = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);

      const target = e.target as Element;
      const isHover = !!target.closest('[data-cursor="hover"]');
      if (isHover !== hoverRef.current) {
        hoverRef.current = isHover;
        applyStateStyle();
      }
    };

    const down = () => {
      downRef.current = true;
      applyStateStyle();
    };

    const up = () => {
      downRef.current = false;
      applyStateStyle();
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onBlur = () => setVisible(false);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring) return;

      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      dotX += (targetX - dotX) * 0.34;
      dotY += (targetY - dotY) * 0.34;

      ring.style.transform = `translate3d(calc(${ringX}px - 50%), calc(${ringY}px - 50%), 0)`;
      if (dot) dot.style.transform = `translate3d(calc(${dotX}px - 50%), calc(${dotY}px - 50%), 0)`;
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mousedown', down, { passive: true });
    window.addEventListener('mouseup', up, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });
    window.addEventListener('blur', onBlur, { passive: true });
    window.addEventListener('mouseenter', onEnter, { passive: true });
    applyStateStyle();
    setVisible(false);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('mouseenter', onEnter);
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
            'opacity .2s, width .3s cubic-bezier(.2,.7,.2,1), height .3s cubic-bezier(.2,.7,.2,1), background .2s, border .2s, box-shadow .2s',
          background: 'var(--fg)',
          boxShadow: CURSOR_HALO,
          borderRadius: '50%',
          opacity: 0,
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
          transition: 'opacity .2s, transform .12s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
