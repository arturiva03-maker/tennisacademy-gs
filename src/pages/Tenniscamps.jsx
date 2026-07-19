import { AnimatedSection } from '../hooks/useScrollAnimation';
import ButtonWithIcon from '@/components/ui/button-with-icon';
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
      'Das Tenniscamp findet auf der Anlage des BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin statt. Montag bis Freitag, jeweils von 9:30 bis 15:00 Uhr.',
    termineTitle: 'Termine',
    termineSub: 'Sommerferien Berlin 2026 · Mo – Fr · 9:30 – 15:00 Uhr',
    termine: [
      { label: '1. Ferienwoche', dates: '13.07. – 17.07.2026' },
      { label: 'Vorletzte Ferienwoche', dates: '10.08. – 14.08.2026' },
      { label: 'Letzte Ferienwoche', dates: '17.08. – 21.08.2026' },
    ],
    terminMeta: 'Mo – Fr · 9:30 – 15:00 Uhr',
    feeTitle: 'Teilnahmegebühr',
    preise: [
      { label: 'Mitglieder', price: '290 €' },
      { label: 'Nicht-Mitglieder', price: '350 €' },
    ],
    feeInfo: 'Inkl. Training, Mittagessen und Getränke.',
    regBadge: 'Anmeldung geöffnet',
    regText: 'Jetzt online verbindlich für eine Camp-Woche anmelden.',
    regCta: 'Zur Camp-Anmeldung',
    impressionsTitle: 'Impressionen',
    impressionsSub: 'Eindrücke aus unseren vergangenen Tenniscamps',
  },
  en: {
    heroTitle: 'Tennis Camps',
    heroSub:
      'The tennis camp takes place at the BSV 92 grounds, Fritz-Wildung-Str. 23, 14199 Berlin. Monday to Friday, from 9:30 am to 3:00 pm.',
    termineTitle: 'Dates',
    termineSub: 'Berlin summer holidays 2026 · Mon – Fri · 9:30 am – 3:00 pm',
    termine: [
      { label: '1st holiday week', dates: '13 – 17 July 2026' },
      { label: 'Second-to-last holiday week', dates: '10 – 14 August 2026' },
      { label: 'Last holiday week', dates: '17 – 21 August 2026' },
    ],
    terminMeta: 'Mon – Fri · 9:30 am – 3:00 pm',
    feeTitle: 'Participation Fee',
    preise: [
      { label: 'Members', price: '€290' },
      { label: 'Non-members', price: '€350' },
    ],
    feeInfo: 'Including coaching, lunch and drinks.',
    regBadge: 'Registration open',
    regText: 'Register online now for a camp week (binding registration).',
    regCta: 'Register for a camp',
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

      <section className="camp-termine-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">{t.termineTitle}</h2>
              <p className="section-subtitle">{t.termineSub}</p>
            </div>
          </AnimatedSection>

          <div className="camp-termine-grid">
            {t.termine.map((termin, i) => (
              <AnimatedSection key={termin.label} delay={i * 0.1}>
                <div className="camp-termin-card">
                  <span className="camp-termin-label">{termin.label}</span>
                  <span className="camp-termin-dates">{termin.dates}</span>
                  <span className="camp-termin-meta">{t.terminMeta}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="camp-preise-block">
              <h3 className="camp-preise-title">{t.feeTitle}</h3>
              <div className="camp-preise-grid">
                {t.preise.map((p) => (
                  <div key={p.label} className="camp-preis-card">
                    <span className="camp-preis-label">{p.label}</span>
                    <span className="camp-preis-amount">{p.price}</span>
                  </div>
                ))}
              </div>
              <p className="camp-preise-info">{t.feeInfo}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="camp-anmeldung-hinweis">
              <span className="camp-anmeldung-badge">{t.regBadge}</span>
              <p className="camp-anmeldung-text">{t.regText}</p>
              <div className="camp-anmeldung-cta">
                <ButtonWithIcon href="/tenniscamp-anmeldung">
                  {t.regCta}
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
