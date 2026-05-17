"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const brands = [
  { name: "Ferrari",       slug: "/SF90XX",    count: "1 015 ch",  num: "01" },
  { name: "Lamborghini",   slug: "/Revuelto",  count: "1 015 ch",  num: "02" },
  { name: "Bugatti",       slug: "/Tourbillon",count: "1 800 ch",  num: "03" },
  { name: "Porsche",       slug: "/GT4RS",     count: "525 ch",    num: "04" },
  { name: "Aston Martin",  slug: "/Valhalla",  count: "1 064 ch",  num: "05" },
  { name: "Koenigsegg",    slug: "/Jesko",     count: "1 600 ch",  num: "06" },
];

export default function Marques() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14 sm:py-20">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-10 sm:mb-14"
      >
        <span className="w-8 h-[1px] bg-red-600" />
        <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase font-body">
          Les marques
        </span>
      </motion.div>

      {/* Brand list */}
      <div className="divide-y divide-white/5">
        {brands.map((brand, idx) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.07 }}
          >
            <Link href={brand.slug}>
              <div className="group flex items-center justify-between py-5 sm:py-6 cursor-pointer">
                {/* Left — number + name */}
                <div className="flex items-baseline gap-4 sm:gap-7 min-w-0">
                  <span className="font-display text-white/10 text-sm sm:text-base shrink-0 group-hover:text-red-600/40 transition-colors duration-400">
                    {brand.num}
                  </span>
                  <h3 className="font-display text-[clamp(1.8rem,5vw,4rem)] leading-none text-white/60 group-hover:text-white uppercase transition-colors duration-300 truncate">
                    {brand.name}
                  </h3>
                </div>

                {/* Right — power + arrow */}
                <div className="flex items-center gap-5 sm:gap-8 shrink-0 ml-4">
                  <span className="hidden sm:block text-white/20 text-xs tracking-[0.2em] uppercase font-body group-hover:text-white/40 transition-colors duration-300">
                    {brand.count}
                  </span>
                  <span className="text-white/20 group-hover:text-red-500 group-hover:translate-x-1.5 transition-all duration-300 text-base">
                    →
                  </span>
                </div>

                {/* Red underline reveal */}
              </div>
              <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-red-600/60 to-transparent transition-all duration-500 -mt-px" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
