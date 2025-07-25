import React, { useState } from 'react';   


export default function SearchPreview({movies, value}) {

  // Filter top 6 matches based on query
  const filteredMovies = movies
  .filter((movie) =>
    movie.original_title
      .toLowerCase()
      .includes(value.toLowerCase())
  )
  .slice(0, 6);

return (
  <div classname="absolute top-full bg-zinc-900 rounded-md drop-shadow-black z-10 grid grid-cols-3 grid-rows-2 gap-2 p-2 w-auto">
    {movie && (
      <div>
        {filteredMovies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.original_title}
            className="w-16 h-24 object-cover"
          />
        ))}
      </div>
    )}
  </div>
);
}