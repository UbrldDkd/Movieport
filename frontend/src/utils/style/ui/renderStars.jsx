import { IoIosStar } from 'react-icons/io';

export function renderStars({ rating, size }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <IoIosStar key={`full-${i}`} size={size} className='text-zinc-500' />
    );
  }

  if (halfStar) {
    stars.push(
      <div
        key='half'
        className='relative'
        style={{ width: size, height: size }}
      >
        <IoIosStar
          size={size}
          className='text-transparent absolute top-0 left-0'
        />
        <div
          className='absolute top-0 left-0 overflow-hidden'
          style={{ width: size / 2 }}
        >
          <IoIosStar size={size} className='text-zinc-500' />
        </div>
      </div>
    );
  }

  return <>{stars}</>;
}
