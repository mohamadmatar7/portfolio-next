"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import type { InfraResponse } from "./types";

export function useInfrastructureData() {
  const [infra, setInfra] = useState<InfraResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [realtimeConnected, setRealtimeConnected] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_INFRA_API_URL;
  const wsHost = process.env.NEXT_PUBLIC_WS_HOST;
  const wsPort = Number(process.env.NEXT_PUBLIC_WS_PORT || 443);
  const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "";

  useEffect(() => {
    let mounted = true;

    async function loadInfra() {
      if (!apiUrl) {
        if (mounted) {
          setFetchError("Missing NEXT_PUBLIC_INFRA_API_URL");
          setLoading(false);
        }
        return;
      }

      try {
        const startedAt = performance.now();
        const response = await fetch(`${apiUrl}/infra`, {
          cache: "no-store",
        });
        const endedAt = performance.now();

        if (!response.ok) {
          throw new Error(`Failed with status ${response.status}`);
        }

        const data: InfraResponse = await response.json();

        if (!mounted) return;

        setInfra(data);
        setLatencyMs(Math.round(endedAt - startedAt));
        setFetchError(null);
      } catch (error) {
        if (!mounted) return;
        setFetchError(error instanceof Error ? error.message : "Failed to load infrastructure data");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadInfra();
    const pollId = window.setInterval(loadInfra, 30000);

    return () => {
      mounted = false;
      window.clearInterval(pollId);
    };
  }, [apiUrl]);

  useEffect(() => {
    if (!wsHost || !pusherKey) return;

    const pusher = new Pusher(pusherKey, {
      wsHost,
      wsPort,
      wssPort: wsPort,
      forceTLS: true,
      enabledTransports: ["ws", "wss"],
      disableStats: true,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1",
    });

    pusher.connection.bind("connected", () => {
      setRealtimeConnected(true);
    });

    pusher.connection.bind("disconnected", () => {
      setRealtimeConnected(false);
    });

    pusher.connection.bind("unavailable", () => {
      setRealtimeConnected(false);
    });

    const channel = pusher.subscribe("infra");

    channel.bind("metrics.updated", (payload: InfraResponse) => {
      setInfra(payload);
      setFetchError(null);
      setLoading(false);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("infra");
      pusher.disconnect();
      setRealtimeConnected(false);
    };
  }, [wsHost, wsPort, pusherKey]);

  return {
    infra,
    loading,
    fetchError,
    latencyMs,
    realtimeConnected,
  };
}