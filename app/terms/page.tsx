import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Termos de Utilizacao | Uniformes do Colegio',
  description: 'Regras base para utilizacao responsavel da plataforma.',
};

export default function TermsPage() {
  return (
    <main className="listings-shell">
      <section className="card">
        <h1 className="title">Termos de Utilizacao</h1>
        <p className="lead">
          A plataforma tem como objetivo facilitar trocas e revenda de uniformes
          usados entre pais da mesma escola.
        </p>

        <h2 className="subtitle">Uso permitido</h2>
        <p className="muted">
          Publicar apenas anuncios reais de uniformes e manter linguagem
          respeitosa nas interacoes.
        </p>

        <h2 className="subtitle">Responsabilidade</h2>
        <p className="muted">
          A combinacao de pagamento, entrega e estado final do artigo e tratada
          diretamente entre os pais via WhatsApp.
        </p>

        <h2 className="subtitle">Moderacao</h2>
        <p className="muted">
          A equipa admin pode ocultar anuncios que violem estas regras ou criem
          risco para a comunidade.
        </p>
      </section>
    </main>
  );
}
