import ContentCard from './ContentCard/ContentCard.jsx';
import { Keys } from '../../utils/constants/Keys.js';
import ScrollHintArrow from '../../utils/animations/ScrollHintArrow.jsx';

export default function ContentDisplayX({ content }) {
  const { API1 } = Keys;
  const { details } = API1;

  return (
    <div className='w-full relative'>
      <div className='flex md:space-x-2.5 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-2 md:px-6'>
        {content.map((item) => (
          <div
            key={item[details.id]}
            className='snap-start flex-shrink-0 w-[120px] md:w-[150px]'
          >
            <ContentCard item={item} view='lg' />
          </div>
        ))}
      </div>
      <ScrollHintArrow direction='horizontal' />
    </div>
  );
}
