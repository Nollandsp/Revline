"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SEL = "a, button, [role='button'], input, textarea, select, label";

export default function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const rx = useSpring(x, { stiffness: 110, damping: 20, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 110, damping: 20, mass: 0.6 });

  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const onOver = (e) => { if (e.target.closest(SEL)) setHovered(true); };
    const onOut  = (e) => { if (e.target.closest(SEL)) setHovered(false); };
    const onDown = () => setPressed(true);
    const onUp   = () => setPressed(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
    };
  }, []);

  const size   = hovered ? 28 : 42;
  const color  = hovered ? "rgba(220,38,38,0.9)" : "rgba(255,255,255,0.32)";

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: size, height: size, scale: pressed ? 0.75 : 1 }}
      transition={{
        width:  { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
        height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
        scale:  { duration: 0.1, ease: "easeOut" },
      }}
    >
      {/* Barre horizontale */}
      <span style={{
        position: "absolute",
        top: "50%", left: 0, right: 0,
        height: 1,
        transform: "translateY(-50%)",
        backgroundColor: color,
        transition: "background-color 0.18s ease",
      }} />
      {/* Barre verticale */}
      <span style={{
        position: "absolute",
        left: "50%", top: 0, bottom: 0,
        width: 1,
        transform: "translateX(-50%)",
        backgroundColor: color,
        transition: "background-color 0.18s ease",
      }} />
    </motion.div>
  );
}
