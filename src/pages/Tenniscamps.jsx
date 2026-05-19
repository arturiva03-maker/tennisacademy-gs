import { AnimatedSection } from '../hooks/useScrollAnimation';
import ButtonWithIcon from '@/components/ui/button-with-icon';

const campImages = [
  { src: '/tenniscamp.jpg', alt: 'Tenniscamp Gruppenfoto' },
  { src: '/tenniscamp2.jpg', alt: 'Tenniscamp in der Halle' },
  { src: '/tenniscamp3.jpg', alt: 'Tenniscamp Siegerehrung' },
  { src: '/tenniscamp4.jpg', alt: 'Tenniscamp Training' },
];

const campTermine = [
  { label: '1. Ferienwoche', dates: '13.07. – 17.07.2026' },
  { label: 'Vorletzte Ferienwoche', dates: '10.08. – 14.08.2026' },
  { label: 'Letzte Ferienwoche', dates: '17.08. – 21.08.2026' },
];

const campPreise = [
  { label: 'Mitglieder', price: '290 €', note: 'pro Woche · BSV 92' },
  { label: 'Nicht-Mitglieder', price: '250 €', note: 'pro Woche' },
];

export default function Tenniscamps() {
  return (
    <>
      <section className="hero hero-tenniscamp">
        <div className="hero-content">
          <div className="hero-text" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div className="hero-badge-large">
              Sommer 2026
            </div>
            <h1 className="hero-title-large">
              Tenniscamps
            </h1>
            <p className="hero-subtitle">
              Das Tenniscamp findet auf der Anlage des BSV 92,
              Fritz-Wildung-Str. 23, 14199 Berlin statt. Montag bis Freitag,
              jeweils von 9:30 bis 15:00 Uhr.
            </p>
          </div>
        </div>
      </section>

      <section className="camp-termine-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">Termine</h2>
              <p className="section-subtitle">
                Sommerferien Berlin 2026 · Mo – Fr · 9:30 – 15:00 Uhr
              </p>
            </div>
          </AnimatedSection>

          <div className="camp-termine-grid">
            {campTermine.map((termin, i) => (
              <AnimatedSection key={termin.label} delay={i * 0.1}>
                <div className="camp-termin-card">
                  <span className="camp-termin-label">{termin.label}</span>
                  <span className="camp-termin-dates">{termin.dates}</span>
                  <span className="camp-termin-meta">Mo – Fr · 9:30 – 15:00 Uhr</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="camp-preise-block">
              <h3 className="camp-preise-title">Teilnahmegebühr</h3>
              <div className="camp-preise-grid">
                {campPreise.map((p) => (
                  <div key={p.label} className="camp-preis-card">
                    <span className="camp-preis-label">{p.label}</span>
                    <span className="camp-preis-amount">{p.price}</span>
                    <span className="camp-preis-note">{p.note}</span>
                  </div>
                ))}
              </div>
              <p className="camp-preise-info">
                Inkl. Training, Mittagessen und Getränke. Zahlung per
                SEPA-Lastschrift nach Anmeldebestätigung.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="camp-anmeldung-hinweis">
              <span className="camp-anmeldung-badge">Anmeldung geöffnet</span>
              <p className="camp-anmeldung-text">
                Jetzt online verbindlich für eine Camp-Woche anmelden.
              </p>
              <div className="camp-anmeldung-cta">
                <ButtonWithIcon href="/tenniscamp-anmeldung">
                  Zur Camp-Anmeldung
                </ButtonWithIcon>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="camp-gallery-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">Impressionen</h2>
              <p className="section-subtitle">
                Eindrücke aus unseren vergangenen Tenniscamps
              </p>
            </div>
          </AnimatedSection>
          <div className="camp-gallery">
            {campImages.map((img, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="camp-gallery-item">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
