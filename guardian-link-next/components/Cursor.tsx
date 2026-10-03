'use client';

import { useEffect, useRef } from 'react';

/** Small orange cursor dot that grows over interactive elements (pointer devices only). */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia('(hover: hover)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = dot.current!;
    let mx = 0, my = 0, x = 0, y = 0, id = 0;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; el.classList.add('is-on'); };
    const over = (e: MouseEvent) => el.classList.toggle('is-hover', !!(e.target as HTMLElement).closest('a,button,.aud,.sit,.card-link,label'));
    const leave = () => el.classList.remove('is-on');
    const loop = () => { x += (mx - x) * 0.2; y += (my - y) * 0.2; el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; id = requestAnimationFrame(loop); };
    addEventListener('mousemove', move); addEventListener('mouseover', over); document.addEventListener('mouseleave', leave);
    loop();
    return () => { cancelAnimationFrame(id); removeEventListener('mousemove', move); removeEventListener('mouseover', over); document.removeEventListener('mouseleave', leave); };
  }, []);
  return <div className="cursor-dot" ref={dot} aria-hidden="true" />;
}
