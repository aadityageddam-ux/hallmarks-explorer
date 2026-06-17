import { ExternalLink } from 'lucide-react'
import type { Citation } from '@/types/hallmark'
import { cn } from '@/lib/utils'

interface CitationItemProps {
  citation: Citation
  className?: string
}

export function CitationItem({ citation, className }: CitationItemProps) {
  return (
    <div className={cn('text-sm', className)}>
      <a
        href={citation.pubmedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-start gap-1.5 hover:text-[#1A1A1A] transition-colors"
      >
        <span className="font-medium text-[#1A1A1A] group-hover:underline leading-snug">
          {citation.title}
        </span>
        <ExternalLink
          size={12}
          className="shrink-0 mt-0.5 text-[#9CA3AF] group-hover:text-[#6B7280]"
        />
      </a>
      <p className="mt-0.5 text-[#6B7280]">
        {citation.authors} ·{' '}
        <span className="italic">{citation.journal}</span>{' '}
        {citation.year}
        {citation.volume && `, ${citation.volume}`}
        {citation.pages && `:${citation.pages}`}
      </p>
      <p className="mt-0.5 text-[#9CA3AF] font-mono text-xs">
        PMID: {citation.pmid}
      </p>
    </div>
  )
}
