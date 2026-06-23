@echo off
setlocal enabledelayedexpansion

echo ============================================
echo  RadioFloris - GitHub setup
echo ============================================
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo Git is niet geinstalleerd.
  echo.
  echo Download Git: https://git-scm.com/download/win
  echo Installeer het, herstart dit script, en probeer opnieuw.
  echo.
  pause
  exit /b 1
)

cd /d "%~dp0"

if not exist ".git" (
  echo Git repository initialiseren...
  git init
  git branch -M main
) else (
  echo Git repository bestaat al.
)

echo.
echo Bestanden toevoegen...
git add .

echo.
git status --short
echo.

set /p CONFIRM=Alles committen? (j/n): 
if /i not "%CONFIRM%"=="j" (
  echo Geannuleerd.
  pause
  exit /b 0
)

git commit -m "Initial commit: RadioFloris website" 2>nul
if errorlevel 1 (
  git commit -m "Update: RadioFloris website"
)

echo.
echo --------------------------------------------
echo  Koppel je GitHub repo
echo --------------------------------------------
echo.
echo 1. Maak een LEGE repo op: https://github.com/new
echo    Naam: radiofloris-website
echo    Vink GEEN README / .gitignore aan
echo.
echo 2. Plak hieronder je repo-URL, bijvoorbeeld:
echo    https://github.com/jouw-naam/radiofloris-website.git
echo.

set /p REPO_URL=GitHub repo URL: 
if "%REPO_URL%"=="" (
  echo Geen URL ingevuld. Commit is lokaal opgeslagen.
  pause
  exit /b 0
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
  git remote add origin "%REPO_URL%"
) else (
  git remote set-url origin "%REPO_URL%"
)

echo.
echo Pushen naar GitHub...
git push -u origin main

if errorlevel 1 (
  echo.
  echo Push mislukt. Mogelijk moet je inloggen bij GitHub.
  echo Probeer: git push -u origin main
  echo.
  echo Bij eerste keer opent GitHub een login-venster.
) else (
  echo.
  echo Klaar! Je code staat op GitHub.
  echo.
  echo GitHub Pages aanzetten:
  echo   Repo -^> Settings -^> Pages -^> Branch: main, map: / (root)
)

echo.
pause
