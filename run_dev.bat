@echo off
title ConstructAI - Startup Launcher
echo =====================================================================
echo           ConstructAI - Multimodal Construction Intelligence
echo =====================================================================
echo.
echo Starting FastAPI Backend on http://localhost:8000 ...
start "ConstructAI Backend" cmd /k "cd /d "%~dp0backend" && "C:\Users\DEV\AppData\Local\Programs\Python\Python313\python.exe" -m uvicorn main:app --reload --port 8000"

echo.
echo Starting React Vite Frontend on http://localhost:5173 ...
start "ConstructAI Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo =====================================================================
echo Services are booting up!
echo - Backend API Docs: http://localhost:8000/docs
echo - Frontend Web UI:  http://localhost:5173
echo =====================================================================
timeout /t 5
start http://localhost:5173
