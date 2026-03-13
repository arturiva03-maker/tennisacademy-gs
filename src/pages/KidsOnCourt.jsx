export default function KidsOnCourt() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Kids on Court</h1>
          <p>Tennis für Kinder ab 4 Jahren</p>
        </div>
      </section>

      <section className="kids-section">
        <div className="container">
          <div className="kids-hero">
            <div className="age-badge">
              Für Kinder ab 4 Jahren
            </div>
            <h2>Was bedeutet Kids on Court?</h2>
            <p>
              Vielleicht erinnern Sie sich daran, in welchem Alter Sie mit dem Tennis begonnen haben
              und denken dabei: „Viel zu spät!". Heute bieten wir schon Kindern im Alter von 4 Jahren
              die Möglichkeit, unseren schönen Sport zu erlernen – eben bei Kids on Court.
            </p>
            <p style={{ marginTop: '16px' }}>
              Tennis ist ein koordinativ sehr anspruchsvoller Sport und daher ist gerade die Technik
              für Kinder eher schwer zu erlernen. Wichtig ist in diesem Alter, die Grundvoraussetzungen
              für das spätere Erlernen einer guten Tennis-Technik zu schaffen.
            </p>
          </div>

          <div className="kids-gallery">
            <div className="kids-gallery-item">
              <img src="/kids-1.jpg" alt="Kids on Court Gruppenfoto" />
            </div>
            <div className="kids-gallery-item">
              <img src="/kids-2.jpg" alt="Kinder beim Lauftraining" />
            </div>
            <div className="kids-gallery-item">
              <img src="/kids-3.jpg" alt="Tennis-Training mit Trainerin" />
            </div>
          </div>

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
        </div>
      </section>
    </>
  );
}
