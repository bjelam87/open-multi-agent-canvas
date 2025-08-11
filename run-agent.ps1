param(
  [string]$Port = "8123",
  [string]$Host = "localhost"
)

# Resolve paths
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$agentDir = Join-Path $repoRoot "agent"
$venvExe = Join-Path $repoRoot ".venv\Scripts\langgraph.exe"

if (-not (Test-Path $agentDir)) {
  Write-Error "Agent directory not found: $agentDir"
  exit 1
}

# Prefer venv CLI if present, otherwise fall back to Poetry
if (Test-Path $venvExe) {
  Push-Location $agentDir
  try {
    & $venvExe dev --host $Host --port $Port --no-browser
  } finally {
    Pop-Location
  }
} elseif (Get-Command poetry -ErrorAction SilentlyContinue) {
  Push-Location $agentDir
  try {
    poetry run langgraph dev --host $Host --port $Port --no-browser
  } finally {
    Pop-Location
  }
} else {
  Write-Error "No .venv LangGraph CLI found and Poetry is not installed. See README for setup."
  exit 1
}
