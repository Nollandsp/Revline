"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function formatMemberSince(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

function getInitials(name, email) {
  if (name && name.trim()) {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  return (email || "?")[0].toUpperCase();
}

function SectionCard({ title, subtitle, children, danger = false }) {
  return (
    <div className={`relative bg-neutral-950 border p-6 sm:p-8 ${danger ? "border-red-600/15" : "border-white/8"}`}>
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent to-transparent ${danger ? "via-red-600/40" : "via-white/10"}`} />
      <h3 className={`text-sm font-semibold tracking-[0.15em] uppercase mb-1 ${danger ? "text-red-400" : "text-white"}`}>
        {title}
      </h3>
      {subtitle && <p className={`text-xs mb-6 ${danger ? "text-red-400/50" : "text-white/30"}`}>{subtitle}</p>}
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-black border border-white/10 text-white text-sm placeholder:text-white/20 px-4 py-3 focus:outline-none focus:border-red-600/50 transition-colors duration-200";
const btnPrimary =
  "w-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.15em] uppercase py-3 mt-2 transition-all duration-300 cursor-pointer";

export default function Profil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          setName(user.user_metadata?.full_name || "");
          setEmail(user.email || "");
        } else {
          router.push("/Connexion");
        }
      } catch {
        router.push("/Connexion");
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const showMsg = (msg) => { setMessage(msg); setTimeout(() => setMessage(""), 3500); };
  const showErr = (err) => { setError(err); setTimeout(() => setError(""), 3500); };

  const updateName = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user: u } } = await supabase.auth.getUser();
      if (!u) { showErr("Utilisateur non connecté"); setLoading(false); return; }
      const { error: authError } = await supabase.auth.updateUser({ data: { full_name: name } });
      if (authError) { showErr(authError.message); setLoading(false); return; }
      const { error: dbError } = await supabase.from("profiles").update({ pseudo: name }).eq("id", u.id);
      if (dbError) showErr(dbError.message);
      else showMsg("Pseudo modifié avec succès");
    } catch { showErr("Erreur lors de la modification"); }
    setLoading(false);
  };

  const updateEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) showErr(error.message);
      else showMsg("Email modifié — vérifiez vos mails");
    } catch { showErr("Erreur lors de la modification de l'email"); }
    setLoading(false);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) { showErr("Les mots de passe ne correspondent pas"); setLoading(false); return; }
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) showErr(error.message);
      else { showMsg("Mot de passe modifié avec succès"); setNewPassword(""); setConfirmPassword(""); }
    } catch { showErr("Erreur lors de la modification"); }
    setLoading(false);
  };

  const signOut = async () => {
    document.cookie = "revline_session=; path=/; Max-Age=0; Secure; SameSite=Strict";
    await supabase.auth.signOut();
    router.push("/");
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { showErr("Session non trouvée"); setLoading(false); return; }
      const response = await fetch("/api/delete-user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
      });
      const data = await response.json();
      if (!response.ok) showErr("Erreur suppression : " + (data.error || "Erreur inconnue"));
      else {
        document.cookie = "revline_session=; path=/; Max-Age=0; Secure; SameSite=Strict";
        await supabase.auth.signOut();
        router.push("/");
      }
    } catch { showErr("Erreur lors de la suppression du compte"); }
    setLoading(false);
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) return null;

  const initials = getInitials(name, user.email);
  const displayName = name || user.email?.split("@")[0] || "Pilote";
  const memberSince = formatMemberSince(user.created_at);

  return (
    <>
      <Header />

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm tracking-widest uppercase mb-8 transition-colors duration-200"
        >
          ← Accueil
        </Link>
        <h1
          className="font-display text-white uppercase leading-none"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          Mon Profil
        </h1>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-white/8" />
      </div>

      {/* Feedback banners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 space-y-2">
        {error && (
          <div className="text-red-400 text-xs border border-red-600/20 bg-red-600/8 px-4 py-3">
            {error}
          </div>
        )}
        {message && (
          <div className="text-green-400 text-xs border border-green-600/20 bg-green-600/8 px-4 py-3">
            {message}
          </div>
        )}
      </div>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-24 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-10 items-start">

        {/* === SIDEBAR === */}
        <div className="space-y-4 lg:sticky lg:top-28">

          {/* Identity card */}
          <div className="relative bg-neutral-950 border border-white/8 p-6 sm:p-8">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Avatar */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 bg-red-600/15 border border-red-600/30 flex items-center justify-center mb-4">
                <span className="font-display text-red-500 text-3xl uppercase">
                  {initials}
                </span>
              </div>
              <p className="font-display text-white text-xl uppercase leading-tight">{displayName}</p>
              <p className="text-white/30 text-xs mt-1 break-all">{user.email}</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/6 mb-5" />

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs tracking-widest uppercase">Membre depuis</span>
                <span className="text-white text-xs font-medium capitalize">{memberSince}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs tracking-widest uppercase">Statut</span>
                <span className="text-green-400 text-xs font-medium">Actif</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs tracking-widest uppercase">Accès</span>
                <span className="text-white text-xs font-medium">Showroom complet</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/6 my-5" />

            {/* Sign out */}
            <button
              onClick={signOut}
              className="w-full border border-white/15 hover:border-white/40 text-white/50 hover:text-white text-[11px] font-semibold tracking-[0.15em] uppercase py-3 transition-all duration-300 cursor-pointer"
            >
              Se déconnecter
            </button>
          </div>

          {/* Quick links card */}
          <div className="relative bg-neutral-950 border border-white/8 p-6">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">Navigation</p>
            <nav className="space-y-1">
              {[
                { label: "Showroom", href: "/Showroom2" },
                { label: "Ferrari SF90 XX", href: "/SF90XX" },
                { label: "Lamborghini Revuelto", href: "/Revuelto" },
                { label: "Bugatti Tourbillon", href: "/Tourbillon" },
                { label: "Porsche 911 GT3 RS", href: "/GT3RS" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between group py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-white/50 group-hover:text-white text-xs tracking-wide transition-colors duration-200">{label}</span>
                  <span className="text-white/20 group-hover:text-red-500 text-xs transition-colors duration-200">→</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* === SETTINGS === */}
        <div className="space-y-4">

          {/* Section heading */}
          <div className="mb-2">
            <p className="text-xs tracking-[0.25em] uppercase text-red-500 mb-1">Paramètres du compte</p>
            <p className="text-white/30 text-sm">Gérez les informations liées à votre compte Revline.</p>
          </div>

          {/* Pseudo */}
          <SectionCard title="Pseudo" subtitle="Votre nom d'affichage sur la plateforme">
            <form onSubmit={updateName} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre pseudo"
                className={inputClass + " flex-1"}
              />
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300 cursor-pointer whitespace-nowrap">
                Modifier
              </button>
            </form>
          </SectionCard>

          {/* Email */}
          <SectionCard title="Adresse email" subtitle="Un email de confirmation vous sera envoyé">
            <form onSubmit={updateEmail} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemple.com"
                className={inputClass + " flex-1"}
              />
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300 cursor-pointer whitespace-nowrap">
                Modifier
              </button>
            </form>
          </SectionCard>

          {/* Password */}
          <SectionCard title="Mot de passe" subtitle="Choisissez un mot de passe sécurisé">
            <form onSubmit={updatePassword} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                  className={inputClass}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmer le mot de passe"
                  className={inputClass}
                />
              </div>
              <button type="submit" className={btnPrimary}>
                Modifier le mot de passe
              </button>
            </form>
          </SectionCard>

          {/* Newsletter CTA */}
          <div className="relative bg-neutral-950 border border-white/8 p-6 sm:p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-red-600/5 blur-[60px] pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-red-500 mb-1">Newsletter</p>
                <h3 className="font-display text-white uppercase text-xl sm:text-2xl leading-tight">
                  Restez dans la course
                </h3>
                <p className="text-white/40 text-xs mt-1 max-w-xs">
                  Recevez les dernières actualités, sorties exclusives et avant-premières Revline.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500" />
                  <span className="text-green-400 text-xs tracking-wide">Inscrit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <SectionCard
            title="Zone dangereuse"
            subtitle="Cette action supprime définitivement votre compte et toutes vos données."
            danger
          >
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full border border-red-600/40 text-red-500 hover:bg-red-600 hover:text-white text-[11px] font-semibold tracking-[0.15em] uppercase py-3 transition-all duration-300 cursor-pointer"
            >
              Supprimer mon compte
            </button>
          </SectionCard>
        </div>
      </main>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="relative bg-neutral-950 border border-red-600/20 p-8 max-w-sm w-full">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
            <h3 className="font-display text-2xl text-white uppercase mb-3">Confirmer la suppression</h3>
            <p className="text-white/40 text-sm mb-8 leading-relaxed">
              Cette action est irréversible. Toutes vos données seront définitivement supprimées.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-white/15 text-white/50 hover:text-white text-[11px] font-semibold tracking-widest uppercase py-3 transition-all duration-300 cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={deleteAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-widest uppercase py-3 transition-all duration-300 cursor-pointer"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
