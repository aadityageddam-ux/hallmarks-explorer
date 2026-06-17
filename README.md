# HallmarksExplorer

Interactive reference for the 12 Hallmarks of Aging — López-Otín et al., *Cell*, 2023.

Browse the biological processes that drive aging, with associated biomarkers, interventions, and PubMed citations. Part of the longevity data ecosystem alongside [LabAge](https://labage.app) and [AgingClockBench](https://github.com/aadityageddam-ux/aging_clock_bench).

## Features

- **12 hallmarks** with mechanism explanations, clinical significance, and primary literature
- **Tier structure** — Primary / Antagonistic / Integrative as defined in the 2023 update
- **Biomarker linkages** — each hallmark maps to trackable blood panel biomarkers
- **Ecosystem CTAs** — direct links to LabAge (biological age calculator) and AgingClockBench
- **Search + filter** — real-time filtering by name, tier, and trackability
- **Slide-in detail panel** — keyboard accessible, prev/next navigation, ESC to close
- **Static site** — zero backend, zero database, CDN-cached

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Framer Motion 12
- Static JSON data

## Development

```bash
npm install
npm run dev       # localhost:3001
npm run test      # Vitest unit tests
npm run build     # Production build
```

## Data

All content is in [`data/hallmarks.json`](data/hallmarks.json). Each hallmark has:
- `mechanism` — 2–3 sentence scientific explanation
- `whyItMatters` — clinical significance
- `biomarkers` — blood panel markers with connection explanations
- `interventions` — actionable lifestyle and pharmacological levers
- `citations` — PubMed-linked primary literature

Primary source: [López-Otín et al., Cell, 2023 (PMID: 36599349)](https://pubmed.ncbi.nlm.nih.gov/36599349/)

## Ecosystem

```
HallmarksExplorer → LabAge → AgingClockBench
     (this)        (web app)   (PyPI package)
```

- [LabAge](https://labage.app) — compute biological age from a blood panel
- [AgingClockBench](https://github.com/aadityageddam-ux/aging_clock_bench) — benchmark biological aging clocks on NHANES data
