import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect:     false,
      transports:      ["websocket", "polling"],
    });
  }
  return socket;
};

export const connectSocket = () => {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
};

export const disconnectSocket = () => {
  if (socket?.connected) socket.disconnect();
};

// ── Room helpers ───────────────────────────────────────────────────────────────
export const joinRoom  = (room: string) => getSocket().emit("join",  room);
export const leaveRoom = (room: string) => getSocket().emit("leave", room);

// ── Event names (must match backend) ──────────────────────────────────────────
export const SOCKET_EVENTS = {
  NEW_INVESTMENT:           "newInvestment",
  PROPOSAL_FUNDED:          "proposalFunded",
  STATS_UPDATE:             "statsUpdate",
  PROFIT_DISTRIBUTED:       "profitDistributed",
  PROPOSAL_STATUS_CHANGED:  "proposalStatusChanged",
} as const;
