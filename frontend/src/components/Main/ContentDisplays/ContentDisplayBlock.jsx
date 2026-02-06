import ContentCard from '../../../pages/Profile/ProfileBrowse/ContentCard/ContentCard';
import { Keys } from '../../../utils/Keys';
import { Link } from 'react-router-dom';

//display content as a block
export default function MovieDisplayBlock({ fullContent, toDisplay }) {
  const { API1 } = Keys;
  const { details } = API1;

  return (
    <div className='w-full'>
      <div className='flex flex-wrap gap-2 md:gap-2.5 justify-center md:justify-start'>
        {fullContent && Array.isArray(fullContent) ? (
          fullContent
            .slice(0, toDisplay)
            .map((item) => (
              <ContentCard key={item[details.id]} item={item} view='lg' />
            ))
        ) : (
          <p className='text-base text-red-900'>Content not found</p>
        )}
      </div>
    </div>
  );
}
