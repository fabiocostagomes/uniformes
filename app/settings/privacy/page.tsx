import type { Metadata } from 'next';
import React from 'react';

import { deleteAccountAction } from '../../actions/delete-account';
import { deleteListingAction } from '../../actions/moderate-listing';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacySettingsPage() {
  return (
    <main className="listings-shell">
      <section className="card" aria-label="Privacidade e apagamento">
        <h1 className="title">Privacidade e dados</h1>
        <p className="lead">
          Podes solicitar apagamento da conta e dos dados associados ao teu
          perfil.
        </p>

        <h2 className="subtitle">Apagar conta</h2>
        <p className="muted">
          Remove perfil, memberships e dados pessoais relacionados.
        </p>
        <form action={deleteAccountAction} className="form-stack">
          <input type="hidden" name="profileId" value="anonymous" />
          <button className="cta" type="submit">
            Apagar conta e dados pessoais
          </button>
        </form>

        <h2 className="subtitle">Apagar anuncio</h2>
        <p className="muted">
          A eliminacao do anuncio remove tambem ficheiros de imagem associados no
          storage.
        </p>
        <form action={deleteListingAction} className="form-stack">
          <input type="hidden" name="listingId" value="listing-001" />
          <input type="hidden" name="actorId" value="anonymous" />
          <input type="hidden" name="actorRole" value="member" />
          <input type="hidden" name="ownerId" value="anonymous" />
          <button className="cta" type="submit">
            Apagar anuncio e imagens
          </button>
        </form>
      </section>
    </main>
  );
}
