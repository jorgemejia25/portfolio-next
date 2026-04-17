'use client';

import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/lib/hooks';
import ScrollMask from './ScrollMask';

const PROJECTS = [
  {
    id: '001',
    name: 'Pollo Brujo',
    tag: 'foodtech',
    year: '2024',
    role: 'Fullstack Developer',
    desc: 'Developed the website and online ordering API for a major fast food chain in Guatemala.',
    stack: ['Angular', 'NestJS', 'API'],
    href: 'https://pollobrujo.com.gt',
    hue: 35,
  },
  {
    id: '002',
    name: 'Daury',
    tag: 'healthtech',
    year: '2026',
    role: 'Tech Lead',
    desc: 'Cognitive support platform that combines routines, reminders, guided activities, and caregiver follow-up.',
    stack: ['Next.js', 'React', 'Product Design'],
    href: 'https://daury-gt.vercel.app',
    hue: 170,
  },
  {
    id: '003',
    name: 'IxchelNet',
    tag: 'web',
    year: '2026',
    role: 'Fullstack Developer',
    desc: 'Website project for IxchelNet focused on a clear service presentation and modern web experience.',
    stack: ['Next.js', 'Frontend', 'Web'],
    href: 'https://ixchelnet.vercel.app',
    hue: 260,
  },
  {
    id: '004',
    name: 'INSFIRE Guatemala',
    tag: 'corporate',
    year: '2026',
    role: 'Web Developer',
    desc: 'Corporate website for a fire protection engineering company, showcasing services, certifications, and projects.',
    stack: ['Next.js', 'UI', 'SEO'],
    href: 'https://www.insfiregt.com',
    hue: 10,
  },
];

interface ProjectRowProps {
  project: (typeof PROJECTS)[0];
  index: number;
  last: boolean;
}

function ProjectRow({ project, index, last }: ProjectRowProps) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  const [hover, setHover] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  return (
    <div
      ref={ref}
      data-cursor="hover"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMove}
      className={'reveal' + (visible ? ' in' : '')}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        padding: 'clamp(28px, 4vw, 48px) 0',
        borderBottom: last ? 'none' : '1px solid var(--hair)',
        position: 'relative',
        transitionDelay: `${index * 60}ms`,
      }}
    >
      <div
        className="proj-row"
        style={{
          display: 'grid',
          gridTemplateColumns: '60px minmax(0, 2fr) minmax(0, 2.5fr) 160px',
          gap: 'clamp(20px, 3vw, 40px)',
          alignItems: 'center',
        }}
      >
        {/* Index */}
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            letterSpacing: '0.1em',
            color: hover ? 'var(--neon)' : 'var(--fg-dim)',
            transition: 'color .3s',
          }}
        >
          {project.id}
        </div>

        {/* Name */}
        <div>
          <div
            className="t-display"
            style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              lineHeight: 1,
              transition: 'transform .4s cubic-bezier(.2,.7,.2,1)',
              transform: hover ? 'translateX(8px)' : 'none',
            }}
          >
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {project.name.split(' ').map((w, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? (
                    <span
                      className={hover ? 't-italic-serif' : ''}
                      style={{ transition: 'color .3s', color: hover ? 'var(--neon)' : 'inherit' }}
                    >
                      {w}
                    </span>
                  ) : (
                    w
                  )}
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              ))}
            </a>
          </div>
          <div
            className="proj-meta"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: 'var(--fg-dim)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginTop: 10,
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <span>{project.year}</span>
            <span>◦ {project.tag}</span>
            <span>◦ {project.role}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <p
            className="t-body"
            style={{
              fontSize: 'clamp(14px, 1.1vw, 16px)',
              color: 'var(--fg-2)',
              lineHeight: 1.55,
              maxWidth: 480,
            }}
          >
            {project.desc}
          </p>
          <div
            className="proj-stack"
            style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}
          >
            {project.stack.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  padding: '4px 10px',
                  border: '1px solid var(--hair)',
                  color: 'var(--fg-2)',
                  letterSpacing: '0.1em',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div
          className="proj-preview"
          style={{
            position: 'relative',
            width: 160,
            height: 100,
            overflow: 'hidden',
            border: '1px solid var(--hair)',
            transition: 'transform .5s cubic-bezier(.2,.7,.2,1)',
            transform: hover ? 'scale(1.04)' : 'scale(1)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `repeating-linear-gradient(
                ${45 + index * 30}deg,
                oklch(0.28 0.12 ${project.hue}),
                oklch(0.28 0.12 ${project.hue}) 10px,
                oklch(0.16 0.08 ${project.hue}) 10px,
                oklch(0.16 0.08 ${project.hue}) 20px
              )`,
              transform: hover
                ? `translate(${(mouse.x - 0.5) * 20}px, ${(mouse.y - 0.5) * 20}px) scale(1.15)`
                : 'scale(1)',
              transition: 'transform .3s cubic-bezier(.2,.7,.2,1)',
              filter: hover ? 'saturate(1.4) contrast(1.1)' : 'saturate(1)',
            }}
          />
          {hover && (
            <div
              style={{
                position: 'absolute',
                top: `${mouse.y * 100}%`,
                left: 0,
                right: 0,
                height: 1,
                background: 'var(--neon)',
                opacity: 0.8,
                mixBlendMode: 'screen',
              }}
            />
          )}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7))',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: 8,
              fontFamily: 'var(--mono)',
              fontSize: 9,
              color: '#fff',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ opacity: 0.6 }}>preview</span>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              style={{
                opacity: hover ? 1 : 0,
                transition: 'opacity .3s',
                color: 'var(--neon)',
                textDecoration: 'none',
              }}
            >
              ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const years = PROJECTS.map((p) => Number(p.year)).filter((y) => Number.isFinite(y));
  const minYear = years.length ? Math.min(...years) : 2024;
  const maxYear = years.length ? Math.max(...years) : 2026;

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const rel = (window.scrollY + window.innerHeight - top) / (window.innerHeight + r.height);
      setOffset(Math.max(0, Math.min(1, rel)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section
      ref={ref}
      id="projects"
      style={{
        padding: 'clamp(100px, 15vh, 180px) 0',
        borderTop: '1px solid var(--hair)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax ghost word */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '-4vw',
          top: '40%',
          fontFamily: 'var(--display)',
          fontSize: 'clamp(180px, 28vw, 420px)',
          fontWeight: 500,
          lineHeight: 0.8,
          color: 'transparent',
          WebkitTextStroke: '1px var(--ghost-stroke)',
          letterSpacing: '-0.06em',
          transform: `translate3d(${-offset * 200}px, ${-offset * 80}px, 0)`,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        WORK/WORK
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
              § 03 — Selected Work
            </div>
            <h2 className="t-h2">
              <ScrollMask>Work</ScrollMask>
              <span style={{ color: 'var(--neon)' }}>.</span>
            </h2>
          </div>
          <div className="t-eyebrow" style={{ textAlign: 'right' }}>
            <div>{PROJECTS.length.toString().padStart(2, '0')} selected projects</div>
            <div style={{ marginTop: 4, color: 'var(--fg-dim)' }}>
              {minYear} — {maxYear}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--hair)' }}>
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} last={i === PROJECTS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
