import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'siteLang';

const LanguageContext = createContext({
  lang: 'de',
  setLang: () => {},
});

const readStoredLang = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' ? 'en' : 'de';
  } catch {
    return 'de';
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* Storage nicht verfügbar – Sprache gilt nur für die Sitzung */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
