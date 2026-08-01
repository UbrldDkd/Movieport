// Icons
import { IoIosStar } from 'react-icons/io';
import { VscHeartFilled } from 'react-icons/vsc';

// Components
import ContentCard from '../ContentCard/ContentCard';

export default function ContentCardWithContentRelations({ item, view }) {
  const maxStars = 5;

  const rating = item.rating;

  const fullStars = rating != null ? Math.floor(rating) : 0;
  const halfStar = rating != null && rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = rating != null ? maxStars - fullStars - halfStar : 0;

  // Fixed icon size per view
  const iconSize = view === 'lg' ? 14 : view === 'md' ? 12 : 10;

  // Very small gap so all 5 stars + heart fit below card
  const gap = 0.25;

  return (
    <div className='flex flex-col items-start'>
      <ContentCard item={item} view={view} />

      <div className='mt-0.5 flex items-center' style={{ gap: `${gap}px` }}>
        {rating != null && (
          <>
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
                <IoIosStar
                  size={iconSize}
                  className='absolute top-0 left-0 text-transparent'
                />

                <div
                  className='absolute top-0 left-0 overflow-hidden'
                  style={{ width: iconSize / 2 }}
                >
                  <IoIosStar size={iconSize} className='text-zinc-500' />
                </div>
              </div>
            )}

            {/* Empty stars */}
          </>
        )}

        {/* Liked heart */}
        {item.liked && (
          <VscHeartFilled
            size={iconSize}
            className={
              rating != null ? 'ml-0.5 text-zinc-600' : 'text-zinc-600'
            }
          />
        )}
      </div>
    </div>
  );
}
