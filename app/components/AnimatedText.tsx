"use client";

import React, { useRef, useMemo } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });

  const chars = useMemo(() => text.split(''), [text]);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div aria-hidden className="invisible">{text}</div>
      <div className="absolute inset-0">
        {chars.map((ch, i) => {
          const input = [0, 0.5, 1];
          const output = [0.2, 0.6, 1];
          const opacity = useTransform(scrollYProgress, input, output);
          return (
            <motion.span key={i} style={{ opacity }} className="inline-block">
              {ch}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
