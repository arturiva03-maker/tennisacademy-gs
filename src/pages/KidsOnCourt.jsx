import { Star } from 'lucide-react';

const kidsFeatures = [
  {
    icon: '🎾',
    title: 'Spielerisch lernen',
    text: 'Kinder ab 4 Jahren lernen bei uns spielerisch die Grundlagen des Tennis. Koordination, Ballgefühl und Spaß stehen im Vordergrund.',
  },
  {
    icon: '⭐',
    title: 'Tests & Abzeichen',
    text: 'Regelmäßig abgehaltene Tests motivieren die Kids und zeigen ihren Fortschritt. Jedes bestandene Level wird mit einem Abzeichen belohnt.',
  },
  {
    icon: '🎄',
    title: 'Weihnachtstennis',
    text: 'Das große Weihnachts-Tennis-Event ist unser Jahreshighlight – ein Fest für alle kleinen Tennisspieler zum Jahresabschluss.',
  },
  {
    icon: '☀️',
    title: 'Feriencamps',
    text: 'In den Sommerferien bieten wir beliebte Tenniscamps an, in denen Kinder neue Spielpartner und Freunde kennenlernen.',
  },
  {
    icon: '👫',
    title: 'Neue Freunde',
    text: 'Tennis ist Teamwork! Bei unseren Camps und Gruppentrainings entstehen Freundschaften, die über den Platz hinausgehen.',
  },
  {
    icon: '🏆',
    title: 'Wettkampfvorbereitung',
    text: 'Für die ambitionierten Kids bieten wir altersgerechte Wettkampfvorbereitung und die Teilnahme an Turnieren.',
  },
];

export default function KidsOnCourt() {
  return (
    <>
      <section className="page-header" style={{
        background: 'linear-gradient(135deg, #e85d26, #ff6b35, #ff9a56)'
      }}>
        <div className="container">
          <h1>Kids on Court</h1>
          <p>Tennis für Kinder von 4 bis 7 Jahren</p>
        </div>
      </section>

      <section className="kids-section">
        <div className="container">
          <div className="kids-hero">
            <div className="age-badge">
              <Star size={14} />
              Für Kinder von 4–7 Jahren
            </div>
            <h2>Tennis spielerisch entdecken</h2>
            <p>
              Viele Erwachsene sagen, dass sie mit dem Tennissport zu spät angefangen haben.
              Heute haben Kinder die Möglichkeit, bereits ab 4 Jahren bei uns den Tennissport
              kennenzulernen. Neben dem seriösen Training kommt der Spaß bei uns nie zu kurz!
            </p>
          </div>

          <div className="section-header">
            <div className="section-tag">Programm</div>
            <h2 className="section-title">Was Kids on Court bietet</h2>
            <p className="section-subtitle">
              Ein vielseitiges Programm, das Kinder begeistert und fördert.
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
