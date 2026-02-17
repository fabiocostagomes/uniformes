# Uniformes do Colegio

Plataforma web mobile-first para pais anunciarem uniformes usados com contacto via WhatsApp, com foco em sustentabilidade, simplicidade e custo zero operacional no MVP.

## Stack

- Next.js (App Router) + TypeScript
- Supabase (Auth, Postgres, Storage)
- Vercel (deploy)
- Vitest (unit + e2e leve)

## Requisitos

- Node 20+
- pnpm 10+
- `.env.local` preenchido com variaveis de Supabase

## Desenvolvimento local

```bash
pnpm install
pnpm dev
```

## Scripts

- `pnpm test:unit` - testes unitarios/smoke/db guard
- `pnpm test:e2e` - testes e2e leves de fluxo
- `pnpm test:db` - guard de schema SQL
- `pnpm build` - build de producao + typecheck

## Privacidade e termos

- Politica de privacidade: `/privacy`
- Termos de utilizacao: `/terms`

Paginas internas autenticadas estao configuradas com `noindex`.

## Contribuicao Open Source

Consulta:

- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
