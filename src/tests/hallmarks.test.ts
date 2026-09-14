import { describe, it, expect } from "vitest";
import {
  hallmarks,
  filterHallmarks,
  getAdjacentHallmarks,
  hasHumanStudy,
} from "@/lib/hallmarks";

describe("scientific content contracts", () => {
  it("retains all twelve unique hallmarks", () => {
    expect(hallmarks).toHaveLength(12);
    expect(new Set(hallmarks.map((h) => h.slug)).size).toBe(12);
  });
  for (const h of hallmarks) {
    it(
      h.name + ": every claim resolves to a source and bounded evidence",
      () => {
        const citations = new Set(h.citations.map((c) => c.pmid));
        const referenceGroups = [
          h.mechanismSourceIds,
          ...h.measurements.map((m) => m.sourceIds),
          ...h.studies.map((s) => s.sourceIds),
        ];
        for (const ids of referenceGroups) {
          expect(ids.length).toBeGreaterThan(0);
          for (const id of ids) expect(citations.has(id)).toBe(true);
        }
        for (const s of h.studies) {
          expect(s.population.trim().length).toBeGreaterThan(0);
          expect(s.limitation.trim().length).toBeGreaterThan(0);
          expect([
            "Animal experiment",
            "Human observational study",
            "Human randomized trial",
            "Cell/tissue experiment",
          ]).toContain(s.evidence);
        }
        for (const m of h.measurements) {
          expect([
            "Direct molecular measurement",
            "Indirect association",
            "Research assay",
          ]).toContain(m.kind);
          expect(m.limitation.trim().length).toBeGreaterThan(0);
        }
        for (const c of h.citations) {
          expect(c.pubmedUrl).toBe(
            "https://pubmed.ncbi.nlm.nih.gov/" + c.pmid + "/",
          );
          expect(c.title.trim().length).toBeGreaterThan(0);
        }
        expect(h).not.toHaveProperty("ecosystemLinks");
        expect(h).not.toHaveProperty("interventions");
      },
    );
  }
});
describe("evidence-aware discovery", () => {
  it("searches studies and measurements and normalizes whitespace/case", () => {
    expect(
      filterHallmarks("  RAPAMYCIN  ", "all", false).map((h) => h.slug),
    ).toEqual(["deregulated-nutrient-sensing"]);
    expect(
      filterHallmarks("telomere length", "all", false).map((h) => h.slug),
    ).toEqual(["telomere-attrition"]);
  });
  it("does not count human tissue work as a human treatment study", () => {
    const senescence = hallmarks.find((h) => h.slug === "cellular-senescence")!;
    expect(hasHumanStudy(senescence)).toBe(false);
    const human = filterHallmarks("", "all", true);
    expect(human.map((h) => h.slug)).toEqual([
      "epigenetic-alterations",
      "dysbiosis",
    ]);
    expect(filterHallmarks("", "primary", true).map((h) => h.slug)).toEqual([
      "epigenetic-alterations",
    ]);
  });
  it("handles empty search results without invalid navigation", () => {
    expect(filterHallmarks("not-a-hallmark", "all", false)).toEqual([]);
    expect(getAdjacentHallmarks(1, [])).toEqual({ prev: null, next: null });
  });
  it("navigates only within the filtered set, including wraparound", () => {
    const filtered = filterHallmarks("", "all", true);
    expect(getAdjacentHallmarks(filtered[0].id, filtered)).toEqual({
      prev: filtered[1],
      next: filtered[1],
    });
    expect(getAdjacentHallmarks(999, filtered)).toEqual({
      prev: null,
      next: null,
    });
  });
});
