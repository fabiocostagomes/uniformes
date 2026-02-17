import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Política de Privacidade | ReUni',
  description: 'Como tratamos os dados pessoais na plataforma.',
};

export default function PrivacyPage() {
  return (
    <main className="listings-shell">
      <section className="card">
        <h1 className="title">Política de Privacidade</h1>
        <p className="lead">
          Esta plataforma existe para facilitar a reutilização de uniformes entre
          famílias da mesma escola.
        </p>

        <h2 className="subtitle">Dados recolhidos</h2>
        <p className="muted">
          Recolhemos apenas os dados mínimos para funcionamento: nome, email,
          escola, anúncios publicados e número de WhatsApp associado ao anúncio.
        </p>

        <h2 className="subtitle">Retenção</h2>
        <p className="muted">
          Mantemos logs aplicacionais pelo período mínimo necessário, com alvo de
          30 dias.
        </p>

        <h2 className="subtitle">Contacto de privacidade</h2>
        <p className="muted">
          Para pedidos RGPD (acesso, retificação ou apagamento), contactar:
          privacy@uniformescolegio.org
        </p>
      </section>
    </main>
  );
}
