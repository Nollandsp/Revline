"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      // Création de l'utilisateur Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      const user = data.user;

      if (user) {
        // Création du profil dans la table `profiles` côté client (RLS autorisé)
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: user.id, // RLS exige id = auth.uid()
            pseudo: pseudo,
          },
        ]);

        if (profileError) {
          console.error(
            "Erreur lors de la création du profil :",
            profileError.message
          );
          setError("Erreur lors de la création du profil.");
        } else {
          // Redirection vers la page Connexion
          router.push("/Connexion");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'inscription.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-6">
      {/* Flèche retour */}
      <Link
        href="/"
        className="self-start ml-4 -mt-17 text-white font-bold text-xl flex items-center gap-1"
      >
        ← Retour
      </Link>

      {/* Logo */}
      <Link href="/">
        <Image
          src="/Revline.jpg"
          alt="Logo OnlyPrem"
          width={140}
          height={70}
          priority
          className="object-contain h-[100px] w-auto"
        />
      </Link>

      {/* Card Inscription */}
      <Card className="w-[350px] bg-neutral-900 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Inscription</CardTitle>
          <CardDescription>Créez votre compte</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Pseudo"
              className="bg-neutral-800 border-white/20 text-white"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              className="bg-neutral-800 border-white/20 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              className="bg-neutral-800 border-white/20 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              className="bg-neutral-800 border-white/20 text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
          </CardContent>

          <CardFooter className="flex justify-between mt-7">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? "Inscription..." : "S’inscrire"}
            </Button>
            <Link href="/Connexion">
              <Button
                variant="outline"
                className="bg-white text-black hover:bg-neutral-300"
              >
                Se connecter
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
