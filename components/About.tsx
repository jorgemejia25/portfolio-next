'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [localY, setLocalY] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      setLocalY(Math.max(0, Math.min(1, progress)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const p = (f: number) => (localY - 0.5) * 160 * f;

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: 'clamp(100px, 15vh, 180px) 0',
        borderTop: '1px solid var(--hair)',
      }}
    >
      <div className="wrap">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'clamp(40px, 7vh, 80px)',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div className="t-eyebrow">§ 02 — About</div>
          <div className="t-eyebrow">Guatemala City ↔ Remote</div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 6vw, 96px)',
            alignItems: 'start',
          }}
        >
          <div style={{ transform: `translateY(${p(-0.25)}px)` }}>
            <h2 className="t-display" style={{ fontSize: 'clamp(52px, 8vw, 128px)' }}>
              Not a<br />
              <span className="t-italic-serif" style={{ color: 'var(--neon)', fontSize: '1.1em' }}>
                guru.
              </span>
              <br />
              Just an
              <br />
              engineer.
            </h2>
          </div>

          <div
            style={{
              transform: `translateY(${p(0.2)}px)`,
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
              paddingTop: 12,
            }}
          >
            <Reveal>
              <p
                className="t-body"
                style={{ fontSize: 'clamp(17px, 1.5vw, 21px)', lineHeight: 1.55 }}
              >
                I&apos;m Jorge — a fullstack developer with 3+ years building web products and APIs end-to-end. I care about{' '}
                <span className="t-italic-serif" style={{ color: 'var(--neon)' }}>
                  practical systems that scale and stay reliable
                </span>
                , clear interfaces, and products that solve real business workflows.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <p className="t-body" style={{ color: 'var(--fg-2)', fontSize: 16 }}>
                I currently work remotely from Guatemala City for Profitsolv (based in Knoxville, Tennessee). My background includes fullstack
                development, API delivery for messaging channels such as WhatsApp and SMS, and deployment
                coordination across cloud and on-premises environments.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                  gap: 0,
                  borderTop: '1px solid var(--hair)',
                  borderBottom: '1px solid var(--hair)',
                }}
              >
                {[
                  { n: '03+', l: 'Years' },
                  { n: '04', l: 'Featured' },
                  { n: '01', l: 'Remote Role' },
                  { n: '07', l: 'Core Skills' },
                ].map((s, i, arr) => (
                  <div
                    key={i}
                    style={{
                      padding: '24px 16px',
                      borderRight: i < arr.length - 1 ? '1px solid var(--hair)' : 'none',
                    }}
                  >
                    <div
                      className="t-display"
                      style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', lineHeight: 1 }}
                    >
                      {s.n}
                    </div>
                    <div className="t-eyebrow" style={{ marginTop: 10, fontSize: 10 }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={450}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  'Fullstack web development',
                  'API development',
                  'Frontend development',
                  'Backend development',
                  'Mobile development',
                  'Database management',
                  'UI/UX design',
                ].map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      padding: '6px 10px',
                      border: '1px solid var(--hair)',
                      color: 'var(--fg-2)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
