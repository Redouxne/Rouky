import { RoadmapClient } from '@/components/roadmap/RoadmapClient'
import { phases, roadmap } from '@/lib/roadmap-data'

export const dynamic = 'force-dynamic'

export default function RoadmapPage() {
  return <RoadmapClient phases={phases} capstone={roadmap.capstone} />
}
