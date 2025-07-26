import React from 'react';

export default function SearchPreview({ movies, value }) {
  const filteredMovies = movies
    .filter((movie) =>
      movie.original_title.toLowerCase().includes(value.toLowerCase())
    )
    .slice(0, 6);

  const hasResults = filteredMovies.length > 0;

  if (!hasResults) return null;

  const keys = {
  poster: 'poster_path',
  title: 'original_title',
  rating: 'vote_average',
  media: 'media_type',
  id: 'id',

};

return (
  <div className="bg-zinc-900 rounded-md shadow-lg inline-block p-2">

    {filteredMovies.map((movie) => (
      <div 
      key={movie.id} 
      style={{maxWidth:'100%'}}
      className="inline-flex items-start gap-2 p-2 hover:text-zinc-400">

        <img
          src={`https://image.tmdb.org/t/p/w200${movie[keys.poster]}`}
          alt={movie[keys.title]}
          className="w-12 h-16 object-cover rounded flex-shrink-0"
        />

         <div
          className="flex flex-col mt-2 gap-1"
          style={{ width: '24ch', minWidth: '24ch'}}>

           <p className="font-semibold leading-snug text-sm truncate">
             {movie.original_title}
           </p>

           <p className="text-gray-400 text-sm">
             {movie[keys.media] === 'tv' ? 'TV Show' : 'Movie'}
           </p>

           <p className="text-sm mt-auto text-right">
             {movie[keys.rating]}/10
           </p>

         </div>


      </div>
    ))}

    {/* Optional: full-width CTA button */}
    <div className="mt-2 text-center my-2">
      <button className="text-zinc-300 hover:text-zinc-100 text-sm">
        See more like this
      </button>
    </div>

  </div>
);
}