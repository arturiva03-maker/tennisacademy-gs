/*
 * WhatsApp-QR-Code als Inline-SVG - kein externer Request, keine Runtime-Library,
 * kein Bild-Asset. Inhalt: https://wa.me/491629300590
 *
 * Version 3 (29x29 Module), Fehlerkorrektur H, 4 Module Ruhezone in der
 * viewBox. H statt M, weil das Logo in der Mitte Module verdeckt: die Aussparung
 * deckt rund 6 % der Flaeche ab, H stellt bis zu ~30 % wieder her. Gegengeprueft
 * mit einem Decoder auf dem gerenderten Code inklusive Logo-Overlay.
 *
 * Neu erzeugen, wenn sich die Nummer aendert:
 * QRCode.create(url, { errorCorrectionLevel: 'H' }), Module zeilenweise zu
 * horizontalen Runs zusammenfassen, Glyph-Position mittig halten.
 */
export const WHATSAPP_URL = 'https://wa.me/491629300590';

const PATH = 'M0 0h7v1H0zM8 0h1v1H8zM12 0h1v1H12zM15 0h1v1H15zM19 0h2v1H19zM22 0h7v1H22zM0 1h1v1H0zM6 1h1v1H6zM9 1h1v1H9zM15 1h3v1H15zM20 1h1v1H20zM22 1h1v1H22zM28 1h1v1H28zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM8 2h1v1H8zM11 2h1v1H11zM13 2h4v1H13zM18 2h1v1H18zM22 2h1v1H22zM24 2h3v1H24zM28 2h1v1H28zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM9 3h1v1H9zM12 3h3v1H12zM17 3h1v1H17zM20 3h1v1H20zM22 3h1v1H22zM24 3h3v1H24zM28 3h1v1H28zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM8 4h3v1H8zM12 4h4v1H12zM17 4h3v1H17zM22 4h1v1H22zM24 4h3v1H24zM28 4h1v1H28zM0 5h1v1H0zM6 5h1v1H6zM10 5h2v1H10zM13 5h2v1H13zM16 5h2v1H16zM20 5h1v1H20zM22 5h1v1H22zM28 5h1v1H28zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22 6h7v1H22zM8 7h1v1H8zM10 7h3v1H10zM15 7h1v1H15zM17 7h2v1H17zM5 8h2v1H5zM11 8h2v1H11zM14 8h1v1H14zM22 8h1v1H22zM24 8h1v1H24zM26 8h1v1H26zM28 8h1v1H28zM0 9h1v1H0zM2 9h1v1H2zM4 9h2v1H4zM7 9h1v1H7zM10 9h5v1H10zM18 9h1v1H18zM21 9h5v1H21zM27 9h1v1H27zM0 10h4v1H0zM5 10h2v1H5zM10 10h1v1H10zM12 10h1v1H12zM14 10h3v1H14zM18 10h2v1H18zM21 10h6v1H21zM0 11h1v1H0zM4 11h1v1H4zM7 11h4v1H7zM12 11h1v1H12zM14 11h1v1H14zM16 11h2v1H16zM19 11h2v1H19zM22 11h2v1H22zM0 12h1v1H0zM3 12h1v1H3zM6 12h1v1H6zM10 12h3v1H10zM16 12h1v1H16zM18 12h1v1H18zM20 12h3v1H20zM26 12h2v1H26zM0 13h1v1H0zM2 13h3v1H2zM9 13h3v1H9zM13 13h4v1H13zM19 13h2v1H19zM22 13h1v1H22zM24 13h2v1H24zM28 13h1v1H28zM2 14h2v1H2zM5 14h3v1H5zM9 14h1v1H9zM12 14h2v1H12zM17 14h1v1H17zM20 14h2v1H20zM23 14h1v1H23zM27 14h1v1H27zM0 15h1v1H0zM2 15h1v1H2zM5 15h1v1H5zM9 15h1v1H9zM11 15h1v1H11zM13 15h2v1H13zM16 15h1v1H16zM19 15h1v1H19zM24 15h5v1H24zM0 16h1v1H0zM3 16h1v1H3zM6 16h1v1H6zM9 16h1v1H9zM12 16h1v1H12zM14 16h1v1H14zM17 16h1v1H17zM22 16h5v1H22zM0 17h1v1H0zM2 17h1v1H2zM4 17h1v1H4zM7 17h5v1H7zM15 17h2v1H15zM18 17h1v1H18zM28 17h1v1H28zM0 18h4v1H0zM6 18h1v1H6zM8 18h2v1H8zM12 18h2v1H12zM15 18h1v1H15zM17 18h4v1H17zM25 18h2v1H25zM28 18h1v1H28zM0 19h1v1H0zM4 19h2v1H4zM7 19h1v1H7zM10 19h1v1H10zM16 19h1v1H16zM21 19h2v1H21zM28 19h1v1H28zM0 20h1v1H0zM3 20h2v1H3zM6 20h4v1H6zM11 20h2v1H11zM15 20h1v1H15zM17 20h10v1H17zM28 20h1v1H28zM8 21h4v1H8zM13 21h5v1H13zM19 21h2v1H19zM24 21h3v1H24zM0 22h7v1H0zM10 22h1v1H10zM12 22h5v1H12zM19 22h2v1H19zM22 22h1v1H22zM24 22h1v1H24zM0 23h1v1H0zM6 23h1v1H6zM8 23h2v1H8zM11 23h3v1H11zM17 23h1v1H17zM19 23h2v1H19zM24 23h2v1H24zM27 23h1v1H27zM0 24h1v1H0zM2 24h3v1H2zM6 24h1v1H6zM9 24h1v1H9zM11 24h1v1H11zM15 24h1v1H15zM18 24h7v1H18zM0 25h1v1H0zM2 25h3v1H2zM6 25h1v1H6zM10 25h2v1H10zM15 25h1v1H15zM19 25h2v1H19zM23 25h1v1H23zM0 26h1v1H0zM2 26h3v1H2zM6 26h1v1H6zM9 26h2v1H9zM12 26h1v1H12zM16 26h1v1H16zM18 26h8v1H18zM27 26h1v1H27zM0 27h1v1H0zM6 27h1v1H6zM9 27h1v1H9zM16 27h2v1H16zM19 27h1v1H19zM24 27h2v1H24zM28 27h1v1H28zM0 28h7v1H0zM10 28h1v1H10zM12 28h7v1H12zM24 28h1v1H24zM26 28h1v1H26z';

// Offizielles WhatsApp-Glyph in einer 24x24-Box.
const GLYPH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';

/** Nur das Glyph - fuer Buttons, ohne Code drumherum. */
export function WhatsAppGlyph({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={GLYPH} />
    </svg>
  );
}

/**
 * Ohne `label` wird der Code als dekorativ ausgezeichnet - dann muss das
 * umgebende Element (z. B. der Link) die Beschriftung tragen.
 */
export default function WhatsAppQR({ size = 148, label }) {
  return (
    <svg
      className="whatsapp-qr"
      viewBox="-4 -4 37 37"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true', focusable: 'false' })}
    >
      <rect x="-4" y="-4" width="37" height="37" fill="#ffffff" />
      <path d={PATH} fill="var(--navy-dark, #0b2538)" />
      <g shapeRendering="geometricPrecision">
        <circle cx="14.5" cy="14.5" r="4" fill="#ffffff" />
        <circle cx="14.5" cy="14.5" r="3.1" fill="#25d366" />
        <path d={GLYPH} fill="#ffffff" transform="translate(12.3 12.3) scale(0.18333)" />
      </g>
    </svg>
  );
}
