import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  // A07 — Rate limiting : 3 inscriptions / heure par IP
  const { ok, retryAfter } = rateLimit(req, { max: 3, windowMs: 60 * 60 * 1000 });
  if (!ok) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez plus tard." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const body = await req.json();
    const { email, firstName } = body;

    // A03 — Validation des entrées
    if (!email || !emailRe.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }
    if (firstName !== undefined && (typeof firstName !== "string" || firstName.length > 100)) {
      return NextResponse.json({ error: "Prénom invalide." }, { status: 400 });
    }

    const API_KEY = process.env.BREVO_API_KEY;
    if (!API_KEY) {
      console.error("[subscribe] BREVO_API_KEY manquante");
      return NextResponse.json({ error: "Erreur de configuration serveur." }, { status: 500 });
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        attributes: { FIRSTNAME: firstName?.trim() ?? "" },
        listIds: [2],
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[subscribe] Erreur Brevo:", data?.message ?? data);
      return NextResponse.json(
        { error: "Erreur lors de l'inscription à la newsletter." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] Erreur:", err?.message ?? err);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
}
