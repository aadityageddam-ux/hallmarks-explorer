import { ExternalLink, Package } from 'lucide-react'
import type { EcosystemLink } from '@/types/hallmark'

interface BenchmarkLinkProps {
  link: EcosystemLink
}

export function BenchmarkLink({ link }: BenchmarkLinkProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-[#E2E2DF] bg-white p-4 hover:border-[#0EA5E9] hover:shadow-sm transition-all duration-150"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-sky-50">
          <Package size={16} className="text-[#0EA5E9]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-[#0EA5E9] uppercase tracking-wide mb-0.5">
            AgingClockBench
          </p>
          <span className="text-sm text-[#1A1A1A] font-medium group-hover:text-[#0EA5E9] transition-colors flex items-center gap-1">
            {link.ctaText}
            <ExternalLink size={12} className="shrink-0" />
          </span>
        </div>
      </div>
    </a>
  )
}
