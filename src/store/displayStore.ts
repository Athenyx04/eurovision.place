import { create } from "zustand";
import type { Song } from "../lib/data";

interface DisplayStore {
  firstCard: number;
  secondCard: number;
  updateIndexes: (songs: Song[]) => void;
}

export const useDisplayStore = create<DisplayStore>((set) => ({
  firstCard: 0,
  secondCard: 1,
  updateIndexes: (songs) => {
    if (songs.length < 2) {
      set(() => ({
        firstCard: 0,
        secondCard: 1,
      }));
      return;
    }

    const firstCard = Math.floor(Math.random() * songs.length);
    let secondCard: number;

    do {
      secondCard = Math.floor(Math.random() * songs.length);
    } while (secondCard === firstCard);

    set(() => ({
      firstCard,
      secondCard,
    }));
  },
}));
