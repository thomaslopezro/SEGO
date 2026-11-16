import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Clock3,
  FileCheck2,
  Menu,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
  HeartHandshake,
} from "lucide-react";

const benefits = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "Captura una sola vez",
    text: "Registra los datos del cliente y del vehículo en un formulario claro y guiado.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Cotiza en paralelo",
    text: "Consulta varias aseguradoras al mismo tiempo, sin repetir procesos ni cambiar de portal.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Compara con claridad",
    text: "Precios, coberturas y deducibles normalizados para tomar decisiones con confianza.",
  },
];

const insurers = ["ANDINA", "CAPITAL", "PROTECCIÓN"];

const insuranceCategories = [
  {
    title: "Autos",
    alt: "Automóvil junto a un edificio contemporáneo",
    image: "https://images.unsplash.com/photo-1634295537591-a717e957dba8?auto=format&fit=crop&w=900&q=85",
    available: true,
  },
  {
    title: "Hogar",
    alt: "Sala de estar cálida y luminosa",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=85",
    available: false,
  },
  {
    title: "Vida",
    alt: "Persona disfrutando de un momento tranquilo",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
    available: false,
  },
  {
    title: "Viajes",
    alt: "Viajera con equipaje en una carretera costera",
    image: "https://images.unsplash.com/photo-1605333619452-091427f9a874?auto=format&fit=crop&w=900&q=85",
    available: false,
  },
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" aria-label="SEGO">
      <span className={`font-["Manrope"] text-xl font-extrabold tracking-[-0.04em] ${inverse ? "text-white" : "text-[#272143]"}`}>
        SEGO
      </span>
    </div>
  );
}

function ProductPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[640px]"
    >
      <div className="absolute -right-7 -top-7 hidden h-32 w-32 rounded-full border border-[#5447D8]/15 lg:block" />
      <div className="absolute -bottom-8 -left-8 hidden size-20 rounded-2xl bg-[#5447D8]/10 lg:block" />
      <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[#F7F7FA] shadow-[0_28px_80px_rgba(13,10,35,0.28)]">
        <div className="flex h-11 items-center gap-2 border-b border-[#272143]/10 bg-white px-4">
          <span className="size-2.5 rounded-full bg-[#272143]/15" />
          <span className="size-2.5 rounded-full bg-[#272143]/15" />
          <span className="size-2.5 rounded-full bg-[#5447D8]/45" />
          <div className="ml-4 h-5 flex-1 rounded-md bg-[#F7F7FA]" />
        </div>
        <div className="grid min-h-[390px] grid-cols-[118px_1fr] sm:grid-cols-[150px_1fr]">
          <aside className="bg-[#272143] p-4">
            <Brand inverse />
            <div className="mt-8 space-y-2">
              {["Inicio", "Nueva cotización", "Cotizaciones", "Clientes"].map((item, index) => (
                <div
                  key={item}
                  className={`h-8 rounded-md px-2 py-2 text-[8px] font-medium sm:text-[9px] ${
                    index === 0 ? "bg-white/10 text-white" : "text-white/40"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>
          <div className="min-w-0 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-['Manrope'] text-sm font-bold text-[#29263A] sm:text-base">Buenos días, Thomas</p>
                <p className="mt-1 text-[8px] text-[#6C687A] sm:text-[9px]">Gestiona tus cotizaciones desde un solo lugar.</p>
              </div>
              <span className="rounded-md bg-[#5447D8] px-3 py-2 text-[8px] font-semibold text-white">+ Nueva cotización</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {[
                ["24", "Cotizaciones este mes"],
                ["12 min", "Tiempo promedio"],
                ["3", "Aseguradoras"],
                ["18", "Clientes atendidos"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-[#272143]/8 bg-white p-3">
                  <p className="font-['Manrope'] text-base font-bold text-[#29263A]">{value}</p>
                  <p className="mt-1 text-[7px] text-[#6C687A] sm:text-[8px]">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg border border-[#272143]/8 bg-white">
              <div className="flex items-center justify-between border-b border-[#272143]/8 px-3 py-2.5">
                <span className="text-[9px] font-semibold text-[#29263A]">Cotizaciones recientes</span>
                <span className="text-[7px] font-medium text-[#5447D8]">Ver todas</span>
              </div>
              {[
                ["Laura Gómez", "Mazda CX-30", "$2.150.000"],
                ["Carlos Mejía", "Renault Duster", "$1.980.000"],
                ["Ana Torres", "Toyota Corolla", "$2.430.000"],
              ].map((row, index) => (
                <div key={row[0]} className="grid grid-cols-[1.1fr_1fr_auto] items-center gap-2 border-b border-[#272143]/5 px-3 py-2.5 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={`size-5 rounded-full ${index === 1 ? "bg-[#5447D8]/16" : "bg-[#272143]/10"}`} />
                    <span className="truncate text-[7px] font-medium text-[#29263A] sm:text-[8px]">{row[0]}</span>
                  </div>
                  <span className="truncate text-[7px] text-[#6C687A] sm:text-[8px]">{row[1]}</span>
                  <span className="text-[7px] font-semibold text-[#29263A] sm:text-[8px]">{row[2]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-xl border border-[#272143]/10 bg-white px-4 py-3 shadow-[0_14px_36px_rgba(39,33,67,0.16)] sm:right-8"
      >
        <span className="grid size-8 place-items-center rounded-lg bg-[#5447D8]/10 text-[#5447D8]">
          <FileCheck2 size={16} />
        </span>
        <div>
          <p className="text-[10px] font-semibold text-[#29263A]">Comparación lista</p>
          <p className="mt-0.5 text-[8px] text-[#6C687A]">3 ofertas normalizadas</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Landing() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  function goToLogin() {
    setLeaving(true);
    window.setTimeout(() => navigate("/login"), 280);
  }

  function scrollTo(id: string) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.div
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="min-h-screen overflow-x-hidden bg-[#F7F7FA] font-['Inter'] text-[#29263A]"
    >
      {/* Navegación flotante: enlaces a la izquierda, SEGO centrado, acciones a la derecha */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-7 sm:pt-6">
        <div className="relative mx-auto grid min-h-[68px] w-full max-w-[1560px] grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-full border border-[#FFF0A5]/60 bg-white/95 px-4 shadow-[0_12px_40px_rgba(20,17,42,0.10)] backdrop-blur-xl sm:px-6 lg:px-7">
          {/* Menú de la izquierda en escritorio */}
          <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
            <button onClick={() => scrollTo("producto")} className="font-['Outfit'] text-[15px] font-normal tracking-[-0.025em] text-[#151515] transition-opacity hover:opacity-60">Producto</button>
            <button onClick={() => scrollTo("como-funciona")} className="font-['Outfit'] text-[15px] font-normal tracking-[-0.025em] text-[#151515] transition-opacity hover:opacity-60">Cómo funciona</button>
            <button onClick={() => scrollTo("beneficios")} className="font-['Outfit'] text-[15px] font-normal tracking-[-0.025em] text-[#151515] transition-opacity hover:opacity-60">Beneficios</button>
          </nav>
          {/* Menú móvil a la izquierda */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} className="grid size-11 place-items-center rounded-full text-[#151515] lg:hidden">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          {/* Marca exactamente centrada, independiente de la longitud de los menús */}
          <button onClick={() => scrollTo("inicio")} aria-label="SEGO, volver al inicio" className="justify-self-center font-['Outfit'] text-[23px] font-medium tracking-[-0.065em] text-[#151515] sm:text-[25px]">
            SEGO
          </button>

          <div className="flex items-center justify-end gap-2">
            <button onClick={goToLogin} className="rounded-full bg-[#151515] px-4 py-2.5 font-['Outfit'] text-[14px] font-medium tracking-[-0.01em] text-white transition-colors hover:bg-[#272143] sm:px-5 sm:text-[15px]">
              Probar SEGO
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Navegación móvil" className="mx-auto mt-2 flex max-w-[1560px] flex-col gap-1 rounded-[24px] border border-[#272143]/10 bg-[#FFF19D] p-4 shadow-lg lg:hidden">
            {[["Producto", "producto"], ["Cómo funciona", "como-funciona"], ["Beneficios", "beneficios"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="rounded-xl px-4 py-3 text-left font-['Outfit'] text-[15px] font-normal text-[#151515] hover:bg-white/50">{label}</button>
            ))}
            <button onClick={goToLogin} className="rounded-xl px-4 py-3 text-left font-['Outfit'] text-[15px] text-[#151515] hover:bg-white/50">Iniciar sesión</button>
          </nav>
        )}
      </header>

      <main id="inicio">
        {/* HERO — fotografía profesional + vista realista del producto */}
        <section className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-[#272143] pt-32 pb-24 sm:min-h-[780px] lg:min-h-[860px] lg:pt-36">
          {/* Agrega una fotografía propia en public/images/sego-hero.jpg. Si no existe, se mantiene el fondo degradado. */}
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#211D3D_0%,#35324D_58%,#666A7A_100%)]" />
          <div
            className="absolute inset-0 bg-cover bg-[center_35%] opacity-70 lg:bg-center"
            style={{ backgroundImage: 'url("/images/sego-hero.jpg")' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,20,49,0.95)_0%,rgba(24,20,49,0.79)_42%,rgba(24,20,49,0.38)_74%,rgba(24,20,49,0.35)_100%)]" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#211D3D]/60 to-transparent" aria-hidden="true" />

          <div className="relative mx-auto grid w-full max-w-[1360px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-10">
            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[650px]">
              {/* Social proof ilustrativo: sustituir con evidencia real antes del lanzamiento comercial */}
              <div className="mb-7 flex items-center gap-3 text-white">
                <div className="flex shrink-0 items-center pl-1" aria-hidden="true">
                  {[
                    ["A", "#8C88A8"],
                    ["M", "#C3A58C"],
                    ["J", "#737C8B"],
                    ["L", "#A9A4BD"],
                  ].map(([initial, color], index) => (
                    <span key={index} className="-ml-1 grid size-8 place-items-center rounded-full border-[1.5px] border-white/80 text-[11px] font-medium text-white shadow-sm" style={{ backgroundColor: color }}>
                      {initial}
                    </span>
                  ))}
                </div>
                <div className="font-['Outfit'] text-[13px] font-light leading-[1.45] tracking-[-0.01em] sm:text-[14px]">
                  <p>Más de 10.000 clientes</p>
                  <p className="text-white/90">Calificación 4,7 <span className="text-[#FFF19D]">★</span></p>
                </div>
              </div>
              <h1 className="max-w-[650px] font-['Outfit'] text-[45px] font-normal leading-[1.06] tracking-[-0.05em] text-white sm:text-[57px] lg:text-[60px] xl:text-[66px]">
                Cotiza sin repetir.<br /><span className="text-white">Asesora con claridad.</span>
              </h1>
              <p className="mt-6 max-w-[470px] font-['Outfit'] text-[16px] font-light leading-[1.55] tracking-[-0.015em] text-white/90 sm:text-[19px]">
                Ingresa los datos una sola vez, compara alternativas de seguros y prepara propuestas claras para tus clientes.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button onClick={goToLogin} className="group flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 font-['Outfit'] text-[15px] font-medium text-[#171717] transition-all hover:-translate-y-0.5 hover:bg-[#FFF19D]">
                  Probar SEGO <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => scrollTo("como-funciona")} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 font-['Outfit'] text-[15px] font-normal text-white backdrop-blur-md transition-colors hover:bg-white/20">
                  Ver cómo funciona <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* El mismo dashboard que ya tenías, ahora superpuesto sobre la fotografía */}
            <div className="relative mx-auto w-full max-w-[580px] lg:translate-x-3 lg:translate-y-10">
              <div className="absolute -inset-5 rounded-[28px] bg-white/10 blur-2xl" aria-hidden="true" />
              <div className="relative origin-center scale-[0.94] sm:scale-100">
                <ProductPreview />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#272143]/8 bg-white">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-7 px-5 py-8 sm:px-8 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
              {insurers.map((name) => <span key={name} className="font-['Manrope'] text-xs font-extrabold tracking-[0.12em] text-[#272143]/38">{name}</span>)}
            </div>
          </div>
        </section>

        {/* SECCIÓN PRODUCTO — distribución editorial y tarjetas de líneas de seguros */}
        <section id="producto" className="scroll-mt-24 bg-[#EAF2FF] px-5 pb-24 pt-24 sm:px-8 sm:pb-28 sm:pt-28 lg:pb-36 lg:pt-32">
          <div className="mx-auto max-w-[1320px]">
            {/* Entrada suave del símbolo, texto original y cifras */}
            <motion.div
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-[780px] text-center"
            >
              <span className="mx-auto block w-fit select-none text-[44px] leading-none grayscale" role="img" aria-label="Manos celebrando">🙌</span>
              <p className="mt-8 font-['Outfit'] text-[11px] font-medium uppercase tracking-[0.19em] text-[#5447D8] sm:text-[12px]">
                Un proceso, no cinco portales
              </p>
              <h2 className="mx-auto mt-5 max-w-[760px] font-['Outfit'] text-[36px] font-normal leading-[1.12] tracking-[-0.045em] text-[#171717] sm:text-[46px] lg:text-[52px]">
                Tu tiempo debe estar con el cliente.
              </h2>
              <p className="mx-auto mt-6 max-w-[710px] font-['Outfit'] text-[16px] font-light leading-[1.55] tracking-[-0.015em] text-[#45434A] sm:text-[19px]">
                SEGO transforma un proceso manual de 30–40 minutos en una experiencia guiada de menos de 12. Menos reprocesos para ti, más claridad para quien confía en tu asesoría.
              </p>
              <div className="mx-auto mt-8 flex max-w-[440px] items-center justify-center gap-12 sm:gap-20">
                <div>
                  <p className="font-['Outfit'] text-[29px] font-medium tracking-[-0.05em] text-[#5447D8] sm:text-[34px]">3×</p>
                  <p className="mt-1 font-['Outfit'] text-[12px] font-light text-[#45434A] sm:text-[13px]">aseguradoras en una consulta</p>
                </div>
                <div>
                  <p className="font-['Outfit'] text-[29px] font-medium tracking-[-0.05em] text-[#5447D8] sm:text-[34px]">−70%</p>
                  <p className="mt-1 font-['Outfit'] text-[12px] font-light text-[#45434A] sm:text-[13px]">tiempo por cotización</p>
                </div>
              </div>
              <p className="mt-3 font-['Outfit'] text-[11px] text-[#76717A]">* Tiempos y reducción estimados; pendientes de validación con usuarios piloto.</p>
            </motion.div>

            {/* Apertura de cartas, una detrás de otra, como un reparto de póker */}
            <div className="mt-20 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:mt-24 lg:grid-cols-4 lg:gap-4">
              {insuranceCategories.map((category, index) => (
                <motion.article
                  key={category.title}
                  initial={{ opacity: 0, y: 85, x: (1.5 - index) * 30, rotate: [-11, -5, 5, 11][index], scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.78, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="group min-w-0"
                >
                  <div className="relative aspect-[0.77] overflow-hidden rounded-[5px] bg-[#D9D7D0] sm:aspect-[0.83]">
                    <img
                      src={category.image}
                      alt={category.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"
                    />
                    {!category.available && (
                      <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 font-['Outfit'] text-[11px] font-medium text-[#272143] backdrop-blur-sm">
                        Próximamente
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <h3 className="font-['Outfit'] text-[17px] font-normal tracking-[-0.035em] text-[#151515] sm:text-[20px]">
                      {category.title}
                    </h3>
                    {category.available ? (
                      <button
                        type="button"
                        onClick={goToLogin}
                        aria-label="Probar cotización de seguros de autos"
                        className="grid size-9 shrink-0 place-items-center rounded-full border border-[#272143]/20 text-[#272143] transition-all hover:border-[#272143] hover:bg-[#272143] hover:text-white"
                      >
                        <ArrowRight size={15} />
                      </button>
                    ) : (
                      <span aria-label={`${category.title}: próximamente`} className="grid size-9 shrink-0 place-items-center rounded-full border border-[#272143]/15 text-[#272143]/40">
                        <ArrowRight size={15} />
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        
<section
  id="como-funciona"
  className="scroll-mt-20 overflow-hidden bg-[#EAF2FF] px-5 py-24 sm:px-8 lg:py-36"
>
  <div className="mx-auto max-w-[1250px]">

    {/* ENCABEZADO EDITORIAL */}
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto mb-16 max-w-[720px] text-center lg:mb-24"
    >
      <p className="mb-5 font-['Outfit'] text-[12px] font-medium uppercase tracking-[0.22em] text-[#5447D8]">
        Así de simple
      </p>

      <h2 className="font-['Outfit'] text-[clamp(38px,5vw,68px)] font-normal leading-[1.05] tracking-[-0.055em] text-[#272143]">
        De los datos a una
        <br />
        propuesta clara.
      </h2>

      <p className="mx-auto mt-6 max-w-[480px] font-['Outfit'] text-[17px] font-light leading-[1.6] text-[#6C687A]">
        Tres pasos para transformar la forma en que cotizas
        y asesoras a tus clientes.
      </p>
    </motion.div>

    {/* TRES ETAPAS */}
    <div className="grid gap-5 lg:grid-cols-3">

      {benefits.map((benefit, index) => {
        const Icon = benefit.icon;

        return (
          <motion.article
            key={benefit.number}
            initial={{
              opacity: 0,
              y: 75,
              rotate: index === 0 ? -3 : index === 2 ? 3 : 0,
              scale: 0.94
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1
            }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{
              duration: 0.8,
              delay: index * 0.22,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ y: -7 }}
            className="group flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#272143]/10 bg-white"
          >

            {/* ÁREA VISUAL */}
            <div className="relative flex h-[250px] items-center justify-center overflow-hidden bg-[#F8F9FF] sm:h-[285px]">

              <span className="absolute left-7 top-6 font-['Outfit'] text-[14px] font-light text-[#8E8BA3]">
                {benefit.number} / 03
              </span>

              {/* PASO 1: FORMULARIO */}
              {index === 0 && (
                <div className="w-[76%] max-w-[250px] rounded-[14px] border border-[#272143]/10 bg-white p-5 shadow-[0_15px_45px_rgba(39,33,67,0.09)] transition-transform duration-500 group-hover:-rotate-2">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-['Outfit'] text-[13px] font-medium text-[#272143]">
                      Nueva cotización
                    </span>
                    <span className="rounded-full bg-[#EEF0FD] px-2 py-1 text-[9px] text-[#5447D8]">
                      Paso 1
                    </span>
                  </div>

                  {["Nombre del cliente", "Vehículo", "Ciudad"].map((field, i) => (
                    <div key={field} className="mb-3">
                      <p className="mb-1 font-['Outfit'] text-[9px] text-[#77738A]">
                        {field}
                      </p>
                      <div className="h-6 rounded-[5px] border border-[#E5E4EA] bg-[#FAFAFC] px-2 py-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${55 + i * 12}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.18, duration: 0.6 }}
                          className="h-2 rounded-full bg-[#DCD9F6]"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 flex h-7 items-center justify-center rounded-md bg-[#5447D8] font-['Outfit'] text-[10px] text-white">
                    Continuar
                  </div>
                </div>
              )}

              {/* PASO 2: ASEGURADORAS */}
              {index === 1 && (
                <div className="w-[76%] max-w-[260px]">
                  <div className="mb-5 flex justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.07, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="grid size-14 place-items-center rounded-2xl bg-[#5447D8] text-white shadow-[0_10px_30px_rgba(84,71,216,0.2)]"
                    >
                      <Icon size={24} />
                    </motion.div>
                  </div>

                  <div className="space-y-2.5">
                    {["Aseguradora 01", "Aseguradora 02", "Aseguradora 03"].map((name, i) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                        className="flex items-center justify-between rounded-[10px] border border-[#272143]/10 bg-white px-4 py-3 shadow-sm"
                      >
                        <span className="font-['Outfit'] text-[12px] text-[#272143]">
                          {name}
                        </span>
                        <span className="grid size-5 place-items-center rounded-full bg-[#E5F5EC] text-[#14834A]">
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <p className="mt-4 text-center font-['Outfit'] text-[10px] text-[#8E8BA3]">
                    Consultas simuladas del MVP
                  </p>
                </div>
              )}

              {/* PASO 3: COMPARADOR */}
              {index === 2 && (
                <div className="w-[82%] max-w-[290px] rounded-[14px] border border-[#272143]/10 bg-white p-4 shadow-[0_15px_45px_rgba(39,33,67,0.09)]">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-['Outfit'] text-[13px] font-medium text-[#272143]">
                      Comparación
                    </span>
                    <span className="rounded-full bg-[#EEF0FD] px-2 py-1 text-[9px] text-[#5447D8]">
                      3 opciones
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[65, 84, 74].map((value, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.18 }}
                        className={`rounded-lg border p-2 ${
                          i === 1
                            ? "border-[#5447D8] bg-[#F3F2FF]"
                            : "border-[#E5E4EA] bg-white"
                        }`}
                      >
                        <p className="text-center font-['Outfit'] text-[9px] text-[#6C687A]">
                          Plan {i + 1}
                        </p>

                        <div className="mt-4 flex h-[60px] items-end justify-center">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${value}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 + i * 0.15, duration: 0.7 }}
                            className="w-[70%] rounded-t-md bg-[#5447D8]"
                            style={{ opacity: i === 1 ? 1 : 0.35 }}
                          />
                        </div>

                        <p className="mt-3 text-center font-['Outfit'] text-[9px] font-medium text-[#272143]">
                          Ver detalle
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-3 rounded-md bg-[#F7F7FA] px-3 py-2 text-center font-['Outfit'] text-[10px] text-[#5447D8]">
                    Propuesta consolidada
                  </div>
                </div>
              )}

            </div>

            {/* TEXTO DE LA TARJETA */}
            <div className="flex flex-1 flex-col px-7 pb-9 pt-7 sm:px-8">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-['Outfit'] text-[12px] tracking-[0.08em] text-[#8E8BA3]">
                  PASO {benefit.number}
                </span>

                <span className="grid size-9 place-items-center rounded-full border border-[#272143]/10 text-[#5447D8] transition-colors group-hover:bg-[#5447D8] group-hover:text-white">
                  <Icon size={17} />
                </span>
              </div>

              <h3 className="font-['Outfit'] text-[26px] font-normal leading-[1.12] tracking-[-0.035em] text-[#272143]">
                {benefit.title}
              </h3>

              <p className="mt-4 font-['Outfit'] text-[15px] font-light leading-[1.65] text-[#6C687A]">
                {benefit.text}
              </p>
            </div>

          </motion.article>
        );
      })}

    </div>

    {/* CIERRE DE SECCIÓN */}
    <motion.p
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mx-auto mt-14 max-w-[580px] text-center font-['Outfit'] text-[16px] font-light leading-[1.6] text-[#6C687A]"
    >
      Menos tiempo organizando información.
      <br />
      Más tiempo construyendo confianza con tus clientes.
    </motion.p>

  </div>
</section>


       
<section
  id="beneficios"
  className="scroll-mt-20 bg-white px-5 py-24 sm:px-8 lg:py-32"
>
  <div className="mx-auto max-w-[1240px]">

    {/* COMPOSICIÓN VISUAL SUPERIOR */}
    <div className="grid gap-4 lg:grid-cols-[1.85fr_1fr]">

      {/* Fotografía */}
      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="relative h-[300px] overflow-hidden rounded-[8px] bg-[#E8EBF0] sm:h-[400px] lg:h-[450px]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage: 'url("/images/sego-beneficios.jpg")'
          }}
        />
      </motion.div>

      {/* Símbolo de marca */}
      <motion.div
        initial={{ opacity: 0, x: 45 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, delay: 0.15 }}
        className="flex min-h-[260px] items-center justify-center rounded-[8px] bg-[#EAF2FF] lg:min-h-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.85,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="flex flex-col items-center gap-6"
        >
          <HeartHandshake
            size={132}
            strokeWidth={1.15}
            color="#272143"
          />

          <span className="font-['Outfit'] text-[15px] font-light tracking-[0.28em] text-[#272143]">
            SEGO
          </span>
        </motion.div>
      </motion.div>
    </div>

    {/* HISTORIA Y PROPUESTA DE VALOR */}
    <div className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-[1fr_1fr] lg:gap-24">

      {/* Columna izquierda */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-7 font-['Outfit'] text-[12px] font-normal uppercase tracking-[0.04em] text-[#272143]">
          Nuestro propósito
        </p>

        <h2 className="max-w-[520px] font-['Outfit'] text-[clamp(35px,3.6vw,49px)] font-normal leading-[1.13] tracking-[-0.055em] text-[#171717]">
          Asesora con más confianza.
          <br />
          Crece con menos fricción.
        </h2>
      </motion.div>

      {/* Columna derecha */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="font-['Outfit']"
      >
        <p className="text-[17px] font-light leading-[1.75] tracking-[-0.02em] text-[#38343F]">
          Una herramienta pensada para intermediarios que quieren
          elevar su servicio sin sumar complejidad a su operación.
        </p>

        <div className="mt-10 space-y-7">
          {[
            {
              title: "Menos tareas repetitivas",
              text: "Dedica tus conversaciones a entender y asesorar, no a copiar datos."
            },
            {
              title: "Propuestas fáciles de entender",
              text: "Comparte opciones consistentes y listas para conversar con tu cliente."
            },
            {
              title: "Decisiones con respaldo",
              text: "Mantén coberturas, deducibles y precios visibles en un solo lugar."
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: index * 0.15
              }}
              className="border-b border-[#272143]/10 pb-6"
            >
              <div className="flex items-start gap-5">
                <span className="pt-1 text-[12px] font-light text-[#5447D8]">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-[19px] font-normal tracking-[-0.035em] text-[#171717]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[15px] font-light leading-[1.65] text-[#6C687A]">
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={goToLogin}
          className="group mt-9 inline-flex min-h-12 items-center gap-5 rounded-full bg-[#272143] px-7 py-3 font-['Outfit'] text-[15px] font-normal text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#5447D8]"
        >
          Explorar la plataforma

          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </motion.div>
    </div>
  </div>
</section>


      </main>

      <footer className="border-t border-[#272143]/10 bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row sm:px-8">
          <Brand />
          <p className="text-center text-xs text-[#6C687A]">© 2026 SEGO. Tecnología para una mejor asesoría.</p>
          <button onClick={goToLogin} className="flex items-center gap-1.5 text-sm font-semibold text-[#5447D8]">Iniciar sesión <ChevronRight size={14} /></button>
        </div>
      </footer>
    </motion.div>
  );
}
