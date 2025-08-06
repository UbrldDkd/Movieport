import { Keys } from '../../Keys.js';

export default function MovieCard({ content }) {
  return (
    <div className="flex-shrink-0 w-[166px] text-zinc-300  hover:text-zinc-400 transition-colors duration-300">

      <img
        src={`https://image.tmdb.org/t/p/original/${content[Keys.details.poster]}`}
        alt={content[Keys.details.title]}
        className="object-cover rounded max-w-[170px] h-auto select-none cursor-pointer"
      />

      <h3 className="mt-2 font-base truncate select-none cursor-pointer text-sm">
        {content[Keys.details.title] || content[Keys.details.titleTv]}
      </h3> 

      <div className="mt-1 text-sm space-y-1">
        
        <div className="flex gap-4 text-gray-500 hover:text-zinc 600">
          
          <p>
            {content[Keys.details.releaseDate].slice(0, 4) || content[Keys.details.releaseDateTv].slice(0, 4)}
          </p>

       {/* 
          <p>
          {content[Keys.details.runtime]}m
          </p> */}

        </div>
        
          <p className="text-zinc-400 select-none cursor-pointer hover:text-zinc-500 transition-colors duration-300">
          {content[Keys.details.media] === 'tv' ? 'TV Show' : 'Movie'}
          </p>
        <p className="text-zinc-300 select-none cursor-pointer text-right pr-1">{content[Keys.details.rating]}/10</p>
      </div>
    </div>
  );
}
