import { ExternalLink, FlaskConical } from 'lucide-react'
import type { EcosystemLink, BiomarkerLink } from '@/types/hallmark'

interface BiologicalAgeLinkProps {
  link: EcosystemLink
  biomarkers: BiomarkerLink[]
}

export function BiologicalAgeLink({ link, biomarkers }: BiologicalAgeLinkProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="labage-link"
      className="group block rounded-lg border border-[#E2E2DF] bg-white p-4 hover:border-[#6366F1] hover:shadow-sm transition-all duration-150"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-indigo-50">
          <FlaskConical size={16} className="text-[#6366F1]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-[#6366F1] uppercase tracking-wide mb-0.5">
            LabAge
          </p>
          {biomarkers.length > 0 && (
            <p className="text-xs text-[#6B7280] mb-2">
              Biomarkers tracked:{' '}
              {biomarkers.map(b => b.displayName).join(', ')}
            </p>
          )}
          <span className="text-sm text-[#1A1A1A] font-medium group-hover:text-[#6366F1] transition-colors flex items-center gap-1">
            {link.ctaText}
            <ExternalLink size={12} className="shrink-0" />
          </span>
        </div>
      </div>
    </a>
  )
}
