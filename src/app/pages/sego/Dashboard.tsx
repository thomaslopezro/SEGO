import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Plus, TrendingUp, Clock, Shield, Users, ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import { Layout } from './Layout';
import { C, getQuotes, Cotizacion } from './data';

const STAT_CARDS = [
  { label: 'Cotizaciones este mes', value: '24', icon: <TrendingUp size={20} />, color: C.primary, bg: C.primaryLight, change: '+3 vs. mes anterior' },
  { label: 'Tiempo promedio', value: '12 min', icon: <Clock size={20} />, color: '#059669', bg: '#ECFDF5', change: '−18 min vs. proceso manual' },
  { label: 'Aseguradoras conectadas', value: '3', icon: <Shield size={20} />, color: '#D97706', bg: '#FFFBEB', change: 'Andina · Capital · Protección' },
  { label: 'Clientes atendidos', value: '18', icon: <Users size={20} />, color: '#7C3AED', bg: '#F5F3FF', change: '+5 este mes' },
];

function StatCard({ card }: { card: typeof STAT_CARDS[0] }) {
  return (
    <div style={{
      background: C.white, borderRadius: 14, padding: '22px 24px',
      border: `1px solid ${C.border}`, flex: 1, minWidth: 0,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      transition: 'box-shadow 0.2s, transform 0.2s',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: C.textSec, fontWeight: 500 }}>{card.label}</div>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, flexShrink: 0 }}>
          {card.icon}
        </div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, color: C.text, letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif', lineHeight: 1 }}>
        {card.value}
      </div>
      <div style={{ fontSize: 12, color: C.textSec, marginTop: 8 }}>{card.change}</div>
    </div>
  );
}

function StatusBadge({ estado }: { estado: string }) {
  const isComplete = estado === 'completada';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
      background: isComplete ? '#ECFDF5' : '#FFF7ED',
      color: isComplete ? '#059669' : '#D97706',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
      {isComplete ? 'Completada' : 'Borrador'}
    </span>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Cotizacion[]>([]);

  useEffect(() => {
    setQuotes(getQuotes().slice(0, 5));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <Layout breadcrumb={['Inicio']}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, letterSpacing: '-0.02em', margin: 0, fontFamily: 'Manrope, sans-serif' }}>
            {greeting}, Thomas
          </h1>
          <p style={{ color: C.textSec, fontSize: 14.5, marginTop: 6 }}>Gestiona tus cotizaciones desde un solo lugar.</p>
        </div>
        <button
          onClick={() => navigate('/cotizaciones/nueva')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '11px 22px',
            background: C.primary, color: 'white', border: 'none', borderRadius: 10,
            fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            boxShadow: '0 2px 8px rgba(84,71,216,0.35)', transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#3D33C4'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(84,71,216,0.5)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = C.primary; e.currentTarget.style.boxShadow = '0 2px 8px rgba(84,71,216,0.35)'; }}
        >
          <Plus size={17} />
          Nueva cotización
        </button>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {STAT_CARDS.map((card) => <StatCard key={card.label} card={card} />)}
      </div>

      {/* Recent quotes */}
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}` }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: 0 }}>Cotizaciones recientes</h2>
          <button
            onClick={() => navigate('/cotizaciones')}
            style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: C.primary, fontSize: 13, fontWeight: 500 }}
          >
            Ver todas <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {['Cliente', 'Vehículo', 'Fecha', 'Mejor oferta', 'Estado', 'Acción'].map((h) => (
                  <th key={h} style={{ padding: '11px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: C.textSec, whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quotes.map((q, i) => (
                <tr key={q.id} style={{ borderTop: `1px solid ${C.border}`, transition: 'background 0.1s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#FAFAFA')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                        background: ['#EEF0FD', '#ECFDF5', '#FFFBEB'][i % 3],
                        color: [C.primary, '#059669', '#D97706'][i % 3],
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
                  <td style={{ padding: '14px 20px', fontSize: 13.5, color: C.text }}>
                    {q.vehiculo.marca} {q.vehiculo.linea} {q.vehiculo.anio}
                    <div style={{ fontSize: 12, color: C.textSec }}>Placa: {q.vehiculo.placa}</div>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13.5, color: C.textSec, whiteSpace: 'nowrap' }}>{q.fecha}</td>
                  <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 600, color: C.text, whiteSpace: 'nowrap' }}>{q.mejorOferta}</td>
                  <td style={{ padding: '14px 20px' }}><StatusBadge estado={q.estado} /></td>
                  <td style={{ padding: '14px 20px' }}>
                    <button
                      onClick={() => navigate('/cotizaciones/resultados')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '7px 14px', borderRadius: 8, border: `1.5px solid ${C.border}`,
                        background: 'white', color: C.text, fontSize: 12.5, fontWeight: 500,
                        cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
                    >
                      Ver cotización <ExternalLink size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {quotes.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: C.textSec }}>No hay cotizaciones aún.</div>
            <button onClick={() => navigate('/cotizaciones/nueva')} style={{ marginTop: 16, padding: '10px 20px', background: C.primary, color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
              Crear primera cotización
            </button>
          </div>
        )}
      </div>

      {/* Quick value prop banner */}
      <div style={{
        marginTop: 24, background: C.navy, borderRadius: 14, padding: '24px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ color: 'white', fontSize: 16, fontWeight: 700, fontFamily: 'Manrope, sans-serif' }}>
            De 30–40 minutos a menos de 12
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 4 }}>
            Ingresa los datos una sola vez. SEGO consulta todas las aseguradoras por ti.
          </div>
        </div>
        <button
          onClick={() => navigate('/cotizaciones/nueva')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px',
            background: C.primary, color: 'white', border: 'none', borderRadius: 10,
            fontSize: 13.5, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Comenzar ahora <ArrowRight size={15} />
        </button>
      </div>
    </Layout>
  );
}
