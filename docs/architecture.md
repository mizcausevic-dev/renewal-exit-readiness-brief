# Architecture

Renewal Exit Readiness Brief is a static-friendly TypeScript executive-intelligence surface for comparing renewal confidence, delivery freshness, sponsor continuity, churn signals, and commercial exposure in one board-readable renewal and exit layer.

## Routes

- `/`
- `/renewal-register`
- `/exit-matrix`
- `/recovery-posture`
- `/verification`
- `/docs`

## Flow

1. `src/data/sampleVerticalBrief.ts` defines synthetic renewal and exit lanes with confidence, freshness, sponsor, churn, and exposure signals.
2. `src/analyze.ts` converts those signals into board-readable renewal assessments and a composite exit-risk score.
3. `src/services/verticalBriefService.ts` shapes the renewal register, exit matrix, recovery posture, and JSON payload routes.
4. `src/services/render.ts` turns those outputs into the static HTML views used in the published surface.

## Output contract

The surface publishes:

- board-readable HTML routes for overview, renewal register, exit matrix, recovery posture, verification, and docs
- JSON routes for summary, renewal register, exit matrix, recovery posture, verification, and full payload export
- generated screenshots and fixtures for README packaging and safe product proof
