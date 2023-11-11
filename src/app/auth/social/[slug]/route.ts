import { createClient } from '@/utils/supabase/server'
import { Provider } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const provider = params?.slug as Provider;

  let options: { redirectTo: string; scopes?: string } = {
    redirectTo: `${new URL(req.url).origin}/auth/callback`,
  };

  console.log('LOG: here', provider, options);

  if (provider == "azure") {
    options.scopes = "email";
  }

  if (provider) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options,
    });

    if (error) throw error;

    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect(new URL("/login", req.url));
}