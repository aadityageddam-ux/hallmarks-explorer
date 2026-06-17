'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import type { Hallmark, HallmarkTier } from '@/types/hallmark'
import { filterHallmarks } from '@/lib/hallmarks'
import { HallmarkGrid } from './HallmarkGrid'
import { FilterBar } from './FilterBar'

export function HallmarksPage() {
  const [selectedHallmark, setSelectedHallmark] = useState<Hallmark | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [tierFilter, setTierFilter] = useState<HallmarkTier | 'all'>('all')
  const [trackableOnly, setTrackableOnly] = useState(false)

  const filteredHallmarks = useMemo(
    () => filterHallmarks(searchQuery, tierFilter, trackableOnly),
    [searchQuery, tierFilter, trackableOnly]
  )

  // Close panel when filtered list no longer contains the selected hallmark
  useEffect(() => {
    if (
      selectedHallmark &&
      !filteredHallmarks.find(h => h.id === selectedHallmark.id)
    ) {
      setSelectedHallmark(null)
    }
  }, [filteredHallmarks, selectedHallmark])

  // ESC key closes panel
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedHallmark) {
        setSelectedHallmark(null)
      }
    },
    [selectedHallmark]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-12">
      {/* Hero */}
      <header className="mb-10">
        <h1 className="font-serif text-5xl font-bold text-[#1A1A1A] leading-tight mb-3">
          The Hallmarks of Aging
        </h1>
        <p className="text-lg text-[#6B7280] mb-2">
          12 biological processes that drive aging.
        </p>
        <p className="text-sm text-[#9CA3AF]">
          Based on{' '}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/36599349/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#6B7280] transition-colors"
          >
            López-Otín et al., <span className="italic">Cell</span>, 2023
          </a>
        </p>
      </header>

      {/* Filter bar */}
      <div className="mb-8">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          tierFilter={tierFilter}
          onTierChange={setTierFilter}
          trackableOnly={trackableOnly}
          onTrackableChange={setTrackableOnly}
        />
      </div>

      {/* Result count when filtering */}
      {(searchQuery || tierFilter !== 'all' || trackableOnly) && (
        <p className="mb-6 text-sm text-[#9CA3AF]">
          Showing {filteredHallmarks.length} of 12 hallmarks
        </p>
      )}

      {/* Grid */}
      <HallmarkGrid
        hallmarks={filteredHallmarks}
        selectedHallmark={selectedHallmark}
        onSelect={setSelectedHallmark}
      />
    </main>
  )
}
