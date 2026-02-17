import React from 'react';

import { buildGoogleAuthUrl } from '../../lib/supabase/client';

import './v2.css';

export default function V2Page() {
  const googleAuthUrl = buildGoogleAuthUrl();

  return (
    <main className="v2">
      <nav className="v2-version-nav" aria-label="Versões">
        <a href="/v1">V1</a>
        <a href="/v2" aria-current="page">V2</a>
        <a href="/v3">V3</a>
        <a href="/v4">V4</a>
      </nav>

      <section className="v2-hero">
        <nav className="v2-locale" aria-label="Idioma">
          <a href="/pt">Português</a>
          <a href="/en">English</a>
        </nav>

        <div className="v2-circles" aria-hidden="true">
          <div className="v2-circle v2-circle-1" />
          <div className="v2-circle v2-circle-2" />
          <div className="v2-circle v2-circle-3" />
        </div>

        <div className="v2-hero-content">
          <p className="v2-kicker">Uniformes do Colégio</p>
          <h1 className="v2-headline">
            Fecha o ciclo.
            <br />
            <span className="v2-light">Partilha uniformes.</span>
          </h1>
          <p className="v2-sub">
            Uma plataforma comunitária para dar nova vida aos uniformes
            escolares, de família para família.
          </p>
          <a className="v2-cta" href={googleAuthUrl}>
            Entrar com Google
          </a>
        </div>
      </section>

      <section className="v2-steps">
        <h2 className="v2-section-title">Três passos simples</h2>
        <div className="v2-steps-row">
          <div className="v2-step">
            <div className="v2-step-icon">1</div>
            <h3>Valida</h3>
            <p>Entras com Google e confirmas a tua escola.</p>
          </div>
          <div className="v2-step-connector" aria-hidden="true" />
          <div className="v2-step">
            <div className="v2-step-icon">2</div>
            <h3>Publica</h3>
            <p>Crias o teu anúncio com fotos do uniforme.</p>
          </div>
          <div className="v2-step-connector" aria-hidden="true" />
          <div className="v2-step">
            <div className="v2-step-icon">3</div>
            <h3>Combina</h3>
            <p>Contactas diretamente no WhatsApp.</p>
          </div>
        </div>
      </section>

      <section className="v2-bottom">
        <p className="v2-bottom-text">Economia circular começa na escola.</p>
        <a className="v2-cta" href={googleAuthUrl}>
          Começar agora
        </a>
      </section>
    </main>
  );
}
