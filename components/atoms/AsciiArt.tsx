'use client';

import { useEffect, useRef } from 'react';
import { AsciiEngine, type AsciiKind } from '@/lib/ascii';

export function AsciiArt({ kind }: { kind: AsciiKind }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const layers = element.querySelectorAll('pre');
    const engine = new AsciiEngine();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let disposed = false;
    let ready = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let time = 0;

    const draw = () => {
      if (!ready || disposed) return;
      const { bg, fg, ac } = engine.frame(kind, time);
      // Update only the text layers; animation never rerenders the React tree.
      [bg, fg, ac].forEach((text, index) => {
        if (layers[index].textContent !== text) layers[index].textContent = text;
      });
    };
    const loop = () => {
      if (!visible || document.hidden || reduced.matches || disposed) return;
      time++;
      draw();
      timer = setTimeout(loop, 90);
    };
    const resume = () => {
      clearTimeout(timer);
      if (ready && visible && !document.hidden) {
        draw();
        if (!reduced.matches) timer = setTimeout(loop, 90);
      }
    };
    const resize = () => {
      const context = document.createElement('canvas').getContext('2d');
      if (context) {
        context.font = '8px "Fragment Mono", monospace';
        engine.cw = context.measureText('M').width || 4.8;
      }
      engine.columns = Math.min(300, Math.ceil(Math.max(0, element.clientWidth - (kind === 'footer' ? 0 : 16)) / engine.cw));
      engine.gCols = Math.max(20, Math.floor(element.clientWidth / engine.cw));
      engine.gRows = Math.max(12, Math.floor(element.clientHeight / 8));
      if (visible) draw();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    observer.observe(element);
    const ro = new ResizeObserver(resize);
    ro.observe(element);
    document.fonts.load('8px "Fragment Mono"').catch(() => {}).then(() => {
      if (disposed) return;
      ready = true;
      resize();
      resume();
    });
    reduced.addEventListener('change', resume);
    document.addEventListener('visibilitychange', resume);
    return () => {
      disposed = true;
      clearTimeout(timer);
      observer.disconnect();
      ro.disconnect();
      reduced.removeEventListener('change', resume);
      document.removeEventListener('visibilitychange', resume);
    };
  }, [kind]);

  return <div ref={ref} className={`ascii ascii-${kind}`} aria-hidden="true">
    <pre className="ascii-muted" />
    <pre className="ascii-foreground" />
    <pre className="ascii-accent" />
  </div>;
}
