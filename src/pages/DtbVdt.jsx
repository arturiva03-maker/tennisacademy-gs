import { ShieldCheck, BookOpen } from 'lucide-react';
import { AnimatedSection } from '../hooks/useScrollAnimation';
import { useLang } from '../i18n/LanguageContext';

const T = {
  de: {
    heroTitle: 'Deutsche Tennisschule',
    heroSub: 'Anerkannt von DTB und VDT',
    bannerTitle: 'Qualität hat einen Namen',
    bannerText:
      'Die TENNIS ACADEMY GRAND SLAM erfüllt alle fachlichen und organisatorischen Voraussetzungen der Deutschen Tennisschule, anerkannt vom Deutschen Tennis Bund (DTB) und dem Verband Deutscher Tennislehrer (VDT). Dieses Qualitätssiegel ist für unsere Kunden zu einem Markenzeichen geworden.',
    profTitle: 'Fachliche Voraussetzungen',
    profItems: [
      'Mindestens zwei Lehrkräfte müssen ganzjährig in der Tennisschule tätig sein.',
      'Der Leiter / die Leiterin muss Mitglied im VDT sein.',
      'Der Leiter / die Leiterin muss eine der folgenden Qualifikationen nachweisen: Staatlich geprüfte/r Tennislehrer/in, VDT-Lizenzierte/r Tennislehrer/in, DTB B- oder A-Trainer/in, oder Diplom-Trainer/in.',
      'Mindestens vierjährige hauptberufliche Tätigkeit als Tennislehrer/in ist nachzuweisen.',
      'Alle weiteren Lehrer müssen eine gültige Lizenz des VDT oder DTB besitzen oder sich in der Ausbildung befinden.',
      'Der Unterricht ist nach den gültigen Richtlinien, Methoden und Qualitätsstandards (Lehrplänen) des DTB und VDT zu erteilen.',
    ],
    orgTitle: 'Organisatorische Voraussetzungen',
    orgItems: [
      'Die Tennisschule muss als Unternehmen geführt werden.',
      'Die Tennisschule muss mittels eines Prospekts und einer Preisliste ihre Leistungen anbieten.',
      'Der Tennisunterricht muss auf mindestens zwei Plätzen ganzjährig und wetterunabhängig durchführbar sein.',
      'Der Tennisunterricht muss in angemessenem Rahmen über moderne Hilfsmittel zur Unterrichtsgestaltung verfügen.',
    ],
  },
  en: {
    heroTitle: 'German Tennis School',
    heroSub: 'Accredited by DTB and VDT',
    bannerTitle: 'Quality Has a Name',
    bannerText:
      'TENNIS ACADEMY GRAND SLAM meets all professional and organisational requirements of the German Tennis School, accredited by the German Tennis Federation (DTB) and the Association of German Tennis Coaches (VDT). This seal of quality has become a trademark for our customers.',
    profTitle: 'Professional Requirements',
    profItems: [
      'At least two coaches must work at the tennis school year-round.',
      'The head of the school must be a member of the VDT.',
      'The head of the school must hold one of the following qualifications: state-certified tennis coach, VDT-licensed tennis coach, DTB B or A coach, or diploma coach.',
      'At least four years of full-time work as a tennis coach must be demonstrated.',
      'All other coaches must hold a valid VDT or DTB licence or be in training.',
      'Lessons must be taught according to the current guidelines, methods and quality standards (curricula) of the DTB and VDT.',
    ],
    orgTitle: 'Organisational Requirements',
    orgItems: [
      'The tennis school must be run as a business.',
      'The tennis school must offer its services by means of a brochure and a price list.',
      'Tennis lessons must be possible on at least two courts year-round, regardless of the weather.',
      'Tennis lessons must be adequately equipped with modern teaching aids.',
    ],
  },
};

export default function DtbVdt() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/neues%20hero.jpeg')" }}>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSub}</p>
        </div>
      </section>

      <section className="dtb-section">
        <div className="container">
          <AnimatedSection>
            <div className="dtb-banner">
              <div className="dtb-logo-container">
                <img src="/vdt-dtb-logo.jpg" alt="Deutsche Tennisschule - anerkannt von DTB und VDT" className="dtb-logo" loading="lazy" />
              </div>
              <div className="dtb-banner-text">
                <h2>{t.bannerTitle}</h2>
                <p>{t.bannerText}</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="dtb-grid">
            <AnimatedSection delay={0.1}>
              <div className="dtb-card">
                <h3>
                  <ShieldCheck size={20} />
                  {t.profTitle}
                </h3>
                <ul>
                  {t.profItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="dtb-card">
                <h3>
                  <BookOpen size={20} />
                  {t.orgTitle}
                </h3>
                <ul>
                  {t.orgItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
