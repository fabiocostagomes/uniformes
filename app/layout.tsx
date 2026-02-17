import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import SiteFooter from '../components/site-footer';

import './theme.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Uniformes do Colégio',
  description: 'Marketplace de uniformes usados entre pais.',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-PT">
      <body>
        <div className="app-shell">
          <div className="app-main">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
