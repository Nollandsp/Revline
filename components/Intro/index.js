"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Marquee from "@/components/Marquee";

const WORDS = ["L'Excellence", "Automobile", "Redéfinie."];
const TICKER = [
  "Ferrari SF90 XX",
  "Lamborghini Revuelto",
  "Bugatti Tourbillon",
  "Porsche GT4 RS",
  "Aston Martin Valhalla",
  "Performance Pure",
  "Design Extrême",
  "Vitesse Absolue",
];

const STATS = [
  { value: "6", unit: "+", label: "Supercars" },
  { value: "1800", unit: "CH", label: "Puissance max" },
  { value: "3.8M", unit: "€", label: "Prix record" },
];

function ClipWord({ children, delay = 0 }) {
  return (
    <span className="overflow-hidden inline-block">
      <motion.span
        className="inline-block"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Intro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[700px] overflow-hidden flex flex-col">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: bgY }}>
        <Image
          src="/Intro.jpg"
          alt="Supercar Revline"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Noise grain */}
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* ── Content ── */}
      <motion.div
        className="relative z-20 flex flex-col justify-center flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 pt-20 sm:pt-24"
        style={{ y: textY }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-4 mb-5 sm:mb-7"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block h-[1px] w-8 bg-red-600 origin-left"
          />
          <span className="text-red-500 text-[10px] font-semibold tracking-[0.35em] uppercase">
            Showroom Virtuel Premium
          </span>
        </motion.div>

        {/* Headline — Bebas Neue, word-by-word clip reveal */}
        <h1 className="font-display text-[clamp(2.5rem,9vw,9rem)] leading-[0.92] text-white uppercase mb-5 sm:mb-8 flex flex-col gap-0.5">
          {WORDS.map((word, i) => (
            <ClipWord key={word} delay={0.35 + i * 0.12}>
              {i === 1 ? (
                <span className="text-red-500" style={{ textShadow: "0 0 60px rgba(220,38,38,0.4)" }}>
                  {word}
                </span>
              ) : word}
            </ClipWord>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="text-white/45 text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md leading-relaxed mb-8 sm:mb-10 font-body"
        >
          Explorez les supercars les plus exclusives au monde — performances,
          design et technologie réunis en un seul endroit.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="flex flex-wrap items-center gap-3 sm:gap-5"
        >
          <Link href="/Showroom">
            <button className="relative overflow-hidden bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-6 sm:px-9 py-3.5 sm:py-4 transition-all duration-300 cursor-pointer group">
              <span className="relative z-10">Explorer le Showroom</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </Link>
          <Link href="/Contact">
            <button className="text-white/60 hover:text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-6 sm:px-9 py-3.5 sm:py-4 border border-white/15 hover:border-white/40 transition-all duration-300 cursor-pointer">
              Prendre contact
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-20 border-t border-white/6"
      >
        <div className="bg-black/75 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-3 divide-x divide-white/6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center px-2 sm:px-4">
                <p className="font-display text-white text-lg sm:text-xl md:text-2xl leading-none">
                  {s.value}
                  <span className="text-red-500 text-xs sm:text-sm ml-0.5">{s.unit}</span>
                </p>
                <p className="text-white/30 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase mt-0.5 font-body">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee ticker */}
        <div className="bg-red-600/10 border-t border-red-600/20 py-2">
          <Marquee items={TICKER} speed="normal" />
        </div>
      </motion.div>
    </section>
  );
}
