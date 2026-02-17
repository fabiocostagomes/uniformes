# Uniformes do Colegio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Construir uma plataforma web gratuita e mobile-first para pais anunciarem uniformes usados (gratis ou a pagar), com contacto via WhatsApp e moderacao basica.

**Architecture:** Aplicacao Next.js (App Router) mobile-first no frontend/backend leve, hospedada na Vercel (Hobby), com Supabase para autenticacao Google OAuth, Postgres e Storage de imagens. O MVP comeca com 1 colegio e estrutura multi-escola (`school_id`) para crescimento futuro.

**Tech Stack:** Next.js + TypeScript, Supabase (Auth/DB/Storage), Tailwind CSS, Zod, Vitest, Playwright, pnpm, GitHub Actions.

## Painel de execucao (checklist mestre)

### Preflight do projeto

- [ ] Confirmar nome final do repositorio no GitHub.
- [ ] Criar repositorio publico com branch principal protegida.
- [ ] Confirmar acesso a Vercel e Supabase.
- [ ] Confirmar conta Google OAuth para ambiente dev/preview/prod.
- [ ] Definir responsavel por revisao legal (privacy/terms).

### Checklist mestre por task

- [x] Task 0: Provisionamento inicial (Supabase + Vercel)
- [x] Task 1: Bootstrap do repositorio
- [x] Task 2: Criar app Next.js com pnpm
- [x] Task 3: Integrar Supabase Auth (Google)
- [ ] Task 4: Esquema DB + RLS base
- [ ] Task 5: Convites de acesso por codigo
- [ ] Task 6: Criacao de anuncio (sem imagens)
- [ ] Task 7: Upload de imagens (max 3, WebP comprimido)
- [ ] Task 8: Lista de anuncios + detalhe + contacto WhatsApp
- [ ] Task 9: Moderacao minima por admin
- [ ] Task 10: Politicas de privacidade e docs OSS
- [ ] Task 10.1: Direitos de apagamento de dados
- [ ] Task 11: CI minima no GitHub
- [ ] Task 12: Deploy + observabilidade minima
- [ ] Task 13: Piloto controlado
- [ ] Task 14: Runbook de fallback para Cloudflare Pages

## Protocolo de sessao longa (agent-ready)

### Loop de execucao por task

- [ ] Ler task alvo e confirmar ficheiros a criar/editar.
- [ ] Escrever/ajustar teste para falhar primeiro.
- [ ] Implementar minimo para passar.
- [ ] Correr comandos de verificacao dessa task.
- [ ] Fazer commit atomico com a mensagem definida.
- [ ] Marcar checkbox da task e atualizar notas de progresso.

### Regras de checkpoint (a cada 60-90 minutos)

- [ ] Atualizar este ficheiro com o estado real.
- [ ] Registar ultimo commit e proxima task.
- [ ] Registar bloqueios tecnicos e decisoes tomadas.
- [ ] Confirmar se ha mudancas de escopo antes de continuar.

### Template de handoff/retoma

Preencher quando a sessao parar:

- [ ] Data/hora:
- [ ] Branch atual:
- [ ] Task em curso:
- [ ] Ultimo commit:
- [ ] Testes executados e resultado:
- [ ] Proximo passo exato:
- [ ] Bloqueios:

### Lotes para maximizar entregas numa sessao longa

- [ ] Lote A (fundacao): Tasks 0-4
- [ ] Gate A: auth funcional + schema aplicado + RLS validado
- [ ] Lote B (core produto): Tasks 5-9
- [ ] Gate B: criar anuncio + upload + listagem + moderacao a funcionar
- [ ] Lote C (operacao): Tasks 10-12
- [ ] Gate C: docs legais + CI verde + deploy smoke concluido
- [ ] Lote D (rollout e resiliencia): Tasks 13-14
- [ ] Gate D: piloto preparado + fallback documentado/testado

## Decisoes Fechadas

- Tipo: website mobile-first desde o MVP (otimizado para smartphone)
- Login: Google OAuth
- Contato: WhatsApp (fora da plataforma)
- Visibilidade do contacto: apenas utilizadores autenticados
- Pagamento: fora da plataforma
- Moderacao/convites: apenas admin inicial
- Fotos por anuncio: maximo 3
- Stack: Vercel + Supabase
- Licenca: open source no GitHub (MIT)

## Guardrails de custo zero

- Limitar upload a 3 imagens por anuncio.
- Redimensionar/comprimir imagens no cliente antes do upload.
- Converter sempre para WebP e remover metadados EXIF.
- Aceitar original ate 10 MB e limitar o ficheiro final comprimido a 500 KB por imagem.
- Objetivo de qualidade: 200-350 KB por imagem com lado maior maximo de 1600 px.
- Sem chat interno, sem pagamentos internos, sem notificacoes em tempo real no MVP.
- Definir alertas de uso no Supabase e rever quotas mensalmente.
- Sem app nativa no MVP (foco em web mobile-first para manter custo zero e velocidade de entrega).

## Requisitos Mobile Day 1

- Layout e fluxo completos em largura minima de 360 px.
- Formularios com targets de toque >= 44 px.
- Lista de anuncios e detalhe otimizados para uso com uma mao.
- Testes E2E com viewport mobile obrigatorios no CI.
- Lighthouse Mobile >= 85 em Performance e Accessibility nas paginas principais.
- Devices alvo de QA manual: iPhone SE (375 px) e Android comum (360 px).
- Tempo alvo de carregamento em rede 4G: primeira pagina util em <= 3s.

## Estados de anuncio (MVP)

- `active`: visivel para membros autenticados da escola.
- `reserved`: item em negociacao; continua visivel com badge.
- `sold`: item vendido; removido da listagem principal.
- `archived`: anuncio encerrado pelo proprio anunciante.
- `removed`: ocultado por moderacao admin.

Transicoes permitidas:
- Owner: `active -> reserved -> sold` e `active -> archived`.
- Admin: qualquer estado para `removed`.
- Sistema: impede retorno de `sold/archived/removed` para `active`.

## Seguranca e anti-abuso (MVP)

- Rate limit no `redeem-invite`: maximo 5 tentativas por IP por 15 minutos.
- Rate limit criacao de anuncios: maximo 5 anuncios por utilizador por dia.
- Rate limit upload imagens: maximo 20 uploads por utilizador por dia.
- Convites com expiracao (ex.: 30 dias) e opcao de uso unico.
- Validacao estrita de inputs com Zod em todas server actions.

## Privacidade e RGPD operacional (MVP)

- Fluxo "Apagar conta": apagar profile, memberships e dados pessoais associados.
- Fluxo "Apagar anuncio": remover dados relacionais e ficheiros do Storage.
- Retencao de logs aplicacionais minima necessaria (30 dias).
- Sem indexacao publica por motores de busca nas paginas internas.
- Incluir email de contacto para pedidos de privacidade.

## Plano de fallback de hosting

- Risco: restricoes de fair use da Vercel Hobby.
- Plano B: migrar frontend para Cloudflare Pages mantendo Supabase.
- Preparacao: manter variaveis/env desacopladas e evitar features proprietarias da Vercel.
- Objetivo de migracao: <= 1 dia util para restabelecer producao.

## Observabilidade minima obrigatoria

- Alertar quando erros 5xx > 2% em janela de 15 min.
- Alertar quando falhas de callback OAuth aumentam acima de baseline.
- Alertar quando storage Supabase > 80% da quota.
- Registar eventos criticos: login, criar anuncio, upload, moderacao.

## Plano de piloto (antes de abrir ao colegio inteiro)

- Grupo piloto: 10-20 pais convidados.
- Duracao: 2 semanas.
- Metricas alvo: >= 10 anuncios validos, >= 70% anuncios com contacto bem sucedido.
- Criterio de go/no-go: sem incidentes criticos de privacidade e sem bloqueios de uso.
- Recolher feedback curto por formulario apos 1a semana.

## Modelo de dados (MVP)

- `schools`: dados da escola.
- `profiles`: utilizador autenticado (nome, email, role).
- `school_memberships`: ligacao utilizador <-> escola.
- `invite_codes`: codigos de convite geridos por admin.
- `listings`: anuncio (titulo, descricao, tamanho, estado, preco, gratis, whatsapp, status).
- `listing_images`: caminhos de imagens no bucket.
- `reports`: denuncias de anuncios.

## Sequencia de implementacao (commits atomicos)

### [x] Task 0: Provisionamento inicial (Supabase + Vercel)

**Files:**

- Create: `docs/setup/initial-provisioning.md`
- Create: `.env.example`

**Step 1: Teste falho de env obrigatorias**

Criar `tests/unit/env.test.ts` para validar presenca de variaveis criticas.

**Step 2: Validar falha**

Run: `pnpm test:unit -- env.test.ts`
Expected: FAIL sem env definidas.

**Step 3: Provisionar infraestrutura minima**

- Criar projeto Supabase.
- Ativar Google OAuth no Supabase.
- Criar bucket `listing-images`.
- Criar projeto Vercel e definir env vars.
- Configurar URLs de callback OAuth (local + preview + production).

**Step 4: Documentar setup**

Documentar passos em `docs/setup/initial-provisioning.md`.

**Step 5: Validar sucesso**

Run: `pnpm test:unit -- env.test.ts`
Expected: PASS com `.env.local` preenchido.

**Step 6: Commit**

`chore: add initial supabase and vercel provisioning runbook`

### [x] Task 1: Bootstrap do repositorio

**Files:**

- Create: `README.md`
- Create: `LICENSE`
- Create: `.gitignore`
- Create: `package.json`
- Create: `pnpm-workspace.yaml`

**Step 1: Criar teste de sanidade (falhar primeiro)**

Criar `tests/smoke/bootstrap.test.ts` com teste que valida existencia de `package.json`.

**Step 2: Correr teste para falhar**

Run: `pnpm vitest tests/smoke/bootstrap.test.ts`
Expected: FAIL por setup ainda incompleto.

**Step 3: Criar scaffold minimo**

Adicionar ficheiros base acima.

**Step 4: Correr teste novamente**

Run: `pnpm vitest tests/smoke/bootstrap.test.ts`
Expected: PASS.

**Step 5: Commit**

`chore: bootstrap repository skeleton`

### [x] Task 2: Criar app Next.js com pnpm

**Files:**

- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`

**Step 1: Teste falho de homepage mobile-first**

Criar `tests/unit/home.test.tsx` a esperar render de titulo principal e CTA visivel em viewport mobile.

**Step 2: Validar falha**

Run: `pnpm test:unit -- home.test.tsx`
Expected: FAIL (pagina ainda nao implementada).

**Step 3: Implementar homepage minima**

Criar layout e pagina inicial com CTA para login e estilos mobile-first.

**Step 4: Validar sucesso**

Run: `pnpm test:unit -- home.test.tsx`
Expected: PASS.

**Step 5: Commit**

`feat: scaffold nextjs app with baseline tests`

### [x] Task 3: Integrar Supabase Auth (Google)

**Files:**

- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `app/auth/callback/route.ts`
- Modify: `app/page.tsx`
- Create: `.env.example`

**Step 1: Teste falho de login**

Criar `tests/unit/auth-entry.test.tsx` esperando botao "Entrar com Google".

**Step 2: Validar falha**

Run: `pnpm test:unit -- auth-entry.test.tsx`
Expected: FAIL.

**Step 3: Implementar auth flow**

Adicionar botao de login e callback route.

**Step 4: Validar sucesso**

Run: `pnpm test:unit -- auth-entry.test.tsx`
Expected: PASS.

**Step 5: Commit**

`feat: add google oauth with supabase`

### [ ] Task 4: Esquema DB + RLS base

**Files:**

- Create: `supabase/migrations/0001_initial_schema.sql`
- Create: `supabase/migrations/0002_rls_policies.sql`
- Create: `supabase/seed.sql`
- Create: `docs/db-schema.md`

**Step 1: Teste SQL falho**

Criar `tests/db/schema.test.sql` para validar existencia de `listings` e RLS ativo.

**Step 2: Validar falha**

Run: `pnpm test:db`
Expected: FAIL.

**Step 3: Criar schema e politicas**

Implementar tabelas do MVP + RLS por utilizador/escola.

**Step 3.1: Seed inicial**

Adicionar seed de bootstrap com:
- 1 escola inicial.
- 1 utilizador admin inicial.
- 1 codigo de convite inicial.

**Step 4: Validar sucesso**

Run: `pnpm test:db`
Expected: PASS.

**Step 5: Commit**

`feat: add initial schema and rls policies`

### [ ] Task 5: Convites de acesso por codigo

**Files:**

- Create: `app/invite/page.tsx`
- Create: `app/actions/redeem-invite.ts`
- Create: `tests/unit/invite-flow.test.ts`

**Step 1: Teste falho de redeem**

- Utilizador sem membership nao entra sem codigo valido.

**Step 2: Validar falha**
Run: `pnpm test:unit -- invite-flow.test.ts`
Expected: FAIL.

**Step 3: Implementar redeem + membership**

- Validar codigo, marcar uso, criar membership.
- Aplicar rate limit de tentativas.

**Step 4: Validar sucesso**
Run: `pnpm test:unit -- invite-flow.test.ts`
Expected: PASS.

**Step 5: Commit**
`feat: add invite-code onboarding for first school`

### [ ] Task 6: Criacao de anuncio (sem imagens)

**Files:**

- Create: `app/listings/new/page.tsx`
- Create: `app/actions/create-listing.ts`
- Create: `components/listing-form.tsx`
- Create: `tests/unit/create-listing.test.ts`

**Step 1: Teste falho de validacao**

- Campos obrigatorios + maximo preco.

**Step 2: Validar falha**
Run: `pnpm test:unit -- create-listing.test.ts`
Expected: FAIL.

**Step 3: Implementar formulario e action**

- Validacao Zod; campos `gratis` ou `preco`.
- Aplicar rate limit de criacao por utilizador.

**Step 4: Validar sucesso**
Run: `pnpm test:unit -- create-listing.test.ts`
Expected: PASS.

**Step 5: Commit**
`feat: add listing creation flow`

### [ ] Task 7: Upload de imagens (max 3, WebP comprimido)

**Files:**

- Create: `lib/images/compress.ts`
- Modify: `components/listing-form.tsx`
- Create: `app/actions/upload-listing-images.ts`
- Create: `tests/unit/image-limits.test.ts`

**Step 1: Teste falho de limites**

- Bloquear mais de 3 imagens.
- Aceitar originais ate 10 MB, converter para WebP e rejeitar resultado final >500 KB.
- Remover EXIF e limitar dimensao ao lado maior de 1600 px.

**Step 2: Validar falha**
Run: `pnpm test:unit -- image-limits.test.ts`
Expected: FAIL.

**Step 3: Implementar validacoes e upload**

- Upload para bucket `listing-images` ja em WebP comprimido.
- Aplicar rate limit de uploads por utilizador.

**Step 4: Validar sucesso**
Run: `pnpm test:unit -- image-limits.test.ts`
Expected: PASS.

**Step 5: Commit**
`feat: add constrained image uploads`

### [ ] Task 8: Lista de anuncios + detalhe + contacto WhatsApp

**Files:**

- Create: `app/listings/page.tsx`
- Create: `app/listings/[id]/page.tsx`
- Create: `components/whatsapp-contact-button.tsx`
- Create: `tests/e2e/listings.spec.ts`

**Step 1: E2E falho**

- Login, visualizar anuncio, ver botao WhatsApp autenticado em viewport mobile.

**Step 2: Validar falha**
Run: `pnpm test:e2e -- listings.spec.ts`
Expected: FAIL.

**Step 3: Implementar paginas**

- Mostrar telefone apenas para utilizadores autenticados e garantir UX mobile (cards, botoes, espacamento).

**Step 4: Validar sucesso**
Run: `pnpm test:e2e -- listings.spec.ts`
Expected: PASS.

**Step 5: Commit**
`feat: add listings browse and whatsapp contact`

### [ ] Task 9: Moderacao minima por admin

**Files:**

- Create: `app/admin/listings/page.tsx`
- Create: `app/actions/moderate-listing.ts`
- Create: `tests/unit/moderation.test.ts`

**Step 1: Teste falho de autorizacao admin**

**Step 2: Validar falha**
Run: `pnpm test:unit -- moderation.test.ts`
Expected: FAIL.

**Step 3: Implementar hide/unhide/remove**

- Apenas role `admin`.
- Implementar transicoes validas de status por owner/admin.

**Step 4: Validar sucesso**
Run: `pnpm test:unit -- moderation.test.ts`
Expected: PASS.

**Step 5: Commit**
`feat: add admin moderation for listings`

### [ ] Task 10: Politicas de privacidade e docs OSS

**Files:**

- Create: `app/privacy/page.tsx`
- Create: `app/terms/page.tsx`
- Modify: `README.md`
- Create: `CONTRIBUTING.md`
- Create: `CODE_OF_CONDUCT.md`

**Step 1: Teste falho de links obrigatorios no footer**

**Step 2: Validar falha**
Run: `pnpm test:unit -- footer-links.test.tsx`
Expected: FAIL.

**Step 3: Implementar paginas legais e docs**

- Incluir politica de retencao, contacto privacidade e noindex nas paginas internas.

**Step 4: Validar sucesso**
Run: `pnpm test:unit -- footer-links.test.tsx`
Expected: PASS.

**Step 5: Commit**
`docs: add legal pages and open-source contribution guides`

### [ ] Task 10.1: Direitos de apagamento de dados

**Files:**

- Create: `app/settings/privacy/page.tsx`
- Create: `app/actions/delete-account.ts`
- Modify: `app/actions/moderate-listing.ts`
- Create: `tests/unit/privacy-deletion.test.ts`

**Step 1: Teste falho de apagamento**

- Utilizador consegue apagar conta e respetivos dados pessoais.
- Apagar anuncio remove tambem imagens do Storage.

**Step 2: Validar falha**
Run: `pnpm test:unit -- privacy-deletion.test.ts`
Expected: FAIL.

**Step 3: Implementar fluxos**

- Apagar conta.
- Apagar anuncio + ficheiros associados.

**Step 4: Validar sucesso**
Run: `pnpm test:unit -- privacy-deletion.test.ts`
Expected: PASS.

**Step 5: Commit**
`feat: add privacy deletion flows for account and listings`

### [ ] Task 11: CI minima no GitHub

**Files:**

- Create: `.github/workflows/ci.yml`

**Step 1: Definir pipeline**

- install, lint, test:unit, test:e2e (desktop + mobile headless).

**Step 2: Correr local para validar**
Run: `pnpm lint && pnpm test:unit`
Expected: PASS.

**Step 3: Commit**
`ci: add github actions pipeline`

### [ ] Task 12: Deploy + observabilidade minima

**Files:**

- Modify: `README.md`
- Create: `docs/deploy.md`

**Step 1: Documentar setup Vercel + Supabase**

- env vars, oauth redirect URLs, storage bucket, RLS checks.
- alertas de erro, login e quota de storage.

**Step 2: Validar smoke em producao**

- Login, criar anuncio, upload, abrir WhatsApp.

**Step 3: Commit**
`docs: add deployment runbook and production smoke checklist`

### [ ] Task 13: Piloto controlado

**Files:**

- Create: `docs/pilot-plan.md`
- Modify: `README.md`

**Step 1: Definir plano de piloto**

- publico alvo, duracao, metricas, criterios go/no-go.

**Step 2: Definir rotina de recolha de feedback**

- formulario simples e checklist de problemas.

**Step 3: Commit**
`docs: add controlled pilot rollout plan`

### [ ] Task 14: Runbook de fallback para Cloudflare Pages

**Files:**

- Create: `docs/fallback/cloudflare-pages.md`

**Step 1: Documentar migracao minima**

- build/deploy, env vars, DNS e validacao de smoke.

**Step 2: Simular checklist de migracao**

- executar checklist em ambiente de preview.

**Step 3: Commit**
`docs: add emergency fallback runbook for hosting migration`

## Backlog pos-MVP (nao fazer agora)

- Multi-escola self-service.
- PWA instalavel (offline basico + notificacoes).
- Filtros avancados (idade, colecao, estado).
- Sistema de reports com fila e SLA.
- Export/backup automatico.

## Perguntas em aberto antes do primeiro commit de codigo

1. Nome final do projeto/repositorio no GitHub.
2. Texto legal (privacy/terms) com revisao juridica local.
3. Politica para fotos com rostos de criancas (bloquear automaticamente ou regra manual).
4. Formato do numero de WhatsApp (E.164) e mensagem pre-preenchida padrao.

## Ordem recomendada de arranque

1. [ ] Criar repositorio GitHub publico.
2. [ ] Implementar Tasks 0-4.
3. [ ] Validar deploy tecnico (sem abrir a pais ainda).
4. [ ] Implementar Tasks 5-10.1.
5. [ ] Fechar CI + deploy + observabilidade (Tasks 11-12).
6. [ ] Executar piloto controlado (Task 13).
7. [ ] Fechar runbook de fallback (Task 14).
