import type { Metadata } from 'next';
import React from 'react';

import ListingForm from '../../../components/listing-form';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewListingPage() {
  return (
    <main className="page">
      <section className="card" aria-label="Novo anúncio">
        <h1 className="title">Novo anúncio</h1>
        <p className="lead">Publica um uniforme para troca ou venda.</p>
        <ListingForm />
      </section>
    </main>
  );
}
