# Tenniscamp-Poster 2026

Generator für das Werbeplakat der Sommer-Tenniscamps (BSV 92 × Tennis Academy Grand Slam).
Aus **einem** Markup werden alle Formate erzeugt – druckfertig und für Social Media.

## Bauen

```bash
node poster/build.cjs      # oder: npm run poster
```

Rendert über das lokal installierte Chrome/Edge (via `puppeteer-core`, kein Chromium-Download).
Schrift (DM Sans Variable), Fotos und Logos werden in die HTML **eingebettet** – die Dateien in
`poster/export/` sind komplett eigenständig und lassen sich direkt im Browser öffnen.

## Ausgaben (`poster/export/`)

| Datei | Format | Verwendung |
|---|---|---|
| `poster-a2.pdf` | DIN A2, 426 × 600 mm | **Haupt-Aushang** Schwarzbrett / Schaufenster (Trim 420×594 + 3 mm Anschnitt) |
| `poster-a3.pdf` | DIN A3, 303 × 426 mm | Theke, Umkleide, kleine Innenräume (Trim 297×420 + 3 mm Anschnitt) |
| `poster-a2-preview.png` / `poster-a3-preview.png` | – | Bildschirm-Vorschau |
| `social-feed.png` | 1080 × 1350 (4:5) | Instagram-/Facebook-Feed |
| `social-story.png` | 1080 × 1920 (9:16) | Story / Reel / WhatsApp-Status (Safe-Zones oben 250 / unten 310 px berücksichtigt) |
| `*.html` | – | eigenständige Quell-HTML jeder Variante |

## Druck-Hinweise

- **Anschnitt (Bleed):** 3 mm rundum sind angelegt, Navy-Fläche & Foto laufen bis in den Anschnitt.
  Einfache **Schnittmarken** an den Trim-Ecken sind eingezeichnet.
- **Sicherheitsabstand:** Alle Texte, Telefonnummern und Logos liegen ≥ 8 mm vom Trim-Rand.
- **Farbe / CMYK:** Browser geben **RGB** aus. Für den Profi-Druck das PDF in CMYK konvertieren –
  am besten mit dem ICC-Profil der Druckerei, z. B. per Ghostscript:
  ```bash
  gs -dPDFSETTINGS=/prepress -sColorConversionStrategy=CMYK -sProcessColorModel=DeviceCMYK \
     -sDEVICE=pdfwrite -sOutputICCProfile=<druckerei.icc> -o poster-a2-cmyk.pdf poster-a2.pdf
  ```
  Gold (#c9a227) und Navy verschieben sich beim RGB→CMYK-Wechsel sichtbar → vorab einen Proof prüfen.
  Viele Online-Druckereien akzeptieren das RGB-PDF aber direkt und konvertieren selbst.
- **Foto-Auflösung:** Das Hero-Foto `kids-hero.jpg` (1600 px breit) ergibt bei A3 ~135 dpi (gut) und
  bei A2 ~95 dpi (akzeptabel, aus Distanz). Für gestochenes A2/A1 ein **höher aufgelöstes Original**
  in `public/kids-hero.jpg` ablegen – der Generator zieht es automatisch.
- **Schrift:** DM Sans ist als Variable-Font eingebettet (Black → Light), Texte bleiben gestochen scharf.

## QR-Code

Zeigt auf `https://www.tennisacademy-gs.de/tenniscamp-anmeldung` (Online-Anmeldung).
Ziel in `build.cjs` → Konstante `URL` ändern, falls sich die Adresse ändert.

## Inhalt / Texte ändern

Alle Texte, Termine und Preise stehen gebündelt im Objekt **`C`** oben in `build.cjs`.
Nach Änderungen einfach neu bauen. Layout/Stil stecken in der `css()`-Funktion (eine Datei, kein Build-Tool).

## Weitere Größen

A1 (Schaufenster/Eingang) oder A4 (Handzettel) lassen sich ergänzen, indem in `FORMATS` ein
weiterer Print-Eintrag mit den Trim-Maßen hinzugefügt wird – identisches Layout, nur skaliert.
