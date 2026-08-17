// Die Seite ist ein reiner Rueckblick: Termine, Gebuehren und Anmeldung sind
// raus, geblieben sind Hero und Impressionen.
import { AnimatedSection } from '../hooks/useScrollAnimation';
import { useLang } from '../i18n/LanguageContext';

const campImages = [
  { src: '/tenniscamp.jpg', alt: 'Tenniscamp Gruppenfoto' },
  { src: '/tenniscamp2.jpg', alt: 'Tenniscamp in der Halle' },
  { src: '/tenniscamp3.jpg', alt: 'Tenniscamp Siegerehrung' },
  { src: '/tenniscamp4.jpg', alt: 'Tenniscamp Training' },
];

const T = {
  de: {
    heroTitle: 'Tenniscamps',
    heroSub:
      'Ein Rückblick auf unsere Tenniscamps auf der Anlage des BSV 92 in Berlin.',
    impressionsTitle: 'Impressionen',
    impressionsSub: 'Eindrücke aus unseren vergangenen Tenniscamps',
  },
  en: {
    heroTitle: 'Tennis Camps',
    heroSub:
      'A look back at our tennis camps at the BSV 92 grounds in Berlin.',
    impressionsTitle: 'Impressions',
    impressionsSub: 'Snapshots from our past tennis camps',
  },
};

export default function Tenniscamps() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <>
      <section
        className="page-hero page-hero--vivid"
        style={{ backgroundImage: "url('/tenniscamp.jpg')", backgroundPosition: 'center' }}
      >
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSub}</p>
        </div>
      </section>

      <section className="camp-gallery-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">{t.impressionsTitle}</h2>
              <p className="section-subtitle">{t.impressionsSub}</p>
            </div>
          </AnimatedSection>
          <div className="camp-gallery">
            {campImages.map((img, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="gold-frame">
                  <div className="camp-gallery-item">
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
