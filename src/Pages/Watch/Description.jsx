import { Keys } from '../../Components/Keys';
import { GenreMap } from '../../Components/GenreMap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Description({ content, isLoading, seasonContent, selectedSeason }) {
  const [loaded, setLoaded] = useState(false);
  const [crewExpanded, setCrewExpanded] = useState(false);

  const { API1, API2 } = Keys;
  const { details: details1 } = API1;
  const { details: details2 } = API2;

  const { tmdb, omdb, title } = content || {};

  // Determine media type
  const mediaType = tmdb?.[details1.title] ? 'movie' : 'tv';

  // Helper function to get genre ID from genre name
  const getGenreIdFromName = (genreName) => {
    // First try exact match
    const exactMatch = Object.entries(GenreMap).find(([id, name]) => name === genreName);
    if (exactMatch) return exactMatch[0];
    
    // If no exact match, try to find partial matches for compound genres like "Action & Adventure"
    const words = genreName.split(/\s*&\s*|\s*,\s*|\s+/); // Split on &, comma, or spaces
    
    for (const word of words) {
      const partialMatch = Object.entries(GenreMap).find(([id, name]) => 
        name.toLowerCase() === word.toLowerCase().trim()
      );
      if (partialMatch) return partialMatch[0];
    }
    
    return null;
  };

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

  // Cast with roles (from TMDB only, since OMDB doesn't have roles)
  const castWithRoles = tmdb?.credits?.cast 
    ? tmdb.credits.cast.filter(c => c.character && c.character.trim() !== '').slice(0, 10)
    : [];

    if(tmdb?.credits) {
      console.log('cast', tmdb.credits);
    }

  // Crew organized by departments
  const crewByDepartment = tmdb?.credits?.crew
    ? tmdb.credits.crew.reduce((acc, crewMember) => {
        const dept = crewMember.known_for_department || 'Other';
        if (!acc[dept]) {
          acc[dept] = [];
        }
        acc[dept].push({
          name: crewMember.name,
          job: crewMember.job
        });
        return acc;
      }, {})
    : {};

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
                  <div className="text-sm text-zinc-400 flex-1">
                    {countries.map((country, index) => (
                      <span key={index}>
                        <Link
                          to={`/${mediaType}?countries=${country}&match=any`}
                          className="text-zinc-400 hover:text-zinc-200 hover:underline transition-colors duration-200 cursor-pointer"
                        >
                          {country}
                        </Link>
                        {index < countries.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
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
                  <div className="text-sm text-zinc-400 flex-1">
                    {genres.map((genre, index) => {
                      const genreId = getGenreIdFromName(genre);
                      return (
                        <span key={index}>
                          {genreId ? (
                            <Link
                              to={`/${mediaType}?genres=${genreId}&match=any`}
                              className="text-zinc-400 hover:text-zinc-200 hover:underline transition-colors duration-200 cursor-pointer"
                            >
                              {genre}
                            </Link>
                          ) : (
                            <span>{genre}</span>
                          )}
                          {index < genres.length - 1 && ', '}
                        </span>
                      );
                    })}
                  </div>
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
                  <div className="text-sm text-zinc-400 flex-1">
                    <Link
                      to={`/${mediaType}?years=${release}&match=any`}
                      className="text-zinc-400 hover:text-zinc-200 hover:underline transition-colors duration-200 cursor-pointer"
                    >
                      {release}
                    </Link>
                  </div>
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
                  <div className="flex-1">
                    {castWithRoles.length > 0 ? (
                      <div className="space-y-1">
                        {castWithRoles.map((actor, index) => (
                          <div key={index} className="text-sm text-zinc-400">
                            <span className="text-zinc-300">{actor.name}</span> as <span className="text-zinc-500">{actor.character}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-zinc-400">{cast.slice(0,10).join(', ')}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Crew Section */}
          {Object.keys(crewByDepartment).length > 0 && (
            <div className="flex space-x-4">
              {isLoading ? (
                <>
                  <div className="h-4 w-28 bg-zinc-700 rounded animate-pulseSlow"></div>
                  <div className="h-4 w-5/6 bg-zinc-700 rounded animate-pulseSlow"></div>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-zinc-300 w-28">Crew:</span>
                  <div className="flex-1">
                    <button
                      onClick={() => setCrewExpanded(!crewExpanded)}
                      className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <span>{crewExpanded ? 'Hide crew' : `Show crew (${Object.keys(crewByDepartment).length} departments)`}</span>
                      <span className={`transform transition-transform duration-200 ${crewExpanded ? 'rotate-180' : ''}`}>
                        ↓
                      </span>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      crewExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="mt-3 space-y-4">
                        {Object.entries(crewByDepartment).map(([department, crew]) => (
                          <div key={department} className="space-y-1">
                            <h4 className="text-sm font-semibold text-zinc-300 border-b border-zinc-700 pb-1">
                              {department} ({crew.length})
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 pl-2">
                              {crew.map((member, index) => (
                                <div key={index} className="text-xs text-zinc-400">
                                  <span className="text-zinc-300">{member.name}</span> - <span className="text-zinc-500">{member.job}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
