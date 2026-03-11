@echo off
chcp 65001 >nul
title Fabipets - Servidor de Desarrollo

echo.
echo ========================================
echo    Iniciando servidor de desarrollo
echo    Fabipets.com
echo ========================================
echo.
echo URL: http://localhost:5173
echo.
echo Presiona Ctrl+C para detener
echo.

cd /d "%~dp0"
npm run dev
