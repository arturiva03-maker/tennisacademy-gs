import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';

const T = {
  de: {
    code: '404',
    call: 'Aus!',
    title: 'Ball im Aus',
    text: 'Diese Seite haben wir nicht gefunden – der Ball ist hinter der Grundlinie gelandet. Zurück ins Feld:',
    home: 'Zur Startseite',
    links: [
      { to: '/trainer', label: 'Trainerteam' },
      { to: '/preise', label: 'Preise' },
      { to: '/tenniscamps', label: 'Tenniscamps' },
      { to: '/kontakt', label: 'Kontakt' },
    ],
  },
  en: {
    code: '404',
    call: 'Out!',
    title: 'Ball out of bounds',
    text: 'We couldn’t find this page – the ball landed behind the baseline. Back into play:',
    home: 'Go to homepage',
    links: [
      { to: '/trainer', label: 'Coaching Team' },
      { to: '/preise', label: 'Prices' },
      { to: '/tenniscamps', label: 'Tennis Camps' },
      { to: '/kontakt', label: 'Contact' },
    ],
  },
};

export default function NotFound() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="notfound">
      <div className="container notfound-inner">
        <span className="notfound-call">{t.call}</span>
        <span className="notfound-code">{t.code}</span>
        <h1 className="notfound-title">{t.title}</h1>
        <p className="notfound-text">{t.text}</p>
        <Link to="/" className="notfound-home">{t.home}</Link>
        <nav className="notfound-links" aria-label={lang === 'de' ? 'Beliebte Seiten' : 'Popular pages'}>
          {t.links.map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
