# Content review policy

HallmarksExplorer is an educational guide to the 2023 framework, with selected research examples. It is not a systematic review, clinical guide, diagnostic tool, or current inventory of all trials. Inclusion is illustrative, not a ranking of interventions.

## Claim review

For each entry, verify the cited publication's identity, study population, experiment or observational design, measured endpoint and conclusion. Prefer primary studies for experimental claims. Use reviews for framework definitions, labeled accordingly. Read the full text when a claim depends on methods or detail beyond the abstract; if inaccessible, narrow to what can be established or omit the claim. Never fill evidence gaps with plausible prose.

The September 2026 cleanup checked bibliographic metadata and abstracts through Europe PMC and PubMed. It did not replicate experiments, perform a systematic search, or independently validate clinical biomarkers. See SCIENTIFIC_AUDIT.md for retained, reframed and removed claims. The review date is an editorial date, not a claim that the cited papers are the latest evidence.

Every retained finding and measurement description must have sourceIds resolving to a citation within that entry. Every research example must specify population, evidence type and a limitation. Keep conclusions within the source's scope: mouse survival is not human survival; an ex vivo human tissue experiment is not a human clinical trial; a predictor is not necessarily causal.

## Measurement labels

- Direct molecular measurement: measures a named molecular quantity in sampled material. It does not measure the entirety of a hallmark or whole-body aging.
- Indirect association: an associated or predictive score. It does not establish mechanism or intervention efficacy.
- Research assay: an experimental endpoint or assay used in a specified study. This label does not imply clinical availability or validation.

The Human studies included filter selects entries with a human observational study or randomized trial in this guide. It does not mean every claim in the entry has human evidence. Animal studies containing supporting human tissue work are not counted as clinical trials. Cells/tissue experiments have a separate supported label for future entries.

The three groups are navigation aids, not clinical stages or a validated hierarchy of causes.

## Changes and verification

Update data/hallmarks.json and the audit together. Do not impose minimum numbers of interventions or citations: an unsupported entry is removed rather than filled. Test that references resolve and filters reflect study design. These automated checks verify structure and behavior, not scientific truth. Human source review remains necessary.

Run npm ci, npm test, npm run type-check, npm run build and npm run test:e2e. Confirm desktop/mobile layouts, keyboard focus, Escape, navigation, empty search and reduced motion. Publication requires a separate owner decision; keep this repository private until approved.
