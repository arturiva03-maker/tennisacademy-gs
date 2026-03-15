import { AnimatedSection } from '../hooks/useScrollAnimation';

const campImages = [
  { src: '/tenniscamp.jpg', alt: 'Tenniscamp Gruppenfoto' },
  { src: '/tenniscamp2.jpg', alt: 'Tenniscamp in der Halle' },
  { src: '/tenniscamp3.jpg', alt: 'Tenniscamp Siegerehrung' },
  { src: '/tenniscamp4.jpg', alt: 'Tenniscamp Training' },
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
              Informationen dazu folgen in Kürze.
            </p>
          </div>
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
                  <img src={img.src} alt={img.alt} />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
