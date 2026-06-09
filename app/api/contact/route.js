import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Notification email vers le propriétaire du site
    await resend.emails.send({
      from: "Revline Contact <onboarding@resend.dev>",
      to: process.env.RESEND_TO_EMAIL,
      replyTo: email.trim().toLowerCase(),
      subject: `[Revline] Nouveau message — ${subject.trim()}`,
      html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background-color:#080808;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#080808;padding:48px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;">

        <!-- Ligne rouge top -->
        <tr><td style="height:1px;background:linear-gradient(to right,transparent,#dc2626,transparent);padding:0;"></td></tr>

        <!-- Header -->
        <tr><td style="background-color:#0d0d0d;padding:32px 40px 24px;border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-size:22px;font-weight:900;color:#ffffff;letter-spacing:0.3em;text-transform:uppercase;">REVLINE</span>
              </td>
              <td align="right">
                <span style="font-size:10px;color:rgba(255,255,255,0.25);letter-spacing:0.2em;text-transform:uppercase;">Formulaire de contact</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Divider -->
        <tr><td style="height:1px;background-color:rgba(255,255,255,0.06);border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);"></td></tr>

        <!-- Body -->
        <tr><td style="background-color:#0d0d0d;padding:32px 40px;border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);">

          <!-- Tag -->
          <div style="display:inline-block;background-color:rgba(220,38,38,0.12);border:1px solid rgba(220,38,38,0.3);padding:4px 12px;margin-bottom:20px;">
            <span style="font-size:10px;color:#dc2626;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;">Nouveau message</span>
          </div>

          <!-- Sujet -->
          <h1 style="margin:0 0 28px 0;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:0.08em;text-transform:uppercase;line-height:1.3;">${subject.trim()}</h1>

          <!-- Infos expéditeur -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                <span style="font-size:10px;color:rgba(255,255,255,0.3);letter-spacing:0.15em;text-transform:uppercase;display:block;margin-bottom:4px;">Nom</span>
                <span style="font-size:14px;color:#ffffff;font-weight:600;">${name.trim()}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                <span style="font-size:10px;color:rgba(255,255,255,0.3);letter-spacing:0.15em;text-transform:uppercase;display:block;margin-bottom:4px;">Email</span>
                <span style="font-size:14px;color:#dc2626;">${email.trim().toLowerCase()}</span>
              </td>
            </tr>
          </table>

          <!-- Message -->
          <div style="background-color:rgba(255,255,255,0.03);border-left:2px solid #dc2626;padding:20px 20px 20px 20px;margin-bottom:32px;">
            <span style="font-size:10px;color:rgba(255,255,255,0.3);letter-spacing:0.15em;text-transform:uppercase;display:block;margin-bottom:12px;">Message</span>
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.8;white-space:pre-wrap;">${message.trim()}</p>
          </div>

          <!-- CTA Répondre -->
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background-color:#dc2626;">
                <a href="mailto:${email.trim().toLowerCase()}?subject=Re: ${encodeURIComponent(subject.trim())}"
                   style="display:inline-block;padding:13px 32px;font-size:11px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.2em;text-transform:uppercase;">
                  RÉPONDRE
                </a>
              </td>
            </tr>
          </table>

        </td></tr>

        <!-- Ligne rouge bottom -->
        <tr><td style="height:1px;background:linear-gradient(to right,transparent,rgba(220,38,38,0.4),transparent);"></td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0;text-align:center;">
          <p style="margin:0 0 4px 0;font-size:11px;color:rgba(255,255,255,0.15);letter-spacing:0.15em;text-transform:uppercase;">REVLINE</p>
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.1);">Notification automatique — ne pas répondre à cet email</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    }).catch((err) => console.error("[contact] Resend error:", err?.message));

    return NextResponse.json({ message: "Message reçu !" }, { status: 200 });
  } catch (err) {
    console.error("[contact] Erreur:", err?.message ?? err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
