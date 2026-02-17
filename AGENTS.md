# AGENTS.md - Uniformes do Colegio

## Projeto

- Nome: `uniformes`
- Objetivo: marketplace mobile-first para troca/revenda de uniformes escolares entre pais.
- Stack atual: Next.js + TypeScript + Supabase + Vitest + pnpm.
- Planeamento fonte de verdade: `development.md`.

## Regras obrigatorias

- Usar sempre `pnpm` (nao usar `npm`).
- Fazer commits atomicos alinhados com as Tasks do `development.md`.
- Atualizar checkboxes e estado no `development.md` ao concluir cada task/lote.
- Nao adicionar dependencias de producao sem aprovacao explicita.
- Manter diffs pequenos e focados; evitar refactors fora de escopo.

## Supabase (MANDATORIO: usar MCP)

- Para este projeto, usar **sempre MCP** no server `supabase_uniformes_colegio`.
- Projeto alvo: `rkzvnbcbwudcskufcnci`.
- Nao usar outros servidores Supabase deste ambiente para este repositorio.
- DDL (schema/policies): usar `mcp__supabase_uniformes_colegio__apply_migration`.
- DML/queries operacionais: usar `mcp__supabase_uniformes_colegio__execute_sql`.
- Verificacao de migrations: usar `mcp__supabase_uniformes_colegio__list_migrations`.

## Frontend e design

- Mobile-first desde o inicio (min 360px).
- i18n day-one: `pt` (default) e `en`.
- Tema centralizado:
  - Tokens em `app/theme.css` (single source of truth).
  - `app/globals.css` deve consumir apenas `var(--token)`.
- Direcao visual: minimalista, confianca e sustentabilidade.

## Qualidade e testes

- Antes de concluir qualquer bloco:
  - `pnpm test:unit`
  - `pnpm test:db` quando houver alteracoes de base de dados.
- Se testes falharem, corrigir antes de prosseguir.

## Seguranca e dados

- RLS obrigatoria em tabelas com dados de utilizador/escola.
- Evitar logs com dados sensiveis.
- Privacidade: seguir fluxo de apagamento e politicas definidas no `development.md`.

## Execucao longa

- Trabalhar por lotes:
  - Lote A: Tasks 0-4
  - Lote B: Tasks 5-9
  - Lote C: Tasks 10-12
  - Lote D: Tasks 13-14
- Em cada checkpoint, registar:
  - ultimo commit
  - task atual/proxima
  - bloqueios

