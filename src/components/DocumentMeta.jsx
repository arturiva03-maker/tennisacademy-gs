import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';

const BRAND = 'TENNIS ACADEMY GRAND SLAM';
const SITE = 'https://www.tennisacademy-gs.de';
const DEFAULT_IMG = '/neues%20hero.jpeg';

// Pro Route ein eigener Tab-Titel + Meta-Description + Canonical + Vorschaubild.
// Vorher trug jede Seite den Tenniscamp-Titel und meldete per Canonical, sie sei
// die Tenniscamp-Seite — schlecht fuer Tabs, Lesezeichen und Google.
const META = {
  '/': {
    img: '/neues%20hero.jpeg',
    de: {
      title: `${BRAND} · Tennisschule Berlin-Wilmersdorf`,
      desc: 'DTB/VDT-anerkannte Tennisschule in Berlin-Wilmersdorf. Professionelles Training für alle Alters- und Spielklassen – von der Ballschule bis zum Wettkampf.',
    },
    en: {
      title: `${BRAND} · Tennis School Berlin`,
      desc: 'DTB/VDT-accredited tennis school in Berlin-Wilmersdorf. Professional coaching for all ages and levels – from ball school to competition.',
    },
  },
  '/trainer': {
    img: '/trainer-team.jpg',
    de: { title: `Trainerteam · ${BRAND}`, desc: 'Unser lizenziertes Trainerteam: A- und B-Lizenz, ehemalige Profispieler, langjährige Wettkampferfahrung.' },
    en: { title: `Coaching Team · ${BRAND}`, desc: 'Our licensed coaching team: A and B licences, former pro players, years of competitive experience.' },
  },
  '/preise': {
    img: '/header_tarife.jpg',
    de: { title: `Preise & Angebote · ${BRAND}`, desc: 'Faire, transparente Trainingspreise – vom Einzeltraining bis zur 6er Gruppe. Alle Preise pro Person und Stunde.' },
    en: { title: `Prices & Programs · ${BRAND}`, desc: 'Fair, transparent training prices – from private lessons to groups of six. All prices per person and hour.' },
  },
  '/kids-on-court': {
    img: '/kids-hero.jpg',
    de: { title: `Kids on Court · ${BRAND}`, desc: 'Tennis für Kinder ab 3 Jahren: Ballschule, Kids on Court und Kinder- und Jugendtraining.' },
    en: { title: `Kids on Court · ${BRAND}`, desc: 'Tennis for children from age 3: ball school, Kids on Court and youth training.' },
  },
  '/dtb-vdt': {
    img: '/vdt-dtb-logo.jpg',
    de: { title: `Deutsche Tennisschule (DTB/VDT) · ${BRAND}`, desc: 'Anerkannt vom Deutschen Tennis Bund (DTB) und dem Verband Deutscher Tennislehrer (VDT) – seit 2008.' },
    en: { title: `German Tennis School (DTB/VDT) · ${BRAND}`, desc: 'Accredited by the German Tennis Federation (DTB) and the Association of German Tennis Coaches (VDT) – since 2008.' },
  },
  '/news': {
    img: '/cujic-cup.jpg',
    de: { title: `News & Events · ${BRAND}`, desc: 'Neuigkeiten und Veranstaltungen der TENNIS ACADEMY GRAND SLAM.' },
    en: { title: `News & Events · ${BRAND}`, desc: 'News and events from TENNIS ACADEMY GRAND SLAM.' },
  },
  '/kontakt': {
    de: { title: `Kontakt · ${BRAND}`, desc: 'Fragen zu unserem Trainingsangebot? Schreib uns – wir freuen uns auf deine Nachricht.' },
    en: { title: `Contact · ${BRAND}`, desc: 'Questions about our training programmes? Write to us – we look forward to your message.' },
  },
  '/tenniscamps': {
    img: '/tenniscamp.jpg',
    de: { title: `Tenniscamps · ${BRAND}`, desc: 'Impressionen aus den Tenniscamps der TENNIS ACADEMY GRAND SLAM auf der Anlage des BSV 92 in Berlin.' },
    en: { title: `Tennis Camps · ${BRAND}`, desc: 'Impressions from the tennis camps of TENNIS ACADEMY GRAND SLAM at the BSV 92 grounds in Berlin.' },
  },
  '/impressum': {
    de: { title: `Impressum · ${BRAND}`, desc: 'Impressum der TENNIS ACADEMY GRAND SLAM.' },
    en: { title: `Legal Notice · ${BRAND}`, desc: 'Legal notice of TENNIS ACADEMY GRAND SLAM.' },
  },
  '/datenschutz': {
    de: { title: `Datenschutz · ${BRAND}`, desc: 'Datenschutzerklärung der TENNIS ACADEMY GRAND SLAM.' },
    en: { title: `Privacy Policy · ${BRAND}`, desc: 'Privacy policy of TENNIS ACADEMY GRAND SLAM.' },
  },
  '/agb': {
    de: { title: `AGB · ${BRAND}`, desc: 'Allgemeine Geschäftsbedingungen der TENNIS ACADEMY GRAND SLAM.' },
    en: { title: `Terms & Conditions · ${BRAND}`, desc: 'Terms and conditions of TENNIS ACADEMY GRAND SLAM.' },
  },
  '/agb-tenniscamp': {
    de: { title: `AGB Tenniscamps · ${BRAND}`, desc: 'Allgemeine Geschäftsbedingungen für die Tenniscamps der TENNIS ACADEMY GRAND SLAM.' },
    en: { title: `Camp Terms · ${BRAND}`, desc: 'Terms and conditions for the tennis camps of TENNIS ACADEMY GRAND SLAM.' },
  },
};

const FALLBACK = {
  de: { title: BRAND, desc: 'DTB/VDT-anerkannte Tennisschule in Berlin-Wilmersdorf.' },
  en: { title: BRAND, desc: 'DTB/VDT-accredited tennis school in Berlin-Wilmersdorf.' },
};

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function DocumentMeta() {
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const route = META[pathname];
    const entry = (route || FALLBACK)[lang];
    // Trailing Slash abschneiden, damit /preise/ und /preise nicht als zwei
    // Seiten gezaehlt werden.
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
    const url = SITE + path;
    const image = SITE + ((route && route.img) || DEFAULT_IMG);

    document.title = entry.title;
    setMeta('name', 'description', entry.desc);
    // Der Vercel-Rewrite liefert fuer jede erfundene URL ein 200 zurueck. Ohne
    // noindex wuerde Google Tippfehler-Adressen als eigene Seiten aufnehmen.
    setMeta('name', 'robots', route ? 'index, follow' : 'noindex, follow');
    setCanonical(url);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:title', entry.title);
    setMeta('property', 'og:description', entry.desc);
    setMeta('property', 'og:image', image);
    setMeta('property', 'twitter:url', url);
    setMeta('property', 'twitter:title', entry.title);
    setMeta('property', 'twitter:description', entry.desc);
    setMeta('property', 'twitter:image', image);
    document.documentElement.lang = lang;
  }, [pathname, lang]);

  return null;
}
