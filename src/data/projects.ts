import { useTranslations } from "../i18n";

export interface ProjectImage {
  src: string;
  alt?: string;
}

export interface Project {
  eyebrow: string;
  title: string;
  description: string;
  images: ProjectImage[];
  details: [label: string, value: string][];
  tags: string[];
}

const numbered = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => `/assets/projects/${prefix}${index + 1}.png`);

/**
 * Capturas de cada proyecto, en el orden en que se muestran. Los textos (título, descripción,
 * detalles, etiquetas y textos alternativos) están en src/i18n/ bajo `projects.items`, con el mismo id.
 */
const projectImages: Record<string, string[]> = {
  crm_4sales: numbered("4sales/4sales-crm-", 5),
  crm_inmoapp: [...numbered("inmoapp/inmoapp-crm-", 4), ...numbered("inmoapp/inmoapp-micro-", 4)],
  recepcionistapp: [...numbered("recepcionistapp/web-", 9), ...numbered("recepcionistapp/app-", 6)],
  landings: numbered("landings/landing-", 6),
};

/** Proyectos con sus textos en el idioma indicado. */
export function getProjects(lang?: string | null): Record<string, Project> {
  const { items } = useTranslations(lang).projects;

  return Object.fromEntries(
    Object.entries(projectImages).map(([id, images]) => {
      const { alts, ...text } = items[id];
      return [id, { ...text, images: images.map((src, index) => ({ src, alt: alts?.[index] })) }];
    }),
  );
}
