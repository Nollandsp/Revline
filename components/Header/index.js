"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/Connexion");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-[100px] flex items-center justify-between md:justify-between">
        {/* === MOBILE / TABLETTE : Burger + Logo centré === */}
        <div className="flex w-full items-center justify-between md:hidden">
          {/* Burger menu à gauche */}
          <button
            className="flex flex-col gap-1 relative z-50"
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

          {/* Logo centré */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0"
          >
            <Image
              src="/RevlineLogo.png"
              alt="Revline"
              width={140}
              height={70}
              priority
              className="object-contain h-[100px] w-auto"
            />
          </Link>
        </div>

        {/* DESKTOP : Logo + Menu + Boutons */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Logo à gauche */}
          <Link href="/" className="flex items-center">
            <div className="h-[50px] lg:h-[100px] flex items-center">
              <Image
                src="/RevlineLogo.png"
                alt="Logo OnlyPrem"
                width={200}
                height={100}
                priority
                className="object-contain h-full w-auto"
              />
            </div>
          </Link>

          {/* Menu desktop */}
          <ul className="flex items-center gap-10 text-white font-medium tracking-wide">
            {[
              { name: "Showroom", href: "/Showroom" },
              { name: "À propos", href: "/Propos" },
              { name: "Profil", href: "/Profil" },
            ].map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="transition hover:text-red-500"
                >
                  {link.name}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* Boutons desktop */}
          <div className="flex gap-3">
            <Link href="/Contact">
              <Button className="bg-transparent text-white border border-white hover:bg-red-600 hover:border-red-600">
                Contact
              </Button>
            </Link>
            {user ? (
              <Button
                className="bg-transparent text-white border border-white hover:bg-red-600 hover:border-red-600"
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            ) : (
              <Link href="/Connexion">
                <Button className="bg-transparent text-white border border-white hover:bg-red-600 hover:border-red-600">
                  Connexion
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile plein écran */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="flex flex-col gap-10 text-white font-bold text-2xl h-full pt-[120px] px-8 overflow-y-auto">
          <li>
            <Link href="/Showroom" onClick={() => setIsOpen(false)}>
              Showroom
            </Link>
          </li>
          <li>
            <Link href="/Propos" onClick={() => setIsOpen(false)}>
              À propos
            </Link>
          </li>
          <li>
            <Link href="/Profil" onClick={() => setIsOpen(false)}>
              Profil
            </Link>
          </li>
          {user ? (
            <li>
              <button
                onClick={async () => {
                  await handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left text-red-500"
              >
                Déconnexion
              </button>
            </li>
          ) : (
            <li>
              <Link href="/Connexion" onClick={() => setIsOpen(false)}>
                Connexion
              </Link>
            </li>
          )}
          <Link href="/Contact" onClick={() => setIsOpen(false)}>
            <li>Contact</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
