import type { ReactNode } from 'react'

interface TierSectionProps {
  label: string
  description: string
  color: string
  lightColor: string
  children: ReactNode
}

export function TierSection({
  label,
  description,
  color,
  children,
}: TierSectionProps) {
  return (
    <section>
      {/* Section header */}
      <div className="mb-6 flex items-center gap-4">
        <div
          className="h-5 w-1 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <div>
          <h2
            className="text-base font-semibold tracking-tight"
            style={{ color }}
          >
            {label}
          </h2>
          <p className="text-sm text-[#6B7280]">{description}</p>
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </section>
  )
}
