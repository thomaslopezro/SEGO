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

const INITIAL_QUOTES: Cotizacion[] = [
  {
    id: 'q-001',
    cliente: CLIENTE_DEMO,
    vehiculo: VEHICULO_DEMO,
    fecha: 'Hoy',
    estado: 'completada',
    mejorOferta: '$2.480.000/año',
  },
  {
    id: 'q-002',
    cliente: {
      nombre: 'Carlos Rodríguez', tipoDoc: 'CC', numDoc: '79.456.123',
      fechaNacimiento: '20/03/1985', email: 'carlos.rodriguez@email.com',
      telefono: '310 444 0267', ciudad: 'Bogotá D.C.',
    },
    vehiculo: {
      placa: 'DEF456', marca: 'Toyota', linea: 'Corolla Cross', modelo: 'XEI',
      anio: '2023', valor: '$92.000.000 COP', ciudad: 'Bogotá', uso: 'particular', siniestros: false,
    },
    fecha: 'Ayer',
    estado: 'completada',
    mejorOferta: '$2.150.000/año',
  },
  {
    id: 'q-003',
    cliente: {
      nombre: 'Andrés Martínez', tipoDoc: 'CC', numDoc: '1.098.765.432',
      fechaNacimiento: '08/11/1990', email: 'andres.martinez@email.com',
      telefono: '320 333 0156', ciudad: 'Medellín',
    },
    vehiculo: {
      placa: 'GHI789', marca: 'Renault', linea: 'Duster', modelo: 'Intens',
      anio: '2022', valor: '$68.000.000 COP', ciudad: 'Medellín', uso: 'particular', siniestros: false,
    },
    fecha: '22 Sep',
    estado: 'completada',
    mejorOferta: '$1.890.000/año',
  },
];

const QUOTES_KEY = 'sego_quotes_v3';
const CURRENT_QUOTE_KEY = 'sego_current_quote_v3';

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
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

export function getCurrentQuote(): { cliente?: ClienteData; vehiculo?: VehiculoData } {
  try {
    const stored = sessionStorage.getItem(CURRENT_QUOTE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function setCurrentQuote(data: { cliente?: ClienteData; vehiculo?: VehiculoData }) {
  sessionStorage.setItem(CURRENT_QUOTE_KEY, JSON.stringify(data));
}

export function clearCurrentQuote() {
  sessionStorage.removeItem(CURRENT_QUOTE_KEY);
}

export function genId() {
  return 'q-' + Date.now().toString(36);
}

export function formatPrecioMensual(anual: number) {
  return '$' + Math.round(anual / 12).toLocaleString('es-CO');
}
