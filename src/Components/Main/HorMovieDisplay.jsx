export default function HorMovieDisplay({ movies,  }) {
    

    return (

        <div className="overflow-hidden w-full">

      <div
        ref={containerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map((movie) => (

          <div
            key={movie.id}
            className="flex-shrink-0 w-48 rounded-lg bg-zinc-800 p-2 text-white scroll-snap-align-start"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie[keys.poster]}`}
              alt={movie[keys.title]}
              className="w-full h-64 object-cover rounded"
            />

            <h3 className="mt-2 font-semibold truncate">{movie[keys.title]}</h3>

            <p className="text-gray-400 text-sm">
              {movie[keys.media] === 'tv' ? 'TV Show' : 'Movie'}
            </p>

            <p className="text-sm mt-auto text-right">{movie[keys.rating]}/10</p>

          </div>

        ))}
      </div>

    </div>
    )
}