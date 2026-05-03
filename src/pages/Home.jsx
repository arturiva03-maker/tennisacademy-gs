import { useEffect } from 'react';
import { Calendar, Award, Target, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import { events } from './News';
import ButtonWithIcon from '@/components/ui/button-with-icon';

const OFFERINGS = [
  {
    id: 'mini',
    age: '3–5 Jahre',
    title: 'Mini Tennis – Ballschule',
    description:
      'Entwicklung der koordinativen Fähigkeiten und Erlernen erster Schlagtechniken.',
    image: '/offer-mini.jpg',
  },
  {
    id: 'kids',
    age: '5–8 Jahre',
    title: 'Kids on Court',
    description:
      'Entwicklung einer stabilen Schlagform sowie erste strategische Übungen.',
    image: '/offer-kids.jpg',
  },
  {
    id: 'jugend',
    age: '8–18 Jahre',
    title: 'Kinder- und Jugendtraining',
    description:
      'Je nach Spielstärke Einteilung in Gruppen oder individuelles Einzeltraining.',
    image: '/offer-jugend.jpg',
  },
  {
    id: 'camp',
    age: 'Sommerferien',
    title: 'Sommercamps',
    description:
      'Halbtägige Betreuung mit viel Sport und Verpflegung.',
    image: '/offer-camp.jpg',
  },
];

function TennisNewsWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tennis.de/content/dam/services/news-widget/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);
  return <div id="tennis-news-widget" data-tenant="dtb" data-design="modern" />;
}

function OfferingHero({ offering, index, total }) {
  const align = index % 2 === 0 ? 'left' : 'right';
  return (
    <article className={`gs-offer-hero gs-offer-hero--${align}`}>
      <img
        src={offering.image}
        alt=""
        className="gs-offer-hero-img"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.opacity = '0';
        }}
      />
      <div className="gs-offer-hero-overlay" aria-hidden="true" />
      <div className="container">
        <div className="gs-offer-hero-content">
          <span className="gs-offer-hero-num">
            {String(index + 1).padStart(2, '0')} <span aria-hidden="true">/</span>{' '}
            {String(total).padStart(2, '0')}
          </span>
          <span className="gs-offer-hero-age">{offering.age}</span>
          <h3 className="gs-offer-hero-title">{offering.title}</h3>
          <p className="gs-offer-hero-desc">{offering.description}</p>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      {/* CINEMATIC HERO */}
      <section className="gs-hero">
        <div className="gs-hero-bg" />
        <div className="gs-hero-overlay" />
        <div className="gs-hero-inner container">
          <motion.div
            className="gs-hero-content"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.13 } },
            }}
          >
            <motion.p
              className="gs-hero-kicker"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
            >
              DTB / VDT anerkannte Tennisschule &nbsp;·&nbsp; Berlin-Wilmersdorf
            </motion.p>

            <motion.h1
              className="gs-hero-title"
              variants={{
                hidden: { opacity: 0, y: 44 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              Tennis Academy
              <br />
              <em>Grand Slam</em>
            </motion.h1>

            <motion.p
              className="gs-hero-sub"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
              }}
            >
              Professionelles Training für alle Spielklassen und Altersgruppen –
              von der Grundschule bis zum Leistungsspieler.
            </motion.p>

            <motion.div
              className="gs-hero-cta"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
              }}
            >
              <ButtonWithIcon href="/preise" onDark>
                Preise ansehen
              </ButtonWithIcon>
              <ButtonWithIcon href="/trainer" variant="outline" onDark>
                Unser Team
              </ButtonWithIcon>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* OFFERINGS — IMMERSIVE HERO ROWS */}
      <section className="gs-offer-section">
        <div className="container">
          <AnimatedSection>
            <div className="gs-offer-header">
              <h2 className="gs-offer-headline">Unser Angebot</h2>
              <p className="gs-offer-intro">
                Von der ersten Schlagtechnik bis zum taktischen Feinschliff –
                wir begleiten dich auf jedem Schritt deines Tennisweges.
              </p>
            </div>
          </AnimatedSection>
        </div>
        <div className="gs-offer-rows">
          {OFFERINGS.map((offering, i) => (
            <AnimatedSection key={offering.id} delay={i * 0.05}>
              <OfferingHero
                offering={offering}
                index={i}
                total={OFFERINGS.length}
              />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* AKTUELLES */}
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
                  <img src={events[0].image} alt={events[0].title} loading="lazy" />
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

      {/* DTB/VDT QUALITÄTSSIEGEL */}
      <section className="dtb-section">
        <div className="container">
          <AnimatedSection animation="scale">
            <div className="dtb-quality-seal">
              <div className="dtb-logo-container">
                <img
                  src="/vdt-dtb-logo.jpg"
                  alt="Deutsche Tennisschule – anerkannt von DTB und VDT"
                  className="dtb-logo"
                  loading="lazy"
                />
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
                <ButtonWithIcon href="/dtb-vdt">Mehr erfahren</ButtonWithIcon>
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
