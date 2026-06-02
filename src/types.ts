export type RenewalTrack =
  | "RENEWAL_RISK"
  | "EXPANSION_STRENGTH"
  | "DELIVERY_CONTINUITY"
  | "TRUST_CONTINUITY"
  | "PRICING_PRESSURE"
  | "EXEC_SPONSORSHIP";

export type RenewalAction = "RENEW" | "SAVE" | "ESCALATE" | "EXIT";

export type RenewalSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface RenewalExitReadinessBriefItem {
  id: string;
  lane: string;
  track: RenewalTrack;
  action: RenewalAction;
  accountCluster: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  renewalNarrative: string;
  exitRiskReality: string;
  riskHeadline: string;
  renewalSignal: string;
  missingProof: string;
  evidenceArtifacts: string[];
  remediationMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  renewalConfidenceScore: number;
  deliveryFreshnessDays: number;
  sponsorContinuityScore: number;
  churnSignalCount: number;
  contractExposureScore: number;
  renewalExposureMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface RenewalAssessment {
  severity: RenewalSeverity;
  ok: boolean;
  message: string;
}

export interface RenewalExitReadinessBriefReportItem extends RenewalExitReadinessBriefItem {
  renewalConfidenceAssessment: RenewalAssessment;
  deliveryFreshnessAssessment: RenewalAssessment;
  sponsorContinuityAssessment: RenewalAssessment;
  churnSignalAssessment: RenewalAssessment;
  exposureAssessment: RenewalAssessment;
  compositeExitRiskScore: number;
}

export interface RenewalExitReadinessBriefSummary {
  accountsTracked: number;
  highExitRiskAccounts: number;
  atRiskRenewals: number;
  sponsorFragilityAccounts: number;
  averageRenewalConfidence: number;
  renewalExposureMillions: number;
  leadingMessage: string;
}

export interface RenewalExitReadinessBriefExport {
  generatedAt: string;
  summary: RenewalExitReadinessBriefSummary;
  items: RenewalExitReadinessBriefReportItem[];
}

export interface RenewalExitReadinessBriefPayload {
  report: RenewalExitReadinessBriefExport;
  renewalRegister: ReturnType<typeof import("./services/verticalBriefService.js").renewalRegister>;
  exitMatrix: ReturnType<typeof import("./services/verticalBriefService.js").exitMatrix>;
  recoveryPosture: ReturnType<typeof import("./services/verticalBriefService.js").recoveryPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: RenewalExitReadinessBriefItem[];
}
