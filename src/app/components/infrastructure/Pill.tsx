import React from "react";
import type { StatusTone } from "@/(site)/infrastructure/types";
import { getToneStyles } from "@/(site)/infrastructure/utils";

type Props = {
  children: React.ReactNode;
  tone?: StatusTone;
};

export default function Pill({ children, tone = "ok" }: Props) {
  const styles = getToneStyles(tone);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles.chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {children}
    </span>
  );
}