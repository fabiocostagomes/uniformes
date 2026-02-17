import { describe, expect, it } from 'vitest';

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SITE_URL',
] as const;

describe('environment variables', () => {
  it('has all required env variables defined with non-placeholder values', () => {
    for (const key of requiredEnvVars) {
      const value = process.env[key];
      expect(value, `${key} must be defined`).toBeTruthy();
      expect(value).not.toContain('YOUR_');
    }
  });
});
