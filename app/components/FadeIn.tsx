"use client";

import { motion } from 'framer-motion';
import React from 'react';

type FadeInProps = React.PropsWithChildren<{
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: any;
  className?: string;
}>;

export default function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, as = 'div', className = '' }: FadeInProps) {
  const Comp: any = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
    >
      {children}
    </Comp>
  );
}
