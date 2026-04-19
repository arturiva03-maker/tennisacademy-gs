import { useEffect, useRef } from 'react';
import { Calendar, Award, Target, Users, Crosshair, User, Baby, Sun } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import { events } from './News';
import ButtonWithIcon from '@/components/ui/button-with-icon';

const MARQUEE_ITEMS = [
  'DTB Anerkannt',
  'VDT Zertifiziert',
  'Berlin-Wilmersdorf',
  'B-Lizenz Trainer',
  'Kinder & Erwachsene',
  'Einzel & Gruppe',
  'Leistungsbereich',
  'Breitensport',
];

const BENTO = [
  {
    id: 'technik',
    label: 'Techniktraining',
    icon: Crosshair,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200',
    description: 'Systematisches Erlernen aller Schläge – von Vorhand bis Aufschlag.',
    gridClass: 'gs-bento-large',
  },
  {
    id: 'kinder',
    label: 'Kids on Court',
    icon: Baby,
    image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=800',
    description: 'Spielerisches Erlernen ab 4 Jahren.',
    gridClass: 'gs-bento-sm',
  },
  {
    id: 'einzel',
    label: 'Einzeltraining',
    icon: User,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=800',
    description: '1-auf-1 mit maximalem Fokus auf dein Spiel.',
    gridClass: 'gs-bento-sm',
  },
  {
    id: 'camp',
    label: 'Sommercamp',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1596463059283-da257325bab8?q=80&w=800',
    description: 'Intensive Trainingsblöcke in den Schulferien.',
    gridClass: 'gs-bento-sm gs-bento-dark',
  },
  {
    id: 'gruppe',
    label: 'Gruppentraining',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?q=80&w=1200',
    description: 'Motivation in der Gruppe – für alle Altersklassen und Spielstärken.',
    gridClass: 'gs-bento-wide',
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

function BentoCard({ card, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      className={`gs-bento-card ${card.gridClass}`}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="gs-bento-img-wrap">
        <img src={card.image} alt={card.label} className="gs-bento-img" loading="lazy" />
      </div>
      <div className="gs-bento-card-content">
        <div className="gs-bento-icon">
          <Icon size={16} />
        </div>
        <div>
          <h3 className="gs-bento-card-title">{card.label}</h3>
          <p className="gs-bento-card-desc">{card.description}</p>
        </div>
      </div>
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

      {/* BENTO GRID */}
      <section className="gs-bento-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">Unser Angebot</h2>
              <p className="section-subtitle">
                Von der Technik bis zur Taktik – wir begleiten dich auf deinem Tennisweg.
              </p>
            </div>
          </AnimatedSection>
          <div className="gs-bento-grid">
            {BENTO.map((card, i) => (
              <BentoCard key={card.id} card={card} index={i} />
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
