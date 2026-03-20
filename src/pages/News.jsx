import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '../hooks/useScrollAnimation';

export const events = [
  {
    title: 'Anmeldung Tennistraining Sommersaison',
    subtitle: 'Trainingswunschformular bis 10. April einreichen',
    date: 'Frist: 10. April 2026',
    location: 'BSV 92, Fritz-Wildung-Str. 23, 14199 Berlin',
    description: 'Liebe Trainingsteilnehmerinnen und Trainingsteilnehmer,\n\ndie aktuelle Wintersaison neigt sich dem Ende zu. Daher benötigen wir von allen zukünftigen Trainingsteilnehmerinnen und Trainingsteilnehmern das ausgefüllte Trainingswunschformular.\n\nSende uns eine kurze Nachricht, um das Formular zu erhalten.',
    image: '/anmeldung.jpg',
    cta: { label: 'Nachricht senden', link: '/kontakt' },
  },
  {
    title: 'Aus Tennisschule wird Academy',
    subtitle: 'Die Tennis Academy Grand Slam ist da',
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
      <section className="page-hero" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>News & Events</h1>
          <p>Neuigkeiten und Veranstaltungen der Tennis Academy Grand Slam</p>
        </div>
      </section>

      <section className="news-section">
        <div className="container">
          <div className="news-list">
            {events.map((event, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="news-card">
                  <div className="news-card-image">
                    <img src={event.image} alt={event.title} />
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
                      <Link to={event.cta.link} className="btn btn-primary" style={{ marginTop: '20px' }}>
                        {event.cta.label}
                      </Link>
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
