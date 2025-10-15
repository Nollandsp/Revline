"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const cars = [
  {
    name: "Porsche ",
    image: "/GT3RS/GT3RS.webp",
    brand: "Porsche 911 GT3 RS",
    power: "525 ch",
    price: "À partir de 253 452,00 €",
  },
];

export default function Favoris() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hue, setHue] = useState(0);
  const [grayscale, setGrayscale] = useState(false);

  const activeCar = useMemo(() => cars[activeIdx], [activeIdx]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-4xl mx-auto p-4 mt-10"
    >
      {/* Gradient background décoratif */}
      <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-red-600/30 to-white/10 blur-2xl" />
      <h1 className=" text-white mb-7 text-xl font-bold">
        Notre favorite du moment
      </h1>
      {/* Image de la voiture */}
      <div className="rounded-[28px] overflow-hidden shadow-2xl shadow-red-900/20 ring-1 ring-white/10">
        <Image
          src={activeCar.image}
          alt={activeCar.name}
          width={1600}
          height={900}
          priority
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover transition-all duration-500"
          style={{
            filter: `${
              grayscale ? "grayscale(1) " : ""
            }hue-rotate(${hue}deg) saturate(1.15)`,
          }}
        />
      </div>

      {/* Informations voiture et bouton */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
            {activeCar.name}
          </h3>
          <p className="text-white text-sm sm:text-base">
            {activeCar.brand} • {activeCar.power} • {activeCar.price}
          </p>
        </div>
        <Link href="/GT3RS">
          <Button
            variant="outline"
            className="font-bold px-5 border border-white text-white bg-transparent hover:bg-red-600 hover:text-white transition-colors duration-300 "
          >
            Voir le véhicule
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
