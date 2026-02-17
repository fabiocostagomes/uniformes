import type { Locale } from './locales';

type HomeMessages = {
  heading: string;
  description: string;
  cta: string;
  ptLabel: string;
  enLabel: string;
};

const homeMessages: Record<Locale, HomeMessages> = {
  pt: {
    heading: 'Uniformes do Colegio',
    description: 'Troca e venda de uniformes usados entre pais de forma simples.',
    cta: 'Entrar com Google',
    ptLabel: 'Portugues',
    enLabel: 'English',
  },
  en: {
    heading: 'School Uniforms',
    description: 'Buy and exchange pre-owned uniforms between parents.',
    cta: 'Continue with Google',
    ptLabel: 'Portuguese',
    enLabel: 'English',
  },
};

export function getHomeMessages(locale: Locale): HomeMessages {
  return homeMessages[locale];
}

