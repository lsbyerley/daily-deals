import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

// https://github.com/vercel/next.js/issues/49373
// https://github.com/supabase-community/vercel-ai-chatbot/pull/8/files#diff-260a7990e7e5b9393ce53e9928522be628b30cd9b8b2a41d31736aa33bce4edd

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const { nextUrl: url, geo = {} } = req
  const city = geo?.city || 'Charlotte';
  const region = geo?.region || 'NC';
  const country = geo?.country || 'US';

  let usingDefaultGeo = 'false';
  if (!Object.keys(geo).length) usingDefaultGeo = 'true';

  url.searchParams.set('city', city)
  url.searchParams.set('region', region)
  url.searchParams.set('country', country)
  url.searchParams.set('usingDefaultGeo', usingDefaultGeo)

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  try {
    await supabase.auth.getSession()
  } catch(err) {
    console.log('LOG: middleware supabase session error');
  }

  return NextResponse.rewrite(url)
}
