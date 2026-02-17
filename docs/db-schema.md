# Database Schema (MVP)

## Core entities

- `schools`: colegio.
- `profiles`: utilizador autenticado.
- `school_memberships`: relacao utilizador-escola com role.
- `invite_codes`: codigos de convite por escola.
- `listings`: anuncios de uniformes.
- `listing_images`: imagens dos anuncios.
- `reports`: denuncias.

## RLS strategy

- RLS ativa em todas as tabelas de dominio (`profiles`, `schools`, `school_memberships`, `invite_codes`, `listings`, `listing_images`, `reports`).
- Leitura de anuncios limitada a membros da mesma escola.
- Criacao/edicao de anuncio permitida ao owner (e admin quando aplicavel).
- Convites geridos por admins da escola.

## Status lifecycle (listings)

- `active`
- `reserved`
- `sold`
- `archived`
- `removed`

## Seed inicial

`supabase/seed.sql` cria:

- 1 escola de bootstrap.
- 1 perfil admin inicial.
- 1 membership admin.
- 1 convite inicial.

