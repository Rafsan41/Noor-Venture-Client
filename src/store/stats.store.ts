import { create } from "zustand";
import type { LiveStats } from "@/types";

interface StatsState {
  stats:     LiveStats | null;
  connected: boolean;
  setStats:      (stats: LiveStats) => void;
  setConnected:  (v: boolean) => void;
  updateStat:    (key: keyof LiveStats, value: number) => void;
}

export const useStatsStore = create<StatsState>((set) => ({
  stats:     null,
  connected: false,

  setStats:     (stats)     => set({ stats }),
  setConnected: (connected) => set({ connected }),

  updateStat: (key, value) =>
    set((state) =>
      state.stats
        ? { stats: { ...state.stats, [key]: value } }
        : state
    ),
}));
