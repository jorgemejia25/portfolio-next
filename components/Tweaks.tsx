'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

const SWATCHES = [
  { label: 'Cyber cyan', value: '#00F0FF' },
  { label: 'Electric lime', value: '#CCFF00' },
  { label: 'Hot magenta', value: '#FF2EC4' },
  { label: 'Warm amber', value: '#FFB547' },
  { label: 'Plasma orange', value: '#FF5B22' },
  { label: 'Pure white', value: '#FFFFFF' },
];

interface TweaksProps {
  neonColor: string;
  onNeon: (c: string) => void;
  theme: string;
  onTheme: (t: string) => void;
}

const shell: CSSProperties = {
  position: 'fixed',
  bottom: 24,
  right: 24,
  zIndex: 500,
  background: 'var(--bg-2)',
  border: '1px solid var(--hair)',
  color: 'var(--fg)',
  fontFamily: 'var(--mono)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
};

const headerRow: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '14px 18px',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
};

/**
 * Theme and accent controls in a fixed panel. Collapsed by default; header toggles the full panel.
 * Parent iframes can open/close via `postMessage` types `__activate_edit_mode` / `__deactivate_edit_mode`.
 */
export default function Tweaks({ neonColor, onNeon, theme, onTheme }: TweaksProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === '__activate_edit_mode') setOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', handler);
    try {
      window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    } catch {}
    return () => window.removeEventListener('message', handler);
  }, []);

  const pickNeon = (hex: string) => {
    onNeon(hex);
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { neonColor: hex } }, '*');
    } catch {}
  };

  const pickTheme = (t: string) => {
    onTheme(t);
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme: t } }, '*');
    } catch {}
  };

  return (
    <div
      data-cursor="hover"
      id="jm-tweaks"
      style={{
        ...shell,
        minWidth: open ? 300 : undefined,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="jm-tweaks-body"
        aria-label={open ? 'Hide tweaks panel' : 'Show tweaks panel'}
        style={{
          ...headerRow,
          width: '100%',
          borderBottom: open ? '1px solid var(--hair)' : 'none',
          gap: 12,
        }}
      >
        <span style={{ flex: 1, textAlign: 'left' }}>Tweaks</span>
        <span
          aria-hidden
          style={{
            fontSize: 10,
            color: 'var(--fg-dim)',
            letterSpacing: '0.08em',
            fontWeight: 400,
          }}
        >
          {open ? 'Hide' : 'Show'}
        </span>
        <span style={{ fontSize: 14, lineHeight: 1, opacity: 0.85 }}>
          {open ? String.fromCharCode(0x2715) : '+'}
        </span>
      </button>

      {open ? (
        <div id="jm-tweaks-body">
          <div style={{ padding: 18, borderBottom: '1px solid var(--hair)' }}>
            <div
              style={{
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--fg-dim)',
                marginBottom: 12,
              }}
            >
              Theme
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { k: 'dark', l: 'Dark' },
                { k: 'light', l: 'Light' },
              ].map((t) => (
                <button
                  key={t.k}
                  type="button"
                  onClick={() => pickTheme(t.k)}
                  style={{
                    padding: '12px 10px',
                    border: theme === t.k ? '1px solid var(--neon)' : '1px solid var(--hair)',
                    background: theme === t.k ? 'var(--bg)' : 'transparent',
                    color: 'var(--fg)',
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: t.k === 'dark' ? '#0B0B0B' : '#F3F1EC',
                      border: '1px solid var(--fg-2)',
                    }}
                  />
                  {t.l}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: 18 }}>
            <div
              style={{
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--fg-dim)',
                marginBottom: 12,
              }}
            >
              Neon accent
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {SWATCHES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => pickNeon(s.value)}
                  title={s.label}
                  style={{
                    padding: 6,
                    border: neonColor === s.value ? '1px solid var(--fg)' : '1px solid transparent',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: 28,
                      background: s.value,
                      border: '1px solid var(--hair)',
                      marginBottom: 6,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 9,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--fg-2)',
                    }}
                  >
                    {s.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
