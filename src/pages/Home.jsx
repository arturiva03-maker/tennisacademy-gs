import { useEffect } from 'react';
import { Calendar, Award, Target, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import { eventsByLang } from './News';
import ButtonWithIcon from '@/components/ui/button-with-icon';
import { useLang } from '../i18n/LanguageContext';

const OFFERINGS = {
  de: [
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
  ],
  en: [
    {
      id: 'mini',
      age: 'Ages 3–5',
      title: 'Mini Tennis – Ball School',
      description:
        'Developing coordination skills and learning the first stroke techniques.',
      video: '/ballschule.mp4',
      videoEndTime: 7,
    },
    {
      id: 'kids',
      age: 'Ages 5–8',
      title: 'Kids on Court',
      description:
        'Developing a stable stroke technique along with first strategic exercises.',
      image: '/yari.jpeg',
      portrait: true,
    },
    {
      id: 'jugend',
      age: 'Ages 8–18',
      title: 'Youth Training',
      description:
        'Group placement by skill level or individual one-on-one coaching.',
      image: '/offer-jugend-2.jpg',
    },
    {
      id: 'camp',
      age: 'Summer holidays',
      title: 'Summer Camps',
      description:
        'Half-day programme with plenty of sport, lunch and drinks.',
      image: '/sc1.jpeg',
    },
  ],
};

const T = {
  de: {
    kicker: 'DTB / VDT anerkannte Tennisschule  ·  Berlin-Wilmersdorf',
    heroSub:
      'Professionelles Training für alle Spielklassen und Altersgruppen – von der Ballschule bis zum Wettkampftraining.',
    ctaPrices: 'Preise ansehen',
    ctaTeam: 'Unser Team',
    campBoardAria: 'Tenniscamp Sommerferien 2026 — zur Anmeldung',
    campBoardEyebrow: 'Tenniscamp · Sommerferien 2026',
    campWeek: 'Woche',
    campMeta: 'BSV 92 · Mo – Fr · 9:30 – 15:00',
    campCta: 'Zur Anmeldung →',
    offerHeadline: 'Unser Angebot',
    offerIntro:
      'Von ersten koordinativen Übungen bis zum Wettkampfvorbereitungstraining – wir begleiten dich Schritt für Schritt in deinem Tennisleben.',
    latestNews: 'Aktuelles',
    dtbTitle: 'Deutsche Tennisschule',
    dtbText:
      'Unsere TENNIS ACADEMY GRAND SLAM erfüllt die fachlichen und organisatorischen Voraussetzungen der Deutschen Tennisschule, anerkannt vom Deutschen Tennis Bund (DTB) und dem Verband Deutscher Tennislehrer (VDT).',
    dtbFeature1: 'Zertifizierte Trainer',
    dtbFeature2: 'Qualitätsstandards',
    dtbFeature3: 'Professionelle Ausbildung',
    dtbMore: 'Mehr erfahren',
    tennisNews: 'Tennis News',
    tennisNewsSub: 'Aktuelle Nachrichten aus der Tenniswelt via tennis.de',
  },
  en: {
    kicker: 'DTB / VDT accredited tennis school  ·  Berlin-Wilmersdorf',
    heroSub:
      'Professional coaching for all levels and age groups – from ball school to competitive training.',
    ctaPrices: 'View prices',
    ctaTeam: 'Our team',
    campBoardAria: 'Tennis camp summer holidays 2026 — go to registration',
    campBoardEyebrow: 'Tennis Camp · Summer Holidays 2026',
    campWeek: 'Week',
    campMeta: 'BSV 92 · Mon – Fri · 9:30 am – 3:00 pm',
    campCta: 'Register now →',
    offerHeadline: 'What We Offer',
    offerIntro:
      'From first coordination exercises to competition preparation – we guide you step by step through your tennis journey.',
    latestNews: 'Latest News',
    dtbTitle: 'German Tennis School',
    dtbText:
      'Our TENNIS ACADEMY GRAND SLAM meets the professional and organisational requirements of the German Tennis School, accredited by the German Tennis Federation (DTB) and the Association of German Tennis Coaches (VDT).',
    dtbFeature1: 'Certified coaches',
    dtbFeature2: 'Quality standards',
    dtbFeature3: 'Professional education',
    dtbMore: 'Learn more',
    tennisNews: 'Tennis News',
    tennisNewsSub: 'Latest news from the tennis world via tennis.de',
  },
};

function TennisNewsWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tennis.de/content/dam/services/news-widget/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);
  return (
    <div className="tennis-news-frame">
      <div id="tennis-news-widget" data-tenant="dtb" data-design="modern" />
    </div>
  );
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
  const { lang } = useLang();
  const t = T[lang];
  const offerings = OFFERINGS[lang];
  const events = eventsByLang[lang];

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
              {t.kicker}
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
              {t.heroSub}
            </motion.p>

            <motion.div
              className="gs-hero-cta"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
              }}
            >
              <ButtonWithIcon href="/preise" onDark>
                {t.ctaPrices}
              </ButtonWithIcon>
              <ButtonWithIcon href="/trainer" variant="outline" onDark>
                {t.ctaTeam}
              </ButtonWithIcon>
            </motion.div>

            <motion.a
              href="/tenniscamp-anmeldung"
              className="gs-hero-camp-board"
              aria-label={t.campBoardAria}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.15 } },
              }}
            >
              <div className="gs-hero-camp-board-head">
                <span className="gs-hero-camp-board-eyebrow">{t.campBoardEyebrow}</span>
              </div>
              <div className="gs-hero-camp-board-rows">
                <div className="gs-hero-camp-board-row">
                  <span className="gs-hero-camp-board-week">{t.campWeek} 5</span>
                  <span className="gs-hero-camp-board-dates">10.08. – 14.08.2026</span>
                </div>
                <div className="gs-hero-camp-board-row">
                  <span className="gs-hero-camp-board-week">{t.campWeek} 6</span>
                  <span className="gs-hero-camp-board-dates">17.08. – 21.08.2026</span>
                </div>
              </div>
              <div className="gs-hero-camp-board-foot">
                <span className="gs-hero-camp-board-meta">{t.campMeta}</span>
                <span className="gs-hero-camp-board-cta">{t.campCta}</span>
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
              <h2 className="gs-offer-headline">{t.offerHeadline}</h2>
              <p className="gs-offer-intro">{t.offerIntro}</p>
            </div>
          </AnimatedSection>
        </div>
        <div className="container">
          <ol className="gs-timeline">
            {offerings.map((offering, i) => (
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
                <h2 className="section-title">{t.latestNews}</h2>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="gold-frame">
              <div className="news-card">
                <div className={`news-card-image${events[0].image.endsWith('.png') ? ' news-card-image--logo' : ''}`}>
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
                <h2>{t.dtbTitle}</h2>
                <p>{t.dtbText}</p>
                <div className="dtb-features">
                  <div className="dtb-feature">
                    <Award size={20} />
                    <span>{t.dtbFeature1}</span>
                  </div>
                  <div className="dtb-feature">
                    <Target size={20} />
                    <span>{t.dtbFeature2}</span>
                  </div>
                  <div className="dtb-feature">
                    <Users size={20} />
                    <span>{t.dtbFeature3}</span>
                  </div>
                </div>
                <ButtonWithIcon href="/dtb-vdt">{t.dtbMore}</ButtonWithIcon>
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
              <h2 className="section-title">{t.tennisNews}</h2>
              <p className="section-subtitle">{t.tennisNewsSub}</p>
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
