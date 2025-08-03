import HeroCarousel from './HeroCarousel.jsx';
import MovieDisplayX from './MovieDisplays/MovieDisplayX.jsx';
import MovieDisplayBlock from './MovieDisplays/MovieDisplayBlock.jsx';
import { useState, useEffect } from 'react'

export default function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toShow, setToShow] = useState('Movies')
  const [movies, setMovies] = useState({
  popular: [],
  nowPlaying: [],
  topRated: [],
  all: [],
  new : []
  });
  const [tvShows, setTvShows] = useState({
  popular:[]
  })
  
  const API_KEY= '9b9e45ca6c5942221d22ecc70fa062fc'

  useEffect(() => {
  async function fetchData() {
    setIsLoading(true);
    setError(null);

    try {
      const [popularMovieRes, nowPlayingMovieRes, topRatedMovieRes, popularTvShowsRes, allMoviesRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1`)
      ]);

      if (!popularMovieRes.ok || !nowPlayingMovieRes.ok || !topRatedMovieRes.ok || !popularTvShowsRes.ok || !allMoviesRes.ok)  {
        throw new Error('Failed to load one or more movie categories');
      }

      const [popularMovieData, nowPlayingMovieData, topRatedMovieData, popularTvShowsData, allMoviesData] = await Promise.all([
        popularMovieRes.json(),
        nowPlayingMovieRes.json(),
        topRatedMovieRes.json(),
        popularTvShowsRes.json(),
        allMoviesRes.json()

      ]);

      // Now you have all three arrays of movies:
      setMovies({
        popular: popularMovieData.results,
        nowPlaying: nowPlayingMovieData.results,
        topRated: topRatedMovieData.results,
        all: allMoviesData.results
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
    <div className="bg-zinc-950 pt-5 relative">
      
      {!isLoading && !error && (
        <div className="max-w-screen-xl mx-auto px-4">
          <HeroCarousel movies={movies.popular} />
        </div>
      )}
      
      <div className="flex items-center mx-15 mt-25 mb-10 space-x-4">

        
        <h2 className="text-zinc-200 text-3xl font-light flex-shrink-0">
          Whats your Poison?
        </h2>

     <button onClick={()=> setToShow('Movies')} className="bg-zinc-800 hover:bg-zinc-300 hover:to-zinc-300 hover:text-red-950 text-zinc-300 text-base font-semibold transition-colors duration-300 px-3 py-2 rounded-l-4xl">
          Movies
     </button>



      <button onClick={()=> setToShow('TV-Shows')} className=" bg-red-950 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-950 px-4 py-2 font-base text-base rounded-e-4xl transition-colors duration-300">
            TV-shows
      </button>
  
      </div>

      <div className="w-full mx-auto px-7 items-center">
        {/* implement something to show tvshows and movies */}
        {toShow=== 'Movies'?
        <MovieDisplayX fullContent={movies.popular} type={'movie'} />:
        <MovieDisplayX fullContent={tvShows.popular} type={'tv'} />
        }

        <h2 className="text-zinc-200 text-3xl font-light flex-shrink-0">
          Now Playing
        </h2>
        <MovieDisplayBlock fullContent={movies.nowPlaying} type={'movie'}/>

        <h2 className="text-zinc-200 text-3xl font-light flex-shrink-0">
          Top Rated
        </h2>

        <MovieDisplayBlock fullContent={movies.topRated} type={'movie'}/>

      </div>
    
    </div>
  );
}



