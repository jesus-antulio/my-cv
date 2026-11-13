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
- `src/data/`: contenido del sitio (`site.ts`, `projects.ts`, `experience.ts`, `skills.ts`). Para cambiar textos, proyectos o datos de contacto se edita aquí.
- `src/scripts/`: interacciones (tema, menú, modales, galería de proyectos, canvas del hero, contadores y animaciones).
- `src/styles/global.css`: variables de color (tema oscuro y claro), estilos base, utilidades compartidas, modales y keyframes.
- `public/favicon.svg` y `public/assets/favicon/`: favicon (los PNG e ICO se generan a partir del SVG).
- `public/assets/docs/`: CV descargable desde el sitio.
- `public/assets/projects/`: imágenes usadas en la galería de proyectos.

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
