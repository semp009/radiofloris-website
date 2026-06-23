# RadioFloris Website

Officiële website van **RadioFloris** — FiveM content, tutorials, cheat reviews en community.

## Lokaal bekijken

1. Dubbelklik op `start-website.bat`
2. Open **http://localhost:8080** in je browser

> YouTube-video's werken alleen via localhost, niet als je `index.html` direct opent.

## Aanpassen

Bewerk `config.js` voor:
- Social links (YouTube, Discord, TikTok)
- Video's en beschrijvingen
- Samenwerkingen / partners
- Teksten op de homepage

## Online zetten (GitHub Pages)

Na het pushen naar GitHub:

1. Ga naar je repo op GitHub → **Settings** → **Pages**
2. Bij **Source**: kies branch `main` en map `/ (root)`
3. Sla op — na ~1 minuut is je site live op `https://JOUW-GEBRUIKERSNAAM.github.io/radiofloris-website/`

## Op GitHub zetten

### Optie A — Script (aanbevolen)

1. Installeer [Git for Windows](https://git-scm.com/download/win)
2. Maak een **lege** repo op [github.com/new](https://github.com/new) (naam: `radiofloris-website`, geen README)
3. Dubbelklik `setup-github.bat` en volg de stappen

### Optie B — Handmatig

```bash
cd C:\Users\sembo\Desktop\radiofloris-website
git init
git add .
git commit -m "Initial commit: RadioFloris website"
git branch -M main
git remote add origin https://github.com/JOUW-GEBRUIKERSNAAM/radiofloris-website.git
git push -u origin main
```
