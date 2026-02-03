"use client";

import React from "react";

type InfoCardProps = {
  title?: string;
  titleSize?: "sm" | "md";

  // Mode A (Home): chips + rows
  chips?: string[];
  rows?: Array<{ label: string; value: string }>;

  // Mode B (About): list items
  items?: string[];

  // children?: React.ReactNode;
  children?: React.ReactNode;

  footerLeft?: string;
  footerRight?: string;
};

export default function InfoCard({
  title,
  titleSize = "sm",
  chips = [],
  rows = [],
  items = [],
  children,
  footerLeft,
  footerRight,
}: InfoCardProps) {

  const hasChips = chips.length > 0;
  const hasRows = rows.length > 0;
  const hasItems = items.length > 0;
  const hasChildren = Boolean(children);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 transition hover:bg-white/[0.07]">
      {title && (
        <p
        className={
            titleSize === "md"
            ? "text-base font-semibold tracking-tight text-white"
            : "text-sm font-semibold text-white/90"
        }
        >
        {title}
        </p>
      )}

      {hasChips && (
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/10 bg-neutral-950/40 px-3 py-1 text-xs text-neutral-200"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {hasRows && (
        <div className="mt-5 grid gap-2">
          {rows.map((r) => (
            <div
              key={r.label}
              className="rounded-xl border border-white/10 bg-neutral-950/30 px-4 py-3"
            >
              <p className="text-xs text-neutral-400">{r.label}</p>
              <p className="mt-1 text-sm text-neutral-100">{r.value}</p>
            </div>
          ))}
        </div>
      )}

      {hasItems && (
        <ul className="mt-4 space-y-2 text-sm text-neutral-300">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {hasChildren && 
      <div className={title || hasChips || hasRows || hasItems ? "mt-4" : ""}>{children}</div>
      }

      {(footerLeft || footerRight) && (
        <div className="mt-5 flex items-center justify-between text-xs text-neutral-400">
          <span>{footerLeft}</span>
          {footerRight ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
              {footerRight}
            </span>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
