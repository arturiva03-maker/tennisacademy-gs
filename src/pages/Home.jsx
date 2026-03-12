import { Link } from 'react-router-dom';
import { Award, Target, Users, Heart, Zap } from 'lucide-react';

const features = [
  {
    icon: <Target size={24} />,
    title: 'Tennis ist toll',
    text: 'Erlernen und trainieren Sie bei uns die optimale Tennistechnik. Unsere erfahrenen Trainer bringen Sie auf das nächste Level.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Tennis ist spannend',
    text: 'Das Spielverständnis und die taktische Ausbildung werden bei uns groß geschrieben. Strategie gewinnt Matches.',
  },
  {
    icon: <Users size={24} />,
    title: 'Tennis entdecken',
    text: 'Spiel und Spaß erleben Ihre Kinder (4–7 Jahre) bei Kids on Court. Der perfekte Einstieg in den Tennissport.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Tennis tut gut',
    text: 'Wir machen Ihnen Beine: arbeiten Sie mit uns an Ihrer Beinarbeit und Fitness. Bewegung, die Spaß macht.',
  },
  {
    icon: <Award size={24} />,
    title: 'Tennis ist Teamwork',
    text: 'Bei den Tenniscamps des BSV\'92 lernen Ihre Kinder viele neue Spielpartner und Freunde kennen.',
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-pattern" />
        <div className="hero-court-lines" />
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Award size={14} />
              DTB/VDT anerkannte Tennisschule
            </div>
            <h1 className="hero-title">
              Willkommen bei der<br />
              Tennisschule <span>Grand Slam</span>
            </h1>
            <p className="hero-subtitle">
              Michael Lingner, Jana Hladka-Kissal, Zlatan Palazov und Artur Ivanenko
              – jahrelange Erfahrung und erfolgreiche Kompetenz im Tennissport.
              Professionelles Training für jedes Alter und jede Spielstärke.
            </p>
            <div className="hero-cta">
              <Link to="/preise" className="btn btn-primary">
                Preise ansehen
              </Link>
              <Link to="/trainer" className="btn btn-outline">
                Unser Team kennenlernen
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-ball" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Was uns ausmacht</div>
            <h2 className="section-title">Unser Angebot für Sie</h2>
            <p className="section-subtitle">
              Von der Technik bis zur Taktik, vom Kinderprogramm bis zum Leistungstraining
              – wir begleiten Sie auf Ihrem Tennisweg.
            </p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DTB/VDT TEASER */}
      <section className="dtb-section">
        <div className="container">
          <div className="dtb-banner">
            <div className="dtb-seal">
              <span className="seal-label">Anerkannt von</span>
              <span className="seal-title">DTB / VDT</span>
            </div>
            <div className="dtb-banner-text">
              <h2>Deutsche Tennisschule</h2>
              <p>
                Unsere Tennisschule erfüllt die fachlichen und organisatorischen
                Voraussetzungen der Deutschen Tennisschule, anerkannt vom Deutschen
                Tennis Bund (DTB) und dem Verband Deutscher Tennislehrer (VDT).
                Ein Qualitätssiegel, das für erstklassigen Unterricht steht.
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/dtb-vdt" className="btn btn-primary" style={{ background: 'var(--tennis-green)', color: 'white' }}>
              Mehr über DTB/VDT erfahren
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
