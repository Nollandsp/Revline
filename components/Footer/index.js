"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <>
      <footer id="contact" className="border-t border-white/10 bg-black/60">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 text-sm text-white/70">
          <div>
            <h4 className="text-white font-semibold mb-2">SportCar Showroom</h4>
            <p>
              Votre showroom virtuel de supercars – explorez, comparez et
              découvrez les modèles les plus exclusifs du marché.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <p>
              info@showroom.com
              <br />
              01 23 45 67 89
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Rendez-vous</h4>

            <Button
              className=" font-bold px-5 border border-white text-white bg-transparent hover:bg-red-600 hover:text-white transition-colors duration-300"
              variant="outline"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}
