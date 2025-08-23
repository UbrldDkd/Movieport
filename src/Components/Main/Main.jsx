import HeroCarousel from './HeroCarousel.jsx';
import MovieDisplayX from './MovieDisplays/MovieDisplayX.jsx';
import MovieDisplayBlock from './MovieDisplays/MovieDisplayBlock.jsx';
import Footer from '../Footer/Footer.jsx';
import { useState, useEffect } from 'react';
import { Keys } from '../Keys.js';


export default function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toShow, setToShow] = useState('Movies')
  const [movies, setMovies] = useState({
  popular: [],
  nowPlaying: [],
  topRated: [],
  discover: [],
  });
  const [tvShows, setTvShows] = useState({
  popular:[]
  })

  
  useEffect(() => {
  async function fetchData() {
    setIsLoading(true);
    setError(null);

    try {
      const { API1 } = Keys;
      const { Url , API_KEY , topics } = API1;

      const [popularMovieRes, nowPlayingMovieRes, topRatedMovieRes, popularTvShowsRes, discoverMoviesRes] = await Promise.all([
        fetch(`${Url}${topics.movies.popular}${API_KEY}`),
        fetch(`${Url}${topics.movies.nowPlaying}${API_KEY}`),
        fetch(`${Url}${topics.movies.topRated}${API_KEY}`),
        fetch(`${Url}${topics.tv.popular}${API_KEY}`),
        fetch(`${Url}${topics.movies.discover}${API_KEY}`),

      ]);

      if (!popularMovieRes.ok || !nowPlayingMovieRes.ok || !topRatedMovieRes.ok || !popularTvShowsRes.ok || !discoverMoviesRes.ok)  {
        throw new Error('Failed to load one or more movie categories');
      }

      const [popularMovieData, nowPlayingMovieData, topRatedMovieData, popularTvShowsData, discoverMoviesData] = await Promise.all([
        popularMovieRes.json(),
        nowPlayingMovieRes.json(),
        topRatedMovieRes.json(),
        popularTvShowsRes.json(),
        discoverMoviesRes.json()

      ]);


      setMovies({
        popular: popularMovieData.results,
        nowPlaying: nowPlayingMovieData.results,
        topRated: topRatedMovieData.results,
        discover: discoverMoviesData.results
      });
      setTvShows({
        popular: popularTvShowsData.results
      })
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  fetchData();
}, []);



  return (
    <div className="bg-zinc-950 pt-5 relative overflox-x-hidden overflow-y-auto">

      <HeroCarousel movies={movies.popular} isLoading={isLoading} error={error}/>

      <div className="flex items-center mx-15 mt-25 mb-10 space-x-4">

        
        <h2 className="cursor-pointer text-zinc-200 text-3xl font-light flex-shrink-0">
          Whats your Poison?
        </h2>

     <button onClick={()=> setToShow('Movies')} className="cursor-pointer bg-zinc-800 hover:bg-zinc-300 hover:to-zinc-300 hover:text-red-950 text-zinc-300 text-base font-semibold transition-colors duration-300 px-3 py-2 rounded-l-4xl">
          Movies
     </button>



      <button onClick={()=> setToShow('TV-Shows')} className=" cursor-pointer bg-red-950 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-950 px-4 py-2 font-base text-base rounded-e-4xl transition-colors duration-300">
            TV-shows
      </button>
  
      </div>

      <div className="w-full mx-auto px-7 items-center">
        {/* implement something to show tvshows and movies */}
        {toShow=== 'Movies'?
        <MovieDisplayX fullContent={movies.popular} toDisplay={16} />:
        <MovieDisplayX fullContent={tvShows.popular} toDisplay={16} />
        }

        <h2 className="text-zinc-200 text-3xl mt-7 font-light flex-shrink-0 cursor-pointer">
          Now Playing
        </h2>
        <MovieDisplayBlock fullContent={movies.nowPlaying} toDisplay={16}/>

        <h2 className="text-zinc-200 text-3xl font-light flex-shrink-0 cursor-pointer">
          Top Rated
        </h2>

        <MovieDisplayBlock fullContent={movies.topRated} toDisplay={16}/>

      </div>

      <Footer />
    
    </div>
  );
}



