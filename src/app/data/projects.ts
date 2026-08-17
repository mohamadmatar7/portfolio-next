export type Project = {
  slug: string;
  title: {
    en: string;
    nl: string;
  };
  summary: {
    en: string;
    nl: string;
  };
  type: "School" | "Stage" | "Personal" | "Client";
  tech: string[];
  links?: {
    repo?: string;
    live?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "knip-en-knap",
    title: {
      en: "Knip En Knap - Barbershop Website",
      nl: "Knip En Knap - Barbershop Website",
    },
    summary: {
      en: "Production website built for a real barbershop in Ghent, with multilingual content, responsive design, SEO optimization and deployment through Cloudflare.",
      nl: "Productiewebsite gebouwd voor een echte barbershop in Gent, met meertalige content, responsive design, SEO-optimalisatie en deployment via Cloudflare.",
    },
    type: "Client",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "next-intl",
      "SEO",
      "Cloudflare",
      "OpenNext",
      "Google Search Console",
    ],
    links: {
      live: "https://knipenknap.be",
      repo: "https://github.com/mohamadmatar7/knipenknap"
    },
  },
  {
    slug: "roomie-backend",
    title: {
      en: "Roomie - Robot Backend (Local-first Smart Room System)",
      nl: "Roomie - Robot Backend (Local-first slimme kamer)",
    },
    summary: {
      en: "Dockerized Node.js backend for a privacy-focused smart robot system with audio playback, lighting control, sensor monitoring, scheduling and realtime updates via WebSockets.",
      nl: "Dockerized Node.js backend voor een privacygerichte slimme robot met audioweergave, lichtsturing, sensormonitoring, planning en realtime updates via WebSockets.",
    },
    type: "School",
    tech: [
      "Node.js",
      "Express",
      "Docker",
      "Docker Compose",
      "Soketi (WebSockets)",
      "Cloudflare Tunnel",
      "ALSA / PulseAudio",
      "ffmpeg",
      "mpg123",
      "Raspberry Pi",
    ],
    links: {
      repo: "https://github.com/mohamadmatar7/Roomie-Backend",
      live: "https://roomie-zeta.vercel.app",
    },
  },
  {
    slug: "sweetcontrol",
    title: {
      en: "SweetControl - Remote Claw Machine",
      nl: "SweetControl - Op afstand bediende grijpmachine",
    },
    summary: {
      en: "Internet-controlled claw machine with mobile payments, realtime queue management, computer vision and hardware integration.",
      nl: "Via internet bediende grijpmachine met mobiele betalingen, realtime wachtrijbeheer, computer vision en hardware-integratie.",
    },
    type: "School",
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "SQLite",
      "WebSockets (Soketi)",
      "Mollie",
      "Docker",
      "Cloudflare Tunnel",
      "TensorFlow Lite",
      "Raspberry Pi",
      "Arduino",
    ],
    links: {
      repo: "https://github.com/mohamadmatar7/Sweetcontrol",
      live: "https://sweetcontrol.be",
    },
  },
  {
    slug: "nexted",
    title: {
      en: "NextEd - School Management Platform",
      nl: "NextEd - Schoolbeheerplatform",
    },
    summary: {
      en: "Full-featured school management web application for students, teachers and administrators with role-based access and centralized resources.",
      nl: "Uitgebreide webapplicatie voor schoolbeheer voor studenten, leerkrachten en beheerders met rolgebaseerde toegang en gecentraliseerde middelen.",
    },
    type: "School",
    tech: [
      "Laravel",
      "PHP",
      "Blade",
      "MySQL",
      "Auth (roles & permissions)",
      "DDEV",
      "Docker",
    ],
    links: {
      repo: "https://github.com/mohamadmatar7/NextEd",
    },
  },
];