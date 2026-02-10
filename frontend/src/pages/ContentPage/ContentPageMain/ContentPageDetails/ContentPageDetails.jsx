// ContentDetails.jsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Keys } from '../../../../utils/constants/Keys';
import CastTab from './tabs/CastTab';
import CrewTab from './tabs/CrewTab';
import DetailsTab from './tabs/DetailsTab';
import GenresTab from './tabs/GenresTab';
import ReleasesTab from './tabs/ReleasesTab';
import { tabVariants } from '../../../../utils/animations/motionVariants';

export default function ContentPageDetails({ content, isLoading }) {
  const [activeTab, setActiveTab] = useState('cast');
  const { details } = Keys.API1;

  const tmdb = content?.tmdb;
  const mediaType = tmdb?.[details.movieTitle] ? 'movie' : 'tv';

  const credits = tmdb?.aggregate_credits || tmdb?.credits || {};

  const isAggregateCredits = !!tmdb?.aggregate_credits;

  const cast = (credits.cast || [])
    .flatMap((c) => {
      if (isAggregateCredits) {
        return (c.roles || []).map((role) => ({
          name: c.name,
          character: role.character || '',
        }));
      } else {
        if (c.character?.trim()) {
          return [
            {
              name: c.name,
              character: c.character,
            },
          ];
        }
        return [];
      }
    })
    .slice(0, 90);

  const crew = (credits.crew || []).reduce((acc, member) => {
    const dept = member.department || 'Other';
    if (!acc[dept]) acc[dept] = [];
    if (isAggregateCredits) {
      (member.jobs || []).forEach((jobInfo) => {
        acc[dept].push({
          name: member.name,
          job: jobInfo.job,
        });
      });
    } else {
      if (member.job) {
        acc[dept].push({
          name: member.name,
          job: member.job,
        });
      }
    }
    return acc;
  }, {});

  // Details data
  const detailsData = {
    studios: tmdb?.production_companies?.map((c) => c.name) || [],
    countries: tmdb?.[details.productionCountries]?.map((c) => c.name) || [],
    primaryLanguage: tmdb?.original_language?.toUpperCase() || null,
    spokenLanguages:
      tmdb?.[details.SpokenLanguages]?.map((l) => l.english_name) || [],
    alternativeTitles:
      (mediaType === 'movie'
        ? tmdb?.alternative_titles?.titles
        : tmdb?.alternative_titles?.results
      )?.map((t) => ({
        title: t.title,
        country: t.iso_3166_1,
        type: t.type || null,
      })) || [],
    releaseDates:
      tmdb?.release_dates?.results
        ?.flatMap((r) =>
          (r.release_dates || []).map((d) => ({
            country: r.iso_3166_1,
            date: d.release_date,
            type: d.type,
            certification: d.certification,
          }))
        )
        .filter((d) => d.type === 3 || d.type === 2) || [],
  };

  // Genres data
  const genres = tmdb?.[details.genres]?.map((g) => g.name) || [];

  const tabs =
    mediaType === 'movie'
      ? ['cast', 'crew', 'details', 'genres', 'releases']
      : ['cast', 'crew', 'details', 'genres'];

  return (
    <div className='mt-8 max-w-100'>
      <div className='rounded-sm  border border-zinc-900/50'>
        <div className='flex bg-zinc-900/30 backdrop-blur-sm'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-2 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 relative ${
                activeTab === tab
                  ? 'text-zinc-200'
                  : 'text-zinc-500 hover:cursor-pointer hover:text-zinc-400 hover:bg-zinc-900/20'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-red-900' />
              )}
            </button>
          ))}
        </div>

        <div className='p-2 '>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {activeTab === 'cast' && (
                <CastTab cast={cast} isLoading={isLoading} />
              )}
              {activeTab === 'crew' && (
                <CrewTab crew={crew} isLoading={isLoading} />
              )}
              {activeTab === 'details' && (
                <DetailsTab details={detailsData} isLoading={isLoading} />
              )}
              {activeTab === 'genres' && (
                <GenresTab
                  genres={genres}
                  mediaType={mediaType}
                  isLoading={isLoading}
                />
              )}
              {activeTab === 'releases' && (
                <ReleasesTab
                  releaseDates={detailsData.releaseDates}
                  isLoading={isLoading}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
