import type { Metadata } from 'next';
import React from 'react';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import WhatsAppContactButton from '../../../components/whatsapp-contact-button';
import { isAuthenticated } from '../../../lib/auth/session';
import {
  formatListingPrice,
  getStatusLabel,
  getVisibleListingById,
} from '../../../lib/listings/mock-data';

type ListingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    redirect('/?auth=required');
  }

  const { id } = await params;
  const listing = await getVisibleListingById(id);
  if (!listing) notFound();

  return (
    <main className="listings-shell">
      <article className="listing-card">
        <img className="listing-image" src={listing.imageUrl} alt={listing.title} />
        <div className="listing-content">
          <h1 className="title">{listing.title}</h1>
          <p className="lead">{listing.description}</p>

          <p className="muted">
            Escola: <strong>{listing.schoolName}</strong>
          </p>
          <p className="muted">
            Tamanho: <strong>{listing.size}</strong>
          </p>
          <p className="muted">
            Estado: <strong>{listing.condition}</strong>
          </p>

          <div className="listing-meta">
            <span className="price-badge">
              {formatListingPrice(listing.isFree, listing.priceCents)}
            </span>
            <span className="status-badge" data-status={listing.status}>
              {getStatusLabel(listing.status)}
            </span>
          </div>

          <div className="detail-actions">
            <p className="muted">Contacto visivel apenas para utilizadores autenticados.</p>
            <WhatsAppContactButton
              phoneNumber={listing.whatsappPhone}
              listingTitle={listing.title}
            />
            <a className="link-inline" href="/listings">
              Voltar a listagem
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
