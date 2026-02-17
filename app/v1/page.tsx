import React from 'react';

import { buildGoogleAuthUrl } from '../../lib/supabase/client';

import './v1.css';

export default function V1Page() {
  const googleAuthUrl = buildGoogleAuthUrl();

  return (
    <main className="v1">
      <nav className="v1-version-nav" aria-label="Versoes">
        <a href="/v1" aria-current="page">V1</a>
        <a href="/v2">V2</a>
        <a href="/v3">V3</a>
        <a href="/v4">V4</a>
      </nav>

      <section className="v1-hero">
        <nav className="v1-locale" aria-label="Idioma">
          <a href="/pt">Portugues</a>
          <a href="/en">English</a>
        </nav>

        <div className="v1-hero-content">
          <p className="v1-kicker">Iniciativa comunitaria e sustentavel</p>
          <h1 className="v1-headline">
            Cada uniforme
            <br />
            merece uma
            <br />
            <em>segunda vida.</em>
          </h1>
          <p className="v1-sub">
            Troca e venda de uniformes escolares usados entre pais do mesmo
            colegio. Simples, seguro e sustentavel.
          </p>
          <a className="v1-cta" href={googleAuthUrl}>
            Entrar com Google
          </a>
        </div>

        <div className="v1-hero-accent" aria-hidden="true" />
      </section>

      <section className="v1-impact">
        <h2 className="v1-section-title">O impacto de reutilizar</h2>
        <div className="v1-impact-grid">
          <div className="v1-impact-card">
            <span className="v1-impact-number">350L</span>
            <span className="v1-impact-label">
              de agua poupados por uniforme reutilizado
            </span>
          </div>
          <div className="v1-impact-card">
            <span className="v1-impact-number">2.5kg</span>
            <span className="v1-impact-label">
              de CO2 evitados por peca que ganha nova vida
            </span>
          </div>
          <div className="v1-impact-card">
            <span className="v1-impact-number">70%</span>
            <span className="v1-impact-label">
              dos pais procuram alternativas sustentaveis
            </span>
          </div>
        </div>
      </section>

      <section className="v1-how">
        <h2 className="v1-section-title">Como funciona</h2>
        <ol className="v1-steps">
          <li>
            <span className="v1-step-num">01</span>
            <span className="v1-step-text">
              Entras com Google e validas o acesso da tua escola.
            </span>
          </li>
          <li>
            <span className="v1-step-num">02</span>
            <span className="v1-step-text">
              Publicas o teu anuncio com fotos do uniforme.
            </span>
          </li>
          <li>
            <span className="v1-step-num">03</span>
            <span className="v1-step-text">
              Contactas diretamente no WhatsApp para combinar.
            </span>
          </li>
        </ol>
      </section>

      <section className="v1-final">
        <h2 className="v1-final-headline">Pronto para comecar?</h2>
        <a className="v1-cta" href={googleAuthUrl}>
          Entrar com Google
        </a>
      </section>
    </main>
  );
}
