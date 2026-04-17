'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const [localY, setLocalY] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setLocalY((window.innerHeight - rect.top) / window.innerHeight);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const copy = () => {
    navigator.clipboard?.writeText('devjorgemejia@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: 'relative',
        padding: 'clamp(120px, 18vh, 220px) 0 40px',
        borderTop: '1px solid var(--hair)',
        overflow: 'hidden',
      }}
    >
      {/* Parallax giant text */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-5%',
          right: '-5%',
          fontFamily: 'var(--display)',
          fontSize: 'clamp(180px, 28vw, 520px)',
          fontWeight: 500,
          lineHeight: 0.85,
          letterSpacing: '-0.05em',
          color: 'transparent',
          WebkitTextStroke: '1px var(--ghost-stroke)',
          transform: `translateY(${(1 - localY) * -120}px)`,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        SAY HELLO
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(32px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >
          <Reveal>
            <div
              className="t-eyebrow"
              style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <span style={{ width: 28, height: 1, background: 'var(--neon)' }} />
              § 05 — Contact
            </div>
            <h2
              className="t-display"
              style={{ fontSize: 'clamp(60px, 9vw, 160px)', lineHeight: 0.9 }}
            >
              Got a<br />
              <span className="t-italic-serif" style={{ color: 'var(--neon)' }}>
                project?
              </span>
            </h2>
            <p
              className="t-body"
              style={{
                fontSize: 'clamp(16px, 1.4vw, 20px)',
                color: 'var(--fg-2)',
                maxWidth: 460,
                marginTop: 32,
              }}
            >
              Available for full-time remote roles and contract work. Reach out by email or phone and I&apos;ll get back quickly.
            </p>
          </Reveal>

          <Reveal
            delay={200}
            style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 32 }}
          >
            <button
              data-cursor="hover"
              onClick={copy}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'var(--neon)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--hair)';
              }}
              style={{
                textAlign: 'left',
                padding: 'clamp(24px, 3vw, 36px)',
                border: '1px solid var(--hair)',
                background: copied ? 'var(--neon)' : 'var(--bg-2)',
                color: copied ? 'var(--bg)' : 'var(--fg)',
                fontFamily: 'var(--display)',
                fontSize: 'clamp(22px, 3vw, 40px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                transition: 'all .35s cubic-bezier(.2,.7,.2,1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <span>{copied ? 'Copied.' : 'devjorgemejia@gmail.com'}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.5em', opacity: 0.7 }}>
                {copied ? '✓' : '⎘ copy'}
              </span>
            </button>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                border: '1px solid var(--hair)',
              }}
            >
              {[
                { l: 'Phone', v: '+502 3157 3100', href: 'tel:+50231573100' },
                { l: 'Email', v: 'Gmail', href: 'mailto:devjorgemejia@gmail.com' },
                { l: 'LinkedIn', v: 'Profile', href: 'https://www.linkedin.com/in/jorge-andrés-mejía-621596219/?locale=en' },
                { l: 'X', v: '@jorge___mejia', href: 'https://x.com/jorge___mejia' },
                { l: 'Instagram', v: '@jorgemejia___', href: 'https://www.instagram.com/jorgemejia___/' },
                { l: 'Based in', v: 'Guatemala City', href: '#' },
              ].map((s, i, arr) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  data-cursor="hover"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'var(--bg-2)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }}
                  style={{
                    padding: '20px 20px',
                    borderRight: (i + 1) % 2 === 0 ? 'none' : '1px solid var(--hair)',
                    borderBottom: i < arr.length - 2 ? '1px solid var(--hair)' : 'none',
                    color: 'inherit',
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    transition: 'background .25s',
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: 'var(--fg-dim)',
                        fontSize: 10,
                        marginBottom: 4,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                      }}
                    >
                      {s.l}
                    </div>
                    <div style={{ fontWeight: 500 }}>{s.v}</div>
                  </div>
                  <span style={{ fontSize: 16, color: 'var(--fg-2)' }}>↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 'clamp(80px, 15vh, 160px)',
            paddingTop: 24,
            borderTop: '1px solid var(--hair)',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--fg-dim)',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>© 2026 Jorge Mejía</div>
          <div>Guatemala City · Remote</div>
          <div>v04.25 — EOF</div>
        </div>
      </div>
    </section>
  );
}
