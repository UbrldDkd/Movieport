import { useParams } from 'react-router-dom';

import SearchSelectionPanel from './SearchSelectionPanel.jsx';

import SearchResultsFilmsAndTv from './SearchResultsFilmsAndTv/SearchResultsFilmsAndTv.jsx';
import SearchResultsUsers from './SearchResultsUsers/SearchResultsUsers.jsx';
import SearchResultsLists from './SearchResultsLists/SearchResultsLists.jsx';

export default function SearchResultsPage() {
  const { for: searchType, by } = useParams();

  const type = searchType || 'both';

  const value = by || '';

  return (
    <div className='bg-zinc-950 min-h-screen pt-5 px-6 md:px-60 pb-8'>
      <div className='max-w-[1600px] mx-auto flex gap-6'>
        {/* LEFT */}
        <div className='flex-1 min-w-0 flex-3'>
          <div className='font-semibold text-xs tracking-widest text-text-primary mt-2'>
            SHOWING MATCHES FOR "{value.toUpperCase()}"
          </div>

          <div className='mt-1 mb-2.5 border-b border-zinc-600' />

          {(type === 'film' || type === 'tv' || type === 'both') && (
            <SearchResultsFilmsAndTv value={value} type={type} />
          )}

          {type === 'users' && <SearchResultsUsers value={value} />}
          {type === 'lists' && <SearchResultsLists value={value} />}
        </div>

        {/* RIGHT */}
        <div className='flex-1 shrink-0'>
          <SearchSelectionPanel currentType={type} value={value} />
        </div>
      </div>
    </div>
  );
}
