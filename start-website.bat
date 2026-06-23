@echo off
echo RadioFloris website starten op http://localhost:8080
echo.
echo BELANGRIJK: Open de site via http://localhost:8080 (niet als bestand).
echo YouTube video's werken alleen via localhost, niet via file://
echo.
echo Druk Ctrl+C om te stoppen.
cd /d "%~dp0"
start "" "http://localhost:8080"
python -m http.server 8080
