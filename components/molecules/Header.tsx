'use client';

import { useEffect, useState } from 'react';

function GuatemalaClock() {
  const [clock, setClock] = useState('--:--:--');
  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Guatemala', hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    const tick = () => setClock(format.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="header-clock muted">GT <span className="foreground">{clock}</span></span>;
}

export function Header() {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { setTheme(document.documentElement.dataset.theme || 'dark'); }, []);
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('jm-theme', next); } catch {}
  }
  return <header className="header">
    <div className="container header-inner">
      <a href="#top" className="brand"><span>[jm]</span> Jorge Mejía</a>
      <nav id="main-navigation" className={menuOpen ? "is-open" : ""} aria-label="Main navigation" onClick={() => setMenuOpen(false)} onKeyDown={(event) => { if (event.key === "Escape") { setMenuOpen(false); document.getElementById("menu-toggle")?.focus(); } }}>
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#stack">Stack</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="header-end">
        <GuatemalaClock />
        <button id="menu-toggle" className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "[−]" : "[+]"} <span>Menu</span></button>
        <button className="button theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
          <svg className="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {theme === 'dark' ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20.8 13A9 9 0 0 1 11 3.2 9 9 0 1 0 20.8 13Z" />}
          </svg>
          <span className="theme-label">[ {theme === 'dark' ? 'light' : 'dark'} ]</span>
        </button>
      </div>
    </div>
  </header>;
}
