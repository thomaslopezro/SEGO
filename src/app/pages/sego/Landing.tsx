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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#272143]/8 bg-[#F7F7FA]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <button onClick={() => scrollTo("inicio")} aria-label="Ir al inicio" className="cursor-pointer">
            <Brand />
          </button>
          <nav className="hidden items-center gap-8 md:flex">
            <button onClick={() => scrollTo("producto")} className="text-sm font-medium text-[#6C687A] transition-colors hover:text-[#272143]">Producto</button>
            <button onClick={() => scrollTo("como-funciona")} className="text-sm font-medium text-[#6C687A] transition-colors hover:text-[#272143]">Cómo funciona</button>
            <button onClick={() => scrollTo("beneficios")} className="text-sm font-medium text-[#6C687A] transition-colors hover:text-[#272143]">Beneficios</button>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button onClick={goToLogin} className="rounded-[10px] px-4 py-2.5 text-sm font-semibold text-[#272143] transition-colors hover:bg-[#272143]/5">
              Iniciar sesión
            </button>
            <button onClick={goToLogin} className="flex items-center gap-2 rounded-[10px] bg-[#5447D8] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_5px_16px_rgba(84,71,216,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#473BC5]">
              Probar SEGO <ArrowRight size={15} />
            </button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid size-10 place-items-center rounded-lg text-[#272143] md:hidden" aria-label="Abrir menú">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#272143]/8 bg-white px-5 py-5 md:hidden">
            <div className="flex flex-col gap-1">
              {[
                ["Producto", "producto"],
                ["Cómo funciona", "como-funciona"],
                ["Beneficios", "beneficios"],
              ].map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="rounded-lg px-3 py-3 text-left text-sm font-medium hover:bg-[#F7F7FA]">{label}</button>
              ))}
              <button onClick={goToLogin} className="mt-3 rounded-[10px] bg-[#5447D8] px-5 py-3 text-sm font-semibold text-white">Probar SEGO</button>
            </div>
          </div>
        )}
      </header>

      <main id="inicio">
        <section className="relative overflow-hidden bg-[#272143] pb-24 pt-32 sm:pt-40 lg:pb-28">
          <div className="absolute inset-0 opacity-50" aria-hidden="true">
            <div className="absolute -right-40 -top-48 size-[620px] rounded-full border border-white/5" />
            <div className="absolute -right-20 -top-20 size-[420px] rounded-full border border-white/5" />
            <div className="absolute left-[44%] top-0 h-full w-px bg-white/5" />
          </div>
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <h1 className="max-w-[620px] font-['Manrope'] text-[42px] font-extrabold leading-[1.06] tracking-[-0.045em] text-white sm:text-[58px] lg:text-[66px]">
                Más opciones.
                <br />
                Menos vueltas.
                <br />
                <span className="text-[#8C82FF]">Mejores decisiones.</span>
              </h1>
              <p className="mt-6 max-w-[540px] text-base leading-7 text-white/58 sm:text-lg">
                Cotiza seguros de vehículo con varias aseguradoras, compara coberturas y comparte una propuesta clara con tu cliente.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button onClick={goToLogin} className="group flex items-center justify-center gap-2 rounded-[11px] bg-[#5447D8] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(84,71,216,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#6256E1]">
                  Comenzar ahora
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                <button onClick={() => scrollTo("como-funciona")} className="flex items-center justify-center gap-2 rounded-[11px] border border-white/16 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                  Ver cómo funciona <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
            <ProductPreview />
          </div>
        </section>

        <section className="border-b border-[#272143]/8 bg-white">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-7 px-5 py-8 sm:px-8 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
              {insurers.map((name) => <span key={name} className="font-['Manrope'] text-xs font-extrabold tracking-[0.12em] text-[#272143]/38">{name}</span>)}
            </div>
          </div>
        </section>

        <section id="producto" className="scroll-mt-20 px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-[1120px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#5447D8]">Un proceso, no cinco portales</p>
                <h2 className="mt-5 font-['Manrope'] text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] text-[#272143] sm:text-5xl">
                  Tu tiempo debe estar con el cliente.
                </h2>
              </div>
              <div className="border-l border-[#272143]/12 pl-7 sm:pl-10">
                <p className="max-w-[630px] text-lg leading-8 text-[#6C687A]">
                  SEGO transforma un proceso manual de 30–40 minutos en una experiencia guiada de menos de 12. Menos reprocesos para ti, más claridad para quien confía en tu asesoría.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-8">
                  <div>
                    <p className="font-['Manrope'] text-4xl font-extrabold tracking-[-0.04em] text-[#5447D8]">3×</p>
                    <p className="mt-2 text-sm text-[#6C687A]">aseguradoras en una consulta</p>
                  </div>
                  <div>
                    <p className="font-['Manrope'] text-4xl font-extrabold tracking-[-0.04em] text-[#5447D8]">−70%</p>
                    <p className="mt-2 text-sm text-[#6C687A]">tiempo por cotización</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-20 bg-white px-5 py-24 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-[1120px]">
            <div className="max-w-[680px]">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#5447D8]">Cómo funciona</p>
              <h2 className="mt-4 font-['Manrope'] text-4xl font-extrabold tracking-[-0.04em] text-[#272143]">De los datos a una propuesta clara.</h2>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-[16px] border border-[#272143]/10 bg-[#272143]/10 md:grid-cols-3">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <article key={benefit.number} className="group bg-white p-8 transition-colors hover:bg-[#F7F7FA] sm:p-10">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-[11px] bg-[#5447D8]/10 text-[#5447D8] transition-transform group-hover:-translate-y-0.5"><Icon size={20} /></span>
                      <span className="font-['Manrope'] text-xs font-bold text-[#272143]/25">{benefit.number}</span>
                    </div>
                    <h3 className="mt-9 font-['Manrope'] text-xl font-bold tracking-[-0.02em] text-[#272143]">{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#6C687A]">{benefit.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="beneficios" className="scroll-mt-20 px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[1120px] overflow-hidden rounded-[22px] bg-[#272143] lg:grid-cols-[1fr_0.85fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <div className="grid size-12 place-items-center rounded-xl bg-[#5447D8] text-white"><ShieldCheck size={23} /></div>
              <h2 className="mt-8 max-w-[560px] font-['Manrope'] text-4xl font-extrabold leading-[1.1] tracking-[-0.04em] text-white">
                Asesora con más confianza. Crece con menos fricción.
              </h2>
              <p className="mt-5 max-w-[540px] leading-7 text-white/55">
                Una herramienta pensada para intermediarios que quieren elevar su servicio sin sumar complejidad a su operación.
              </p>
              <button onClick={goToLogin} className="mt-9 flex items-center gap-2 rounded-[11px] bg-[#5447D8] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#6256E1]">
                Explorar la plataforma <ArrowRight size={16} />
              </button>
            </div>
            <div className="border-t border-white/8 bg-white/[0.04] p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-14">
              <div className="space-y-8">
                {[
                  [Clock3, "Menos tareas repetitivas", "Dedica tus conversaciones a entender y asesorar, no a copiar datos."],
                  [FileCheck2, "Propuestas fáciles de entender", "Comparte opciones consistentes y listas para conversar con tu cliente."],
                  [ShieldCheck, "Decisiones con respaldo", "Mantén coberturas, deducibles y precios visibles en un solo lugar."],
                ].map(([Icon, title, text]) => {
                  const ItemIcon = Icon as React.ComponentType<{ size?: number }>;
                  return (
                    <div key={title as string} className="flex gap-4">
                      <span className="mt-0.5 text-[#8C82FF]"><ItemIcon size={20} /></span>
                      <div>
                        <p className="font-['Manrope'] text-sm font-bold text-white">{title as string}</p>
                        <p className="mt-2 text-sm leading-6 text-white/48">{text as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
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
