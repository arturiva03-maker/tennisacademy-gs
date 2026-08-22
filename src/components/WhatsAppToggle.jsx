import { useEffect, useRef, useState } from 'react';
import WhatsAppQR, { WhatsAppGlyph, WHATSAPP_URL } from './WhatsAppQR';
import { useLang } from '../i18n/LanguageContext';

const T = {
  de: {
    open: 'WhatsApp-Code anzeigen',
    close: 'WhatsApp-Code schließen',
    direct: 'WhatsApp-Chat mit der Tennis Academy Grand Slam öffnen',
    qr: 'QR-Code scannen oder antippen, um einen WhatsApp-Chat mit der Tennis Academy Grand Slam zu starten',
  },
  en: {
    open: 'Show WhatsApp code',
    close: 'Close WhatsApp code',
    direct: 'Open a WhatsApp chat with Tennis Academy Grand Slam',
    qr: 'Scan or tap the QR code to start a WhatsApp chat with Tennis Academy Grand Slam',
  },
};

/**
 * Schwebender WhatsApp-Schalter auf jeder Seite. Am Rechner klappt er den Code
 * zum Scannen auf, am Handy fuehrt derselbe Knopf direkt in den Chat - dort
 * wäre ein Code zum Scannen nutzlos. Beide Varianten stehen im Markup und
 * werden per Media Query getauscht, damit nichts von der Fenstergröße zur
 * Laufzeit abhaengt.
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
        className="wa-fab wa-toggle-button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t.close : t.open}
      >
        <WhatsAppGlyph size={26} />
      </button>

      <a
        className="wa-fab wa-toggle-direct"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.direct}
      >
        <WhatsAppGlyph size={26} />
      </a>
    </div>
  );
}
