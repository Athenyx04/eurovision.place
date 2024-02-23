import { create } from "zustand";

interface PlayerStore {
  isPlaying: boolean;
  currentTrack: string | null;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTrack: (currentTrack: string) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentTrack: null,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentTrack: (currentTrack: string) => set({ currentTrack }),
}));
