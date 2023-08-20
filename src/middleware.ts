import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const { nextUrl: url, geo } = req
  const city = geo?.city || 'Charlotte';
  const country = geo?.country || 'na';
  const region = geo?.region || 'North Carolina';

  url.searchParams.set('city', city)
  url.searchParams.set('country', country)
  url.searchParams.set('region', region)

  console.log('LOG: middleware searchParams', url.searchParams);

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession()

  return NextResponse.rewrite(url)
}
