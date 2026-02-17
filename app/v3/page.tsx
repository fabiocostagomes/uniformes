import React from 'react';

import { buildGoogleAuthUrl } from '../../lib/supabase/client';

import './v3.css';

export default function V3Page() {
  const googleAuthUrl = buildGoogleAuthUrl();

  return (
    <main className="v3">
      <nav className="v3-version-nav" aria-label="Versões">
        <a href="/v1">V1</a>
        <a href="/v2">V2</a>
        <a href="/v3" aria-current="page">V3</a>
        <a href="/v4">V4</a>
      </nav>

      <section className="v3-hero">
        <nav className="v3-locale" aria-label="Idioma">
          <a href="/pt">Português</a>
          <a href="/en">English</a>
        </nav>

        <div className="v3-hero-content">
          <p className="v3-kicker">// uniformes do colégio</p>
          <h1 className="v3-headline">
            O impacto
            <br />
            começa aqui.
          </h1>
          <p className="v3-sub">
            Reutilizar uniformes escolares não é só poupar dinheiro — é um gesto
            com impacto real no planeta.
          </p>
          <a className="v3-cta" href={googleAuthUrl}>
            Entrar com Google
          </a>
        </div>

        <div className="v3-counters">
          <div className="v3-counter">
            <span className="v3-counter-value">350</span>
            <span className="v3-counter-unit">litros</span>
            <span className="v3-counter-label">
              de água poupados por uniforme reutilizado
            </span>
          </div>
          <div className="v3-counter">
            <span className="v3-counter-value">2.5</span>
            <span className="v3-counter-unit">kg CO₂</span>
            <span className="v3-counter-label">
              evitados por peça que não vai para o lixo
            </span>
          </div>
          <div className="v3-counter">
            <span className="v3-counter-value">70</span>
            <span className="v3-counter-unit">%</span>
            <span className="v3-counter-label">
              dos pais procuram alternativas sustentáveis
            </span>
          </div>
        </div>
      </section>

      <section className="v3-timeline">
        <h2 className="v3-section-title">Como funciona</h2>
        <div className="v3-timeline-items">
          <div className="v3-timeline-item">
            <div className="v3-timeline-marker" aria-hidden="true">
              <div className="v3-timeline-dot" />
            </div>
            <div className="v3-timeline-content">
              <h3>Login verificado</h3>
              <p>Entras com Google e validas o acesso da tua escola.</p>
            </div>
          </div>
          <div className="v3-timeline-item">
            <div className="v3-timeline-marker" aria-hidden="true">
              <div className="v3-timeline-dot" />
            </div>
            <div className="v3-timeline-content">
              <h3>Publica o anúncio</h3>
              <p>Adiciona fotos e detalhes do uniforme em segundos.</p>
            </div>
          </div>
          <div className="v3-timeline-item">
            <div className="v3-timeline-marker" aria-hidden="true">
              <div className="v3-timeline-dot" />
            </div>
            <div className="v3-timeline-content">
              <h3>Contacto direto</h3>
              <p>Combina a troca ou venda via WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="v3-final">
        <p className="v3-final-text">
          <span className="v3-mono">{'>'}</span> Os números não mentem.
          Cada uniforme conta.
        </p>
        <a className="v3-cta" href={googleAuthUrl}>
          Entrar com Google
        </a>
      </section>
    </main>
  );
}
