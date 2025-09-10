"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Intro() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
  }, []);

  return (
    <section className="relative w-full h-[650px] md:h-[700px] overflow-hidden flex items-center justify-center">
      {/* Image */}
      <Image
        src="/Intro.jpg"
        alt="Logo OnlyPrem"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay foncé qui disparaît */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-out ${
          loaded ? "opacity-40" : "opacity-70"
        }`}
      />

      {/* Contenu au-dessus */}
      <div className="relative z-20 text-center px-6 mt-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-6xl font-extrabold leading-tight text-white"
        >
          Le showroom{" "}
          <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]">
            premium
          </span>
          <br /> pour supercars
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 text-white/70 max-w-xl mx-auto"
        >
          Explorez notre sélection de voitures de sport d'exception avec un
          rendu immersif. Réservez un essai, configurez vos couleurs et
          découvrez les performances en un clin d'œil.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Button
            className="font-bold px-5 border border-white text-white bg-transparent hover:bg-red-600 hover:text-white transition-colors duration-300 "
            variant="outline"
          >
            Découvrir le catalogue
          </Button>

          <Button
            variant="outline"
            className="font-bold px-5 border border-white text-white bg-transparent hover:bg-red-600 hover:text-white transition-colors duration-300 "
          >
            Prendre rendez-vous
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
