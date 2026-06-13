import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Ajarin AI Learning',
  description: 'AI learning platform to create custom study material and quizzes.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
