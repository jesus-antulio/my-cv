const phone = "524448288334";

export const site = {
  url: "https://jesus-antulio.com.mx",
  title: "Jesús A. Jiménez | Frontend Developer en San Luis Potosí",
  siteName: "Jesús A. Jiménez | Frontend Developer",
  description:
    "Portafolio profesional y CV personal de Jesús Antulio Jiménez Delgado, frontend developer en San Luis Potosí especializado en Angular, Ionic y Astro.",
  socialDescription:
    "Portafolio profesional y CV personal de Jesús Antulio Jiménez Delgado, frontend developer especializado en Angular, Ionic y Astro.",
  keywords:
    "frontend developer, desarrollador frontend, Angular, Ionic, Astro, JavaScript, TypeScript, San Luis Potosí, portafolio",
  fullName: "Jesús Antulio Jiménez Delgado",
  shortName: "Jesús A. Jiménez",
  initials: "JA",
  role: "Frontend Developer",
  email: "jesus_antulio@outlook.com",
  phoneDisplay: "+52 444 828 8334",
  phoneHref: "tel:+524448288334",
  location: "San Luis Potosí, México",
  mapsUrl: "https://maps.google.com/?q=San%20Luis%20Potos%C3%AD%2C%20M%C3%A9xico",
  profileImage: "/assets/img/me.jpg",
  cvPath: "/assets/docs/CV_Jesus_Jimenez.pdf",
  whatsappContactUrl: `https://wa.me/${phone}?text=Hola%2C%20me%20gustar%C3%ADa%20ponerme%20en%20contacto%20contigo`,
  whatsappProjectUrl: `https://wa.me/${phone}?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20conversaci%C3%B3n%20sobre%20un%20proyecto`,
  themeColor: { dark: "#0a100e", light: "#f4f7f5" },
} as const;

export const navLinks = [
  { href: "#perfil", label: "Perfil" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#contacto", label: "Contacto" },
] as const;
