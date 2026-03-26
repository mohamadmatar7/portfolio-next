import React from "react";

type Props = {
  title: string;
  hint?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
};

export default function Panel({ title, hint, children, right }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          {hint ? <div className="mt-1 text-xs text-neutral-400">{hint}</div> : null}
        </div>
        {right}
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
}