import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'AJARIN - Platform Belajar AI yang Personal',
  description: 'Belajar dengan AI yang memahami Anda. Materi dan soal yang dipersonalisasi berdasarkan minat, hobi, dan gaya belajar Anda.',
  keywords: 'Belajar AI, Pendidikan, Personalisasi, Bahasa Indonesia, Informatika',
  authors: [{ name: 'AJARIN' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ff8c42" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
