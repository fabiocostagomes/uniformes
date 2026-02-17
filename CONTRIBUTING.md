# Contributing

Obrigado por contribuir para o ReUni.

## Fluxo recomendado

1. Criar branch a partir de `main`.
2. Implementar uma alteracao pequena e focada.
3. Garantir testes verdes:
   - `pnpm test:unit`
   - `pnpm test:e2e`
4. Abrir PR com descricao clara e contexto.

## Regras de contribuicao

- Mantem commits atomicos.
- Nao introduzir dependencias de producao sem discussao previa.
- Seguir mobile-first e design tokens em `app/theme.css`.
- Manter texto em Portugues e Ingles quando relevante para i18n.

## Seguranca e dados

- Nunca commitar segredos ou chaves.
- Respeitar o principio de minimo dado pessoal.
