import React, { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Layout } from './Layout';
import { C, getMetricas, borrarMetricas, MetricaCotizacion } from './data';

/** Ruta oculta para pruebas de campo: tiempos por cotización guardados en este navegador. */

const minutos = (desde: number, hasta?: number) =>
  hasta ? Math.round(((hasta - desde) / 60000) * 10) / 10 : null;

const fmtFecha = (ts: number) =>
  new Date(ts).toLocaleString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

function cargar(): MetricaCotizacion[] {
  return Object.values(getMetricas()).sort((a, b) => b.inicio - a.inicio);
}

export function Metricas() {
  const [rows, setRows] = useState<MetricaCotizacion[]>(cargar);

  function exportarCSV() {
    if (!rows.length) { toast.info('No hay datos para exportar.'); return; }
    const header = ['cotizacion', 'cliente', 'inicio', 'minutos_hasta_resultados', 'minutos_hasta_documento'];
    const esc = (v: string | number | null) => {
      const s = v == null ? '' : String(v);
      return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = rows.map((r) => [
      r.id, r.cliente, new Date(r.inicio).toISOString(),
      minutos(r.inicio, r.resultados), minutos(r.inicio, r.documento),
    ].map(esc).join(','));
    // BOM para que Excel abra bien las tildes
    const blob = new Blob(['﻿' + [header.join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sego_metricas_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function borrar() {
    if (!window.confirm('¿Borrar todas las métricas guardadas en este navegador? No se puede deshacer.')) return;
    borrarMetricas();
    setRows([]);
    toast.success('Métricas borradas.');
  }

  const th: React.CSSProperties = { padding: '11px 14px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: C.textSec, whiteSpace: 'nowrap' };
  const td: React.CSSProperties = { padding: '12px 14px', fontSize: 13.5, color: C.text, borderTop: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
  const btn: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 7, padding: '12px 18px', borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' };

  return (
    <Layout breadcrumb={['Métricas de prueba']}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>Métricas de pruebas de campo</h1>
          <p style={{ color: C.textSec, fontSize: 14, marginTop: 6, maxWidth: 560 }}>
            Minutos desde que se toca "Nueva cotización" hasta ver los resultados y hasta abrir el documento. Datos guardados solo en este navegador.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={exportarCSV} style={{ ...btn, border: 'none', background: C.primary, color: 'white' }}>
            <Download size={15} /> Exportar CSV
          </button>
          <button onClick={borrar} style={{ ...btn, border: `1.5px solid ${C.border}`, background: 'white', color: C.error }}>
            <Trash2 size={15} /> Borrar datos
          </button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 14, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        {rows.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', fontSize: 14, color: C.textSec }}>
            Aún no hay mediciones. Se registran automáticamente al crear una cotización.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  <th style={th}>Cotización</th>
                  <th style={th}>Inicio</th>
                  <th style={{ ...th, textAlign: 'right' }}>Min. hasta resultados</th>
                  <th style={{ ...th, textAlign: 'right' }}>Min. hasta documento</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const mr = minutos(r.inicio, r.resultados);
                  const md = minutos(r.inicio, r.documento);
                  return (
                    <tr key={r.id}>
                      <td style={td}>
                        <div style={{ fontWeight: 500 }}>{r.cliente || '—'}</div>
                        <div style={{ fontSize: 11.5, color: C.textSec, fontFamily: 'monospace' }}>{r.id}</div>
                      </td>
                      <td style={{ ...td, color: C.textSec }}>{fmtFecha(r.inicio)}</td>
                      <td style={{ ...td, textAlign: 'right', fontWeight: 600 }}>{mr ?? '—'}</td>
                      <td style={{ ...td, textAlign: 'right', fontWeight: 600 }}>{md ?? '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
