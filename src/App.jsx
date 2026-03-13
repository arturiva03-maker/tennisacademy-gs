import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Trainer from './pages/Trainer';
import Preise from './pages/Preise';
import KidsOnCourt from './pages/KidsOnCourt';
import DtbVdt from './pages/DtbVdt';
import News from './pages/News';
import Kontakt from './pages/Kontakt';
import Impressum from './pages/Impressum';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trainer" element={<Trainer />} />
          <Route path="/preise" element={<Preise />} />
          <Route path="/kids-on-court" element={<KidsOnCourt />} />
          <Route path="/dtb-vdt" element={<DtbVdt />} />
          <Route path="/news" element={<News />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/impressum" element={<Impressum />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
