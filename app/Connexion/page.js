"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
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
        let message = authError.message;
        if (message === "Invalid login credentials") {
          message = "Email ou mot de passe incorrect.";
        }
        setError(message);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-6 px-4 relative">
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
          className="object-contain h-16 w-auto sm:h-20 md:h-[100px]"
        />
      </Link>

      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-neutral-900 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold">
            Connexion
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Entrez vos identifiants pour continuer
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              className="bg-neutral-800 border-white/20 text-white text-sm sm:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              className="bg-neutral-800 border-white/20 text-white text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <p className="text-red-500 text-xs sm:text-sm">{error}</p>
            )}
            <Link
              href="/reset-password"
              className="text-xs sm:text-sm text-white/70 hover:underline mt-[-8px] mb-2 self-end"
            >
              Mot de passe oublié ?
            </Link>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between mt-7">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
            <Link href="/Inscription" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="bg-white text-black hover:bg-neutral-300 w-full sm:w-auto"
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
