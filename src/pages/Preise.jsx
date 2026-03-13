export default function Preise() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Preise</h1>
          <p>Transparente Preisgestaltung für Ihr Tennistraining</p>
        </div>
      </section>

      <section className="preise-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trainingspreise pro Person / Stunde</h2>
            <p className="section-subtitle">
              Alle Preise verstehen sich pro Person und Trainingsstunde (60 Minuten).
            </p>
          </div>

          <div className="preis-table-container">
            <table className="preis-table-full">
              <thead>
                <tr>
                  <th>Trainer</th>
                  <th>Einzel</th>
                  <th>2er Gruppe</th>
                  <th>3er Gruppe</th>
                  <th>4er Gruppe</th>
                  <th>5er Gruppe</th>
                  <th>6er Gruppe</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="trainer-cell">
                    <strong>C-Lizenz Trainer</strong>
                  </td>
                  <td><span className="preis-amount">48,00 €</span></td>
                  <td><span className="preis-amount">25,00 €</span></td>
                  <td><span className="preis-amount">17,33 €</span></td>
                  <td><span className="preis-amount">13,50 €</span></td>
                  <td><span className="preis-amount">11,20 €</span></td>
                  <td><span className="preis-amount">9,67 €</span></td>
                </tr>
                <tr>
                  <td className="trainer-cell">
                    <strong>B-Lizenz Trainer</strong>
                  </td>
                  <td><span className="preis-amount">54,00 €</span></td>
                  <td><span className="preis-amount">28,00 €</span></td>
                  <td><span className="preis-amount">19,33 €</span></td>
                  <td><span className="preis-amount">15,00 €</span></td>
                  <td><span className="preis-amount">12,40 €</span></td>
                  <td><span className="preis-amount">10,67 €</span></td>
                </tr>
                <tr className="highlight-row">
                  <td className="trainer-cell">
                    <strong>Michael Lingner</strong>
                    <span className="trainer-badge-inline">A-Trainer</span>
                  </td>
                  <td><span className="preis-amount">62,00 €</span></td>
                  <td><span className="preis-amount">32,00 €</span></td>
                  <td><span className="preis-amount">22,00 €</span></td>
                  <td><span className="preis-amount">17,00 €</span></td>
                  <td className="not-available">–</td>
                  <td className="not-available">–</td>
                </tr>
                <tr className="highlight-row">
                  <td className="trainer-cell">
                    <strong>Jana und Artur</strong>
                    <span className="trainer-badge-inline">B-Trainer</span>
                  </td>
                  <td><span className="preis-amount">58,00 €</span></td>
                  <td><span className="preis-amount">30,00 €</span></td>
                  <td><span className="preis-amount">20,67 €</span></td>
                  <td><span className="preis-amount">16,00 €</span></td>
                  <td className="not-available">–</td>
                  <td className="not-available">–</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="preis-info">
            <p>
              Die Tennis Academy Grand Slam bietet Training für alle Altersgruppen und Spielstärken.
              Gruppentraining ist besonders für Kinder und Einsteiger empfehlenswert.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
