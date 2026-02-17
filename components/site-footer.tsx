import React from 'react';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="muted">
          Uniformes do Colegio. Reutilizar uniformes e uma pratica comunitaria e
          sustentavel.
        </p>
        <nav aria-label="Links legais" className="footer-links">
          <a href="/privacy">Politica de Privacidade</a>
          <a href="/terms">Termos de Utilizacao</a>
        </nav>
      </div>
    </footer>
  );
}
