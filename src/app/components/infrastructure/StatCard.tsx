import Pill from "@/components/infrastructure/Pill";
import type {
  StatusLabels,
  StatusTone,
} from "@/(site)/infrastructure/types";

type Props = {
  label: string;
  value: string;
  hint?: string;
  tone?: StatusTone;
  customLabel?: string;
  statusLabels: StatusLabels;
};

export default function StatCard({
  label,
  value,
  hint,
  tone = "ok",
  customLabel,
  statusLabels,
}: Props) {
  const pillLabel = customLabel
    ? customLabel
    : tone === "ok"
      ? statusLabels.ok
      : tone === "warn"
        ? statusLabels.warn
        : statusLabels.down;

  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-neutral-400">{label}</div>
        <Pill tone={tone}>{pillLabel}</Pill>
      </div>

      <div className="mt-2 text-lg font-semibold text-white">{value}</div>

      {hint ? <div className="mt-1 text-xs text-neutral-400">{hint}</div> : null}
    </div>
  );
}