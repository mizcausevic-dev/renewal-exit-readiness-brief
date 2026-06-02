import { analyze } from "../analyze.js";
import { sampleRenewalExitReadinessBrief } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleRenewalExitReadinessBrief, { now: "2026-06-02T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Use procurement and identity as the reference renewal lanes, escalate platform continuity first, model exit-safe pricing paths second, and refresh AI plus regulated sponsorship proof before the next commercial review."
  };
}

export function renewalRegister() {
  return sampleRenewalExitReadinessBrief.map((item) => ({
    lane: item.lane,
    accountCluster: item.accountCluster,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    renewalNarrative: item.renewalNarrative,
    renewalConfidenceScore: item.renewalConfidenceScore,
    nextMove: item.nextMove
  }));
}

export function exitMatrix() {
  return sampleRenewalExitReadinessBrief.map((item) => ({
    lane: item.lane,
    track: item.track,
    riskHeadline: item.riskHeadline,
    renewalSignal: item.renewalSignal,
    missingProof: item.missingProof,
    evidenceArtifacts: item.evidenceArtifacts,
    renewalConfidenceScore: item.renewalConfidenceScore,
    deliveryFreshnessDays: item.deliveryFreshnessDays,
    sponsorContinuityScore: item.sponsorContinuityScore
  }));
}

export function recoveryPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    churnSignalCount: item.churnSignalCount,
    compositeExitRiskScore: item.compositeExitRiskScore,
    owner: item.owner,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    compositeExitRiskScore: item.compositeExitRiskScore,
    renewalExposureMillions: item.renewalExposureMillions,
    contractExposureScore: item.contractExposureScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic renewal data only - no live contracts, customers, pricing schedules, or commercial account records are included.",
    "Scores are modeled to show how Kinetic Gain can compare renewal confidence, delivery freshness, sponsor continuity, churn signals, and contract exposure in one board-readable commercial surface.",
    "All routes are read-only and demonstrate renewal and exit-readiness monitoring, not production legal, financial, or commercial advice."
  ];
}

export function payload() {
  return {
    report,
    renewalRegister: renewalRegister(),
    exitMatrix: exitMatrix(),
    recoveryPosture: recoveryPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleRenewalExitReadinessBrief
  };
}
