"use client";
import Image from "next/image";
import Header from "@/components/Header";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="bg-black min-h-screen text-white mt-20">
        {/* <div className="relative w-full max-w-4xl h-[180px] sm:h-[250px] md:h-[300px] lg:h-[350px] mx-auto rounded-2xl overflow-hidden">
          <Image
            src="/GT3RSbanner.avif"
            alt="Porsche GT3 RS"
            fill
            priority
            className="object-cover"
          />
        </div> */}

        {/* Galerie d’images */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto px-6 pt-8">
            {product.images.map((image, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox maison */}
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
                className="relative w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 aspect-video"
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

        {/* Infos produit */}
        <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 lg:grid lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2 lg:border-r lg:border-white/10 lg:pr-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Porsche 911 GT3 RS
            </h1>
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

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pr-10">
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
      </div>
    </>
  );
}
