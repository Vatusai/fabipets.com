# ============================================
# Menú de Desarrollo - fabipets.com
# ============================================

$ErrorActionPreference = "Continue"

# Colores
$Green = "Green"
$Cyan = "Cyan"
$Yellow = "Yellow"
$Red = "Red"

function Show-Menu {
    Clear-Host
    Write-Host "`n========================================" -ForegroundColor $Cyan
    Write-Host "   🐾 FABIPETS.COM - Menú de Desarrollo" -ForegroundColor $Cyan
    Write-Host "========================================`n" -ForegroundColor $Cyan
    
    Write-Host "  [1] 🚀 Iniciar servidor de desarrollo" -ForegroundColor $Green
    Write-Host "  [2] 📦 Instalar dependencias" -ForegroundColor $Green
    Write-Host "  [3] 🔨 Compilar para producción" -ForegroundColor $Green
    Write-Host "  [4] 👁️  Previsualizar producción" -ForegroundColor $Green
    Write-Host "  [5] ⬆️  Auto-push (subir cambios)" -ForegroundColor $Green
    Write-Host "  [6] 📊 Ver estado de Git" -ForegroundColor $Green
    Write-Host "  [0] ❌ Salir`n" -ForegroundColor $Red
}

function Start-DevServer {
    Write-Host "`n🚀 Iniciando servidor..." -ForegroundColor $Cyan
    Write-Host "🔗 http://localhost:5173`n" -ForegroundColor $Yellow
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:5173"
    try { npm run dev } catch { }
}

function Install-Dependencies {
    Write-Host "`n📦 Instalando dependencias..." -ForegroundColor $Cyan
    npm install
    Write-Host "`n✅ Dependencias instaladas!" -ForegroundColor $Green
    Pause
}

function Build-Production {
    Write-Host "`n🔨 Compilando para producción..." -ForegroundColor $Cyan
    npm run build
    Write-Host "`n✅ Build completado! (carpeta 'dist/')" -ForegroundColor $Green
    Pause
}

function Preview-Production {
    Write-Host "`n👁️  Previsualizando build de producción..." -ForegroundColor $Cyan
    Write-Host "🔗 http://localhost:4173`n" -ForegroundColor $Yellow
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:4173"
    try { npm run preview } catch { }
}

function Push-Changes {
    Write-Host "`n⬆️  Auto-push de cambios...`n" -ForegroundColor $Cyan
    .\auto-push.ps1
    Pause
}

function Show-GitStatus {
    Write-Host "`n📊 Estado de Git:`n" -ForegroundColor $Cyan
    git status
    Write-Host ""
    git log --oneline -5
    Write-Host ""
    Pause
}

# Bucle principal
do {
    Show-Menu
    $choice = Read-Host "Selecciona una opción"
    
    switch ($choice) {
        '1' { Start-DevServer }
        '2' { Install-Dependencies }
        '3' { Build-Production }
        '4' { Preview-Production }
        '5' { Push-Changes }
        '6' { Show-GitStatus }
        '0' { exit }
        default { 
            Write-Host "`n❌ Opción inválida" -ForegroundColor $Red
            Start-Sleep -Seconds 1
        }
    }
} while ($choice -ne '0')
