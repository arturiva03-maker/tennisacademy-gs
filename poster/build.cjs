/* eslint-disable */
/*
 * Tenniscamp-Poster Generator — BSV 92 x Tennis Academy Grand Slam
 * Erzeugt aus EINEM Markup mehrere Ausgaben:
 *   - Print: DIN A2 + DIN A3 Hochformat, druckfertig mit 3 mm Anschnitt + Schnittmarken (PDF + Vorschau-PNG)
 *   - Social: Feed 4:5 (1080x1350) + Story/Reel 9:16 (1080x1920) als hochauflösendes PNG
 * Schrift (DM Sans Variable) + Fotos + Logos werden als base64 eingebettet (self-contained HTML),
 * der QR-Code zur Online-Anmeldung wird generiert. Gerendert wird über das vorhandene Chrome via puppeteer-core.
 *
 * Aufruf:  node poster/build.cjs
 */
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer-core');

const ROOT = path.join(__dirname, '..');
const PUB = path.join(ROOT, 'public');
const NM = path.join(ROOT, 'node_modules');
const DIST = path.join(__dirname, 'export');
fs.mkdirSync(DIST, { recursive: true });

// ---------------------------------------------------------------- assets ----
const b64 = (p) => fs.readFileSync(p).toString('base64');
const jpg = (name) => `data:image/jpeg;base64,${b64(path.join(PUB, name))}`;
const png = (name) => `data:image/png;base64,${b64(path.join(PUB, name))}`;

const FONT = b64(path.join(NM, '@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2'));
const HERO = jpg('tenniscamp.jpg');      // Hero der Tenniscamps-Seite: große Gruppe mit Urkunden
const PROOF = jpg('tenniscamp.jpg');     // große Gruppe mit Urkunden — Social Proof
const LOGO_GS = png('logo.png');         // Tennis Academy Grand Slam (Navy/Gold-Wappen)
const LOGO_BSV = png('sponsor-bsv92.png'); // BSV 92 (schwarz/weiß, rund)

const URL = 'https://www.tennisacademy-gs.de/tenniscamp-anmeldung';

// ---------------------------------------------------------------- content ---
const C = {
  kicker: 'Sommerferien Berlin · 2026',
  org: 'BSV 92 Tennisabteilung  ×  Tennis Academy Grand Slam',
  title1: 'SOMMER',
  title2: 'TENNISCAMPS',
  year: '2026',
  hook: 'Fünf Tage Tennis, Spaß &amp; Turnier —<br>für Kinder ab 5–6 Jahren',
  camps: [
    { n: 'CAMP I', d: '13.–17.', m: 'Juli' },
    { n: 'CAMP II', d: '10.–14.', m: 'August' },
    { n: 'CAMP III', d: '17.–21.', m: 'August' },
  ],
  time: 'Mo – Fr · 9:30 – 15:00 Uhr',
  place: 'Tennisanlage BSV 92 · Fritz-Wildung-Str. 23 · 14199 Berlin',
  perks: [
    'Tennis und Athletiktraining',
    'Mittagessen + großes Getränk, täglich',
    'Eigenes Camp-T-Shirt',
    'Abschlussturnier mit Sachpreisen & Urkunden',
  ],
  priceMember: '290',
  priceNon: '350',
  ctaHead: 'Scannen & online anmelden',
  ctaUrl: 'tennisacademy-gs.de',
  phones: ['030 – 824 20 88', '030 – 606 10 55'],
  badge: 'Jetzt Platz sichern',
  foot: 'Veranstalter: BSV 92 Tennisabteilung gemeinsam mit der Tennis Academy Grand Slam · Es gelten die Camp-AGB.',
};

// flat, tasteful tennis ball (single yellow accent) ---------------------------
const BALL = `<svg class="ball" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49" fill="#d8e000"/><path d="M16 22 A56 56 0 0 0 16 78" fill="none" stroke="#fffbe6" stroke-width="4.5" opacity=".9" stroke-linecap="round"/><path d="M84 22 A56 56 0 0 1 84 78" fill="none" stroke="#fffbe6" stroke-width="4.5" opacity=".9" stroke-linecap="round"/></svg>`;

// subtle film grain (Imperfect-by-Design texture) ----------------------------
const GRAIN = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`
);

// ----------------------------------------------------------------- styles ---
function css({ mode, mediaW, mediaH, base, unit, bleed, edge, safeTop, safeBottom }) {
  const page = mode === 'print'
    ? `@page { size: ${mediaW}${unit} ${mediaH}${unit}; margin: 0; }`
    : '';
  return `
${page}
@font-face{
  font-family:'DM Sans';
  src:url(data:font/woff2;base64,${FONT}) format('woff2');
  font-weight:100 1000; font-style:normal; font-display:block;
}
*{margin:0;padding:0;box-sizing:border-box;}
html,body{background:#0b2538;}
:root{
  --navy:#163d5e; --navy-deep:#0b2538; --navy-glow:#1d4f78;
  --gold:#c9a227; --gold-soft:#e0be4a; --gold-dark:#8f6f15; --cream:#f5f1e6; --cream-dim:#cdd3d8;
  --ball:#d8e000; --paper:#ffffff;
  --edge:${edge}em; --bleed:${bleed}${unit || 'px'};
}
.sheet{
  position:relative; width:${mediaW}${unit}; height:${mediaH}${unit};
  font-size:${base}${unit}; font-family:'DM Sans',sans-serif; color:var(--cream);
  background:radial-gradient(120% 80% at 50% -10%, var(--navy) 0%, var(--navy-deep) 60%);
  overflow:hidden; -webkit-print-color-adjust:exact; print-color-adjust:exact;
  display:flex; flex-direction:column;
}
/* faint court lines + grain */
.sheet::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.07;
  background:
    linear-gradient(90deg, transparent 49.7%, var(--cream) 49.7%, var(--cream) 50.3%, transparent 50.3%),
    linear-gradient(0deg, transparent 0, transparent calc(100% - .14em), var(--cream) calc(100% - .14em));
  background-repeat:no-repeat; background-size:100% 100%, 100% 100%;}
.sheet::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:60;
  background-image:url("data:image/svg+xml,${GRAIN}");opacity:.05;mix-blend-mode:overlay;}
.sheet>*{position:relative;z-index:2;}

/* crop marks (print only) */
.cmark{position:absolute;z-index:70;width:${bleed || 0}${unit || 'px'};height:${bleed || 0}${unit || 'px'};}
.cmark::before,.cmark::after{content:'';position:absolute;background:#9aa4ad;}
.cmark::before{width:100%;height:.18em;}
.cmark::after{height:100%;width:.18em;}
.cmark.tl{top:0;left:0;} .cmark.tl::before{top:100%;left:0;} .cmark.tl::after{left:100%;top:0;}
.cmark.tr{top:0;right:0;} .cmark.tr::before{top:100%;right:0;} .cmark.tr::after{right:100%;top:0;}
.cmark.bl{bottom:0;left:0;} .cmark.bl::before{bottom:100%;left:0;} .cmark.bl::after{left:100%;bottom:0;}
.cmark.br{bottom:0;right:0;} .cmark.br::before{bottom:100%;right:0;} .cmark.br::after{right:100%;bottom:0;}

/* ---- letterhead ---- */
.letter{background:var(--paper);color:var(--navy-deep);display:flex;align-items:center;justify-content:space-between;
  padding:calc(var(--bleed) + 1em) var(--edge) 1em;gap:1.2em;flex:0 0 auto;
  border-bottom:.1em solid var(--gold);}
.letter img{display:block;width:auto;}
.org{display:flex;flex-direction:column;align-items:center;gap:.45em;}
.org__role{font-weight:800;font-size:.9em;letter-spacing:.17em;text-transform:uppercase;line-height:1;white-space:nowrap;}
.org--host .org__role{color:var(--gold-dark);}
.org--partner .org__role{color:#7a8794;}
.org--host .logo-bsv{height:17.6em;}
.org--partner .logo-gs{height:13.6em;}
.letter__div{width:.07em;height:3.6em;background:linear-gradient(transparent,var(--gold),transparent);opacity:.55;align-self:center;}

/* ---- hero ---- */
.hero{position:relative;flex:0 0 auto;height:var(--hero-h);overflow:hidden;}
.hero__img{position:absolute;inset:0;background-image:url(${HERO});background-size:cover;background-position:50% 62%;}
.hero__shade{position:absolute;inset:0;background:linear-gradient(180deg, rgba(11,37,56,.18) 0%, rgba(11,37,56,0) 32%, rgba(11,37,56,.12) 64%, var(--navy-deep) 100%);}
.hero, .hero__img, .hero__shade{clip-path:polygon(0 0,100% 0,100% calc(100% - 5em),0 100%);}
.hero__kicker{position:absolute;left:var(--edge);top:1.2em;z-index:3;display:inline-flex;align-items:center;gap:.55em;
  background:var(--navy-deep);color:var(--ball);border:.13em solid var(--ball);font-weight:800;letter-spacing:.12em;text-transform:uppercase;
  font-size:1.18em;padding:.46em 1em .4em;border-radius:2em;box-shadow:0 .35em 1.3em rgba(0,0,0,.4);}
.ball{width:1.3em;height:1.3em;display:block;}

/* ---- title block ---- */
.title-wrap{flex:0 0 auto;padding:0 var(--edge);margin-top:-2.9em;}
.title{font-weight:900;line-height:.84;letter-spacing:-.022em;text-transform:uppercase;color:var(--cream);
  font-size:var(--title-fs);text-shadow:0 .12em .9em rgba(0,0,0,.45);}
.title .l1{display:flex;align-items:baseline;gap:.44em;white-space:nowrap;}
.title .l2{white-space:nowrap;}
.title .year{color:var(--gold);font-size:.6em;font-weight:900;letter-spacing:-.01em;}
.hook{font-weight:600;font-size:var(--hook-fs);color:var(--cream);max-width:32ch;line-height:1.16;margin-top:.7em;}

/* ---- termine ---- */
.termine{flex:0 0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:.9em;padding:0 var(--edge);margin-top:1.7em;}
.termin{background:rgba(255,255,255,.07);border:.05em solid rgba(245,241,230,.2);border-radius:.7em;
  padding:1.05em 1em 1.1em;display:flex;flex-direction:column;gap:.16em;}
.termin b{color:var(--cream-dim);font-weight:800;font-size:1.16em;letter-spacing:.14em;text-transform:uppercase;}
.termin .d{font-weight:900;font-size:2.5em;line-height:.96;color:var(--cream);}
.termin .m{font-weight:600;font-size:1.18em;color:var(--cream-dim);}
.info{padding:1em var(--edge) 0;display:flex;flex-direction:column;gap:.28em;}
.when{display:flex;align-items:center;gap:.7em;flex-wrap:wrap;}
.when .t{font-weight:800;font-size:1.5em;color:var(--cream);}
.when .dot{width:.42em;height:.42em;border-radius:50%;background:var(--gold);}
.where{font-weight:600;font-size:1.26em;color:var(--cream-dim);line-height:1.2;}
.where b{font-weight:800;color:var(--cream);}

/* ---- perks + price ---- */
.mid{flex:0 0 auto;display:grid;grid-template-columns:1.3fr 1fr;gap:1.5em;align-items:start;
  padding:1.4em var(--edge) 0;}
.perks{list-style:none;display:flex;flex-direction:column;gap:.66em;padding-top:.2em;}
.perks li{position:relative;padding-left:1.65em;font-weight:500;font-size:1.32em;line-height:1.14;color:var(--cream);}
.perks li::before{content:'';position:absolute;left:.28em;top:.12em;width:.5em;height:.92em;
  border-right:.16em solid var(--gold);border-bottom:.16em solid var(--gold);transform:rotate(40deg);}
.price{background:linear-gradient(160deg,var(--navy-glow),var(--navy));border:.06em solid rgba(245,241,230,.22);
  border-radius:.9em;padding:1.2em 1.25em;display:flex;flex-direction:column;justify-content:center;gap:.5em;}
.price h3{font-weight:800;font-size:1.02em;letter-spacing:.14em;text-transform:uppercase;color:var(--cream-dim);}
.price__main{display:flex;align-items:baseline;gap:.55em;flex-wrap:wrap;}
.price__amt{font-weight:900;font-size:3.1em;line-height:.86;color:var(--gold-soft);}
.price__lbl{font-weight:600;font-size:1.16em;color:var(--cream);line-height:1.1;}
.price__lbl b{display:block;font-weight:800;color:var(--gold-soft);font-size:.94em;letter-spacing:.01em;}
.price__sub{font-weight:600;font-size:1.12em;color:var(--cream-dim);}
.price small{font-weight:600;font-size:1em;color:var(--cream-dim);line-height:1.28;}

/* ---- cta ---- */
.cta{flex:0 0 auto;margin:auto var(--edge) 0;background:var(--paper);color:var(--navy-deep);border-radius:1em;
  display:flex;align-items:center;gap:1.3em;padding:1.15em 1.3em;}
.qr{flex:0 0 auto;width:var(--qr);height:var(--qr);background:#fff;border-radius:.5em;padding:.5em;box-shadow:0 .2em .8em rgba(0,0,0,.15);}
.qr svg{display:block;width:100%;height:100%;}
.cta__body{flex:1 1 auto;min-width:0;}
.cta__kick{display:inline-block;font-weight:900;font-size:1em;letter-spacing:.11em;text-transform:uppercase;
  color:var(--gold-dark);margin-bottom:.2em;}
.cta__body .h{font-weight:900;font-size:1.95em;line-height:1.0;color:var(--navy-deep);}
.cta__body .u{font-weight:700;font-size:1.16em;color:var(--navy);margin-top:.14em;word-break:break-word;}
.cta__body .ph{display:flex;flex-wrap:wrap;align-items:baseline;gap:.1em 1em;margin-top:.55em;}
.cta__body .ph span{font-weight:600;font-size:1.06em;color:#5a6b78;}
.cta__body .ph b{font-weight:800;font-size:1.16em;color:var(--navy-deep);}

/* ---- footer ---- */
.foot{flex:0 0 auto;padding:.9em var(--edge) calc(var(--bleed) + .85em);
  font-weight:500;font-size:.95em;line-height:1.3;color:var(--cream-dim);}

/* ---------- format tweaks ---------- */
.sheet{--hero-h:50em;--title-fs:12em;--hook-fs:2.05em;--qr:15em;}

/* Print (A2/A3) hat mehr Hoehe → Foto & Fakten groesser, fuellt die Flaeche bis zum CTA */
.sheet--print .termine{margin-top:2.9em;}
.sheet--print .termin .d{font-size:2.8em;}
.sheet--print .info{padding-top:2em;}
.sheet--print .when .t{font-size:1.66em;}
.sheet--print .mid{padding-top:2.9em;align-items:center;}
.sheet--print .perks{gap:1.2em;}
.sheet--print .perks li{font-size:1.52em;}
.sheet--print .price{padding:1.5em 1.5em;}
.sheet--print .price h3{font-size:1.12em;}
.sheet--print .price__amt{font-size:3.8em;}
.sheet--print .price__lbl{font-size:1.28em;}
.sheet--print .price__sub{font-size:1.24em;}

.sheet--social{--hero-h:42em;--hook-fs:2.2em;--qr:13em;padding:0;}
.sheet--social .foot{display:none;}            /* AGB-Zeile gehört nicht in Social */

/* Story (9:16): entschlacktes Layout + Safe-Zones (oben 250 / unten 310 px) */
.sheet--story{--hero-h:44em;--hook-fs:2.55em;padding:250px 0 310px;}
.sheet--story .perks{display:none;}
.sheet--story .where{display:none;}
.sheet--story .info{padding-top:.6em;}
.sheet--story .mid{grid-template-columns:1fr;padding-top:.6em;}
.sheet--story .termine{margin-top:1.2em;}
.sheet--story .termin{padding:1.15em 1em;}
.sheet--story .termin .d{font-size:3.1em;}
.sheet--story .termin b{font-size:1.55em;}
.sheet--story .termin .m{font-size:1.55em;}
.sheet--story .when .t{font-size:2.05em;}
.sheet--story .price{padding:1.4em 1.4em;}
.sheet--story .price h3{font-size:1.4em;}
.sheet--story .price__amt{font-size:4em;}
.sheet--story .price__lbl{font-size:1.6em;}
.sheet--story .price__sub{font-size:1.5em;}
.sheet--story .price small{font-size:1.35em;}
.sheet--story .cta{padding:1.5em 1.6em;}
.sheet--story .cta__kick{font-size:1.25em;}
.sheet--story .cta__body .h{font-size:2.3em;}
.sheet--story .cta__body .u{font-size:1.4em;}
.sheet--story .cta__body .ph span{font-size:1.35em;}
.sheet--story .cta__body .ph b{font-size:1.45em;}
`;
}

// ---------------------------------------------------------------- markup ----
function markup({ cls, isPrint, qrSvg }) {
  const cropmarks = isPrint
    ? `<i class="cmark tl"></i><i class="cmark tr"></i><i class="cmark bl"></i><i class="cmark br"></i>`
    : '';
  const camps = C.camps.map((c) =>
    `<div class="termin"><b>${c.n}</b><span class="d">${c.d}</span><span class="m">${c.m}</span></div>`
  ).join('');
  const perks = C.perks.map((p) => `<li>${p}</li>`).join('');
  return `
<div class="sheet ${cls}">
${cropmarks}
  <header class="letter">
    <div class="org org--host">
      <span class="org__role">Veranstalter</span>
      <img class="logo-bsv" src="${LOGO_BSV}" alt="BSV 92 Tennisabteilung">
    </div>
    <span class="letter__div"></span>
    <div class="org org--partner">
      <span class="org__role">in Kooperation mit</span>
      <img class="logo-gs" src="${LOGO_GS}" alt="Tennis Academy Grand Slam">
    </div>
  </header>

  <section class="hero">
    <div class="hero__img"></div>
    <div class="hero__shade"></div>
  </section>

  <div class="title-wrap">
    <h1 class="title">
      <span class="l1"><span>${C.title1}</span><span class="year">${C.year}</span></span>
      <span class="l2">${C.title2}</span>
    </h1>
    <p class="hook">${C.hook}</p>
  </div>

  <section class="termine">${camps}</section>
  <div class="info">
    <div class="when"><span class="t">Mo – Fr</span><i class="dot"></i><span class="t">9:30 – 15:00 Uhr</span></div>
    <div class="where"><b>Tennisanlage BSV 92</b> · Fritz-Wildung-Str. 23 · 14199 Berlin</div>
  </div>

  <section class="mid">
    <ul class="perks">${perks}</ul>
    <div class="price">
      <h3>Teilnahmegebühr</h3>
      <div class="price__main"><span class="price__amt">${C.priceMember} €</span><span class="price__lbl">für Mitglieder</span></div>
      <div class="price__sub">Nicht-Mitglieder ${C.priceNon} €</div>
    </div>
  </section>

  <section class="cta">
    <div class="qr">${qrSvg}</div>
    <div class="cta__body">
      <span class="cta__kick">Begrenzte Plätze — jetzt sichern</span>
      <div class="h">${C.ctaHead}</div>
      <div class="u">${C.ctaUrl}/tenniscamp-anmeldung</div>
    </div>
  </section>

  <footer class="foot">${C.foot}</footer>
</div>`;
}

function htmlDoc(styles, body) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${styles}</style></head><body>${body}</body></html>`;
}

// ---------------------------------------------------------------- formats ---
const MM = 'mm';
const FORMATS = {
  'poster-a2': { mode: 'print', trimW: 420, trimH: 594, bleed: 3, unit: MM },
  'poster-a3': { mode: 'print', trimW: 297, trimH: 420, bleed: 3, unit: MM },
  'social-feed': { mode: 'social', w: 1080, h: 1350, unit: 'px' },
  'social-story': { mode: 'story', w: 1080, h: 1920, unit: 'px', safeTop: 250, safeBottom: 310 },
};

function dimsFor(f) {
  if (f.unit === MM) {
    const mediaW = f.trimW + 2 * f.bleed;
    const mediaH = f.trimH + 2 * f.bleed;
    return { mode: 'print', mediaW, mediaH, base: f.trimW / 100, unit: MM, bleed: f.bleed, edge: 5.6 };
  }
  return {
    mode: f.mode, mediaW: f.w, mediaH: f.h, base: f.w / 100, unit: 'px', bleed: 0,
    edge: 6, safeTop: f.safeTop || 0, safeBottom: f.safeBottom || 0,
  };
}

// ----------------------------------------------------------------- render ---
function findChrome() {
  const cands = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ];
  for (const c of cands) if (fs.existsSync(c)) return c;
  throw new Error('Kein Chrome/Edge gefunden');
}

async function main() {
  const qrSvg = await QRCode.toString(URL, {
    type: 'svg', margin: 0, errorCorrectionLevel: 'M',
    color: { dark: '#0b2538', light: '#0000' },
  });

  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: 'new',
    args: ['--no-sandbox', '--force-color-profile=srgb'],
  });

  const CLS = {
    print: 'sheet--print',
    social: 'sheet--social sheet--feed',
    story: 'sheet--social sheet--story',
  };
  for (const [name, f] of Object.entries(FORMATS)) {
    const d = dimsFor(f);
    const styleMode = d.mode === 'print' ? 'print' : 'social'; // social css family covers feed + story
    const styles = css({ ...d, mode: styleMode });
    const body = markup({ cls: CLS[d.mode], isPrint: d.mode === 'print', qrSvg });
    const html = htmlDoc(styles, body);
    const htmlPath = path.join(DIST, `${name}.html`);
    fs.writeFileSync(htmlPath, html);

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(async () => { await document.fonts.ready; });

    if (f.unit === MM) {
      // print → vector PDF at exact media size
      await page.pdf({
        path: path.join(DIST, `${name}.pdf`),
        printBackground: true, preferCSSPageSize: true,
        width: `${d.mediaW}mm`, height: `${d.mediaH}mm`,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });
      // low-res preview PNG for visual inspection
      const pxW = Math.round(d.mediaW * 3.78);
      const pxH = Math.round(d.mediaH * 3.78);
      await page.setViewport({ width: pxW, height: pxH, deviceScaleFactor: 1.4 });
      await page.screenshot({ path: path.join(DIST, `${name}-preview.png`), clip: { x: 0, y: 0, width: pxW, height: pxH } });
    } else {
      await page.setViewport({ width: f.w, height: f.h, deviceScaleFactor: 2 });
      await page.screenshot({ path: path.join(DIST, `${name}.png`), clip: { x: 0, y: 0, width: f.w, height: f.h } });
    }
    await page.close();
    console.log('✓', name);
  }

  await browser.close();
  console.log('\nFertig →', DIST);
}

main().catch((e) => { console.error(e); process.exit(1); });
