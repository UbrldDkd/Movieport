// ContentPageMain.jsx
import ContentPageDetails from './ContentPageDetails/ContentPageDetails.jsx';
import ContentPageActionsPanel from './ContentPageActionsPanel/ContentPageActionsPanel.jsx';
import { Keys } from '../../../utils/Keys.js';

export default function ContentPageMain({
  content,
  current,
  isLoading,
  mediaType,
}) {
  const { details: details1 } = Keys.API1;
  const { details: details2 } = Keys.API2;

  if (!content && !isLoading) return null;

  const { tmdb = {}, omdb = {} } = content || {};

  const item = {
    title: tmdb?.[details1.movieTitle] || tmdb?.[details1.tvTitle],
    tmdb_id: tmdb?.[details1.id],
    media_type: mediaType,
    poster_path: tmdb?.[details1.poster],
    release_date:
      tmdb?.[details1.movieReleaseDate] || tmdb?.[details1.tvReleaseDate],
  };

  const isMovie = tmdb?.[details1.movieTitle];

  const directorOrCreator = isMovie
    ? // Movies: get directors
      (tmdb?.credits?.crew || tmdb?.aggregate_credits?.crew || [])
        .filter((c) => c.job === 'Director')
        .map((c) => c.name)
    : // TV: get creators from created_by field first
      tmdb?.created_by?.map((c) => c.name) ||
      // Fallback to crew with Creator job
      (tmdb?.credits?.crew || [])
        .filter((c) => c.job === 'Creator')
        .map((c) => c.name) ||
      // Fallback to aggregate_credits
      (tmdb?.aggregate_credits?.crew || [])
        .filter((c) => c.jobs?.some((j) => j.job === 'Creator'))
        .map((c) => c.name) ||
      [];

  const release =
    mediaType === 'movie'
      ? tmdb?.[details1.movieReleaseDate]?.split('-')[0] ||
        (omdb?.[details2.release] && omdb[details2.release] !== 'N/A'
          ? omdb[details2.release]
          : null)
      : tmdb?.[details1.tvReleaseDate]?.split('-')[0] || null;

  return (
    <div className='w-full'>
      {/* Header */}
      <div className='mb-5'>
        {isLoading ? (
          <div className='w-full max-w-md h-10 bg-zinc-800/50 rounded-sm animate-pulse' />
        ) : (
          <div className='flex items-baseline gap-x-3 flex-wrap'>
            <h1 className='text-2xl md:text-4xl font-semibold text-zinc-200'>
              {tmdb?.[details1.movieTitle] || tmdb?.[details1.tvTitle]}
            </h1>

            {release && (
              <a className='text-sm md:text-base text-zinc-300 underline underline-offset-2 hover:cursor-pointer'>
                {release}
              </a>
            )}

            <span className='text-sm md:text-base text-zinc-400'>
              Directed by{' '}
              {Array.isArray(directorOrCreator) ? (
                directorOrCreator.map((name, i, arr) => (
                  <span key={i}>
                    <a className='text-zinc-300 underline underline-offset-2 hover:cursor-pointer'>
                      {name}
                    </a>
                    {i < arr.length - 2
                      ? ', '
                      : i === arr.length - 2
                        ? ' and '
                        : ''}
                  </span>
                ))
              ) : (
                <a className='text-zinc-300 underline underline-offset-2 hover:cursor-pointer'>
                  {directorOrCreator}
                </a>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Content Layout */}
      <div className='flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0'>
        {/* Main */}
        <div className='w-full mt- md:flex-[7.5]'>
          {tmdb?.[details1.tagline] && (
            <>
              {isLoading ? (
                <div className='h-4 w-3/4 bg-zinc-800/30 rounded-sm animate-pulse' />
              ) : (
                <p className='text-sm text-zinc-400 italic mb-2'>
                  {tmdb[details1.tagline].toUpperCase()}
                </p>
              )}
            </>
          )}

          {isLoading ? (
            <div className='space-y-2 mt-4'>
              <div className='h-4 w-full bg-zinc-800/30 rounded-sm animate-pulse' />
              <div className='h-4 w-5/6 bg-zinc-800/30 rounded-sm animate-pulse' />
              <div className='h-4 w-3/4 bg-zinc-800/30 rounded-sm animate-pulse' />
              <div className='h-4 w-4/5 bg-zinc-800/30 rounded-sm animate-pulse' />
            </div>
          ) : (
            <p className='text-sm md:text-base text-zinc-300/90 leading-relaxed mb-6'>
              {mediaType === 'movie'
                ? tmdb?.[details1.overview]
                : tmdb?.[details1.overview] || omdb?.[details2.overview]}
            </p>
          )}

          <ContentPageDetails content={content} isLoading={isLoading} />
          <div className='h-16' />
        </div>

        {/* Actions */}
        <div className='w-full md:flex-[2.5]'>
          <ContentPageActionsPanel item={item} current={current} />
        </div>
      </div>
    </div>
  );
}
