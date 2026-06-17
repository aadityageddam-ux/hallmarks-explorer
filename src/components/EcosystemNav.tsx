import { ExternalLink } from 'lucide-react'

export function EcosystemNav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-[#E2E2DF] bg-[#F8F8F7]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1200px] px-6 h-14 flex items-center gap-2">
        <span className="font-semibold text-[#1A1A1A] text-sm">
          HallmarksExplorer
        </span>

        <div className="h-4 w-px bg-[#E2E2DF] mx-2" />

        <a
          href="https://labage.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#6366F1] transition-colors"
        >
          LabAge
          <ExternalLink size={11} />
        </a>

        <div className="h-4 w-px bg-[#E2E2DF] mx-2" />

        <a
          href="https://github.com/aadityageddam-ux/aging_clock_bench"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#0EA5E9] transition-colors"
        >
          AgingClockBench
          <ExternalLink size={11} />
        </a>
      </div>
    </nav>
  )
}
