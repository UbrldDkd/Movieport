import HeroCarousel from './HeroCarousel.jsx';
import { sampleMovies } from './MovieDataTemp.js';
import MovieDisplayX from './MovieDisplays/MovieDisplayX.jsx'
import MovieDisplayBlock from './MovieDisplays/MovieDisplayBlock.jsx'
import { PlayCircleIcon, Bars3Icon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export default function Main() {
  return (
    <div className="bg-zinc-950 pt-10 relative">

      <HeroCarousel movies={sampleMovies} />

      {/* New horizontal header section */}
      <div className="flex items-center mx-15 mt-25 mb-10 space-x-4">

        {/* turn into a big header and make a lesser header style as well later*/}
        <h2 className="text-zinc-200 text-3xl font-light flex-shrink-0">
          Whats your Poison?
        </h2>
     <PlayCircleIcon className="w-6 h-6 text-white" />
<Bars3Icon className="w-6 h-6 text-white" />
<ClipboardDocumentCheckIcon className="w-6 h-6 text-white" />

     <button className="bg-zinc-800 hover:bg-zinc-300 hover:to-zinc-300 hover:text-red-950 text-zinc-300 text-base font-semibold transition-colors duration-300 px-3 py-2 rounded-l-4xl">
          Movies
     </button>



      <button className=" bg-red-950 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-950 px-4 py-2 font-base text-base rounded-e-4xl transition-colors duration-300">
            TV-shows
      </button>
  
      </div>

      {/* The movie display below */}
      {/* fix this later to fit all movies in!!!*/}
      <div className="w-full mx-auto px-7 items-center">

        {/* make a normal display for different topics */}
        
        <MovieDisplayX movies={sampleMovies} />
      
        <MovieDisplayBlock movies={sampleMovies} />
      </div>
      
    </div>
  );
}



