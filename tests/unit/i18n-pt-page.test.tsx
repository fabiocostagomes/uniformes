import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import PtHomePage from '../../app/pt/page';

describe('i18n pt page', () => {
  it('renders Portuguese content and language links', () => {
    render(<PtHomePage />);

    expect(
      screen.getByRole('heading', { name: /reuni/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /português/i })).toHaveAttribute(
      'href',
      '/pt',
    );
    expect(screen.getByRole('link', { name: /english/i })).toHaveAttribute(
      'href',
      '/en',
    );
  });
});
