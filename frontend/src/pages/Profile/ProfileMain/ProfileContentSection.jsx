import { Link } from 'react-router-dom';
import SectionHeader from '../../../components/Sections/Common/SectionHeader';
import ContentCard from '../../../components/ContentDisplays/ContentCard/ContentCard';
import ContentDisplayBlock from '../../../components/ContentDisplays/ContentDisplayBlock';

export default function ProfileContentSection({ header, url, items }) {
  if (!items || !items.length) return null;

  return (
    <section className='space-y-2 my-2'>
      {/* Section header */}
      <div className='px-2 sm:px-0 md:px-0'>
        <SectionHeader header={header} url={url} />
      </div>
      {/* Responsive grid */}
      <ContentDisplayBlock
        content={items}
        displayAmount={4}
        view={'profileContent'}
      />
    </section>
  );
}
