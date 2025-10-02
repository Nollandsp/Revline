"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-30">
        {/* Hero */}
        <section className="relative flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Tout savoir sur les supercars
            </h1>
            <p className="text-white/70 text-lg sm:text-xl">
              Notre mission est de vous informer en temps réel sur toutes les
              nouveautés supercars.
            </p>
            <p className="text-white/70 text-lg sm:text-xl">
              Chaque sortie, chaque innovation et chaque modèle emblématique est
              documenté pour les passionnés et collectionneurs.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <Image
              src="/mclaren.jpg"
              alt="Supercar sur circuit"
              width={600}
              height={400}
              className="rounded-xl shadow-lg object-cover w-full"
            />
          </div>
        </section>

        {/* Mission / Fonctionnement */}
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="bg-white/10 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Notre Mission
            </h2>
            <p className="text-white/70">
              Tenir les passionnés de supercars informés dès qu’un nouveau
              modèle est annoncé ou lancé.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Notre Expertise
            </h2>
            <p className="text-white/70">
              Une documentation précise sur les moteurs, performances, design et
              éditions limitées de chaque supercar.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-4 text-white">Newsletter</h2>
            <p className="text-white/70">
              Recevez les dernières informations et sorties directement dans
              votre boîte mail pour ne rien manquer.
            </p>
          </div>
        </section>

        {/* Comment ça fonctionne */}
        <section className="mt-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">
            Comment ça fonctionne
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-xl hover:scale-105 transition-transform duration-300">
              <Image
                src="/Senna.jpg"
                alt="Recherche de voiture"
                width={300}
                height={200}
                className="rounded-lg mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-2">
                Recherche rapide
              </h3>
              <p className="text-white/70">
                Trouvez instantanément les fiches techniques et informations des
                dernières supercars.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl hover:scale-105 transition-transform duration-300">
              <Image
                src="/Bugatti/Bugatti.jpg"
                alt="Mise à jour infos"
                width={300}
                height={200}
                className="rounded-lg mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-2">
                Mises à jour en temps réel
              </h3>
              <p className="text-white/70">
                Chaque sortie ou nouveauté est ajoutée rapidement, pour que vous
                soyez toujours à jour.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl hover:scale-105 transition-transform duration-300">
              <Image
                src="/Intro.jpg"
                alt="Newsletter supercar"
                width={300}
                height={200}
                className="rounded-lg mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-2">
                Abonnement newsletter
              </h3>
              <p className="text-white/70">
                Inscrivez-vous et recevez les dernières infos et sorties
                directement par email.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
