"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type Lang = "en" | "nl";

const dict = {
  en: {
    nav: { projects: "Projects", infrastructure: "Infrastructure", about: "About", contact: "Contact" },
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
      locationLine: "Ghent (CET)",
      trustLine: "Fast replies • Clear scope • Clean delivery",
      coreStack: "Core stack",
      deliverTitle: "What I deliver",
      deliverText: "Production-ready apps + interactive systems",
      focusTitle: "Focus",
      focusText: "UX polish • Performance • Clean architecture",
      basedIn: "Based in Ghent",
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
      locationTag: "Ghent (CET)",

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
      hintMob: "Click on nodes for details",
      clear: "Clear",
      dragHint: "Drag to rotate",
      hoverHint: "Hover nodes",
      clickHint: "Click for details",
      Connections: "Connections",
    },
    infra: {
      heading: "Infrastructure (Vercel + Home Lab)",
      subtitle:
        "A portfolio-facing infrastructure view built around a Vercel frontend and a private Raspberry Pi home lab, exposed securely through Cloudflare Tunnel.",

      paragraphs: [
        "The portfolio frontend is hosted on Vercel using Next.js.",
        "Behind it, a Raspberry Pi home lab runs a small containerized stack that includes a core API, a Cloudflare tunnel, realtime messaging, and telemetry collection.",
        "The setup is designed around secure public access, read-only infrastructure endpoints, and clear separation between the presentation layer and the private service layer.",
        "This page is intended to present operational visibility in a clean way and can later be connected to live system metrics such as CPU, memory, disk usage, and container health.",
      ],

      badges: {
        frontend: "Frontend Hosting",
        source: "Data Source",
        services: "Services",
        access: "Public Access",
        security: "Security",
      },

      values: {
        frontend: "Vercel",
        source: "Raspberry Pi Home Lab",
        services: "Docker stack (core-api, cloudflared, soketi)",
        access: "Cloudflare Tunnel",
        security: "Read-only endpoints + rate limiting",
      },

      status: {
        title: "System status",
        online: "Online",
        offline: "Offline",
        latency: "Latency",
        uptime: "Uptime",
        updated: "Last updated",
      },

      ui: {
        stackTitle: "Stack overview",
        setupTitle: "Infrastructure Setup",
        setupHint: "Core infrastructure choices",
        containersTitle: "Running Services",
        architectureTitle: "Architecture Flow",
        whyTitle: "Why this setup?",
        whyText:
          "Vercel provides a fast and reliable frontend layer, while the home lab demonstrates secure service exposure, containerized workloads, telemetry collection, and realtime communication in a practical setup.",
        
        allServicesRunning: "All core services running",
        serviceAttention: "Some services need attention",
        metricsTitle: "Metrics Overview",
        metricsHint: "Live data from the backend with realtime updates via WebSocket.",
        containersHint: "Live container state from Docker on the Raspberry Pi.",
        diagramHint: "A simplified flow of how the frontend, tunnel, API, and realtime services fit together.",

        realtimeConnected: "Realtime connected",
        realtimePolling: "Polling fallback",
        hostTitle: "Host",
        platformTitle: "Platform",

        latencyFast: "Fast",
        latencyDegraded: "Degraded",
        latencySlow: "Slow",
        latencyOffline: "Offline",

        ok: "OK",
        warn: "WARN",
        down: "DOWN",

        running: "Running",
        degraded: "Degraded",
        stopped: "Stopped",

        loading: "Loading",
        loadingValue: "Loading...",

        fetchError: "Failed to load live infrastructure data",

        latencyHint: "Browser → Cloudflare → Home Lab",
        uptimeTitle: "Service uptime",
        uptimeHint: "Time since the last restart",

        cpuTitle: "CPU Usage",
        cpuHint: "Live CPU usage on the Raspberry Pi",

        tempTitle: "Server Temperature",
        tempHint: "Current Raspberry Pi temperature",

        ramTitle: "RAM Usage",
        diskTitle: "Disk Usage",

        used: "Used",
        free: "Free",

        docker: "Docker",
        noServiceData: "No service data available.",
        flow: "Flow",
        from: "From",
        to: "To",

        inspectConnectionTitle: "Inspect live request",
        inspectConnectionDescription:
          "Sends a live request to the API and returns the observed client details captured through the public ingress path.",
        connectionSnapshotTitle: "Observed request details",
        connectionSnapshotHint:
          "Privacy-aware snapshot of how the request is received by the backend.",
        publicIp: "Public IP",
        observedFrom: "Observed source",
        detectedLocation: "Detected location",
        protocol: "Protocol",
        method: "Method",
        requestId: "Request ID",
        serverTime: "Server time",
        userAgent: "User agent",
        edgeTrace: "Edge trace",
        liveResponse: "Live response",
        inspecting: "Inspecting...",
        notAvailable: "Not available",
      },

      flow: {
        browser: "Browser",
        frontend: "Vercel (Next.js)",
        frontendNote: "Frontend UI",

        browserFrontend: "Browser / Vercel",
        tunnel: "Cloudflare Tunnel",
        tunnelNote: "Secure access to the private lab",

        api: "core-api (Node/Express)",
        apiNote: "Read-only infrastructure endpoints",

        websocket: "soketi (WebSocket)",
        websocketNote: "Realtime updates",

        pi: "Raspberry Pi",
        piNote: "System metrics and container status",
      },

      containers: {
        coreApi: {
          name: "core-api (Node / Express)",
          role: "Backend service exposing read-only infrastructure data for the dashboard and related internal integrations.",
          ports: "HTTP :3000 (internal)",
          notes: "Health checks + rate limiting",
        },
        cloudflared: {
          name: "cloudflared (Cloudflare Tunnel)",
          role: "Provides secure external access to selected internal services without opening router ports.",
          ports: "Tunnel → core-api / soketi",
          notes: "Private ingress",
        },
        soketi: {
          name: "soketi (WebSocket)",
          role: "Handles realtime communication for live dashboard updates and service events.",
          ports: "WS :6001 (internal)",
          notes: "Realtime transport",
        },
        telemetry: {
          name: "telemetry-agent",
          role: "Collects system metrics such as CPU, memory, disk usage, and temperature, then forwards them to the API layer.",
          ports: "Local exporter",
          notes: "Metrics collection",
        },
      },
    },
  },

  nl: {
    nav: { projects: "Projecten", infrastructure: "Infrastructuur", about: "Over mij", contact: "Contact" },
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
      locationLine: "Ghent (CET)",
      trustLine: "Snelle reacties • Duidelijke scope • Strakke oplevering",
      coreStack: "Core stack",
      deliverTitle: "Wat ik oplever",
      deliverText: "Productieklare apps + interactieve systemen",
      focusTitle: "Focus",
      focusText: "UX polish • Performance • Schone architectuur",
      basedIn: "Gevestigd in Ghent",
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
      locationTag: "Ghent (CET)",

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
      hintMob: "Klik op nodes voor details",
      clear: "Wissen",
      dragHint: "Sleep om te roteren",
      hoverHint: "Hover nodes",
      clickHint: "Klik voor details",
      Connections: "Connecties",
    },
    infra: {
      heading: "Infrastructuur (Vercel + Home Lab)",
      subtitle:
        "Een infrastructuuroverzicht voor mijn portfolio, opgebouwd rond een Vercel-frontend en een private Raspberry Pi home lab, veilig toegankelijk via Cloudflare Tunnel.",

      paragraphs: [
        "De frontend van dit portfolio is gehost op Vercel met Next.js.",
        "Daarachter draait een Raspberry Pi home lab met een containerized stack, inclusief een core API, Cloudflare tunnel en realtime communicatie.",
        "De opzet is gericht op veilige publieke toegang, read-only endpoints en een duidelijke scheiding tussen de presentatie-laag en de private service-laag.",
        "Deze pagina geeft een overzicht van de infrastructuur en is voorbereid om gekoppeld te worden aan live metrics zoals CPU, geheugen, schijfgebruik en containerstatus.",
      ],

      badges: {
        frontend: "Frontend Hosting",
        source: "Data Bron",
        services: "Services",
        access: "Publieke Toegang",
        security: "Beveiliging",
      },

      values: {
        frontend: "Vercel",
        source: "Raspberry Pi Home Lab",
        services: "Docker stack (core-api, cloudflared, soketi)",
        access: "Cloudflare Tunnel",
        security: "Read-only endpoints + rate limiting",
      },

      status: {
        title: "Systeemstatus",
        online: "Online",
        offline: "Offline",
        latency: "Latency",
        uptime: "Uptime",
        updated: "Laatst bijgewerkt",
      },

      ui: {
        stackTitle: "Stack overzicht",
        setupTitle: "Infrastructuur Setup",
        setupHint: "Kern infrastructuurkeuzes",
        containersTitle: "Draaiende Services",
        architectureTitle: "Architectuur Flow",
        whyTitle: "Waarom deze setup?",
        whyText:
          "Vercel zorgt voor een snelle en stabiele frontend, terwijl het home lab een praktische opzet toont met veilige toegang, containerized services, telemetry en realtime communicatie.",

        
        allServicesRunning: "Alle kernservices zijn actief",
        serviceAttention: "Sommige services vragen aandacht",

        metricsTitle: "Metrics Overzicht",
        metricsHint: "Live data vanuit de backend met realtime updates via WebSocket.",
        containersHint: "Live containerstatus afkomstig van Docker op de Raspberry Pi.",
        diagramHint:
          "Een vereenvoudigde flow van hoe frontend, tunnel, API en realtime services samenwerken.",

        realtimeConnected: "Realtime verbonden",
        realtimePolling: "Polling fallback",
        hostTitle: "Host",
        platformTitle: "Platform",

        latencyFast: "Snel",
        latencyDegraded: "Vertraagd",
        latencySlow: "Traag",
        latencyOffline: "Offline",

        ok: "OK",
        warn: "WAARSCHUWING",
        down: "DOWN",

        running: "Actief",
        degraded: "Beperkt",
        stopped: "Gestopt",

        loading: "Laden",
        loadingValue: "Laden...",

        fetchError: "Kon de infrastructuurdata niet laden",

        latencyHint: "Browser → Cloudflare → Home Lab",
        uptimeTitle: "Service uptime",
        uptimeHint: "Tijd sinds de laatste herstart",

        cpuTitle: "CPU Gebruik",
        cpuHint: "Live CPU belasting op de Raspberry Pi",

        tempTitle: "Server Temperatuur",
        tempHint: "Huidige temperatuur van de Raspberry Pi",

        ramTitle: "RAM Gebruik",
        diskTitle: "Schijfgebruik",

        used: "Gebruikt",
        free: "Vrij",

        docker: "Docker",
        noServiceData: "Geen service data beschikbaar.",
        flow: "Flow",
        from: "Van",
        to: "Naar",

        inspectConnectionTitle: "Live request inspecteren",
        inspectConnectionDescription:
          "Verstuurt een live request naar de API en toont de waargenomen clientgegevens via de publieke toegang.",
        connectionSnapshotTitle: "Waargenomen requestgegevens",
        connectionSnapshotHint:
          "Privacyvriendelijke weergave van hoe het request door de backend wordt ontvangen.",
        publicIp: "Publiek IP-adres",
        observedFrom: "Bron van detectie",
        detectedLocation: "Gedetecteerde locatie",
        protocol: "Protocol",
        method: "Methode",
        requestId: "Request-ID",
        serverTime: "Servertijd",
        userAgent: "User agent",
        edgeTrace: "Edge trace",
        liveResponse: "Live response",
        inspecting: "Bezig met inspecteren...",
        notAvailable: "Niet beschikbaar",
      },

      flow: {
        browser: "Browser",
        frontend: "Vercel (Next.js)",
        frontendNote: "Frontend UI",

        browserFrontend: "Browser / Vercel",
        tunnel: "Cloudflare Tunnel",
        tunnelNote: "Veilige toegang tot de private omgeving",

        api: "core-api (Node/Express)",
        apiNote: "Read-only infrastructuur endpoints",

        websocket: "soketi (WebSocket)",
        websocketNote: "Realtime updates",

        pi: "Raspberry Pi",
        piNote: "Systeemmetrics en containerstatus",
      },

      containers: {
        coreApi: {
          name: "core-api (Node / Express)",
          role: "Backend service die read-only infrastructuurdata beschikbaar maakt voor de dashboardlaag en interne integraties.",
          ports: "HTTP :3000 (intern)",
          notes: "Health checks + rate limiting",
        },
        cloudflared: {
          name: "cloudflared (Cloudflare Tunnel)",
          role: "Zorgt voor veilige externe toegang tot interne services zonder open poorten op de router.",
          ports: "Tunnel → core-api / soketi",
          notes: "Private ingress",
        },
        soketi: {
          name: "soketi (WebSocket)",
          role: "Verwerkt realtime communicatie voor live updates en events in de dashboard.",
          ports: "WS :6001 (intern)",
          notes: "Realtime transport",
        },
        telemetry: {
          name: "telemetry-agent",
          role: "Verzamelt systeemmetrics zoals CPU, geheugen, schijfgebruik en temperatuur en stuurt deze door naar de API.",
          ports: "Local exporter",
          notes: "Metrics collection",
        },
      },
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
