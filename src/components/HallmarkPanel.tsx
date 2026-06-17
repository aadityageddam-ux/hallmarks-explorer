'use client'

import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Hallmark } from '@/types/hallmark'
import { CitationItem } from './CitationItem'
import { BiologicalAgeLink } from './BiologicalAgeLink'
import { BenchmarkLink } from './BenchmarkLink'

const TIER_COLORS: Record<string, { badge: string; badgeBg: string }> = {
  primary: { badge: '#DC2626', badgeBg: '#FEF2F2' },
  antagonistic: { badge: '#D97706', badgeBg: '#FFFBEB' },
  integrative: { badge: '#059669', badgeBg: '#ECFDF5' },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
}

interface HallmarkPanelProps {
  hallmark: Hallmark | null
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
  prevHallmark: Hallmark | null
  nextHallmark: Hallmark | null
}

export function HallmarkPanel({
  hallmark,
  onClose,
  onNavigate,
  prevHallmark,
  nextHallmark,
}: HallmarkPanelProps) {
  if (!hallmark) return null

  const tier = TIER_COLORS[hallmark.tier]
  const hasLabAge = !!hallmark.ecosystemLinks.labAge
  const hasACBench = !!hallmark.ecosystemLinks.agingClockBench

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-30 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.aside
        key={hallmark.id}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 z-40 flex flex-col bg-white shadow-2xl overflow-hidden
                   w-full sm:w-[90vw] md:w-[65vw] lg:w-[55vw] max-w-[760px]"
        aria-label={`${hallmark.name} detail panel`}
        role="complementary"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-[#E2E2DF] px-8 pt-8 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[80px] leading-none font-normal text-[#EBEBEB] select-none -mb-2">
                {hallmark.number}
              </p>
              <h2
                className="font-serif text-3xl font-bold leading-tight text-[#1A1A1A] mt-1"
                data-testid="panel-title"
              >
                {hallmark.name}
              </h2>
              <span
                className="mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide"
                style={{ color: tier.badge, backgroundColor: tier.badgeBg }}
              >
                {hallmark.tierLabel}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close panel"
              className="shrink-0 mt-1 rounded-lg p-2 text-[#9CA3AF] hover:text-[#1A1A1A] hover:bg-[#F8F8F7] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <motion.div
            key={hallmark.id}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* What is it? */}
            <motion.section variants={sectionVariants}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">
                What is it?
              </h3>
              <p className="text-[15px] text-[#1A1A1A] leading-relaxed">
                {hallmark.mechanism}
              </p>
            </motion.section>

            {/* Why it matters */}
            <motion.section variants={sectionVariants}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">
                Why it matters
              </h3>
              <p className="text-[15px] text-[#6B7280] leading-relaxed">
                {hallmark.whyItMatters}
              </p>
            </motion.section>

            {/* Biomarkers */}
            {hallmark.biomarkers.length > 0 && (
              <motion.section variants={sectionVariants}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">
                  Biomarkers tracked
                </h3>
                <div className="space-y-3">
                  {hallmark.biomarkers.map(b => (
                    <div
                      key={b.name}
                      className="rounded-lg bg-[#F8F8F7] border border-[#E2E2DF] p-3"
                    >
                      <p className="text-sm font-semibold text-[#1A1A1A] mb-0.5">
                        {b.displayName}{' '}
                        <span className="font-mono text-xs text-[#9CA3AF] font-normal">
                          ({b.name})
                        </span>
                      </p>
                      <p className="text-sm text-[#6B7280] leading-snug">
                        {b.connection}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Interventions */}
            <motion.section variants={sectionVariants}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">
                What you can do
              </h3>
              <ul className="space-y-2">
                {hallmark.interventions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                    <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#D4D4D4]" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Citations */}
            <motion.section variants={sectionVariants}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">
                Key papers
              </h3>
              <div className="space-y-4">
                {hallmark.citations.map(c => (
                  <CitationItem key={c.pmid} citation={c} />
                ))}
              </div>
            </motion.section>

            {/* Ecosystem links */}
            {(hasLabAge || hasACBench) && (
              <motion.section variants={sectionVariants}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">
                  Explore in your data
                </h3>
                <div className="space-y-2">
                  {hasLabAge && (
                    <BiologicalAgeLink
                      link={hallmark.ecosystemLinks.labAge!}
                      biomarkers={hallmark.biomarkers}
                    />
                  )}
                  {hasACBench && (
                    <BenchmarkLink link={hallmark.ecosystemLinks.agingClockBench!} />
                  )}
                </div>
              </motion.section>
            )}
          </motion.div>
        </div>

        {/* Prev / Next navigation */}
        <div className="shrink-0 border-t border-[#E2E2DF] px-8 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('prev')}
            disabled={!prevHallmark}
            aria-label={prevHallmark ? `Previous: ${prevHallmark.name}` : 'No previous hallmark'}
            className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            {prevHallmark ? (
              <span>
                <span className="font-mono text-[#9CA3AF] mr-1">{prevHallmark.number}</span>
                {prevHallmark.name}
              </span>
            ) : (
              <span>First hallmark</span>
            )}
          </button>

          <button
            onClick={() => onNavigate('next')}
            disabled={!nextHallmark}
            aria-label={nextHallmark ? `Next: ${nextHallmark.name}` : 'No next hallmark'}
            className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors group"
          >
            {nextHallmark ? (
              <span>
                <span className="font-mono text-[#9CA3AF] mr-1">{nextHallmark.number}</span>
                {nextHallmark.name}
              </span>
            ) : (
              <span>Last hallmark</span>
            )}
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.aside>
    </>
  )
}
