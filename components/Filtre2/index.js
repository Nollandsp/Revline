"use client";
import { Listbox } from "@headlessui/react";
import { motion } from "framer-motion";

export default function Filtre({
  filters = { brand: "", order: "asc" },
  onFilter = () => {},
}) {
  // ✅ Crée la liste des marques dynamiquement à partir des véhicules disponibles
  const brands = [
    "Toutes",
    ...new Set((props.vehicles || []).map((v) => v.brand)),
  ];

  const orders = ["asc", "desc"];

  // Valeurs affichées dans les Listbox (doivent correspondre aux valeurs des options)
  const selectedBrand = filters.brand === "" ? "Toutes" : filters.brand;
  const selectedOrder = filters.order === "asc" ? "asc" : "desc";

  // Appelé quand l'utilisateur choisit une marque
  const handleBrandChange = (value) => {
    // transforme "Toutes" en chaîne vide pour l'état parent
    const newBrand = value === "Toutes" ? "" : value;
    onFilter({
      brand: newBrand,
      order: filters.order || "asc",
    });
  };

  // Appelé quand l'utilisateur choisit l'ordre
  const handleOrderChange = (value) => {
    onFilter({
      brand: filters.brand || "",
      order: value,
    });
  };

  // DEBUG : voir si les props arrivent bien (enlève les logs en production)
  // console.log("Filtre props filters:", filters, "selectedBrand:", selectedBrand, "selectedOrder:", selectedOrder);

  return (
    <div className="flex flex-wrap gap-4">
      {/* Dropdown Marque */}
      <Listbox value={selectedBrand} onChange={handleBrandChange}>
        <div className="relative">
          <Listbox.Button className="px-4 py-2 bg-red-600 text-white rounded-lg w-40 text-left hover:bg-red-700 transition">
            {selectedBrand}
          </Listbox.Button>

          <Listbox.Options
            as={motion.ul}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-1 w-full bg-red-500 rounded-lg shadow-lg overflow-hidden z-10"
          >
            {brands.map((b) => (
              <Listbox.Option
                key={b}
                value={b}
                className={({ active }) =>
                  `cursor-pointer px-4 py-2 ${
                    active ? "bg-red-700" : "bg-red-500"
                  } text-white`
                }
              >
                {b}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      {/* Dropdown Ordre */}
      <Listbox value={selectedOrder} onChange={handleOrderChange}>
        <div className="relative">
          <Listbox.Button className="px-4 py-2 bg-red-600 text-white rounded-lg w-40 text-left hover:bg-red-700 transition">
            {selectedOrder === "asc" ? "Prix croissant" : "Prix décroissant"}
          </Listbox.Button>

          <Listbox.Options
            as={motion.ul}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-1 w-full bg-red-500 rounded-lg shadow-lg overflow-hidden z-10"
          >
            {orders.map((o) => (
              <Listbox.Option
                key={o}
                value={o}
                className={({ active }) =>
                  `cursor-pointer px-4 py-2 ${
                    active ? "bg-red-700" : "bg-red-500"
                  } text-white`
                }
              >
                {o === "asc" ? "Prix croissant" : "Prix décroissant"}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
