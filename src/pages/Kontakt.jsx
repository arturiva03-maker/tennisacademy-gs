import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const EMAILJS_SERVICE_ID = 'service_091i5hs';
const EMAILJS_TEMPLATE_ID = 'template_hnp1hzu';
const EMAILJS_PUBLIC_KEY = 'WSL2MqkbUAhk_MLK8';

export default function Kontakt() {
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Kontakt</h1>
          <p>Wir freuen uns auf Ihre Nachricht</p>
        </div>
      </section>

      <section className="kontakt-section">
        <div className="container">
          <div className="kontakt-grid">
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
                <form ref={formRef} onSubmit={handleSubmit} className="kontakt-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-Mail *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
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
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Betreff *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Nachricht *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="form-error">
                      <AlertCircle size={20} />
                      <span>Es gab einen Fehler. Bitte versuchen Sie es erneut.</span>
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
          </div>
        </div>
      </section>
    </>
  );
}
