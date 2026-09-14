"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { MotionConfig } from "framer-motion";
import type { Hallmark, HallmarkTier } from "@/types/hallmark";
import { filterHallmarks } from "@/lib/hallmarks";
import { HallmarkGrid } from "./HallmarkGrid";
import { FilterBar } from "./FilterBar";

export function HallmarksPage() {
  const [selectedHallmark, setSelectedHallmark] = useState<Hallmark | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<HallmarkTier | "all">("all");
  const [humanStudiesOnly, setHumanStudiesOnly] = useState(false);

  const filteredHallmarks = useMemo(
    () => filterHallmarks(searchQuery, tierFilter, humanStudiesOnly),
    [searchQuery, tierFilter, humanStudiesOnly],
  );

  // Close panel when filtered list no longer contains the selected hallmark
  useEffect(() => {
    if (
      selectedHallmark &&
      !filteredHallmarks.find((h) => h.id === selectedHallmark.id)
    ) {
      setSelectedHallmark(null);
    }
  }, [filteredHallmarks, selectedHallmark]);

  // ESC key closes panel
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedHallmark) {
        setSelectedHallmark(null);
      }
    },
    [selectedHallmark],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="mx-auto w-full max-w-[1200px] px-6 py-12 break-words">
        {/* Hero */}
        <header className="mb-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-3">
            The Hallmarks of Aging
          </h1>
          <p className="text-lg text-[#6B7280] mb-2">
            Explore 12 proposed hallmarks through selected research and its
            limits.
          </p>
          <p className="text-sm text-[#596170]">
            Based on{" "}
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

        <p className="mb-6 max-w-3xl text-sm text-[#596170] leading-relaxed">
          An educational guide to the 2023 framework. Evidence labels describe
          the selected studies, not the entire field. A research assay is not a
          personal aging diagnosis. Content reviewed September 12, 2026.
        </p>
        {/* Filter bar */}
        <div className="mb-8">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            tierFilter={tierFilter}
            onTierChange={setTierFilter}
            humanStudiesOnly={humanStudiesOnly}
            onHumanStudiesChange={setHumanStudiesOnly}
          />
        </div>

        {/* Result count when filtering */}
        {(searchQuery || tierFilter !== "all" || humanStudiesOnly) && (
          <p role="status" className="mb-6 text-sm text-[#596170]">
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
    </MotionConfig>
  );
}
