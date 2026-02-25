import { Link } from 'react-router-dom';
import SectionHeader from '../../../components/Sections/Common/SectionHeader';
import ContentCard from '../../../components/ContentDisplays/ContentCard/ContentCard';
import ContentDisplayBlock from '../../../components/ContentDisplays/ContentDisplayBlock';

export default function ProfileContentSection({ header, url, items }) {
  if (!items || !items.length) return null;

  return (
    <section className='space-y-2 my-2'>
      {/* Section header */}
      <SectionHeader header={header} url={url} />
      {/* Responsive grid */}
      <ContentDisplayBlock
        content={items}
        justify='start'
        displayAmount={4}
        view={'lg'}
      />
    </section>
  );
}
