import { ShieldCheck, BookOpen } from 'lucide-react';

export default function DtbVdt() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Deutsche Tennisschule</h1>
          <p>Anerkannt von DTB und VDT</p>
        </div>
      </section>

      <section className="dtb-section">
        <div className="container">
          <div className="dtb-banner">
            <div className="dtb-logo-container">
              <img src="/vdt-logo.png" alt="VDT - Verband Deutscher Tennislehrer" className="dtb-logo" />
            </div>
            <div className="dtb-banner-text">
              <h2>Qualität hat einen Namen</h2>
              <p>
                Die Tennisschule Grand Slam erfüllt alle fachlichen und organisatorischen
                Voraussetzungen der Deutschen Tennisschule, anerkannt vom Deutschen Tennis
                Bund (DTB) und dem Verband Deutscher Tennislehrer (VDT). Dieses Qualitätssiegel
                ist für unsere Kunden zu einem Markenzeichen geworden.
              </p>
            </div>
          </div>

          <div className="dtb-grid">
            <div className="dtb-card">
              <h3>
                <ShieldCheck size={20} />
                Fachliche Voraussetzungen
              </h3>
              <ul>
                <li>Mindestens zwei Lehrkräfte müssen ganzjährig in der Tennisschule tätig sein.</li>
                <li>Der Leiter / die Leiterin muss Mitglied im VDT sein.</li>
                <li>
                  Der Leiter / die Leiterin muss eine der folgenden Qualifikationen nachweisen:
                  Staatlich geprüfte/r Tennislehrer/in, VDT-Lizenzierte/r Tennislehrer/in,
                  DTB B- oder A-Trainer/in, oder Diplom-Trainer/in.
                </li>
                <li>Mindestens vierjährige hauptberufliche Tätigkeit als Tennislehrer/in ist nachzuweisen.</li>
                <li>
                  Alle weiteren Lehrer müssen eine gültige Lizenz des VDT oder DTB besitzen
                  oder sich in der Ausbildung befinden.
                </li>
                <li>
                  Der Unterricht ist nach den gültigen Richtlinien, Methoden und
                  Qualitätsstandards (Lehrplänen) des DTB und VDT zu erteilen.
                </li>
              </ul>
            </div>

            <div className="dtb-card">
              <h3>
                <BookOpen size={20} />
                Organisatorische Voraussetzungen
              </h3>
              <ul>
                <li>Die Tennisschule muss als Unternehmen geführt werden.</li>
                <li>
                  Die Tennisschule muss mittels eines Prospekts und einer Preisliste
                  ihre Leistungen anbieten.
                </li>
                <li>
                  Der Tennisunterricht muss auf mindestens zwei Plätzen ganzjährig
                  und wetterunabhängig durchführbar sein.
                </li>
                <li>
                  Der Tennisunterricht muss in angemessenem Rahmen über moderne
                  Hilfsmittel zur Unterrichtsgestaltung verfügen.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
