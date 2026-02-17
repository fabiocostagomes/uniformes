import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Politica de Privacidade | Uniformes do Colegio',
  description: 'Como tratamos os dados pessoais na plataforma.',
};

export default function PrivacyPage() {
  return (
    <main className="listings-shell">
      <section className="card">
        <h1 className="title">Politica de Privacidade</h1>
        <p className="lead">
          Esta plataforma existe para facilitar a reutilizacao de uniformes entre
          familias da mesma escola.
        </p>

        <h2 className="subtitle">Dados recolhidos</h2>
        <p className="muted">
          Recolhemos apenas os dados minimos para funcionamento: nome, email,
          escola, anuncios publicados e numero de WhatsApp associado ao anuncio.
        </p>

        <h2 className="subtitle">Retencao</h2>
        <p className="muted">
          Mantemos logs aplicacionais pelo periodo minimo necessario, com alvo de
          30 dias.
        </p>

        <h2 className="subtitle">Contacto de privacidade</h2>
        <p className="muted">
          Para pedidos RGPD (acesso, retificacao ou apagamento), contactar:
          privacy@uniformescolegio.org
        </p>
      </section>
    </main>
  );
}
