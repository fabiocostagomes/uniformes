import React from 'react';

import type { Locale } from '../lib/i18n/locales';
import { getHomeMessages } from '../lib/i18n/messages';
import { buildGoogleAuthUrl } from '../lib/supabase/client';

type HomePageContentProps = {
  locale: Locale;
};

export default function HomePageContent({ locale }: HomePageContentProps) {
  const content = getHomeMessages(locale);
  const googleAuthUrl = buildGoogleAuthUrl();

  return (
    <main className="page">
      <section className="card" aria-label="Hero">
        <nav className="locale-switcher" aria-label="Language">
          <a href="/pt">{content.ptLabel}</a>
          <a href="/en">{content.enLabel}</a>
        </nav>
        <h1 className="title">{content.heading}</h1>
        <p className="lead">{content.description}</p>
        <a className="cta" href={googleAuthUrl}>
          {content.cta}
        </a>
      </section>
    </main>
  );
}

