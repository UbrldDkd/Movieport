import Dropdown from '../../components/BrowseBy/Dropdown';
import YearsDropdown from '../../components/BrowseBy/YearsDropdown';
import GenresDropdown from '../../components/BrowseBy/GenresDropdown';
import CountryDropdown from '../../components/BrowseBy/CountryDropdown';
import ServicesDropdown from '../../components/BrowseBy/SevicesDropdown';

export default function FilterBy({ mediaType, pageView, filters }) {
  return (
    <div className='flex items-center gap-2'>
      <div className='font-semibold tracking-wider text-sm text-zinc-400'>
        BROWSE BY
      </div>

      <div className='flex border-x border-zinc-800'>
        <Dropdown label='YEAR'>
          <YearsDropdown mediaType={mediaType} />
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
