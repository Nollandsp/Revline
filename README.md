# Revline — Showroom Virtuel de Supercars

> Plateforme premium dédiée aux passionnés de supercars d'exception. Fiches techniques complètes, données officielles, expérience visuelle immersive.

🔗 **[revline-eight.vercel.app](https://revline-eight.vercel.app)**

---

## Aperçu

Revline est un showroom virtuel Next.js qui regroupe les hypercars les plus exclusives au monde. Chaque modèle dispose d'une page dédiée avec carousel, fiche technique, packs disponibles, statistiques animées et sections cinématiques.

---

## Voitures au catalogue

| Marque       | Modèle            | Puissance | Prix      |
| ------------ | ----------------- | --------- | --------- |
| Ferrari      | SF90 XX Stradale  | 1 015 ch  | 700 000 € |
| Lamborghini  | Revuelto          | 1 015 ch  | 500 000 € |
| Bugatti      | Tourbillon        | 1 800 ch  | 3,8 M €   |
| Porsche      | 911 GT3 RS        | 525 ch    | 230 000 € |
| Porsche      | 718 Cayman GT4 RS | 500 ch    | 162 500 € |
| Aston Martin | Valhalla          | 1 064 ch  | 950 000 € |
| Koenigsegg   | Jesko             | 1 600 ch  | 3 M €     |

---

## Fonctionnalités

- **Showroom** — grille filtrée par marque et par prix
- **Pages voiture** — carousel HD, lightbox, stats animées, fiche technique (drawer), packs avec modales, section consommation, section exhaust
- **Authentification** — inscription / connexion / déconnexion via Supabase Auth
- **Profil** — modification du pseudo, email, mot de passe, suppression de compte
- **Contact** — formulaire protégé avec validation et envoi en base de données
- **Newsletter** — intégration Brevo (Sendinblue)
- **À propos** — timeline, stats, parallax, section "Pourquoi Revline"

---

## Stack technique

| Catégorie   | Technologie                            |
| ----------- | -------------------------------------- |
| Framework   | Next.js 15.5 (App Router)              |
| Styling     | Tailwind CSS v4                        |
| Animations  | Framer Motion v12                      |
| Auth & BDD  | Supabase                               |
| Newsletter  | Brevo API                              |
| Fonts       | Bebas Neue · Barlow Condensed · Barlow |
| Déploiement | Vercel                                 |

---

## Installation locale

```bash
# 1. Cloner le dépôt
git clone https://github.com/Nollandsp/revline.git
cd revline

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les valeurs dans .env.local

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

---

## Variables d'environnement

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Brevo (newsletter)
BREVO_API_KEY=
```

---

## Structure du projet

```
app/
├── page.js              # Page d'accueil
├── Showroom2/           # Showroom filtrable
├── SF90XX/              # Pages voiture (×7)
├── Profil/              # Espace membre
├── Contact/             # Formulaire de contact
├── Propos/              # À propos
├── Connexion/           # Auth
├── Inscription/         # Auth
└── api/
    ├── contact/         # Route POST formulaire
    ├── subscribe/       # Route POST newsletter
    └── delete-user/     # Route DELETE compte

components/
├── Header/              # Navbar
├── Footer/
├── Intro/               # Hero parallax
├── Favoris/             # Voiture du moment
├── Marques/             # Liste des marques
├── WhyRevline/          # Section arguments
├── Showroom/            # Carousel catalogue
├── Loader/
└── Marquee/

lib/
├── supabase/client.js   # Client Supabase
└── rateLimit.js         # Rate limiter in-memory
```

---

## Sécurité

- **A01** — `user_id` extrait du JWT côté serveur uniquement
- **A03** — Validation des entrées sur toutes les routes API
- **A05** — En-têtes HTTP : CSP, HSTS, X-Frame-Options, nosniff
- **A07** — Rate limiting sur toutes les routes API (5 req/15min)

---

## Licence

Projet personnel — tous droits réservés.
