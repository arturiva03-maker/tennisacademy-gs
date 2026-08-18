import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';

const T = {
  de: {
    brand:
      'Deutsche Tennisschule anerkannt von DTB/VDT. Professionelles Tennistraining für alle Altersgruppen und Spielstärken.',
    navigation: 'Navigation',
    home: 'Home',
    team: 'Trainerteam',
    prices: 'Preise und Angebote',
    more: 'Mehr',
    miniCup: 'Čujić-Mini-Cup',
    news: 'News & Events',
    contact: 'Kontakt',
    legal: 'Rechtliches',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    terms: 'AGB',
    partners: 'Unsere Partner',
    rights: 'Alle Rechte vorbehalten.',
  },
  en: {
    brand:
      'German tennis school accredited by DTB/VDT. Professional tennis coaching for all ages and skill levels.',
    navigation: 'Navigation',
    home: 'Home',
    team: 'Coaching Team',
    prices: 'Prices & Programs',
    more: 'More',
    miniCup: 'Čujić Mini Cup',
    news: 'News & Events',
    contact: 'Contact',
    legal: 'Legal',
    imprint: 'Legal Notice',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    partners: 'Our Partners',
    rights: 'All rights reserved.',
  },
};

export default function Footer() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>TENNIS ACADEMY GRAND SLAM</h3>
            <p>{t.brand}</p>
          </div>
          <div className="footer-links">
            <h4>{t.navigation}</h4>
            <ul>
              <li><Link to="/">{t.home}</Link></li>
              <li><Link to="/trainer">{t.team}</Link></li>
              <li><Link to="/preise">{t.prices}</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>{t.more}</h4>
            <ul>
              <li><Link to="/dtb-vdt">DTB/VDT</Link></li>
              <li><Link to="/mini-cup">{t.miniCup}</Link></li>
              <li><Link to="/news">{t.news}</Link></li>
              <li><Link to="/kontakt">{t.contact}</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>{t.legal}</h4>
            <ul>
              <li><Link to="/impressum">{t.imprint}</Link></li>
              <li><Link to="/datenschutz">{t.privacy}</Link></li>
              <li><Link to="/agb">{t.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-sponsors">
          <h4>{t.partners}</h4>
          <div className="sponsor-logos">
            <a href="https://www.bsv92-tennis.de" target="_blank" rel="noopener noreferrer">
              <img src="/sponsor-bsv92.png" alt="BSV 92 Tennisabteilung" loading="lazy" />
            </a>
            <a href="http://www.tennisshop-grandslam.de/Home/" target="_blank" rel="noopener noreferrer">
              <img src="/sponsor-grandslam.jpg" alt="Tennisshop Grand Slam" loading="lazy" />
            </a>
            <a href="https://www.dunlopsports.com" target="_blank" rel="noopener noreferrer">
              <img src="/sponsor-dunlop.jpg" alt="Dunlop Sport" loading="lazy" />
            </a>
            <a href="https://www.babolat.com" target="_blank" rel="noopener noreferrer">
              <img src="/sponsor-babolat.jpg" alt="Babolat" loading="lazy" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} TENNIS ACADEMY GRAND SLAM. {t.rights}
        </div>
      </div>
    </footer>
  );
}
