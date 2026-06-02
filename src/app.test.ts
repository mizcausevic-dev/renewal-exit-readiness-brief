import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("renewal-exit-readiness-brief app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Renewal Exit Readiness Brief");
  });

  it("serves the renewal register route", async () => {
    const response = await request(app).get("/renewal-register");
    expect(response.status).toBe(200);
  });

  it("serves the exit matrix route", async () => {
    const response = await request(app).get("/exit-matrix");
    expect(response.status).toBe(200);
  });

  it("serves the recovery posture route", async () => {
    const response = await request(app).get("/recovery-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.accountsTracked).toBeGreaterThan(0);
  });

  it("serves the renewal register API", async () => {
    const response = await request(app).get("/api/renewal-register");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the exit matrix API", async () => {
    const response = await request(app).get("/api/exit-matrix");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
