import React from 'react';

import ListingForm from '../../../components/listing-form';

export default function NewListingPage() {
  return (
    <main className="page">
      <section className="card" aria-label="Novo anuncio">
        <h1 className="title">Novo anuncio</h1>
        <p className="lead">Publica um uniforme para troca ou venda.</p>
        <ListingForm />
      </section>
    </main>
  );
}

