import { NextResponse } from 'next/server';

import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from '../../../lib/auth/session';
import { readAuthCallbackParams } from '../../../lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const { code } = readAuthCallbackParams(requestUrl);

  if (code) {
    const redirectUrl = new URL('/listings', requestUrl.origin);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } else {
    const redirectUrl = new URL('/', requestUrl.origin);
    redirectUrl.searchParams.set('auth', 'error');
    return NextResponse.redirect(redirectUrl);
  }
}
