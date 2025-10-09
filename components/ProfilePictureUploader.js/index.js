"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ProfilePictureUploader({ userId }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Supercar par défaut (URL fixe et valide)
  const defaultSupercar =
    "ttps://images.unsplash.com/photo-1614072105509-8d4e8c6e2b8b?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHN1cGVyY2FyfGVufDB8fHx8fDE2NjE4NzQwNzA&ixlib=rb-1.2.1&q=80&w=1080";

  // Récupérer l'avatar actuel depuis la table profiles
  const fetchAvatar = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", userId)
        .single();

      if (error) throw error;

      setAvatarUrl(data?.avatar_url || defaultSupercar);
    } catch (error) {
      console.error("Erreur récupération avatar:", error.message);
      setAvatarUrl(defaultSupercar);
    }
  };

  useEffect(() => {
    if (userId) fetchAvatar();
  }, [userId]);

  // Gestion du choix de fichier
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    try {
      setUploading(true);

      // Upload sur Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Récupérer l'URL publique
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Mettre à jour la table profiles
      const { error: dbError } = await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", userId);

      if (dbError) throw dbError;

      setAvatarUrl(data.publicUrl);
    } catch (error) {
      console.error("Erreur upload avatar:", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="relative w-24 h-24 rounded-full bg-neutral-800 border-2 border-white flex items-center justify-center cursor-pointer overflow-hidden hover:border-red-600 transition">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {!avatarUrl && (
          <span className="absolute text-white text-4xl font-bold pointer-events-none">
            +
          </span>
        )}
      </label>
      {uploading && <p className="text-xs text-gray-400">Uploading...</p>}
    </div>
  );
}
