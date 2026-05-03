import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, CreditCard, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedSection } from '../hooks/useScrollAnimation';

const SIZES = [
  { key: 'einzel', label: 'Einzel', long: 'Einzeltraining' },
  { key: '2er', label: '2er Gruppe', long: '2er Gruppe' },
  { key: '3er', label: '3er Gruppe', long: '3er Gruppe' },
  { key: '4er', label: '4er Gruppe', long: '4er Gruppe' },
  { key: '5er', label: '5er Gruppe', long: '5er Gruppe' },
  { key: '6er', label: '6er Gruppe', long: '6er Gruppe' },
];

const TRAINERS = [
  {
    id: 'c-lizenz',
    name: 'C-Lizenz',
    sub: 'Trainer',
    prices: [48, 26, 18, 14, 11.6, 10],
  },
  {
    id: 'b-lizenz',
    name: 'B-Lizenz',
    sub: 'Trainer',
    prices: [56, 30, 20.67, 16, 13.2, 11.33],
  },
  {
    id: 'zja',
    name: 'Zlatan, Jana, Artur',
    sub: 'B-Lizenz Trainer',
    prices: [58, 31, 21.33, 16.5, 13.6, 11.67],
  },
  {
    id: 'lingner',
    name: 'Michael Lingner',
    sub: 'A-Lizenz Trainer',
    prices: [62, 33, 22.67, 17.5, 14.4, 12.33],
  },
];

const formatPrice = (n) =>
  Number.isInteger(n)
    ? `${n} €`
    : `${n.toFixed(2).replace('.', ',')} €`;

export default function Preise() {
  const [activeSize, setActiveSize] = useState(0);

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/neues%20hero.jpeg')" }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>Preise und Angebote</h1>
          <p>Transparente Preisgestaltung für Ihr Tennistraining</p>
        </div>
      </section>

      <section className="preise-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">Trainingspreise pro Person / Stunde</h2>
              <p className="section-subtitle">
                Alle Preise verstehen sich pro Person und Trainingsstunde (60 Minuten).
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="preis-pills" role="tablist" aria-label="Gruppengröße auswählen">
              {SIZES.map((size, i) => (
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
              {TRAINERS.map((trainer) => (
                <div key={trainer.id} className="preis-card">
                  <div className="preis-card-head">
                    <h3 className="preis-card-name">{trainer.name}</h3>
                    <span className="preis-card-sub">{trainer.sub}</span>
                  </div>
                  <div className="preis-card-amount-wrap">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={SIZES[activeSize].key}
                        className="preis-card-amount"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {formatPrice(trainer.prices[activeSize])}
                      </motion.div>
                    </AnimatePresence>
                    <span className="preis-card-meta">
                      pro Person · {SIZES[activeSize].long}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="preis-info">
              <p>
                Alle Preise pro Person und Trainingsstunde (60 Minuten). Im Winter
                fallen zuzüglich Hallengebühren an.
              </p>
              <p>
                <Link to="/agb" className="agb-link">
                  Allgemeine Geschäftsbedingungen
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
              <h2 className="section-title">So funktioniert dein Einstieg</h2>
            </div>
          </AnimatedSection>

          <div className="einstieg-steps">
            <AnimatedSection delay={0.1}>
              <div className="einstieg-step">
                <div className="step-icon">
                  <Users size={32} />
                </div>
                <div className="step-number">1</div>
                <h3>Training abstimmen</h3>
                <p>
                  Wir besprechen deinen Trainingsplan und stimmen Termine ab.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="einstieg-step">
                <div className="step-icon">
                  <CreditCard size={32} />
                </div>
                <div className="step-number">2</div>
                <h3>Vereinsmitglied werden</h3>
                <p>
                  Mit dem Start in das wöchentliche Training ist auch die Mitgliedschaft
                  in unserem Partnerverein verbunden. Diese ist Voraussetzung, um die
                  Vereinsanlagen und Tennisplätze zu nutzen.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="einstieg-hinweis">
            <p>
              Training ohne Vereinsmitgliedschaft ist nur in seltenen Ausnahmen möglich
              (z.B. Tenniscamp).
            </p>
          </div>

          <div className="einstieg-cta">
            <p className="einstieg-agb-note">
              <Link to="/agb" className="agb-link">
                Allgemeine Geschäftsbedingungen
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
