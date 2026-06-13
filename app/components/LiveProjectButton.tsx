"use client";

import React from 'react';

export default function LiveProjectButton({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`${className} rounded-full font-medium uppercase tracking-widest text-sm sm:text-base px-8 py-3 sm:px-10 sm:py-3.5`}
      style={{
        border: '2px solid #D7E2EA',
        color: '#D7E2EA',
        background: 'transparent',
      }}
    >
      Live Project
    </button>
  );
}
