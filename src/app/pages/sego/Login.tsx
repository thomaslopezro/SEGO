import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { SegoLogo } from './Layout';
import { C } from './data';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError('Completa todos los campos.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/dashboard'); }, 900);
  }

  function handleDemo() {
    setEmail('thomas.lopez@sego.co');
    setPassword('demo1234');
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/dashboard'); }, 700);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    border: `1.5px solid ${C.border}`, background: C.white,
    fontSize: 14, color: C.text, outline: 'none',
    fontFamily: 'Inter, sans-serif', transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Left brand panel */}
      <div style={{
        width: '42%', background: C.navy, display: 'flex', flexDirection: 'column',
        padding: '48px 52px', position: 'relative', overflow: 'hidden',
      }} className="sego-login-brand">
        {/* Background shapes */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(84,71,216,0.15)' }} />
        <div style={{ position: 'absolute', bottom: 60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(84,71,216,0.10)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <SegoLogo />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{
              display: 'inline-block', background: 'rgba(84,71,216,0.2)', color: C.primary,
              border: '1px solid rgba(84,71,216,0.3)', borderRadius: 20, padding: '5px 14px',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', marginBottom: 20,
            }}>SEGUROS · TECNOLOGÍA · CLARIDAD</div>
            <h1 style={{ color: 'white', fontSize: 38, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif', margin: 0 }}>
              Cotiza mejor.<br />Asesora mejor.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginTop: 16, lineHeight: 1.6, fontWeight: 400 }}>
              Todas tus cotizaciones de seguros de vehículo, en un solo lugar.
            </p>
          </div>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Ingresa la información una sola vez',
              'Consulta 3+ aseguradoras simultáneamente',
              'Compara coberturas en lenguaje claro',
              'Genera y comparte documentos al instante',
            ].map((feat) => (
              <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(84,71,216,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#6B5FE8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13.5 }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>© 2026 SEGO. Prototipo académico.</p>
        </div>
      </div>

      {/* Right login form */}
      <div style={{ flex: 1, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: C.text, letterSpacing: '-0.02em', margin: 0, fontFamily: 'Manrope, sans-serif' }}>
              Iniciar sesión
            </h2>
            <p style={{ color: C.textSec, fontSize: 14, marginTop: 8 }}>Bienvenido de vuelta a SEGO</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: C.text, display: 'block', marginBottom: 7 }}>
                Correo electrónico
              </label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@empresa.com"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = C.primary}
                onBlur={(e) => e.target.style.borderColor = C.border}
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: C.text, display: 'block', marginBottom: 7 }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: 44 }}
                  onFocus={(e) => e.target.style.borderColor = C.primary}
                  onBlur={(e) => e.target.style.borderColor = C.border}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: C.textSec, padding: 2,
                }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13.5, color: C.textSec, fontWeight: 400 }}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor: C.primary, width: 15, height: 15 }} />
                Recordarme
              </label>
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, fontSize: 13.5, fontWeight: 500 }}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {error && (
              <div style={{ background: C.errorBg, border: `1px solid #FCA5A5`, borderRadius: 8, padding: '10px 14px', fontSize: 13, color: C.error }}>
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '13px', borderRadius: 10, border: 'none',
                background: loading ? '#A09BEA' : C.primary,
                color: 'white', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.15s', fontFamily: 'Inter, sans-serif',
              }}
            >
              {loading ? 'Iniciando sesión…' : <>Iniciar sesión <ArrowRight size={16} /></>}
            </button>
          </form>

          <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <span style={{ fontSize: 12, color: C.textSec }}>o</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          <button
            onClick={handleDemo}
            style={{
              width: '100%', padding: '12px', borderRadius: 10, border: `1.5px solid ${C.border}`,
              background: C.white, color: C.text, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
          >
            Entrar como usuario demo
          </button>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .sego-login-brand { display: none !important; } }`}</style>
    </div>
  );
}
