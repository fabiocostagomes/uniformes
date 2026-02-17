import React from 'react';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="muted">
          Uniformes do Colégio. Reutilizar uniformes é uma prática comunitária e
          sustentável.
        </p>
        <nav aria-label="Links legais" className="footer-links">
          <a href="/privacy">Política de Privacidade</a>
          <a href="/terms">Termos de Utilização</a>
        </nav>
      </div>
    </footer>
  );
}
