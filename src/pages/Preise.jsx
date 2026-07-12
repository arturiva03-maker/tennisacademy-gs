import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, CreditCard, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import { useLang } from '../i18n/LanguageContext';

const SIZES = {
  de: [
    { key: 'einzel', label: 'Einzel', long: 'Einzeltraining' },
    { key: '2er', label: '2er Gruppe', long: '2er Gruppe' },
    { key: '3er', label: '3er Gruppe', long: '3er Gruppe' },
    { key: '4er', label: '4er Gruppe', long: '4er Gruppe' },
    { key: '5er', label: '5er Gruppe', long: '5er Gruppe' },
    { key: '6er', label: '6er Gruppe', long: '6er Gruppe' },
  ],
  en: [
    { key: 'einzel', label: 'Private', long: 'Private lesson' },
    { key: '2er', label: 'Group of 2', long: 'Group of 2' },
    { key: '3er', label: 'Group of 3', long: 'Group of 3' },
    { key: '4er', label: 'Group of 4', long: 'Group of 4' },
    { key: '5er', label: 'Group of 5', long: 'Group of 5' },
    { key: '6er', label: 'Group of 6', long: 'Group of 6' },
  ],
};

const TRAINERS = {
  de: [
    { id: 'c-lizenz', name: 'C-Lizenz', sub: 'Trainer', prices: [48, 26, 18, 14, 11.6, 10] },
    { id: 'b-lizenz', name: 'B-Lizenz', sub: 'Trainer', prices: [54, 29, 20, 15.5, 12.8, 11] },
    { id: 'zja', name: 'Zlatan, Jana, Artur', sub: 'B-Lizenz Trainer', prices: [58, 31, 21.33, 16.5, 13.6, 11.67] },
    { id: 'lingner', name: 'Michael Lingner', sub: 'A-Lizenz Trainer', prices: [62, 33, 22.67, 17.5, 14.4, 12.33] },
  ],
  en: [
    { id: 'c-lizenz', name: 'C licence', sub: 'Coach', prices: [48, 26, 18, 14, 11.6, 10] },
    { id: 'b-lizenz', name: 'B licence', sub: 'Coach', prices: [54, 29, 20, 15.5, 12.8, 11] },
    { id: 'zja', name: 'Zlatan, Jana, Artur', sub: 'B-licence coaches', prices: [58, 31, 21.33, 16.5, 13.6, 11.67] },
    { id: 'lingner', name: 'Michael Lingner', sub: 'A-licence coach', prices: [62, 33, 22.67, 17.5, 14.4, 12.33] },
  ],
};

const T = {
  de: {
    heroTitle: 'Preise und Angebote',
    sectionTitle: 'Trainingspreise pro Person / Stunde',
    sectionSub: 'Alle Preise verstehen sich pro Person und Trainingsstunde (60 Minuten).',
    pillsAria: 'Gruppengröße auswählen',
    perPerson: 'pro Person',
    infoText:
      'Alle Preise pro Person und Trainingsstunde (60 Minuten). Im Winter fallen zuzüglich Hallengebühren an.',
    agb: 'Allgemeine Geschäftsbedingungen',
    startTitle: 'So funktioniert dein Einstieg',
    step1Title: 'Training abstimmen',
    step1Text: 'Wir besprechen deinen Trainingsplan und stimmen Termine ab.',
    step2Title: 'Vereinsmitglied werden',
    step2Text:
      'Mit dem Start in das wöchentliche Training ist auch die Mitgliedschaft in unserem Partnerverein verbunden. Diese ist Voraussetzung, um die Vereinsanlagen und Tennisplätze zu nutzen.',
    hinweis:
      'Training ohne Vereinsmitgliedschaft ist nur in seltenen Ausnahmen möglich (z.B. Tenniscamp).',
  },
  en: {
    heroTitle: 'Prices & Programs',
    sectionTitle: 'Training Prices per Person / Hour',
    sectionSub: 'All prices are per person and per training hour (60 minutes).',
    pillsAria: 'Select group size',
    perPerson: 'per person',
    infoText:
      'All prices per person and training hour (60 minutes). In winter, indoor court fees apply additionally.',
    agb: 'Terms & Conditions',
    startTitle: 'How to Get Started',
    step1Title: 'Plan your training',
    step1Text: 'We discuss your training plan and coordinate schedules.',
    step2Title: 'Become a club member',
    step2Text:
      'Starting weekly training also includes membership in our partner club. Membership is required to use the club facilities and tennis courts.',
    hinweis:
      'Training without club membership is only possible in rare exceptions (e.g. tennis camp).',
  },
};

const formatPrice = (n, lang) =>
  Number.isInteger(n)
    ? `${n} €`
    : `${lang === 'de' ? n.toFixed(2).replace('.', ',') : n.toFixed(2)} €`;

export default function Preise() {
  const [activeSize, setActiveSize] = useState(0);
  const { lang } = useLang();
  const t = T[lang];
  const sizes = SIZES[lang];
  const trainers = TRAINERS[lang];

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/neues%20hero.jpeg')" }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>{t.heroTitle}</h1>
        </div>
      </section>

      <section className="preise-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">{t.sectionTitle}</h2>
              <p className="section-subtitle">{t.sectionSub}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="preis-pills" role="tablist" aria-label={t.pillsAria}>
              {sizes.map((size, i) => (
                <button
                  key={size.key}
                  role="tab"
                  aria-selected={activeSize === i}
                  className={`preis-pill ${activeSize === i ? 'is-active' : ''}`}
                  onClick={() => setActiveSize(i)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="preis-cards-grid">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="preis-card">
                  <div className="preis-card-head">
                    <h3 className="preis-card-name">{trainer.name}</h3>
                    <span className="preis-card-sub">{trainer.sub}</span>
                  </div>
                  <div className="preis-card-amount-wrap">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={sizes[activeSize].key}
                        className="preis-card-amount"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {formatPrice(trainer.prices[activeSize], lang)}
                      </motion.div>
                    </AnimatePresence>
                    <span className="preis-card-meta">
                      {t.perPerson} · {sizes[activeSize].long}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="preis-info">
              <p>{t.infoText}</p>
              <p>
                <Link to="/agb" className="agb-link">
                  {t.agb}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="einstieg-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">{t.startTitle}</h2>
            </div>
          </AnimatedSection>

          <div className="einstieg-steps">
            <AnimatedSection delay={0.1}>
              <div className="einstieg-step">
                <div className="step-icon">
                  <Users size={32} />
                </div>
                <div className="step-number">1</div>
                <h3>{t.step1Title}</h3>
                <p>{t.step1Text}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="einstieg-step">
                <div className="step-icon">
                  <CreditCard size={32} />
                </div>
                <div className="step-number">2</div>
                <h3>{t.step2Title}</h3>
                <p>{t.step2Text}</p>
              </div>
            </AnimatedSection>
          </div>

          <div className="einstieg-hinweis">
            <p>{t.hinweis}</p>
          </div>

          <div className="einstieg-cta">
            <p className="einstieg-agb-note">
              <Link to="/agb" className="agb-link">
                {t.agb}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
