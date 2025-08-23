import { Keys } from '../../Components/Keys.js'
import { useEffect, useState } from 'react'

export default function Trailer({ trailerOpen, id, mediaType }) {
  const [trailerKey, setTrailerKey] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        setError(null)
        setIsLoading(true)

        const { API1 } = Keys
        const { Url, API_KEY } = API1

        const res = await fetch(`${Url}${mediaType}/${id}/videos?api_key=${API_KEY}&language=en-US`)

        if (!res.ok) throw new Error('Failed to fetch trailer')

        const resData = await res.json()

        const trailer = resData.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        )

       
          setTrailerKey(trailer.key)
          console.log(trailerKey)
       
        
      } catch (err) {
        console.error(err)
        setError('Could not load trailer')
        setTrailerKey(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (trailerOpen) {
      fetchTrailer()
    }
  }, [trailerOpen, id, mediaType])

  if(error) return (
    <div>

        <p>{error}</p>

    </div>
  )
  if(isLoading) return (
    <div className='w-full h-full justify-center text-xl font-semibold'>
        <p>Loading trailer</p>
    </div>
  )

  if(trailerKey && trailerOpen && !isLoading ) return (

    <iframe
          src={`https://www.youtube.com/embed/${trailerKey&& trailerKey}`}
          className="w-full h-full rounded-md"
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

  )

  

  
}
