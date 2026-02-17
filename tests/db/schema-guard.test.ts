import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const requiredFiles = [
  'supabase/migrations/0001_initial_schema.sql',
  'supabase/migrations/0002_rls_policies.sql',
  'supabase/seed.sql',
  'tests/db/schema.test.sql',
  'docs/db-schema.md',
] as const;

describe('database schema guard', () => {
  it('has migration and db test files committed', () => {
    for (const file of requiredFiles) {
      expect(existsSync(resolve(process.cwd(), file)), `${file} is missing`).toBe(
        true,
      );
    }
  });

  it('enables rls on listings table and defines rls policies', () => {
    const migrationRlsPath = resolve(
      process.cwd(),
      'supabase/migrations/0002_rls_policies.sql',
    );

    const sql = readFileSync(migrationRlsPath, 'utf-8');

    expect(sql.toLowerCase()).toContain(
      'alter table public.listings enable row level security',
    );
    expect(sql.toLowerCase()).toContain('create policy');
    expect(sql.toLowerCase()).toContain('on public.listings');
  });
});
