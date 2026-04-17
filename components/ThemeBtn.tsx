'use client';

interface ThemeBtnProps {
  theme: string;
  onToggle: () => void;
}

export default function ThemeBtn({ theme, onToggle }: ThemeBtnProps) {
  return (
    <button
      data-cursor="hover"
      onClick={onToggle}
      aria-label="Toggle theme"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--neon)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--hair)';
      }}
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 400,
        width: 48,
        height: 48,
        border: '1px solid var(--hair)',
        background: 'var(--bg-2)',
        color: 'var(--fg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all .3s cubic-bezier(.2,.7,.2,1)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 18,
          height: 18,
          transition: 'transform .5s cubic-bezier(.2,.7,.2,1)',
          transform: theme === 'light' ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="5" fill={theme === 'light' ? 'currentColor' : 'none'} />
          <g opacity={theme === 'light' ? 1 : 0} style={{ transition: 'opacity .3s' }}>
            <line x1="12" y1="1" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="23" />
            <line x1="1" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="23" y2="12" />
            <line x1="4.2" y1="4.2" x2="6.3" y2="6.3" />
            <line x1="17.7" y1="17.7" x2="19.8" y2="19.8" />
            <line x1="4.2" y1="19.8" x2="6.3" y2="17.7" />
            <line x1="17.7" y1="6.3" x2="19.8" y2="4.2" />
          </g>
        </svg>
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: theme === 'dark' ? 1 : 0,
            transition: 'opacity .3s',
          }}
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      </div>
    </button>
  );
}
