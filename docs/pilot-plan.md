# Plano de Piloto Controlado

## Objetivo

Validar utilidade real da plataforma com um grupo pequeno de pais antes de abertura geral.

## Escopo do piloto

- Grupo: 10 a 20 pais convidados.
- Duracao: 2 semanas.
- 1 escola inicial.
- Funcionalidades ativas: login, convite, criacao/listagem, WhatsApp, moderacao basica.

## Metricas de sucesso

- >= 10 anuncios validos publicados.
- >= 70% dos anuncios com contacto efetivo no WhatsApp.
- zero incidentes criticos de privacidade.
- tempo medio para publicar anuncio <= 3 minutos.

## Criterio go/no-go

Go se:

- sem incidentes criticos de privacidade.
- sem bloqueios graves de usabilidade.
- sinais claros de adocao no grupo piloto.

No-go se:

- existirem falhas graves de seguranca/privacidade.
- o fluxo principal (publicar + contactar) falhar de forma recorrente.

## Rotina de feedback

### Semana 1

- enviar formulario curto com 5 perguntas:
  - facilidade de login;
  - clareza para criar anuncio;
  - qualidade das fotos;
  - sucesso no contacto via WhatsApp;
  - principal friccao.

### Semana 2

- recolher problemas por severidade:
  - P0 (bloqueante)
  - P1 (degrada experiencia)
  - P2 (melhoria)

- priorizar fixes P0/P1 antes de abrir para toda a escola.

## Operacao durante piloto

- monitorizacao diaria dos eventos criticos.
- revisao de moderacao pelo menos 1 vez por dia util.
- checkpoint rapido com stakeholders no fim de cada semana.
