@echo off
chcp 65001 >nul
echo ========================================
echo    AUTO-PUSH: fabipets.com
echo ========================================
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0auto-push.ps1" %*

if %errorlevel% neq 0 (
    echo.
    echo ❌ El push falló.
    pause
    exit /b %errorlevel%
)

echo.
pause
