"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "7", label: "Supercars" },
  { value: "4", label: "Marques" },
  { value: "1800+", label: "Ch max" },
  { value: "445", label: "Km/h top" },
];

const pillars = [
  {
    number: "01",
    title: "Notre Mission",
    body: "Tenir les passionnés de supercars informés dès qu'un nouveau modèle est annoncé — données précises, mises à jour en temps réel.",
  },
  {
    number: "02",
    title: "Notre Expertise",
    body: "Documentation complète sur les moteurs, performances, design et éditions limitées de chaque supercar du marché.",
  },
  {
    number: "03",
    title: "Newsletter",
    body: "Recevez les dernières sorties directement dans votre boîte mail. Ne manquez aucune annonce.",
  },
];

const howItems = [
  {
    src: "/Senna.jpg",
    alt: "Recherche rapide",
    title: "Recherche rapide",
    body: "Accédez instantanément aux fiches techniques des dernières supercars.",
  },
  {
    src: "/Bugatti/Bugatti.jpg",
    alt: "Mises à jour en temps réel",
    title: "En temps réel",
    body: "Chaque sortie ou nouveauté est ajoutée sans délai pour vous garder à la pointe.",
  },
  {
    src: "/Intro.jpg",
    alt: "Newsletter supercar",
    title: "Newsletter exclusive",
    body: "Abonnez-vous et recevez les infos et sorties directement par email.",
    linkHref: "/Profil",
    linkLabel: "S'abonner ici →",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Naissance de Revline",
    body: "Un projet né d'une passion commune pour les supercars les plus exclusives. Revline voit le jour avec pour objectif de centraliser toute l'information sur les modèles les plus extraordinaires du marché.",
  },
  {
    year: "2024",
    title: "Premier showroom",
    body: "Lancement du showroom virtuel avec les premières fiches techniques détaillées — Ferrari SF90 XX, Lamborghini Revuelto, Bugatti Tourbillon.",
  },
  {
    year: "2025",
    title: "Expansion du catalogue",
    body: "Intégration de nouveaux modèles d'exception : Porsche 911 GT3 RS, Aston Martin Valhalla, Koenigsegg Jesko, Porsche GT4RS.",
  },
];

function PillarCard({ number, title, body, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.12 }}
      className="group relative bg-neutral-950 border border-white/5 hover:border-red-600/20 p-8 transition-all duration-500 overflow-hidden"
    >
      <span
        className="absolute -top-2 -right-1 font-display text-[6rem] leading-none text-white/[0.03] group-hover:text-red-600/[0.06] transition-colors duration-500 select-none"
        aria-hidden="true"
      >
        {number}
      </span>
      <div className="w-8 h-[1px] bg-red-600 mb-6" />
      <h3 className="text-white font-bold text-lg mb-3 font-heading">{title}</h3>
      <p className="text-white/35 text-sm leading-relaxed font-body">{body}</p>
    </motion.div>
  );
}

function ParallaxBanner({ src, alt, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative w-full h-[420px] sm:h-[520px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />
      {children}
    </div>
  );
}

export default function About() {
  return (
    <>
      <Header />

      <main className="overflow-hidden">

        {/* ── Hero ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          <div className="lg:w-1/2 space-y-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">
                Qui sommes-nous
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display leading-none text-white uppercase"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              Tout savoir sur
              <br />
              <span className="text-red-500">les supercars</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/40 text-base leading-relaxed max-w-[480px] font-body"
            >
              Revline est une plateforme dédiée aux passionnés de supercars d'exception.
              Données précises, mises à jour en temps réel, et un showroom virtuel
              qui regroupe les modèles les plus extraordinaires de la planète.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/Showroom2">
                <button className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300 cursor-pointer font-body">
                  Explorer le Showroom →
                </button>
              </Link>
              <Link href="/Contact">
                <button className="border border-white/15 hover:border-white/40 text-white/60 hover:text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300 cursor-pointer font-body">
                  Nous contacter
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative overflow-hidden border border-white/5 group">
              <Image
                src="/mclaren.jpg"
                alt="Supercar sur circuit"
                width={680}
                height={460}
                className="w-full object-cover h-[280px] sm:h-[380px] lg:h-[420px] transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* ── Stats strip ── */}
        <div className="border-y border-white/6 bg-neutral-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/6">
              {stats.map(({ value, label }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="py-8 sm:py-10 px-6 sm:px-10 text-center"
                >
                  <p className="font-display text-white uppercase leading-none mb-1" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                    {value}
                  </p>
                  <p className="text-white/30 text-xs tracking-[0.25em] uppercase">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Story ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden border border-white/5 group h-[300px] sm:h-[400px] lg:h-[500px]">
              <Image
                src="/Senna.jpg"
                alt="McLaren Senna"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-[1px] bg-red-600" />
                <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase">Notre histoire</span>
              </div>
              <h2 className="font-display text-white uppercase leading-none" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                Une passion,
                <br />une plateforme
              </h2>
            </div>

            <div className="space-y-5 text-white/45 text-sm leading-relaxed font-body">
              <p>
                Revline est né d'un constat simple : les passionnés de supercars manquaient d'un endroit unique, précis et visuellement à la hauteur de leur passion.
              </p>
              <p>
                Chaque fiche, chaque donnée technique, chaque photo a été sélectionnée avec soin pour offrir une expérience digne des machines présentées — des hypercars à plus d'un million d'euros documentées au millimètre près.
              </p>
              <p>
                De la Ferrari SF90 XX à la Bugatti Tourbillon, en passant par la Koenigsegg Jesko ou la Porsche 911 GT3 RS, Revline couvre l'ensemble du spectre de la performance automobile extrême.
              </p>
            </div>

            <div className="h-px bg-white/6" />

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Données vérifiées", desc: "Chaque chiffre est issu des constructeurs officiels" },
                { label: "Mise à jour continue", desc: "Le catalogue s'enrichit à chaque nouvelle annonce" },
              ].map(({ label, desc }) => (
                <div key={label}>
                  <div className="w-5 h-[1px] bg-red-600 mb-3" />
                  <p className="text-white text-sm font-semibold mb-1 font-heading">{label}</p>
                  <p className="text-white/30 text-xs leading-relaxed font-body">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Timeline ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
          <div className="mb-10 sm:mb-14">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase">Chronologie</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-white uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Notre parcours
            </motion.h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-px bg-white/6" />

            <div className="space-y-10 sm:space-y-0">
              {timeline.map(({ year, title, body }, idx) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-0 sm:mb-14 ${idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <div className="absolute left-[15px] sm:left-1/2 sm:-translate-x-1/2 top-1 sm:top-auto w-2 h-2 bg-red-600 z-10" />

                  {/* Content */}
                  <div className={`pl-12 sm:pl-0 sm:w-[calc(50%-2rem)] ${idx % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                    <span className="font-display text-red-500 text-3xl">{year}</span>
                    <h3 className="text-white font-bold text-base mt-1 mb-2 font-heading">{title}</h3>
                    <p className="text-white/35 text-sm leading-relaxed font-body">{body}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cinematic banner ── */}
        <ParallaxBanner src="/Intro.jpg" alt="Revline showroom">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-4"
            >
              Notre vision
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-white uppercase leading-none max-w-4xl"
              style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
            >
              La performance
              <br />
              <span className="text-red-500">sans compromis</span>
            </motion.h2>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
        </ParallaxBanner>

        {/* ── Pillars ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="mb-10 sm:mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">
                Ce qui nous définit
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-white uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              Nos valeurs
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {pillars.map((p, idx) => (
              <PillarCard key={p.title} {...p} idx={idx} />
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
          <div className="mb-10 sm:mb-14 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">En pratique</span>
              <span className="w-8 h-[1px] bg-red-600" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-white uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              Comment ça fonctionne
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {howItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className="group bg-neutral-950 border border-white/5 hover:border-red-600/20 overflow-hidden transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/30 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="font-display text-3xl text-white/10 leading-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="w-6 h-[1px] bg-red-600 mb-4" />
                  <h3 className="text-white font-bold text-base mb-2 font-heading">{item.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed font-body">
                    {item.body}{" "}
                    {item.linkHref && (
                      <Link
                        href={item.linkHref}
                        className="text-red-500 hover:text-red-400 transition-colors duration-300"
                      >
                        {item.linkLabel}
                      </Link>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="relative bg-neutral-950 border-t border-white/6">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-4"
            >
              Rejoignez l'élite
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-white uppercase leading-none mb-6"
              style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
            >
              Prêt à explorer
              <br />
              <span className="text-red-500">le showroom ?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/30 text-sm max-w-md mx-auto mb-10 font-body leading-relaxed"
            >
              Découvrez les 7 hypercars les plus exclusives au monde, documentées avec une précision extrême.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/Showroom2">
                <button className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300 cursor-pointer font-body">
                  Accéder au Showroom →
                </button>
              </Link>
              <Link href="/Contact">
                <button className="border border-white/15 hover:border-white/40 text-white/50 hover:text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300 cursor-pointer font-body">
                  Nous contacter
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
