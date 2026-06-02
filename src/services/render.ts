import { exitMatrix, payload, recoveryPosture, renewalRegister, riskMap, summary, verification } from "./verticalBriefService.js";

const productTitle = "Renewal Exit Readiness Brief";
const domain = "https://renewal.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root { color-scheme: dark; --bg:#07111d; --panel:#0d1a2b; --border:rgba(103,224,190,.22); --text:#edf2ff; --muted:#9fb0cf; --accent:#67e0be; --accent-2:#7dc4ff; }
      * { box-sizing:border-box; }
      body { margin:0; font-family:"Segoe UI",system-ui,sans-serif; background:radial-gradient(circle at top left, rgba(125,196,255,.12), transparent 30%), linear-gradient(180deg,#050c16 0%,var(--bg) 100%); color:var(--text); }
      a { color:var(--accent-2); text-decoration:none; }
      .wrap { max-width:1180px; margin:0 auto; padding:32px 24px 64px; }
      .hero,.section { background:linear-gradient(180deg, rgba(14,28,45,.95), rgba(10,19,33,.98)); border:1px solid var(--border); border-radius:28px; padding:28px; box-shadow:0 18px 60px rgba(2,7,16,.35); }
      .hero { margin-bottom:24px; }
      .eyebrow { display:inline-block; padding:10px 16px; border-radius:999px; border:1px solid var(--border); background:rgba(103,224,190,.08); color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.28em; }
      h1,h2 { margin:18px 0 12px; font-family:Georgia,serif; line-height:.95; }
      h1 { font-size:clamp(56px,8vw,92px); max-width:980px; }
      h2 { font-size:clamp(36px,4vw,54px); }
      .lede { color:var(--muted); font-size:20px; line-height:1.6; max-width:920px; }
      .nav { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
      .nav a { padding:10px 14px; border:1px solid rgba(125,196,255,.18); border-radius:999px; color:var(--muted); }
      .nav a.active { color:var(--text); border-color:var(--accent); background:rgba(103,224,190,.08); }
      .metrics,.grid { display:grid; gap:18px; }
      .metrics { grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); margin-top:26px; }
      .metric,.card,.table-wrap { background:rgba(16,32,50,.76); border:1px solid rgba(125,196,255,.12); border-radius:22px; padding:18px; }
      .metric-label,.chip { color:var(--accent); text-transform:uppercase; letter-spacing:.18em; font-size:12px; }
      .metric-value { display:block; font-size:40px; font-weight:700; margin-top:10px; }
      .metric-copy { margin-top:10px; color:var(--muted); line-height:1.5; }
      .section { margin-top:24px; }
      .grid { grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); }
      .card h3 { margin:12px 0 10px; font-size:30px; line-height:1.05; }
      .card p,li { color:var(--muted); line-height:1.6; }
      .table-wrap { overflow-x:auto; }
      table { width:100%; border-collapse:collapse; }
      th,td { text-align:left; padding:12px; border-bottom:1px solid rgba(125,196,255,.12); vertical-align:top; }
      th { color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.18em; }
      ul { padding-left:20px; }
      pre { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--muted); background:rgba(7,17,29,.75); border:1px solid rgba(125,196,255,.12); border-radius:18px; padding:18px; }
      .footer { margin-top:24px; color:var(--muted); font-size:14px; display:flex; gap:18px; flex-wrap:wrap; }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/renewal-register", "Renewal register"],
    ["/exit-matrix", "Exit matrix"],
    ["/recovery-posture", "Recovery posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderRenewalOverview() {
  const executiveSummary = summary();
  const lanes = renewalRegister().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes.map((item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.accountCluster)}</h3>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Narrative:</strong> ${escapeHtml(item.renewalNarrative)}</p>
        <p><strong>Confidence:</strong> ${item.renewalConfidenceScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`).join("");
  const risks = findings.map((item) => `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeExitRiskScore} · exposure ${item.contractExposureScore} · $${item.renewalExposureMillions}M at stake</li>`).join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Renewal and exit readiness</span>
      <h1>Which renewals are strongest, which ones are drifting toward exit, and where will the next board or investor review push for savings, retention, or intentional churn?</h1>
      <p class="lede">Renewal Exit Readiness Brief turns renewal confidence, delivery freshness, sponsor continuity, and churn-signal load into one board-readable commercial surface instead of scattered account notes and optimistic pipeline language.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Accounts tracked</span><span class="metric-value">${executiveSummary.accountsTracked}</span><div class="metric-copy">Modeled renewal and exit-exposure lanes in the current executive-facing estate.</div></div>
        <div class="metric"><span class="metric-label">High-exit accounts</span><span class="metric-value">${executiveSummary.highExitRiskAccounts}</span><div class="metric-copy">Accounts with high confidence, freshness, or sponsor-continuity pressure.</div></div>
        <div class="metric"><span class="metric-label">At-risk renewals</span><span class="metric-value">${executiveSummary.atRiskRenewals}</span><div class="metric-copy">Renewals already aging past what the current commercial story implies.</div></div>
        <div class="metric"><span class="metric-label">Renewal exposure</span><span class="metric-value">$${executiveSummary.renewalExposureMillions}M</span><div class="metric-copy">Modeled exposure tied to weak renewal defense or likely exit.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Renewal register</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible commercial pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for comparing renewal confidence, sponsor continuity, delivery freshness, and exit pressure."
  );
}

export function renderRenewalRegister() {
  const rows = renewalRegister().map((item) => `<tr><td>${escapeHtml(item.accountCluster)}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.action)}</td><td>${escapeHtml(item.renewalNarrative)}</td><td>${item.renewalConfidenceScore}</td></tr>`).join("");
  return shell("Renewal register", "/renewal-register", `<section class="hero"><span class="eyebrow">Renewal register</span><h1>Each renewal lane keeps one owner, one audience, one renewal story, and one corrective move attached.</h1><p class="lede">The renewal register keeps the commercial narrative tied to the exact account cluster that will renew, slip, or exit under executive review.</p><div class="nav">${navLinks("/renewal-register")}</div></section><section class="section table-wrap"><table><thead><tr><th>Account cluster</th><th>Owner</th><th>Audience</th><th>Action</th><th>Renewal narrative</th><th>Confidence</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Renewal-register view showing who owns each commercial cluster and how defensible its renewal story is.");
}

export function renderExitMatrix() {
  const rows = exitMatrix().map((item) => `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.track)}</td><td>${escapeHtml(item.riskHeadline)}</td><td>${escapeHtml(item.renewalSignal)}</td><td>${escapeHtml(item.missingProof)}</td><td>${item.renewalConfidenceScore}</td><td>${item.deliveryFreshnessDays}</td><td>${item.sponsorContinuityScore}</td></tr>`).join("");
  return shell("Exit matrix", "/exit-matrix", `<section class="hero"><span class="eyebrow">Exit matrix</span><h1>Weak commercial proof, stale delivery evidence, and sponsor fragility stay visible in one exit-risk room instead of hiding in separate account notes.</h1><p class="lede">This view keeps exit pressure tied to the specific renewal cluster most likely to fail under board, investor, or executive review.</p><div class="nav">${navLinks("/exit-matrix")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Track</th><th>Risk headline</th><th>Renewal signal</th><th>Missing proof</th><th>Confidence</th><th>Freshness (days)</th><th>Sponsor continuity</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Exit-matrix view showing where renewals are stale, weakly sponsored, or too exposed.");
}

export function renderRecoveryPosture() {
  const rows = recoveryPosture().map((item) => `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.action)}</td><td>${item.churnSignalCount}</td><td>${item.compositeExitRiskScore}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.nextMove)}</td></tr>`).join("");
  return shell("Recovery posture", "/recovery-posture", `<section class="hero"><span class="eyebrow">Recovery posture</span><h1>The brief keeps save work tied to one owner, one churn-signal count, and one next move instead of a floating renewal to-do list.</h1><p class="lede">This recovery posture helps leaders see which accounts can be saved quickly, which require escalation, and which should be managed toward exit safely.</p><div class="nav">${navLinks("/recovery-posture")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Action</th><th>Churn signals</th><th>Exit risk</th><th>Owner</th><th>Next move</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Recovery-posture view for sequencing commercial save, escalation, and exit management.");
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell("Verification", "/verification", `<section class="hero"><span class="eyebrow">Verification</span><h1>How this renewal brief is modeled and what it is safe to infer from it.</h1><p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone mistakes the sample for a live commercial forecast.</p><div class="nav">${navLinks("/verification")}</div></section><section class="section"><ul>${notes}</ul><pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre></section>`, "Verification notes for the Renewal Exit Readiness Brief sample and modeled outputs.");
}

export function renderDocs() {
  return shell("Docs", "/docs", `<section class="hero"><span class="eyebrow">Docs</span><h1>Renewal Exit Readiness Brief docs</h1><p class="lede">This surface packages renewal confidence, churn-signal load, delivery freshness, and recovery sequencing into reproducible routes and JSON outputs for board, investor, and executive commercial reviews.</p><div class="nav">${navLinks("/docs")}</div></section><section class="section"><ul><li><code>/renewal-register</code> keeps commercial claims, owners, and next moves tied to one renewal cluster.</li><li><code>/exit-matrix</code> compares missing proof, churn signals, freshness, and sponsor continuity.</li><li><code>/recovery-posture</code> sequences renew, save, escalate, and exit decisions.</li><li><code>/api/payload</code> exposes the reproducible renewal brief.</li></ul></section>`, "Product documentation for Renewal Exit Readiness Brief and its commercial-readiness routes.");
}
