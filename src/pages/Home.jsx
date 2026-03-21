import { Link } from 'react-router-dom';
import { Award, Target, Users, Calendar } from 'lucide-react';
import { useEffect } from 'react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import { events } from './News';
import { FeatureCarousel } from '@/components/ui/feature-carousel';
import ButtonWithIcon from '@/components/ui/button-with-icon';

function TennisNewsWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tennis.de/content/dam/services/news-widget/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div id="tennis-news-widget" data-tenant="dtb" data-design="modern"></div>
  );
}

export default function Home() {
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
              <ButtonWithIcon href="/preise">
                Preise ansehen
              </ButtonWithIcon>
              <ButtonWithIcon href="/trainer" variant="outline">
                Unser Team
              </ButtonWithIcon>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES CAROUSEL */}
      <section className="features">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">Unser Angebot für dich</h2>
              <p className="section-subtitle">
                Von der Technik bis zur Taktik, vom Kinderprogramm bis zum Leistungstraining
                – wir begleiten dich auf deinem Tennisweg.
              </p>
            </div>
          </AnimatedSection>
          <FeatureCarousel />
        </div>
      </section>

      {/* LATEST NEWS */}
      {events[0] && (
        <section className="latest-news-section">
          <div className="container">
            <AnimatedSection>
              <div className="section-header">
                <h2 className="section-title">Aktuelles</h2>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="news-card">
                <div className="news-card-image">
                  <img src={events[0].image} alt={events[0].title} />
                </div>
                <div className="news-card-content">
                  <h2>{events[0].title}</h2>
                  <p className="news-card-subtitle">{events[0].subtitle}</p>
                  <div className="news-card-meta">
                    <span><Calendar size={16} /> {events[0].date}</span>
                  </div>
                  {events[0].description.split('\n\n').map((paragraph, j) => (
                    <p className="news-card-text" key={j}>{paragraph}</p>
                  ))}
                  {events[0].cta && (
                    <div style={{ marginTop: '20px' }}>
                      <ButtonWithIcon href={events[0].cta.link}>
                        {events[0].cta.label}
                      </ButtonWithIcon>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

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
                <ButtonWithIcon href="/dtb-vdt">
                  Mehr erfahren
                </ButtonWithIcon>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* TENNIS.DE NEWS */}
      <section className="tennis-news-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">Tennis News</h2>
              <p className="section-subtitle">
                Aktuelle Nachrichten aus der Tenniswelt via tennis.de
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <TennisNewsWidget />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
