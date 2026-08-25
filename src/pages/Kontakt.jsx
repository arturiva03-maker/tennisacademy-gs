import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import ButtonWithIcon from '@/components/ui/button-with-icon';
import WhatsAppQR, { WhatsAppGlyph, WHATSAPP_URL } from '../components/WhatsAppQR';
import { useLang } from '../i18n/LanguageContext';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const RATE_LIMIT_MS = 60000;
const MAX_SUBMISSIONS = 3;

const T = {
  de: {
    heroTitle: 'Kontakt',
    heroSub: 'Wir freuen uns auf deine Nachricht',
    whatsappLabel: 'WhatsApp-Chat mit uns starten',
    directTitle: 'Schreib uns auf WhatsApp',
    directCta: 'Chat öffnen',
    mailLabel: 'E-Mail:',
    formTitle: 'Oder per Formular',
    noticeTitle: 'Aufnahmestopp',
    noticeText: 'Wir nehmen derzeit keine neuen Jugendlichen auf. Anfragen sind weiterhin möglich – wir nehmen dein Kind auf die Warteliste auf und melden uns, sobald ein Platz frei wird.',
    successTitle: 'Nachricht gesendet!',
    successText: 'Vielen Dank für deine Anfrage. Wir melden uns schnellstmöglich bei dir.',
    newMessage: 'Neue Nachricht',
    name: 'Name *',
    email: 'E-Mail *',
    phone: 'Telefon',
    subject: 'Betreff *',
    message: 'Nachricht *',
    privacyPre: 'Ich habe die ',
    privacyLink: 'Datenschutzerklärung',
    privacyPost: ' gelesen und bin mit der Verarbeitung meiner Daten einverstanden. *',
    sending: 'Wird gesendet...',
    send: 'Nachricht senden',
    genericError: 'Es gab einen Fehler. Bitte versuche es erneut.',
    errors: {
      nameMin: 'Name muss mindestens 2 Zeichen haben',
      nameMax: 'Name darf maximal 100 Zeichen haben',
      email: 'Bitte gib eine gültige E-Mail-Adresse ein',
      phone: 'Bitte gib eine gültige Telefonnummer ein',
      subjectMin: 'Betreff muss mindestens 3 Zeichen haben',
      subjectMax: 'Betreff darf maximal 200 Zeichen haben',
      messageMin: 'Nachricht muss mindestens 10 Zeichen haben',
      messageMax: 'Nachricht darf maximal 5000 Zeichen haben',
      privacy: 'Bitte akzeptiere die Datenschutzerklärung',
      rateLimit: 'Zu viele Anfragen. Bitte warte einen Moment.',
    },
  },
  en: {
    heroTitle: 'Contact',
    heroSub: 'We look forward to your message',
    whatsappLabel: 'Start a WhatsApp chat with us',
    directTitle: 'Message us on WhatsApp',
    directCta: 'Open chat',
    mailLabel: 'Email:',
    formTitle: 'Or use the form',
    noticeTitle: 'Intake closed',
    noticeText: 'We are currently not accepting new junior players. You are still welcome to get in touch – we will add your child to the waiting list and contact you as soon as a place becomes available.',
    successTitle: 'Message sent!',
    successText: 'Thank you for your enquiry. We will get back to you as soon as possible.',
    newMessage: 'New message',
    name: 'Name *',
    email: 'Email *',
    phone: 'Phone',
    subject: 'Subject *',
    message: 'Message *',
    privacyPre: 'I have read the ',
    privacyLink: 'privacy policy',
    privacyPost: ' and consent to the processing of my data. *',
    sending: 'Sending...',
    send: 'Send message',
    genericError: 'Something went wrong. Please try again.',
    errors: {
      nameMin: 'Name must be at least 2 characters',
      nameMax: 'Name must not exceed 100 characters',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
      subjectMin: 'Subject must be at least 3 characters',
      subjectMax: 'Subject must not exceed 200 characters',
      messageMin: 'Message must be at least 10 characters',
      messageMax: 'Message must not exceed 5000 characters',
      privacy: 'Please accept the privacy policy',
      rateLimit: 'Too many requests. Please wait a moment.',
    },
  },
};

const validateForm = (data, msg) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = msg.nameMin;
  } else if (data.name.length > 100) {
    errors.name = msg.nameMax;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = msg.email;
  }

  if (data.phone && !/^[\d\s\-+()]*$/.test(data.phone)) {
    errors.phone = msg.phone;
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = msg.subjectMin;
  } else if (data.subject.length > 200) {
    errors.subject = msg.subjectMax;
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = msg.messageMin;
  } else if (data.message.length > 5000) {
    errors.message = msg.messageMax;
  }

  if (!data.privacy) {
    errors.privacy = msg.privacy;
  }

  return errors;
};

const getSubmissionHistory = () => {
  try {
    const history = localStorage.getItem('contactFormSubmissions');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

const addSubmissionToHistory = () => {
  const history = getSubmissionHistory();
  const now = Date.now();
  history.push(now);
  const filtered = history.filter(time => now - time < RATE_LIMIT_MS);
  localStorage.setItem('contactFormSubmissions', JSON.stringify(filtered));
};

const isRateLimited = () => {
  const history = getSubmissionHistory();
  const now = Date.now();
  const recentSubmissions = history.filter(time => now - time < RATE_LIMIT_MS);
  return recentSubmissions.length >= MAX_SUBMISSIONS;
};

export default function Kontakt() {
  const formRef = useRef();
  const { lang } = useLang();
  const t = T[lang];
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false,
    website: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.website) {
      setStatus('success');
      return;
    }

    if (isRateLimited()) {
      setErrors({
        form: t.errors.rateLimit
      });
      return;
    }

    const validationErrors = validateForm(formData, t.errors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    setErrors({});

    try {
      // Versand über das Form-Element: Feldinhalte sind Nutzereingaben,
      // der Betreff-Prefix ("Kontaktanfrage") bleibt unabhängig von der
      // UI-Sprache immer deutsch (verstecktes title-Feld unten).
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      addSubmissionToHistory();
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false,
        website: ''
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/neues%20hero.jpeg')" }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSub}</p>
        </div>
      </section>

      <section className="kontakt-section">
        <div className="container">
          <div className="kontakt-grid">
            <AnimatedSection>
              <div className="kontakt-info">
                <div className="kontakt-hinweis">
                  <strong>{t.noticeTitle}</strong>
                  <p>{t.noticeText}</p>
                </div>

                {/* Der Direktweg steht vor dem Formular und traegt als einziger
                    Block der Seite die dunkle Flaeche: die Rangfolge entsteht
                    ueber Kontrast und Position, nicht ueber Groesse oder Grellheit. */}
                <div className="kontakt-direkt-frame gold-frame">
                  <div className="kontakt-direkt">
                    <div className="kontakt-direkt-main">
                      <div className="kontakt-direkt-text">
                        <h2 className="kontakt-direkt-title">{t.directTitle}</h2>
                        <a
                          className="kontakt-wa-cta"
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WhatsAppGlyph size={20} />
                          {t.directCta}
                        </a>
                      </div>

                      {/* Ohne Bildunterschrift: ein Code mit WhatsApp-Logo in der
                          Mitte erklaert sich selbst, die Beschriftung traegt das
                          aria-label. Am Handy faellt der Code ganz weg. */}
                      <a
                        className="kontakt-direkt-code"
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t.whatsappLabel}
                      >
                        <WhatsAppQR size={116} />
                      </a>
                    </div>

                    <p className="kontakt-direkt-mail">{t.mailLabel} info@tennisacademy-gs.de</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="kontakt-form-container">
              {status === 'success' ? (
                <div className="form-success">
                  <CheckCircle size={48} />
                  <h3>{t.successTitle}</h3>
                  <p>{t.successText}</p>
                  <ButtonWithIcon onClick={() => setStatus('idle')}>
                    {t.newMessage}
                  </ButtonWithIcon>
                </div>
              ) : (
                <>
                {/* Benennt den zweiten Weg, damit die Rangfolge lesbar wird
                    und nicht nur gefuehlt ist. Eine Zeile reicht dafuer. */}
                <h2 className="kontakt-form-head">{t.formTitle}</h2>

                <form ref={formRef} onSubmit={handleSubmit} className="kontakt-form" noValidate>
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
                  <input
                    type="hidden"
                    name="title"
                    value={formData.subject ? `Kontaktanfrage: ${formData.subject}` : 'Kontaktanfrage'}
                    readOnly
                  />

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">{t.name}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={100}
                        className={errors.name ? 'input-error' : ''}
                      />
                      {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">{t.email}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                      />
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">{t.phone}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'input-error' : ''}
                      />
                      {errors.phone && <span className="field-error">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">{t.subject}</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        maxLength={200}
                        className={errors.subject ? 'input-error' : ''}
                      />
                      {errors.subject && <span className="field-error">{errors.subject}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">{t.message}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      maxLength={5000}
                      className={errors.message ? 'input-error' : ''}
                    />
                    {errors.message && <span className="field-error">{errors.message}</span>}
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

                  {(status === 'error' || errors.form) && (
                    <div className="form-error">
                      <AlertCircle size={20} />
                      <span>{errors.form || t.genericError}</span>
                    </div>
                  )}

                  <ButtonWithIcon
                    type="submit"
                    variant="outline"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? t.sending : t.send}
                  </ButtonWithIcon>
                </form>
                </>
              )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
