import type { Locale } from './locales';

type StepMessage = {
  title: string;
  text: string;
};

type HomeMessages = {
  kicker: string;
  headlineBold: string;
  headlineLight: string;
  description: string;
  cta: string;
  stepsTitle: string;
  steps: [StepMessage, StepMessage, StepMessage];
  bottomText: string;
  bottomCta: string;
  ptLabel: string;
  enLabel: string;
};

const homeMessages: Record<Locale, HomeMessages> = {
  pt: {
    kicker: 'Uniformes do Colégio',
    headlineBold: 'Fecha o ciclo.',
    headlineLight: 'Partilha uniformes.',
    description:
      'Uma plataforma comunitária para dar nova vida aos uniformes escolares, de família para família.',
    cta: 'Entrar com Google',
    stepsTitle: 'Três passos simples',
    steps: [
      { title: 'Valida', text: 'Entras com Google e confirmas a tua escola.' },
      {
        title: 'Publica',
        text: 'Crias o teu anúncio com fotos do uniforme.',
      },
      { title: 'Combina', text: 'Contactas diretamente no WhatsApp.' },
    ],
    bottomText: 'Economia circular começa na escola.',
    bottomCta: 'Começar agora',
    ptLabel: 'Português',
    enLabel: 'English',
  },
  en: {
    kicker: 'School Uniforms',
    headlineBold: 'Close the loop.',
    headlineLight: 'Share uniforms.',
    description:
      'A community platform to give school uniforms a second life, from family to family.',
    cta: 'Continue with Google',
    stepsTitle: 'Three simple steps',
    steps: [
      { title: 'Verify', text: 'Sign in with Google and confirm your school.' },
      {
        title: 'Publish',
        text: 'Create your listing with photos of the uniform.',
      },
      { title: 'Connect', text: 'Contact each other directly on WhatsApp.' },
    ],
    bottomText: 'Circular economy starts at school.',
    bottomCta: 'Get started',
    ptLabel: 'Português',
    enLabel: 'English',
  },
};

export function getHomeMessages(locale: Locale): HomeMessages {
  return homeMessages[locale];
}
