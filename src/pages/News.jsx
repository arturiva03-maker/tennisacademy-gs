import { Calendar, Download } from 'lucide-react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import ButtonWithIcon from '@/components/ui/button-with-icon';
import { useLang } from '../i18n/LanguageContext';

export const eventsByLang = {
  de: [
    {
      title: '16. Čujić-Mini-Cup 2026',
      subtitle: 'Kleinfeldturnier mit Mehrkampf – die Ausschreibung',
      date: 'Sonntag, 30. August 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'Der BSV 92 veranstaltet am Sonntag, den 30. August 2026 auf seiner Anlage in der Fritz-Wildung-Str. 23 wieder den beliebten Čujić-Mini-Cup. Die inzwischen 16. Auflage dieses Kleinfeldturniers richtet sich besonders an Kinder, die ihre ersten Schritte im Wettkampf gehen wollen.\n\nGespielt wird in Vierergruppen, in Ausnahmefällen auch in Dreiergruppen. Die Einteilung erfolgt nach Spielstärke und Alter, sodass jedes Kind passende Gegner findet. Bei witterungsbedingter Unbespielbarkeit der Außenplätze kann das Turnier leider nicht stattfinden.',
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
      image: '/cujic-cup.jpg',
      layout: 'banner',
      teaserDetails: [
        { label: 'Termin', value: 'Sonntag, 30.08.2026, ab 14.30 Uhr' },
        { label: 'Meldeschluss', value: 'Donnerstag, 27.08.2026' },
        { label: 'Nenngeld', value: '33 € inklusive Turnier-Shirt' },
      ],
      cta: {
        label: 'Anmeldung über TVPro-online',
        link: 'https://www.tvpro-online.de/turniere/item/44918',
        external: true,
      },
      homeCta: {
        label: 'Zur vollständigen Ausschreibung',
        link: '/news',
      },
      download: {
        label: 'Anmeldeformular als PDF',
        href: '/cujic-mini-cup-2026-anmeldeformular.pdf',
      },
    },
    {
      title: 'Tenniscamps Sommerferien 2026',
      subtitle: 'Anmeldung jetzt online möglich',
      date: 'Sommerferien 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'Die Anmeldung für unsere Tenniscamps in den Sommerferien Berlin 2026 ist online möglich.\n\nZwei Camp-Wochen, jeweils Mo–Fr von 9:30 – 15:00 Uhr, inklusive Training, Mittagessen und Getränke.\n\n• Vorletzte Ferienwoche: 10.08. – 14.08.2026\n• Letzte Ferienwoche: 17.08. – 21.08.2026\n\nTeilnahmegebühr: Mitglieder 290 €, Nicht-Mitglieder 350 €.\n\nWir freuen uns auf euch!\n\nEure TENNIS ACADEMY GRAND SLAM',
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
      layout: 'banner',
    },
  ],
  en: [
    {
      title: '16th Čujić Mini Cup 2026',
      subtitle: 'Small-court tournament with multi-event competition – the announcement',
      date: 'Sunday, 30 August 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'On Sunday, 30 August 2026, BSV 92 will once again host the popular Čujić Mini Cup at its grounds at Fritz-Wildung-Str. 23. Now in its 16th edition, this small-court tournament is aimed especially at children taking their first steps in competitive tennis.\n\nMatches are played in groups of four, in exceptional cases in groups of three. Children are allocated by playing level and age so that everyone finds suitable opponents. If the outdoor courts are unplayable due to weather, the tournament unfortunately cannot take place.',
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
      image: '/cujic-cup.jpg',
      layout: 'banner',
      teaserDetails: [
        { label: 'Date', value: 'Sunday, 30 August 2026, from 2.30 pm' },
        { label: 'Registration deadline', value: 'Thursday, 27 August 2026' },
        { label: 'Entry fee', value: '€33 including tournament shirt' },
      ],
      cta: {
        label: 'Register via TVPro-online',
        link: 'https://www.tvpro-online.de/turniere/item/44918',
        external: true,
      },
      homeCta: {
        label: 'Read the full announcement',
        link: '/news',
      },
      download: {
        label: 'Registration form as PDF (in German)',
        href: '/cujic-mini-cup-2026-anmeldeformular.pdf',
      },
    },
    {
      title: 'Tennis Camps – Summer Holidays 2026',
      subtitle: 'Registration now open online',
      date: 'Summer holidays 2026',
      location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
      description: 'Registration for our tennis camps during the Berlin 2026 summer holidays is open online.\n\nTwo camp weeks, each Mon–Fri from 9:30 am – 3:00 pm, including coaching, lunch and drinks.\n\n• Second-to-last holiday week: 10 – 14 August 2026\n• Last holiday week: 17 – 21 August 2026\n\nParticipation fee: members €290, non-members €350.\n\nWe look forward to seeing you!\n\nYour TENNIS ACADEMY GRAND SLAM',
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
      layout: 'banner',
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
      <section
        className="page-hero page-hero--vivid page-hero--pano"
        style={{ backgroundImage: "url('/cujic-cup.jpg')", backgroundPosition: 'center' }}
      >
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSub}</p>
        </div>
      </section>

      <section className="news-section">
        <div className="container">
          <div className="news-list">
            {items.map((event, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`news-card${event.layout === 'banner' ? ' news-card--banner' : ''}`}>
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
                    {event.details && (
                      <dl className="news-card-details">
                        {event.details.map((detail, j) => (
                          <div className="news-card-detail" key={j}>
                            <dt>{detail.label}</dt>
                            <dd>{detail.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {event.note && <p className="news-card-text">{event.note}</p>}
                    {(event.cta || event.download) && (
                      <div className="news-card-actions">
                        {event.cta && (
                          <ButtonWithIcon
                            href={event.cta.link}
                            target={event.cta.external ? '_blank' : undefined}
                            rel={event.cta.external ? 'noopener noreferrer' : undefined}
                          >
                            {event.cta.label}
                          </ButtonWithIcon>
                        )}
                        {event.download && (
                          <a className="news-card-download" href={event.download.href} download>
                            <Download size={16} />
                            <span>{event.download.label}</span>
                          </a>
                        )}
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
