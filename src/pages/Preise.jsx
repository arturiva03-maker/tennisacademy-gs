import { Link } from 'react-router-dom';
import { CalendarCheck, Users, CreditCard } from 'lucide-react';
import { AnimatedSection } from '../hooks/useScrollAnimation';

export default function Preise() {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>Preise und Angebote</h1>
          <p>Transparente Preisgestaltung für Ihr Tennistraining</p>
        </div>
      </section>

      <section className="preise-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">Trainingspreise pro Person / Stunde</h2>
              <p className="section-subtitle">
                Alle Preise verstehen sich pro Person und Trainingsstunde (60 Minuten).
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
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
                  <td><span className="preis-amount">48 €</span></td>
                  <td><span className="preis-amount">25 €</span></td>
                  <td><span className="preis-amount">18 €</span></td>
                  <td><span className="preis-amount">14 €</span></td>
                  <td><span className="preis-amount">11,60 €</span></td>
                  <td><span className="preis-amount">10 €</span></td>
                </tr>
                <tr>
                  <td className="trainer-cell">
                    <strong>B-Lizenz Trainer</strong>
                  </td>
                  <td><span className="preis-amount">56 €</span></td>
                  <td><span className="preis-amount">29 €</span></td>
                  <td><span className="preis-amount">20,67 €</span></td>
                  <td><span className="preis-amount">16 €</span></td>
                  <td><span className="preis-amount">13,20 €</span></td>
                  <td><span className="preis-amount">11,33 €</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="preis-info">
            <p>
              Die Tennis Academy Grand Slam bietet Training für alle Altersgruppen und Spielstärken an.
              Im Winter fallen zuzüglich Hallengebühren an.
            </p>
          </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="einstieg-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">So funktioniert dein Einstieg</h2>
            </div>
          </AnimatedSection>

          <div className="einstieg-steps">
            <AnimatedSection delay={0.1}>
              <div className="einstieg-step">
                <div className="step-icon">
                  <CalendarCheck size={32} />
                </div>
                <div className="step-number">1</div>
                <h3>Probestunden vereinbaren</h3>
                <p>
                  So lernen wir uns kennen und finden gemeinsam heraus, welche Trainingsform
                  am besten passt – ob Einzel- oder Gruppentraining.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="einstieg-step">
                <div className="step-icon">
                  <Users size={32} />
                </div>
                <div className="step-number">2</div>
                <h3>Training abstimmen</h3>
                <p>
                  Wir besprechen deinen Trainingsplan und stimmen Termine ab.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="einstieg-step">
                <div className="step-icon">
                  <CreditCard size={32} />
                </div>
                <div className="step-number">3</div>
                <h3>Vereinsmitglied werden</h3>
                <p>
                  Mit dem Start in das wöchentliche Training ist auch die Mitgliedschaft
                  in unserem Partnerverein verbunden. Diese ist Voraussetzung, um die
                  Vereinsanlagen und Tennisplätze zu nutzen.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="einstieg-hinweis">
            <p>
              Training ohne Vereinsmitgliedschaft ist nur in seltenen Ausnahmen möglich
              (z.B. Tenniscamp).
            </p>
          </div>

          <div className="einstieg-cta">
            <Link to="/kontakt" className="btn btn-primary btn-lg">
              Probetraining anfragen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
