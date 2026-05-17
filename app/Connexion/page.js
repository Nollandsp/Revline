"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        let message = authError.message;
        if (message === "Invalid login credentials") message = "Email ou mot de passe incorrect.";
        setError(message);
        setLoading(false);
        return;
      }

      const user = authData.user;
      if (!user) { setError("Utilisateur non trouvé après connexion"); setLoading(false); return; }

      const { error: profileError } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (profileError) {
        await supabase.from("profiles").insert({ id: user.id, pseudo: "" }).select().single();
      }

      router.push("/");
    } catch {
      setError("Erreur lors de la connexion");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-black overflow-hidden">
      {/* ── Left panel — car image ── */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <Image
          src="/GT3RS/GT3RS.webp"
          alt="Supercar Revline"
          fill
          className="object-cover"
          priority
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

        {/* Brand watermark */}
        <div className="absolute bottom-10 left-10">
          <p className="font-display text-[5rem] text-white/[0.06] leading-none select-none">
            REVLINE
          </p>
        </div>

        {/* Logo */}
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
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-5 sm:px-6 py-12 sm:py-16 relative">
        {/* Back */}
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
          {/* Heading */}
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none text-white uppercase mb-2">
            Connexion
          </h1>
          <p className="text-white/30 text-sm mb-10 font-body">Entrez vos identifiants pour continuer</p>

          {/* Card */}
          <div className="relative bg-neutral-950 border border-white/6 p-6 sm:p-8">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { id: "email", label: "Email", type: "email", placeholder: "email@exemple.com", value: email, onChange: setEmail },
                { id: "password", label: "Mot de passe", type: "password", placeholder: "••••••••", value: password, onChange: setPassword },
              ].map((field) => (
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

              <Link href="/reset-password" className="text-white/25 hover:text-white/55 text-xs text-right transition-colors duration-300 font-body">
                Mot de passe oublié ?
              </Link>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.2em] uppercase h-11 rounded-none mt-2 transition-all duration-300 cursor-pointer font-body"
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <p className="text-white/20 text-xs font-body">Pas encore de compte ?</p>
              <Link href="/Inscription">
                <button className="text-white/55 hover:text-white text-[11px] font-semibold tracking-widest uppercase border border-white/10 hover:border-white/30 px-4 py-2 transition-all duration-300 cursor-pointer font-body">
                  S&apos;inscrire
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
