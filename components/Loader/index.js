"use client";

import { motion } from "framer-motion";

export default function Loader({ size = "md" }) {
  const bars = [0, 1, 2, 3];
  const heights = ["h-3", "h-5", "h-7", "h-5"];

  return (
    <div className="flex flex-col items-center gap-5" role="status" aria-label="Chargement">
      {/* Animated bars */}
      <div className="flex items-end gap-1">
        {bars.map((i) => (
          <motion.span
            key={i}
            className={`w-1 bg-red-600 ${heights[i]}`}
            animate={{ scaleY: [1, 1.8, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "bottom" }}
          />
        ))}
      </div>
      <p className="text-white/25 text-[9px] tracking-[0.35em] uppercase font-body">
        Chargement
      </p>
    </div>
  );
}
