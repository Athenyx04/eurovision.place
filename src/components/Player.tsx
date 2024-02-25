import { usePlayerStore } from "../store/playerStore";
import { useEffect, useRef } from "react";

function Player() {
  const { isPlaying, currentTrack, setIsPlaying, setIsLoading } =
    usePlayerStore((state) => state);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleLoaded = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      if (!audioRef.current) return;
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.addEventListener("playing", handleLoaded);
    return () => {
      if (!audioRef.current) return;
      audioRef.current.removeEventListener("playing", handleLoaded);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      if (audioRef.current.currentTime > 0) {
        audioRef.current.play();
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (currentTrack) {
      audioRef.current.src = currentTrack;
      audioRef.current.play();
    }
  }, [currentTrack]);

  return <audio ref={audioRef} />;
}

export default Player;
