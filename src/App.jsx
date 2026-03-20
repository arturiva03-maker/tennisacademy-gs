import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ComingSoon from './components/ComingSoon';
import Home from './pages/Home';
import Trainer from './pages/Trainer';
import Preise from './pages/Preise';
import KidsOnCourt from './pages/KidsOnCourt';
import DtbVdt from './pages/DtbVdt';
import News from './pages/News';
import Kontakt from './pages/Kontakt';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import Tenniscamps from './pages/Tenniscamps';

const PREVIEW_KEY = 'gs2026';

function usePreviewAccess() {
  const [hasAccess, setHasAccess] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('preview_access') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('preview') === PREVIEW_KEY) {
      localStorage.setItem('preview_access', 'true');
      setHasAccess(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return hasAccess;
}

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
      <Route path="/tenniscamps" element={<Tenniscamps />} />
    </Routes>
  );
}

function App() {
  const hasAccess = usePreviewAccess();

  if (!hasAccess) {
    return <ComingSoon />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <AnimatedRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
