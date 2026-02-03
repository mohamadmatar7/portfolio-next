export type ArchNode = {
  id: string;
  label: string;
  group: "client" | "cloud" | "core" | "vision" | "hardware" | "db" | "server";
  position: [number, number, number];
  details?: {
    role: {
      en: string;
      nl: string;
    };
    description: {
      en: string;
      nl: string;
    };
    tech: string[];
  };
};

export type ArchEdge = {
  from: string;
  to: string;
  label?: string;
};

export type Architecture = {
  id: "roomie" | "sweetcontrol" | "nexted";
  title: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
};

export const architectures: Record<string, Architecture> = {
  roomie: {
    id: "roomie",
    title: "Roomie",
    nodes: [
      {
        id: "parent-ui",
        label: "Parent UI (Web)",
        group: "client",
        position: [-3.8, 0.6, 0],
        details: {
          role: { en: "Parent-facing interface", nl: "Interface voor ouders" },
          description: {
            en: "Allows parents to control routines, play stories, view sensor data and monitor system status in real time.",
            nl: "Laat ouders routines beheren, verhaaltjes afspelen, sensorgegevens bekijken en de systeemstatus in realtime volgen.",
          },
          tech: ["Next.js", "React", "WebSockets"],
        },
      },
      {
        id: "cloudflare",
        label: "Cloudflare Tunnel",
        group: "cloud",
        position: [-1.8, 0.6, 0],
        details: {
          role: { en: "Secure remote access layer", nl: "Beveiligde externe toegang" },
          description: {
            en: "Provides encrypted remote access to the local Roomie system without exposing ports or requiring a public IP.",
            nl: "Biedt versleutelde externe toegang tot het lokale Roomie-systeem zonder poorten bloot te stellen of een publiek IP te vereisen.",
          },
          tech: ["Cloudflare Tunnel"],
        },
      },
      {
        id: "core",
        label: "Roomie Core (Node/Express)",
        group: "core",
        position: [0.3, 0.6, 0],
        details: {
          role: { en: "Main backend service", nl: "Hoofd backend service" },
          description: {
            en: "Handles REST APIs, audio playback, scheduling, sensor integration and publishes system events.",
            nl: "Beheert REST-API’s, audioweergave, planning, sensorintegratie en publiceert systeemevents.",
          },
          tech: ["Node.js", "Express", "Docker"],
        },
      },
      {
        id: "soketi",
        label: "Soketi (WebSockets)",
        group: "core",
        position: [0.3, -0.7, 0],
        details: {
          role: { en: "Realtime communication", nl: "Realtime communicatie" },
          description: {
            en: "Provides realtime updates for system state, sensor changes and user interactions.",
            nl: "Verzorgt realtime updates van systeemstatus, sensorveranderingen en gebruikersinteracties.",
          },
          tech: ["Soketi", "WebSockets"],
        },
      },
      {
        id: "storage",
        label: "Local Storage",
        group: "db",
        position: [0.3, -1.6, 0],
        details: {
          role: { en: "Persistent local data", nl: "Persistente lokale data" },
          description: {
            en: "Stores audio files, configuration, logs and system metadata locally on the device.",
            nl: "Slaat audiobestanden, configuratie, logs en systeemmetadata lokaal op het apparaat op.",
          },
          tech: ["Filesystem"],
        },
      },
      {
        id: "media",
        label: "Audio (ffmpeg / mpg123)",
        group: "hardware",
        position: [2.9, 0.5, 0],
        details: {
          role: { en: "Audio playback subsystem", nl: "Audio-afspeelsubsysteem" },
          description: {
            en: "Plays bedtime stories, sound effects and text-to-speech audio through connected speakers.",
            nl: "Speelt verhaaltjes, geluidseffecten en text-to-speech audio af via aangesloten luidsprekers.",
          },
          tech: ["ALSA", "ffmpeg", "mpg123"],
        },
      },
      {
        id: "intercom",
        label: "Intercom (USB Mic + Speaker)",
        group: "hardware",
        position: [3.9, 1.2, 0],
        details: {
          role: { en: "Two-way audio communication", nl: "Tweerichtings-audiocommunicatie" },
          description: {
            en: "Intercom feature using a USB microphone and speaker, accessible even outside the home network.",
            nl: "Intercomfunctie met USB-microfoon en luidspreker, toegankelijk zelfs buiten het thuisnetwerk.",
          },
          tech: ["USB Microphone", "Audio routing"],
        },
      },
      {
        id: "sensors",
        label: "Sensors (Temp / Light)",
        group: "hardware",
        position: [2.9, -0.5, 0],
        details: {
          role: { en: "Environmental monitoring", nl: "Omgevingsmonitoring" },
          description: {
            en: "Continuously monitors temperature, humidity and light levels inside the room.",
            nl: "Monitort continu temperatuur, luchtvochtigheid en lichtniveau in de kamer.",
          },
          tech: ["I2C", "GPIO"],
        },
      },
      {
        id: "camera",
        label: "Camera",
        group: "hardware",
        position: [2.9, -1.5, 0],
        details: {
          role: { en: "Video input", nl: "Video-invoer" },
          description: {
            en: "Camera access for monitoring, depending on hardware availability and configuration.",
            nl: "Cameratoegang voor monitoring, afhankelijk van hardware en configuratie.",
          },
          tech: ["Raspberry Pi Camera Module"],
        },
      },
      {
        id: "gcp-vm",
        label: "Google Cloud VM (Intercom)",
        group: "cloud",
        position: [0.9, 1.9, 0],
        details: {
          role: { en: "Intercom relay", nl: "Intercom-relay" },
          description: {
            en: "Used only for the intercom feature so parents can talk from anywhere outside the home network.",
            nl: "Wordt uitsluitend gebruikt voor de intercom zodat ouders van overal met hun kinderen kunnen praten.",
          },
          tech: ["Google Cloud VM", "Linux"],
        },
      },
    ],
    edges: [
      { from: "parent-ui", to: "cloudflare", label: "HTTPS" },
      { from: "cloudflare", to: "core", label: "API" },
      { from: "cloudflare", to: "soketi", label: "WS" },
      { from: "soketi", to: "parent-ui", label: "Realtime" },
      { from: "core", to: "media", label: "Playback" },
      { from: "core", to: "sensors", label: "I/O" },
      { from: "core", to: "camera", label: "Stream" },
      { from: "core", to: "storage", label: "Files / Config" },
      { from: "parent-ui", to: "gcp-vm", label: "Intercom" },
      { from: "gcp-vm", to: "intercom", label: "2-way audio" },
    ],
  },

  sweetcontrol: {
    id: "sweetcontrol",
    title: "SweetControl",
    nodes: [
      {
        id: "player",
        label: "Player (Mobile Web)",
        group: "client",
        position: [-2.8, 0.8, 0],
        details: {
          role: { en: "Player interface", nl: "Spelersinterface" },
          description: {
            en: "Mobile-first web interface for payments, queue management and real-time claw control.",
            nl: "Mobile-first webinterface voor betalingen, wachtrijbeheer en realtime besturing van de grijpmachine.",
          },
          tech: ["Next.js", "React"],
        },
      },
      {
        id: "cloudflare",
        label: "Cloudflare Tunnel",
        group: "cloud",
        position: [-0.8, 0.8, 0],
        details: {
          role: { en: "Secure access layer", nl: "Beveiligde toegang" },
          description: {
            en: "Provides secure public access to the local arcade system without port forwarding.",
            nl: "Biedt veilige publieke toegang tot het lokale arcadesysteem zonder port forwarding.",
          },
          tech: ["Cloudflare Tunnel"],
        },
      },
      {
        id: "core-pi",
        label: "Core Pi (API / Game Logic)",
        group: "core",
        position: [1.0, 0.8, 0],
        details: {
          role: { en: "Game server & API", nl: "Game server en API" },
          description: {
            en: "Manages game sessions, payments, queue logic and hardware control.",
            nl: "Beheert gamesessies, betalingen, wachtrijlogica en hardware-aansturing.",
          },
          tech: ["Node.js", "Express", "Docker"],
        },
      },
      {
        id: "soketi",
        label: "Soketi (WebSockets)",
        group: "core",
        position: [1.0, -0.2, 0],
        details: {
          role: { en: "Realtime updates", nl: "Realtime updates" },
          description: {
            en: "Synchronizes game state, queue updates and live feedback across all clients.",
            nl: "Synchroniseert gamestatus, wachtrij-updates en live feedback over alle clients.",
          },
          tech: ["Soketi", "WebSockets"],
        },
      },
      {
        id: "sqlite",
        label: "SQLite",
        group: "db",
        position: [1.0, -1.2, 0],
        details: {
          role: { en: "Persistent storage", nl: "Persistente opslag" },
          description: {
            en: "Stores sessions, payments, queue data and game results.",
            nl: "Slaat sessies, betalingen, wachtrijgegevens en spelresultaten op.",
          },
          tech: ["SQLite"],
        },
      },
      {
        id: "vision-pi",
        label: "Vision Pi (TensorFlow Lite)",
        group: "vision",
        position: [3.0, 0.8, 0],
        details: {
          role: { en: "Computer vision system", nl: "Computer vision-systeem" },
          description: {
            en: "Detects and classifies objects captured by the claw machine camera.",
            nl: "Detecteert en classificeert objecten die door de camera van de grijpmachine worden vastgelegd.",
          },
          tech: ["Python", "TensorFlow Lite"],
        },
      },
      {
        id: "gpio",
        label: "GPIO / ULN2803A",
        group: "hardware",
        position: [3.0, -0.2, 0],
        details: {
          role: { en: "Direct hardware control", nl: "Directe hardware-aansturing" },
          description: {
            en: "Controls claw machine inputs such as movement and grab actions.",
            nl: "Stuurt de grijpmachine aan zoals beweging en grijpacties.",
          },
          tech: ["GPIO", "ULN2803A"],
        },
      },
      {
        id: "arduino",
        label: "Arduino (Tray Servos)",
        group: "hardware",
        position: [3.0, -1.2, 0],
        details: {
          role: { en: "Servo controller", nl: "Servo-controller" },
          description: {
            en: "Controls the tray dumping mechanism using mirrored servo motors.",
            nl: "Stuurt het kantelmechanisme van de tray aan met gespiegelde servomotoren.",
          },
          tech: ["Arduino", "Servo Motors"],
        },
      },
    ],
    edges: [
      { from: "player", to: "cloudflare", label: "HTTPS" },
      { from: "cloudflare", to: "core-pi", label: "API" },
      { from: "cloudflare", to: "soketi", label: "WS" },
      { from: "core-pi", to: "sqlite", label: "Data" },
      { from: "core-pi", to: "vision-pi", label: "Frames / Events" },
      { from: "vision-pi", to: "core-pi", label: "Detections" },
      { from: "core-pi", to: "gpio", label: "Controls" },
      { from: "core-pi", to: "arduino", label: "Servo Cmds" },
      { from: "soketi", to: "player", label: "Realtime" },
    ],
  },

  nexted: {
    id: "nexted",
    title: "NextEd",
    nodes: [
      {
        id: "web-client",
        label: "Web Client (Browser)",
        group: "client",
        position: [-2.9, 0.6, 0],
        details: {
          role: { en: "User interface", nl: "Gebruikersinterface" },
          description: {
            en: "Frontend pages for students, teachers, instructors, principals and admins.",
            nl: "Frontendpagina’s voor studenten, leerkrachten, instructors, directie en admins.",
          },
          tech: ["Blade", "HTML", "CSS"],
        },
      },
      {
        id: "laravel-app",
        label: "Laravel App (Server)",
        group: "server",
        position: [-0.8, 0.6, 0],
        details: {
          role: { en: "Main application server", nl: "Hoofd applicatieserver" },
          description: {
            en: "Handles routing, business logic, validation, authentication and authorization.",
            nl: "Beheert routing, business logica, validatie, authenticatie en autorisatie.",
          },
          tech: ["Laravel", "PHP"],
        },
      },
      {
        id: "authz",
        label: "Auth & Roles",
        group: "core",
        position: [-0.8, -0.6, 0],
        details: {
          role: { en: "Role-based access control", nl: "Rolgebaseerde toegangscontrole" },
          description: {
            en: "Permission layer based on roles: Admin, Principal, Instructor, Teacher, Student.",
            nl: "Permissielaag op basis van rollen: Admin, Principal, Instructor, Teacher, Student.",
          },
          tech: ["Laravel Auth", "Middleware", "Policies"],
        },
      },
      {
        id: "db",
        label: "Database",
        group: "db",
        position: [1.2, 0.6, 0],
        details: {
          role: { en: "Persistent data storage", nl: "Persistente data-opslag" },
          description: {
            en: "Stores users, classes, courses, lessons and related school resources.",
            nl: "Slaat gebruikers, klassen, vakken, lessen en gerelateerde schoolresources op.",
          },
          tech: ["MySQL"],
        },
      },
      {
        id: "resources",
        label: "School Resources",
        group: "core",
        position: [1.2, -0.6, 0],
        details: {
          role: { en: "Domain modules", nl: "Domeinmodules" },
          description: {
            en: "Core modules such as students, teachers, courses, lessons and enrollments.",
            nl: "Kernmodules zoals studenten, leerkrachten, vakken, lessen en inschrijvingen.",
          },
          tech: ["Eloquent", "Controllers", "Blade Views"],
        },
      },
    ],
    edges: [
      { from: "web-client", to: "laravel-app", label: "HTTP" },
      { from: "laravel-app", to: "authz", label: "AuthZ" },
      { from: "laravel-app", to: "db", label: "SQL" },
      { from: "laravel-app", to: "resources", label: "Modules" },
      { from: "resources", to: "db", label: "CRUD" },
      { from: "authz", to: "resources", label: "Access" },
    ],
  },
};
