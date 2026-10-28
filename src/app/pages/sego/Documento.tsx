import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Download, Share2, Save, Check, Minus, X, Send, Link2 } from 'lucide-react';
import { toast } from 'sonner';
import { Layout, SegoLogo } from './Layout';
import { C, ASEGURADORAS, getCurrentQuote, saveQuoteToStore, genId, Cotizacion } from './data';

function ShareModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('laura.gomez@email.com');
  const [msg, setMsg] = useState('Hola Laura, te comparto las opciones de seguro que revisamos para tu Mazda CX-30. En el documento encontrarás precios, coberturas y principales diferencias.');
  const [sending, setSending] = useState(false);

  function handleSend() {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success('Cotización compartida correctamente.');
      onClose();
    }, 1000);
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.origin + '/cotizaciones/documento').catch(() => {});
    toast.success('Enlace copiado al portapapeles.');
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: 16, width: '100%', maxWidth: 480, padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: C.text, fontFamily: 'Manrope, sans-serif' }}>Compartir cotización</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textSec }}><X size={20} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: C.text, display: 'block', marginBottom: 7 }}>Correo del cliente</label>
            <input
              value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 13px', borderRadius: 9, border: `1.5px solid ${C.border}`, fontSize: 14, color: C.text, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = C.primary}
              onBlur={(e) => e.target.style.borderColor = C.border}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: C.text, display: 'block', marginBottom: 7 }}>Mensaje</label>
            <textarea
              value={msg} onChange={(e) => setMsg(e.target.value)} rows={4}
              style={{ width: '100%', padding: '10px 13px', borderRadius: 9, border: `1.5px solid ${C.border}`, fontSize: 13.5, color: C.text, outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.5 }}
              onFocus={(e) => e.target.style.borderColor = C.primary}
              onBlur={(e) => e.target.style.borderColor = C.border}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: 9, border: `1.5px solid ${C.border}`, background: 'white', color: C.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Cancelar
          </button>
          <button onClick={handleCopyLink} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 16px', borderRadius: 9, border: `1.5px solid ${C.border}`, background: 'white', color: C.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>
            <Link2 size={15} /> Copiar enlace
          </button>
          <button onClick={handleSend} disabled={sending} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px', borderRadius: 9, border: 'none', background: sending ? '#A09BEA' : C.primary, color: 'white', fontSize: 14, fontWeight: 600, cursor: sending ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif' }}>
            {sending ? 'Enviando…' : <><Send size={15} /> Enviar</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Documento() {
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);
  const quoteData = getCurrentQuote();
  const cliente = quoteData.cliente;
  const vehiculo = quoteData.vehiculo;

  const clientName = cliente?.nombre ?? 'Laura Gómez';
  const vehicleStr = vehiculo ? `${vehiculo.marca} ${vehiculo.linea} ${vehiculo.modelo} ${vehiculo.anio}` : 'Mazda CX-30 Grand Touring 2024';
  const today = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

  function handleDownload() {
    toast.success('Generando PDF… La descarga iniciará en un momento.');
    setTimeout(() => {
      const blob = new Blob([`SEGO - Cotización Comparativa\n\nCliente: ${clientName}\nVehículo: ${vehicleStr}\nFecha: ${today}\n\nOpciones:\n${ASEGURADORAS.map(a => `${a.nombre}: ${a.precioStr}/año`).join('\n')}`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'SEGO_Cotizacion.txt'; a.click();
      URL.revokeObjectURL(url);
    }, 1200);
  }

  function handleSave() {
    const quote: Cotizacion = {
      id: genId(),
      cliente: cliente ?? { nombre: 'Laura Gómez', tipoDoc: 'CC', numDoc: '1.023.456.789', fechaNacimiento: '15/06/1992', email: 'laura.gomez@email.com', telefono: '300 555 0198', ciudad: 'Bogotá D.C.' },
      vehiculo: vehiculo ?? { placa: 'ABC123', marca: 'Mazda', linea: 'CX-30', modelo: 'Grand Touring', anio: '2024', valor: '$105.000.000 COP', ciudad: 'Bogotá', uso: 'particular', siniestros: false },
      fecha: 'Hoy',
      estado: 'completada',
      mejorOferta: `${ASEGURADORAS[0].precioStr}/año`,
    };
    saveQuoteToStore(quote);
    toast.success('Cotización guardada correctamente.');
    setTimeout(() => navigate('/dashboard'), 1200);
  }

  const tableHeaders = ['Aseguradora', 'Precio anual', 'Deducible', 'Daños', 'Hurto', 'RC', 'Asistencia', 'Veh. reemplazo'];

  return (
    <Layout breadcrumb={['Cotizaciones', 'Documento']}>
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <button onClick={() => navigate('/cotizaciones/resultados')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: C.textSec, fontSize: 13, marginBottom: 12, padding: 0 }}>
            <ArrowLeft size={15} /> Volver al comparador
          </button>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>
            Tu propuesta está lista
          </h1>
          <p style={{ color: C.textSec, fontSize: 14, marginTop: 6 }}>Revisa la información antes de compartirla con tu cliente.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={handleDownload} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 9, border: `1.5px solid ${C.border}`, background: 'white', color: C.text, fontSize: 13.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Download size={15} /> Descargar PDF
          </button>
          <button onClick={() => setShowShare(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 9, border: `1.5px solid ${C.border}`, background: 'white', color: C.text, fontSize: 13.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Share2 size={15} /> Compartir
          </button>
          <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 9, border: 'none', background: C.primary, color: 'white', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 8px rgba(84,71,216,0.3)' }}>
            <Save size={15} /> Guardar cotización
          </button>
        </div>
      </div>

      {/* Document preview */}
      <div style={{ background: 'white', borderRadius: 16, border: `1px solid ${C.border}`, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        {/* Document header */}
        <div style={{ background: C.navy, padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SegoLogo />
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>Cotización comparativa</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 4 }}>Seguro de vehículo</div>
          </div>
        </div>

        <div style={{ padding: '32px 40px' }}>
          {/* Client info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 32, padding: '20px 24px', background: C.bg, borderRadius: 12 }}>
            {[
              { label: 'Cliente', value: clientName },
              { label: 'Vehículo', value: vehicleStr },
              { label: 'Fecha de cotización', value: today },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.textSec, letterSpacing: '0.04em', marginBottom: 4 }}>{item.label.toUpperCase()}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '0 0 16px', fontFamily: 'Manrope, sans-serif' }}>Comparativo de opciones</h3>
          <div style={{ overflowX: 'auto', marginBottom: 32 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: C.navy }}>
                  {tableHeaders.map((h) => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ASEGURADORAS.map((a, i) => (
                  <tr key={a.id} style={{ background: i % 2 === 0 ? 'white' : C.bg }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: C.text, whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: a.badgeColor, background: a.badgeBg, padding: '2px 8px', borderRadius: 10 }}>{a.iniciales}</span>
                        {a.nombre}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: C.text }}>{a.precioStr}/año</td>
                    <td style={{ padding: '14px 16px', color: C.textSec, fontSize: 12 }}>{a.deducible}</td>
                    {[a.coberturas.danosPropios, a.coberturas.hurtoTotal, a.coberturas.rc, a.coberturas.asistencia, a.coberturas.vehiculoReemplazo].map((v, ci) => (
                      <td key={ci} style={{ padding: '14px 16px', textAlign: 'center' }}>
                        {v
                          ? <Check size={15} color="#059669" strokeWidth={2.5} />
                          : <Minus size={15} color={C.border} />
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Narrative explanations */}
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '0 0 16px', fontFamily: 'Manrope, sans-serif' }}>¿Qué significa cada opción?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 28 }}>
            {[
              { aseg: ASEGURADORAS[0], note: 'Esta alternativa tiene el mejor equilibrio entre precio y coberturas. Incluye vehículo de reemplazo con el deducible más alto de las opciones premium.' },
              { aseg: ASEGURADORAS[1], note: 'Esta alternativa tiene el menor precio. No incluye vehículo de reemplazo y el deducible es más alto, lo cual implica un mayor desembolso en caso de siniestro.' },
              { aseg: ASEGURADORAS[2], note: 'Esta alternativa presenta el menor deducible entre las opciones consultadas y la mayor cantidad de asistencias incluidas. Tiene el precio más alto.' },
            ].map(({ aseg, note }) => (
              <div key={aseg.id} style={{ padding: '18px', background: aseg.badgeBg, borderRadius: 12, border: `1px solid ${aseg.badgeColor}30` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: aseg.badgeColor, marginBottom: 8 }}>{aseg.nombre}</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.55 }}>{note}</div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{ padding: '16px 20px', background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>Información importante</div>
            <p style={{ fontSize: 12, color: C.textSec, margin: 0, lineHeight: 1.6 }}>
              Las condiciones completas, exclusiones y límites de cobertura deben verificarse en los documentos condicionados de cada aseguradora. Este documento es de carácter informativo y fue generado por el intermediario de seguros para facilitar la comparación de alternativas. No constituye una oferta vinculante ni reemplaza los términos contractuales de cada póliza.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Layout>
  );
}
