import type { RenewalExitReadinessBriefSummary } from "./types.js";

export function formatSummary(
  summary: RenewalExitReadinessBriefSummary,
  title = "Renewal Exit Readiness Brief"
) {
  return [
    title,
    `Accounts tracked: ${summary.accountsTracked}`,
    `High-exit accounts: ${summary.highExitRiskAccounts}`,
    `At-risk renewals: ${summary.atRiskRenewals}`,
    `Sponsor-fragility accounts: ${summary.sponsorFragilityAccounts}`,
    `Average renewal confidence: ${summary.averageRenewalConfidence}`,
    `Renewal exposure: $${summary.renewalExposureMillions}M`,
    summary.leadingMessage
  ].join("\n");
}
