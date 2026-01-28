import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { TbClockPlus, TbClockCheck } from 'react-icons/tb';
import { PiEye, PiEyeClosed } from 'react-icons/pi';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { Keys } from '../../utils/Keys.js';
import { useListsModal } from '../../API/Lists/Modal/Context/ListsModalContext.js';
import { useFetchContent } from './hooks/useFetchContent.jsx';
import { useToggleContentRelation } from '../../API/ContentRelations/useToggleContentRelation.js';
import { AuthContext } from '../../API/account/auth/AuthContext.js';
import Description from './Description.jsx';
import SimContent from './SimContent.jsx';
import Comments from './Comments.jsx';
import Trailer from './Trailer.jsx';
import EpisodeDisplay from './EpisodeDisplay.jsx';
import TvContentDisplay from './TvContentDisplay.jsx';
import SeasonDropdown from './SeasonDropDown.jsx';

export default function Watch() {
  // Local state
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedServer, setSelectedServer] = useState(); //temporary
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [episodeOpen, setEpisodeOpen] = useState(false);
  const [lightsOff, setLightsOff] = useState(false);

  // URL params
  const [searchParams] = useSearchParams();
  const { mediaType, id } = useParams();
  const { API1 } = Keys;
  const { details } = API1;

  // Fetch content
  const { content, isLoading, seasonContent } = useFetchContent({
    mediaType,
    id,
    setTrailerOpen,
    selectedSeason,
  });

  // Auth context
  const { user } = useContext(AuthContext);

  // Get season and episode from URL
  const seasonNumber = Number(searchParams.get('season')) || null;
  const episodeNumber = Number(searchParams.get('episode')) || null;

  const backdropUrl = `https://image.tmdb.org/t/p/original${content?.tmdb?.backdrop_path}`;

  // Set default season
  useEffect(() => {
    setSelectedSeason(mediaType === 'tv' ? 1 : null);
  }, [mediaType, id]);

  // Set episode open state when episode and season are present
  useEffect(() => {
    if (episodeNumber && seasonNumber) {
      setEpisodeOpen(true);
      setTrailerOpen(false); // Close trailer when episode is selected
    }
  }, [episodeNumber, seasonNumber]);

  // Toggle functions with mutual exclusion
  const toggleTrailer = () => {
    if (!trailerOpen) {
      setEpisodeOpen(false);
    }
    setTrailerOpen(!trailerOpen);
  };

  const toggleEpisode = () => {
    if (!episodeOpen) {
      setTrailerOpen(false);
    }
    setEpisodeOpen(!episodeOpen);
  };

  const toggleField = useToggleContentRelation();

  const current =
    user?.contentRelations?.find((r) => r.tmdb_id === Number(id)) || {};

  const { openModal } = useListsModal();

  return (
    <div className='relative w-full min-h-screen'>
      {/* Lights off overlay */}
      {lightsOff && (
        <div className='fixed inset-0 bg-black/80 z-40 pointer-events-none transition-opacity duration-300' />
      )}

      <div className='relative z-5 flex flex-col text-zinc-400'>
        {/* Top section: background */}
        <div className='relative w-full pt-4 px-2 sm:px-3 md:p-5 lg:px-10'>
          <div className='absolute inset-0 z-0 pointer-events-none'>
            <div
              className='absolute inset-0 bg-cover bg-center'
              style={{ backgroundImage: `url(${backdropUrl})` }}
            />
            <div className='absolute inset-0 bg-linear-to-br from-black/90 to-transparent' />
            <div className='absolute inset-0 bg-linear-to-bl from-black/90 to-transparent' />
            <div className='absolute inset-0 bg-zinc-950/40' />
            <div className='absolute inset-0 bg-linear-to-t from-zinc-950 to-transparent' />
          </div>

          {/* Breadcrumbs */}
          <div className='hidden md:block'>
            <div className='relative z-10 text-base font-normal flex space-x-2 text-zinc-500 mb-4'>
              <Link to='/'>
                <p>Home</p>
              </Link>
              <span>/</span>
              <Link to={`/explore/${mediaType}`}>
                <p>{mediaType === 'movie' ? 'Movies' : 'Tv'}</p>
              </Link>
              <span>/</span>
              <p
                className={`text-zinc-300 transition-all ease-in-out transform${!isLoading ? ' opacity-100 translate-x-0' : ' opacity-0 translate-y-2'}`}
              >
                {(!isLoading && content?.tmdb?.[details.title]) ||
                  content?.tmdb?.[details.titleTv]}
              </p>
              {!isLoading && seasonNumber && episodeNumber && (
                <span className='ml-1 text-zinc-300'>
                  <span>/ </span>S {seasonNumber} / Ep {episodeNumber}
                </span>
              )}
            </div>
          </div>

          {/* Media player */}
          <div className='relative z-10 bg-black w-full max-w-screen mx-auto rounded-md shadow-lg'>
            <div className='aspect-video w-full'>
              {episodeNumber &&
                seasonNumber &&
                !isLoading &&
                id &&
                episodeOpen && (
                  <EpisodeDisplay
                    seasonNumber={seasonNumber}
                    episodeNumber={episodeNumber}
                    id={id}
                    trailerOpen={trailerOpen}
                    onClose={() => setEpisodeOpen(false)}
                  />
                )}

              {content?.tmdb && (
                <Trailer
                  trailerOpen={trailerOpen}
                  id={content.tmdb[details.id]}
                  mediaType={mediaType}
                />
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className='px-2 md:px-10 pt-2 bg-linear-to-t from-zinc-950 via-zinc-950 to-transparent'>
          <div className='flex flex-col md:flex-row justify-between items-center mb-4 gap-2 md:gap-0'>
            {/* Left side buttons */}
            <div className='flex space-x-1 w-full md:w-auto justify-center md:justify-start'>
              <button
                className={`cursor-pointer py-1 md:py-1.5 text-xs md:text-sm px-2 md:px-3 font-normal transition-colors duration-80 rounded-l-3xl ${lightsOff ? 'bg-red-950 text-zinc-400 hover:bg-zinc-600 hover:text-red-950' : 'hover:bg-zinc-600 hover:text-red-950 bg-zinc-900'}`}
                onClick={() => setLightsOff(!lightsOff)}
              >
                Toggle Light
              </button>

              <button
                onClick={toggleTrailer}
                className={`cursor-pointer py-1 md:py-1.5 text-xs md:text-sm px-2 md:px-3 font-normal transition-colors duration-80 ${trailerOpen ? 'bg-red-950 text-zinc-400 hover:bg-zinc-600 hover:text-red-950 active:bg-red-900 active:text-zinc-200' : 'bg-zinc-900 hover:bg-zinc-600 hover:text-red-950 active:bg-zinc-400 active:text-red-900'}`}
              >
                Trailer
              </button>

              <button className='cursor-pointer py-1 md:py-1.5 px-2 md:px-3 text-xs md:text-sm font-normal transition-colors duration-150 rounded-r-3xl bg-zinc-900 text-zinc-400 hover:bg-zinc-600 hover:text-red-950 active:bg-zinc-400 active:text-red-900'>
                Comment
              </button>
            </div>

            {/* Right side buttons */}
            <div className='flex space-x-1 items-center w-full md:w-auto justify-center md:justify-end'>
              {/* Heart */}
              <div className='relative group'>
                <button
                  onClick={() => toggleField(id, 'likes')}
                  className='cursor-pointer rounded-l-2xl py-1 md:py-1.5 px-2 md:px-3 text-lg md:text-xl transition-colors duration-150 bg-zinc-900 text-zinc-400 hover:bg-zinc-600 hover:text-red-950 active:bg-zinc-500 active:text-red-900 flex items-center justify-center'
                >
                  {current.liked ? <GoHeartFill /> : <GoHeart />}
                </button>
                <span className='absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none px-2 py-1 rounded-md bg-zinc-900 text-red-900 text-xs whitespace-nowrap transition-all duration-200'>
                  {current.liked ? 'Remove from likes' : 'add to likes'}
                </span>
              </div>

              {/* Add to list */}
              <div className='relative group'>
                <button
                  onClick={() => openModal(id)}
                  className='cursor-pointer py-1 md:py-1.5 px-2 md:px-3 text-lg md:text-xl transition-colors duration-150 bg-zinc-900 text-zinc-400 hover:bg-zinc-600 hover:text-red-950 active:bg-zinc-500 active:text-red-900 flex items-center justify-center'
                >
                  <MdFormatListBulletedAdd />
                </button>
                <span className='absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none px-2 py-1 rounded-md bg-zinc-900 text-red-900 text-xs whitespace-nowrap transition-all duration-200'>
                  add to List
                </span>
              </div>

              {/* Watchlist */}
              <div className='relative group'>
                <button
                  onClick={() => toggleField(id, 'watchlisted')}
                  className='cursor-pointer py-1 md:py-1.5 px-2 md:px-3 text-lg md:text-xl transition-colors duration-150 bg-zinc-900 text-zinc-400 hover:bg-zinc-600 hover:text-red-950 active:bg-zinc-500 active:text-red-900 flex items-center justify-center'
                >
                  {current.watchlisted ? <TbClockCheck /> : <TbClockPlus />}
                </button>
                <span className='absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none px-2 py-1 rounded-md bg-zinc-900 text-red-900 text-xs whitespace-nowrap transition-all duration-200'>
                  {current.watchlisted
                    ? 'Remove from watchlist'
                    : 'add to watchlist'}
                </span>
              </div>

              {/* Watched */}
              <div className='relative group'>
                <button
                  onClick={() => toggleField(id, 'watched')}
                  className='cursor-pointer rounded-r-2xl py-1 md:py-1.5 px-2 md:px-3 text-lg md:text-xl transition-colors duration-150 bg-zinc-900 text-zinc-400 hover:bg-zinc-600 hover:text-red-950 active:bg-zinc-500 active:text-red-900 flex items-center justify-center'
                >
                  {current.watched ? <PiEyeClosed /> : <PiEye />}
                </button>
                <span className='absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none px-2 py-1 rounded-md bg-zinc-900 text-red-900 text-xs whitespace-nowrap transition-all duration-200'>
                  {current.watched ? 'Remove from watched' : 'Watch'}
                </span>
              </div>
            </div>
          </div>

          <div className='w-full h-px bg-zinc-700' />

          {/* Server selection buttons */}
          <div className='w-full flex justify-center space-x-2 md:space-x-6 my-6 md:my-10'>
            <button
              onClick={() => setSelectedServer(1)}
              className={`px-4 py-3 md:px-8 md:py-6 text-sm md:text-base rounded-md cursor-pointer transition-colors duration-200 ${selectedServer === 1 ? 'bg-red-950 text-zinc-300 hover:bg-zinc-300 hover:text-red-900 active:bg-zinc-200 active:text-red-800' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-600 hover:text-zinc-200 active:bg-zinc-500 active:text-zinc-100'}`}
            >
              Server 1
            </button>
            <button
              onClick={() => setSelectedServer(2)}
              className={`px-4 py-3 md:px-8 md:py-6 text-sm md:text-base rounded-md cursor-pointer transition-colors duration-200 ${selectedServer === 2 ? 'bg-red-950 text-zinc-300 hover:bg-zinc-300 hover:text-red-900 active:bg-zinc-200 active:text-red-800' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-600 hover:text-zinc-200 active:bg-zinc-500 active:text-zinc-100'}`}
            >
              Server 2
            </button>
            <button
              onClick={() => setSelectedServer(3)}
              className={`px-4 py-3 md:px-8 md:py-6 text-sm md:text-base rounded-md cursor-pointer transition-colors duration-200 ${selectedServer === 3 ? 'bg-red-950 text-zinc-300 hover:bg-zinc-300 hover:text-red-900 active:bg-zinc-200 active:text-red-800' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-600 hover:text-zinc-200 active:bg-zinc-500 active:text-zinc-100'}`}
            >
              Server 3
            </button>
          </div>

          {/* TV Season dropdown */}
          {mediaType === 'tv' && seasonContent && (
            <>
              <div className='w-full h-px bg-zinc-700 my-4' />
              <SeasonDropdown
                seasonAmount={content?.tmdb[details.seasonAmount]}
                selectedSeason={selectedSeason}
                setSelectedSeason={setSelectedSeason}
              />
              <TvContentDisplay
                seasonContent={seasonContent}
                id={content?.tmdb?.[details.id]}
                episodeNumber={Number(episodeNumber)}
              />
            </>
          )}

          <div className='w-full h-px bg-zinc-700 my-4' />

          {/* Mobile: Poster at top, then description, comments, similar content */}
          {/* Desktop: Side by side layout */}
          <div className='w-full bg-linear-to-t from-zinc-950 via-zinc-950 to-transparent z-3 px-0'>
            {/* Mobile layout */}
            <div className='block md:hidden'>
              {/* Poster section for mobile */}
              <div className='flex justify-center mb-6'>
                <div className='w-50 h-75 rounded-xl bg-zinc-900'>
                  {isLoading ? (
                    <div className='w-full h-full flex items-center justify-center rounded-xl bg-zinc-800'>
                      <img
                        src='/assets/lightHouse.gif'
                        alt='Loading...'
                        className='w-36 h-36'
                      />
                    </div>
                  ) : content?.tmdb ? (
                    <img
                      key={`poster-${content.tmdb[details.id]}`}
                      src={`https://image.tmdb.org/t/p/original${content.tmdb.poster_path}`}
                      alt={
                        content?.tmdb?.[details.title] ||
                        content?.tmdb?.[details.titleTv]
                      }
                      className='w-full h-full object-cover rounded-xl'
                      loading='eager'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center rounded-xl bg-zinc-800 text-zinc-400'>
                      No Image
                    </div>
                  )}
                </div>
              </div>

              {/* Description for mobile */}
              <div className='px-4 mb-6'>
                <Description
                  content={content}
                  isLoading={isLoading}
                  seasonContent={seasonContent}
                  selectedSeason={selectedSeason}
                />
              </div>

              {/* Comments for mobile */}
              <div className='px-4 mb-6'>
                <Comments />
              </div>

              {/* Similar content for mobile */}
              <div className='px-4'>
                <SimContent id={id} mediaType={mediaType} />
              </div>
            </div>

            {/* Desktop layout */}
            <div className='hidden md:flex md:space-x-3'>
              <div className='md:flex-[0.6] flex-col md:pr-10'>
                <Description
                  content={content}
                  isLoading={isLoading}
                  seasonContent={seasonContent}
                  selectedSeason={selectedSeason}
                />
                <div className='h-50' />
                <Comments />
              </div>
              <div className='md:flex-[0.4] flex-auto mt-6 md:mt-0'>
                <SimContent id={id} mediaType={mediaType} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
