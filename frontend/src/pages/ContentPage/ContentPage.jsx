// React
import { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

// Context
import { AuthContext } from '../../API/account/auth/AuthContext.js';

// Hooks
import { useFetchContentDetails } from './hooks/useFetchContentDetails.js';

// Components
import SimilarContentSection from './Sections/SimilarContentSection.jsx';
import RelatedContentSection from './Sections/RelatedContentSection.jsx';
import ContentPageMain from './ContentPageMain/ContentPageMain.jsx';
import ContentPagePoster from './PosterAndBackdrop/ContentPagePoster.jsx';
import EpisodesGrid from './Tv/EpisodesGrid.jsx';
import SeasonDropdown from './Tv/SeasonDropDown.jsx';
import ContentPageBackdrop from './PosterAndBackdrop/ContentPageBackdrop.jsx';
import PopularReviewsSection from './Sections/PopularReviewsSection.jsx';
import ListsSection from '../../components/Sections/ListsSection.jsx';
import ContentPagePosterStats from './PosterAndBackdrop/ContentPagePosterStats.jsx';

// Utils
import { Keys } from '../../utils/constants/Keys.js';

export default function ContentPage() {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodeOpen, setEpisodeOpen] = useState(false);
  void trailerOpen;
  void episodeOpen;

  const [searchParams] = useSearchParams();
  const { mediaType, id } = useParams();

  const seasonNumber = Number(searchParams.get('season')) || null;
  const episodeNumber = Number(searchParams.get('episode')) || null;

  const { details } = Keys.API1;
  const { user } = useContext(AuthContext);

  const { content, isLoading, seasonContent } = useFetchContentDetails({
    mediaType,
    id,
    setTrailerOpen,
    selectedSeason,
  });

  const posterUrl =
    content?.tmdb &&
    (selectedSeason && content.tmdb.seasons?.[selectedSeason]?.[details.poster]
      ? `https://image.tmdb.org/t/p/original${content.tmdb.seasons[selectedSeason][details.poster]}`
      : content.tmdb?.[details.poster]
        ? `https://image.tmdb.org/t/p/original${content.tmdb[details.poster]}`
        : null);

  const still =
    seasonContent?.episodes?.[episodeNumber - 1]?.[
      details.episodeFields.stillPath
    ];
  const backdrop = content?.tmdb?.[details.backdrop];

  const backdropUrl = still
    ? `https://image.tmdb.org/t/p/original${still}`
    : backdrop
      ? `https://image.tmdb.org/t/p/original${backdrop}`
      : 'https://via.placeholder.com/1280x720?text=No+Backdrop';

  useEffect(() => {
    setSelectedSeason(mediaType === 'tv' ? 1 : null);
  }, [mediaType, id]);

  useEffect(() => {
    if (episodeNumber && seasonNumber) {
      setEpisodeOpen(true);
      setTrailerOpen(false);
    }
  }, [episodeNumber, seasonNumber]);

  const current = useMemo(() => {
    return user?.contentRelations?.find((r) => r.tmdb_id === Number(id)) || {};
  }, [user?.contentRelations, id]);

  return (
    <div className='relative w-full min-h-screen bg-zinc-950'>
      <div className='relative z-5 flex flex-col text-zinc-400'>
        {/* Backdrop */}
        <div className='relative -mt-18 z-0'>
          <ContentPageBackdrop backdropUrl={backdropUrl} />

          <div className='relative z-10'>
            <div className='relative w-full pt-4 px-2 sm:px-3 md:p-5 lg:px-10'>
              <div className='relative z-10 w-full max-w-screen mx-auto rounded-md shadow-lg'></div>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className='relative w-full flex flex-col md:flex-row gap-4 md:gap-10 md:-mt-90 z-10 px-4 md:px-65 items-start pt-8 md:pt-45'>
          {/* Fade from transparent to zinc-950 at top edge */}
          <div className='absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-transparent to-zinc-950 pointer-events-none -z-1' />
          {/* Solid zinc-950 below fade */}
          <div className='absolute top-60 left-0 right-0 bottom-0 bg-zinc-950 pointer-events-none -z-1' />

          {/* Poster Column - Sticky on desktop */}
          <div className='hidden md:block shrink-0 z-10 sticky top-16 self-start'>
            <div>
              <ContentPagePoster
                displayPosterUrl={posterUrl}
                title={
                  content?.tmdb?.[details.movieTitle] ||
                  content?.tmdb?.[details.tvTitle]
                }
                isLoading={isLoading}
              />

              <ContentPagePosterStats isLoading={isLoading} />

              {mediaType === 'tv' && seasonContent && (
                <div className='mt-4'>
                  <div className='w-full h-px bg-zinc-700 my-4' />
                  <SeasonDropdown
                    seasonCount={content?.tmdb[details.seasonCount]}
                    selectedSeason={selectedSeason}
                    setSelectedSeason={setSelectedSeason}
                  />
                  <EpisodesGrid
                    seasonContent={seasonContent}
                    id={content?.tmdb?.[details.id]}
                    episodeNumber={Number(episodeNumber)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Main Content Column */}
          <div className='w-full md:w-auto md:flex-1'>
            <ContentPageMain
              content={content}
              current={current}
              isLoading={isLoading}
              mediaType={mediaType}
            />
            <PopularReviewsSection isLoading={isLoading} />

            {/* TODO: add actual lists which feature the item later */}
            <ListsSection
              header={'Popular featuring lists'}
              isLoading={isLoading}
            />

            <RelatedContentSection
              collectionData={content?.tmdb?.[details.movieCollection]}
              currentId={content?.tmdb?.[details.id]}
              mediaType={mediaType}
            />
            <SimilarContentSection
              id={content?.tmdb?.[details.id]}
              mediaType={mediaType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
