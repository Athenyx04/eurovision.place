import type { Artist, Country } from "../lib/data";
import PlayPauseButton from "./PlayPauseButton";

interface Props {
  position: number;
  title: string;
  artist: Artist;
  country: Country;
  audioUrl: string;
}

function SongCard({ position, title, artist, country, audioUrl }: Props) {
  return (
    <div
      className={`w-full flex border-b-2 border-x-2 border-black ${
        position === 1
          ? "bg-yellow-200 text-black lg:col-span-2 xl:col-span-3"
          : position === 2
          ? "bg-gray-400 lg:col-span-2 xl:col-span-3"
          : position === 3
          ? "bg-orange-900 lg:col-span-2 xl:col-span-3"
          : ""
      }`}
    >
      <div
        className={`relative ${
          position === 1
            ? "w-1/5 sm:w-1/6 md:w-1/12"
            : position === 2
            ? "w-1/5 sm:w-1/6 md:w-1/12"
            : position === 3
            ? "w-1/5 sm:w-1/6 md:w-1/12"
            : "w-1/5 sm:w-1/6 md:w-1/12 lg:w-1/6 xl:w-1/5"
        }`}
      >
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={artist.imageUrl}
          alt={artist.name}
        />
        <div className="pb-[100%}"></div>
      </div>
      <div className="flex w-8 h-8 bg-[#5365a6] justify-center items-center self-center rounded-full -translate-x-4">
        <span className="font-bold text-slate-200">
          {String(position).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="w-7 h-full flex items-center">
          <span
            className={`fi fi-${country.code.toLowerCase()} w-7 h-7 rounded-full`}
          />
        </div>
        <div className="flex flex-col p-2">
          <span className="font-bold">{country.name.toUpperCase()}</span>
          <span className="font-light text-sm max-w-40 sm:max-w-56 xl:max-w-40">
            {title}
          </span>
          <span className="font-light text-sm">{artist.name}</span>
        </div>
      </div>
      <div className="ml-auto mr-4 flex items-center justify-center">
        <PlayPauseButton src={audioUrl} />
      </div>
    </div>
  );
}

export default SongCard;
