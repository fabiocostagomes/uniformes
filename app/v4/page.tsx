import React from 'react';

import { buildGoogleAuthUrl } from '../../lib/supabase/client';

import './v4.css';

export default function V4Page() {
  const googleAuthUrl = buildGoogleAuthUrl();

  return (
    <main className="v4">
      <nav className="v4-version-nav" aria-label="Versões">
        <a href="/v1">V1</a>
        <a href="/v2">V2</a>
        <a href="/v3">V3</a>
        <a href="/v4" aria-current="page">V4</a>
      </nav>

      <section className="v4-hero">
        <nav className="v4-locale" aria-label="Idioma">
          <a href="/pt">Português</a>
          <a href="/en">English</a>
        </nav>

        <div className="v4-hero-content">
          <p className="v4-kicker">Uniformes do Colégio</p>
          <h1 className="v4-headline">
            De família
            <br />
            para família.
          </h1>
          <p className="v4-sub">
            Damos nova vida aos uniformes escolares — pela comunidade, pelo
            planeta.
          </p>
          <a className="v4-cta" href={googleAuthUrl}>
            Entrar com Google
          </a>
        </div>

        <div className="v4-hero-fade" aria-hidden="true" />
      </section>

      <section className="v4-values">
        <div className="v4-values-grid">
          <div className="v4-value-card v4-planet">
            <span className="v4-card-icon" aria-hidden="true">&#9672;</span>
            <h2>Para o Planeta</h2>
            <p>
              Cada uniforme reutilizado poupa 350 litros de água e 2.5kg de CO₂.
              Economia circular começa com pequenos gestos.
            </p>
          </div>
          <div className="v4-value-card v4-community">
            <span className="v4-card-icon" aria-hidden="true">&#9673;</span>
            <h2>Para a Comunidade</h2>
            <p>
              Uma plataforma segura exclusiva para a tua escola. Confiança entre
              pais que partilham o mesmo espaço.
            </p>
          </div>
        </div>
      </section>

      <section className="v4-how">
        <h2 className="v4-section-title">Simples por natureza</h2>
        <div className="v4-steps">
          <div className="v4-step">
            <span className="v4-step-num">01</span>
            <p>Entras com Google e confirmas a tua escola.</p>
          </div>
          <div className="v4-step">
            <span className="v4-step-num">02</span>
            <p>Publicas o anúncio com fotos do uniforme.</p>
          </div>
          <div className="v4-step">
            <span className="v4-step-num">03</span>
            <p>Combinas diretamente via WhatsApp.</p>
          </div>
        </div>
      </section>

      <section className="v4-final">
        <h2 className="v4-final-headline">Pronto para dar o primeiro passo?</h2>
        <a className="v4-cta-light" href={googleAuthUrl}>
          Entrar com Google
        </a>
      </section>
    </main>
  );
}
