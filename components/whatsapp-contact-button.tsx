import React from 'react';

type WhatsAppContactButtonProps = {
  phoneNumber: string;
  listingTitle: string;
};

function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, '');
}

export function buildWhatsAppLink(
  phoneNumber: string,
  listingTitle: string,
): string {
  const sanitizedPhone = normalizePhoneNumber(phoneNumber);
  const url = new URL(`https://wa.me/${sanitizedPhone}`);

  url.searchParams.set(
    'text',
    `Olá! Vi o anuncio "${listingTitle}" na plataforma de uniformes. Ainda está disponível?`,
  );

  return url.toString();
}

export default function WhatsAppContactButton({
  phoneNumber,
  listingTitle,
}: WhatsAppContactButtonProps) {
  const href = buildWhatsAppLink(phoneNumber, listingTitle);

  return (
    <a
      className="cta"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      role="button"
      aria-label="Contactar no WhatsApp"
    >
      Contactar no WhatsApp
    </a>
  );
}
