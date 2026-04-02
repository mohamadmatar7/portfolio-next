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
          className="group relative py-3 first:pt-0 last:pb-0"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="w-5 shrink-0 pt-0.5 text-right font-mono text-[10px] tabular-nums text-neutral-600 transition-colors group-hover:text-neutral-400">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">
                    {t.infra.ui.from}
                  </span>
                  <div className="mt-1 break-words text-sm font-semibold text-neutral-100">
                    {item.from}
                  </div>
                  {item.note ? (
                    <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                      {item.note}
                    </p>
                  ) : null}
                </div>

                <div className="flex shrink-0 items-center gap-1.5 self-start sm:self-center">
                  <div className="hidden h-px w-6 bg-gradient-to-r from-neutral-700 to-neutral-500 sm:block" />
                  <svg
                    className="text-neutral-400"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M5 1v8M1 6l4 4 4-4"
                      className="sm:hidden"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 5h8M6 1l4 4-4 4"
                      className="hidden sm:block"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0 flex-1 text-left sm:text-right">
                  <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">
                    {t.infra.ui.to}
                  </span>
                  <div className="mt-1 break-words text-sm font-semibold text-neutral-100">
                    {item.to}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 -inset-x-2 rounded-lg bg-white/[0.03] opacity-0 transition-opacity group-hover:opacity-10" />
        </div>
      ))}
    </div>
  );
}