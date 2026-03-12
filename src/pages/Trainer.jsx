import { User } from 'lucide-react';

const trainers = [
  {
    name: 'Michael Lingner',
    role: 'Leitung der Tennisschule',
    license: 'A-Trainer',
    gradient: 'linear-gradient(135deg, #1a4d1b, #2d6a2e)',
  },
  {
    name: 'Jana Hladka-Kissal',
    role: 'Trainerin',
    license: 'B-Trainer',
    gradient: 'linear-gradient(135deg, #2d6a2e, #4a8f4b)',
  },
  {
    name: 'Zlatan Palazov',
    role: 'Trainer',
    license: 'B-Trainer',
    gradient: 'linear-gradient(135deg, #1a4d1b, #3a7a3b)',
  },
  {
    name: 'Artur Ivanenko',
    role: 'Trainer',
    license: 'B-Trainer',
    gradient: 'linear-gradient(135deg, #2d6a2e, #5a9f5b)',
  },
];

export default function Trainer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Unser Trainerteam</h1>
          <p>Erfahrung, Leidenschaft und Kompetenz auf dem Platz</p>
        </div>
      </section>

      <section className="trainer-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Das Team</div>
            <h2 className="section-title">Ihre Trainer</h2>
            <p className="section-subtitle">
              Unser qualifiziertes Team steht Ihnen mit jahrelanger Erfahrung
              und Leidenschaft für den Tennissport zur Verfügung.
            </p>
          </div>
          <div className="trainer-grid">
            {trainers.map((t, i) => (
              <div className="trainer-card" key={i}>
                <div className="trainer-photo" style={{ background: t.gradient }}>
                  <div className="trainer-photo-placeholder">
                    <User size={48} />
                  </div>
                  <span className="trainer-badge">{t.license}</span>
                </div>
                <div className="trainer-info">
                  <h3>{t.name}</h3>
                  <div className="trainer-role">{t.role}</div>
                  <p>Foto und Beschreibung folgen in Kürze.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
