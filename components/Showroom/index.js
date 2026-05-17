"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cars = [
  {
    name: "Ferrari SF90 XX Stradale",
    image: "/SF90XX/SF90.jpg",
    brand: "Ferrari",
    power: "1 015 ch",
    price: "700 000 €",
    slug: "/SF90XX",
  },
  {
    name: "Lamborghini Revuelto",
    image: "/Revuelto/Revueltofront.jpg",
    brand: "Lamborghini",
    power: "1 015 ch",
    price: "500 000 €",
    slug: "/Revuelto",
  },
  {
    name: "Bugatti Tourbillon",
    image: "/Bugatti/BugattiFront.jpg",
    brand: "Bugatti",
    power: "1 800 ch",
    price: "3,8 M €",
    slug: "/Tourbillon",
  },
  {
    name: "718 Cayman GT4 RS",
    image: "/GT4RS/GT4RS.webp",
    brand: "Porsche",
    power: "500 ch",
    price: "162 500 €",
    slug: "/GT4RS",
  },
  {
    name: "Aston Martin Valhalla",
    image: "/Valhalla/AstonFront.jpeg",
    brand: "Aston Martin",
    power: "1 064 ch",
    price: "950 000 €",
    slug: "/Valhalla",
  },
];

export default function ShowroomPreview() {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 380, behavior: "smooth" });
    }
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 sm:mb-12">
        <div className="flex items-end justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-3"
            >
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase">
                Notre sélection
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[clamp(2rem,5.5vw,5rem)] leading-none text-white uppercase"
            >
              Catalogue
            </motion.h2>
          </div>

          {/* Arrow navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-2"
          >
            <button
              onClick={() => scrollBy(-1)}
              className="w-11 h-11 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-red-500/50 transition-all duration-300 cursor-pointer"
              aria-label="Précédent"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-11 h-11 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-red-500/50 transition-all duration-300 cursor-pointer"
              aria-label="Suivant"
            >
              <ChevronRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-6 max-w-7xl mx-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cars.map((car, idx) => (
          <motion.div
            key={car.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: idx * 0.07 }}
            className="min-w-[78vw] sm:min-w-[300px] md:min-w-[360px] snap-start flex-shrink-0"
          >
            <Link href={car.slug}>
              <div className="group relative overflow-hidden bg-neutral-950 border border-white/5 cursor-pointer transition-all duration-500 hover:border-red-600/30 hover:shadow-[0_0_0_1px_rgba(220,38,38,0.12),0_24px_64px_rgba(0,0,0,0.8),0_0_40px_rgba(220,38,38,0.07)]">
                {/* Number badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="font-display text-5xl text-white/8 leading-none select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                  {/* Brand badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-red-400 bg-black/70 px-2.5 py-1">
                      {car.brand}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h4 className="text-white font-semibold text-sm md:text-base leading-snug mb-1 font-heading">
                    {car.name}
                  </h4>
                  <p className="text-white/30 text-xs mb-4 font-body">{car.power}</p>

                  <div className="flex items-center justify-between">
                    <p className="text-white/50 text-xs font-body">
                      À partir de{" "}
                      <span className="text-white/80 font-semibold">{car.price}</span>
                    </p>
                    <span className="text-red-500 text-[10px] font-bold tracking-widest uppercase group-hover:translate-x-1.5 transition-transform duration-300">
                      Voir →
                    </span>
                  </div>
                </div>

                {/* Bottom red accent line — reveals on hover */}
                <div className="h-[1px] w-0 group-hover:w-full bg-red-600 transition-all duration-500" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View all */}
      <div className="flex justify-center mt-14">
        <Link href="/Showroom">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group border border-white/12 text-white/60 hover:text-white hover:border-red-600/40 hover:bg-red-600/6 text-[11px] font-semibold tracking-[0.25em] uppercase px-12 py-4 transition-all duration-300 cursor-pointer"
          >
            Voir tout le Showroom
            <span className="ml-3 group-hover:ml-5 transition-all duration-300">→</span>
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
