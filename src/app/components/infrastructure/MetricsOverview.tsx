import Panel from "@/components/infrastructure/Panel";
import StatCard from "@/components/infrastructure/StatCard";
import MetricBar from "@/components/infrastructure/MetricBar";
import { formatUpdatedAt } from "@/(site)/infrastructure/utils";
import type {
  I18nText,
  Metrics,
  StatusLabels,
  StatusTone,
} from "@/(site)/infrastructure/types";

type Props = {
  t: I18nText;
  loading: boolean;
  online: boolean;
  overallTone: StatusTone;
  latencyMs: number | null;
  latencyState: {
    tone: StatusTone;
    label: string;
  };
  metrics: Metrics;
  statusLabels: StatusLabels;
};

export default function MetricsOverview({
  t,
  loading,
  online,
  overallTone,
  latencyMs,
  latencyState,
  metrics,
  statusLabels,
}: Props) {
  return (
    <Panel title={t.infra.ui.metricsTitle} hint={t.infra.ui.metricsHint}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label={t.infra.status.title}
          value={
            loading
              ? t.infra.ui.loadingValue
              : online
                ? t.infra.status.online
                : t.infra.status.offline
          }
          hint={`${t.infra.status.updated}: ${formatUpdatedAt(metrics.updatedAt)}`}
          tone={loading ? "warn" : overallTone}
          statusLabels={statusLabels}
        />

        <StatCard
          label={t.infra.status.latency}
          value={latencyMs === null ? "—" : `${latencyMs} ms`}
          hint={t.infra.ui.latencyHint}
          tone={latencyState.tone}
          customLabel={latencyState.label}
          statusLabels={statusLabels}
        />

        <StatCard
          label={t.infra.ui.uptimeTitle}
          value={metrics.uptime || "—"}
          hint={t.infra.ui.uptimeHint}
          tone="ok"
          statusLabels={statusLabels}
        />

        <StatCard
          label={t.infra.ui.cpuTitle}
          value={metrics.cpu || "—"}
          hint={t.infra.ui.cpuHint}
          tone="ok"
          statusLabels={statusLabels}
        />

        <StatCard
          label={t.infra.ui.tempTitle}
          value={metrics.temp || "—"}
          hint={t.infra.ui.tempHint}
          tone={Number.parseFloat(metrics.temp) >= 75 ? "warn" : "ok"}
          statusLabels={statusLabels}
        />

        <MetricBar
          label={t.infra.ui.ramTitle}
          value={metrics.ram || "—"}
          usedLabel={t.infra.ui.used}
          freeLabel={t.infra.ui.free}
          statusLabels={statusLabels}
        />

        <MetricBar
          label={t.infra.ui.diskTitle}
          value={metrics.disk || "—"}
          usedLabel={t.infra.ui.used}
          freeLabel={t.infra.ui.free}
          statusLabels={statusLabels}
        />
      </div>
    </Panel>
  );
}