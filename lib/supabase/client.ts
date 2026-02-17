type AuthUrlOptions = {
  redirectPath?: string;
};

export function buildGoogleAuthUrl(options: AuthUrlOptions = {}): string {
  const redirectPath = options.redirectPath ?? '/auth/callback';
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const redirectTo = new URL(redirectPath, siteUrl).toString();
  const authUrl = new URL('/auth/v1/authorize', baseUrl);

  authUrl.searchParams.set('provider', 'google');
  authUrl.searchParams.set('redirect_to', redirectTo);

  return authUrl.toString();
}

