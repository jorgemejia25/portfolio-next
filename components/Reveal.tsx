'use client';

import { useReveal } from '@/lib/hooks';
import { CSSProperties, ElementType, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  style?: CSSProperties;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  style,
  className,
}: RevealProps) {
  const [ref, visible] = useReveal();

  return (
    <Tag
      ref={ref}
      className={['reveal', visible ? 'in' : '', className].filter(Boolean).join(' ')}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
