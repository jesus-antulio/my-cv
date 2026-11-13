import { en } from "./en";
import { es, type Dictionary } from "./es";

export const languages = ["es", "en"] as const;
export type Lang = (typeof languages)[number];
export type { Dictionary };

export const defaultLang: Lang = "es";

/** Ruta de la portada en cada idioma. */
export const langPath: Record<Lang, string> = { es: "/", en: "/en/" };

export const langName: Record<Lang, string> = { es: "Español", en: "English" };

const dictionaries: Record<Lang, Dictionary> = { es, en };

/** Normaliza cualquier valor de idioma ("en", "en-US", undefined…) a uno soportado. */
export function toLang(value?: string | null): Lang {
  return value?.toLowerCase().startsWith("en") ? "en" : defaultLang;
}

/**
 * Textos del idioma indicado. En componentes Astro: `useTranslations(Astro.currentLocale)`;
 * en scripts de cliente: `useTranslations(document.documentElement.lang)`.
 */
export function useTranslations(value?: string | null): Dictionary {
  return dictionaries[toLang(value)];
}
