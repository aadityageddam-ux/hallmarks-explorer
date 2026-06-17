'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { Hallmark, HallmarkTier } from '@/types/hallmark'
import { tiers } from '@/lib/hallmarks'
import { HallmarkCard } from './HallmarkCard'
import { HallmarkPanel } from './HallmarkPanel'
import { TierSection } from './TierSection'
import { getAdjacentHallmarks } from '@/lib/hallmarks'

const TIER_ORDER: HallmarkTier[] = ['primary', 'antagonistic', 'integrative']

interface HallmarkGridProps {
  hallmarks: Hallmark[]
  selectedHallmark: Hallmark | null
  onSelect: (h: Hallmark | null) => void
}

export function HallmarkGrid({
  hallmarks,
  selectedHallmark,
  onSelect,
}: HallmarkGridProps) {
  const { prev, next } = selectedHallmark
    ? getAdjacentHallmarks(selectedHallmark.id, hallmarks)
    : { prev: null, next: null }

  return (
    <>
      {/* Card grid — dims when panel is open */}
      <div
        className={
          selectedHallmark
            ? 'opacity-40 pointer-events-none transition-opacity duration-200 select-none'
            : 'transition-opacity duration-200'
        }
      >
        <div className="space-y-12">
          {TIER_ORDER.map(tier => {
            const tierHallmarks = hallmarks.filter(h => h.tier === tier)
            if (tierHallmarks.length === 0) return null
            const meta = tiers[tier]

            return (
              <TierSection
                key={tier}
                label={meta.label}
                description={meta.description}
                color={meta.color}
                lightColor={meta.lightColor}
              >
                <AnimatePresence mode="popLayout">
                  {tierHallmarks.map(h => (
                    <motion.div
                      key={h.id}
                      layout
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="relative"
                    >
                      <HallmarkCard
                        hallmark={h}
                        isSelected={selectedHallmark?.id === h.id}
                        onClick={() => onSelect(h)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </TierSection>
            )
          })}

          {hallmarks.length === 0 && (
            <div className="py-20 text-center text-[#9CA3AF]">
              <p className="text-lg font-medium">No hallmarks match your filters</p>
              <p className="text-sm mt-1">Try adjusting or clearing your search</p>
            </div>
          )}
        </div>
      </div>

      {/* Panel rendered OUTSIDE the dimmed/pointer-events-none grid wrapper */}
      <AnimatePresence>
        {selectedHallmark && (
          <HallmarkPanel
            hallmark={selectedHallmark}
            onClose={() => onSelect(null)}
            onNavigate={dir => onSelect(dir === 'prev' ? prev : next)}
            prevHallmark={prev}
            nextHallmark={next}
          />
        )}
      </AnimatePresence>
    </>
  )
}
