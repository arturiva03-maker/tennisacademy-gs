import { useEffect, useRef, useState } from 'react';
import WhatsAppQR, { WhatsAppGlyph, WHATSAPP_URL } from './WhatsAppQR';
import { useLang } from '../i18n/LanguageContext';

const T = {
  de: {
    open: 'WhatsApp-Kontakt oeffnen',
    close: 'WhatsApp-Kontakt schliessen',
    qr: 'QR-Code scannen oder antippen, um einen WhatsApp-Chat mit der Tennis Academy Grand Slam zu starten',
  },
  en: {
    open: 'Open WhatsApp contact',
    close: 'Close WhatsApp contact',
    qr: 'Scan or tap the QR code to start a WhatsApp chat with Tennis Academy Grand Slam',
  },
};

/**
 * Schwebender WhatsApp-Schalter auf jeder Seite. Geoeffnet zeigt er nur den
 * Code - am Rechner scannt man ihn, am Handy tippt man ihn an, beide Wege
 * fuehren in denselben Chat.
 */
export default function WhatsAppToggle() {
  const { lang } = useLang();
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div className={`wa-toggle${open ? ' is-open' : ''}`} ref={wrapRef}>
      <div className="wa-toggle-panel">
        <a
          className="wa-toggle-code"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.qr}
          tabIndex={open ? 0 : -1}
        >
          <WhatsAppQR size={168} />
        </a>
      </div>

      <button
        type="button"
        className="wa-toggle-button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t.close : t.open}
      >
        <WhatsAppGlyph size={26} />
      </button>
    </div>
  );
}
