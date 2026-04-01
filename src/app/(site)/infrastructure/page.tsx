"use client";

import React, { useMemo } from "react";
import PageSection from "@/components/PageSection";
import BackgroundAccents from "@/components/BackgroundAccents";
import Divider from "@/components/Divider";
import InfrastructureHero from "@/components/infrastructure/InfrastructureHero";
import MetricsOverview from "@/components/infrastructure/MetricsOverview";
import ServicesPanel from "@/components/infrastructure/ServicesPanel";
import ArchitecturePanel from "@/components/infrastructure/ArchitecturePanel";
import ConnectionInspector from "@/components/infrastructure/ConnectionInspector";
import { useI18n } from "@/i18n/i18n";
import { useInfrastructureData } from "./useInfrastructureData";
import {
  EMPTY_METRICS,
  getOverallTone,
  INFRA_CHIPS,
} from "./utils";
import type { FlowItem, StatusTone } from "./types";

export default function InfrastructurePage() {
  const { t } = useI18n();
  const { infra, loading, fetchError, latencyMs, realtimeConnected } = useInfrastructureData();

  const services = infra?.containers ?? [];
  const metrics = infra?.metrics ?? EMPTY_METRICS;
  const online = infra?.status === "online";
  const overallTone = getOverallTone(services, !!online);

  const runningServices = services.filter((service) => service.status === "running").length;
  const allServicesRunning = services.length > 0 && runningServices === services.length;

  const servicesSummary =
    services.length === 0
      ? t.infra.ui.noServiceData
      : allServicesRunning
        ? t.infra.ui.allServicesRunning
        : t.infra.ui.serviceAttention;

  const latencyState =
    latencyMs === null
      ? { tone: "down" as StatusTone, label: t.infra.ui.latencyOffline }
      : latencyMs < 80
        ? { tone: "ok" as StatusTone, label: t.infra.ui.latencyFast }
        : latencyMs < 250
          ? { tone: "warn" as StatusTone, label: t.infra.ui.latencyDegraded }
          : { tone: "warn" as StatusTone, label: t.infra.ui.latencySlow };

  const flow = useMemo<FlowItem[]>(
    () => [
      {
        from: t.infra.flow.browser,
        to: t.infra.flow.frontend,
        note: t.infra.flow.frontendNote,
      },
      {
        from: t.infra.flow.browserFrontend,
        to: t.infra.flow.tunnel,
        note: t.infra.flow.tunnelNote,
      },
      {
        from: t.infra.flow.tunnel,
        to: t.infra.flow.api,
        note: t.infra.flow.apiNote,
      },
      {
        from: t.infra.flow.api,
        to: t.infra.flow.websocket,
        note: t.infra.flow.websocketNote,
      },
      {
        from: t.infra.flow.pi,
        to: t.infra.flow.api,
        note: t.infra.flow.piNote,
      },
    ],
    [t]
  );

  const statusLabels = {
    ok: t.infra.ui.ok,
    warn: t.infra.ui.warn,
    down: t.infra.ui.down,
  };

  const serviceStatusLabels = {
    running: t.infra.ui.running,
    degraded: t.infra.ui.degraded,
    stopped: t.infra.ui.stopped,
  };

  return (
    <PageSection>
      <BackgroundAccents />

      <InfrastructureHero
        t={t}
        loading={loading}
        online={!!online}
        overallTone={overallTone}
        realtimeConnected={realtimeConnected}
        fetchError={fetchError}
        chips={INFRA_CHIPS}
        servicesSummary={servicesSummary}
      />

      <Divider className="my-10" />

      <div className="space-y-6">
        <MetricsOverview
          t={t}
          loading={loading}
          online={!!online}
          overallTone={overallTone}
          latencyMs={latencyMs}
          latencyState={latencyState}
          metrics={metrics}
          statusLabels={statusLabels}
        />

        <ConnectionInspector apiUrl={process.env.NEXT_PUBLIC_INFRA_API_URL} />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ServicesPanel
              t={t}
              services={services}
              online={!!online}
              serviceStatusLabels={serviceStatusLabels}
            />
          </div>

          <div className="lg:col-span-5">
            <ArchitecturePanel t={t} flow={flow} />
          </div>
        </div>
      </div>
    </PageSection>
  );
}