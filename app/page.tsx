'use client';

import { useEffect, useState } from 'react';
import Cursor from '@/components/Cursor';
import ScrollProgress from '@/components/ScrollProgress';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import ThemeBtn from '@/components/ThemeBtn';
import Tweaks from '@/components/Tweaks';

const DEFAULT_NEON = '#FFB547';
const DEFAULT_THEME = 'dark';

const TICKER_ITEMS = [
  'Fullstack · API Development · Frontend · Backend',
  'Based in Guatemala City · Remote',
  'devjorgemejia@gmail.com',
  '3+ years building web apps',
];

export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [active, setActive] = useState('hero');
  const [neonColor, setNeonColor] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_NEON;
    try {
      return localStorage.getItem('jm-neon') ?? DEFAULT_NEON;
    } catch {
      return DEFAULT_NEON;
    }
  });
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    try {
      return localStorage.getItem('jm-theme') ?? DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = ['hero', 'about', 'projects', 'experience', 'contact'];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Apply neon CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--neon', neonColor);
    try {
      localStorage.setItem('jm-neon', neonColor);
    } catch {}
  }, [neonColor]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('jm-theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme: next } }, '*');
    } catch {}
  };

  return (
    <>
      <ScrollProgress scrollY={scrollY} />
      <Cursor />
      <Nav active={active} />
      <Hero scrollY={scrollY} />
      <Ticker items={TICKER_ITEMS} speed={70} />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <ThemeBtn theme={theme} onToggle={toggleTheme} />
      <Tweaks neonColor={neonColor} onNeon={setNeonColor} theme={theme} onTheme={setTheme} />
    </>
  );
}
