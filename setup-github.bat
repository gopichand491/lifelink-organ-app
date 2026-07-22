@echo off
REM ============================================================
REM  LifeLink — Git Setup & GitHub Push Script (Step 1)
REM  Run this ONCE from the organ-app-main folder
REM ============================================================

echo.
echo  STEP 1: Enter your GitHub details
echo  ===================================
set /p USERNAME="Enter your GitHub username: "
set /p REPO="Enter your GitHub repository name (e.g. lifelink-organ-app): "

echo.
echo  Using: https://github.com/%USERNAME%/%REPO%
echo.

REM Update homepage in dashboard/package.json
powershell -Command "(Get-Content dashboard\package.json) -replace 'YOUR_USERNAME', '%USERNAME%' -replace 'YOUR_REPO', '%REPO%' | Set-Content dashboard\package.json"

REM Update vite base in dashboard/vite.config.ts
powershell -Command "(Get-Content dashboard\vite.config.ts) -replace 'YOUR_REPO', '%REPO%' | Set-Content dashboard\vite.config.ts"

echo  [OK] Updated package.json and vite.config.ts

REM Git init
git init
git add .
git commit -m "Initial commit — LifeLink Organ Donation App"
git branch -M main
git remote add origin https://github.com/%USERNAME%/%REPO%.git
git push -u origin main

echo.
echo  ============================================================
echo   Git push complete!
echo   Now go to: https://github.com/%USERNAME%/%REPO%
echo   Settings → Pages → Branch: gh-pages → Save
echo  ============================================================
echo.
pause
