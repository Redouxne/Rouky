import Link from 'next/link'

export function Brand({ onClick }: { onClick?: () => void }) {
  return <Link href="/" onClick={onClick} className="inline-flex items-center gap-2.5" aria-label="Rouky, accueil">
    <span className="flex h-9 w-9 rotate-[-5deg] items-center justify-center rounded-full border-2 border-primary font-display text-2xl font-bold leading-none text-primary">R</span>
    <span className="font-display text-[2rem] font-bold leading-none tracking-[-0.06em]">rouky<span className="text-primary">.</span></span>
  </Link>
}
