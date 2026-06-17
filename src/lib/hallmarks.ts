import rawData from '../../data/hallmarks.json'
import type { Hallmark, HallmarkTier, TierMeta } from '@/types/hallmark'

export const hallmarks: Hallmark[] = rawData.hallmarks as Hallmark[]

export const tiers: Record<HallmarkTier, TierMeta> = rawData.tiers as Record<HallmarkTier, TierMeta>

export function getHallmarkBySlug(slug: string): Hallmark | undefined {
  return hallmarks.find(h => h.slug === slug)
}

export function getHallmarksByTier(tier: HallmarkTier): Hallmark[] {
  return hallmarks.filter(h => h.tier === tier)
}

export function getHallmarksWithBiomarker(biomarkerName: string): Hallmark[] {
  return hallmarks.filter(h =>
    h.biomarkers.some(b => b.name.toLowerCase() === biomarkerName.toLowerCase())
  )
}

export function getAdjacentHallmarks(
  currentId: number,
  filtered: Hallmark[]
): { prev: Hallmark | null; next: Hallmark | null } {
  const idx = filtered.findIndex(h => h.id === currentId)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? filtered[idx - 1] : filtered[filtered.length - 1],
    next: idx < filtered.length - 1 ? filtered[idx + 1] : filtered[0],
  }
}

export function filterHallmarks(
  query: string,
  tier: HallmarkTier | 'all',
  trackableOnly: boolean
): Hallmark[] {
  return hallmarks.filter(h => {
    if (
      query &&
      !h.name.toLowerCase().includes(query.toLowerCase()) &&
      !h.shortDescription.toLowerCase().includes(query.toLowerCase())
    ) {
      return false
    }
    if (tier !== 'all' && h.tier !== tier) return false
    if (trackableOnly && h.biomarkers.length === 0) return false
    return true
  })
}
