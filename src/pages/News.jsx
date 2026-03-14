import { Calendar, MapPin } from 'lucide-react';

const events = [
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
              <div className="news-card" key={i}>
                <div className="news-card-image">
                  <img src={event.image} alt={event.title} />
                </div>
                <div className="news-card-content">
                  <h2>{event.title}</h2>
                  <p className="news-card-subtitle">{event.subtitle}</p>
                  <div className="news-card-meta">
                    <span><Calendar size={16} /> {event.date}</span>
                    <span><MapPin size={16} /> {event.location}</span>
                  </div>
                  <p className="news-card-text">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
