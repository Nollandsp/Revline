"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Showroom", href: "/Showroom" },
  { name: "À propos", href: "/Propos" },
  { name: "Profil", href: "/Profil" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      listener?.subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsOpen(false);
    router.push("/Connexion");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_40px_rgba(0,0,0,0.7)]"
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        {/* Top red line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[64px] sm:h-[76px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src="/RevlineLogo.png"
              alt="Revline"
              width={140}
              height={70}
              priority
              className="object-contain h-[58px] w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="text-white/60 hover:text-white text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 font-body"
                >
                  {link.name}
                </Link>
                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-red-500 transition-all duration-400 group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/Contact">
              <button className="text-white/55 hover:text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-5 py-2.5 border border-white/12 hover:border-white/35 transition-all duration-300 cursor-pointer font-body">
                Contact
              </button>
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-5 py-2.5 bg-red-600 hover:bg-red-700 transition-all duration-300 cursor-pointer font-body"
              >
                Déconnexion
              </button>
            ) : (
              <Link href="/Connexion">
                <button className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-5 py-2.5 bg-red-600 hover:bg-red-700 transition-all duration-300 cursor-pointer font-body">
                  Connexion
                </button>
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-[5px] relative z-50 cursor-pointer p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={`block h-[1.5px] w-5 bg-white transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block h-[1.5px] w-5 bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-5 bg-white transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/97"
            style={{ backdropFilter: "blur(24px)" }}
          >
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-60" />

            <ul className="flex flex-col h-full pt-[100px] px-8 pb-16 overflow-y-auto">
              {[...navLinks, { name: "Contact", href: "/Contact" }].map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-baseline gap-5 py-5 border-b border-white/5 group"
                  >
                    <span className="font-display text-red-600/40 text-sm w-7">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-white text-[clamp(2rem,7vw,3rem)] uppercase leading-none group-hover:text-red-500 transition-colors duration-300">
                      {link.name}
                    </span>
                  </Link>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mt-10"
              >
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-[11px] font-semibold tracking-[0.3em] uppercase cursor-pointer hover:text-red-400 transition-colors duration-300 font-body"
                  >
                    Déconnexion
                  </button>
                ) : (
                  <Link href="/Connexion" onClick={() => setIsOpen(false)}>
                    <button className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300 cursor-pointer font-body">
                      Se connecter
                    </button>
                  </Link>
                )}
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
