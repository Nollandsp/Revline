"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer id="contact" className="border-t border-white/10 bg-black/60">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8 text-sm text-white/70">
          <div>
            <h4 className="text-white font-bold mb-2">REVLINE</h4>
            <p>
              Votre showroom virtuel de supercars – explorez, comparez et
              découvrez les modèles les plus exclusifs du marché.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/Showroom"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  Showroom
                </Link>
              </li>
              <li>
                <Link
                  href="/Propos"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/Profil"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  Profil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <p>
              info@revline.com
              <br />
              01 23 45 67 89
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Rendez-vous</h4>
            <Link href="/Contact">
              <Button
                className="font-bold px-5 border border-white text-white bg-transparent hover:bg-red-600 hover:text-white transition-colors duration-300"
                variant="outline"
              >
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 mb-8 text-center text-xs text-white/50">
          © 2025 REVLINE. Tous droits réservés.
        </div>
      </footer>
    </>
  );
}
