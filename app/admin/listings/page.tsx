import type { Metadata } from 'next';
import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { moderateListingAction } from '../../actions/moderate-listing';
import { getUserRole, isAuthenticated } from '../../../lib/auth/session';
import {
  formatListingPrice,
  getAllListings,
  getStatusLabel,
} from '../../../lib/listings/mock-data';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminListingsPage() {
  const cookieStore = await cookies();

  if (!isAuthenticated(cookieStore)) {
    redirect('/?auth=required');
  }

  if (getUserRole(cookieStore) !== 'admin') {
    redirect('/listings');
  }

  const listings = await getAllListings();

  return (
    <main className="listings-shell">
      <header className="listings-header">
        <p className="hero-kicker">Área de moderação</p>
        <h1 className="title">Moderar anúncios</h1>
        <p className="lead">
          Apenas utilizadores admin podem ocultar anúncios da comunidade.
        </p>
      </header>

      <section className="listings-grid" aria-label="Painel de moderação">
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
              <p className="muted">
                {formatListingPrice(listing.isFree, listing.priceCents)}
              </p>
              <div className="listing-meta">
                <span className="status-badge" data-status={listing.status}>
                  {getStatusLabel(listing.status)}
                </span>
              </div>

              <form action={moderateListingAction}>
                <input type="hidden" name="listingId" value={listing.id} />
                <input type="hidden" name="actorId" value="admin-session" />
                <input type="hidden" name="actorRole" value="admin" />
                <input type="hidden" name="ownerId" value={listing.ownerId} />
                <input type="hidden" name="currentStatus" value={listing.status} />
                <input type="hidden" name="nextStatus" value="removed" />
                <button className="cta" type="submit">
                  Ocultar anúncio
                </button>
              </form>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
