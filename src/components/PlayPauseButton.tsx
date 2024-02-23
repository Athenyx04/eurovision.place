import { usePlayerStore } from "../store/playerStore";

const Play = () => (
  <svg role="img" aria-hidden="true" width="16" viewBox="0 0 16 16">
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

const Pause = () => (
  <svg role="img" aria-hidden="true" width="16" viewBox="0 0 16 16">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

const Load = () => (
  <svg
    role="img"
    aria-hidden="true"
    width="16"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="#000000"
    fill="none"
    className="animate-spin"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3a9 9 0 1 0 9 9" />
  </svg>
);

function PlayPauseButton({ src }: { src: string }) {
  const {
    isPlaying,
    isLoading,
    currentTrack,
    setIsPlaying,
    setIsLoading,
    setCurrentTrack,
  } = usePlayerStore((state) => state);

  const isPlayingThisTrack = isPlaying && currentTrack === src;

  const handleClick = () => {
    if (isPlayingThisTrack) {
      setIsPlaying(false);
      return;
    }
    setCurrentTrack(src);
    setIsLoading(true);
    setIsPlaying(true);
  };

  return (
    <div>
      <button
        aria-label={isPlayingThisTrack ? "Pause" : "Play"}
        className="bg-gray-200 hover:scale-105 text-white p-4 rounded-full"
        onClick={handleClick}
      >
        {isPlayingThisTrack ? isLoading ? <Load /> : <Pause /> : <Play />}
      </button>
    </div>
  );
}

export default PlayPauseButton;
