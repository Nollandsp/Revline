"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@headlessui/react";
import { useInView } from "react-intersection-observer";
import JeskoButton from "@/components/ui/buttonJesko";
import Link from "next/link";

const product = {
  price: "À partir de 3 000 000 €",
  images: [
    {
      src: "/Jesko/JeskoSide.webp",
      alt: "Koenigsegg Jesko Attack vue de côté",
    },
    {
      src: "/Jesko/JeskoFront.jpg",
      alt: "Koenigsegg Jesko Attack vue de face",
    },
    {
      src: "/Jesko/JeskoSide2.webp",
      alt: "Koenigsegg Jesko Attack vue de côté",
    },
    {
      src: "/Jesko/JeskoRide.jpg",
      alt: "Koenigsegg Jesko Attack en action",
    },
    {
      src: "/Jesko/JeskoInterior.jpg",
      alt: "Koenigsegg Jesko Attack intérieur",
    },
    {
      src: "/Jesko/JeskoInterior2.jpg",
      alt: "Koenigsegg Jesko Attack intérieur",
    },
  ],

  description:
    "La Koenigsegg Jesko Attack est une hypercar radicale orientée piste, conçue pour générer une charge aérodynamique extrême sans sacrifier les performances pures. Dotée d’un V8 biturbo 5,0 L développé en interne et d’une transmission révolutionnaire à haut rendement, elle délivre jusqu’à 1 600 ch en mode E85. Sa carrosserie sculptée, son appui aérodynamique pouvant atteindre 1 400 kg, ainsi que son agilité exceptionnelle font d’elle une machine hors pair entre circuit et route.",
  highlights: [
    "Moteur V8 5,0 L biturbo – jusqu’à 1 600 ch (E85)",
    "Boîte de vitesses Light Speed Transmission à 9 rapports",
    "Aérodynamique active – 1 400 kg d’appui à 250 km/h",
    "Châssis monocoque en fibre de carbone ultraléger",
    "Suspension Triplex Koenigsegg active avant/arrière",
    "Vitesse maximale théorique : 480 km/h+",
    "0 → 100 km/h en 2,3 s",
    "Aileron arrière fixe optimisé pour le circuit",
  ],
  details:
    "La Jesko Attack est l’expression ultime de la technologie Koenigsegg appliquée à la performance pure. Son moteur V8 biturbo de 5,0 litres est couplé à une boîte de vitesses révolutionnaire à neuf rapports sans synchros, permettant des changements instantanés. Grâce à son aérodynamique poussée – générant jusqu’à 1 400 kg d’appui – et son châssis en carbone, elle redéfinit les limites de l’adhérence et de la maniabilité. Le modèle ‘Attack’ est spécifiquement conçu pour la piste, tandis que la version Absolut privilégie la vitesse maximale. La Jesko incarne la vision d’un hypercar sans compromis, alliant puissance, légèreté et innovation mécanique extrême.",
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
            Thermique
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            koenigsegg Jesko Attack{" "}
          </h2>
          <p className="text-white/70 text-base sm:text-lg">
            La Koenigsegg Jesko incarne la fusion parfaite entre innovation et
            puissance brute. Son moteur V8 biturbo offre une accélération
            phénoménale, tandis que chaque détail est pensé pour une expérience
            de conduite inégalée et pleine d’adrénaline.
          </p>
        </div>

        {/* Parent caché sur mobile/tablette */}
        <div className="relative flex justify-center items-center w-full lg:max-w-[600px] mx-auto hidden lg:flex ">
          <Image
            src="/Jesko/JeskoLogo.svg"
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
      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className="flex flex-nowrap gap-4 sm:gap-6 md:gap-8 overflow-x-auto scroll-px-4">
          {product.images.slice(1).map((item, idx) => (
            <div
              key={idx + 1}
              onClick={() => openLightbox(idx + 1)}
              className="relative rounded-lg overflow-hidden shadow-md cursor-pointer flex-shrink-0
                 w-[140px] h-[100px] sm:w-[160px] sm:h-[110px] md:w-[200px] md:h-[140px] lg:w-[240px] lg:h-[160px]"
            >
              (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 240px"
              />
              )
            </div>
          ))}
        </div>
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
            {/* Bouton de fermeture */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white text-3xl font-bold"
            >
              ×
            </button>

            {/* Contenu (image ou vidéo) */}
            <motion.div
              key={photoIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 aspect-video"
            >
              (
              <Image
                src={product.images[photoIndex].src}
                alt={product.images[photoIndex].alt}
                fill
                className="object-contain rounded-2xl"
              />
              )
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
          <Link href="/Profil">
            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 transition-colors duration-300"
            >
              S'abonner à la newsletter
            </button>
          </Link>
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
          <Link href="/Profil">
            <button
              type="button"
              className="mt-10 flex w-full items-center justify-center rounded-xl bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 transition-colors duration-300"
            >
              S'abonner à la newsletter
            </button>
          </Link>
        </div>

        {/* === Bloc stats + image sur toute la largeur === */}
        <div className="mt-12 lg:col-span-3 lg:flex lg:gap-16 px-4 sm:px-8 lg:px-20">
          {/* Stats verticales */}
          {/* Stats verticales */}
          <div className="lg:w-1/2 text-white space-y-10 text-center lg:text-left">
            <div>
              <p className="text-4xl md:text-5xl font-bold">
                <StatNumber value={2.3} suffix=" s" />
              </p>
              <p className="text-base md:text-lg text-white/70">0 → 100 km/h</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">
                <StatNumber value={1600} suffix=" ch" />
              </p>
              <p className="text-base md:text-lg text-white/70">
                Puissance maximale combinée
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">
                <StatNumber value={400} suffix=" km/h" />
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
                        Koenigsegg Jesko Attack
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
                        <Image
                          src="/Jesko/JeskoCarac.webp"
                          alt="Koenigsegg Jesko Attack vue de côté"
                          width={400}
                          height={250}
                          className="object-contain"
                        />
                      </div>

                      {/* Stats alignées */}
                      <div className="grid grid-cols-2 gap-6 text-center">
                        <div>
                          <p className="text-2xl font-bold">Hauteur</p>
                          <p className="text-sm text-gray-600">1 210 mm</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">Longueur</p>
                          <p className="text-sm text-gray-600">4 626 mm</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">Empattement</p>
                          <p className="text-sm text-gray-600">2 700 mm</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">Largeur</p>
                          <p className="text-sm text-gray-600">2 030 mm</p>
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
              src="/Jesko/JeskoFront.jpg"
              alt="Koenigsegg Jesko Attack vue de face"
              width={1600}
              height={1000}
              className="object-cover w-full max-w-[1200px] h-[350px] sm:h-[400px] md:h-[450px] rounded-xl"
            />

            {/* Masquage noir net sur les bords */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Côtés gauche/droite */}
              <div className="absolute top-0 left-0 w-[15%] h-full bg-gradient-to-r from-black to-transparent"></div>
              <div className="absolute top-0 right-0 w-[15%] h-full bg-gradient-to-l from-black to-transparent"></div>

              {/* Haut/bas (si tu veux aussi les cacher un peu) */}
              <div className="absolute top-0 left-0 w-full h-[10%] bg-gradient-to-b from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-[10%] bg-gradient-to-t from-black to-transparent"></div>
            </div>
          </div>

          {/* Bouton Mobile/Tablet */}
        </div>
      </section>

      {/* === Section piste avec texte === */}
      <section className="w-full relative mb-20">
        <Image
          src="/Jesko/JeskoDesign.webp"
          alt="Koenigsegg Jesko Attack vue de côté"
          width={1920}
          height={600}
          className="w-full h-[500px] sm:h-[600px] md:h-[700px] object-cover"
          priority
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
            L’ingénierie devenue art
          </h2>

          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
            Conçue pour dompter l’air, la Jesko Attack incarne la symbiose
            parfaite entre science et esthétique. Chaque courbe, chaque arête,
            chaque aileron traduit la recherche obsessionnelle de performance
            pure. Son design brutal et précis ne cherche pas la beauté — il la
            crée, à travers la vitesse et l’aérodynamisme.
          </p>
        </div>
      </section>

      {/* === Section Packs circuit === */}
      <section className="flex flex-col items-center mb-20 px-4">
        <h2 className="text-center text-white text-xl sm:text-2xl md:text-3xl font-bold mx-auto mb-10 mt-6">
          Transmission de la vitesse Lumière{" "}
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 w-full max-w-4xl">
          <div
            className="relative cursor-pointer w-full sm:w-1/2 hover:scale-105 transition-transform duration-300"
            onClick={() => setOpenPack1(true)}
          >
            <Image
              src="/Jesko/JeskoTransmi.png"
              alt="Koenigsegg Jesko Attack Transmission"
              width={1920}
              height={1080}
              className="w-full h-[180px] sm:h-[250px] md:h-[350px] object-cover rounded-lg"
              priority
            />
            {/* Overlay texte + bouton */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex flex-col items-start p-2 sm:p-3 rounded">
              <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                Transmission révolutionnaire{" "}
              </h3>
              <button className="bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-700 transition text-sm sm:text-base">
                Découvrir
              </button>
            </div>
          </div>

          {/* Image 2 - Pack Clubsport */}
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
                  src="/Jesko/JeskoTransmi2.png"
                  alt="Koenigsegg Jesko Attack Transmission"
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Texte en dessous */}
              <div className="w-full max-w-[90vw] sm:max-w-[80vw] bg-white p-4 sm:p-6 rounded-b-lg mt-0 t">
                <h3 className="text-black text-lg sm:text-xl md:text-2xl font-bold mb-2">
                  La perfection réside dans les détails{" "}
                </h3>
                <p className="text-black text-sm sm:text-base md:text-lg">
                  La transmission à vitesse lumineuse (LST) de Koenigsegg
                  représente une évolution jamais vue depuis le développement
                  des doubles embrayages modernes. Le LST se compose de neuf
                  vitesses avant et de sept embrayages multidisques à bain
                  d’huile dans un ensemble compact et ultra-léger. Il peut
                  monter et descendre les vitesses à une vitesse proche de celle
                  de la lumière grâce à l’ouverture et la fermeture simultanées
                  des embrayages, offrant une accélération et une décélération
                  totalement fluides. Le LST permet des changements de vitesse
                  pratiquement instantanés entre n’importe quelle vitesse avant,
                  transformant l’impressionnant en véritable innovation
                  évolutive.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modale Image 2 */}
      </section>
      <section className="max-w-4xl mx-auto px-4 mt-[220px] mb-[220px]">
        <h2 className="text-center text-white text-3xl font-bold mb-10">
          Consommation et Émissions - Koenigsegg Jesko Attack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-white/50 uppercase tracking-wide mb-2">
              Consommation combinée
            </p>
            <p className="text-white text-xl sm:text-2xl font-bold">
              18,1 L/100km
            </p>
          </div>

          <div>
            <p className="text-white/50 uppercase tracking-wide mb-2">
              Consommation en ville
            </p>
            <p className="text-white text-xl sm:text-2xl font-bold">
              34,3 L/100km
            </p>
          </div>

          <div>
            <p className="text-white/50 uppercase tracking-wide mb-2">
              Émissions CO₂
            </p>
            <p className="text-white text-xl sm:text-2xl font-bold">410 g/km</p>
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
          src="/Jesko/JeskoExhaust.webp"
          alt="Koenigsegg Jesko Attack échappement"
          fill
          className="object-cover"
          priority
        />

        {/* Dégradé noir en haut */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>

        {/* Texte responsive */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full px-4 top-4 sm:top-6 md:top-8 lg:top-10 text-center lg:max-w-3xl lg:mx-auto">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-2 lg:mb-4">
            La symphonie sauvage du V8 biturbo
          </h2>

          <p className="text-white text-sm sm:text-base md:text-lg lg:text-2xl font-semibold">
            Le rugissement de la Jesko Attack ne se contente pas d’être entendu
            — il se ressent.
            <br className="hidden lg:block" />
            Chaque accélération libère une onde de puissance pure, signature
            d’une mécanique sans compromis.
          </p>
        </div>

        {/* Bouton toujours en bas */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-4">
          <JeskoButton className="w-full sm:w-3/4 md:w-2/4 lg:w-auto" />
        </div>
      </section>

      <Footer />
    </>
  );
}
