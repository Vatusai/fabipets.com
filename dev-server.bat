@echo off
chcp 65001 >nul
echo ========================================
echo    🚀 SERVIDOR DE DESARROLLO
echo    fabipets.com
echo ========================================
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0dev-server.ps1"

pause
