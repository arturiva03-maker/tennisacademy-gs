import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { CheckCircle, AlertCircle, Download } from 'lucide-react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import ButtonWithIcon from '@/components/ui/button-with-icon';
import { downloadNotfallbogen } from '@/lib/notfallbogen';
import { openCampWeeks } from '@/lib/campWeeks';
import { useLang } from '../i18n/LanguageContext';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CAMP ||
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const RATE_LIMIT_MS = 60000;
const MAX_SUBMISSIONS = 3;

const geschlechtOptions = [
  { value: 'weiblich', label: { de: 'weiblich', en: 'female' } },
  { value: 'männlich', label: { de: 'männlich', en: 'male' } },
  { value: 'divers', label: { de: 'divers', en: 'diverse' } },
  { value: 'keine Angabe', label: { de: 'keine Angabe', en: 'prefer not to say' } },
];

const tshirtSizes = ['122/128', '134/140', '146/152', '158/164', 'S', 'M', 'L', 'XL'];

const T = {
  de: {
    heroTitle: 'Tenniscamp-Anmeldung',
    heroSub: 'Verbindliche Anmeldung für unsere Sommer-Tenniscamps 2026',
    closedTitle: 'Anmeldung geschlossen',
    closedText:
      'Für die Sommer-Tenniscamps 2026 ist die Anmeldung abgeschlossen. Bei Fragen zu freien Plätzen melde dich gern direkt bei uns.',
    closedCta: 'Zu den Tenniscamps',
    successTitle: 'Anmeldung gesendet!',
    successText: 'Vielen Dank für die Anmeldung. Wir melden uns schnellstmöglich mit allen weiteren Infos.',
    notfallTitleSuccess: 'Notfallbogen für das Camp',
    notfallTextSuccessPre:
      'Bitte lade jetzt den Notfallbogen herunter, drucke ihn aus und bringe ihn unterschrieben am ersten Camp-Tag mit – oder sende ihn unterschrieben per E-Mail an ',
    notfallTextSuccessPost: '. Deine Angaben sind bereits eingetragen.',
    notfallDownload: 'Notfallbogen als PDF herunterladen',
    anotherRegistration: 'Weitere Anmeldung',
    sectionTermin: 'Wunschtermin',
    campWeek: 'Camp-Woche *',
    pleaseSelect: 'Bitte wählen…',
    sectionKind: 'Angaben zum Kind',
    vorname: 'Vorname *',
    nachname: 'Nachname *',
    geschlecht: 'Geschlecht *',
    alter: 'Alter *',
    mitgliedFrage: 'Mitglied im BSV 92? *',
    ja: 'Ja',
    nein: 'Nein',
    spielstaerke: 'Spielstärke / Tennis-Erfahrung *',
    spielstaerkePlaceholder: 'z. B. Anfänger:in, 1 Jahr Vereinstraining, LK 23 …',
    vegetarisch: 'Vegetarisches Mittagessen? *',
    tshirt: 'T-Shirt-Größe *',
    bemerkungen: 'Weitere Bemerkungen',
    bemerkungenPlaceholder: 'Allergien, Medikamente, sonstige Hinweise …',
    sectionEltern: 'Erziehungsberechtigte:r / Zahlungspflichtige:r',
    email: 'E-Mail *',
    telefon: 'Telefon',
    sectionRechnung: 'Rechnungsadresse',
    strasse: 'Straße und Hausnummer *',
    plz: 'PLZ *',
    ort: 'Ort *',
    sectionSepa: 'SEPA-Lastschriftmandat',
    kontoinhaber: 'Kontoinhaber:in *',
    iban: 'IBAN *',
    bic: 'BIC (optional)',
    sepaText:
      'Ich ermächtige den Berliner Sport-Verein 1892 e.V. – Tennisabteilung, die Camp-Gebühr mittels SEPA-Lastschrift vom oben genannten Konto einzuziehen. Zugleich weise ich mein Kreditinstitut an, diese Lastschriften einzulösen. Hinweis: Innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, kann die Erstattung des belasteten Betrags verlangt werden. Es gelten die mit dem Kreditinstitut vereinbarten Bedingungen. *',
    agbPre: 'Ich habe die ',
    agbLink: 'AGB für die Tenniscamps der BSV 92-Tennisabteilung',
    agbPost: ' gelesen und akzeptiere sie. *',
    privacyPre: 'Ich habe die ',
    privacyLink: 'Datenschutzerklärung',
    privacyPost:
      ' gelesen und bin mit der Verarbeitung meiner Daten zum Zweck der Camp-Anmeldung und -Abrechnung einverstanden. *',
    notfallTitleInline: 'Notfallbogen ausdrucken & mitbringen',
    notfallTextInlinePre:
      'Für jedes Camp benötigen wir einen unterschriebenen Notfallbogen. Du kannst ihn jetzt mit deinen Angaben vorausgefüllt herunterladen, ausdrucken und entweder am ersten Camp-Tag mitbringen oder vorab unterschrieben per E-Mail an ',
    notfallTextInlinePost: ' senden.',
    genericError: 'Es gab einen Fehler. Bitte versuche es erneut.',
    sending: 'Wird gesendet…',
    submit: 'Verbindlich anmelden',
    errors: {
      termin: 'Bitte wähle einen Termin',
      terminClosed: 'Für diese Camp-Woche ist die Anmeldung bereits geschlossen',
      kindVorname: 'Vorname des Kindes erforderlich',
      kindNachname: 'Nachname des Kindes erforderlich',
      kindGeschlecht: 'Bitte Geschlecht wählen',
      kindAlter: 'Bitte gültiges Alter (4 – 18) angeben',
      mitglied: 'Bitte Mitgliedschaft angeben',
      spielstaerke: 'Bitte kurz Spielstärke / Tennis-Erfahrung beschreiben',
      vegetarisch: 'Bitte angeben',
      tshirt: 'Bitte T-Shirt-Größe wählen',
      elternVorname: 'Vorname des/der Erziehungsberechtigten erforderlich',
      elternNachname: 'Nachname des/der Erziehungsberechtigten erforderlich',
      elternEmail: 'Bitte gültige E-Mail-Adresse angeben',
      elternTelefon: 'Bitte gültige Telefonnummer angeben',
      rechnungStrasse: 'Straße und Hausnummer erforderlich',
      rechnungPlz: 'Gültige PLZ angeben',
      rechnungOrt: 'Ort erforderlich',
      kontoinhaber: 'Kontoinhaber:in erforderlich',
      iban: 'Bitte gültige IBAN angeben',
      sepa: 'Bitte SEPA-Einzugsermächtigung bestätigen',
      privacy: 'Bitte Datenschutzerklärung akzeptieren',
      agbCamp: 'Bitte Camp-AGB akzeptieren',
      rateLimit: 'Zu viele Anfragen. Bitte warte einen Moment.',
    },
  },
  en: {
    heroTitle: 'Tennis Camp Registration',
    heroSub: 'Binding registration for our 2026 summer tennis camps',
    closedTitle: 'Registration closed',
    closedText:
      'Registration for the 2026 summer tennis camps is now closed. If you would like to ask about remaining places, please get in touch with us directly.',
    closedCta: 'Back to the tennis camps',
    successTitle: 'Registration sent!',
    successText: 'Thank you for registering. We will get back to you with all further information as soon as possible.',
    notfallTitleSuccess: 'Emergency form for the camp',
    notfallTextSuccessPre:
      'Please download the emergency form now (PDF in German), print it and bring it signed on the first day of camp – or send it signed by email to ',
    notfallTextSuccessPost: '. Your details are already filled in.',
    notfallDownload: 'Download emergency form as PDF',
    anotherRegistration: 'Register another child',
    sectionTermin: 'Preferred Week',
    campWeek: 'Camp week *',
    pleaseSelect: 'Please select…',
    sectionKind: 'Child Details',
    vorname: 'First name *',
    nachname: 'Last name *',
    geschlecht: 'Gender *',
    alter: 'Age *',
    mitgliedFrage: 'Member of BSV 92? *',
    ja: 'Yes',
    nein: 'No',
    spielstaerke: 'Skill level / tennis experience *',
    spielstaerkePlaceholder: 'e.g. beginner, 1 year of club training, German LK 23 …',
    vegetarisch: 'Vegetarian lunch? *',
    tshirt: 'T-shirt size *',
    bemerkungen: 'Additional remarks',
    bemerkungenPlaceholder: 'Allergies, medication, other notes …',
    sectionEltern: 'Parent / Legal Guardian (payer)',
    email: 'Email *',
    telefon: 'Phone',
    sectionRechnung: 'Billing Address',
    strasse: 'Street and house number *',
    plz: 'Postal code *',
    ort: 'City *',
    sectionSepa: 'SEPA Direct Debit Mandate',
    kontoinhaber: 'Account holder *',
    iban: 'IBAN *',
    bic: 'BIC (optional)',
    sepaText:
      'I authorise Berliner Sport-Verein 1892 e.V. – Tennis Department to collect the camp fee from the account stated above by SEPA direct debit. At the same time, I instruct my bank to honour these direct debits. Note: I can demand a refund of the debited amount within eight weeks, starting from the debit date. The terms agreed with my bank apply. *',
    agbPre: 'I have read and accept the ',
    agbLink: 'terms and conditions for the tennis camps of the BSV 92 tennis department',
    agbPost: '. *',
    privacyPre: 'I have read the ',
    privacyLink: 'privacy policy',
    privacyPost:
      ' and consent to the processing of my data for the purpose of camp registration and billing. *',
    notfallTitleInline: 'Print & bring the emergency form',
    notfallTextInlinePre:
      'For every camp we need a signed emergency form (PDF in German). You can download it now pre-filled with your details, print it and either bring it on the first day of camp or send it signed in advance by email to ',
    notfallTextInlinePost: '.',
    genericError: 'Something went wrong. Please try again.',
    sending: 'Sending…',
    submit: 'Register (binding)',
    errors: {
      termin: 'Please choose a camp week',
      terminClosed: 'Registration for this camp week is already closed',
      kindVorname: "Child's first name is required",
      kindNachname: "Child's last name is required",
      kindGeschlecht: 'Please select a gender',
      kindAlter: 'Please enter a valid age (4 – 18)',
      mitglied: 'Please indicate membership',
      spielstaerke: 'Please briefly describe skill level / tennis experience',
      vegetarisch: 'Please choose an option',
      tshirt: 'Please choose a t-shirt size',
      elternVorname: "Parent's/guardian's first name is required",
      elternNachname: "Parent's/guardian's last name is required",
      elternEmail: 'Please enter a valid email address',
      elternTelefon: 'Please enter a valid phone number',
      rechnungStrasse: 'Street and house number are required',
      rechnungPlz: 'Please enter a valid postal code',
      rechnungOrt: 'City is required',
      kontoinhaber: 'Account holder is required',
      iban: 'Please enter a valid IBAN',
      sepa: 'Please confirm the SEPA direct debit mandate',
      privacy: 'Please accept the privacy policy',
      agbCamp: 'Please accept the camp terms and conditions',
      rateLimit: 'Too many requests. Please wait a moment.',
    },
  },
};

const normalizeIban = (value) => value.replace(/\s+/g, '').toUpperCase();

const isValidIban = (raw) => {
  const iban = normalizeIban(raw);
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false;
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged
    .split('')
    .map((ch) => (/[A-Z]/.test(ch) ? ch.charCodeAt(0) - 55 : ch))
    .join('');
  let remainder = 0;
  for (let i = 0; i < numeric.length; i += 7) {
    remainder = Number(String(remainder) + numeric.slice(i, i + 7)) % 97;
  }
  return remainder === 1;
};

const formatIban = (raw) =>
  normalizeIban(raw).replace(/(.{4})/g, '$1 ').trim();

const validateForm = (data, msg) => {
  const errors = {};

  if (!data.termin) {
    errors.termin = msg.termin;
  } else if (!openCampWeeks().some((week) => week.value === data.termin)) {
    // Schutz für lange offene Tabs: Der Anmeldeschluss kann zwischen dem
    // Öffnen des Formulars und dem Absenden erreicht worden sein.
    errors.termin = msg.terminClosed;
  }

  if (!data.kindVorname || data.kindVorname.trim().length < 2) {
    errors.kindVorname = msg.kindVorname;
  }
  if (!data.kindNachname || data.kindNachname.trim().length < 2) {
    errors.kindNachname = msg.kindNachname;
  }
  if (!data.kindGeschlecht) errors.kindGeschlecht = msg.kindGeschlecht;
  const alter = Number(data.kindAlter);
  if (!data.kindAlter || Number.isNaN(alter) || alter < 4 || alter > 18) {
    errors.kindAlter = msg.kindAlter;
  }
  if (!data.mitglied) errors.mitglied = msg.mitglied;
  if (data.mitglied === 'nein' && (!data.spielstaerke || data.spielstaerke.trim().length < 5)) {
    errors.spielstaerke = msg.spielstaerke;
  }
  if (!data.vegetarisch) errors.vegetarisch = msg.vegetarisch;
  if (!data.tshirt) errors.tshirt = msg.tshirt;

  if (!data.elternVorname || data.elternVorname.trim().length < 2) {
    errors.elternVorname = msg.elternVorname;
  }
  if (!data.elternNachname || data.elternNachname.trim().length < 2) {
    errors.elternNachname = msg.elternNachname;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.elternEmail || !emailRegex.test(data.elternEmail)) {
    errors.elternEmail = msg.elternEmail;
  }
  if (data.elternTelefon && !/^[\d\s\-+()]*$/.test(data.elternTelefon)) {
    errors.elternTelefon = msg.elternTelefon;
  }

  if (!data.rechnungStrasse || data.rechnungStrasse.trim().length < 3) {
    errors.rechnungStrasse = msg.rechnungStrasse;
  }
  if (!data.rechnungPlz || !/^\d{4,5}$/.test(data.rechnungPlz.trim())) {
    errors.rechnungPlz = msg.rechnungPlz;
  }
  if (!data.rechnungOrt || data.rechnungOrt.trim().length < 2) {
    errors.rechnungOrt = msg.rechnungOrt;
  }

  if (!data.kontoinhaber || data.kontoinhaber.trim().length < 2) {
    errors.kontoinhaber = msg.kontoinhaber;
  }
  if (!data.iban || !isValidIban(data.iban)) {
    errors.iban = msg.iban;
  }

  if (!data.sepa) errors.sepa = msg.sepa;
  if (!data.privacy) errors.privacy = msg.privacy;
  if (!data.agbCamp) errors.agbCamp = msg.agbCamp;

  return errors;
};

const getSubmissionHistory = () => {
  try {
    const history = localStorage.getItem('campFormSubmissions');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

const addSubmissionToHistory = () => {
  const history = getSubmissionHistory();
  const now = Date.now();
  history.push(now);
  const filtered = history.filter((time) => now - time < RATE_LIMIT_MS);
  localStorage.setItem('campFormSubmissions', JSON.stringify(filtered));
};

const isRateLimited = () => {
  const history = getSubmissionHistory();
  const now = Date.now();
  const recent = history.filter((time) => now - time < RATE_LIMIT_MS);
  return recent.length >= MAX_SUBMISSIONS;
};

const initialFormData = {
  termin: '',
  kindVorname: '',
  kindNachname: '',
  kindGeschlecht: '',
  kindAlter: '',
  mitglied: '',
  spielstaerke: '',
  vegetarisch: '',
  tshirt: '',
  bemerkungen: '',
  elternVorname: '',
  elternNachname: '',
  elternEmail: '',
  elternTelefon: '',
  rechnungStrasse: '',
  rechnungPlz: '',
  rechnungOrt: '',
  kontoinhaber: '',
  iban: '',
  bic: '',
  sepa: false,
  privacy: false,
  agbCamp: false,
  website: '',
};

export default function TenniscampAnmeldung() {
  const { lang } = useLang();
  const t = T[lang];
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  const [lastSubmission, setLastSubmission] = useState(null);
  const verfuegbareTermine = openCampWeeks();

  const handleDownloadNotfallbogen = async (data) => {
    try {
      await downloadNotfallbogen(data);
    } catch (err) {
      console.error('Notfallbogen konnte nicht erstellt werden', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: next }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleIbanBlur = () => {
    if (formData.iban) {
      setFormData((prev) => ({ ...prev, iban: formatIban(prev.iban) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.website) {
      setStatus('success');
      return;
    }

    if (isRateLimited()) {
      setErrors({ form: t.errors.rateLimit });
      return;
    }

    const validationErrors = validateForm(formData, t.errors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    setErrors({});

    // Die versendete Anmeldung wird IMMER auf Deutsch aufgebaut,
    // unabhängig davon, in welcher Sprache das Formular angezeigt wurde.
    const parentName = `${formData.elternVorname} ${formData.elternNachname}`.trim();
    const kindName = `${formData.kindVorname} ${formData.kindNachname}`.trim();
    const eingegangenAm = new Date().toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const line = (label, value) =>
      value === undefined || value === null || value === ''
        ? null
        : `  • ${label}: ${value}`;

    const message = [
      `TENNISCAMP-ANMELDUNG`,
      `Eingegangen am ${eingegangenAm} Uhr`,
      ``,
      `Wunschtermin: ${formData.termin}`,
      ``,
      `▸ KIND`,
      line('Name', kindName),
      line('Geschlecht', formData.kindGeschlecht),
      line('Alter', `${formData.kindAlter} Jahre`),
      line('Mitglied BSV 92', formData.mitglied === 'ja' ? 'Ja' : 'Nein'),
      formData.mitglied === 'nein'
        ? line('Spielstärke / Erfahrung', formData.spielstaerke)
        : null,
      line('Vegetarisches Essen', formData.vegetarisch === 'ja' ? 'Ja' : 'Nein'),
      line('T-Shirt-Größe', formData.tshirt),
      line('Bemerkungen', formData.bemerkungen),
      ``,
      `▸ ERZIEHUNGSBERECHTIGTE:R / ZAHLUNGSPFLICHTIGE:R`,
      line('Name', parentName),
      line('E-Mail', formData.elternEmail),
      line('Telefon', formData.elternTelefon),
      ``,
      `▸ RECHNUNGSADRESSE`,
      `  ${formData.rechnungStrasse}`,
      `  ${formData.rechnungPlz} ${formData.rechnungOrt}`,
      ``,
      `▸ SEPA-LASTSCHRIFTMANDAT`,
      line('Kontoinhaber:in', formData.kontoinhaber),
      line('IBAN', formData.iban),
      line('BIC', formData.bic),
      ``,
      `▸ EINWILLIGUNGEN`,
      line('SEPA-Einzugsermächtigung', formData.sepa ? '✓ erteilt' : '✗ nicht erteilt'),
      line('Datenschutzerklärung', formData.privacy ? '✓ akzeptiert' : '✗ nicht akzeptiert'),
      ``,
      `—`,
      `Automatisch gesendet über tennisacademy-gs.de`,
    ]
      .filter(Boolean)
      .join('\n');

    const templateParams = {
      title: `Tenniscamp-Anmeldung: ${kindName}`,
      name: parentName,
      email: formData.elternEmail,
      phone: formData.elternTelefon || '—',
      subject: `Tenniscamp-Anmeldung: ${kindName} (${formData.termin})`,
      message,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
      addSubmissionToHistory();
      setLastSubmission(formData);
      setStatus('success');
      setFormData(initialFormData);
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/tenniscamp4.jpg')", backgroundPosition: 'center 38%' }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSub}</p>
        </div>
      </section>

      <section className="kontakt-section">
        <div className="container">
          <AnimatedSection>
            <div className="kontakt-form-container camp-form-container">
              {verfuegbareTermine.length === 0 ? (
                <div className="camp-closed-notice">
                  <AlertCircle size={40} />
                  <h3>{t.closedTitle}</h3>
                  <p>{t.closedText}</p>
                  <ButtonWithIcon href="/tenniscamps">{t.closedCta}</ButtonWithIcon>
                </div>
              ) : status === 'success' ? (
                <div className="form-success">
                  <CheckCircle size={48} />
                  <h3>{t.successTitle}</h3>
                  <p>{t.successText}</p>
                  <div className="notfallbogen-callout">
                    <h4>{t.notfallTitleSuccess}</h4>
                    <p>
                      {t.notfallTextSuccessPre}
                      <a href="mailto:info@bsv92-tennis.de">info@bsv92-tennis.de</a>
                      {t.notfallTextSuccessPost}
                    </p>
                    <button
                      type="button"
                      className="notfallbogen-button"
                      onClick={() => handleDownloadNotfallbogen(lastSubmission || {})}
                    >
                      <Download size={18} />
                      <span>{t.notfallDownload}</span>
                    </button>
                  </div>
                  <ButtonWithIcon onClick={() => { setStatus('idle'); setLastSubmission(null); }}>
                    {t.anotherRegistration}
                  </ButtonWithIcon>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="kontakt-form" noValidate>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="form-section">
                    <h2 className="form-section-title">{t.sectionTermin}</h2>
                    <div className="form-group">
                      <label htmlFor="termin">{t.campWeek}</label>
                      <select
                        id="termin"
                        name="termin"
                        value={formData.termin}
                        onChange={handleChange}
                        className={errors.termin ? 'input-error' : ''}
                      >
                        <option value="">{t.pleaseSelect}</option>
                        {verfuegbareTermine.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label[lang]} · {option.dates[lang]}
                          </option>
                        ))}
                      </select>
                      {errors.termin && <span className="field-error">{errors.termin}</span>}
                    </div>
                  </div>

                  <div className="form-section">
                    <h2 className="form-section-title">{t.sectionKind}</h2>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="kindVorname">{t.vorname}</label>
                        <input
                          type="text"
                          id="kindVorname"
                          name="kindVorname"
                          value={formData.kindVorname}
                          onChange={handleChange}
                          maxLength={80}
                          className={errors.kindVorname ? 'input-error' : ''}
                        />
                        {errors.kindVorname && <span className="field-error">{errors.kindVorname}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="kindNachname">{t.nachname}</label>
                        <input
                          type="text"
                          id="kindNachname"
                          name="kindNachname"
                          value={formData.kindNachname}
                          onChange={handleChange}
                          maxLength={80}
                          className={errors.kindNachname ? 'input-error' : ''}
                        />
                        {errors.kindNachname && <span className="field-error">{errors.kindNachname}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="kindGeschlecht">{t.geschlecht}</label>
                        <select
                          id="kindGeschlecht"
                          name="kindGeschlecht"
                          value={formData.kindGeschlecht}
                          onChange={handleChange}
                          className={errors.kindGeschlecht ? 'input-error' : ''}
                        >
                          <option value="">{t.pleaseSelect}</option>
                          {geschlechtOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label[lang]}</option>
                          ))}
                        </select>
                        {errors.kindGeschlecht && <span className="field-error">{errors.kindGeschlecht}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="kindAlter">{t.alter}</label>
                        <input
                          type="number"
                          id="kindAlter"
                          name="kindAlter"
                          min={4}
                          max={18}
                          value={formData.kindAlter}
                          onChange={handleChange}
                          className={errors.kindAlter ? 'input-error' : ''}
                        />
                        {errors.kindAlter && <span className="field-error">{errors.kindAlter}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>{t.mitgliedFrage}</label>
                      <div className="radio-row">
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="mitglied"
                            value="ja"
                            checked={formData.mitglied === 'ja'}
                            onChange={handleChange}
                          />
                          <span>{t.ja}</span>
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="mitglied"
                            value="nein"
                            checked={formData.mitglied === 'nein'}
                            onChange={handleChange}
                          />
                          <span>{t.nein}</span>
                        </label>
                      </div>
                      {errors.mitglied && <span className="field-error">{errors.mitglied}</span>}
                    </div>

                    {formData.mitglied === 'nein' && (
                      <div className="form-group">
                        <label htmlFor="spielstaerke">{t.spielstaerke}</label>
                        <textarea
                          id="spielstaerke"
                          name="spielstaerke"
                          rows="3"
                          maxLength={1000}
                          value={formData.spielstaerke}
                          onChange={handleChange}
                          placeholder={t.spielstaerkePlaceholder}
                          className={errors.spielstaerke ? 'input-error' : ''}
                        />
                        {errors.spielstaerke && <span className="field-error">{errors.spielstaerke}</span>}
                      </div>
                    )}

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="vegetarisch">{t.vegetarisch}</label>
                        <select
                          id="vegetarisch"
                          name="vegetarisch"
                          value={formData.vegetarisch}
                          onChange={handleChange}
                          className={errors.vegetarisch ? 'input-error' : ''}
                        >
                          <option value="">{t.pleaseSelect}</option>
                          <option value="ja">{t.ja}</option>
                          <option value="nein">{t.nein}</option>
                        </select>
                        {errors.vegetarisch && <span className="field-error">{errors.vegetarisch}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="tshirt">{t.tshirt}</label>
                        <select
                          id="tshirt"
                          name="tshirt"
                          value={formData.tshirt}
                          onChange={handleChange}
                          className={errors.tshirt ? 'input-error' : ''}
                        >
                          <option value="">{t.pleaseSelect}</option>
                          {tshirtSizes.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {errors.tshirt && <span className="field-error">{errors.tshirt}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="bemerkungen">{t.bemerkungen}</label>
                      <textarea
                        id="bemerkungen"
                        name="bemerkungen"
                        rows="3"
                        maxLength={2000}
                        value={formData.bemerkungen}
                        onChange={handleChange}
                        placeholder={t.bemerkungenPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="form-section">
                    <h2 className="form-section-title">{t.sectionEltern}</h2>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="elternVorname">{t.vorname}</label>
                        <input
                          type="text"
                          id="elternVorname"
                          name="elternVorname"
                          value={formData.elternVorname}
                          onChange={handleChange}
                          maxLength={80}
                          className={errors.elternVorname ? 'input-error' : ''}
                        />
                        {errors.elternVorname && <span className="field-error">{errors.elternVorname}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="elternNachname">{t.nachname}</label>
                        <input
                          type="text"
                          id="elternNachname"
                          name="elternNachname"
                          value={formData.elternNachname}
                          onChange={handleChange}
                          maxLength={80}
                          className={errors.elternNachname ? 'input-error' : ''}
                        />
                        {errors.elternNachname && <span className="field-error">{errors.elternNachname}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="elternEmail">{t.email}</label>
                        <input
                          type="email"
                          id="elternEmail"
                          name="elternEmail"
                          value={formData.elternEmail}
                          onChange={handleChange}
                          className={errors.elternEmail ? 'input-error' : ''}
                        />
                        {errors.elternEmail && <span className="field-error">{errors.elternEmail}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="elternTelefon">{t.telefon}</label>
                        <input
                          type="tel"
                          id="elternTelefon"
                          name="elternTelefon"
                          value={formData.elternTelefon}
                          onChange={handleChange}
                          className={errors.elternTelefon ? 'input-error' : ''}
                        />
                        {errors.elternTelefon && <span className="field-error">{errors.elternTelefon}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h2 className="form-section-title">{t.sectionRechnung}</h2>

                    <div className="form-group">
                      <label htmlFor="rechnungStrasse">{t.strasse}</label>
                      <input
                        type="text"
                        id="rechnungStrasse"
                        name="rechnungStrasse"
                        value={formData.rechnungStrasse}
                        onChange={handleChange}
                        maxLength={150}
                        className={errors.rechnungStrasse ? 'input-error' : ''}
                      />
                      {errors.rechnungStrasse && <span className="field-error">{errors.rechnungStrasse}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="rechnungPlz">{t.plz}</label>
                        <input
                          type="text"
                          id="rechnungPlz"
                          name="rechnungPlz"
                          value={formData.rechnungPlz}
                          onChange={handleChange}
                          maxLength={5}
                          inputMode="numeric"
                          className={errors.rechnungPlz ? 'input-error' : ''}
                        />
                        {errors.rechnungPlz && <span className="field-error">{errors.rechnungPlz}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="rechnungOrt">{t.ort}</label>
                        <input
                          type="text"
                          id="rechnungOrt"
                          name="rechnungOrt"
                          value={formData.rechnungOrt}
                          onChange={handleChange}
                          maxLength={100}
                          className={errors.rechnungOrt ? 'input-error' : ''}
                        />
                        {errors.rechnungOrt && <span className="field-error">{errors.rechnungOrt}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h2 className="form-section-title">{t.sectionSepa}</h2>

                    <div className="form-group">
                      <label htmlFor="kontoinhaber">{t.kontoinhaber}</label>
                      <input
                        type="text"
                        id="kontoinhaber"
                        name="kontoinhaber"
                        value={formData.kontoinhaber}
                        onChange={handleChange}
                        maxLength={120}
                        className={errors.kontoinhaber ? 'input-error' : ''}
                      />
                      {errors.kontoinhaber && <span className="field-error">{errors.kontoinhaber}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="iban">{t.iban}</label>
                        <input
                          type="text"
                          id="iban"
                          name="iban"
                          value={formData.iban}
                          onChange={handleChange}
                          onBlur={handleIbanBlur}
                          autoComplete="off"
                          spellCheck={false}
                          placeholder="DE.. .... .... .... .... .."
                          maxLength={40}
                          className={`iban-input ${errors.iban ? 'input-error' : ''}`}
                        />
                        {errors.iban && <span className="field-error">{errors.iban}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="bic">{t.bic}</label>
                        <input
                          type="text"
                          id="bic"
                          name="bic"
                          value={formData.bic}
                          onChange={handleChange}
                          maxLength={11}
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <div className="form-group form-group-checkbox">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="sepa"
                          checked={formData.sepa}
                          onChange={handleChange}
                        />
                        <span>{t.sepaText}</span>
                      </label>
                      {errors.sepa && <span className="field-error">{errors.sepa}</span>}
                    </div>
                  </div>

                  <div className="form-group form-group-checkbox">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="agbCamp"
                        checked={formData.agbCamp}
                        onChange={handleChange}
                      />
                      <span>
                        {t.agbPre}<Link to="/agb-tenniscamp" target="_blank">{t.agbLink}</Link>{t.agbPost}
                      </span>
                    </label>
                    {errors.agbCamp && <span className="field-error">{errors.agbCamp}</span>}
                  </div>

                  <div className="form-group form-group-checkbox">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="privacy"
                        checked={formData.privacy}
                        onChange={handleChange}
                      />
                      <span>
                        {t.privacyPre}<Link to="/datenschutz" target="_blank">{t.privacyLink}</Link>{t.privacyPost}
                      </span>
                    </label>
                    {errors.privacy && <span className="field-error">{errors.privacy}</span>}
                  </div>

                  <div className="notfallbogen-callout notfallbogen-callout-inline">
                    <h4>{t.notfallTitleInline}</h4>
                    <p>
                      {t.notfallTextInlinePre}
                      <a href="mailto:info@bsv92-tennis.de">info@bsv92-tennis.de</a>
                      {t.notfallTextInlinePost}
                    </p>
                    <button
                      type="button"
                      className="notfallbogen-button"
                      onClick={() => handleDownloadNotfallbogen(formData)}
                    >
                      <Download size={18} />
                      <span>{t.notfallDownload}</span>
                    </button>
                  </div>

                  {(status === 'error' || errors.form) && (
                    <div className="form-error">
                      <AlertCircle size={20} />
                      <span>{errors.form || t.genericError}</span>
                    </div>
                  )}

                  <ButtonWithIcon type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? t.sending : t.submit}
                  </ButtonWithIcon>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
