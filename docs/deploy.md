# Deploy Runbook (Vercel + Supabase)

## 1) Pre-requisitos

- Projeto Supabase: `rkzvnbcbwudcskufcnci`
- Projeto Vercel ligado ao repositório `uniformes`
- Google OAuth ativo no Supabase
- Bucket `listing-images` criado no Supabase Storage

## 2) Variaveis de ambiente (Vercel)

Definir em `Production` e `Preview`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (apenas server-side)

Validar que nao existem placeholders (`YOUR_...`).

## 3) OAuth Redirect URLs

No Supabase Auth:

- `http://localhost:3000/auth/callback` (dev local)
- `https://<preview>.vercel.app/auth/callback` (preview)
- `https://<dominio-producao>/auth/callback` (producao)

## 4) Checklist de seguranca e dados

- RLS ativo em `profiles`, `school_memberships`, `invite_codes`, `listings`, `listing_images`, `reports`.
- Bucket `listing-images` com politicas de acesso alinhadas ao owner/listing.
- Pags internas com `noindex`.

## 5) Smoke test de producao

Executar apos cada release:

1. Login Google e callback sem erro.
2. Criar anuncio.
3. Upload de imagens (max 3, WebP, limites ativos).
4. Listar anuncio e abrir detalhe.
5. Abrir CTA de contacto WhatsApp.
6. Testar moderacao admin (ocultar anuncio).
7. Testar fluxo de apagamento (conta/anuncio) em ambiente controlado.

## 6) Observabilidade minima

Configurar alertas:

- `5xx > 2%` em janela de 15 minutos.
- aumento anormal de falhas em callback OAuth.
- uso de storage Supabase acima de `80%`.

Registar eventos criticos:

- `login_success`
- `listing_created`
- `image_uploaded`
- `listing_moderated`
- `account_deleted`

## 7) Falhas comuns

- Erro OAuth callback: rever `SITE_URL` e redirect URLs no Supabase.
- Upload rejeitado: validar compressao WebP e limites de tamanho.
- Lista vazia para utilizador autenticado: verificar membership da escola e politicas RLS.
