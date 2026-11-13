# Portafolio & CV Personal - Jesús Jiménez

Proyecto Astro para presentar el perfil profesional, experiencia, habilidades, proyectos y datos de contacto de Jesús Antulio Jiménez Delgado.

## Scripts

- `npm run dev`: inicia el servidor local de Astro.
- `npm run build`: genera la versión estática en `dist/`.
- `npm run preview`: previsualiza el build localmente.

## Estructura

- `src/pages/index.astro`: compone la página a partir de los componentes.
- `src/layouts/Layout.astro`: `<head>` (SEO, Open Graph, JSON-LD), fuentes, favicon y tema inicial.
- `src/components/`: una sección por archivo (`Header`, `Hero`, `About`, `Projects`, `Experience`, `Skills`, `Contact`, `Footer`), los modales y `ui/SectionHeading`. Cada componente lleva sus propios estilos.
- `src/i18n/`: todos los textos del sitio, un archivo por idioma (`es.ts`, `en.ts`). Para cambiar o traducir textos se edita aquí; `en.ts` debe tener las mismas claves que `es.ts` (TypeScript lo comprueba).
- `src/data/`: datos que no dependen del idioma (`site.ts`: contacto, rutas del CV; `projects.ts`: capturas de cada proyecto).
- `src/pages/index.astro` (español, `/`) y `src/pages/en/index.astro` (inglés, `/en/`). El selector ES/EN del menú enlaza una con otra.
- `middleware.ts` y `src/scripts/cv-region.ts`: eligen el CV según la región del visitante (ver "CV por región").
- `src/scripts/`: interacciones (tema, menú, modales, galería de proyectos, canvas del hero, contadores y animaciones).
- `src/styles/global.css`: variables de color (tema oscuro y claro), estilos base, utilidades compartidas, modales y keyframes.
- `public/favicon.svg` y `public/assets/favicon/`: favicon (los PNG e ICO se generan a partir del SVG).
- `public/assets/docs/`: CV descargable desde el sitio.
- `public/assets/projects/`: imágenes usadas en la galería de proyectos.

## CV por región

Los botones "Descargar CV" apuntan al PDF en español (`site.cv.es`) o en inglés (`site.cv.en`) según desde dónde se visita la página, sin importar el idioma en que se esté leyendo:

1. En Vercel, `middleware.ts` guarda el país del visitante (cabecera `x-vercel-ip-country`) en la cookie `geo-country`.
2. `src/scripts/cv-region.ts` lee esa cookie: países hispanohablantes reciben el CV en español y el resto el CV en inglés.
3. Si no hay cookie (desarrollo local u otro hosting) se usa la zona horaria del navegador; si tampoco sirve, queda el CV del idioma de la página.

## Personalización rápida

Antes de publicar, conviene agregar o confirmar:

- Enlaces reales de GitHub, LinkedIn o proyectos públicos si quieres mostrarlos.
- Capturas o URLs de proyectos cuando estén disponibles.
- Cualquier ajuste fino al resumen profesional.

## Publicación gratuita

Puedes subir estos archivos a cualquiera de estas opciones:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

Para publicar, ejecuta `npm run build` y despliega la carpeta `dist/` en Netlify, Vercel, Cloudflare Pages o GitHub Pages.
