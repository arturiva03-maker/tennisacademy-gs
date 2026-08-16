import { campWeeks, openCampWeeks } from '@/lib/campWeeks';

// Auf dem Bogen stehen nur die Wochen, für die man sich noch anmelden kann —
// vorbei ist vorbei. Fällt der Anmeldeschluss zwischen Formular und Download,
// bleibt wenigstens die angekreuzte Woche stehen.
const campsForBogen = (termin) => {
  const open = openCampWeeks();
  if (open.length > 0) return open;
  return campWeeks.filter((week) => week.value === termin);
};

const loadImageAsDataUrl = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve({ dataUrl: canvas.toDataURL('image/png'), width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });

export async function generateNotfallbogenPdf(formData = {}) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 20;
  const contentWidth = pageWidth - marginX * 2;

  const logo = await loadImageAsDataUrl('/logo.png');
  const bsvLogo = await loadImageAsDataUrl('/sponsor-bsv92.png');

  let y = 18;

  if (bsvLogo) {
    const h = 22;
    const w = (bsvLogo.width / bsvLogo.height) * h;
    doc.addImage(bsvLogo.dataUrl, 'PNG', marginX, y - 4, w, h);
  }
  if (logo) {
    const h = 16;
    const w = (logo.width / logo.height) * h;
    doc.addImage(logo.dataUrl, 'PNG', pageWidth - marginX - w, y, w, h);
  }

  y += 30;

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
  const camps = campsForBogen(formData.termin);
  camps.forEach((camp) => {
    const checked = formData.termin === camp.value;
    const labelX = marginX + 30;
    doc.text(camp.campName, labelX, y);
    doc.text(camp.dates.de.replace('–', 'bis'), labelX + 45, y);

    const boxX = labelX + 100;
    const boxY = y - 4;
    doc.setLineWidth(0.4);
    doc.rect(boxX, boxY, 5, 5);
    if (checked) {
      doc.setLineWidth(0.8);
      doc.line(boxX + 0.8, boxY + 0.8, boxX + 4.2, boxY + 4.2);
      doc.line(boxX + 4.2, boxY + 0.8, boxX + 0.8, boxY + 4.2);
      doc.setLineWidth(0.4);
    }
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

  const drawFieldLine = (label, value) => {
    const lineY = y + 4;
    doc.setLineWidth(0.3);
    doc.line(marginX, lineY, marginX + contentWidth, lineY);
    if (value) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(value, marginX + 2, lineY - 1.5);
    }
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(90, 90, 90);
    doc.text(label, marginX, lineY + 4);
    doc.setTextColor(0, 0, 0);
    y += 14;
  };

  const kindName = [formData.kindNachname, formData.kindVorname].filter(Boolean).join(', ');
  const elternName = [formData.elternNachname, formData.elternVorname].filter(Boolean).join(', ');

  drawFieldLine('Nachname, Vorname (des Kindes)', kindName);
  drawFieldLine('Nachname, Vorname (des/der Erziehungsberechtigten)', elternName);
  drawFieldLine('Telefonnummer für den Notfall', formData.elternTelefon || '');

  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Hat Ihr Kind besondere Allergien oder Krankheiten – wenn ja, welche?', marginX, y);
  y += 6;

  const allergieText = (formData.bemerkungen || '').trim();
  const allergieLines = allergieText
    ? doc.splitTextToSize(allergieText, contentWidth - 4)
    : [];

  for (let i = 0; i < 4; i++) {
    const lineY = y + 4;
    doc.setLineWidth(0.3);
    doc.line(marginX, lineY, marginX + contentWidth, lineY);
    if (allergieLines[i]) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(allergieLines[i], marginX + 2, lineY - 1.5);
    }
    y += 8;
  }

  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const disclaimer =
    'Die Unterrichtsteilnahme Ihres Kindes an den oben angekreuzten Tenniscamps erfolgt auf eigene Gefahr. ' +
    'Die TENNIS ACADEMY GRAND SLAM und der BSV 92 übernehmen keinerlei Haftung für den Ersatz ' +
    'liegengebliebener oder abhanden gekommener Gegenstände.';
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(disclaimerLines, marginX, y);
  y += disclaimerLines.length * 5 + 8;

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
    'TENNIS ACADEMY GRAND SLAM · Buschkrugallee 54 · 12359 Berlin · Tel. 0162 9300590',
    pageWidth / 2,
    footerY + 8,
    { align: 'center' },
  );
  doc.setTextColor(0, 0, 0);

  return doc;
}

export async function downloadNotfallbogen(formData = {}) {
  const doc = await generateNotfallbogenPdf(formData);
  const kindName = [formData.kindNachname, formData.kindVorname].filter(Boolean).join('_');
  const suffix = kindName ? `_${kindName}` : '';
  doc.save(`Notfallbogen_Sommercamp_2026${suffix}.pdf`);
}
