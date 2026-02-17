import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Termos de Utilização | ReUni',
  description: 'Regras base para utilização responsável da plataforma.',
};

export default function TermsPage() {
  return (
    <main className="listings-shell">
      <section className="card">
        <h1 className="title">Termos de Utilização</h1>
        <p className="lead">
          A plataforma tem como objetivo facilitar trocas e revenda de uniformes
          usados entre pais da mesma escola.
        </p>

        <h2 className="subtitle">Uso permitido</h2>
        <p className="muted">
          Publicar apenas anúncios reais de uniformes e manter linguagem
          respeitosa nas interações.
        </p>

        <h2 className="subtitle">Responsabilidade</h2>
        <p className="muted">
          A combinação de pagamento, entrega e estado final do artigo é tratada
          diretamente entre os pais via WhatsApp.
        </p>

        <h2 className="subtitle">Moderação</h2>
        <p className="muted">
          A equipa admin pode ocultar anúncios que violem estas regras ou criem
          risco para a comunidade.
        </p>
      </section>
    </main>
  );
}
