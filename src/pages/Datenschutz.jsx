export default function Datenschutz() {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>Datenschutzerklärung</h1>
        </div>
      </section>

      <section className="legal-section">
        <div className="container">
          <div className="legal-content">
            <h2>1. Verantwortlicher</h2>
            <p>
              <strong>Tennis Academy Grand Slam GbR</strong><br />
              Buschkrugallee 54, 12359 Berlin<br />
              E-Mail: info@tennisacademy-gs.de
            </p>

            <h2>2. Erhobene Daten</h2>
            <p>Bei Nutzung unserer Dienste erheben wir folgende Daten:</p>
            <ul>
              <li><strong>Kontaktformular:</strong> Name, E-Mail, Telefon, Betreff, Nachricht</li>
              <li><strong>Technische Daten:</strong> IP-Adresse, Browsertyp, Zugriffszeit (durch Hosting-Anbieter)</li>
            </ul>

            <h2>3. Zweck und Rechtsgrundlage</h2>
            <p>
              Wir verarbeiten Ihre Daten zur Durchführung von Trainingsanfragen (Art. 6 Abs. 1 lit. b DSGVO –
              Vertragserfüllung) sowie zur Kontaktaufnahme (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse).
            </p>

            <h2>4. Empfänger und Drittanbieter</h2>
            <ul>
              <li><strong>Vercel Inc.</strong> (Hosting, USA – EU-Standardvertragsklauseln)</li>
              <li><strong>EmailJS</strong> (E-Mail-Versand des Kontaktformulars)</li>
              <li><strong>IONOS SE</strong> (E-Mail-Server, Deutschland)</li>
            </ul>

            <h2>5. Speicherdauer</h2>
            <p>
              Ihre Daten werden gespeichert, solange die Geschäftsbeziehung besteht oder gesetzliche
              Aufbewahrungsfristen gelten. Anfragen werden nach Bearbeitung maximal 3 Jahre aufbewahrt.
            </p>

            <h2>6. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Datenübertragbarkeit und Widerspruch. Kontaktieren Sie uns unter info@tennisacademy-gs.de.
            </p>

            <h2>7. Beschwerderecht</h2>
            <p>
              Sie haben das Recht, sich bei der zuständigen Datenschutz-Aufsichtsbehörde zu beschweren
              (Berliner Beauftragte für Datenschutz und Informationsfreiheit).
            </p>

            <h2>8. SSL-Verschlüsselung</h2>
            <p>
              Diese Website nutzt HTTPS für eine sichere Datenübertragung.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
