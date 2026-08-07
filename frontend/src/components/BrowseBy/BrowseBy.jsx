import Dropdown from './Dropdown';
import YearsDropdown from './YearsDropdown';
import GenresDropdown from './GenresDropdown';
import CountryDropdown from './CountryDropdown';
import ServicesDropdown from './SevicesDropdown';

export default function BrowseBy({ mediaType, filters, style = '' }) {
  const counts = {
    genre: filters?.genre?.length || 0,
    year: filters?.year?.length || 0,
    country: filters?.country?.length || 0,
    decade: filters?.decade ? 1 : 0,
    service: filters?.service ? 1 : 0,
  };

  return (
    <div className='lg:flex md:flex  items-center gap-2'>
      {style !== 'filteredResults' && (
        <div className='font-semibold tracking-wider text-sm text-zinc-400'>
          BROWSE BY
        </div>
      )}

      <div
        className={`${style === 'filteredResults' ? 'flex' : 'flex border-x border-zinc-800'}`}
      >
        <Dropdown
          label='YEAR'
          style={style}
          count={counts.year + counts.decade}
        >
          <YearsDropdown mediaType={mediaType} filters={filters} />
        </Dropdown>

        <Dropdown label='GENRE' style={style} count={counts.genre}>
          <GenresDropdown mediaType={mediaType} filters={filters} />
        </Dropdown>

        <Dropdown label='COUNTRY' style={style} count={counts.country}>
          <CountryDropdown mediaType={mediaType} filters={filters} />
        </Dropdown>

        <Dropdown label='SERVICE' style={style} count={counts.service}>
          <ServicesDropdown mediaType={mediaType} filters={filters} />
        </Dropdown>
      </div>
    </div>
  );
}
