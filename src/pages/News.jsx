import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import ButtonWithIcon from '@/components/ui/button-with-icon';

export const events = [
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
];

export default function News() {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/cujic-cup.jpg')", backgroundPosition: 'center' }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>News & Events</h1>
          <p>Neuigkeiten und Veranstaltungen der TENNIS ACADEMY GRAND SLAM</p>
        </div>
      </section>

      <section className="news-section">
        <div className="container">
          <div className="news-list">
            {events.map((event, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="news-card">
                  <div className="news-card-image">
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
