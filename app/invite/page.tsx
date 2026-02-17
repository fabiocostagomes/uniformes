import type { Metadata } from 'next';
import React from 'react';

import { redeemInviteAction } from '../actions/redeem-invite';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvitePage() {
  return (
    <main className="page">
      <section className="card" aria-label="Convite">
        <h1 className="title">Entrar no colegio</h1>
        <p className="lead">
          Introduz o teu codigo de convite para acederes aos anuncios.
        </p>
        <form action={redeemInviteAction} className="form-stack">
          <label htmlFor="invite-code">Codigo de convite</label>
          <input
            id="invite-code"
            name="code"
            type="text"
            autoComplete="off"
            required
          />
          <input type="hidden" name="profileId" value="anonymous" />
          <button className="cta" type="submit">
            Validar convite
          </button>
        </form>
      </section>
    </main>
  );
}
