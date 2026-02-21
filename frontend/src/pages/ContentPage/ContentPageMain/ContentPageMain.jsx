import { Link } from 'react-router-dom';
import ContentPageDetails from './ContentPageDetails/ContentPageDetails.jsx';
import ContentPageActionsPanel from './ContentPageActionsPanel/ContentPageActionsPanel.jsx';
import { Keys } from '../../../utils/constants/Keys.js';
import { cleanItem } from '../../../utils/helpers/cleanItem.js';

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

  const item = cleanItem(tmdb);

  const isMovie = item?.media_type === 'film';

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
    mediaType === 'film'
      ? tmdb?.[details1.movieReleaseDate]?.split('-')[0] ||
        (omdb?.[details2.release] && omdb[details2.release] !== 'N/A'
          ? omdb[details2.release]
          : null)
      : tmdb?.[details1.tvReleaseDate]?.split('-')[0] || null;

  return (
    <div className='w-full'>
      {/* Header */}
      <div className='mb-8'>
        {isLoading ? (
          <div className='w-full max-w-md h-10 bg-zinc-800/50 rounded-sm animate-pulse' />
        ) : (
          <div className='flex items-baseline font-medium gap-x-3 flex-wrap'>
            <h1 className='text-3xl md:text-4xl font-medium text-zinc-200'>
              {tmdb?.[details1.movieTitle] || tmdb?.[details1.tvTitle]}
            </h1>

            {release && (
              <Link className='text-sm md:text-[20px] text-text-primary  underline underline-offset-4 hover:cursor-pointer'>
                {release}
              </Link>
            )}
            {directorOrCreator && (
              <span className='text-sm md:text-base text-zinc-400'>
                {isMovie ? 'Directed' : 'Created'} by{' '}
                {Array.isArray(directorOrCreator) ? (
                  directorOrCreator.map((name, i, arr) => (
                    <span key={i}>
                      <Link className='text-text-primary underline underline-offset-4 hover:cursor-pointer'>
                        {name}
                      </Link>
                      {i < arr.length - 2
                        ? ', '
                        : i === arr.length - 2
                          ? ' and '
                          : ''}
                    </span>
                  ))
                ) : (
                  <Link className='text-text-primary underline underline-offset-2 hover:cursor-pointer'>
                    {directorOrCreator}
                  </Link>
                )}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content Layout */}
      <div className='flex  flex-col md:flex-row w-full md:space-x-10 '>
        {/* Main */}
        <div className='w-full  md:flex-[7.5]'>
          {tmdb?.[details1.tagline] && (
            <>
              {isLoading ? (
                <div className='h-4 w-3/4 bg-zinc-800/30 rounded-sm animate-pulse' />
              ) : (
                <p className='text-sm text-zinc-400/90 italic mb-2'>
                  {tmdb[details1.tagline].toUpperCase()}
                </p>
              )}
            </>
          )}

          {isLoading ? (
            <div className='space-y-3 mt-4'>
              <div className='h-4 w-full bg-zinc-800/30 rounded-sm animate-pulse' />
              <div className='h-4 w-5/6 bg-zinc-800/30 rounded-sm animate-pulse' />
              <div className='h-4 w-3/4 bg-zinc-800/30 rounded-sm animate-pulse' />
              <div className='h-4 w-4/5 bg-zinc-800/30 rounded-sm animate-pulse' />
            </div>
          ) : (
            <p className='text-sm md:text-base text-text-primary leading-relaxed mb-6'>
              {mediaType === 'film'
                ? tmdb?.[details1.overview]
                : tmdb?.[details1.overview] || omdb?.[details2.overview]}
            </p>
          )}
          <div className='flex gap-2 sm:flex-row flex-col'>
            <div className='flex-2'>
              <ContentPageDetails content={content} isLoading={isLoading} />
            </div>
            <div className='sm:flex-1 md:hidden '>
              <ContentPageActionsPanel
                item={item}
                current={current}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='w-full hidden  sm:hidden md:flex md:flex-[2.5]  '>
          <ContentPageActionsPanel
            item={item}
            current={current}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
