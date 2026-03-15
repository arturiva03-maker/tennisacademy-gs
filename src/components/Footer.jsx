import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Tennis Academy Grand Slam</h3>
            <p>
              Deutsche Tennisschule anerkannt von DTB/VDT. Professionelles
              Tennistraining für alle Altersgruppen und Spielstärken.
            </p>
          </div>
          <div className="footer-links">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/trainer">Trainerteam</Link></li>
              <li><Link to="/preise">Preise und Angebote</Link></li>
              <li><Link to="/kids-on-court">Kids on Court</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Mehr</h4>
            <ul>
              <li><Link to="/dtb-vdt">DTB/VDT</Link></li>
              <li><Link to="/news">News & Events</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Rechtliches</h4>
            <ul>
              <li><Link to="/impressum">Impressum</Link></li>
              <li><Link to="/datenschutz">Datenschutz</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-sponsors">
          <h4>Unsere Partner</h4>
          <div className="sponsor-logos">
            <a href="https://www.tennisshop-grandslam.de" target="_blank" rel="noopener noreferrer">
              <img src="/sponsor-grandslam.jpg" alt="Tennisshop Grand Slam" />
            </a>
            <a href="https://www.dunlopsports.com" target="_blank" rel="noopener noreferrer">
              <img src="/sponsor-dunlop.jpg" alt="Dunlop Sport" />
            </a>
            <a href="https://www.babolat.com" target="_blank" rel="noopener noreferrer">
              <img src="/sponsor-babolat.jpg" alt="Babolat" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Tennis Academy Grand Slam. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
