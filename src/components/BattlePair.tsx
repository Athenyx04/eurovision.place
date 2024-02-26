import { useEffect } from "react";
import SongCard from "./SongCard";
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
    return (
      <div className="flex grow flex-col justify-center items-center">
        <div className="text-l font-bold">Finished! The final order is:</div>
        <div className="text-center p-2">
          {sortedIndexes.map((segment, index) => (
            <div key={index}>
              {segment.map((songIndex) => (
                <div key={songIndex} className="p-0.5">
                  {songs[songIndex].country.name} / {songs[songIndex].title} -{" "}
                  {songs[songIndex].artist.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!firstCard || !secondCard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex grow flex-col sm:flex-row">
      <SongCard
        key={firstCard.id}
        title={firstCard.title}
        artist={firstCard.artist}
        country={firstCard.country}
        audioUrl={firstCard.audioUrl}
        onVote={() => handleVote(false)}
      />
      <SongCard
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
