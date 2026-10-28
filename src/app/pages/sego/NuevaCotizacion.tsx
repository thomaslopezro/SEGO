import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check, ChevronLeft, Zap, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Layout } from './Layout';
import { C, CLIENTE_DEMO, VEHICULO_DEMO, ClienteData, VehiculoData, setCurrentQuote } from './data';

type Step = 1 | 2;

const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 500, color: '#29263A', display: 'block', marginBottom: 7 };
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 13px', borderRadius: 9,
  border: '1.5px solid #E5E4EA', background: '#FFFFFF', fontSize: 14,
  color: '#29263A', outline: 'none', fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.15s', boxSizing: 'border-box',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps = ['Cliente', 'Vehículo', 'Cotizar'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 36 }}>
      {steps.map((s, i) => {
        const idx = i + 1;
        const done = idx < step;
        const active = idx === step;
        return (
          <React.Fragment key={s}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? C.primary : active ? C.primary : C.border,
                color: done || active ? 'white' : C.textSec,
                fontSize: 13, fontWeight: 600, flexShrink: 0,
                boxShadow: active ? '0 0 0 4px rgba(84,71,216,0.15)' : 'none',
                transition: 'all 0.2s',
              }}>
                {done ? <Check size={14} /> : idx}
              </div>
              <span style={{ fontSize: 13.5, fontWeight: active ? 600 : 400, color: active ? C.text : done ? C.primary : C.textSec, whiteSpace: 'nowrap' }}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 1.5, margin: '0 12px', background: done ? C.primary : C.border, minWidth: 20, transition: 'background 0.3s' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function NuevaCotizacion() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<string[]>([]);

  const [cliente, setCliente] = useState<ClienteData>({
    nombre: '', tipoDoc: 'CC', numDoc: '', fechaNacimiento: '', email: '', telefono: '', ciudad: '',
  });

  const [vehiculo, setVehiculo] = useState<VehiculoData>({
    placa: '', marca: '', linea: '', modelo: '', anio: '', valor: '', ciudad: '', uso: 'particular', siniestros: false,
  });

  function validateCliente() {
    const errs: string[] = [];
    if (!cliente.nombre.trim()) errs.push('Nombre completo');
    if (!cliente.numDoc.trim()) errs.push('Número de documento');
    if (!cliente.email.trim()) errs.push('Correo electrónico');
    if (!cliente.telefono.trim()) errs.push('Teléfono');
    if (!cliente.ciudad.trim()) errs.push('Ciudad');
    return errs;
  }

  function validateVehiculo() {
    const errs: string[] = [];
    if (!vehiculo.placa.trim()) errs.push('Placa');
    if (!vehiculo.marca.trim()) errs.push('Marca');
    if (!vehiculo.linea.trim()) errs.push('Línea');
    if (!vehiculo.anio.trim()) errs.push('Año');
    if (!vehiculo.valor.trim()) errs.push('Valor comercial');
    if (!vehiculo.ciudad.trim()) errs.push('Ciudad de circulación');
    return errs;
  }

  function handleContinue() {
    const errs = validateCliente();
    if (errs.length) { setErrors(errs); return; }
    setErrors([]);
    setStep(2);
    window.scrollTo(0, 0);
  }

  function handleCotizar() {
    const errs = validateVehiculo();
    if (errs.length) { setErrors(errs); return; }
    setErrors([]);
    setCurrentQuote({ cliente, vehiculo });
    navigate('/cotizaciones/procesando');
  }

  function handleSaveDraft() {
    toast.success('Borrador guardado correctamente.');
  }

  const fieldFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => { e.target.style.borderColor = C.primary; };
  const fieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => { e.target.style.borderColor = C.border; };

  return (
    <Layout breadcrumb={['Cotizaciones', 'Nueva cotización']}>
      <div style={{ maxWidth: 680 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>
            Nueva cotización
          </h1>
          <p style={{ color: C.textSec, fontSize: 14, marginTop: 7 }}>
            Ingresa la información una sola vez. SEGO se encarga del resto.
          </p>
        </div>

        <Stepper step={step} />

        <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: '28px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          {step === 1 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: 0 }}>Datos del cliente</h2>
                <button
                  onClick={() => setCliente(CLIENTE_DEMO)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: `1.5px solid ${C.primary}`, background: C.primaryLight, color: C.primary, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                >
                  <Zap size={14} /> Usar datos de prueba
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <Field label="Nombre completo">
                  <input style={{ ...inputStyle, gridColumn: '1/-1' }} value={cliente.nombre} onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })} placeholder="Laura Gómez" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Tipo de documento">
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={cliente.tipoDoc} onChange={(e) => setCliente({ ...cliente, tipoDoc: e.target.value })} onFocus={fieldFocus} onBlur={fieldBlur}>
                    <option value="CC">Cédula de ciudadanía (CC)</option>
                    <option value="CE">Cédula de extranjería (CE)</option>
                    <option value="NIT">NIT</option>
                    <option value="PA">Pasaporte</option>
                  </select>
                </Field>
                <Field label="Número de documento">
                  <input style={inputStyle} value={cliente.numDoc} onChange={(e) => setCliente({ ...cliente, numDoc: e.target.value })} placeholder="1.023.456.789" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Fecha de nacimiento">
                  <input style={inputStyle} value={cliente.fechaNacimiento} onChange={(e) => setCliente({ ...cliente, fechaNacimiento: e.target.value })} placeholder="DD/MM/AAAA" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Correo electrónico">
                  <input style={inputStyle} type="email" value={cliente.email} onChange={(e) => setCliente({ ...cliente, email: e.target.value })} placeholder="laura@email.com" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Teléfono">
                  <input style={inputStyle} value={cliente.telefono} onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })} placeholder="300 555 0198" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Ciudad">
                  <input style={{ ...inputStyle, gridColumn: '1/-1' }} value={cliente.ciudad} onChange={(e) => setCliente({ ...cliente, ciudad: e.target.value })} placeholder="Bogotá D.C." onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: 0 }}>Datos del vehículo</h2>
                <button
                  onClick={() => setVehiculo(VEHICULO_DEMO)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: `1.5px solid ${C.primary}`, background: C.primaryLight, color: C.primary, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                >
                  <Zap size={14} /> Usar vehículo de prueba
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <Field label="Placa">
                  <input style={inputStyle} value={vehiculo.placa} onChange={(e) => setVehiculo({ ...vehiculo, placa: e.target.value.toUpperCase() })} placeholder="ABC123" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Marca">
                  <input style={inputStyle} value={vehiculo.marca} onChange={(e) => setVehiculo({ ...vehiculo, marca: e.target.value })} placeholder="Mazda" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Línea">
                  <input style={inputStyle} value={vehiculo.linea} onChange={(e) => setVehiculo({ ...vehiculo, linea: e.target.value })} placeholder="CX-30" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Modelo / Versión">
                  <input style={inputStyle} value={vehiculo.modelo} onChange={(e) => setVehiculo({ ...vehiculo, modelo: e.target.value })} placeholder="Grand Touring" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Año">
                  <input style={inputStyle} value={vehiculo.anio} onChange={(e) => setVehiculo({ ...vehiculo, anio: e.target.value })} placeholder="2024" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Valor comercial aproximado">
                  <input style={inputStyle} value={vehiculo.valor} onChange={(e) => setVehiculo({ ...vehiculo, valor: e.target.value })} placeholder="$105.000.000 COP" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Ciudad de circulación">
                  <input style={inputStyle} value={vehiculo.ciudad} onChange={(e) => setVehiculo({ ...vehiculo, ciudad: e.target.value })} placeholder="Bogotá" onFocus={fieldFocus} onBlur={fieldBlur} />
                </Field>
                <Field label="Uso del vehículo">
                  <div style={{ display: 'flex', gap: 10 }}>
                    {(['particular', 'comercial'] as const).map((u) => (
                      <button key={u} onClick={() => setVehiculo({ ...vehiculo, uso: u })} style={{
                        flex: 1, padding: '10px', borderRadius: 9, border: `1.5px solid ${vehiculo.uso === u ? C.primary : C.border}`,
                        background: vehiculo.uso === u ? C.primaryLight : 'white',
                        color: vehiculo.uso === u ? C.primary : C.textSec,
                        fontSize: 13.5, fontWeight: vehiculo.uso === u ? 600 : 400, cursor: 'pointer',
                        transition: 'all 0.15s', fontFamily: 'Inter, sans-serif', textTransform: 'capitalize',
                      }}>
                        {u}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div style={{ marginTop: 20, padding: '16px 20px', background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 12 }}>
                  ¿Ha tenido siniestros en los últimos 3 años?
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {([true, false] as const).map((v) => (
                    <button key={String(v)} onClick={() => setVehiculo({ ...vehiculo, siniestros: v })} style={{
                      padding: '9px 24px', borderRadius: 9, border: `1.5px solid ${vehiculo.siniestros === v ? C.primary : C.border}`,
                      background: vehiculo.siniestros === v ? C.primaryLight : 'white',
                      color: vehiculo.siniestros === v ? C.primary : C.textSec,
                      fontSize: 13.5, fontWeight: vehiculo.siniestros === v ? 600 : 400, cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {v ? 'Sí' : 'No'}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {errors.length > 0 && (
            <div style={{ marginTop: 20, padding: '12px 16px', background: C.errorBg, borderRadius: 9, border: '1px solid #FCA5A5', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <AlertCircle size={16} color={C.error} style={{ marginTop: 1, flexShrink: 0 }} />
              <div style={{ fontSize: 13, color: C.error }}>
                <strong>Campos requeridos:</strong> {errors.join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {step === 2 && (
              <button onClick={() => { setStep(1); setErrors([]); window.scrollTo(0,0); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 9, border: `1.5px solid ${C.border}`, background: 'white', color: C.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                <ChevronLeft size={15} /> Atrás
              </button>
            )}
            <button onClick={() => navigate('/cotizaciones')} style={{ padding: '10px 18px', borderRadius: 9, border: `1.5px solid ${C.border}`, background: 'white', color: C.textSec, fontSize: 14, fontWeight: 400, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Cancelar
            </button>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleSaveDraft} style={{ padding: '10px 18px', borderRadius: 9, border: `1.5px solid ${C.border}`, background: 'white', color: C.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Guardar borrador
            </button>
            {step === 1 ? (
              <button onClick={handleContinue} style={{ padding: '10px 22px', borderRadius: 9, border: 'none', background: C.primary, color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Continuar →
              </button>
            ) : (
              <button onClick={handleCotizar} style={{ padding: '10px 24px', borderRadius: 9, border: 'none', background: C.primary, color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 8px rgba(84,71,216,0.35)' }}>
                Cotizar →
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
