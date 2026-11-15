export const C = {
  primary: '#5447D8',
  primaryLight: '#EEF0FD',
  primaryDark: '#3D33C4',
  navy: '#272143',
  bg: '#F7F7FA',
  white: '#FFFFFF',
  text: '#29263A',
  textSec: '#6C687A',
  border: '#E5E4EA',
  success: '#059669',
  successBg: '#ECFDF5',
  warning: '#D97706',
  warningBg: '#FFFBEB',
  error: '#DC2626',
  errorBg: '#FEF2F2',
  sidebarHover: 'rgba(255,255,255,0.07)',
  sidebarActive: 'rgba(84,71,216,0.22)',
};

export interface ClienteData {
  nombre: string;
  tipoDoc: string;
  numDoc: string;
  fechaNacimiento: string;
  email: string;
  telefono: string;
  ciudad: string;
}

export interface VehiculoData {
  placa: string;
  marca: string;
  linea: string;
  modelo: string;
  anio: string;
  valor: string;
  ciudad: string;
  uso: 'particular' | 'comercial';
  siniestros: boolean;
}

export interface Aseguradora {
  id: string;
  nombre: string;
  iniciales: string;
  color: string;
  precio: number;
  precioStr: string;
  deducible: string;
  /** Deducible: porcentaje del daño y mínimo en pesos (para ordenar). */
  deduciblePct: number;
  deducibleMin: number;
  /** Tasa anual de demostración sobre el valor comercial. */
  tasa: number;
  badge: string;
  badgeColor: string;
  badgeBg: string;
  coberturas: {
    danosPropios: boolean;
    hurtoTotal: boolean;
    rc: boolean;
    asistencia: boolean;
    vehiculoReemplazo: boolean;
  };
  exclusiones: string[];
  asistencias: string[];
  enPalabrasSimpoles: string;
  featured?: boolean;
}

export interface Cotizacion {
  id: string;
  cliente: ClienteData;
  vehiculo: VehiculoData;
  fecha: string;
  estado: 'completada' | 'borrador';
  mejorOferta: string;
  /** Prima anual calculada por aseguradora (id → pesos). */
  precios?: Record<string, number>;
}

export const ASEGURADORAS: Aseguradora[] = [
  {
    id: 'andina',
    nombre: 'Aseguradora Andina',
    iniciales: 'AA',
    color: '#5447D8',
    precio: 2480000,
    precioStr: '$2.480.000',
    deducible: '10% mínimo $1.200.000',
    deduciblePct: 10,
    deducibleMin: 1200000,
    tasa: 0.034,
    badge: 'Mejor relación cobertura/precio',
    badgeColor: '#5447D8',
    badgeBg: '#EEF0FD',
    coberturas: { danosPropios: true, hurtoTotal: true, rc: true, asistencia: true, vehiculoReemplazo: true },
    exclusiones: ['Daños por desgaste normal', 'Pérdidas mecánicas sin accidente', 'Daños intencionales por el asegurado'],
    asistencias: ['Grúa 24 horas', 'Cerrajería de emergencia', 'Taxi de emergencia', 'Suministro de combustible'],
    enPalabrasSimpoles: 'Esta opción cubre daños y hurto de tu vehículo, además de los daños que puedas causar a terceros. Incluye vehículo de reemplazo por hasta 5 días. Si tienes un accidente cubierto, deberás asumir el 10% del daño (mínimo $1.200.000) y la aseguradora cubrirá el valor restante según las condiciones de la póliza.',
    featured: true,
  },
  {
    id: 'capital',
    nombre: 'Seguros Capital',
    iniciales: 'SC',
    color: '#059669',
    precio: 2150000,
    precioStr: '$2.150.000',
    deducible: '15% mínimo $1.500.000',
    deduciblePct: 15,
    deducibleMin: 1500000,
    tasa: 0.028,
    badge: 'Menor precio',
    badgeColor: '#059669',
    badgeBg: '#ECFDF5',
    coberturas: { danosPropios: true, hurtoTotal: true, rc: true, asistencia: true, vehiculoReemplazo: false },
    exclusiones: ['Daños por desgaste normal', 'Pérdidas mecánicas sin accidente', 'Conductores no autorizados en la póliza'],
    asistencias: ['Grúa 24 horas', 'Cerrajería de emergencia', 'Suministro de combustible'],
    enPalabrasSimpoles: 'Esta alternativa tiene el menor precio del comparativo. Cubre daños propios y hurto total, pero no incluye vehículo de reemplazo. El deducible es más alto (15%), lo que significa que asumirías más en caso de siniestro.',
  },
  {
    id: 'proteccion',
    nombre: 'Protección Nacional',
    iniciales: 'PN',
    color: '#D97706',
    precio: 2790000,
    precioStr: '$2.790.000',
    deducible: '10% mínimo $1.000.000',
    deduciblePct: 10,
    deducibleMin: 1000000,
    tasa: 0.042,
    badge: 'Mayor cobertura',
    badgeColor: '#D97706',
    badgeBg: '#FFFBEB',
    coberturas: { danosPropios: true, hurtoTotal: true, rc: true, asistencia: true, vehiculoReemplazo: true },
    exclusiones: ['Daños por desgaste normal', 'Pérdidas mecánicas sin accidente'],
    asistencias: ['Grúa 24 horas', 'Cerrajería de emergencia', 'Taxi de emergencia', 'Suministro de combustible', 'Hospedaje de emergencia'],
    enPalabrasSimpoles: 'Esta es la opción más completa del comparativo. Tiene el deducible mínimo más bajo ($1.000.000), lo que significa que asumes menos en caso de siniestro. Incluye vehículo de reemplazo y la mayor cantidad de servicios de asistencia disponibles.',
  },
];

export const CLIENTE_DEMO: ClienteData = {
  nombre: 'Laura Gómez',
  tipoDoc: 'CC',
  numDoc: '1.023.456.789',
  fechaNacimiento: '15/06/1992',
  email: 'laura.gomez@email.com',
  telefono: '300 555 0198',
  ciudad: 'Bogotá D.C.',
};

export const VEHICULO_DEMO: VehiculoData = {
  placa: 'ABC123',
  marca: 'Mazda',
  linea: 'CX-30',
  modelo: 'Grand Touring',
  anio: '2024',
  valor: '$105.000.000 COP',
  ciudad: 'Bogotá',
  uso: 'particular',
  siniestros: false,
};

// ─── Precios (fórmula de demostración) ──────────────────────────────────────

/** Extrae el número de un texto como "$105.000.000 COP". Devuelve NaN si no hay dígitos. */
export function parseValor(valor: string): number {
  const digits = (valor ?? '').replace(/\D/g, '');
  return digits ? Number(digits) : NaN;
}

export function formatCOP(n: number) {
  return '$' + Math.round(n).toLocaleString('es-CO');
}

/**
 * Prima anual de demostración: valor comercial × tasa de la aseguradora,
 * +15% uso comercial, +20% si tuvo siniestros, +10% si el modelo tiene más de 10 años.
 * Redondeada a miles de pesos.
 */
export function calcularPrima(aseg: Aseguradora, vehiculo: VehiculoData): number {
  const valor = parseValor(vehiculo.valor);
  if (!Number.isFinite(valor) || valor <= 0) return 0;
  let prima = valor * aseg.tasa;
  if (vehiculo.uso === 'comercial') prima *= 1.15;
  if (vehiculo.siniestros) prima *= 1.2;
  const anio = Number(vehiculo.anio);
  if (Number.isFinite(anio) && anio > 0 && new Date().getFullYear() - anio > 10) prima *= 1.1;
  return Math.round(prima / 1000) * 1000;
}

/** Aseguradoras con el precio calculado para este vehículo (o con los precios ya guardados). */
export function cotizarAseguradoras(vehiculo?: VehiculoData, precios?: Record<string, number>): Aseguradora[] {
  const v = vehiculo ?? VEHICULO_DEMO;
  return ASEGURADORAS.map((a) => {
    const precio = precios?.[a.id] ?? calcularPrima(a, v);
    return { ...a, precio, precioStr: formatCOP(precio) };
  });
}

export function preciosDe(vehiculo: VehiculoData): Record<string, number> {
  return Object.fromEntries(cotizarAseguradoras(vehiculo).map((a) => [a.id, a.precio]));
}

export function mejorOfertaDe(precios: Record<string, number>) {
  return formatCOP(Math.min(...Object.values(precios))) + '/año';
}

export function fechaCorta(d = new Date()) {
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
}

function demoQuote(id: string, cliente: ClienteData, vehiculo: VehiculoData): Cotizacion {
  const precios = preciosDe(vehiculo);
  return { id, cliente, vehiculo, fecha: 'Ejemplo', estado: 'completada', precios, mejorOferta: mejorOfertaDe(precios) };
}

const INITIAL_QUOTES: Cotizacion[] = [
  demoQuote('q-001', CLIENTE_DEMO, VEHICULO_DEMO),
  demoQuote('q-002', {
    nombre: 'Carlos Rodríguez', tipoDoc: 'CC', numDoc: '79456123',
    fechaNacimiento: '20/03/1985', email: 'carlos.rodriguez@email.com',
    telefono: '3104440267', ciudad: 'Bogotá D.C.',
  }, {
    placa: 'DEF456', marca: 'Toyota', linea: 'Corolla Cross', modelo: 'XEI',
    anio: '2023', valor: '$92.000.000', ciudad: 'Bogotá', uso: 'particular', siniestros: false,
  }),
  demoQuote('q-003', {
    nombre: 'Andrés Martínez', tipoDoc: 'CC', numDoc: '1098765432',
    fechaNacimiento: '08/11/1990', email: 'andres.martinez@email.com',
    telefono: '3203330156', ciudad: 'Medellín',
  }, {
    placa: 'GHI789', marca: 'Renault', linea: 'Duster', modelo: 'Intens',
    anio: '2013', valor: '$38.000.000', ciudad: 'Medellín', uso: 'comercial', siniestros: true,
  }),
];

const QUOTES_KEY = 'sego_quotes_v4';
const CURRENT_QUOTE_KEY = 'sego_current_quote_v4';

export function getQuotes(): Cotizacion[] {
  try {
    const stored = localStorage.getItem(QUOTES_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(QUOTES_KEY, JSON.stringify(INITIAL_QUOTES));
    return INITIAL_QUOTES;
  } catch {
    return INITIAL_QUOTES;
  }
}

export function saveQuoteToStore(quote: Cotizacion) {
  const quotes = getQuotes();
  const idx = quotes.findIndex((q) => q.id === quote.id);
  if (idx >= 0) quotes[idx] = quote;
  else quotes.unshift(quote);
  try { localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes)); } catch { /* almacenamiento no disponible */ }
}

export interface CurrentQuote {
  id?: string;
  cliente?: ClienteData;
  vehiculo?: VehiculoData;
  precios?: Record<string, number>;
}

export function getCurrentQuote(): CurrentQuote {
  try {
    const stored = sessionStorage.getItem(CURRENT_QUOTE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function setCurrentQuote(data: CurrentQuote) {
  try { sessionStorage.setItem(CURRENT_QUOTE_KEY, JSON.stringify(data)); } catch { /* noop */ }
}

export function clearCurrentQuote() {
  try { sessionStorage.removeItem(CURRENT_QUOTE_KEY); } catch { /* noop */ }
}

/** Abre una cotización del historial: la deja como cotización actual. */
export function cargarCotizacion(q: Cotizacion) {
  setCurrentQuote({ id: q.id, cliente: q.cliente, vehiculo: q.vehiculo, precios: q.precios ?? preciosDe(q.vehiculo) });
}

export function genId() {
  return 'q-' + Date.now().toString(36);
}

export function formatPrecioMensual(anual: number) {
  return '$' + Math.round(anual / 12).toLocaleString('es-CO');
}

// ─── Link para el cliente ───────────────────────────────────────────────────
// No hay backend: el token lleva los datos mínimos (nombre de pila, vehículo y
// precios) para que el cliente vea su cotización desde su propio celular.

export interface ClienteTokenData {
  n: string;
  v: Pick<VehiculoData, 'marca' | 'linea' | 'modelo' | 'anio' | 'ciudad'>;
  p: Record<string, number>;
}

export function crearTokenCliente(q: CurrentQuote): string {
  const v = q.vehiculo ?? VEHICULO_DEMO;
  const data: ClienteTokenData = {
    n: (q.cliente?.nombre ?? CLIENTE_DEMO.nombre).trim().split(/\s+/)[0],
    v: { marca: v.marca, linea: v.linea, modelo: v.modelo, anio: v.anio, ciudad: v.ciudad },
    p: q.precios ?? preciosDe(v),
  };
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  let bin = '';
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function leerTokenCliente(token?: string): ClienteTokenData | null {
  if (!token) return null;
  try {
    const b64 = token.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const data = JSON.parse(new TextDecoder().decode(bytes));
    if (data && typeof data.n === 'string' && data.v && data.p) return data as ClienteTokenData;
  } catch { /* token inválido */ }
  return null;
}

export function linkCliente(q: CurrentQuote) {
  return `${window.location.origin}/cliente/${crearTokenCliente(q)}`;
}

// ─── Métricas para pruebas de campo (solo en este navegador) ────────────────

export interface MetricaCotizacion {
  id: string;
  cliente: string;
  inicio: number;
  resultados?: number;
  documento?: number;
}

const METRICS_KEY = 'sego_metricas_v1';

export function getMetricas(): Record<string, MetricaCotizacion> {
  try {
    return JSON.parse(localStorage.getItem(METRICS_KEY) || '{}');
  } catch {
    return {};
  }
}

/** "inicio" se guarda al crear la cotización; resultados/documento solo la primera vez. */
export function registrarMetrica(
  id: string | undefined,
  campo: 'inicio' | 'resultados' | 'documento',
  extra?: { cliente?: string; ts?: number },
) {
  if (!id) return;
  try {
    const all = getMetricas();
    const ts = extra?.ts ?? Date.now();
    const m: MetricaCotizacion = all[id] ?? { id, cliente: extra?.cliente ?? '', inicio: ts };
    if (extra?.cliente) m.cliente = extra.cliente;
    if (campo === 'inicio') m.inicio = ts;
    else if (m[campo] == null) {
      if (!all[id]) return; // cotizaciones de ejemplo o anteriores a la medición
      m[campo] = ts;
    }
    all[id] = m;
    localStorage.setItem(METRICS_KEY, JSON.stringify(all));
  } catch { /* noop */ }
}

export function borrarMetricas() {
  try { localStorage.removeItem(METRICS_KEY); } catch { /* noop */ }
}
