import { AnimatedSection } from '../hooks/useScrollAnimation';

const galleryImages = Array.from({ length: 18 }, (_, i) => `/kids-gallery/img${i + 1}.jpg`);
const galleryVideos = Array.from({ length: 12 }, (_, i) => `/kids-gallery/vid${i + 1}.mp4`);
const winterrundeImages = Array.from({ length: 4 }, (_, i) => `/kids-gallery/winterrunde${i + 1}.jpg`);

export default function KidsOnCourt() {
  return (
    <>
      <section className="hero hero-kids">
        <div className="hero-content">
          <div className="hero-text" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div className="hero-badge-large">
              Ab 4 Jahren
            </div>
            <h1 className="hero-title-large">
              Kids on Court
            </h1>
            <p className="hero-subtitle">
              Tennis für Kinder ab 4 Jahren
            </p>
          </div>
        </div>
      </section>

      <section className="kids-section">
        <div className="container">
          <AnimatedSection>
            <div className="kids-split">
              <div className="kids-split-image">
                <img src="/kids-2.jpg" alt="Kinder beim Lauftraining" />
              </div>
              <div className="kids-split-text">
                <div className="age-badge">
                  Für Kinder ab 4 Jahren
                </div>
                <h2>Was bedeutet Kids on Court?</h2>
                <p>
                  Vielleicht erinnern Sie sich daran, in welchem Alter Sie mit dem Tennis begonnen haben
                  und denken dabei: „Viel zu spät!". Heute bieten wir schon Kindern im Alter von 4 Jahren
                  die Möglichkeit, unseren schönen Sport zu erlernen – eben bei Kids on Court.
                </p>
                <p>
                  Tennis ist ein koordinativ sehr anspruchsvoller Sport und daher ist gerade die Technik
                  für Kinder eher schwer zu erlernen. Wichtig ist in diesem Alter, die Grundvoraussetzungen
                  für das spätere Erlernen einer guten Tennis-Technik zu schaffen.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="kids-content">
              <h3>Koordination & Bewegung</h3>
              <p>
                Dazu gehören die verschiedenen Laufarten (vorwärts, rückwärts, Side-Steps, Hopserlauf, etc.),
                eine intensive und ausgeprägte Ball-Schule sowie die Schulung sämtlicher koordinativer
                Fähigkeiten wie Gleichgewicht, Orientierung, Rhythmik, Differenzierung und Reaktion.
                Spielerisch und vor allem mit viel Spaß und Freude an der Bewegung werden diese
                Trainingsinhalte ständig geübt und verbessert.
              </p>

              <h3>Tennis-Technik</h3>
              <p>
                Natürlich kommt auch das spezifische Tennis-Training nicht zu kurz: Je nach Lernalter
                steigert sich der zeitliche Anteil des reinen Tennis-Trainings im Unterricht. Dabei
                werden nach und nach alle Schläge erlernt: Vorhand, Rückhand, Volley, Aufschlag und
                sogar der Schmetterball.
              </p>

              <h3>Unser Ziel</h3>
              <p>
                Unser großes Ziel ist es, dass die Kinder lernen Tennis zu spielen, einen gesunden
                Ehrgeiz entwickeln und dabei viel Spaß haben.
              </p>

              <h3>Events & Highlights</h3>
              <p>
                Neben allem ernsthaften Training steht bei uns aber auch immer der Spaß im Vordergrund:
                Regelmäßig stattfindende Tests sowie das große Weihnachtstennis als Jahresabschluss
                gehören ebenso zu unserem Angebot wie die beliebten Tenniscamps in den Sommerferien,
                bei denen Kinder neue Spielpartner und Freunde kennenlernen.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="winterrunde-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">U8 Winterrunde</h2>
              <p className="section-subtitle">Mini-Tennis in Berlin</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="winterrunde-content">
              <div className="winterrunde-text">
                <h3>Was ist die Winterrunde?</h3>
                <p>
                  Über den Winter bietet der Tennis-Verband Berlin-Brandenburg (TVBB) monatlich
                  eine Mini-Tennisrunde U8 für die Jüngsten im Verbandsgebiet an. Die Winterrunde
                  der Mini-Tennis-Runde U8 findet zum Start des neuen Jahres statt.
                </p>

                <h3>Wer darf mitspielen?</h3>
                <p>
                  Spielberechtigt sind alle Kinder der Altersklasse U8 (Jahrgang 2018 und jünger),
                  die einem Berliner Tennisverein angehören. Die Kids spielen altersgerecht im
                  Kleinfeld mit den passenden Methodikbällen.
                </p>

                <h3>Spielformat</h3>
                <p>
                  Kleinfeldtennis ist eine altersgerechte Vorbereitung auf das reguläre Tennis.
                  Durch die Verkleinerung des Spielfeldes und Verwendung eines weichen Methodikballes
                  wird das Entwicklungsstadium der Kinder berücksichtigt und es werden frühzeitig
                  Erfolgserlebnisse erreicht. Im Mannschaftswettbewerb lernen die Kinder soziale
                  Aspekte wie Teamgeist, Fair Play und positives Verhalten.
                </p>
                <p>
                  Gespielt wird auf dem Kleinfeld mit Stage-3-Bällen (rot, 75 % langsamer).
                  Neben Tennis-Einzel und Doppel finden zusätzlich Motorikübungen statt,
                  die koordinative und konditionelle Fähigkeiten der Kinder fördern.
                </p>
              </div>

              <div className="winterrunde-gallery">
                {winterrundeImages.map((src, i) => (
                  <div className="winterrunde-gallery-item" key={i}>
                    <img src={src} alt={`U8 Winterrunde ${i + 1}`} loading="lazy" />
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
              <h2 className="section-title">Impressionen</h2>
              <p className="section-subtitle">
                Eindrücke aus unserem Kids on Court Programm
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h3 className="gallery-subtitle">Fotos</h3>
            <div className="media-gallery">
              {galleryImages.map((src, i) => (
                <div className="media-gallery-item" key={i}>
                  <img src={src} alt={`Kids on Court ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h3 className="gallery-subtitle">Videos</h3>
            <div className="video-gallery">
              {galleryVideos.map((src, i) => (
                <div className="video-gallery-item" key={i}>
                  <video controls preload="metadata">
                    <source src={src} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
