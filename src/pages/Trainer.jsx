import { User } from 'lucide-react';

const trainers = [
  {
    name: 'Michael Lingner',
    role: 'Leitung der Tennis Academy',
    license: 'A-Trainer',
    image: '/michael.jpg',
    imagePosition: 'center 10%',
    bullets: [
      'Verbandstrainer des TVBB, DTB Vereinsmanager',
      'TVBB Lehrteam, VDT Mitglied',
      'Langjähriger Regionalliga-Spieler',
      'Inhaber Tennisshop Grand Slam seit 1998',
      'IHK-Ausbilder, ehem. Lehrbeauftragter FU Berlin',
    ],
  },
  {
    name: 'Jana Hladká-Kissal',
    role: 'Leitung der Tennis Academy',
    license: 'B-Trainer',
    image: '/jana.jpg',
    bullets: [
      'Ehemalige Profispielerin aus der Slowakei',
      '10 Jahre Regionalliga beim TC Grunewald als Nr. 1',
      'Deutsche Mannschaftsmeisterin Damen 40+ (2014)',
      'Verbandsmeisterin 50+ (2021 & 2024)',
      'Trainerin seit 1994 – Schwerpunkt: Kids on Court',
    ],
  },
  {
    name: 'Zlatan Palazov',
    role: 'Leitung der Tennis Academy',
    license: 'B-Trainer',
    bullets: [
      'Ehemaliger Profispieler aus Bulgarien',
      'Seit sechs Jahren Tennistrainer in Berlin',
      'Trainiert Kinder, Jugendliche und Erwachsene',
      'Aktiver Spieler der 1. Herrenmannschaft',
    ],
  },
  {
    name: 'Artur Ivanenko',
    role: 'Leitung der Tennis Academy',
    license: 'B-Trainer',
    image: '/artur.jpg',
    imagePosition: 'center 20%',
    bullets: [
      'Spielt seit früher Kindheit leidenschaftlich Tennis',
      'Trainiert Kinder, Jugendliche und Erwachsene',
      'Breiten- und Leistungssport, Einzel und Gruppe',
      'Mini-Tennis ab 3 Jahren, Fitness-Tennis',
      'Aktiver Spieler der 1. Herrenmannschaft',
    ],
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
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="trainer-img" style={t.imagePosition ? { objectPosition: t.imagePosition } : undefined} />
                  ) : (
                    <div className="trainer-photo-placeholder">
                      <User size={48} />
                    </div>
                  )}
                  <span className="trainer-badge">{t.license}</span>
                </div>
                <div className="trainer-info">
                  <h3>{t.name}</h3>
                  <div className="trainer-role">{t.role}</div>
                  {t.bullets ? (
                    <ul className="trainer-bullets">
                      {t.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  ) : (
                    <p>Foto und Beschreibung folgen in Kürze.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
