import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Check, Minus, ArrowLeft, Link2, BarChart3, X, Copy, Eye, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Layout } from './Layout';
import { C, ASEGURADORAS, Aseguradora, getCurrentQuote } from './data';

type SortKey = 'precio' | 'deducible' | 'cobertura';

function CoverageRow({ label, value }: { label: string; value: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 13, color: C.textSec }}>{label}</span>
      {value
        ? <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={12} color="#059669" strokeWidth={2.5} /></div>
        : <div style={{ width: 20, height: 20, borderRadius: '50%', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} color={C.border} /></div>
      }
    </div>
  );
}

function QuoteCard({ a, selected, onToggle, featured }: { a: Aseguradora; selected: boolean; onToggle: () => void; featured: boolean }) {
  const navigate = useNavigate();
  const cob = a.coberturas;
  const totalCoverages = Object.values(cob).filter(Boolean).length;

  return (
    <div style={{
      background: C.white, borderRadius: 16, border: `2px solid ${featured ? C.primary : selected ? C.primary + '80' : C.border}`,
      padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column',
      boxShadow: featured ? '0 4px 24px rgba(84,71,216,0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
      transition: 'box-shadow 0.2s',
      flex: '1 1 280px', minWidth: 0,
    }}>
      {featured && (
        <div style={{
          position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
          background: C.primary, color: 'white', fontSize: 11, fontWeight: 700,
          padding: '4px 16px', borderRadius: '0 0 10px 10px', letterSpacing: '0.03em', whiteSpace: 'nowrap',
        }}>RECOMENDADO</div>
      )}

      {/* Selection checkbox */}
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <button onClick={onToggle} style={{
          width: 22, height: 22, borderRadius: 6, border: `2px solid ${selected ? C.primary : C.border}`,
          background: selected ? C.primary : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}>
          {selected && <Check size={12} color="white" strokeWidth={3} />}
        </button>
      </div>

      {/* Aseguradora */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingTop: featured ? 12 : 0 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: a.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${a.color}22` }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: a.color }}>{a.iniciales}</span>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{a.nombre}</div>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, color: a.badgeColor, background: a.badgeBg, padding: '2px 8px', borderRadius: 12 }}>
            {a.badge}
          </span>
        </div>
      </div>

      {/* Price */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 30, fontWeight: 800, color: C.text, letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif', lineHeight: 1 }}>
          {a.precioStr}
        </div>
        <div style={{ fontSize: 12.5, color: C.textSec, marginTop: 4 }}>
          / año · {Math.round(a.precio / 12).toLocaleString('es-CO')} /mes
        </div>
      </div>

      {/* Deductible */}
      <div style={{ padding: '10px 14px', background: C.bg, borderRadius: 9, marginBottom: 18 }}>
        <div style={{ fontSize: 11, color: C.textSec, fontWeight: 500, marginBottom: 2 }}>DEDUCIBLE</div>
        <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{a.deducible}</div>
      </div>

      {/* Coverages */}
      <div style={{ flex: 1 }}>
        <CoverageRow label="Daños propios" value={cob.danosPropios} />
        <CoverageRow label="Hurto total" value={cob.hurtoTotal} />
        <CoverageRow label="Responsabilidad civil" value={cob.rc} />
        <CoverageRow label="Asistencia vial" value={cob.asistencia} />
        <CoverageRow label="Vehículo de reemplazo" value={cob.vehiculoReemplazo} />
      </div>

      <div style={{ fontSize: 11.5, color: C.textSec, marginTop: 10, marginBottom: 18 }}>
        {totalCoverages} de 5 coberturas incluidas
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate(`/cotizaciones/${a.id}`)}
        style={{
          width: '100%', padding: '11px', borderRadius: 10, cursor: 'pointer',
          border: featured ? 'none' : `1.5px solid ${C.border}`,
          background: featured ? C.primary : 'white',
          color: featured ? 'white' : C.text,
          fontSize: 13.5, fontWeight: 600, fontFamily: 'Inter, sans-serif',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => {
          if (!featured) { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }
          else e.currentTarget.style.background = '#3D33C4';
        }}
        onMouseLeave={(e) => {
          if (!featured) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }
          else e.currentTarget.style.background = C.primary;
        }}
      >
        Ver detalle →
      </button>
    </div>
  );
}

function CompareModal({ aseguradoras, onClose }: { aseguradoras: Aseguradora[]; onClose: () => void }) {
  const rows = [
    { label: 'Precio anual', fn: (a: Aseguradora) => a.precioStr },
    { label: 'Precio mensual', fn: (a: Aseguradora) => `$${Math.round(a.precio / 12).toLocaleString('es-CO')}` },
    { label: 'Deducible', fn: (a: Aseguradora) => a.deducible },
    { label: 'Daños propios', fn: (a: Aseguradora) => a.coberturas.danosPropios ? '✓' : '—' },
    { label: 'Hurto total', fn: (a: Aseguradora) => a.coberturas.hurtoTotal ? '✓' : '—' },
    { label: 'Responsabilidad civil', fn: (a: Aseguradora) => a.coberturas.rc ? '✓' : '—' },
    { label: 'Asistencia vial', fn: (a: Aseguradora) => a.coberturas.asistencia ? '✓' : '—' },
    { label: 'Vehículo de reemplazo', fn: (a: Aseguradora) => a.coberturas.vehiculoReemplazo ? '✓' : '—' },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: 16, maxWidth: 700, width: '100%', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: C.text }}>Comparación de opciones</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textSec }}><X size={20} /></button>
        </div>
        <div style={{ overflowY: 'auto', padding: '0 24px 24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 12, color: C.textSec, width: '35%' }}>Característica</th>
                {aseguradoras.map((a) => (
                  <th key={a.id} style={{ padding: '10px 8px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: a.color }}>
                    {a.nombre}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? C.bg : 'white' }}>
                  <td style={{ padding: '12px 8px 12px 0', fontSize: 13, color: C.textSec }}>{row.label}</td>
                  {aseguradoras.map((a) => {
                    const val = row.fn(a);
                    return (
                      <td key={a.id} style={{ padding: '12px 8px', textAlign: 'center', fontSize: 13.5, fontWeight: 500, color: val === '✓' ? '#059669' : val === '—' ? C.border : C.text }}>
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Link generation modal ────────────────────────────────────────────────────

function LinkModal({ clientName, onClose, onPreview }: { clientName: string; onClose: () => void; onPreview: () => void }) {
  const token = 'demo-' + Math.random().toString(36).slice(2, 8);
  const link = `${window.location.origin}/cliente/${token}`;
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSend() {
    if (!email.trim()) return;
    setSent(true);
    setTimeout(() => { toast.success(`Link enviado a ${email}`); setSent(false); setEmail(''); }, 800);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'Inter, sans-serif' }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: 18, maxWidth: 500, width: '100%', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #272143, #5447D8)', padding: '24px 28px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link2 size={16} color="white" />
              </div>
              <span style={{ color: 'white', fontSize: 16, fontWeight: 700, fontFamily: 'Manrope, sans-serif' }}>Link generado para el cliente</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0 }}>
              Comparte este link con {clientName.split(' ')[0]} para que vea las opciones, use el chat de IA y pague directamente.
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', marginLeft: 16, padding: 4, flexShrink: 0 }}><X size={18} /></button>
        </div>

        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Link display */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: C.textSec, display: 'block', marginBottom: 8, letterSpacing: '0.03em' }}>ENLACE PARA EL CLIENTE</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{
                flex: 1, padding: '10px 14px', borderRadius: 9, border: `1.5px solid ${C.border}`,
                background: C.bg, fontSize: 13, color: C.text, fontFamily: 'monospace',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {link}
              </div>
              <button onClick={handleCopy} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 9,
                border: `1.5px solid ${copied ? '#059669' : C.border}`,
                background: copied ? '#ECFDF5' : 'white',
                color: copied ? '#059669' : C.text, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>
                {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Send by email */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: C.textSec, display: 'block', marginBottom: 8, letterSpacing: '0.03em' }}>O ENVÍALO DIRECTAMENTE</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={email} onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Correo del cliente"
                style={{ flex: 1, padding: '10px 13px', borderRadius: 9, border: `1.5px solid ${C.border}`, fontSize: 13.5, color: C.text, outline: 'none', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.15s' }}
                onFocus={(e) => e.target.style.borderColor = C.primary}
                onBlur={(e) => e.target.style.borderColor = C.border}
              />
              <button onClick={handleSend} disabled={sent || !email.trim()} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 9,
                border: 'none', background: sent || !email.trim() ? C.border : C.primary,
                color: 'white', fontSize: 13, fontWeight: 600, cursor: sent || !email.trim() ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap', transition: 'background 0.15s',
              }}>
                <Send size={14} /> {sent ? 'Enviando…' : 'Enviar'}
              </button>
            </div>
          </div>

          {/* What the client will see */}
          <div style={{ background: C.primaryLight, borderRadius: 10, padding: '14px 16px', border: `1px solid ${C.primary}25` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 8 }}>EL CLIENTE VERÁ</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'Las 3 cotizaciones con precios y coberturas en lenguaje simple',
                'Chat de IA para resolver dudas sobre su cotización',
                'Botón "Pagar mi seguro" que lo lleva al portal de cada aseguradora',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <Check size={13} color={C.primary} style={{ marginTop: 2, flexShrink: 0 }} strokeWidth={2.5} />
                  <span style={{ fontSize: 13, color: C.text }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preview button */}
          <button
            onClick={() => { onClose(); onPreview(); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              padding: '12px', borderRadius: 10, border: `1.5px solid ${C.border}`,
              background: 'white', color: C.text, fontSize: 14, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
          >
            <Eye size={15} /> Ver como lo verá el cliente
          </button>
        </div>
      </div>
    </div>
  );
}

export function Resultados() {
  const navigate = useNavigate();
  const quoteData = getCurrentQuote();
  const clientName = quoteData.cliente?.nombre || 'Laura';
  const vehicleStr = quoteData.vehiculo ? `${quoteData.vehiculo.marca} ${quoteData.vehiculo.linea} ${quoteData.vehiculo.anio} · ${quoteData.vehiculo.ciudad}` : 'Mazda CX-30 Grand Touring 2024 · Bogotá';

  const [sortKey, setSortKey] = useState<SortKey>('precio');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  const sorted = useMemo(() => {
    const arr = [...ASEGURADORAS];
    if (sortKey === 'precio') arr.sort((a, b) => a.precio - b.precio);
    else if (sortKey === 'cobertura') arr.sort((a, b) => Object.values(b.coberturas).filter(Boolean).length - Object.values(a.coberturas).filter(Boolean).length);
    else if (sortKey === 'deducible') arr.sort((a, b) => a.precio - b.precio);
    return arr;
  }, [sortKey]);

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const compareItems = ASEGURADORAS.filter((a) => selected.has(a.id));

  return (
    <Layout breadcrumb={['Cotizaciones', 'Resultados']}>
      {showCompare && compareItems.length >= 2 && (
        <CompareModal aseguradoras={compareItems} onClose={() => setShowCompare(false)} />
      )}
      {showLinkModal && (
        <LinkModal
          clientName={clientName}
          onClose={() => setShowLinkModal(false)}
          onPreview={() => navigate('/cliente/demo')}
        />
      )}

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: C.textSec, fontSize: 13, marginBottom: 16, padding: 0 }}>
          <ArrowLeft size={15} /> Volver
        </button>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>
          Encontramos {ASEGURADORAS.length} opciones para {clientName}
        </h1>
        <p style={{ color: C.textSec, fontSize: 14, marginTop: 6 }}>{vehicleStr}</p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: C.textSec, fontWeight: 500 }}>Ordenar por:</span>
          {(['precio', 'cobertura', 'deducible'] as SortKey[]).map((k) => (
            <button key={k} onClick={() => setSortKey(k)} style={{
              padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${sortKey === k ? C.primary : C.border}`,
              background: sortKey === k ? C.primaryLight : 'white', color: sortKey === k ? C.primary : C.textSec,
              fontSize: 13, fontWeight: sortKey === k ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s',
              fontFamily: 'Inter, sans-serif', textTransform: 'capitalize',
            }}>
              {k === 'precio' ? 'Precio' : k === 'cobertura' ? 'Cobertura' : 'Deducible'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {selected.size >= 2 && (
            <button onClick={() => setShowCompare(true)} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 9,
              border: `1.5px solid ${C.primary}`, background: C.primaryLight, color: C.primary,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>
              <BarChart3 size={15} /> Comparar seleccionadas ({selected.size})
            </button>
          )}
          <button
            onClick={() => setShowLinkModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 9,
              border: 'none', background: C.primary, color: 'white',
              fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              boxShadow: '0 2px 8px rgba(84,71,216,0.3)',
            }}
          >
            <Link2 size={15} /> Generar link para el cliente
          </button>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'stretch' }}>
        {sorted.map((a) => (
          <QuoteCard
            key={a.id}
            a={a}
            selected={selected.has(a.id)}
            onToggle={() => toggleSelect(a.id)}
            featured={a.featured === true && sortKey !== 'precio'}
          />
        ))}
      </div>

      <div style={{ marginTop: 20, padding: '12px 18px', background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>
        <p style={{ fontSize: 12, color: C.textSec, margin: 0 }}>
          <strong style={{ color: C.text }}>Aviso:</strong> Los badges y clasificaciones son indicativos para facilitar la comparación. No constituyen recomendaciones financieras. Las condiciones definitivas deben verificarse en los documentos de cada aseguradora.
        </p>
      </div>
    </Layout>
  );
}
