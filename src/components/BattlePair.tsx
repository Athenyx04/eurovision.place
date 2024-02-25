import type { Song } from "../lib/data";
import SongCard from "./SongCard";
import { useDisplayStore } from "../store/displayStore";

function BattlePair({ songs }: { songs: Song[] }) {
  const state = useDisplayStore();
  const {
    firstCard,
    secondCard,
    nextFirstCard,
    nextSecondCard,
    updateIndexes,
  } = state;

  const displaySongs = [songs[firstCard], songs[secondCard]];
  const nextSongs = [songs[nextFirstCard], songs[nextSecondCard]];

  function handleVote() {
    updateIndexes(state, songs);
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
      {nextSongs.map(({ id, artist }) => (
        <img key={id} src={artist.imageUrl} className="hidden" />
      ))}
    </div>
  );
}

export default BattlePair;
