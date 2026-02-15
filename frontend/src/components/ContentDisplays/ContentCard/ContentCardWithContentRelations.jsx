// Icons
import { IoIosStar } from 'react-icons/io';
import { VscHeartFilled } from 'react-icons/vsc';

// Components
import ContentCard from '../ContentCard/ContentCard';

export default function ContentCardWithContentRelations({ item, view }) {
  const maxStars = 5;

  // Temporary rating; replace with item.rating later
  const rating = 4.5;

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = maxStars - fullStars - halfStar;

  // Fixed icon size per view
  const iconSize = view === 'lg' ? 14 : view === 'md' ? 12 : 10;

  // Very small gap so all 5 stars + heart fit below card
  const gap = 0.25; // ~1px spacing

  return (
    <div className='flex flex-col items-start'>
      <ContentCard item={item} view={view} />

      <div className='flex items-center mt-0.5' style={{ gap: `${gap}px` }}>
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <IoIosStar
            key={`full-${i}`}
            size={iconSize}
            className='text-zinc-500'
          />
        ))}

        {/* Half star */}
        {halfStar === 1 && (
          <div
            className='relative'
            style={{ width: iconSize, height: iconSize }}
          >
            {/* Outline star */}
            <IoIosStar
              size={iconSize}
              className='text-transparent absolute top-0 left-0'
            />
            {/* Filled half */}
            <div
              className='absolute top-0 left-0 overflow-hidden'
              style={{ width: iconSize / 2 }}
            >
              <IoIosStar size={iconSize} className='text-zinc-500' />
            </div>
          </div>
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <IoIosStar
            key={`empty-${i}`}
            size={iconSize}
            className='text-zinc-300'
          />
        ))}

        {/* Liked heart */}
        {item.liked && (
          <VscHeartFilled size={iconSize} className='text-zinc-600 ml-0.5' />
        )}
      </div>
    </div>
  );
}
