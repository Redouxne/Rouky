import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Heart,
  Star,
  ExternalLink,
  BookOpen,
  Code,
  Users
} from 'lucide-react'

export default async function CreditsPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center py-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <span className="text-3xl font-bold">R</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Crédits & Licence</h1>
          <p className="text-lg text-muted-foreground">
            Remerciements et informations légales
          </p>
        </div>

        {/* Project Info */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">À propos de Rouky</CardTitle>
            <CardDescription>
              Roadmap interactive pour devenir Ingénieur IA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-center">
              Rouky est une application web moderne, interactive et gamifiée conçue pour vous aider à 
              maîtriser tous les concepts clés de l'ingénierie IA. Du Python aux LLM, en passant par 
              le Deep Learning, le RAG et les Agents, cette roadmap vous guide étape par étape.
            </p>

            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <h3 className="font-medium mb-2">Créateur</h3>
                <p className="text-sm text-muted-foreground">Redouane EL BADAOUI</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-2">Version</h3>
                <p className="text-sm text-muted-foreground">1.0.0 (Beta)</p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-1">
                  <BookOpen className="h-4 w-4" />
                  Visiter le site
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="gap-1" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Code className="h-4 w-4" />
                  Voir sur GitHub
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inspiration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Inspiration
            </CardTitle>
            <CardDescription>
              Remerciements aux projets qui ont inspiré Rouky
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Rouky s'inspire du projet <strong>Ultimate AI Engineer Roadmap 2026</strong> 
              créé par <strong>Prince Singh</strong>.
            </p>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GitHub className="h-5 w-5" />
                <span className="font-medium">Ultimate AI Engineer Roadmap 2026</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Une roadmap complète pour devenir AI Engineer, couvrant tous les aspects 
                de l'ingénierie IA moderne.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://github.com/PrinceSinghhub/Ultimate-AI-Engineer-Roadmap-2026" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Voir le dépôt original
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Licence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Licence
            </CardTitle>
            <CardDescription>
              Informations sur la licence du projet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-2">Licence MIT</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Copyright (c) 2026 Redouane EL BADAOUI
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Technologies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Technologies utilisées
            </CardTitle>
            <CardDescription>
              Stack technique de l'application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="h-10 w-10 mx-auto mb-2 flex items-center justify-center rounded-lg bg-muted">
                  <span className="font-bold text-lg">N</span>
                </div>
                <h4 className="font-medium text-sm">Next.js</h4>
                <p className="text-xs text-muted-foreground">Framework React</p>
              </div>

              <div className="text-center">
                <div className="h-10 w-10 mx-auto mb-2 flex items-center justify-center rounded-lg bg-muted">
                  <span className="font-bold text-lg text-blue-500">TS</span>
                </div>
                <h4 className="font-medium text-sm">TypeScript</h4>
                <p className="text-xs text-muted-foreground">Langage typé</p>
              </div>

              <div className="text-center">
                <div className="h-10 w-10 mx-auto mb-2 flex items-center justify-center rounded-lg bg-muted">
                  <span className="font-bold text-lg">P</span>
                </div>
                <h4 className="font-medium text-sm">Prisma</h4>
                <p className="text-xs text-muted-foreground">ORM</p>
              </div>

              <div className="text-center">
                <div className="h-10 w-10 mx-auto mb-2 flex items-center justify-center rounded-lg bg-muted">
                  <span className="font-bold text-lg text-blue-600">PG</span>
                </div>
                <h4 className="font-medium text-sm">PostgreSQL</h4>
                <p className="text-xs text-muted-foreground">Base de données</p>
              </div>

              <div className="text-center">
                <div className="h-10 w-10 mx-auto mb-2 flex items-center justify-center rounded-lg bg-muted">
                  <span className="font-bold text-lg">V</span>
                </div>
                <h4 className="font-medium text-sm">Vercel</h4>
                <p className="text-xs text-muted-foreground">Hébergement</p>
              </div>

              <div className="text-center">
                <div className="h-10 w-10 mx-auto mb-2 flex items-center justify-center rounded-lg bg-muted">
                  <span className="font-bold text-lg">T</span>
                </div>
                <h4 className="font-medium text-sm">Tailwind</h4>
                <p className="text-xs text-muted-foreground">CSS Framework</p>
              </div>

              <div className="text-center">
                <div className="h-10 w-10 mx-auto mb-2 flex items-center justify-center rounded-lg bg-muted">
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
                <h4 className="font-medium text-sm">lucide-react</h4>
                <p className="text-xs text-muted-foreground">Icônes</p>
              </div>

              <div className="text-center">
                <div className="h-10 w-10 mx-auto mb-2 flex items-center justify-center rounded-lg bg-muted">
                  <span className="font-bold text-lg">R</span>
                </div>
                <h4 className="font-medium text-sm">Recharts</h4>
                <p className="text-xs text-muted-foreground">Graphiques</p>
              </div>

              <div className="text-center">
                <div className="h-10 w-10 mx-auto mb-2 flex items-center justify-center rounded-lg bg-muted">
                  <span className="font-bold text-lg">d</span>
                </div>
                <h4 className="font-medium text-sm">date-fns</h4>
                <p className="text-xs text-muted-foreground">Gestion des dates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contribute */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center gap-2 justify-center">
              <Star className="h-5 w-5" />
              Contribuer
            </CardTitle>
            <CardDescription>
              Aidez à améliorer Rouky
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Rouky est un projet open source. Vous pouvez contribuer en signalant des bugs,
              en suggérant des améliorations ou en soumettant des pull requests.
            </p>
            <Button variant="outline" size="sm" asChild>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="gap-1"
              >
                <Code className="h-4 w-4" />
                Voir le dépôt
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-8">
          <p>
            Rouky © {new Date().getFullYear()} - Créé avec ❤️ par Redouane EL BADAOUI
          </p>
          <p className="mt-1">
            Tous droits réservés - Licence MIT
          </p>
        </div>
      </div>
    </div>
  )
}

// Helper component for GitHub icon
const GitHub = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.101.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

// Helper component for FileText icon
const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)
