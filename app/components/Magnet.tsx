"use client";

import React, { useRef, useEffect } from 'react';

export default function Magnet({ children, padding = 150, strength = 3, activeTransition = 'transform 0.3s ease-out', inactiveTransition = 'transform 0.6s ease-in-out', className = '' }: any) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rect: DOMRect | null = null;

    function updateRect() {
      rect = el.getBoundingClientRect();
    }

    updateRect();

    function onMove(e: MouseEvent) {
      if (!rect) updateRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const cx = (rect!.left + rect!.right) / 2;
      const cy = (rect!.top + rect!.bottom) / 2;
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > padding) {
        el.style.transition = inactiveTransition;
        el.style.transform = `translate3d(0,0,0)`;
        return;
      }
      const tx = dx / strength;
      const ty = dy / strength;
      el.style.transition = activeTransition;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    }

    function onLeave() {
      el.style.transition = inactiveTransition;
      el.style.transform = 'translate3d(0,0,0)';
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', updateRect);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', updateRect);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
