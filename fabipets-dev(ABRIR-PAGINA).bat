@echo off
chcp 65001 >nul
title 🐾 Fabipets - Menú de Desarrollo

powershell -ExecutionPolicy Bypass -File "%~d0%~p0menu-dev.ps1"
