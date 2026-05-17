-- ============================================================
--  REVLINE — Schéma Supabase complet
--  À coller dans : Supabase Dashboard → SQL Editor → New query
-- ============================================================


-- ┌─────────────────────────────────────────────────────────┐
-- │  1. TABLE : profiles                                    │
-- │  Stocke le pseudo de chaque utilisateur                 │
-- │  Liée à auth.users (gérée par Supabase Auth)            │
-- └─────────────────────────────────────────────────────────┘

CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  pseudo      TEXT        NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index utile pour les recherches par pseudo
CREATE INDEX IF NOT EXISTS profiles_pseudo_idx ON public.profiles (pseudo);

-- Commentaires de documentation
COMMENT ON TABLE  public.profiles          IS 'Profils utilisateurs Revline';
COMMENT ON COLUMN public.profiles.id       IS 'UUID identique à auth.users.id';
COMMENT ON COLUMN public.profiles.pseudo   IS 'Pseudo affiché dans l''application';


-- ┌─────────────────────────────────────────────────────────┐
-- │  2. TABLE : contact_messages                            │
-- │  Stocke les messages du formulaire de contact           │
-- └─────────────────────────────────────────────────────────┘

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  subject     TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  user_id     UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour filtrer les messages par utilisateur ou par date
CREATE INDEX IF NOT EXISTS contact_messages_user_id_idx  ON public.contact_messages (user_id);
CREATE INDEX IF NOT EXISTS contact_messages_created_idx  ON public.contact_messages (created_at DESC);

COMMENT ON TABLE  public.contact_messages             IS 'Messages reçus via le formulaire de contact';
COMMENT ON COLUMN public.contact_messages.user_id     IS 'NULL si l''expéditeur n''est pas connecté';


-- ┌─────────────────────────────────────────────────────────┐
-- │  3. TRIGGER : création automatique du profil            │
-- │  Déclenché à chaque nouvel utilisateur Supabase Auth    │
-- └─────────────────────────────────────────────────────────┘

-- Fonction appelée par le trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, pseudo)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'pseudo', '')
  )
  ON CONFLICT (id) DO NOTHING;   -- sécurité en cas de double appel
  RETURN NEW;
END;
$$;

-- Trigger sur auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- ┌─────────────────────────────────────────────────────────┐
-- │  4. TRIGGER : updated_at automatique sur profiles       │
-- └─────────────────────────────────────────────────────────┘

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ┌─────────────────────────────────────────────────────────┐
-- │  5. ROW LEVEL SECURITY (RLS)                            │
-- │  Active la sécurité ligne par ligne sur chaque table    │
-- └─────────────────────────────────────────────────────────┘

-- ── profiles ──────────────────────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Un utilisateur peut lire son propre profil
CREATE POLICY "profiles: lecture propre"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Un utilisateur peut insérer son propre profil
CREATE POLICY "profiles: insertion propre"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Un utilisateur peut modifier son propre profil
CREATE POLICY "profiles: modification propre"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ⚠️  La suppression est gérée par la cascade ON DELETE CASCADE
--     (quand auth.users est supprimé via l'API admin, le profil part aussi)


-- ── contact_messages ──────────────────────────────────────

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- N'importe quel utilisateur connecté peut insérer un message
CREATE POLICY "contact_messages: insertion authentifiée"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Un utilisateur peut lire ses propres messages
CREATE POLICY "contact_messages: lecture propre"
  ON public.contact_messages
  FOR SELECT
  USING (auth.uid() = user_id);

-- ⚠️  La lecture admin se fait via la Service Role Key (bypass RLS)
--     → utilisée dans /api/contact/route.js côté serveur


-- ┌─────────────────────────────────────────────────────────┐
-- │  6. GRANTS — accès public (anon + authenticated)        │
-- └─────────────────────────────────────────────────────────┘

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE         ON public.profiles         TO authenticated;
GRANT SELECT, INSERT                 ON public.contact_messages TO authenticated;

-- Service role a déjà tous les droits par défaut (bypass RLS)


-- ┌─────────────────────────────────────────────────────────┐
-- │  7. VÉRIFICATION FINALE                                 │
-- │  Lance ces requêtes pour confirmer que tout est en place│
-- └─────────────────────────────────────────────────────────┘

-- SELECT table_name FROM information_schema.tables
--   WHERE table_schema = 'public';

-- SELECT * FROM pg_policies WHERE schemaname = 'public';

-- SELECT trigger_name, event_object_table FROM information_schema.triggers
--   WHERE trigger_schema = 'public' OR event_object_schema = 'auth';
