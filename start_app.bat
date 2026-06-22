@echo off
title WayaX App Launcher
echo ===================================================
echo              WAYAX APP LAUNCHER
echo ===================================================
echo.

:: Check if node_modules exists, if not run npm install
if not exist node_modules (
    echo [1/3] Node modules not found. Installing dependencies...
    call npm install
) else (
    echo [1/3] Dependencies verified.
)

echo [2/3] Opening WayaX in your default browser...
:: Wait a brief moment before starting dev server to let browser launch
timeout /t 2 /nobreak >nul
start http://localhost:5175

echo [3/3] Launching local development server...
echo.
echo Press Ctrl+C in this window to stop the server.
echo.
call npm run dev

pause
