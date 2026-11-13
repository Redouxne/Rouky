import type { Phase, Project, Task } from '@/types/roadmap'

type Resource = { label: string; href: string }

// Documentation maintenue par les auteurs des outils. Les exercices restent
// indépendants d'un fournisseur payant : une alternative locale suffit.
const resources: Record<number, Resource[]> = {
  1: [{ label: 'OWASP Top 10:2025', href: 'https://top10.owasp.org/' }, { label: 'OWASP : validation des entrées', href: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html' }, { label: 'OWASP : gestion des secrets', href: 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html' }],
  3: [{ label: 'Guide scikit-learn', href: 'https://scikit-learn.org/stable/user_guide.html' }, { label: 'Évaluation des modèles', href: 'https://scikit-learn.org/stable/modules/model_evaluation.html' }],
  4: [{ label: 'Tutoriels PyTorch', href: 'https://docs.pytorch.org/tutorials/' }],
  5: [{ label: 'Cours NLP Hugging Face', href: 'https://huggingface.co/learn/llm-course/chapter1/1' }, { label: 'Documentation Transformers', href: 'https://huggingface.co/docs/transformers/index' }],
  6: [{ label: 'Guide OpenAI API', href: 'https://platform.openai.com/docs/overview' }, { label: 'Guide Ollama', href: 'https://docs.ollama.com/' }, { label: 'Guide de sécurité OWASP LLM', href: 'https://genai.owasp.org/llm-top-10/' }, { label: 'Prompts : critères de réussite', href: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables' }, { label: 'NIST : risques de l’IA générative', href: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence' }],
  7: [{ label: 'Spécification MCP 2026-07-28', href: 'https://modelcontextprotocol.io/specification/2026-07-28' }, { label: 'SDK TypeScript MCP', href: 'https://ts.sdk.modelcontextprotocol.io/v2/' }, { label: 'LangGraph', href: 'https://docs.langchain.com/oss/python/langgraph/overview' }],
  8: [{ label: 'Guide pgvector', href: 'https://github.com/pgvector/pgvector' }, { label: 'OCR Tesseract : améliorer les entrées', href: 'https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html' }, { label: 'Parseur de documents et chunking', href: 'https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk' }],
  9: [{ label: 'Agents SDK : traces', href: 'https://openai.github.io/openai-agents-python/tracing/' }, { label: 'Agents SDK : garde-fous', href: 'https://openai.github.io/openai-agents-python/guardrails/' }, { label: 'Exécution durable LangGraph', href: 'https://docs.langchain.com/oss/python/langgraph/durable-execution' }],
  10: [{ label: 'Guide PEFT', href: 'https://huggingface.co/docs/peft/index' }, { label: 'Guide TRL', href: 'https://huggingface.co/docs/trl/index' }],
  11: [{ label: 'OCR Tesseract', href: 'https://tesseract-ocr.github.io/tessdoc/' }, { label: 'Document AI OCR', href: 'https://docs.cloud.google.com/document-ai/docs/enterprise-document-ocr' }, { label: 'Extraction de mise en page', href: 'https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk' }],
  12: [{ label: 'Documentation OpenTelemetry', href: 'https://opentelemetry.io/docs/' }, { label: 'Guide Docker', href: 'https://docs.docker.com/get-started/' }, { label: 'OWASP ASVS 5.0', href: 'https://asvs.owasp.org/' }],
  13: [{ label: 'Architecture Well-Architected', href: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html' }, { label: 'Guide des systèmes IA', href: 'https://cloud.google.com/architecture/ai-ml' }],
  14: [{ label: 'Documentation PostgreSQL', href: 'https://www.postgresql.org/docs/current/' }, { label: 'Guide pgvector', href: 'https://github.com/pgvector/pgvector' }],
  15: [{ label: 'Documentation llama.cpp', href: 'https://github.com/ggml-org/llama.cpp' }, { label: 'Documentation vLLM', href: 'https://docs.vllm.ai/' }],
  16: [{ label: 'Introduction RL Hugging Face', href: 'https://huggingface.co/learn/deep-rl-course/unit0/introduction' }, { label: 'Guide TRL', href: 'https://huggingface.co/docs/trl/index' }],
  17: [{ label: 'NIST AI Risk Management Framework', href: 'https://www.nist.gov/itl/ai-risk-management-framework' }, { label: 'OWASP Top 10 GenAI', href: 'https://genai.owasp.org/llm-top-10/' }],
  18: [{ label: 'Architecture Well-Architected', href: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html' }, { label: 'NIST AI RMF', href: 'https://www.nist.gov/itl/ai-risk-management-framework' }],
}

const phasePractice: Record<number, string> = {
  3: 'Utilisez un jeu de données public, séparez entraînement et test avant toute transformation, puis comparez une baseline et une métrique adaptée.',
  4: 'Réalisez une expérience reproductible dans PyTorch, avec graine fixée, courbes de perte et contrôle sur un petit lot.',
  5: 'Travaillez sur un petit corpus, montrez un exemple calculé et comparez le résultat à une baseline simple.',
  6: 'Créez un exemple exécutable avec entrées valides et invalides, mesurez latence et coût, et gardez les clés côté serveur.',
  7: 'Montrez un appel réel, une défaillance simulée et la trace du routage ou du protocole ; consignez version et coûts.',
  8: 'Testez sur un corpus avec réponses de référence, conservez les pages sources et mesurez la récupération avant la génération.',
  9: 'Exécutez un scénario heureux et un scénario d’échec ; enregistrez outils, décisions, budgets et approbations humaines.',
  10: 'Documentez la licence et la provenance du jeu de données, comparez au modèle de base sur un jeu de test isolé.',
  11: 'Utilisez des exemples autorisés, conservez la provenance des médias et évaluez séparément chaque modalité et les erreurs.',
  12: 'Ajoutez un test automatisé, une mesure observable et une procédure de retour arrière à un service minimal.',
  13: 'Dessinez les flux et frontières de confiance ; chiffrez une estimation de charge, latence, coût et mode dégradé.',
  14: 'Écrivez une requête reproductible, vérifiez le plan EXPLAIN ANALYZE et testez l’isolation entre utilisateurs.',
  15: 'Comparez à qualité comparable mémoire, débit, latence et coût sur le même matériel et les mêmes requêtes.',
  16: 'Fixez l’environnement et la graine ; tracez récompense et variance sur plusieurs essais et comparez une baseline.',
  17: 'Définissez un scénario de risque, un test reproductible, une mesure de réduction et une limite résiduelle documentée.',
  18: 'Ajoutez au dépôt une preuve vérifiable : test, capture, trace ou mesure, ainsi qu’une consigne de reproduction.',
}

const projectEvidence: Record<number, string> = {
  3: 'Le rapport compare une baseline et un modèle amélioré sur un jeu de test tenu à l’écart, avec la métrique adaptée au problème',
  4: 'Les courbes entraînement/validation, la graine et la configuration matérielle permettent de reproduire l’expérience',
  5: 'Le système est comparé à une baseline lexicale et les erreurs de tokenisation ou de génération sont analysées',
  6: 'Un jeu d’entrées valides, ambiguës et adversariales mesure format, coût et erreurs de réponse',
  7: 'Les appels fournisseurs et MCP sont tracés avec leurs erreurs, latences, coûts et versions de protocole',
  8: 'Le corpus de référence permet de vérifier rappel des passages, citations et abstention quand la réponse manque',
  9: 'Les traces montrent les décisions de l’agent, ses appels d’outils, sa condition d’arrêt et les approbations humaines',
  10: 'Une comparaison au modèle de base sur un jeu de test distinct vérifie le gain et les régressions',
  11: 'La qualité est mesurée séparément sur chaque modalité avec exemples d’erreur et provenance des entrées',
  12: 'Un incident simulé déclenche une alerte exploitable et une procédure de retour arrière testée',
  13: 'Le dossier d’architecture chiffre charge, latence, coût et comportement en cas de panne d’un composant',
  14: 'Les plans EXPLAIN ANALYZE et les tests de filtrage documentent performance et isolation des données',
  15: 'La comparaison utilise le même matériel et les mêmes requêtes pour qualité, mémoire, latence et débit',
  16: 'La récompense moyenne et sa variance sont rapportées sur plusieurs graines face à une baseline',
  17: 'Le registre de risques relie chaque menace à un test, une mesure de réduction et une limite résiduelle',
  18: 'Une démonstration reproductible relie chaque fonction aux tests, traces et métriques de production',
}

// Les tâches déjà publiées gardent leur ID. Ces consignes complètent leur titre
// sans modifier la progression enregistrée des utilisateurs.
const specialGuidance: Record<string, string> = {
  'task-6-8': 'Expliquez RLHF et DPO avec un jeu de préférences miniature ; réalisez une expérience avec TRL si vos ressources le permettent. Comparez au SFT, sans présenter un schéma théorique comme un entraînement complet.',
  'task-6-15': 'Construisez deux attaques bénignes, une dans le message utilisateur et une dans un document récupéré. Vérifiez que les droits restent appliqués côté serveur ; un prompt défensif seul ne constitue pas une protection suffisante.',
  'task-7-7': 'Lisez la version 2026-07-28 de MCP : hôte, client, serveur, outils, ressources et prompts. Distinguez les anciennes versions à initialisation des échanges stateless par requête ; notez la version négociée dans vos essais.',
  'task-7-19': 'Dessinez les responsabilités de l’hôte, du client et du serveur MCP ; illustrez tools/list, resources/list et prompts/list avec un exemple de chaque.',
  'task-7-20': 'Implémentez un serveur MCP local en stdio exposant un outil en lecture seule et une ressource. Testez-le avec un client compatible et un appel d’entrée invalide.',
  'task-7-21': 'Exposez un serveur MCP sur HTTP avec authentification pour une action sensible. Vérifiez refus sans jeton, moindre privilège, validation des paramètres et journalisation sans secret.',
  'task-7-22': 'Testez le client et le serveur avec la version MCP visée, puis documentez les écarts avec une ancienne version ; injectez un résultat d’outil malveillant et vérifiez qu’il reste une donnée non fiable.',
  'task-8-14': 'Construisez deux chemins : extraction native pour PDF numérique et OCR pour scan. Conservez numéro de page, zone et texte original ; signalez les pages illisibles.',
  'task-8-15': 'Sur dix questions avec réponses et pages attendues, comparez rappel des passages, citations exactes et réponses erronées avec et sans OCR.',
  'task-9-6': 'Autorisez seulement des outils et actions explicitement listés. Montrez qu’un ordre dangereux ou une demande hors périmètre nécessite une approbation humaine et que la boucle s’arrête.',
  'task-9-12': 'Choisissez un workflow fixe pour une tâche prévisible et un agent pour une tâche ouverte ; comparez taux de réussite, coût et défaillances sur les mêmes cas.',
  'task-9-13': 'Ajoutez un état sauvegardé et des clés d’idempotence ; interrompez le processus entre deux outils, reprenez-le et vérifiez qu’aucun effet externe n’est doublé.',
  'task-9-14': 'Fixez un maximum d’appels d’outils, un budget en tokens ou euros, un délai et une condition d’arrêt. Testez une boucle sans progrès.',
  'task-9-15': 'Créez un petit jeu de scénarios incluant succès, erreur d’outil et injection ; inspectez traces, taux de réussite et moments où l’humain doit approuver.',
  'task-11-10': 'Sur un PDF numérique et un scan, choisissez extraction native ou OCR. Expliquez pourquoi une réponse de modèle vision seule ne remplace pas une transcription vérifiée.',
  'task-11-11': 'Faites varier orientation, contraste, résolution et langue sur trois scans ; comparez le texte obtenu et conservez les originaux.',
  'task-11-12': 'Extrayez titres, paragraphes et tableaux avec coordonnées ou numéros de page ; vérifiez l’ordre de lecture sur un document à deux colonnes.',
  'task-11-13': 'Annotez au moins dix pages variées, puis comparez Tesseract et un service OCR ou un second moteur local sur exactitude, coût, latence et confidentialité.',
  'task-11-14': 'Calculez CER/WER et exactitude de champs critiques sur les pages annotées ; affichez confiance et routez les erreurs importantes vers une revue humaine.',
  'task-17-14': 'Construisez des cas de test pour fuite de données, injection, biais, refus et abus d’outils ; classez-les par gravité et mesurez les échecs après chaque changement de modèle ou prompt.',
  'task-17-15': 'Définissez qui approuve une action à fort impact, quelles traces sont conservées, comment signaler un incident et comment désactiver rapidement la fonctionnalité concernée.',
}

function makeTaskDescription(task: Task, phase: Phase): string {
  return specialGuidance[task.id] || `${task.title}. ${phasePractice[phase.phaseNumber]} Présentez dans le dépôt le résultat, la commande de reproduction et une limite observée.`
}

function improveProject(project: Project, phase: Phase): void {
  if (phase.phaseNumber < 3) return
  project.deliverables = [...project.deliverables,
    'README avec prérequis, commandes d’installation et scénario de démonstration',
    'Jeu de tests ou d’exemples reproductibles, résultats et limites observées',
  ]
  project.validationCriteria = [...project.validationCriteria,
    'Le dépôt permet de reproduire au moins un cas réussi et un cas d’échec',
    'Les données, permissions, coûts et limites sont explicités dans le README',
    projectEvidence[phase.phaseNumber],
  ]
}

function setProject(project: Project, data: Partial<Pick<Project, 'title' | 'description' | 'objective' | 'suggestedStack' | 'deliverables' | 'validationCriteria'>>): void {
  Object.assign(project, data)
}

function enrichProjects(phase: Phase): void {
  const { easy, medium, hard } = phase.projects
  if (phase.phaseNumber === 1) {
    for (const project of Object.values(phase.projects)) {
      project.validationCriteria.push('Aucun secret ni donnée personnelle réelle n’est présent dans le dépôt ou les logs', 'Les entrées invalides sont rejetées et au moins un test le démontre')
    }
  }
  if (phase.phaseNumber === 6) {
    for (const project of Object.values(phase.projects)) {
      project.validationCriteria.push('Les prompts sont versionnés et comparés sur des cas normaux, ambigus et adversariaux', 'Aucun secret n’est exposé au modèle, au client ou dans les logs')
    }
    const cv = Object.values(phase.projects).find(project => /CV/.test(project.title))
    if (cv) setProject(cv, {
      title: 'Extracteur de compétences de CV avec revue humaine',
      description: 'Extraire des compétences et expériences pour faciliter une revue humaine ; aucune décision ni score de recrutement automatique.',
      objective: 'Structurer des informations avec provenance et correction humaine.',
      validationCriteria: ['Les champs extraits renvoient au passage source', 'L’utilisateur peut corriger ou supprimer chaque champ', 'Aucun score ni décision de recrutement n’est généré', 'Les CV de test sont fictifs ou utilisés avec consentement'],
    })
    hard.deliverables.push('Revue de sécurité avant exposition publique avec tests et décision documentée')
    hard.validationCriteria.push('Les accès sont vérifiés côté serveur et testés avec deux comptes', 'Les secrets sont hors du dépôt et des réponses', 'Entrées, appels LLM et coûts sont limités', 'Une injection indirecte et une fuite de données sont testées avant déploiement')
  }
  if (phase.phaseNumber === 7) {
    setProject(easy, { title: 'Client et serveur MCP local', description: 'Connecter un client à un serveur MCP local exposant un outil en lecture seule et une ressource.', objective: 'Comprendre les frontières hôte, client et serveur du protocole MCP.', suggestedStack: ['TypeScript ou Python', 'SDK MCP officiel', 'stdio'], deliverables: ['Serveur et client exécutables', 'Schémas d’entrée et exemples d’erreur', 'README avec version du protocole et démonstration'], validationCriteria: ['Un client découvre puis appelle l’outil et lit la ressource', 'Une entrée invalide reçoit une erreur contrôlée', 'Le résultat d’outil est traité comme donnée non fiable'] })
    setProject(medium, { title: 'Routeur multi-LLM avec outils MCP', description: 'Router selon coût, latence et qualité avec un serveur MCP local et une stratégie de repli.', objective: 'Comparer plusieurs modèles sans perdre les traces ni les permissions des outils.', deliverables: ['Routeur et connecteur MCP', 'Jeu de scénarios comparatifs', 'Mesures de coût et latence', 'Simulation de panne'], validationCriteria: ['La même requête est évaluée sur deux routes', 'Le repli se déclenche sur panne contrôlée', 'Les permissions MCP sont vérifiées avant chaque appel', 'Le rapport relie qualité, coût et latence'] })
    setProject(hard, { title: 'Passerelle MCP distante sécurisée', description: 'Déployer une passerelle MCP distante avec authentification, autorisations par outil et observabilité.', objective: 'Tester une intégration MCP réaliste et compatible avec la version choisie.', deliverables: ['Serveur HTTP et client', 'Politique d’accès', 'Tests d’interopérabilité et de sécurité', 'Traces expurgées et guide de déploiement'], validationCriteria: ['L’accès non authentifié est refusé', 'Un jeton de portée limitée ne peut pas appeler un outil sensible', 'La version du protocole et les limites de compatibilité sont documentées', 'Les tests couvrent erreur, délai et résultat malveillant'] })
  }
  if (phase.phaseNumber === 8) {
    setProject(easy, { title: 'Questions-réponses sur PDF numérique et scanné', description: 'Indexer deux types de PDF, avec OCR seulement quand le texte natif manque, et répondre avec citations de pages.', objective: 'Construire un RAG vérifiable de l’ingestion à la réponse.', deliverables: ['Pipeline extraction native et OCR', 'Index avec pages sources', 'Interface de questions et citations', 'Jeu de dix questions de référence'], validationCriteria: ['Le texte d’un scan est effectivement extrait', 'Chaque réponse factuelle cite une page retrouvable', 'Une réponse inconnue est signalée comme telle', 'Le rappel de récupération est mesuré sur les dix questions'] })
    setProject(medium, { validationCriteria: ['Un jeu de questions avec passages pertinents est versionné', 'Le rappel@k et la qualité des citations sont comparés avant et après reranking', 'Les documents non autorisés ne sont pas retournés', 'Les échecs de récupération sont analysés'] })
    setProject(hard, { validationCriteria: ['L’ingestion est reprise sans doublons après interruption', 'Les permissions documentaires sont appliquées avant la recherche et la citation', 'Des métriques de rappel, latence, coût et erreurs sont visibles', 'Un jeu de régression empêche la perte de qualité après modification'] })
  }
  if (phase.phaseNumber === 9) {
    setProject(easy, { title: 'Agent à outils avec limites et approbation', description: 'Résoudre une tâche bornée avec deux outils, budget d’exécution et approbation avant effet externe.', objective: 'Montrer une boucle d’agent observable et contrôlable.', deliverables: ['Agent et deux outils typés', 'Trace de trois scénarios', 'Politique d’approbation et budget'], validationCriteria: ['Un appel d’outil valide réussit et un appel invalide échoue proprement', 'Une action avec effet externe attend une approbation', 'La boucle s’arrête au budget ou sans progrès', 'Une injection dans un résultat d’outil ne devient pas une instruction'] })
    setProject(medium, { title: 'Agent de recherche avec sources vérifiables', description: 'Rechercher, citer et synthétiser des sources tout en reprenant une exécution interrompue.', objective: 'Tester fiabilité, citations et reprise d’un agent de recherche.', deliverables: ['Agent avec outil de recherche', 'État persistant et traces', 'Jeu de questions de référence', 'Rapport coût et taux de réussite'], validationCriteria: ['Chaque affirmation factuelle comporte une source ouvrable', 'Une interruption ne répète pas un effet externe', 'Le résultat signale les sources insuffisantes', 'Le jeu de tests inclut une source malveillante'] })
    setProject(hard, { title: 'Workflow agentique multi-étapes auditable', description: 'Orchestrer plusieurs rôles seulement si une baseline mono-agent justifie cette complexité.', objective: 'Mesurer la valeur du découpage, de la supervision humaine et de la reprise.', deliverables: ['Graphe et état persistant', 'Baseline mono-agent', 'Traces et jeu de tests', 'Politique d’accès et procédure de reprise'], validationCriteria: ['Le système reprend après une interruption sans doublon', 'Les actions sensibles sont soumises à approbation', 'La comparaison avec la baseline montre qualité, coût et latence', 'Les outils et données de chaque rôle sont limités à son besoin'] })
  }
  if (phase.phaseNumber === 11) {
    setProject(easy, { title: 'OCR de scans avec contrôle qualité', description: 'Extraire le texte de scans variés, corriger les erreurs visibles et exporter un résultat avec pages sources.', objective: 'Construire une chaîne OCR locale mesurable.', suggestedStack: ['Python', 'Tesseract', 'Pillow ou OpenCV'], deliverables: ['Pipeline de prétraitement et OCR', 'Corpus annoté d’au moins dix pages', 'Rapport CER/WER', 'Sortie texte avec pages sources'], validationCriteria: ['Les originaux et transcriptions de référence sont conservés', 'CER/WER est calculé sur le corpus annoté', 'Rotation et pages illisibles sont détectées ou signalées', 'Le texte exporté conserve la provenance des pages'] })
    setProject(medium, { title: 'Extracteur de documents avec revue humaine', description: 'Extraire champs et tableaux de factures fictives ou autorisées avec provenance et correction manuelle.', objective: 'Relier OCR, compréhension de mise en page et revue des champs critiques.', suggestedStack: ['Python ou TypeScript', 'Tesseract ou Document AI', 'Interface de revue'], deliverables: ['Extraction texte et tableaux', 'Interface de correction', 'Jeu de documents annotés', 'Mesures par champ'], validationCriteria: ['Chaque champ montre sa page et sa zone source', 'L’utilisateur peut corriger les champs', 'L’exactitude est mesurée par champ, y compris montants et dates', 'Les documents sensibles sont protégés ou fictifs'] })
    setProject(hard, { title: 'Pipeline documentaire multimodal évalué', description: 'Traiter PDF natifs, scans et images avec routage, extraction structurée et recherche citée.', objective: 'Concevoir une chaîne documentaire fiable de l’ingestion à la revue.', deliverables: ['Routage natif ou OCR', 'Extraction de texte, tableaux et métadonnées', 'Recherche avec citations de pages', 'Tableau de bord qualité, coût et latence', 'Procédure de revue humaine'], validationCriteria: ['Chaque type de document suit le bon chemin et garde sa provenance', 'Les tableaux et l’ordre de lecture sont vérifiés sur un corpus annoté', 'Les champs incertains sont soumis à revue humaine', 'La qualité, la latence et le coût sont comparés à une baseline'] })
  }
  if (phase.phaseNumber === 12) {
    for (const project of Object.values(phase.projects)) {
      project.deliverables.push('Rapport de revue de sécurité avant déploiement et procédure de retour arrière')
      project.validationCriteria.push('Les tests couvrent autorisation, validation des entrées, secrets et dépendances', 'Un incident simulé déclenche une alerte sans divulguer de données sensibles', 'Le retour arrière est décrit et testé avant publication')
    }
  }
  if (phase.phaseNumber === 17) {
    setProject(medium, { title: 'Audit de résistance aux prompt injections', description: 'Construire un jeu d’attaques directes et indirectes et tester une défense en profondeur, sans promettre un blocage parfait.', objective: 'Mesurer le risque résiduel et limiter les effets d’une instruction non fiable.', suggestedStack: ['Python ou TypeScript', 'LLM API ou modèle local', 'Tests automatisés'], deliverables: ['Jeu d’attaques annotées', 'Tests avant/après', 'Contrôles de permissions et validation côté serveur', 'Rapport de faux positifs et risques résiduels'], validationCriteria: ['Les attaques directes et indirectes sont couvertes', 'Les permissions et actions sensibles restent contrôlées hors du prompt', 'Les taux de réussite des attaques et les faux positifs sont mesurés', 'Le rapport décrit les scénarios encore vulnérables'] })
  }
}

export function enrichCurriculum(phases: Phase[], capstone: Phase): void {
  for (const phase of [...phases, capstone]) {
    phase.resources = resources[phase.phaseNumber]
    if (phase.phaseNumber === 1) enrichProjects(phase)
    if (phase.phaseNumber < 3) continue
    phase.modules = phase.modules.map(module => ({ ...module, description: module.description || `Étudier ${module.title} et l’appliquer à un exemple reproductible. Relier les choix techniques à l’objectif de la phase : ${phase.objective}` }))
    phase.tasks = phase.tasks.map(task => ({ ...task, description: task.description || makeTaskDescription(task, phase) }))
    enrichProjects(phase)
    for (const project of Object.values(phase.projects)) improveProject(project, phase)
  }
}
