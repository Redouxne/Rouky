# Rouky

Parcours d’apprentissage de l’ingénierie IA avec 18 phases, un Capstone final, des exercices et trois projets par étape.

## V1 livrée

- Compte par email et mot de passe ; session signée en cookie `HttpOnly`.
- Progression unique en PostgreSQL via Prisma, séparée par utilisateur.
- Tâches, dépôt GitHub, autoévaluation manuelle des critères, validation de phase et déblocage de la suivante.
- États : non commencé, en cours, dépôt soumis, autoévalué, phase validée et bloquée.
- Import automatique du `localStorage` historique lors de la première connexion au compte, puis suppression de la copie locale. Les anciens projets « terminés » reviennent à « dépôt soumis » : une URL seule ne prouve pas que le code a été corrigé. Les anciennes phases validées sont à revalider.
- Pages accueil, dashboard, roadmap, phase, projets, progression, badges et paramètres basées sur la même progression. Filtres de projets et de phases, export/import JSON et réinitialisation fonctionnent.

La validation des projets est **une attestation de l’apprenant** après examen de tous les critères. Rouky ne corrige pas le dépôt automatiquement et ne fournit pas encore de revue par un tiers. Les badges affichés sont dérivés de la progression ; XP, niveaux, streaks, objectifs quotidiens et thème personnalisable ne sont pas activés dans cette V1.

## Développement

Prérequis : Node.js 20+, PostgreSQL 15+.

```bash
npm ci
cp .env.example .env.local
# Renseigner DATABASE_URL et AUTH_SECRET dans .env.local
npm run db:generate
npm run db:push
npm run dev
```

`AUTH_SECRET` doit contenir au moins 32 caractères aléatoires. Exemple de génération : `openssl rand -base64 48`. Ne commitez jamais le secret ni `.env.local`.

Variables requises :

| Variable | Usage |
| --- | --- |
| `DATABASE_URL` | URL PostgreSQL avec SSL en production. Le compte SQL doit pouvoir lire et écrire les tables. |
| `AUTH_SECRET` | Signature des cookies de session ; même valeur sur toutes les instances d’un environnement. |
| `DIRECT_DATABASE_URL` | Optionnelle : connexion directe utilisée uniquement par `npm run db:push` si l’URL d’exécution passe par un pooler. |

`STORAGE_POSTGRES_PRISMA_URL` est accepté comme ancien alias de `DATABASE_URL` à l’exécution. La base doit être mise à jour **avant** le déploiement du code ; `npm run db:push` utilise `DIRECT_DATABASE_URL` si elle est définie, sinon `DATABASE_URL`.
Pour Supabase, la V1 en production utilise le pooler en port 5432 pour `DATABASE_URL`. L’outil de schéma Prisma a nécessité l’hôte direct : renseignez alors `DIRECT_DATABASE_URL` lors des futures mises à jour de la base.

## Vérifications

```bash
npm run lint
npm run typecheck
npm test
npm run build
# Avec PostgreSQL démarré et le serveur sur http://localhost:3100 :
BASE_URL=http://localhost:3100 npm run test:e2e
```

Le test de parcours crée deux comptes de test dans la base visée par `BASE_URL`. Utilisez une base de test, jamais la production. Il vérifie que le dépôt seul ne valide pas le projet, que la phase suivante se débloque après attestation et que la progression survit à la reconnexion sans fuite entre comptes.

## Vercel

Production : [rouky-umber.vercel.app](https://rouky-umber.vercel.app).

Lier le projet à un PostgreSQL durable, ajouter `DATABASE_URL` et `AUTH_SECRET` dans les environnements nécessaires, appliquer `npm run db:push` avec l’URL de la base ciblée, puis déployer. Vérifier `/api/auth`, l’inscription, le parcours phase 0 et la reconnexion sur l’URL déployée.

## Contenu

Les 18 phases et le Capstone disposent de modules, consignes de tâches, ressources officielles, livrables et critères d’autoévaluation. Les phases avancées abordent notamment MCP (version 2026-07-28, outils, ressources, prompts, autorisation), workflows agentiques (outils, limites, reprise, traces, approbation humaine) et OCR (PDF natifs et scannés, mise en page, CER/WER, revue humaine). Le Capstone est accessible après validation de la phase 17.

La cybersécurité de base commence en phase 1 (secrets, entrées, autorisation, dépendances). La phase 6 couvre le prompt engineering évalué et l’AI safety avant les projets LLM exposés. La phase 12 commence par une revue de sécurité, des tests avec deux comptes, une analyse des risques IA et un plan de retour arrière avant les exercices de déploiement. La phase 17 approfondit la gouvernance et la réponse aux incidents. Un prompt défensif ou un filtre ne remplace jamais les contrôles côté serveur.

Le programme a été revu en novembre 2026. Les ressources externes restent susceptibles d’évoluer : vérifier leur version avant un nouvel exercice. La validation automatique du code et la revue par un tiers ne sont pas disponibles ; les projets sont terminés par attestation manuelle de l’apprenant.
