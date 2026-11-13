import type { Dictionary } from "./es";

export const en: Dictionary = {
  meta: {
    title: "Jesús A. Jiménez | Frontend Developer in San Luis Potosí",
    siteName: "Jesús A. Jiménez | Frontend Developer",
    description:
      "Professional portfolio and personal résumé of Jesús Antulio Jiménez Delgado, a frontend developer in San Luis Potosí, Mexico, specialized in Angular, Ionic and Astro.",
    socialDescription:
      "Professional portfolio and personal résumé of Jesús Antulio Jiménez Delgado, a frontend developer specialized in Angular, Ionic and Astro.",
    keywords:
      "frontend developer, web developer, Angular, Ionic, Astro, JavaScript, TypeScript, San Luis Potosí, Mexico, portfolio",
    personDescription:
      "Frontend developer specialized in Angular, Ionic and Astro, based in San Luis Potosí, Mexico.",
    websiteDescription: "Professional portfolio and personal résumé of Jesús Antulio Jiménez Delgado.",
    photoAlt: (name) => `Photo of ${name}`,
    role: "Frontend Developer",
    location: "San Luis Potosí, Mexico",
    ogLocale: "en_US",
    inLanguage: "en",
  },
  sections: {
    home: "home",
    profile: "profile",
    projects: "projects",
    experience: "experience",
    skills: "skills",
    contact: "contact",
  },
  nav: {
    label: "Main navigation",
    home: "go to top",
    links: {
      profile: "Profile",
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      contact: "Contact",
    },
    theme: "Toggle theme",
    menu: "Open menu",
    language: "Language",
    cta: "Let's talk",
  },
  hero: {
    photoAlt: (name) => `Profile photo of ${name}`,
    available: "Available for projects",
    titleLead: "Expert in",
    titleAccent: "web development",
    phrases: ["Frontend Developer", "Intelligent Systems Engineering", "Angular · Ionic · Astro"],
    lead: "I'm a front-end developer based in San Luis Potosí, Mexico. I build dynamic, responsive and maintainable applications, mainly with Angular and Ionic.",
    viewProjects: "View projects",
    downloadCv: "Download résumé",
    codeLabel: "Profile summary formatted as code",
    codeFile: "profile.ts",
    codeKeys: { name: "name", role: "role", location: "location", available: "available" },
    metrics: [
      { target: 2, suffix: "+", label: "Years building frontend" },
      { target: 3, label: "Technical roles" },
      { target: 8, label: "Core technologies" },
    ],
  },
  about: {
    label: "Profile",
    title: "Frontend development with Angular, Ionic and Astro.",
    features: [
      {
        icon: "layout-dashboard",
        title: "Angular applications",
        text: "Dynamic interfaces with reusable components, reactive forms and clear flows.",
      },
      {
        icon: "plug-zap",
        title: "API integration",
        text: "Service connections, data handling and interface states ready for real-world scenarios.",
      },
      {
        icon: "smartphone",
        title: "Web and mobile",
        text: "Cross-platform experiences with Ionic and Capacitor that keep a consistent look and feel.",
      },
      {
        icon: "gauge",
        title: "Web performance",
        text: "Landing pages and sites built with Astro: fast to load, clear and SEO-friendly.",
      },
    ],
  },
  projects: {
    label: "Projects",
    title: "Projects I've worked on.",
    intro:
      "These projects reflect my approach to frontend development, from Angular applications to Astro sites, with attention to user experience, performance and technical detail.",
    listLabel: "Featured projects",
    path: "projects",
    openDetails: (title) => `Open details for ${title}`,
    gallery: (title) => `${title} gallery`,
    openGallery: (title) => `Open the ${title} gallery`,
    screenshot: (title, n) => `${title}: screenshot ${n}`,
    prevImage: "Previous image",
    nextImage: "Next image",
    viewDetails: "View details",
    modalEyebrow: "Project",
    closeProject: "Close project",
    openImage: "Open full-size image",
    closeGallery: "Close gallery",
    items: {
      crm_4sales: {
        eyebrow: "Project 01",
        title: "4Sales: CRM and microsites",
        description:
          "Project built for construction companies to manage and advertise real estate developments. It includes a CRM for client management and a microsite system to showcase properties, with a focus on user experience and performance.",
        alts: [
          "CRM interface for client management in the real estate sector, built with Angular and TypeScript",
          "Project and macro-project management screen in a CRM for construction companies, focused on user experience and performance",
          "Project administration screen, where floor plans are managed to link floors with units",
          "Floor plan editing screen for drawing the layout of floors and units in a CRM for construction companies, focused on user experience and performance",
          "Client management screen in a CRM for construction companies, focused on user experience",
        ],
        details: [
          ["Role", "Frontend developer focused on component architecture and visual integration."],
          ["Contribution", "Reusable modules, interface state handling and service integration."],
          ["Outcome", "A more consistent UI foundation that speeds up building new internal screens."],
        ],
        tags: ["Angular", "TypeScript", "Bootstrap", "APIs"],
      },
      crm_inmoapp: {
        eyebrow: "Project 02",
        title: "Inmoapp",
        description:
          "CRM for real estate agencies, aimed at digitizing their inventory and making it easier to share a property's information. The project includes a microsite system to showcase properties, with a focus on user experience and performance, and a hybrid mobile interface for access from mobile devices.",
        details: [
          ["Role", "Building and adapting the CRM frontend and laying out new templates for the microsites."],
          ["Contribution", "New microsite templates, reusable components and a restructuring of the legacy code."],
          [
            "Outcome",
            "A more modern and consistent interface, with a stronger foundation for future features and user experience improvements.",
          ],
        ],
        tags: ["Angular", "TypeScript", "UX/UI", "AI"],
      },
      recepcionistapp: {
        eyebrow: "Project 03",
        title: "Recepcionistapp",
        description:
          "Project to digitize appointment scheduling across different fields, as well as record management and case follow-up. It includes a microsite system to display relevant information, with a focus on user experience and performance, and a hybrid mobile interface for access from mobile devices.",
        details: [
          [
            "Role",
            "Setting up the initial project and developing the hybrid mobile app with Ionic, including interface and user experience design.",
          ],
          [
            "Contribution",
            "Development of the hybrid mobile application, focused on user experience and performance, using Ionic and Angular to create an intuitive and efficient interface.",
          ],
          [
            "Outcome",
            "A working mobile app for managing appointments and records, with an optimized user experience and solid performance, making it easier to digitize processes in different fields.",
          ],
        ],
        tags: ["Angular", "Ionic", "Tailwind", "UX/UI"],
      },
      landings: {
        eyebrow: "Project 04",
        title: "Informational websites",
        description:
          "Development of several landing pages to present information about different companies. These pages focus on presenting relevant information in a clear and attractive way, with a focus on user experience and performance, using modern technologies to ensure an effective and professional presentation.",
        details: [],
        tags: ["HTML", "Astro", "Tailwind", "Bootstrap", "UX/UI"],
      },
    },
  },
  experience: {
    label: "Résumé",
    title: "Experience, education and technical growth.",
    currentRole: "Current role",
    timeline: [
      {
        period: "2024 - Present",
        title: "Frontend Developer | FoxCode",
        current: true,
        description:
          "Web applications with Angular, dynamic interfaces, reusable components, modular architecture, version control, apps with Ionic and landing pages with Astro.",
      },
      {
        period: "Aug 2022 - Jul 2023",
        title: "Student Assistant | Facultad de Ingeniería, UASLP",
        description:
          "Preventive and corrective equipment maintenance, installation and updating of specialized software, and technical support for civil engineering students.",
      },
      {
        period: "Jul 2022 - May 2023",
        title: "Intern | Coordinación de Tecnología Educativa, UASLP",
        description:
          "Educational video games with JavaScript and jQuery, taking part in concept, graphic design and functional development.",
      },
      {
        period: "Bachelor's degree | 2018 - 2023",
        title: "Intelligent Systems Engineering | UASLP",
        description: "Professional training at the Facultad de Ingeniería, UASLP, in San Luis Potosí, Mexico.",
      },
    ],
    secondaryIntro:
      "Beyond these technical roles, I have gained complementary experience in customer service, records management and administrative processes that broadens my perspective and my ability to collaborate in teams.",
    secondaryOpen: "View complementary experience",
    secondaryEyebrow: "Complementary experience",
    secondaryTitle: "Roles that add context.",
    secondaryClose: "Close complementary experience",
    secondary: [
      {
        role: "Insurance appraiser",
        title: "Assisting policyholders at the repair shop",
        description:
          "First point of contact for customers bringing in their vehicle for damage appraisal, follow-up of the repair process and final delivery of the vehicle.",
        tags: ["Inventory", "Logs", "Quotes"],
      },
      {
        role: "Archivist",
        title: "Document classification and filing",
        description:
          "Organizing physical documents, classifying, digitizing and managing files to make them easy to consult and safeguard, as well as verifying compliance with anti-money laundering regulations.",
        tags: ["Collaboration", "Organization"],
      },
      {
        role: "Staff",
        title: "Event coordination and support",
        description:
          "Support at the ANUIES 2023 event, helping with logistics, attendee assistance and activity coordination to keep the event running smoothly.",
        tags: ["Collaboration", "Organization", "Logistics"],
      },
    ],
  },
  skills: {
    label: "Skills",
    title: "Tools to design, build and ship interfaces.",
    items: [
      "HTML",
      "CSS & SCSS",
      "Angular",
      "JavaScript",
      "TypeScript",
      "Ionic",
      "Capacitor",
      "GitLab",
      "GitHub",
      "Astro",
      "Tailwind",
      "Responsive UI",
    ],
  },
  contact: {
    label: "Contact",
    titleLead: "Have a project in mind?",
    titleAccent: "Let's talk.",
    text: "Available for new frontend opportunities, tech collaborations and projects with Angular, Ionic and Astro.",
    downloadCv: "Download résumé",
  },
  footer: {
    backTop: "Back to top",
  },
  whatsapp: {
    label: "Message me on WhatsApp",
    contactMessage: "Hi, I'd like to get in touch with you",
    projectMessage: "Hi, I'd like to schedule a conversation about a project",
  },
};
