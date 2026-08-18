// Der Čujić-Mini-Cup hat eine eigene Seite statt einer News-Meldung: Die
// Ausschreibung ist der ausführlichste Inhalt der Saison und wird von außen
// (TVPro, Flyer, Eltern-Chats) direkt verlinkt. News behält nur den Teaser.
import { Calendar, ChevronDown, Download, MapPin } from 'lucide-react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import ButtonWithIcon from '@/components/ui/button-with-icon';
import { useLang } from '../i18n/LanguageContext';

const T = {
  de: {
    heroKicker: '16. Auflage · Sonntag, 30. August 2026',
    heroTitle: 'Čujić-Mini-Cup',
    heroSub: 'Kleinfeldturnier mit Mehrkampf beim BSV 92 in Berlin.',
    introTag: 'U10 Mixed',
    introTitle: 'Der erste Wettkampf',
    introSub: 'Ein Turniertag für Kinder, die ihre ersten Schritte im Wettkampf gehen.',
    intro: [
      'Der BSV 92 veranstaltet am Sonntag, den 30. August 2026 auf seiner Anlage in der Fritz-Wildung-Str. 23 wieder den beliebten Čujić-Mini-Cup. Die inzwischen 16. Auflage dieses Kleinfeldturniers richtet sich besonders an Kinder, die ihre ersten Schritte im Wettkampf gehen wollen.',
      'Gespielt wird in Vierergruppen, in Ausnahmefällen auch in Dreiergruppen. Die Einteilung erfolgt nach Spielstärke und Alter, sodass jedes Kind passende Gegner findet. Bei witterungsbedingter Unbespielbarkeit der Außenplätze kann das Turnier leider nicht stattfinden.',
    ],
    meta: {
      date: 'Sonntag, 30. August 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
    },
    detailsTitle: 'Die Ausschreibung',
    details: [
      { label: 'Termin', value: 'Sonntag, 30.08.2026' },
      { label: 'Spielbeginn', value: '14.30 Uhr (Spielende ca. 18.30 Uhr)' },
      { label: 'Sign-In', value: '13.00 Uhr bis 13.45 Uhr' },
      { label: 'Konkurrenz', value: 'U10 Mixed – Mädchen und Jungen, Jahrgang 2016 und jünger' },
      { label: 'Teilnehmerzahl', value: 'maximal 48 Kinder' },
      { label: 'Spielball', value: 'Dunlop Starter Balls rot' },
      { label: 'Spielort', value: 'Berliner Sport-Verein 1892 e.V. – Tennisabteilung, Fritz-Wildung-Str. 23, 14199 Berlin' },
      { label: 'Meldeschluss', value: 'Donnerstag, 27.08.2026, 23:59 Uhr' },
      { label: 'Nenngeld', value: '33 € inklusive Turnier-Shirt, Barzahlung beim Sign-In' },
      { label: 'Veranstalter', value: 'Berliner Sport-Verein 1892 e.V. – Tennisabteilung' },
    ],
    note: 'Anmeldung über die Turnierplattform TVPro-online oder mit dem ausgefüllten Anmeldeformular per E-Mail an info@tennisacademy-gs.de.',
    ctaLabel: 'Anmeldung über TVPro-online',
    downloadLabel: 'Anmeldeformular als PDF',
    archiveTitle: 'Rückblick',
    archive: [
      {
        date: 'Sonntag, 07.09.2025',
        title: '15. Čujić-Mini-Cup 2025',
        text: [
          'Der BSV 92 veranstaltete auf seiner Anlage in der Fritz-Wildung-Str. 23, 14199 Berlin, am Sonntag, den 07.09.2025 wieder den sehr beliebten Čujić-Mini-Cup 2025. Die 15. Auflage dieses Kleinfeldturniers richtete sich besonders an die Kinder, die den Einstieg in die faszinierende Sportart Tennis beginnen wollten.',
        ],
      },
    ],
  },
  en: {
    heroKicker: '16th edition · Sunday, 30 August 2026',
    heroTitle: 'Čujić Mini Cup',
    heroSub: 'Small-court tournament with multi-event competition at BSV 92 in Berlin.',
    introTag: 'U10 mixed',
    introTitle: 'The first competition',
    introSub: 'A tournament day for children taking their first steps in competitive tennis.',
    intro: [
      'On Sunday, 30 August 2026, BSV 92 will once again host the popular Čujić Mini Cup at its grounds at Fritz-Wildung-Str. 23. Now in its 16th edition, this small-court tournament is aimed especially at children taking their first steps in competitive tennis.',
      'Matches are played in groups of four, in exceptional cases in groups of three. Children are allocated by playing level and age so that everyone finds suitable opponents. If the outdoor courts are unplayable due to weather, the tournament unfortunately cannot take place.',
    ],
    meta: {
      date: 'Sunday, 30 August 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
    },
    detailsTitle: 'The announcement',
    details: [
      { label: 'Date', value: 'Sunday, 30 August 2026' },
      { label: 'Start of play', value: '2.30 pm (end of play approx. 6.30 pm)' },
      { label: 'Sign-in', value: '1.00 pm to 1.45 pm' },
      { label: 'Competition', value: 'U10 mixed – girls and boys born 2016 or later' },
      { label: 'Number of participants', value: 'maximum 48 children' },
      { label: 'Ball', value: 'Dunlop Starter Balls red' },
      { label: 'Venue', value: 'Berliner Sport-Verein 1892 e.V. – tennis department, Fritz-Wildung-Str. 23, 14199 Berlin' },
      { label: 'Registration deadline', value: 'Thursday, 27 August 2026, 11:59 pm' },
      { label: 'Entry fee', value: '€33 including tournament shirt, cash payment at sign-in' },
      { label: 'Organiser', value: 'Berliner Sport-Verein 1892 e.V. – tennis department' },
    ],
    note: 'Register via the TVPro-online tournament platform or send the completed registration form by email to info@tennisacademy-gs.de.',
    ctaLabel: 'Register via TVPro-online',
    downloadLabel: 'Registration form as PDF (in German)',
    archiveTitle: 'Looking back',
    archive: [
      {
        date: 'Sunday, 7 September 2025',
        title: '15th Čujić Mini Cup 2025',
        text: [
          'On Sunday, 7 September 2025, BSV 92 hosted the very popular Čujić Mini Cup 2025 at its grounds at Fritz-Wildung-Str. 23, 14199 Berlin. The 15th edition of this small-court tournament was aimed especially at children who wanted to take their first steps in the fascinating sport of tennis.',
        ],
      },
    ],
  },
};

const MINI_CUP_TVPRO = 'https://www.tvpro-online.de/turniere/item/46863';
const MINI_CUP_PDF = '/cujic-mini-cup-2026-anmeldeformular.pdf';

export default function MiniCup() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <>
      <section
        className="page-hero page-hero--vivid page-hero--pano page-hero--minicup"
        style={{ backgroundImage: "url('/cujic-cup.jpg')", backgroundPosition: 'center' }}
      >
        <div className="page-hero-overlay"></div>
        <div className="container">
          <p className="page-hero-kicker">{t.heroKicker}</p>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSub}</p>
        </div>
      </section>

      <section className="minicup-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-tag">{t.introTag}</span>
              <h2 className="section-title">{t.introTitle}</h2>
              <p className="section-subtitle">{t.introSub}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="minicup-lead">
              <div className="minicup-meta">
                <span><Calendar size={16} /> {t.meta.date}</span>
                <span><MapPin size={16} /> {t.meta.location}</span>
              </div>
              {t.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="minicup-panel">
              <h2 className="minicup-panel-title">{t.detailsTitle}</h2>
              <dl className="news-card-details">
                {t.details.map((detail, i) => (
                  <div className="news-card-detail" key={i}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="minicup-note">{t.note}</p>
              <div className="news-card-actions">
                <ButtonWithIcon href={MINI_CUP_TVPRO} target="_blank" rel="noopener noreferrer">
                  {t.ctaLabel}
                </ButtonWithIcon>
                <a className="news-card-download" href={MINI_CUP_PDF} download>
                  <Download size={16} />
                  <span>{t.downloadLabel}</span>
                </a>
              </div>
            </div>
          </AnimatedSection>

          {t.archive.length > 0 && (
            <AnimatedSection delay={0.1}>
              <div className="news-archive">
                <div className="news-archive-header">
                  <h2 className="news-archive-title">{t.archiveTitle}</h2>
                </div>
                <div className="news-archive-list">
                  {t.archive.map((edition) => (
                    <details className="news-archive-item" key={edition.title}>
                      <summary className="news-archive-summary">
                        <span className="news-archive-date">{edition.date}</span>
                        <span className="news-archive-headline">{edition.title}</span>
                        <ChevronDown className="news-archive-chevron" size={18} aria-hidden="true" />
                      </summary>
                      <div className="news-archive-body minicup-archive-body">
                        {edition.text.map((paragraph, i) => (
                          <p className="news-card-text" key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}
