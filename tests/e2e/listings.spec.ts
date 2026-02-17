import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import HomePage from '../../app/page';
import ListingDetailPage from '../../app/listings/[id]/page';
import ListingsPage from '../../app/listings/page';

const { cookiesMock, redirectMock } = vi.hoisted(() => {
  return {
    cookiesMock: vi.fn(),
    redirectMock: vi.fn(),
  };
});

vi.mock('next/headers', () => ({
  cookies: () => cookiesMock(),
}));

vi.mock('next/navigation', () => ({
  redirect: (path: string) => {
    redirectMock(path);
    throw new Error(`REDIRECT:${path}`);
  },
}));

describe('listings mobile flow', () => {
  beforeEach(() => {
    cookiesMock.mockReset();
    redirectMock.mockReset();
  });

  it('shows public presentation homepage with initiative section', () => {
    render(React.createElement(HomePage));

    expect(
      screen.getByRole('heading', { name: /uniformes do colegio/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/iniciativa comunitaria e sustentavel/i),
    ).toBeInTheDocument();
  });

  it('redirects unauthenticated users away from listings', async () => {
    cookiesMock.mockResolvedValue({
      get: () => undefined,
    });

    await expect(ListingsPage()).rejects.toThrow('REDIRECT:/?auth=required');
    expect(redirectMock).toHaveBeenCalledWith('/?auth=required');
  });

  it('lets authenticated users open listing detail and WhatsApp CTA', async () => {
    cookiesMock.mockResolvedValue({
      get: () => ({ value: 'authenticated' }),
    });

    const page = await ListingDetailPage({
      params: Promise.resolve({ id: 'listing-001' }),
    });

    render(page);
    expect(
      screen.getByRole('button', { name: /contactar no whatsapp/i }),
    ).toBeInTheDocument();
  });
});
