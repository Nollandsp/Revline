"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Clock, Users, ChevronDown, CheckCircle } from "lucide-react";

const FAQ = [
  {
    q: "Comment puis-je créer un compte ?",
    a: "Cliquez sur le bouton « S'inscrire » en haut à droite et remplissez le formulaire. L'inscription est gratuite et instantanée.",
  },
  {
    q: "Puis-je modifier mes informations personnelles ?",
    a: "Oui — rendez-vous dans votre profil pour mettre à jour votre pseudo et votre adresse email.",
  },
  {
    q: "Comment supprimer mon compte ?",
    a: "La section « Zone dangereuse » de votre profil vous permet de supprimer définitivement votre compte. Cette action est irréversible.",
  },
  {
    q: "Comment rester informé des prochaines sorties ?",
    a: "Abonnez-vous à notre newsletter depuis votre profil pour recevoir chaque sortie directement par email.",
  },
];

const INFO = [
  { Icon: Mail,  label: "Email",       value: "info@revline.com" },
  { Icon: Clock, label: "Réponse",     value: "Sous 24h" },
  { Icon: Users, label: "Support",     value: "Équipe dédiée" },
];

function FaqItem({ q, a, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.07 }}
      className="border-b border-white/6"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer group"
        aria-expanded={open}
      >
        <span className="text-white/70 group-hover:text-white text-sm font-semibold tracking-wide transition-colors duration-200 font-body">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-white/30 group-hover:text-red-500 transition-colors duration-200"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/40 text-sm leading-relaxed pb-5 font-body">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContactPage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/Connexion");
      else { setSession(session); setLoadingSession(false); }
    });
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSent(true);
        e.target.reset();
        setTimeout(() => setSent(false), 4000);
      } else {
        setError("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch {
      setError("Erreur réseau. Vérifiez votre connexion.");
    }

    setLoading(false);
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const inputClass =
    "w-full bg-black border border-white/10 text-white text-sm placeholder:text-white/20 px-4 py-3 focus:outline-none focus:border-red-600/50 transition-colors duration-200 font-body";
  const labelClass =
    "text-white/45 text-[10px] font-semibold tracking-[0.15em] uppercase font-body";

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black pt-28 sm:pt-36 pb-0 overflow-hidden">

        {/* ── Hero heading ── */}
        <div className="max-w-7xl mx-auto px-6 mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="w-8 h-[1px] bg-red-600" />
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">
              Service client
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-none text-white uppercase"
          >
            Contactez-nous
          </motion.h1>
        </div>

        {/* ── Split layout ── */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-0">

          {/* Left — Info + FAQ */}
          <div>
            {/* Info blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 mb-12">
              {INFO.map(({ Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-4 bg-neutral-950 border border-white/5 p-5"
                >
                  <div className="w-9 h-9 border border-red-600/30 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-body">{label}</p>
                    <p className="text-white text-sm font-semibold font-body mt-0.5">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-6 h-[1px] bg-red-600" />
                <span className="text-white/40 text-[10px] font-semibold tracking-[0.35em] uppercase font-body">
                  Questions fréquentes
                </span>
              </div>
              <div className="border-t border-white/6">
                {FAQ.map((item, i) => (
                  <FaqItem key={i} idx={i} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative bg-neutral-950 border border-white/6 p-7 sm:p-9">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

              <h2 className="font-display text-3xl sm:text-4xl text-white uppercase leading-none mb-1">
                Votre message
              </h2>
              <p className="text-white/30 text-sm mb-8 font-body">
                Une question ou une suggestion ? On vous répond sous 24h.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className={labelClass}>Nom</label>
                    <input id="name" name="name" type="text" placeholder="Votre nom" required className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <input id="email" name="email" type="email" placeholder="email@exemple.com" required className={inputClass} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className={labelClass}>Sujet</label>
                  <input id="subject" name="subject" type="text" placeholder="Sujet du message" required className={inputClass} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Écrivez votre message..."
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs border border-red-600/20 bg-red-600/8 px-3 py-2 font-body">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="relative overflow-hidden bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-[11px] font-semibold tracking-[0.25em] uppercase py-4 mt-1 transition-all duration-300 cursor-pointer font-body"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3.5 h-3.5 border border-white/40 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : "Envoyer le message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* ── Success toast ── */}
        <AnimatePresence>
          {sent && (
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-neutral-950 border border-green-600/30 px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              <CheckCircle size={16} className="text-green-500 shrink-0" />
              <span className="text-white text-sm font-semibold font-body">
                Message envoyé avec succès !
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
