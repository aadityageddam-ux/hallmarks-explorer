"use client";

import type { Hallmark } from "@/types/hallmark";
import { cn } from "@/lib/utils";

const TIER_COLORS: Record<
  string,
  { border: string; badge: string; badgeBg: string }
> = {
  primary: {
    border: "#DC2626",
    badge: "#DC2626",
    badgeBg: "#FEF2F2",
  },
  antagonistic: {
    border: "#B45309",
    badge: "#B45309",
    badgeBg: "#FFFBEB",
  },
  integrative: {
    border: "#047857",
    badge: "#047857",
    badgeBg: "#ECFDF5",
  },
};

interface HallmarkCardProps {
  hallmark: Hallmark;
  isSelected: boolean;
  onClick: () => void;
}

export function HallmarkCard({
  hallmark,
  isSelected,
  onClick,
}: HallmarkCardProps) {
  const tier = TIER_COLORS[hallmark.tier];

  return (
    <button
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={isSelected}
      data-testid={`hallmark-card-${hallmark.slug}`}
      className={cn(
        "relative group w-full text-left rounded-[10px] bg-white p-5 border transition-all duration-150 cursor-pointer",
        "hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        isSelected
          ? "shadow-md ring-1"
          : "border-[#E2E2DF] hover:border-transparent",
      )}
      style={
        isSelected
          ? {
              borderColor: tier.border,
              boxShadow: `0 4px 16px -4px ${tier.border}33`,
              outlineColor: tier.border,
            }
          : undefined
      }
    >
      {/* Left-accent bar on hover/selected */}
      <div
        className={cn(
          "absolute left-0 top-4 bottom-4 w-0.5 rounded-full transition-opacity duration-150",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
        style={{ backgroundColor: tier.border }}
      />

      {/* Hallmark number */}
      <p
        className="font-mono text-4xl font-normal leading-none mb-3 select-none"
        style={{ color: "#D4D4D4" }}
      >
        {hallmark.number}
      </p>

      {/* Name */}
      <h3 className="font-semibold text-[#1A1A1A] text-base leading-tight mb-2">
        {hallmark.name}
      </h3>

      {/* Tier badge */}
      <span
        className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide mb-3"
        style={{ color: tier.badge, backgroundColor: tier.badgeBg }}
      >
        {hallmark.tierLabel}
      </span>

      {/* Short description */}
      <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 mb-4">
        {hallmark.shortDescription}
      </p>

      {/* Stats row */}
      <div className="flex items-center gap-3 text-xs text-[#596170]">
        <span>
          {hallmark.studies.length} research example
          {hallmark.studies.length !== 1 ? "s" : ""}
        </span>
        <span className="text-[#D4D4D4]">·</span>
        <span>
          {hallmark.citations.length} paper
          {hallmark.citations.length !== 1 ? "s" : ""}
        </span>
      </div>
    </button>
  );
}
