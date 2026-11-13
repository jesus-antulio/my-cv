import type { Lang } from "../i18n";

const phone = "524448288334";

/** Datos que no dependen del idioma; los textos traducibles viven en src/i18n/. */
export const site = {
  url: "https://jesus-antulio.com.mx",
  fullName: "Jesús Antulio Jiménez Delgado",
  shortName: "Jesús A. Jiménez",
  initials: "JA",
  email: "jesus_antulio@outlook.com",
  phoneDisplay: "+52 444 828 8334",
  phoneHref: "tel:+524448288334",
  mapsUrl: "https://maps.google.com/?q=San%20Luis%20Potos%C3%AD%2C%20M%C3%A9xico",
  profileImage: "/assets/img/me.jpg",
  /** Imagen de 1200×630 que se muestra al compartir el sitio en redes y mensajería. */
  socialImage: {
    es: "/assets/og/og-es.png",
    en: "/assets/og/og-en.png",
  } satisfies Record<Lang, string>,
  /** CV por idioma. Cuál se ofrece lo decide la región del visitante (src/scripts/cv-region.ts). */
  cv: {
    es: "/assets/docs/CV_Jesus_Jimenez.pdf",
    en: "/assets/docs/CV_Jesus_Jimenez_EN.pdf",
  } satisfies Record<Lang, string>,
  themeColor: { dark: "#0a100e", light: "#f4f7f5" },
} as const;

export const heroStack = ["Angular", "TypeScript", "Ionic", "Astro", "Tailwind", "APIs"];

export const whatsappUrl = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
