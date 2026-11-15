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

Ruta oculta (sin enlace en el menú): `/metricas` — tiempos por cotización para las pruebas de campo
(minutos hasta resultados y hasta documento), con exportación a CSV y botón para borrar.

## Deploy

El proyecto se publica en [Vercel](https://vercel.com) como sitio estático. `vercel.json` ya redirige
todas las rutas a `index.html`, así que recargar cualquier pantalla no da 404.

**Opción A — desde la terminal**

```bash
npm install
npm run build          # verifica que compila
npx vercel login       # solo la primera vez
npx vercel --prod      # publica y muestra la URL final
```

La primera vez `vercel` pregunta por el proyecto: acepta los valores por defecto
(framework *Vite*, comando `npm run build`, carpeta de salida `dist`).

**Opción B — desde GitHub**

1. Entra a vercel.com → *Add New… → Project* e importa este repositorio.
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. *Deploy*. Cada `git push` a `main` vuelve a publicar automáticamente.

## Qué es simulado

Este MVP es una versión de prueba; la app lo indica con un aviso en todas las pantallas.

- **Login demo:** "Entrar como usuario demo" (o cualquier correo y contraseña) entra sin verificar credenciales.
- **Aseguradoras ficticias:** Aseguradora Andina, Seguros Capital y Protección Nacional no existen; sus coberturas, deducibles y exclusiones son de ejemplo.
- **Consulta en paralelo simulada:** la pantalla "Consultando aseguradoras" es una animación; no se conecta a ningún sistema externo.
- **Precios calculados con una fórmula de demostración:** prima anual = valor comercial × tasa de cada aseguradora (Capital 2,8 %, Andina 3,4 %, Protección 4,2 %), +15 % si el uso es comercial, +20 % si tuvo siniestros en los últimos 3 años, +10 % si el modelo tiene más de 10 años; redondeada a miles de pesos. No son ofertas reales.
- **Envío de correo/link simulado:** los botones "Enviar" no mandan correos. El link para el cliente sí funciona: lleva los datos de la cotización codificados en la URL (nombre de pila, vehículo y precios) y se puede copiar o compartir por WhatsApp. "Elegir este seguro" no realiza pagos.
- **Historial guardado en el navegador:** cotizaciones, borradores y métricas se guardan en `localStorage` del navegador/dispositivo donde se usan; no hay servidor ni base de datos, y no se sincronizan entre equipos.

