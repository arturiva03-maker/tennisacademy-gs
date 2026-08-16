// Zentrale Quelle für die Camp-Wochen: Termine, Labels und Anmeldeschluss.
//
// Die Anmeldung für eine Woche schliesst automatisch CLOSE_DAYS_BEFORE_START
// Tage vor dem ersten Camp-Tag. Danach stehen Gruppen, Essen und Shirts fest —
// wer später bucht, taucht in der Planung nicht mehr auf.
//
// Einzelne Wochen können mit `closesAt` (letzter Anmeldetag, ISO) davon
// abweichen — z. B. wenn Nachzügler doch noch aufgenommen werden.
//
// WICHTIG: `value` ist der Wert, der in die Anmelde-E-Mail geschrieben wird
// und bleibt deshalb in jeder UI-Sprache deutsch.
const CLOSE_DAYS_BEFORE_START = 2;

export const campWeeks = [
  {
    id: 'woche-5',
    weekNo: 5,
    start: '2026-08-10',
    value: 'Vorletzte Ferienwoche (10.08. – 14.08.2026)',
    label: {
      de: 'Vorletzte Ferienwoche',
      en: 'Second-to-last holiday week',
    },
    dates: {
      de: '10.08. – 14.08.2026',
      en: '10 – 14 August 2026',
    },
  },
  {
    id: 'woche-6',
    weekNo: 6,
    start: '2026-08-17',
    // Nachzügler sind hier weiterhin willkommen: Anmeldung läuft bis zum
    // letzten Camp-Tag statt 2 Tage vor Start.
    closesAt: '2026-08-21',
    value: 'Letzte Ferienwoche (17.08. – 21.08.2026)',
    label: {
      de: 'Letzte Ferienwoche',
      en: 'Last holiday week',
    },
    dates: {
      de: '17.08. – 21.08.2026',
      en: '17 – 21 August 2026',
    },
  },
];

// '2026-08-10' als lokales Datum lesen — new Date('2026-08-10') wäre UTC
// und könnte in unserer Zeitzone auf den Vortag rutschen.
const toLocalDate = (iso) => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

/** Letzter Tag, an dem man sich für diese Woche noch anmelden kann. */
export const campWeekDeadline = (week) => {
  if (week.closesAt) return toLocalDate(week.closesAt);
  const deadline = toLocalDate(week.start);
  deadline.setDate(deadline.getDate() - CLOSE_DAYS_BEFORE_START);
  return deadline;
};

export const isCampWeekOpen = (week, now = new Date()) =>
  startOfDay(now).getTime() <= campWeekDeadline(week).getTime();

/** Wochen, die noch buchbar sind — nur diese werden auf der Website gezeigt. */
export const openCampWeeks = (now = new Date()) =>
  campWeeks.filter((week) => isCampWeekOpen(week, now));
