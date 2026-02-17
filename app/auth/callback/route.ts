import { NextResponse } from 'next/server';

import { readAuthCallbackParams } from '../../../lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const { code } = readAuthCallbackParams(requestUrl);

  const redirectUrl = new URL('/', requestUrl.origin);

  if (code) {
    redirectUrl.searchParams.set('auth', 'ok');
  } else {
    redirectUrl.searchParams.set('auth', 'error');
  }

  return NextResponse.redirect(redirectUrl);
}

