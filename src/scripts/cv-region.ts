import { site } from "../data/site";
import type { Lang } from "../i18n";

/** Países donde se ofrece el CV en español; en el resto, el CV en inglés. */
const SPANISH_COUNTRIES = new Set([
  "MX", "ES", "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ", "GT", "HN", "NI", "PA", "PY", "PE",
  "PR", "UY", "VE",
]);

/** Zonas horarias de esos mismos países, para cuando no se conoce el país del visitante. */
const SPANISH_TIMEZONES = new Set([
  // México
  "America/Mexico_City", "America/Cancun", "America/Merida", "America/Monterrey", "America/Matamoros",
  "America/Chihuahua", "America/Ciudad_Juarez", "America/Ojinaga", "America/Mazatlan", "America/Bahia_Banderas",
  "America/Hermosillo", "America/Tijuana",
  // España
  "Europe/Madrid", "Africa/Ceuta", "Atlantic/Canary",
  // Centroamérica y el Caribe
  "America/Guatemala", "America/El_Salvador", "America/Tegucigalpa", "America/Managua", "America/Costa_Rica",
  "America/Panama", "America/Havana", "America/Santo_Domingo", "America/Puerto_Rico",
  // Sudamérica
  "America/Bogota", "America/Caracas", "America/Guayaquil", "Pacific/Galapagos", "America/Lima", "America/La_Paz",
  "America/Santiago", "America/Punta_Arenas", "Pacific/Easter", "America/Asuncion", "America/Montevideo",
  // Argentina: los navegadores devuelven tanto "America/Argentina/…" como los nombres antiguos
  "America/Buenos_Aires", "America/Cordoba", "America/Catamarca", "America/Jujuy", "America/Mendoza",
  "America/Rosario",
  // Guinea Ecuatorial
  "Africa/Malabo",
]);

/** País del visitante (ISO 3166-1) según la cookie que escribe middleware.ts en Vercel. */
function countryFromCookie(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)geo-country=([A-Za-z]{2})(?:;|$)/);
  return match ? match[1].toUpperCase() : null;
}

function timeZone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}

/** Idioma del CV según la región, o null si no hay forma de saberla. */
function cvLangForRegion(): Lang | null {
  const country = countryFromCookie();
  if (country) return SPANISH_COUNTRIES.has(country) ? "es" : "en";

  const zone = timeZone();
  // "UTC" y similares no dicen nada de la región: se deja el CV del idioma de la página.
  if (!zone || !zone.includes("/") || zone.startsWith("Etc/")) return null;
  return SPANISH_TIMEZONES.has(zone) || zone.startsWith("America/Argentina/") ? "es" : "en";
}

/**
 * Apunta los enlaces [data-cv-link] al CV que corresponde a la región del visitante.
 * Sin JavaScript, o si la región no se puede determinar, queda el CV del idioma de la página.
 */
export function initCvRegion() {
  const lang = cvLangForRegion();
  if (!lang) return;

  document.querySelectorAll<HTMLAnchorElement>("a[data-cv-link]").forEach((link) => {
    link.href = site.cv[lang];
    link.hreflang = lang;
  });
}
