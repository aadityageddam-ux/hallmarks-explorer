export type HallmarkTier = "primary" | "antagonistic" | "integrative";
export interface Citation {
  title: string;
  authors: string;
  journal: string;
  year: number;
  pmid: string;
  pubmedUrl: string;
  doi?: string;
  volume?: string;
  pages?: string;
}
export type EvidenceType =
  | "Animal experiment"
  | "Human observational study"
  | "Human randomized trial"
  | "Cell/tissue experiment";
export interface ResearchExample {
  title: string;
  evidence: EvidenceType;
  population: string;
  finding: string;
  limitation: string;
  sourceIds: string[];
}
export interface Measurement {
  name: string;
  kind:
    | "Direct molecular measurement"
    | "Indirect association"
    | "Research assay";
  description: string;
  limitation: string;
  sourceIds: string[];
}
export interface Hallmark {
  id: number;
  slug: string;
  name: string;
  number: string;
  tier: HallmarkTier;
  tierLabel: string;
  shortDescription: string;
  mechanism: string;
  mechanismSourceIds: string[];
  measurements: Measurement[];
  studies: ResearchExample[];
  uncertainty: string;
  citations: Citation[];
  color: string;
}
export interface TierMeta {
  label: string;
  description: string;
  color: string;
  lightColor: string;
}
