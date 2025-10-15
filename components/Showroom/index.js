"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const cars = [
  {
    name: "Ferrari SF90 XX Stradale",
    image: "/SF90XX/SF90.jpg",
    brand: "Ferrari",
    power: "1015 ch",
    price: "À partir de 700 000 €",
    slug: "/SF90XX",
  },
  {
    name: "Lamborghini Revuelto",
    image: "/Revuelto/Revueltofront.jpg",
    brand: "Lamborghini",
    power: "1015 ch",
    price: "À partir de 500 000 €",
    slug: "/Revuelto", // 👈 page de détail
  },
  {
    name: "Bugatti Tourbillon",
    image: "/Bugatti/BugattiFront.jpg",
    brand: "Bugatti",
    power: "1 800 ch",
    price: "À partir de 3,8 M €",
    slug: "/Tourbillon", // 👈 page de détail
  },
  {
    name: "718 Cayman GT4 RS",
    image: "/GT4RS/GT4RS.webp",
    brand: "Porsche",
    power: "500 ch",
    price: "À partir de 162 500 €",
    slug: "/GT4RS", // 👈 page de détail
  },
  {
    name: "Aston Martin Valhalla",
    image: "/Valhalla/AstonFront.jpeg",
    brand: "Aston Martin",
    power: "1064 ch",
    price: "À partir de 950 000 €",
    slug: "/Valhalla", // 👈 page de détail
  },
];

export default function Showroom() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hue, setHue] = useState(0);
  const [grayscale, setGrayscale] = useState(false);

  const activeCar = useMemo(() => cars[activeIdx], [activeIdx]);

  return (
    <section id="catalogue" className="max-w-7xl mx-auto px-6 pb-20 mt-20">
      <div className="flex flex-col [@media(min-width:310px)]:flex-row items-baseline justify-between mb-7 gap-1">
        <h3 className="text-2xl font-bold text-white">Catalogue</h3>
        <p className="text-sm text-white/60">Balayez pour parcourir</p>
      </div>

      <div
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollbarWidth: "none" }}
      >
        {cars.map((car, idx) => (
          <motion.div
            key={car.name}
            className="min-w-[240px] sm:min-w-[280px] md:min-w-[340px] snap-start"
            onMouseEnter={() => setActiveIdx(idx)}
            onFocus={() => setActiveIdx(idx)}
          >
            <Card className="overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 border-white/10 rounded-3xl p-0">
              <div className="relative">
                <Image
                  src={car.image}
                  alt={car.name}
                  width={1600}
                  height={900}
                  className="w-full h-56 md:h-64 object-cover rounded-t-3xl transition-transform duration-300 hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/70">{car.brand}</p>
                    <h4 className="text-lg font-semibold text-white">
                      {car.name}
                    </h4>
                  </div>
                  <Link href={car.slug}>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 ">
                      Détails
                    </Button>
                  </Link>
                </div>
              </div>
              <CardContent className="p-4 text-sm text-white/70">
                {car.power} • {car.price}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-center ">
        <Link href="/Showroom">
          <Button
            className=" font-bold px-5 border border-white text-white bg-transparent hover:bg-red-600 hover:text-white transition-colors duration-300"
            variant="outline"
          >
            Découvrir le Showroom
          </Button>
        </Link>
      </div>
    </section>
  );
}
