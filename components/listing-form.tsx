import React from 'react';

import { createListingAction } from '../app/actions/create-listing';
import { uploadListingImagesAction } from '../app/actions/upload-listing-images';

export default function ListingForm() {
  return (
    <>
      <form action={createListingAction} className="form-stack">
        <input
          type="hidden"
          name="schoolId"
          value="11111111-1111-1111-1111-111111111111"
        />
        <input type="hidden" name="ownerId" value="anonymous" />

        <label htmlFor="title">Título</label>
        <input id="title" name="title" required />

        <label htmlFor="size">Tamanho</label>
        <input id="size" name="size" required />

        <label htmlFor="condition">Estado</label>
        <input id="condition" name="condition" />

        <label htmlFor="description">Descrição</label>
        <input id="description" name="description" />

        <label htmlFor="whatsappPhone">WhatsApp</label>
        <input id="whatsappPhone" name="whatsappPhone" required />

        <label htmlFor="isFree">
          <input id="isFree" name="isFree" type="checkbox" /> Grátis
        </label>

        <label htmlFor="priceCents">Preço (cêntimos)</label>
        <input id="priceCents" name="priceCents" type="number" min={0} />

        <button className="cta" type="submit">
          Publicar anúncio
        </button>
      </form>

      <form action={uploadListingImagesAction} className="form-stack">
        <input type="hidden" name="listingId" value="pending-listing" />
        <input type="hidden" name="ownerId" value="anonymous" />
        <label htmlFor="images">Fotos (max 3, convertidas para WebP)</label>
        <input id="images" name="images" type="file" accept="image/*" multiple />
      </form>
    </>
  );
}
