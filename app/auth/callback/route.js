import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(`${origin}/Connexion?error=missing_code`);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.session) {
    return NextResponse.redirect(`${origin}/Connexion?error=confirmation_failed`);
  }

  const user = data.session.user;

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (profileError) {
    await supabaseAdmin.from("profiles").insert({
      id: user.id,
      pseudo: user.user_metadata?.pseudo ?? user.email?.split("@")[0] ?? "",
    });
  }

  const response = NextResponse.redirect(`${origin}${next}`);
  response.cookies.set("revline_session", "1", {
    path: "/",
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
