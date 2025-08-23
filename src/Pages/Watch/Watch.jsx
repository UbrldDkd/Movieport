import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Keys } from '../../Components/Keys.js';
import { Link } from 'react-router-dom';
import Description from './Description.jsx';
import SimContent from './SimContent.jsx';
import Trailer from './Trailer.jsx'







export default function Watch() {
    const [content, setContent] = useState()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [trailerOpen, setTrailerOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [lightsOff, setLightsOff] = useState(false);
    const [omdb, setOmdb] = useState('')
    const { mediaType, id, } = useParams();
    
    const backdropUrl = `https://image.tmdb.org/t/p/original${content?.backdrop_path}`;
   
    const {API1 , API2 } = Keys;
    const { Url: Url1, API_KEY: API_KEY1, details: details1 } = API1;
    const { Url: Url2, API_KEY: API_KEY2} = API2;

    
    
    useEffect(() => {
        
          if (!Url1 || !mediaType || !id || !API_KEY1) {
            console.error("Missing required fetch parameters");
            return;
          }

        const fetchContent = async () => {
            try {
                setIsLoading(true)
                setTrailerOpen(false)
            const res = await fetch(`${Url1}${mediaType}/${id}?api_key=${API_KEY1}`);
        
            if (!res.ok) throw new Error('Content could not be loaded')

            const data = await res.json();
            
            setContent(data)

            //sets title depending on if its a movie or a tv-show
            if(mediaType === 'movie'){setTitle(data[details1.title])}
            if(mediaType === 'tv') setTitle(data[details1.titleTv])

            
            //checks if data from the main API has imdb_id and then searches for more detailed data via omdb
             if (data.imdb_id) {
                const omdbRes = await fetch(`${Url2}${data[details1.imdb_id]}&apikey=${API_KEY2}&plot=full`);
                if (!omdbRes.ok) throw new Error('OMDb data could not be loaded');

                const omdbData = await omdbRes.json();
              
                setOmdb(omdbData);
              
            }

            }
            catch(err) {
                setError(err)
                console.log(err)

            }
            finally {
                setIsLoading(false)
            }
        
    }

    fetchContent()

    },[id, mediaType])

    
    
    return (
  <div className="relative w-full min-h-screen">
    {lightsOff && (
      <div className="fixed inset-0 bg-black/80 z-40 pointer-events-none transition-opacity duration-300" />
    )}

    {/* Main content container */}
    <div className="relative z-5 flex flex-col text-zinc-400">
      
      <div className="relative w-full pt-4  md:p-5 sm:p-3 lg:px-10">
        
        {/* Background + gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-bl from-black/90 to-transparent" />
          <div className="absolute inset-0 bg-zinc-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        {/* Routes - visible on top */}<div className="hidden md:block">
        <div className="relative z-10 text-base font-normal flex space-x-2 text-zinc-500 mb-4">
          <Link to="/">
            <p>Home</p>
          </Link>
          <span>/</span>
          <Link to={`/${mediaType}`}>
            <p>{mediaType === "movie" ? "Movies" : "Tv"}</p>
          </Link>
          <span>/</span>
          <p className={`text-zinc-300 transition-all ease-in-out transform${!isLoading ? 'opacity-100 translate-x-0' : 'opacity-0 translate-y-2'}`}>{!isLoading && title}</p>
        </div>
        </div>

        {/* Media player black box - responsive padding and width */}
        <div className="relative z-10 bg-black w-full max-w-screen mx-auto rounded-md shadow-lg ">
          <div className="aspect-video w-full">
                          <div className='aspect-video'>
                          <Trailer trailerOpen={trailerOpen} id={content?.[details1.id]} mediaType={mediaType} />
                          </div>
            {/* Your media player component or markup goes here */}
          </div>
        </div>
      </div>

      {/* Utility buttons and other content below */}
      <div className="px-10 pt-2 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent">
        <div className="flex space-x-1 mb-4 justify-center sm:justify-start">
          <button
            className="bg-zinc-900 py-1.5 text-sm px-3 font-normal hover:bg-zinc-600 hover:text-red-950 transition-colors duration-80 rounded-l-3xl"
            onClick={() => setLightsOff(!lightsOff)}
          >
            Toggle Light
          </button>
          <button onClick={() => setTrailerOpen(!trailerOpen)} className="bg-zinc-900 py-1.5 text-sm px-3 font-normal hover:bg-zinc-600 hover:text-red-950 transition-colors duration-80 active:bg-zinc-400 active:text-red-900">
            Trailer
          </button>
          <button className="bg-zinc-900 py-1.5 text-sm px-3 font-normal hover:bg-zinc-600 hover:text-red-950 transition-colors duration-80 rounded-r-3xl">
            Comment
          </button>
        </div>

        <div className="w-full h-px bg-zinc-700 mb-40" />

        {/* Insert channels here */}

        <div className="w-full h-px bg-zinc-700 my-4" />

        {/* Description and Similar Content container */}
        <div className="w-full flex space-x-3 sm:flex-col md:flex-row bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent z-3 px-0">
          <div className="md:flex-[0.6] flex-auto md:pr-10">
            <Description content={content} omdb={omdb} />
          </div>
          <div className="md:flex-[0.4] flex-auto mt-6 md:mt-0">
            <SimContent id={id} mediaType={mediaType} />
          </div>
        </div>
      </div>
    </div>
  </div>
)
;
;

}