'use client';

import { useEffect, useRef, useState } from 'react';

interface NavProps {
  active: string;
}

const SECTIONS = [
  { id: 'hero', n: '01', l: 'Index' },
  { id: 'about', n: '02', l: 'About' },
  { id: 'projects', n: '03', l: 'Work' },
  { id: 'experience', n: '04', l: 'Career' },
  { id: 'contact', n: '05', l: 'Contact' },
];

export default function Nav({ active }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    const nav = navRef.current;
    if (el && nav) {
      const top =
        el.getBoundingClientRect().top + window.scrollY - nav.offsetHeight;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
    setOpen(false);
  };

  const padY = scrolled ? 14 : 22;

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingLeft: 'var(--gutter)',
        paddingRight: 'var(--gutter)',
        paddingBottom: `${padY}px`,
        paddingTop: `calc(${padY}px + env(safe-area-inset-top, 0px))`,
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--hair)' : '1px solid transparent',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.35s cubic-bezier(.2,.7,.2,1)',
      }}
    >
      <a
        href="#hero"
        data-cursor="hover"
        onClick={(e) => {
          e.preventDefault();
          jump('hero');
        }}
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            background: 'var(--neon)',
            borderRadius: '50%',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        Jorge Mejía
      </a>

      {/* Desktop nav */}
      <div className="nav-desktop" style={{ display: 'flex', gap: 4 }}>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={'#' + s.id}
            data-cursor="hover"
            onClick={(e) => {
              e.preventDefault();
              jump(s.id);
            }}
            style={{
              padding: '8px 14px',
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: active === s.id ? 'var(--neon)' : 'var(--fg-2)',
              transition: 'color .25s',
              display: 'flex',
              gap: 6,
            }}
          >
            <span style={{ opacity: 0.5 }}>{s.n}</span>
            <span>{s.l}</span>
          </a>
        ))}
      </div>

      {/* Mobile toggle */}
      <button
        className="nav-mobile"
        data-cursor="hover"
        onClick={() => setOpen(!open)}
        style={{ display: 'none', width: 32, height: 32, position: 'relative' }}
      >
        <span
          style={{
            position: 'absolute',
            left: 4,
            right: 4,
            top: 12,
            height: 1,
            background: 'var(--fg)',
            transition: 'transform .3s',
            transform: open ? 'translateY(4px) rotate(45deg)' : 'none',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: 4,
            right: 4,
            top: 20,
            height: 1,
            background: 'var(--fg)',
            transition: 'transform .3s',
            transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--nav-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--hair)',
            borderBottom: '1px solid var(--hair)',
            padding: '12px var(--gutter) 20px',
            paddingBottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={'#' + s.id}
              onClick={(e) => {
                e.preventDefault();
                jump(s.id);
              }}
              style={{
                display: 'flex',
                gap: 12,
                padding: '16px 0',
                borderBottom: '1px solid var(--hair)',
                fontFamily: 'var(--mono)',
                fontSize: 13,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: active === s.id ? 'var(--neon)' : 'var(--fg)',
                textDecoration: 'none',
              }}
            >
              <span style={{ opacity: 0.5 }}>{s.n}</span>
              <span>{s.l}</span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
