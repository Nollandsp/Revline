"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const car = {
  name: "Porsche 911 GT3 RS",
  image: "/GT3RS/GT3RS.webp",
  brand: "Porsche",
  type: "Thermique",
  tagline: "La piste, sans compromis.",
  price: "253 452 €",
  slug: "/GT3RS",
  specs: [
    { label: "0 → 100 km/h", value: "3.2s" },
    { label: "Puissance", value: "525ch" },
    { label: "Vitesse max", value: "296km/h" },
  ],
};

export default function Favoris() {
  return (
    <section className="w-full py-6 sm:py-8 overflow-hidden">
      {/* Section label row */}
      <div className="max-w-7xl mx-auto px-6 mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <span className="w-8 h-[1px] bg-red-600" />
          <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase">
            Coup de cœur de la semaine
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[clamp(2rem,5.5vw,5rem)] leading-none text-white mt-3 uppercase"
        >
          Notre Favorite
        </motion.h2>
      </div>

      {/* Full-bleed card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative group"
      >
        {/* Image — taller on mobile so content fits */}
        <div className="relative w-full h-[90vw] sm:h-[60vw] max-h-[640px] min-h-[380px] overflow-hidden">
          <Image
            src={car.image}
            alt={car.name}
            fill
            priority
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

          {/* Content on image */}
          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 md:p-14 lg:p-20">
            {/* Top row — badges */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-red-400 border border-red-500/30 bg-red-600/10 px-2.5 sm:px-3 py-1">
                {car.brand}
              </span>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/35 border border-white/10 px-2.5 sm:px-3 py-1">
                {car.type}
              </span>
            </div>

            {/* Bottom block */}
            <div>
              {/* Stats row — tighter on mobile */}
              <div className="flex flex-wrap gap-5 sm:gap-8 md:gap-10 mb-4 sm:mb-6 md:mb-8">
                {car.specs.map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  >
                    <p className="font-display text-white text-[clamp(1.5rem,3.5vw,3.5rem)] leading-none">
                      {spec.value}
                    </p>
                    <p className="text-white/30 text-[8px] sm:text-[9px] tracking-[0.25em] uppercase mt-1.5">
                      {spec.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Name + tagline */}
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="font-display text-[clamp(1.6rem,4vw,4.5rem)] leading-none text-white uppercase mb-1.5 sm:mb-2"
              >
                {car.name}
              </motion.h3>
              <p className="text-white/40 text-xs sm:text-sm md:text-base mb-5 sm:mb-8 font-body">
                {car.tagline}
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                <Link href={car.slug}>
                  <button className="bg-red-600 hover:bg-red-700 text-white text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 cursor-pointer">
                    Découvrir →
                  </button>
                </Link>
                <p className="text-white/30 text-xs tracking-[0.15em] uppercase font-body">
                  À partir de <span className="text-white/60">{car.price}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Red accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
      </motion.div>
    </section>
  );
}
