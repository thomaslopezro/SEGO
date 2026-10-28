# SEGO — MVP

Plataforma web de cotización comparativa de seguros de vehículo para intermediarios.
Proyecto del curso *Creación de Empresas de Base Tecnológica* — Pontificia Universidad Javeriana.

Prototipo exportado desde Figma Make (React + Vite + Tailwind). Los datos son de demostración.

## Correr el proyecto

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Pantallas (rutas)

| Ruta | Pantalla |
| --- | --- |
| `/` | Landing |
| `/login` | Login (botón "Entrar como usuario demo") |
| `/dashboard` | Dashboard |
| `/cotizaciones/nueva` | Nueva cotización (cliente → vehículo) |
| `/cotizaciones/procesando` | Consultando aseguradoras |
| `/cotizaciones/resultados` | Comparador |
| `/cotizaciones/:id` | Detalle de opción |
| `/cotizaciones/documento` | Documento consolidado |
| `/cotizaciones` | Historial |
| `/cliente/:token` | Vista compartible para el cliente final |

## Estructura

```
src/
  main.tsx
  app/
    App.tsx
    routes.ts
    pages/sego/      # todas las pantallas + data.ts (datos demo)
  styles/            # Tailwind + tema
```

## Deploy

Funciona en Vercel o Netlify sin configuración extra (`npm run build`, carpeta `dist`).
`vercel.json` ya incluye la regla para que las rutas funcionen al recargar.
