# HallmarksExplorer

An educational guide to the twelve hallmarks in the 2023 aging framework, with cited research examples and explicit limits on what each study establishes.

This is a literature-based reference interface, not original experimental research, a systematic review, a biological-age calculator or a treatment guide.

## What changed

The September 2026 cleanup replaces unsupported blood-marker mappings and treatment-style advice with claim-level citations, study populations, measured outcomes and limitations. Search covers hallmark names, research examples and measurements. The human-study filter only includes entries containing a human observational study or randomized trial in this guide; it does not grade the entire field.

Each detail panel separates a brief definition, measurements used in research, selected experiments, open questions and sources. Keyboard users can open cards, navigate the modal, close with Escape and return to the originating card.

## Run locally

Use Node.js 22 or newer and npm:

The project-local `.npmrc` preserves legacy peer resolution because npm 10 and 11 otherwise crash in Arborist's `edgesOut` handling for this toolchain. The exact dependency graph is committed in the lockfile; use `npm ci` in both local development and CI. This setting does not disable tests or security auditing.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Verify

```sh
npm test
npm run type-check
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser checks start a production server on port 3107 by default (override with PORT). On Linux, install browser OS dependencies with `npx playwright install --with-deps chromium`. CI runs content contracts, unit tests, TypeScript, production build and browser checks. Screenshots are written to git-ignored test-results/.

## Scientific scope and provenance

- [Content policy](docs/CONTENT_POLICY.md): evidence labels, source review and limits.
- [Claim-by-claim audit](docs/SCIENTIFIC_AUDIT.md): retained, reframed and removed claims.
- [2023 framework](https://pubmed.ncbi.nlm.nih.gov/36599349/): source of the twelve process labels.

Publication metadata and abstracts were checked in September 2026. The examples are deliberately selected and are not a comprehensive or continuously updated review. Experiments were not replicated. Automated tests check citation integrity and behavior, not scientific truth. Direct measurement of a molecule does not measure a whole hallmark, and an animal experiment does not establish a human longevity treatment.

## Structure

- data/hallmarks.json: reviewed content, sources and evidence classifications.
- src/components/: search, cards and accessible detail panels.
- src/lib/hallmarks.ts: evidence-aware filtering and navigation.
- src/tests/: source-contract and filtering tests.
- scripts/browser-check.mjs: production-browser checks.

## Maintenance and publication

Update the data and scientific audit together. Preserve paper attribution and check the precise claim supported by each source. The repository remains private during cleanup; publication is a separate owner decision. An existing Vercel deployment may serve an earlier revision until updated.

Maintainer: Aaditya Geddam. The interface and this cleanup used AI assistance; source review scope and verification limits are documented above. No open-source license is asserted until the owner selects one.
