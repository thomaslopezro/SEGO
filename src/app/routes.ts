import { createBrowserRouter, redirect } from "react-router";
import { Login } from "./pages/sego/Login";
import { Dashboard } from "./pages/sego/Dashboard";
import { NuevaCotizacion } from "./pages/sego/NuevaCotizacion";
import { Procesando } from "./pages/sego/Procesando";
import { Resultados } from "./pages/sego/Resultados";
import { DetalleCotizacion } from "./pages/sego/DetalleCotizacion";
import { Documento } from "./pages/sego/Documento";
import { Cotizaciones } from "./pages/sego/Cotizaciones";
import { ClienteView } from "./pages/sego/ClienteView";
import { Landing } from "./pages/sego/Landing";

export const router = createBrowserRouter([
  { path: "/", Component: Landing },
  { path: "/login", Component: Login },
  { path: "/dashboard", Component: Dashboard },
  { path: "/cotizaciones/nueva", Component: NuevaCotizacion },
  { path: "/cotizaciones/procesando", Component: Procesando },
  { path: "/cotizaciones/resultados", Component: Resultados },
  { path: "/cotizaciones/documento", Component: Documento },
  { path: "/cotizaciones/:id", Component: DetalleCotizacion },
  { path: "/cotizaciones", Component: Cotizaciones },

  // Vista para el cliente final (link compartible)
  { path: "/cliente/:token", Component: ClienteView },

  { path: "*", loader: () => redirect("/") },
]);
