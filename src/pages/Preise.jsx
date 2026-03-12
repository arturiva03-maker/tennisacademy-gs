const priceCategories = [
  {
    title: 'Training bei einem C-Lizenz Trainer',
    sub: 'Tennisschule Grand Slam',
    highlight: false,
    prices: [
      { type: 'Einzeltraining', price: '48 €' },
      { type: '2er Gruppe', price: '50 €' },
      { type: '3er Gruppe', price: '52 €' },
      { type: '4er Gruppe', price: '54 €' },
      { type: '5er Gruppe', price: '56 €' },
      { type: '6er Gruppe', price: '58 €' },
    ],
  },
  {
    title: 'Training bei einem B-Lizenz Trainer',
    sub: 'Tennisschule Grand Slam',
    highlight: false,
    prices: [
      { type: 'Einzeltraining', price: '54 €' },
      { type: '2er Gruppe', price: '56 €' },
      { type: '3er Gruppe', price: '58 €' },
      { type: '4er Gruppe', price: '60 €' },
      { type: '5er Gruppe', price: '62 €' },
      { type: '6er Gruppe', price: '64 €' },
    ],
  },
  {
    title: 'Training bei Michael Lingner',
    sub: 'A-Trainer · Leitung der Tennisschule',
    highlight: true,
    prices: [
      { type: 'Einzeltraining', price: '62 €' },
      { type: '2er Gruppe', price: '64 €' },
      { type: '3er Gruppe', price: '66 €' },
      { type: '4er Gruppe', price: '68 €' },
    ],
  },
  {
    title: 'Training bei Jana, Zlatan oder Artur',
    sub: 'B-Trainer',
    highlight: true,
    prices: [
      { type: 'Einzeltraining', price: '58 €' },
      { type: '2er Gruppe', price: '60 €' },
      { type: '3er Gruppe', price: '62 €' },
      { type: '4er Gruppe', price: '64 €' },
    ],
  },
];

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
            <div className="section-tag">Unsere Preise</div>
            <h2 className="section-title">Trainingspreise pro Stunde</h2>
            <p className="section-subtitle">
              Alle Preise verstehen sich pro Trainingsstunde. Der Preis bezieht sich auf die gesamte
              Gruppe, nicht pro Person.
            </p>
          </div>
          <div className="preise-grid">
            {priceCategories.map((cat, i) => (
              <div className="preis-category" key={i}>
                <div className={`preis-category-header ${cat.highlight ? 'highlight' : ''}`}>
                  <h3>{cat.title}</h3>
                  <div className="preis-sub">{cat.sub}</div>
                </div>
                <table className="preis-table">
                  <thead>
                    <tr>
                      <th>Trainingsart</th>
                      <th>Preis / Stunde</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.prices.map((p, j) => (
                      <tr key={j}>
                        <td>{p.type}</td>
                        <td><span className="preis-amount">{p.price}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
