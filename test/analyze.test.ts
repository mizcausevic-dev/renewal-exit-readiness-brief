import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleRenewalExitReadinessBrief } from "../src/data/sampleVerticalBrief.js";
import type { RenewalExitReadinessBriefItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleRenewalExitReadinessBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.items.length).toBe(sampleRenewalExitReadinessBrief.length);
  });

  it("counts high-exit accounts", () => {
    const report = analyze(sampleRenewalExitReadinessBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.highExitRiskAccounts).toBeGreaterThan(0);
  });

  it("counts sponsor-fragility accounts", () => {
    const report = analyze(sampleRenewalExitReadinessBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.sponsorFragilityAccounts).toBeGreaterThan(0);
  });

  it("sums renewal exposure", () => {
    const report = analyze(sampleRenewalExitReadinessBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.renewalExposureMillions).toBe(153);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleRenewalExitReadinessBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.accountsTracked).toBe(0);
    expect(report.summary.averageRenewalConfidence).toBe(0);
    expect(report.summary.leadingMessage).toContain("aligned");
  });

  it("hits low and medium renewal branches explicitly", () => {
    const fixtures: RenewalExitReadinessBriefItem[] = [
      {
        id: "low-branch",
        lane: "Healthy renewal",
        track: "TRUST_CONTINUITY",
        action: "RENEW",
        accountCluster: "Healthy renewals",
        boardQuestion: "Can this renewal close cleanly?",
        owner: "Trust owner",
        audience: "Board growth committee",
        currentPosture: "Stable.",
        renewalNarrative: "Renewal is ready.",
        exitRiskReality: "Delivery is aligned.",
        riskHeadline: "Little exit risk.",
        renewalSignal: "Strong confidence.",
        missingProof: "None",
        evidenceArtifacts: ["renewal packet"],
        remediationMoves: ["keep packet current"],
        relatedSurfaces: ["procurement.kineticgain.com"],
        companyTags: ["Google"],
        renewalConfidenceScore: 86,
        deliveryFreshnessDays: 9,
        sponsorContinuityScore: 82,
        churnSignalCount: 0,
        contractExposureScore: 40,
        renewalExposureMillions: 5,
        headline: "Healthy renewal.",
        narrative: "Low branch test.",
        nextMove: "Keep the renewal current."
      },
      {
        id: "watch-branch",
        lane: "Watch renewal",
        track: "PRICING_PRESSURE",
        action: "SAVE",
        accountCluster: "Watch renewals",
        boardQuestion: "Where does the renewal start aging?",
        owner: "Revenue owner",
        audience: "Finance committee",
        currentPosture: "Watch state.",
        renewalNarrative: "Renewal is possible.",
        exitRiskReality: "Proof is aging.",
        riskHeadline: "Pricing pressure is visible.",
        renewalSignal: "One churn signal is forming.",
        missingProof: "Recent value packet",
        evidenceArtifacts: ["value packet"],
        remediationMoves: ["refresh packet"],
        relatedSurfaces: ["yield.kineticgain.com"],
        companyTags: ["Tableau"],
        renewalConfidenceScore: 72,
        deliveryFreshnessDays: 24,
        sponsorContinuityScore: 69,
        churnSignalCount: 1,
        contractExposureScore: 55,
        renewalExposureMillions: 7,
        headline: "Watch the renewal.",
        narrative: "Medium branch test.",
        nextMove: "Refresh the renewal packet."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-02T00:00:00Z" });
    expect(report.items[0].renewalConfidenceAssessment.severity).toBe("LOW");
    expect(report.items[0].deliveryFreshnessAssessment.severity).toBe("LOW");
    expect(report.items[1].renewalConfidenceAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].deliveryFreshnessAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].sponsorContinuityAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].churnSignalAssessment.severity).toBe("MEDIUM");
    expect(report.summary.leadingMessage).toContain("aligned");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleRenewalExitReadinessBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.accountsTracked).toBe(sampleRenewalExitReadinessBrief.length);
  });
});
