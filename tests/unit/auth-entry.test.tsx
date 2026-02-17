import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePage from '../../app/page';

describe('auth entry', () => {
  it('renders Google OAuth link pointing to Supabase authorize endpoint', () => {
    render(<HomePage />);

    const authLink = screen.getByRole('link', { name: /entrar com google/i });
    const href = authLink.getAttribute('href') ?? '';

    expect(href).toContain('/auth/v1/authorize');
    expect(href).toContain('provider=google');
  });
});
