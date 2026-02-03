"use client";

import * as THREE from "three";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Line, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import type { Architecture, ArchNode } from "@/data/architectures";
import { useI18n } from "@/i18n/i18n";

type Vec3 = [number, number, number];

function groupStyle(group: ArchNode["group"]) {
  switch (group) {
    case "client":
      return { scale: 1.0, opacity: 0.95 };
    case "cloud":
      return { scale: 1.0, opacity: 0.9 };
    case "core":
      return { scale: 1.06, opacity: 0.95 };
    case "vision":
      return { scale: 1.0, opacity: 0.9 };
    case "hardware":
      return { scale: 1.0, opacity: 0.9 };
    case "db":
      return { scale: 1.0, opacity: 0.9 };
    default:
      return { scale: 1.0, opacity: 0.9 };
  }
}

function groupColor(group: ArchNode["group"]) {
  switch (group) {
    case "client":
      return "#7dd3fc";
    case "cloud":
      return "#a78bfa";
    case "core":
      return "#fbbf24";
    case "vision":
      return "#34d399";
    case "hardware":
      return "#fb7185";
    case "db":
      return "#60a5fa";
    default:
      return "#e5e7eb";
  }
}

function mulPos(p: Vec3, s: number): Vec3 {
  return [p[0] * s, p[1] * s, p[2] * s];
}

function midPos(a: Vec3, b: Vec3): Vec3 {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0];
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

function FitCamera({
  cameraRef,
  center,
  bounds,
  fov = 42,
  minZ = 6.2,
  maxZ = 16,
  padding = 1.25,
  viewport,
}: {
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
  center: Vec3;
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  fov?: number;
  minZ?: number;
  maxZ?: number;
  padding?: number;
  viewport: { width: number; height: number };
}) {
  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const aspect = viewport.width / Math.max(1, viewport.height);

    const sizeX = Math.max(0.001, bounds.maxX - bounds.minX);
    const sizeY = Math.max(0.001, bounds.maxY - bounds.minY);

    const vFov = (fov * Math.PI) / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);

    const distY = sizeY / 2 / Math.tan(vFov / 2);
    const distX = sizeX / 2 / Math.tan(hFov / 2);

    const targetZ = clamp(Math.max(distX, distY) * padding, minZ, maxZ);

    camera.fov = fov;
    camera.position.set(center[0], center[1], targetZ);
    camera.lookAt(center[0], center[1], 0);
    camera.updateProjectionMatrix();
  }, [cameraRef, viewport.width, viewport.height, bounds, center, fov, minZ, maxZ, padding]);

  return null;
}

function Node({
  n,
  active,
  dimmed,
  showLabel,
  onHover,
  onSelect,
  position,
}: {
  n: ArchNode;
  active: boolean;
  dimmed: boolean;
  showLabel: boolean;
  onHover: (id: string | null) => void;
  onSelect: (node: ArchNode) => void;
  position: Vec3;
}) {
  const { scale, opacity } = groupStyle(n.group);
  const color = groupColor(n.group);

  const baseOpacity = active ? 1 : opacity;
  const finalOpacity = dimmed ? Math.min(0.18, baseOpacity) : baseOpacity;

  return (
    <group position={position}>
      <mesh
        onPointerEnter={() => onHover(n.id)}
        onPointerLeave={() => onHover(null)}
        onClick={() => onSelect(n)}
        scale={active ? scale * 1.08 : scale}
      >
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 0.7 : 0.28}
          metalness={0.2}
          roughness={0.35}
          transparent
          opacity={finalOpacity}
        />
      </mesh>

      {showLabel && (
        <Html center position={[0, 0.44, 0]} style={{ pointerEvents: "none" }}>
          <div className="select-none whitespace-nowrap rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] leading-none text-white shadow">
            {n.label}
          </div>
        </Html>
      )}
    </group>
  );
}

export default function Architecture3D({ arch }: { arch: Architecture }) {
  const { t, lang } = useI18n();

  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<ArchNode | null>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const layoutScale = 1.25;

  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const [viewport, setViewport] = useState({ width: 1, height: 1 });

  const scaledNodes = useMemo(() => {
    return arch.nodes.map((n) => ({
      ...n,
      _pos: mulPos(n.position, layoutScale),
    }));
  }, [arch.nodes]);

  const nodeById = useMemo(() => {
    const m = new Map<string, ArchNode & { _pos: Vec3 }>();
    for (const n of scaledNodes) m.set(n.id, n);
    return m;
  }, [scaledNodes]);

  const center = useMemo((): Vec3 => {
    if (!scaledNodes.length) return [0, 0, 0];
    const sx = scaledNodes.reduce((acc, n) => acc + n._pos[0], 0);
    const sy = scaledNodes.reduce((acc, n) => acc + n._pos[1], 0);
    return [sx / scaledNodes.length, sy / scaledNodes.length, 0];
  }, [scaledNodes]);

  const bounds = useMemo(() => {
    if (!scaledNodes.length) return { minX: -1, maxX: 1, minY: -1, maxY: 1 };
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;

    for (const n of scaledNodes) {
      minX = Math.min(minX, n._pos[0]);
      maxX = Math.max(maxX, n._pos[0]);
      minY = Math.min(minY, n._pos[1]);
      maxY = Math.max(maxY, n._pos[1]);
    }

    return {
      minX: minX - 0.8,
      maxX: maxX + 0.8,
      minY: minY - 0.8,
      maxY: maxY + 1.2,
    };
  }, [scaledNodes]);

  const focusId = hovered ?? selected?.id ?? null;

  const connectedSet = useMemo(() => {
    if (!focusId) return null;
    const s = new Set<string>([focusId]);

    for (const e of arch.edges) {
      if (e.from === focusId) s.add(e.to);
      if (e.to === focusId) s.add(e.from);
    }
    return s;
  }, [arch.edges, focusId]);

  const shouldShowLabel = (id: string) => {
    if (!connectedSet) return true;
    return connectedSet.has(id);
  };

  const lines = useMemo(() => {
    return arch.edges
      .map((e) => {
        const a = nodeById.get(e.from);
        const b = nodeById.get(e.to);
        if (!a || !b) return null;

        const isFocusedEdge = focusId != null && (e.from === focusId || e.to === focusId);

        const isConnectedEdge =
          connectedSet != null && connectedSet.has(e.from) && connectedSet.has(e.to);

        const strong = isFocusedEdge || (focusId == null && (hovered === e.from || hovered === e.to));

        const dimmed = focusId != null && !isConnectedEdge;

        return {
          key: `${e.from}-${e.to}`,
          from: a._pos as Vec3,
          to: b._pos as Vec3,
          label: e.label,
          strong: strong || isConnectedEdge,
          dimmed,
          color: groupColor(a.group),
        };
      })
      .filter(Boolean) as Array<{
      key: string;
      from: Vec3;
      to: Vec3;
      label?: string;
      strong: boolean;
      dimmed: boolean;
      color: string;
    }>;
  }, [arch.edges, nodeById, hovered, focusId, connectedSet]);

  return (
    <div className="w-full overflow-hidden rounded-b-3xl border border-white/10 bg-white/5 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="min-w-0">
          <p className="text-sm text-neutral-200 truncate">{arch.title}</p>
          <p className="text-xs text-neutral-400">{t.arch.hint}</p>
        </div>

        {selected && (
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="shrink-0 text-xs text-neutral-300 hover:text-white transition"
          >
            {t.arch.clear}
          </button>
        )}
      </div>

      <div className="h-[340px] sm:h-[380px]">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onCreated={({ size }) => setViewport({ width: size.width, height: size.height })}
          onPointerMissed={() => setSelected(null)}
          onResize={(s) => setViewport({ width: s.width, height: s.height })}
        >
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            fov={42}
            position={[center[0], center[1], 9]}
          />

          {/* Scene styling */}
          <color attach="background" args={["#06070b"]} />
          <fog attach="fog" args={["#06070b", 7, 15]} />
          <Stars radius={40} depth={18} count={900} factor={2.4} saturation={0} fade speed={0.4} />

          {/* Lights */}
          <ambientLight intensity={0.65} />
          <directionalLight position={[4, 4, 6]} intensity={1.2} />
          <pointLight position={[0, 0, 6]} intensity={0.6} />

          {/* Fit camera to layout */}
          <FitCamera
            cameraRef={cameraRef}
            center={center}
            bounds={bounds}
            fov={42}
            minZ={6.2}
            maxZ={16}
            padding={1.25}
            viewport={viewport}
          />

          {/* Edges */}
          {lines.map((l) => (
            <group key={l.key}>
              <Line
                points={[l.from, l.to]}
                color={l.color}
                lineWidth={l.strong ? 2.2 : 1.0}
                transparent
                opacity={l.dimmed ? 0.1 : l.strong ? 0.9 : 0.22}
                dashed={!l.strong}
                dashSize={0.14}
                gapSize={0.12}
                dashScale={1}
              />

              {l.label && l.strong && !l.dimmed && (
                <Html center position={midPos(l.from, l.to)} style={{ pointerEvents: "none" }}>
                  <div className="rounded-lg border border-white/10 bg-black/70 px-2 py-1 text-[11px] text-white shadow">
                    {l.label}
                  </div>
                </Html>
              )}
            </group>
          ))}

          {/* Nodes */}
          {scaledNodes.map((n) => {
            const active = n.id === focusId;
            const connected = connectedSet ? connectedSet.has(n.id) : true;
            const dimmed = focusId != null && !connected;

            return (
              <Node
                key={n.id}
                n={n}
                position={n._pos}
                active={active || hovered === n.id || selected?.id === n.id}
                dimmed={dimmed}
                showLabel={shouldShowLabel(n.id)}
                onHover={setHovered}
                onSelect={setSelected}
              />
            );
          })}

          {/* Controls */}
          <OrbitControls
            target={center}
            enableDamping
            dampingFactor={0.08}
            enablePan={false}
            enableZoom={isMobile}
            rotateSpeed={0.7}
          />
        </Canvas>
      </div>

      {selected?.details && (
        <div className="border-t border-white/10 px-4 py-4">
          <p className="text-sm font-medium text-white">{selected.label}</p>
          <p className="mt-1 text-xs text-neutral-400">{selected.details.role[lang]}</p>

          <p className="mt-3 text-sm text-neutral-300">{selected.details.description[lang]}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {selected.details.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
