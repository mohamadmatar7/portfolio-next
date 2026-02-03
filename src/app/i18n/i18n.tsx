"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type Lang = "en" | "nl";

const dict = {
  en: {
    nav: { projects: "Projects", about: "About", contact: "Contact" },
    ui: {
      switchToNl: "Switch to Dutch (NL)",
      switchToEn: "Switch to English (EN)",
    },
    home: {
      role: "Interactive & Full-Stack Developer",
      title: "I build modern web apps, interactive systems and smart prototypes.",
      stack: "Next.js • TypeScript • Node.js • Laravel • Raspberry Pi • Docker",
      ctaProjects: "View projects",
      ctaContact: "Contact",
      availability: "Available for freelance",
      locationLine: "Brussels (CET)",
      trustLine: "Fast replies • Clear scope • Clean delivery",
      coreStack: "Core stack",
      deliverTitle: "What I deliver",
      deliverText: "Production-ready apps + interactive systems",
      focusTitle: "Focus",
      focusText: "UX polish • Performance • Clean architecture",
      basedIn: "Based in Brussels",
      timezone: "CET",
      socialsLabel: "Social",
    },
    about: {
      heading: "About",
      tagFullstack: "Full-stack",
      tagInteractive: "Interactive systems",
      tagHardware: "Hardware prototyping",
      intro:
        "I am an Interactive & Full-Stack Developer. I combine web development with creative technology and hardware (Raspberry Pi / Arduino) to build interactive systems and real-world applications.",
      cards: {
        frontend: {
          title: "Frontend",
          items: [
            "React / Next.js",
            "TypeScript / JavaScript",
            "HTML / CSS / Tailwind",
            "UI & component architecture",
            "Realtime interfaces (WebSockets)",
          ],
        },
        backend: {
          title: "Backend",
          items: [
            "Node.js / Express",
            "Laravel / PHP",
            "REST APIs & authentication",
            "SQLite / MySQL",
            "Docker & Docker Compose",
          ],
        },
        hardware: {
          title: "Hardware & Creative Tech",
          items: [
            "Raspberry Pi / Arduino",
            "GPIO / I2C / sensors",
            "Computer vision (TensorFlow Lite)",
            "Audio & media pipelines",
            "Physical interaction systems",
          ],
        },
      },
    },
    projectsPage: {
      heading: "Projects",
      subtitle: "Case studies (school & internship)",
      countLabel: "projects",
      caseStudiesTag: "Case studies",
      repo: "GitHub",
      live: "Live",
    },
    contact: {
      heading: "Contact",
      subtitle: "Have a project, idea, or collaboration in mind? Send a message.",
      availabilityTag: "Open for freelance",
      locationTag: "Brussels (CET)",

      formTitle: "Send a message",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent! I’ll get back to you soon.",
      error: "Something went wrong. Please try again or email me directly.",

      directTitle: "Direct",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      copy: "Copy",
      copied: "Copied!",
      copyHint: "Click copy to copy email",
      emailCta: "Mail",
    },
    arch: {
      heading: "System Architecture",
      hint: "Drag to rotate • Hover nodes • Click for details",
      clear: "Clear",
      dragHint: "Drag to rotate",
      hoverHint: "Hover nodes",
      clickHint: "Click for details",
    },
  },

  nl: {
    nav: { projects: "Projecten", about: "Over mij", contact: "Contact" },
    ui: {
      switchToNl: "Overschakelen naar Nederlands (NL)",
      switchToEn: "Overschakelen naar Engels (EN)",
    },
    home: {
      role: "Interactive & Full-Stack Developer",
      title: "Ik bouw moderne web apps, interactieve systemen en slimme prototypes.",
      stack: "Next.js • TypeScript • Node.js • Laravel • Raspberry Pi • Docker",
      ctaProjects: "Bekijk projecten",
      ctaContact: "Contact",
      availability: "Beschikbaar voor freelance",
      locationLine: "Brussel (CET)",
      trustLine: "Snelle reacties • Duidelijke scope • Strakke oplevering",
      coreStack: "Core stack",
      deliverTitle: "Wat ik oplever",
      deliverText: "Productieklare apps + interactieve systemen",
      focusTitle: "Focus",
      focusText: "UX polish • Performance • Schone architectuur",
      basedIn: "Gevestigd in Brussel",
      timezone: "CET",
      socialsLabel: "Social",
    },
    about: {
      heading: "Over mij",
      tagFullstack: "Full-stack",
      tagInteractive: "Interactieve systemen",
      tagHardware: "Hardware prototyping",
      intro:
        "Ik ben een Interactive & Full-Stack Developer. Ik combineer web development met creatieve technologie en hardware (Raspberry Pi / Arduino) om interactieve systemen en real-world toepassingen te bouwen.",
      cards: {
        frontend: {
          title: "Frontend",
          items: [
            "React / Next.js",
            "TypeScript / JavaScript",
            "HTML / CSS / Tailwind",
            "UI & component architecture",
            "Realtime interfaces (WebSockets)",
          ],
        },
        backend: {
          title: "Backend",
          items: [
            "Node.js / Express",
            "Laravel / PHP",
            "REST API’s & authenticatie",
            "SQLite / MySQL",
            "Docker & Docker Compose",
          ],
        },
        hardware: {
          title: "Hardware & Creative Tech",
          items: [
            "Raspberry Pi / Arduino",
            "GPIO / I2C / sensoren",
            "Computer vision (TensorFlow Lite)",
            "Audio & media pipelines",
            "Fysieke interactiesystemen",
          ],
        },
      },
    },
    projectsPage: {
      heading: "Projecten",
      subtitle: "Case studies (school & stage)",
      countLabel: "projecten",
      caseStudiesTag: "Case studies",
      repo: "GitHub",
      live: "Live",
    },
    contact: {
      heading: "Contact",
      subtitle: "Heb je een project, idee of samenwerking? Stuur een bericht.",
      availabilityTag: "Beschikbaar voor freelance",
      locationTag: "Brussel (CET)",

      formTitle: "Stuur een bericht",
      name: "Naam",
      email: "E-mail",
      subject: "Onderwerp",
      message: "Bericht",
      send: "Verstuur",
      sending: "Bezig...",
      success: "Bericht verzonden! Ik reageer zo snel mogelijk.",
      error: "Er ging iets mis. Probeer opnieuw of mail me rechtstreeks.",

      directTitle: "Direct",
      emailLabel: "E-mail",
      linkedinLabel: "LinkedIn",
      copy: "Kopieer",
      copied: "Gekopieerd!",
      copyHint: "Klik op kopieer om het e-mail te kopiëren",
      emailCta: "Mail",
    },
    arch: {
      heading: "Systeemarchitectuur",
      hint: "Sleep om te roteren • Hover nodes • Klik voor details",
      clear: "Wissen",
      dragHint: "Sleep om te roteren",
      hoverHint: "Hover nodes",
      clickHint: "Klik voor details",
    },
  },
} as const;

type Dict = typeof dict;

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict[Lang];
} | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("lang");
    return saved === "nl" || saved === "en" ? saved : "en";
  });

  const value = useMemo(() => {
    return {
      lang,
      setLang: (l: Lang) => {
        localStorage.setItem("lang", l);
        setLang(l);
      },
      t: dict[lang],
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
