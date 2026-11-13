export interface Metric {
  target: number;
  suffix?: string;
  label: string;
}

export interface Feature {
  icon: string;
  title: string;
  text: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  description: string;
  current?: boolean;
}

export interface SecondaryExperienceItem {
  role: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectText {
  eyebrow: string;
  title: string;
  description: string;
  /** Texto alternativo por imagen, en el mismo orden que en data/projects.ts. */
  alts?: string[];
  details: [label: string, value: string][];
  tags: string[];
}

const metrics: Metric[] = [
  { target: 2, suffix: "+", label: "Años creando frontend" },
  { target: 3, label: "Roles técnicos" },
  { target: 8, label: "Tecnologías clave" },
];

const features: Feature[] = [
  {
    icon: "layout-dashboard",
    title: "Aplicaciones Angular",
    text: "Interfaces dinámicas con componentes reutilizables, formularios reactivos y flujos claros.",
  },
  {
    icon: "plug-zap",
    title: "Integración con APIs",
    text: "Conexión de servicios, manejo de datos y estados de interfaz listos para escenarios reales.",
  },
  {
    icon: "smartphone",
    title: "Web y móvil",
    text: "Experiencias multiplataforma con Ionic y Capacitor sin perder consistencia visual.",
  },
  {
    icon: "gauge",
    title: "Rendimiento web",
    text: "Landings y sitios con Astro, cuidando carga, claridad y amigables con SEO.",
  },
];

const timeline: TimelineItem[] = [
  {
    period: "2024 - Presente",
    title: "Desarrollador Frontend | FoxCode",
    current: true,
    description:
      "Aplicaciones web con Angular, interfaces dinámicas, componentes reutilizables, arquitectura modular, control de versiones, apps con Ionic y landings con Astro.",
  },
  {
    period: "Ago 2022 - Jul 2023",
    title: "Becario | Facultad de Ingeniería, UASLP",
    description:
      "Mantenimiento preventivo y correctivo de equipos, instalación y actualización de software especializado, y soporte técnico a estudiantes del área civil.",
  },
  {
    period: "Jul 2022 - May 2023",
    title: "Practicante | Coordinación de Tecnología Educativa, UASLP",
    description:
      "Videojuegos educativos con JavaScript y jQuery, participando en conceptualización, diseño gráfico y desarrollo funcional.",
  },
  {
    period: "Licenciatura | 2018 - 2023",
    title: "Ingeniería en Sistemas Inteligentes | UASLP",
    description: "Formación profesional en la Facultad de Ingeniería, San Luis Potosí, México.",
  },
];

const secondaryExperience: SecondaryExperienceItem[] = [
  {
    role: "Valuador de seguros",
    title: "Atención a asegurados en taller",
    description:
      "Primer contacto con el cliente al llevar su unidad para la valuación de daños, seguimiento del proceso de reparación y entrega final del vehículo.",
    tags: ["Inventarios", "Bitácoras", "Cotizaciones"],
  },
  {
    role: "Archivista",
    title: "Clasificación y archivo de documentos",
    description:
      "Organización de documentos físicos, clasificación, digitalización y gestión de archivos para facilitar su consulta y resguardo, así como validar que se siguiera la normatividad de la ley de prevención de lavado de dinero.",
    tags: ["Colaboración", "Organización"],
  },
  {
    role: "Staff",
    title: "Coordinación y apoyo en eventos",
    description:
      "Apoyo en el evento ANUIES 2023, colaborando en la logística, atención a asistentes y coordinación de actividades para asegurar el buen desarrollo del evento.",
    tags: ["Colaboración", "Organización", "Logística"],
  },
];

const projectItems: Record<string, ProjectText> = {
  crm_4sales: {
    eyebrow: "Proyecto 01",
    title: "4Sales: CRM y micrositios",
    description:
      "Proyecto enfocado en constructoras para administrar y publicitar proyectos inmobiliarios. Incluye un CRM para gestión de clientes y un sistema de micrositios para mostrar propiedades, con atención a experiencia de usuario y rendimiento.",
    alts: [
      "Interfaz de CRM para gestión de clientes en el sector inmobiliario, desarrollado con Angular y TypeScript",
      "Pantalla de gestión de proyectos y macroproyectos en CRM para constructoras, con enfoque en experiencia de usuario y rendimiento",
      "Pantalla de administración de un proyecto, donde se gestionan los planos para enlazar pisos con inmuebles",
      "Pantalla de edición de plano para dibujar la distribución de pisos e inmuebles en CRM para constructoras, con enfoque en experiencia de usuario y rendimiento",
      "Pantalla de gestión de clientes en CRM para constructoras, con enfoque en experiencia de usuario",
    ],
    details: [
      ["Rol", "Frontend developer enfocado en arquitectura de componentes e integración visual."],
      ["Aporte", "Módulos reutilizables, manejo de estados de interfaz y conexión con servicios."],
      ["Resultado", "Bases de UI más consistentes para acelerar nuevas pantallas internas."],
    ],
    tags: ["Angular", "TypeScript", "Bootstrap", "APIs"],
  },
  crm_inmoapp: {
    eyebrow: "Proyecto 02",
    title: "Inmoapp",
    description:
      "CRM para las inmobiliarias, con el objetivo de digitalizar su inventario y facilitar el compartir información de una propiedad. El proyecto incluye un sistema de micrositios para mostrar propiedades, con atención a experiencia de usuario y rendimiento, y una interfaz móvil híbrida para acceso desde dispositivos móviles.",
    details: [
      [
        "Rol",
        "Construcción y adaptación del Frontend para el CRM y maquetación de nuevas plantillas para los micrositios.",
      ],
      [
        "Aporte",
        "Plantillas de micrositios nuevos, componentes reutilizables y reestructuración del código anterior.",
      ],
      [
        "Resultado",
        "Interfaz más moderna y consistente, con una base más sólida para futuras implementaciones y mejoras en la experiencia de usuario.",
      ],
    ],
    tags: ["Angular", "TypeScript", "UX/UI", "IA"],
  },
  recepcionistapp: {
    eyebrow: "Proyecto 03",
    title: "Recepcionistapp",
    description:
      "Proyecto para digitalizar proceso de citas en distintos ámbitos, así como manejo de expedientes y seguimiento de casos. Incluye un sistema de micrositios para mostrar información relevante, con atención a experiencia de usuario y rendimiento, y una interfaz móvil híbrida para acceso desde dispositivos móviles.",
    details: [
      [
        "Rol",
        "Creación del proyecto inicial y desarrollo de la app móvil híbrida con Ionic, incluyendo diseño de interfaz y experiencia de usuario.",
      ],
      [
        "Aporte",
        "Desarrollo de la aplicación móvil híbrida, con enfoque en experiencia de usuario y rendimiento, utilizando Ionic y Angular para crear una interfaz intuitiva y eficiente.",
      ],
      [
        "Resultado",
        "Aplicación móvil funcional para gestión de citas y expedientes, con una experiencia de usuario optimizada y un rendimiento sólido, facilitando la digitalización de procesos en distintos ámbitos.",
      ],
    ],
    tags: ["Angular", "Ionic", "Tailwind", "UX/UI"],
  },
  landings: {
    eyebrow: "Proyecto 04",
    title: "Páginas informativas",
    description:
      "Desarrollo de distintas landings para mostrar información sobre distintas empresas. Estas páginas se enfocan en mostrar información relevante de manera clara y atractiva, con atención a experiencia de usuario y rendimiento, utilizando tecnologías modernas para garantizar una presentación efectiva y profesional.",
    details: [],
    tags: ["HTML", "Astro", "Tailwind", "Bootstrap", "UX/UI"],
  },
};

export const es = {
  meta: {
    title: "Jesús A. Jiménez | Frontend Developer en San Luis Potosí",
    siteName: "Jesús A. Jiménez | Frontend Developer",
    description:
      "Portafolio profesional y CV personal de Jesús Antulio Jiménez Delgado, frontend developer en San Luis Potosí especializado en Angular, Ionic y Astro.",
    socialDescription:
      "Portafolio profesional y CV personal de Jesús Antulio Jiménez Delgado, frontend developer especializado en Angular, Ionic y Astro.",
    keywords:
      "frontend developer, desarrollador frontend, Angular, Ionic, Astro, JavaScript, TypeScript, San Luis Potosí, portafolio",
    personDescription:
      "Desarrollador frontend especializado en Angular, Ionic y Astro, con base en San Luis Potosí, México.",
    websiteDescription: "Portafolio profesional y CV personal de Jesús Antulio Jiménez Delgado.",
    photoAlt: (name: string) => `Fotografía de ${name}`,
    role: "Frontend Developer",
    location: "San Luis Potosí, México",
    ogLocale: "es_MX",
    inLanguage: "es-MX",
  },
  /** Ids de sección (anclas de la navegación). */
  sections: {
    home: "inicio",
    profile: "perfil",
    projects: "proyectos",
    experience: "experiencia",
    skills: "habilidades",
    contact: "contacto",
  },
  nav: {
    label: "Navegación principal",
    home: "ir al inicio",
    links: {
      profile: "Perfil",
      projects: "Proyectos",
      experience: "Experiencia",
      skills: "Habilidades",
      contact: "Contacto",
    },
    theme: "Cambiar tema",
    menu: "Abrir menú",
    language: "Idioma",
    cta: "Hablemos",
  },
  hero: {
    photoAlt: (name: string) => `Foto de perfil de ${name}`,
    available: "Disponible para proyectos",
    titleLead: "Experto en",
    titleAccent: "desarrollo web",
    phrases: ["Desarrollador Frontend", "Ingeniería en Sistemas Inteligentes", "Angular · Ionic · Astro"],
    lead: "Soy desarrollador Front-End en San Luis Potosí. Construyo aplicaciones dinámicas, responsivas y mantenibles, principalmente con Angular e Ionic.",
    viewProjects: "Ver proyectos",
    downloadCv: "Descargar CV",
    codeLabel: "Resumen del perfil en formato de código",
    codeFile: "perfil.ts",
    codeKeys: { name: "nombre", role: "rol", location: "ubicacion", available: "disponible" },
    metrics,
  },
  about: {
    label: "Perfil",
    title: "Desarrollo FrontEnd con Angular, Ionic y Astro.",
    features,
  },
  projects: {
    label: "Proyectos",
    title: "Proyectos en los que he trabajado.",
    intro:
      "Estos proyectos reflejan mi enfoque en el desarrollo frontend, mostrando desde aplicaciones Angular hasta sitios con Astro, con atención a la experiencia de usuario, rendimiento y detalles técnicos.",
    listLabel: "Proyectos destacados",
    path: "proyectos",
    openDetails: (title: string) => `Abrir detalles de ${title}`,
    gallery: (title: string) => `Galería de ${title}`,
    openGallery: (title: string) => `Abrir galería de ${title}`,
    screenshot: (title: string, n: number) => `${title}: captura ${n}`,
    prevImage: "Imagen anterior",
    nextImage: "Imagen siguiente",
    viewDetails: "Ver detalles",
    modalEyebrow: "Proyecto",
    closeProject: "Cerrar proyecto",
    openImage: "Abrir imagen en grande",
    closeGallery: "Cerrar galería",
    items: projectItems,
  },
  experience: {
    label: "CV",
    title: "Experiencia, educación y evolución técnica.",
    currentRole: "Rol actual",
    timeline,
    secondaryIntro:
      "Además de estos roles técnicos, he sumado experiencia complementaria en atención a clientes, gestión de archivos y procesos administrativos que enriquecen mi perspectiva y habilidades para colaborar en equipos.",
    secondaryOpen: "Ver experiencia complementaria",
    secondaryEyebrow: "Experiencia complementaria",
    secondaryTitle: "Roles que suman contexto.",
    secondaryClose: "Cerrar experiencia complementaria",
    secondary: secondaryExperience,
  },
  skills: {
    label: "Habilidades",
    title: "Herramientas para diseñar, construir y publicar interfaces.",
    items: [
      "HTML",
      "CSS y SCSS",
      "Angular",
      "JavaScript",
      "TypeScript",
      "Ionic",
      "Capacitor",
      "GitLab",
      "GitHub",
      "Astro",
      "Tailwind",
      "UI responsive",
    ],
  },
  contact: {
    label: "Contacto",
    titleLead: "¿Tienes un proyecto en mente?",
    titleAccent: "Hablemos.",
    text: "Disponible para nuevas oportunidades frontend, colaboraciones tecnológicas y proyectos en Angular, Ionic y Astro.",
    downloadCv: "Descargar CV",
  },
  footer: {
    backTop: "Volver arriba",
  },
  whatsapp: {
    label: "Escribir por WhatsApp",
    contactMessage: "Hola, me gustaría ponerme en contacto contigo",
    projectMessage: "Hola, me gustaría agendar una conversación sobre un proyecto",
  },
};

export type Dictionary = typeof es;
