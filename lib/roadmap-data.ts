import type {
  Roadmap,
  Phase,
  Module,
  Task,
  Project,
  ProjectDifficulty,
} from '@/types/roadmap'

// ============================================
// XP VALUES
// ============================================

const XP_VALUES = {
  task: 10,
  module: 25,
  phase: 100,
  project: {
    easy: 75,
    medium: 150,
    hard: 300,
  },
  capstone: 1000,
  dailyGoal: 30,
}

// ============================================
// HELPER TO GENERATE IDS
// ============================================

const generateId = (prefix: string, index: number) =>
  `${prefix.toLowerCase().replace(/\s+/g, '-')}-${index}`

// ============================================
// MODULES BY PHASE
// ============================================

// Phase 0 - Orientation et mentalité
const phase0Modules: Module[] = [
  {
    id: 'module-0-0',
    title: 'Comprendre le rôle d’AI Engineer',
    description: 'Distinguer AI Engineer, ML Engineer, Data Scientist et LLM Engineer à partir de leurs responsabilités, livrables et contraintes produit.',
  },
  {
    id: 'module-0-1',
    title: 'Cartographier le marché IA 2026',
    description: 'Identifier les familles de postes, les secteurs qui recrutent, les stacks dominantes et les attentes de niveau junior/intermédiaire.',
  },
  {
    id: 'module-0-2',
    title: 'Construire son diagnostic personnel',
    description: 'Évaluer son niveau en code, maths, ML, LLM, produit, cloud et communication pour choisir un parcours réaliste.',
  },
  {
    id: 'module-0-3',
    title: 'Lire une architecture IA moderne',
    description: 'Comprendre les blocs RAG, agents, orchestration multi-LLM, vector database, evals, monitoring et sécurité.',
  },
  {
    id: 'module-0-4',
    title: 'Mettre en place son environnement de travail',
    description: 'Installer l’outillage minimal : VS Code, Git, GitHub, Python, Node, terminal, gestionnaire de secrets et système de notes.',
  },
  {
    id: 'module-0-5',
    title: 'Organiser son portfolio public',
    description: 'Définir une stratégie GitHub/README/LinkedIn pour transformer les exercices en preuves concrètes de compétence.',
  },
]

// Phase 1 - Fondations Python
const phase1Modules: Module[] = [
  {
    id: 'module-1-0',
    title: 'Python moderne et structures de données',
    description: 'Maîtriser types, listes, dictionnaires, sets, compréhensions, slicing et choix de structure selon le problème.',
  },
  {
    id: 'module-1-1',
    title: 'Fonctions, modules et interfaces propres',
    description: 'Écrire des fonctions testables, découper un programme en modules et concevoir des signatures lisibles.',
  },
  {
    id: 'module-1-2',
    title: 'Programmation orientée objet utile',
    description: 'Utiliser classes, dataclasses, méthodes, propriétés et composition sans sur-abstraire.',
  },
  {
    id: 'module-1-3',
    title: 'Fichiers, JSON, CSV et configuration',
    description: 'Lire, écrire, valider et transformer des données locales avec pathlib, json, csv et variables d’environnement.',
  },
  {
    id: 'module-1-4',
    title: 'Robustesse : erreurs, logs, debug',
    description: 'Gérer exceptions, logs structurés, messages d’erreur exploitables et debugging reproductible.',
  },
  {
    id: 'module-1-5',
    title: 'NumPy et Pandas pour pipelines IA',
    description: 'Manipuler arrays, DataFrames, agrégations, jointures, nettoyage et feature engineering simple.',
  },
  {
    id: 'module-1-6',
    title: 'Qualité projet : venv, pyproject, tests, typing',
    description: 'Créer un dépôt Python propre avec environnement isolé, dépendances, pytest, type hints et README.',
  },
  {
    id: 'module-1-7',
    title: 'HTTP, APIs et async Python',
    description: 'Consommer des APIs avec requests/httpx, gérer timeouts/retries et paralléliser des appels avec asyncio.',
  },
]

// Phase 2 - Mathématiques et statistiques
const phase2Modules: Module[] = [
  {
    id: 'module-2-0',
    title: 'Vecteurs, matrices et espaces latents',
    description: 'Comprendre les objets mathématiques derrière embeddings, features, projections et représentations de documents.',
  },
  {
    id: 'module-2-1',
    title: 'Distances, normes et similarité cosinus',
    description: 'Choisir une mesure de proximité, calculer similarité/distance et interpréter leurs limites en recherche IA.',
  },
  {
    id: 'module-2-2',
    title: 'Décomposition matricielle : PCA et SVD',
    description: 'Réduire la dimension, expliquer la variance et relier PCA/SVD à la compression et aux embeddings.',
  },
  {
    id: 'module-2-3',
    title: 'Probabilités et statistiques appliquées',
    description: 'Manipuler distributions, espérance, variance, corrélation, incertitude, Bayes et intervalles de confiance.',
  },
  {
    id: 'module-2-4',
    title: 'Fonctions de coût et information',
    description: 'Comprendre MSE, log-loss, cross-entropy, entropie et KL divergence comme signaux d’apprentissage.',
  },
  {
    id: 'module-2-5',
    title: 'Gradient et optimisation',
    description: 'Calculer une dérivée utile, interpréter un gradient et implémenter gradient descent, momentum et Adam simplifié.',
  },
  {
    id: 'module-2-6',
    title: 'Régularisation et généralisation',
    description: 'Comprendre L1/L2, bruit, validation, biais-variance et la différence entre apprendre et mémoriser.',
  },
]

// Phase 3 - Machine Learning fondamental
const phase3Modules: Module[] = [
  { id: 'module-3-0', title: 'Supervisé, non supervisé, reinforcement learning' },
  { id: 'module-3-1', title: 'Train / validation / test' },
  { id: 'module-3-2', title: 'Overfitting et underfitting' },
  { id: 'module-3-3', title: 'Bias-variance tradeoff' },
  { id: 'module-3-4', title: 'Cross-validation' },
  { id: 'module-3-5', title: 'Régression linéaire, Régression logistique' },
  { id: 'module-3-6', title: 'Arbres de décision, Random Forest' },
  { id: 'module-3-7', title: 'XGBoost, LightGBM' },
  { id: 'module-3-8', title: 'K-Means, DBSCAN' },
  { id: 'module-3-9', title: 'PCA, t-SNE, UMAP' },
  { id: 'module-3-10', title: 'Hyperparameter tuning, Scikit-learn pipelines' },
  { id: 'module-3-11', title: 'GridSearchCV, Sauvegarde de modèles' },
]

// Phase 4 - Deep Learning
const phase4Modules: Module[] = [
  { id: 'module-4-0', title: 'Perceptron, MLP' },
  { id: 'module-4-1', title: 'Fonctions d’activation : ReLU, GELU, sigmoid, tanh' },
  { id: 'module-4-2', title: 'Forward pass, Backpropagation' },
  { id: 'module-4-3', title: 'Initialisation des poids' },
  { id: 'module-4-4', title: 'BatchNorm, LayerNorm' },
  { id: 'module-4-5', title: 'Dropout, Residual connections' },
  { id: 'module-4-6', title: 'CNN' },
  { id: 'module-4-7', title: 'RNN, LSTM, GRU' },
  { id: 'module-4-8', title: 'Attention avant transformer' },
  { id: 'module-4-9', title: 'PyTorch - Dataset, DataLoader, Training loop, GPU' },
  { id: 'module-4-10', title: 'Transfer learning' },
]

// Phase 5 - NLP et Transformers
const phase5Modules: Module[] = [
  { id: 'module-5-0', title: 'Tokenisation, Prétraitement texte' },
  { id: 'module-5-1', title: 'Bag of Words, TF-IDF' },
  { id: 'module-5-2', title: 'Word2Vec, GloVe, FastText' },
  { id: 'module-5-3', title: 'BPE, WordPiece, SentencePiece' },
  { id: 'module-5-4', title: 'Architecture Transformer' },
  { id: 'module-5-5', title: 'Self-attention, Q, K, V, Multi-head attention' },
  { id: 'module-5-6', title: 'Positional encoding, Encoder, decoder' },
  { id: 'module-5-7', title: 'Causal masking, Language modeling' },
  { id: 'module-5-8', title: 'Perplexity, Temperature, top-k, top-p' },
  { id: 'module-5-9', title: 'BLEU, ROUGE, BERTScore' },
  { id: 'module-5-10', title: 'Hugging Face Transformers, spaCy, NLTK' },
  { id: 'module-5-11', title: 'sentence-transformers' },
]

// Phase 6 - LLM Engineering
const phase6Modules: Module[] = [
  { id: 'module-6-0', title: 'Fonctionnement des LLM' },
  { id: 'module-6-1', title: 'Context window, KV cache, Tokenisation' },
  { id: 'module-6-2', title: 'RoPE, ALiBi, Flash Attention, GQA' },
  { id: 'module-6-3', title: 'Pretraining, Instruction tuning, RLHF, DPO' },
  { id: 'module-6-4', title: 'Prompt engineering, System prompt, Few-shot prompting' },
  { id: 'module-6-5', title: 'Structured output, JSON mode, Prompt chaining' },
  { id: 'module-6-6', title: 'Prompt injection defense' },
  { id: 'module-6-7', title: 'OpenAI API, Anthropic API, Gemini API, Mistral API' },
  { id: 'module-6-8', title: 'Groq, Ollama' },
  { id: 'module-6-9', title: 'Rate limits, Streaming, SSE, Token counting' },
  { id: 'module-6-10', title: 'Cost tracking, Fallback, Sécurité des clés API' },
]

// Phase 7 - Orchestration multi-LLM
const phase7Modules: Module[] = [
  { id: 'module-7-0', title: 'Pourquoi utiliser plusieurs LLM' },
  { id: 'module-7-1', title: 'Routing par type de tâche, coût, latence, qualité' },
  { id: 'module-7-2', title: 'Fallback chain, Circuit breaker' },
  { id: 'module-7-3', title: 'Model Context Protocol' },
  { id: 'module-7-4', title: 'LangChain, LangGraph, LlamaIndex' },
  { id: 'module-7-5', title: 'CrewAI, AutoGen' },
  { id: 'module-7-6', title: 'Gateway multi-LLM, Provider abstraction' },
  { id: 'module-7-7', title: 'Token counter, Cost tracker, Response validator' },
  { id: 'module-7-8', title: 'Observabilité' },
]

// Phase 8 - RAG et bases vectorielles
const phase8Modules: Module[] = [
  { id: 'module-8-0', title: 'Embeddings, Chunking' },
  { id: 'module-8-1', title: 'Vector databases - FAISS, Pinecone, Weaviate, Qdrant, pgvector' },
  { id: 'module-8-2', title: 'Similarity search, Hybrid search, Reranking' },
  { id: 'module-8-3', title: 'HyDE, Query expansion, Metadata filtering' },
  { id: 'module-8-4', title: 'Evaluation RAG, Hallucination reduction' },
  { id: 'module-8-5', title: 'Citations et sources' },
]

// Phase 9 - Agents IA
const phase9Modules: Module[] = [
  { id: 'module-9-0', title: 'Agent vs chatbot' },
  { id: 'module-9-1', title: 'Tool calling, ReAct, Plan-and-execute' },
  { id: 'module-9-2', title: 'Mémoire court terme et long terme' },
  { id: 'module-9-3', title: 'Agents autonomes, Human-in-the-loop' },
  { id: 'module-9-4', title: 'Multi-agent systems' },
  { id: 'module-9-5', title: 'Sandboxing, Sécurité, Limites des agents' },
]

// Phase 10 - Fine-tuning
const phase10Modules: Module[] = [
  { id: 'module-10-0', title: 'Fine-tuning complet, LoRA, QLoRA, PEFT' },
  { id: 'module-10-1', title: 'Instruction tuning, Dataset preparation, Data cleaning' },
  { id: 'module-10-2', title: 'SFT, DPO, RLHF' },
  { id: 'module-10-3', title: 'Evaluation fine-tuning' },
  { id: 'module-10-4', title: 'Hugging Face Trainer, Weights & Biases, Model registry' },
]

// Phase 11 - IA générative multimodale
const phase11Modules: Module[] = [
  { id: 'module-11-0', title: 'Diffusion models, Stable Diffusion, ControlNet' },
  { id: 'module-11-1', title: 'Image generation, Vision-language models' },
  { id: 'module-11-2', title: 'Speech-to-text, Text-to-speech, Video generation' },
  { id: 'module-11-3', title: 'Multimodal prompting, Evaluation multimodale' },
]

// Phase 12 - MLOps et LLMOps
const phase12Modules: Module[] = [
  { id: 'module-12-0', title: 'Docker, CI/CD, Kubernetes' },
  { id: 'module-12-1', title: 'Monitoring - Logs, Traces, Metrics' },
  { id: 'module-12-2', title: 'Prometheus, Grafana, LangSmith, OpenTelemetry' },
  { id: 'module-12-3', title: 'Model versioning, Prompt versioning' },
  { id: 'module-12-4', title: 'A/B testing, Rollback, Rate limiting' },
  { id: 'module-12-5', title: 'Observability LLM, Evaluation continue' },
]

// Phase 13 - AI System Design
const phase13Modules: Module[] = [
  { id: 'module-13-0', title: 'Design d’un chatbot IA, RAG d’entreprise, assistant de code' },
  { id: 'module-13-1', title: 'Moteur de recherche IA, agent autonome' },
  { id: 'module-13-2', title: 'Scalabilité, Latence, Coût, Résilience' },
  { id: 'module-13-3', title: 'Sécurité, Architecture event-driven' },
  { id: 'module-13-4', title: 'Files de messages, Caching, Sharding, Rate limiting' },
]

// Phase 14 - SQL et pgvector
const phase14Modules: Module[] = [
  { id: 'module-14-0', title: 'SQL, PostgreSQL - Index, Joins, Transactions' },
  { id: 'module-14-1', title: 'Prisma, pgvector' },
  { id: 'module-14-2', title: 'Embeddings en base, Recherche vectorielle' },
  { id: 'module-14-3', title: 'Hybrid search SQL + vector, Optimisation requêtes' },
]

// Phase 15 - Quantization et optimisation
const phase15Modules: Module[] = [
  { id: 'module-15-0', title: 'Quantization - INT8, INT4, GGUF' },
  { id: 'module-15-1', title: 'llama.cpp, Ollama, vLLM, TensorRT-LLM' },
  { id: 'module-15-2', title: 'Batching, KV cache, Speculative decoding' },
  { id: 'module-15-3', title: 'Distillation, Small Language Models' },
  { id: 'module-15-4', title: 'Déploiement local' },
]

// Phase 16 - Reinforcement Learning
const phase16Modules: Module[] = [
  { id: 'module-16-0', title: 'Agent, environnement, état, action, récompense' },
  { id: 'module-16-1', title: 'Q-learning, Policy gradient, PPO' },
  { id: 'module-16-2', title: 'RLHF, DPO, Reward model, Preference learning' },
  { id: 'module-16-3', title: 'Evaluation' },
]

// Phase 17 - Éthique, sécurité et gouvernance IA
const phase17Modules: Module[] = [
  { id: 'module-17-0', title: 'Biais, Fairness, Privacy' },
  { id: 'module-17-1', title: 'Sécurité - Prompt injection, Jailbreak, Data leakage' },
  { id: 'module-17-2', title: 'Hallucination, Évaluation humaine, Red teaming' },
  { id: 'module-17-3', title: 'Gouvernance, Conformité' },
  { id: 'module-17-4', title: 'Documentation modèle, Model cards, Risk assessment' },
]

// ============================================
// TASKS BY PHASE
// ============================================

const generateTasks = (phaseId: string, taskTitles: string[]): Task[] => {
  return taskTitles.map((title, index) => ({
    id: `task-${phaseId}-${index}`,
    title,
    description: '',
    xp: XP_VALUES.task,
  }))
}

const createTasks = (
  phaseId: string,
  tasks: Array<{ title: string; description: string; resourceHref?: string; resourceLabel?: string }>
): Task[] => tasks.map((task, index) => ({
  id: `task-${phaseId}-${index}`,
  title: task.title,
  description: task.description,
  resourceHref: task.resourceHref,
  resourceLabel: task.resourceLabel,
  xp: XP_VALUES.task,
}))

const phase0Tasks = createTasks('0', [
  {
    title: 'Comparer 4 métiers IA',
    description: 'Produire un tableau qui compare AI Engineer, ML Engineer, Data Scientist et LLM Engineer sur missions, stack, livrables et niveau attendu.',
  },
  {
    title: 'Analyser 10 offres AI Engineer',
    description: 'Extraire les compétences communes, outils cités, niveaux d’expérience demandés et signaux différenciants.',
  },
  {
    title: 'Établir son diagnostic de départ',
    description: 'Se noter de 1 à 5 sur Python, Git, maths, ML, LLM, cloud, produit et communication, puis identifier 3 priorités.',
  },
  {
    title: 'Dessiner une architecture IA simple',
    description: 'Schématiser utilisateur, frontend, backend, LLM, base vectorielle, stockage, monitoring et sécurité.',
  },
  {
    title: 'Préparer son environnement local',
    description: 'Installer Python, Git, VS Code, terminal, compte GitHub et vérifier que chaque outil fonctionne.',
    resourceHref: '/tutorials/local-environment',
    resourceLabel: 'Voir le tuto environnement local',
  },
  {
    title: 'Créer son espace portfolio',
    description: 'Créer un dépôt GitHub principal ou une organisation de dépôts avec README, conventions de nommage et plan de progression.',
  },
])

const phase1Tasks = createTasks('1', [
  {
    title: 'Écrire 20 exercices Python idiomatiques',
    description: 'Utiliser listes, dictionnaires, comprehensions, fonctions et exceptions sur de petits problèmes réalistes.',
  },
  {
    title: 'Créer un parser JSON/CSV réutilisable',
    description: 'Lire plusieurs fichiers, valider leur structure, normaliser les champs et exporter un fichier propre.',
  },
  {
    title: 'Structurer un mini-package Python',
    description: 'Organiser src, tests, README, pyproject ou requirements, configuration et point d’entrée CLI.',
  },
  {
    title: 'Ajouter typing, logs et erreurs propres',
    description: 'Ajouter type hints, logs utiles, exceptions explicites et messages exploitables par un utilisateur.',
  },
  {
    title: 'Écrire une suite pytest minimale',
    description: 'Couvrir les fonctions critiques avec tests unitaires, cas limites et fixtures simples.',
  },
  {
    title: 'Nettoyer un dataset avec Pandas',
    description: 'Gérer valeurs manquantes, types, doublons, colonnes inutiles et produire un résumé statistique.',
  },
  {
    title: 'Comparer traitement synchrone et async',
    description: 'Appeler une API ou une fausse API plusieurs fois, mesurer le temps sync vs async et expliquer l’écart.',
  },
  {
    title: 'Documenter un dépôt prêt à être corrigé',
    description: 'Rédiger README, installation, usage, tests, limites connues et exemples de commandes.',
  },
])

const phase2Tasks = createTasks('2', [
  {
    title: 'Implémenter produit scalaire, normes et cosinus',
    description: 'Coder les opérations avec NumPy puis vérifier les résultats sur des exemples simples.',
  },
  {
    title: 'Créer un mini moteur de similarité',
    description: 'Transformer des textes en vecteurs simples, classer les résultats par similarité et analyser les erreurs.',
  },
  {
    title: 'Visualiser PCA sur un dataset réel',
    description: 'Réduire un dataset à 2 dimensions, afficher les points et expliquer la variance conservée.',
  },
  {
    title: 'Simuler des distributions de probabilité',
    description: 'Générer normale, binomiale et uniforme, puis calculer moyenne, variance et histogrammes.',
  },
  {
    title: 'Appliquer Bayes sur un cas métier',
    description: 'Résoudre un problème de diagnostic, fraude ou classification avec probabilités conditionnelles.',
  },
  {
    title: 'Comparer MSE, log-loss et cross-entropy',
    description: 'Calculer les pertes sur prédictions bonnes/mauvaises et expliquer leur comportement.',
  },
  {
    title: 'Coder une descente de gradient from scratch',
    description: 'Optimiser une fonction simple, tracer la trajectoire et expérimenter avec le learning rate.',
  },
  {
    title: 'Tester l’effet de la régularisation',
    description: 'Comparer un modèle sans régularisation, L1 et L2 sur un petit problème synthétique.',
  },
])

const phase3Tasks = generateTasks('3', [
  'Comprendre les différences entre supervisé, non supervisé et RL',
  'Diviser correctement train/validation/test',
  'Identifier et éviter overfitting et underfitting',
  'Comprendre le bias-variance tradeoff',
  'Implémenter la cross-validation',
  'Entraîner une régression linéaire',
  'Entraîner une régression logistique',
  'Utiliser les arbres de décision',
  'Implémenter Random Forest',
  'Configurer XGBoost et LightGBM',
  'Appliquer K-Means pour le clustering',
  'Utiliser DBSCAN pour le clustering',
  'Appliquer PCA pour la réduction de dimension',
  'Visualiser avec t-SNE ou UMAP',
  'Optimiser les hyperparamètres',
  'Créer des pipelines Scikit-learn',
  'Utiliser GridSearchCV pour la recherche d’hyperparamètres',
  'Sauvegarder et charger des modèles',
])

const phase4Tasks = generateTasks('4', [
  'Comprendre Perceptron et MLP',
  'Implémenter les fonctions d’activation (ReLU, GELU, sigmoid, tanh)',
  'Coder le forward pass',
  'Implémenter la backpropagation',
  'Initialiser correctement les poids',
  'Ajouter BatchNorm et LayerNorm',
  'Implémenter Dropout',
  'Utiliser les residual connections',
  'Comprendre et implémenter les CNN',
  'Travailler avec RNN, LSTM, GRU',
  'Comprendre l’attention avant transformer',
  'Utiliser PyTorch pour créer des modèles',
  'Créer Dataset et DataLoader',
  'Écrire un training loop',
  'Utiliser le GPU pour l’accélération',
  'Appliquer le transfer learning',
])

const phase5Tasks = generateTasks('5', [
  'Maîtriser la tokenisation',
  'Prétraiter le texte pour le NLP',
  'Implémenter Bag of Words',
  'Utiliser TF-IDF',
  'Comprendre Word2Vec',
  'Appliquer GloVe',
  'Utiliser FastText',
  'Comprendre BPE, WordPiece, SentencePiece',
  'Décortiquer l’architecture Transformer',
  'Implémenter self-attention',
  'Comprendre Q, K, V et multi-head attention',
  'Ajouter positional encoding',
  'Différencier encoder, decoder, encoder-decoder',
  'Implémenter causal masking',
  'Comprendre le language modeling',
  'Calculer la perplexity',
  'Configurer temperature, top-k, top-p',
  'Évaluer avec BLEU, ROUGE, BERTScore',
  'Utiliser Hugging Face Transformers',
  'Travailler avec spaCy',
  'Utiliser NLTK',
  'Appliquer sentence-transformers',
])

const phase6Tasks = generateTasks('6', [
  'Comprendre le fonctionnement interne des LLM',
  'Gérer le context window et les limites',
  'Optimiser avec KV cache',
  'Comprendre la tokenisation des LLM',
  'Étudier RoPE et ALiBi',
  'Optimiser avec Flash Attention',
  'Utiliser GQA pour l’efficacité',
  'Comprendre pretraining, instruction tuning',
  'Implémenter RLHF et DPO',
  'Maîtriser le prompt engineering',
  'Créer des system prompts efficaces',
  'Utiliser few-shot prompting',
  'Générer des structured outputs',
  'Utiliser le JSON mode',
  'Chaîner les prompts (prompt chaining)',
  'Se défendre contre prompt injection',
  'Utiliser OpenAI API',
  'Travailler avec Anthropic API',
  'Tester Gemini API',
  'Utiliser Mistral API',
  'Configurer Groq pour l’inference rapide',
  'Déployer Ollama en local',
  'Gérer les rate limits',
  'Implémenter le streaming avec SSE',
  'Compter les tokens efficacement',
  'Suivre les coûts d’API',
  'Mettre en place des fallback mechanisms',
  'Sécuriser les clés API',
])

const phase7Tasks = generateTasks('7', [
  'Comprendre les avantages de l’orchestration multi-LLM',
  'Router les requêtes par type de tâche',
  'Optimiser le routing par coût',
  'Router par latence',
  'Router par qualité',
  'Implémenter fallback chain',
  'Ajouter circuit breaker',
  'Utiliser Model Context Protocol',
  'Travailler avec LangChain',
  'Créer des graphes avec LangGraph',
  'Indexer avec LlamaIndex',
  'Coordonner avec CrewAI',
  'Utiliser AutoGen pour les agents',
  'Concevoir un gateway multi-LLM',
  'Abstraire les providers',
  'Compter les tokens multi-modèles',
  'Suivre les coûts par modèle',
  'Valider les réponses',
  'Ajouter de l’observabilité',
])

const phase8Tasks = generateTasks('8', [
  'Générer des embeddings de qualité',
  'Chunking efficace des documents',
  'Choisir une base vectorielle adaptée',
  'Comparer FAISS, Pinecone, Weaviate, Qdrant',
  'Utiliser pgvector avec PostgreSQL',
  'Implémenter similarity search',
  'Combiner avec hybrid search',
  'Ajouter reranking pour améliorer la pertinence',
  'Utiliser HyDE pour l’expansion de requête',
  'Implémenter query expansion',
  'Filtrer par metadata',
  'Évaluer la qualité du RAG',
  'Réduire les hallucinations',
  'Ajouter citations et sources',
])

const phase9Tasks = generateTasks('9', [
  'Différencier agent et chatbot',
  'Implémenter tool calling',
  'Utiliser ReAct pour le raisonnement',
  'Appliquer plan-and-execute',
  'Ajouter de la mémoire court terme',
  'Implémenter mémoire long terme',
  'Créer des agents autonomes',
  'Intégrer human-in-the-loop',
  'Concevoir un système multi-agent',
  'Sandboxer les agents pour la sécurité',
  'Renforcer la sécurité des agents',
  'Comprendre les limites des agents',
])

const phase10Tasks = generateTasks('10', [
  'Comprendre le fine-tuning complet',
  'Appliquer LoRA pour l’efficacité',
  'Utiliser QLoRA',
  'Explorer PEFT',
  'Préparer instruction tuning',
  'Nettoyer et préparer le dataset',
  'Implémenter SFT',
  'Configurer DPO',
  'Appliquer RLHF',
  'Évaluer un modèle fine-tuné',
  'Utiliser Hugging Face Trainer',
  'Suivre avec Weights & Biases',
  'Gérer un model registry',
])

const phase11Tasks = generateTasks('11', [
  'Comprendre les diffusion models',
  'Utiliser Stable Diffusion',
  'Appliquer ControlNet',
  'Générer des images',
  'Travailler avec vision-language models',
  'Transcrire audio avec Speech-to-text',
  'Synthétiser avec Text-to-speech',
  'Générer de la vidéo',
  'Créer des prompts multimodaux',
  'Évaluer les modèles multimodaux',
])

const phase12Tasks = generateTasks('12', [
  'Containeriser avec Docker',
  'Configurer CI/CD pipeline',
  'Déployer sur Kubernetes',
  'Mettre en place monitoring complet',
  'Centraliser les logs',
  'Traquer les traces',
  'Définir les metrics clés',
  'Utiliser Prometheus',
  'Visualiser avec Grafana',
  'Traquer avec LangSmith',
  'Instrumenter avec OpenTelemetry',
  'Versionner les modèles',
  'Versionner les prompts',
  'Mettre en place A/B testing',
  'Configurer rollback mechanisms',
  'Implémenter rate limiting',
  'Ajouter observabilité LLM',
  'Mettre en place evaluation continue',
])

const phase13Tasks = generateTasks('13', [
  'Concevoir un chatbot IA scalable',
  'Architecturer un RAG d’entreprise',
  'Design un assistant de code',
  'Créer un moteur de recherche IA',
  'Concevoir un agent autonome',
  'Optimiser pour la scalabilité',
  'Minimiser la latence',
  'Contrôler les coûts',
  'Assurer la résilience',
  'Renforcer la sécurité',
  'Implémenter architecture event-driven',
  'Utiliser files de messages',
  'Ajouter caching efficace',
  'Partitionner avec sharding',
  'Configurer rate limiting global',
])

const phase14Tasks = generateTasks('14', [
  'Maîtriser SQL avancé',
  'Optimiser les requêtes PostgreSQL',
  'Créer des index efficaces',
  'Utiliser les joins de manière optimale',
  'Gérer les transactions',
  'Configurer Prisma ORM',
  'Ajouter pgvector à PostgreSQL',
  'Stocker les embeddings en base',
  'Implémenter recherche vectorielle',
  'Combiner SQL et recherche vectorielle',
  'Optimiser les requêtes hybrides',
])

const phase15Tasks = generateTasks('15', [
  'Comprendre la quantization',
  'Appliquer INT8 et INT4',
  'Utiliser le format GGUF',
  'Exécuter avec llama.cpp',
  'Déployer Ollama localement',
  'Optimiser avec vLLM',
  'Accélérer avec TensorRT-LLM',
  'Implémenter batching',
  'Optimiser KV cache',
  'Utiliser speculative decoding',
  'Appliquer la distillation',
  'Travailler avec Small Language Models',
  'Déployer en local',
])

const phase16Tasks = generateTasks('16', [
  'Définir agent, environnement, état, action, récompense',
  'Implémenter Q-learning',
  'Appliquer Policy gradient',
  'Configurer PPO',
  'Comprendre RLHF',
  'Configurer DPO',
  'Créer un reward model',
  'Appliquer preference learning',
  'Évaluer les agents RL',
])

const phase17Tasks = generateTasks('17', [
  'Identifier et réduire les biais',
  'Assurer fairness dans les modèles',
  'Protéger la privacy',
  'Renforcer la sécurité des systèmes',
  'Se défendre contre prompt injection',
  'Empêcher jailbreak',
  'Prévenir data leakage',
  'Détecter et réduire hallucinations',
  'Mettre en place évaluation humaine',
  'Conduire red teaming',
  'Établir une gouvernance IA',
  'Assurer la conformité réglementaire',
  'Documenter les modèles (Model cards)',
  'Effectuer risk assessment',
])

// ============================================
// PROJECTS BY PHASE
// ============================================

const createProject = (
  phaseId: string,
  difficulty: ProjectDifficulty,
  index: number,
  title: string,
  description: string,
  objective: string,
  suggestedStack: string[],
  deliverables: string[],
  validationCriteria: string[],
  requiresGithubRepo = false
): Project => ({
  id: `project-${phaseId}-${difficulty}-${index}`,
  title,
  description,
  difficulty,
  objective,
  suggestedStack,
  deliverables,
  validationCriteria,
  requiresGithubRepo,
  xp: XP_VALUES.project[difficulty],
})

// Phase 0 Projects
const phase0Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '0',
    'easy',
    0,
    'Diagnostic personnel AI Engineer',
    'Créer un état des lieux honnête de son niveau, de ses objectifs et de ses contraintes de temps.',
    'Transformer la roadmap générale en plan personnel actionnable sur 30 jours',
    ['Markdown', 'Notion', 'Google Docs'],
    [
      'Document de diagnostic avec niveau actuel par compétence',
      'Objectifs SMART sur 30 jours',
      'Planning hebdomadaire réaliste',
      'Liste de ressources prioritaires',
    ],
    [
      'Le niveau de départ est explicite et argumenté',
      'Les objectifs sont mesurables',
      'Le planning tient compte des contraintes réelles',
    ]
  ),
  medium: createProject(
    '0',
    'medium',
    0,
    'Analyse de marché AI Engineer',
    'Étudier des offres réelles pour comprendre ce que les entreprises demandent vraiment.',
    'Identifier les compétences récurrentes et les écarts à combler avant de coder',
    ['LinkedIn', 'Welcome to the Jungle', 'Google Sheets', 'Markdown'],
    [
      'Tableau comparatif de 10 offres',
      'Synthèse des compétences techniques et produit',
      'Top 10 des outils les plus cités',
      'Plan de réduction des gaps personnels',
    ],
    [
      'Au moins 10 offres analysées',
      'Les compétences sont regroupées par catégories',
      'Les décisions de roadmap sont justifiées par les offres',
    ]
  ),
  hard: createProject(
    '0',
    'hard',
    0,
    'Portfolio GitHub initial',
    'Préparer un dépôt public qui servira de fil rouge à tous les projets Rouky.',
    'Créer une base professionnelle que Rouky pourra inspecter plus tard pour suivre la progression',
    ['Git', 'GitHub', 'Markdown', 'Mermaid'],
    [
      'Dépôt GitHub public',
      'README principal avec objectif, roadmap et règles de travail',
      'Dossier docs avec diagnostic, analyse de marché et architecture IA cible',
      'Schéma Mermaid d’une architecture IA moderne',
    ],
    [
      'Le dépôt est public et lisible',
      'Le README explique clairement le parcours',
      'Les documents sont versionnés',
      'Le schéma couvre frontend, backend, LLM, données, observabilité et sécurité',
    ],
    true
  ),
}

// Phase 1 Projects
const phase1Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '1',
    'easy',
    0,
    'Data Cleaner CLI',
    'Créer un outil en ligne de commande qui nettoie un CSV et produit un rapport de qualité.',
    'Prouver la maîtrise de Python, fichiers, erreurs, logs et structure de projet',
    ['Python', 'argparse ou Typer', 'Pandas', 'pytest'],
    [
      'Dépôt GitHub public',
      'CLI exécutable avec options input/output',
      'Rapport Markdown ou JSON sur les valeurs manquantes, doublons et types',
      'README avec installation, usage et exemples',
      'Tests pytest sur les fonctions principales',
    ],
    [
      'Le CLI fonctionne sur un CSV inconnu',
      'Les erreurs utilisateur sont propres',
      'Le code est découpé en fonctions testables',
      'Les tests se lancent avec une commande documentée',
    ],
    true
  ),
  medium: createProject(
    '1',
    'medium',
    0,
    'Async API Benchmark',
    'Créer un benchmark qui compare appels synchrones et asynchrones sur une API publique ou simulée.',
    'Comprendre concrètement timeouts, retries, concurrence et mesure de performance',
    ['Python', 'asyncio', 'httpx', 'rich', 'pytest'],
    [
      'Dépôt GitHub public',
      'Script sync et script async comparables',
      'Tableau de résultats temps moyen, erreurs et throughput',
      'Gestion de timeout, retry et limite de concurrence',
      'README expliquant quand utiliser async',
    ],
    [
      'Le benchmark est reproductible',
      'Les résultats sont affichés clairement',
      'La limite de concurrence est configurable',
      'Le code ne fuit pas de secrets API',
    ],
    true
  ),
  hard: createProject(
    '1',
    'hard',
    0,
    'Pipeline Python production-ready',
    'Construire un pipeline local qui ingère des fichiers, valide les données, transforme et exporte un dataset propre.',
    'Livrer un projet Python proche d’un standard professionnel',
    ['Python', 'Pandas', 'Pydantic', 'pytest', 'Docker', 'Makefile'],
    [
      'Dépôt GitHub public',
      'Architecture src/tests/data/docs',
      'Validation des entrées avec Pydantic ou logique équivalente',
      'Commande unique pour lancer pipeline et tests',
      'Dockerfile ou documentation d’environnement',
      'Rapport final avec limites et améliorations possibles',
    ],
    [
      'Le projet s’installe sans étape implicite',
      'Le pipeline gère les fichiers invalides',
      'Les tests couvrent validation et transformation',
      'Le README permet à Rouky de reproduire l’exécution',
    ],
    true
  ),
}

// Phase 2 Projects
const phase2Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '2',
    'easy',
    0,
    'Recherche vectorielle jouet',
    'Créer un moteur de recherche minimal qui classe de courts documents par similarité cosinus.',
    'Relier algèbre linéaire, représentations vectorielles et recherche sémantique',
    ['Python', 'NumPy', 'scikit-learn', 'Jupyter Notebook'],
    [
      'Notebook ou script reproductible',
      'Dataset de 30 documents courts',
      'Implémentation de similarité cosinus',
      'Exemples de 5 requêtes avec top 5 résultats',
    ],
    [
      'Les scores de similarité sont corrects',
      'Les résultats sont triés et interprétés',
      'Les limites de la méthode sont expliquées',
    ]
  ),
  medium: createProject(
    '2',
    'medium',
    0,
    'Gradient Descent Lab',
    'Créer un laboratoire visuel pour comprendre l’effet du learning rate, du bruit et de la régularisation.',
    'Rendre visible le comportement d’un optimiseur sur une fonction simple',
    ['Python', 'NumPy', 'Matplotlib ou Plotly', 'Jupyter Notebook'],
    [
      'Dépôt GitHub public',
      'Notebook explicatif',
      'Implémentation from scratch de gradient descent',
      'Graphiques comparant plusieurs learning rates',
      'Section d’analyse des échecs : divergence, lenteur, oscillations',
    ],
    [
      'Le gradient est calculé ou dérivé explicitement',
      'Les visualisations permettent de comparer les paramètres',
      'Les conclusions sont reliées à l’entraînement de modèles ML',
    ],
    true
  ),
  hard: createProject(
    '2',
    'hard',
    0,
    'MLP NumPy from scratch',
    'Implémenter un petit réseau de neurones sans framework deep learning pour classifier un dataset simple.',
    'Comprendre forward pass, loss, backpropagation, régularisation et évaluation',
    ['Python', 'NumPy', 'scikit-learn datasets', 'pytest', 'Matplotlib'],
    [
      'Dépôt GitHub public',
      'Implémentation MLP sans PyTorch/TensorFlow',
      'Fonctions forward, loss, backward et update',
      'Courbes loss/accuracy',
      'Tests sur dimensions et gradients simples',
      'README expliquant les choix mathématiques',
    ],
    [
      'Le modèle apprend mieux que le hasard',
      'Le code sépare modèle, entraînement et évaluation',
      'Les formes de tenseurs sont documentées',
      'Rouky pourra relancer l’entraînement depuis le README',
    ],
    true
  ),
}

// Phase 3 Projects
const phase3Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '3',
    'easy',
    0,
    'Classifieur spam',
    'Créer un classifieur binaire pour détecter les emails spam.',
    'Appliquer les concepts de ML supervisé',
    ['Python', 'scikit-learn', 'Pandas'],
    ['Code du classifieur', 'Jeu de données', 'Évaluation'],
    ['Précision > 90%', 'Rappel > 90%', 'Code propre']
  ),
  medium: createProject(
    '3',
    'medium',
    0,
    'Prédiction de churn client',
    'Prédire quels clients sont susceptibles de partir.',
    'Résoudre un problème business réel avec ML',
    ['Python', 'scikit-learn/XGBoost', 'Pandas', 'Matplotlib'],
    ['Code du modèle', 'Analyse exploratoire', 'Visualisations', 'Rapport'],
    ['AUC-ROC > 0.85', 'Interprétation des features', 'Recommandations business']
  ),
  hard: createProject(
    '3',
    'hard',
    0,
    'Mini-framework AutoML',
    'Créer un système automatisé pour tester plusieurs modèles.',
    'Automatiser le processus ML',
    ['Python', 'scikit-learn', 'Optuna/GridSearch'],
    ['Code du framework', 'Tests sur plusieurs datasets', 'Documentation'],
    ['Automatisation complète', 'Comparaison de modèles', 'Sélection automatique du meilleur']
  ),
}

// Phase 4 Projects
const phase4Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '4',
    'easy',
    0,
    'Classifieur d’images avec transfer learning',
    'Utiliser un modèle pré-entraîné pour classer des images.',
    'Appliquer le transfer learning',
    ['Python', 'PyTorch/TensorFlow', 'Hugging Face'],
    ['Code du classifieur', 'Fine-tuning', 'Évaluation'],
    ['Précision > 85% sur test', 'Utilisation correcte du transfer learning']
  ),
  medium: createProject(
    '4',
    'medium',
    0,
    'Sentiment analysis LSTM vs BERT',
    'Comparer les performances d’un LSTM et BERT pour l’analyse de sentiment.',
    'Comparer architectures classiques et transformers',
    ['Python', 'PyTorch/Hugging Face', 'scikit-learn'],
    ['Code des deux modèles', 'Comparaison des résultats', 'Analyse'],
    ['Implémentation correcte des deux modèles', 'Comparaison équitable', 'Conclusion argumentée']
  ),
  hard: createProject(
    '4',
    'hard',
    0,
    'Mini GPT from scratch',
    'Implémenter un transformer simplifié pour générer du texte.',
    'Comprendre les transformers de l’intérieur',
    ['Python', 'PyTorch', 'NumPy'],
    ['Code du mini GPT', 'Training script', 'Génération de texte'],
    ['Architecture transformer correcte', 'Génération cohérente', 'Code documenté']
  ),
}

// Phase 5 Projects
const phase5Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '5',
    'easy',
    0,
    'Pipeline NER',
    'Créer un pipeline pour la reconnaissance d’entités nommées.',
    'Extraire des entités de texte non structuré',
    ['Python', 'spaCy/Hugging Face', 'Pandas'],
    ['Pipeline fonctionnel', 'Évaluation sur corpus test', 'Documentation'],
    ['Précision > 80%', 'Rappel > 80%', 'F1-score > 80%']
  ),
  medium: createProject(
    '5',
    'medium',
    0,
    'Moteur de recherche sémantique',
    'Créer un moteur de recherche qui comprend la sémantique.',
    'Aller au-delà de la recherche par mots-clés',
    ['Python', 'Hugging Face', 'FAISS/Pinecone'],
    ['Code du moteur', 'Index de documents', 'Interface de recherche', 'Évaluation'],
    ['Recherche sémantique fonctionnelle', 'Results pertinents', 'Évaluation quantitative']
  ),
  hard: createProject(
    '5',
    'hard',
    0,
    'Fine-tuning BERT multi-label',
    'Fine-tuner un modèle BERT pour la classification multi-label.',
    'Adapter un transformer à une tâche spécifique',
    ['Python', 'Hugging Face Transformers', 'PyTorch', 'Datasets'],
    ['Code de fine-tuning', 'Dataset préparé', 'Modèle entraîné', 'Évaluation'],
    ['Précision > 85%', 'F1-score macro > 85%', 'Processus documenté']
  ),
}

// Phase 6 Projects
const phase6Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '6',
    'easy',
    0,
    'Chatbot multi-provider',
    'Créer un chatbot qui peut utiliser plusieurs API LLM.',
    'Abstraire les différences entre providers',
    ['Python/TypeScript', 'OpenAI SDK', 'Anthropic SDK', 'FastAPI/Express'],
    ['Code du chatbot', 'Interface simple', 'Tests'],
    ['Fonctionnel avec au moins 2 providers', 'Abstraction propre', 'Gestion d’erreurs']
  ),
  medium: createProject(
    '6',
    'medium',
    0,
    'Analyseur de CV par IA',
    'Créer un système qui analyse et score des CVs.',
    'Automatiser l’évaluation de CVs',
    ['Python/TypeScript', 'LLM API', 'Pandas', 'PDF parsing'],
    ['Code de l’analyseur', 'Exemples de CVs', 'Système de scoring', 'Interface'],
    ['Extraction correcte des informations', 'Scoring pertinent', 'Rapport clair']
  ),
  hard: createProject(
    '6',
    'hard',
    0,
    'Middleware IA de production',
    'Concevoir un middleware robuste pour des applications IA.',
    'Créer une infrastructure fiable pour l’IA en production',
    ['TypeScript/Python', 'FastAPI/Express', 'Docker', 'Redis'],
    ['Architecture du middleware', 'Code source', 'Tests', 'Documentation', 'Dockerfile'],
    ['Middleware fonctionnel', 'Gestion des erreurs robuste', 'Monitoring', 'Scalabilité']
  ),
}

// Phase 7 Projects
const phase7Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '7',
    'easy',
    0,
    'Dashboard comparatif de réponses LLM',
    'Créer une interface pour comparer les réponses de différents LLM.',
    'Visualiser les différences entre modèles',
    ['TypeScript', 'React/Next.js', 'LLM APIs'],
    ['Dashboard interactif', 'Comparaison side-by-side', 'Metric de qualité'],
    ['Interface intuitive', 'Comparaison claire', 'Metrics pertinentes']
  ),
  medium: createProject(
    '7',
    'medium',
    0,
    'Routeur intelligent multi-LLM',
    'Créer un système qui route les requêtes vers le meilleur LLM.',
    'Optimiser coût et qualité',
    ['TypeScript/Python', 'LangChain/LangGraph', 'LLM APIs'],
    ['Code du routeur', 'Stratégie de routing', 'Tests', 'Évaluation'],
    ['Routing intelligent', 'Optimisation coût/qualité', 'Évaluation quantitative']
  ),
  hard: createProject(
    '7',
    'hard',
    0,
    'Plateforme complète d’orchestration multi-LLM',
    'Concevoir une plateforme complète pour gérer plusieurs LLM.',
    'Créer une solution d’entreprise pour l’orchestration LLM',
    ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL', 'Docker', 'Kubernetes'],
    ['Architecture complète', 'Code source', 'Database schema', 'API', 'Interface', 'Documentation'],
    ['Fonctionnalités complètes', 'Scalabilité', 'Fiabilité', 'Monitoring']
  ),
}

// Phase 8 Projects
const phase8Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '8',
    'easy',
    0,
    'Q&A sur documents PDF',
    'Créer un système qui répond aux questions sur des documents PDF.',
    'Implémenter un RAG basique',
    ['Python/TypeScript', 'LLM API', 'FAISS/Chroma', 'PyPDF/Pdf.js'],
    ['Code du système RAG', 'Index de documents', 'Interface de Q&A', 'Tests'],
    ['Recherche fonctionnelle', 'Réponses pertinentes', 'Indexation efficace']
  ),
  medium: createProject(
    '8',
    'medium',
    0,
    'RAG avec reranking',
    'Améliorer un système RAG avec du reranking.',
    'Améliorer la pertinence des résultats',
    ['Python/TypeScript', 'LLM API', 'FAISS/Pinecone', 'Reranking model'],
    ['Code du RAG amélioré', 'Système de reranking', 'Évaluation', 'Documentation'],
    ['RAG fonctionnel', 'Reranking efficace', 'Amélioration mesurable']
  ),
  hard: createProject(
    '8',
    'hard',
    0,
    'Système RAG production-grade',
    'Créer un système RAG robuste et scalable.',
    'Concevoir un RAG pour la production',
    ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL + pgvector', 'Redis', 'Docker'],
    ['Architecture complète', 'Code source', 'Database schema', 'API', 'Interface', 'Monitoring'],
    ['Fonctionnalités complètes', 'Scalabilité', 'Fiabilité', 'Performance']
  ),
}

// Phase 9 Projects
const phase9Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '9',
    'easy',
    0,
    'Agent avec outils simples',
    'Créer un agent qui peut utiliser des outils externes.',
    'Implémenter tool calling basique',
    ['Python/TypeScript', 'LangChain/LangGraph', 'LLM API'],
    ['Code de l’agent', 'Définition des outils', 'Tests', 'Documentation'],
    ['Agent fonctionnel', 'Utilisation correcte des outils', 'Gestion d’erreurs']
  ),
  medium: createProject(
    '9',
    'medium',
    0,
    'Agent de recherche web',
    'Créer un agent qui peut rechercher des informations sur le web.',
    'Automatiser la recherche et la synthèse d’informations',
    ['Python/TypeScript', 'LangChain/LangGraph', 'LLM API', 'Web search API'],
    ['Code de l’agent', 'Système de recherche', 'Mémoire de conversation', 'Interface'],
    ['Recherche web fonctionnelle', 'Synthèse pertinente', 'Mémoire efficace']
  ),
  hard: createProject(
    '9',
    'hard',
    0,
    'Système multi-agent complet',
    'Concevoir un système avec plusieurs agents qui collaborent.',
    'Créer une intelligence collective',
    ['TypeScript', 'LangGraph', 'LLM APIs', 'PostgreSQL', 'Redis'],
    ['Architecture du système', 'Code des agents', 'Coordination', 'Interface', 'Monitoring'],
    ['Agents fonctionnels', 'Collaboration efficace', 'Système scalable', 'Observabilité']
  ),
}

// Phase 10 Projects
const phase10Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '10',
    'easy',
    0,
    'Fine-tuning d’un petit modèle de classification',
    'Fine-tuner un modèle de classification sur un dataset simple.',
    'Adapter un modèle à une tâche spécifique',
    ['Python', 'Hugging Face Transformers', 'PyTorch', 'Datasets'],
    ['Code de fine-tuning', 'Dataset préparé', 'Modèle entraîné', 'Évaluation'],
    ['Précision > 85%', 'Processus documenté', 'Code reproducible']
  ),
  medium: createProject(
    '10',
    'medium',
    0,
    'LoRA sur modèle open-source',
    'Appliquer LoRA pour fine-tuner efficacement un grand modèle.',
    'Fine-tuner avec peu de ressources',
    ['Python', 'Hugging Face Transformers', 'PEFT', 'Accelerate'],
    ['Code LoRA', 'Dataset préparé', 'Modèle fine-tuné', 'Évaluation'],
    ['LoRA correctement implémenté', 'Efficacité mémoire', 'Résultats comparables au fine-tuning complet']
  ),
  hard: createProject(
    '10',
    'hard',
    0,
    'Pipeline complet de fine-tuning',
    'Créer un pipeline complet du dataset au modèle déployé.',
    'Automatiser tout le processus',
    ['Python', 'Hugging Face Transformers', 'Weights & Biases', 'Docker', 'MLflow'],
    ['Pipeline complet', 'Code source', 'Documentation', 'Tests', 'Dockerfile'],
    ['Pipeline fonctionnel', 'De la préparation des données au déploiement', 'Suivi expérimental', 'Reproductibilité']
  ),
}

// Phase 11 Projects
const phase11Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '11',
    'easy',
    0,
    'Générateur d’images prompté',
    'Créer une interface pour générer des images avec un modèle diffusion.',
    'Expérimenter avec la génération d’images',
    ['TypeScript', 'Next.js', 'Stable Diffusion API/Ollama'],
    ['Interface de génération', 'Gestion des prompts', 'Galerie d’images', 'Documentation'],
    ['Génération fonctionnelle', 'Interface intuitive', 'Qualité des images']
  ),
  medium: createProject(
    '11',
    'medium',
    0,
    'Application vision + texte',
    'Créer une application qui combine vision par ordinateur et NLP.',
    'Travailler avec des modèles multimodaux',
    ['TypeScript', 'Next.js', 'Hugging Face Transformers', 'OpenCV/Pillow'],
    ['Application fonctionnelle', 'Intégration vision+texte', 'Interface', 'Tests'],
    ['Fonctionnalités multimodales', 'Intégration fluide', 'Expérience utilisateur']
  ),
  hard: createProject(
    '11',
    'hard',
    0,
    'Pipeline multimodal complet',
    'Concevoir un pipeline pour traiter texte, images, audio et vidéo.',
    'Créer un système multimodal complet',
    ['TypeScript/Python', 'Next.js/FastAPI', 'Hugging Face Transformers', 'Docker', 'Redis'],
    ['Architecture du pipeline', 'Code source', 'Traitement multimodal', 'Interface', 'Documentation'],
    ['Pipeline fonctionnel', 'Traitement efficace', 'Scalabilité', 'Intégration des modalités']
  ),
}

// Phase 12 Projects
const phase12Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '12',
    'easy',
    0,
    'Dockeriser une API IA',
    'Containeriser une application IA existante.',
    'Rendre une API portable et reproductible',
    ['Docker', 'Python/Node.js', 'FastAPI/Express'],
    ['Dockerfile', 'docker-compose.yml', 'Documentation', 'Tests'],
    ['API fonctionnelle dans container', 'Configuration Docker correcte', 'Portabilité']
  ),
  medium: createProject(
    '12',
    'medium',
    0,
    'Monitoring d’une application LLM',
    'Ajouter monitoring complet à une application LLM.',
    'Surveiller performance, coût et qualité',
    ['TypeScript/Python', 'Prometheus', 'Grafana', 'OpenTelemetry'],
    ['Système de monitoring', 'Dashboard Grafana', 'Alertes', 'Documentation'],
    ['Monitoring complet', 'Metrics pertinentes', 'Alertes configurées', 'Visualisation claire']
  ),
  hard: createProject(
    '12',
    'hard',
    0,
    'Pipeline LLMOps complet',
    'Créer un pipeline LLMOps de bout en bout.',
    'Automatiser déploiement, monitoring et maintenance',
    ['TypeScript/Python', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'CI/CD'],
    ['Architecture complète', 'Pipeline CI/CD', 'Infrastructure as Code', 'Monitoring', 'Documentation'],
    ['Pipeline fonctionnel', 'Déploiement automatisé', 'Monitoring complet', 'Maintenabilité']
  ),
}

// Phase 13 Projects
const phase13Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '13',
    'easy',
    0,
    'Schéma d’architecture IA',
    'Créer un schéma d’architecture pour un système IA.',
    'Visualiser la conception d’un système',
    ['Draw.io', 'Excalidraw', 'Lucidchart', 'Figma'],
    ['Schéma d’architecture', 'Documentation', 'Explications'],
    ['Schéma clair et détaillé', 'Documentation complète', 'Explications des choix']
  ),
  medium: createProject(
    '13',
    'medium',
    0,
    'API design d’un produit IA',
    'Concevoir une API complète pour un produit IA.',
    'Créer une API REST ou GraphQL bien conçue',
    ['OpenAPI/Swagger', 'FastAPI/Express', 'TypeScript/Python'],
    ['Spécification OpenAPI', 'Code de l’API', 'Documentation', 'Tests'],
    ['API bien conçue', 'Spécification complète', 'Documentation claire', 'Tests automatisés']
  ),
  hard: createProject(
    '13',
    'hard',
    0,
    'System design complet interview-ready',
    'Préparer un system design complet pour un entretien.',
    'Maîtriser la conception de systèmes IA à grande échelle',
    ['Markdown', 'Draw.io'],
    ['Document de system design', 'Schéma d’architecture', 'Analyse des trade-offs', 'Calculs de capacité'],
    ['System design complet', 'Analyse approfondie', 'Choix justifiés', 'Présentation claire']
  ),
}

// Phase 14 Projects
const phase14Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '14',
    'easy',
    0,
    'Base SQL de suivi IA',
    'Créer une base de données pour suivre les expériences IA.',
    'Stocker et organiser les données d’expérimentation',
    ['PostgreSQL', 'Prisma', 'Python/TypeScript'],
    ['Schema de base', 'Script de création', 'Code d’accès', 'Documentation'],
    ['Schema bien conçu', 'Requêtes optimisées', 'Code propre', 'Documentation']
  ),
  medium: createProject(
    '14',
    'medium',
    0,
    'Moteur de recherche pgvector',
    'Créer un moteur de recherche vectoriel avec pgvector.',
    'Combiner SQL et recherche vectorielle',
    ['PostgreSQL + pgvector', 'Prisma', 'TypeScript/Python'],
    ['Schema de base', 'Index vectoriel', 'Code de recherche', 'Tests'],
    ['Recherche vectorielle fonctionnelle', 'Requêtes hybrides', 'Performance acceptable']
  ),
  hard: createProject(
    '14',
    'hard',
    0,
    'Backend IA avec PostgreSQL + pgvector',
    'Concevoir un backend complet pour une application IA.',
    'Créer une infrastructure robuste pour l’IA',
    ['TypeScript', 'NestJS/FastAPI', 'Prisma', 'PostgreSQL + pgvector', 'Docker'],
    ['Architecture du backend', 'Schema de base', 'API', 'Documentation', 'Dockerfile'],
    ['Backend fonctionnel', 'Intégration pgvector', 'Performance', 'Scalabilité']
  ),
}

// Phase 15 Projects
const phase15Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '15',
    'easy',
    0,
    'Exécuter un modèle local avec Ollama',
    'Déployer et exécuter un modèle de langage en local.',
    'Utiliser des LLM locaux',
    ['Ollama', 'Python/TypeScript'],
    ['Script d’exécution', 'Configuration', 'Tests', 'Documentation'],
    ['Modèle fonctionnel en local', 'Configuration correcte', 'Performance acceptable']
  ),
  medium: createProject(
    '15',
    'medium',
    0,
    'Comparer latence/coût de plusieurs modèles',
    'Créer un benchmark de performance et coût.',
    'Évaluer différents modèles et providers',
    ['Python/TypeScript', 'LLM APIs', 'Ollama', 'Prometheus (optionnel)'],
    ['Benchmark script', 'Collecte de données', 'Visualisation', 'Rapport'],
    ['Benchmark complet', 'Données précises', 'Visualisation claire', 'Analyse pertinente']
  ),
  hard: createProject(
    '15',
    'hard',
    0,
    'Serveur d’inférence optimisé',
    'Créer un serveur d’inférence performant.',
    'Optimiser la vitesse et le coût',
    ['Python', 'FastAPI', 'vLLM/TensorRT-LLM', 'Docker', 'NVIDIA GPU (optionnel)'],
    ['Serveur d’inférence', 'Optimisations', 'Benchmark', 'Documentation', 'Dockerfile'],
    ['Serveur performant', 'Optimisations efficaces', 'Benchmark comparatif', 'Scalabilité']
  ),
}

// Phase 16 Projects
const phase16Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '16',
    'easy',
    0,
    'Environnement RL simple',
    'Créer un environnement de RL pour tester des agents.',
    'Comprendre les bases du RL',
    ['Python', 'Gymnasium'],
    ['Environnement RL', 'Code de l’agent', 'Tests', 'Documentation'],
    ['Environnement fonctionnel', 'Agent basique', 'Apprentissage visible']
  ),
  medium: createProject(
    '16',
    'medium',
    0,
    'Agent RL sur gymnasium',
    'Entraîner un agent RL sur un environnement standard.',
    'Appliquer RL à des problèmes classiques',
    ['Python', 'Gymnasium', 'Stable Baselines3'],
    ['Code de l’agent', 'Entraînement', 'Évaluation', 'Visualisation', 'Documentation'],
    ['Agent entraîné', 'Performance mesurable', 'Visualisation de l’apprentissage']
  ),
  hard: createProject(
    '16',
    'hard',
    0,
    'Simulation de RLHF simplifiée',
    'Créer une simulation simplifiée du processus RLHF.',
    'Comprendre RLHF de manière pratique',
    ['Python', 'PyTorch', 'Transformers'],
    ['Simulation RLHF', 'Modèle de récompense', 'Processus d’optimisation', 'Évaluation', 'Documentation'],
    ['Simulation fonctionnelle', 'Modèle de récompense', 'Optimisation efficace', 'Résultats interprétables']
  ),
}

// Phase 17 Projects
const phase17Projects: Record<ProjectDifficulty, Project> = {
  easy: createProject(
    '17',
    'easy',
    0,
    'Checklist sécurité IA',
    'Créer une checklist complète pour évaluer la sécurité des systèmes IA.',
    'Systématiser l’évaluation de sécurité',
    ['Markdown', 'Excel/Sheets'],
    ['Checklist complète', 'Critères détaillés', 'Exemples', 'Documentation'],
    ['Checklist exhaustive', 'Critères pertinents', 'Exemples pratiques']
  ),
  medium: createProject(
    '17',
    'medium',
    0,
    'Filtre anti-prompt injection',
    'Créer un système pour détecter et bloquer les prompt injections.',
    'Protéger contre les attaques par prompt injection',
    ['Python/TypeScript', 'LLM API', 'Regex/ML'],
    ['Système de détection', 'Tests avec prompts malveillants', 'Évaluation', 'Documentation'],
    ['Détection efficace', 'Faux positifs limités', 'Tests complets', 'Intégration facile']
  ),
  hard: createProject(
    '17',
    'hard',
    0,
    'Dashboard de gouvernance IA',
    'Créer un dashboard pour surveiller la conformité et la gouvernance IA.',
    'Centraliser le monitoring de gouvernance',
    ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL', 'Chart.js/Recharts'],
    ['Dashboard interactif', 'Collecte de métriques', 'Alertes', 'Rapports', 'Documentation'],
    ['Dashboard complet', 'Metrics pertinentes', 'Alertes configurées', 'Rapports automatiques']
  ),
}

// ============================================
// CAPSTONE PROJECT
// ============================================

const capstonePhase: Phase = {
  id: 'capstone',
  title: 'Capstone final — Plateforme IA complète',
  phaseNumber: 18,
  objective: 'Construire une architecture complète combinant tous les concepts appris : Authentification, Dashboard utilisateur, Roadmap, Suivi de progression, Système multi-LLM, RAG, Agents, Monitoring, Cost tracking, Sécurité, Observabilité',
  description: 'Ce projet final vous permettra de démontrer votre maîtrise complète de l’ingénierie IA en construisant une plateforme professionnelle et scalable.',
  difficulty: 'advanced',
  estimatedTime: '4-8 semaines',
  modules: [
    { id: 'capstone-module-0', title: 'Conception de l’architecture globale' },
    { id: 'capstone-module-1', title: 'Implémentation du backend et de la base de données' },
    { id: 'capstone-module-2', title: 'Développement du frontend et de l’UI' },
    { id: 'capstone-module-3', title: 'Intégration des fonctionnalités IA (LLM, RAG, Agents)' },
    { id: 'capstone-module-4', title: 'Mise en place du monitoring et de l’observabilité' },
    { id: 'capstone-module-5', title: 'Sécurisation de la plateforme' },
    { id: 'capstone-module-6', title: 'Déploiement et CI/CD' },
    { id: 'capstone-module-7', title: 'Documentation complète' },
  ],
  tasks: generateTasks('capstone', [
    'Définir l’architecture globale de la plateforme',
    'Concevoir le schema de la base de données',
    'Mettre en place l’authentification',
    'Développer l’API backend',
    'Créer le dashboard utilisateur',
    'Implémenter le système de roadmap',
    'Développer le suivi de progression',
    'Intégrer le système multi-LLM',
    'Ajouter les fonctionnalités RAG',
    'Implémenter les agents IA',
    'Mettre en place le monitoring complet',
    'Ajouter le cost tracking',
    'Sécuriser toutes les composantes',
    'Configurer l’observabilité',
    'Déployer la plateforme',
    'Mettre en place CI/CD',
    'Documenter le code et les processus',
    'Tester complètement la plateforme',
    'Préparer la démonstration finale',
  ]),
  projects: {
    easy: createProject(
      'capstone',
      'easy',
      0,
      'MVP de la plateforme',
      'Créer une version minimale viable avec les fonctionnalités de base.',
      'Démontrer la faisabilité du projet',
      ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL'],
      ['Backend fonctionnel', 'Frontend basique', 'Base de données', 'Fonctionnalités principales'],
      ['MVP opérationnel', 'Fonctionnalités de base implémentées', 'Architecture solide']
    ),
    medium: createProject(
      'capstone',
      'medium',
      0,
      'Plateforme complète avec fonctionnalités avancées',
      'Ajouter toutes les fonctionnalités avancées : monitoring, sécurité, optimisation.',
      'Créer une plateforme professionnelle',
      ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
      ['Plateforme complète', 'Fonctionnalités avancées', 'Optimisations', 'Documentation'],
      ['Toutes les fonctionnalités implémentées', 'Performance optimisée', 'Documentation complète']
    ),
    hard: createProject(
      'capstone',
      'hard',
      0,
      'Plateforme entreprise-ready avec haute disponibilité',
      'Concevoir une plateforme scalable, sécurisée et hautement disponible.',
      'Créer une solution prête pour la production',
      ['TypeScript', 'Next.js', 'NestJS (backend)', 'Prisma', 'PostgreSQL', 'Redis', 'Kubernetes', 'Prometheus', 'Grafana', 'CI/CD'],
      ['Architecture microservices', 'Plateforme complète', 'Monitoring avancé', 'Sécurité renforcée', 'Documentation professionnelle', 'CI/CD automatisé'],
      ['Solution entreprise-ready', 'Haute disponibilité', 'Scalabilité horizontale', 'Sécurité complète', 'Monitoring temps réel']
    ),
  },
  category: 'capstone',
}

// ============================================
// PHASES DEFINITION
// ============================================

const createPhase = (
  phaseNumber: number,
  title: string,
  objective: string,
  description: string,
  difficulty: PhaseDifficulty,
  estimatedTime: string,
  modules: Module[],
  tasks: Task[],
  projects: Record<ProjectDifficulty, Project>,
  category: string
): Phase => ({
  id: `phase-${phaseNumber}`,
  title,
  phaseNumber,
  objective,
  description,
  difficulty,
  estimatedTime,
  modules,
  tasks,
  projects,
  category,
})

export const phases: Phase[] = [
  createPhase(
    0,
    'Orientation et mentalité',
    'Comprendre le rôle d’un ingénieur IA moderne.',
    'Cette phase vous aidera à comprendre le paysage de l’ingénierie IA, les différentes spécialisations et les compétences clés à acquérir.',
    'beginner',
    '1-2 semaines',
    phase0Modules,
    phase0Tasks,
    phase0Projects,
    'fundamentals'
  ),
  createPhase(
    1,
    'Fondations Python',
    'Écrire du Python propre et utilisable en production.',
    'Maîtrisez les fondamentaux du Python moderne, les bonnes pratiques et les outils essentiels pour le développement professionnel.',
    'beginner',
    '3-4 semaines',
    phase1Modules,
    phase1Tasks,
    phase1Projects,
    'programming'
  ),
  createPhase(
    2,
    'Mathématiques et statistiques pour l’IA',
    'Comprendre les bases mathématiques utiles à l’IA.',
    'Acquérez les connaissances mathématiques fondamentales nécessaires pour comprendre et développer des algorithmes d’IA.',
    'intermediate',
    '3-4 semaines',
    phase2Modules,
    phase2Tasks,
    phase2Projects,
    'math'
  ),
  createPhase(
    3,
    'Machine Learning fondamental',
    'Maîtriser les bases du ML classique.',
    'Apprenez les algorithmes classiques de machine learning, leurs forces, leurs faiblesses et leurs cas d’usage.',
    'intermediate',
    '4-5 semaines',
    phase3Modules,
    phase3Tasks,
    phase3Projects,
    'ml'
  ),
  createPhase(
    4,
    'Deep Learning',
    'Comprendre les réseaux de neurones avant les transformers.',
    'Plongez dans les réseaux de neurones profonds, les architectures classiques et les concepts fondamentaux du deep learning.',
    'intermediate',
    '4-5 semaines',
    phase4Modules,
    phase4Tasks,
    phase4Projects,
    'deep-learning'
  ),
  createPhase(
    5,
    'NLP et Transformers',
    'Maîtriser les bases du traitement du langage et des transformers.',
    'Découvrez les techniques modernes de NLP, l’architecture transformer et comment elle a révolutionné le domaine.',
    'intermediate',
    '4-5 semaines',
    phase5Modules,
    phase5Tasks,
    phase5Projects,
    'nlp'
  ),
  createPhase(
    6,
    'LLM Engineering',
    'Savoir construire des produits autour des grands modèles de langage.',
    'Apprenez à utiliser efficacement les LLM, à optimiser leur utilisation et à construire des applications robustes.',
    'intermediate',
    '4-5 semaines',
    phase6Modules,
    phase6Tasks,
    phase6Projects,
    'llm'
  ),
  createPhase(
    7,
    'Orchestration multi-LLM',
    'Concevoir des systèmes multi-modèles robustes.',
    'Découvrez comment combiner plusieurs LLM, router les requêtes et créer des systèmes résilients.',
    'advanced',
    '3-4 semaines',
    phase7Modules,
    phase7Tasks,
    phase7Projects,
    'orchestration'
  ),
  createPhase(
    8,
    'RAG et bases vectorielles',
    'Construire des systèmes donnant accès à une base de connaissance privée.',
    'Maîtrisez les techniques RAG pour créer des systèmes qui combinent LLM et données privées.',
    'advanced',
    '3-4 semaines',
    phase8Modules,
    phase8Tasks,
    phase8Projects,
    'rag'
  ),
  createPhase(
    9,
    'Agents IA et systèmes agentiques',
    'Créer des agents capables de raisonner, utiliser des outils et accomplir des tâches.',
    'Apprenez à créer des agents autonomes qui peuvent interagir avec leur environnement.',
    'advanced',
    '3-4 semaines',
    phase9Modules,
    phase9Tasks,
    phase9Projects,
    'agents'
  ),
  createPhase(
    10,
    'Fine-tuning',
    'Adapter les modèles à des tâches spécifiques.',
    'Découvrez comment adapter les modèles pré-entraînés à vos besoins spécifiques avec différentes techniques.',
    'advanced',
    '3-4 semaines',
    phase10Modules,
    phase10Tasks,
    phase10Projects,
    'fine-tuning'
  ),
  createPhase(
    11,
    'IA générative multimodale',
    'Comprendre et exploiter les modèles génératifs texte, image, audio et vidéo.',
    'Explorez les différentes modalités de la génération IA et comment les combiner.',
    'advanced',
    '2-3 semaines',
    phase11Modules,
    phase11Tasks,
    phase11Projects,
    'multimodal'
  ),
  createPhase(
    12,
    'MLOps et LLMOps',
    'Déployer, monitorer et maintenir des systèmes IA en production.',
    'Apprenez les meilleures pratiques pour déployer et maintenir des systèmes IA en production.',
    'advanced',
    '3-4 semaines',
    phase12Modules,
    phase12Tasks,
    phase12Projects,
    'mlops'
  ),
  createPhase(
    13,
    'AI System Design',
    'Savoir concevoir des architectures IA solides.',
    'Développez vos compétences en conception de systèmes IA, en tenant compte de la scalabilité, de la résilience et du coût.',
    'advanced',
    '2-3 semaines',
    phase13Modules,
    phase13Tasks,
    phase13Projects,
    'system-design'
  ),
  createPhase(
    14,
    'SQL et pgvector',
    'Maîtriser les bases de données pour applications IA.',
    'Apprenez à utiliser PostgreSQL et pgvector pour stocker et rechercher efficacement des embeddings.',
    'intermediate',
    '2-3 semaines',
    phase14Modules,
    phase14Tasks,
    phase14Projects,
    'database'
  ),
  createPhase(
    15,
    'Quantization et optimisation',
    'Optimiser le coût, la vitesse et la mémoire des modèles.',
    'Découvrez les techniques pour optimiser l’inference des modèles : quantification, distillation, batching.',
    'advanced',
    '2-3 semaines',
    phase15Modules,
    phase15Tasks,
    phase15Projects,
    'optimization'
  ),
  createPhase(
    16,
    'Reinforcement Learning',
    'Comprendre les bases du RL et son lien avec les LLM.',
    'Apprenez les concepts fondamentaux du reinforcement learning et comment ils sont appliqués aux LLM.',
    'advanced',
    '2-3 semaines',
    phase16Modules,
    phase16Tasks,
    phase16Projects,
    'rl'
  ),
  createPhase(
    17,
    'Éthique, sécurité et gouvernance IA',
    'Construire des systèmes IA responsables et fiables.',
    'Comprenez les enjeux éthiques, de sécurité et de gouvernance pour construire des systèmes IA responsables.',
    'advanced',
    '2-3 semaines',
    phase17Modules,
    phase17Tasks,
    phase17Projects,
    'ethics'
  ),
]

// ============================================
// COMPLETE ROADMAP
// ============================================

export const roadmap: Roadmap = {
  id: 'ai-engineer-roadmap-2026',
  title: 'Devenir Ingénieur IA - Roadmap 2026',
  description: 'Roadmap interactive et gamifiée pour devenir AI Engineer sur le marché actuel. Maîtrisez tous les concepts clés de l\'ingénierie IA, du Python aux LLM, en passant par le Deep Learning, le RAG et les Agents.',
  totalPhases: phases.length,
  totalTasks: phases.reduce((sum, phase) => sum + phase.tasks.length, 0),
  totalProjects: phases.reduce((sum, phase) => sum + 3, 0) * phases.length + 3,
  phases,
  capstone: capstonePhase,
}

// ============================================
// XP VALUES EXPORT
// ============================================

export { XP_VALUES }
