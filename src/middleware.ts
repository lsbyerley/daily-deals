import { createClient } from '@/utils/supabase/middleware'
import { NextResponse } from 'next/server'

// https://github.com/vercel/next.js/issues/49373
// https://github.com/supabase-community/vercel-ai-chatbot/pull/8/files#diff-260a7990e7e5b9393ce53e9928522be628b30cd9b8b2a41d31736aa33bce4edd

import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { nextUrl: url, geo = {} } = request
  
  let city = 'Charlotte';
  let region = 'NC';
  let country = 'US';
  let usingDefaultGeo = 'true';

  if (geo?.city && geo?.region && geo?.country) {
    city = geo.city;
    region = geo.region;
    country = geo.country;
    usingDefaultGeo = 'false'
  }

  url.searchParams.set('city', city);
  url.searchParams.set('region', region);
  url.searchParams.set('country', country);
  url.searchParams.set('usingDefaultGeo', usingDefaultGeo);

  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request)

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    await supabase.auth.getSession()

    //return response.rewrite(url);

  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }

  return NextResponse.rewrite(url)
}
