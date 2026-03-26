import type {
  ServiceItem,
  ServiceStatusLabels,
} from "@/(site)/infrastructure/types";
import {
  getServiceTone,
  getToneStyles,
} from "@/(site)/infrastructure/utils";

type Props = {
  item: ServiceItem;
  labels: ServiceStatusLabels;
};

export default function ServiceRow({ item, labels }: Props) {
  const tone = getServiceTone(item.status);
  const styles = getToneStyles(tone);

  const statusLabel =
    item.status === "running"
      ? labels.running
      : item.status === "degraded"
        ? labels.degraded
        : labels.stopped;

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-950/40 px-4 py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
            <div className="truncate text-sm font-semibold text-white">{item.name}</div>
          </div>

          <div className="mt-2 text-sm leading-relaxed text-neutral-300">{item.role}</div>

          {(item.ports || item.notes) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.ports ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-neutral-200">
                  {item.ports}
                </span>
              ) : null}

              {item.notes ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-neutral-200">
                  {item.notes}
                </span>
              ) : null}
            </div>
          )}
        </div>

        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles.chip}`}
        >
          {statusLabel}
        </span>
      </div>
    </div>
  );
}