export const AUTH_COOKIE_NAME = 'uniformes_session';
export const AUTH_COOKIE_VALUE = 'authenticated';

type CookieReader = {
  get: (name: string) => { value: string } | undefined;
};

export function isAuthenticated(cookieStore: CookieReader): boolean {
  return cookieStore.get(AUTH_COOKIE_NAME)?.value === AUTH_COOKIE_VALUE;
}
