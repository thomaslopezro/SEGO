
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  CarFront, Check, X, ArrowRight, ShieldCheck
} from 'lucide-react';
import { C, ASEGURADORAS } from './data';
import { DemoBanner } from './DemoBanner';

type AsegStatus = 'waiting' | 'loading' | 'done' | 'error';

const MESSAGES = [
  'Preparando la información del vehículo…',
  'Consultando aseguradoras…',
  'Recibiendo alternativas…',
  'Organizando precios y coberturas…',
  'Comparación preparada.',
];

export function Procesando() {
  const navigate = useNavigate();

  const [statuses, setStatuses] = useState<AsegStatus[]>([
    'loading', 'waiting', 'waiting'
  ]);
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 2, 100));
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
      navigate('/cotizaciones/resultados', { replace: true });
    }, 4600));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="sego-processing-screen">
      <DemoBanner />

      <main className="sego-processing-content">

        {/* ENCABEZADO */}
        <div className="sego-processing-header">
          <div className="sego-processing-label">
            SEGO / MOTOR DE COTIZACIÓN
          </div>

          <h1>
            {done
              ? 'Tu comparación está lista.'
              : 'Estamos preparando tus opciones.'}
          </h1>

          <p>{MESSAGES[msgIdx]}</p>
        </div>

        {/* ANIMACIÓN PRINCIPAL */}
        <div
          className="sego-processing-scene"
          role="img"
          aria-label="Animación de un automóvil recorriendo una órbita mientras SEGO procesa información"
        >
          {/* ÓRBITAS */}
          <div className="sego-orbit orbit-outer" />
          <div className="sego-orbit orbit-inner" />

          {/* PAQUETES DE DATOS */}
          <div className="sego-data-stream stream-left">
            <span className="data-packet">CLIENTE</span>
            <span className="data-packet">VEHÍCULO</span>
            <span className="data-packet">RIESGO</span>
          </div>

          <div className="sego-data-stream stream-right">
            <span className="data-packet">PRECIO</span>
            <span className="data-packet">COBERTURA</span>
            <span className="data-packet">OFERTA</span>
          </div>

          {/* AUTOMÓVIL EN ÓRBITA */}
          <div className={`sego-car-orbit ${done ? 'finished' : ''}`}>
            <div className="sego-car">
              <CarFront size={31} strokeWidth={1.8} />
            </div>
          </div>

          {/* NÚCLEO SEGO */}
          <div className={`sego-processing-core ${done ? 'is-done' : ''}`}>
            {done ? (
              <Check size={35} strokeWidth={2} />
            ) : (
              <>
                <strong>SEGO</strong>
                <span>Procesando</span>
                <div className="sego-core-dots">
                  <i /><i /><i />
                </div>
              </>
            )}
          </div>

          {/* NODOS */}
          <span className="sego-orbit-node node-one" />
          <span className="sego-orbit-node node-two" />
          <span className="sego-orbit-node node-three" />
        </div>

        {/* PROGRESO */}
        <div className="sego-processing-progress">
          <div className="progress-heading">
            <span>{done ? 'Proceso completado' : 'Procesando información'}</span>
            <strong>{progress}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ASEGURADORAS */}
        <div className="sego-processing-insurers">
          {ASEGURADORAS.map((a, i) => {
            const status = statuses[i] ?? 'waiting';

            return (
              <div className="sego-insurer-row" key={a.id}>
                <div className="insurer-identity">
                  <div
                    className="insurer-avatar"
                    style={{
                      background: `${a.color}16`,
                      color: a.color
                    }}
                  >
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <strong>{a.nombre}</strong>
                    <span>
                      {status === 'waiting' && 'En espera'}
                      {status === 'loading' && 'Consultando…'}
                      {status === 'done' && 'Respuesta simulada recibida'}
                      {status === 'error' && 'Sin respuesta'}
                    </span>
                  </div>
                </div>

                <div className={`insurer-status ${status}`}>
                  {status === 'done' ? (
                    <Check size={15} />
                  ) : status === 'error' ? (
                    <X size={15} />
                  ) : status === 'loading' ? (
                    <span className="status-spinner" />
                  ) : (
                    <span className="status-waiting" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* TEXTO INFERIOR */}
        <div className="sego-processing-footer">
          {done ? (
            <>
              Redirigiendo al comparador
              <ArrowRight size={15} />
            </>
          ) : (
            'Versión de prueba · Consultas simuladas, sin conexión real'
          )}
        </div>
      </main>

      <style>{`
        .sego-processing-screen {
          min-height: 100vh;
          background: #f5f7ff;
          font-family: 'Outfit', Inter, sans-serif;
          color: #272143;
          overflow: hidden;
        }

        .sego-processing-content {
          width: min(100% - 40px, 660px);
          margin: 0 auto;
          padding: 70px 0 65px;
        }

        .sego-processing-header {
          text-align: center;
        }

        .sego-processing-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.19em;
          color: #5447d8;
          margin-bottom: 22px;
        }

        .sego-processing-header h1 {
          font-size: clamp(30px, 4.5vw, 47px);
          font-weight: 400;
          letter-spacing: -0.055em;
          line-height: 1.12;
          margin: 0;
        }

        .sego-processing-header p {
          margin-top: 15px;
          font-size: 16px;
          font-weight: 300;
          color: #77738b;
        }

        /* ESCENA */
        .sego-processing-scene {
          position: relative;
          width: 340px;
          height: 340px;
          max-width: 100%;
          margin: 30px auto 20px;
          display: grid;
          place-items: center;
          isolation: isolate;
        }

        .sego-orbit {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .orbit-outer {
          width: 260px;
          height: 260px;
          border: 1.5px dashed #a7a0e8;
        }

        .orbit-inner {
          width: 202px;
          height: 202px;
          border: 1px solid rgba(84,71,216,0.12);
        }

        .sego-processing-core {
          position: relative;
          z-index: 3;
          width: 152px;
          height: 152px;
          background: white;
          border: 1px solid #dedcf5;
          border-radius: 50%;
          box-shadow: 0 12px 45px rgba(84,71,216,0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all .4s ease;
          color: #272143;
        }

        .sego-processing-core strong {
          font-size: 30px;
          font-weight: 600;
          letter-spacing: -0.07em;
        }

        .sego-processing-core span {
          font-size: 12px;
          color: #77738b;
          margin-top: 3px;
        }

        .sego-processing-core.is-done {
          background: #5447d8;
          border-color: #5447d8;
          color: white;
        }

        .sego-core-dots {
          display: flex;
          gap: 5px;
          margin-top: 12px;
        }

        .sego-core-dots i {
          width: 5px;
          height: 5px;
          background: #5447d8;
          border-radius: 50%;
          animation: sego-dot 1s ease-in-out infinite;
        }

        .sego-core-dots i:nth-child(2) { animation-delay: .15s; }
        .sego-core-dots i:nth-child(3) { animation-delay: .3s; }

        @keyframes sego-dot {
          0%, 100% { opacity: .25; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-4px); }
        }

        /* CARRO GIRANDO */
        .sego-car-orbit {
          position: absolute;
          z-index: 5;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          animation: sego-drive 3.1s linear infinite;
          pointer-events: none;
        }

        .sego-car-orbit.finished {
          animation-play-state: paused;
        }

        .sego-car {
          position: absolute;
          width: 59px;
          height: 59px;
          border-radius: 18px;
          background: #5447d8;
          color: white;
          display: grid;
          place-items: center;
          transform: translateX(130px) rotate(90deg);
          box-shadow: 0 7px 25px rgba(84,71,216,.30);
        }

        @keyframes sego-drive {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* INFORMACIÓN VIAJANDO */
        .sego-data-stream {
          position: absolute;
          z-index: 2;
          display: flex;
          gap: 12px;
          pointer-events: none;
          white-space: nowrap;
        }

        .stream-left {
          top: 31%;
          left: -170px;
          animation: data-move-right 3s linear infinite;
        }

        .stream-right {
          bottom: 28%;
          right: -180px;
          animation: data-move-left 3s linear infinite;
        }

        .data-packet {
          background: white;
          color: #5447d8;
          border: 1px solid #dcd9f9;
          border-radius: 7px;
          padding: 6px 10px;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: .07em;
          box-shadow: 0 4px 15px rgba(39,33,67,.06);
        }

        @keyframes data-move-right {
          0% { transform: translateX(-85px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(260px); opacity: 0; }
        }

        @keyframes data-move-left {
          0% { transform: translateX(85px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(-260px); opacity: 0; }
        }

        .sego-orbit-node {
          position: absolute;
          z-index: 1;
          width: 9px;
          height: 9px;
          background: #b3aaef;
          border: 3px solid #f5f7ff;
          box-sizing: content-box;
          border-radius: 50%;
        }

        .node-one { top: 45px; left: 110px; }
        .node-two { bottom: 43px; right: 110px; }
        .node-three { top: 150px; right: 34px; }

        /* PROGRESO */
        .sego-processing-progress {
          margin: 0 auto 28px;
          max-width: 530px;
        }

        .progress-heading {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 12px;
          color: #77738b;
        }

        .progress-heading strong {
          font-weight: 500;
          color: #5447d8;
        }

        .progress-track {
          height: 5px;
          background: #e1e0f1;
          border-radius: 50px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #5447d8;
          border-radius: inherit;
          transition: width .08s linear;
        }

        /* ASEGURADORAS */
        .sego-processing-insurers {
          background: white;
          border: 1px solid #e8e7f1;
          border-radius: 18px;
          overflow: hidden;
          max-width: 530px;
          margin: auto;
        }

        .sego-insurer-row {
          min-height: 74px;
          padding: 14px 20px;
          border-bottom: 1px solid #efedf5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
        }

        .sego-insurer-row:last-child {
          border-bottom: none;
        }

        .insurer-identity {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .insurer-avatar {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
        }

        .insurer-identity strong {
          display: block;
          font-size: 14px;
          font-weight: 500;
        }

        .insurer-identity span {
          display: block;
          font-size: 12px;
          font-weight: 300;
          color: #77738b;
          margin-top: 3px;
        }

        .insurer-status {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #f1f0f8;
          color: #a2a0b5;
        }

        .insurer-status.done {
          background: #e7f7ed;
          color: #15945a;
        }

        .insurer-status.loading {
          background: #efedff;
          color: #5447d8;
        }

        .insurer-status.error {
          background: #fff0f0;
          color: #dc2626;
        }

        .status-spinner {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          border: 2px solid #c4bcff;
          border-top-color: #5447d8;
          animation: sego-spin .7s linear infinite;
        }

        .status-waiting {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #bbb8ce;
        }

        @keyframes sego-spin {
          to { transform: rotate(360deg); }
        }

        .sego-processing-footer {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 23px;
          font-size: 12px;
          font-weight: 300;
          color: #918da4;
          text-align: center;
        }

        @media (max-width: 640px) {
          .sego-processing-content {
            padding-top: 45px;
          }

          .sego-processing-scene {
            transform: scale(.85);
            margin-top: 0;
            margin-bottom: -5px;
          }

          .sego-processing-header h1 {
            font-size: 32px;
          }

          .sego-insurer-row {
            padding: 12px 14px;
          }

          .stream-left { left: -90px; }
          .stream-right { right: -90px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sego-car-orbit,
          .sego-data-stream,
          .sego-core-dots i,
          .status-spinner {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
