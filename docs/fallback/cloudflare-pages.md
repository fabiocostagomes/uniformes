# Runbook de Fallback: Cloudflare Pages

## Objetivo

Permitir migracao rapida do frontend de Vercel para Cloudflare Pages, mantendo Supabase, em caso de bloqueio de quota/politica no plano Hobby.

## Pre-requisitos

- Repositorio GitHub ligado ao Cloudflare Pages.
- Variaveis de ambiente configuradas no projeto Pages.
- Dominio e DNS com acesso para alteracoes.

## Build e deploy

- Framework preset: Next.js (output estatico/compatibilidade conforme projeto).
- Comando install: `pnpm install --frozen-lockfile`
- Comando build: `pnpm build`

## Variaveis de ambiente

Recriar no Cloudflare Pages:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (apenas se houver runtime server compatível)

## Checklist de migracao

1. Criar projeto Cloudflare Pages e ligar branch `main`.
2. Configurar env vars.
3. Deploy preview e executar smoke:
   - login
   - listagem
   - detalhe
   - CTA WhatsApp
4. Atualizar DNS para novo endpoint.
5. Repetir smoke em producao.
6. Monitorizar erros por 24h.

## Rollback

Se houver regressao critica:

1. Reverter DNS para Vercel.
2. Confirmar rotas principais operacionais.
3. Reabrir incidente com causa raiz e plano de correcao.

## Objetivo de RTO

- Restabelecer producao em <= 1 dia util.
