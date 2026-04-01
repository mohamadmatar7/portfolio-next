import { useI18n } from "@/i18n/i18n";

export type StatusTone = "ok" | "warn" | "down";
export type ServiceStatus = "running" | "degraded" | "stopped";

export type ServiceItem = {
  name: string;
  role: string;
  status: ServiceStatus;
  ports?: string;
  notes?: string;
};

export type FlowItem = {
  from: string;
  to: string;
  note?: string;
};

export type Metrics = {
  cpu: string;
  ram: string;
  disk: string;
  temp: string;
  uptime: string;
  hostname?: string;
  platform?: string;
  updatedAt: string;
};

export type InfraResponse = {
  status: "online" | "offline";
  metrics: Metrics;
  containers: ServiceItem[];
};

export type StatusLabels = {
  ok: string;
  warn: string;
  down: string;
};

export type ServiceStatusLabels = {
  running: string;
  degraded: string;
  stopped: string;
};

export type ConnectionInfo = {
  ipMasked: string;
  ipSource: string;
  country: string;
  region: string;
  city: string;
  protocol: string;
  method: string;
  userAgent: string;
  requestId: string;
  edgeTrace: string;
  serverTime: string;
};

export type ConnectionResponse = {
  status: "ok";
  connection: ConnectionInfo;
};

export type I18nText = ReturnType<typeof useI18n>["t"];