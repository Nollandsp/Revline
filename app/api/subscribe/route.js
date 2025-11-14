import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, firstName } = await req.json();

    const API_KEY = process.env.BREVO_API_KEY;

    // 📨 Appel à l’API Brevo
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: firstName },
        listIds: [2], // ⚠️ remplace par ton ID de liste Brevo
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur Brevo :", data);
      return NextResponse.json(
        { error: "Erreur lors de l’inscription à la newsletter." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API:", err);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
}
