"use client";

import { useEffect, useState } from "react";
import Architecture3D from "@/components/Architecture3D";
import ArchitectureMobile from "@/components/ArchitectureMobile";
import { architectures } from "@/data/architectures";
import { useI18n } from "@/i18n/i18n";

const options = [
  { id: "roomie", label: "Roomie" },
  { id: "sweetcontrol", label: "SweetControl" },
  { id: "nexted", label: "NextEd" },
] as const;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener?.("change", handleChange);

    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, [query]);

  return matches;
}

export default function ArchitectureSection() {
  const { t } = useI18n();
  const [current, setCurrent] = useState<"roomie" | "sweetcontrol" | "nexted">("roomie");
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <p className="text-sm text-neutral-200">{t.arch.heading}</p>

        <select
          value={current}
          onChange={(e) => setCurrent(e.target.value as typeof current)}
          className="rounded-lg border border-white/10 bg-neutral-900/90 px-3 py-1.5 text-sm text-neutral-200"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {isMobile ? (
        <ArchitectureMobile arch={architectures[current]} />
      ) : (
        <Architecture3D arch={architectures[current]} />
      )}
    </div>
  );
}