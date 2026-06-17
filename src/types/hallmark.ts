export type HallmarkTier = 'primary' | 'antagonistic' | 'integrative'

export interface Citation {
  title: string
  authors: string
  journal: string
  year: number
  pmid: string
  pubmedUrl: string
  doi?: string
  volume?: string
  pages?: string
}

export interface BiomarkerLink {
  name: string
  displayName: string
  connection: string
  labAgeField: string
}

export interface EcosystemLink {
  url: string
  ctaText: string
  prefilledFields?: string[]
}

export interface Hallmark {
  id: number
  slug: string
  name: string
  /** Zero-padded string e.g. "01" through "12" */
  number: string
  tier: HallmarkTier
  tierLabel: string
  shortDescription: string
  mechanism: string
  whyItMatters: string
  biomarkers: BiomarkerLink[]
  interventions: string[]
  citations: Citation[]
  ecosystemLinks: {
    labAge?: EcosystemLink
    agingClockBench?: EcosystemLink
  }
  /** Hex accent color unique to this hallmark */
  color: string
}

export interface TierMeta {
  label: string
  description: string
  color: string
  lightColor: string
}

export interface HallmarksData {
  hallmarks: Hallmark[]
  tiers: Record<HallmarkTier, TierMeta>
}
