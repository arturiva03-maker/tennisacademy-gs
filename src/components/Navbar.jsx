import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/trainer', label: 'Trainer' },
  { path: '/preise', label: 'Preise' },
  { path: '/kids-on-court', label: 'Unsere Kleinsten' },
  { path: '/tenniscamps', label: 'Camps' },
  { path: '/dtb-vdt', label: 'DTB/VDT' },
  { path: '/news', label: 'News' },
  { path: '/kontakt', label: 'Kontakt' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="Tennis Academy Grand Slam" className="nav-logo-img" />
            <span>Tennis Academy Grand Slam</span>
          </Link>
          <ul className="nav-links">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={isActive ? 'active' : ''}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      <div
        id="mobile-nav"
        className={`mobile-nav ${mobileOpen ? 'open' : ''}`}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={isActive ? 'active' : ''}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
