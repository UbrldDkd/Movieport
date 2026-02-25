import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi2';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import ContentPageDetails from './ContentPageDetails/ContentPageDetails.jsx';
import ContentPageActionsPanel from './ContentPageActionsPanel/ContentPageActionsPanel.jsx';
import ContentCardPoster from '../../../components/ContentDisplays/ContentCard/ContentCardPoster.jsx';
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
  const navigate = useNavigate();
  const [descExpanded, setDescExpanded] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  if (!content && !isLoading) return null;

  const { tmdb = {}, omdb = {} } = content || {};
  const item = cleanItem(tmdb);
  const isMovie = item?.media_type === 'film';

  const directorOrCreator = isMovie
    ? (tmdb?.credits?.crew || tmdb?.aggregate_credits?.crew || [])
        .filter((c) => c.job === 'Director')
        .map((c) => c.name)
    : tmdb?.created_by?.map((c) => c.name) ||
      (tmdb?.credits?.crew || [])
        .filter((c) => c.job === 'Creator')
        .map((c) => c.name) ||
      (tmdb?.aggregate_credits?.crew || [])
        .filter((c) => c.jobs?.some((j) => j.job === 'Creator'))
        .map((c) => c.name) ||
      [];

  const release =
    mediaType === 'film'
      ? tmdb?.[details1.movieReleaseDate]?.split('-')[0] ||
        (omdb?.[details2.release] !== 'N/A' ? omdb?.[details2.release] : null)
      : tmdb?.[details1.tvReleaseDate]?.split('-')[0] || null;

  const title = tmdb?.[details1.movieTitle] || tmdb?.[details1.tvTitle];
  const overview = tmdb?.[details1.overview] || omdb?.[details2.overview];
  const tagline = tmdb?.[details1.tagline];

  const DirectorLine = () =>
    directorOrCreator?.length > 0 ? (
      <span className='text-sm text-zinc-400'>
        {isMovie ? 'Directed' : 'Created'} by{' '}
        {directorOrCreator.map((name, i, arr) => (
          <span key={i}>
            <Link className='text-text-primary underline underline-offset-4 hover:cursor-pointer'>
              {name}
            </Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' and ' : ''}
          </span>
        ))}
      </span>
    ) : null;

  return (
    <>
      {/* ── MOBILE ── */}
      <div className='md:hidden'>
        {/* Top bar: back + three dots */}
        <div className='flex items-center justify-between px-4 py-3'>
          <button
            onClick={() => navigate(-1)}
            className='text-zinc-300 hover:text-white'
          >
            <HiArrowLeft className='text-xl' />
          </button>
          <button
            onClick={() => setActionsOpen(true)}
            className='text-zinc-300 hover:text-white'
          >
            <HiDotsHorizontal className='text-xl' />
          </button>
        </div>

        {/* Poster + title block */}
        <div className='flex flex-row-reverse gap-10  px-4 mb-5'>
          <div className='flex-shrink-0 '>
            <ContentCardPoster
              view='mobileContentPoster'
              posterPath={tmdb[details1.poster]}
            />
          </div>
          <div className='flex flex-col  items-start justify-start pb-1'>
            {isLoading ? (
              <div className='w-40 h-6 bg-zinc-800/50 rounded animate-pulse mb-2' />
            ) : (
              <h1 className='text-xl font-semibold text-zinc-100 leading-snug'>
                {title}
              </h1>
            )}
            {release && <p className='text-sm text-zinc-400 mt-1'>{release}</p>}
            <div className='mt-1'>
              <DirectorLine />
            </div>
          </div>
        </div>

        {/* Tagline */}
        {tagline && !isLoading && (
          <p className='px-4 text-xs text-zinc-500 italic uppercase tracking-wide mb-2'>
            {tagline}
          </p>
        )}

        {/* Description with expand */}
        {isLoading ? (
          <div className='px-4 space-y-2'>
            {[1, 0.9, 0.75].map((w, i) => (
              <div
                key={i}
                className='h-4 rounded animate-pulse bg-zinc-800/30'
                style={{ width: `${w * 100}%` }}
              />
            ))}
          </div>
        ) : (
          <div className='px-4 mb-5'>
            <div
              className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
                descExpanded ? 'max-h-[1000px]' : 'max-h-[4.5rem]'
              }`}
            >
              <p className='text-sm text-text-primary leading-relaxed'>
                {overview}
              </p>
              {/* Fade gradient */}
              {!descExpanded && (
                <div className='absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none' />
              )}
            </div>
            <button
              onClick={() => setDescExpanded((p) => !p)}
              className='mt-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors'
            >
              {descExpanded ? 'Show less' : 'More'}
            </button>
          </div>
        )}

        {/* Details */}
        <div className='px-4'>
          <ContentPageDetails content={content} isLoading={isLoading} />
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className='hidden md:block w-full'>
        <div className='mb-8'>
          {isLoading ? (
            <div className='w-full max-w-md h-10 bg-zinc-800/50 rounded-sm animate-pulse' />
          ) : (
            <>
              <h1 className='text-4xl font-medium text-zinc-200'>{title}</h1>
              <div className='mt-4 flex gap-2 items-baseline'>
                {release && (
                  <Link className='text-[20px] text-text-primary underline underline-offset-4 hover:cursor-pointer'>
                    {release}
                  </Link>
                )}
                <DirectorLine />
              </div>
            </>
          )}
        </div>

        <div className='flex flex-col md:flex-row w-full md:space-x-10'>
          <div className='w-full md:flex-[7.5]'>
            {tagline &&
              (isLoading ? (
                <div className='h-4 w-3/4 bg-zinc-800/30 rounded-sm animate-pulse' />
              ) : (
                <p className='text-sm text-zinc-400/90 italic mb-2'>
                  {tagline.toUpperCase()}
                </p>
              ))}
            {isLoading ? (
              <div className='space-y-3 mt-4'>
                {[1, 0.9, 0.75, 0.8].map((w, i) => (
                  <div
                    key={i}
                    className='h-4 rounded-sm animate-pulse bg-zinc-800/30'
                    style={{ width: `${w * 100}%` }}
                  />
                ))}
              </div>
            ) : (
              <p className='text-base text-text-primary leading-relaxed mb-6'>
                {overview}
              </p>
            )}
            <div className='flex gap-2 flex-col sm:flex-row'>
              <div className='flex-2'>
                <ContentPageDetails content={content} isLoading={isLoading} />
              </div>
            </div>
          </div>
          <div className='w-full md:flex md:flex-[2.5]'>
            <ContentPageActionsPanel
              item={item}
              current={current}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile actions bottom sheet ── */}
      {actionsOpen && (
        <div className='md:hidden fixed inset-0 z-50 flex flex-col justify-end'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black/60'
            onClick={() => setActionsOpen(false)}
          />
          {/* Sheet */}
          <div className='relative bg-zinc-900 rounded-t-2xl px-4 pt-4 pb-10 z-10'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-sm font-semibold text-zinc-300'>{title}</h2>
              <button
                onClick={() => setActionsOpen(false)}
                className='text-zinc-400 hover:text-white'
              >
                <IoClose className='text-xl' />
              </button>
            </div>
            <ContentPageActionsPanel
              item={item}
              current={current}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </>
  );
}
