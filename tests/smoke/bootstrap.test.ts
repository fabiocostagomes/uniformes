import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('bootstrap', () => {
  it('has a package.json file at project root', () => {
    const pkgPath = resolve(process.cwd(), 'package.json');
    expect(existsSync(pkgPath)).toBe(true);
  });
});
