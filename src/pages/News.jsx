import { Calendar } from 'lucide-react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import ButtonWithIcon from '@/components/ui/button-with-icon';
import { useLang } from '../i18n/LanguageContext';

export const eventsByLang = {
  de: [
    {
      title: 'Tenniscamps Sommerferien 2026',
      subtitle: 'Anmeldung jetzt online möglich',
      date: 'Sommerferien 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'Die Anmeldung für unsere Tenniscamps in den Sommerferien Berlin 2026 ist ab sofort online möglich.\n\nDrei Camp-Wochen, jeweils Mo–Fr von 9:30 – 15:00 Uhr, inklusive Training, Mittagessen und Getränke.\n\n• 1. Ferienwoche: 13.07. – 17.07.2026\n• Vorletzte Ferienwoche: 10.08. – 14.08.2026\n• Letzte Ferienwoche: 17.08. – 21.08.2026\n\nTeilnahmegebühr: Mitglieder 290 €, Nicht-Mitglieder 350 €.\n\nWir freuen uns auf euch!\n\nEure TENNIS ACADEMY GRAND SLAM',
      image: '/tenniscamp.jpg',
      cta: {
        label: 'Zur Camp-Anmeldung',
        link: '/tenniscamp-anmeldung',
      },
    },
    {
      title: 'Start der Sommersaison 2026',
      subtitle: 'Trainingsbetrieb ab 4. Mai 2026',
      date: '4. Mai 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'Am 4. Mai 2026 startet offiziell der Trainingsbetrieb unserer Sommersaison 2026.\n\nAlle Kinder und Jugendlichen wurden erfolgreich in ihre Trainingsgruppen eingeteilt und haben die Bestätigung ihrer Trainingszeiten für die kommende Sommersaison erhalten.\n\nWir freuen uns auf eine erfolgreiche Sommersaison 2026 und ein spannendes Tennisjahr mit euch auf dem Platz.\n\nEure TENNIS ACADEMY GRAND SLAM',
      image: '/neues hero.jpeg',
    },
    {
      title: 'Aus Tennisschule wird Academy',
      subtitle: 'Die TENNIS ACADEMY GRAND SLAM ist da',
      date: 'März 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'Nach über 16 Jahren erfolgreicher Arbeit geht die Tennisschule Ritter & Lingner einen großen Schritt weiter: Passend zum 125-jährigen Jubiläum des BSV 92 wird aus der bewährten Tennisschule die neugegründete TENNIS ACADEMY GRAND SLAM.\n\nMit Jana Hladka-Kissal, Artur Ivanenko, Zlatan Palazov und Michael Lingner als Gesellschaftern und einem starken Team im Rücken ist das Ziel klar – die Qualität im Kinder- und Jugendbereich noch weiter zu steigern.\n\nWas als Tennisschule begann, wird jetzt zur Akademie. Das nächste Kapitel beginnt.\n\nWir freuen uns auf eine erfolgreiche Sommersaison 2026.\n\nEure TENNIS ACADEMY GRAND SLAM & Team',
      image: '/logo.png',
    },
    {
      title: '15. Čujić-Mini-Cup 2025',
      subtitle: 'Kleinfeldturnier mit Mehrkampf',
      date: 'Sonntag, 07.09.2025',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'Der BSV 92 veranstaltet auf seiner Anlage in der Fritz-Wildung-Str. 23, 14199 Berlin, am Sonntag, den 07.09.2025 wieder den sehr beliebten Čujić-Mini-Cup 2025. Die inzwischen 15. Auflage dieses Kleinfeldturniers richtet sich besonders an die Kinder, die den Einstieg in die faszinierende Sportart Tennis beginnen wollen.',
      image: '/cujic-cup.jpg',
    },
  ],
  en: [
    {
      title: 'Tennis Camps – Summer Holidays 2026',
      subtitle: 'Registration now open online',
      date: 'Summer holidays 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'Registration for our tennis camps during the Berlin 2026 summer holidays is now open online.\n\nThree camp weeks, each Mon–Fri from 9:30 am – 3:00 pm, including coaching, lunch and drinks.\n\n• 1st holiday week: 13 – 17 July 2026\n• Second-to-last holiday week: 10 – 14 August 2026\n• Last holiday week: 17 – 21 August 2026\n\nParticipation fee: members €290, non-members €350.\n\nWe look forward to seeing you!\n\nYour TENNIS ACADEMY GRAND SLAM',
      image: '/tenniscamp.jpg',
      cta: {
        label: 'Register for a camp',
        link: '/tenniscamp-anmeldung',
      },
    },
    {
      title: 'Start of the 2026 Summer Season',
      subtitle: 'Training starts 4 May 2026',
      date: '4 May 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'On 4 May 2026 the training season of our 2026 summer term officially begins.\n\nAll children and teenagers have been assigned to their training groups and have received confirmation of their training times for the upcoming summer season.\n\nWe are looking forward to a successful 2026 summer season and an exciting year of tennis with you on court.\n\nYour TENNIS ACADEMY GRAND SLAM',
      image: '/neues hero.jpeg',
    },
    {
      title: 'From Tennis School to Academy',
      subtitle: 'The TENNIS ACADEMY GRAND SLAM has arrived',
      date: 'March 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'After more than 16 successful years, the tennis school Ritter & Lingner is taking a big step forward: fittingly for the 125th anniversary of BSV 92, the well-established tennis school becomes the newly founded TENNIS ACADEMY GRAND SLAM.\n\nWith Jana Hladka-Kissal, Artur Ivanenko, Zlatan Palazov and Michael Lingner as partners and a strong team behind them, the goal is clear – to raise the quality of our youth programme even further.\n\nWhat began as a tennis school is now becoming an academy. The next chapter begins.\n\nWe are looking forward to a successful 2026 summer season.\n\nYour TENNIS ACADEMY GRAND SLAM & team',
      image: '/logo.png',
    },
    {
      title: '15th Čujić Mini Cup 2025',
      subtitle: 'Small-court tournament with multi-event competition',
      date: 'Sunday, 7 September 2025',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'On Sunday, 7 September 2025, BSV 92 will once again host the very popular Čujić Mini Cup 2025 at its grounds at Fritz-Wildung-Str. 23, 14199 Berlin. Now in its 15th edition, this small-court tournament is aimed especially at children who want to take their first steps in the fascinating sport of tennis.',
      image: '/cujic-cup.jpg',
    },
  ],
};

// Rückwärtskompatibler Default-Export der deutschen Events
export const events = eventsByLang.de;

const T = {
  de: {
    heroTitle: 'News & Events',
    heroSub: 'Neuigkeiten und Veranstaltungen der TENNIS ACADEMY GRAND SLAM',
  },
  en: {
    heroTitle: 'News & Events',
    heroSub: 'News and events from TENNIS ACADEMY GRAND SLAM',
  },
};

export default function News() {
  const { lang } = useLang();
  const t = T[lang];
  const items = eventsByLang[lang];

  return (
    <>
      <section className="page-hero page-hero--split">
        <div className="container">
          <div className="split-hero-text">
            <p className="page-hero-kicker">Tennis Academy Grand Slam</p>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroSub}</p>
          </div>
          <div className="split-hero-card split-hero-card--wide">
            <img
              src="/tenniscamp.jpg"
              alt={lang === 'de' ? 'Gruppenfoto vom Tenniscamp' : 'Tennis camp group photo'}
            />
          </div>
        </div>
      </section>

      <section className="news-section">
        <div className="container">
          <div className="news-list">
            {items.map((event, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="news-card">
                  <div className={`news-card-image${event.image.endsWith('.png') ? ' news-card-image--logo' : ''}`}>
                    <img src={event.image} alt={event.title} loading="lazy" />
                  </div>
                  <div className="news-card-content">
                    <h2>{event.title}</h2>
                    <p className="news-card-subtitle">{event.subtitle}</p>
                    <div className="news-card-meta">
                      <span><Calendar size={16} /> {event.date}</span>
                    </div>
                    {event.description.split('\n\n').map((paragraph, j) => (
                      <p className="news-card-text" key={j}>{paragraph}</p>
                    ))}
                    {event.cta && (
                      <div style={{ marginTop: '20px' }}>
                        <ButtonWithIcon href={event.cta.link}>
                          {event.cta.label}
                        </ButtonWithIcon>
                      </div>
                    )}
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
