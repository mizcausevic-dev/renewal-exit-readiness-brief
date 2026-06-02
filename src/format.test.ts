import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the renewal summary", () => {
    const output = formatSummary({
      accountsTracked: 6,
      highExitRiskAccounts: 4,
      atRiskRenewals: 4,
      sponsorFragilityAccounts: 3,
      averageRenewalConfidence: 71.2,
      renewalExposureMillions: 153,
      leadingMessage: "Renewal weakness is rising."
    });

    expect(output).toContain("Renewal Exit Readiness Brief");
    expect(output).toContain("High-exit accounts: 4");
    expect(output).toContain("Renewal exposure: $153M");
  });
});
