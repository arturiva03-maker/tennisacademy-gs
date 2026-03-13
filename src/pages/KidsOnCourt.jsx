import { Star, Gamepad2, Award, TreePine, Sun, Users, Trophy, Activity, Target } from 'lucide-react';

const kidsFeatures = [
  {
    icon: <Activity size={28} />,
    title: 'Koordination & Bewegung',
    text: 'Verschiedene Laufarten (vorwärts, rückwärts, Side-Steps, Hopserlauf), intensive Ball-Schule sowie Schulung aller koordinativen Fähigkeiten.',
  },
  {
    icon: <Target size={28} />,
    title: 'Grundlagen schaffen',
    text: 'Wir schaffen die Grundvoraussetzungen für das spätere Erlernen einer guten Tennis-Technik: Gleichgewicht, Orientierung, Rhythmik, Differenzierung und Reaktion.',
  },
  {
    icon: <Gamepad2 size={28} />,
    title: 'Spielerisch lernen',
    text: 'Spielerisch und vor allem mit viel Spaß und Freude an der Bewegung werden die Trainingsinhalte ständig geübt und verbessert.',
  },
  {
    icon: <Award size={28} />,
    title: 'Tennis-Technik',
    text: 'Je nach Lernalter steigert sich der zeitliche Anteil des reinen Tennis-Trainings. Dabei werden alle Schläge erlernt: Vorhand, Rückhand, Volley, Aufschlag und Schmetterball.',
  },
  {
    icon: <Trophy size={28} />,
    title: 'Tests & Motivation',
    text: 'Regelmäßig stattfindende Tests motivieren die Kids und zeigen ihren Fortschritt. Jedes bestandene Level wird mit einem Abzeichen belohnt.',
  },
  {
    icon: <TreePine size={28} />,
    title: 'Weihnachtstennis',
    text: 'Das große Weihnachts-Tennis-Event ist unser Jahreshighlight – ein Fest für alle kleinen Tennisspieler zum Jahresabschluss.',
  },
  {
    icon: <Sun size={28} />,
    title: 'Feriencamps',
    text: 'In den Sommerferien bieten wir beliebte Tenniscamps an, in denen Kinder neue Spielpartner und Freunde kennenlernen.',
  },
  {
    icon: <Users size={28} />,
    title: 'Ehrgeiz & Spaß',
    text: 'Unser großes Ziel: Die Kinder lernen Tennis zu spielen, entwickeln einen gesunden Ehrgeiz und haben dabei viel Spaß.',
  },
];

export default function KidsOnCourt() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Kids on Court</h1>
          <p>Tennis für Kinder ab 4 Jahren</p>
        </div>
      </section>

      <section className="kids-section">
        <div className="container">
          <div className="kids-hero">
            <div className="age-badge">
              <Star size={14} />
              Für Kinder ab 4 Jahren
            </div>
            <h2>Was bedeutet Kids on Court?</h2>
            <p>
              Vielleicht erinnern Sie sich daran, in welchem Alter Sie mit dem Tennis begonnen haben
              und denken dabei: „Viel zu spät!". Heute bieten wir schon Kindern im Alter von 4 Jahren
              die Möglichkeit, unseren schönen Sport zu erlernen – eben bei Kids on Court.
            </p>
            <p style={{ marginTop: '16px' }}>
              Tennis ist ein koordinativ sehr anspruchsvoller Sport und daher ist gerade die Technik
              für Kinder eher schwer zu erlernen. Wichtig ist in diesem Alter, die Grundvoraussetzungen
              für das spätere Erlernen einer guten Tennis-Technik zu schaffen.
            </p>
          </div>

          <div className="section-header">
            <h2 className="section-title">Was Kids on Court bietet</h2>
            <p className="section-subtitle">
              Ein vielseitiges Programm, das Kinder begeistert und fördert – neben allem
              ernsthaften Training steht bei uns aber auch immer der Spaß im Vordergrund!
            </p>
          </div>

          <div className="kids-features">
            {kidsFeatures.map((f, i) => (
              <div className="kids-card" key={i}>
                <div className="kids-card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
