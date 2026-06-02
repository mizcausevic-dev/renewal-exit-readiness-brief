import express from "express";
import { exitMatrix, payload, recoveryPosture, renewalRegister, riskMap, summary, verification } from "./services/verticalBriefService.js";
import {
  renderDocs,
  renderExitMatrix,
  renderRecoveryPosture,
  renderRenewalOverview,
  renderRenewalRegister,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderRenewalOverview()));
  app.get("/renewal-register", (_req, res) => res.type("html").send(renderRenewalRegister()));
  app.get("/exit-matrix", (_req, res) => res.type("html").send(renderExitMatrix()));
  app.get("/recovery-posture", (_req, res) => res.type("html").send(renderRecoveryPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/renewal-register", (_req, res) => res.json(renewalRegister()));
  app.get("/api/exit-matrix", (_req, res) => res.json(exitMatrix()));
  app.get("/api/recovery-posture", (_req, res) => res.json(recoveryPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`renewal-exit-readiness-brief listening on http://127.0.0.1:${port}`);
  });
}
