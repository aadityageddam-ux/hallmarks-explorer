import { describe, it, expect } from 'vitest'
import {
  hallmarks,
  tiers,
  getHallmarkBySlug,
  getHallmarksByTier,
  getHallmarksWithBiomarker,
  getAdjacentHallmarks,
  filterHallmarks,
} from '@/lib/hallmarks'

// ─── Data integrity ───────────────────────────────────────────────────────────

describe('hallmarks data', () => {
  it('loads exactly 12 hallmarks', () => {
    expect(hallmarks).toHaveLength(12)
  })

  it('has ids 1–12 in order', () => {
    expect(hallmarks.map(h => h.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  })

  it('has zero-padded numbers "01"–"12"', () => {
    expect(hallmarks[0].number).toBe('01')
    expect(hallmarks[11].number).toBe('12')
  })

  it('every hallmark has required fields populated', () => {
    for (const h of hallmarks) {
      expect(h.slug, `${h.name} slug`).toBeTruthy()
      expect(h.name, `${h.name} name`).toBeTruthy()
      expect(h.shortDescription, `${h.name} shortDescription`).toBeTruthy()
      expect(h.mechanism, `${h.name} mechanism`).toBeTruthy()
      expect(h.whyItMatters, `${h.name} whyItMatters`).toBeTruthy()
      expect(h.interventions.length, `${h.name} interventions`).toBeGreaterThanOrEqual(2)
      expect(h.citations.length, `${h.name} citations`).toBeGreaterThanOrEqual(2)
    }
  })

  it('every citation has a valid PubMed URL', () => {
    for (const h of hallmarks) {
      for (const c of h.citations) {
        expect(c.pubmedUrl, `${h.name} → ${c.pmid}`).toMatch(
          /^https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/\d+\/$/
        )
      }
    }
  })

  it('primary hallmarks are exactly 5', () => {
    expect(hallmarks.filter(h => h.tier === 'primary')).toHaveLength(5)
  })

  it('antagonistic hallmarks are exactly 3', () => {
    expect(hallmarks.filter(h => h.tier === 'antagonistic')).toHaveLength(3)
  })

  it('integrative hallmarks are exactly 4', () => {
    expect(hallmarks.filter(h => h.tier === 'integrative')).toHaveLength(4)
  })

  it('tiers object has all three tiers', () => {
    expect(Object.keys(tiers)).toEqual(['primary', 'antagonistic', 'integrative'])
  })
})

// ─── Lookup functions ─────────────────────────────────────────────────────────

describe('getHallmarkBySlug', () => {
  it('finds genomic instability by slug', () => {
    const h = getHallmarkBySlug('genomic-instability')
    expect(h?.name).toBe('Genomic Instability')
    expect(h?.id).toBe(1)
  })

  it('returns undefined for unknown slug', () => {
    expect(getHallmarkBySlug('nonexistent-hallmark')).toBeUndefined()
  })
})

describe('getHallmarksByTier', () => {
  it('returns 5 primary hallmarks', () => {
    expect(getHallmarksByTier('primary')).toHaveLength(5)
  })

  it('returns 3 antagonistic hallmarks', () => {
    expect(getHallmarksByTier('antagonistic')).toHaveLength(3)
  })

  it('returns 4 integrative hallmarks', () => {
    expect(getHallmarksByTier('integrative')).toHaveLength(4)
  })
})

describe('getHallmarksWithBiomarker', () => {
  it('finds hallmarks with RDW biomarker', () => {
    const result = getHallmarksWithBiomarker('RDW')
    expect(result.length).toBeGreaterThanOrEqual(2)
    expect(result.map(h => h.slug)).toContain('genomic-instability')
    expect(result.map(h => h.slug)).toContain('cellular-senescence')
  })

  it('finds hallmarks with CRP biomarker', () => {
    const result = getHallmarksWithBiomarker('CRP')
    expect(result.map(h => h.slug)).toContain('chronic-inflammation')
  })

  it('is case-insensitive', () => {
    const lower = getHallmarksWithBiomarker('crp')
    const upper = getHallmarksWithBiomarker('CRP')
    expect(lower.map(h => h.id)).toEqual(upper.map(h => h.id))
  })

  it('returns empty array for nonexistent biomarker', () => {
    expect(getHallmarksWithBiomarker('nonexistent')).toHaveLength(0)
  })
})

// ─── Navigation ───────────────────────────────────────────────────────────────

describe('getAdjacentHallmarks', () => {
  it('returns correct prev/next for a middle hallmark', () => {
    const { prev, next } = getAdjacentHallmarks(6, hallmarks)
    expect(prev?.id).toBe(5)
    expect(next?.id).toBe(7)
  })

  it('wraps prev to last when on first hallmark', () => {
    const { prev, next } = getAdjacentHallmarks(1, hallmarks)
    expect(prev?.id).toBe(12)
    expect(next?.id).toBe(2)
  })

  it('wraps next to first when on last hallmark', () => {
    const { prev, next } = getAdjacentHallmarks(12, hallmarks)
    expect(prev?.id).toBe(11)
    expect(next?.id).toBe(1)
  })

  it('returns null for both when hallmark not in filtered list', () => {
    const { prev, next } = getAdjacentHallmarks(99, hallmarks)
    expect(prev).toBeNull()
    expect(next).toBeNull()
  })

  it('respects filtered list for navigation', () => {
    const primaryOnly = hallmarks.filter(h => h.tier === 'primary')
    // On hallmark 3 (Epigenetic Alterations, 3rd primary): prev=2, next=4
    const { prev, next } = getAdjacentHallmarks(3, primaryOnly)
    expect(prev?.id).toBe(2)
    expect(next?.id).toBe(4)
  })
})

// ─── Filter logic ─────────────────────────────────────────────────────────────

describe('filterHallmarks', () => {
  it('returns all 12 with no filters', () => {
    expect(filterHallmarks('', 'all', false)).toHaveLength(12)
  })

  it('filters by tier: primary → 5', () => {
    expect(filterHallmarks('', 'primary', false)).toHaveLength(5)
  })

  it('filters by tier: antagonistic → 3', () => {
    expect(filterHallmarks('', 'antagonistic', false)).toHaveLength(3)
  })

  it('filters by tier: integrative → 4', () => {
    expect(filterHallmarks('', 'integrative', false)).toHaveLength(4)
  })

  it('filters by name search', () => {
    const results = filterHallmarks('telomere', 'all', false)
    expect(results).toHaveLength(1)
    expect(results[0].slug).toBe('telomere-attrition')
  })

  it('search is case-insensitive', () => {
    const lower = filterHallmarks('genomic', 'all', false)
    const upper = filterHallmarks('GENOMIC', 'all', false)
    expect(lower.map(h => h.id)).toEqual(upper.map(h => h.id))
  })

  it('trackable-only excludes hallmarks with no biomarkers', () => {
    const trackable = filterHallmarks('', 'all', true)
    expect(trackable.every(h => h.biomarkers.length > 0)).toBe(true)
  })

  it('trackable-only count is fewer than 12', () => {
    const trackable = filterHallmarks('', 'all', true)
    expect(trackable.length).toBeLessThan(12)
    expect(trackable.length).toBeGreaterThan(0)
  })

  it('returns empty array when no matches', () => {
    expect(filterHallmarks('xyznonexistent', 'all', false)).toHaveLength(0)
  })

  it('combines tier and search filters', () => {
    // "inflammation" in integrative tier → Chronic Inflammation only
    const results = filterHallmarks('inflammation', 'integrative', false)
    expect(results).toHaveLength(1)
    expect(results[0].slug).toBe('chronic-inflammation')
  })
})
