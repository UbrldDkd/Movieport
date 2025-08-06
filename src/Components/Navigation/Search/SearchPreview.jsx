import React from 'react';
import { Keys } from '../../Keys.js';
import { Link } from 'react-router-dom';

export default function SearchPreview({ movies, value, onSelect, isLoading, error }) {
  const filteredMovies = movies
    .filter((movie) =>
      movie[Keys.details.title]?.toLowerCase().includes(value.toLowerCase())
    )
    .slice(0, 6);

  const hasResults = filteredMovies.length > 0;

  if (!hasResults) return null;


  if (isLoading) {
  return (
    <div className="w-full h-[85vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-solid" />
    </div>
  );
}

if (error) {
  return (
    <div className="w-full h-[85vh] flex items-center justify-center text-red-500 font-semibold text-lg">
      Something went wrong: {error.message || 'Unknown error'}
    </div>
  );
}

  

return (
  <div className="bg-zinc-900 rounded-md shadow-lg inline-block p-2">

    {filteredMovies.map((movie) => (

        <Link 
        key={movie[Keys.details.id]} 
        to={`/ViewPanel/${movie[Keys.details.id]}`} 
        className='block'
        onClick={onSelect}
        >

      <div  
      style={{maxWidth:'100%'}}
      className="inline-flex items-start gap-2 p-2 hover:text-zinc-300">

        <img
          src={`https://image.tmdb.org/t/p/w200${movie[Keys.details.poster]}`}
          alt={movie[Keys.details.title] || movie[Keys.details.titleTv]}
          className="w-12 h-16 object-cover rounded flex-shrink-0"
        />

         <div
          className="flex flex-col mt-2 gap-1"
          style={{ width: '24ch', minWidth: '24ch'}}>

           <p className="font-semibold text-zinc-300 leading-snug text-sm truncate">
             {movie[Keys.details.title] || movie[Keys.details.titleTv]}
           </p>

           <p className="text-zinc-400 text-sm">
             {movie[Keys.details.media] === 'tv' ? 'TV Show' : 'Movie'}
           </p>

           <p className="text-sm text-zinc-300 mt-auto text-right">
             {movie[Keys.details.rating]}/10
           </p>

         </div>


      </div>
      </Link>
    ))}


    <div className="mt-2 text-center my-2">
      <button className="text-zinc-300 hover:text-zinc-100 text-sm">
        See more like this
      </button>
    </div>

  </div>
);
}