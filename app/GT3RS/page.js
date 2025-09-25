"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@headlessui/react";

const product = {
  price: "À partir de 230 000 €",
  images: [
    { src: "/GT3RS.webp", alt: "Porsche GT3 RS vue avant" },
    { src: "/GT3RSfront.webp", alt: "Porsche GT3 RS vue arrière" },
    { src: "/GT3RSback.webp", alt: "Porsche GT3 RS arrière" },
    { src: "/GT3RStop.webp", alt: "Porsche GT3 RS vue du dessus" },
    { src: "/GT3RSinter.webp", alt: "Intérieur Porsche GT3 RS" },
    { src: "/GT3RSinterior.webp", alt: "Détails intérieur Porsche GT3 RS" },
  ],
  description:
    "La Porsche 911 GT3 RS est une voiture de sport radicale conçue pour la piste mais homologuée pour la route. Avec son moteur atmosphérique de 525 ch et son aérodynamisme avancé, elle repousse les limites de la performance.",
  highlights: [
    "Moteur 6 cylindres à plat atmosphérique de 525 ch",
    "Aérodynamique active avec DRS",
    "Boîte PDK à 7 rapports",
    "Intérieur orienté course avec sièges baquet carbone",
  ],
  details:
    "La 911 GT3 RS combine un châssis affûté, des matériaux ultra légers et des technologies issues du sport automobile. Elle incarne l'essence de la compétition sur route ouverte.",
};

export default function GT3RS() {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openPack1, setOpenPack1] = useState(false);
  const [openPack2, setOpenPack2] = useState(false);

  const openLightbox = (idx) => {
    setPhotoIndex(idx);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const prevImage = () =>
    setPhotoIndex(
      (photoIndex - 1 + product.images.length) % product.images.length
    );
  const nextImage = () =>
    setPhotoIndex((photoIndex + 1) % product.images.length);

  return (
    <>
      <Header />

      {/* === Bloc intro titre à gauche + image bannière à droite === */}
      <section className="max-w-6xl mx-auto px-6 pt-30 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative z-20">
          <span className="inline-block bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg mb-4">
            Edition limitée
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Porsche 911 GT3 RS
          </h2>
          <p className="text-white/70 text-base sm:text-lg">
            La combinaison parfaite entre piste et route
          </p>
        </div>
        <div className="relative flex justify-center items-center">
          <Image
            src="/GT3RS.png"
            alt="Porsche 911 GT3 RS bannière"
            width={500}
            height={300}
            priority
            className="relative z-10 object-contain hidden sm:block"
          />
        </div>
      </section>

      {/* === Gros Carousel === */}
      <section className="px-4 sm:px-6 lg:px-0 max-w-6xl mx-auto pt-6">
        <div
          className="relative w-full rounded-2xl overflow-hidden bg-black
                     aspect-video sm:aspect-[16/8] md:aspect-[16/7] lg:aspect-[16/6]"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={photoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={product.images[photoIndex].src}
                alt={product.images[photoIndex].alt}
                width={1200}
                height={750}
                priority
                className={`rounded-2xl max-w-full h-auto cursor-pointer object-contain ${
                  product.images[photoIndex].src === "/GT3RSinterior.webp"
                    ? "mx-auto"
                    : ""
                }`}
                onClick={() => openLightbox(photoIndex)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Flèches */}
          <button
            onClick={prevImage}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl md:text-6xl z-10"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl md:text-6xl z-10"
          >
            ›
          </button>

          {/* Indicateurs */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
            {product.images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                  idx === photoIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* === Miniatures === */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-6 pt-6">
        {product.images.slice(1).map((image, idx) => (
          <div
            key={idx + 1}
            className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => openLightbox(idx + 1)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </section>

      {/* === Lightbox maison === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white text-3xl font-bold"
            >
              ×
            </button>

            <motion.div
              key={photoIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 aspect-video"
            >
              <Image
                src={product.images[photoIndex].src}
                alt={product.images[photoIndex].alt}
                fill
                className="object-contain rounded-2xl"
              />
            </motion.div>

            <button
              onClick={prevImage}
              className="absolute left-4 text-white text-5xl md:text-6xl"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 text-5xl md:text-6xl text-white"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Infos produit === */}
      <section className="mx-auto max-w-full px-6 pt-12 pb-20 lg:grid lg:grid-cols-3 lg:gap-10">
        {/* Bloc prix + bouton pour mobile/tablette */}
        <div className="mb-8 lg:hidden">
          <p className="text-3xl font-semibold">{product.price}</p>
          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 transition-colors duration-300"
          >
            Réserver un essai
          </button>
        </div>

        <div className="lg:col-span-2">
          {/* Bloc avec la bordure uniquement autour de la description */}
          <div className="lg:border-r lg:border-white/20 lg:pr-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Description
            </h3>
            <p className="text-white/70">{product.description}</p>

            <div className="mt-10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Points forts
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-white/70">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-semibold text-white mb-4">Détails</h2>
              <p className="text-white/70">{product.details}</p>
            </div>
          </div>
        </div>

        {/* Bloc prix + bouton pour desktop */}
        <div className="mt-6 lg:row-span-3 lg:mt-0 hidden lg:block">
          <p className="text-3xl font-semibold">{product.price}</p>
          <button
            type="button"
            className="mt-10 flex w-full items-center justify-center rounded-xl bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 transition-colors duration-300"
          >
            Réserver un essai
          </button>
        </div>

        {/* === Bloc stats + image sur toute la largeur === */}
        <div className="mt-12 lg:col-span-3 lg:flex lg:gap-16 px-4 sm:px-8 lg:px-20">
          {/* Stats verticales */}
          <div className="lg:w-1/2 text-white space-y-10 text-center lg:text-left">
            <div>
              <p className="text-4xl md:text-5xl font-bold">3,2 s</p>
              <p className="text-base md:text-lg text-white/70">0 → 100 km/h</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">386 kW / 525 ch</p>
              <p className="text-base md:text-lg text-white/70">Puissance</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">296 km/h</p>
              <p className="text-base md:text-lg text-white/70">
                Vitesse max circuit
              </p>
            </div>

            {/* Bouton Desktop (s'affiche à partir de lg) */}
            <div className="hidden lg:flex mt-10">
              <Button
                className="flex items-center font-bold px-5 rounded border border-white text-white bg-transparent hover:bg-red-600 hover:text-white transition-colors duration-300"
                variant="outline"
              >
                Fiche technique
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
            <Image
              src="/GT3RSstat.png"
              alt="Porsche 911 GT3 RS face avant"
              width={600}
              height={400}
              className="rounded-xl object-contain w-full max-w-[400px] sm:max-w-[500px] md:max-w-[350px] lg:max-w-[600px]"
            />
          </div>

          {/* Bouton Mobile/Tablet */}
          <div className="flex lg:hidden justify-center mt-10 w-full">
            <Button
              className="flex items-center font-bold px-5 rounded border border-white text-white bg-transparent hover:bg-red-600 hover:text-white transition-colors duration-300"
              variant="outline"
            >
              Fiche technique
            </Button>
          </div>
        </div>
      </section>

      {/* === Section piste avec texte === */}
      <section className="w-full relative mb-20">
        <Image
          src="/GT3RStrack.avif"
          alt="Porsche GT3 RS sur circuit"
          width={1920}
          height={600}
          className="w-full h-[500px] sm:h-[600px] md:h-[700px] object-cover"
          priority
        />
        <div className="absolute left-1/2 -translate-x-1/2 text-center w-full px-4 bottom-12 sm:bottom-20 md:bottom-28">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            Appui optimisé
          </h2>
          <p className="text-white text-lg sm:text-lg md:text-xl font-semibold whitespace-pre-line">
            La Porsche 911 GT3 RS a tout ce qu’il faut pour réaliser les
            meilleurs temps,
            <br className="hidden sm:block" />
            avec son aérodynamique active, sa déportance élevée et sa structure
            allégée.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-44 sm:h-40 md:h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </section>

      {/* === Section Packs circuit === */}
      <section className="flex flex-col items-center mb-20 px-4">
        <h2 className="text-center text-white text-xl sm:text-2xl md:text-3xl font-bold mx-auto mb-10 mt-6">
          Packs circuit
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 w-full max-w-4xl">
          <div
            className="relative cursor-pointer w-full sm:w-1/2 hover:scale-110 transition-transform duration-300"
            onClick={() => setOpenPack1(true)}
          >
            <Image
              src="/GT3RSweissach.avif"
              alt="Porsche GT3 RS sur circuit"
              width={1920}
              height={1080}
              className="w-full h-[180px] sm:h-[250px] md:h-[350px] object-cover rounded-lg"
              priority
            />
            {/* Overlay texte + bouton */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex flex-col items-start p-2 sm:p-3 rounded">
              <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                Pack Weissach
              </h3>
              <button className="bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-700 transition text-sm sm:text-base">
                Pack
              </button>
            </div>
          </div>

          {/* Image 2 - Pack Clubsport */}
          <div
            className="relative cursor-pointer w-full sm:w-1/2 hover:scale-110 transition-transform duration-300"
            onClick={() => setOpenPack2(true)}
          >
            <Image
              src="/GT3RSclub.avif"
              alt="Porsche GT3 RS autre pack"
              width={1920}
              height={1080}
              className="w-full h-[180px] sm:h-[250px] md:h-[350px] object-cover rounded-lg"
              priority
            />
            {/* Overlay texte + bouton */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex flex-col items-start p-2 sm:p-3 rounded">
              <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                Pack Clubsport
              </h3>
              <button className="bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-700 transition text-sm sm:text-base">
                Pack
              </button>
            </div>
          </div>
        </div>

        {/* Modale Image 1 */}
        <AnimatePresence>
          {openPack1 && (
            <motion.div
              className="fixed inset-0 bg-black/95 flex flex-col justify-center items-center z-50 px-4 py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Bouton fermer */}
              <button
                onClick={() => setOpenPack1(false)}
                className="absolute top-6 right-6 text-white text-3xl font-bold z-50"
              >
                ×
              </button>

              {/* Image animée */}
              <motion.div
                key="pack-weissach"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-[90vw] sm:max-w-[80vw] rounded-t-lg overflow-hidden h-[30vh] sm:h-[40vh] md:h-[55vh]"
              >
                <Image
                  src="/GT3RSweissach.avif"
                  alt="Pack Weissach"
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Texte en dessous */}
              <div className="w-full max-w-[90vw] sm:max-w-[80vw] bg-white p-4 sm:p-6 rounded-b-lg mt-0 t">
                <h3 className="text-black text-lg sm:text-xl md:text-2xl font-bold mb-2">
                  Pack Weissach
                </h3>
                <p className="text-black text-sm sm:text-base md:text-lg">
                  Dans la course au millième de seconde, chaque gramme compte.
                  Le Pack Weissach en option réduit encore le poids de presque
                  15 kg. À l’intérieur, l’arceau de sécurité arrière en carbone
                  apparent (finition satinée) rappelle l’ambition du modèle et
                  assure une protection supplémentaire sur circuit. Également en
                  PRFC, les stabilisateurs des essieux avant et arrière, les
                  barres d’accouplement sur l’essieu arrière et la plaque de
                  cisaillement contribuent à atteindre un poids idéal.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modale Image 2 */}
        <AnimatePresence>
          {openPack2 && (
            <motion.div
              className="fixed inset-0 bg-black/95 flex flex-col justify-center items-center z-50 px-4 py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Bouton fermer */}
              <button
                onClick={() => setOpenPack2(false)}
                className="absolute top-6 right-6 text-white text-3xl font-bold z-50"
              >
                ×
              </button>

              {/* Image animée */}
              <motion.div
                key="pack-clubsport"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-[90vw] sm:max-w-[80vw] rounded-t-lg overflow-hidden h-[30vh] sm:h-[40vh] md:h-[55vh]"
              >
                <Image
                  src="/GT3RSclub.avif"
                  alt="Pack Clubsport"
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Texte en dessous */}
              <div className="w-full max-w-[90vw] sm:max-w-[80vw] bg-white p-4 sm:p-6 rounded-b-lg mt-0 ">
                <h3 className="text-black text-lg sm:text-xl md:text-2xl font-bold mb-2">
                  Pack Clubsport
                </h3>
                <p className="text-black text-sm sm:text-base md:text-lg">
                  Le Pack Clubsport disponible sans supplément ajoute un arceau
                  de sécurité en acier, boulonné à la carrosserie et peint au
                  choix en Noir ou en Rouge Indien, derrière les sièges avant.
                  Un harnais 6 points contribue également à renforcer la
                  sécurité du pilote.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </>
  );
}
