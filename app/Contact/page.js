"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader"; // ton Loader

export default function ContactForm() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/Connexion");
      } else {
        setSession(session);
        setLoadingSession(false);
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        setIsSent(true);
        e.target.reset();
        setTimeout(() => setIsSent(false), 3000);
      } else {
        alert("Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau");
    }
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-10 pt-32">
        {/* SECTION INTRO */}
        <div className="w-full max-w-3xl mx-auto text-center text-white px-6 space-y-6 animate-fade-in-up">
          <h2 className="text-4xl font-extrabold">
            Nous sommes là pour vous aider
          </h2>
          <p className="text-neutral-300 text-lg">
            Notre équipe est disponible pour répondre à toutes vos questions et
            vous accompagner dans vos projets.
          </p>

          <div className="flex justify-center gap-8 mt-6 text-neutral-400">
            <div className="flex flex-col items-center animate-fade-in-up [animation-delay:200ms]">
              <i className="ri-customer-service-2-line text-3xl text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]"></i>
              <p className="mt-2 text-sm">Support rapide</p>
            </div>
            <div className="flex flex-col items-center animate-fade-in-up [animation-delay:400ms]">
              <i className="ri-mail-send-line text-3xl text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]"></i>
              <p className="mt-2 text-sm">Réponse sous 24h</p>
            </div>
            <div className="flex flex-col items-center animate-fade-in-up [animation-delay:600ms]">
              <i className="ri-shield-check-line text-3xl text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]"></i>
              <p className="mt-2 text-sm">Équipe dédiée</p>
            </div>
          </div>
        </div>

        {/* FORMULAIRE */}
        <div className="w-full max-w-lg bg-neutral-900/80 border border-white/15 backdrop-blur-xl text-white rounded-3xl shadow-2xl p-10 space-y-10 hover:shadow-red-600/50 transition-all duration-500 mt-20 animate-fade-in-up [animation-delay:400ms]">
          <div className="space-y-3 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Contactez-nous
            </h1>
            <p className="text-base text-neutral-300">
              Une question, un problème ou une suggestion ? Envoyez-nous un
              message
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nom
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Votre nom"
                required
                className="bg-neutral-800/70 border border-white/20 text-white rounded-xl px-4 py-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@exemple.com"
                required
                className="bg-neutral-800/70 border border-white/20 text-white rounded-xl px-4 py-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Sujet
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder="Sujet du message"
                required
                className="bg-neutral-800/70 border border-white/20 text-white rounded-xl px-4 py-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Écrivez votre message ici..."
                required
                className="bg-neutral-800/70 border border-white/20 text-white rounded-xl px-4 py-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none transition"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all duration-300"
            >
              Envoyer le message
            </Button>
          </form>
        </div>

        {/* TOAST */}
        {isSent && (
          <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-white text-green-600 px-6 py-3 rounded-lg shadow-lg animate-bounce-in">
              Message envoyé avec succès !
            </div>
          </div>
        )}
      </div>

      {/* SÉPARATEUR */}
      <div className="w-24 h-1 bg-red-600 mx-auto my-16 rounded-full"></div>

      {/* FAQ */}
      <div className="w-full max-w-4xl mx-auto mt-10 px-4 animate-fade-in-up [animation-delay:200ms]">
        <h2 className="text-3xl font-bold text-center text-white mb-5">
          Questions fréquemment posées
        </h2>
        <p className="text-center text-white mb-10">
          Trouvez rapidement des réponses aux questions courantes
        </p>

        <div className="space-y-4 mb-20">
          <details className="group border border-white/20 rounded-xl bg-neutral-900/80 hover:bg-neutral-800/80 transition-colors duration-300 overflow-hidden">
            <summary className="flex justify-between items-center text-white font-medium px-4 py-3 cursor-pointer select-none">
              Comment puis-je créer un compte ?
              <span className="transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-4 overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out max-h-0 opacity-0 group-open:max-h-96 group-open:opacity-100">
              <p className="mt-2 mb-2 text-neutral-300">
                Pour créer un compte, cliquez sur le bouton "S'inscrire" en haut
                à droite et remplissez le formulaire.
              </p>
            </div>
          </details>

          <details className="group border border-white/20 rounded-xl bg-neutral-900/80 hover:bg-neutral-800/80 transition-colors duration-300 overflow-hidden">
            <summary className="flex justify-between items-center text-white font-medium px-4 py-3 cursor-pointer select-none">
              Puis-je modifier mes informations personnelles ?
              <span className="transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-4 overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out max-h-0 opacity-0 group-open:max-h-96 group-open:opacity-100">
              <p className="mt-2 mb-2 text-neutral-300">
                Oui, rendez-vous dans votre profil pour mettre à jour vos
                informations personnelles, y compris votre pseudo et votre
                email.
              </p>
            </div>
          </details>

          <details className="group border border-white/20 rounded-xl bg-neutral-900/80 hover:bg-neutral-800/80 transition-colors duration-300 overflow-hidden">
            <summary className="flex justify-between items-center text-white font-medium px-4 py-3 cursor-pointer select-none">
              Comment supprimer mon compte ?
              <span className="transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-4 overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out max-h-0 opacity-0 group-open:max-h-96 group-open:opacity-100">
              <p className="mt-2 mb-2 text-neutral-300">
                Vous pouvez supprimer votre compte dans la section "Zone
                dangereuse" de votre profil. Cette action est irréversible.
              </p>
            </div>
          </details>

          <details className="group border border-white/20 rounded-xl bg-neutral-900/80 hover:bg-neutral-800/80 transition-colors duration-300 overflow-hidden">
            <summary className="flex justify-between items-center text-white font-medium px-4 py-3 cursor-pointer select-none">
              Comment rester informé des prochaines sorties ?
              <span className="transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-4 overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out max-h-0 opacity-0 group-open:max-h-96 group-open:opacity-100">
              <p className="mt-2 mb-2 text-neutral-300">
                Il existe une newsletter pour rester informé des prochaines
                sorties. (À configurer plus tard)
              </p>
            </div>
          </details>
        </div>
      </div>

      <Footer />
    </>
  );
}
