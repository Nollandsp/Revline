"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client"; // Assure-toi d'avoir un client Supabase
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

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Connexion
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      const user = authData.user;
      if (!user) {
        setError("Utilisateur non trouvé après connexion");
        setLoading(false);
        return;
      }

      // Récupération ou création du profil
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        // Créer le profil si inexistant
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({ id: user.id, pseudo: "" })
          .select()
          .single();

        if (insertError) {
          setError("Impossible de créer le profil : " + insertError.message);
          setLoading(false);
          return;
        }
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la connexion");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-6">
      <Link
        href="/"
        className="self-start ml-4 -mt-30 text-white text-xl flex items-center gap-1"
      >
        ← Retour
      </Link>

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

      <Card className="w-[350px] bg-neutral-900 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Connexion</CardTitle>
          <CardDescription>
            Entrez vos identifiants pour continuer
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
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
            {error && <p className="text-red-500">{error}</p>}
          </CardContent>

          <CardFooter className="flex justify-between mt-7">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
            <Link href="/Inscription">
              <Button
                variant="outline"
                className="bg-white text-black hover:bg-neutral-300"
              >
                S’inscrire
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
