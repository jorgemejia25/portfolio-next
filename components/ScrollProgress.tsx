'use client';

import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  scrollY: number;
}

export default function ScrollProgress({ scrollY }: ScrollProgressProps) {
  const [max, setMax] = useState(1);

  useEffect(() => {
    const update = () =>
      setMax(Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pct = Math.min(100, (scrollY / max) * 100);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'transparent',
        zIndex: 200,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: pct + '%',
          background: 'var(--neon)',
          boxShadow: '0 0 10px var(--neon)',
          transition: 'width .1s linear',
        }}
      />
    </div>
  );
}
