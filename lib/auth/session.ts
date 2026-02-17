export const AUTH_COOKIE_NAME = 'uniformes_session';
export const AUTH_COOKIE_VALUE = 'authenticated';
export const ROLE_COOKIE_NAME = 'uniformes_role';

type CookieReader = {
  get: (name: string) => { value: string } | undefined;
};

export type UserRole = 'member' | 'admin';

export function isAuthenticated(cookieStore: CookieReader): boolean {
  return cookieStore.get(AUTH_COOKIE_NAME)?.value === AUTH_COOKIE_VALUE;
}

export function getUserRole(cookieStore: CookieReader): UserRole {
  const value = cookieStore.get(ROLE_COOKIE_NAME)?.value;
  return value === 'admin' ? 'admin' : 'member';
}
