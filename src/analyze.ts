import type {
  RenewalAssessment,
  RenewalExitReadinessBriefExport,
  RenewalExitReadinessBriefItem,
  RenewalExitReadinessBriefReportItem,
  RenewalSeverity
} from "./types.js";

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): RenewalAssessment {
  let severity: RenewalSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): RenewalAssessment {
  let severity: RenewalSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: RenewalExitReadinessBriefItem[],
  options: { now?: string } = {}
): RenewalExitReadinessBriefExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: RenewalExitReadinessBriefReportItem[] = items.map((item) => {
    const renewalConfidenceAssessment = assessStrength(
      item.renewalConfidenceScore,
      82,
      68,
      "Renewal confidence is strong enough for the next commercial review.",
      "Renewal confidence exists, but the narrative should narrow before the next cycle.",
      "Renewal confidence is weaker than the current renewal story implies."
    );

    const deliveryFreshnessAssessment = assessDelay(
      item.deliveryFreshnessDays,
      14,
      35,
      "Delivery proof is fresh enough to support the renewal narrative.",
      "Delivery proof is aging and should be refreshed before the next commercial review.",
      "Delivery proof is stale enough to weaken the save case."
    );

    const sponsorContinuityAssessment = assessStrength(
      item.sponsorContinuityScore,
      80,
      65,
      "Executive sponsorship is stable enough to defend the account.",
      "Sponsorship exists, but continuity still depends on active intervention.",
      "Sponsorship continuity is too weak to keep the renewal path stable."
    );

    const churnSignalAssessment = assessDelay(
      item.churnSignalCount,
      0,
      1,
      "No material churn signal is visible in the current account posture.",
      "A churn signal is forming and should be closed before the next review cycle.",
      "Churn signal load is already visible enough to threaten the renewal."
    );

    const exposureAssessment = assessStrength(
      100 - item.contractExposureScore,
      52,
      32,
      "Contract exposure is manageable relative to current renewal risk.",
      "Contract exposure is rising faster than the account proof set.",
      "Contract exposure is too high for the current renewal weakness."
    );

    const compositeExitRiskScore =
      Math.round(
        ((100 - item.renewalConfidenceScore +
          item.deliveryFreshnessDays +
          100 - item.sponsorContinuityScore +
          item.churnSignalCount * 20 +
          item.contractExposureScore) /
          5) *
          10
      ) / 10;

    return {
      ...item,
      renewalConfidenceAssessment,
      deliveryFreshnessAssessment,
      sponsorContinuityAssessment,
      churnSignalAssessment,
      exposureAssessment,
      compositeExitRiskScore
    };
  });

  const highExitRiskAccounts = reportItems.filter(
    (item) =>
      item.renewalConfidenceAssessment.severity === "HIGH" ||
      item.deliveryFreshnessAssessment.severity === "HIGH" ||
      item.sponsorContinuityAssessment.severity === "HIGH"
  ).length;

  const atRiskRenewals = reportItems.filter(
    (item) => item.deliveryFreshnessAssessment.severity !== "LOW" || item.action === "SAVE"
  ).length;

  const sponsorFragilityAccounts = reportItems.filter(
    (item) => item.churnSignalAssessment.severity !== "LOW" || item.action === "ESCALATE"
  ).length;

  const averageRenewalConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.renewalConfidenceScore, 0) / reportItems.length) * 10) / 10;

  const renewalExposureMillions = reportItems.reduce((sum, item) => sum + item.renewalExposureMillions, 0);

  const leadingMessage =
    highExitRiskAccounts === 0
      ? "Renewal posture is aligned closely enough with delivery and sponsorship evidence to support the current board and investor narrative."
      : highExitRiskAccounts <= 2
        ? "A few renewals need fresher delivery proof and tighter sponsor continuity before the next commercial review cycle."
        : "Renewal weakness is now cross-functional and should be closed as one board-visible save and exit-readiness workstream.";

  return {
    generatedAt,
    summary: {
      accountsTracked: reportItems.length,
      highExitRiskAccounts,
      atRiskRenewals,
      sponsorFragilityAccounts,
      averageRenewalConfidence,
      renewalExposureMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: RenewalExitReadinessBriefItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
