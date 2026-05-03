import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>TENNIS ACADEMY GRAND SLAM</h3>
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
              <li><Link to="/agb">AGB</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-sponsors">
          <h4>Unsere Partner</h4>
          <div className="sponsor-logos">
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
          &copy; {new Date().getFullYear()} TENNIS ACADEMY GRAND SLAM. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
