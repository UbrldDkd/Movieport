import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Keys } from '../Components/Keys.js'
import { GenreMap } from '../Components/GenreMap.js';







export default function Watch() {
    const [content, setContent] = useState()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { mediaType, movieId } = useParams();

    const backdropUrl = `https://image.tmdb.org/t/p/original${content?.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/original${content?.poster}`;
  
    useEffect(() => {
        if(!mediaType || !movieId) return;
        console.log(mediaType)
        console.log(movieId)
        const fetchContent = async () => {
            try {
                setIsLoading(true)
            const res = await fetch(`${Keys.Url}${mediaType}/${movieId}?api_key=${Keys.API_KEY}`);

            if (!res.ok) throw new Error('Content could not be loaded')

            const data = await res.json();

            setContent(data)
            console.log(data)

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

    },[movieId, mediaType])

    
    
    return (
  <div className="relative w-full min-h-screen">

    {/* Backdrop image */}
    <div 
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{ backgroundImage: `url(${backdropUrl})` }}
    />

    {/* Dark overlays */}
    <div className="absolute inset-0 bg-black opacity-40 z-10" />
    <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-transparent z-20" />
    <div className="absolute inset-0 bg-gradient-to-bl from-black/90 to-transparent z-30" />
    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent z-40" />

    {/* Content container */}
    <div className="relative z-50 pt-5 px-10 text-zinc-400">
        
      <div className="text-base font-normal flex mb-4">
       <p>
        route
       </p>
        /
       <p>
        {mediaType === 'movie'
          ? content?.[Keys.details.title]
          : content?.[Keys.details.titleTv]}
        </p>

      </div>

      <div className="mb-6 min w-full bg-black min-h-screen">
        {/* use this as display for movie */}

      </div>

      <div className="flex space-x-4 mb-6">
        <button className="bg-zinc-800 px-4 py-2 rounded">Toggle Light</button>
        <button className="bg-zinc-800 px-4 py-2 rounded">Trailer</button>
        <button className="bg-zinc-800 px-4 py-2 rounded">Comment</button>

      </div>

      <div className="flex space-x-8">
        <img src={posterUrl} alt={content[Keys.details.title]}
        className='w-[200px] h-[300px] bg-zinc-800 rounded'
        />

        {/* Movie details list */}
        <div className="text-sm space-y-2 flex flex-col">
            <div className='text-3xl'>

                {content[Keys.details.title]? content[Keys.details.title] : content[Keys.details.name]}
        
            </div>
          <p>Rating:</p>
          <p>Rating:</p>
          <p>Rating:</p>
          <p>Rating:</p>
     
       
        </div>

      </div>

    </div>
  </div>
);

}