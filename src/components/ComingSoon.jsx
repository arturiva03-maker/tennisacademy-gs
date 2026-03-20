export default function ComingSoon() {
  return (
    <div className="coming-soon">
      <div className="coming-soon-content">
        <img src="/logo.png" alt="Tennis Academy Grand Slam – Tennisschule Berlin" className="coming-soon-logo" />
        <h1>Tennis Academy Grand Slam</h1>
        <p className="coming-soon-tagline">Ihre neue Tennisschule in Berlin</p>
        <p>Unsere Website wird gerade fertiggestellt.</p>

        <div className="coming-soon-features">
          <div className="coming-soon-feature">
            <strong>DTB/VDT anerkannt</strong>
            <span>Zertifizierte Deutsche Tennisschule</span>
          </div>
          <div className="coming-soon-feature">
            <strong>Alle Altersgruppen</strong>
            <span>Kids on Court ab 4 Jahren bis Erwachsene</span>
          </div>
          <div className="coming-soon-feature">
            <strong>Einzel- & Gruppentraining</strong>
            <span>Breiten- und Leistungssport</span>
          </div>
        </div>

        <div className="coming-soon-contact">
          <p>Bei Fragen erreichst du uns unter:</p>
          <a href="mailto:info@tennisacademy-gs.de">info@tennisacademy-gs.de</a>
          <address className="coming-soon-address">
            Trainingsort: BSV 92 – Fritz-Wildung-Str. 23, 14199 Berlin
          </address>
        </div>
      </div>
    </div>
  );
}
