import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import ButtonWithIcon from '@/components/ui/button-with-icon';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CAMP ||
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const RATE_LIMIT_MS = 60000;
const MAX_SUBMISSIONS = 3;

const campTermine = [
  { value: '1. Ferienwoche (13.07. – 17.07.2026)', label: '1. Ferienwoche · 13.07. – 17.07.2026' },
  { value: 'Vorletzte Ferienwoche (10.08. – 14.08.2026)', label: 'Vorletzte Ferienwoche · 10.08. – 14.08.2026' },
  { value: 'Letzte Ferienwoche (17.08. – 21.08.2026)', label: 'Letzte Ferienwoche · 17.08. – 21.08.2026' },
];

const tshirtSizes = ['122/128', '134/140', '146/152', '158/164', 'S', 'M', 'L', 'XL'];

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

const validateForm = (data) => {
  const errors = {};

  if (!data.termin) errors.termin = 'Bitte wähle einen Termin';

  if (!data.kindVorname || data.kindVorname.trim().length < 2) {
    errors.kindVorname = 'Vorname des Kindes erforderlich';
  }
  if (!data.kindNachname || data.kindNachname.trim().length < 2) {
    errors.kindNachname = 'Nachname des Kindes erforderlich';
  }
  if (!data.kindGeschlecht) errors.kindGeschlecht = 'Bitte Geschlecht wählen';
  const alter = Number(data.kindAlter);
  if (!data.kindAlter || Number.isNaN(alter) || alter < 4 || alter > 18) {
    errors.kindAlter = 'Bitte gültiges Alter (4 – 18) angeben';
  }
  if (!data.mitglied) errors.mitglied = 'Bitte Mitgliedschaft angeben';
  if (data.mitglied === 'nein' && (!data.spielstaerke || data.spielstaerke.trim().length < 5)) {
    errors.spielstaerke = 'Bitte kurz Spielstärke / Tennis-Erfahrung beschreiben';
  }
  if (!data.vegetarisch) errors.vegetarisch = 'Bitte angeben';
  if (!data.tshirt) errors.tshirt = 'Bitte T-Shirt-Größe wählen';

  if (!data.elternVorname || data.elternVorname.trim().length < 2) {
    errors.elternVorname = 'Vorname des/der Erziehungsberechtigten erforderlich';
  }
  if (!data.elternNachname || data.elternNachname.trim().length < 2) {
    errors.elternNachname = 'Nachname des/der Erziehungsberechtigten erforderlich';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.elternEmail || !emailRegex.test(data.elternEmail)) {
    errors.elternEmail = 'Bitte gültige E-Mail-Adresse angeben';
  }
  if (data.elternTelefon && !/^[\d\s\-+()]*$/.test(data.elternTelefon)) {
    errors.elternTelefon = 'Bitte gültige Telefonnummer angeben';
  }

  if (!data.rechnungStrasse || data.rechnungStrasse.trim().length < 3) {
    errors.rechnungStrasse = 'Straße und Hausnummer erforderlich';
  }
  if (!data.rechnungPlz || !/^\d{4,5}$/.test(data.rechnungPlz.trim())) {
    errors.rechnungPlz = 'Gültige PLZ angeben';
  }
  if (!data.rechnungOrt || data.rechnungOrt.trim().length < 2) {
    errors.rechnungOrt = 'Ort erforderlich';
  }

  if (!data.kontoinhaber || data.kontoinhaber.trim().length < 2) {
    errors.kontoinhaber = 'Kontoinhaber:in erforderlich';
  }
  if (!data.iban || !isValidIban(data.iban)) {
    errors.iban = 'Bitte gültige IBAN angeben';
  }

  if (!data.sepa) errors.sepa = 'Bitte SEPA-Einzugsermächtigung bestätigen';
  if (!data.privacy) errors.privacy = 'Bitte Datenschutzerklärung akzeptieren';

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
  website: '',
};

export default function TenniscampAnmeldung() {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);

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
      setErrors({ form: 'Zu viele Anfragen. Bitte warte einen Moment.' });
      return;
    }

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    setErrors({});

    const parentName = `${formData.elternVorname} ${formData.elternNachname}`.trim();
    const message = [
      `=== TENNISCAMP-ANMELDUNG ===`,
      ``,
      `Wunschtermin: ${formData.termin}`,
      ``,
      `--- Kind ---`,
      `Name: ${formData.kindVorname} ${formData.kindNachname}`,
      `Geschlecht: ${formData.kindGeschlecht}`,
      `Alter: ${formData.kindAlter}`,
      `Mitglied BSV 92: ${formData.mitglied}`,
      formData.mitglied === 'nein'
        ? `Spielstärke / Erfahrung: ${formData.spielstaerke}`
        : null,
      `Vegetarisch: ${formData.vegetarisch}`,
      `T-Shirt-Größe: ${formData.tshirt}`,
      formData.bemerkungen ? `Bemerkungen: ${formData.bemerkungen}` : null,
      ``,
      `--- Erziehungsberechtigte:r / Zahlungspflichtige:r ---`,
      `Name: ${parentName}`,
      `E-Mail: ${formData.elternEmail}`,
      formData.elternTelefon ? `Telefon: ${formData.elternTelefon}` : null,
      ``,
      `--- Rechnungsadresse ---`,
      `${formData.rechnungStrasse}`,
      `${formData.rechnungPlz} ${formData.rechnungOrt}`,
      ``,
      `--- SEPA-Lastschriftmandat ---`,
      `Kontoinhaber:in: ${formData.kontoinhaber}`,
      `IBAN: ${formData.iban}`,
      formData.bic ? `BIC: ${formData.bic}` : null,
      `SEPA-Einzugsermächtigung erteilt: ${formData.sepa ? 'JA' : 'NEIN'}`,
      `Datenschutzerklärung akzeptiert: ${formData.privacy ? 'JA' : 'NEIN'}`,
    ]
      .filter(Boolean)
      .join('\n');

    const templateParams = {
      name: parentName,
      email: formData.elternEmail,
      phone: formData.elternTelefon || '—',
      subject: `Tenniscamp-Anmeldung: ${formData.kindVorname} ${formData.kindNachname} (${formData.termin})`,
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
      setStatus('success');
      setFormData(initialFormData);
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/neues%20hero.jpeg')" }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>Tenniscamp-Anmeldung</h1>
          <p>Verbindliche Anmeldung für unsere Sommer-Tenniscamps 2026</p>
        </div>
      </section>

      <section className="kontakt-section">
        <div className="container">
          <AnimatedSection>
            <div className="kontakt-form-container camp-form-container">
              {status === 'success' ? (
                <div className="form-success">
                  <CheckCircle size={48} />
                  <h3>Anmeldung gesendet!</h3>
                  <p>
                    Vielen Dank für die Anmeldung. Wir bestätigen sie per E-Mail
                    und melden uns mit allen weiteren Infos.
                  </p>
                  <ButtonWithIcon onClick={() => setStatus('idle')}>
                    Weitere Anmeldung
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
                    <h2 className="form-section-title">Wunschtermin</h2>
                    <div className="form-group">
                      <label htmlFor="termin">Camp-Woche *</label>
                      <select
                        id="termin"
                        name="termin"
                        value={formData.termin}
                        onChange={handleChange}
                        className={errors.termin ? 'input-error' : ''}
                      >
                        <option value="">Bitte wählen…</option>
                        {campTermine.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                      {errors.termin && <span className="field-error">{errors.termin}</span>}
                    </div>
                  </div>

                  <div className="form-section">
                    <h2 className="form-section-title">Angaben zum Kind</h2>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="kindVorname">Vorname *</label>
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
                        <label htmlFor="kindNachname">Nachname *</label>
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
                        <label htmlFor="kindGeschlecht">Geschlecht *</label>
                        <select
                          id="kindGeschlecht"
                          name="kindGeschlecht"
                          value={formData.kindGeschlecht}
                          onChange={handleChange}
                          className={errors.kindGeschlecht ? 'input-error' : ''}
                        >
                          <option value="">Bitte wählen…</option>
                          <option value="weiblich">weiblich</option>
                          <option value="männlich">männlich</option>
                          <option value="divers">divers</option>
                          <option value="keine Angabe">keine Angabe</option>
                        </select>
                        {errors.kindGeschlecht && <span className="field-error">{errors.kindGeschlecht}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="kindAlter">Alter *</label>
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
                      <label>Mitglied im BSV 92? *</label>
                      <div className="radio-row">
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="mitglied"
                            value="ja"
                            checked={formData.mitglied === 'ja'}
                            onChange={handleChange}
                          />
                          <span>Ja</span>
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="mitglied"
                            value="nein"
                            checked={formData.mitglied === 'nein'}
                            onChange={handleChange}
                          />
                          <span>Nein</span>
                        </label>
                      </div>
                      {errors.mitglied && <span className="field-error">{errors.mitglied}</span>}
                    </div>

                    {formData.mitglied === 'nein' && (
                      <div className="form-group">
                        <label htmlFor="spielstaerke">Spielstärke / Tennis-Erfahrung *</label>
                        <textarea
                          id="spielstaerke"
                          name="spielstaerke"
                          rows="3"
                          maxLength={1000}
                          value={formData.spielstaerke}
                          onChange={handleChange}
                          placeholder="z. B. Anfänger:in, 1 Jahr Vereinstraining, LK 23 …"
                          className={errors.spielstaerke ? 'input-error' : ''}
                        />
                        {errors.spielstaerke && <span className="field-error">{errors.spielstaerke}</span>}
                      </div>
                    )}

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="vegetarisch">Vegetarisches Mittagessen? *</label>
                        <select
                          id="vegetarisch"
                          name="vegetarisch"
                          value={formData.vegetarisch}
                          onChange={handleChange}
                          className={errors.vegetarisch ? 'input-error' : ''}
                        >
                          <option value="">Bitte wählen…</option>
                          <option value="ja">Ja</option>
                          <option value="nein">Nein</option>
                        </select>
                        {errors.vegetarisch && <span className="field-error">{errors.vegetarisch}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="tshirt">T-Shirt-Größe *</label>
                        <select
                          id="tshirt"
                          name="tshirt"
                          value={formData.tshirt}
                          onChange={handleChange}
                          className={errors.tshirt ? 'input-error' : ''}
                        >
                          <option value="">Bitte wählen…</option>
                          {tshirtSizes.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {errors.tshirt && <span className="field-error">{errors.tshirt}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="bemerkungen">Weitere Bemerkungen</label>
                      <textarea
                        id="bemerkungen"
                        name="bemerkungen"
                        rows="3"
                        maxLength={2000}
                        value={formData.bemerkungen}
                        onChange={handleChange}
                        placeholder="Allergien, Medikamente, sonstige Hinweise …"
                      />
                    </div>
                  </div>

                  <div className="form-section">
                    <h2 className="form-section-title">Erziehungsberechtigte:r / Zahlungspflichtige:r</h2>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="elternVorname">Vorname *</label>
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
                        <label htmlFor="elternNachname">Nachname *</label>
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
                        <label htmlFor="elternEmail">E-Mail *</label>
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
                        <label htmlFor="elternTelefon">Telefon</label>
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
                    <h2 className="form-section-title">Rechnungsadresse</h2>

                    <div className="form-group">
                      <label htmlFor="rechnungStrasse">Straße und Hausnummer *</label>
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
                        <label htmlFor="rechnungPlz">PLZ *</label>
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
                        <label htmlFor="rechnungOrt">Ort *</label>
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
                    <h2 className="form-section-title">SEPA-Lastschriftmandat</h2>

                    <div className="form-group">
                      <label htmlFor="kontoinhaber">Kontoinhaber:in *</label>
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
                        <label htmlFor="iban">IBAN *</label>
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
                        <label htmlFor="bic">BIC (optional)</label>
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
                        <span>
                          Ich ermächtige die TENNIS ACADEMY GRAND SLAM, die Camp-Gebühr
                          mittels SEPA-Lastschrift vom oben genannten Konto einzuziehen.
                          Zugleich weise ich mein Kreditinstitut an, diese Lastschriften
                          einzulösen. Hinweis: Innerhalb von acht Wochen, beginnend mit
                          dem Belastungsdatum, kann die Erstattung des belasteten
                          Betrags verlangt werden. Es gelten die mit dem Kreditinstitut
                          vereinbarten Bedingungen. *
                        </span>
                      </label>
                      {errors.sepa && <span className="field-error">{errors.sepa}</span>}
                    </div>
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
                        Ich habe die <Link to="/datenschutz" target="_blank">Datenschutzerklärung</Link> gelesen
                        und bin mit der Verarbeitung meiner Daten zum Zweck der
                        Camp-Anmeldung und -Abrechnung einverstanden. *
                      </span>
                    </label>
                    {errors.privacy && <span className="field-error">{errors.privacy}</span>}
                  </div>

                  {(status === 'error' || errors.form) && (
                    <div className="form-error">
                      <AlertCircle size={20} />
                      <span>{errors.form || 'Es gab einen Fehler. Bitte versuche es erneut.'}</span>
                    </div>
                  )}

                  <ButtonWithIcon type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Wird gesendet…' : 'Verbindlich anmelden'}
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
