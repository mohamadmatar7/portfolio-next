"use client";

import { useState } from "react";
import Architecture3D from "@/components/Architecture3D";
import { architectures } from "@/data/architectures";
import { useI18n } from "@/i18n/i18n";

const options = [
  { id: "roomie", label: "Roomie" },
  { id: "sweetcontrol", label: "SweetControl" },
  { id: "nexted", label: "NextEd" },
] as const;

export default function ArchitectureSection() {
  const { t } = useI18n();
  const [current, setCurrent] = useState<"roomie" | "sweetcontrol" | "nexted">("roomie");

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <p className="text-sm text-neutral-200">{t.arch.heading}</p>

        <select
          value={current}
          onChange={(e) => setCurrent(e.target.value as typeof current)}
          className="rounded-lg bg-neutral-900 border border-white/10 px-3 py-1 text-sm text-neutral-200"
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <Architecture3D arch={architectures[current]} />
    </div>
  );
}
