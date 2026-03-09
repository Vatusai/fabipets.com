# ============================================
# Script para iniciar servidor de desarrollo
# fabipets.com - React + Vite
# ============================================

$ErrorActionPreference = "Stop"

# Colores
$Green = "Green"
$Cyan = "Cyan"
$Yellow = "Yellow"

Write-Host "`n========================================" -ForegroundColor $Cyan
Write-Host "   🚀 INICIANDO SERVIDOR DE DESARROLLO" -ForegroundColor $Cyan
Write-Host "   fabipets.com" -ForegroundColor $Cyan
Write-Host "========================================`n" -ForegroundColor $Cyan

# Verificar node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  Instalando dependencias..." -ForegroundColor $Yellow
    npm install
}

Write-Host "📝 URL Local:      http://localhost:5173" -ForegroundColor $Green
Write-Host "📝 URL Red:        http://$(hostname):5173" -ForegroundColor $Green
Write-Host "🔧 Modo:           Desarrollo (Hot Reload)" -ForegroundColor $Green
Write-Host "`nPresiona Ctrl+C para detener el servidor`n" -ForegroundColor $Yellow

# Iniciar servidor Vite
npm run dev
