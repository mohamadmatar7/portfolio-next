import Pill from "@/components/infrastructure/Pill";
import type { StatusLabels } from "@/(site)/infrastructure/types";
import {
  getToneStyles,
  parseUsage,
  usageTone,
} from "@/(site)/infrastructure/utils";

type Props = {
  label: string;
  value: string;
  usedLabel: string;
  freeLabel: string;
  statusLabels: StatusLabels;
};

export default function MetricBar({
  label,
  value,
  usedLabel,
  freeLabel,
  statusLabels,
}: Props) {
  const parsed = parseUsage(value);
  const tone = usageTone(parsed.percent);
  const styles = getToneStyles(tone);

  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-neutral-400">{label}</div>
        <Pill tone={tone}>
          {parsed.percent > 0
            ? `${parsed.percent}%`
            : tone === "ok"
              ? statusLabels.ok
              : tone === "warn"
                ? statusLabels.warn
                : statusLabels.down}
        </Pill>
      </div>

      <div className="mt-2 text-lg font-semibold text-white">
        {parsed.used} / {parsed.total || "—"}
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${styles.bar}`}
          style={{ width: `${parsed.percent}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-neutral-300">
        <span>
          {usedLabel}: {parsed.used}
        </span>
        <span>
          {freeLabel}: {parsed.remaining || "—"}
        </span>
      </div>
    </div>
  );
}