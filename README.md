# Devenir-ingenieur-IA
Road map interactive pour devenir AI Engineer sur le marché actuel 



prompt . 

Tu es un ingénieur full-stack senior spécialisé en Next.js, TypeScript, Prisma, PostgreSQL, Vercel, UX produit, gamification et applications éducatives.

Je veux créer une webapp interactive en français inspirée du dépôt GitHub suivant :

https://github.com/PrinceSinghhub/Ultimate-AI-Engineer-Roadmap-2026

Objectif général :
Transformer cette roadmap “Ultimate AI Engineer Roadmap 2026” en une application web moderne, interactive, gamifiée, entièrement en français, permettant à un utilisateur de suivre sa progression pour devenir ingénieur IA.

Le dépôt d’origine contient une roadmap structurée en 17 phases + un capstone final, avec 3 projets par phase : facile, moyen, difficile. Je veux reprendre cette logique, mais l’adapter proprement en français, avec une vraie webapp, pas une simple page statique.

Très important :

* L’application doit tourner parfaitement sur Vercel.
* Ne pas utiliser SQLite comme base principale.
* Utiliser PostgreSQL avec Prisma.
* L’application doit être compatible avec Vercel Postgres.
* Prévoir les variables d’environnement nécessaires pour Vercel.
* Le build Vercel doit passer sans erreur.
* Tout le texte visible par l’utilisateur doit être en français.
* Ne fais pas une simple copie du README.
* Crée une vraie application fonctionnelle.
* Le code doit être propre, maintenable, responsive et prêt à déployer.
* Si du contenu est repris ou adapté du dépôt d’origine, ajoute une page “Crédits / Licence” mentionnant l’inspiration et la licence MIT.

Nom du projet :
Rouky

Positionnement du produit :
Créer une plateforme d’apprentissage sérieuse, moderne et gamifiée pour devenir ingénieur IA en 2026. L’utilisateur doit pouvoir :

* suivre une roadmap complète,
* voir sa progression globale,
* cocher des tâches,
* valider des projets,
* gagner de l’XP,
* monter de niveau,
* conserver un streak quotidien,
* débloquer des badges,
* consulter ses statistiques,
* reprendre exactement là où il s’est arrêté.

Stack technique obligatoire :

* Next.js avec App Router
* TypeScript
* Tailwind CSS
* Prisma
* PostgreSQL
* Compatible Vercel
* lucide-react pour les icônes
* Recharts ou équivalent pour les graphiques
* date-fns pour les dates
* shadcn/ui si disponible
* Auth.js / NextAuth uniquement si tu peux l’intégrer proprement sans complexifier inutilement
* Sinon, crée une version mono-utilisateur avec un `defaultUser`, mais structure le code pour ajouter l’authentification plus tard

Base de données :
Utiliser PostgreSQL avec Prisma.

Ne pas utiliser SQLite en production.
Ne pas stocker la progression dans des fichiers locaux.
Ne pas dépendre d’un stockage non persistant incompatible avec Vercel.

Variables d’environnement à prévoir :

* DATABASE_URL
* NEXTAUTH_SECRET si Auth.js est utilisé
* NEXTAUTH_URL si Auth.js est utilisé

Créer un fichier `.env.example` clair.

Le projet doit pouvoir tourner ainsi en local :

1. npm install
2. configurer DATABASE_URL dans `.env`
3. npx prisma generate
4. npx prisma db push
5. npm run dev

Le projet doit pouvoir être déployé sur Vercel ainsi :

1. connecter le repo GitHub à Vercel
2. créer une base PostgreSQL sur Vercel Postgres
3. ajouter DATABASE_URL dans les variables d’environnement Vercel
4. lancer le build
5. déployer sans erreur

Le script package.json doit être compatible Vercel :

* `build` doit inclure `prisma generate && next build` si nécessaire
* le build ne doit pas échouer à cause de Prisma
* les pages ne doivent pas dépendre d’un accès serveur impossible au moment du build

Architecture de fichiers souhaitée :

* app/

  * page.tsx
  * dashboard/page.tsx
  * roadmap/page.tsx
  * roadmap/[phaseId]/page.tsx
  * projects/page.tsx
  * progress/page.tsx
  * badges/page.tsx
  * settings/page.tsx
  * credits/page.tsx
* components/

  * layout/
  * roadmap/
  * progress/
  * gamification/
  * ui/
* lib/

  * roadmap-data.ts
  * gamification.ts
  * progress.ts
  * streak.ts
  * badges.ts
  * prisma.ts
  * utils.ts
* prisma/

  * schema.prisma
  * seed.ts
* types/

  * roadmap.ts
  * progress.ts

Modèles Prisma attendus :
User :

* id
* name
* email
* createdAt
* updatedAt

UserProgress :

* id
* userId
* xp
* level
* currentStreak
* bestStreak
* lastActiveDate
* dailyGoal
* profileLevel
* createdAt
* updatedAt

PhaseProgress :

* id
* userId
* phaseId
* status
* progressPercent
* completedAt
* createdAt
* updatedAt

TaskProgress :

* id
* userId
* taskId
* completed
* completedAt
* xpAwarded
* createdAt
* updatedAt

ProjectProgress :

* id
* userId
* projectId
* status
* startedAt
* completedAt
* xpAwarded
* createdAt
* updatedAt

ActivityLog :

* id
* userId
* date
* type
* xp
* metadata
* createdAt

BadgeProgress :

* id
* userId
* badgeId
* unlocked
* unlockedAt
* createdAt
* updatedAt

Si l’authentification n’est pas faite dans le MVP, crée automatiquement un utilisateur par défaut :

* id : default-user
* name : Utilisateur
* email : [default@example.com](mailto:default@example.com)

Structure pédagogique à intégrer dans les données de la roadmap :

Phase 0 — Orientation et mentalité
Objectif : comprendre le rôle d’un ingénieur IA moderne.
Modules :

* Différence entre AI Engineer, ML Engineer et Data Scientist
* Marché de l’IA en 2026
* Compétences recherchées
* RAG, agents IA, LLMOps, orchestration multi-LLM, sécurité
* Comment utiliser la roadmap selon son niveau : débutant, intermédiaire, avancé
  Projets :
* Facile : établir son plan d’apprentissage personnel
* Moyen : analyser 5 offres d’emploi AI Engineer
* Difficile : concevoir une carte mentale complète du métier d’ingénieur IA

Phase 1 — Fondations Python
Objectif : écrire du Python propre et utilisable en production.
Modules :

* Variables, types, chaînes, listes, tuples, dictionnaires, sets
* Conditions, boucles, fonctions
* Programmation orientée objet
* Code pythonique
* Fichiers, JSON, CSV
* Gestion d’erreurs
* Logging et debugging
* Performance et mémoire
* NumPy
* Pandas
* Structure de projet
* Type hints
* Tests avec pytest
* Environnements virtuels
* Async/await, asyncio, httpx, aiohttp
  Projets :
* Facile : CLI IA en Python
* Moyen : appel asynchrone de plusieurs API IA
* Difficile : pipeline de données production-grade

Phase 2 — Mathématiques et statistiques pour l’IA
Objectif : comprendre les bases mathématiques utiles à l’IA.
Modules :

* Algèbre linéaire
* Vecteurs, matrices, produit scalaire
* Similarité cosinus
* Normes
* Valeurs propres
* SVD
* Calcul différentiel
* Gradient
* Jacobienne, Hessienne
* Probabilités
* Théorème de Bayes
* Variables aléatoires
* Distributions
* Espérance, variance
* MLE, MAP
* Entropie, cross-entropy, KL divergence
* Optimisation
* Descente de gradient
* Adam, RMSProp, SGD
* Régularisation
  Projets :
* Facile : moteur de recherche par similarité cosinus
* Moyen : visualiseur de descente de gradient
* Difficile : réseau de neurones from scratch en NumPy

Phase 3 — Machine Learning fondamental
Objectif : maîtriser les bases du ML classique.
Modules :

* Supervisé, non supervisé, reinforcement learning
* Train / validation / test
* Overfitting et underfitting
* Bias-variance tradeoff
* Cross-validation
* Régression linéaire
* Régression logistique
* Arbres de décision
* Random Forest
* XGBoost, LightGBM
* K-Means
* DBSCAN
* PCA
* t-SNE, UMAP
* Hyperparameter tuning
* Scikit-learn pipelines
* GridSearchCV
* Sauvegarde de modèles
  Projets :
* Facile : classifieur spam
* Moyen : prédiction de churn client
* Difficile : mini-framework AutoML

Phase 4 — Deep Learning
Objectif : comprendre les réseaux de neurones avant les transformers.
Modules :

* Perceptron, MLP
* Fonctions d’activation : ReLU, GELU, sigmoid, tanh
* Forward pass
* Backpropagation
* Initialisation des poids
* BatchNorm, LayerNorm
* Dropout
* Residual connections
* CNN
* RNN, LSTM, GRU
* Attention avant transformer
* PyTorch
* Dataset, DataLoader
* Training loop
* GPU
* Transfer learning
  Projets :
* Facile : classifieur d’images avec transfer learning
* Moyen : sentiment analysis LSTM vs BERT
* Difficile : mini GPT from scratch

Phase 5 — NLP et Transformers
Objectif : maîtriser les bases du traitement du langage et des transformers.
Modules :

* Tokenisation
* Prétraitement texte
* Bag of Words
* TF-IDF
* Word2Vec
* GloVe
* FastText
* BPE, WordPiece, SentencePiece
* Architecture Transformer
* Self-attention
* Q, K, V
* Multi-head attention
* Positional encoding
* Encoder, decoder, encoder-decoder
* Causal masking
* Language modeling
* Perplexity
* Temperature, top-k, top-p
* BLEU, ROUGE, BERTScore
* Hugging Face Transformers
* spaCy
* NLTK
* sentence-transformers
  Projets :
* Facile : pipeline NER
* Moyen : moteur de recherche sémantique
* Difficile : fine-tuning BERT multi-label

Phase 6 — LLM Engineering
Objectif : savoir construire des produits autour des grands modèles de langage.
Modules :

* Fonctionnement des LLM
* Context window
* KV cache
* Tokenisation
* RoPE, ALiBi
* Flash Attention
* GQA
* Pretraining
* Instruction tuning
* RLHF
* DPO
* Prompt engineering
* System prompt
* Few-shot prompting
* Structured output
* JSON mode
* Prompt chaining
* Prompt injection defense
* OpenAI API
* Anthropic API
* Gemini API
* Mistral API
* Groq
* Ollama
* Rate limits
* Streaming
* SSE
* Token counting
* Cost tracking
* Fallback
* Sécurité des clés API
  Projets :
* Facile : chatbot multi-provider
* Moyen : analyseur de CV par IA
* Difficile : middleware IA de production

Phase 7 — Orchestration multi-LLM
Objectif : concevoir des systèmes multi-modèles robustes.
Modules :

* Pourquoi utiliser plusieurs LLM
* Routing par type de tâche
* Routing par coût
* Routing par latence
* Routing par qualité
* Fallback chain
* Circuit breaker
* Model Context Protocol
* LangChain
* LangGraph
* LlamaIndex
* CrewAI
* AutoGen
* Gateway multi-LLM
* Provider abstraction
* Token counter
* Cost tracker
* Response validator
* Observabilité
  Projets :
* Facile : dashboard comparatif de réponses LLM
* Moyen : routeur intelligent multi-LLM
* Difficile : plateforme complète d’orchestration multi-LLM

Phase 8 — RAG et bases vectorielles
Objectif : construire des systèmes donnant accès à une base de connaissance privée.
Modules :

* Embeddings
* Chunking
* Vector databases
* FAISS
* Pinecone
* Weaviate
* Qdrant
* pgvector
* Similarity search
* Hybrid search
* Reranking
* HyDE
* Query expansion
* Metadata filtering
* Evaluation RAG
* Hallucination reduction
* Citations et sources
  Projets :
* Facile : Q&A sur documents PDF
* Moyen : RAG avec reranking
* Difficile : système RAG production-grade

Phase 9 — Agents IA et systèmes agentiques
Objectif : créer des agents capables de raisonner, utiliser des outils et accomplir des tâches.
Modules :

* Agent vs chatbot
* Tool calling
* ReAct
* Plan-and-execute
* Mémoire court terme
* Mémoire long terme
* Agents autonomes
* Human-in-the-loop
* Multi-agent systems
* Sandboxing
* Sécurité
* Limites des agents
  Projets :
* Facile : agent avec outils simples
* Moyen : agent de recherche web
* Difficile : système multi-agent complet

Phase 10 — Fine-tuning
Objectif : adapter les modèles à des tâches spécifiques.
Modules :

* Fine-tuning complet
* LoRA
* QLoRA
* PEFT
* Instruction tuning
* Dataset preparation
* Data cleaning
* SFT
* DPO
* RLHF
* Evaluation fine-tuning
* Hugging Face Trainer
* Weights & Biases
* Model registry
  Projets :
* Facile : fine-tuning d’un petit modèle de classification
* Moyen : LoRA sur modèle open-source
* Difficile : pipeline complet de fine-tuning

Phase 11 — IA générative multimodale
Objectif : comprendre et exploiter les modèles génératifs texte, image, audio et vidéo.
Modules :

* Diffusion models
* Stable Diffusion
* ControlNet
* Image generation
* Vision-language models
* Speech-to-text
* Text-to-speech
* Video generation
* Multimodal prompting
* Evaluation multimodale
  Projets :
* Facile : générateur d’images prompté
* Moyen : application vision + texte
* Difficile : pipeline multimodal complet

Phase 12 — MLOps et LLMOps
Objectif : déployer, monitorer et maintenir des systèmes IA en production.
Modules :

* Docker
* CI/CD
* Kubernetes
* Monitoring
* Logs
* Traces
* Metrics
* Prometheus
* Grafana
* LangSmith
* OpenTelemetry
* Model versioning
* Prompt versioning
* A/B testing
* Rollback
* Rate limiting
* Observability LLM
* Evaluation continue
  Projets :
* Facile : dockeriser une API IA
* Moyen : monitoring d’une application LLM
* Difficile : pipeline LLMOps complet

Phase 13 — AI System Design
Objectif : savoir concevoir des architectures IA solides.
Modules :

* Design d’un chatbot IA
* Design d’un RAG d’entreprise
* Design d’un assistant de code
* Design d’un moteur de recherche IA
* Design d’un agent autonome
* Scalabilité
* Latence
* Coût
* Résilience
* Sécurité
* Architecture event-driven
* Files de messages
* Caching
* Sharding
* Rate limiting
  Projets :
* Facile : schéma d’architecture IA
* Moyen : API design d’un produit IA
* Difficile : system design complet interview-ready

Phase 14 — SQL et pgvector
Objectif : maîtriser les bases de données pour applications IA.
Modules :

* SQL
* PostgreSQL
* Index
* Joins
* Transactions
* Prisma
* pgvector
* Embeddings en base
* Recherche vectorielle
* Hybrid search SQL + vector
* Optimisation requêtes
  Projets :
* Facile : base SQL de suivi IA
* Moyen : moteur de recherche pgvector
* Difficile : backend IA avec PostgreSQL + pgvector

Phase 15 — Quantization et optimisation
Objectif : optimiser le coût, la vitesse et la mémoire des modèles.
Modules :

* Quantization
* INT8, INT4
* GGUF
* llama.cpp
* Ollama
* vLLM
* TensorRT-LLM
* Batching
* KV cache
* Speculative decoding
* Distillation
* Small Language Models
* Déploiement local
  Projets :
* Facile : exécuter un modèle local avec Ollama
* Moyen : comparer latence/coût de plusieurs modèles
* Difficile : serveur d’inférence optimisé

Phase 16 — Reinforcement Learning
Objectif : comprendre les bases du RL et son lien avec les LLM.
Modules :

* Agent, environnement, état, action, récompense
* Q-learning
* Policy gradient
* PPO
* RLHF
* DPO
* Reward model
* Preference learning
* Evaluation
  Projets :
* Facile : environnement RL simple
* Moyen : agent RL sur gymnasium
* Difficile : simulation de RLHF simplifiée

Phase 17 — Éthique, sécurité et gouvernance IA
Objectif : construire des systèmes IA responsables et fiables.
Modules :

* Biais
* Fairness
* Privacy
* Sécurité
* Prompt injection
* Jailbreak
* Data leakage
* Hallucination
* Évaluation humaine
* Red teaming
* Gouvernance
* Conformité
* Documentation modèle
* Model cards
* Risk assessment
  Projets :
* Facile : checklist sécurité IA
* Moyen : filtre anti-prompt injection
* Difficile : dashboard de gouvernance IA

Capstone final — Plateforme IA complète
Objectif : construire une architecture complète combinant :

* Authentification
* Dashboard utilisateur
* Roadmap
* Suivi de progression
* Système multi-LLM
* RAG
* Agents
* Monitoring
* Cost tracking
* Sécurité
* Observabilité
  Projet final :
* Construire une plateforme IA complète avec dashboard, API, base de données, suivi de coûts, routage LLM, système RAG, agents et monitoring.

Pages obligatoires :

1. Page d’accueil
   Contenu :

* Titre : “Deviens ingénieur IA étape par étape”
* Sous-titre expliquant la roadmap
* Bouton “Commencer la roadmap”
* Bouton “Voir ma progression”
* Présentation des 17 phases + capstone
* Mise en avant du système XP, niveaux, streak et badges
* Design premium, sérieux, moderne

2. Dashboard
   Contenu :

* Progression globale en pourcentage
* Phase actuelle
* XP total
* Niveau actuel
* Streak actuel
* Meilleur streak
* Nombre de tâches terminées
* Nombre de projets validés
* Objectif quotidien
* Activité récente
* Graphique d’activité des 7 ou 30 derniers jours
* Bouton “Reprendre ma progression”

3. Page Roadmap
   Contenu :

* Liste des phases de 0 à 17 + capstone
* Chaque phase sous forme de carte
* Statut : verrouillée, disponible, en cours, terminée
* Barre de progression par phase
* Nombre de modules
* Nombre de tâches
* Nombre de projets
* Difficulté estimée
* Temps estimé
* Bouton vers le détail de la phase

4. Page détail d’une phase
   Contenu :

* Titre
* Objectif
* Description
* Modules
* Tâches à cocher
* Projets facile, moyen, difficile
* Ressources recommandées
* Progression de la phase
* Notes personnelles si possible
* Bouton “Marquer la phase comme terminée” si les conditions sont remplies

5. Page Projets
   Contenu :

* Tous les projets classés par phase
* Filtres :

  * facile
  * moyen
  * difficile
  * non commencé
  * en cours
  * terminé
* Chaque projet doit afficher :

  * objectif
  * stack suggérée
  * livrables attendus
  * critères de validation
  * bouton “Commencer”
  * bouton “Valider le projet”

6. Page Progression
   Contenu :

* Vue détaillée de la progression
* Calendrier ou heatmap d’activité
* XP gagné par jour
* Phases terminées
* Badges débloqués
* Répartition par domaine :

  * Python
  * Maths
  * ML
  * Deep Learning
  * NLP
  * LLM
  * RAG
  * Agents
  * MLOps
  * Sécurité

7. Page Badges
   Contenu :

* Liste des badges verrouillés et débloqués
* Badges obligatoires :

  * Premier pas : première tâche terminée
  * Sérieux : 7 jours de streak
  * Machine : 30 jours de streak
  * Pythoniste : phase Python terminée
  * Math solide : phase maths terminée
  * Builder : premier projet terminé
  * Architecte IA : phase system design terminée
  * Expert LLM : phase LLM Engineering terminée
  * Agent Builder : phase Agents terminée
  * Finisher : roadmap terminée
  * Capstone Master : capstone validé

8. Page Paramètres
   Contenu :

* Choisir l’objectif quotidien : 1, 3 ou 5 tâches par jour
* Choisir le profil :

  * débutant
  * intermédiaire
  * avancé
* Réinitialiser la progression
* Exporter la progression en JSON
* Importer une progression JSON si possible
* Thème clair/sombre si possible

9. Page Crédits / Licence
   Contenu :

* Mentionner que l’application est créer par Redouane EL BADAOUI en open build sur GitHub “devenir-ingenieur-ia"
* Mentionner la licence MIT si du contenu est réutilisé ou adapté


Gamification à implémenter :

XP :

* Tâche simple terminée : +10 XP
* Module terminé : +25 XP
* Phase terminée : +100 XP
* Projet facile terminé : +75 XP
* Projet moyen terminé : +150 XP
* Projet difficile terminé : +300 XP
* Capstone terminé : +1000 XP
* Objectif quotidien atteint : +30 XP bonus

Niveaux :

* Niveau 1 : 0 XP
* Niveau 2 : 100 XP
* Niveau 3 : 250 XP
* Niveau 4 : 500 XP
* Niveau 5 : 900 XP
* Niveau 6 : 1400 XP
* Niveau 7 : 2000 XP
* Niveau 8 : 2800 XP
* Niveau 9 : 3800 XP
* Niveau 10 : 5000 XP
  Après le niveau 10, utiliser une formule progressive.

Streak :

* Le streak augmente si l’utilisateur termine au moins une vraie tâche dans la journée.
* Une tâche déjà cochée puis décochée/recochée ne doit pas permettre d’abuser du système.
* Le meilleur streak doit être sauvegardé.
* Afficher :

  * streak actuel
  * meilleur streak
  * dernière journée active
  * objectif quotidien atteint ou non

Progression :

* La progression globale doit être calculée à partir des tâches, modules et projets terminés.
* Une phase est terminée seulement si toutes ses tâches principales sont terminées et au moins un projet est validé.
* Le capstone se débloque quand l’utilisateur a terminé la majorité des phases.
* Prévoir une option pour afficher toutes les phases même si elles sont verrouillées.

Règles anti-abus :

* Ne pas redonner de l’XP si une tâche déjà récompensée est recochée.
* Stocker `xpAwarded` pour chaque tâche/projet.
* Créer un ActivityLog pour chaque vraie action.
* La progression doit rester cohérente après refresh.

Design attendu :

* Style dashboard SaaS moderne
* Sérieux, premium, propre
* Responsive mobile et desktop
* Fond sombre recommandé
* Couleurs :

  * fond : #0F172A
  * cartes : #111827 ou #1E293B
  * accent : bleu, violet ou cyan
  * succès : vert
  * avertissement : orange
* Barres de progression visibles
* Cartes bien espacées
* Icônes propres
* Typographie lisible
* Ne pas surcharger l’écran
* L’utilisateur doit comprendre immédiatement où il en est

Composants à créer :

* AppShell
* Sidebar
* Header
* ProgressBar
* PhaseCard
* TaskCheckbox
* ProjectCard
* BadgeCard
* StatCard
* StreakWidget
* LevelWidget
* ActivityHeatmap
* RoadmapTimeline
* DailyGoalCard
* EmptyState
* ConfirmResetModal

Fonctionnalités interactives indispensables :

* Cocher / décocher une tâche
* Gagner de l’XP
* Mettre à jour le niveau
* Mettre à jour la progression globale
* Mettre à jour la progression de chaque phase
* Mettre à jour le streak
* Valider un projet
* Débloquer des badges
* Voir les statistiques évoluer
* Sauvegarder en base PostgreSQL
* Reprendre là où l’utilisateur s’est arrêté
* Exporter la progression
* Réinitialiser proprement la progression

Qualité du code :

* TypeScript strict
* Code propre
* Pas de fichiers énormes
* Types clairs
* Séparer :

  * données
  * logique métier
  * composants UI
  * accès base de données
  * pages
* Fonctions pures pour :

  * calcul XP
  * calcul niveau
  * calcul progression
  * calcul streak
  * calcul badges
* Pas de TODO bloquant
* Pas de bouton sans action réelle
* Pas d’erreur TypeScript
* Pas d’erreur ESLint bloquante
* Build Vercel valide

README obligatoire :
Créer ou mettre à jour un README clair avec :

* présentation du projet
* stack utilisée
* installation locale
* configuration PostgreSQL
* variables d’environnement
* commandes Prisma
* déploiement Vercel
* connexion Neon/Supabase/Vercel Postgres
* crédits et licence

Commandes attendues :

* npm install
* npx prisma generate
* npx prisma db push
* npm run dev
* npm run build

Critères de validation finale :
À la fin, je veux pouvoir :

1. installer les dépendances
2. configurer DATABASE_URL
3. générer Prisma
4. pousser le schéma en base
5. lancer l’app en local
6. ouvrir la page d’accueil
7. consulter le dashboard
8. voir la roadmap complète en français
9. ouvrir une phase
10. cocher des tâches
11. voir l’XP évoluer
12. voir le niveau évoluer
13. voir le streak évoluer
14. valider un projet
15. débloquer des badges
16. consulter la progression
17. exporter ou réinitialiser ma progression
18. déployer sur Vercel sans erreur

Priorité :
Fais d’abord un MVP complet, solide et fonctionnel.
Ensuite améliore le design.
Ne fais pas seulement une maquette.
Ne donne pas seulement des explications.
Crée et modifie les fichiers nécessaires.

À la fin de ton travail, donne-moi :

* la liste des fichiers créés/modifiés
* les commandes à lancer
* les variables d’environnement à mettre sur Vercel
* les étapes de déploiement Vercel
* les fonctionnalités terminées
* les limites éventuelles
* les améliorations possibles

Commence maintenant par analyser le projet, puis implémente cette webapp complète compatible Vercel.
# Devenir-ingenieur-IA
Road map interactive pour devenir AI Engineer sur le marché actuel 



prompt . 

Tu es un ingénieur full-stack senior spécialisé en Next.js, TypeScript, Prisma, PostgreSQL, Vercel, UX produit, gamification et applications éducatives.

Je veux créer une webapp interactive en français inspirée du dépôt GitHub suivant :

https://github.com/PrinceSinghhub/Ultimate-AI-Engineer-Roadmap-2026

Objectif général :
Transformer cette roadmap “Ultimate AI Engineer Roadmap 2026” en une application web moderne, interactive, gamifiée, entièrement en français, permettant à un utilisateur de suivre sa progression pour devenir ingénieur IA.

Le dépôt d’origine contient une roadmap structurée en 17 phases + un capstone final, avec 3 projets par phase : facile, moyen, difficile. Je veux reprendre cette logique, mais l’adapter proprement en français, avec une vraie webapp, pas une simple page statique.

Très important :

* L’application doit tourner parfaitement sur Vercel.
* Ne pas utiliser SQLite comme base principale.
* Utiliser PostgreSQL avec Prisma.
* L’application doit être compatible avec Vercel Postgres.
* Prévoir les variables d’environnement nécessaires pour Vercel.
* Le build Vercel doit passer sans erreur.
* Tout le texte visible par l’utilisateur doit être en français.
* Ne fais pas une simple copie du README.
* Crée une vraie application fonctionnelle.
* Le code doit être propre, maintenable, responsive et prêt à déployer.
* Si du contenu est repris ou adapté du dépôt d’origine, ajoute une page “Crédits / Licence” mentionnant l’inspiration et la licence MIT.

Nom du projet :
Rouky

Positionnement du produit :
Créer une plateforme d’apprentissage sérieuse, moderne et gamifiée pour devenir ingénieur IA en 2026. L’utilisateur doit pouvoir :

* suivre une roadmap complète,
* voir sa progression globale,
* cocher des tâches,
* valider des projets,
* gagner de l’XP,
* monter de niveau,
* conserver un streak quotidien,
* débloquer des badges,
* consulter ses statistiques,
* reprendre exactement là où il s’est arrêté.

Stack technique obligatoire :

* Next.js avec App Router
* TypeScript
* Tailwind CSS
* Prisma
* PostgreSQL
* Compatible Vercel
* lucide-react pour les icônes
* Recharts ou équivalent pour les graphiques
* date-fns pour les dates
* shadcn/ui si disponible
* Auth.js / NextAuth uniquement si tu peux l’intégrer proprement sans complexifier inutilement
* Sinon, crée une version mono-utilisateur avec un `defaultUser`, mais structure le code pour ajouter l’authentification plus tard

Base de données :
Utiliser PostgreSQL avec Prisma.

Ne pas utiliser SQLite en production.
Ne pas stocker la progression dans des fichiers locaux.
Ne pas dépendre d’un stockage non persistant incompatible avec Vercel.

Variables d’environnement à prévoir :

* DATABASE_URL
* NEXTAUTH_SECRET si Auth.js est utilisé
* NEXTAUTH_URL si Auth.js est utilisé

Créer un fichier `.env.example` clair.

Le projet doit pouvoir tourner ainsi en local :

1. npm install
2. configurer DATABASE_URL dans `.env`
3. npx prisma generate
4. npx prisma db push
5. npm run dev

Le projet doit pouvoir être déployé sur Vercel ainsi :

1. connecter le repo GitHub à Vercel
2. créer une base PostgreSQL sur Vercel Postgres
3. ajouter DATABASE_URL dans les variables d’environnement Vercel
4. lancer le build
5. déployer sans erreur

Le script package.json doit être compatible Vercel :

* `build` doit inclure `prisma generate && next build` si nécessaire
* le build ne doit pas échouer à cause de Prisma
* les pages ne doivent pas dépendre d’un accès serveur impossible au moment du build

Architecture de fichiers souhaitée :

* app/

  * page.tsx
  * dashboard/page.tsx
  * roadmap/page.tsx
  * roadmap/[phaseId]/page.tsx
  * projects/page.tsx
  * progress/page.tsx
  * badges/page.tsx
  * settings/page.tsx
  * credits/page.tsx
* components/

  * layout/
  * roadmap/
  * progress/
  * gamification/
  * ui/
* lib/

  * roadmap-data.ts
  * gamification.ts
  * progress.ts
  * streak.ts
  * badges.ts
  * prisma.ts
  * utils.ts
* prisma/

  * schema.prisma
  * seed.ts
* types/

  * roadmap.ts
  * progress.ts

Modèles Prisma attendus :
User :

* id
* name
* email
* createdAt
* updatedAt

UserProgress :

* id
* userId
* xp
* level
* currentStreak
* bestStreak
* lastActiveDate
* dailyGoal
* profileLevel
* createdAt
* updatedAt

PhaseProgress :

* id
* userId
* phaseId
* status
* progressPercent
* completedAt
* createdAt
* updatedAt

TaskProgress :

* id
* userId
* taskId
* completed
* completedAt
* xpAwarded
* createdAt
* updatedAt

ProjectProgress :

* id
* userId
* projectId
* status
* startedAt
* completedAt
* xpAwarded
* createdAt
* updatedAt

ActivityLog :

* id
* userId
* date
* type
* xp
* metadata
* createdAt

BadgeProgress :

* id
* userId
* badgeId
* unlocked
* unlockedAt
* createdAt
* updatedAt

Si l’authentification n’est pas faite dans le MVP, crée automatiquement un utilisateur par défaut :

* id : default-user
* name : Utilisateur
* email : [default@example.com](mailto:default@example.com)

Structure pédagogique à intégrer dans les données de la roadmap :

Phase 0 — Orientation et mentalité
Objectif : comprendre le rôle d’un ingénieur IA moderne.
Modules :

* Différence entre AI Engineer, ML Engineer et Data Scientist
* Marché de l’IA en 2026
* Compétences recherchées
* RAG, agents IA, LLMOps, orchestration multi-LLM, sécurité
* Comment utiliser la roadmap selon son niveau : débutant, intermédiaire, avancé
  Projets :
* Facile : établir son plan d’apprentissage personnel
* Moyen : analyser 5 offres d’emploi AI Engineer
* Difficile : concevoir une carte mentale complète du métier d’ingénieur IA

Phase 1 — Fondations Python
Objectif : écrire du Python propre et utilisable en production.
Modules :

* Variables, types, chaînes, listes, tuples, dictionnaires, sets
* Conditions, boucles, fonctions
* Programmation orientée objet
* Code pythonique
* Fichiers, JSON, CSV
* Gestion d’erreurs
* Logging et debugging
* Performance et mémoire
* NumPy
* Pandas
* Structure de projet
* Type hints
* Tests avec pytest
* Environnements virtuels
* Async/await, asyncio, httpx, aiohttp
  Projets :
* Facile : CLI IA en Python
* Moyen : appel asynchrone de plusieurs API IA
* Difficile : pipeline de données production-grade

Phase 2 — Mathématiques et statistiques pour l’IA
Objectif : comprendre les bases mathématiques utiles à l’IA.
Modules :

* Algèbre linéaire
* Vecteurs, matrices, produit scalaire
* Similarité cosinus
* Normes
* Valeurs propres
* SVD
* Calcul différentiel
* Gradient
* Jacobienne, Hessienne
* Probabilités
* Théorème de Bayes
* Variables aléatoires
* Distributions
* Espérance, variance
* MLE, MAP
* Entropie, cross-entropy, KL divergence
* Optimisation
* Descente de gradient
* Adam, RMSProp, SGD
* Régularisation
  Projets :
* Facile : moteur de recherche par similarité cosinus
* Moyen : visualiseur de descente de gradient
* Difficile : réseau de neurones from scratch en NumPy

Phase 3 — Machine Learning fondamental
Objectif : maîtriser les bases du ML classique.
Modules :

* Supervisé, non supervisé, reinforcement learning
* Train / validation / test
* Overfitting et underfitting
* Bias-variance tradeoff
* Cross-validation
* Régression linéaire
* Régression logistique
* Arbres de décision
* Random Forest
* XGBoost, LightGBM
* K-Means
* DBSCAN
* PCA
* t-SNE, UMAP
* Hyperparameter tuning
* Scikit-learn pipelines
* GridSearchCV
* Sauvegarde de modèles
  Projets :
* Facile : classifieur spam
* Moyen : prédiction de churn client
* Difficile : mini-framework AutoML

Phase 4 — Deep Learning
Objectif : comprendre les réseaux de neurones avant les transformers.
Modules :

* Perceptron, MLP
* Fonctions d’activation : ReLU, GELU, sigmoid, tanh
* Forward pass
* Backpropagation
* Initialisation des poids
* BatchNorm, LayerNorm
* Dropout
* Residual connections
* CNN
* RNN, LSTM, GRU
* Attention avant transformer
* PyTorch
* Dataset, DataLoader
* Training loop
* GPU
* Transfer learning
  Projets :
* Facile : classifieur d’images avec transfer learning
* Moyen : sentiment analysis LSTM vs BERT
* Difficile : mini GPT from scratch

Phase 5 — NLP et Transformers
Objectif : maîtriser les bases du traitement du langage et des transformers.
Modules :

* Tokenisation
* Prétraitement texte
* Bag of Words
* TF-IDF
* Word2Vec
* GloVe
* FastText
* BPE, WordPiece, SentencePiece
* Architecture Transformer
* Self-attention
* Q, K, V
* Multi-head attention
* Positional encoding
* Encoder, decoder, encoder-decoder
* Causal masking
* Language modeling
* Perplexity
* Temperature, top-k, top-p
* BLEU, ROUGE, BERTScore
* Hugging Face Transformers
* spaCy
* NLTK
* sentence-transformers
  Projets :
* Facile : pipeline NER
* Moyen : moteur de recherche sémantique
* Difficile : fine-tuning BERT multi-label

Phase 6 — LLM Engineering
Objectif : savoir construire des produits autour des grands modèles de langage.
Modules :

* Fonctionnement des LLM
* Context window
* KV cache
* Tokenisation
* RoPE, ALiBi
* Flash Attention
* GQA
* Pretraining
* Instruction tuning
* RLHF
* DPO
* Prompt engineering
* System prompt
* Few-shot prompting
* Structured output
* JSON mode
* Prompt chaining
* Prompt injection defense
* OpenAI API
* Anthropic API
* Gemini API
* Mistral API
* Groq
* Ollama
* Rate limits
* Streaming
* SSE
* Token counting
* Cost tracking
* Fallback
* Sécurité des clés API
  Projets :
* Facile : chatbot multi-provider
* Moyen : analyseur de CV par IA
* Difficile : middleware IA de production

Phase 7 — Orchestration multi-LLM
Objectif : concevoir des systèmes multi-modèles robustes.
Modules :

* Pourquoi utiliser plusieurs LLM
* Routing par type de tâche
* Routing par coût
* Routing par latence
* Routing par qualité
* Fallback chain
* Circuit breaker
* Model Context Protocol
* LangChain
* LangGraph
* LlamaIndex
* CrewAI
* AutoGen
* Gateway multi-LLM
* Provider abstraction
* Token counter
* Cost tracker
* Response validator
* Observabilité
  Projets :
* Facile : dashboard comparatif de réponses LLM
* Moyen : routeur intelligent multi-LLM
* Difficile : plateforme complète d’orchestration multi-LLM

Phase 8 — RAG et bases vectorielles
Objectif : construire des systèmes donnant accès à une base de connaissance privée.
Modules :

* Embeddings
* Chunking
* Vector databases
* FAISS
* Pinecone
* Weaviate
* Qdrant
* pgvector
* Similarity search
* Hybrid search
* Reranking
* HyDE
* Query expansion
* Metadata filtering
* Evaluation RAG
* Hallucination reduction
* Citations et sources
  Projets :
* Facile : Q&A sur documents PDF
* Moyen : RAG avec reranking
* Difficile : système RAG production-grade

Phase 9 — Agents IA et systèmes agentiques
Objectif : créer des agents capables de raisonner, utiliser des outils et accomplir des tâches.
Modules :

* Agent vs chatbot
* Tool calling
* ReAct
* Plan-and-execute
* Mémoire court terme
* Mémoire long terme
* Agents autonomes
* Human-in-the-loop
* Multi-agent systems
* Sandboxing
* Sécurité
* Limites des agents
  Projets :
* Facile : agent avec outils simples
* Moyen : agent de recherche web
* Difficile : système multi-agent complet

Phase 10 — Fine-tuning
Objectif : adapter les modèles à des tâches spécifiques.
Modules :

* Fine-tuning complet
* LoRA
* QLoRA
* PEFT
* Instruction tuning
* Dataset preparation
* Data cleaning
* SFT
* DPO
* RLHF
* Evaluation fine-tuning
* Hugging Face Trainer
* Weights & Biases
* Model registry
  Projets :
* Facile : fine-tuning d’un petit modèle de classification
* Moyen : LoRA sur modèle open-source
* Difficile : pipeline complet de fine-tuning

Phase 11 — IA générative multimodale
Objectif : comprendre et exploiter les modèles génératifs texte, image, audio et vidéo.
Modules :

* Diffusion models
* Stable Diffusion
* ControlNet
* Image generation
* Vision-language models
* Speech-to-text
* Text-to-speech
* Video generation
* Multimodal prompting
* Evaluation multimodale
  Projets :
* Facile : générateur d’images prompté
* Moyen : application vision + texte
* Difficile : pipeline multimodal complet

Phase 12 — MLOps et LLMOps
Objectif : déployer, monitorer et maintenir des systèmes IA en production.
Modules :

* Docker
* CI/CD
* Kubernetes
* Monitoring
* Logs
* Traces
* Metrics
* Prometheus
* Grafana
* LangSmith
* OpenTelemetry
* Model versioning
* Prompt versioning
* A/B testing
* Rollback
* Rate limiting
* Observability LLM
* Evaluation continue
  Projets :
* Facile : dockeriser une API IA
* Moyen : monitoring d’une application LLM
* Difficile : pipeline LLMOps complet

Phase 13 — AI System Design
Objectif : savoir concevoir des architectures IA solides.
Modules :

* Design d’un chatbot IA
* Design d’un RAG d’entreprise
* Design d’un assistant de code
* Design d’un moteur de recherche IA
* Design d’un agent autonome
* Scalabilité
* Latence
* Coût
* Résilience
* Sécurité
* Architecture event-driven
* Files de messages
* Caching
* Sharding
* Rate limiting
  Projets :
* Facile : schéma d’architecture IA
* Moyen : API design d’un produit IA
* Difficile : system design complet interview-ready

Phase 14 — SQL et pgvector
Objectif : maîtriser les bases de données pour applications IA.
Modules :

* SQL
* PostgreSQL
* Index
* Joins
* Transactions
* Prisma
* pgvector
* Embeddings en base
* Recherche vectorielle
* Hybrid search SQL + vector
* Optimisation requêtes
  Projets :
* Facile : base SQL de suivi IA
* Moyen : moteur de recherche pgvector
* Difficile : backend IA avec PostgreSQL + pgvector

Phase 15 — Quantization et optimisation
Objectif : optimiser le coût, la vitesse et la mémoire des modèles.
Modules :

* Quantization
* INT8, INT4
* GGUF
* llama.cpp
* Ollama
* vLLM
* TensorRT-LLM
* Batching
* KV cache
* Speculative decoding
* Distillation
* Small Language Models
* Déploiement local
  Projets :
* Facile : exécuter un modèle local avec Ollama
* Moyen : comparer latence/coût de plusieurs modèles
* Difficile : serveur d’inférence optimisé

Phase 16 — Reinforcement Learning
Objectif : comprendre les bases du RL et son lien avec les LLM.
Modules :

* Agent, environnement, état, action, récompense
* Q-learning
* Policy gradient
* PPO
* RLHF
* DPO
* Reward model
* Preference learning
* Evaluation
  Projets :
* Facile : environnement RL simple
* Moyen : agent RL sur gymnasium
* Difficile : simulation de RLHF simplifiée

Phase 17 — Éthique, sécurité et gouvernance IA
Objectif : construire des systèmes IA responsables et fiables.
Modules :

* Biais
* Fairness
* Privacy
* Sécurité
* Prompt injection
* Jailbreak
* Data leakage
* Hallucination
* Évaluation humaine
* Red teaming
* Gouvernance
* Conformité
* Documentation modèle
* Model cards
* Risk assessment
  Projets :
* Facile : checklist sécurité IA
* Moyen : filtre anti-prompt injection
* Difficile : dashboard de gouvernance IA

Capstone final — Plateforme IA complète
Objectif : construire une architecture complète combinant :

* Authentification
* Dashboard utilisateur
* Roadmap
* Suivi de progression
* Système multi-LLM
* RAG
* Agents
* Monitoring
* Cost tracking
* Sécurité
* Observabilité
  Projet final :
* Construire une plateforme IA complète avec dashboard, API, base de données, suivi de coûts, routage LLM, système RAG, agents et monitoring.

Pages obligatoires :

1. Page d’accueil
   Contenu :

* Titre : “Deviens ingénieur IA étape par étape”
* Sous-titre expliquant la roadmap
* Bouton “Commencer la roadmap”
* Bouton “Voir ma progression”
* Présentation des 17 phases + capstone
* Mise en avant du système XP, niveaux, streak et badges
* Design premium, sérieux, moderne

2. Dashboard
   Contenu :

* Progression globale en pourcentage
* Phase actuelle
* XP total
* Niveau actuel
* Streak actuel
* Meilleur streak
* Nombre de tâches terminées
* Nombre de projets validés
* Objectif quotidien
* Activité récente
* Graphique d’activité des 7 ou 30 derniers jours
* Bouton “Reprendre ma progression”

3. Page Roadmap
   Contenu :

* Liste des phases de 0 à 17 + capstone
* Chaque phase sous forme de carte
* Statut : verrouillée, disponible, en cours, terminée
* Barre de progression par phase
* Nombre de modules
* Nombre de tâches
* Nombre de projets
* Difficulté estimée
* Temps estimé
* Bouton vers le détail de la phase

4. Page détail d’une phase
   Contenu :

* Titre
* Objectif
* Description
* Modules
* Tâches à cocher
* Projets facile, moyen, difficile
* Ressources recommandées
* Progression de la phase
* Notes personnelles si possible
* Bouton “Marquer la phase comme terminée” si les conditions sont remplies

5. Page Projets
   Contenu :

* Tous les projets classés par phase
* Filtres :

  * facile
  * moyen
  * difficile
  * non commencé
  * en cours
  * terminé
* Chaque projet doit afficher :

  * objectif
  * stack suggérée
  * livrables attendus
  * critères de validation
  * bouton “Commencer”
  * bouton “Valider le projet”

6. Page Progression
   Contenu :

* Vue détaillée de la progression
* Calendrier ou heatmap d’activité
* XP gagné par jour
* Phases terminées
* Badges débloqués
* Répartition par domaine :

  * Python
  * Maths
  * ML
  * Deep Learning
  * NLP
  * LLM
  * RAG
  * Agents
  * MLOps
  * Sécurité

7. Page Badges
   Contenu :

* Liste des badges verrouillés et débloqués
* Badges obligatoires :

  * Premier pas : première tâche terminée
  * Sérieux : 7 jours de streak
  * Machine : 30 jours de streak
  * Pythoniste : phase Python terminée
  * Math solide : phase maths terminée
  * Builder : premier projet terminé
  * Architecte IA : phase system design terminée
  * Expert LLM : phase LLM Engineering terminée
  * Agent Builder : phase Agents terminée
  * Finisher : roadmap terminée
  * Capstone Master : capstone validé

8. Page Paramètres
   Contenu :

* Choisir l’objectif quotidien : 1, 3 ou 5 tâches par jour
* Choisir le profil :

  * débutant
  * intermédiaire
  * avancé
* Réinitialiser la progression
* Exporter la progression en JSON
* Importer une progression JSON si possible
* Thème clair/sombre si possible

9. Page Crédits / Licence
   Contenu :

* Mentionner que l’application est créer par Redouane EL BADAOUI en open build sur GitHub “devenir-ingenieur-ia"
* Mentionner la licence MIT si du contenu est réutilisé ou adapté


Gamification à implémenter :

XP :

* Tâche simple terminée : +10 XP
* Module terminé : +25 XP
* Phase terminée : +100 XP
* Projet facile terminé : +75 XP
* Projet moyen terminé : +150 XP
* Projet difficile terminé : +300 XP
* Capstone terminé : +1000 XP
* Objectif quotidien atteint : +30 XP bonus

Niveaux :

* Niveau 1 : 0 XP
* Niveau 2 : 100 XP
* Niveau 3 : 250 XP
* Niveau 4 : 500 XP
* Niveau 5 : 900 XP
* Niveau 6 : 1400 XP
* Niveau 7 : 2000 XP
* Niveau 8 : 2800 XP
* Niveau 9 : 3800 XP
* Niveau 10 : 5000 XP
  Après le niveau 10, utiliser une formule progressive.

Streak :

* Le streak augmente si l’utilisateur termine au moins une vraie tâche dans la journée.
* Une tâche déjà cochée puis décochée/recochée ne doit pas permettre d’abuser du système.
* Le meilleur streak doit être sauvegardé.
* Afficher :

  * streak actuel
  * meilleur streak
  * dernière journée active
  * objectif quotidien atteint ou non

Progression :

* La progression globale doit être calculée à partir des tâches, modules et projets terminés.
* Une phase est terminée seulement si toutes ses tâches principales sont terminées et au moins un projet est validé.
* Le capstone se débloque quand l’utilisateur a terminé la majorité des phases.
* Prévoir une option pour afficher toutes les phases même si elles sont verrouillées.

Règles anti-abus :

* Ne pas redonner de l’XP si une tâche déjà récompensée est recochée.
* Stocker `xpAwarded` pour chaque tâche/projet.
* Créer un ActivityLog pour chaque vraie action.
* La progression doit rester cohérente après refresh.

Design attendu :

* Style dashboard SaaS moderne
* Sérieux, premium, propre
* Responsive mobile et desktop
* Fond sombre recommandé
* Couleurs :

  * fond : #0F172A
  * cartes : #111827 ou #1E293B
  * accent : bleu, violet ou cyan
  * succès : vert
  * avertissement : orange
* Barres de progression visibles
* Cartes bien espacées
* Icônes propres
* Typographie lisible
* Ne pas surcharger l’écran
* L’utilisateur doit comprendre immédiatement où il en est

Composants à créer :

* AppShell
* Sidebar
* Header
* ProgressBar
* PhaseCard
* TaskCheckbox
* ProjectCard
* BadgeCard
* StatCard
* StreakWidget
* LevelWidget
* ActivityHeatmap
* RoadmapTimeline
* DailyGoalCard
* EmptyState
* ConfirmResetModal

Fonctionnalités interactives indispensables :

* Cocher / décocher une tâche
* Gagner de l’XP
* Mettre à jour le niveau
* Mettre à jour la progression globale
* Mettre à jour la progression de chaque phase
* Mettre à jour le streak
* Valider un projet
* Débloquer des badges
* Voir les statistiques évoluer
* Sauvegarder en base PostgreSQL
* Reprendre là où l’utilisateur s’est arrêté
* Exporter la progression
* Réinitialiser proprement la progression

Qualité du code :

* TypeScript strict
* Code propre
* Pas de fichiers énormes
* Types clairs
* Séparer :

  * données
  * logique métier
  * composants UI
  * accès base de données
  * pages
* Fonctions pures pour :

  * calcul XP
  * calcul niveau
  * calcul progression
  * calcul streak
  * calcul badges
* Pas de TODO bloquant
* Pas de bouton sans action réelle
* Pas d’erreur TypeScript
* Pas d’erreur ESLint bloquante
* Build Vercel valide

README obligatoire :
Créer ou mettre à jour un README clair avec :

* présentation du projet
* stack utilisée
* installation locale
* configuration PostgreSQL
* variables d’environnement
* commandes Prisma
* déploiement Vercel
* connexion Neon/Supabase/Vercel Postgres
* crédits et licence

Commandes attendues :

* npm install
* npx prisma generate
* npx prisma db push
* npm run dev
* npm run build

Critères de validation finale :
À la fin, je veux pouvoir :

1. installer les dépendances
2. configurer DATABASE_URL
3. générer Prisma
4. pousser le schéma en base
5. lancer l’app en local
6. ouvrir la page d’accueil
7. consulter le dashboard
8. voir la roadmap complète en français
9. ouvrir une phase
10. cocher des tâches
11. voir l’XP évoluer
12. voir le niveau évoluer
13. voir le streak évoluer
14. valider un projet
15. débloquer des badges
16. consulter la progression
17. exporter ou réinitialiser ma progression
18. déployer sur Vercel sans erreur

Priorité :
Fais d’abord un MVP complet, solide et fonctionnel.
Ensuite améliore le design.
Ne fais pas seulement une maquette.
Ne donne pas seulement des explications.
Crée et modifie les fichiers nécessaires.

À la fin de ton travail, donne-moi :

* la liste des fichiers créés/modifiés
* les commandes à lancer
* les variables d’environnement à mettre sur Vercel
* les étapes de déploiement Vercel
* les fonctionnalités terminées
* les limites éventuelles
* les améliorations possibles

Commence maintenant par analyser le projet, puis implémente cette webapp complète compatible Vercel.
# Devenir-ingenieur-IA
Road map interactive pour devenir AI Engineer sur le marché actuel 



prompt . 

Tu es un ingénieur full-stack senior spécialisé en Next.js, TypeScript, Prisma, PostgreSQL, Vercel, UX produit, gamification et applications éducatives.

Je veux créer une webapp interactive en français inspirée du dépôt GitHub suivant :

https://github.com/PrinceSinghhub/Ultimate-AI-Engineer-Roadmap-2026

Objectif général :
Transformer cette roadmap “Ultimate AI Engineer Roadmap 2026” en une application web moderne, interactive, gamifiée, entièrement en français, permettant à un utilisateur de suivre sa progression pour devenir ingénieur IA.

Le dépôt d’origine contient une roadmap structurée en 17 phases + un capstone final, avec 3 projets par phase : facile, moyen, difficile. Je veux reprendre cette logique, mais l’adapter proprement en français, avec une vraie webapp, pas une simple page statique.

Très important :

* L’application doit tourner parfaitement sur Vercel.
* Ne pas utiliser SQLite comme base principale.
* Utiliser PostgreSQL avec Prisma.
* L’application doit être compatible avec Vercel Postgres.
* Prévoir les variables d’environnement nécessaires pour Vercel.
* Le build Vercel doit passer sans erreur.
* Tout le texte visible par l’utilisateur doit être en français.
* Ne fais pas une simple copie du README.
* Crée une vraie application fonctionnelle.
* Le code doit être propre, maintenable, responsive et prêt à déployer.
* Si du contenu est repris ou adapté du dépôt d’origine, ajoute une page “Crédits / Licence” mentionnant l’inspiration et la licence MIT.

Nom du projet :
Rouky

Positionnement du produit :
Créer une plateforme d’apprentissage sérieuse, moderne et gamifiée pour devenir ingénieur IA en 2026. L’utilisateur doit pouvoir :

* suivre une roadmap complète,
* voir sa progression globale,
* cocher des tâches,
* valider des projets,
* gagner de l’XP,
* monter de niveau,
* conserver un streak quotidien,
* débloquer des badges,
* consulter ses statistiques,
* reprendre exactement là où il s’est arrêté.

Stack technique obligatoire :

* Next.js avec App Router
* TypeScript
* Tailwind CSS
* Prisma
* PostgreSQL
* Compatible Vercel
* lucide-react pour les icônes
* Recharts ou équivalent pour les graphiques
* date-fns pour les dates
* shadcn/ui si disponible
* Auth.js / NextAuth uniquement si tu peux l’intégrer proprement sans complexifier inutilement
* Sinon, crée une version mono-utilisateur avec un `defaultUser`, mais structure le code pour ajouter l’authentification plus tard

Base de données :
Utiliser PostgreSQL avec Prisma.

Ne pas utiliser SQLite en production.
Ne pas stocker la progression dans des fichiers locaux.
Ne pas dépendre d’un stockage non persistant incompatible avec Vercel.

Variables d’environnement à prévoir :

* DATABASE_URL
* NEXTAUTH_SECRET si Auth.js est utilisé
* NEXTAUTH_URL si Auth.js est utilisé

Créer un fichier `.env.example` clair.

Le projet doit pouvoir tourner ainsi en local :

1. npm install
2. configurer DATABASE_URL dans `.env`
3. npx prisma generate
4. npx prisma db push
5. npm run dev

Le projet doit pouvoir être déployé sur Vercel ainsi :

1. connecter le repo GitHub à Vercel
2. créer une base PostgreSQL sur Vercel Postgres
3. ajouter DATABASE_URL dans les variables d’environnement Vercel
4. lancer le build
5. déployer sans erreur

Le script package.json doit être compatible Vercel :

* `build` doit inclure `prisma generate && next build` si nécessaire
* le build ne doit pas échouer à cause de Prisma
* les pages ne doivent pas dépendre d’un accès serveur impossible au moment du build

Architecture de fichiers souhaitée :

* app/

  * page.tsx
  * dashboard/page.tsx
  * roadmap/page.tsx
  * roadmap/[phaseId]/page.tsx
  * projects/page.tsx
  * progress/page.tsx
  * badges/page.tsx
  * settings/page.tsx
  * credits/page.tsx
* components/

  * layout/
  * roadmap/
  * progress/
  * gamification/
  * ui/
* lib/

  * roadmap-data.ts
  * gamification.ts
  * progress.ts
  * streak.ts
  * badges.ts
  * prisma.ts
  * utils.ts
* prisma/

  * schema.prisma
  * seed.ts
* types/

  * roadmap.ts
  * progress.ts

Modèles Prisma attendus :
User :

* id
* name
* email
* createdAt
* updatedAt

UserProgress :

* id
* userId
* xp
* level
* currentStreak
* bestStreak
* lastActiveDate
* dailyGoal
* profileLevel
* createdAt
* updatedAt

PhaseProgress :

* id
* userId
* phaseId
* status
* progressPercent
* completedAt
* createdAt
* updatedAt

TaskProgress :

* id
* userId
* taskId
* completed
* completedAt
* xpAwarded
* createdAt
* updatedAt

ProjectProgress :

* id
* userId
* projectId
* status
* startedAt
* completedAt
* xpAwarded
* createdAt
* updatedAt

ActivityLog :

* id
* userId
* date
* type
* xp
* metadata
* createdAt

BadgeProgress :

* id
* userId
* badgeId
* unlocked
* unlockedAt
* createdAt
* updatedAt

Si l’authentification n’est pas faite dans le MVP, crée automatiquement un utilisateur par défaut :

* id : default-user
* name : Utilisateur
* email : [default@example.com](mailto:default@example.com)

Structure pédagogique à intégrer dans les données de la roadmap :

Phase 0 — Orientation et mentalité
Objectif : comprendre le rôle d’un ingénieur IA moderne.
Modules :

* Différence entre AI Engineer, ML Engineer et Data Scientist
* Marché de l’IA en 2026
* Compétences recherchées
* RAG, agents IA, LLMOps, orchestration multi-LLM, sécurité
* Comment utiliser la roadmap selon son niveau : débutant, intermédiaire, avancé
  Projets :
* Facile : établir son plan d’apprentissage personnel
* Moyen : analyser 5 offres d’emploi AI Engineer
* Difficile : concevoir une carte mentale complète du métier d’ingénieur IA

Phase 1 — Fondations Python
Objectif : écrire du Python propre et utilisable en production.
Modules :

* Variables, types, chaînes, listes, tuples, dictionnaires, sets
* Conditions, boucles, fonctions
* Programmation orientée objet
* Code pythonique
* Fichiers, JSON, CSV
* Gestion d’erreurs
* Logging et debugging
* Performance et mémoire
* NumPy
* Pandas
* Structure de projet
* Type hints
* Tests avec pytest
* Environnements virtuels
* Async/await, asyncio, httpx, aiohttp
  Projets :
* Facile : CLI IA en Python
* Moyen : appel asynchrone de plusieurs API IA
* Difficile : pipeline de données production-grade

Phase 2 — Mathématiques et statistiques pour l’IA
Objectif : comprendre les bases mathématiques utiles à l’IA.
Modules :

* Algèbre linéaire
* Vecteurs, matrices, produit scalaire
* Similarité cosinus
* Normes
* Valeurs propres
* SVD
* Calcul différentiel
* Gradient
* Jacobienne, Hessienne
* Probabilités
* Théorème de Bayes
* Variables aléatoires
* Distributions
* Espérance, variance
* MLE, MAP
* Entropie, cross-entropy, KL divergence
* Optimisation
* Descente de gradient
* Adam, RMSProp, SGD
* Régularisation
  Projets :
* Facile : moteur de recherche par similarité cosinus
* Moyen : visualiseur de descente de gradient
* Difficile : réseau de neurones from scratch en NumPy

Phase 3 — Machine Learning fondamental
Objectif : maîtriser les bases du ML classique.
Modules :

* Supervisé, non supervisé, reinforcement learning
* Train / validation / test
* Overfitting et underfitting
* Bias-variance tradeoff
* Cross-validation
* Régression linéaire
* Régression logistique
* Arbres de décision
* Random Forest
* XGBoost, LightGBM
* K-Means
* DBSCAN
* PCA
* t-SNE, UMAP
* Hyperparameter tuning
* Scikit-learn pipelines
* GridSearchCV
* Sauvegarde de modèles
  Projets :
* Facile : classifieur spam
* Moyen : prédiction de churn client
* Difficile : mini-framework AutoML

Phase 4 — Deep Learning
Objectif : comprendre les réseaux de neurones avant les transformers.
Modules :

* Perceptron, MLP
* Fonctions d’activation : ReLU, GELU, sigmoid, tanh
* Forward pass
* Backpropagation
* Initialisation des poids
* BatchNorm, LayerNorm
* Dropout
* Residual connections
* CNN
* RNN, LSTM, GRU
* Attention avant transformer
* PyTorch
* Dataset, DataLoader
* Training loop
* GPU
* Transfer learning
  Projets :
* Facile : classifieur d’images avec transfer learning
* Moyen : sentiment analysis LSTM vs BERT
* Difficile : mini GPT from scratch

Phase 5 — NLP et Transformers
Objectif : maîtriser les bases du traitement du langage et des transformers.
Modules :

* Tokenisation
* Prétraitement texte
* Bag of Words
* TF-IDF
* Word2Vec
* GloVe
* FastText
* BPE, WordPiece, SentencePiece
* Architecture Transformer
* Self-attention
* Q, K, V
* Multi-head attention
* Positional encoding
* Encoder, decoder, encoder-decoder
* Causal masking
* Language modeling
* Perplexity
* Temperature, top-k, top-p
* BLEU, ROUGE, BERTScore
* Hugging Face Transformers
* spaCy
* NLTK
* sentence-transformers
  Projets :
* Facile : pipeline NER
* Moyen : moteur de recherche sémantique
* Difficile : fine-tuning BERT multi-label

Phase 6 — LLM Engineering
Objectif : savoir construire des produits autour des grands modèles de langage.
Modules :

* Fonctionnement des LLM
* Context window
* KV cache
* Tokenisation
* RoPE, ALiBi
* Flash Attention
* GQA
* Pretraining
* Instruction tuning
* RLHF
* DPO
* Prompt engineering
* System prompt
* Few-shot prompting
* Structured output
* JSON mode
* Prompt chaining
* Prompt injection defense
* OpenAI API
* Anthropic API
* Gemini API
* Mistral API
* Groq
* Ollama
* Rate limits
* Streaming
* SSE
* Token counting
* Cost tracking
* Fallback
* Sécurité des clés API
  Projets :
* Facile : chatbot multi-provider
* Moyen : analyseur de CV par IA
* Difficile : middleware IA de production

Phase 7 — Orchestration multi-LLM
Objectif : concevoir des systèmes multi-modèles robustes.
Modules :

* Pourquoi utiliser plusieurs LLM
* Routing par type de tâche
* Routing par coût
* Routing par latence
* Routing par qualité
* Fallback chain
* Circuit breaker
* Model Context Protocol
* LangChain
* LangGraph
* LlamaIndex
* CrewAI
* AutoGen
* Gateway multi-LLM
* Provider abstraction
* Token counter
* Cost tracker
* Response validator
* Observabilité
  Projets :
* Facile : dashboard comparatif de réponses LLM
* Moyen : routeur intelligent multi-LLM
* Difficile : plateforme complète d’orchestration multi-LLM

Phase 8 — RAG et bases vectorielles
Objectif : construire des systèmes donnant accès à une base de connaissance privée.
Modules :

* Embeddings
* Chunking
* Vector databases
* FAISS
* Pinecone
* Weaviate
* Qdrant
* pgvector
* Similarity search
* Hybrid search
* Reranking
* HyDE
* Query expansion
* Metadata filtering
* Evaluation RAG
* Hallucination reduction
* Citations et sources
  Projets :
* Facile : Q&A sur documents PDF
* Moyen : RAG avec reranking
* Difficile : système RAG production-grade

Phase 9 — Agents IA et systèmes agentiques
Objectif : créer des agents capables de raisonner, utiliser des outils et accomplir des tâches.
Modules :

* Agent vs chatbot
* Tool calling
* ReAct
* Plan-and-execute
* Mémoire court terme
* Mémoire long terme
* Agents autonomes
* Human-in-the-loop
* Multi-agent systems
* Sandboxing
* Sécurité
* Limites des agents
  Projets :
* Facile : agent avec outils simples
* Moyen : agent de recherche web
* Difficile : système multi-agent complet

Phase 10 — Fine-tuning
Objectif : adapter les modèles à des tâches spécifiques.
Modules :

* Fine-tuning complet
* LoRA
* QLoRA
* PEFT
* Instruction tuning
* Dataset preparation
* Data cleaning
* SFT
* DPO
* RLHF
* Evaluation fine-tuning
* Hugging Face Trainer
* Weights & Biases
* Model registry
  Projets :
* Facile : fine-tuning d’un petit modèle de classification
* Moyen : LoRA sur modèle open-source
* Difficile : pipeline complet de fine-tuning

Phase 11 — IA générative multimodale
Objectif : comprendre et exploiter les modèles génératifs texte, image, audio et vidéo.
Modules :

* Diffusion models
* Stable Diffusion
* ControlNet
* Image generation
* Vision-language models
* Speech-to-text
* Text-to-speech
* Video generation
* Multimodal prompting
* Evaluation multimodale
  Projets :
* Facile : générateur d’images prompté
* Moyen : application vision + texte
* Difficile : pipeline multimodal complet

Phase 12 — MLOps et LLMOps
Objectif : déployer, monitorer et maintenir des systèmes IA en production.
Modules :

* Docker
* CI/CD
* Kubernetes
* Monitoring
* Logs
* Traces
* Metrics
* Prometheus
* Grafana
* LangSmith
* OpenTelemetry
* Model versioning
* Prompt versioning
* A/B testing
* Rollback
* Rate limiting
* Observability LLM
* Evaluation continue
  Projets :
* Facile : dockeriser une API IA
* Moyen : monitoring d’une application LLM
* Difficile : pipeline LLMOps complet

Phase 13 — AI System Design
Objectif : savoir concevoir des architectures IA solides.
Modules :

* Design d’un chatbot IA
* Design d’un RAG d’entreprise
* Design d’un assistant de code
* Design d’un moteur de recherche IA
* Design d’un agent autonome
* Scalabilité
* Latence
* Coût
* Résilience
* Sécurité
* Architecture event-driven
* Files de messages
* Caching
* Sharding
* Rate limiting
  Projets :
* Facile : schéma d’architecture IA
* Moyen : API design d’un produit IA
* Difficile : system design complet interview-ready

Phase 14 — SQL et pgvector
Objectif : maîtriser les bases de données pour applications IA.
Modules :

* SQL
* PostgreSQL
* Index
* Joins
* Transactions
* Prisma
* pgvector
* Embeddings en base
* Recherche vectorielle
* Hybrid search SQL + vector
* Optimisation requêtes
  Projets :
* Facile : base SQL de suivi IA
* Moyen : moteur de recherche pgvector
* Difficile : backend IA avec PostgreSQL + pgvector

Phase 15 — Quantization et optimisation
Objectif : optimiser le coût, la vitesse et la mémoire des modèles.
Modules :

* Quantization
* INT8, INT4
* GGUF
* llama.cpp
* Ollama
* vLLM
* TensorRT-LLM
* Batching
* KV cache
* Speculative decoding
* Distillation
* Small Language Models
* Déploiement local
  Projets :
* Facile : exécuter un modèle local avec Ollama
* Moyen : comparer latence/coût de plusieurs modèles
* Difficile : serveur d’inférence optimisé

Phase 16 — Reinforcement Learning
Objectif : comprendre les bases du RL et son lien avec les LLM.
Modules :

* Agent, environnement, état, action, récompense
* Q-learning
* Policy gradient
* PPO
* RLHF
* DPO
* Reward model
* Preference learning
* Evaluation
  Projets :
* Facile : environnement RL simple
* Moyen : agent RL sur gymnasium
* Difficile : simulation de RLHF simplifiée

Phase 17 — Éthique, sécurité et gouvernance IA
Objectif : construire des systèmes IA responsables et fiables.
Modules :

* Biais
* Fairness
* Privacy
* Sécurité
* Prompt injection
* Jailbreak
* Data leakage
* Hallucination
* Évaluation humaine
* Red teaming
* Gouvernance
* Conformité
* Documentation modèle
* Model cards
* Risk assessment
  Projets :
* Facile : checklist sécurité IA
* Moyen : filtre anti-prompt injection
* Difficile : dashboard de gouvernance IA

Capstone final — Plateforme IA complète
Objectif : construire une architecture complète combinant :

* Authentification
* Dashboard utilisateur
* Roadmap
* Suivi de progression
* Système multi-LLM
* RAG
* Agents
* Monitoring
* Cost tracking
* Sécurité
* Observabilité
  Projet final :
* Construire une plateforme IA complète avec dashboard, API, base de données, suivi de coûts, routage LLM, système RAG, agents et monitoring.

Pages obligatoires :

1. Page d’accueil
   Contenu :

* Titre : “Deviens ingénieur IA étape par étape”
* Sous-titre expliquant la roadmap
* Bouton “Commencer la roadmap”
* Bouton “Voir ma progression”
* Présentation des 17 phases + capstone
* Mise en avant du système XP, niveaux, streak et badges
* Design premium, sérieux, moderne

2. Dashboard
   Contenu :

* Progression globale en pourcentage
* Phase actuelle
* XP total
* Niveau actuel
* Streak actuel
* Meilleur streak
* Nombre de tâches terminées
* Nombre de projets validés
* Objectif quotidien
* Activité récente
* Graphique d’activité des 7 ou 30 derniers jours
* Bouton “Reprendre ma progression”

3. Page Roadmap
   Contenu :

* Liste des phases de 0 à 17 + capstone
* Chaque phase sous forme de carte
* Statut : verrouillée, disponible, en cours, terminée
* Barre de progression par phase
* Nombre de modules
* Nombre de tâches
* Nombre de projets
* Difficulté estimée
* Temps estimé
* Bouton vers le détail de la phase

4. Page détail d’une phase
   Contenu :

* Titre
* Objectif
* Description
* Modules
* Tâches à cocher
* Projets facile, moyen, difficile
* Ressources recommandées
* Progression de la phase
* Notes personnelles si possible
* Bouton “Marquer la phase comme terminée” si les conditions sont remplies

5. Page Projets
   Contenu :

* Tous les projets classés par phase
* Filtres :

  * facile
  * moyen
  * difficile
  * non commencé
  * en cours
  * terminé
* Chaque projet doit afficher :

  * objectif
  * stack suggérée
  * livrables attendus
  * critères de validation
  * bouton “Commencer”
  * bouton “Valider le projet”

6. Page Progression
   Contenu :

* Vue détaillée de la progression
* Calendrier ou heatmap d’activité
* XP gagné par jour
* Phases terminées
* Badges débloqués
* Répartition par domaine :

  * Python
  * Maths
  * ML
  * Deep Learning
  * NLP
  * LLM
  * RAG
  * Agents
  * MLOps
  * Sécurité

7. Page Badges
   Contenu :

* Liste des badges verrouillés et débloqués
* Badges obligatoires :

  * Premier pas : première tâche terminée
  * Sérieux : 7 jours de streak
  * Machine : 30 jours de streak
  * Pythoniste : phase Python terminée
  * Math solide : phase maths terminée
  * Builder : premier projet terminé
  * Architecte IA : phase system design terminée
  * Expert LLM : phase LLM Engineering terminée
  * Agent Builder : phase Agents terminée
  * Finisher : roadmap terminée
  * Capstone Master : capstone validé

8. Page Paramètres
   Contenu :

* Choisir l’objectif quotidien : 1, 3 ou 5 tâches par jour
* Choisir le profil :

  * débutant
  * intermédiaire
  * avancé
* Réinitialiser la progression
* Exporter la progression en JSON
* Importer une progression JSON si possible
* Thème clair/sombre si possible

9. Page Crédits / Licence
   Contenu :

* Mentionner que l’application est créer par Redouane EL BADAOUI en open build sur GitHub “devenir-ingenieur-ia"
* Mentionner la licence MIT si du contenu est réutilisé ou adapté


Gamification à implémenter :

XP :

* Tâche simple terminée : +10 XP
* Module terminé : +25 XP
* Phase terminée : +100 XP
* Projet facile terminé : +75 XP
* Projet moyen terminé : +150 XP
* Projet difficile terminé : +300 XP
* Capstone terminé : +1000 XP
* Objectif quotidien atteint : +30 XP bonus

Niveaux :

* Niveau 1 : 0 XP
* Niveau 2 : 100 XP
* Niveau 3 : 250 XP
* Niveau 4 : 500 XP
* Niveau 5 : 900 XP
* Niveau 6 : 1400 XP
* Niveau 7 : 2000 XP
* Niveau 8 : 2800 XP
* Niveau 9 : 3800 XP
* Niveau 10 : 5000 XP
  Après le niveau 10, utiliser une formule progressive.

Streak :

* Le streak augmente si l’utilisateur termine au moins une vraie tâche dans la journée.
* Une tâche déjà cochée puis décochée/recochée ne doit pas permettre d’abuser du système.
* Le meilleur streak doit être sauvegardé.
* Afficher :

  * streak actuel
  * meilleur streak
  * dernière journée active
  * objectif quotidien atteint ou non

Progression :

* La progression globale doit être calculée à partir des tâches, modules et projets terminés.
* Une phase est terminée seulement si toutes ses tâches principales sont terminées et au moins un projet est validé.
* Le capstone se débloque quand l’utilisateur a terminé la majorité des phases.
* Prévoir une option pour afficher toutes les phases même si elles sont verrouillées.

Règles anti-abus :

* Ne pas redonner de l’XP si une tâche déjà récompensée est recochée.
* Stocker `xpAwarded` pour chaque tâche/projet.
* Créer un ActivityLog pour chaque vraie action.
* La progression doit rester cohérente après refresh.

Design attendu :

* Style dashboard SaaS moderne
* Sérieux, premium, propre
* Responsive mobile et desktop
* Fond sombre recommandé
* Couleurs :

  * fond : #0F172A
  * cartes : #111827 ou #1E293B
  * accent : bleu, violet ou cyan
  * succès : vert
  * avertissement : orange
* Barres de progression visibles
* Cartes bien espacées
* Icônes propres
* Typographie lisible
* Ne pas surcharger l’écran
* L’utilisateur doit comprendre immédiatement où il en est

Composants à créer :

* AppShell
* Sidebar
* Header
* ProgressBar
* PhaseCard
* TaskCheckbox
* ProjectCard
* BadgeCard
* StatCard
* StreakWidget
* LevelWidget
* ActivityHeatmap
* RoadmapTimeline
* DailyGoalCard
* EmptyState
* ConfirmResetModal

Fonctionnalités interactives indispensables :

* Cocher / décocher une tâche
* Gagner de l’XP
* Mettre à jour le niveau
* Mettre à jour la progression globale
* Mettre à jour la progression de chaque phase
* Mettre à jour le streak
* Valider un projet
* Débloquer des badges
* Voir les statistiques évoluer
* Sauvegarder en base PostgreSQL
* Reprendre là où l’utilisateur s’est arrêté
* Exporter la progression
* Réinitialiser proprement la progression

Qualité du code :

* TypeScript strict
* Code propre
* Pas de fichiers énormes
* Types clairs
* Séparer :

  * données
  * logique métier
  * composants UI
  * accès base de données
  * pages
* Fonctions pures pour :

  * calcul XP
  * calcul niveau
  * calcul progression
  * calcul streak
  * calcul badges
* Pas de TODO bloquant
* Pas de bouton sans action réelle
* Pas d’erreur TypeScript
* Pas d’erreur ESLint bloquante
* Build Vercel valide

README obligatoire :
Créer ou mettre à jour un README clair avec :

* présentation du projet
* stack utilisée
* installation locale
* configuration PostgreSQL
* variables d’environnement
* commandes Prisma
* déploiement Vercel
* connexion Neon/Supabase/Vercel Postgres
* crédits et licence

Commandes attendues :

* npm install
* npx prisma generate
* npx prisma db push
* npm run dev
* npm run build

Critères de validation finale :
À la fin, je veux pouvoir :

1. installer les dépendances
2. configurer DATABASE_URL
3. générer Prisma
4. pousser le schéma en base
5. lancer l’app en local
6. ouvrir la page d’accueil
7. consulter le dashboard
8. voir la roadmap complète en français
9. ouvrir une phase
10. cocher des tâches
11. voir l’XP évoluer
12. voir le niveau évoluer
13. voir le streak évoluer
14. valider un projet
15. débloquer des badges
16. consulter la progression
17. exporter ou réinitialiser ma progression
18. déployer sur Vercel sans erreur

Priorité :
Fais d’abord un MVP complet, solide et fonctionnel.
Ensuite améliore le design.
Ne fais pas seulement une maquette.
Ne donne pas seulement des explications.
Crée et modifie les fichiers nécessaires.

À la fin de ton travail, donne-moi :

* la liste des fichiers créés/modifiés
* les commandes à lancer
* les variables d’environnement à mettre sur Vercel
* les étapes de déploiement Vercel
* les fonctionnalités terminées
* les limites éventuelles
* les améliorations possibles

Commence maintenant par analyser le projet, puis implémente cette webapp complète compatible Vercel.
