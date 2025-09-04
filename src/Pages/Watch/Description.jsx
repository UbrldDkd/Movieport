import { Keys } from '../../Components/Keys';
import { GenreMap } from '../../Components/GenreMap';
import { useState, useEffect } from 'react';

export default function Description({ content, isLoading, seasonContent, selectedSeason }) {
  const [loaded, setLoaded] = useState(false);

  const { API1, API2 } = Keys;
  const { details: details1 } = API1;
  const { details: details2 } = API2;

  const { tmdb, omdb, title } = content || {};

  // Determine media type
  const mediaType = tmdb?.[details1.title] ? 'movie' : 'tv';

  // Genres
  const genres =
    tmdb?.[details1.genreNames]?.map(g => g.name) ||
    (omdb?.[details2.genre] && omdb[details2.genre] !== "N/A"
      ? omdb[details2.genre].split(',').map(g => g.trim())
      : []);

  // Directors
  const directors =
    tmdb?.credits?.crew?.filter(c => c.known_for_department === "Directing").map(c => c.name) ||
    (omdb?.[details2.director] && omdb[details2.director] !== "N/A"
      ? omdb[details2.director].split(",").map(g => g.trim())
      : []);

  // Writers
  const writers = tmdb?.credits?.crew
    ?.filter(c => c.known_for_department === "Writing")
    .map(c => c.name)
    ? [...new Set(tmdb.credits.crew
        .filter(c => c.known_for_department === "Writing")
        .map(c => c.name))]
    : omdb?.[details2.writer] && omdb[details2.writer] !== "N/A"
      ? [...new Set(omdb[details2.writer].split(",").map(w => w.trim()))]
      : [];

  // Cast
  const cast = tmdb?.credits?.cast
    ? [...new Set(tmdb.credits.cast.map(c => c.name))]
    : omdb?.[details2.cast] && omdb[details2.cast] !== "N/A"
      ? [...new Set(omdb[details2.cast].split(",").map(c => c.trim()))]
      : [];

  // Countries
  const countries =
    tmdb?.[details1.country]?.map(c => c.name) ||
    (omdb?.[details2.country] && omdb[details2.country] !== "N/A"
      ? omdb[details2.country].split(",").map(c => c.trim())
      : []);

  // Release year
  const release = mediaType === "movie"
    ? (tmdb?.[details1.releaseDate]?.split("-")[0] ||
       (omdb?.[details2.release] && omdb[details2.release] !== "N/A" ? omdb[details2.release] : null))
    : tmdb?.[details1.releaseDateTv]?.split("-")[0] || null;

  // Ratings
  const ratings = omdb?.[details2.ratings]?.length
    ? omdb[details2.ratings]
    : tmdb
      ? [{ Source: 'TMDb', Value: `${tmdb.vote_average} / 10 (${tmdb.vote_count} votes)` }]
      : [];

  // Runtime
  const runtime = mediaType === 'movie'
    ? tmdb?.[details1.runtime] + 'm' || omdb?.[details2.runtime + 'm']
    : tmdb?.[details1.episodeRuntime + 'm']?.[0] || '';

  // Poster URL
  const displayPosterUrl = !isLoading
    ? mediaType === "movie" || selectedSeason === null
      ? tmdb?.[details1.poster]
        ? `https://image.tmdb.org/t/p/original${tmdb[details1.poster]}`
        : omdb?.[details2.poster] && omdb[details2.poster] !== "N/A"
          ? omdb[details2.poster]
          : null
      : seasonContent?.[details1.poster]
        ? `https://image.tmdb.org/t/p/original${seasonContent[details1.poster]}`
        : tmdb?.[details1.poster]
          ? `https://image.tmdb.org/t/p/original${tmdb[details1.poster]}`
          : null
    : null;

  // Preload poster
  useEffect(() => {
    setLoaded(false);

    if (!displayPosterUrl) return;

    const img = new Image();
    img.src = displayPosterUrl;
    img.onload = () => setLoaded(true);

    return () => { img.onload = null };
  }, [displayPosterUrl]);

  return (
    <div className="flex flex-col md:flex-row md:space-x-8 py-4">

      {/* Poster section - hidden on mobile */}
      <div className="hidden md:block">
        <div className="w-[250px] h-[370px] rounded-xl flex items-center justify-center relative bg-zinc-900">

          {/* Loading GIF */}
          <img
            src="/assets/lightHouse.gif"
            alt="Loading..."
            className={`w-[220px] h-[220px] object-contain animate-pulse transition-opacity duration-200
                       ${isLoading ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Poster */}
          <img
            src={displayPosterUrl}
            alt={isLoading ? '' : title}
            className={`w-[250px] h-[370px] rounded-xl object-cover absolute transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
          />

        </div>
      </div>

      {/* Details section */}
      <div className="text-sm space-y-2 flex flex-col">

        {/* Title */}
        {isLoading ? (
          <div className="w-80 h-10 bg-zinc-800 rounded-md animate-pulse" />
        ) : (
          <div style={{ fontSize: '37px' }} className="font-semibold text-zinc-300 transition-opacity duration-500 opacity-100">
            {title}
          </div>
        )}

        {/* Ratings */}
        {isLoading ? (
          <div className="flex space-x-4">
            <div className="h-3 w-14 bg-zinc-700 rounded-full animate-pulse"></div>
            <div className="h-3 w-17 bg-zinc-700 rounded-full animate-pulse"></div>
            <div className="h-3 w-11 bg-zinc-700 rounded-full animate-pulse"></div>
            <div className="h-3 w-2 bg-gradient-to-b from-zinc-950 via-red-950 to-zinc-950 rounded-full animate-pulse"></div>
            <div className="h-3 w-8 bg-zinc-700 rounded-full animate-pulse"></div>
          </div>
        ) : (
          <div className='flex text-xs space-x-3 font-normal mb-7'>
            {ratings.map((r) => {
              const source =
                r.Source === 'Internet Movie Database' ? 'IMDB' :
                r.Source === 'Rotten Tomatoes' ? 'RT' :
                r.Source === 'Metacritic' ? 'M' :
                r.Source; // fallback for TMDb

              return (
                <p key={r.Source} className="flex items-center font-semibold text-xs space-x-2">
                  <span>
                    <span className='text-zinc-200'>{source}</span>: {r.Value}
                  </span>
                </p>
              );
            })}

            <div className={`h-full w-0.5 bg-gradient-to-t from-zinc-950 via-red-950 to-zinc-950${runtime ? 'opacity-100' : 'opacity-0' }`}/>
            <p>{runtime}</p>
          </div>
        )}

        {/* Overview */}
        <div className='mb-4'>
          {isLoading ? (
            <div className="space-y-2 mt-10">
              <div className="h-4 w-full bg-zinc-700 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-zinc-700 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-zinc-700 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-zinc-700 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-zinc-700 rounded animate-pulse"></div>
            </div>
          ) : (
            <p style={{ lineHeight: 1.6, fontSize: '16px' }} className="text-zinc-400 text-sm">
              {tmdb?.[details1.overview] || omdb?.[details2.overview]}
            </p>
          )}
        </div>

        {/* Additional Details */}
        <div className="flex flex-col space-y-4 w-full">

          {/* Countries */}
          {countries.length > 0 && (
            <div className="flex space-x-4">
              {isLoading ? (
                <>
                  <div className="h-4 w-28 bg-zinc-700 rounded animate-pulseSlow"></div>
                  <div className="h-4 w-3/4 bg-zinc-700 rounded animate-pulseSlow"></div>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-zinc-300 w-28">
                    {countries.length > 1 ? 'Countries' : 'Country'}:
                  </span>
                  <span className="text-sm text-zinc-400 flex-1">{countries.join(', ')}</span>
                </>
              )}
            </div>
          )}

          {/* Genres */}
          {genres.length > 0 && (
            <div className="flex space-x-4">
              {isLoading ? (
                <>
                  <div className="h-4 w-28 bg-zinc-700 rounded animate-pulseSlow"></div>
                  <div className="h-4 w-2/3 bg-zinc-700 rounded animate-pulseSlow"></div>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-zinc-300 w-28">
                    {genres.length > 1 ? 'Genres' : 'Genre'}:
                  </span>
                  <span className="text-sm text-zinc-400 flex-1">{genres.join(', ')}</span>
                </>
              )}
            </div>
          )}

          {/* Release */}
          {release && (
            <div className="flex space-x-4">
              {isLoading ? (
                <>
                  <div className="h-4 w-28 bg-zinc-700 rounded animate-pulseSlow"></div>
                  <div className="h-4 w-1/2 bg-zinc-700 rounded animate-pulseSlow"></div>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-zinc-300 w-28">Release:</span>
                  <span className="text-sm text-zinc-400 flex-1">{release}</span>
                </>
              )}
            </div>
          )}

          {/* Writers */}
          {writers.length > 0 && (
            <div className="flex space-x-4">
              {isLoading ? (
                <>
                  <div className="h-4 w-28 bg-zinc-700 rounded animate-pulseSlow"></div>
                  <div className="h-4 w-4/6 bg-zinc-700 rounded animate-pulseSlow"></div>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-zinc-300 w-28">{writers.length > 1 ? 'Writers' : 'Writer'}:</span>
                  <span className="text-sm text-zinc-400 flex-1">{writers.slice(0,10).join(', ')}</span>
                </>
              )}
            </div>
          )}

          {/* Directors */}
          {directors.length > 0 && mediaType === 'movie' && (
            <div className="flex space-x-4">
              {isLoading ? (
                <>
                  <div className="h-4 w-28 bg-zinc-700 rounded animate-pulseSlow"></div>
                  <div className="h-4 w-1/3 bg-zinc-700 rounded animate-pulseSlow"></div>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-zinc-300 w-28">{directors.length > 1 ? 'Directors' : 'Director'}:</span>
                  <span className="text-sm text-zinc-400 flex-1">{directors.slice(0,10).join(', ')}</span>
                </>
              )}
            </div>
          )}

          {/* Cast */}
          {cast.length > 0 && (
            <div className="flex space-x-4">
              {isLoading ? (
                <>
                  <div className="h-4 w-28 bg-zinc-700 rounded animate-pulseSlow"></div>
                  <div className="h-4 w-5/6 bg-zinc-700 rounded animate-pulseSlow"></div>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-zinc-300 w-28">Cast:</span>
                  <span className="text-sm text-zinc-400 flex-1">{cast.slice(0,10).join(', ')}</span>
                </>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
