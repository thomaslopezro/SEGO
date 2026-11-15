import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

const KEY = 'sego_banner_cerrado';

/** Aviso discreto de versión de prueba. Se puede cerrar (vuelve en la siguiente sesión). */
export function DemoBanner() {
  const [hidden, setHidden] = useState(() => {
    try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; }
  });
  if (hidden) return null;

  function close() {
    try { sessionStorage.setItem(KEY, '1'); } catch { /* noop */ }
    setHidden(true);
  }

  return (
    <div
      className="sego-banner"
      role="note"
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px 6px 14px',
        background: '#FFFBEB', borderBottom: '1px solid #FDE68A', color: '#92400E',
        fontSize: 12.5, lineHeight: 1.4, fontFamily: 'Inter, sans-serif',
      }}
    >
      <Info size={14} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1 }}>
        Versión de prueba: aseguradoras y precios simulados, no son ofertas reales.
      </span>
      <button
        onClick={close}
        aria-label="Cerrar aviso"
        style={{
          background: 'none', border: 'none', cursor: 'pointer', color: '#92400E',
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}
      >
        <X size={15} />
      </button>
    </div>
  );
}
