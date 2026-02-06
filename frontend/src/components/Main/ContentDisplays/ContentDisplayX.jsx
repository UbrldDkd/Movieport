import ContentCard from '../../../pages/Profile/ProfileBrowse/ContentCard/ContentCard';
import { Keys } from '../../../utils/Keys.js';
import { Link } from 'react-router-dom';

export default function MovieDisplayX({ fullContent }) {
  const { API1 } = Keys;
  const { details } = API1;

  return (
    <div className='w-full overflow-hidden'>
      <div className='flex space-x-2.5  overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-2 md:px-6'>
        {fullContent.map((item) => (
          <div
            key={item[details.id]}
            className='snap-start flex-shrink-0 w-[120px] md:w-[150px]'
          >
            <ContentCard item={item} view='lg' />
          </div>
        ))}
      </div>
    </div>
  );
}
