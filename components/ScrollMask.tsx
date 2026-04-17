'use client';

import { useParallax } from '@/lib/hooks';
import { CSSProperties, ElementType, ReactNode } from 'react';

interface ScrollMaskProps {
  children: ReactNode;
  style?: CSSProperties;
  as?: ElementType;
}

export default function ScrollMask({ children, style = {}, as: Tag = 'span' }: ScrollMaskProps) {
  const [ref, p] = useParallax();
  const chars = String(children).split('');
  const t = Math.max(0, Math.min(1, (p - 0.1) / 0.45));

  return (
    <Tag ref={ref} style={{ display: 'inline-block', ...style }}>
      {chars.map((c, i) => {
        const localT = Math.max(0, Math.min(1, t * chars.length - i));
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: 0.15 + localT * 0.85,
              transform: `translateY(${(1 - localT) * 24}px)`,
              filter: `blur(${(1 - localT) * 5}px)`,
              whiteSpace: 'pre',
              transition: 'none',
            }}
          >
            {c === ' ' ? '\u00A0' : c}
          </span>
        );
      })}
    </Tag>
  );
}
