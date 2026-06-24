import { notFound } from 'next/navigation'
import { PhaseDetailClient } from '@/components/roadmap/PhaseDetailClient'
import { phases, roadmap } from '@/lib/roadmap-data'

export const dynamic = 'force-dynamic'

export default function PhaseDetailPage({
  params,
}: {
  params: { phaseId: string }
}) {
  const phase = params.phaseId === 'capstone'
    ? roadmap.capstone
    : phases.find(item => item.id === params.phaseId)

  if (!phase) {
    return notFound()
  }

  return <PhaseDetailClient phase={phase} phases={phases} />
}
