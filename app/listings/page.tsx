import type { Metadata } from 'next';
import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { isAuthenticated } from '../../lib/auth/session';
import {
  formatListingPrice,
  getStatusLabel,
  getVisibleListings,
} from '../../lib/listings/mock-data';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ListingsPage() {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    redirect('/?auth=required');
  }

  const listings = await getVisibleListings();

  return (
    <main className="listings-shell">
      <header className="listings-header">
        <p className="hero-kicker">Comunidade escolar</p>
        <h1 className="title">Anúncios de uniformes</h1>
        <p className="lead">
          Apenas membros autenticados da escola conseguem ver e contactar outros
          pais.
        </p>
      </header>

      <section className="listings-grid" aria-label="Lista de anúncios">
        {listings.map((listing) => (
          <article className="listing-card" key={listing.id}>
            <img
              className="listing-image"
              src={listing.imageUrl}
              alt={listing.title}
              loading="lazy"
            />
            <div className="listing-content">
              <h2 className="subtitle">{listing.title}</h2>
              <p className="muted">{listing.description}</p>
              <p className="muted">
                Tamanho: <strong>{listing.size}</strong>
              </p>

              <div className="listing-meta">
                <span className="price-badge">
                  {formatListingPrice(listing.isFree, listing.priceCents)}
                </span>
                <span className="status-badge" data-status={listing.status}>
                  {getStatusLabel(listing.status)}
                </span>
              </div>

              <a className="link-inline" href={`/listings/${listing.id}`}>
                Ver detalhe e contactar
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
