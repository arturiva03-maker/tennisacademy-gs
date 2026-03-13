import { User } from 'lucide-react';

const trainers = [
  {
    name: 'Michael Lingner',
    role: 'Leitung der Tennis Academy',
    license: 'A-Trainer',
  },
  {
    name: 'Jana Hladka-Kissal',
    role: 'Leitung der Tennis Academy',
    license: 'B-Trainer',
  },
  {
    name: 'Artur Ivanenko',
    role: 'Leitung der Tennis Academy',
    license: 'B-Trainer',
  },
];

export default function Trainer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Unser Trainerteam</h1>
        </div>
      </section>

      <section className="trainer-section">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">
              Unser qualifiziertes Team steht Ihnen mit jahrelanger Erfahrung
              und Leidenschaft für den Tennissport zur Verfügung.
            </p>
          </div>
          <div className="trainer-grid">
            {trainers.map((t, i) => (
              <div className="trainer-card" key={i}>
                <div className="trainer-photo">
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
