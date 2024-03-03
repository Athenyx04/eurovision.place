import { useEffect } from "react";
import SongScreen from "./SongScreen";
import type { Song } from "../lib/data";
import { usePlayerStore } from "../store/playerStore";
import { useSortingStore } from "../store/sortingStore";

function BattlePair({ songList }: { songList: Song[] }) {
  const {
    songs,
    sortedIndexes,
    currentComparisonLeft,
    currentComparisonRight,
    comparisonHeadLeft,
    comparisonHeadRight,
    finishFlag,
    setSongs,
    initList,
    sortList,
  } = useSortingStore();

  const { setIsPlaying } = usePlayerStore();

  useEffect(() => {
    if (songList && songs.length === 0) {
      setSongs(songList);
      initList(songList);
    }
  }, [songList]);

  const firstCardIndex =
    sortedIndexes[currentComparisonLeft]?.[comparisonHeadLeft];
  const secondCardIndex =
    sortedIndexes[currentComparisonRight]?.[comparisonHeadRight];

  const firstCard = songs[firstCardIndex];
  const secondCard = songs[secondCardIndex];

  function handleVote(flag: boolean) {
    setIsPlaying(false);
    sortList(flag);
  }

  if (songs.length === 0) {
    return null;
  }

  if (finishFlag) {
    // Redirect to the ranking page for now
    window.location.href = "/ranking";
  }

  if (!firstCard || !secondCard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex grow flex-col sm:flex-row">
      <SongScreen
        key={firstCard.id}
        title={firstCard.title}
        artist={firstCard.artist}
        country={firstCard.country}
        audioUrl={firstCard.audioUrl}
        onVote={() => handleVote(false)}
      />
      <SongScreen
        key={secondCard.id}
        title={secondCard.title}
        artist={secondCard.artist}
        country={secondCard.country}
        audioUrl={secondCard.audioUrl}
        onVote={() => handleVote(true)}
      />
    </div>
  );
}

export default BattlePair;
