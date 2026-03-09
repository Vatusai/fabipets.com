# ============================================
# Script de Push Automatico para fabipets.com
# Uso: .\auto-push.ps1 [-CommitMessage "mensaje"] [-DryRun]
# ============================================

param(
    [string]$CommitMessage = "",
    [string]$Branch = "main",
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$Green = "Green"
$Yellow = "Yellow"
$Red = "Red"
$Cyan = "Cyan"

function Write-Status { param([string]$Message, [string]$Color = $Green) Write-Host "[$(Get-Date -Format 'HH:mm:ss')] $Message" -ForegroundColor $Color }
function Write-ErrorMsg { param([string]$Message) Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ERROR: $Message" -ForegroundColor $Red }
function Write-Success { param([string]$Message) Write-Host "[$(Get-Date -Format 'HH:mm:ss')] OK: $Message" -ForegroundColor $Green }
function Write-WarningMsg { param([string]$Message) Write-Host "[$(Get-Date -Format 'HH:mm:ss')] WARNING: $Message" -ForegroundColor $Yellow }

Write-Host "`n========================================" -ForegroundColor $Cyan
Write-Host "   AUTO-PUSH: fabipets.com" -ForegroundColor $Cyan
Write-Host "========================================`n" -ForegroundColor $Cyan

# Verificar git
try {
    $null = git status 2>&1
    if ($LASTEXITCODE -ne 0) { Write-ErrorMsg "No estas en un repositorio Git valido."; exit 1 }
} catch {
    Write-ErrorMsg "Git no esta instalado o no esta en el PATH."; exit 1
}

$currentBranch = git branch --show-current
Write-Status "Rama actual: $currentBranch" $Cyan

$changes = git status --porcelain

if (-not $changes) {
    Write-WarningMsg "No hay cambios para commitear."
    $unpushed = git log origin/$Branch..$currentBranch --oneline 2>$null
    if ($unpushed) {
        Write-Status "Hay commits locales sin push:" $Yellow
        Write-Host $unpushed
        if (-not $DryRun) {
            git push origin $currentBranch
            if ($LASTEXITCODE -eq 0) { Write-Success "Push completado!" } else { Write-ErrorMsg "Push fallo."; exit 1 }
        }
    }
    exit 0
}

Write-Status "Cambios detectados:" $Yellow
git status --short

if ($DryRun) {
    Write-WarningMsg "MODO SIMULACION - No se realizan cambios"
    exit 0
}

# Mensaje automatico si no se proporciona
if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
    $CommitMessage = "chore: auto-update $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

Write-Status "Commit: $CommitMessage" $Cyan

# Ejecutar git
git add .
if ($LASTEXITCODE -ne 0) { Write-ErrorMsg "Error al agregar archivos"; exit 1 }

git commit -m "$CommitMessage"
if ($LASTEXITCODE -ne 0) { Write-ErrorMsg "Error al crear commit"; exit 1 }

Write-Status "Haciendo push a origin/$Branch..."
git push origin $Branch
if ($LASTEXITCODE -ne 0) { Write-ErrorMsg "Error al hacer push"; exit 1 }

Write-Success "Push automatico completado exitosamente!"
Write-Host "`nRepositorio: https://github.com/Vatusai/fabipets.com" -ForegroundColor $Cyan
