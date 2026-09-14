import rawData from "../../data/hallmarks.json";
import type { Hallmark, HallmarkTier, TierMeta } from "@/types/hallmark";
export const hallmarks = rawData.hallmarks as Hallmark[];
export const tiers = rawData.tiers as Record<HallmarkTier, TierMeta>;
export const reviewedOn = rawData.reviewedOn;
export function getHallmarkBySlug(slug: string) {
  return hallmarks.find((h) => h.slug === slug);
}
export function getHallmarksByTier(tier: HallmarkTier) {
  return hallmarks.filter((h) => h.tier === tier);
}
export function hasHumanStudy(h: Hallmark) {
  return h.studies.some(
    (s) =>
      s.evidence === "Human observational study" ||
      s.evidence === "Human randomized trial",
  );
}
export function getAdjacentHallmarks(currentId: number, filtered: Hallmark[]) {
  const index = filtered.findIndex((h) => h.id === currentId);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: filtered[(index - 1 + filtered.length) % filtered.length],
    next: filtered[(index + 1) % filtered.length],
  };
}
export function filterHallmarks(
  query: string,
  tier: HallmarkTier | "all",
  humanStudiesOnly: boolean,
) {
  const normalized = query.trim().toLocaleLowerCase();
  return hallmarks.filter((h) => {
    const searchable = [
      h.name,
      h.shortDescription,
      ...h.measurements.map((m) => m.name),
      ...h.studies.map((s) => s.title),
    ]
      .join(" ")
      .toLocaleLowerCase();
    return (
      searchable.includes(normalized) &&
      (tier === "all" || h.tier === tier) &&
      (!humanStudiesOnly || hasHumanStudy(h))
    );
  });
}
