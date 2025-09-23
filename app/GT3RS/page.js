"use client";
import Image from "next/image";
import Header from "@/components/Header";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const product = {
  price: "À partir de 230 000 €,",
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
      <div className="bg-black text-white mt-30">
        <div className="max-w-6xl mx-auto px-6 pt-8 text-center relative">
          <span className="absolute left-4 sm:left-6 top-0 bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg">
            Edition limitée
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Porsche 911 GT3 RS
          </h2>
          <p className="text-white/70 text-sm sm:text-base md:text-lg">
            La combinaison parfaite entre piste et route
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-0 max-w-6xl mx-auto pt-6">
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
                  className="rounded-2xl max-w-full h-auto cursor-pointer object-contain"
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
        </div>

        {/* === Miniatures === */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-6 pt-6">
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
        </div>

        {/* === Lightbox maison === */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Bouton fermer */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white text-3xl font-bold"
              >
                ×
              </button>

              {/* Image */}
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

              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 text-white text-5xl md:text-6xl"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 text-white text-5xl md:text-6xl"
              >
                ›
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === Infos produit === */}
        <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 lg:grid lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2 lg:border-r lg:border-white/10 lg:pr-10">
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

          <div className="mt-6 lg:row-span-3 lg:mt-0">
            <p className="text-3xl font-semibold">{product.price}</p>
            <button
              type="button"
              className="mt-10 flex w-full items-center justify-center rounded-xl bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 transition-colors duration-300"
            >
              Réserver un essai
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
