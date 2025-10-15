"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react"; // si lucide-react est installé
import { supabase } from "@/lib/supabase/client";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

export default function Profil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Champs du profil
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  // Récupérer l'utilisateur
  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setName(user.user_metadata?.full_name || "");
        setEmail(user.email || "");
      } else {
        router.push("/Connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      router.push("/Connexion");
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  // Modifier pseudo
  const updateName = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Utilisateur non connecté");
        setLoading(false);
        return;
      }

      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: name },
      });

      if (authError) {
        setError("Erreur auth : " + authError.message);
        setLoading(false);
        return;
      }

      const { error: dbError } = await supabase
        .from("profiles")
        .update({ pseudo: name })
        .eq("id", user.id);

      if (dbError) {
        setError("Erreur DB : " + dbError.message);
      } else {
        setMessage("Pseudo modifié avec succès");
      }
    } catch (err) {
      setError("Erreur lors de la modification du pseudo");
    }

    setLoading(false);
  };

  // Modifier email
  const updateEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) {
        setError("Erreur email : " + error.message);
      } else {
        setMessage("Email modifié avec succès (vérifiez vos mails)");
      }
    } catch {
      setError("Erreur lors de la modification de l'email");
    }
    setLoading(false);
  };

  // Modifier mot de passe
  const updatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        setError("Erreur mot de passe : " + error.message);
      } else {
        setMessage("Mot de passe modifié avec succès");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setError("Erreur lors de la modification du mot de passe");
    }
    setLoading(false);
  };

  // Supprimer compte
  const deleteAccount = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError("Session non trouvée");
        return;
      }

      const response = await fetch("/api/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError("Erreur suppression : " + (data.error || "Erreur inconnue"));
      } else {
        setMessage("Compte supprimé");
        await supabase.auth.signOut();
        router.push("/");
      }
    } catch {
      setError("Erreur lors de la suppression du compte");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />{" "}
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-6 mb-10 relative">
        <Link
          href="/"
          className="absolute top-4 left-4 flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          <ArrowLeft size={20} />
          Retour
        </Link>

        <Link href="/">
          <Image
            src="/RevlineLogo.png"
            alt="Revline Logo"
            width={140}
            height={70}
            priority
            className="object-contain h-[100px] w-auto"
          />
        </Link>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bloc 1 - Pseudo */}
          <div className="w-[350px] bg-neutral-900 text-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-lg font-bold ">Modifier le pseudo</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Entrez votre nouveau pseudo
            </p>
            <form onSubmit={updateName} className="flex flex-col gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre pseudo"
                className="bg-neutral-800 border border-white/20 text-white rounded-lg px-3 py-2"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg mt-2"
              >
                Modifier le pseudo
              </button>
            </form>
          </div>

          {/* Bloc 2 - Email */}
          <div className="w-[350px] bg-neutral-900 text-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-lg font-bold ">Modifier l’email</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Entrez votre nouvelle adresse email
            </p>
            <form onSubmit={updateEmail} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemple.com"
                className="bg-neutral-800 border border-white/20 text-white rounded-lg px-3 py-2"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg mt-2"
              >
                Modifier l’email
              </button>
            </form>
          </div>

          {/* Bloc 3 - Mot de passe */}
          <div className="w-[350px] bg-neutral-900 text-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-lg font-bold ">Modifier le mot de passe</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Entrez votre nouveau mot de passe
            </p>
            <form onSubmit={updatePassword} className="flex flex-col gap-2">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
                className="bg-neutral-800 border border-white/20 text-white rounded-lg px-3 py-2"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer mot de passe"
                className="bg-neutral-800 border border-white/20 text-white rounded-lg px-3 py-2"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg mt-2"
              >
                Modifier le mot de passe
              </button>
            </form>
          </div>

          {/* Bloc 4 - Zone dangereuse */}
          <div className="w-[350px] bg-neutral-900 border-red-500/30 text-white rounded-xl shadow-lg p-6 space-y-4 md:h-[300px]">
            <h2 className="text-lg font-bold text-center text-red-400">
              Zone dangereuse
            </h2>
            <p className="text-red-400 text-sm text-center mt-6 md:mt-20">
              Supprimez vos données et déconnectez-vous
            </p>
            <button
              onClick={deleteAccount}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg mt-6 md:mt-11"
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
