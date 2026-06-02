import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sampleRenewalExitReadinessBrief } from "../src/data/sampleVerticalBrief.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturesDir = path.join(root, "fixtures");
mkdirSync(fixturesDir, { recursive: true });

rmSync(path.join(fixturesDir, "renewal-exit-readiness-brief.json"), { force: true });
rmSync(path.join(fixturesDir, "renewal-exit-readiness-brief-clean.json"), { force: true });
rmSync(path.join(fixturesDir, "trust-assertion-drift-monitor.json"), { force: true });
rmSync(path.join(fixturesDir, "trust-assertion-drift-monitor-clean.json"), { force: true });

writeFileSync(
  path.join(fixturesDir, "renewal-exit-readiness-brief.json"),
  JSON.stringify(sampleRenewalExitReadinessBrief, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "renewal-exit-readiness-brief-clean.json"),
  JSON.stringify(
    sampleRenewalExitReadinessBrief.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
