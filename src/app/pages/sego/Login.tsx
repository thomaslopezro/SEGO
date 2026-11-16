import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
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
    if (!email || !password) {
      setError('Completa todos los campos.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 900);
  }

  function handleDemo() {
    setEmail('thomas.lopez@sego.co');
    setPassword('demo1234');
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 700);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(8px)',
    color: 'white',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'Outfit, Inter, sans-serif',
    transition: 'all 0.2s ease',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#0E1525',
        backgroundImage:
          'linear-gradient(rgba(6,12,22,0.45), rgba(6,12,22,0.62)), url("/images/sego-login.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Outfit, Inter, sans-serif',
        padding: '32px 20px',
      }}
    >
      {/* Blur ambient layers */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 85%, rgba(255,166,77,0.28), transparent 20%), radial-gradient(circle at 85% 20%, rgba(255,188,109,0.24), transparent 16%), radial-gradient(circle at 50% 0%, rgba(84,71,216,0.14), transparent 25%)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative glow blobs */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 60,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'rgba(255, 168, 76, 0.22)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: 90,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255, 194, 118, 0.22)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Login card */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 420,
          borderRadius: 28,
          padding: '34px 28px 26px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow:
            '0 20px 60px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
        {/* top shine */}
        <div
          style={{
            position: 'absolute',
            inset: 1,
            borderRadius: 27,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03) 22%, rgba(255,255,255,0.02) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* logo + icon */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 18,
                background: 'linear-gradient(135deg, #7C3AED, #22C3FF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 28px rgba(84,71,216,0.35)',
                marginBottom: 18,
              }}
            >
              <Sparkles size={22} color="white" />
            </div>

            <div style={{ marginBottom: 12 }}>
              <SegoLogo />
            </div>

            <h1
              style={{
                fontSize: 33,
                fontWeight: 500,
                lineHeight: 1.06,
                letterSpacing: '-0.04em',
                color: 'white',
                textAlign: 'center',
                margin: '8px 0 10px',
                fontFamily: 'Outfit, Inter, sans-serif',
              }}
            >
              Bienvenido de vuelta
            </h1>

            <p
              style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.68)',
                fontSize: 15,
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 290,
              }}
            >
              Ingresa a tu espacio de cotizaciones y sigue asesorando con claridad.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            style={{
              marginTop: 28,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 12.5,
                  color: 'rgba(255,255,255,0.72)',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}
              >
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@empresa.com"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(120,100,255,0.65)';
                  e.target.style.background = 'rgba(255,255,255,0.09)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.target.style.background = 'rgba(255,255,255,0.06)';
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 12.5,
                  color: 'rgba(255,255,255,0.72)',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}
              >
                Contraseña
              </label>

              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  style={{ ...inputStyle, paddingRight: 48 }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(120,100,255,0.65)';
                    e.target.style.background = 'rgba(255,255,255,0.09)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.target.style.background = 'rgba(255,255,255,0.06)';
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.58)',
                    padding: 0,
                  }}
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                marginTop: 2,
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  fontSize: 13.5,
                  color: 'rgba(255,255,255,0.66)',
                  fontWeight: 300,
                }}
              >
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{
                    accentColor: '#7C3AED',
                    width: 15,
                    height: 15,
                  }}
                />
                Recordarme
              </label>

              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.76)',
                  fontSize: 13,
                  fontWeight: 300,
                  padding: 0,
                }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {error && (
              <div
                style={{
                  background: 'rgba(239,68,68,0.12)',
                  border: '1px solid rgba(252,165,165,0.28)',
                  borderRadius: 14,
                  padding: '11px 14px',
                  fontSize: 13,
                  color: '#FFD7D7',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4,
                width: '100%',
                padding: '14px 16px',
                borderRadius: 999,
                border: 'none',
                background: 'linear-gradient(90deg, #7C3AED 0%, #22C3FF 100%)',
                color: 'white',
                fontSize: 15,
                fontWeight: 500,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 12px 30px rgba(84,71,216,0.28)',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                opacity: loading ? 0.72 : 1,
                fontFamily: 'Outfit, Inter, sans-serif',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {loading ? 'Ingresando…' : <>Iniciar sesión <ArrowRight size={16} /></>}
            </button>
          </form>

          <div
            style={{
              margin: '22px 0 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.52)' }}>
              o
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }} />
          </div>

          <button
            onClick={handleDemo}
            style={{
              width: '100%',
              padding: '13px 16px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              fontSize: 14,
              fontWeight: 400,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease',
              fontFamily: 'Outfit, Inter, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.65)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
          >
            Entrar como usuario demo
          </button>

          <p
            style={{
              textAlign: 'center',
              marginTop: 18,
              fontSize: 12,
              color: 'rgba(255,255,255,0.42)',
              fontWeight: 300,
            }}
          >
            Prototipo académico · Acceso demostrativo
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .sego-login-card {
            padding: 26px 18px !important;
          }
        }
      `}</style>
    </div>
  );
}