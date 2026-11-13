import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jesus-antulio.com.mx",
  // Español en "/" e inglés en "/en/". Los textos están en src/i18n/.
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
  },
});
