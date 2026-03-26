import type { ServiceItem, ServiceStatus, StatusTone } from "./types";

export function getToneStyles(tone: StatusTone) {
  switch (tone) {
    case "ok":
      return {
        dot: "bg-emerald-400/80",
        bar: "bg-emerald-400",
        chip: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
      };
    case "warn":
      return {
        dot: "bg-amber-400/80",
        bar: "bg-amber-400",
        chip: "border-amber-400/20 bg-amber-400/10 text-amber-200",
      };
    case "down":
      return {
        dot: "bg-rose-400/80",
        bar: "bg-rose-400",
        chip: "border-rose-400/20 bg-rose-400/10 text-rose-200",
      };
  }
}

export function getServiceTone(status: ServiceStatus): StatusTone {
  if (status === "running") return "ok";
  if (status === "degraded") return "warn";
  return "down";
}

export function getOverallTone(services: ServiceItem[], online: boolean): StatusTone {
  if (!online) return "down";

  const allRunning = services.every((service) => service.status === "running");
  const hasDegraded = services.some((service) => service.status === "degraded");

  if (allRunning) return "ok";
  if (hasDegraded) return "warn";
  return "down";
}

export function formatUpdatedAt(value?: string) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
}

export function usageTone(percent: number): StatusTone {
  if (percent >= 90) return "down";
  if (percent >= 70) return "warn";
  return "ok";
}

export function parseUsage(value: string) {
  const match = value.match(/([\d.]+)\s*GB\s*\/\s*([\d.]+)\s*GB/i);

  if (!match) {
    return {
      used: value,
      total: "",
      percent: 0,
      remaining: "",
    };
  }

  const used = Number(match[1]);
  const total = Number(match[2]);
  const percent = total > 0 ? Math.round((used / total) * 100) : 0;
  const remaining = Math.max(total - used, 0);

  return {
    used: `${used.toFixed(1)} GB`,
    total: `${total.toFixed(1)} GB`,
    percent,
    remaining: `${remaining.toFixed(1)} GB`,
  };
}

export const EMPTY_METRICS = {
  cpu: "—",
  ram: "—",
  disk: "—",
  temp: "—",
  uptime: "—",
  updatedAt: "",
  hostname: "",
  platform: "",
};

export const INFRA_CHIPS = [
  "Vercel",
  "Cloudflare Tunnel",
  "Docker",
  "Node/Express",
  "Soketi",
  "Raspberry Pi",
];