import type { Artist, Country } from "../lib/data";
import PlayPauseButton from "./PlayPauseButton";

interface Props {
  artist: Artist;
  title: string;
  country: Country;
  audioUrl: string;
  onVote?: () => void;
}

const SongCard = ({ artist, title, country, audioUrl, onVote }: Props) => {
  return (
    <div
      className="w-full h-1/2 sm:w-1/2 sm:h-full flex grow flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${artist.imageUrl})` }}
    >
      <div className="flex grow select-none p-4 bg-black/40 hover:bg-black/60 transition-all">
        <div
          onClick={onVote}
          className="flex flex-col grow px-2 justify-center"
        >
          <h1 className="text-2xl tracking-tight font-extrabold">{title}</h1>
          <p className="text-lg font-light">{artist.name}</p>
          <p className="text-sm flex items-center font-semibold gap-2">
            <span className={`fi fi-${country.code.toLowerCase()} w-6 h-6`} />
            {country.name}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <PlayPauseButton src={audioUrl} />
        </div>
      </div>
    </div>
  );
};

export default SongCard;
