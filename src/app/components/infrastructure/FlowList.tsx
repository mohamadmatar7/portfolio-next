import type { FlowItem } from "@/(site)/infrastructure/types";
import { useI18n } from "@/i18n/i18n";

type Props = {
  items: FlowItem[];
};

export default function FlowList({ items }: Props) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col divide-y divide-white/[0.06]">
      {items.map((item, index) => (
        <div
          key={`${item.from}-${item.to}-${index}`}
          className="group relative flex  gap-0 py-3 first:pt-0 last:pb-0"
        >
          {/* Index badge */}
          <span className="mr-4 w-5 shrink-0 text-right font-mono text-[10px] tabular-nums text-neutral-600 group-hover:text-neutral-400 transition-colors">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* FROM node */}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-[11px] font-medium uppercase tracking-widest text-neutral-500">
              {t.infra.ui.from}
            </span>
            <span className="truncate text-sm font-semibold text-neutral-100">
              {item.from}
            </span>
            {item.note && (
              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-neutral-500">
                {item.note}
              </p>
            )}
          </div>

          {/* Arrow connector */}
          <div className="mx-4 flex shrink-0 items-center gap-1.5">
            <div className="h-px w-6 bg-gradient-to-r from-neutral-700 to-neutral-500" />
            <svg
              className="text-neutral-400"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path d="M1 5h8M6 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* TO node */}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-right">
            <span className="truncate text-[11px] font-medium uppercase tracking-widest text-neutral-500 ">
              {t.infra.ui.to}
            </span>
            <span className="truncate text-sm font-semibold text-neutral-100">
              {item.to}
            </span>
          </div>

          {/* Hover accent line */}
          <div className="pointer-events-none absolute inset-y-0 -inset-x-2 rounded-lg bg-white/[0.03] opacity-0 transition-opacity group-hover:opacity-10" />
        </div>
      ))}
    </div>
  );
}