$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$distDir = Join-Path $repoRoot "dist"
$tempDir = Join-Path ([System.IO.Path]::GetTempPath()) ("my-portfolio-deploy-" + [System.Guid]::NewGuid().ToString("N"))
$zipPath = Join-Path $distDir ("my-portfolio-deploy-" + $timestamp + ".zip")

$excludedDirectories = @(
  ".git",
  ".next",
  "dist",
  "node_modules"
)

$excludedFiles = @(
  ".env",
  "build_final.txt",
  "build_status.txt",
  "home-after-header-fix.png",
  "home-shot.png",
  "lighthouse-home.json",
  "lint_results.txt",
  "start.err.log",
  "start.log"
)

function ShouldSkipItem {
  param(
    [System.IO.FileSystemInfo]$Item
  )

  if ($excludedDirectories -contains $Item.Name) {
    return $true
  }

  if ($excludedFiles -contains $Item.Name) {
    return $true
  }

  if ($Item.Name -like ".env.*" -and $Item.Name -ne ".env.example") {
    return $true
  }

  if ($Item.Name -like "*.zip") {
    return $true
  }

  return $false
}

New-Item -ItemType Directory -Path $distDir -Force | Out-Null
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

try {
  Get-ChildItem -LiteralPath $repoRoot -Force | Where-Object {
    -not (ShouldSkipItem -Item $_)
  } | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $tempDir -Recurse -Force
  }

  if (Test-Path $zipPath) {
    Remove-Item -LiteralPath $zipPath -Force
  }

  Compress-Archive -Path (Join-Path $tempDir "*") -DestinationPath $zipPath -Force
  Write-Output ("Created deploy archive: " + $zipPath)
  Write-Output "Secret files excluded: .env and any .env.* except .env.example"
}
finally {
  if (Test-Path $tempDir) {
    Remove-Item -LiteralPath $tempDir -Recurse -Force
  }
}
