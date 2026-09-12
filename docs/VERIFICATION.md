# Cleanup verification — September 12, 2026

## Scientific content

- All twelve entries retain concise definitions linked to the 2023 framework.
- Thirteen selected research examples have a named study population, evidence type, finding, limitation and resolvable primary-study citation.
- Fourteen unique publications were checked through bibliographic metadata and abstracts. This was not a full-text systematic review or experimental replication.
- The claim audit records removed blood-marker mappings and treatment-style advice, with their replacements.
- No minimum citation count is used as a substitute for supporting a claim.

## Local execution

- `npm ci`: passed with the committed lockfile and project-local `.npmrc`. npm reported a non-fatal Windows cleanup warning for an optional WASM package directory.
- `npm test`: 17 tests passed. Covers citation/evidence contracts, human-study classification, search, empty results and filtered navigation.
- `npm run type-check`: passed.
- `npm run build`: passed with Next.js 16.3.5; homepage prerendered.
- `npm run test:e2e`: passed at 1440px and 390px with Chromium. Covered all twelve panels, combined filters, search, source links, focus containment, Escape/focus restoration, horizontal overflow and 200% text enlargement. Reduced-motion preference enabled.
- `npm audit`: zero reported vulnerabilities after the compatible dependency updates.
- Desktop overview and mobile panel screenshots visually inspected. This is not a formal WCAG certification or assistive-technology audit.

## Toolchain fixes

The original npm 10 and a separately tested npm 11 crashed inside Arborist peer resolution (`edgesOut`). The committed `.npmrc` uses legacy peer resolution consistently in local development and CI. A clean install with this configuration passed. The original Vitest fork worker timed out on Windows; content tests now use a single thread and Node environment. Browser behavior is tested separately in actual Chromium, not simulated by content tests.

The old modal allowed focus to escape during repeated Tab navigation. Explicit first/last focus wrapping now complements the native dialog. Original amber/green badge contrast ratios were approximately 3.07/3.58; updated colors are approximately 4.84/5.21 against their badge backgrounds.

## Release boundary

These results cover the cleanup branch. GitHub Actions performs the same main checks when pushed. The repository remains private; merging and production rollout are separate from this local verification. AgingTrajectory was not changed by this cleanup.
