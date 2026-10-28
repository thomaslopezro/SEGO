import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LayoutGrid, PlusCircle, FileText, Users, Settings, HelpCircle, Bell, Menu, ChevronRight, X } from 'lucide-react';
import { C } from './data';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  soon?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', icon: <LayoutGrid size={17} />, path: '/dashboard' },
  { label: 'Nueva cotización', icon: <PlusCircle size={17} />, path: '/cotizaciones/nueva' },
  { label: 'Cotizaciones', icon: <FileText size={17} />, path: '/cotizaciones' },
  { label: 'Clientes', icon: <Users size={17} />, soon: true },
];

const BOTTOM_ITEMS: NavItem[] = [
  { label: 'Configuración', icon: <Settings size={17} />, soon: true },
  { label: 'Ayuda', icon: <HelpCircle size={17} />, soon: true },
];

export function SegoLogo({ small = false }: { small?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <div style={{
        width: small ? 28 : 34, height: small ? 28 : 34, borderRadius: 9,
        background: 'linear-gradient(135deg, #6B5FE8 0%, #5447D8 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(84,71,216,0.4)',
      }}>
        <svg width={small ? 14 : 18} height={small ? 14 : 18} viewBox="0 0 18 18" fill="none">
          <path d="M9 1.5L16 5.5V12.5L9 16.5L2 12.5V5.5L9 1.5Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none"/>
          <path d="M6 9C6 7.343 7.343 6 9 6C10.657 6 12 7.343 12 9C12 10.657 10.657 12 9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="9" cy="9" r="1.5" fill="white"/>
        </svg>
      </div>
      {!small && (
        <span style={{ color: 'white', fontWeight: 800, fontSize: 20, letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
          SEGO
        </span>
      )}
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  breadcrumb?: string[];
}

export function Layout({ children, breadcrumb }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path?: string) => path && location.pathname === path;

  function NavLink({ item }: { item: NavItem }) {
    const active = isActive(item.path);
    return (
      <button
        onClick={() => {
          if (item.soon) { import('sonner').then(({ toast }) => toast(`"${item.label}" estará disponible próximamente.`, { icon: '🔜' })); return; }
          if (item.path) { navigate(item.path); setMobileOpen(false); }
        }}
        style={{
          display: 'flex', alignItems: 'center', gap: 10, width: '100%',
          padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: active ? C.sidebarActive : 'transparent',
          color: active ? 'white' : 'rgba(255,255,255,0.55)',
          borderLeft: `3px solid ${active ? C.primary : 'transparent'}`,
          fontFamily: 'Inter, sans-serif', fontSize: 13.5, fontWeight: active ? 600 : 400,
          transition: 'all 0.15s', textAlign: 'left', lineHeight: '1',
        }}
        onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = C.sidebarHover; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
        onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = active ? 'white' : 'rgba(255,255,255,0.55)'; }}
      >
        <span style={{ opacity: active ? 1 : 0.75, flexShrink: 0 }}>{item.icon}</span>
        <span>{item.label}</span>
        {item.soon && (
          <span style={{ marginLeft: 'auto', fontSize: 9.5, fontWeight: 500, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)', padding: '2px 6px', borderRadius: 4, letterSpacing: '0.02em' }}>
            PRONTO
          </span>
        )}
      </button>
    );
  }

  const SidebarContent = () => (
    <div style={{ width: 240, height: '100%', background: C.navy, display: 'flex', flexDirection: 'column', padding: '20px 14px' }}>
      <div style={{ marginBottom: 32, paddingLeft: 4 }}>
        <SegoLogo />
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {NAV_ITEMS.map((item) => <NavLink key={item.label} item={item} />)}
        <div style={{ margin: '14px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }} />
        {BOTTOM_ITEMS.map((item) => <NavLink key={item.label} item={item} />)}
      </nav>
      <div style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6B5FE8 0%, #5447D8 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0,
          }}>TL</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: 'white', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Thomas Lopez</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 1 }}>Intermediario de seguros</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg, fontFamily: 'Inter, sans-serif', color: C.text }}>
      {/* Desktop sidebar */}
      <div id="sego-sidebar" style={{ flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <SidebarContent />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setMobileOpen(false)} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, overflowY: 'auto' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: 16, right: 12, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', zIndex: 1 }}>
                <X size={20} />
              </button>
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{
          background: C.white, borderBottom: `1px solid ${C.border}`,
          padding: '0 28px', height: 58, display: 'flex', alignItems: 'center', gap: 10,
          position: 'sticky', top: 0, zIndex: 10, flexShrink: 0,
        }}>
          <button
            id="sego-mobile-menu"
            onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textSec, padding: 4, display: 'none' }}
          >
            <Menu size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.textSec, fontSize: 13 }}>
            {breadcrumb?.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight size={13} style={{ color: C.border }} />}
                <span style={{
                  color: i === (breadcrumb.length - 1) ? C.text : C.textSec,
                  fontWeight: i === (breadcrumb.length - 1) ? 500 : 400,
                }}>{crumb}</span>
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={() => import('sonner').then(({ toast }) => toast('No tienes notificaciones nuevas.'))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textSec, position: 'relative', padding: 4 }}
            >
              <Bell size={19} />
              <span style={{ position: 'absolute', top: 3, right: 3, width: 7, height: 7, borderRadius: '50%', background: C.primary, border: `2px solid ${C.white}` }} />
            </button>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6B5FE8 0%, #5447D8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: 12, cursor: 'pointer',
            }}>TL</div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '32px 32px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          #sego-sidebar { display: none !important; }
          #sego-mobile-menu { display: flex !important; }
        }
        @media (max-width: 640px) {
          main { padding: 20px 16px !important; }
        }
      `}</style>
    </div>
  );
}
