import { Link } from 'react-router-dom';
import { Award, Target, Users, Heart, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: <Target size={32} />,
    title: 'Tennis ist toll',
    text: 'Erlernen und trainieren Sie bei uns die optimale Tennistechnik. Unsere erfahrenen Trainer bringen Sie auf das nächste Level.',
  },
  {
    icon: <Zap size={32} />,
    title: 'Tennis ist spannend',
    text: 'Das Spielverständnis und die taktische Ausbildung werden bei uns groß geschrieben. Strategie gewinnt Matches.',
  },
  {
    icon: <Users size={32} />,
    title: 'Tennis entdecken',
    text: 'Spiel und Spaß erleben Ihre Kinder (4–7 Jahre) bei Kids on Court. Der perfekte Einstieg in den Tennissport.',
  },
  {
    icon: <Heart size={32} />,
    title: 'Tennis tut gut',
    text: 'Wir machen Ihnen Beine: arbeiten Sie mit uns an Ihrer Beinarbeit und Fitness. Bewegung, die Spaß macht.',
  },
  {
    icon: <Award size={32} />,
    title: 'Tennis ist Teamwork',
    text: 'Bei den Tenniscamps lernen Ihre Kinder viele neue Spielpartner und Freunde kennen.',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge-large">
              DTB/VDT anerkannte Tennisschule
            </div>
            <h1 className="hero-title-large">
              Tennis Academy<br />
              <span>Grand Slam</span>
            </h1>
            <p className="hero-subtitle">
              Wir, Michael L., Jana H.K., Zlatan P. und Artur I., haben uns der Förderung
              des Jugendsports verschrieben – im Breiten- sowie im Leistungsbereich.
              Zusammen gründeten wir zum Sommer 2026 die Tennis Academy Grand Slam.
            </p>
            <div className="hero-cta">
              <Link to="/preise" className="btn btn-primary">
                Preise ansehen
              </Link>
              <Link to="/trainer" className="btn btn-outline">
                Unser Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SLIDER */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Unser Angebot für Sie</h2>
            <p className="section-subtitle">
              Von der Technik bis zur Taktik, vom Kinderprogramm bis zum Leistungstraining
              – wir begleiten Sie auf Ihrem Tennisweg.
            </p>
          </div>

          {/* Slider für Desktop */}
          <div className="features-slider">
            <button className="slider-btn slider-btn-prev" onClick={prevSlide}>
              <ChevronLeft size={24} />
            </button>
            <div className="slider-track">
              {features.map((f, i) => (
                <div
                  className={`slider-slide ${i === currentSlide ? 'active' : ''}`}
                  key={i}
                  style={{ transform: `translateX(${(i - currentSlide) * 100}%)` }}
                >
                  <div className="slider-card">
                    <div className="slider-icon">{f.icon}</div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="slider-btn slider-btn-next" onClick={nextSlide}>
              <ChevronRight size={24} />
            </button>
            <div className="slider-dots">
              {features.map((_, i) => (
                <button
                  key={i}
                  className={`slider-dot ${i === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          </div>

          {/* Grid für Mobile */}
          <div className="features-grid-mobile">
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
          <div className="dtb-quality-seal">
            <div className="dtb-seal-badge">
              <span className="seal-icon">DTB</span>
              <span className="seal-divider">/</span>
              <span className="seal-icon">VDT</span>
            </div>
            <div className="dtb-content">
              <h2>Deutsche Tennisschule</h2>
              <p>
                Unsere Tennisschule erfüllt die fachlichen und organisatorischen
                Voraussetzungen der Deutschen Tennisschule, anerkannt vom Deutschen
                Tennis Bund (DTB) und dem Verband Deutscher Tennislehrer (VDT).
              </p>
              <div className="dtb-features">
                <div className="dtb-feature">
                  <Award size={20} />
                  <span>Zertifizierte Trainer</span>
                </div>
                <div className="dtb-feature">
                  <Target size={20} />
                  <span>Qualitätsstandards</span>
                </div>
                <div className="dtb-feature">
                  <Users size={20} />
                  <span>Professionelle Ausbildung</span>
                </div>
              </div>
              <Link to="/dtb-vdt" className="btn btn-primary">
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
