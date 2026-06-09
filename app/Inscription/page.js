"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  async function subscribeToMailchimp(email, firstName) {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstName }),
    });
    return await response.json();
  }

  const validatePassword = (pwd) => {
    if (pwd.length < 8) return "Le mot de passe doit contenir au moins 8 caractères.";
    if (!/[A-Z]/.test(pwd)) return "Le mot de passe doit contenir au moins une majuscule.";
    if (!/[a-z]/.test(pwd)) return "Le mot de passe doit contenir au moins une minuscule.";
    if (!/[0-9]/.test(pwd)) return "Le mot de passe doit contenir au moins un chiffre.";
    if (!/[^A-Za-z0-9]/.test(pwd)) return "Le mot de passe doit contenir au moins un caractère spécial.";
    if (pwd.length > 128) return "Le mot de passe ne peut pas dépasser 128 caractères.";
    return null;
  };

  const validatePseudo = (p) => {
    if (!p || p.trim().length < 2) return "Le pseudo doit contenir au moins 2 caractères.";
    if (p.trim().length > 30) return "Le pseudo ne peut pas dépasser 30 caractères.";
    if (!/^[a-zA-ZÀ-ÿ0-9_-]+$/.test(p.trim())) return "Le pseudo ne peut contenir que des lettres, chiffres, _ et -.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const pseudoErr = validatePseudo(pseudo);
    if (pseudoErr) { setError(pseudoErr); setLoading(false); return; }

    const pwdErr = validatePassword(password);
    if (pwdErr) { setError(pwdErr); setLoading(false); return; }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: { pseudo: pseudo.trim() },
          captchaToken,
        },
      });

      if (signUpError) { setError(signUpError.message); setLoading(false); return; }

      const user = data.user;
      if (user) {
        if (newsletter) {
          try {
            await subscribeToMailchimp(email.trim().toLowerCase(), pseudo.trim());
          } catch (err) {
            console.error("Erreur newsletter :", err);
          }
        }
        setEmailSent(true);
      }
    } catch {
      setError("Erreur lors de l'inscription.");
    }

    setLoading(false);
  };

  const fields = [
    { id: "pseudo", label: "Pseudo", type: "text", placeholder: "Votre pseudo", value: pseudo, onChange: setPseudo },
    { id: "email", label: "Email", type: "email", placeholder: "email@exemple.com", value: email, onChange: setEmail },
    { id: "password", label: "Mot de passe", type: "password", placeholder: "••••••••", value: password, onChange: setPassword },
    { id: "confirmPassword", label: "Confirmer le mot de passe", type: "password", placeholder: "••••••••", value: confirmPassword, onChange: setConfirmPassword },
  ];

  if (emailSent) {
    return (
      <div className="min-h-screen flex bg-black items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[380px] text-center"
        >
          <div className="relative bg-neutral-950 border border-white/6 p-8">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
            <div className="w-12 h-12 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-500">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl text-white uppercase mb-3">Vérifiez vos mails</h2>
            <p className="text-white/35 text-sm font-body leading-relaxed mb-6">
              Un lien de confirmation a été envoyé à <span className="text-white/60">{email.trim().toLowerCase()}</span>. Cliquez dessus pour activer votre compte.
            </p>
            <Link href="/Connexion">
              <button className="text-white/40 hover:text-white text-[11px] font-semibold tracking-widest uppercase border border-white/10 hover:border-white/30 px-6 py-3 transition-all duration-300 cursor-pointer font-body">
                Retour à la connexion
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-black overflow-hidden">
      {/* ── Left panel — image ── */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <Image
          src="/SF90XX/SF90.jpg"
          alt="Ferrari SF90 XX"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

        <div className="absolute bottom-10 left-10">
          <p className="font-display text-[5rem] text-white/[0.06] leading-none select-none">REVLINE</p>
        </div>

        <div className="absolute top-8 left-8">
          <Link href="/">
            <Image
              src="/RevlineLogo.png"
              alt="Revline"
              width={110}
              height={55}
              className="object-contain h-[50px] w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-5 sm:px-6 py-12 sm:py-16 relative overflow-y-auto">
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-white/35 hover:text-white text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300 font-body"
        >
          <ArrowLeft size={13} />
          Retour
        </Link>

        {/* Mobile logo */}
        <Link href="/" className="lg:hidden mb-10">
          <Image
            src="/RevlineLogo.png"
            alt="Revline Logo"
            width={120}
            height={60}
            priority
            className="object-contain h-14 w-auto opacity-90"
          />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[380px]"
        >
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none text-white uppercase mb-2">
            Inscription
          </h1>
          <p className="text-white/30 text-sm mb-10 font-body">Créez votre compte Revline</p>

          <div className="relative bg-neutral-950 border border-white/6 p-6 sm:p-8">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {fields.map((field) => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <label htmlFor={field.id} className="text-white/45 text-[10px] font-semibold tracking-[0.15em] uppercase font-body">
                    {field.label}
                  </label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="bg-black border-white/10 text-white placeholder:text-white/20 rounded-none focus:border-red-600/60 focus:ring-0 h-11 font-body"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    required
                  />
                </div>
              ))}

              {error && (
                <p className="text-red-500 text-xs border border-red-600/20 bg-red-600/8 px-3 py-2 font-body">
                  {error}
                </p>
              )}

              {/* Newsletter checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group mt-1">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border transition-all duration-200 flex items-center justify-center ${newsletter ? "bg-red-600 border-red-600" : "border-white/20 bg-transparent group-hover:border-white/40"}`}>
                    {newsletter && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-white/35 text-xs group-hover:text-white/55 transition-colors duration-300 font-body">
                  Je souhaite recevoir les nouveautés par email
                </span>
              </label>

              {/* Captcha */}
              <div className="w-full">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                  onSuccess={setCaptchaToken}
                  onExpire={() => setCaptchaToken(null)}
                  options={{ theme: "dark" }}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.2em] uppercase h-11 rounded-none mt-2 transition-all duration-300 cursor-pointer font-body disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading || !captchaToken}
              >
                {loading ? "Inscription..." : "Créer mon compte"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <p className="text-white/20 text-xs font-body">Déjà un compte ?</p>
              <Link href="/Connexion">
                <button className="text-white/55 hover:text-white text-[11px] font-semibold tracking-widest uppercase border border-white/10 hover:border-white/30 px-4 py-2 transition-all duration-300 cursor-pointer font-body">
                  Se connecter
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
