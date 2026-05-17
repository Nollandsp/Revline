"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    num: "01",
    title: "Données officielles",
    body: "Chaque chiffre — puissance, accélération, vitesse de pointe — provient directement des constructeurs. Aucune approximation, uniquement des données vérifiées à la source.",
    tag: "Fiabilité",
  },
  {
    num: "02",
    title: "Fiches techniques complètes",
    body: "Moteur, transmission, châssis, dimensions, aérodynamique, packs disponibles. Des fiches exhaustives qui ne laissent aucune question sans réponse.",
    tag: "Exhaustivité",
  },
  {
    num: "03",
    title: "Mis à jour en temps réel",
    body: "Chaque annonce officielle d'un constructeur est intégrée sans délai. Nouvelles versions, éditions limitées, révisions de prix — vous êtes toujours à la pointe.",
    tag: "Actualité",
  },
  {
    num: "04",
    title: "Showroom virtuel exclusif",
    body: "Sept hypercars d'exception réunies en un seul endroit. Une expérience visuelle et technique à la hauteur de ces machines hors du commun.",
    tag: "Expérience",
  },
];

export default function WhyRevline() {
  return (
    <section className="relative bg-neutral-950 border-y border-white/6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/4 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-20 lg:items-start">

          {/* Left — sticky heading */}
          <div className="mb-16 lg:mb-0 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-5"
            >
              <span className="w-8 h-[1px] bg-red-600" />
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase">
                Ce qui nous distingue
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-white uppercase leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Pourquoi
              <br />
              <span className="text-red-500">Revline</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/35 text-sm leading-relaxed mb-8 font-body max-w-xs"
            >
              Une plateforme construite par des passionnés pour des passionnés. Précision, exhaustivité et expérience visuelle au service des supercars les plus extraordinaires.
            </motion.p>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-px bg-white/6 mb-8"
            >
              {[
                { v: "7", l: "Supercars" },
                { v: "6", l: "Marques" },
                { v: "∞", l: "Passion" },
              ].map(({ v, l }) => (
                <div key={l} className="bg-neutral-950 py-4 text-center">
                  <p className="font-display text-white text-2xl leading-none">{v}</p>
                  <p className="text-white/25 text-[8px] tracking-[0.2em] uppercase mt-0.5">{l}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/Propos">
                <button className="text-white/40 hover:text-white text-[10px] font-semibold tracking-[0.3em] uppercase transition-colors duration-200 cursor-pointer flex items-center gap-2 group">
                  En savoir plus
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right — feature rows */}
          <div className="divide-y divide-white/5">
            {features.map((f, idx) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative py-8 sm:py-10 overflow-hidden"
              >
                {/* Ghost number */}
                <span
                  className="absolute -right-2 top-1/2 -translate-y-1/2 font-display text-[7rem] leading-none text-white/[0.025] group-hover:text-red-600/[0.05] transition-colors duration-500 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {f.num}
                </span>

                <div className="relative flex flex-col sm:flex-row sm:items-start sm:gap-8">
                  {/* Number + tag */}
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 mb-4 sm:mb-0 sm:w-20 shrink-0">
                    <span className="font-display text-red-500/60 text-2xl leading-none">{f.num}</span>
                    <span className="text-[8px] tracking-[0.25em] uppercase text-white/20 font-body">{f.tag}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3
                        className="font-display text-white uppercase leading-none group-hover:text-white transition-colors duration-300"
                        style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                      >
                        {f.title}
                      </h3>
                    </div>
                    <p className="text-white/35 text-sm leading-relaxed font-body max-w-lg">{f.body}</p>
                    {/* Red reveal line */}
                    <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-red-600/60 to-transparent transition-all duration-500 mt-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
