// ContentDetails.jsx
import { useState } from 'react';
import { Keys } from '../../../../utils/Keys';
import CastTab from './tabs/CastTab';
import CrewTab from './tabs/CrewTab';
import DetailsTab from './tabs/DetailsTab';
import GenresTab from './tabs/GenresTab';
import ReleasesTab from './tabs/ReleasesTab';

export default function ContentPageDetails({ content, isLoading }) {
  const [activeTab, setActiveTab] = useState('cast');

  const { details: details1 } = Keys.API1;
  const { details: details2 } = Keys.API2;
  const { tmdb, omdb } = content || {};

  const mediaType = tmdb?.[details1.title] ? 'movie' : 'tv';

  // Cast data
  const castWithRoles = tmdb?.credits?.cast
    ? tmdb.credits.cast
        .filter((c) => c.character && c.character.trim() !== '')
        .slice(0, 15)
    : [];

  // Crew data
  const crewByDepartment = tmdb?.credits?.crew
    ? tmdb.credits.crew.reduce((acc, crewMember) => {
        const dept = crewMember.known_for_department || 'Other';
        if (!acc[dept]) acc[dept] = [];
        acc[dept].push({
          name: crewMember.name,
          job: crewMember.job,
        });
        return acc;
      }, {})
    : {};

  // Details data
  const detailsData = {
    studios: tmdb?.production_companies?.map((c) => c.name) || [],
    countries:
      tmdb?.[details1.country]?.map((c) => c.name) ||
      (omdb?.[details2.country] && omdb[details2.country] !== 'N/A'
        ? omdb[details2.country].split(',').map((c) => c.trim())
        : []),
    primaryLanguage: tmdb?.original_language?.toUpperCase() || null,
    spokenLanguages: tmdb?.spoken_languages?.map((l) => l.english_name) || [],
    alternativeTitles:
      tmdb?.alternative_titles?.titles?.map((t) => ({
        title: t.title,
        country: t.iso_3166_1,
        type: t.type || null,
      })) || [],
    releaseDates:
      tmdb?.release_dates?.results?.flatMap((r) => 
        r.release_dates?.map((d) => ({
          country: r.iso_3166_1,
          date: d.release_date,
          type: d.type,
          certification: d.certification,
        })) || []
      ).filter((d) => d.type === 3 || d.type === 2) || [],
  };

  if (detailsData) {
    console.log('details', detailsData);
  }

  // Genres data
  const genres =
    tmdb?.[details1.genreNames]?.map((g) => g.name) ||
    (omdb?.[details2.genre] && omdb[details2.genre] !== 'N/A'
      ? omdb[details2.genre].split(',').map((g) => g.trim())
      : []);

  const tabs = ['cast', 'crew', 'details', 'genres'];

  return (
    <div className='mt-8'>
      <div className=' rounded-sm overflow-hidden border border-zinc-900/50'>
        <div className='flex bg-zinc-900/30 backdrop-blur-sm'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 relative ${
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

        <div className='p-5 min-h-[200px]'>
          {activeTab === 'cast' && (
            <CastTab cast={castWithRoles} isLoading={isLoading} />
          )}
          {activeTab === 'crew' && (
            <CrewTab crew={crewByDepartment} isLoading={isLoading} />
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
        </div>
      </div>
    </div>
  );
}
