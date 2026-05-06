import { AnimatedSection } from '../hooks/useScrollAnimation';

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
              Wie jedes Jahr veranstalten wir auch im Sommer 2026 ein Tenniscamp.
              Weitere Informationen folgen in Kürze.
            </p>
          </div>
        </div>
      </section>

      <section className="camp-termine-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">Voraussichtliche Termine</h2>
              <p className="section-subtitle">
                Sommerferien Berlin 2026 · halbtägig · Montag bis Freitag
              </p>
            </div>
          </AnimatedSection>

          <div className="camp-termine-grid">
            {campTermine.map((termin, i) => (
              <AnimatedSection key={termin.label} delay={i * 0.1}>
                <div className="camp-termin-card">
                  <span className="camp-termin-label">{termin.label}</span>
                  <span className="camp-termin-dates">{termin.dates}</span>
                  <span className="camp-termin-meta">Mo – Fr · halbtägig</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <p className="camp-termine-note">
              Termine voraussichtlich · Änderungen vorbehalten
            </p>
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
