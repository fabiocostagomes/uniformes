import React from 'react';

import { buildGoogleAuthUrl } from '../lib/supabase/client';

export default function HomePage() {
  const googleAuthUrl = buildGoogleAuthUrl();

  return (
    <main className="page">
      <section className="card" aria-label="Hero">
        <h1 className="title">Uniformes do Colegio</h1>
        <p className="lead">
          Troca e venda de uniformes usados entre pais de forma simples.
        </p>
        <a className="cta" href={googleAuthUrl}>
          Entrar com Google
        </a>
      </section>
    </main>
  );
}
