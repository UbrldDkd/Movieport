import Dropdown from './Dropdown';
import YearsDropdown from './YearsDropdown';
import GenresDropdown from './GenresDropdown';
import CountryDropdown from './CountryDropdown';
import ServicesDropdown from './SevicesDropdown';

export default function BrowseBy({ mediaType, pageView, filters }) {
  return (
    <div className='flex items-center gap-2'>
      <div className='font-semibold tracking-wider text-sm text-zinc-400'>
        BROWSE BY
      </div>

      <div className='flex border-x border-zinc-800'>
        <Dropdown label='YEAR'>
          <YearsDropdown mediaType={mediaType} filters />
        </Dropdown>

        <Dropdown label='GENRE'>
          <GenresDropdown mediaType={mediaType} />
        </Dropdown>

        <Dropdown label='COUNTRY'>
          <CountryDropdown mediaType={mediaType} />
        </Dropdown>

        <Dropdown label='SERVICE'>
          <ServicesDropdown mediaType={mediaType} />
        </Dropdown>
      </div>
    </div>
  );
}
