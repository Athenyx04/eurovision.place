import { useEffect } from "react";
import type { Song } from "../lib/data";
import { useSortingStore } from "../store/sortingStore";
import SongCard from "./SongCard";

function Ranking({ songList }: { songList: Song[] }) {
  const { songs, sortedIndexes, setSongs } = useSortingStore();

  useEffect(() => {
    if (sortedIndexes.length === 0) {
      if (songList && songs.length === 0) {
        setSongs(songList);
      }
    } else {
      const sortedSongs = sortedIndexes[0].map((songIndex) => songs[songIndex]);
      setSongs(sortedSongs);
    }
  }, [songList]);

  if (songs.length === 0) {
    return null;
  }

  return (
    <div className="w-full grid lg:grid-cols-2 xl:grid-cols-3">
      {songs.map(({ title, artist, country, audioUrl }, index) => (
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
