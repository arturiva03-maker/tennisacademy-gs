// Der Čujić-Mini-Cup hat eine eigene Seite statt einer News-Meldung: Sie wird
// von außen (TVPro, Flyer, Eltern-Chats) direkt verlinkt. Zwischen zwei
// Auflagen steht hier der Rückblick; die neue Ausschreibung kommt wieder oben hin.
import { Calendar, ChevronDown, MapPin } from 'lucide-react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
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
      'Der BSV 92 veranstaltete am Sonntag, den 30. August 2026 auf seiner Anlage in der Fritz-Wildung-Str. 23 wieder den beliebten Čujić-Mini-Cup. Die 16. Auflage dieses Kleinfeldturniers richtete sich besonders an Kinder, die ihre ersten Schritte im Wettkampf gehen wollten.',
      'Gespielt wurde in Vierergruppen, in Ausnahmefällen auch in Dreiergruppen. Eingeteilt wurde nach Spielstärke und Alter, sodass jedes Kind passende Gegner fand.',
    ],
    meta: {
      date: 'Sonntag, 30. August 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
    },
    next: 'Die Ausschreibung für die nächste Auflage steht hier, sobald der Termin feststeht.',
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
      'On Sunday, 30 August 2026, BSV 92 once again hosted the popular Čujić Mini Cup at its grounds at Fritz-Wildung-Str. 23. The 16th edition of this small-court tournament was aimed especially at children taking their first steps in competitive tennis.',
      'Matches were played in groups of four, in exceptional cases in groups of three. Children were allocated by playing level and age so that everyone found suitable opponents.',
    ],
    meta: {
      date: 'Sunday, 30 August 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
    },
    next: 'The announcement for the next edition will be published here as soon as the date is set.',
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
              <p className="minicup-note">{t.next}</p>
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
