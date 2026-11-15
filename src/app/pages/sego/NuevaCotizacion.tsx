import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Check, ChevronLeft, Zap, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Layout } from './Layout';
import { C, CLIENTE_DEMO, VEHICULO_DEMO, ClienteData, VehiculoData, Cotizacion, setCurrentQuote, saveQuoteToStore, genId, parseValor, preciosDe, mejorOfertaDe, fechaCorta, registrarMetrica } from './data';

type Step = 1 | 2;

const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 500, color: '#29263A', display: 'block', marginBottom: 7 };
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 13px', borderRadius: 9,
  border: '1.5px solid #E5E4EA', background: '#FFFFFF', fontSize: 14,
  color: '#29263A', outline: 'none', fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.15s', boxSizing: 'border-box',
};

type Errors = Record<string, string>;

function Field({ label, error, htmlFor, hint, children }: { label: string; error?: string; htmlFor?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} style={labelStyle}>{label}</label>
      {children}
      {error
        ? <div role="alert" style={{ fontSize: 12.5, color: C.error, marginTop: 5 }}>{error}</div>
        : hint ? <div style={{ fontSize: 12, color: C.textSec, marginTop: 5 }}>{hint}</div> : null}
    </div>
  );
}

const digits = (v: string) => v.replace(/\D/g, '');
const formatMiles = (v: string) => { const d = digits(v); return d ? '$' + Number(d).toLocaleString('es-CO') : ''; };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ANIO_ACTUAL = new Date().getFullYear();

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
              <span className={'sego-step-label' + (active ? ' is-active' : '')} style={{ fontSize: 13.5, fontWeight: active ? 600 : 400, color: active ? C.text : done ? C.primary : C.textSec, whiteSpace: 'nowrap' }}>{s}</span>
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
  const location = useLocation();
  const draft = (location.state as { draft?: Cotizacion } | null)?.draft;
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<Errors>({});
  // Métrica: hora en que se tocó "Nueva cotización" (se guarda al cotizar)
  const [inicio] = useState(() => Date.now());
  const [quoteId] = useState(() => draft?.id ?? genId());

  const [cliente, setCliente] = useState<ClienteData>(draft?.cliente ?? {
    nombre: '', tipoDoc: 'CC', numDoc: '', fechaNacimiento: '', email: '', telefono: '', ciudad: '',
  });

  const [vehiculo, setVehiculo] = useState<VehiculoData>(draft?.vehiculo ?? {
    placa: '', marca: '', linea: '', modelo: '', anio: '', valor: '', ciudad: '', uso: 'particular', siniestros: false,
  });

  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  function validateCliente(): Errors {
    const e: Errors = {};
    if (!cliente.nombre.trim()) e.nombre = 'Escribe el nombre del cliente.';
    const doc = digits(cliente.numDoc);
    if (!cliente.numDoc.trim()) e.numDoc = 'Escribe el número de documento.';
    else if (cliente.tipoDoc !== 'PA' && (doc.length < 5 || doc.length > 12)) e.numDoc = 'El documento debe tener entre 5 y 12 dígitos.';
    if (!cliente.email.trim()) e.email = 'Escribe el correo del cliente.';
    else if (!EMAIL_RE.test(cliente.email.trim())) e.email = 'El correo no parece válido (ej. nombre@correo.com).';
    const tel = digits(cliente.telefono);
    if (!tel) e.telefono = 'Escribe el teléfono del cliente.';
    else if (tel.length < 7 || tel.length > 12) e.telefono = 'El teléfono debe tener entre 7 y 10 dígitos (ej. 300 555 0198).';
    if (!cliente.ciudad.trim()) e.ciudad = 'Escribe la ciudad del cliente.';
    return e;
  }

  function validateVehiculo(): Errors {
    const e: Errors = {};
    const placa = vehiculo.placa.replace(/[^A-Z0-9]/g, '');
    if (!placa) e.placa = 'Escribe la placa.';
    else if (placa.length < 5 || placa.length > 6) e.placa = 'La placa debe tener 5 o 6 caracteres (ej. ABC123).';
    if (!vehiculo.marca.trim()) e.marca = 'Escribe la marca.';
    if (!vehiculo.linea.trim()) e.linea = 'Escribe la línea.';
    const anio = Number(vehiculo.anio);
    if (!vehiculo.anio.trim()) e.anio = 'Escribe el año del modelo.';
    else if (!/^\d{4}$/.test(vehiculo.anio.trim()) || anio < 1970 || anio > ANIO_ACTUAL + 1) e.anio = `El año debe ser un número entre 1970 y ${ANIO_ACTUAL + 1}.`;
    const valor = parseValor(vehiculo.valor);
    if (!vehiculo.valor.trim()) e.valor = 'Escribe el valor comercial del vehículo (solo números).';
    else if (!Number.isFinite(valor) || /[a-z]/i.test(vehiculo.valor.replace(/cop/i, ''))) e.valor = 'El valor comercial debe ser un número en pesos (ej. 105000000).';
    else if (valor < 1_000_000) e.valor = 'El valor parece muy bajo. Escríbelo completo en pesos (ej. 105.000.000).';
    else if (valor > 5_000_000_000) e.valor = 'El valor parece demasiado alto. Revísalo.';
    if (!vehiculo.ciudad.trim()) e.ciudadv = 'Escribe la ciudad de circulación.';
    return e;
  }

  function handleContinue() {
    const errs = validateCliente();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStep(2);
  }

  function handleCotizar() {
    const errs = validateVehiculo();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const precios = preciosDe(vehiculo);
    saveQuoteToStore({
      id: quoteId, cliente, vehiculo, fecha: fechaCorta(), estado: 'completada',
      precios, mejorOferta: mejorOfertaDe(precios),
    });
    registrarMetrica(quoteId, 'inicio', { cliente: cliente.nombre, ts: inicio });
    setCurrentQuote({ id: quoteId, cliente, vehiculo, precios });
    navigate('/cotizaciones/procesando');
  }

  function handleSaveDraft() {
    if (!cliente.nombre.trim()) {
      setErrors({ nombre: 'Escribe al menos el nombre del cliente para guardar el borrador.' });
      setStep(1);
      return;
    }
    const precios = parseValor(vehiculo.valor) > 0 ? preciosDe(vehiculo) : undefined;
    saveQuoteToStore({
      id: quoteId, cliente, vehiculo, fecha: fechaCorta(), estado: 'borrador',
      precios, mejorOferta: precios ? mejorOfertaDe(precios) : '—',
    });
    toast.success('Borrador guardado. Lo encuentras en Cotizaciones.');
  }

  const errStyle = (k: string): React.CSSProperties => errors[k] ? { ...inputStyle, borderColor: C.error } : inputStyle;
  const fieldFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => { e.target.style.borderColor = C.primary; };
  const fieldBlur = (k: string) => (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => { e.target.style.borderColor = errors[k] ? C.error : C.border; };
  const clearErr = (k: string) => { if (errors[k]) setErrors((prev) => { const n = { ...prev }; delete n[k]; return n; }); };
  const errorList = Object.values(errors);

  return (
    <Layout breadcrumb={['Cotizaciones', 'Nueva cotización']}>
      <div className="sego-form" style={{ maxWidth: 680 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>
            Nueva cotización
          </h1>
          <p style={{ color: C.textSec, fontSize: 14, marginTop: 7 }}>
            Ingresa la información una sola vez. SEGO se encarga del resto.
          </p>
        </div>

        <Stepper step={step} />

        <div className="sego-card-pad" style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: '28px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          {step === 1 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 10, flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: 0 }}>Datos del cliente</h2>
                <button
                  onClick={() => { setCliente(CLIENTE_DEMO); setErrors({}); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${C.primary}`, background: C.primaryLight, color: C.primary, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                >
                  <Zap size={14} /> Usar datos de prueba
                </button>
              </div>

              <div className="sego-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <Field label="Nombre completo" htmlFor="f-nombre" error={errors.nombre}>
                  <input id="f-nombre" style={errStyle('nombre')} value={cliente.nombre} onChange={(e) => { setCliente({ ...cliente, nombre: e.target.value }); clearErr('nombre'); }} placeholder="Laura Gómez" autoComplete="name" autoCapitalize="words" onFocus={fieldFocus} onBlur={fieldBlur('nombre')} />
                </Field>
                <Field label="Tipo de documento">
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={cliente.tipoDoc} onChange={(e) => setCliente({ ...cliente, tipoDoc: e.target.value })} onFocus={fieldFocus} onBlur={fieldBlur('tipoDoc')}>
                    <option value="CC">Cédula de ciudadanía (CC)</option>
                    <option value="CE">Cédula de extranjería (CE)</option>
                    <option value="NIT">NIT</option>
                    <option value="PA">Pasaporte</option>
                  </select>
                </Field>
                <Field label="Número de documento" htmlFor="f-doc" error={errors.numDoc}>
                  <input id="f-doc" style={errStyle('numDoc')} inputMode={cliente.tipoDoc === 'PA' ? 'text' : 'numeric'} autoComplete="off" value={cliente.numDoc} onChange={(e) => { setCliente({ ...cliente, numDoc: cliente.tipoDoc === 'PA' ? e.target.value.toUpperCase() : digits(e.target.value) }); clearErr('numDoc'); }} placeholder="1023456789" onFocus={fieldFocus} onBlur={fieldBlur('numDoc')} />
                </Field>
                <Field label="Fecha de nacimiento (opcional)" htmlFor="f-nac">
                  <input id="f-nac" style={inputStyle} inputMode="numeric" value={cliente.fechaNacimiento} onChange={(e) => {
                    const d = digits(e.target.value).slice(0, 8);
                    setCliente({ ...cliente, fechaNacimiento: [d.slice(0, 2), d.slice(2, 4), d.slice(4, 8)].filter(Boolean).join('/') });
                  }} placeholder="DD/MM/AAAA" onFocus={fieldFocus} onBlur={fieldBlur('fechaNacimiento')} />
                </Field>
                <Field label="Correo electrónico" htmlFor="f-email" error={errors.email}>
                  <input id="f-email" style={errStyle('email')} type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} value={cliente.email} onChange={(e) => { setCliente({ ...cliente, email: e.target.value.trim() }); clearErr('email'); }} placeholder="laura@email.com" onFocus={fieldFocus} onBlur={fieldBlur('email')} />
                </Field>
                <Field label="Teléfono" htmlFor="f-tel" error={errors.telefono}>
                  <input id="f-tel" style={errStyle('telefono')} type="tel" inputMode="tel" autoComplete="tel" value={cliente.telefono} onChange={(e) => { setCliente({ ...cliente, telefono: e.target.value.replace(/[^\d\s+]/g, '') }); clearErr('telefono'); }} placeholder="300 555 0198" onFocus={fieldFocus} onBlur={fieldBlur('telefono')} />
                </Field>
                <Field label="Ciudad" htmlFor="f-ciudad" error={errors.ciudad}>
                  <input id="f-ciudad" style={errStyle('ciudad')} value={cliente.ciudad} onChange={(e) => { setCliente({ ...cliente, ciudad: e.target.value }); clearErr('ciudad'); }} placeholder="Bogotá D.C." autoComplete="address-level2" onFocus={fieldFocus} onBlur={fieldBlur('ciudad')} />
                </Field>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 10, flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: 0 }}>Datos del vehículo</h2>
                <button
                  onClick={() => { setVehiculo(VEHICULO_DEMO); setErrors({}); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${C.primary}`, background: C.primaryLight, color: C.primary, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                >
                  <Zap size={14} /> Usar vehículo de prueba
                </button>
              </div>

              <div className="sego-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <Field label="Placa" htmlFor="f-placa" error={errors.placa}>
                  <input id="f-placa" style={{ ...errStyle('placa'), textTransform: 'uppercase' }} autoCapitalize="characters" autoComplete="off" spellCheck={false} value={vehiculo.placa} onChange={(e) => { setVehiculo({ ...vehiculo, placa: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6) }); clearErr('placa'); }} placeholder="ABC123" onFocus={fieldFocus} onBlur={fieldBlur('placa')} />
                </Field>
                <Field label="Marca" htmlFor="f-marca" error={errors.marca}>
                  <input id="f-marca" style={errStyle('marca')} autoCapitalize="words" value={vehiculo.marca} onChange={(e) => { setVehiculo({ ...vehiculo, marca: e.target.value }); clearErr('marca'); }} placeholder="Mazda" onFocus={fieldFocus} onBlur={fieldBlur('marca')} />
                </Field>
                <Field label="Línea" htmlFor="f-linea" error={errors.linea}>
                  <input id="f-linea" style={errStyle('linea')} value={vehiculo.linea} onChange={(e) => { setVehiculo({ ...vehiculo, linea: e.target.value }); clearErr('linea'); }} placeholder="CX-30" onFocus={fieldFocus} onBlur={fieldBlur('linea')} />
                </Field>
                <Field label="Versión (opcional)" htmlFor="f-version">
                  <input id="f-version" style={inputStyle} value={vehiculo.modelo} onChange={(e) => setVehiculo({ ...vehiculo, modelo: e.target.value })} placeholder="Grand Touring" onFocus={fieldFocus} onBlur={fieldBlur('modelo')} />
                </Field>
                <Field label="Año del modelo" htmlFor="f-anio" error={errors.anio}>
                  <input id="f-anio" style={errStyle('anio')} inputMode="numeric" maxLength={4} value={vehiculo.anio} onChange={(e) => { setVehiculo({ ...vehiculo, anio: digits(e.target.value).slice(0, 4) }); clearErr('anio'); }} placeholder="2024" onFocus={fieldFocus} onBlur={fieldBlur('anio')} />
                </Field>
                <Field label="Valor comercial (pesos)" htmlFor="f-valor" error={errors.valor} hint="Solo números. Con este valor se calculan los precios.">
                  <input id="f-valor" style={errStyle('valor')} inputMode="numeric" autoComplete="off" value={vehiculo.valor} onChange={(e) => { setVehiculo({ ...vehiculo, valor: formatMiles(e.target.value) }); clearErr('valor'); }} placeholder="$105.000.000" onFocus={fieldFocus} onBlur={fieldBlur('valor')} />
                </Field>
                <Field label="Ciudad de circulación" htmlFor="f-ciudadv" error={errors.ciudadv}>
                  <input id="f-ciudadv" style={errStyle('ciudadv')} value={vehiculo.ciudad} onChange={(e) => { setVehiculo({ ...vehiculo, ciudad: e.target.value }); clearErr('ciudadv'); }} placeholder="Bogotá" onFocus={fieldFocus} onBlur={fieldBlur('ciudadv')} />
                </Field>
                <Field label="Uso del vehículo">
                  <div style={{ display: 'flex', gap: 10 }}>
                    {(['particular', 'comercial'] as const).map((u) => (
                      <button type="button" key={u} onClick={() => setVehiculo({ ...vehiculo, uso: u })} style={{
                        flex: 1, padding: '12px 10px', borderRadius: 9, border: `1.5px solid ${vehiculo.uso === u ? C.primary : C.border}`,
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
                    <button type="button" key={String(v)} onClick={() => setVehiculo({ ...vehiculo, siniestros: v })} style={{
                      padding: '12px 28px', borderRadius: 9, border: `1.5px solid ${vehiculo.siniestros === v ? C.primary : C.border}`,
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

          {errorList.length > 0 && (
            <div style={{ marginTop: 20, padding: '12px 16px', background: C.errorBg, borderRadius: 9, border: '1px solid #FCA5A5', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <AlertCircle size={16} color={C.error} style={{ marginTop: 1, flexShrink: 0 }} />
              <div style={{ fontSize: 13, color: C.error }}>
                <strong>Revisa {errorList.length === 1 ? 'este campo' : `estos ${errorList.length} campos`}:</strong>
                <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
                  {errorList.map((m) => <li key={m}>{m}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="sego-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {step === 2 && (
              <button onClick={() => { setStep(1); setErrors({}); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 18px', borderRadius: 9, border: `1.5px solid ${C.border}`, background: 'white', color: C.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                <ChevronLeft size={15} /> Atrás
              </button>
            )}
            <button onClick={() => navigate('/cotizaciones')} style={{ padding: '12px 18px', borderRadius: 9, border: `1.5px solid ${C.border}`, background: 'white', color: C.textSec, fontSize: 14, fontWeight: 400, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Cancelar
            </button>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleSaveDraft} style={{ padding: '12px 18px', borderRadius: 9, border: `1.5px solid ${C.border}`, background: 'white', color: C.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Guardar borrador
            </button>
            {step === 1 ? (
              <button onClick={handleContinue} style={{ padding: '12px 22px', borderRadius: 9, border: 'none', background: C.primary, color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Continuar →
              </button>
            ) : (
              <button onClick={handleCotizar} style={{ padding: '12px 24px', borderRadius: 9, border: 'none', background: C.primary, color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 8px rgba(84,71,216,0.35)' }}>
                Cotizar →
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
