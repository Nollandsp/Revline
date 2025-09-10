"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-[100px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Revline.jpg"
            alt="Logo OnlyPrem"
            width={200}
            height={100}
            className="object-contain h-[100px] w-auto"
          />
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex items-center gap-10 text-white font-medium tracking-wide">
          {[
            { name: "Catalogue", href: "/Catalogue" },
            { name: "Configurateur", href: "/models" },
            { name: "À propos", href: "/about" },
          ].map((link) => (
            <li key={link.name} className="relative group">
              <Link href={link.href} className="transition hover:text-red-500">
                {link.name}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* Bouton contact desktop */}
        <div className="hidden md:block">
          <a href="mailto:onlyprem.pro17@gmail.com">
            <Button className="bg-transparent text-white border border-white hover:bg-red-600 hover:border-red-600">
              Contact
            </Button>
          </a>
        </div>

        {/* Bouton burger mobile */}
        <button
          className="md:hidden flex flex-col gap-1 relative z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Menu mobile plein écran */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="flex flex-col gap-10 text-white font-bold text-2xl h-full pt-[120px] px-8 overflow-y-auto">
          <li>
            <Link href="/Catalogue" onClick={() => setIsOpen(false)}>
              Catalogue
            </Link>
          </li>
          <li>
            <Link href="/Configurateur" onClick={() => setIsOpen(false)}>
              Configurateur
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              À propos
            </Link>
          </li>
          <li>
            <a
              href="mailto:onlyprem.pro17@gmail.com"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
