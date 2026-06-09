"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GT3RSButton from "@/components/ui/buttonGT3RS";

const product = {
  price: "À partir de 230 000 €",
  images: [
    { src: "/GT3RS/GT3RS.webp", alt: "Porsche 911 GT3 RS vue principale" },
    { src: "/GT3RS/GT3RSfront.webp", alt: "Porsche 911 GT3 RS face avant" },
    { src: "/GT3RS/GT3RSback.webp", alt: "Porsche 911 GT3 RS arrière" },
    { src: "/GT3RS/GT3RStop.webp", alt: "Porsche 911 GT3 RS vue du dessus" },
    { src: "/GT3RS/GT3RSinter.webp", alt: "Intérieur Porsche 911 GT3 RS" },
    { src: "/GT3RS/GT3RSinterior.webp", alt: "Détails intérieur Porsche 911 GT3 RS" },
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

function StatNumber({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    let currentStep = 0;
    const increment = value / steps;
    const stepTime = duration / steps;
    const timer = setInterval(() => {
      currentStep += 1;
      setCount((prev) => Math.min(prev + increment, value));
      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {isDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function GT3RS() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [openPack1, setOpenPack1] = useState(false);
  const [openPack2, setOpenPack2] = useState(false);
  const [fichOpen, setFichOpen] = useState(false);

  const openLightbox = (idx) => { setPhotoIndex(idx); setIsOpen(true); };
  const closeLightbox = () => setIsOpen(false);
  const prevImage = () => setPhotoIndex((photoIndex - 1 + product.images.length) % product.images.length);
  const nextImage = () => setPhotoIndex((photoIndex + 1) % product.images.length);

  return (
    <>
      <Header />

      {/* === Hero === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 lg:pt-44 pb-10">
        <Link
          href="/Showroom2"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm tracking-widest uppercase mb-8 transition-colors duration-200"
        >
          ← Showroom
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="inline-block text-xs tracking-[0.25em] uppercase text-red-500 font-semibold mb-4">
              Thermique
            </span>
            <h1
              className="font-display uppercase leading-none text-white"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              Porsche 911
              <br />
              GT3 RS
            </h1>
          </div>
          <p className="text-white/40 text-sm sm:text-base max-w-xs lg:text-right">
            La combinaison parfaite entre piste et route
          </p>
        </div>
      </section>

      {/* === Carousel === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative w-full overflow-hidden bg-neutral-950 aspect-video sm:aspect-[16/8] md:aspect-[16/7]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={photoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={product.images[photoIndex].src}
                alt={product.images[photoIndex].alt}
                width={1200}
                height={750}
                priority
                className="max-w-full h-full object-contain cursor-pointer"
                onClick={() => openLightbox(photoIndex)}
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevImage}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl sm:text-5xl z-10 transition-colors"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl sm:text-5xl z-10 transition-colors"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPhotoIndex(idx)}
                className={`h-[2px] transition-all duration-300 ${
                  idx === photoIndex ? "w-8 bg-red-600" : "w-4 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 sm:gap-3 mt-3 overflow-x-auto pb-2">
          {product.images.slice(1).map((image, idx) => (
            <button
              key={idx + 1}
              onClick={() => setPhotoIndex(idx + 1)}
              className={`relative flex-shrink-0 overflow-hidden border transition-colors duration-200 cursor-pointer ${
                photoIndex === idx + 1 ? "border-red-600" : "border-white/8 hover:border-red-600/40"
              }`}
              style={{ width: "clamp(100px, 14vw, 180px)", height: "clamp(65px, 9vw, 115px)" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="180px"
              />
            </button>
          ))}
        </div>
      </section>

      {/* === Lightbox === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-red-600 text-white text-xl transition-colors z-10"
            >
              ×
            </button>

            <motion.div
              key={photoIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-11/12 sm:w-4/5 lg:w-2/3 aspect-video"
            >
              <Image
                src={product.images[photoIndex].src}
                alt={product.images[photoIndex].alt}
                fill
                className="object-contain"
              />
            </motion.div>

            <button onClick={prevImage} className="absolute left-4 text-white/60 hover:text-white text-5xl transition-colors">‹</button>
            <button onClick={nextImage} className="absolute right-4 text-white/60 hover:text-white text-5xl transition-colors">›</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Info Section === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Left: description */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-red-500 mb-3">Description</p>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">{product.description}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-red-500 mb-3">Points forts</p>
              <ul className="space-y-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-white/70">
                    <span className="mt-2 w-1.5 h-1.5 bg-red-600 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-red-500 mb-3">Détails</p>
              <p className="text-white/70 text-base leading-relaxed">{product.details}</p>
            </div>
          </div>

          {/* Right: price + CTA */}
          <div className="mt-10 lg:mt-0 lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-2">Prix</p>
            <p className="font-display text-white uppercase" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              {product.price}
            </p>
            <div className="mt-8 space-y-3">
              <Link href="/Profil">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm tracking-widest uppercase py-3 px-6 transition-colors duration-200 cursor-pointer">
                  S'abonner à la newsletter
                </button>
              </Link>
              <button
                onClick={() => setFichOpen(true)}
                className="w-full border border-white/20 hover:border-red-600 text-white text-sm tracking-widest uppercase py-3 px-6 transition-colors duration-200 cursor-pointer"
              >
                Fiche technique
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 lg:flex lg:gap-16 lg:items-center">
          <div className="lg:w-1/2 divide-y divide-white/5">
            {[
              { value: 3.2, suffix: " s", label: "0 → 100 km/h" },
              { value: 525, suffix: " ch", label: "Puissance maximale" },
              { value: 296, suffix: " km/h", label: "Vitesse max circuit" },
            ].map(({ value, suffix, label }) => (
              <div key={label} className="py-6 border-b border-white/5 last:border-b-0">
                <p
                  className="font-display text-white uppercase leading-none"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                >
                  <StatNumber value={value} suffix={suffix} />
                </p>
                <p className="text-white/40 text-sm mt-1 tracking-wide">{label}</p>
              </div>
            ))}
          </div>

          <div className="lg:w-1/2 mt-10 lg:mt-0 flex items-center justify-center">
            <Image
              src="/GT3RS/GT3RSstat.png"
              alt="Porsche 911 GT3 RS statistiques"
              width={600}
              height={400}
              className="object-contain w-full max-w-[480px]"
            />
          </div>
        </div>
      </section>

      {/* === Fiche technique drawer === */}
      <AnimatePresence>
        {fichOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFichOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-1/2 lg:w-2/5 bg-neutral-950 border-l border-white/10 z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
            >
              <div className="flex items-start justify-between p-6 border-b border-white/10">
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-1">Porsche GT3RS</p>
                  <h2 className="font-display text-white uppercase text-2xl">Caractéristiques</h2>
                </div>
                <button
                  onClick={() => setFichOpen(false)}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-red-600 text-white transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div className="flex justify-center">
                  <Image
                    src="/GT3RS/GT3RScarac.svg"
                    alt="Porsche 911 GT3 RS profil"
                    width={400}
                    height={250}
                    className="object-contain w-full max-w-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-px bg-white/5">
                  {[
                    { label: "Hauteur", value: "1 322 mm" },
                    { label: "Longueur", value: "4 572 mm" },
                    { label: "Empattement", value: "2 457 mm" },
                    { label: "Largeur", value: "1 900 mm" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-neutral-950 p-4">
                      <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-1">{label}</p>
                      <p className="font-display text-white text-xl uppercase">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* === Design Section === */}
      <section className="relative w-full h-[480px] sm:h-[580px] md:h-[680px]">
        <Image
          src="/GT3RS/GT3RStrack.avif"
          alt="Porsche 911 GT3 RS sur circuit"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-10 sm:bottom-14 md:bottom-20 left-0 right-0 px-4 sm:px-6 max-w-7xl mx-auto">
          <h2
            className="font-display text-white uppercase leading-none mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)" }}
          >
            Appui optimisé
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-xl">
            La Porsche 911 GT3 RS a tout ce qu'il faut pour réaliser les meilleurs temps, avec son aérodynamique active, sa déportance élevée et sa structure allégée.
          </p>
        </div>
      </section>

      {/* === Packs === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <p className="text-xs tracking-[0.25em] uppercase text-red-500 mb-4">Configurations</p>
        <h2
          className="font-display text-white uppercase leading-none mb-12"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          Packs circuit
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pack Weissach */}
          <div
            className="group relative overflow-hidden cursor-pointer"
            onClick={() => setOpenPack1(true)}
          >
            <div className="relative h-[220px] sm:h-[300px] md:h-[380px] overflow-hidden">
              <Image
                src="/GT3RS/GT3RSweissach.avif"
                alt="Pack Weissach"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-colors duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <p className="text-xs tracking-[0.25em] uppercase text-red-500 mb-1">Option</p>
              <h3 className="font-display text-white uppercase text-xl sm:text-2xl">Pack Weissach</h3>
              <div className="h-[2px] bg-red-600 mt-3 w-0 group-hover:w-full transition-all duration-500" />
            </div>
          </div>

          {/* Pack Clubsport */}
          <div
            className="group relative overflow-hidden cursor-pointer"
            onClick={() => setOpenPack2(true)}
          >
            <div className="relative h-[220px] sm:h-[300px] md:h-[380px] overflow-hidden">
              <Image
                src="/GT3RS/GT3RSclub.avif"
                alt="Pack Clubsport"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-colors duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <p className="text-xs tracking-[0.25em] uppercase text-red-500 mb-1">Option</p>
              <h3 className="font-display text-white uppercase text-xl sm:text-2xl">Pack Clubsport</h3>
              <div className="h-[2px] bg-red-600 mt-3 w-0 group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Modal Pack Weissach */}
      <AnimatePresence>
        {openPack1 && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex flex-col justify-center items-center z-50 px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setOpenPack1(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-red-600 text-white transition-colors z-50"
            >
              ×
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[90vw] sm:max-w-[80vw] overflow-hidden h-[28vh] sm:h-[38vh] md:h-[50vh]"
            >
              <Image
                src="/GT3RS/GT3RSweissach.avif"
                alt="Pack Weissach"
                width={1200}
                height={600}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="w-full max-w-[90vw] sm:max-w-[80vw] bg-neutral-900 border-t border-red-600/25 p-4 sm:p-6">
              <p className="text-xs tracking-[0.25em] uppercase text-red-500 mb-2">Pack Weissach</p>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Dans la course au millième de seconde, chaque gramme compte. Le Pack Weissach en option réduit encore le poids de presque 15 kg. À l'intérieur, l'arceau de sécurité arrière en carbone apparent (finition satinée) rappelle l'ambition du modèle et assure une protection supplémentaire sur circuit. Également en PRFC, les stabilisateurs des essieux avant et arrière, les barres d'accouplement sur l'essieu arrière et la plaque de cisaillement contribuent à atteindre un poids idéal.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Pack Clubsport */}
      <AnimatePresence>
        {openPack2 && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex flex-col justify-center items-center z-50 px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setOpenPack2(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-red-600 text-white transition-colors z-50"
            >
              ×
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[90vw] sm:max-w-[80vw] overflow-hidden h-[28vh] sm:h-[38vh] md:h-[50vh]"
            >
              <Image
                src="/GT3RS/GT3RSclub.avif"
                alt="Pack Clubsport"
                width={1200}
                height={600}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="w-full max-w-[90vw] sm:max-w-[80vw] bg-neutral-900 border-t border-red-600/25 p-4 sm:p-6">
              <p className="text-xs tracking-[0.25em] uppercase text-red-500 mb-2">Pack Clubsport</p>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Le Pack Clubsport disponible sans supplément ajoute un arceau de sécurité en acier, boulonné à la carrosserie et peint au choix en Noir ou en Rouge Indien, derrière les sièges avant. Un harnais 6 points contribue également à renforcer la sécurité du pilote.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Consommation === */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-xs tracking-[0.25em] uppercase text-red-500 mb-4">Homologation</p>
        <h2
          className="font-display text-white uppercase leading-none mb-12"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          Consommation & Émissions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5">
          {[
            { label: "Consommation", value: "13,2 l/100 km" },
            { label: "Émissions CO₂", value: "295 g/km" },
            { label: "Classe énergétique", value: "G" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-black p-6 sm:p-8">
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-3">{label}</p>
              <p className="font-display text-white uppercase text-2xl sm:text-3xl">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Exhaust Section === */}
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
        <Image
          src="/GT3RS/GT3RSexauhst.avif"
          alt="Porsche 911 GT3 RS échappement"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h2
            className="font-display text-white uppercase leading-none mb-4"
            style={{ fontSize: "clamp(1.75rem, 5vw, 4rem)" }}
          >
            Cadence : 9 000 tours par minute.
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-lg">
            Le moteur atmosphérique et le système d'échappement sport garantissent une expérience sonore sans filtre.
          </p>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-6 flex justify-center">
          <GT3RSButton />
        </div>
      </section>

      <Footer />
    </>
  );
}
