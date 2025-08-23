import { Keys } from '../../Components/Keys'
import { GenreMap } from '../../Components/GenreMap';


export default function Description({content, omdb}){

    const { API1, API2 } = Keys;
    const { details:details1 } = API1
    const { details:details2 } = API2
    
    //checks mediaType
    const mediaType = omdb?.[details2.media] || content?.[details1.media] || (content?.[details1.title] ? 'movie' : 'tv');

    //checking title to set for either movie or tv show
    const title = mediaType === 'movie'
    ? content?.[details1.title] 
    : content?.[details1.titleTv];
    
    //checking genre length for dynamic display below
    const genres = mediaType === 'movie' 
  ? (omdb?.[details2.genre] 
      ? omdb[details2.genre].split(',').map(g => g.trim()) 
      : [])
  : (Array.isArray(content?.genres) 
      ? content.genres.map(g => g.name) 
      : []);

    console.log(genres)

    //checking amount of directors for dynamic display below
  const directors = mediaType === 'movie' 
  ? (omdb?.[details2.director] 
      ? omdb[details2.director].split(',').map(g => g.trim()) 
      : [])
  : [];


    const writers = mediaType === 'movie'
    ? (omdb?.[details2.writer] || "").split(',').map(w => w.trim())
    : content?.created_by?.map(c => c.name) || [];

    //checking countries length for dynamic display below
    const countries = mediaType === 'movie'
    ? (omdb?.[details2.country] || "").split(',').map(c => c.trim())
    : content?.production_countries?.map(c => c.name) || [];

    const release = mediaType === 'movie'
    ? omdb?.[details2.release]
    : content?.[details1.first_air_date]; 
    
    const posterUrl = `https://image.tmdb.org/t/p/original${content?.[details1.poster]}`;

    return (
        <div className="flex space-x-8 py-4 ">
        <img  src={posterUrl} alt={title}
        className='w-[250px] h-[370px] bg-zinc-800 rounded-xl'
        />

        {/* Movie details list */}
        <div className="text-sm space-y-2 flex flex-col">

            <div 
            style={{fontSize:'37px'}}
            className=' font-semibold text-zinc-300 '>
                {title}

            </div>

            <div className='flex text-xs space-x-3 font-normal mb-7'>
              
              {omdb?.[details2.ratings]?.map((r) => {
              let source = '';
              let logoUrl = '';

              if (r.Source === 'Internet Movie Database') {
              source = 'IMDB';
              logoUrl = '/path/to/imdb-logo.svg';
              } else if (r.Source === 'Rotten Tomatoes') {
              source = 'RT';
              logoUrl = '/path/to/rottentomatoes-logo.svg';
              } else if (r.Source === 'Metacritic') {
              source = 'M';
              logoUrl = '/src/assets/icons/star.svg'
              } else {
              source = r.Source;
              }

              return (
              <p key={r.Source} className="flex items-center space-x-2">
              {logoUrl && <img src={logoUrl} alt={`${source} logo`} style={{ height: 20 }} />}
              <span>{source}: {r.Value}</span>
              </p>
              );
              })}

              <p>{omdb?.[details2.runtime]}</p>

            </div>

            <div className='mb-4'>
              <p 
              style={{lineHeight: 1.6,fontSize: '16px'}}
              className='text-zinc-400 text-sm '>{content?.[details1.overview]}</p>

            </div>

            <div className='flex w-full'>
          
          <div className='flex flex-col flex-1/6 space-y-4'>
          <p className='text-sm font-semibold text-zinc-300'> {countries.length > 1 ? 'Countries' : 'Country' }:</p>
          <p className='text-sm font-semibold text-zinc-300'> {genres.length > 1 ? 'Genres' : 'Genre'}:</p>
          <p className='text-sm font-semibold text-zinc-300'> Release:</p>
          <p className='text-sm font-semibold text-zinc-300'> {writers.length > 1? 'Writers' : 'Writer'}:</p>
          {directors.length > 0 && <p className='text-sm font-semibold text-zinc-300'>Directors:</p>}

          </div>
          
          <div className='pl-5 flex flex-col space-y-4 flex-5/6'>
          <p>{countries.join(', ')}</p>
          <p>{genres.join(', ')}</p>
          <p>{release}</p>
          <p>{writers.join(', ')}</p>
          {directors.length > 0 && (<p>{directors.join(', ')}</p>)}

          </div>
     
       
        </div>

      </div>
     
     </div>
    )
}