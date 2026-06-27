/* eslint-disable */
/*
 * WhatsApp-Status-Werbung — Sommer-Tenniscamps 2026 (BSV 92 × Tennis Academy Grand Slam)
 *
 * Eigenes, fotogetriebenes 9:16-Layout (1080 x 1920) – bewusst NICHT das textlastige Poster,
 * sondern auf den flüchtigen Blick am Handy optimiert: großes Foto oben, knackige Headline,
 * Termine, Preis und ein WhatsApp-typischer CTA ("Antworte auf diesen Status" + Telefon).
 * Safe-Zones: oben ~150 px (Kontaktname/Uhrzeit), unten ~190 px (Antwort-Leiste).
 *
 * Schrift (DM Sans Variable), Foto, Logos werden als base64 eingebettet, der QR-Code wird
 * generiert. Gerendert über das lokal installierte Chrome/Edge (puppeteer-core).
 *
 * Aufruf:  node scripts/whatsapp-status.cjs      (oder: npm run whatsapp)
 * Ausgabe: poster/export/whatsapp-status.png  +  whatsapp-status.jpg
 */
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer-core');

const ROOT = path.join(__dirname, '..');
const PUB = path.join(ROOT, 'public');
const NM = path.join(ROOT, 'node_modules');
const DIST = path.join(ROOT, 'poster', 'export');
fs.mkdirSync(DIST, { recursive: true });

// ---------------------------------------------------------------- assets ----
const b64 = (p) => fs.readFileSync(p).toString('base64');
const jpg = (name) => `data:image/jpeg;base64,${b64(path.join(PUB, name))}`;
const png = (name) => `data:image/png;base64,${b64(path.join(PUB, name))}`;

const FONT = b64(path.join(NM, '@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2'));
const LOGO_GS = png('logo.png');          // Tennis Academy Grand Slam
const LOGO_BSV = png('bsv-logo-125.png');  // BSV 92 Tennisabteilung – 125 Jahre
const HERO = jpg('tenniscamp.jpg');        // Gruppenfoto Abschlussturnier – Kinder mit Urkunden

const URL = 'https://www.tennisacademy-gs.de/tenniscamp-anmeldung';

// ---------------------------------------------------------------- content ---
const C = {
  kicker: 'Sommerferien Berlin · 2026',
  title1: 'SOMMER',
  title2: 'TENNISCAMPS',
  year: '2026',
  hook: '5 Tage Tennis, Spaß &amp; Turnier — für Kinder und Jugendliche ab 5–6 Jahren',
  camps: [
    { n: 'CAMP I', d: '13.–17.', m: 'Juli' },
    { n: 'CAMP II', d: '10.–14.', m: 'August' },
    { n: 'CAMP III', d: '17.–21.', m: 'August' },
  ],
  time: 'Mo – Fr · 9:30 – 15:00 Uhr',
  place: 'Tennisanlage BSV ’92 · Fritz-Wildung-Str. 23 · Berlin',
  priceMember: '290',
  priceNon: '350',
  ctaKick: 'Begrenzte Plätze — jetzt sichern',
  ctaHead: 'Jetzt anmelden',
  reply: 'oder antworte einfach auf diesen Status',
  phone: '0162 9300590',
  web: 'tennisacademy-gs.de',
};

// ----------------------------------------------------------------- icons ----
const BALL = `<svg class="ball" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49" fill="#cdd84e"/><path d="M16 22 A56 56 0 0 0 16 78" fill="none" stroke="#fffbe6" stroke-width="5" opacity=".9" stroke-linecap="round"/><path d="M84 22 A56 56 0 0 1 84 78" fill="none" stroke="#fffbe6" stroke-width="5" opacity=".9" stroke-linecap="round"/></svg>`;
const I_CHAT = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14a1.6 1.6 0 0 1 1.6 1.6v9A1.6 1.6 0 0 1 19 16.2H9.4L5 20.5V5.6A1.6 1.6 0 0 1 6.6 4z" fill="currentColor"/></svg>`;
const I_PHONE = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.9c1.5 2.9 3.9 5.3 6.8 6.8l2.2-2.2c.3-.3.7-.4 1.1-.3 1.1.4 2.4.6 3.6.6.6 0 1 .5 1 1V20c0 .6-.4 1-1 1C9.5 21 3 14.5 3 6.1c0-.6.5-1 1-1h3.6c.6 0 1 .5 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.3 1.1l-2.3 2z" fill="currentColor"/></svg>`;
const I_WEB = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.4 2.6 2.4 15.4 0 18M12 3c-2.4 2.6-2.4 15.4 0 18"/></svg>`;

// subtle film grain (matches the poster's texture) ---------------------------
const GRAIN = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`
);

// ----------------------------------------------------------------- styles ---
function css() {
  return `
@font-face{font-family:'DM Sans';src:url(data:font/woff2;base64,${FONT}) format('woff2');font-weight:100 1000;font-style:normal;font-display:block;}
*{margin:0;padding:0;box-sizing:border-box;}
html,body{background:#0b1424;}
:root{
  /* BSV-92-Logo-Palette ohne Blau: Schwarz/Anthrazit (neutral, nicht warm) + Gold + Weiß */
  --navy:#26282d; --navy-deep:#111215; --navy-glow:#34373d;
  --gold:#c9a227; --gold-soft:#ecc964; --gold-ink:#b0871d;
  --ink:#1a1c20; --ink-dim:#5b5f66;
  --cream:#f6f4ef; --cream-dim:#d0d1d4; --ball:#cdd84e;
}
.sheet{
  position:relative; width:1080px; height:1920px; overflow:hidden;
  font-family:'DM Sans',sans-serif; color:var(--ink);
  background:#ffffff;
  -webkit-print-color-adjust:exact; print-color-adjust:exact;
  display:flex; flex-direction:column;
  /* unten extra Platz: WhatsApp legt Bildunterschrift + Antwort-Leiste über den unteren Rand */
  padding:140px 64px 350px;
}
/* faint centre court-line + grain */
.sheet::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.05;
  background:linear-gradient(90deg,transparent 49.7%,var(--navy) 49.7%,var(--navy) 50.3%,transparent 50.3%);}
.sheet::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:40;
  background-image:url("data:image/svg+xml,${GRAIN}");opacity:.04;mix-blend-mode:overlay;}
.sheet>*{position:relative;z-index:2;}
.defs{position:absolute;width:0;height:0;overflow:hidden;}

/* ---- co-brand strip ---- */
.brand{display:flex;align-items:center;justify-content:space-between;gap:18px;flex:0 0 auto;}
.brand .org{display:flex;flex-direction:column;align-items:center;gap:8px;}
.brand .role{font-weight:800;font-size:17px;letter-spacing:.16em;text-transform:uppercase;line-height:1;}
.brand .org--host .role{color:var(--gold-ink);}
.brand .org--partner .role{color:var(--ink-dim);}
.brand img{display:block;width:auto;}
.brand .logo-bsv{height:132px;}
.brand .logo-gs{height:74px;}
.brand .div{width:2px;height:64px;background:linear-gradient(transparent,var(--gold),transparent);opacity:.55;}

/* ---- hero photo (natürliche Farben, eng beschnitten – ohne roten Sandboden) ---- */
.hero{position:relative;margin-top:32px;flex:0 0 auto;height:286px;border-radius:30px;overflow:hidden;
  background:#e8e8ea;box-shadow:0 24px 60px rgba(15,16,19,.26);outline:3px solid var(--gold);outline-offset:-3px;}
.hero img{width:100%;height:100%;object-fit:cover;object-position:50% 36%;display:block;
  transform:scale(1.32);transform-origin:50% 39%;}

/* ---- headline ---- */
.head{flex:0 0 auto;margin-top:44px;}
.title{font-weight:900;line-height:.82;letter-spacing:-.035em;text-transform:uppercase;color:var(--navy-deep);}
.title .l1{display:flex;align-items:baseline;gap:.32em;white-space:nowrap;font-size:98px;}
.title .l1 .year{color:var(--gold);font-size:.62em;font-weight:900;letter-spacing:-.01em;}
.title .l2{white-space:nowrap;font-size:110px;}
.hook{margin-top:18px;font-weight:600;font-size:35px;line-height:1.18;color:var(--ink);max-width:30ch;}

/* ---- dates ---- */
.dates{flex:0 0 auto;margin-top:40px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.chip{background:rgba(24,26,30,.05);border:2px solid rgba(24,26,30,.15);border-radius:18px;
  padding:20px 14px 22px;display:flex;flex-direction:column;gap:4px;}
.chip b{color:var(--navy);font-weight:800;font-size:21px;letter-spacing:.1em;text-transform:uppercase;}
.chip .d{font-weight:900;font-size:50px;line-height:.94;color:var(--navy-deep);}
.chip .m{font-weight:600;font-size:24px;color:var(--ink-dim);}

/* ---- meta (time + place) ---- */
.meta{flex:0 0 auto;margin-top:34px;display:flex;flex-direction:column;gap:10px;}
.meta .when{display:flex;align-items:center;gap:14px;font-weight:800;font-size:33px;color:var(--navy-deep);}
.meta .when .dot{width:9px;height:9px;border-radius:50%;background:var(--gold);}
.meta .where{font-weight:600;font-size:26px;color:var(--ink-dim);line-height:1.2;}

/* ---- CTA ---- */
.cta{flex:0 0 auto;margin-top:auto;display:flex;flex-direction:column;
  background:linear-gradient(155deg,var(--navy-glow),var(--navy-deep));color:var(--cream);
  border-radius:26px;padding:32px 36px;box-shadow:0 18px 46px rgba(15,16,19,.24);}
.cta__body{flex:1 1 auto;min-width:0;}
.cta__kick{display:inline-block;font-weight:900;font-size:23px;letter-spacing:.08em;text-transform:uppercase;color:var(--gold-soft);}
.cta__head{font-weight:900;font-size:58px;line-height:1;margin:8px 0 18px;color:#fff;}
.line{display:flex;align-items:center;gap:15px;margin-top:12px;}
.line svg{flex:0 0 auto;width:34px;height:34px;color:var(--gold-soft);}
.line span{font-weight:700;font-size:31px;color:var(--cream);}
.line.reply span{font-weight:700;color:var(--cream-dim);font-size:29px;}
`;
}

// ---------------------------------------------------------------- markup ----
function markup() {
  const chips = C.camps.map((c) =>
    `<div class="chip"><b>${c.n}</b><span class="d">${c.d}</span><span class="m">${c.m}</span></div>`
  ).join('');
  return `
<div class="sheet">
  <header class="brand">
    <div class="org org--host"><span class="role">Veranstalter</span><img class="logo-bsv" src="${LOGO_BSV}" alt="BSV ’92 Tennisabteilung"></div>
    <span class="div"></span>
    <div class="org org--partner"><span class="role">in Kooperation mit</span><img class="logo-gs" src="${LOGO_GS}" alt="Tennis Academy Grand Slam"></div>
  </header>

  <div class="hero">
    <img src="${HERO}" alt="Kinder beim Tenniscamp mit Urkunden">
  </div>

  <div class="head">
    <h1 class="title">
      <span class="l1"><span>${C.title1}</span><span class="year">${C.year}</span></span>
      <span class="l2">${C.title2}</span>
    </h1>
    <p class="hook">${C.hook}</p>
  </div>

  <section class="dates">${chips}</section>

  <div class="meta">
    <div class="when"><span>${C.time.split(' · ')[0]}</span><i class="dot"></i><span>${C.time.split(' · ')[1]}</span></div>
    <div class="where">${C.place}</div>
  </div>

  <section class="cta">
    <div class="cta__body">
      <span class="cta__kick">${C.ctaKick}</span>
      <div class="cta__head">${C.ctaHead}</div>
      <div class="line">${I_WEB}<span>${C.web}/tenniscamp-anmeldung</span></div>
      <div class="line reply">${I_CHAT}<span>${C.reply}</span></div>
    </div>
  </section>
</div>`;
}

function htmlDoc(styles, body) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${styles}</style></head><body>${body}</body></html>`;
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
  const html = htmlDoc(css(), markup());
  fs.writeFileSync(path.join(DIST, 'whatsapp-status.html'), html);

  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: 'new',
    args: ['--no-sandbox', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(async () => { await document.fonts.ready; });

  await page.screenshot({
    path: path.join(DIST, 'whatsapp-status.png'),
    clip: { x: 0, y: 0, width: 1080, height: 1920 },
  });
  await page.screenshot({
    path: path.join(DIST, 'whatsapp-status.jpg'), type: 'jpeg', quality: 92,
    clip: { x: 0, y: 0, width: 1080, height: 1920 },
  });

  await page.close();
  await browser.close();
  console.log('✓ whatsapp-status.png + .jpg →', DIST);
}

main().catch((e) => { console.error(e); process.exit(1); });
