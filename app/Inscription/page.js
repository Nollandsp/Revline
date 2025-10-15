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

export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newsletter, setNewsletter] = useState(false); // ✅ état newsletter
  const router = useRouter();

  // ✅ fonction pour Mailchimp
  async function subscribeToMailchimp(email, firstName) {
    const API_KEY = "process.env.MAILCHIMP_API_KEY";
    const LIST_ID = "process.env.MAILCHIMP_LIST_ID";
    const DATACENTER = API_KEY.split("-")[1]; // ex: us21

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed", // ou "pending" pour double opt-in
        merge_fields: { FNAME: firstName },
      }),
    });

    return await response.json();
  }

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
            id: user.id,
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
          // ✅ Inscription à Mailchimp si newsletter cochée
          if (newsletter) {
            try {
              await subscribeToMailchimp(email, pseudo);
            } catch (err) {
              console.error(
                "Erreur lors de l'inscription à la newsletter :",
                err
              );
              // ne bloque pas l'inscription si Mailchimp échoue
            }
          }

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
            Inscription
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Créez votre compte
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Pseudo"
              className="bg-neutral-800 border-white/20 text-white text-sm sm:text-base"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
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
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              className="bg-neutral-800 border-white/20 text-white text-sm sm:text-base"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && (
              <p className="text-red-500 text-xs sm:text-sm">{error}</p>
            )}
          </CardContent>
          <div className="flex justify-center w-full mt-5 px-6">
            <label className="flex items-center gap-2 text-sm sm:text-base">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="h-4 w-4 rounded-md border border-white/20 bg-transparent checked:bg-red-600 checked:border-red-600 text-white focus:ring-2 focus:ring-red-600 focus:ring-offset-0 transition"
              />
              Je souhaite recevoir les nouveautés par email
            </label>
          </div>

          <CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between mt-7">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Inscription..." : "S’inscrire"}
            </Button>
            <Link href="/Connexion" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="bg-white text-black hover:bg-neutral-300 w-full sm:w-auto"
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
