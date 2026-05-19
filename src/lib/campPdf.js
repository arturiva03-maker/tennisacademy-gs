import jsPDF from 'jspdf';

const PAGE_MARGIN = 56;
const LABEL_WIDTH = 150;

const formatTimestamp = (date = new Date()) =>
  date.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export function buildCampPdf(formData, eingegangenAm = formatTimestamp()) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const left = PAGE_MARGIN;
  const right = pageWidth - PAGE_MARGIN;
  let y = PAGE_MARGIN;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Tenniscamp-Anmeldung', left, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(90);
  doc.text('TENNIS ACADEMY GRAND SLAM', left, y + 18);
  doc.text(`Eingegangen am ${eingegangenAm} Uhr`, left, y + 32);
  doc.setTextColor(0);

  y += 56;
  doc.setDrawColor(210);
  doc.line(left, y, right, y);
  y += 20;

  const ensureSpace = (needed) => {
    if (y + needed > pageHeight - PAGE_MARGIN) {
      doc.addPage();
      y = PAGE_MARGIN;
    }
  };

  const section = (title) => {
    ensureSpace(28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 55, 95);
    doc.text(title.toUpperCase(), left, y);
    doc.setDrawColor(20, 55, 95);
    doc.line(left, y + 4, left + 28, y + 4);
    doc.setTextColor(0);
    y += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
  };

  const field = (label, value) => {
    if (value === undefined || value === null || value === '') return;
    const valueLines = doc.splitTextToSize(String(value), right - left - LABEL_WIDTH);
    const blockHeight = Math.max(14, valueLines.length * 13 + 2);
    ensureSpace(blockHeight);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(70);
    doc.text(`${label}:`, left, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);
    valueLines.forEach((line, i) => {
      doc.text(line, left + LABEL_WIDTH, y + i * 13);
    });
    y += blockHeight;
  };

  const paragraph = (text, fontSize = 9, color = 90) => {
    const lines = doc.splitTextToSize(text, right - left);
    const height = lines.length * (fontSize + 2) + 4;
    ensureSpace(height);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(color);
    doc.text(lines, left, y);
    doc.setTextColor(0);
    doc.setFontSize(10);
    y += height;
  };

  section('Wunschtermin');
  field('Camp-Woche', formData.termin);
  y += 8;

  section('Kind');
  field('Name', `${formData.kindVorname} ${formData.kindNachname}`.trim());
  field('Geschlecht', formData.kindGeschlecht);
  field('Alter', formData.kindAlter ? `${formData.kindAlter} Jahre` : '');
  field('Mitglied BSV 92', formData.mitglied === 'ja' ? 'Ja' : 'Nein');
  if (formData.mitglied === 'nein') {
    field('Spielstärke / Erfahrung', formData.spielstaerke);
  }
  field('Vegetarisches Essen', formData.vegetarisch === 'ja' ? 'Ja' : 'Nein');
  field('T-Shirt-Größe', formData.tshirt);
  field('Bemerkungen', formData.bemerkungen);
  y += 8;

  section('Erziehungsberechtigte:r / Zahlungspflichtige:r');
  field('Name', `${formData.elternVorname} ${formData.elternNachname}`.trim());
  field('E-Mail', formData.elternEmail);
  field('Telefon', formData.elternTelefon);
  y += 8;

  section('Rechnungsadresse');
  field('Straße', formData.rechnungStrasse);
  field('PLZ / Ort', `${formData.rechnungPlz} ${formData.rechnungOrt}`.trim());
  y += 8;

  section('SEPA-Lastschriftmandat');
  field('Kontoinhaber:in', formData.kontoinhaber);
  field('IBAN', formData.iban);
  if (formData.bic) field('BIC', formData.bic);
  y += 4;
  paragraph(
    'Ich ermächtige die TENNIS ACADEMY GRAND SLAM, die Camp-Gebühr mittels ' +
      'SEPA-Lastschrift vom oben genannten Konto einzuziehen. Zugleich weise ich ' +
      'mein Kreditinstitut an, diese Lastschriften einzulösen. Hinweis: Innerhalb ' +
      'von acht Wochen, beginnend mit dem Belastungsdatum, kann die Erstattung ' +
      'des belasteten Betrags verlangt werden. Es gelten die mit dem ' +
      'Kreditinstitut vereinbarten Bedingungen.',
  );
  y += 4;

  section('Einwilligungen');
  field(
    'SEPA-Einzugsermächtigung',
    formData.sepa ? '[X] erteilt' : '[ ] nicht erteilt',
  );
  field(
    'Datenschutzerklärung',
    formData.privacy ? '[X] akzeptiert' : '[ ] nicht akzeptiert',
  );

  const footerY = pageHeight - 32;
  doc.setFontSize(8);
  doc.setTextColor(140);
  doc.text(
    'Automatisch generiert über tennisacademy-gs.de · ' + eingegangenAm,
    left,
    footerY,
  );

  return doc;
}

export function pdfToBase64(doc) {
  return doc.output('datauristring').split(',')[1];
}

export function pdfFilename(formData) {
  const safe = (s) =>
    (s || 'Anmeldung')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9-]+/g, '_')
      .slice(0, 40);
  return `Tenniscamp_${safe(formData.kindNachname)}_${safe(formData.kindVorname)}.pdf`;
}

export { formatTimestamp };
