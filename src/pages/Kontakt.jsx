import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { AnimatedSection } from '../hooks/useScrollAnimation';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const RATE_LIMIT_MS = 60000;
const MAX_SUBMISSIONS = 3;

const validateForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name muss mindestens 2 Zeichen haben';
  } else if (data.name.length > 100) {
    errors.name = 'Name darf maximal 100 Zeichen haben';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
  }

  if (data.phone && !/^[\d\s\-+()]*$/.test(data.phone)) {
    errors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Betreff muss mindestens 3 Zeichen haben';
  } else if (data.subject.length > 200) {
    errors.subject = 'Betreff darf maximal 200 Zeichen haben';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Nachricht muss mindestens 10 Zeichen haben';
  } else if (data.message.length > 5000) {
    errors.message = 'Nachricht darf maximal 5000 Zeichen haben';
  }

  if (!data.privacy) {
    errors.privacy = 'Bitte akzeptieren Sie die Datenschutzerklärung';
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
        form: 'Zu viele Anfragen. Bitte warten Sie einen Moment.'
      });
      return;
    }

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    setErrors({});

    try {
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
      <section className="page-hero" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>Kontakt</h1>
          <p>Wir freuen uns auf Ihre Nachricht</p>
        </div>
      </section>

      <section className="kontakt-section">
        <div className="container">
          <div className="kontakt-grid">
            <AnimatedSection>
              <div className="kontakt-info">
                <h2>So erreichen Sie uns</h2>
              <p>
                Haben Sie Fragen zu unserem Trainingsangebot oder möchten Sie
                ein Probetraining vereinbaren? Schreiben Sie uns!
              </p>

              <div className="kontakt-details">
                <div className="kontakt-item">
                  <strong>Tennis Academy Grand Slam</strong>
                </div>
                <div className="kontakt-item">
                  <span>E-Mail: info@tennisacademy-gs.de</span>
                </div>
              </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="kontakt-form-container">
              {status === 'success' ? (
                <div className="form-success">
                  <CheckCircle size={48} />
                  <h3>Nachricht gesendet!</h3>
                  <p>Vielen Dank für Ihre Anfrage. Wir melden uns schnellstmöglich bei Ihnen.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setStatus('idle')}
                  >
                    Neue Nachricht
                  </button>
                </div>
              ) : (
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

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
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
                      <label htmlFor="email">E-Mail *</label>
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
                      <label htmlFor="phone">Telefon</label>
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
                      <label htmlFor="subject">Betreff *</label>
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
                    <label htmlFor="message">Nachricht *</label>
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
                        Ich habe die <Link to="/datenschutz" target="_blank">Datenschutzerklärung</Link> gelesen
                        und bin mit der Verarbeitung meiner Daten einverstanden. *
                      </span>
                    </label>
                    {errors.privacy && <span className="field-error">{errors.privacy}</span>}
                  </div>

                  {(status === 'error' || errors.form) && (
                    <div className="form-error">
                      <AlertCircle size={20} />
                      <span>{errors.form || 'Es gab einen Fehler. Bitte versuchen Sie es erneut.'}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary btn-submit"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      'Wird gesendet...'
                    ) : (
                      <>
                        <Send size={18} />
                        Nachricht senden
                      </>
                    )}
                  </button>
                </form>
              )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
