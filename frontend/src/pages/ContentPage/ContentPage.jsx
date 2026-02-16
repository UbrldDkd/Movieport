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
import ReviewsSection from '../../components/Sections/Reviews/ReviewsSection.jsx';
import ListsSection from '../../components/Sections/Lists/ListsSection.jsx';
import PosterStats from '../../components/ContentDisplays/Common/PosterStats/PosterStats.jsx';

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
        <div className='relative z-0'>
          <ContentPageBackdrop backdropUrl={backdropUrl} />

          <div className='relative z-10 px-2 sm:px-3 md:px-5 lg:px-10 pt-4'>
            <div className='w-full max-w-screen mx-auto rounded-md shadow-lg' />
          </div>
        </div>

        {/* Main Content Container */}
        <div className='relative z-10 flex flex-col md:flex-row space-x-10  px-3 sm:px-5 md:px-8 lg:min-w- pt-6 md:pt-45 md:-mt-90'>
          {/* Gradient overlays */}
          <div className='absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-transparent to-zinc-950 pointer-events-none -z-1' />
          <div className='absolute inset-x-0 top-60 bottom-0 bg-zinc-950 pointer-events-none -z-1' />

          {/* Poster Column (desktop only) */}
          <div className='hidden md:block shrink-0 sticky top-16 self-start z-10'>
            <div className='flex flex-col gap-1'>
              <ContentPagePoster
                displayPosterUrl={posterUrl}
                title={
                  content?.tmdb?.[details.movieTitle] ||
                  content?.tmdb?.[details.tvTitle]
                }
                isLoading={isLoading}
              />

              <PosterStats isLoading={isLoading} />
            </div>

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

          {/* Main Content Column */}
          <div className='w-full md:flex-1 space-y-10 md:max-w-xl mx-auto'>
            <ContentPageMain
              content={content}
              current={current}
              isLoading={isLoading}
              mediaType={mediaType}
            />

            <ReviewsSection header='Popular reviews' isLoading={isLoading} />

            <ListsSection
              header='Popular featuring lists'
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
