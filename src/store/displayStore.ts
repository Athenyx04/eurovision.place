import { create } from "zustand";
import type { Song } from "../lib/data";

interface DisplayStore {
  firstCard: number;
  secondCard: number;
  nextFirstCard: number;
  nextSecondCard: number;
  updateIndexes: (state: DisplayStore, songs: Song[]) => void;
}

export const useDisplayStore = create<DisplayStore>((set) => ({
  firstCard: 0,
  secondCard: 1,
  nextFirstCard: 1,
  nextSecondCard: 2,
  updateIndexes: (state, songs) => {
    if (songs.length < 2) {
      return;
    }

    const firstCard = state.nextFirstCard;
    const secondCard = state.nextSecondCard;

    const nextFirstCard = Math.floor(Math.random() * songs.length);
    let nextSecondCard: number;

    do {
      nextSecondCard = Math.floor(Math.random() * songs.length);
    } while (nextSecondCard === nextFirstCard);

    set(() => ({
      firstCard,
      secondCard,
      nextFirstCard,
      nextSecondCard,
    }));
  },
}));
