"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@headlessui/react";
import { useInView } from "react-intersection-observer";
import SF90XXButton from "@/components/ui/buttonSF90XX";
import ValhallaButton from "@/components/ui/buttonValhalla";

const product = {
  price: "À partir de 950 000 €",
  images: [
    {
      src: "/Valhalla/AstonFront.jpeg",
      alt: "Aston Martin Valhalla vue de face",
    },
    {
      src: "/Valhalla/AstonSide.jpeg",
      alt: "Aston Martin Valhalla vue de côté",
    },
    {
      src: "/Valhalla/AstonBack.jpeg",
      alt: "Aston Martin Valhalla vue arrière",
    },
    {
      src: "/Valhalla/AstonWheel.jpeg",
      alt: "Aston Martin Valhalla jante",
    },
    {
      src: "/Valhalla/AstonInterior.jpeg",
      alt: "Aston Martin Valhalla intérieur",
    },
    {
      src: "/Valhalla/AstonInteriors.jpeg",
      alt: "Aston Martin Valhalla intérieur",
    },
  ],

  description:
    "L’Aston Martin Valhalla est une supercar hybride d’exception, conçue pour marier puissance brute et efficacité technologique. Dotée d’un V8 biturbo central associé à un système hybride avancé, elle offre une expérience de conduite à la fois viscérale et maîtrisée. Chaque ligne, chaque détail reflète la quête de performance et d’équilibre propre à Aston Martin.",

  highlights: [
    "Moteur V8 4,0 L biturbo hybride – 998 ch combinés",
    "Transmission double embrayage à 8 rapports",
    "Châssis monocoque en fibre de carbone inspiré de la Formule 1",
    "Aérodynamique active pour un appui optimisé à haute vitesse",
    "Suspension multibras avec amortisseurs adaptatifs",
    "Intérieur minimaliste centré sur le pilote",
    "0 → 100 km/h en 2,5 s",
    "Vitesse maximale : 350 km/h",
  ],

  details:
    "L’Aston Martin Valhalla incarne la transition de la marque vers une ère d’hybridation haute performance. Son V8 biturbo d’origine AMG, couplé à deux moteurs électriques, développe près de 1 000 chevaux. Son châssis en fibre de carbone et son aérodynamique active assurent un équilibre parfait entre adhérence et vitesse. À l’intérieur, l’approche minimaliste orientée pilote met en avant la pureté mécanique et le contrôle absolu. La Valhalla combine l’émotion d’une supercar classique avec la précision d’une machine d’avant-garde.",
};

// === Composant compteur animé ===
function StatNumber({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000; // durée totale en ms
    const steps = 50; // nombre de pas pour l'animation
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
      {count.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function GT3RS() {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openPack1, setOpenPack1] = useState(false);
  const [openPack2, setOpenPack2] = useState(false);
  const [open, setOpen] = useState(false);

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

      <section className="max-w-6xl mx-auto px-6 pt-30 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center lg:-mt-2">
        <div className="relative z-20">
          <span className="inline-block bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg mb-4">
            Hybride
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Aston Martin Valhalla{" "}
          </h2>
          <p className="text-white/70 text-base sm:text-lg">
            La toute première supercar PHEV à moteur central d'Aston Martin,
            avec de véritables performances d'hypercar. Inspirée par l’Aston
            Martin Valkyrie et peaufinée avec les technologies de la Formule 1®.
            Elle associe un aérodynamisme sans précédent avec une ingénierie
            dérivée de la course, une allure emblématique et une absolue
            perfection jusque dans les moindres détails. Conçue pour offrir des
            performances inégalées et révolutionner les sensations de conduite,
            Valhalla est à la pointe du progrès technologique. Édition limitée à
            999 exemplaires seulement.
          </p>
        </div>

        {/* Parent caché sur mobile/tablette */}
        <div className="relative flex justify-center items-center w-full lg:max-w-[600px] mx-auto hidden lg:flex ">
          <Image
            src="/Valhalla/AstonLogo.png"
            alt="Ferrari SF90 XX Stradale logo"
            width={200}
            height={80}
            priority
            className="relative z-10 object-contain w-[60%] h-auto"
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
              onClick={() => openLightbox(photoIndex)} // 👉 clic sur toute la zone ouvre la lightbox
            >
              {product.images[photoIndex].type === "video" ? (
                <video
                  src={product.images[photoIndex].src}
                  controls
                  autoPlay
                  loop
                  className="rounded-2xl max-w-full h-auto cursor-pointer object-contain"
                />
              ) : (
                <Image
                  src={product.images[photoIndex].src}
                  alt={product.images[photoIndex].alt}
                  width={1200}
                  height={750}
                  priority
                  className="rounded-2xl max-w-full h-auto cursor-pointer object-contain"
                />
              )}
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
      {/* === Miniatures === */}
      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className="flex flex-nowrap gap-4 sm:gap-6 md:gap-8 overflow-x-auto scroll-px-4">
          {product.images.slice(1).map((item, idx) => (
            <div
              key={idx + 1}
              onClick={() => openLightbox(idx + 1)}
              className="relative rounded-lg overflow-hidden shadow-md cursor-pointer flex-shrink-0
          w-[140px] h-[100px] sm:w-[160px] sm:h-[110px] md:w-[200px] md:h-[140px] lg:w-[240px] lg:h-[160px]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 240px"
              />
            </div>
          ))}
        </div>
      </section>

      {/* === Lightbox === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white text-3xl font-bold"
            >
              ×
            </button>

            {/* Contenu image */}
            <motion.div
              key={photoIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 aspect-video overflow-hidden rounded-2xl"
              onClick={() => openLightbox(photoIndex)}
            >
              <Image
                src={product.images[photoIndex].src}
                alt={product.images[photoIndex].alt}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Flèches navigation */}
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
          {/* Stats verticales */}
          <div className="lg:w-1/2 text-white space-y-10 text-center lg:text-left">
            <div>
              <p className="text-4xl md:text-5xl font-bold">
                <StatNumber value={2.5} suffix=" s" />
              </p>
              <p className="text-base md:text-lg text-white/70">0 → 100 km/h</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">
                <StatNumber value={1064} suffix=" ch" />
              </p>
              <p className="text-base md:text-lg text-white/70">
                Puissance maximale combinée
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">
                <StatNumber value={350} suffix=" km/h" />
              </p>
              <p className="text-base md:text-lg text-white/70">
                Vitesse maximale
              </p>
            </div>

            {/* Bouton Desktop (s'affiche à partir de lg) */}
            <div className="flex justify-center lg:justify-start mt-6">
              <Button
                onClick={() => setOpen(true)}
                className="flex items-center font-bold px-5 py-2 rounded border border-white text-white bg-transparent hover:bg-red-600 hover:text-white transition-colors duration-300"
                variant="outline"
              >
                Fiche technique
              </Button>
            </div>

            <AnimatePresence>
              {open && (
                <>
                  {/* Overlay noir */}
                  <motion.div
                    className="fixed inset-0 bg-black/60 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpen(false)}
                  />

                  {/* Panneau qui glisse */}
                  <motion.div
                    className="fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-1/2 lg:w-1/2 bg-white z-50 shadow-xl flex flex-col"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween", duration: 0.4 }}
                  >
                    {/* Header */}
                    <div className="flex flex-col items-start p-6 border-b">
                      <p className="text-gray-500 mt-1">
                        Aston Martin Valhalla
                      </p>
                      <h2 className="text-xl font-bold text-gray-900">
                        CARACTÉRISTIQUES TECHNIQUES
                      </h2>
                      <button
                        onClick={() => setOpen(false)}
                        className="absolute top-6 right-6 text-2xl font-bold text-gray-600 hover:text-black"
                      >
                        ×
                      </button>
                    </div>

                    {/* Contenu */}
                    <div className="p-6 overflow-y-auto text-gray-800 flex flex-col items-center bg-gray-100">
                      {/* Image centrée */}
                      <div className="w-full flex justify-center mb-6">
                        <video
                          src="/Valhalla/AstonCarac.mp4"
                          alt="SF90XX châssis"
                          autoPlay
                          loop
                          playsInline
                          width={400}
                          height={250}
                          className="object-contain"
                        />
                      </div>

                      {/* Stats alignées */}
                      <div className="grid grid-cols-2 gap-6 text-center">
                        <div>
                          <p className="text-2xl font-bold">Hauteur</p>
                          <p className="text-sm text-gray-600">1 161 mm</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">Longueur</p>
                          <p className="text-sm text-gray-600">4 727 mm</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">Empattement</p>
                          <p className="text-sm text-gray-600">2 760 mm</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">Largeur</p>
                          <p className="text-sm text-gray-600">2 014 mm</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Image */}
          <div className="relative w-full mt-8 lg:mt-0 flex justify-center items-center overflow-hidden rounded-xl">
            {/* Image principale */}
            <Image
              src="/Valhalla/AstonStat.jpeg"
              alt="Aston Martin Valhalla châssis"
              width={1600}
              height={1000}
              className="object-cover w-full max-w-[1200px] h-[350px] sm:h-[400px] md:h-[450px] rounded-xl"
            />
          </div>

          {/* Bouton Mobile/Tablet */}
        </div>
      </section>

      {/* === Section piste avec texte === */}
      <section className="w-full relative mb-20">
        <video
          src="/Valhalla/AstonDesign.mp4"
          alt="Aston Martin Valhalla design"
          autoPlay
          loop
          playsInline
          muted
          width={1920}
          height={600}
          className="w-full h-[500px] sm:h-[600px] md:h-[700px] object-cover"
        />

        {/* Dégradé noir sous le texte */}
        <div
          className="absolute bottom-0 left-0 w-full h-64 sm:h-56 md:h-48
                  bg-gradient-to-t from-black/100 via-black/90 to-transparent
                  pointer-events-none z-0"
        />

        {/* Texte au-dessus du dégradé */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full px-4 bottom-6 sm:bottom-10 md:bottom-16 lg:bottom-32 text-center lg:max-w-3xl lg:mx-auto">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 lg:mb-4">
            Un travail d'air{" "}
          </h2>

          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
            Chaque courbe de la Valhalla est le résultat d’une étude
            aérodynamique méticuleuse, inspirée directement de la Formule 1. Son
            design marie fluidité et agressivité, avec des lignes tendues qui
            dirigent l’air pour maximiser l’appui et la stabilité à haute
            vitesse. L’équilibre entre art et performance se manifeste dans
            chaque surface, où la beauté sert avant tout la vitesse.
          </p>
        </div>
      </section>

      {/* === Section Packs circuit === */}
      <section className="flex flex-col items-center mb-20 px-4">
        <h2 className="text-center text-white text-xl sm:text-2xl md:text-3xl font-bold mx-auto mb-10 mt-6">
          Puissance et aérodynamisme extrême
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 w-full max-w-4xl">
          <div
            className="relative cursor-pointer w-full sm:w-1/2 hover:scale-105 transition-transform duration-300"
            onClick={() => setOpenPack1(true)}
          >
            <video
              src="/Valhalla/AstonEngine.mp4"
              alt="Aston Martin Valhalla moteur"
              autoPlay
              loop
              playsInline
              muted
              width={1920}
              height={1080}
              className="w-full h-[180px] sm:h-[250px] md:h-[350px] object-cover rounded-lg"
            />
            {/* Overlay texte + bouton */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex flex-col items-start p-2 sm:p-3 rounded">
              <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                Un groupe propulseur, trois moteurs.{" "}
              </h3>
              <button className="bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-700 transition text-sm sm:text-base">
                Découvrir
              </button>
            </div>
          </div>

          {/* Image 2 - Pack Clubsport */}
          <div
            className="relative cursor-pointer w-full sm:w-1/2 hover:scale-105 transition-transform duration-300"
            onClick={() => setOpenPack2(true)}
          >
            <Image
              src="/Valhalla/AstonChassis.jpg"
              alt="Aston Martin Valhalla châssis"
              width={1920}
              height={1080}
              className="w-full h-[180px] sm:h-[250px] md:h-[350px] object-cover rounded-lg"
              priority
            />
            {/* Overlay texte + bouton */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex flex-col items-start p-2 sm:p-3 rounded">
              <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                Un châssis taillé pour la performance{" "}
              </h3>
              <button className="bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-700 transition text-sm sm:text-base">
                Découvrir
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
                <video
                  src="/Valhalla/AstonEngine2.mp4"
                  autoPlay
                  loop
                  playsInline
                  muted
                  alt="Aston Martin Valhalla moteur"
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Texte en dessous */}
              <div className="w-full max-w-[90vw] sm:max-w-[80vw] bg-white p-4 sm:p-6 rounded-b-lg mt-0 t">
                <h3 className="text-black text-lg sm:text-xl md:text-2xl font-bold mb-2">
                  L’ingénierie au service de l’émotion{" "}
                </h3>
                <p className="text-black text-sm sm:text-base md:text-lg">
                  Le moteur V8 biturbo de 4,0 L, le plus puissant jamais monté
                  sur une Aston Martin, est associé à trois moteurs électriques
                  pour une puissance totale de 1 064 ch. Grâce à sa conception à
                  carter sec, ses turbocompresseurs à double spirale et ses
                  refroidisseurs d’air haute performance, la Valhalla atteint
                  une vitesse maximale de 350 km/h tout en optimisant chaque
                  instant de combustion.
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
                <video
                  src="/Valhalla/AstonChassis2.mp4"
                  autoPlay
                  loop
                  playsInline
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover rounded-t-lg"
                  alt="Pack Clubsport"
                />
              </motion.div>

              {/* Texte en dessous */}
              <div className="w-full max-w-[90vw] sm:max-w-[80vw] bg-white p-4 sm:p-6 rounded-b-lg mt-0 ">
                <h3 className="text-black text-lg sm:text-xl md:text-2xl font-bold mb-2">
                  Exactement comme en F1®{" "}
                </h3>
                <p className="text-black text-sm sm:text-base md:text-lg">
                  Valhalla utilise également une suspension avant à biellettes
                  dérivée de la course, visible à travers la carrosserie en
                  fibre de carbone, avec des ressorts et des amortisseurs montés
                  à l'intérieur. Montée à l'intérieur, elle déplace les
                  amortisseurs hors du flux d'air vers l'intérieur de la roue
                  avant - tout comme nos voitures de F1®, améliorant ainsi le
                  flux de refroidissement vers les refroidisseurs latéraux
                  arrière. Associée à une suspension arrière plus
                  conventionnelle à 5 bras, elle offre au conducteur les
                  performances d'une hypercar à moteur central.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <section className="max-w-4xl mx-auto px-4 mt-[220px] mb-[220px]">
        <h2 className="text-center text-white text-3xl font-bold mb-10">
          Consommation et Émissions - Aston Martin Valhalla
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-white/50 uppercase tracking-wide mb-2">
              Consommation électrique
            </p>
            <p className="text-white text-xl sm:text-2xl font-bold">
              Inconnu WH/KM
            </p>
          </div>

          <div>
            <p className="text-white/50 uppercase tracking-wide mb-2">
              Consommation carburant
            </p>
            <p className="text-white text-xl sm:text-2xl font-bold">
              Inconnu /100km
            </p>
          </div>

          <div>
            <p className="text-white/50 uppercase tracking-wide mb-2">
              Émissions CO₂
            </p>
            <p className="text-white text-xl sm:text-2xl font-bold">200 g/km</p>
          </div>

          <div className="col-span-1 lg:col-span-3 lg:flex lg:items-center lg:justify-center lg:mt-10">
            <div className="text-center">
              <p className="text-white/50 uppercase tracking-wide mb-2">
                Classe énergétique
              </p>
              <p className="text-white text-xl sm:text-2xl lg:text-4xl font-bold">
                G
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-[120px] relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
        <Image
          src="/Valhalla/AstonExhaust.webp"
          alt="Aston Martin Valhalla échappement"
          fill
          className="object-cover"
          priority
        />

        {/* Dégradé noir en haut */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>

        {/* Texte responsive */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full px-4 top-4 sm:top-6 md:top-8 lg:top-10 text-center lg:max-w-3xl lg:mx-auto">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-2 lg:mb-4">
            Fusion parfaite entre puissance et technologie
          </h2>

          <p className="text-white text-sm sm:text-base md:text-lg lg:text-2xl font-semibold">
            Sentez chaque vibration, chaque explosion du moteur de la Valhalla.
            <br className="hidden lg:block" />
            Un son qui incarne la vitesse, la puissance et l’exclusivité Aston
            Martin.
          </p>
        </div>

        {/* Bouton toujours en bas */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-4">
          <ValhallaButton className="w-full sm:w-3/4 md:w-2/4 lg:w-auto" />
        </div>
      </section>

      <Footer />
    </>
  );
}
