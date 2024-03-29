import type { EntryDetails } from '../lib/data'
import LeaderboardCard from './LeaderboardCard'

type LeaderboardSongListProps = {
  songs: EntryDetails[]
}

const LeaderboardSongList: React.FC<LeaderboardSongListProps> = ({ songs }) => {
  return (
    <div className={'grid w-full md:grid-cols-2 xl:grid-cols-6'}>
      {songs.map((song, index) => (
        <LeaderboardCard entry={song} position={index + 1} key={song.id} />
      ))}
    </div>
  )
}

export default LeaderboardSongList
