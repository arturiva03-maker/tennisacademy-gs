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
    video: '/ballschule.mp4',
    videoEndTime: 7,
  },
  {
    id: 'kids',
    age: '5–8 Jahre',
    title: 'Kids on Court',
    description:
      'Entwicklung einer stabilen Schlagform sowie erste strategische Übungen.',
    image: '/yari.jpeg',
    portrait: true,
  },
  {
    id: 'jugend',
    age: '8–18 Jahre',
    title: 'Kinder- und Jugendtraining',
    description:
      'Je nach Spielstärke Einteilung in Gruppen oder individuelles Einzeltraining.',
    image: '/offer-jugend-2.jpg',
  },
  {
    id: 'camp',
    age: 'Sommerferien',
    title: 'Sommercamps',
    description:
      'Halbtägige Betreuung mit viel Sport und Verpflegung.',
    image: '/sc1.jpeg',
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

function TimelineItem({ offering, index }) {
  const align = index % 2 === 0 ? 'left' : 'right';
  const hasSplit = Array.isArray(offering.images) && offering.images.length >= 2;
  const hasVideo = Boolean(offering.video);
  const handleVideoTimeUpdate = (e) => {
    if (offering.videoEndTime && e.currentTarget.currentTime >= offering.videoEndTime) {
      e.currentTarget.currentTime = 0;
      e.currentTarget.play();
    }
  };
  return (
    <li className={`gs-timeline-item gs-timeline-item--${align}`}>
      <div className="gs-timeline-marker" aria-hidden="true" />
      <article className="gs-timeline-card">
        <div className={`gs-timeline-card-media${offering.portrait ? ' gs-timeline-card-media--portrait' : ''}`}>
          {hasVideo ? (
            <video
              src={`${offering.video}#t=0,${offering.videoEndTime || ''}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onTimeUpdate={handleVideoTimeUpdate}
            />
          ) : hasSplit ? (
            <div className="gs-timeline-card-imgs" aria-hidden="true">
              {offering.images.slice(0, 2).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                />
              ))}
            </div>
          ) : (
            <img
              src={offering.image}
              alt=""
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
            />
          )}
        </div>
        <div className="gs-timeline-card-body">
          <span className="gs-timeline-age">{offering.age}</span>
          <h3 className="gs-timeline-title">{offering.title}</h3>
          <p className="gs-timeline-desc">{offering.description}</p>
        </div>
      </article>
    </li>
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
              TENNIS ACADEMY
              <br />
              <em>GRAND SLAM</em>
            </motion.h1>

            <motion.p
              className="gs-hero-sub"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
              }}
            >
              Professionelles Training für alle Spielklassen und Altersgruppen –
              von der Ballschule bis zum Wettkampftraining.
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

            <motion.a
              href="/tenniscamp-anmeldung"
              className="gs-hero-camp-board"
              aria-label="Tenniscamp Sommerferien 2026 — zur Anmeldung"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.15 } },
              }}
            >
              <div className="gs-hero-camp-board-head">
                <span className="gs-hero-camp-board-eyebrow">Tenniscamp · Sommerferien 2026</span>
              </div>
              <div className="gs-hero-camp-board-rows">
                <div className="gs-hero-camp-board-row">
                  <span className="gs-hero-camp-board-week">Woche 1</span>
                  <span className="gs-hero-camp-board-dates">Mo 13.07. – Fr 17.07.</span>
                </div>
                <div className="gs-hero-camp-board-row">
                  <span className="gs-hero-camp-board-week">Woche 6</span>
                  <span className="gs-hero-camp-board-dates">Mo 10.08. – Fr 14.08.</span>
                </div>
                <div className="gs-hero-camp-board-row">
                  <span className="gs-hero-camp-board-week">Woche 7</span>
                  <span className="gs-hero-camp-board-dates">Mo 17.08. – Fr 21.08.</span>
                </div>
              </div>
              <div className="gs-hero-camp-board-foot">
                <span className="gs-hero-camp-board-meta">BSV 92 · Mo – Fr · 9:30 – 15:00</span>
                <span className="gs-hero-camp-board-cta">Zur Anmeldung →</span>
              </div>
            </motion.a>
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
                Von ersten koordinativen Übungen bis zum Wettkampfvorbereitungstraining –
                wir begleiten dich Schritt für Schritt in deinem Tennisleben.
              </p>
            </div>
          </AnimatedSection>
        </div>
        <div className="container">
          <ol className="gs-timeline">
            {OFFERINGS.map((offering, i) => (
              <TimelineItem key={offering.id} offering={offering} index={i} />
            ))}
          </ol>
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
                  Unsere TENNIS ACADEMY GRAND SLAM erfüllt die fachlichen und organisatorischen
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
