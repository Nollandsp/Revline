"use client";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { motion } from "framer-motion";

export default function Filtre({ onFilter }) {
  const brands = ["Toutes", "Porsche", "Bugatti", "Aston Martin", "Ferrari"];
  const orders = ["asc", "desc"];

  const [selectedBrand, setSelectedBrand] = useState("Toutes");
  const [selectedOrder, setSelectedOrder] = useState("asc");

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    onFilter({ brand: value === "Toutes" ? "" : value, order: selectedOrder });
  };

  const handleOrderChange = (value) => {
    setSelectedOrder(value);
    onFilter({
      brand: selectedBrand === "Toutes" ? "" : selectedBrand,
      order: value,
    });
  };

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
