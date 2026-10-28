import React, { useState, useRef, useEffect } from 'react';
import { Check, Minus, ExternalLink, MessageCircle, X, Send, Bot, ChevronRight, Shield, AlertTriangle, Sparkles } from 'lucide-react';
import { ASEGURADORAS, Aseguradora, getCurrentQuote, C } from './data';

// ─── AI knowledge base ───────────────────────────────────────────────────────

interface AIRule {
  keywords: string[];
  response: string;
}

const AI_RULES: AIRule[] = [
  {
    keywords: ['deducible', 'deduc', 'pago inicial', 'pago propio'],
    response: 'El **deducible** es el monto que tú asumes directamente en caso de un siniestro. Por ejemplo, si tu deducible es del 10% con mínimo $1.200.000, y los daños son $4.000.000, tú pagas $1.200.000 y la aseguradora cubre los $2.800.000 restantes. Si el 10% supera el mínimo, aplica el porcentaje. Entre las tres opciones, **Protección Nacional** tiene el deducible mínimo más bajo ($1.000.000).',
  },
  {
    keywords: ['hurto', 'robo', 'robaron', 'robar', 'hurtar'],
    response: 'El **hurto total** cubre el caso en que tu vehículo sea robado completamente. La aseguradora te reconoce el valor asegurado del vehículo (según el avalúo acordado en la póliza), descontando el deducible. ¡Buena noticia! Las **tres opciones** que tienes incluyen cobertura de hurto total.',
  },
  {
    keywords: ['daño', 'accidente', 'choque', 'colision', 'colisión', 'daños propios'],
    response: 'Los **daños propios** cubren los daños materiales que sufra tu vehículo en un accidente (choque, volcamiento, etc.), independientemente de quién tenga la culpa. Las **tres opciones** incluyen esta cobertura. Recuerda que siempre aplica el deducible según las condiciones de cada póliza.',
  },
  {
    keywords: ['responsabilidad civil', 'rc', 'tercero', 'terceros', 'daños a otros'],
    response: 'La **Responsabilidad Civil (RC)** te protege cuando causas daños materiales o lesiones a otras personas en un accidente. Sin esta cobertura, tendrías que pagar de tu bolsillo. Las **tres opciones** la incluyen, lo que es esencial para circular tranquilo en Colombia.',
  },
  {
    keywords: ['reemplazo', 'carro reemplazo', 'auto reemplazo', 'vehiculo reemplazo', 'vehículo reemplazo'],
    response: 'El **vehículo de reemplazo** te proporciona un carro mientras el tuyo está en el taller tras un siniestro cubierto. **Aseguradora Andina** y **Protección Nacional** lo incluyen (hasta 5 días en Andina, más días en Protección Nacional). **Seguros Capital** no lo ofrece en este plan, lo que explica parte de su menor precio.',
  },
  {
    keywords: ['asistencia', 'grúa', 'remolque', 'varado', 'batería', 'llanta', 'gasolina', 'combustible'],
    response: 'La **asistencia vial** incluye servicios como grúa 24h, cerrajería, suministro de combustible de emergencia, y taxi de emergencia. Las tres opciones la ofrecen. **Protección Nacional** incluye además hospedaje de emergencia, que es útil si el accidente ocurre lejos de tu ciudad.',
  },
  {
    keywords: ['barata', 'barato', 'económica', 'económico', 'precio', 'menor precio', 'más económica', 'menos cara', 'cuesta'],
    response: '**Seguros Capital** es la opción de menor precio con **$2.150.000/año** (≈$179.000/mes). A cambio, el deducible es más alto (15%) y no incluye vehículo de reemplazo. Si el presupuesto es lo más importante, es la opción a considerar, aunque vale la pena evaluar el mayor desembolso en caso de siniestro.',
  },
  {
    keywords: ['completa', 'cobertura completa', 'mejor cobertura', 'más completa', 'todo cubre'],
    response: '**Protección Nacional** es la opción más completa: incluye el menor deducible mínimo ($1.000.000), vehículo de reemplazo, y la mayor cantidad de asistencias (incluyendo hospedaje de emergencia). Su precio es $2.790.000/año (≈$232.500/mes). Ideal si quieres la mayor tranquilidad posible.',
  },
  {
    keywords: ['recomiend', 'mejor opcion', 'mejor opción', 'cuál elijo', 'cual elijo', 'qué me conviene', 'que me conviene', 'cuál escoger'],
    response: 'Como IA de SEGO, no puedo hacer recomendaciones financieras personales, pero sí puedo ayudarte a comparar. Considera:\n- **Seguros Capital** si el precio es tu prioridad.\n- **Aseguradora Andina** si buscas el mejor equilibrio entre precio y coberturas.\n- **Protección Nacional** si quieres la cobertura más amplia y el menor deducible mínimo.\nTu intermediario de seguros puede orientarte mejor según tu situación específica.',
  },
  {
    keywords: ['diferencia', 'diferencias', 'en qué se diferencian', 'comparar', 'comparación'],
    response: 'Las principales diferencias entre las tres opciones son:\n\n**Precio:** Capital ($2.15M) < Andina ($2.48M) < Protección ($2.79M)\n\n**Deducible mínimo:** Protección ($1.0M) < Andina ($1.2M) < Capital ($1.5M)\n\n**Vehículo de reemplazo:** Andina ✓ y Protección ✓, Capital ✗\n\n**Asistencias:** Protección tiene más servicios incluidos.\n\n¿Quieres que te explique algo específico de alguna opción?',
  },
  {
    keywords: ['pagar', 'pago', 'cómo pago', 'como pago', 'forma de pago', 'pagar seguro'],
    response: 'Para pagar tu seguro, selecciona la opción que prefieras y haz clic en **"Pagar mi seguro"** en la tarjeta correspondiente. Serás redirigido al portal de pagos oficial de esa aseguradora, donde podrás completar el proceso de forma segura. SEGO no procesa pagos directamente, simplemente te conecta con la aseguradora elegida.',
  },
  {
    keywords: ['soat', 'obligatorio'],
    response: 'El **SOAT** (Seguro Obligatorio de Accidentes de Tránsito) es diferente al seguro todo riesgo que estás consultando. El SOAT es obligatorio por ley y cubre lesiones personales a víctimas de accidentes de tránsito. El seguro que estás viendo complementa el SOAT cubriendo daños al vehículo y responsabilidad civil por daños materiales. Ambos son importantes.',
  },
  {
    keywords: ['exclusion', 'exclusión', 'excluye', 'no cubre', 'qué no cubre'],
    response: 'Las exclusiones más comunes en las tres opciones son:\n- Daños por **desgaste normal** del vehículo\n- **Pérdidas mecánicas** sin causa de accidente\n- Daños causados **intencionalmente**\n- Conducir bajo efectos del alcohol o sustancias\n- Conductores no autorizados en la póliza (especialmente en Seguros Capital)\n\nSiempre es importante leer las condiciones completas de cada póliza.',
  },
  {
    keywords: ['vigencia', 'duración', 'cuánto tiempo', 'cuanto tiempo', 'año', 'mensual'],
    response: 'Los precios que ves son **anuales**. La póliza tiene una vigencia de 12 meses y se renueva cada año. El precio mensual equivalente sería:\n- Andina: ≈$206.667/mes\n- Capital: ≈$179.167/mes\n- Protección: ≈$232.500/mes\n\nAlgunas aseguradoras permiten pagar en cuotas. Consulta las condiciones de pago con tu intermediario.',
  },
  {
    keywords: ['hola', 'buenos', 'buenas', 'saludos', 'hey', 'hi'],
    response: '¡Hola! Soy SEGO IA, tu asistente para entender las opciones de seguro de tu Mazda CX-30. Puedo explicarte coberturas, deducibles, diferencias entre las opciones, o cómo funciona el proceso de pago. ¿Qué te gustaría saber?',
  },
  {
    keywords: ['gracias', 'thank', 'ok', 'okay', 'perfecto', 'entendido', 'listo'],
    response: '¡Con gusto! Recuerda que si tienes más dudas sobre tu cotización, aquí estaré. También puedes hablar directamente con el intermediario que preparó esta propuesta. ¿Hay algo más que quieras saber sobre las opciones?',
  },
];

const SUGGESTED_QUESTIONS = [
  '¿Qué es el deducible?',
  '¿Cuál tiene mejor cobertura?',
  '¿Cuál es la diferencia entre las opciones?',
  '¿Cómo funciona el hurto total?',
  '¿Cómo pago mi seguro?',
];

function getAIResponse(input: string): string {
  const lower = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  for (const rule of AI_RULES) {
    if (rule.keywords.some((k) => lower.includes(k.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))) {
      return rule.response;
    }
  }
  return 'Interesante pregunta. Para ese detalle específico, te recomiendo consultar directamente con el intermediario de seguros que preparó esta propuesta. Puedo ayudarte con preguntas sobre coberturas, deducibles, diferencias entre opciones, o el proceso de pago. ¿Hay algo así que quieras saber?';
}

// ─── Chat component ────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  ts: Date;
}

function formatMarkdown(text: string) {
  const parts = text.split('\n').map((line, i) => {
    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return <span key={i} dangerouslySetInnerHTML={{ __html: formatted }} style={{ display: 'block', marginBottom: line === '' ? 4 : 0 }} />;
  });
  return <>{parts}</>;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'ai',
      text: '¡Hola! Soy SEGO IA. Puedo responder tus preguntas sobre las opciones de seguro de tu cotización. ¿Qué te gustaría saber?',
      ts: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim(), ts: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages((m) => [...m, { id: (Date.now() + 1).toString(), role: 'ai', text: response, ts: new Date() }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 90,
            width: 58, height: 58, borderRadius: '50%', border: 'none',
            background: 'linear-gradient(135deg, #6B5FE8, #5447D8)',
            color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(84,71,216,0.5)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.07)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(84,71,216,0.6)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(84,71,216,0.5)'; }}
        >
          <MessageCircle size={24} />
          <span style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#059669', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={9} color="white" />
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 90, width: 380,
          background: 'white', borderRadius: 20, boxShadow: '0 8px 48px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          maxHeight: '70vh',
          fontFamily: 'Inter, sans-serif',
        }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #3D2F8F, #5447D8)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={19} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>SEGO IA</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
                Responde preguntas sobre tu cotización
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 4 }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start', gap: 8 }}>
                {msg.role === 'ai' && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#EEF0FD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <Bot size={14} color={C.primary} />
                  </div>
                )}
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user' ? C.primary : '#F4F4F6',
                  color: msg.role === 'user' ? 'white' : C.text,
                  fontSize: 13.5, lineHeight: 1.55,
                }}>
                  {msg.role === 'ai' ? formatMarkdown(msg.text) : msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#EEF0FD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={14} color={C.primary} />
                </div>
                <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', background: '#F4F4F6', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#B0A9D8', display: 'inline-block', animation: `sego-typing 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggested questions (only when few messages) */}
          {messages.length <= 2 && (
            <div style={{ padding: '0 12px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} style={{
                  padding: '5px 11px', borderRadius: 14, border: `1.5px solid ${C.border}`,
                  background: 'white', color: C.textSec, fontSize: 12, cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Escribe tu pregunta…"
              style={{
                flex: 1, padding: '9px 13px', borderRadius: 12, border: `1.5px solid ${C.border}`,
                fontSize: 13.5, color: C.text, outline: 'none', fontFamily: 'Inter, sans-serif',
                background: '#FAFAFA', transition: 'border-color 0.15s',
              }}
              onFocus={(e) => e.target.style.borderColor = C.primary}
              onBlur={(e) => e.target.style.borderColor = C.border}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              style={{
                width: 38, height: 38, borderRadius: 12, border: 'none',
                background: input.trim() && !typing ? C.primary : C.border,
                color: 'white', cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                transition: 'background 0.15s',
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes sego-typing {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }
        @media (max-width: 480px) {
          div[style*="width: 380px"] { width: calc(100vw - 32px) !important; right: 16px !important; bottom: 16px !important; }
        }
      `}</style>
    </>
  );
}

// ─── Payment redirect modal ───────────────────────────────────────────────────

const PAYMENT_URLS: Record<string, string> = {
  andina: 'https://www.aseguradoraandina.com/pago-en-linea',
  capital: 'https://www.seguroscapital.com.co/pago',
  proteccion: 'https://www.proteccionnacional.com.co/pago',
};

function PayModal({ aseg, onClose }: { aseg: Aseguradora; onClose: () => void }) {
  function handleGo() {
    window.open(PAYMENT_URLS[aseg.id] ?? 'https://google.com', '_blank');
    onClose();
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'Inter, sans-serif' }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: 18, maxWidth: 440, width: '100%', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: aseg.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <Shield size={24} color={aseg.badgeColor} />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: '0 0 10px', fontFamily: 'Manrope, sans-serif' }}>
          Pagar con {aseg.nombre}
        </h3>
        <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: '0 0 20px' }}>
          Serás redirigido al portal de pagos oficial de <strong style={{ color: C.text }}>{aseg.nombre}</strong>. El proceso de pago es gestionado directamente por la aseguradora. SEGO no almacena ni procesa información de pago.
        </p>
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, padding: '12px 14px', marginBottom: 22, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <AlertTriangle size={16} color="#D97706" style={{ marginTop: 1, flexShrink: 0 }} />
          <p style={{ fontSize: 12.5, color: '#92400E', margin: 0, lineHeight: 1.5 }}>
            Asegúrate de tener a mano tu número de documento y los datos del vehículo antes de continuar.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 10, border: `1.5px solid ${C.border}`, background: 'white', color: C.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Cancelar
          </button>
          <button onClick={handleGo} style={{
            flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '12px', borderRadius: 10, border: 'none',
            background: aseg.color, color: 'white', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          }}>
            Ir al portal de pagos <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Quote card ───────────────────────────────────────────────────────────────

function ClienteQuoteCard({ a, onPay }: { a: Aseguradora; onPay: (a: Aseguradora) => void }) {
  const cob = a.coberturas;
  return (
    <div style={{
      background: 'white', borderRadius: 18, border: `2px solid ${a.featured ? a.color + '60' : C.border}`,
      padding: '26px', display: 'flex', flexDirection: 'column', flex: '1 1 280px', minWidth: 0,
      boxShadow: a.featured ? `0 6px 32px ${a.color}22` : '0 2px 8px rgba(0,0,0,0.05)',
      position: 'relative', transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = a.featured ? `0 10px 40px ${a.color}30` : '0 6px 24px rgba(0,0,0,0.09)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = a.featured ? `0 6px 32px ${a.color}22` : '0 2px 8px rgba(0,0,0,0.05)'; }}
    >
      {/* Badge */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: a.badgeColor, background: a.badgeBg, padding: '4px 12px', borderRadius: 20, border: `1px solid ${a.badgeColor}30` }}>
          {a.badge}
        </span>
      </div>

      {/* Aseguradora identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: a.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${a.color}25`, flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: a.color }}>{a.iniciales}</span>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{a.nombre}</div>
          <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>Seguro de vehículo — Todo riesgo</div>
        </div>
      </div>

      {/* Price */}
      <div style={{ marginBottom: 20, paddingBottom: 18, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 11, color: C.textSec, fontWeight: 500, letterSpacing: '0.05em', marginBottom: 4 }}>PRECIO ANUAL</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: C.text, letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif', lineHeight: 1 }}>
          {a.precioStr}
        </div>
        <div style={{ fontSize: 13, color: C.textSec, marginTop: 5 }}>
          ≈ ${Math.round(a.precio / 12).toLocaleString('es-CO')} / mes
        </div>
      </div>

      {/* Deductible — in simple language */}
      <div style={{ marginBottom: 18, padding: '12px 14px', background: C.bg, borderRadius: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: C.textSec, marginBottom: 3 }}>SI USAS EL SEGURO, PAGAS</div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text }}>{a.deducible}</div>
        <div style={{ fontSize: 11.5, color: C.textSec, marginTop: 2 }}>La aseguradora cubre el resto</div>
      </div>

      {/* Coverages */}
      <div style={{ flex: 1, marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: C.textSec, letterSpacing: '0.05em', marginBottom: 10 }}>QUÉ INCLUYE</div>
        {[
          { label: 'Daños a tu vehículo en accidente', v: cob.danosPropios },
          { label: 'Si te roban el carro', v: cob.hurtoTotal },
          { label: 'Daños que causes a terceros', v: cob.rc },
          { label: 'Grúa y asistencia 24h', v: cob.asistencia },
          { label: 'Carro de reemplazo', v: cob.vehiculoReemplazo },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: item.v ? '#ECFDF5' : C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {item.v ? <Check size={11} color="#059669" strokeWidth={2.5} /> : <Minus size={11} color={C.border} />}
            </div>
            <span style={{ fontSize: 13.5, color: item.v ? C.text : C.textSec }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => onPay(a)}
        style={{
          width: '100%', padding: '14px', borderRadius: 12, border: 'none',
          background: a.color, color: 'white',
          fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: `0 2px 10px ${a.color}40`, transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.boxShadow = `0 4px 18px ${a.color}60`; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = `0 2px 10px ${a.color}40`; }}
      >
        Pagar mi seguro <ChevronRight size={17} />
      </button>
    </div>
  );
}

// ─── Main ClienteView ─────────────────────────────────────────────────────────

export function ClienteView() {
  const [payModal, setPayModal] = useState<Aseguradora | null>(null);
  const quoteData = getCurrentQuote();
  const clientName = quoteData.cliente?.nombre ?? 'Laura Gómez';
  const vehicleStr = quoteData.vehiculo
    ? `${quoteData.vehiculo.marca} ${quoteData.vehiculo.linea} ${quoteData.vehiculo.modelo ?? ''} ${quoteData.vehiculo.anio}`
    : 'Mazda CX-30 Grand Touring 2024';
  const ciudad = quoteData.vehiculo?.ciudad ?? 'Bogotá';
  const today = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: 'Inter, sans-serif', color: C.text }}>
      {payModal && <PayModal aseg={payModal} onClose={() => setPayModal(null)} />}

      {/* Top bar */}
      <header style={{ background: 'white', borderBottom: `1px solid ${C.border}`, padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #6B5FE8, #5447D8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M9 1.5L16 5.5V12.5L9 16.5L2 12.5V5.5L9 1.5Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
              <path d="M6 9C6 7.343 7.343 6 9 6C10.657 6 12 7.343 12 9C12 10.657 10.657 12 9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="9" cy="9" r="1.5" fill="white" />
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif', color: C.text }}>SEGO</span>
        </div>
        <div style={{ fontSize: 13, color: C.textSec, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Shield size={14} color={C.primary} />
          Propuesta preparada por <strong style={{ color: C.text }}>Thomas Lopez · Intermediario de seguros</strong>
        </div>
      </header>

      {/* Hero section */}
      <div style={{ background: 'linear-gradient(160deg, #272143 0%, #3D2F8F 60%, #5447D8 100%)', padding: '52px 32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: '5px 16px', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em', marginBottom: 18 }}>
          COTIZACIÓN PERSONALIZADA
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: 'white', margin: '0 0 12px', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
          Opciones de seguro para {clientName.split(' ')[0]}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: '0 0 6px' }}>
          {vehicleStr} · {ciudad}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Cotización válida al {today}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginTop: 32 }}>
          {[
            { value: '3', label: 'aseguradoras consultadas' },
            { value: '< 12 min', label: 'tiempo de cotización' },
            { value: '100%', label: 'gratis para el cliente' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'white', fontFamily: 'Manrope, sans-serif' }}>{stat.value}</div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: '0 0 6px', fontFamily: 'Manrope, sans-serif' }}>
            Encontramos 3 opciones para ti
          </h2>
          <p style={{ color: C.textSec, fontSize: 14, margin: 0 }}>
            Selecciona la que mejor se ajuste a tus necesidades y haz clic en <strong>"Pagar mi seguro"</strong> para continuar.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'stretch' }}>
          {ASEGURADORAS.map((a) => (
            <ClienteQuoteCard key={a.id} a={a} onPay={setPayModal} />
          ))}
        </div>

        {/* Simple explanation section */}
        <div style={{ marginTop: 40, background: 'white', borderRadius: 16, border: `1px solid ${C.border}`, padding: '28px 32px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: '0 0 20px', fontFamily: 'Manrope, sans-serif' }}>
            ¿Cómo funciona un seguro de vehículo?
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { step: '1', title: 'Eliges tu plan', desc: 'Selecciona la opción que mejor equilibre precio y cobertura según tus necesidades.' },
              { step: '2', title: 'Pagas tu póliza', desc: 'El pago se realiza directamente en el portal de la aseguradora. SEGO no procesa pagos.' },
              { step: '3', title: 'Quedas protegido', desc: 'Una vez pagada, tu póliza entra en vigor y puedes circular con tranquilidad.' },
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.primaryLight, color: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{item.step}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.55 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: 20, padding: '14px 18px', background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 12, color: C.textSec, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: C.text }}>Información importante:</strong> Las condiciones, exclusiones y límites de cobertura deben verificarse en los documentos condicionados de cada aseguradora. Esta propuesta fue generada por un intermediario de seguros autorizado y tiene carácter informativo. No sustituye los términos contractuales de cada póliza. Los pagos son procesados exclusivamente por cada aseguradora.
          </p>
        </div>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: C.textSec }}>
            ¿Tienes dudas? Usa el botón de chat <MessageCircle size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> para preguntarle a SEGO IA, o contacta a tu intermediario directamente.
          </p>
        </div>
      </div>

      <ChatWidget />

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          header div:last-child { display: none !important; }
        }
      `}</style>
    </div>
  );
}
