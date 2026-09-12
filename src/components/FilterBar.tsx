"use client";

import { Search, X } from "lucide-react";
import type { HallmarkTier } from "@/types/hallmark";
import { cn } from "@/lib/utils";

const TIER_OPTIONS: { value: HallmarkTier | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "primary", label: "Primary" },
  { value: "antagonistic", label: "Antagonistic" },
  { value: "integrative", label: "Integrative" },
];

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  tierFilter: HallmarkTier | "all";
  onTierChange: (v: HallmarkTier | "all") => void;
  humanStudiesOnly: boolean;
  onHumanStudiesChange: (v: boolean) => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  tierFilter,
  onTierChange,
  humanStudiesOnly,
  onHumanStudiesChange,
}: FilterBarProps) {
  const hasActiveFilter =
    searchQuery || tierFilter !== "all" || humanStudiesOnly;

  return (
    <div className="flex flex-col lg:flex-row gap-3 items-start sm:items-center">
      {/* Search input */}
      <div className="relative w-full sm:w-64">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#596170] pointer-events-none"
        />
        <input
          type="text"
          aria-label="Search hallmarks"
          placeholder="Search hallmarks or research…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-9 rounded-lg border border-[#E2E2DF] bg-white pl-8 pr-8 text-sm text-[#1A1A1A] placeholder:text-[#596170]
                     focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#596170] hover:text-[#1A1A1A] transition-colors"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Tier filters — horizontal scroll on mobile */}
      <div className="flex items-center gap-1.5 max-w-full flex-wrap pb-0.5 sm:pb-0 shrink-0">
        {TIER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            aria-pressed={tierFilter === opt.value}
            onClick={() => onTierChange(opt.value)}
            data-testid={`filter-${opt.value}`}
            className={cn(
              "shrink-0 h-9 rounded-lg px-3 text-sm font-medium transition-all duration-150 whitespace-nowrap",
              tierFilter === opt.value
                ? "bg-[#1A1A1A] text-white"
                : "bg-white border border-[#E2E2DF] text-[#6B7280] hover:text-[#1A1A1A] hover:border-[#1A1A1A]",
            )}
          >
            {opt.label}
          </button>
        ))}

        {/* Trackable-only toggle */}
        <button
          aria-pressed={humanStudiesOnly}
          onClick={() => onHumanStudiesChange(!humanStudiesOnly)}
          className={cn(
            "shrink-0 h-9 rounded-lg px-3 text-sm font-medium transition-all duration-150 whitespace-nowrap",
            humanStudiesOnly
              ? "bg-[#6366F1] text-white"
              : "bg-white border border-[#E2E2DF] text-[#6B7280] hover:text-[#6366F1] hover:border-[#6366F1]",
          )}
        >
          Human studies included
        </button>
      </div>

      {/* Clear all filters */}
      {hasActiveFilter && (
        <button
          onClick={() => {
            onSearchChange("");
            onTierChange("all");
            onHumanStudiesChange(false);
          }}
          className="shrink-0 text-xs text-[#596170] hover:text-[#1A1A1A] transition-colors underline underline-offset-2"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
