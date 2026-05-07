import { type Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (typeof window === "undefined") {
    // SSR guard — return a no-op stub that won't crash the server
    return {
      connected: false,
      connect:    () => ({} as Socket),
      disconnect: () => ({} as Socket),
      on:         () => ({} as Socket),
      off:        () => ({} as Socket),
      emit:       () => ({} as Socket),
    } as unknown as Socket;
  }
  if (!socket) {
    // Dynamic import on client only to avoid SSR issues with socket.io-client
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { io } = require("socket.io-client");
    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect:     false,
      transports:      ["websocket", "polling"],
    });
  }
  return socket!;
};

export const connectSocket = () => {
  if (typeof window === "undefined") return getSocket();
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
};

export const disconnectSocket = () => {
  if (typeof window !== "undefined" && socket?.connected) socket.disconnect();
};

// ── Room helpers ───────────────────────────────────────────────────────────────
export const joinRoom  = (room: string) => { if (typeof window !== "undefined") getSocket().emit("join",  room); };
export const leaveRoom = (room: string) => { if (typeof window !== "undefined") getSocket().emit("leave", room); };

// ── Event names (must match backend) ──────────────────────────────────────────
export const SOCKET_EVENTS = {
  NEW_INVESTMENT:           "newInvestment",
  PROPOSAL_FUNDED:          "proposalFunded",
  STATS_UPDATE:             "statsUpdate",
  PROFIT_DISTRIBUTED:       "profitDistributed",
  PROPOSAL_STATUS_CHANGED:  "proposalStatusChanged",
} as const;
