"use client";

import { useEffect } from "react";
import { connectSocket, disconnectSocket, getSocket, SOCKET_EVENTS } from "@/lib/socket";
import { useStatsStore } from "@/store/stats.store";
import type { LiveStats } from "@/types";

export function useSocket() {
  const { setConnected, setStats } = useStatsStore();

  useEffect(() => {
    const socket = connectSocket();

    socket.on("connect",    () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on(SOCKET_EVENTS.STATS_UPDATE, (data: LiveStats) => {
      setStats(data);
    });

    // Join global dashboard room
    socket.emit("join", "dashboard");

    return (): void => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(SOCKET_EVENTS.STATS_UPDATE);
      socket.emit("leave", "dashboard");
    };
  }, [setConnected, setStats]);

  return getSocket();
}

export function useProposalSocket(proposalId: string) {
  useEffect(() => {
    const socket = connectSocket();
    socket.emit("join", `proposal:${proposalId}`);
    return () => { socket.emit("leave", `proposal:${proposalId}`); };
  }, [proposalId]);
}
