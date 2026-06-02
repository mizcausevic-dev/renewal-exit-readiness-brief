$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $repoRoot "screenshots"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$staleFiles = @(
  "02-assertion-register-proof.png",
  "03-drift-matrix-proof.png",
  "04-remediation-posture-proof.png"
)

foreach ($staleFile in $staleFiles) {
  $stalePath = Join-Path $outputDir $staleFile
  if (Test-Path $stalePath) {
    Remove-Item $stalePath -Force
  }
}

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Path,
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets
  )

  $width = 1600
  $height = 900
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::FromArgb(7, 17, 29))

  $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(13, 26, 43))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(103, 224, 190), 2)
  $titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(237, 242, 255))
  $bodyBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(159, 176, 207))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(103, 224, 190))

  $fontTitle = New-Object System.Drawing.Font("Georgia", 40, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
  $fontFooter = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

  $rect = New-Object System.Drawing.Rectangle 20, 20, 1560, 820
  $graphics.FillRectangle($bgBrush, $rect)
  $graphics.DrawRectangle($panelPen, $rect)

  $graphics.DrawString("Renewal Exit Readiness Brief", $fontSub, $accentBrush, 70, 85)
  $graphics.DrawString($Title, $fontTitle, $titleBrush, 70, 150)
  $graphics.DrawString($Subtitle, $fontBody, $bodyBrush, (New-Object System.Drawing.RectangleF(70, 240, 1380, 110)))

  $y = 360
  foreach ($bullet in $Bullets) {
    $graphics.FillEllipse($accentBrush, 85, $y + 13, 12, 12)
    $graphics.DrawString($bullet, $fontBody, $titleBrush, 110, $y)
    $y += 84
  }

  $graphics.DrawString("Synthetic proof render for README packaging.", $fontFooter, $bodyBrush, 70, 770)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $graphics.Dispose()
  $bitmap.Dispose()
}

New-ScenarioImage -Path (Join-Path $outputDir "01-overview-proof.png") -Title "Renewal risk stays visible before the board asks first" -Subtitle "This brief turns renewal confidence, delivery freshness, churn signals, and sponsor continuity into one board-readable commercial surface." -Bullets @(
  "Which renewals are defensible enough to close and which ones are drifting toward exit.",
  "Where stale delivery proof, sponsor fragility, or pricing pressure will stall the next renewal cycle first.",
  "What should renew, save, escalate, or exit before the next board or investor review."
)

New-ScenarioImage -Path (Join-Path $outputDir "02-renewal-register-proof.png") -Title "Renewal register keeps account clusters and owners attached" -Subtitle "Every route retains the account cluster, owner, audience, renewal narrative, and next move." -Bullets @(
  "Each renewal cluster stays connected to who owns it and who relies on it.",
  "Weak commercial language is visible before it lands in a board or investor review.",
  "The next corrective move sits next to the renewal lane instead of in another memo."
)

New-ScenarioImage -Path (Join-Path $outputDir "03-exit-matrix-proof.png") -Title "Exit matrix shows where the save story has outrun the proof" -Subtitle "Missing evidence, stale delivery proof, and sponsor fragility remain visible in one commercial layer." -Bullets @(
  "Missing proof is explicit instead of implied.",
  "Delivery freshness and churn pressure are readable at a glance.",
  "Each renewal lane ties to a concrete save or exit move."
)

New-ScenarioImage -Path (Join-Path $outputDir "04-recovery-posture-proof.png") -Title "Recovery posture keeps save work grounded in owners and churn signals" -Subtitle "Composite exit risk, churn count, and next moves stay grounded in the same operating view." -Bullets @(
  "Save work stays tied to one owner and one churn-signal count.",
  "Escalate or exit decisions are readable before the next commercial review cycle.",
  "Boards, investors, and operators can see what should close first."
)
