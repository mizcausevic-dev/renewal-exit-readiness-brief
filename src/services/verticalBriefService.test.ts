import { describe, expect, it } from "vitest";
import { exitMatrix, payload, recoveryPosture, renewalRegister, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the renewal summary", () => {
    expect(summary().accountsTracked).toBeGreaterThan(0);
  });

  it("returns the renewal register view", () => {
    expect(renewalRegister().length).toBeGreaterThan(0);
  });

  it("returns the exit matrix view", () => {
    expect(exitMatrix().length).toBeGreaterThan(0);
  });

  it("returns the recovery posture view", () => {
    expect(recoveryPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.accountsTracked).toBeGreaterThan(0);
  });
});
