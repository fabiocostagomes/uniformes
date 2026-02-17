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
    <main className="v2">
      <section className="v2-hero">
        <nav className="v2-locale" aria-label="Language">
          <a href="/pt">{content.ptLabel}</a>
          <a href="/en">{content.enLabel}</a>
        </nav>

        <div className="v2-circles" aria-hidden="true">
          <div className="v2-circle v2-circle-1" />
          <div className="v2-circle v2-circle-2" />
          <div className="v2-circle v2-circle-3" />
        </div>

        <div className="v2-hero-content">
          <p className="v2-kicker">{content.kicker}</p>
          <h1 className="v2-headline">
            {content.headlineBold}
            <br />
            <span className="v2-light">{content.headlineLight}</span>
          </h1>
          <p className="v2-sub">{content.description}</p>
          <a className="v2-cta" href={googleAuthUrl}>
            {content.cta}
          </a>
        </div>
      </section>

      <section className="v2-steps">
        <h2 className="v2-section-title">{content.stepsTitle}</h2>
        <div className="v2-steps-row">
          {content.steps.map((step, i) => (
            <React.Fragment key={step.title}>
              {i > 0 && (
                <div className="v2-step-connector" aria-hidden="true" />
              )}
              <div className="v2-step">
                <div className="v2-step-icon">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="v2-bottom">
        <p className="v2-bottom-text">{content.bottomText}</p>
        <a className="v2-cta" href={googleAuthUrl}>
          {content.bottomCta}
        </a>
      </section>
    </main>
  );
}
