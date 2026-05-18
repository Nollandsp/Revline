import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Validation manuelle des champs
function validate({ name, email, subject, message }) {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || typeof name !== "string" || name.trim().length < 1 || name.trim().length > 100)
    return "Nom invalide (1–100 caractères).";
  if (!email || !emailRe.test(email) || email.length > 254)
    return "Adresse email invalide.";
  if (!subject || typeof subject !== "string" || subject.trim().length < 1 || subject.trim().length > 200)
    return "Sujet invalide (1–200 caractères).";
  if (!message || typeof message !== "string" || message.trim().length < 1 || message.trim().length > 2000)
    return "Message invalide (1–2000 caractères).";
  return null;
}

export async function POST(req) {
  // A07 — Rate limiting : 5 messages / 15 min par IP
  const { ok, retryAfter } = rateLimit(req, { max: 5, windowMs: 15 * 60 * 1000 });
  if (!ok) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // A03 — Validation des entrées
    const validationError = validate({ name, email, subject, message });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // A01 — user_id extrait du token JWT, jamais du body client
    let userId = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseAdmin.auth.getUser(token);
      userId = data?.user?.id ?? null;
    }

    const { error } = await supabaseAdmin.from("contact_messages").insert([
      {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        user_id: userId,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ message: "Message reçu !" }, { status: 200 });
  } catch (err) {
    console.error("[contact] Erreur:", err?.message ?? err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
