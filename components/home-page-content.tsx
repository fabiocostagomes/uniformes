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
    <main className="marketing-page">
      <section className="marketing-card" aria-label="Apresentação da iniciativa">
        <nav className="locale-switcher" aria-label="Language">
          <a href="/pt">{content.ptLabel}</a>
          <a href="/en">{content.enLabel}</a>
        </nav>

        <p className="hero-kicker">{content.initiative}</p>
        <h1 className="title">{content.heading}</h1>
        <p className="lead">{content.description}</p>

        <div className="hero-actions">
          <a className="cta" href={googleAuthUrl}>
            {content.cta}
          </a>
        </div>

        <section className="how-it-works" aria-label={content.howItWorksTitle}>
          <h2 className="subtitle">{content.howItWorksTitle}</h2>
          <ul className="steps-list">
            {content.howItWorksSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
