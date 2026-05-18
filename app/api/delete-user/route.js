import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { rateLimit } from "@/lib/rateLimit";

export async function DELETE(request) {
  // A07 — Rate limiting : 3 tentatives / 15 min par IP
  const { ok, retryAfter } = rateLimit(request, { max: 3, windowMs: 15 * 60 * 1000 });
  if (!ok) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token d'authentification manquant" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: userData, error: userError } =
      await supabaseAdmin.auth.getUser(token);
    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié" },
        { status: 401 }
      );
    }

    const userId = userData.user.id;

    const { error: deleteUserError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteUserError) {
      console.error(
        "Erreur lors de la suppression de l'utilisateur:",
        deleteUserError
      );
      return NextResponse.json(
        { error: "Erreur lors de la suppression de l'utilisateur" },
        { status: 500 }
      );
    }

    console.log("Utilisateur supprimé avec succès");

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      console.error("Erreur lors de la déconnexion:", signOutError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
