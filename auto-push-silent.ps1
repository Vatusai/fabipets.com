# ============================================
# Script de Push Automático SILENCIOSO
# Sin interacción - Para tareas automáticas
# ============================================

param(
    [string]$CommitMessage = "Auto-update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')",
    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

# Verificar cambios
$changes = git status --porcelain 2>$null

if (-not $changes) {
    # Verificar commits sin push
    $currentBranch = git branch --show-current
    $unpushed = git log origin/$Branch..$currentBranch --oneline 2>$null
    
    if ($unpushed) {
        git push origin $currentBranch 2>&1 | Out-Null
        Write-Output "Push de commits pendientes completado."
    } else {
        Write-Output "Sin cambios que procesar."
    }
    exit 0
}

# Ejecutar push automático
try {
    git add . 2>&1 | Out-Null
    git commit -m "$CommitMessage" 2>&1 | Out-Null
    git push origin $Branch 2>&1 | Out-Null
    Write-Output "Push automático exitoso: $CommitMessage"
} catch {
    Write-Error "Error: $_"
    exit 1
}
