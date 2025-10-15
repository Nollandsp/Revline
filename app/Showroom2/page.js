"use client";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleFilter from "@/components/Filtre";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react"; // ✅ ajouté useEffect + useMemo
import Link from "next/link";
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

export default function Showroom2() {
  const [filters, setFilters] = useState({ brand: "", order: "asc" });
  const pathname = usePathname();

  const vehicles = [
    {
      id: 1,
      name: "Koenigsegg Jesko Attack",
      image: "/Jesko/JeskoSide.webp",
      brand: "Koenigsegg",
      power: "1600 ch",
      price: "À partir de 3 M €",
      slug: "/Jesko",
    },
    {
      id: 2,
      name: "Lamborghini Revuelto",
      image: "/Revuelto/Revueltofront.jpg",
      brand: "Lamborghini",
      power: "1015 ch",
      price: "À partir de 500 000 €",
      slug: "/Revuelto",
    },
  ];

  // ✅ LOGIQUE corrigée — même affichage mais comparaison normalisée
  const parsePrice = (price) => {
    if (!price) return 0;

    let num = price
      .replace("À partir de", "")
      .replace(/\s/g, "")
      .replace(",", ".")
      .toUpperCase();

    if (num.includes("M")) {
      return parseFloat(num.replace("M€", "").replace("€", "")) * 1_000_000;
    }

    return parseFloat(num.replace("€", "")) || 0;
  };

  // ✅ Normalisation pour éviter les erreurs de casse/espaces
  const normalize = (str) => (str ? str.trim().toLowerCase() : "");

  // ✅ UseMemo pour éviter recalcul inutile
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) =>
        filters.brand ? normalize(v.brand) === normalize(filters.brand) : true
      )
      .sort((a, b) =>
        filters.order === "asc"
          ? parsePrice(a.price) - parsePrice(b.price)
          : parsePrice(b.price) - parsePrice(a.price)
      );
  }, [vehicles, filters]);

  const resetFilters = () => setFilters({ brand: "", order: "asc" });

  // ✅ debug utile (à supprimer après test)
  useEffect(() => {
    console.log("Filtres mis à jour :", filters);
    console.log(
      "Véhicules filtrés :",
      filteredVehicles.map((v) => v.brand)
    );
  }, [filters, filteredVehicles]);

  // ⚠️ Rien d'autre changé ici — tout ton affichage reste identique}

  return (
    <>
      <Header />

      <section className="px-6 mt-30 max-w-7xl mx-auto mb-20">
        {/* Filtre + bouton reset */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <VehicleFilter
            vehicles={vehicles}
            filters={filters}
            onFilter={setFilters}
          />
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
          >
            Réinitialiser
          </button>
        </div>

        {/* Grille véhicules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          <AnimatePresence>
            {filteredVehicles.map((car) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full"
              >
                <Card className="overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 border-white/10 rounded-3xl p-0">
                  <div className="relative">
                    <Image
                      src={car.image}
                      alt={car.name}
                      width={1600}
                      height={900}
                      className="w-full h-56 md:h-64 object-cover rounded-t-3xl transition-transform duration-300 hover:scale-[1.03]"
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
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                        >
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
          </AnimatePresence>
        </div>
      </section>

      {/* ✅ Pagination dynamique */}
      <section className="mt-8 mb-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/Showroom" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href="/Showroom"
                isActive={pathname === "/Showroom"}
              >
                1
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href="/Showroom2"
                isActive={pathname === "/Showroom2"}
              >
                2
              </PaginationLink>
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
