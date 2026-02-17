# CLAUDE.md - Uniformes do Colegio

## Projeto

Marketplace mobile-first para troca/revenda de uniformes escolares usados entre pais, com contacto direto via WhatsApp. Foco em sustentabilidade, custo zero operacional e confianca comunitaria por escola.

- **Stack:** Next.js 15 (App Router) + TypeScript + Supabase (PostgreSQL + Auth + Storage) + Vitest + pnpm 10
- **Hospedagem:** Vercel (fallback: Cloudflare Pages)
- **CI/CD:** GitHub Actions (`.github/workflows/ci.yml`)
- **Planeamento:** `development.md` e fonte de verdade para tasks e decisoes

## Comandos essenciais

```bash
pnpm install          # Instalar dependencias (NUNCA usar npm)
pnpm dev              # Dev server em http://localhost:3000
pnpm build            # Build de producao
pnpm lint             # Type-check (tsc --noEmit)
pnpm test             # Todos os testes
pnpm test:unit        # Unit + smoke + db guard
pnpm test:db          # Schema guard (migrations)
pnpm test:e2e         # E2E (desktop + mobile)
```

## Estrutura do projeto

```
app/                    Paginas (App Router) + server actions + layout + CSS global
  actions/              Server actions (logica de negocio pura, testavel)
  auth/callback/        OAuth callback (Google via Supabase)
  listings/             Browse, detalhe, criacao de anuncios
  admin/                Dashboard de moderacao
  pt/, en/              Rotas por locale
  theme.css             Design tokens (single source of truth)
  globals.css           Estilos globais (consomem var(--token))
components/             Componentes React reutilizaveis
lib/                    Utilitarios e logica partilhada
  auth/session.ts       Sessao baseada em cookies
  i18n/                 Mensagens hardcoded por locale (pt, en)
  images/compress.ts    Transformacao WebP, strip EXIF, limites
  supabase/             Clientes Supabase (client.ts, server.ts)
  listings/mock-data.ts Dados mock para MVP
supabase/               Migrations SQL e seed
  migrations/           0001_initial_schema.sql, 0002_rls_policies.sql
tests/                  Testes organizados por tipo
  unit/                 Logica de negocio e componentes
  db/                   Schema guard (validacao de migrations)
  e2e/                  Fluxos end-to-end
  smoke/                Bootstrap rapido
docs/                   Runbooks operacionais e documentacao
```

## Regras obrigatorias

### Geral
- Usar **sempre `pnpm`** (nunca `npm` ou `yarn`)
- Commits atomicos alinhados com tasks do `development.md`
- Atualizar checkboxes no `development.md` ao concluir tasks
- Nao adicionar dependencias de producao sem aprovacao explicita
- Diffs pequenos e focados; zero refactors fora de escopo

### Antes de concluir qualquer trabalho
1. `pnpm lint` - tem de passar sem erros
2. `pnpm test:unit` - testes unitarios verdes
3. `pnpm test:db` - se houve alteracoes de base de dados
4. `pnpm test:e2e` - se houve alteracoes de UI/fluxo

## Padroes de codigo

### Convencoes de nomes
- **Ficheiros:** kebab-case (`create-listing.ts`)
- **Tipos/Interfaces:** PascalCase descritivo (`CreateListingResult`, `ListingRateLimiter`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_DAILY_LISTINGS`, `AUTH_COOKIE_NAME`)
- **Funcoes:** camelCase (`createListing`, `formatListingPrice`)

### Server Actions (padrao obrigatorio)
Logica de negocio pura com dependency injection para testabilidade:

```typescript
// 1. Definir interfaces de dependencias
type MyRepo = { save(data: T): Promise<{ id: string }> };

// 2. Funcao pura com deps injetadas
export async function myAction(
  input: Input,
  deps: { repo: MyRepo; rateLimiter: RateLimiter }
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  // validacao -> rate limit -> logica -> resultado
}

// 3. Wrapper para Next.js (formData)
export async function myFormAction(formData: FormData) {
  return myAction(parse(formData), { repo: realRepo, rateLimiter: realLimiter });
}
```

### Resultados tipados (discriminated unions)
Sempre usar `{ ok: true; ... } | { ok: false; error: 'codigo_erro' }` - nunca throw para erros de negocio.

### Async/Await
Usar sempre async/await. Nunca `.then()` chains.

## Frontend e design

- **Mobile-first** desde o inicio (minimo 360px)
- **Design tokens** centralizados em `app/theme.css` (unica fonte de verdade)
- `app/globals.css` deve consumir apenas `var(--token)` - nunca cores/valores hardcoded
- Direcao visual: minimalista, confianca, sustentabilidade
- Font: Atkinson Hyperlegible (acessibilidade)
- Cor brand: `--color-brand: #2f6f4e` (verde)

## i18n

- Locales suportados: `pt` (default), `en`
- Mensagens hardcoded em `lib/i18n/messages.ts` (sem biblioteca externa)
- Rotas por locale: `app/pt/`, `app/en/`
- Qualquer texto visivel ao utilizador deve existir nos dois locales
- Tipo `Locale` definido em `lib/i18n/locales.ts`

## Base de dados e Supabase

### MCP (MANDATORIO)
- Usar **sempre MCP** no server `supabase_uniformes_colegio`
- Projeto alvo: `rkzvnbcbwudcskufcnci`
- DDL (schema/policies): `mcp__supabase_uniformes_colegio__apply_migration`
- DML/queries: `mcp__supabase_uniformes_colegio__execute_sql`
- Verificacao: `mcp__supabase_uniformes_colegio__list_migrations`
- Nao usar outros servidores Supabase deste ambiente

### Tabelas principais
- `schools` - escolas com slug unico
- `profiles` - perfis ligados a auth.users (role: member | admin)
- `school_memberships` - ligacao perfil-escola (unique school_id + profile_id)
- `invite_codes` - codigos de convite por escola
- `listings` - anuncios (status: active | reserved | sold | archived | removed)
- `listing_images` - imagens em Supabase Storage (WebP, max 3 por anuncio)
- `reports` - denuncias de anuncios

### RLS
- RLS obrigatoria em todas as tabelas com dados de utilizador/escola
- Profiles: leitura/atualizacao apenas do proprio
- Listings: visiveis apenas para membros da mesma escola
- Insert de listing: owner + membro da escola
- Update de listing: owner OU admin da escola

## Imagens

- Max 3 ficheiros por anuncio
- Conversao automatica para WebP
- Limite: 10MB original, 500KB processado, 1600px edge maximo
- EXIF sempre removido (privacidade)
- Storage path: `{listingId}/{timestamp}-{index}-{name}.webp`

## Seguranca e privacidade

- Nunca commitar segredos ou chaves (`.env.local` no `.gitignore`)
- Evitar logs com dados sensiveis
- GDPR: fluxo de apagamento de conta com cascading delete
- Minimo de dados pessoais recolhidos
- Rate limiting em acoes criticas (criacao de anuncios, convites)

## Variaveis de ambiente

Definidas em `.env.local` (dev) e Vercel (producao):

```
NEXT_PUBLIC_SUPABASE_URL          # URL do projeto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Chave anonima (cliente)
SUPABASE_SERVICE_ROLE_KEY         # Chave service role (server-side)
NEXT_PUBLIC_SITE_URL              # URL base da app
```

## Testes

### Padrao de testes unitarios
```typescript
describe('feature', () => {
  it('descreve comportamento esperado', async () => {
    const repo = makeRepo();  // Factory helper com mocks
    const result = await action(input, { repo, rateLimiter: allow() });
    expect(result.ok).toBe(true);
  });
});
```

- Usar factory functions para mocks (`makeRepo()`, `makeRateLimiter()`)
- Testar tanto casos de sucesso como de erro
- Testes de componentes com `@testing-library/react`
- Ambiente: jsdom (configurado em `vitest.config.ts`)

## Documentacao existente

- `development.md` - Plano de implementacao completo, decision log, estado de tasks
- `docs/deploy.md` - Runbook de deployment Vercel + Supabase
- `docs/db-schema.md` - Documentacao do schema, lifecycle de status
- `docs/pilot-plan.md` - Plano de rollout controlado
- `docs/setup/initial-provisioning.md` - Setup inicial Supabase + Vercel
- `docs/fallback/cloudflare-pages.md` - Fallback de hosting
- `CONTRIBUTING.md` - Guia de contribuicao
- `CODE_OF_CONDUCT.md` - Codigo de conduta
