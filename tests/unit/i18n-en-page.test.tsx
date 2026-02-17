import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import EnHomePage from '../../app/en/page';

describe('i18n en page', () => {
  it('renders English content and keeps auth CTA', () => {
    render(<EnHomePage />);

    expect(
      screen.getByRole('heading', { name: /close the loop/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /continue with google/i }),
    ).toBeInTheDocument();
  });
});
