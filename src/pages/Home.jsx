import { Link } from 'react-router-dom';
import { Award, Target, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { AnimatedSection } from '../hooks/useScrollAnimation';

const features = [
  {
    title: 'Techniktraining',
    text: 'Systematisches Erlernen und Verfeinern aller Schläge: Vorhand, Rückhand, Volley, Aufschlag und Schmetterball. Vom Technikerwerbstraining bis zur Anwendung in Spielsituationen.',
  },
  {
    title: 'Taktiktraining',
    text: 'Spielverständnis entwickeln und taktische Entscheidungen trainieren. Standardsituationen meistern, Spielzüge automatisieren und den Gegner lesen lernen.',
  },
  {
    title: 'Gruppentraining',
    text: 'Spaß und Motivation in der Gruppe. Wettkampf untereinander, verschiedene Spieltypen kennenlernen und voneinander profitieren. Ideal für Kinder, Jugendliche und Erwachsene.',
  },
  {
    title: 'Einzeltraining',
    text: '100% individuelle Betreuung durch Ihren Trainer. Gezielte Technikarbeit, persönlich abgestimmte Trainingsinhalte und maximale Aufmerksamkeit für Ihre Entwicklung.',
  },
  {
    title: 'Athletik & Kondition',
    text: 'Die athletische Basis für erfolgreiches Tennis: Beinarbeit, Koordination, Schnelligkeit und Ausdauer. Komplextraining, das Technik und Fitness verbindet.',
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
              DTB/VDT anerkannte Tennis Academy
            </div>
            <h1 className="hero-title-large">
              Tennis Academy<br />
              <span>Grand Slam</span>
            </h1>
            <p className="hero-subtitle">
              Wir, Michael Lingner, Jana Hladká-Kissal, Zlatan Palazov und Artur Ivanenko, haben uns der Förderung
              des Jugendsports verschrieben – im Breiten- sowie im Leistungsbereich.
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
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">Unser Angebot für Sie</h2>
              <p className="section-subtitle">
                Von der Technik bis zur Taktik, vom Kinderprogramm bis zum Leistungstraining
                – wir begleiten Sie auf Ihrem Tennisweg.
              </p>
            </div>
          </AnimatedSection>

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
          <AnimatedSection animation="scale">
            <div className="dtb-quality-seal">
              <div className="dtb-logo-container">
                <img src="/vdt-dtb-logo.jpg" alt="Deutsche Tennisschule - anerkannt von DTB und VDT" className="dtb-logo" />
              </div>
              <div className="dtb-content">
                <h2>Deutsche Tennisschule</h2>
                <p>
                  Unsere Tennis Academy erfüllt die fachlichen und organisatorischen
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
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
