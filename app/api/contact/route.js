import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Clé serveur
);

export async function POST(req) {
  try {
    const { name, email, subject, message, user_id } = await req.json();

    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        subject,
        message,
        user_id: user_id || null,
      },
    ]);

    if (error) throw error;

    return new Response(JSON.stringify({ message: "Message reçu !" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
    });
  }
}
