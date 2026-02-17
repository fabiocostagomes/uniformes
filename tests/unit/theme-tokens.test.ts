import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const requiredTokens = [
  '--color-bg',
  '--color-surface',
  '--color-text',
  '--color-muted',
  '--color-brand',
  '--font-family-base',
  '--font-size-body',
  '--font-size-title',
] as const;

describe('theme tokens', () => {
  it('keeps color and typography tokens in a central theme file', () => {
    const themePath = resolve(process.cwd(), 'app/theme.css');
    const globalsPath = resolve(process.cwd(), 'app/globals.css');

    expect(existsSync(themePath)).toBe(true);

    const themeCss = readFileSync(themePath, 'utf-8');
    const globalsCss = readFileSync(globalsPath, 'utf-8');

    for (const token of requiredTokens) {
      expect(themeCss).toContain(token);
    }

    // Global styles should consume tokens instead of hardcoded hex values.
    expect(globalsCss).not.toMatch(/#[0-9A-Fa-f]{3,8}/g);
  });
});
