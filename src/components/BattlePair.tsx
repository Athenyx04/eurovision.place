import type { Song } from "../lib/data";
import SongCard from "./SongCard";
import { useDisplayStore } from "../store/displayStore";

function BattlePair({ songs }: { songs: Song[] }) {
  const { firstCard, secondCard, updateIndexes } = useDisplayStore();
  const displaySongs = [songs[firstCard], songs[secondCard]];

  function handleVote() {
    console.log("Votaste por una canción");
    updateIndexes(songs);
  }

  return (
    <div className="flex grow flex-col sm:flex-row">
      {displaySongs.map(({ id, title, artist, country, audioUrl }) => (
        <SongCard
          key={id}
          title={title}
          artist={artist}
          country={country}
          audioUrl={audioUrl}
          onVote={handleVote}
        />
      ))}
    </div>
  );
}

export default BattlePair;
