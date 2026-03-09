@echo off
echo ========================================
echo    AUTO-PUSH: fabipets.com
echo ========================================
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0auto-push.ps1" %*
pause
