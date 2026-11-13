# Rouky

Parcours d’apprentissage de l’ingénierie IA avec 18 phases, un Capstone final, des exercices et trois projets par étape.

## Fonctionnement

- Le parcours est accessible immédiatement, sans compte ni connexion.
- La progression est enregistrée dans le `localStorage` du navigateur, sous la clé `rouky-progress-v1`.
- Les exercices, dépôts GitHub, autoévaluations et validations de phase débloquent les étapes suivantes.
- La page Paramètres permet d’exporter, d’importer et de réinitialiser la progression.

La progression reste sur l’appareil et dans le navigateur utilisés. Pour changer de navigateur ou d’appareil, exportez un fichier JSON puis importez-le sur le nouvel appareil. L’import demande une nouvelle autoévaluation des projets. Effacer les données du navigateur efface aussi la progression locale.

Les anciennes progressions liées à un compte PostgreSQL ne sont pas migrées automatiquement. La base existante n’est pas supprimée par ce changement ; conservez-la si vous devez récupérer d’anciennes données.

La validation des projets est une attestation de l’apprenant après examen de tous les critères. Rouky ne corrige pas le dépôt automatiquement et ne fournit pas encore de revue par un tiers.

## Développement

Prérequis : Node.js 20+.

```bash
npm ci
npm run dev
```

Aucune variable d’environnement ni base de données n’est nécessaire.

## Vérifications

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Déploiement

L’application Next.js peut être déployée sans service de base de données. Retirez les anciennes variables `DATABASE_URL`, `DIRECT_DATABASE_URL` et `AUTH_SECRET` de la configuration du déploiement quand elles ne servent plus ailleurs.

## Direction visuelle

Interface inspirée du taste pack [Graphite Sketch de Palletism](https://palletism.art/collections/graphite-sketch), variante « warm vellum » : fond papier `#F8F4EB`, encre `#2C2924`, accent terre cuite `#8A4B2F`, titres Cormorant Garamond et texte Literata. L’illustration d’accueil [rouky-cartographer.png](public/images/rouky-cartographer.png) a été générée pour Rouky avec ImageGen.

## Contenu

Les 18 phases et le Capstone disposent de modules, consignes de tâches, ressources officielles, livrables et critères d’autoévaluation. Le Capstone est accessible après validation de la phase 17.
