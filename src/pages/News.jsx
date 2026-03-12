import { Newspaper } from 'lucide-react';

export default function News() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>News & Events</h1>
          <p>Neuigkeiten und Veranstaltungen der Tennisschule Grand Slam</p>
        </div>
      </section>

      <section className="news-section">
        <div className="container">
          <div className="news-empty">
            <div className="news-empty-icon">
              <Newspaper size={48} strokeWidth={1} />
            </div>
            <h3>Aktuell keine News oder Events</h3>
            <p>Hier werden bald Neuigkeiten und Veranstaltungen veröffentlicht. Schauen Sie bald wieder vorbei!</p>
          </div>
        </div>
      </section>
    </>
  );
}
