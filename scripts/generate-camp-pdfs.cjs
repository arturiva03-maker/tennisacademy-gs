/* eslint-disable */
// One-off script: generate AGB, Notfallbogen and Anmeldebogen PDFs onto the
// user's desktop. Mirrors src/lib/notfallbogen.js for the Notfallbogen and
// src/pages/AgbTenniscamp.jsx for the AGB content. The Anmeldebogen is a
// fresh 2026 version based on the legacy 2025 form layout but with current
// prices, dates, categories and SEPA mandate text.

const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

const DESKTOP = path.join(process.env.USERPROFILE || '', 'Desktop');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// detect real dimensions + format from raw bytes (JPEG/PNG) -----------------
const measureImage = (buf) => {
  // PNG: 89 50 4E 47 0D 0A 1A 0A, IHDR width/height at byte 16/20
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return { fmt: 'PNG', mime: 'png', w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  // JPEG: FF D8 ... walk SOFn markers
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      // SOF0..SOFn except DHT(C4)/JPG(C8)/DAC(CC)
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        const h = buf.readUInt16BE(i + 5);
        const w = buf.readUInt16BE(i + 7);
        return { fmt: 'JPEG', mime: 'jpeg', w, h };
      }
      // skip segment
      const segLen = buf.readUInt16BE(i + 2);
      i += 2 + segLen;
    }
  }
  return null;
};

const loadImage = (file) => {
  const p = path.join(PUBLIC_DIR, file);
  if (!fs.existsSync(p)) return null;
  const buf = fs.readFileSync(p);
  const dim = measureImage(buf);
  if (!dim) return null;
  return {
    dataUrl: `data:image/${dim.mime};base64,${buf.toString('base64')}`,
    fmt: dim.fmt,
    w: dim.w,
    h: dim.h,
  };
};

// shared header drawer ------------------------------------------------------
const drawHeader = (doc) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 20;
  const bsv = loadImage('sponsor-bsv92.png');
  const grand = loadImage('logo.png');
  const y = 14;
  if (bsv) {
    const h = 22;
    const w = (bsv.w / bsv.h) * h;
    doc.addImage(bsv.dataUrl, bsv.fmt, marginX, y, w, h);
  }
  if (grand) {
    const h = 20;
    const w = (grand.w / grand.h) * h;
    doc.addImage(grand.dataUrl, grand.fmt, pageWidth - marginX - w, y + 1, w, h);
  }
};

// shared footer drawer -------------------------------------------------------
const drawFooter = (doc) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 20;
  const footerY = pageHeight - 16;
  doc.setLineWidth(0.2);
  doc.line(marginX, footerY - 4, pageWidth - marginX, footerY - 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(90, 90, 90);
  doc.text(
    'Berliner Sport-Verein 1892 e.V. – Tennisabteilung · Fritz-Wildung-Str. 23 · 14199 Berlin',
    pageWidth / 2,
    footerY,
    { align: 'center' },
  );
  doc.text(
    'Büro Tel. 030 - 824 20 88 · www.bsv92-tennis.de · info@bsv92-tennis.de',
    pageWidth / 2,
    footerY + 4,
    { align: 'center' },
  );
  doc.text(
    'TENNIS ACADEMY GRAND SLAM · Buschkrugallee 54 · 12359 Berlin · Tel. 030 - 606 10 55',
    pageWidth / 2,
    footerY + 8,
    { align: 'center' },
  );
  doc.setTextColor(0, 0, 0);
};

// 1) Notfallbogen ------------------------------------------------------------
const CAMPS_2026 = [
  { id: '1. Ferienwoche', label: 'Sommercamp I', dates: '13.07. bis 17.07.2026' },
  { id: 'Vorletzte Ferienwoche', label: 'Sommercamp II', dates: '10.08. bis 14.08.2026' },
  { id: 'Letzte Ferienwoche', label: 'Sommercamp III', dates: '17.08. bis 21.08.2026' },
];

const buildNotfallbogen = () => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 20;
  const contentWidth = pageWidth - marginX * 2;

  drawHeader(doc);

  let y = 48;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('Notfallbogen', pageWidth / 2, y, { align: 'center' });
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('für das', pageWidth / 2, y, { align: 'center' });
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  CAMPS_2026.forEach((camp) => {
    const labelX = marginX + 30;
    doc.text(camp.label, labelX, y);
    doc.text(camp.dates, labelX + 45, y);
    const boxX = labelX + 100;
    const boxY = y - 4;
    doc.setLineWidth(0.4);
    doc.rect(boxX, boxY, 5, 5);
    y += 8;
  });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text('(bitte ankreuzen)', pageWidth - marginX, y - 4, { align: 'right' });
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('bei der BSV 92-Tennisabteilung', pageWidth / 2, y, { align: 'center' });
  y += 4;
  doc.setFontSize(10);
  doc.text('Fritz-Wildung-Str. 23 · 14199 Berlin · Mo – Fr · 9:30 – 15:00 Uhr', pageWidth / 2, y, { align: 'center' });
  y += 10;

  const drawFieldLine = (label) => {
    const lineY = y + 4;
    doc.setLineWidth(0.3);
    doc.line(marginX, lineY, marginX + contentWidth, lineY);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(90, 90, 90);
    doc.text(label, marginX, lineY + 4);
    doc.setTextColor(0, 0, 0);
    y += 14;
  };
  drawFieldLine('Nachname, Vorname (des Kindes)');
  drawFieldLine('Nachname, Vorname (des/der Erziehungsberechtigten)');
  drawFieldLine('Telefonnummer für den Notfall');

  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Hat Ihr Kind besondere Allergien oder Krankheiten – wenn ja, welche?', marginX, y);
  y += 6;
  for (let i = 0; i < 4; i++) {
    const lineY = y + 4;
    doc.setLineWidth(0.3);
    doc.line(marginX, lineY, marginX + contentWidth, lineY);
    y += 8;
  }

  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const disclaimer =
    'Die Unterrichtsteilnahme Ihres Kindes an den oben angekreuzten Tenniscamps erfolgt auf eigene Gefahr. ' +
    'Die TENNIS ACADEMY GRAND SLAM und der BSV 92 übernehmen keinerlei Haftung für den Ersatz ' +
    'liegengebliebener oder abhanden gekommener Gegenstände.';
  const lines = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(lines, marginX, y);
  y += lines.length * 5 + 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Berlin, den', marginX, y);
  doc.setLineWidth(0.3);
  doc.line(marginX + 22, y + 0.5, marginX + 70, y + 0.5);
  doc.line(marginX + 80, y + 0.5, marginX + contentWidth, y + 0.5);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(90, 90, 90);
  doc.text('Datum', marginX + 22, y + 5);
  doc.text('verbindliche Unterschrift', marginX + 80, y + 5);
  doc.setTextColor(0, 0, 0);

  drawFooter(doc);
  return doc;
};

// 2) AGB ---------------------------------------------------------------------
const AGB_SECTIONS = [
  ['1. Voraussetzungen',
    'Alle Kinder und Jugendliche ab 6 Jahren können an den Tenniscamps des BSV 92 teilnehmen. ' +
    'Die Kinder werden in Gruppen von 6 bis maximal 8 Kindern möglichst gleicher Spielstärke eingeteilt.'],
  ['2. Aufsicht bei Minderjährigen',
    'Die Aufsichtspflicht für minderjährige Kinder beschränkt sich auf die Dauer des Tenniscamps. ' +
    'Von Seiten des BSV 92 wird außerhalb des Camps keine Haftung übernommen. Die Eltern/Erziehungsberechtigten ' +
    'haben dafür Sorge zu tragen, dass die Aufsicht für ihr(e) Kind(er) vor und nach dem Trainingsbetrieb nahtlos ' +
    'gewährleistet ist. Die Eltern/Erziehungsberechtigten informieren ihre Kinder, dass sie den Trainingsbereich ' +
    'nicht verlassen dürfen und den Anweisungen der Trainer Folge zu leisten haben. Der BSV 92 übernimmt keine ' +
    'Haftung, wenn ein Kind den Trainingsbereich verlässt.'],
  ['3. Ausschluss vom Tenniscamp',
    'Der BSV 92 – vertreten durch die BSV 92-Trainer – behält sich vor, im Einzelfall einen Tenniscamp-Teilnehmer/-in ' +
    'aus dem Camp auszuschließen, wenn diese/r trotz mehrfacher Ermahnung den Anweisungen des/der Trainers/-in keine ' +
    'Folge leisten, das Training massiv stört oder durch sein/ihr undiszipliniertes Verhalten die Gesundheit der ' +
    'anderen Kinder gefährdet. Bei Minderjährigen muss diese/r bis zur Abholung durch die Eltern/Erziehungs' +
    'berechtigten im Trainingsbereich verbleiben. In diesem Fall hat der/die Ausgeschlossene keinen Anspruch auf ' +
    'Erstattung der (anteiligen) Camp-Gebühr.'],
  ['4. Haftung',
    'Die Haftung des BSV 92 für Schäden im Zusammenhang mit dem Tenniscamp beschränkt sich auf Vorsatz und grobe Fahrlässigkeit.'],
  ['5. Absage des Tenniscamps',
    'Bei Rücktritt innerhalb der letzten Woche vor dem Tenniscamp sind 50 Prozent der Camp-Gebühr zu bezahlen. ' +
    'Bei Nichterscheinen sind 100 Prozent der Camp-Gebühr zu bezahlen. Bei krankheits- oder verletzungsbedingtem ' +
    'Rücktritt (nur mit ärztlichem Attest) entstehen keine Kosten. Dieses Attest ist unaufgefordert bis zwei Tage ' +
    'nach Beginn des Camps schriftlich beim BSV 92 einzureichen. Des Weiteren machen wir darauf aufmerksam, dass bei ' +
    'einer Verletzung oder Krankheit während des Camps keine Rückzahlung der Camp-Gebühren erfolgt.'],
  ['6. Medien',
    'Mit der Anmeldung zu dem Tenniscamp ist jede/r Teilnehmer/-in damit einverstanden, dass über das Camp in den ' +
    'Medien des BSV 92 (Homepage des BSV 92, Homepage der TENNIS ACADEMY GRAND SLAM und in dem Clubjournal) ' +
    'ereignisbezogene Fotos und Berichte mit evtl. Namensnennung veröffentlicht werden.'],
  ['7. Datenschutz',
    'Ihre persönlichen Daten werden bei uns elektronisch gespeichert. Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht.'],
  ['8. Verlust von Wertsachen',
    'Der BSV 92 übernimmt während des Tenniscamps keine Haftung für abhanden gekommene Wertsachen.'],
  ['9. Erklärung des/der Erziehungsberechtigten',
    'Mit der Anmeldung zum Tenniscamp des BSV 92 erkläre ich, dass mein/e Sohn/Tochter körperlich gesund und ' +
    'sportlich voll belastbar ist. Ich erlaube meinem Kind, sich sportlich unter der Aufsicht von Trainern zu betätigen. ' +
    'Im Interesse eines reibungslosen Ablaufes wird mein Kind den Anweisungen der Trainer Folge leisten. Bei groben ' +
    'Verstößen akzeptiere ich den Ausschluss von dem Camp.'],
];

const buildAgb = () => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 20;
  const contentWidth = pageWidth - marginX * 2;

  drawHeader(doc);
  let y = 48;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('AGB · Tenniscamps', pageWidth / 2, y, { align: 'center' });
  y += 7;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text('Allgemeine Geschäftsbedingungen für die Tenniscamps der BSV 92-Tennisabteilung · Stand: Mai 2026',
    pageWidth / 2, y, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  y += 10;

  AGB_SECTIONS.forEach(([title, body]) => {
    if (y > pageHeight - 40) {
      drawFooter(doc);
      doc.addPage();
      drawHeader(doc);
      y = 48;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(title, marginX, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(body, contentWidth);
    lines.forEach((line) => {
      if (y > pageHeight - 30) {
        drawFooter(doc);
        doc.addPage();
        drawHeader(doc);
        y = 48;
      }
      doc.text(line, marginX, y);
      y += 5;
    });
    y += 3;
  });

  drawFooter(doc);
  return doc;
};

// 3) Anmeldebogen 2026 -------------------------------------------------------
const buildAnmeldebogen = () => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 20;
  const contentWidth = pageWidth - marginX * 2;

  drawHeader(doc);
  let y = 48;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Anmeldung Tenniscamps', pageWidth / 2, y, { align: 'center' });
  y += 8;
  doc.setFontSize(18);
  doc.text('Sommersaison 2026', pageWidth / 2, y, { align: 'center' });
  y += 12;

  // termine + checkbox
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  const drawCampRow = (label, dates) => {
    const labelX = marginX + 25;
    doc.text(label, labelX, y);
    doc.text(dates, labelX + 50, y);
    const boxX = labelX + 110;
    const boxY = y - 4;
    doc.setLineWidth(0.4);
    doc.rect(boxX, boxY, 5, 5);
    y += 8;
  };
  drawCampRow('Sommercamp I',  '13.07. bis 17.07.2026');
  drawCampRow('Sommercamp II', '10.08. bis 14.08.2026');
  drawCampRow('Sommercamp III','17.08. bis 21.08.2026');
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text('(bitte ankreuzen)', pageWidth - marginX, y - 4, { align: 'right' });
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Hiermit melde ich mein Kind', marginX, y);
  y += 8;

  const labelLine = (left, leftWidthMm, rightLabel, rightWidthMm) => {
    const lineY = y + 4;
    doc.setLineWidth(0.3);
    doc.line(marginX, lineY, marginX + leftWidthMm, lineY);
    if (rightLabel) doc.line(marginX + leftWidthMm + 6, lineY, marginX + leftWidthMm + 6 + rightWidthMm, lineY);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(90, 90, 90);
    doc.text(left, marginX, lineY + 4);
    if (rightLabel) doc.text(rightLabel, marginX + leftWidthMm + 6, lineY + 4);
    doc.setTextColor(0, 0, 0);
    y += 12;
  };
  labelLine('Nachname, Vorname (des Kindes)', 110, 'Geburtsdatum', contentWidth - 110 - 6);
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('zu den oben angekreuzten Tenniscamps der BSV 92-Tennisabteilung an.', marginX, y);
  y += 10;

  // T-Shirt
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.text('T-Shirt-Größe (bitte ankreuzen)', marginX, y);
  y += 6;
  const tshirtSizes = ['122/128','134/140','146/152','158/164','S','M','L','XL'];
  const colW = contentWidth / tshirtSizes.length;
  tshirtSizes.forEach((s, i) => {
    const cx = marginX + colW * i + colW / 2;
    doc.setLineWidth(0.4);
    doc.rect(cx - 2.5, y - 4, 5, 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(s, cx, y + 6, { align: 'center' });
  });
  y += 14;

  // Vegetarisch / Mitglied
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.text('Vegetarisches Mittagessen?', marginX, y);
  doc.setLineWidth(0.4);
  doc.rect(marginX + 55, y - 4, 5, 5);
  doc.setFont('helvetica', 'normal');
  doc.text('Ja', marginX + 62, y);
  doc.rect(marginX + 72, y - 4, 5, 5);
  doc.text('Nein', marginX + 79, y);

  doc.setFont('helvetica', 'italic');
  doc.text('Mitglied im BSV 92?', marginX + 105, y);
  doc.setLineWidth(0.4);
  doc.rect(marginX + 145, y - 4, 5, 5);
  doc.setFont('helvetica', 'normal');
  doc.text('Ja', marginX + 152, y);
  doc.rect(marginX + 160, y - 4, 5, 5);
  doc.text('Nein', marginX + 167, y);
  y += 10;

  labelLine('Nachname, Vorname (des/der Erziehungsberechtigten)', contentWidth, null, 0);
  labelLine('Straße, Hausnummer', 110, 'PLZ, Ort', contentWidth - 110 - 6);
  labelLine('Telefon / Handy', contentWidth, null, 0);
  labelLine('E-Mail', contentWidth, null, 0);

  // SEPA section
  if (y > pageHeight - 90) {
    drawFooter(doc);
    doc.addPage();
    drawHeader(doc);
    y = 48;
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('SEPA-Lastschriftmandat', marginX, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const sepaText =
    'Ich ermächtige den Berliner Sport-Verein 1892 e.V. – Tennisabteilung, die Camp-Gebühr mittels SEPA-Lastschrift ' +
    'vom unten genannten Konto einzuziehen. Zugleich weise ich mein Kreditinstitut an, diese Lastschriften einzulösen. ' +
    'Hinweis: Innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, kann die Erstattung des belasteten Betrags ' +
    'verlangt werden. Es gelten die mit dem Kreditinstitut vereinbarten Bedingungen.';
  const sepaLines = doc.splitTextToSize(sepaText, contentWidth);
  doc.text(sepaLines, marginX, y);
  y += sepaLines.length * 5 + 4;

  labelLine('Kontoinhaber:in', contentWidth, null, 0);
  labelLine('IBAN', 130, 'BIC (optional)', contentWidth - 130 - 6);
  y += 6;

  // Info-Block
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const info =
    'Das Tenniscamp findet auf der Tennisanlage des BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin statt. ' +
    'Das Camp geht von Montag bis Freitag, jeweils von 9.30 bis 15.00 Uhr. Die Campgebühr für Vereinsmitglieder ' +
    'der BSV 92-Tennisabteilung beträgt 290,- € pro Kind, für Nichtmitglieder 350,- €. Enthalten sind ' +
    'Tennis- und Konditionstraining, Mittagessen inkl. ein großes Getränk pro Tag, Tenniscamp-T-Shirt sowie ' +
    'Tennisturnier mit Sachpreisen und Urkunden.';
  const infoLines = doc.splitTextToSize(info, contentWidth);
  if (y + infoLines.length * 5 > pageHeight - 60) {
    drawFooter(doc);
    doc.addPage();
    drawHeader(doc);
    y = 48;
  }
  doc.text(infoLines, marginX, y);
  y += infoLines.length * 5 + 4;

  const consent =
    'Mit der Anmeldung zu dem Tenniscamp ist jede/r Teilnehmer/-in damit einverstanden, dass über das Camp in den ' +
    'Medien des BSV 92 (Homepage des BSV 92, Homepage der TENNIS ACADEMY GRAND SLAM und in dem Clubjournal) ' +
    'ereignisbezogene Fotos und Berichte mit evtl. Namensnennung veröffentlicht werden. Des Weiteren machen wir darauf ' +
    'aufmerksam, dass bei Verletzung oder Krankheit während des Camps keine Rückzahlung der Campgebühren erfolgt. ' +
    'Die AGB Tenniscamps des BSV 92 habe ich zur Kenntnis genommen.';
  const consentLines = doc.splitTextToSize(consent, contentWidth);
  if (y + consentLines.length * 5 > pageHeight - 45) {
    drawFooter(doc);
    doc.addPage();
    drawHeader(doc);
    y = 48;
  }
  doc.text(consentLines, marginX, y);
  y += consentLines.length * 5 + 10;

  if (y > pageHeight - 30) {
    drawFooter(doc);
    doc.addPage();
    drawHeader(doc);
    y = 48;
  }
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Berlin, den', marginX, y);
  doc.setLineWidth(0.3);
  doc.line(marginX + 22, y + 0.5, marginX + 70, y + 0.5);
  doc.line(marginX + 80, y + 0.5, marginX + contentWidth, y + 0.5);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(90, 90, 90);
  doc.text('Datum', marginX + 22, y + 5);
  doc.text('verbindliche Unterschrift', marginX + 80, y + 5);
  doc.setTextColor(0, 0, 0);

  drawFooter(doc);
  return doc;
};

// run -----------------------------------------------------------------------
const writeDoc = (doc, filename) => {
  const ab = doc.output('arraybuffer');
  const target = path.join(DESKTOP, filename);
  fs.writeFileSync(target, Buffer.from(ab));
  console.log('Wrote', target);
};

writeDoc(buildNotfallbogen(), 'Notfallbogen_Sommercamp_2026.pdf');
writeDoc(buildAgb(),          'AGB_Tenniscamps_2026.pdf');
writeDoc(buildAnmeldebogen(), 'Anmeldung_Sommercamps_2026.pdf');
