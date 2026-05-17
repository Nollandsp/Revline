"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleFilter from "@/components/Filtre";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const vehicles = [
  { id: 1, name: "Ferrari SF90 XX Stradale", image: "/SF90XX/SF90.jpg", brand: "Ferrari", power: "1 015 ch", price: "700 000 €", slug: "/SF90XX" },
  { id: 2, name: "Lamborghini Revuelto", image: "/Revuelto/Revueltofront.jpg", brand: "Lamborghini", power: "1 015 ch", price: "500 000 €", slug: "/Revuelto" },
  { id: 3, name: "Bugatti Tourbillon", image: "/Bugatti/BugattiFront.jpg", brand: "Bugatti", power: "1 800 ch", price: "3 800 000 €", slug: "/Tourbillon" },
  { id: 4, name: "718 Cayman GT4 RS", image: "/GT4RS/GT4RS.webp", brand: "Porsche", power: "500 ch", price: "162 500 €", slug: "/GT4RS" },
  { id: 5, name: "Aston Martin Valhalla", image: "/Valhalla/AstonFront.jpeg", brand: "Aston Martin", power: "1 064 ch", price: "950 000 €", slug: "/Valhalla" },
  { id: 6, name: "Porsche 911 GT3 RS", image: "/GT3RS/GT3RS.webp", brand: "Porsche", power: "525 ch", price: "253 452 €", slug: "/GT3RS" },
];

const parsePrice = (price) => {
  const n = price.replace(/\s/g, "").replace(",", ".");
  return parseFloat(n.replace("€", "")) || 0;
};

export default function Showroom() {
  const [filters, setFilters] = useState({ brand: "", order: "asc" });
  const pathname = usePathname();

  const filtered = vehicles
    .filter((v) => (filters.brand ? v.brand === filters.brand : true))
    .sort((a, b) =>
      filters.order === "asc"
        ? parsePrice(a.price) - parsePrice(b.price)
        : parsePrice(b.price) - parsePrice(a.price)
    );

  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-28 sm:pt-36 lg:pt-44 pb-10 sm:pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/8 to-transparent pointer-events-none" />
        {/* Big background number — overflow clipped */}
        <div className="absolute right-0 top-20 sm:top-28 pointer-events-none select-none overflow-hidden max-w-[50vw]" aria-hidden="true">
          <span className="font-display text-[clamp(5rem,15vw,14rem)] text-white/[0.03] leading-none">
            06
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-3 sm:mb-4"
          >
            <span className="w-8 h-[1px] bg-red-600" />
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">
              Notre collection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.5rem,8vw,8rem)] leading-none text-white uppercase mb-3 sm:mb-5"
          >
            Showroom
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/35 text-sm sm:text-base max-w-sm sm:max-w-md font-body"
          >
            Supercars d&apos;exception — sélectionnées pour leur puissance, leur design et leur rareté.
          </motion.p>
        </div>
      </section>

      {/* ── Red divider ── */}
      <div className="divider-red mx-6 max-w-7xl md:mx-auto mb-8" />

      {/* ── Filter bar ── */}
      <section className="px-6 max-w-7xl mx-auto mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <VehicleFilter filters={filters} onFilter={setFilters} />
          <button
            onClick={() => setFilters({ brand: "", order: "asc" })}
            className="text-white/35 hover:text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-5 py-2.5 border border-white/8 hover:border-white/25 transition-all duration-300 cursor-pointer font-body"
          >
            Réinitialiser
          </button>
          <span className="text-white/20 text-xs ml-auto font-body">
            {filtered.length} véhicule{filtered.length > 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((car, idx) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
              >
                <Link href={car.slug}>
                  <div className="group relative overflow-hidden bg-neutral-950 border border-white/5 cursor-pointer transition-all duration-500 hover:border-red-600/30 hover:shadow-[0_0_0_1px_rgba(220,38,38,0.12),0_24px_64px_rgba(0,0,0,0.8),0_0_40px_rgba(220,38,38,0.07)]">
                    {/* Numero */}
                    <div className="absolute top-3 right-3 z-10" aria-hidden="true">
                      <span className="font-display text-4xl text-white/6 leading-none select-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative h-56 md:h-60 overflow-hidden">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Brand badge */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-red-400 bg-black/70 px-2.5 py-1">
                          {car.brand}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <h4 className="text-white font-semibold text-sm leading-snug mb-1 font-heading">
                        {car.name}
                      </h4>
                      <p className="text-white/30 text-xs mb-4 font-body">{car.power}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-white/45 text-xs font-body">
                          À partir de <span className="text-white/75 font-semibold">{car.price}</span>
                        </p>
                        <span className="text-red-500 text-[10px] font-bold tracking-widest uppercase group-hover:translate-x-1.5 transition-transform duration-300">
                          Voir →
                        </span>
                      </div>
                    </div>

                    {/* Bottom reveal line */}
                    <div className="h-[1px] w-0 group-hover:w-full bg-red-600 transition-all duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Pagination ── */}
      <section className="mb-16 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/Showroom" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/Showroom" isActive={pathname === "/Showroom"}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/Showroom2" isActive={pathname === "/Showroom2"}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="/Showroom2" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>

      <Footer />
    </>
  );
}
