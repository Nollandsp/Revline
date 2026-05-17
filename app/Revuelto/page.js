"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import RevueltoButton from "@/components/ui/buttonRevuelto";
import Link from "next/link";

const product = {
  price: "À partir de 500 000 €",
  images: [
    { src: "/Revuelto/Revueltofront.jpg", alt: "Lamborghini Revuelto vue de face" },
    { src: "/Revuelto/Side.jpg", alt: "Lamborghini Revuelto vue de côté" },
    { src: "/Revuelto/Top.jpg", alt: "Lamborghini Revuelto vue du dessus" },
    { src: "/Revuelto/Back.jpg", alt: "Lamborghini Revuelto vue arrière" },
    { src: "/Revuelto/inside.jpg", alt: "Lamborghini Revuelto intérieur" },
    { src: "/Revuelto/Inside2.jpg", alt: "Lamborghini Revuelto intérieur 2" },
  ],
  description:
    "La Lamborghini Revuelto est une supercar hybride V12 radicale, combinant un moteur atmosphérique de 6,5 L avec trois moteurs électriques pour une puissance totale de 1 001 ch. Conçue pour offrir des performances extrêmes sur piste tout en restant utilisable sur route, elle propose un design futuriste, un châssis en fibre de carbone et des technologies de pointe.",
  highlights: [
    "Moteur V12 atmosphérique 6,5 L combiné à 3 moteurs électriques – 1 001 ch",
    "Transmission double embrayage 8 rapports avec vectorisation du couple",
    "Châssis en fibre de carbone ultra rigide pour performance optimale",
    "Suspension double triangulation avec amortisseurs adaptatifs",
    "Aérodynamique avancée avec aileron arrière actif et extracteurs d'air",
    "Cockpit orienté conducteur avec tableau de bord numérique et écran passager",
  ],
  details:
    "La Lamborghini Revuelto combine un moteur V12 atmosphérique à haut régime et un système hybride à trois moteurs électriques, offrant à la fois puissance, réactivité et efficacité. Son châssis en fibre de carbone, ses suspensions adaptatives et son aérodynamisme actif assurent des performances exceptionnelles sur circuit comme sur route.",
};

function StatNumber({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    let current = 0;
    const increment = value / steps;
    const timer = setInterval(() => {
      current += 1;
      setCount((prev) => Math.min(prev + increment, value));
      if (current >= steps) clearInterval(timer);
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {isDecimal ? count.toFixed(1) : Math.round(count)}
      {suffix}
    </span>
  );
}

export default function Revuelto() {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openPack1, setOpenPack1] = useState(false);
  const [open, setOpen] = useState(false);

  const openLightbox = (idx) => { setPhotoIndex(idx); setIsOpen(true); };
  const closeLightbox = () => setIsOpen(false);
  const prevImage = () => setPhotoIndex((photoIndex - 1 + product.images.length) % product.images.length);
  const nextImage = () => setPhotoIndex((photoIndex + 1) % product.images.length);

  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-6 pt-28 sm:pt-36 lg:pt-44 pb-10 sm:pb-14">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <Link href="/Showroom" className="text-white/30 hover:text-white text-[11px] tracking-[0.3em] uppercase font-body transition-colors duration-300">
            ← Showroom
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-5">
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">Hybride V12</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-none text-white uppercase mb-5">
              Lamborghini Revuelto
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-white/50 text-sm sm:text-base max-w-sm font-body leading-relaxed">
              L&apos;icône V12 rencontre l&apos;électrification — 1 001 ch qui redéfinissent les limites de la supercar hybride.
            </motion.p>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <Image src="/Revuelto/Revueltologo.svg" alt="Lamborghini" width={500} height={300} priority className="object-contain w-full h-auto opacity-70 max-w-xs" />
          </div>
        </div>
      </section>

      {/* ── Carousel ── */}
      <section className="px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto">
        <div className="relative w-full overflow-hidden bg-neutral-950 aspect-video sm:aspect-[16/8] md:aspect-[16/7] lg:aspect-[16/6]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div key={photoIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => openLightbox(photoIndex)}>
              <Image src={product.images[photoIndex].src} alt={product.images[photoIndex].alt} width={1200} height={750} priority className="max-w-full h-auto object-contain" />
            </motion.div>
          </AnimatePresence>
          <button onClick={prevImage} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl sm:text-5xl z-10 transition-colors duration-200">‹</button>
          <button onClick={nextImage} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl sm:text-5xl z-10 transition-colors duration-200">›</button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product.images.map((_, idx) => (
              <button key={idx} onClick={() => setPhotoIndex(idx)} className={`transition-all duration-300 h-[2px] ${idx === photoIndex ? "w-6 bg-red-500" : "w-2 bg-white/30"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Thumbnails ── */}
      <section className="max-w-7xl mx-auto px-4 pt-3 pb-2">
        <div className="flex flex-nowrap gap-2 sm:gap-3 overflow-x-auto">
          {product.images.slice(1).map((item, idx) => (
            <div key={idx + 1} onClick={() => openLightbox(idx + 1)} className="relative overflow-hidden cursor-pointer flex-shrink-0 border border-white/8 hover:border-red-600/40 transition-colors duration-300 w-[120px] h-[78px] sm:w-[150px] sm:h-[98px] md:w-[180px] md:h-[118px]">
              <Image src={item.src} alt={item.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 200px" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={closeLightbox} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-red-600 text-xl transition-all duration-200 z-10">×</button>
            <motion.div key={photoIndex} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }} className="relative w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 aspect-video">
              <Image src={product.images[photoIndex].src} alt={product.images[photoIndex].alt} fill className="object-contain" />
            </motion.div>
            <button onClick={prevImage} className="absolute left-4 text-white/50 hover:text-white text-5xl md:text-6xl transition-colors duration-200">‹</button>
            <button onClick={nextImage} className="absolute right-4 text-white/50 hover:text-white text-5xl md:text-6xl transition-colors duration-200">›</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Info section ── */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-10 lg:grid lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2 lg:border-r lg:border-white/8 lg:pr-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-5">
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">Description</span>
            </div>
            <p className="text-white/55 text-sm sm:text-base font-body leading-relaxed mb-10">{product.description}</p>
            <div className="flex items-center gap-4 mb-5">
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">Points forts</span>
            </div>
            <ul className="space-y-3 mb-10">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-white/55 text-sm font-body">
                  <span className="text-red-600 mt-0.5 shrink-0">—</span>{h}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mb-5">
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">Détails</span>
            </div>
            <p className="text-white/55 text-sm sm:text-base font-body leading-relaxed">{product.details}</p>
          </motion.div>
        </div>
        <div className="mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-28">
            <p className="font-display text-[clamp(1.2rem,2.5vw,2rem)] text-white uppercase leading-none mb-1">{product.price}</p>
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-body mb-8">Prix indicatif</p>
            <Link href="/Profil">
              <button type="button" className="w-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300 cursor-pointer font-body">
                S&apos;abonner à la newsletter
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="lg:flex lg:gap-12 lg:items-stretch">
          <div className="lg:w-1/2 space-y-0 mb-10 lg:mb-0">
            {[
              { value: 2.5, suffix: " s", label: "0 → 100 km/h" },
              { value: 1015, suffix: " ch", label: "Puissance combinée" },
              { value: 350, suffix: " km/h", label: "Vitesse maximale" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-5 py-6 border-b border-white/5">
                <p className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-white">
                  <StatNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/35 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-body">{stat.label}</p>
              </div>
            ))}
            <button onClick={() => setOpen(true)} className="mt-6 text-white/55 hover:text-white text-[11px] font-semibold tracking-[0.3em] uppercase px-6 py-3 border border-white/12 hover:border-white/35 hover:bg-white/4 transition-all duration-300 cursor-pointer font-body">
              Fiche technique →
            </button>
          </div>
          <div className="relative lg:w-1/2 overflow-hidden h-[260px] sm:h-[320px] md:h-[380px]">
            <Image src="/Revuelto/Revueltostats.jpg" alt="Lamborghini Revuelto" fill className="object-cover" />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-[20%] h-full bg-gradient-to-r from-black to-transparent" />
              <div className="absolute top-0 right-0 w-[20%] h-full bg-gradient-to-l from-black to-transparent" />
              <div className="absolute top-0 left-0 w-full h-[15%] bg-gradient-to-b from-black to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-t from-black to-transparent" />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <>
              <motion.div className="fixed inset-0 bg-black/60 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
              <motion.div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-neutral-950 border-l border-white/10 z-50 flex flex-col" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.35 }}>
                <div className="flex items-start justify-between p-6 border-b border-red-600/25">
                  <div>
                    <p className="text-white/35 text-[10px] tracking-[0.35em] uppercase font-body mb-1">Lamborghini Revuelto</p>
                    <h2 className="font-display text-2xl sm:text-3xl text-white uppercase">Caractéristiques</h2>
                  </div>
                  <button onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white border border-white/15 hover:border-red-600 text-xl transition-all duration-200">×</button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                  <div className="w-full flex justify-center mb-8">
                    <Image src="/Revuelto/Revueltocarac.png" alt="Lamborghini Revuelto profil" width={400} height={250} className="object-contain w-full max-w-xs" />
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-white/5">
                    {[
                      { label: "Hauteur", value: "1 160 mm" },
                      { label: "Longueur", value: "4 947 mm" },
                      { label: "Empattement", value: "2 779 mm" },
                      { label: "Largeur", value: "2 266 mm" },
                    ].map((item) => (
                      <div key={item.label} className="bg-neutral-950 p-5 text-center">
                        <p className="font-display text-xl text-white mb-1">{item.label}</p>
                        <p className="text-white/45 text-sm font-body">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* ── Design section ── */}
      <div className="divider-red mx-6 max-w-7xl md:mx-auto" />
      <section className="w-full relative">
        <Image src="/Revuelto/Revueltoaero.jpg" alt="Lamborghini Revuelto aérodynamisme" width={1920} height={600} className="w-full h-[480px] sm:h-[580px] md:h-[680px] object-cover" priority />
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none" />
        <div className="absolute bottom-8 sm:bottom-14 md:bottom-20 left-0 w-full px-6">
          <div className="max-w-7xl mx-auto">
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body block mb-3">Aérodynamisme</span>
            <h2 className="font-display text-[clamp(1.8rem,4vw,4rem)] leading-none text-white uppercase mb-4">Lignes sculptées pour la performance</h2>
            <p className="text-white/50 text-sm sm:text-base max-w-lg font-body leading-relaxed">Stratégie aérodynamique innovante alliant efficacité, synergie des composants et refroidissement optimisé dès la conception.</p>
          </div>
        </div>
      </section>

      {/* ── Packs ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <div className="flex items-center gap-4 mb-10">
          <span className="w-8 h-[1px] bg-red-600" />
          <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">Le cœur hybride</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative cursor-pointer overflow-hidden group" onClick={() => setOpenPack1(true)}>
            <Image src="/Revuelto/Revueltotrack.webp" alt="Lamborghini Revuelto sur circuit" width={1920} height={1080} className="w-full h-[200px] sm:h-[280px] md:h-[340px] object-cover transition-transform duration-700 group-hover:scale-[1.04]" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-red-600/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6">
              <h3 className="font-display text-[clamp(1.2rem,2.5vw,1.8rem)] text-white uppercase leading-none mb-3">L&apos;alliance V12 & hybride</h3>
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-red-400 font-body group-hover:translate-x-1 transition-transform duration-300 inline-block">Découvrir →</span>
            </div>
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-red-600 transition-all duration-500" />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openPack1 && (
          <motion.div className="fixed inset-0 bg-black/95 flex flex-col justify-center items-center z-50 px-4 py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => setOpenPack1(false)} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-red-600 text-xl transition-all duration-200 z-50">×</button>
            <motion.div key="pack1" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }} className="w-full max-w-[90vw] sm:max-w-[80vw] overflow-hidden h-[30vh] sm:h-[40vh] md:h-[55vh]">
              <Image src="/Revuelto/Revueltoengine.png" alt="Revuelto engine" width={1200} height={600} className="w-full h-full object-cover" />
            </motion.div>
            <div className="w-full max-w-[90vw] sm:max-w-[80vw] bg-neutral-900 border-t border-red-600/25 p-5 sm:p-8">
              <h3 className="font-display text-xl sm:text-2xl text-white uppercase mb-3">Moteur</h3>
              <p className="text-white/55 text-sm sm:text-base font-body leading-relaxed">
                La Revuelto réécrit entièrement le paradigme Lamborghini — le V12 a été pivoté de 180° et optimisé pour coexister avec trois moteurs électriques. Nouveau système de combustion, d&apos;échappement réduit la contre-pression à haut régime et d&apos;admission améliorée. Le nouveau V12 développe 825 ch, pour une puissance totale de 1 001 ch.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Consumption ── */}
      <div className="divider-red mx-6 max-w-7xl md:mx-auto" />
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-[1px] bg-red-600" />
          <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">Consommation & Émissions</span>
        </div>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3.5rem)] text-white uppercase leading-none mb-10">Lamborghini Revuelto</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5">
          {[
            { label: "Consommation", value: "26,5 kWh/100km" },
            { label: "Consommation énergie", value: "17,9 L/100km" },
            { label: "Émissions CO₂", value: "350 g/km" },
            { label: "Classe énergétique", value: "G" },
          ].map((item) => (
            <div key={item.label} className="bg-black p-5 sm:p-7">
              <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-body mb-3">{item.label}</p>
              <p className="font-display text-[clamp(1rem,2vw,1.6rem)] text-white uppercase">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Exhaust section ── */}
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[580px]">
        <Image src="/Revuelto/Revueltoexhaust.jpg" alt="Lamborghini Revuelto" fill className="object-cover" priority />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        <div className="absolute top-8 sm:top-12 left-0 w-full px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-display text-[clamp(1.8rem,4vw,4rem)] text-white uppercase leading-none mb-3">Feel the V12 Engine</h2>
            <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto font-body">1 015 chevaux orchestrés par un V12 atmosphérique et trois moteurs électriques — la Revuelto réinvente la supercar.</p>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-6 flex justify-center">
          <RevueltoButton />
        </div>
      </section>

      <Footer />
    </>
  );
}
