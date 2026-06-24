import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CheckCircle,
  Code,
  ExternalLink,
  Github,
  KeyRound,
  Monitor,
  PlayCircle,
  Terminal,
} from 'lucide-react'

const tools = [
  {
    title: 'Terminal',
    icon: Terminal,
    goal: 'Savoir ouvrir un shell, naviguer dans les dossiers et lancer des commandes.',
    steps: [
      'Ouvre Terminal sur macOS, PowerShell sur Windows ou le terminal intégré de VS Code.',
      'Teste pwd, ls, cd, mkdir et touch pour comprendre où tu travailles.',
      'Crée un dossier de travail dédié, par exemple ~/Documents/Rouky-labs.',
    ],
    verify: 'Lance pwd puis crée un dossier rouky-test sans erreur.',
    docsUrl: 'https://code.visualstudio.com/docs/terminal/basics',
    videoUrl: 'https://www.youtube.com/results?search_query=tutoriel+terminal+debutant+developpeur+francais',
  },
  {
    title: 'Git',
    icon: Code,
    goal: 'Versionner ton code et comprendre commit, branch, status et log.',
    steps: [
      'Installe Git puis vérifie avec git --version.',
      'Configure ton identité avec git config --global user.name et git config --global user.email.',
      'Dans un dossier test, lance git init, git status, git add . puis git commit.',
    ],
    verify: 'git log doit afficher ton premier commit local.',
    docsUrl: 'https://git-scm.com/book/fr/v2',
    videoUrl: 'https://www.youtube.com/results?search_query=tutoriel+git+github+debutant+francais',
  },
  {
    title: 'GitHub',
    icon: Github,
    goal: 'Créer un dépôt distant et pousser ton code pour validation Rouky.',
    steps: [
      'Crée un compte GitHub si nécessaire.',
      'Crée un dépôt public de test, sans fichier initial si ton projet existe déjà en local.',
      'Connecte le remote avec git remote add origin puis pousse avec git push.',
    ],
    verify: 'Ton dépôt GitHub doit afficher ton README et au moins un commit.',
    docsUrl: 'https://docs.github.com/fr/get-started/start-your-journey/hello-world',
    videoUrl: 'https://www.youtube.com/results?search_query=creer+repo+github+push+projet+francais',
  },
  {
    title: 'Python',
    icon: Code,
    goal: 'Préparer l’environnement Python utilisé dans les phases data, ML et agents.',
    steps: [
      'Installe Python 3.11 ou plus récent.',
      'Vérifie python --version ou python3 --version selon ton système.',
      'Crée un environnement virtuel avec python -m venv .venv puis active-le.',
      'Installe pytest dans l’environnement et vérifie python -m pytest --version.',
    ],
    verify: 'python --version et pip --version doivent répondre depuis ton environnement activé.',
    docsUrl: 'https://docs.python.org/fr/3/tutorial/venv.html',
    videoUrl: 'https://www.youtube.com/results?search_query=installer+python+venv+pytest+francais',
  },
  {
    title: 'Node.js',
    icon: Monitor,
    goal: 'Pouvoir lancer des apps web et outils JavaScript modernes.',
    steps: [
      'Installe Node.js LTS.',
      'Vérifie node --version et npm --version.',
      'Crée un dossier test puis lance npm init -y.',
    ],
    verify: 'node --version doit retourner une version LTS récente.',
    docsUrl: 'https://nodejs.org/fr/download',
    videoUrl: 'https://www.youtube.com/results?search_query=installer+nodejs+npm+francais',
  },
  {
    title: 'VS Code',
    icon: Monitor,
    goal: 'Avoir un éditeur stable avec terminal, extensions et formatage.',
    steps: [
      'Installe VS Code.',
      'Ajoute les extensions Python, GitHub Pull Requests, ESLint et Prettier.',
      'Ouvre ton dossier projet avec code . depuis le terminal.',
    ],
    verify: 'Le terminal intégré doit pouvoir lancer git --version, python --version et node --version.',
    docsUrl: 'https://code.visualstudio.com/docs',
    videoUrl: 'https://www.youtube.com/results?search_query=configuration+vs+code+python+javascript+git+francais',
  },
  {
    title: 'Secrets et variables .env',
    icon: KeyRound,
    goal: 'Éviter de publier des clés API dans GitHub.',
    steps: [
      'Crée un fichier .env.local pour les secrets locaux.',
      'Ajoute .env, .env.local et les variantes de secrets dans .gitignore.',
      'Stocke les clés Vercel, OpenAI ou base de données uniquement dans les variables d’environnement.',
    ],
    verify: 'git status ne doit jamais proposer de committer un fichier .env.',
    docsUrl: 'https://vercel.com/docs/environment-variables',
    videoUrl: 'https://www.youtube.com/results?search_query=variables+environnement+env+gitignore+vercel+francais',
  },
]

export const dynamic = 'force-dynamic'

export default function LocalEnvironmentTutorialPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <div className="space-y-8">
        <div className="space-y-3">
          <Link href="/roadmap/phase-0" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            ← Retour à la phase 0
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Préparer son environnement local</h1>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Installe et vérifie les outils minimum avant les projets Python, data, web et IA.
            </p>
          </div>
        </div>

        <Card className="border-primary/35 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Checklist finale
            </CardTitle>
            <CardDescription>
              Quand tout est prêt, tu dois pouvoir lancer ces commandes sans erreur.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-[2px] border border-border bg-background/70 p-4 text-sm text-muted-foreground">
{`git --version
python --version
node --version
npm --version
code --version`}
            </pre>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon

            return (
              <Card key={tool.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    {tool.title}
                  </CardTitle>
                  <CardDescription>{tool.goal}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
                    {tool.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>

                  <div className="rounded-[2px] border border-border bg-muted/30 p-3 text-sm">
                    <span className="font-medium text-foreground">Vérification: </span>
                    <span className="text-muted-foreground">{tool.verify}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={tool.docsUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-1 h-4 w-4" />
                        Documentation
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={tool.videoUrl} target="_blank" rel="noreferrer">
                        <PlayCircle className="mr-1 h-4 w-4" />
                        Vidéos YouTube
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
