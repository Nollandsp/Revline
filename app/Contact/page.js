"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
      // user_id: ici tu peux mettre l'id du user connecté si nécessaire
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

    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000); // correspond au delay de sortie de l'animation
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-black px-4 py-16 pt-40">
        <div className="w-full max-w-lg bg-neutral-900/60 border border-white/10 backdrop-blur-xl text-white rounded-3xl shadow-2xl p-10 space-y-10 hover:shadow-red-600/50 transition-all duration-500">
          {/* Logo centré au-dessus du formulaire */}

          {/* Titre et description */}
          <div className="space-y-3 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Contactez-nous
            </h1>
            <p className="text-base text-neutral-300">
              Une question, un problème ou une suggestion ? Envoyez-nous un
              message
            </p>
          </div>

          {/* Formulaire */}
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

      <div className="w-full max-w-4xl mx-auto mt-20 px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-5">
          Questions fréquemment posées
        </h2>
        <p className=" text-center text-white mb-10">
          Trouvez rapidement des réponses aux questions courantes
        </p>

        <div className="space-y-4 mb-20">
          {/* Question 1 */}
          <details className="group border border-white/20 rounded-xl bg-neutral-900/80 overflow-hidden">
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

          {/* Question 2 */}
          <details className="group border border-white/20 rounded-xl bg-neutral-900/80 overflow-hidden">
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

          {/* Question 3 */}
          <details className="group border border-white/20 rounded-xl bg-neutral-900/80 overflow-hidden">
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

          {/* Question 4 */}
          <details className="group border border-white/20 rounded-xl bg-neutral-900/80 overflow-hidden">
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
