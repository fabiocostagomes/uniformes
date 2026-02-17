import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SiteFooter from '../../components/site-footer';

describe('legal footer links', () => {
  it('shows required links for privacy and terms', () => {
    render(<SiteFooter />);

    expect(
      screen.getByRole('link', { name: /politica de privacidade/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /termos de utilizacao/i }),
    ).toBeInTheDocument();
  });
});
