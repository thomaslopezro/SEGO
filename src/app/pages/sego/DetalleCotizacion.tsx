import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Check, X, Info, FileText, PlusSquare, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Layout } from './Layout';
import { C, ASEGURADORAS, formatPrecioMensual } from './data';

export function DetalleCotizacion() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const aseg = ASEGURADORAS.find((a) => a.id === id) ?? ASEGURADORAS[0];

  const cob = aseg.coberturas;
  const cobItems = [
    { label: 'Daños propios', value: cob.danosPropios },
    { label: 'Hurto total', value: cob.hurtoTotal },
    { label: 'Responsabilidad civil frente a terceros', value: cob.rc },
    { label: 'Asistencia vial 24 horas', value: cob.asistencia },
    { label: 'Vehículo de reemplazo', value: cob.vehiculoReemplazo },
  ];

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div style={{ background: 'white', borderRadius: 14, border: `1px solid ${C.border}`, padding: '22px 26px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: 14.5, fontWeight: 600, color: C.text, margin: '0 0 18px' }}>{title}</h3>
        {children}
      </div>
    );
  }

  return (
    <Layout breadcrumb={['Cotizaciones', 'Resultados', aseg.nombre]}>
      {/* Back */}
      <button
        onClick={() => navigate('/cotizaciones/resultados')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: C.textSec, fontSize: 13, marginBottom: 20, padding: 0 }}
      >
        <ArrowLeft size={15} /> Volver al comparador
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Hero card */}
          <div style={{ background: 'white', borderRadius: 14, border: `2px solid ${aseg.color}30`, padding: '28px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 13, background: aseg.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${aseg.color}25` }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: aseg.color }}>{aseg.iniciales}</span>
                </div>
                <div>
                  <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.01em', fontFamily: 'Manrope, sans-serif' }}>{aseg.nombre}</h1>
                  <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 600, color: aseg.badgeColor, background: aseg.badgeBg, padding: '3px 10px', borderRadius: 14, marginTop: 4 }}>
                    {aseg.badge}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: C.text, letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif', lineHeight: 1 }}>{aseg.precioStr}</div>
                <div style={{ fontSize: 13, color: C.textSec, marginTop: 4 }}>/ año · {formatPrecioMensual(aseg.precio)} / mes</div>
              </div>
            </div>
            <div style={{ marginTop: 20, padding: '12px 16px', background: C.bg, borderRadius: 10 }}>
              <span style={{ fontSize: 12, color: C.textSec, fontWeight: 500 }}>DEDUCIBLE: </span>
              <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{aseg.deducible}</span>
            </div>
          </div>

          {/* Coberturas */}
          <Section title="Coberturas incluidas">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {cobItems.map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: item.value ? '#ECFDF5' : C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.value
                      ? <Check size={12} color="#059669" strokeWidth={2.5} />
                      : <X size={12} color={C.border} />
                    }
                  </div>
                  <span style={{ fontSize: 14, color: item.value ? C.text : C.textSec }}>{item.label}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Asistencias */}
          <Section title="Servicios de asistencia">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {aseg.asistencias.map((a) => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Star size={13} color={aseg.color} fill={aseg.color} />
                  <span style={{ fontSize: 13.5, color: C.text }}>{a}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Exclusiones */}
          <Section title="Exclusiones principales">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {aseg.exclusiones.map((e) => (
                <div key={e} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <X size={14} color={C.error} style={{ marginTop: 1, flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: C.textSec }}>{e}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* En palabras simples */}
          <div style={{ background: C.primaryLight, borderRadius: 14, border: `1.5px solid ${C.primary}30`, padding: '22px 26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Info size={16} color={C.primary} />
              <h3 style={{ fontSize: 14.5, fontWeight: 700, color: C.primary, margin: 0 }}>En palabras simples</h3>
            </div>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.65, margin: 0 }}>{aseg.enPalabrasSimpoles}</p>
            <p style={{ fontSize: 12, color: C.textSec, marginTop: 14, marginBottom: 0, fontStyle: 'italic' }}>
              Este resumen facilita la comprensión y no reemplaza las condiciones contractuales de la aseguradora.
            </p>
          </div>
        </div>

        {/* Right sticky column */}
        <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'white', borderRadius: 14, border: `1px solid ${C.border}`, padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 16px' }}>Acciones</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => navigate('/cotizaciones/documento')}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', borderRadius: 10, border: 'none', background: C.primary, color: 'white', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                <FileText size={15} /> Generar documento
              </button>
              <button
                onClick={() => toast.success('Esta opción ha sido agregada a tu comparación.')}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', borderRadius: 10, border: `1.5px solid ${C.border}`, background: 'white', color: C.text, fontSize: 13.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                <PlusSquare size={15} /> Agregar a comparación
              </button>
              <button
                onClick={() => toast.info('El condicionado completo está disponible en el portal de ' + aseg.nombre + '.')}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', borderRadius: 10, border: `1.5px solid ${C.border}`, background: 'white', color: C.textSec, fontSize: 13.5, fontWeight: 400, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                Ver condicionado
              </button>
            </div>
          </div>

          <div style={{ background: C.bg, borderRadius: 12, border: `1px solid ${C.border}`, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, color: C.textSec, lineHeight: 1.6 }}>
              <strong style={{ color: C.text }}>Condiciones importantes</strong><br />
              Las coberturas aplican según las condiciones, límites y exclusiones definidas en el condicionado general de {aseg.nombre}. Consulta al intermediario para detalles específicos.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
          div[style*="position: sticky"] { position: static !important; }
        }
      `}</style>
    </Layout>
  );
}
