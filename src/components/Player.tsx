import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef, useState } from "react";

function Player() {
  const { isPlaying, setIsPlaying } = usePlayerStore((state) => state);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (currentTrack) {
      audioRef.current.src = currentTrack;
      audioRef.current.play();
    }
  }, [currentTrack]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button
        className="bg-white text-black rounded-full p-2"
        onClick={handleClick}
      >
        {isPlaying ? "II" : "D"}
      </button>
      <audio ref={audioRef} />
    </div>
  );
}

export default Player;
