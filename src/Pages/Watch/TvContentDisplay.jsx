import { Link } from 'react-router-dom'

export default function TvContentDisplay({ seasonContent, id, episodeNumber }) {

  // Return message if no episodes
  if (!seasonContent || !seasonContent.episodes?.length) {
    return <div className="text-zinc-400">No episodes available.</div>;
  }

  const seasonNumber = seasonContent?.season_number;

  return (
    <div className="grid grid-cols-6 gap-3 w-full">

      {/* Map through episodes */}
      {seasonContent.episodes.map((ep) => (
        <Link 
          to={`/watch/tv/${id}?season=${seasonNumber}&episode=${ep.episode_number}`}
          key={ep.episode_number}
          title={ep.name}
          className={`
            px-4 py-2 
            rounded-3xl 
            cursor-pointer
            transition-colors duration-200
            overflow-hidden whitespace-nowrap text-ellipsis
            ${episodeNumber === ep.episode_number
              ? "bg-red-950 text-zinc-300 hover:bg-zinc-300 hover:text-red-950 cursor-default active:bg-zinc-200 active:text-red-900"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 active:bg-zinc-700 active:text-zinc-300"}
          `}
        >
          <span className="font-semibold">Ep {ep.episode_number}:</span>{" "}
          {ep.name}
        </Link>
      ))}

    </div>
  );
}
