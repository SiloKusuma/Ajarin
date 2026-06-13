import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Jack | 3D Creator & Visual Designer',
  description: 'Bold 3D visual storytelling, motion-led product experiences, and atmospheric portfolio design.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
