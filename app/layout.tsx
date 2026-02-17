import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'Uniformes do Colegio',
  description: 'Marketplace de uniformes usados entre pais.',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}

