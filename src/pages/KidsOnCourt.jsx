import { useState } from 'react';
import { Activity, Target, Trophy, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import { useLang } from '../i18n/LanguageContext';

const galleryImages = Array.from({ length: 18 }, (_, i) => `/kids-gallery/img${i + 1}.jpg`);
const galleryVideos = Array.from({ length: 12 }, (_, i) => `/kids-gallery/vid${i + 1}.mp4`);
const winterrundeImages = Array.from({ length: 4 }, (_, i) => `/kids-gallery/winterrunde${i + 1}.jpg`);

const T = {
  de: {
    heroTitle: 'Unsere Kleinsten',
    heroSub: 'Tennis für Kinder ab 3 Jahren',
    ageBadge: 'Für Kinder ab 3 Jahren',
    splitTitle: 'Tennis für unsere Kleinsten',
    splitP1:
      'Vielleicht erinnerst du dich daran, in welchem Alter du mit dem Tennis begonnen hast und denkst dabei: „Viel zu spät!". Heute bieten wir schon Kindern ab 3 Jahren die Möglichkeit, unseren schönen Sport spielerisch zu entdecken.',
    splitP2:
      'Tennis ist ein koordinativ sehr anspruchsvoller Sport und daher ist gerade die Technik für Kinder eher schwer zu erlernen. Wichtig ist in diesem Alter, die Grundvoraussetzungen für das spätere Erlernen einer guten Tennis-Technik zu schaffen.',
    card1Title: 'Koordination & Bewegung',
    card1Text:
      'Dazu gehören die verschiedenen Laufarten (vorwärts, rückwärts, Side-Steps, Hopserlauf, etc.), eine intensive und ausgeprägte Ball-Schule sowie die Schulung sämtlicher koordinativer Fähigkeiten wie Gleichgewicht, Orientierung, Rhythmik, Differenzierung und Reaktion.',
    card2Title: 'Tennis-Technik',
    card2Text:
      'Je nach Lernalter steigert sich der zeitliche Anteil des reinen Tennis-Trainings. Dabei werden nach und nach alle Schläge erlernt: Vorhand, Rückhand, Volley, Aufschlag und sogar der Schmetterball.',
    card3Title: 'Unser Ziel',
    card3Text:
      'Unser großes Ziel ist es, dass die Kinder lernen Tennis zu spielen, einen gesunden Ehrgeiz entwickeln und dabei viel Spaß haben.',
    card4Title: 'Events & Highlights',
    card4Text:
      'Regelmäßige Tests, das große Weihnachtstennis als Jahresabschluss und die beliebten Tenniscamps in den Sommerferien, bei denen Kinder neue Spielpartner und Freunde kennenlernen.',
    winterTitle: 'U8 Winterrunde – Mini-Tennis in Berlin',
    winterQ1: 'Was ist die Winterrunde?',
    winterA1:
      'Der Tennis-Verband Berlin-Brandenburg (TVBB) bietet jede Wintersaison monatliche Spieltage der Mini-Tennisrunde U8 für die Jüngsten im Verbandsgebiet an.',
    winterQ2: 'Wer darf mitspielen?',
    winterA2:
      'Spielberechtigt sind alle Kinder der Altersklasse U8 (Jahrgang 2018 und jünger), die einem Berliner Tennisverein angehören. Die Kids spielen altersgerecht im Kleinfeld mit den passenden Methodikbällen.',
    winterQ3: 'Spielformat',
    winterA3a:
      'Kleinfeldtennis ist eine altersgerechte Vorbereitung auf das reguläre Tennis. Durch die Verkleinerung des Spielfeldes und Verwendung eines weichen Methodikballes (Stage 3, rot) wird das Entwicklungsstadium der Kinder berücksichtigt und frühzeitig Erfolgserlebnisse ermöglicht. Neben Tennis-Einzel und Doppel finden zusätzlich Motorikübungen statt, die koordinative und konditionelle Fähigkeiten fördern.',
    winterA3b:
      'Ein wichtiger Bestandteil ist das Erlernen der Zählweise – einschließlich Tiebreak und Match-Tiebreak – unter Anleitung von Schiedsrichtern, die die Kinder durch die Matches begleiten.',
    winterQ4: 'Der nächste Schritt: Midcourt',
    winterA4a:
      'Nach der U8 folgt der Wechsel auf den Midcourt. Hier spielen die Kinder auf einem vergrößerten Feld und übernehmen deutlich mehr Eigenverantwortung: Sie müssen selbstständig erkennen, ob ein Ball gut oder aus ist, und die Zählweise eigenständig anwenden. Begleitet werden die Matches lediglich von einem Spielleiter – ein wichtiger Schritt in der Entwicklung zur Selbstständigkeit auf dem Platz.',
    winterA4b:
      'Im Midcourt-Bereich werden auch die ersten taktischen Elemente erlernt sowie die Variation des Schlägerimpulses: Den Ball weicher und sicher spielen oder härter und gefährlicher – je nach Spielsituation.',
    winterAlt: 'U8 Winterrunde',
    impressionsTitle: 'Impressionen',
    impressionsSub: 'Eindrücke aus unserem Programm für die Kleinsten',
    photos: 'Fotos',
    videos: 'Videos',
    galleryAria: 'Galerie',
    galleryClose: 'Galerie schließen',
    prevImage: 'Vorheriges Bild',
    nextImage: 'Nächstes Bild',
  },
  en: {
    heroTitle: 'Our Youngest Players',
    heroSub: 'Tennis for children from age 3',
    ageBadge: 'For children from age 3',
    splitTitle: 'Tennis for Our Youngest',
    splitP1:
      'Maybe you remember the age at which you started playing tennis and think: "Far too late!". Today we give children as young as 3 the chance to discover our beautiful sport through play.',
    splitP2:
      'Tennis is a highly demanding sport in terms of coordination, which makes the technique quite hard for children to learn. At this age, the key is to build the foundations for learning good tennis technique later on.',
    card1Title: 'Coordination & Movement',
    card1Text:
      'This includes different types of running (forwards, backwards, side steps, skipping, etc.), an intensive ball school, and training of all coordination skills such as balance, orientation, rhythm, differentiation and reaction.',
    card2Title: 'Tennis Technique',
    card2Text:
      'Depending on the learning age, the share of pure tennis training gradually increases. Step by step, all strokes are learned: forehand, backhand, volley, serve and even the smash.',
    card3Title: 'Our Goal',
    card3Text:
      'Our big goal is for the children to learn to play tennis, develop healthy ambition and have lots of fun along the way.',
    card4Title: 'Events & Highlights',
    card4Text:
      'Regular skill tests, the big Christmas tennis event at the end of the year, and the popular tennis camps during the summer holidays, where children meet new playing partners and friends.',
    winterTitle: 'U8 Winter Series – Mini Tennis in Berlin',
    winterQ1: 'What is the winter series?',
    winterA1:
      'Every winter season, the Berlin-Brandenburg Tennis Federation (TVBB) offers monthly match days of the U8 mini tennis series for the youngest players in the region.',
    winterQ2: 'Who can play?',
    winterA2:
      'All children in the U8 age group (born 2018 or later) who belong to a Berlin tennis club are eligible. The kids play age-appropriate tennis on a small court with suitable methodology balls.',
    winterQ3: 'Match format',
    winterA3a:
      'Small-court tennis is an age-appropriate preparation for regular tennis. The smaller court and the soft methodology ball (stage 3, red) take the children’s stage of development into account and allow early experiences of success. In addition to singles and doubles, there are motor-skill exercises that develop coordination and fitness.',
    winterA3b:
      'An important part is learning how to keep score – including tiebreak and match tiebreak – guided by umpires who accompany the children through their matches.',
    winterQ4: 'The next step: midcourt',
    winterA4a:
      'After U8, players move on to the midcourt. Here the children play on a larger court and take on much more responsibility: they have to judge for themselves whether a ball is in or out and keep score on their own. Matches are only supervised by a match director – an important step towards independence on court.',
    winterA4b:
      'On the midcourt, the first tactical elements are introduced, along with varying racquet impulse: playing the ball softer and safer, or harder and more aggressively – depending on the match situation.',
    winterAlt: 'U8 winter series',
    impressionsTitle: 'Impressions',
    impressionsSub: 'Snapshots from our programme for the youngest',
    photos: 'Photos',
    videos: 'Videos',
    galleryAria: 'Gallery',
    galleryClose: 'Close gallery',
    prevImage: 'Previous image',
    nextImage: 'Next image',
  },
};

export default function KidsOnCourt() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { lang } = useLang();
  const t = T[lang];

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <>
      <section className="hero hero-kids">
        <div className="hero-content">
          <div className="hero-text" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="hero-title-large">
              {t.heroTitle}
            </h1>
            <p className="hero-subtitle">
              {t.heroSub}
            </p>
          </div>
        </div>
      </section>

      <section className="kids-section">
        <div className="container">
          <AnimatedSection>
            <div className="kids-split">
              <div className="kids-split-image">
                <img src="/kids-gallery/img1.jpg" alt="Kids on Court Training" loading="lazy" />
              </div>
              <div className="kids-split-text">
                <div className="age-badge">
                  {t.ageBadge}
                </div>
                <h2>{t.splitTitle}</h2>
                <p>{t.splitP1}</p>
                <p>{t.splitP2}</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flip-cards-grid">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <Activity size={48} />
                    <h3>{t.card1Title}</h3>
                  </div>
                  <div className="flip-card-back">
                    <p>{t.card1Text}</p>
                  </div>
                </div>
              </div>

              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <Target size={48} />
                    <h3>{t.card2Title}</h3>
                  </div>
                  <div className="flip-card-back">
                    <p>{t.card2Text}</p>
                  </div>
                </div>
              </div>

              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <Trophy size={48} />
                    <h3>{t.card3Title}</h3>
                  </div>
                  <div className="flip-card-back">
                    <p>{t.card3Text}</p>
                  </div>
                </div>
              </div>

              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <Calendar size={48} />
                    <h3>{t.card4Title}</h3>
                  </div>
                  <div className="flip-card-back">
                    <p>{t.card4Text}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="winterrunde-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">{t.winterTitle}</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="winterrunde-content">
              <div className="winterrunde-text">
                <h3>{t.winterQ1}</h3>
                <p>{t.winterA1}</p>

                <h3>{t.winterQ2}</h3>
                <p>{t.winterA2}</p>

                <h3>{t.winterQ3}</h3>
                <p>{t.winterA3a}</p>
                <p>{t.winterA3b}</p>

                <h3>{t.winterQ4}</h3>
                <p>{t.winterA4a}</p>
                <p>{t.winterA4b}</p>
              </div>

              <div className="winterrunde-gallery">
                {winterrundeImages.map((src, i) => (
                  <div className="winterrunde-gallery-item" key={i}>
                    <img src={src} alt={`${t.winterAlt} ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="media-gallery-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">{t.impressionsTitle}</h2>
              <p className="section-subtitle">{t.impressionsSub}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h3 className="gallery-subtitle">{t.photos}</h3>
            <div className="media-gallery">
              {galleryImages.map((src, i) => (
                <div className="media-gallery-item" key={i} onClick={() => openLightbox(i)}>
                  <img src={src} alt={`Kids on Court ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h3 className="gallery-subtitle">{t.videos}</h3>
            <div className="video-gallery">
              {galleryVideos.map((src, i) => (
                <div className="video-gallery-item" key={i}>
                  <video autoPlay muted loop playsInline>
                    <source src={src} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {lightboxOpen && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t.galleryAria}
        >
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label={t.galleryClose}
          >
            <X size={32} />
          </button>
          <button
            className="lightbox-prev"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label={t.prevImage}
          >
            <ChevronLeft size={40} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[currentImage]} alt={`Kids on Court ${currentImage + 1}`} />
          </div>
          <button
            className="lightbox-next"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label={t.nextImage}
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  );
}
