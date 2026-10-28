import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Check, X, Wifi } from 'lucide-react';
import { C, ASEGURADORAS } from './data';
import { SegoLogo } from './Layout';

type AsegStatus = 'waiting' | 'loading' | 'done' | 'error';

const MESSAGES = [
  'Enviando información…',
  'Consultando aseguradoras…',
  'Normalizando coberturas…',
  'Preparando comparación…',
  'Nuestras aseguradoras respondieron.',
];

export function Procesando() {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState<AsegStatus[]>(['loading', 'waiting', 'waiting']);
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(progressInterval); return 100; }
        return p + 2;
      });
    }, 80);

    timers.push(setTimeout(() => setMsgIdx(1), 700));

    timers.push(setTimeout(() => {
      setStatuses(['done', 'loading', 'waiting']);
      setMsgIdx(2);
    }, 1400));

    timers.push(setTimeout(() => {
      setStatuses(['done', 'done', 'loading']);
      setMsgIdx(3);
    }, 2600));

    timers.push(setTimeout(() => {
      setStatuses(['done', 'done', 'done']);
      setMsgIdx(4);
      setDone(true);
    }, 3600));

    timers.push(setTimeout(() => {
      navigate('/cotizaciones/resultados');
    }, 4600));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [navigate]);

  const aseguradoras = ASEGURADORAS;

  return (
    <div style={{
      minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif',
      padding: 24,
    }}>
      {/* Logo */}
      <div style={{ position: 'absolute', top: 28, left: 32 }}><SegoLogo /></div>

      <div style={{ width: '100%', maxWidth: 560 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', margin: '0 auto 20px',
            background: done ? '#ECFDF5' : C.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.4s',
          }}>
            {done
              ? <Check size={28} color="#059669" strokeWidth={2.5} />
              : <Wifi size={28} color={C.primary} strokeWidth={1.5} style={{ animation: 'sego-pulse 1.5s ease-in-out infinite' }} />
            }
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>
            {done ? 'Nuestras aseguradoras respondieron.' : 'Estamos buscando las mejores opciones'}
          </h1>
          <p style={{ color: C.textSec, fontSize: 14.5, marginTop: 10 }}>
            {MESSAGES[msgIdx]}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: C.border, borderRadius: 99, overflow: 'hidden', marginBottom: 32 }}>
          <div style={{
            height: '100%', borderRadius: 99,
            background: done ? '#059669' : `linear-gradient(90deg, #6B5FE8, ${C.primary})`,
            width: `${progress}%`, transition: 'width 0.08s linear, background 0.4s',
          }} />
        </div>

        {/* Aseguradora rows */}
        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          {aseguradoras.map((a, i) => {
            const status = statuses[i];
            return (
              <div key={a.id} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px',
                borderBottom: i < aseguradoras.length - 1 ? `1px solid ${C.border}` : 'none',
                transition: 'background 0.2s',
                background: status === 'done' ? '#FAFFFC' : 'white',
              }}>
                {/* Logo placeholder */}
                <div style={{
                  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                  background: a.color + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${a.color}22`,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: a.color, letterSpacing: '-0.01em' }}>{a.iniciales}</span>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: C.text }}>{a.nombre}</div>
                  <div style={{ fontSize: 13, color: C.textSec, marginTop: 2 }}>
                    {status === 'waiting' && 'En espera…'}
                    {status === 'loading' && (
                      <span style={{ color: C.primary }}>Consultando…</span>
                    )}
                    {status === 'done' && (
                      <span style={{ color: '#059669' }}>Cotización recibida</span>
                    )}
                    {status === 'error' && (
                      <span style={{ color: C.error }}>No respondió — continuando con las demás</span>
                    )}
                  </div>
                </div>

                {/* Status indicator */}
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: status === 'done' ? '#ECFDF5' : status === 'error' ? C.errorBg : status === 'loading' ? C.primaryLight : C.bg,
                  border: `1.5px solid ${status === 'done' ? '#A7F3D0' : status === 'error' ? '#FCA5A5' : status === 'loading' ? '#C4BEFF' : C.border}`,
                  transition: 'all 0.3s',
                }}>
                  {status === 'done' && <Check size={14} color="#059669" strokeWidth={2.5} />}
                  {status === 'error' && <X size={14} color={C.error} />}
                  {status === 'loading' && (
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: C.primary,
                      animation: 'sego-dot-pulse 1s ease-in-out infinite',
                    }} />
                  )}
                  {status === 'waiting' && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.border }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {done && (
          <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: C.textSec }}>
            Redirigiendo al comparador…
          </div>
        )}
      </div>

      <style>{`
        @keyframes sego-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.92); }
        }
        @keyframes sego-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
}
