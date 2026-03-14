export default function Impressum() {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>Impressum</h1>
        </div>
      </section>

      <section className="legal-section">
        <div className="container">
          <div className="legal-content">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              <strong>Tennis Academy Grand Slam GbR</strong><br />
              Buschkrugallee 54<br />
              12359 Berlin
            </p>

            <h3>Vertreten durch</h3>
            <p>
              Michael Lingner<br />
              Jana Hladká-Kissal<br />
              Zlatan Palazov<br />
              Artur Ivanenko
            </p>

            <h3>Kontakt</h3>
            <p>
              Telefon: 030 / 606 10 55<br />
              E-Mail: info@tennisacademy-gs.de
            </p>

          </div>
        </div>
      </section>
    </>
  );
}
