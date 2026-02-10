import ContentCard from './ContentCard/ContentCard';
import { Keys } from '../../utils/constants/Keys';

//display content as a block
export default function ContentDisplayBlock({ content, displayAmount }) {
  const { API1 } = Keys;
  const { details } = API1;

  return (
    <div className='w-full'>
      <div className='flex flex-wrap gap-2 md:gap-2.5 justify-center md:justify-start'>
        {content && Array.isArray(content) ? (
          content
            .slice(0, displayAmount)
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
