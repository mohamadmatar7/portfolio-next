"use client";

import { useMemo, useState } from "react";
import type { Architecture, ArchNode } from "@/data/architectures";
import { useI18n } from "@/i18n/i18n";

type GroupKey = ArchNode["group"];

function groupColor(group: GroupKey) {
  switch (group) {
    case "client":
      return "border-sky-300/20 bg-sky-400/[0.07]";
    case "cloud":
      return "border-violet-300/20 bg-violet-400/[0.07]";
    case "core":
      return "border-amber-300/20 bg-amber-400/[0.07]";
    case "vision":
      return "border-emerald-300/20 bg-emerald-400/[0.07]";
    case "hardware":
      return "border-rose-300/20 bg-rose-400/[0.07]";
    case "db":
      return "border-blue-300/20 bg-blue-400/[0.07]";
    case "server":
      return "border-fuchsia-300/20 bg-fuchsia-400/[0.07]";
    default:
      return "border-white/10 bg-white/[0.04]";
  }
}

function groupDotColor(group: GroupKey) {
  switch (group) {
    case "client":
      return "bg-sky-400";
    case "cloud":
      return "bg-violet-400";
    case "core":
      return "bg-amber-400";
    case "vision":
      return "bg-emerald-400";
    case "hardware":
      return "bg-rose-400";
    case "db":
      return "bg-blue-400";
    case "server":
      return "bg-fuchsia-400";
    default:
      return "bg-white";
  }
}

function groupBadgeColor(group: GroupKey) {
  switch (group) {
    case "client":
      return "border-sky-300/20 bg-sky-400/10 text-sky-200";
    case "cloud":
      return "border-violet-300/20 bg-violet-400/10 text-violet-200";
    case "core":
      return "border-amber-300/20 bg-amber-400/10 text-amber-200";
    case "vision":
      return "border-emerald-300/20 bg-emerald-400/10 text-emerald-200";
    case "hardware":
      return "border-rose-300/20 bg-rose-400/10 text-rose-200";
    case "db":
      return "border-blue-300/20 bg-blue-400/10 text-blue-200";
    case "server":
      return "border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-200";
    default:
      return "border-white/10 bg-white/10 text-neutral-200";
  }
}

function groupLabel(group: GroupKey) {
  switch (group) {
    case "client":
      return "Client";
    case "cloud":
      return "Cloud";
    case "server":
      return "Server";
    case "core":
      return "Core";
    case "vision":
      return "Vision";
    case "hardware":
      return "Hardware";
    case "db":
      return "Database";
    default:
      return "Other";
  }
}

const groupOrder: GroupKey[] = [
  "client",
  "cloud",
  "server",
  "core",
  "vision",
  "hardware",
  "db",
];

export default function ArchitectureMobile({ arch }: { arch: Architecture }) {
  const { t, lang } = useI18n();
  const [selectedId, setSelectedId] = useState<string | null>(arch.nodes[0]?.id ?? null);

  const grouped = useMemo(() => {
    const map = new Map<GroupKey, ArchNode[]>();

    for (const group of groupOrder) {
      map.set(group, []);
    }

    for (const node of arch.nodes) {
      if (!map.has(node.group)) map.set(node.group, []);
      map.get(node.group)!.push(node);
    }

    return groupOrder
      .map((group) => ({
        group,
        items: map.get(group) ?? [],
      }))
      .filter((section) => section.items.length > 0);
  }, [arch.nodes]);

  const selected = useMemo(() => {
    return arch.nodes.find((node) => node.id === selectedId) ?? null;
  }, [arch.nodes, selectedId]);

  const relatedEdges = useMemo(() => {
    if (!selected) return [];
    return arch.edges.filter((edge) => edge.from === selected.id || edge.to === selected.id);
  }, [arch.edges, selected]);

  const nodeMap = useMemo(() => {
    return new Map(arch.nodes.map((node) => [node.id, node]));
  }, [arch.nodes]);

  return (
    <div className="rounded-b-3xl border-t border-white/10 bg-white/[0.03]">
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-neutral-200">{arch.title}</p>
        <p className="mt-1 text-xs text-neutral-400">{t.arch.hintMob}</p>
      </div>

      <div className="px-3 pb-3">
        <div className="space-y-4">
          {grouped.map((section) => (
            <section key={section.group}>
              <div className="mb-2 flex items-center gap-3 px-1">
                <div className={`h-2.5 w-2.5 rounded-full ${groupDotColor(section.group)}`} />
                <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                  {groupLabel(section.group)}
                </p>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="space-y-2">
                {section.items.map((node) => {
                  const isActive = selected?.id === node.id;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedId(node.id)}
                      className={[
                        "relative w-full overflow-hidden rounded-2xl border px-3 py-3 text-left transition-all duration-200",
                        groupColor(node.group),
                        isActive
                          ? "border-white/20 bg-white/[0.07] shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                          : "opacity-95",
                      ].join(" ")}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_55%)]" />

                      <div className="relative flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`h-1.5 w-1.5 rounded-full ${groupDotColor(node.group)}`} />
                            <p className="truncate text-sm font-medium text-white">{node.label}</p>
                          </div>

                          {node.details && (
                            <p className="mt-1 line-clamp-2 text-xs text-neutral-300">
                              {node.details.role[lang]}
                            </p>
                          )}
                        </div>

                        <span
                          className={[
                            "shrink-0 rounded-full border px-2 py-1 text-[10px]",
                            isActive
                              ? "border-white/15 bg-white/10 text-white"
                              : groupBadgeColor(node.group),
                          ].join(" ")}
                        >
                          {isActive ? "Selected" : groupLabel(node.group)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {selected?.details && (
        <div className="border-t border-white/10 bg-black/10 px-4 py-4">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${groupDotColor(selected.group)}`} />
            <p className="text-sm font-medium text-white">{selected.label}</p>
          </div>

          <p className="mt-1 text-xs text-neutral-400">{selected.details.role[lang]}</p>

          <p className="mt-3 text-sm leading-6 text-neutral-300">
            {selected.details.description[lang]}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {selected.details.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {relatedEdges.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                {t.arch.Connections}
              </p>

              <div className="flex flex-wrap gap-2">
                {relatedEdges.map((edge, index) => {
                  const otherId = edge.from === selected.id ? edge.to : edge.from;
                  const otherNode = nodeMap.get(otherId);

                  return (
                    <div
                      key={`${edge.from}-${edge.to}-${index}`}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5"
                    >
                      <span className="text-xs text-neutral-200">
                        {otherNode?.label ?? otherId}
                      </span>

                      {edge.label && (
                        <span className="ml-2 text-[10px] text-neutral-500">
                          · {edge.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}