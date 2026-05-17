"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const outerX = useMotionValue(-100);
  const outerY = useMotionValue(-100);
  const innerX = useMotionValue(-100);
  const innerY = useMotionValue(-100);

  const springX = useSpring(outerX, { stiffness: 120, damping: 20, mass: 0.5 });
  const springY = useSpring(outerY, { stiffness: 120, damping: 20, mass: 0.5 });

  const isHovering = useRef(false);
  const outerSize = useMotionValue(32);
  const outerOpacity = useMotionValue(1);

  const springSize = useSpring(outerSize, { stiffness: 200, damping: 22 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      outerX.set(x);
      outerY.set(y);
      innerX.set(x);
      innerY.set(y);
    };

    const onEnter = (e) => {
      const el = e.target.closest("a, button, [role='button'], label, select, input, textarea");
      if (el) {
        isHovering.current = true;
        outerSize.set(52);
      }
    };

    const onLeave = (e) => {
      const el = e.target.closest("a, button, [role='button'], label, select, input, textarea");
      if (el) {
        isHovering.current = false;
        outerSize.set(32);
      }
    };

    const onDown = () => outerOpacity.set(0.5);
    const onUp = () => outerOpacity.set(1);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* Outer ring — springs behind cursor */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          width: springSize,
          height: springSize,
          opacity: outerOpacity,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] border border-red-500/50 mix-blend-difference"
      />

      {/* Inner dot — instant follow */}
      <motion.div
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-[5px] h-[5px] pointer-events-none z-[9999] bg-red-500 rounded-full"
      />
    </>
  );
}
