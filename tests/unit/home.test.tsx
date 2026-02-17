import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePage from '../../app/page';

describe('home page', () => {
  it('renders title and login CTA for mobile-first hero', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: /uniformes do colegio/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /entrar com google/i }),
    ).toBeInTheDocument();
  });
});
