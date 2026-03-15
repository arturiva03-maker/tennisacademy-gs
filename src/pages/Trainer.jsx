import { User } from 'lucide-react';

const trainers = [
  {
    name: 'Michael Lingner',
    role: 'Leitung der Tennis Academy',
    license: 'A-Trainer',
    description: 'Verbandstrainer des TVBB, DTB Vereinsmanager, TVBB Lehrteam, VDT Mitglied und langjähriger Regionalliga-Spieler. Er hat Jura studiert, ehe er 1998 den Tennisshop Grand Slam eröffnete, wo er auch als IHK-Ausbilder für Kaufleute im Einzelhandel fungiert. Ehemaliger Lehrbeauftragter für Sportwissenschaft an der FU Berlin.',
  },
  {
    name: 'Jana Hladká-Kissal',
    role: 'Leitung der Tennis Academy',
    license: 'B-Trainer',
    description: 'Ehemalige Profispielerin aus der Slowakei. Mehrfache Siegerin bei slowakischen Jugendmeisterschaften im Einzel, Doppel und Mixed. Mit 15 Jahren Stammspielerin in der slowakischen Nationalliga, 2x Vizemeister. 10 Jahre Regionalliga beim TC Grunewald als Nr. 1. Deutsche Mannschaftsmeisterin Damen 40+ (2014), Deutsche Verbandsmeisterin 50+ (2021 & 2024). Trainerlizenz seit 1994. Tätigkeitsschwerpunkt: Kids on Court.',
  },
  {
    name: 'Zlatan Palazov',
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
      <section className="page-hero" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="page-hero-overlay"></div>
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
                  <p>{t.description || 'Foto und Beschreibung folgen in Kürze.'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
