'use client';

import { useReveal, useParallax } from '@/lib/hooks';
import ScrollMask from './ScrollMask';

const EXPERIENCE = [
  {
    year: '2025 — Present',
    role: 'Fullstack Developer',
    company: 'Profitsolv',
    loc: 'GUATEMALA CITY · REMOTE (PROFITSOLV · KNOXVILLE, TENNESSEE)',
    desc: 'Building and maintaining production web applications and APIs as a fullstack engineer using .NET and NextJS.',
    tags: ['.NET', 'NextJS', 'Fullstack'],
  },
  {
    year: '2022 — 2025',
    role: 'Software Engineer',
    company: 'Orade',
    loc: 'Guatemala City · Remote',
    desc: 'Developed and shipped production web features across multiple client and internal projects.',
    tags: ['Frontend', 'Backend', 'Delivery'],
  },
  {
    year: '2020 — 2022',
    role: 'Freelance Web Developer',
    company: 'Independent',
    loc: 'Guatemala City',
    desc: 'Delivered custom websites and web applications for small businesses and independent clients.',
    tags: ['Freelance', 'Web Dev', 'Clients'],
  },
];

interface TimelineRowProps {
  item: (typeof EXPERIENCE)[0];
  index: number;
  last: boolean;
}

function TimelineRow({ item, index, last }: TimelineRowProps) {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={'reveal' + (visible ? ' in' : '')}
      data-cursor="hover"
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr',
        gap: 'clamp(20px, 4vw, 56px)',
        padding: 'clamp(32px, 5vw, 52px) 0',
        borderBottom: last ? 'none' : '1px solid var(--hair)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div
        className="exp-year"
        style={{ fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '0.1em', color: 'var(--fg-2)' }}
      >
        {item.year}
      </div>

      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 14,
                color: 'var(--fg-2)',
                letterSpacing: '-0.01em',
                marginBottom: 6,
              }}
            >
              {item.role}
            </div>
            <div
              className="t-display"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1 }}
            >
              {item.company}
            </div>
          </div>
          <div className="t-eyebrow" style={{ color: 'var(--fg-dim)' }}>
            ◉ {item.loc}
          </div>
        </div>

        <p
          className="t-body"
          style={{
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            color: 'var(--fg-2)',
            lineHeight: 1.55,
            margin: '18px 0 0',
            maxWidth: 620,
          }}
        >
          {item.desc}
        </p>

        <div style={{ marginTop: 18, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {item.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                padding: '4px 10px',
                border: '1px solid var(--hair)',
                color: 'var(--fg-2)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [pref, p] = useParallax<HTMLElement>();

  return (
    <section
      ref={pref}
      id="experience"
      style={{
        padding: 'clamp(100px, 15vh, 180px) 0',
        borderTop: '1px solid var(--hair)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax ghost word, right-aligned */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-4vw',
          top: '20%',
          fontFamily: 'var(--display)',
          fontSize: 'clamp(180px, 26vw, 400px)',
          fontWeight: 500,
          lineHeight: 0.8,
          color: 'transparent',
          WebkitTextStroke: '1px var(--ghost-stroke)',
          letterSpacing: '-0.06em',
          transform: `translate3d(${p * 240}px, ${p * -100}px, 0)`,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        2020—&apos;26
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 32,
            flexWrap: 'wrap',
            marginBottom: 'clamp(40px, 7vh, 80px)',
          }}
        >
          <div>
            <div className="t-eyebrow" style={{ marginBottom: 16 }}>
              § 04 — Career
            </div>
            <h2 className="t-h2">
              <ScrollMask>Time</ScrollMask>
              <span className="t-italic-serif" style={{ color: 'var(--neon)' }}>
                line
              </span>
            </h2>
          </div>
          <div className="t-eyebrow" style={{ textAlign: 'right' }}>
            <div>2020 → 2026</div>
            <div style={{ marginTop: 4, color: 'var(--fg-dim)' }}>{EXPERIENCE.length} entries</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--hair)' }}>
          {EXPERIENCE.map((item, i) => (
            <TimelineRow key={i} item={item} index={i} last={i === EXPERIENCE.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
