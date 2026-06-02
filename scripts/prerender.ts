import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderDocs,
  renderExitMatrix,
  renderRecoveryPosture,
  renderRenewalOverview,
  renderRenewalRegister,
  renderVerification
} from "../src/services/render.js";
import { exitMatrix, payload, recoveryPosture, renewalRegister, riskMap, summary, verification } from "../src/services/verticalBriefService.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "dist-static");
rmSync(publicDir, { recursive: true, force: true });
mkdirSync(publicDir, { recursive: true });

const routes: Array<[string, [string, string]]> = [
  ["/", ["index.html", renderRenewalOverview()]],
  ["/renewal-register", ["renewal-register/index.html", renderRenewalRegister()]],
  ["/exit-matrix", ["exit-matrix/index.html", renderExitMatrix()]],
  ["/recovery-posture", ["recovery-posture/index.html", renderRecoveryPosture()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
];

for (const [, [filename, html]] of routes) {
  const target = path.join(publicDir, filename);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://renewal.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://renewal.kineticgain.com/</loc></url><url><loc>https://renewal.kineticgain.com/renewal-register/</loc></url><url><loc>https://renewal.kineticgain.com/exit-matrix/</loc></url><url><loc>https://renewal.kineticgain.com/recovery-posture/</loc></url><url><loc>https://renewal.kineticgain.com/verification/</loc></url><url><loc>https://renewal.kineticgain.com/docs/</loc></url></urlset>`
);

const apiDir = path.join(publicDir, "api");
mkdirSync(apiDir, { recursive: true });
const apiPayloads: Record<string, unknown> = {
  "dashboard-summary.json": summary(),
  "renewal-register.json": renewalRegister(),
  "exit-matrix.json": exitMatrix(),
  "recovery-posture.json": recoveryPosture(),
  "risk-map.json": riskMap(),
  "verification.json": verification(),
  "sample.json": payload().sample,
  "payload.json": payload()
};

for (const [filename, value] of Object.entries(apiPayloads)) {
  writeFileSync(path.join(apiDir, filename), JSON.stringify(value, null, 2));
}
