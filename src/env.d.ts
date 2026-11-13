/// <reference types="astro/client" />

interface Window {
  lucide?: {
    createIcons: (options?: { attrs?: Record<string, string | number> }) => void;
  };
}
