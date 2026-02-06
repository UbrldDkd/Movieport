import { useEffect, useState } from 'react';

export default function ContentPagePoster({
  displayPosterUrl,
  title,
  isLoading,
}) {
  const [loaded, setLoaded] = useState();

  useEffect(() => {
    setLoaded(false);

    if (!displayPosterUrl) return;

    const img = new Image();
    img.src = displayPosterUrl;
    img.onload = () => setLoaded(true);

    return () => {
      img.onload = null;
    };
  }, [displayPosterUrl]);

  return (
    <div className='hidden md:block'>
      <div className='w-[220px] h-[330px] rounded-sm flex items-center justify-center relative bg-zinc-900 shadow-lg'>
        <img
          src='/assets/lightHouse.gif'
          alt='Loading...'
          className={`w-[190px] h-[190px] object-contain animate-pulse transition-opacity duration-200 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
        />

        <img
          src={displayPosterUrl}
          alt={isLoading ? '' : title}
          className={`w-[220px] h-[330px] rounded-sm object-cover absolute transition-opacity duration-300 antialiased ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading='lazy'
        />
      </div>
    </div>
  );
}
