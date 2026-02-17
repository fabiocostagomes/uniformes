import type { Locale } from './locales';

type HomeMessages = {
  heading: string;
  description: string;
  initiative: string;
  howItWorksTitle: string;
  howItWorksSteps: [string, string, string];
  cta: string;
  ptLabel: string;
  enLabel: string;
};

const homeMessages: Record<Locale, HomeMessages> = {
  pt: {
    heading: 'Uniformes do Colégio',
    description:
      'Troca e venda de uniformes usados entre pais, com foco em confiança e simplicidade.',
    initiative: 'Iniciativa comunitária e sustentável.',
    howItWorksTitle: 'Como funciona',
    howItWorksSteps: [
      '1. Entras com Google e validas o acesso da escola.',
      '2. Publicas o teu anúncio com fotos comprimidas em WebP.',
      '3. Contactas diretamente no WhatsApp para combinar.',
    ],
    cta: 'Entrar com Google',
    ptLabel: 'Português',
    enLabel: 'English',
  },
  en: {
    heading: 'School Uniforms',
    description:
      'Buy and exchange pre-owned uniforms between parents with a simple and trusted flow.',
    initiative: 'A community-first and sustainability-oriented initiative.',
    howItWorksTitle: 'How it works',
    howItWorksSteps: [
      '1. Sign in with Google and validate school access.',
      '2. Publish a listing with compressed WebP images.',
      '3. Contact each other directly on WhatsApp.',
    ],
    cta: 'Continue with Google',
    ptLabel: 'Portuguese',
    enLabel: 'English',
  },
};

export function getHomeMessages(locale: Locale): HomeMessages {
  return homeMessages[locale];
}
