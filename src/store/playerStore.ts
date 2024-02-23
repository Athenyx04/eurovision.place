import { create } from "zustand";

interface PlayerStore {
  isPlaying: boolean;
  isLoading: boolean;
  currentTrack: string | null;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentTrack: (currentTrack: string) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  isLoading: false,
  currentTrack: null,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setCurrentTrack: (currentTrack: string) => set({ currentTrack }),
}));
