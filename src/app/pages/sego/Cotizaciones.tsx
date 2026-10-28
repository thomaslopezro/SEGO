import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Search, ExternalLink, Copy, Download, Filter, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Layout } from './Layout';
import { C, getQuotes, saveQuoteToStore, Cotizacion, genId } from './data';

function StatusBadge({ estado }: { estado: string }) {
  const done = estado === 'completada';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
      background: done ? '#ECFDF5' : '#FFF7ED',
      color: done ? '#059669' : '#D97706',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
      {done ? 'Completada' : 'Borrador'}
    </span>
  );
}

export function Cotizaciones() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Cotizacion[]>([]);
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');

  useEffect(() => {
    setQuotes(getQuotes());
  }, []);

  const filtered = useMemo(() => {
    return quotes.filter((q) => {
      const q2 = search.toLowerCase();
      const matchSearch = !q2 || q.cliente.nombre.toLowerCase().includes(q2) || q.vehiculo.placa.toLowerCase().includes(q2) || q.vehiculo.marca.toLowerCase().includes(q2) || q.vehiculo.linea.toLowerCase().includes(q2);
      const matchEstado = filterEstado === 'todos' || q.estado === filterEstado;
      return matchSearch && matchEstado;
    });
  }, [quotes, search, filterEstado]);

  function handleDuplicate(q: Cotizacion) {
    const newQ: Cotizacion = { ...q, id: genId(), fecha: 'Hoy', estado: 'borrador' };
    saveQuoteToStore(newQ);
    setQuotes(getQuotes());
    toast.success('Cotización duplicada. Puedes editarla como nuevo borrador.');
  }

  function handleDownload(q: Cotizacion) {
    toast.success(`Descargando cotización de ${q.cliente.nombre}…`);
  }

  const avatarColors = [C.primaryLight, '#ECFDF5', '#FFFBEB', '#F5F3FF', '#FEF2F2'];
  const avatarTextColors = [C.primary, '#059669', '#D97706', '#7C3AED', C.error];

  return (
    <Layout breadcrumb={['Cotizaciones']}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>
            Cotizaciones
          </h1>
          <p style={{ color: C.textSec, fontSize: 14, marginTop: 6 }}>
            {quotes.length} cotizaciones en total
          </p>
        </div>
        <button
          onClick={() => navigate('/cotizaciones/nueva')}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 9, border: 'none', background: C.primary, color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 8px rgba(84,71,216,0.3)' }}
        >
          <Plus size={16} /> Nueva cotización
        </button>
      </div>

      {/* Search + filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: C.textSec }} />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente, placa o vehículo…"
            style={{
              width: '100%', padding: '10px 13px 10px 36px', borderRadius: 9,
              border: `1.5px solid ${C.border}`, background: 'white', fontSize: 14,
              color: C.text, outline: 'none', fontFamily: 'Inter, sans-serif',
              boxSizing: 'border-box', transition: 'border-color 0.15s',
            }}
            onFocus={(e) => e.target.style.borderColor = C.primary}
            onBlur={(e) => e.target.style.borderColor = C.border}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Filter size={15} color={C.textSec} />
          <select
            value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)}
            style={{ padding: '10px 13px', borderRadius: 9, border: `1.5px solid ${C.border}`, background: 'white', fontSize: 14, color: C.text, outline: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
          >
            <option value="todos">Todos los estados</option>
            <option value="completada">Completadas</option>
            <option value="borrador">Borradores</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 14, border: `1px solid ${C.border}`, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: C.textSec, marginBottom: 16 }}>
              {search ? 'No se encontraron cotizaciones con esa búsqueda.' : 'No hay cotizaciones aún.'}
            </div>
            {!search && (
              <button onClick={() => navigate('/cotizaciones/nueva')} style={{ padding: '10px 20px', background: C.primary, color: 'white', border: 'none', borderRadius: 9, cursor: 'pointer', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
                Crear primera cotización
              </button>
            )}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {['Cliente', 'Vehículo', 'Placa', 'Fecha', 'Mejor oferta', 'Estado', 'Acciones'].map((h) => (
                    <th key={h} style={{ padding: '11px 18px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: C.textSec, whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((q, i) => (
                  <tr key={q.id} style={{ borderTop: `1px solid ${C.border}`, transition: 'background 0.1s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#FAFAFA')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                          background: avatarColors[i % avatarColors.length],
                          color: avatarTextColors[i % avatarTextColors.length],
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, fontWeight: 700,
                        }}>
                          {q.cliente.nombre.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{q.cliente.nombre}</div>
                          <div style={{ fontSize: 12, color: C.textSec }}>{q.cliente.ciudad}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px', fontSize: 13.5, color: C.text }}>
                      {q.vehiculo.marca} {q.vehiculo.linea} {q.vehiculo.anio}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <code style={{ fontSize: 12.5, background: C.bg, padding: '3px 8px', borderRadius: 6, color: C.text, fontFamily: 'monospace', border: `1px solid ${C.border}` }}>
                        {q.vehiculo.placa}
                      </code>
                    </td>
                    <td style={{ padding: '14px 18px', fontSize: 13.5, color: C.textSec, whiteSpace: 'nowrap' }}>{q.fecha}</td>
                    <td style={{ padding: '14px 18px', fontSize: 14, fontWeight: 600, color: C.text, whiteSpace: 'nowrap' }}>{q.mejorOferta}</td>
                    <td style={{ padding: '14px 18px' }}><StatusBadge estado={q.estado} /></td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => navigate('/cotizaciones/resultados')}
                          title="Ver cotización"
                          style={{ padding: '7px', borderRadius: 7, border: `1.5px solid ${C.border}`, background: 'white', color: C.textSec, cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}
                        >
                          <ExternalLink size={14} />
                        </button>
                        <button
                          onClick={() => handleDuplicate(q)}
                          title="Duplicar"
                          style={{ padding: '7px', borderRadius: 7, border: `1.5px solid ${C.border}`, background: 'white', color: C.textSec, cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.color = '#059669'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          onClick={() => handleDownload(q)}
                          title="Descargar"
                          style={{ padding: '7px', borderRadius: 7, border: `1.5px solid ${C.border}`, background: 'white', color: C.textSec, cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D97706'; e.currentTarget.style.color = '#D97706'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
