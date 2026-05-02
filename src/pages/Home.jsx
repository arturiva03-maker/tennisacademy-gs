import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award, Target, Users, ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import { events } from './News';
import ButtonWithIcon from '@/components/ui/button-with-icon';

const MARQUEE_ITEMS = [
  'Jugendtraining',
  'Tenniscamps',
  'DTB-zertifizierte Trainer',
];

const OFFERINGS = [
  {
    id: 'technik',
    tag: 'Schlagtechnik',
    label: 'Technik',
    titleAccent: 'training',
    description:
      'Systematisches Erlernen aller Schläge – von Vorhand und Rückhand bis zum Aufschlag und Volley.',
    href: '/preise',
  },
  {
    id: 'kinder',
    tag: 'Ab 4 Jahren',
    label: 'Kids',
    titleAccent: 'on Court',
    description:
      'Spielerisches Erlernen nach DTB-Methodik. Koordination, Ballgefühl und Spaß im Mittelpunkt.',
    href: '/kids-on-court',
  },
  {
    id: 'einzel',
    tag: '1-auf-1',
    label: 'Einzel',
    titleAccent: 'training',
    description:
      'Individuelles Coaching mit maximalem Fokus. Persönliche Trainingsziele und schnelle Fortschritte.',
    href: '/preise',
  },
  {
    id: 'camp',
    tag: 'Schulferien',
    label: 'Sommer',
    titleAccent: 'camp',
    description:
      'Intensive Trainingsblöcke während der Schulferien – mehrere Stunden täglich auf dem Platz.',
    href: '/tenniscamps',
  },
  {
    id: 'gruppe',
    tag: 'Alle Spielstärken',
    label: 'Gruppen',
    titleAccent: 'training',
    description:
      'Motivation in der Gruppe – für alle Altersklassen und Spielstärken in 2er- bis 6er-Gruppen.',
    href: '/preise',
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

function OfferingRow({ offering, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`gs-offer-row-wrap${isLast ? ' is-last' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link to={offering.href} className="gs-offer-row" aria-label={`${offering.label} ${offering.titleAccent}`}>
        <div className="gs-offer-meta">
          <span className="gs-offer-tag">{offering.tag}</span>
        </div>
        <div className="gs-offer-body">
          <h3 className="gs-offer-title">
            {offering.label} <em>{offering.titleAccent}</em>
          </h3>
          <p className="gs-offer-desc">{offering.description}</p>
        </div>
        <span className="gs-offer-arrow" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </Link>
    </motion.div>
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
              DTB / VDT anerkannte Tennis Academy &nbsp;·&nbsp; Berlin-Wilmersdorf
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

        <div className="gs-hero-scroll">
          <motion.div
            className="gs-scroll-line"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <div className="gs-marquee-wrap">
        <div className="gs-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="gs-marquee-item">
              {item}
              <span className="gs-marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* OFFERINGS — EDITORIAL STACK */}
      <section className="gs-offer-section">
        <div className="container">
          <AnimatedSection>
            <div className="gs-offer-header">
              <span className="gs-offer-eyebrow">Was wir anbieten</span>
              <h2 className="gs-offer-headline">
                Unser <em>Angebot</em>
              </h2>
              <p className="gs-offer-intro">
                Von der ersten Schlagtechnik bis zum taktischen Feinschliff –
                wir begleiten dich auf jedem Schritt deines Tennisweges.
              </p>
            </div>
          </AnimatedSection>
          <div className="gs-offer-stack">
            {OFFERINGS.map((offering, i) => (
              <OfferingRow
                key={offering.id}
                offering={offering}
                index={i}
                isLast={i === OFFERINGS.length - 1}
              />
            ))}
          </div>
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
