import { useEffect } from "react";
import type { Song } from "../lib/data";
import { useSortingStore } from "../store/sortingStore";
import SongCard from "./SongCard";

const Load = () => (
  <svg
    role="img"
    aria-hidden="true"
    width="48"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="#e5e5e5"
    fill="none"
    className="animate-spin"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3a9 9 0 1 0 9 9" />
  </svg>
);

function Ranking({ songList }: { songList: Song[] }) {
  const { songs, sortedIndexes, setSongs } = useSortingStore();
  const hasHydrated = useSortingStore((state) => state._hasHydrated);

  useEffect(() => {
    useSortingStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (sortedIndexes.length === 0) return;
    if (!songs && songList) {
      setSongs(songList);
    }
    if (songs) {
      const sortedSongs = sortedIndexes[0].map((songIndex) => songs[songIndex]);
      setSongs(sortedSongs);
    }
  }, [songList, sortedIndexes]);

  if (!hasHydrated) {
    return (
      <div className="flex h-full items-center justify-center">
        <Load />
      </div>
    );
  }

  return (
    <div className="w-full grid lg:grid-cols-2 xl:grid-cols-6">
      {songs?.map(({ title, artist, country, audioUrl }, index) => (
        <SongCard
          key={index}
          position={index + 1}
          title={title}
          artist={artist}
          country={country}
          audioUrl={audioUrl}
        />
      ))}
    </div>
  );
}

export default Ranking;
