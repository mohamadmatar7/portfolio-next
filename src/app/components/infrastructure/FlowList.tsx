import type { FlowItem } from "@/(site)/infrastructure/types";

type Props = {
  items: FlowItem[];
};

export default function FlowList({ items }: Props) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item.from}-${item.to}-${index}`} className="flex items-stretch gap-3">
          <div className="flex-1 rounded-xl border border-white/10 bg-neutral-950/40 px-3 py-3">
            <div className="text-xs font-semibold text-neutral-100">{item.from}</div>
            {item.note ? <div className="mt-1 text-[11px] text-neutral-400">{item.note}</div> : null}
          </div>

          <div className="flex items-center text-neutral-500">→</div>

          <div className="flex-1 rounded-xl border border-white/10 bg-neutral-950/40 px-3 py-3">
            <div className="text-xs font-semibold text-neutral-100">{item.to}</div>
          </div>
        </div>
      ))}
    </div>
  );
}