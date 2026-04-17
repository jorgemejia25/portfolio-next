'use client';

interface TickerProps {
  items: string[];
  speed?: number;
}

export default function Ticker({ items, speed = 60 }: TickerProps) {
  const content = [...items, ...items, ...items];

  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--hair)',
        borderBottom: '1px solid var(--hair)',
        background: 'var(--bg)',
        padding: '14px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: `ticker ${speed}s linear infinite`,
          width: 'fit-content',
        }}
      >
        {content.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '0 32px',
              fontFamily: 'var(--mono)',
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--fg-2)',
              display: 'flex',
              alignItems: 'center',
              gap: 32,
            }}
          >
            <span>{item}</span>
            <span style={{ color: 'var(--neon)' }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
