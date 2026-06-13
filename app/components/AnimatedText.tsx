"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
  const chars = useMemo(() => text.split(''), [text]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div aria-hidden className="invisible">{text}</div>
      <div className="inline-flex flex-wrap gap-0">
        {chars.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02, duration: 0.35, ease: 'easeOut' }}
            className="inline-block"
          >
            {ch}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
