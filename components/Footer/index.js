"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Youtube } from "lucide-react";
import Marquee from "@/components/Marquee";

const navLinks = [
  { name: "Showroom", href: "/Showroom" },
  { name: "À propos", href: "/Propos" },
  { name: "Profil", href: "/Profil" },
  { name: "Contact", href: "/Contact" },
];

const models = [
  { name: "Ferrari SF90 XX", href: "/SF90XX" },
  { name: "Lamborghini Revuelto", href: "/Revuelto" },
  { name: "Bugatti Tourbillon", href: "/Tourbillon" },
  { name: "Porsche 718 GT4 RS", href: "/GT4RS" },
  { name: "Aston Martin Valhalla", href: "/Valhalla" },
];

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter / X" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

const TICKER = [
  "Ferrari", "Lamborghini", "Bugatti", "Porsche", "Aston Martin",
  "Revline Showroom", "Performance Pure", "Design Extrême",
];

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Marquee ticker at top */}
      <div className="border-t border-white/5 py-3 bg-neutral-950">
        <Marquee items={TICKER} speed="slow" />
      </div>

      {/* Giant background REVLINE */}
      <div className="relative">
        <div
          className="absolute inset-x-0 top-0 flex items-start justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span className="font-display text-[clamp(6rem,18vw,18rem)] text-white/[0.025] leading-none whitespace-nowrap">
            REVLINE
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-12 sm:mb-16">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/RevlineLogo.png"
                  alt="Revline"
                  width={120}
                  height={55}
                  className="object-contain h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
              <p className="text-white/30 text-sm leading-relaxed max-w-[200px] mb-6 font-body">
                Le showroom virtuel de référence pour les passionnés de supercars d&apos;exception.
              </p>
              <div className="flex gap-2.5">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 border border-white/8 flex items-center justify-center text-white/30 hover:text-red-500 hover:border-red-500/30 transition-all duration-300 cursor-pointer"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h5 className="text-white/40 text-[9px] font-semibold tracking-[0.3em] uppercase mb-6 font-body">
                Navigation
              </h5>
              <ul className="space-y-3.5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/30 text-sm hover:text-red-500 transition-colors duration-300 font-body"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Models */}
            <div>
              <h5 className="text-white/40 text-[9px] font-semibold tracking-[0.3em] uppercase mb-6 font-body">
                Modèles
              </h5>
              <ul className="space-y-3.5">
                {models.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/30 text-sm hover:text-red-500 transition-colors duration-300 font-body"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-white/40 text-[9px] font-semibold tracking-[0.3em] uppercase mb-6 font-body">
                Contact
              </h5>
              <div className="space-y-2 text-white/30 text-sm mb-8 font-body">
                <p>info@revline.com</p>
                <p>+33 1 23 45 67 89</p>
              </div>
              <Link href="/Contact">
                <button className="text-white/50 hover:text-white text-[10px] font-semibold tracking-[0.25em] uppercase px-5 py-3 border border-white/10 hover:border-red-600/40 hover:bg-red-600/6 transition-all duration-300 cursor-pointer font-body">
                  Nous contacter →
                </button>
              </Link>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/15 text-[10px] tracking-widest font-body">
              © 2025 REVLINE. Tous droits réservés.
            </p>
            <p className="text-white/15 text-[10px] tracking-widest font-body">
              Showroom virtuel de supercars d&apos;exception
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
