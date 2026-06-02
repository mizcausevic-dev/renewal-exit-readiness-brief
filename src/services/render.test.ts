import { describe, expect, it } from "vitest";
import {
  renderDocs,
  renderExitMatrix,
  renderRecoveryPosture,
  renderRenewalOverview,
  renderRenewalRegister,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderRenewalOverview()).toContain("Renewal Exit Readiness Brief");
  });

  it("renders the renewal register route", () => {
    expect(renderRenewalRegister()).toContain("/renewal-register");
  });

  it("renders the exit matrix route", () => {
    expect(renderExitMatrix()).toContain("/exit-matrix");
  });

  it("renders the recovery posture route", () => {
    expect(renderRecoveryPosture()).toContain("Recovery posture");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic renewal data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
