'use client';

import { useEffect, useState } from 'react';

interface HeroProps {
  scrollY: number;
}

export default function Hero({ scrollY }: HeroProps) {
  const [time, setTime] = useState('');
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'America/Guatemala',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        }).format(d),
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const mx = (mouse.x - 0.5) * 16;
  const my = (mouse.y - 0.5) * 16;
  const p = (f: number) => scrollY * f;

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 120,
        paddingBottom: 80,
        overflow: 'hidden',
      }}
    >
      {/* Parallax background: massive ghosted mark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          transform: `translate3d(${mx * 1.2}px, ${p(-0.3) + my * 1.2}px, 0)`,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(400px, 60vw, 880px)',
            fontWeight: 500,
            lineHeight: 0.8,
            color: 'transparent',
            WebkitTextStroke: '1px var(--ghost-stroke)',
            letterSpacing: '-0.06em',
          }}
        >
          JM
        </div>
      </div>

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          transform: `translateY(${p(-0.1)}px)`,
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        {/* Top meta row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: 'clamp(40px, 7vh, 80px)',
            transform: `translateY(${p(-0.15)}px)`,
          }}
        >
          <div className="t-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                display: 'inline-block',
                width: 28,
                height: 1,
                background: 'var(--neon)',
              }}
            />
            Portfolio / 2026
          </div>
          <div className="t-eyebrow" style={{ textAlign: 'right' }}>
            <div>Guatemala City, GT · {time}</div>
          </div>
        </div>

        {/* Main display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'clamp(32px, 5vh, 64px)',
            transform: `translate3d(${mx * -0.4}px, ${p(-0.2)}px, 0)`,
          }}
        >
          <h1
            className="t-display"
            style={{ fontSize: 'clamp(64px, 14vw, 240px)' }}
          >
            <div
              style={{
                overflow: 'visible',
                paddingBottom: '0.18em',
                marginBottom: '-0.18em',
              }}
            >
              <div style={{ animation: 'fadeUp .9s cubic-bezier(.2,.7,.2,1) both' }}>Jorge</div>
            </div>
            <div
              style={{
                overflow: 'visible',
                paddingBottom: '0.18em',
                marginBottom: '-0.18em',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  animation: 'fadeUp 1s cubic-bezier(.2,.7,.2,1) .15s both',
                }}
              >
                <span
                  className="t-italic-serif"
                  style={{
                    fontSize: '1.05em',
                    color: 'var(--fg-2)',
                    marginRight: '0.08em',
                    fontWeight: 650,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Mejía
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.14em',
                    letterSpacing: 0,
                    color: 'var(--fg-2)',
                    marginLeft: '0.5em',
                    alignSelf: 'center',
                    fontWeight: 400,
                  }}
                >
                  / xor·xeh meh·hee·a
                </span>
              </div>
            </div>
          </h1>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: -20,
            left: 'var(--gutter)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--fg-dim)',
            animation: 'pulse 2.8s ease-in-out infinite',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 24,
              height: 1,
              background: 'var(--fg-dim)',
            }}
          />
          Scroll
        </div>
      </div>
    </section>
  );
}
