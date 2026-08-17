import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { LanguageProvider } from './i18n/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DocumentMeta from './components/DocumentMeta';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Trainer from './pages/Trainer';
import Preise from './pages/Preise';
import KidsOnCourt from './pages/KidsOnCourt';
import DtbVdt from './pages/DtbVdt';
import News from './pages/News';
import Kontakt from './pages/Kontakt';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AGB from './pages/AGB';
import AgbTenniscamp from './pages/AgbTenniscamp';
import Tenniscamps from './pages/Tenniscamps';
// Die Camp-Anmeldung ist ausser Betrieb — TenniscampAnmeldung.jsx bleibt fuer
// die naechste Saison liegen, wird aber bewusst nicht mehr eingebunden.

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trainer" element={<Trainer />} />
      <Route path="/preise" element={<Preise />} />
      <Route path="/kids-on-court" element={<KidsOnCourt />} />
      <Route path="/dtb-vdt" element={<DtbVdt />} />
      <Route path="/news" element={<News />} />
      <Route path="/kontakt" element={<Kontakt />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
      <Route path="/agb" element={<AGB />} />
      <Route path="/agb-tenniscamp" element={<AgbTenniscamp />} />
      <Route path="/tenniscamps" element={<Tenniscamps />} />
      {/* Alte Flyer- und Google-Links sollen nicht ins Leere laufen. */}
      <Route path="/tenniscamp-anmeldung" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollToTop />
          <DocumentMeta />
          <Navbar />
          <main className="main-content">
            <AnimatedRoutes />
          </main>
          <Footer />
        </BrowserRouter>
      </MotionConfig>
    </LanguageProvider>
  );
}

export default App;
