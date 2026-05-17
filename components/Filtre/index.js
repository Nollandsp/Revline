"use client";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function Filtre({
  filters = { brand: "", order: "asc" },
  onFilter = () => {},
}) {
  const brands = [
    "Toutes",
    "Ferrari",
    "Lamborghini",
    "Bugatti",
    "Porsche",
    "Aston Martin",
    "Koenigsegg",
  ];

  const orders = [
    { value: "asc", label: "Prix croissant" },
    { value: "desc", label: "Prix décroissant" },
  ];

  const selectedBrand = filters.brand === "" ? "Toutes" : filters.brand;
  const selectedOrder = filters.order === "asc" ? "asc" : "desc";
  const selectedOrderLabel =
    orders.find((o) => o.value === selectedOrder)?.label ?? "Prix croissant";

  const handleBrandChange = (value) => {
    onFilter({ brand: value === "Toutes" ? "" : value, order: filters.order || "asc" });
  };

  const handleOrderChange = (value) => {
    onFilter({ brand: filters.brand || "", order: value });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* Brand dropdown */}
      <Listbox value={selectedBrand} onChange={handleBrandChange}>
        <div className="relative">
          <Listbox.Button className="flex items-center gap-3 px-5 py-2.5 bg-neutral-950 border border-white/10 text-white/70 hover:text-white hover:border-white/25 text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer min-w-[160px] justify-between">
            <span>{selectedBrand}</span>
            <ChevronDown size={12} className="text-white/40" />
          </Listbox.Button>

          <Listbox.Options className="absolute mt-1 w-full bg-neutral-950 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden z-30">
            {brands.map((b) => (
              <Listbox.Option
                key={b}
                value={b}
                className={({ active, selected }) =>
                  `cursor-pointer px-5 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-150 ${
                    selected
                      ? "text-red-500 bg-red-600/8"
                      : active
                      ? "text-white bg-white/5"
                      : "text-white/40"
                  }`
                }
              >
                {b}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      {/* Order dropdown */}
      <Listbox value={selectedOrder} onChange={handleOrderChange}>
        <div className="relative">
          <Listbox.Button className="flex items-center gap-3 px-5 py-2.5 bg-neutral-950 border border-white/10 text-white/70 hover:text-white hover:border-white/25 text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer min-w-[180px] justify-between">
            <span>{selectedOrderLabel}</span>
            <ChevronDown size={12} className="text-white/40" />
          </Listbox.Button>

          <Listbox.Options className="absolute mt-1 w-full bg-neutral-950 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden z-30">
            {orders.map((o) => (
              <Listbox.Option
                key={o.value}
                value={o.value}
                className={({ active, selected }) =>
                  `cursor-pointer px-5 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-150 ${
                    selected
                      ? "text-red-500 bg-red-600/8"
                      : active
                      ? "text-white bg-white/5"
                      : "text-white/40"
                  }`
                }
              >
                {o.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
