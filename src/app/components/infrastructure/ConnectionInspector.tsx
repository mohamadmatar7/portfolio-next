"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/i18n";
import type { ConnectionResponse } from "@/(site)/infrastructure/types";

type Props = {
  apiUrl?: string;
};

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-white/[0.06] py-3 first:border-t-0 first:pt-0 last:pb-0">
      <span className="text-xs uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </span>
      <span className="max-w-[68%] break-words text-right text-sm text-neutral-200">
        {value}
      </span>
    </div>
  );
}

export default function ConnectionInspector({ apiUrl }: Props) {
  const { t } = useI18n();

  const [data, setData] = useState<ConnectionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function inspectConnection() {
    if (!apiUrl) {
      setError("Missing API URL");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${apiUrl}/connection`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed with status ${response.status}`);
      }

      const result: ConnectionResponse = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to inspect connection");
    } finally {
      setLoading(false);
    }
  }

  const connection = data?.connection;
  const locationParts = [connection?.city, connection?.region, connection?.country].filter(Boolean);
  const locationLabel =
    locationParts.length > 0 ? locationParts.join(", ") : t.infra.ui.notAvailable;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-white">
            {t.infra.ui.inspectConnectionTitle}
          </div>
          <div className="mt-1 max-w-2xl text-xs leading-relaxed text-neutral-400">
            {t.infra.ui.inspectConnectionDescription}
          </div>
        </div>

        <button
          type="button"
          onClick={inspectConnection}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? t.infra.ui.inspecting : t.infra.ui.inspectConnectionTitle}
        </button>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      {connection ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white">
                {t.infra.ui.connectionSnapshotTitle}
              </div>
              <div className="mt-1 text-xs text-neutral-400">
                {t.infra.ui.connectionSnapshotHint}
              </div>
            </div>

            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-200">
              {t.infra.ui.liveResponse}
            </span>
          </div>

          <div className="space-y-0">
            <InfoRow label={t.infra.ui.publicIp} value={connection.ipMasked} />
            <InfoRow label={t.infra.ui.observedFrom} value={connection.ipSource} />
            <InfoRow label={t.infra.ui.detectedLocation} value={locationLabel} />
            <InfoRow label={t.infra.ui.protocol} value={connection.protocol} />
            <InfoRow label={t.infra.ui.method} value={connection.method} />
            <InfoRow label={t.infra.ui.requestId} value={connection.requestId} />
            <InfoRow
              label={t.infra.ui.serverTime}
              value={new Date(connection.serverTime).toLocaleString()}
            />
            {connection.edgeTrace ? (
              <InfoRow label={t.infra.ui.edgeTrace} value={connection.edgeTrace} />
            ) : null}
            <InfoRow label={t.infra.ui.userAgent} value={connection.userAgent} />
          </div>
        </div>
      ) : null}
    </div>
  );
}