import { User } from 'lucide-react';

const trainers = [
  {
    name: 'Michael Lingner',
    role: 'Leitung der Tennis Academy',
    license: 'A-Trainer',
    description: 'Verbandstrainer des TVBB, DTB Vereinsmanager, TVBB Lehrteam, VDT Mitglied. Langjähriger Regionalliga-Spieler. Inhaber des Tennisshop Grand Slam seit 1998, IHK-Ausbilder. Ehem. Lehrbeauftragter für Sportwissenschaft an der FU Berlin.',
  },
  {
    name: 'Jana Hladká-Kissal',
    role: 'Leitung der Tennis Academy',
    license: 'B-Trainer',
    description: 'Ehemalige Profispielerin aus der Slowakei. 10 Jahre Regionalliga beim TC Grunewald als Nr. 1. Deutsche Mannschaftsmeisterin Damen 40+ (2014), Verbandsmeisterin 50+ (2021 & 2024). Trainerin seit 1994. Schwerpunkt: Kids on Court.',
  },
  {
    name: 'Zlatan Palazov',
    role: 'Leitung der Tennis Academy',
    license: 'B-Trainer',
    description: 'Ehemaliger Profispieler aus Bulgarien. Seit sechs Jahren in Berlin als Tennistrainer tätig. Trainiert mit großer Leidenschaft talentierte Kinder und Jugendliche, um seine Erfahrungen an die nächste Generation weiterzugeben. Arbeitet ebenso gerne mit Erwachsenen, die ihre Technik oder Taktik verbessern möchten. Aktiver Spieler der 1. Herrenmannschaft.',
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
