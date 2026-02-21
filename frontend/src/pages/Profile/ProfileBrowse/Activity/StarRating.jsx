import { IoIosStar } from 'react-icons/io';

export default function StarRating({ rating }) {
  return (
    <span className='inline-flex items-center gap-0.5'>
      {[1, 2, 3, 4, 5].map((i) => {
        if (rating >= i)
          return <IoIosStar key={i} className='w-4 h-4 text-red-900' />;
        if (rating >= i - 0.5)
          return (
            <span
              key={i}
              className='relative w-4 h-4 inline-block overflow-hidden'
            >
              <IoIosStar className='absolute w-4 h-4 text-red-900 left-0 top-0' />
              <IoIosStar className='w-4 h-4 text-zinc-600' />
            </span>
          );
        return <IoIosStar key={i} className='w-4 h-4 text-zinc-600' />;
      })}
    </span>
  );
}
